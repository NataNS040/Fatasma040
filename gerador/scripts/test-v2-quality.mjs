import { chromium } from 'playwright';
import { createServer } from '../node_modules/vite/dist/node/index.js';
import { mkdir, writeFile, readdir, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../', import.meta.url));
const artifacts = path.join(root, 'artifacts/v2-quality');
const examples = path.join(root, 'examples/quality');
const server = await createServer({ root, configFile: path.join(root, 'vite.config.ts'), server: { host: '127.0.0.1', port: 0, open: false, watch: { ignored: ['**/artifacts/**', '**/examples/**'] } } });
await server.listen();
const port = server.httpServer.address().port;
let browser;
const results = [];
try {
    browser = await chromium.launch();
    await mkdir(examples, { recursive: true });
    for (const scenario of ['pgr', 'pcmso', 'ltcat', 'lip', 'kit', 'kit-psicossocial', 'psicossocial', 'medicao-unica', 'medicoes', 'treinamento-simples', 'brigada', 'treinamentos', 'assessoria', 'grupo']) {
        const page = await browser.newPage({ viewport: { width: 1200, height: 1000 } });
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(`http://127.0.0.1:${port}/gerador-de-proposta/v2-preview.html?scenario=${scenario}`);
        await page.waitForFunction(() => window.engmarqV2?.result || document.querySelector('#status').textContent.startsWith('Falha:'), undefined, { timeout: 120000 });
        const result = await page.evaluate(() => window.engmarqV2.result ?? { failure: document.querySelector('#status').textContent });
        const directory = path.join(artifacts, scenario);
        await mkdir(directory, { recursive: true });
        for (const filename of await readdir(directory)) if (/^page-\d+\.png$/.test(filename)) await unlink(path.join(directory, filename));
        const pages = page.locator('.pagedjs_page');
        for (let index = 0; index < await pages.count(); index++) await pages.nth(index).screenshot({ path: path.join(directory, `page-${String(index + 1).padStart(2, '0')}.png`) });
        results.push({ scenario, ...result, errors });
        await writeFile(path.join(artifacts, 'results.json'), JSON.stringify(results, null, 2));
        console.log(scenario, JSON.stringify({ pages: result.pages, ready: result.ready, warnings: result.warnings, failure: result.failure }));
        assert.equal(result.ready, true, JSON.stringify(result));
        assert.deepEqual(errors, []);
        const html = await page.evaluate(async () => {
            const toDataUrl = async url => {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Asset indisponível: ${url}`);
                const blob = await response.blob();
                return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(blob); });
            };
            let css = [...document.styleSheets].flatMap(sheet => [...sheet.cssRules].map(rule => rule.cssText)).join('\n');
            for (const match of [...css.matchAll(/url\(["']?([^"')]+)["']?\)/g)]) {
                if (!match[1].startsWith('data:')) css = css.replaceAll(match[0], `url("${await toDataUrl(new URL(match[1], location.href).href)}")`);
            }
            const content = document.querySelector('#pages').cloneNode(true);
            for (const image of content.querySelectorAll('img')) image.src = await toDataUrl(image.src);
            const output = document.implementation.createHTMLDocument(document.title);
            output.documentElement.lang = 'pt-BR';
            const charset = output.createElement('meta'); charset.setAttribute('charset', 'utf-8');
            const viewport = output.createElement('meta'); viewport.name = 'viewport'; viewport.content = 'width=device-width, initial-scale=1';
            const style = output.createElement('style'); style.textContent = css;
            output.head.append(charset, viewport, style);
            output.body.append(content);
            return '<!doctype html>\n' + output.documentElement.outerHTML;
        });
        const filename = path.join(examples, `${scenario}.html`);
        await writeFile(filename, html);
        const pdf = await page.pdf({ path: path.join(directory, 'proposal.pdf'), preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false });
        assert.equal([...pdf.toString('latin1').matchAll(/\/Type\s*\/Page\b/g)].length, result.pages);
        const repeated = await page.evaluate(() => window.engmarqV2.prepareDocumentForExport());
        assert.equal(repeated.pages, result.pages);
        assert.equal(repeated.ready, true);
        if (scenario === 'grupo') {
            const text = await page.locator('#pages').innerText();
            assert.ok(!text.includes('Consolidado') && !text.includes('Valor contratual:'));
            assert.equal(await page.getByRole('heading', { name: 'Responsabilidade técnica', exact: true }).count(), 1);
        }
        await page.goto(new URL(`../examples/quality/${scenario}.html`, import.meta.url).href);
        await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth > 0));
        assert.equal(await page.locator('.pagedjs_page').count(), result.pages);
        const standalonePdf = await page.pdf({ preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false });
        assert.equal([...standalonePdf.toString('latin1').matchAll(/\/Type\s*\/Page\b/g)].length, result.pages, 'HTML autônomo preserva paginação');
        assert.deepEqual(errors, []);
        await page.close();
    }
} finally { await browser?.close(); await server.close(); }
console.log(`${results.length} exemplos HTML autônomos, PDFs e capturas aprovados.`);