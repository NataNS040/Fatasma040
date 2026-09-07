import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = fileURLToPath(new URL('../src/v2/', import.meta.url));
const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
const files = walk(root).filter(filename => filename.endsWith('.ts') && !filename.endsWith('.d.ts'));
const names = filename => path.relative(root, filename).split(path.sep).join('/');
const modules = new Map(files.map(filename => [filename, ts.createSourceFile(filename, readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true)]));
const dependencies = new Map();
const imports = [];
const violations = [];
for (const [filename, source] of modules) {
    const edges = [];
    const visit = node => {
        let specifier;
        let runtime = true;
        if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
            specifier = node.moduleSpecifier;
            runtime = !node.isTypeOnly && !node.importClause?.isTypeOnly;
            if (node.importClause?.namedBindings && ts.isNamedImports(node.importClause.namedBindings) && !node.importClause.name) runtime = runtime && node.importClause.namedBindings.elements.some(binding => !binding.isTypeOnly);
        } else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) specifier = node.arguments[0];
        if (specifier && ts.isStringLiteral(specifier)) {
            imports.push({ file: names(filename), specifier: specifier.text });
            if (specifier.text.startsWith('.')) {
                const candidate = path.resolve(path.dirname(filename), specifier.text);
                const resolved = [candidate + '.ts', path.join(candidate, 'index.ts')].find(existsSync);
                if (resolved && runtime) edges.push(resolved);
            }
        }
        if (node.kind === ts.SyntaxKind.AnyKeyword) violations.push(`${names(filename)}: any explícito`);
        if (ts.isPropertyAccessExpression(node) && ['innerHTML', 'outerHTML', 'insertAdjacentHTML', 'localStorage', 'sessionStorage'].includes(node.name.text)) violations.push(`${names(filename)}: ${node.name.text}`);
        if (ts.isCallExpression(node)) {
            const expression = node.expression.getText(source);
            if (/^(eval|fetch|console\.(log|debug|info)|.*\.(insertAdjacentHTML|sendBeacon))$/.test(expression)) violations.push(`${names(filename)}: ${expression}`);
        }
        if (ts.isNewExpression(node) && ['Function', 'WebSocket', 'XMLHttpRequest'].includes(node.expression.getText(source))) violations.push(`${names(filename)}: ${node.expression.getText(source)}`);
        ts.forEachChild(node, visit);
    };
    visit(source); dependencies.set(filename, edges);
}

test('arquitetura V2: grafo de execução sem dependências circulares', () => {
    const done = new Set();
    const visiting = [];
    const visit = filename => {
        assert.ok(!visiting.includes(filename), `Ciclo: ${[...visiting, filename].map(names).join(' -> ')}`);
        if (done.has(filename)) return;
        visiting.push(filename);
        for (const dependency of dependencies.get(filename) ?? []) visit(dependency);
        visiting.pop(); done.add(filename);
    };
    files.forEach(visit);
});

test('arquitetura V2: núcleo isolado de V1, infraestrutura e navegador', () => {
    for (const dependency of imports) {
        assert.ok(!/supabase|\/auth\/|\/lib\/|modelos-prontos|\/templates\//i.test(dependency.specifier), JSON.stringify(dependency));
        if (/^(domain|catalog|presets|composer|validation|configurator|utils)\//.test(dependency.file)) {
            assert.ok(!/\/(ui|pagination|renderer|components)\//.test(dependency.specifier), JSON.stringify(dependency));
        }
    }
    for (const [filename, edges] of dependencies) for (const dependency of edges) assert.ok(modules.has(dependency), `Importação externa à V2: ${names(filename)} -> ${names(dependency)}`);
});

test('qualidade V2: sem any explícito, logs de depuração ou sinks HTML/rede', () => {
    assert.deepEqual(violations, []);
    for (const [filename, source] of modules) {
        assert.ok(!/-----BEGIN (?:RSA |EC )?PRIVATE KEY-----|\b(?:sb_secret_|sk_live_|ghp_)[a-zA-Z0-9]{16,}/.test(source.text), `Possível segredo em ${names(filename)}`);
    }
});

test('qualidade V2: módulos executáveis alcançáveis por entradas ou API pública', () => {
    const reachable = new Set();
    const visit = filename => { if (reachable.has(filename)) return; reachable.add(filename); (dependencies.get(filename) ?? []).forEach(visit); };
    ['index.ts', 'ui/editor.ts', 'ui/preview.ts', 'ui/quality-lab.ts'].forEach(name => visit(path.join(root, name)));
    const executable = [...modules].filter(([, source]) => source.statements.some(node => ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isVariableStatement(node)));
    assert.deepEqual(executable.filter(([filename]) => !reachable.has(filename)).map(([filename]) => names(filename)), []);
});