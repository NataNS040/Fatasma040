import type { Previewer } from 'pagedjs';
import { composeProposal } from '../composer/compose-proposal';
import type { Proposal } from '../domain/proposal';
import { renderDocument } from '../renderer/document';
import documentCss from '../renderer/document.css?raw';
import { inspectLayout, type LayoutWarning } from './layout';
import '@fontsource/montserrat/latin-400.css';
import '@fontsource/montserrat/latin-700.css';
import '@fontsource/open-sans/latin-400.css';
import '@fontsource/open-sans/latin-600.css';

export interface ExportPreparation { pages: number; warnings: LayoutWarning[]; validationWarnings: string[]; ready: boolean; }
async function deadline<T>(promise: Promise<T>, label: string): Promise<T> {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try { return await Promise.race([promise, new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error(`Tempo excedido: ${label}.`)), 30000); })]); }
    finally { clearTimeout(timer); }
}
export async function waitForAssets(root: HTMLElement): Promise<void> {
    await deadline(Promise.all([document.fonts.load('400 12px "Open Sans"'), document.fonts.load('600 12px "Open Sans"'), document.fonts.load('400 12px "Montserrat"'), document.fonts.load('700 12px "Montserrat"')]), 'fontes');
    await deadline(document.fonts.ready, 'fontes');
    await deadline(Promise.all([...root.querySelectorAll('img')].map(async img => { await img.decode(); if (!img.naturalWidth) throw new Error(`Imagem indisponível: ${img.alt}`); })), 'imagens');
}
/** Uma instância por preview. A fila impede corridas e estilos acumulados. */
export class DocumentPaginator {
    private previewer?: Previewer;
    private queue: Promise<unknown> = Promise.resolve();
    constructor(private readonly target: HTMLElement) {}
    prepareDocumentForExport(proposal: Proposal): Promise<ExportPreparation> {
        const snapshot = structuredClone(proposal);
        const task = this.queue.catch(() => undefined).then(async () => {
            const result = composeProposal(snapshot);
            if (!result.ok) throw new Error(result.issues.map(issue => issue.message).join('\n'));
            const source = renderDocument(result.document);
            const expected = [...source.querySelectorAll<HTMLElement>('[data-layout-id]')].filter(n => !n.closest('.page-header,.page-footer') && n.tagName !== 'TR').map(n => ({ id: n.dataset.layoutId!, text: n.textContent ?? '' }));
            await waitForAssets(source);
            this.previewer?.chunker.destroy();
            this.previewer?.polisher.destroy();
            this.target.replaceChildren();
            const { Previewer } = await import('pagedjs');
            this.previewer = new Previewer();
            const coverStyle = result.document.blocks.some(b => b.kind === 'cover') ? '@page :first { @top-left { content: none; } @bottom-left { content: none; } }' : '';
            const flow = await this.previewer.preview(source, [{ [window.location.href]: documentCss + coverStyle }], this.target);
            // Snapshot A4 imutável: mudanças de mídia não devem acionar repaginação
            // interna via ResizeObserver. Toda atualização passa novamente pela fila.
            this.previewer.chunker.pages.forEach(page => page.removeListeners());
            await waitForAssets(this.target);
            await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
            const warnings = inspectLayout(this.target, expected);
            return { pages: flow.total, warnings, validationWarnings: result.issues.filter(i => i.severity === 'warning').map(i => i.message), ready: flow.total > 0 && !warnings.some(w => w.severity === 'error') };
        });
        this.queue = task;
        return task;
    }
}
