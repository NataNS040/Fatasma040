export interface LayoutWarning { code: 'overflow' | 'table-width' | 'split-block' | 'empty-page' | 'sparse-page' | 'footer-overlap' | 'missing-content'; page: number; message: string; severity: 'warning' | 'error'; }

/** Geometria real após paginação; tolerância de 2px para arredondamento de impressão. */
export function inspectLayout(container: HTMLElement, expectedContent: { id: string; text: string }[] = []): LayoutWarning[] {
    const warnings: LayoutWarning[] = [];
    const pages = [...container.querySelectorAll<HTMLElement>('.pagedjs_page')];
    const atomicPages = new Map<string, number>();
    const found = new Set<string>();
    const fragments = new Map<string, string[]>();
    const report = (code: LayoutWarning['code'], page: number, message: string, severity: LayoutWarning['severity'] = 'error'): void => { if (!warnings.some(w => w.code === code && w.page === page && w.message === message)) warnings.push({ code, page, message, severity }); };
    pages.forEach((page, index) => {
        const area = page.querySelector<HTMLElement>('.pagedjs_page_content');
        if (!area) return;
        const bounds = area.getBoundingClientRect();
        const leaves = [...area.querySelectorAll<HTMLElement>('[data-layout-id],img')];
        let bottom = bounds.top;
        for (const leaf of leaves) {
            const rect = leaf.getBoundingClientRect();
            if (!rect.width || !rect.height) continue;
            const id = leaf.dataset.layoutId;
            if (id) { found.add(id); fragments.set(id, [...(fragments.get(id) ?? []), leaf.textContent ?? '']); }
            bottom = Math.max(bottom, rect.bottom);
            if (rect.left < bounds.left - 2 || rect.right > bounds.right + 2 || rect.bottom > bounds.bottom + 2 || rect.top < bounds.top - 2) report('overflow', index + 1, `Conteúdo fora da área imprimível: ${id ?? 'imagem'}.`);
            if (leaf.dataset.atomic && id) {
                if (atomicPages.has(id) && atomicPages.get(id) !== index) report('split-block', index + 1, `Bloco indivisível fragmentado: ${id}.`);
                atomicPages.set(id, index);
            }
        }
        for (const table of area.querySelectorAll('table')) if (table.getBoundingClientRect().width > bounds.width + 2 || table.scrollWidth > table.clientWidth + 2) report('table-width', index + 1, 'Tabela excede a largura imprimível.');
        const footer = page.querySelector('.pagedjs_margin-bottom');
        if (footer && bottom > footer.getBoundingClientRect().top + 2) report('footer-overlap', index + 1, 'Conteúdo invade a região do rodapé.');
        if (!leaves.length) report('empty-page', index + 1, 'Página sem conteúdo.');
        else if (!area.querySelector('.cover') && index !== pages.length - 1 && (bottom - bounds.top) / bounds.height < .25) report('sparse-page', index + 1, 'Página com menos de 25% da altura ocupada.', 'warning');
    });
    const normalized = (text: string): string => text.replace(/[\s\u00ad]/g, '');
    for (const { id, text } of expectedContent) {
        const parts = fragments.get(id) ?? [];
        if (!found.has(id) || (!parts.some(part => normalized(part) === normalized(text)) && normalized(parts.join('')) !== normalized(text))) report('missing-content', 0, `Conteúdo ausente ou incompleto após paginação: ${id}.`);
    }
    return warnings;
}
