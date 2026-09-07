import { chromium } from 'playwright';
import { createServer } from '../node_modules/vite/dist/node/index.js';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import { loadV2 } from './load-v2.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const artifacts = path.join(root, 'artifacts/v2-regression');
const baselines = path.join(root, 'tests/baselines/v2');
const update = process.argv.includes('--update-baselines');
const loaded = loadV2();
const fixtureIds = loaded.regression.regressionFixtures.map(fixture => fixture.id);
loaded.dispose();
const server = await createServer({ root, configFile: path.join(root, 'vite.config.ts'), server: { host: '127.0.0.1', port: 0, open: false, watch: { ignored: ['**/artifacts/**', '**/tests/baselines/**'] } } });
await server.listen();
const base = `http://127.0.0.1:${server.httpServer.address().port}/gerador-de-proposta`;
let browser;
const results = [];
const pendingBaselines = [];
const failures = [];
const hash = value => createHash('sha256').update(value).digest('hex').slice(0, 20);
const wait = page => page.waitForFunction(() => window.engmarqQualityLab?.settled, undefined, { timeout: 120000 });

async function snapshot(page) {
    const pages = await page.evaluate(() => [...document.querySelectorAll('.pagedjs_page')].map(page => {
        const area = page.querySelector('.pagedjs_page_content').getBoundingClientRect();
        const bounds = page.getBoundingClientRect();
        return { size: [bounds.width, bounds.height], nodes: [...page.querySelectorAll('[data-layout-id],img')].map(node => {
            const rect = node.getBoundingClientRect();
            const style = getComputedStyle(node);
            return {
                identity: [node.dataset.layoutId ?? 'image', node.tagName, (node.textContent ?? '').replace(/\s+/g, ' ').trim()],
                rect: [rect.x - area.x, rect.y - area.y, rect.width, rect.height].map(value => Math.round(value * 100) / 100),
                style: [style.fontFamily, style.fontSize, style.fontWeight, style.lineHeight, style.color, style.backgroundColor, style.borderTopWidth, style.borderTopColor],
                image: node.tagName === 'IMG' ? [new URL(node.src).pathname, node.naturalWidth, node.naturalHeight] : null
            };
        }) };
    }));
    for (const page of pages) for (const node of page.nodes) node.identity[2] = hash(node.identity[2]);
    return { schema: 1, pages };
}

function compare(actual, expected) {
    assert.equal(actual.schema, expected.schema);
    assert.equal(actual.pages.length, expected.pages.length, 'Quantidade de páginas mudou');
    actual.pages.forEach((page, index) => {
        const prior = expected.pages[index];
        assert.deepEqual(page.size, prior.size, `Dimensão A4 na página ${index + 1}`);
        assert.equal(page.nodes.length, prior.nodes.length, `Quantidade de elementos na página ${index + 1}`);
        page.nodes.forEach((node, offset) => {
            const previous = prior.nodes[offset];
            const location = `página ${index + 1}, elemento ${node.identity[0]}`;
            assert.deepEqual(node.identity, previous.identity, `Conteúdo/ordem: ${location}`);
            assert.deepEqual(node.style, previous.style, `Estilos: ${location}`);
            assert.deepEqual(node.image, previous.image, `Imagem: ${location}`);
            assert.ok(node.rect.every((value, coordinate) => Math.abs(value - previous.rect[coordinate]) <= 1), `Geometria: ${location}: ${node.rect} != ${previous.rect}`);
        });
    });
}

async function diagnostics(page) {
    return page.evaluate(async () => {
        const { inspectLayout, isLayoutExportable } = await import('/gerador-de-proposta/src/v2/pagination/layout.ts');
        const container = document.createElement('div'); document.body.append(container);
        const makePage = () => {
            const page = document.createElement('section'); page.className = 'pagedjs_page'; page.style.cssText = 'position:relative;width:400px;height:700px';
            const area = document.createElement('div'); area.className = 'pagedjs_page_content'; area.style.cssText = 'position:relative;width:400px;height:600px';
            const footer = document.createElement('div'); footer.className = 'pagedjs_margin-bottom'; footer.style.cssText = 'position:absolute;top:620px;width:400px;height:60px';
            page.append(area, footer); container.append(page); return area;
        };
        const outcomes = {};
        for (const kind of ['overflow', 'clipped-content', 'table-width', 'empty-page', 'hidden-page', 'footer-overlap', 'split-block', 'missing-content', 'sparse-page']) {
            container.replaceChildren();
            const area = makePage();
            const leaf = document.createElement('p'); leaf.dataset.layoutId = 'probe'; leaf.textContent = 'Conteúdo de teste'; leaf.style.margin = '0'; area.append(leaf);
            if (kind === 'overflow') leaf.style.width = '900px';
            if (kind === 'clipped-content') { leaf.style.cssText = 'height:5px;overflow:hidden;margin:0'; leaf.dataset.atomic = 'true'; }
            if (kind === 'table-width') { const table = document.createElement('table'); table.style.width = '900px'; area.append(table); }
            if (kind === 'empty-page') leaf.remove();
            if (kind === 'hidden-page') leaf.style.display = 'none';
            if (kind === 'footer-overlap') leaf.style.cssText = 'position:absolute;top:630px;height:20px;margin:0';
            if (kind === 'split-block') { leaf.dataset.atomic = 'true'; makePage().append(leaf.cloneNode(true)); }
            if (kind === 'sparse-page') makePage().append(leaf.cloneNode(true));
            const warnings = inspectLayout(container, kind === 'missing-content' ? [{ id: 'absent', text: 'ausente' }] : []);
            outcomes[kind] = { codes: warnings.map(warning => warning.code), ready: isLayoutExportable(container.children.length, warnings) };
        }
        outcomes.noPages = { ready: isLayoutExportable(0, []) };
        container.remove(); return outcomes;
    });
}

try {
    browser = await chromium.launch();
    for (const id of fixtureIds) {
        const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, locale: 'pt-BR', timezoneId: 'America/Fortaleza', reducedMotion: 'reduce' });
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('response', response => { if (response.status() >= 400) errors.push(`HTTP ${response.status()}: ${response.url()}`); });
        const directory = path.join(artifacts, id); await mkdir(directory, { recursive: true });
        try {
            await page.goto(`${base}/v2-quality-lab.html?fixture=${id}`); await wait(page);
            const result = await page.evaluate(() => window.engmarqQualityLab.result);
            assert.equal(result?.ready, true, await page.locator('#lab-issues').innerText());
            assert.equal(await page.locator('#lab-export').isDisabled(), false);
            assert.ok(await page.evaluate(() => [...document.images].every(image => image.complete && image.naturalWidth > 0)));
            const actual = await snapshot(page);
            await writeFile(path.join(directory, 'actual.json'), JSON.stringify(actual, null, 2));
            const pages = page.locator('.pagedjs_page');
            const captureStyle = await page.addStyleTag({ content: '#quality-lab { display:block;height:auto; } .lab-header,.lab-controls { display:none; } .lab-viewport { overflow:visible;padding:0; } .lab-pages { margin:0; }' });
            for (let index = 0; index < await pages.count(); index++) await pages.nth(index).screenshot({ path: path.join(directory, `page-${String(index + 1).padStart(2, '0')}.png`) });
            await captureStyle.evaluate(node => node.remove());
            const pdf = await page.pdf({ path: path.join(directory, 'proposal.pdf'), preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false });
            assert.equal([...pdf.toString('latin1').matchAll(/\/Type\s*\/Page\b/g)].length, result.pages);
            await page.evaluate(() => window.engmarqQualityLab.prepare()); await wait(page);
            compare(await snapshot(page), actual);
            const reference = path.join(baselines, `${id}.json`);
            if (update) pendingBaselines.push({ reference, actual });
            else compare(actual, JSON.parse(await readFile(reference, 'utf8')));

            if (id === 'training') {
                for (const mutate of [
                    model => model.pages.pop(),
                    model => model.pages[0].nodes[0].identity[2] = 'changed',
                    model => model.pages[0].nodes[0].rect[0] += 5,
                    model => model.pages[0].nodes[0].style[4] = 'rgb(255, 0, 0)'
                ]) {
                    const changed = structuredClone(actual); mutate(changed);
                    assert.throws(() => compare(changed, actual), 'Comparador deve detectar alteração real');
                }
                const outcomes = await diagnostics(page);
                for (const [kind, outcome] of Object.entries(outcomes)) {
                    if (kind !== 'noPages') assert.ok(outcome.codes.includes(kind === 'hidden-page' ? 'empty-page' : kind), JSON.stringify({ kind, outcome }));
                    assert.equal(outcome.ready, kind === 'sparse-page', `${kind}: política de exportação`);
                }
                await writeFile(path.join(artifacts, 'layout-diagnostics.json'), JSON.stringify(outcomes, null, 2));
                for (const invalid of ['missing-client', 'empty-scope', 'missing-investment', 'missing-participants']) {
                    await page.getByLabel('Caso de validação').selectOption(invalid); await wait(page);
                    assert.equal(await page.locator('#lab-export').isDisabled(), true, invalid);
                    assert.ok((await page.locator('#lab-status').innerText()).includes('dados inválidos'));
                }
                await page.getByLabel('Caso de validação').selectOption('warnings'); await wait(page);
                assert.equal(await page.locator('#lab-export').isDisabled(), false);
                assert.ok((await page.locator('#lab-issues').innerText()).includes('Responsável'));
                await page.evaluate(() => { window.print = () => { window.printRequested = true; }; });
                const style = await page.addStyleTag({ content: '#lab-pages [data-layout-id] { transform: translateX(1200px) !important; }' });
                await page.locator('#lab-export').click(); await wait(page);
                assert.equal(await page.locator('#lab-export').isDisabled(), true);
                assert.equal(await page.evaluate(() => Boolean(window.printRequested)), false);
                assert.ok((await page.locator('#lab-status').innerText()).includes('layout'));
                await style.evaluate(node => node.remove());
                await page.getByLabel('Caso de validação').selectOption('valid'); await wait(page);
                await page.screenshot({ path: path.join(artifacts, 'lab-desktop.png') });
                await page.setViewportSize({ width: 390, height: 844 });
                await page.getByLabel('Fixture', { exact: true }).selectOption('measurement'); await wait(page);
                assert.equal(await page.locator('#lab-export').isDisabled(), false);
                assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
                await page.screenshot({ path: path.join(artifacts, 'lab-mobile.png') });
            }
            assert.deepEqual(errors, []);
            results.push({ id, passed: true, pages: result.pages, warnings: result.warnings, validationWarnings: result.validationWarnings });
            console.log(`${id}: ${result.pages} páginas, layout/PDF/regressão aprovados`);
        } catch (error) {
            failures.push(error);
            results.push({ id, passed: false, error: error.stack, errors });
            await page.screenshot({ path: path.join(directory, 'failure.png') }).catch(() => undefined);
            console.error(`${id}: ${error.message}`);
        } finally { await page.close(); }
    }
    await mkdir(artifacts, { recursive: true });
    await writeFile(path.join(artifacts, 'results.json'), JSON.stringify({ browser: browser.version(), platform: process.platform, baselineUpdate: update, results }, null, 2));
    if (failures.length) throw new AggregateError(failures, `${failures.length} regressões falharam; referências não alteradas.`);
    if (update) {
        await mkdir(baselines, { recursive: true });
        for (const { reference, actual } of pendingBaselines) await writeFile(reference, JSON.stringify(actual, null, 2) + '\n');
        await writeFile(path.join(baselines, 'environment.json'), JSON.stringify({ browser: browser.version(), platform: process.platform, viewport: [1440, 1000], deviceScaleFactor: 1, tolerancePixels: 1 }, null, 2) + '\n');
    }
} finally { await browser?.close(); await server.close(); }
console.log(`Quality Lab: ${results.length} fixtures aprovadas${update ? '; referências atualizadas explicitamente' : '; referências preservadas'}.`);