/** Componentes DOM: todo conteúdo do cliente permanece texto literal. */
export function element<K extends keyof HTMLElementTagNameMap>(tag: K, className = '', text?: string): HTMLElementTagNameMap[K] {
    const node = document.createElement(tag);
    node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}
export function section(title: string): HTMLElement {
    const node = element('section', 'document-section');
    node.append(element('h2', 'section-header', title));
    return node;
}
export function featureList(title: string, values: string[]): HTMLElement {
    const node = element('div', 'feature-list');
    node.append(element('h4', '', title));
    const list = element('ul');
    values.forEach(value => list.append(element('li', '', value)));
    node.append(list);
    return node;
}
export function dataTable(headers: string[], rows: string[][], className = 'data-grid'): HTMLTableElement {
    const table = element('table', className);
    const head = element('thead');
    const heading = element('tr');
    headers.forEach(label => { const th = element('th', '', label); th.scope = 'col'; heading.append(th); });
    head.append(heading);
    const body = element('tbody');
    rows.forEach(cells => {
        const row = element('tr');
        row.dataset.atomic = 'row';
        cells.forEach(value => row.append(element('td', '', value)));
        body.append(row);
    });
    table.append(head, body);
    return table;
}
