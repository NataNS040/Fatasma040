import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { createServer } from '../node_modules/vite/dist/node/index.js';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const server = await createServer({ root, configFile: path.join(root, 'vite.config.ts'), server: { host: '127.0.0.1', port: 0, open: false, watch: { ignored: ['**/artifacts/**'] } } });
await server.listen();
const base = `http://127.0.0.1:${server.httpServer.address().port}/gerador-de-proposta`;
const browser = await chromium.launch({ headless: true });
const results = [];
try {
    const page = await browser.newPage();
    page.on('pageerror', error => console.error(error.message));
    page.on('console', message => { if (message.type() === 'error' && message.text().includes('Falha ao carregar painel')) console.error(message.text()); });
    // O HTML externo usa o mesmo script público em ambos os caminhos de produção.
    for (const route of ['**/encaminhamento-exame', '**/gerador-encaminhamento-exame.html']) {
        await page.route(route, async request => request.fulfill({ contentType: 'text/html', body: await readFile(path.join(root, '../gerador-encaminhamento-exame.html'), 'utf8') }));
    }
    for (const role of ['admin', 'vendedor', 'seguranca', 'comercial']) {
        console.log(`Testando ${role}`);
        await page.goto(`${base}/login.html`);
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        // Recupera a credencial de teste sem imprimi-la ou gravá-la em artefatos.
        const account = await page.evaluate(async role => {
            const { usuariosAutorizados } = await import('/gerador-de-proposta/src/auth/usuarios.ts');
            const user = usuariosAutorizados.find(u => u.cargo === role);
            return { email: user.email, password: user.senha };
        }, role);
        await page.locator('#email').fill(account.email);
        await page.locator('#senha').fill(account.password);
        await page.locator('#btnLogin').click();
        await page.waitForURL(role === 'seguranca' ? '**/painel-seguranca.html' : '**/painel.html');
        await page.locator('.tool-card').first().waitFor({ state: 'visible' });
        const cards = await page.locator('.tool-card').evaluateAll(nodes => nodes.map(n => new URL(n.href).pathname.split('/').pop()));
        if (role === 'admin' || role === 'vendedor') assert.equal(cards.length, 9);
        if (role === 'seguranca') assert.equal(cards.length, 2);
        if (role === 'comercial') {
            assert.equal(await page.locator('#userNameText').innerText(), 'Equipe Comercial');
            assert.equal(await page.locator('#userRoleText').innerText(), 'Comercial');
            assert.deepEqual(cards, ['v2.html', 'personalizada.html', 'assessoria.html', 'index.html', 'contrato.html', 'orcamento.html', 'calculadora.html']);
            assert.equal(await page.locator('.section-title').count(), 3);
            assert.deepEqual(await page.locator('.count').allTextContents(), ['4 ferramentas', '2 ferramentas', '1 ferramenta']);
            for (const restricted of [`${base}/recibo.html`, `${base}/painel-seguranca.html`, `${base}/../encaminhamento-exame`, `${base}/../gerador-encaminhamento-exame.html`]) {
                await page.goto(restricted);
                await page.waitForURL('**/painel.html');
                await page.locator('.tool-card').first().waitFor({ state: 'visible' });
            }
            for (const allowed of cards) {
                await page.goto(`${base}/${allowed}`);
                assert.equal(new URL(page.url()).pathname.split('/').pop(), allowed);
            }
        } else {
            await page.goto(`${base}/recibo.html`);
            assert.ok(page.url().endsWith('/recibo.html'));
        }
        results.push({ role, passed: true, cards });
        await page.evaluate(() => localStorage.clear());
    }
    await page.goto(`${base}/recibo.html`);
    await page.waitForURL('**/login.html');
    const invalid = await page.evaluate(async () => {
        const { loginComSenha, validarToken, gerarToken } = await import('/gerador-de-proposta/src/auth/usuarios.ts');
        return { login: (await loginComSenha('comercial@engmarqsolution.com', 'incorrect')).ok,
            expired: validarToken(btoa(JSON.stringify({ cargo: 'comercial', exp: 1 }))).valido,
            roles: ['admin','vendedor','seguranca','financeiro','comercial'].map(cargo => validarToken(gerarToken({ id: 'test', nome: 'Test', email: 'test@example.com', cargo })).usuario.cargo) };
    });
    assert.equal(invalid.login, false); assert.equal(invalid.expired, false);
    assert.deepEqual(invalid.roles, ['admin','vendedor','seguranca','financeiro','comercial']);
    await mkdir(path.join(root, 'artifacts/commercial-access'), { recursive: true });
    await writeFile(path.join(root, 'artifacts/commercial-access/results.json'), JSON.stringify({ results, invalidCredentialsRejected: true, directRoutesBlocked: true }, null, 2));
    console.log('PASS: login dos quatro perfis, normalização dos cinco cargos, painel, contadores e URLs diretas.');
} finally { await browser.close(); await server.close(); }
