import { singleProposal, universalCatalogProposal, tm136AssistanceProposal, tm137GroupProposal } from '../fixtures/proposals';
import { DocumentPaginator, type ExportPreparation } from '../pagination/engine';
import './preview.css';

const scenarios = { short: singleProposal, medium: () => {
    const proposal = universalCatalogProposal();
    proposal.options.detailLevel = 'standard';
    proposal.services.forEach(service => { service.detailLevel = 'standard'; });
    return proposal;
}, assistance: tm136AssistanceProposal, group: tm137GroupProposal };
const selector = document.querySelector<HTMLSelectElement>('#scenario')!;
const button = document.querySelector<HTMLButtonElement>('#export')!;
const status = document.querySelector<HTMLElement>('#status')!;
const warnings = document.querySelector<HTMLElement>('#warnings')!;
const paginator = new DocumentPaginator(document.querySelector<HTMLElement>('#pages')!);
let generation = 0;
let prepared: ExportPreparation | undefined;
async function prepareDocumentForExport(): Promise<ExportPreparation> {
    const current = ++generation;
    button.disabled = true; prepared = undefined; status.textContent = 'Carregando fontes e imagens, paginando e verificando layout…';
    const factory = scenarios[selector.value as keyof typeof scenarios] ?? scenarios.short;
    try {
        const result = await paginator.prepareDocumentForExport(factory());
        if (current === generation) {
            prepared = result; button.disabled = !result.ready;
            status.textContent = `${result.pages} páginas A4 · ${result.ready ? 'Pronto para impressão' : 'Corrija os problemas de layout antes de exportar'}`;
            warnings.replaceChildren(...[...result.warnings.map(w => `Página ${w.page}: ${w.message}`), ...new Set(result.validationWarnings)].map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
        }
        return result;
    } catch (error) { if (current === generation) status.textContent = `Falha: ${error instanceof Error ? error.message : error}`; throw error; }
}
selector.value = new URLSearchParams(location.search).get('scenario') ?? 'short';
selector.addEventListener('change', () => { void prepareDocumentForExport().catch(() => undefined); });
button.addEventListener('click', () => { void prepareDocumentForExport().then(result => { if (result.ready && result === prepared) window.print(); }).catch(() => undefined); });
Object.assign(window, { engmarqV2: { prepareDocumentForExport, get result() { return prepared; } } });
void prepareDocumentForExport().catch(() => undefined);
