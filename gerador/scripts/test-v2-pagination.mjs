import { chromium } from 'playwright';
import { createServer } from '../node_modules/vite/dist/node/index.js';
import { mkdir, writeFile, readdir, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../', import.meta.url));
const artifacts = path.join(root, 'artifacts/v2-pagination');
const server = await createServer({ root, configFile: path.join(root, 'vite.config.ts'), server: { host: '127.0.0.1', port: 5186, strictPort: true, open: false, watch: { ignored: ['**/artifacts/**'] } } });
await server.listen();
const browser = await chromium.launch({ headless: true });
const results = [];
try {
    for (const scenario of ['short', 'medium', 'assistance', 'group']) {
        const page = await browser.newPage({ viewport: { width: 1200, height: 1000 }, deviceScaleFactor: 1 });
        const errors = [];
        page.on('pageerror', error => errors.push(error.stack ?? error.message));
        await page.goto(`http://127.0.0.1:5186/gerador-de-proposta/v2-preview.html?scenario=${scenario}`);
        await page.waitForFunction(() => window.engmarqV2?.result || document.querySelector('#status').textContent.startsWith('Falha:'), { timeout: 120000 });
        const result = await page.evaluate(() => window.engmarqV2?.result ?? { failure: document.querySelector('#status').textContent });
        console.log(scenario, JSON.stringify({ pages: result.pages, ready: result.ready, warnings: result.warnings, failure: result.failure }));
        const dir = path.join(artifacts, scenario);
        await mkdir(dir, { recursive: true });
        // Remove somente screenshots anteriores deste cenário; nunca arquivos arbitrários.
        for (const name of await readdir(dir)) if (/^page-\d+\.png$/.test(name)) await unlink(path.join(dir, name));
        await writeFile(path.join(dir, 'rendered.html'), await page.locator('#pages').innerHTML());
        const pages = page.locator('.pagedjs_page');
        for (let i = 0; i < await pages.count(); i++) await pages.nth(i).screenshot({ path: path.join(dir, `page-${String(i + 1).padStart(2, '0')}.png`) });
        const pdf = await page.pdf({ path: path.join(dir, 'proposal.pdf'), preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false });
        const pdfPages = [...pdf.toString('latin1').matchAll(/\/Type\s*\/Page\b/g)].length;
        assert.equal(pdfPages, result.pages, 'PDF possui as mesmas páginas do preview');
        results.push({ scenario, ...result, errors });
        await writeFile(path.join(artifacts, 'results.json'), JSON.stringify(results, null, 2));
        assert.equal(errors.length, 0, errors.join('\n'));
        assert.equal(result.ready, true, JSON.stringify(result));
        const repeated = await page.evaluate(() => window.engmarqV2.prepareDocumentForExport());
        assert.equal(repeated.pages, result.pages, 'Repaginação determinística');
        assert.equal(repeated.ready, true);
        assert.equal(await pages.count(), result.pages, 'Não acumula páginas');
        const screen = await pages.first().boundingBox();
        await page.emulateMedia({ media: 'print' });
        const print = await pages.first().boundingBox();
        assert.ok(Math.abs(screen.width - print.width) < 1 && Math.abs(screen.height - print.height) < 1, 'A4 idêntico no print');
        await page.emulateMedia({ media: 'screen' });
        if (scenario === 'group' || scenario === 'assistance') {
            const text = await page.locator('#pages').innerText();
            assert.ok(!text.includes('Consolidado'));
            assert.ok(!text.includes('Valor contratual:'));
            assert.ok(text.includes('Mensalidade:'));
        }
        if (scenario === 'short') {
            const diagnostics = await page.evaluate(async () => {
                const { inspectLayout } = await import('/gerador-de-proposta/src/v2/pagination/layout.ts');
                const area = document.querySelector('.pagedjs_page_content');
                const probe = document.createElement('p');
                probe.dataset.layoutId = 'overflow-probe';
                probe.style.cssText = 'position:absolute;top:980px;left:0;width:1500px;height:50px';
                probe.textContent = 'Teste de overflow'; area.append(probe);
                const codes = inspectLayout(document.querySelector('#pages'), [{ id: 'missing-probe', text: 'ausente' }]).map(w => w.code);
                probe.remove();
                const { waitForAssets } = await import('/gerador-de-proposta/src/v2/pagination/engine.ts');
                const source = document.createElement('div'); const img = document.createElement('img');
                img.src = 'data:image/png;base64,invalid'; source.append(img);
                let brokenImageRejected = false;
                try { await waitForAssets(source); } catch { brokenImageRejected = true; }
                return { codes, brokenImageRejected };
            });
            assert.ok(diagnostics.codes.includes('overflow'));
            assert.ok(diagnostics.codes.includes('footer-overlap'));
            assert.ok(diagnostics.codes.includes('missing-content'));
            assert.equal(diagnostics.brokenImageRejected, true);
        }
        await page.waitForTimeout(100);
        assert.equal(errors.length, 0, errors.join('\n'));
        await writeFile(path.join(artifacts, 'results.json'), JSON.stringify(results, null, 2));
        await page.close();
    }
} finally { await browser.close(); await server.close(); }
console.log('Quatro cenários A4 e repaginação aprovados.');
