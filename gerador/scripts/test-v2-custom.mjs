import { chromium } from 'playwright';
import { createServer } from '../node_modules/vite/dist/node/index.js';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../', import.meta.url));
const artifacts = path.join(root, 'artifacts/v2-custom');
const server = await createServer({ root, configFile: path.join(root, 'vite.config.ts'), server: { host: '127.0.0.1', port: 0, open: false, watch: { ignored: ['**/artifacts/**'] } } });
await server.listen();
let browser;
try {
    await mkdir(artifacts, { recursive: true });
    browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    await page.goto(`http://127.0.0.1:${server.httpServer.address().port}/gerador-de-proposta/v2.html`);
    await page.getByLabel('Razão social *', { exact: true }).fill('Empresa Teste Ltda');
    await page.getByLabel('Nome fantasia', { exact: true }).fill('Empresa Teste');
    await page.getByLabel('Número da proposta *', { exact: true }).fill('TM0141');
    await page.getByRole('button', { name: '2 Escopo', exact: true }).click();
    const categories = [
        ['+ Adicionar outro programa/laudo', 'Laudo Técnico Especial XYZ'],
        ['+ Adicionar outro serviço', 'Gestão especial'],
        ['+ Adicionar outra medição', 'Agente especial'],
        ['+ Adicionar outro treinamento', 'Operação de Empilhadeira']
    ];
    for (const [label, title] of categories) {
        await page.getByRole('button', { name: label, exact: true }).click();
        // Cada categoria tem apenas um item neste ponto.
        const group = page.locator('.catalog-group').filter({ has: page.getByRole('button', { name: label, exact: true }) });
        await group.getByLabel('Nome do item personalizado *', { exact: true }).fill(title);
        await group.getByLabel('Descrição / escopo', { exact: true }).fill(`Escopo contratado de ${title}.`);
        await group.getByLabel('Observações do item personalizado', { exact: true }).fill('Execução alinhada com o cliente.');
        if (label.includes('treinamento')) {
            await group.getByLabel('Participantes', { exact: true }).fill('12');
            await group.getByLabel('Turmas', { exact: true }).fill('2');
            await group.getByLabel('Carga horária (h)', { exact: true }).fill('8');
            await group.getByLabel('Modalidade', { exact: true }).selectOption('onsite');
        }
        if (label.includes('medição')) {
            await group.getByLabel('Quantidade', { exact: true }).fill('3');
            await group.getByLabel('Unidade / pontos', { exact: true }).fill('pontos');
        }
    }
    await page.getByRole('button', { name: '3 Comercial', exact: true }).click();
    await page.getByLabel('Investimento único (R$) *', { exact: true }).fill('5000');
    const ready = () => page.waitForFunction(() => !document.querySelector('#editor-export').disabled, undefined, { timeout: 120000 });
    await ready();
    let text = await page.locator('#editor-pages').innerText();
    for (const [, title] of categories) assert.ok(text.includes(title));
    assert.match(text, /Participantes[\s\S]*12/); assert.ok(text.includes('pontos'));
    for (const charge of ['once', 'both']) {
        await page.getByLabel('Tipo de cobrança', { exact: true }).selectOption(charge);
        if (charge === 'both') await page.getByLabel('Mensalidade (R$) *', { exact: true }).fill('300');
        for (const [once, monthly] of charge === 'once' ? [[true, true], [false, true]] : [[true, true], [false, true], [true, false], [false, false]]) {
            await page.getByLabel('Exibir valor único', { exact: true }).setChecked(once);
            await page.getByLabel('Exibir mensalidade', { exact: true }).setChecked(monthly);
            await page.getByLabel('Exibir valor total do contrato', { exact: true }).check();
            await page.getByLabel('Exibir total agregado', { exact: true }).check();
            await ready(); text = await page.locator('#editor-pages').innerText();
            assert.equal(text.includes('5.000,00'), once);
            assert.equal(text.includes('300,00'), monthly && charge === 'both');
            assert.ok(!text.includes('R$ 0,00'));
            if (!once) assert.ok(!text.includes('Valor contratual:'));
            if (!once && (!monthly || charge === 'once')) assert.equal(await page.locator('#editor-pages .commercial-table').count(), 0);
            assert.equal(await page.getByLabel('Investimento único (R$) *', { exact: true }).inputValue(), '5000');
        }
    }
    const originalTitle = await page.title();
    await page.evaluate(() => { window.print = () => { window.capturedPrintTitle = document.title; window.dispatchEvent(new Event('afterprint')); }; });
    await page.getByRole('button', { name: 'Gerar PDF', exact: true }).click();
    await page.waitForFunction(() => window.capturedPrintTitle);
    assert.equal(await page.evaluate(() => window.capturedPrintTitle), 'TM0141 - Empresa Teste');
    assert.equal(await page.title(), originalTitle);
    await page.getByRole('button', { name: '2 Escopo', exact: true }).click();
    const trainings = page.locator('.catalog-group').filter({ has: page.getByRole('button', { name: '+ Adicionar outro treinamento', exact: true }) });
    for (let index = 0; index < 12; index++) {
        await trainings.getByRole('button', { name: '+ Adicionar outro treinamento', exact: true }).click();
        await trainings.getByLabel('Nome do item personalizado *', { exact: true }).last().fill(`Capacitação especial ${index}`);
        await trainings.getByLabel('Descrição / escopo', { exact: true }).last().fill(Array.from({ length: 10 }, (_, n) => `Entrega ${n + 1}: planejamento, orientação e exercício prático específico da capacitação ${index}, conforme condições pactuadas com o cliente.`).join('\n'));
    }
    await trainings.getByRole('button', { name: 'Remover item personalizado', exact: true }).last().click();
    await ready(); text = await page.locator('#editor-pages').innerText();
    for (let index = 0; index < 11; index++) assert.ok(text.includes(`Capacitação especial ${index}`));
    assert.ok(!text.includes('Capacitação especial 11'));
    const pages = await page.locator('.pagedjs_page').count(); assert.ok(pages > 3);
    await page.emulateMedia({ media: 'print' });
    const pdf = await page.pdf({ path: path.join(artifacts, 'TM0141 - Empresa Teste.pdf'), preferCSSPageSize: true, printBackground: true });
    assert.equal(pdf.subarray(0, 4).toString(), '%PDF');
    assert.deepEqual(errors, []);
    await writeFile(path.join(artifacts, 'results.json'), JSON.stringify({ passed: true, pages, printTitle: 'TM0141 - Empresa Teste', financialCombinations: 6 }, null, 2));
    console.log(`PASS custom items, print title, six financial combinations and ${pages} A4 pages`);
} finally { await browser?.close(); await server.close(); }
