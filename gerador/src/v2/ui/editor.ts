import { DocumentPaginator, type ExportPreparation } from '../pagination/engine';
import { newDraft, newCompany, newSelection, applyEditorPreset, draftProposal, editorPresets, editorCatalog, type Selection, type DraftCompany } from './draft';
import { element as el } from '../components/document';
import type { ParameterDefinition } from '../domain/content';
import type { ServiceFrequency } from '../domain/assistance';
import './editor.css';

const draft = newDraft();
let step = 0;
let revision = 0;
let timer: ReturnType<typeof setTimeout>;
let prepared: ExportPreparation | undefined;
const titles = ['Cliente', 'Escopo', 'Comercial', 'Revisão'];
const frequencies = { once: 'Uma vez', weekly: 'Semanal', monthly: 'Mensal', quarterly: 'Trimestral', semiannual: 'Semestral', annual: 'Anual', 'on-demand': 'Sob demanda' };
const translated: Record<string, string> = { onsite: 'Presencial', online: 'Online', hybrid: 'Híbrida', point: 'Ponto', sample: 'Amostra', dosimetry: 'Dosimetria' };
const app = document.querySelector<HTMLElement>('#app')!;
const top = el('header', 'app-header');
const brand = el('div', 'brand');
const logo = el('img'); logo.src = new URL('../../../assets/logoengmarq.png', import.meta.url).href; logo.alt = 'EngMarq Solution';
brand.append(logo, el('span', 'brand-divider'), el('span', '', 'Gerador de propostas'));
const exportButton = button('Gerar PDF', () => { void prepare(true); }, 'primary'); exportButton.id = 'editor-export'; exportButton.disabled = true;
top.append(brand, el('span', 'session-note', 'Rascunho nesta sessão'), exportButton);
const workspace = el('main', 'workspace');
const editor = el('section', 'editor-pane'); editor.setAttribute('aria-label', 'Configuração da proposta');
const nav = el('nav', 'steps'); nav.setAttribute('aria-label', 'Etapas da proposta');
const form = el('div', 'form-content');
const bottom = el('div', 'form-navigation');
editor.append(nav, form, bottom);
const preview = el('section', 'preview-pane'); preview.setAttribute('aria-label', 'Preview da proposta');
const previewBar = el('div', 'preview-bar');
const status = el('p', '', 'Preencha os dados para visualizar a proposta.'); status.id = 'editor-status'; status.setAttribute('role', 'status');
const mobileToggle = button('Ver preview', () => { const active = workspace.classList.toggle('show-preview'); mobileToggle.textContent = active ? 'Voltar ao formulário' : 'Ver preview'; }, 'mobile-preview');
const checks = el('div', 'checks'); checks.setAttribute('aria-label', 'Validação da proposta');
const pages = el('div', 'editor-pages'); pages.id = 'editor-pages';
const pageViewport = el('div', 'page-viewport'); pageViewport.append(pages);
const placeholder = el('div', 'preview-placeholder'); placeholder.append(el('span', 'paper-icon', 'A4'), el('h2', '', 'Sua próxima proposta começa aqui'), el('p', '', 'Preencha o cliente, escolha os serviços e defina o investimento. O documento aparece automaticamente.'));
previewBar.append(el('strong', '', 'Documento A4'), status, checks);
preview.append(previewBar, placeholder, pageViewport);
workspace.append(editor, preview); app.append(top, mobileToggle, workspace);
const paginator = new DocumentPaginator(pages);
let activePreparations = 0;
function fitPages(): void {
    if (activePreparations) return;
    const width = Math.min(794, Math.max(250, preview.clientWidth - 48));
    pages.style.zoom = String(width / 794);
}
const resize = new ResizeObserver(fitPages); resize.observe(preview);

function button(label: string, action: () => void, className = ''): HTMLButtonElement { const b = el('button', className, label); b.type = 'button'; b.addEventListener('click', action); return b; }
function changed(structural = false): void {
    revision++; prepared = undefined; exportButton.disabled = true; pages.classList.add('stale');
    if (structural) render();
    clearTimeout(timer); validate(); timer = setTimeout(() => { void prepare(); }, 550);
}
function field(label: string, value: string, write: (value: string) => void, type = 'text', hint = ''): HTMLElement {
    const wrapper = el('label', `field ${type === 'textarea' ? 'wide' : ''}`);
    wrapper.append(el('span', '', label));
    const input = type === 'textarea' ? el('textarea') : el('input');
    input.setAttribute('aria-label', label);
    input.required = label.includes('*');
    if (input instanceof HTMLInputElement) { input.type = type; if (type === 'number') { input.min = '0'; input.step = 'any'; } }
    input.value = value; input.addEventListener('input', () => { write(input.value); changed(); });
    wrapper.append(input); if (hint) wrapper.append(el('small', '', hint)); return wrapper;
}
function select(label: string, value: string, options: Record<string, string>, write: (value: string) => void, structural = false): HTMLElement {
    const wrapper = el('label', 'field'); wrapper.append(el('span', '', label)); const input = el('select');
    input.setAttribute('aria-label', label);
    Object.entries(options).forEach(([key, text]) => { const option = el('option', '', text); option.value = key; input.append(option); });
    input.value = value; input.addEventListener('change', () => { write(input.value); changed(structural); }); wrapper.append(input); return wrapper;
}
function toggle(label: string, value: boolean, write: (value: boolean) => void, structural = true): HTMLElement {
    const wrapper = el('label', 'toggle'); const input = el('input'); input.type = 'checkbox'; input.checked = value;
    input.setAttribute('aria-label', label);
    input.addEventListener('change', () => { write(input.checked); changed(structural); }); wrapper.append(input, el('span', '', label)); return wrapper;
}
function grid(...nodes: HTMLElement[]): HTMLElement { const g = el('div', 'field-grid'); g.append(...nodes); return g; }
function heading(title: string, description: string): void { form.append(el('p', 'eyebrow', `ETAPA ${step + 1} DE 4`), el('h1', '', title), el('p', 'description', description)); }
function companyFields(c: DraftCompany, index: number): HTMLElement {
    const card = el('section', 'form-card'); const title = el('div', 'card-title'); title.append(el('h2', '', `Empresa ${index + 1}`));
    if (draft.isGroup && draft.companies.length > 2) title.append(button('Remover empresa', () => { draft.companies = draft.companies.filter(company => company !== c); changed(true); }, 'text-button danger'));
    card.append(title, grid(
        field('Razão social *', c.legalName, v => c.legalName = v), field('Nome fantasia', c.tradeName, v => c.tradeName = v),
        field('CNPJ', c.taxId, v => c.taxId = v, 'text', 'Opcional · somente conferência de formato'), field('Colaboradores', c.employees, v => c.employees = v, 'number'),
        field('Endereço', c.street, v => c.street = v), field('Cidade', c.city, v => c.city = v),
        field('UF', c.state, v => c.state = v.toUpperCase()), field('CEP', c.postalCode, v => c.postalCode = v),
        field('Funções', c.roles, v => c.roles = v, 'textarea', 'Uma função por linha')
    )); return card;
}
function parameter(def: ParameterDefinition, selection: Selection): HTMLElement {
    const value = selection.parameters[def.id];
    const label = `${def.label}${def.required ? ' *' : ''}${def.type === 'number' && def.unit ? ` (${def.unit})` : ''}`;
    if (def.type === 'choice') return select(label, String(value ?? ''), { '': 'Selecione', ...Object.fromEntries(def.choices.map(c => [c, translated[c] ?? c])) }, v => selection.parameters[def.id] = v);
    if (def.type === 'list' && def.choices) {
        const group = el('fieldset', 'choice-list'); group.append(el('legend', '', label));
        for (const choice of def.choices) group.append(toggle(choice, Array.isArray(value) && value.includes(choice), selected => {
            const current = selection.parameters[def.id]; const values = Array.isArray(current) ? current : [];
            selection.parameters[def.id] = selected ? [...values, choice] : values.filter(v => v !== choice);
        }, false));
        return group;
    }
    return field(label, Array.isArray(value) ? value.join('\n') : String(value ?? ''), v => {
        if (def.type === 'number') { if (v === '') delete selection.parameters[def.id]; else selection.parameters[def.id] = Number(v); }
        else selection.parameters[def.id] = def.type === 'list' ? v.split('\n').map(s => s.trim()).filter(Boolean) : v;
    }, def.type === 'number' ? 'number' : def.type === 'list' ? 'textarea' : 'text', def.type === 'list' ? 'Um item por linha' : '');
}
function selectionFields(id: string, selection: Selection): HTMLElement {
    const entry = editorCatalog.find(e => e.id === id)!;
    const fields = grid(...entry.content.profile.parameters.map(def => parameter(def, selection)));
    if (entry.kind === 'training') fields.append(select('Frequência', selection.frequency, frequencies, v => selection.frequency = v as ServiceFrequency));
    if (entry.kind === 'measurement') fields.append(select('Contratação', selection.separate ? 'separate' : 'included', { included: 'Incluída no investimento', separate: 'Orçamento separado' }, v => selection.separate = v === 'separate'));
    fields.append(field('Observações', selection.notes, v => selection.notes = v, 'textarea'));
    return fields;
}
function scopeFields(): void {
    const presets = el('div', 'presets');
    for (const preset of editorPresets) {
        const b = button('', () => { applyEditorPreset(draft, preset.id); changed(true); }, 'preset');
        b.append(el('strong', '', preset.name), el('small', '', preset.description)); presets.append(b);
    }
    form.append(presets, el('p', 'hint', 'Atalhos adicionam serviços. Tudo continua editável abaixo.'), toggle('Ativar assessoria em SST', draft.assistance, v => draft.assistance = v));
    for (const [category, label] of Object.entries({ programs: 'Programas e laudos', management: 'Gestão e complementos', measurements: 'Medições', trainings: 'Treinamentos' })) {
        const group = el('section', 'catalog-group'); group.append(el('h2', '', label));
        for (const entry of editorCatalog.filter(e => e.content.profile.category === category)) {
            const card = el('div', 'service-option');
            card.append(toggle(entry.content.profile.shortName, Boolean(draft.selections[entry.id]), active => {
                if (active) draft.selections[entry.id] = newSelection(entry.id);
                else { delete draft.selections[entry.id]; draft.companies.forEach(c => delete c.overrides[entry.id]); }
            }));
            if (draft.selections[entry.id]) { card.classList.add('selected'); card.append(el('p', 'hint', entry.content.profile.summary), selectionFields(entry.id, draft.selections[entry.id])); }
            group.append(card);
        }
        form.append(group);
    }
    form.append(el('h2', '', 'Visitas técnicas'), toggle('Incluir visitas', draft.visits, v => draft.visits = v));
    if (draft.visits) form.append(grid(field('Quantidade total de visitas *', draft.visitQuantity, v => draft.visitQuantity = v, 'number'), field('Duração por visita (horas) *', draft.visitHours, v => draft.visitHours = v, 'number'), select('Frequência das visitas', draft.visitFrequency, frequencies, v => draft.visitFrequency = v as ServiceFrequency), field('Observações das visitas', draft.visitNotes, v => draft.visitNotes = v, 'textarea')));
    if (draft.isGroup && (Object.keys(draft.selections).length || draft.visits)) {
        form.append(el('h2', '', 'Configurações por empresa'), el('p', 'hint', 'O escopo acima é comum. Personalize os parâmetros apenas onde houver diferenças.'));
        for (const c of draft.companies) {
            const detail = el('details', 'form-card'); detail.append(el('summary', '', c.legalName || 'Empresa sem nome'));
            if (draft.visits) {
                detail.append(toggle('Personalizar visitas', Boolean(c.visits), active => {
                    if (active) c.visits = { quantity: draft.visitQuantity, hours: draft.visitHours, frequency: draft.visitFrequency, notes: draft.visitNotes };
                    else delete c.visits;
                }));
                if (c.visits) { const plan = c.visits; detail.append(grid(field('Quantidade total de visitas *', plan.quantity, v => plan.quantity = v, 'number'), field('Duração por visita (horas) *', plan.hours, v => plan.hours = v, 'number'), select('Frequência das visitas', plan.frequency, frequencies, v => plan.frequency = v as ServiceFrequency), field('Observações das visitas', plan.notes, v => plan.notes = v, 'textarea'))); }
            }
            for (const id of Object.keys(draft.selections)) {
                const row = el('div', 'company-override'); const name = editorCatalog.find(e => e.id === id)!.content.profile.shortName;
                row.append(toggle(`Personalizar ${name}`, Boolean(c.overrides[id]), active => { if (active) c.overrides[id] = structuredClone(draft.selections[id]); else delete c.overrides[id]; }));
                if (c.overrides[id]) row.append(selectionFields(id, c.overrides[id])); detail.append(row);
            }
            form.append(detail);
        }
    }
    const detail = el('details', 'form-card'); detail.append(el('summary', '', 'Texto e apresentação do documento'), grid(
        field('Título da proposta *', draft.title, v => draft.title = v), select('Detalhamento', draft.detail, { summary: 'Resumido', standard: 'Padrão', full: 'Completo' }, v => draft.detail = v as typeof draft.detail),
        field('Objetivo *', draft.objective, v => draft.objective = v, 'textarea'), field('Exclusões', draft.exclusions, v => draft.exclusions = v, 'textarea'), field('Premissas', draft.assumptions, v => draft.assumptions = v, 'textarea')
    ), toggle('Incluir capa', draft.cover, v => draft.cover = v, false), toggle('Incluir aceite e assinaturas', draft.acceptance, v => draft.acceptance = v, false)); form.append(detail);
}
function render(): void {
    const scroll = form.scrollTop;
    const openDetails = [...form.querySelectorAll('details[open] summary')].map(n => n.textContent);
    nav.replaceChildren(...titles.map((title, i) => { const b = button(`${i + 1}  ${title}`, () => { step = i; render(); form.scrollTop = 0; }); b.classList.toggle('active', i === step); if (i === step) b.setAttribute('aria-current', 'step'); return b; }));
    form.replaceChildren(); heading(titles[step], ['Quem receberá a proposta? Cadastre os dados e as empresas atendidas.', 'Escolha um atalho ou monte sua combinação de serviços.', 'Defina o investimento e o que será exibido no documento.', 'Confira as informações e o documento antes de gerar o PDF.'][step]);
    if (step < 3) form.append(el('div', 'step-issues'));
    if (step === 0) {
        form.append(select('Tipo de cliente', draft.isGroup ? 'group' : 'single', { single: 'Empresa única', group: 'Grupo empresarial' }, v => { draft.isGroup = v === 'group'; if (draft.isGroup && draft.companies.length < 2) draft.companies.push(newCompany(crypto.randomUUID())); }, true));
        if (draft.isGroup) form.append(field('Nome do grupo *', draft.groupName, v => draft.groupName = v));
        (draft.isGroup ? draft.companies : draft.companies.slice(0, 1)).forEach((c, i) => form.append(companyFields(c, i)));
        if (draft.isGroup) form.append(button('+ Adicionar empresa', () => { draft.companies.push(newCompany(crypto.randomUUID())); changed(true); }, 'secondary'));
        form.append(el('h2', '', 'Contato e identificação'), grid(field('Responsável do cliente *', draft.contact, v => draft.contact = v), field('E-mail do contato', draft.email, v => draft.email = v, 'email'), field('Número da proposta *', draft.number, v => draft.number = v), field('Data de emissão *', draft.date, v => draft.date = v, 'date'), field('Responsável EngMarq *', draft.author, v => draft.author = v)));
    }
    if (step === 1) scopeFields();
    if (step === 2) {
        form.append(select('Tipo de cobrança', draft.charge, { once: 'Valor único', monthly: 'Mensalidade', both: 'Valor único + mensalidade' }, v => draft.charge = v as typeof draft.charge, true), el('p', 'hint', 'Valores totais por empresa. Quantidades e parcelas não multiplicam automaticamente o investimento. Use reais, por exemplo 1500,00.'));
        for (const c of draft.isGroup ? draft.companies : draft.companies.slice(0, 1)) {
            const card = el('section', 'form-card'); card.append(el('h2', '', c.legalName || 'Empresa sem nome')); const fields = grid();
            if (draft.charge !== 'monthly') fields.append(field('Investimento único (R$) *', c.once, v => c.once = v));
            if (draft.charge !== 'once') fields.append(field('Mensalidade (R$) *', c.monthly, v => c.monthly = v)); card.append(fields); form.append(card);
        }
        form.append(grid(field('Quantidade de parcelas *', draft.installments, v => draft.installments = v, 'number'), field('Vigência (meses) *', draft.term, v => draft.term = v, 'number'), field('Validade da proposta (dias) *', draft.validity, v => draft.validity = v, 'number'), field('Condições de pagamento *', draft.payment, v => draft.payment = v, 'textarea'), field('Condições de execução', draft.execution, v => draft.execution = v, 'textarea')));
        form.append(el('h2', '', 'Valores exibidos no documento'), toggle('Exibir mensalidade', draft.showMonthlyValue, v => draft.showMonthlyValue = v, false), toggle('Exibir valor total do contrato', draft.showContractTotal, v => draft.showContractTotal = v, false), toggle('Exibir total agregado', draft.showAggregateTotal, v => draft.showAggregateTotal = v, false), toggle('Exibir valores por empresa', draft.showPerCompanyPricing, v => draft.showPerCompanyPricing = v, false), el('p', 'hint', 'Você pode contratar 12 mensalidades sem exibir o valor total do contrato ou do grupo.'));
    }
    if (step === 3) {
        const summary = el('section', 'form-card'); summary.append(el('h2', '', draft.isGroup ? draft.groupName || 'Grupo empresarial' : draft.companies[0].legalName || 'Cliente não informado'), el('p', '', `${draft.isGroup ? draft.companies.length : 1} empresa(s) · ${Object.keys(draft.selections).length} serviço(s) selecionado(s)${draft.assistance ? ' · Assessoria SST' : ''}`), el('p', '', 'Confira nomes, quantidades, valores e condições nas páginas ao lado.'));
        form.append(summary, el('div', 'review-issues'), el('p', 'hint', 'Para salvar: escolha “Salvar como PDF”, papel A4, escala 100% e desative os cabeçalhos e rodapés do navegador.'));
    }
    bottom.replaceChildren(button('← Voltar', () => { step--; render(); form.scrollTop = 0; }, 'secondary'), el('span', '', `${step + 1} / 4`), button(step === 3 ? 'Conferir documento' : 'Continuar →', () => { if (step < 3) { step++; render(); form.scrollTop = 0; } else { void prepare(); workspace.classList.add('show-preview'); mobileToggle.textContent = 'Voltar ao formulário'; } }, 'primary'));
    (bottom.firstChild as HTMLButtonElement).disabled = step === 0;
    form.querySelectorAll('details').forEach(n => { if (openDetails.includes(n.querySelector('summary')?.textContent ?? '')) n.open = true; });
    form.scrollTop = scroll; validate();
}
function validate(): ReturnType<typeof draftProposal> {
    const result = draftProposal(draft);
    checks.replaceChildren(...[...titles.slice(0, 3), 'Layout'].map((title, i) => {
        const valid = i === 3 ? Boolean(prepared?.ready) : !result.issues.some(issue => issue.step === i);
        return el('span', valid ? 'check valid' : 'check', `${valid ? '✓' : '○'} ${title}`);
    }));
    const issueArea = form.querySelector('.review-issues');
    const localIssues = form.querySelector('.step-issues');
    if (localIssues) localIssues.replaceChildren(...result.issues.filter(issue => issue.step === step).map(issue => el('p', 'field-warning', issue.message)));
    if (issueArea) {
        issueArea.replaceChildren(el('h2', '', result.issues.length ? 'Antes de gerar' : prepared?.ready ? 'Pronto para gerar' : 'Conferindo o layout'));
        for (const issue of result.issues) issueArea.append(button(`${titles[issue.step]} · ${issue.message}`, () => { step = issue.step; render(); }, 'issue-link'));
        if (prepared) {
            for (const warning of prepared.warnings) issueArea.append(el('p', 'notice', warning.severity === 'error' ? 'Uma página precisa de ajuste. Reduza o conteúdo de observações ou divida os itens longos antes de gerar.' : 'Confira o aproveitamento de espaço das páginas.'));
            if (prepared.validationWarnings.length) issueArea.append(el('p', 'notice', 'O conteúdo técnico do catálogo deve ser revisado pelo responsável antes do envio ao cliente.'));
        }
    }
    if (result.issues.length) { status.textContent = 'Rascunho · complete os campos indicados na revisão.'; exportButton.disabled = true; }
    return result;
}
async function prepare(print = false): Promise<void> {
    clearTimeout(timer);
    const version = revision;
    const { proposal } = validate();
    if (!proposal) return;
    exportButton.disabled = true;
    status.textContent = 'Atualizando documento e conferindo as páginas…';
    activePreparations++; pages.style.zoom = '1';
    try {
        const result = await paginator.prepareDocumentForExport(proposal);
        if (version !== revision) return;
        prepared = result; pages.classList.remove('stale'); placeholder.hidden = true;
        status.textContent = result.ready ? `Pronto para gerar · ${result.pages} páginas A4` : 'O documento precisa de ajustes de layout. Confira a revisão.';
        exportButton.disabled = !result.ready; validate();
        if (print && result.ready) window.print();
    } catch {
        if (version !== revision) return;
        prepared = undefined; exportButton.disabled = true;
        status.textContent = 'Não foi possível preparar o documento. Confira os campos e tente novamente na revisão.';
        validate();
    } finally { activePreparations--; fitPages(); }
}
render();
