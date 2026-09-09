import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { createServer } from '../node_modules/vite/dist/node/index.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const server = await createServer({ root, configFile: path.join(root, 'vite.config.ts'), server: { host: '127.0.0.1', port: 5192, strictPort: true, open: false, watch: { ignored: ['**/artifacts/**'] } } });
await server.listen();
const browser = await chromium.launch({ headless: true });
try {
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:5192/gerador-de-proposta/v2-preview.html');
    await page.waitForFunction(() => window.engmarqV2?.result);
    const results = await page.evaluate(async () => {
        const { singleProposal, tm137GroupProposal } = await import('/gerador-de-proposta/src/v2/fixtures/proposals.ts');
        const { DocumentPaginator } = await import('/gerador-de-proposta/src/v2/pagination/engine.ts');
        const target = document.querySelector('#pages');
        const paginator = new DocumentPaginator(target);
        const results = [];
        for (const scenario of ['single-contact', 'missing-contact', 'group-contact', 'without-cover']) {
            const proposal = scenario === 'group-contact' ? tm137GroupProposal() : singleProposal();
            proposal.metadata.author = { name: 'Consultora de Teste', role: 'Consultora Comercial' };
            if (scenario !== 'missing-contact') proposal.client.contact = { name: 'Responsável de Teste', role: 'Diretoria' };
            if (scenario === 'without-cover') proposal.options.includeCover = false;
            const result = await paginator.prepareDocumentForExport(proposal);
            const acceptance = target.querySelector('.acceptance-page');
            const text = acceptance.textContent;
            const signatures = [...target.querySelectorAll('.signature')];
            const pages = [...target.querySelectorAll('.pagedjs_page')];
            results.push({ scenario, ready: result.ready, text, signatures: signatures.length,
                samePage: signatures.every(n => n.closest('.pagedjs_page') === acceptance.closest('.pagedjs_page')),
                final: acceptance.closest('.pagedjs_page') === pages.at(-1),
                newPage: !acceptance.closest('.pagedjs_page').querySelector('[data-block-id="investment"]'),
                cover: Boolean(target.querySelector('.cover')) });
        }
        return results;
    });
    for (const result of results) {
        assert.ok(result.ready && result.samePage && result.final && result.newPage, JSON.stringify(result));
        assert.equal(result.signatures, 2);
        assert.match(result.text, /Consultora de Teste/);
        assert.doesNotMatch(result.text, /Cargo:|Consultora Comercial|Diretoria/);
        if (result.scenario === 'missing-contact') assert.match(result.text, /Nome: _/);
        else assert.match(result.text, /Responsável de Teste/);
        if (result.scenario === 'group-contact') assert.match(result.text, /Empresas abrangidas pelo aceite/);
        assert.equal(result.cover, result.scenario !== 'without-cover');
    }
    console.log('PASS: aceite sem campo de cargo, cliente informado/ausente, grupo e documento sem capa.');
} finally { await browser.close(); await server.close(); }
