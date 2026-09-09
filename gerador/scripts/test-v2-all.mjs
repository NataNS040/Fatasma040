import { spawnSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const checks = [
    ['unit', ['--test', 'tests/v2.test.mjs', 'tests/v2-editor.test.mjs', 'tests/v2-regression.test.mjs', 'tests/v2-architecture.test.mjs']],
    ['pagination', ['scripts/test-v2-pagination.mjs']],
    ['acceptance', ['scripts/test-v2-acceptance.mjs']],
    ['individual', ['scripts/test-v2-individual.mjs']],
    ['commercial-access', ['scripts/test-commercial-access.mjs']],
    ['editor', ['scripts/test-v2-editor.mjs']],
    ['team-workflows', ['scripts/test-v2-workflows.mjs']],
    ['quality-examples', ['scripts/test-v2-quality.mjs']],
    ['regression-lab', ['scripts/test-v2-regression.mjs']],
    ['typecheck', ['node_modules/typescript/bin/tsc', '--noEmit']],
    ['build', ['node_modules/vite/bin/vite.js', 'build']],
    ['production-isolation', ['scripts/test-v2-production.mjs']]
];
const results = [];
for (const [name, args] of checks) {
    console.log(`\nV2 CHECK: ${name}`);
    if (name === 'production-isolation' && !results.find(result => result.name === 'build')?.passed) {
        results.push({ name, passed: false, error: 'Build falhou; isolamento de produção não verificado.' });
        continue;
    }
    const started = Date.now();
    const result = spawnSync(process.execPath, args, { cwd: root, stdio: 'inherit' });
    results.push({ name, passed: result.status === 0 && !result.error, exitCode: result.status, signal: result.signal, error: result.error?.message, durationMs: Date.now() - started });
}
const directory = path.join(root, 'artifacts/v2-suite');
await mkdir(directory, { recursive: true });
await writeFile(path.join(directory, 'results.json'), JSON.stringify({ completedAt: new Date().toISOString(), results }, null, 2));
for (const result of results) console.log(`${result.passed ? 'PASS' : 'FAIL'} ${result.name}${result.error ? `: ${result.error}` : ''}`);
process.exitCode = results.every(result => result.passed) ? 0 : 1;
