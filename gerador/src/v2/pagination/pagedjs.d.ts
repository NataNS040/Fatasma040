declare module 'pagedjs' {
    export class Previewer {
        preview(content: HTMLElement, stylesheets: Record<string, string>[], renderTo: HTMLElement): Promise<{ total: number }>;
        polisher: { destroy(): void };
        chunker: { destroy(): void; pages: { removeListeners(): void }[]; hooks: { renderNode: { register(callback: (rendered: Node, source: Node) => void): void } } };
    }
}
