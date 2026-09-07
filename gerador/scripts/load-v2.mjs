import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, relative, isAbsolute, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import ts from 'typescript';

/** Utilitário de desenvolvimento local: compila V2 em temp sem tocar no build V1. */
export function loadV2() {
    const source = fileURLToPath(new URL('../src/v2/', import.meta.url));
    const temporaryRoot = resolve(tmpdir());
    const output = mkdtempSync(join(temporaryRoot, 'engmarq-v2-'));
    const dispose = () => {
        const child = relative(temporaryRoot, output);
        if (!child || child.startsWith('..') || isAbsolute(child)) throw new Error('Diretório temporário fora do limite esperado.');
        rmSync(output, { recursive: true, force: true });
    };
    try {
        const program = ts.createProgram([join(source, 'index.ts'), join(source, 'fixtures/proposals.ts'), join(source, 'fixtures/regression.ts'), join(source, 'ui/draft.ts')], {
            target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS,
            strict: true, noUnusedLocals: true, noUnusedParameters: true, skipLibCheck: true,
            rootDir: source, outDir: output, types: []
        });
        const diagnostics = ts.getPreEmitDiagnostics(program);
        if (diagnostics.length) throw new Error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
            getCurrentDirectory: () => source, getCanonicalFileName: name => name, getNewLine: () => '\n'
        }));
        if (program.emit().emitSkipped) throw new Error('Emissão TypeScript não concluída.');
        const require = createRequire(import.meta.url);
        return { api: require(join(output, 'index.js')), fixtures: require(join(output, 'fixtures/proposals.js')), regression: require(join(output, 'fixtures/regression.js')), editor: require(join(output, 'ui/draft.js')), dispose };
    } catch (error) {
        dispose();
        throw error;
    }
}
