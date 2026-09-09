import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { createServer } from '../node_modules/vite/dist/node/index.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const server = await createServer({ root, configFile: path.join(root, 'vite.config.ts'), server: { host: '127.0.0.1', port: 5196, strictPort: true, open: false } });
await server.listen();
const browser = await chromium.launch({ headless: true });
try {
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:5196/gerador-de-proposta/v2-preview.html');
    await page.waitForFunction(() => window.engmarqV2?.result);
    const results = await page.evaluate(async () => {
        const { individualProposal } = await import('/gerador-de-proposta/src/v2/fixtures/proposals.ts');
        const { DocumentPaginator } = await import('/gerador-de-proposta/src/v2/pagination/engine.ts');
        const target = document.querySelector('#pages');
        const paginator = new DocumentPaginator(target);
        const results = [];
        for (const training of [false, true]) {
            const result = await paginator.prepareDocumentForExport(individualProposal(training));
            results.push({ ready: result.ready, cover: target.querySelector('.cover')?.textContent,
                identification: target.querySelector('[data-block-id="individual"]')?.textContent,
                commercial: [...target.querySelectorAll('[data-block-id="investment"]')].map(n => n.textContent).join(' '),
                acceptance: target.querySelector('.acceptance-page')?.textContent,
                companyTable: Boolean(target.querySelector('.companies-table')) });
        }
        return results;
    });
    for (const result of results) {
        assert.equal(result.ready, true, JSON.stringify(result));
        assert.match(result.cover, /ELABORADA PARA/i);
        assert.match(result.cover, /Maria de Souza Exemplo/);
        assert.doesNotMatch(result.cover, /CPF|CNPJ|empresa/i);
        assert.match(result.identification, /Identificação do cliente/);
        assert.match(result.identification, /Nome completo: Maria de Souza Exemplo/);
        assert.match(result.identification, /CPF: 529\.982\.247-25/);
        assert.equal(result.companyTable, false);
        assert.match(result.commercial, /Serviço \/ cliente/);
        assert.match(result.commercial, /1\.500,00/);
        assert.doesNotMatch(result.commercial, /empresa/i);
        assert.match(result.acceptance, /CLIENTE/);
        assert.match(result.acceptance, /CPF: 529\.982\.247-25/);
        assert.doesNotMatch(result.acceptance, /Razão Social|Representante da empresa/i);
    }
    await page.goto('http://127.0.0.1:5196/gerador-de-proposta/v2.html');
    await page.getByLabel('Razão social *', { exact: true }).fill('Empresa anterior');
    await page.getByLabel('Tipo de cliente').selectOption('individual');
    assert.equal(await page.getByLabel('Razão social *', { exact: true }).count(), 0);
    assert.equal(await page.getByLabel('E-mail do contato', { exact: true }).count(), 0);
    await page.getByLabel('Nome completo *', { exact: true }).fill('Maria de Souza Exemplo');
    await page.getByLabel('CPF *', { exact: true }).fill('52998224725');
    assert.equal(await page.getByLabel('CPF *', { exact: true }).inputValue(), '529.982.247-25');
    await page.getByLabel('Tipo de cliente').selectOption('single');
    assert.equal(await page.getByLabel('Nome completo *', { exact: true }).count(), 0);
    assert.equal(await page.getByLabel('Razão social *', { exact: true }).inputValue(), 'Empresa anterior');
    await page.getByLabel('Tipo de cliente').selectOption('individual');
    assert.equal(await page.getByLabel('Nome completo *', { exact: true }).inputValue(), 'Maria de Souza Exemplo');
    console.log('PASS: PF com serviço e treinamento, PDF pronto, capa, identificação, investimento, aceite e troca de tipo na UI.');
} finally { await browser.close(); await server.close(); }
