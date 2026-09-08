import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import { preview } from '../node_modules/vite/dist/node/index.js';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
assert.ok(!(await readdir(dist)).includes('v2-quality-lab.html'), 'Lab não pode ser uma entrada de produção');
assert.ok((await readdir(dist)).includes('v2.html'), 'Editor V2 deve continuar no build');
assert.ok((await readdir(dist)).includes('index.html'), 'Entrada V1 deve continuar no build');
for (const filename of await readdir(path.join(dist, 'assets'))) {
    if (!filename.endsWith('.js')) continue;
    const content = await readFile(path.join(dist, 'assets', filename), 'utf8');
    assert.ok(!content.includes('engmarqQualityLab') && !content.includes('V2 Quality Lab'), `Lab vazou para ${filename}`);
}
const server = await preview({ root, configFile: path.join(root, 'vite.config.ts'), preview: { host: '127.0.0.1', port: 0, open: false } });
try {
    const response = await fetch(`http://127.0.0.1:${server.httpServer.address().port}/gerador-de-proposta/v2-quality-lab.html`);
    const content = await response.text();
    assert.ok(!content.includes('id="quality-lab"') && !content.includes('quality-lab.ts'), 'Rota de produção não pode servir o laboratório');
    const browser = await chromium.launch({ headless: true });
    try {
        const page = await browser.newPage();
        const base = `http://127.0.0.1:${server.httpServer.address().port}/gerador-de-proposta`;
        await page.goto(`${base}/login.html`);
        await page.evaluate(() => localStorage.setItem('engmarq_session', btoa(JSON.stringify({ id: '4', nome: 'Equipe Comercial', email: 'comercial@engmarqsolution.com', cargo: 'comercial', exp: Date.now() + 60000 }))));
        await page.goto(`${base}/painel.html`);
        await page.locator('.tool-card').first().waitFor({ state: 'visible' });
        assert.equal(await page.locator('.tool-card').count(), 7, 'Build preserva o painel Comercial');
        assert.equal(await page.locator('#userRoleText').innerText(), 'Comercial');
        for (const route of ['recibo.html', 'painel-seguranca.html']) {
            await page.goto(`${base}/${route}`);
            await page.waitForURL('**/painel.html');
        }
        assert.equal((await fetch(`${base}/access-policy.js`)).status, 200, 'Política pública incluída no build');
    } finally { await browser.close(); }
} finally { await new Promise((resolve, reject) => server.httpServer.close(error => error ? reject(error) : resolve())); }
console.log('Produção: V1/V2 preservadas; Quality Lab ausente do HTML e dos bundles.');
