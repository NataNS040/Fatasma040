export function repeatTableHeader(rendered: Node, source: Node): void {
    const renderedElement = rendered instanceof Element ? rendered : rendered.parentElement;
    const sourceElement = source instanceof Element ? source : source.parentElement;
    if (!renderedElement?.closest('tbody')) return;
    const table = renderedElement.closest('table');
    const original = sourceElement?.closest('table');
    if (table && !table.tHead && original?.tHead) table.insertBefore(original.tHead.cloneNode(true), table.firstChild);
}