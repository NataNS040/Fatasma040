import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import { preview } from '../node_modules/vite/dist/node/index.js';

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
} finally { await new Promise((resolve, reject) => server.httpServer.close(error => error ? reject(error) : resolve())); }
console.log('Produção: V1/V2 preservadas; Quality Lab ausente do HTML e dos bundles.');