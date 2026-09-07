import { regressionFixtures, createRegressionFixture } from '../fixtures/regression';
import { validateProposal } from '../validation/proposal';
import { DocumentPaginator, type ExportPreparation } from '../pagination/engine';
import { element } from '../components/document';
import './quality-lab.css';

if (!import.meta.env.DEV) throw new Error('Quality Lab disponível somente em desenvolvimento.');

const root = document.querySelector<HTMLElement>('#quality-lab')!;
const header = element('header', 'lab-header');
const logo = element('img'); logo.src = new URL('../../../assets/logoengmarq.png', import.meta.url).href; logo.alt = 'EngMarq';
header.append(logo, element('h1', '', 'V2 Quality Lab'), element('span', 'lab-badge', 'Desenvolvimento'));
const controls = element('aside', 'lab-controls');
const selector = element('select'); selector.id = 'lab-fixture'; selector.setAttribute('aria-label', 'Fixture');
for (const fixture of regressionFixtures) { const option = element('option', '', fixture.name); option.value = fixture.id; selector.append(option); }
const mode = element('select'); mode.setAttribute('aria-label', 'Modo do documento');
for (const value of ['', 'compact', 'standard', 'consultive']) { const option = element('option', '', value || 'Modo da fixture'); option.value = value; mode.append(option); }
const testCase = element('select'); testCase.setAttribute('aria-label', 'Caso de validação');
for (const [value, label] of Object.entries({ valid: 'Dados da fixture', 'missing-client': 'Erro: cliente sem nome', 'empty-scope': 'Erro: nenhum serviço', 'missing-investment': 'Erro: investimento ausente', 'missing-participants': 'Erro: participantes ausentes', warnings: 'Avisos: endereço e responsáveis ausentes' })) {
    const option = element('option', '', label); option.value = value; testCase.append(option);
}
const source = element('p', 'lab-source');
const status = element('p', 'lab-status'); status.id = 'lab-status'; status.setAttribute('role', 'status');
const issues = element('ul', 'lab-issues'); issues.id = 'lab-issues';
const exportButton = element('button', '', 'Gerar PDF'); exportButton.id = 'lab-export'; exportButton.disabled = true;
const refresh = element('button', '', 'Atualizar documento'); refresh.type = 'button';
controls.append(element('h2', '', 'Fixtures'), selector, mode, testCase, refresh, exportButton, source, status, issues);
const viewport = element('main', 'lab-viewport');
const pages = element('div', 'lab-pages'); pages.id = 'lab-pages'; viewport.append(pages);
root.append(header, controls, viewport);
const paginator = new DocumentPaginator(pages);
let revision = 0;
let result: ExportPreparation | undefined;
let settled = false;

async function prepare(print = false): Promise<void> {
    const version = ++revision;
    settled = false; result = undefined; exportButton.disabled = true; pages.classList.add('lab-stale');
    issues.replaceChildren(); status.textContent = 'Preparando documento...';
    const proposal = createRegressionFixture(selector.value);
    source.textContent = regressionFixtures.find(fixture => fixture.id === selector.value)!.source;
    if (mode.value) proposal.options.documentMode = mode.value as NonNullable<typeof proposal.options.documentMode>;
    if (testCase.value === 'missing-client') proposal.client.displayName = '';
    if (testCase.value === 'empty-scope') {
        delete proposal.assistanceConfiguration;
        proposal.companies.forEach(company => delete company.assistanceConfig);
        proposal.services = []; proposal.trainings = []; proposal.measurements = []; proposal.assistance = []; proposal.commercial.lines = [];
    }
    if (testCase.value === 'missing-investment') {
        if (proposal.assistanceConfiguration) proposal.companies.forEach(company => { company.assistanceConfig!.pricing = {}; });
        else proposal.commercial.lines = [];
    }
    if (testCase.value === 'missing-participants') {
        if (!proposal.trainings.length) {
            issues.append(element('li', '', 'Selecione uma fixture de treinamento para este caso.'));
            status.textContent = 'Caso não aplicável'; settled = true; return;
        }
        proposal.trainings[0].participants = 0;
    }
    if (testCase.value === 'warnings') {
        proposal.metadata.author.name = ''; delete proposal.client.contact;
        proposal.companies.forEach(company => delete company.address);
    }
    const validation = validateProposal(proposal);
    for (const issue of validation) { const node = element('li', `lab-${issue.severity}`, `${issue.severity === 'error' ? 'Erro' : 'Aviso'}: ${issue.message}`); node.dataset.code = issue.code; issues.append(node); }
    if (validation.some(issue => issue.severity === 'error')) { status.textContent = 'Exportação bloqueada: dados inválidos'; settled = true; return; }
    try {
        const prepared = await paginator.prepareDocumentForExport(proposal);
        if (version !== revision) return;
        result = prepared;
        for (const warning of prepared.warnings) issues.append(element('li', `lab-${warning.severity}`, `Página ${warning.page}: ${warning.message}`));
        status.textContent = prepared.ready ? `${prepared.pages} páginas A4 · Exportação liberada` : 'Exportação bloqueada: layout';
        exportButton.disabled = !prepared.ready; pages.classList.remove('lab-stale');
        if (print && prepared.ready) window.print();
    } catch (error) {
        if (version !== revision) return;
        status.textContent = 'Exportação bloqueada: falha de preparação';
        issues.append(element('li', 'lab-error', error instanceof Error ? error.message : String(error)));
    } finally { if (version === revision) settled = true; }
}
selector.value = new URLSearchParams(location.search).get('fixture') ?? regressionFixtures[0].id;
if (!selector.value) selector.value = regressionFixtures[0].id;
selector.addEventListener('change', () => { history.replaceState(null, '', `?fixture=${selector.value}`); void prepare(); });
mode.addEventListener('change', () => { void prepare(); });
testCase.addEventListener('change', () => { void prepare(); });
refresh.addEventListener('click', () => { void prepare(); });
exportButton.addEventListener('click', () => { void prepare(true); });
Object.assign(window, { engmarqQualityLab: { prepare, get result() { return result; }, get settled() { return settled; } } });
void prepare();