import { getCatalogEntry, listCatalogEntries } from '../catalog/services';
import { createCatalogItem } from '../catalog/select-service';
import { createAssistanceProposal, resolveAssistanceProposal } from '../configurator/assistance';
import { composeProposal } from '../composer/compose-proposal';
import type { Company, Proposal, ProposalItem } from '../domain/proposal';
import type { ParameterValues, DetailLevel } from '../domain/content';
import type { AssistanceConfiguration, ServiceFrequency } from '../domain/assistance';
import { validateParameterValue } from '../validation/parameters';
import { isCivilDate } from '../utils/value';

export interface Selection { parameters: ParameterValues; notes: string; frequency: ServiceFrequency; separate: boolean; }
export interface DraftCompany {
    id: string; legalName: string; tradeName: string; taxId: string; street: string; city: string; state: string; postalCode: string;
    employees: string; roles: string; once: string; monthly: string; overrides: Record<string, Selection>;
    visits?: { quantity: string; hours: string; frequency: ServiceFrequency; notes: string };
}
export interface EditorDraft {
    isGroup: boolean; groupName: string; companies: DraftCompany[]; contact: string; email: string; author: string;
    number: string; date: string; title: string; objective: string; exclusions: string; assumptions: string;
    selections: Record<string, Selection>; assistance: boolean; visits: boolean; visitQuantity: string; visitHours: string; visitFrequency: ServiceFrequency; visitNotes: string;
    charge: 'once' | 'monthly' | 'both'; term: string; installments: string; validity: string; payment: string; execution: string;
    showMonthlyValue: boolean; showContractTotal: boolean; showAggregateTotal: boolean; showPerCompanyPricing: boolean;
    detail: DetailLevel; cover: boolean; acceptance: boolean;
}
export const editorPresets = [
    { id: 'pgr', name: 'PGR', description: 'Gerenciamento de riscos', services: ['pgr'] },
    { id: 'pcmso', name: 'PCMSO', description: 'Saúde ocupacional', services: ['pcmso'] },
    { id: 'kit', name: 'Kit SST', description: 'PGR, PCMSO e LTCAT', services: ['pgr', 'pcmso', 'ltcat'] },
    { id: 'complete', name: 'Combo completo', description: 'Kit + LIP e ART', services: ['pgr', 'pcmso', 'ltcat', 'lip', 'art'] },
    { id: 'psychosocial', name: 'Psicossocial', description: 'Avaliação de fatores', services: ['psychosocial'] },
    { id: 'brigade', name: 'Brigada', description: 'Capacitação da equipe', services: ['brigade'] },
    { id: 'assistance', name: 'Assessoria', description: 'Programas e gestão de SST', services: ['pgr', 'pcmso', 'ltcat', 'lip', 'art', 'esocial', 'technical-support'] }
];
export function newCompany(id: string): DraftCompany {
    return { id, legalName: '', tradeName: '', taxId: '', street: '', city: '', state: '', postalCode: '', employees: '', roles: '', once: '', monthly: '', overrides: {} };
}
export function newDraft(): EditorDraft {
    const now = new Date();
    return {
        isGroup: false, groupName: '', companies: [newCompany('company-1')], contact: '', email: '', author: 'Equipe EngMarq',
        number: '', date: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`,
        title: 'Proposta técnica e comercial', objective: 'Prestação dos serviços de SST selecionados, conforme escopo e condições desta proposta.',
        exclusions: 'Serviços não selecionados dependem de contratação específica.', assumptions: 'Disponibilização das informações e acesso aos locais pela contratante.',
        selections: {}, assistance: false, visits: false, visitQuantity: '1', visitHours: '4', visitFrequency: 'monthly', visitNotes: '',
        charge: 'once', term: '12', installments: '1', validity: '15', payment: 'Pagamento conforme condições acordadas entre as partes.', execution: 'Cronograma alinhado após aprovação e recebimento das informações.',
        showMonthlyValue: true, showContractTotal: false, showAggregateTotal: false, showPerCompanyPricing: true, detail: 'standard', cover: true, acceptance: true
    };
}
export function newSelection(id: string): Selection {
    const parameters: ParameterValues = {};
    for (const def of getCatalogEntry(id).content.profile.parameters) {
        if (def.type === 'choice') parameters[def.id] = def.choices[0];
        else if (def.type === 'list') parameters[def.id] = def.choices ? [...def.choices] : [];
        else if (def.type === 'text') parameters[def.id] = '';
    }
    const defaults: Record<string, ParameterValues> = {
        art: { quantity: 1, coveredServices: ['Serviços de engenharia selecionados, a confirmar pelo responsável técnico'] },
        esocial: { servicePeriod: '12 meses' }, 'technical-support': { channels: ['E-mail', 'Atendimento remoto'], servicePeriod: '12 meses' },
        psychosocial: { instruments: ['Instrumento definido no planejamento técnico'], integration: 'Integração à gestão de riscos da empresa.' }
    };
    Object.assign(parameters, defaults[id] ?? {});
    return { parameters, notes: '', frequency: 'once', separate: false };
}
/** Presets adicionam seleções, preservando campos e personalizações já preenchidos. */
export function applyEditorPreset(draft: EditorDraft, id: string): void {
    const preset = editorPresets.find(p => p.id === id);
    if (!preset) return;
    for (const service of preset.services) draft.selections[service] ??= newSelection(service);
    if (id === 'assistance') { draft.assistance = true; draft.charge = 'monthly'; draft.installments = '12'; }
}
export type DraftIssue = { step: number; message: string };
const lines = (value: string): string[] => value.split('\n').map(s => s.trim()).filter(Boolean);
export function parseMoney(value: string): number | undefined {
    if (!/^\d+(?:[.,]\d{1,2})?$/.test(value.trim())) return undefined;
    const [whole, fraction = ''] = value.trim().replace(',', '.').split('.');
    const cents = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
    return Number.isSafeInteger(cents) ? cents : undefined;
}
export function draftProposal(d: EditorDraft): { proposal?: Proposal; issues: DraftIssue[] } {
    const issues: DraftIssue[] = [];
    const add = (step: number, message: string): void => { issues.push({ step, message }); };
    const companies = d.isGroup ? d.companies : d.companies.slice(0, 1);
    if (d.isGroup && (!d.groupName.trim() || companies.length < 2)) add(0, 'Informe o nome do grupo e cadastre pelo menos duas empresas.');
    if (!d.number.trim()) add(0, 'Informe o número da proposta.');
    if (!isCivilDate(d.date)) add(0, 'Informe uma data de emissão válida.');
    if (!d.author.trim() || !d.contact.trim()) add(0, 'Informe o responsável da EngMarq e o contato do cliente.');
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) add(0, 'Confira o e-mail do contato.');
    for (const [i, c] of companies.entries()) {
        if (!c.legalName.trim()) add(0, `Informe a razão social da empresa ${i + 1}.`);
        if (c.taxId && c.taxId.replace(/\D/g, '').length !== 14) add(0, `Confira os 14 dígitos do CNPJ de ${c.legalName || `empresa ${i + 1}`}.`);
        if (c.postalCode && c.postalCode.replace(/\D/g, '').length !== 8) add(0, `Confira o CEP de ${c.legalName || `empresa ${i + 1}`}.`);
        if (c.street || c.city || c.state) if (!c.street || !c.city || !/^[A-Za-z]{2}$/.test(c.state)) add(0, `Complete endereço, cidade e UF de ${c.legalName || `empresa ${i + 1}`}.`);
        if (c.employees && (!Number.isSafeInteger(Number(c.employees)) || Number(c.employees) < 0)) add(0, 'O número de colaboradores deve ser inteiro e positivo ou zero.');
        if (d.charge !== 'monthly' && parseMoney(c.once) === undefined) add(2, `Informe o investimento de ${c.legalName || `empresa ${i + 1}`} em reais, por exemplo 1500,00.`);
        if (d.charge !== 'once' && parseMoney(c.monthly) === undefined) add(2, `Informe a mensalidade de ${c.legalName || `empresa ${i + 1}`} em reais.`);
    }
    if (!Object.keys(d.selections).length && !d.assistance && !d.visits) add(1, 'Selecione ao menos um serviço ou ative a assessoria.');
    if (!d.objective.trim() || !d.title.trim()) add(1, 'Preencha o título e o objetivo da proposta.');
    for (const [label, value] of [['Vigência', d.term], ['Parcelas', d.installments], ['Validade', d.validity]]) if (!Number.isSafeInteger(Number(value)) || Number(value) < 1) add(2, `${label}: informe um número inteiro maior que zero.`);
    if (!d.payment.trim()) add(2, 'Informe as condições de pagamento.');
    const mapped: Company[] = companies.map(c => ({ id: c.id, legalName: c.legalName.trim(), tradeName: c.tradeName.trim() || undefined, taxId: c.taxId || undefined,
        ...(c.street ? { address: { street: c.street, city: c.city, state: c.state.toUpperCase(), postalCode: c.postalCode || undefined } } : {}), employeeCount: c.employees ? Number(c.employees) : undefined, roles: lines(c.roles), roleCount: lines(c.roles).length || undefined }));
    const proposal: Proposal = {
        schemaVersion: 2, isGroup: d.isGroup, groupName: d.isGroup ? d.groupName : undefined,
        metadata: { id: 'editor-session', number: d.number, issuedOn: d.date, revision: 0, title: d.title, author: { name: d.author } },
        client: { kind: d.isGroup ? 'group' : 'single', displayName: d.isGroup ? d.groupName : companies[0].tradeName || companies[0].legalName, contact: { name: d.contact, email: d.email || undefined } }, companies: mapped,
        scope: { objective: d.objective, exclusions: lines(d.exclusions), assumptions: lines(d.assumptions) }, services: [], trainings: [], measurements: [], assistance: [],
        commercial: { currency: 'BRL', lines: [], termMonths: Number(d.term), installmentCount: Number(d.installments), validityDays: Number(d.validity), paymentTerms: lines(d.payment), executionTerms: lines(d.execution), showMonthlyValue: d.showMonthlyValue, showContractTotal: d.showContractTotal, showAggregateTotal: d.showAggregateTotal, showPerCompanyPricing: d.showPerCompanyPricing },
        options: { detailLevel: d.detail, includeCover: d.cover, includeAcceptance: d.acceptance }
    };
    const visits: AssistanceConfiguration['visits'] = d.visits ? { included: true, quantity: Number(d.visitQuantity), durationHours: Number(d.visitHours), frequency: d.visitFrequency, notes: d.visitNotes } : { included: false };
    if (d.visits && (!Number.isSafeInteger(Number(d.visitQuantity)) || Number(d.visitQuantity) < 1 || Number(d.visitHours) <= 0 || !Number.isFinite(Number(d.visitHours)))) add(1, 'Informe a quantidade total e duração das visitas.');
    const common: AssistanceConfiguration = { visits, renewal: 'Mediante acordo entre as partes.', adjustment: 'Conforme condições contratuais.' };
    for (const [index, c] of companies.entries()) {
        const config: NonNullable<Company['assistanceConfig']> = { pricing: { onceCents: d.charge !== 'monthly' ? parseMoney(c.once) : 0, monthlyCents: d.charge !== 'once' ? parseMoney(c.monthly) : 0 }, programs: {}, management: {}, trainings: {}, measurements: {} };
        const ownVisits = c.visits;
        const companyVisits = d.visits && ownVisits ? { included: true as const, quantity: Number(ownVisits.quantity), durationHours: Number(ownVisits.hours), frequency: ownVisits.frequency, notes: ownVisits.notes } : visits;
        const visitsValid = !companyVisits.included || Number.isSafeInteger(companyVisits.quantity) && companyVisits.quantity > 0 && Number.isFinite(companyVisits.durationHours) && companyVisits.durationHours >= .25;
        if (!visitsValid) add(1, `Confira quantidade e duração das visitas de ${c.legalName || 'esta empresa'}.`);
        config.visits = companyVisits;
        const items: ProposalItem[] = [];
        for (const [id, shared] of Object.entries(d.selections)) {
            const selection = c.overrides[id] ?? shared;
            const entry = getCatalogEntry(id);
            const parameters = { ...selection.parameters };
            for (const definition of entry.content.profile.parameters) {
                const value = parameters[definition.id];
                if (!definition.required && (value === '' || Array.isArray(value) && !value.length)) delete parameters[definition.id];
            }
            const invalid = entry.content.profile.parameters.filter(def => validateParameterValue(def, parameters[def.id]));
            if (invalid.length) {
                add(1, `${entry.content.profile.shortName} · ${c.legalName || `empresa ${index + 1}`}: confira ${invalid.map(def => def.type === 'number' ? `${def.label.toLowerCase()} (mínimo ${def.min}${def.integer ? ', inteiro' : ''})` : def.label.toLowerCase()).join('; ')}.`);
                continue;
            }
            try {
                const item = createCatalogItem(id, { id: `${c.id}:${id}`, companyId: c.id, parameters });
                item.notes = selection.notes;
                if (item.kind === 'training') { item.frequency = selection.frequency; config.trainings![id as keyof NonNullable<typeof config.trainings>] = { ...item, selected: true }; }
                else if (item.kind === 'measurement') { item.pricingMode = selection.separate ? 'separate-quote' : 'included'; config.measurements![id as keyof NonNullable<typeof config.measurements>] = { ...item, selected: true }; }
                else {
                    const category = entry.content.profile.category === 'programs' ? config.programs! : config.management!;
                    Object.assign(category, { [id]: { selected: true, parameters, notes: selection.notes } });
                }
                items.push(item);
            } catch { add(1, `Revise os campos obrigatórios de ${entry.content.profile.shortName} para ${c.legalName || `empresa ${index + 1}`}.`); }
        }
        if (d.assistance) { mapped[index].assistanceConfig = config; continue; }
        if (companyVisits.included && visitsValid) {
            const visit = createCatalogItem('technical-visit', { id: `${c.id}:visits`, companyId: c.id, parameters: { visits: companyVisits.quantity, hours: companyVisits.durationHours, locations: [c.street || c.legalName || 'Local a confirmar'] } });
            const names: Record<ServiceFrequency, string> = { once: 'uma vez', weekly: 'semanal', monthly: 'mensal', quarterly: 'trimestral', semiannual: 'semestral', annual: 'anual', 'on-demand': 'sob demanda' };
            visit.notes = `Frequência: ${names[companyVisits.frequency]}. ${companyVisits.notes ?? ''}`;
            items.push(visit);
        }
        const included = items.filter(item => item.kind !== 'measurement' || item.pricingMode !== 'separate-quote');
        if (!included.length) add(1, `Selecione ao menos um serviço incluído para ${c.legalName || 'a empresa'}.`);
        for (const item of items) {
            if (item.kind === 'training') proposal.trainings.push(item);
            else if (item.kind === 'measurement') proposal.measurements.push(item);
            else if (item.kind === 'assistance') proposal.assistance.push(item);
            else proposal.services.push(item);
            proposal.commercial.lines.push({ itemId: item.id, price: item.kind === 'measurement' && item.pricingMode === 'separate-quote' ? { mode: 'separate-quote' } : item === included[0] ? { mode: 'package', onceCents: config.pricing.onceCents ?? 0, monthlyCents: config.pricing.monthlyCents ?? 0 } : { mode: 'included', coveredByItemId: included[0]?.id ?? '' } });
        }
    }
    if (issues.length) return { issues };
    let final = proposal;
    if (d.assistance) {
        const configured = createAssistanceProposal({ ...proposal, isGroup: d.isGroup, assistanceConfiguration: common, contact: proposal.client.contact });
        const resolved = resolveAssistanceProposal(configured);
        if (!resolved.ok) return { issues: [{ step: 1, message: 'Confira os serviços, as visitas e as quantidades da assessoria.' }] };
        final = resolved.proposal;
    }
    const composed = composeProposal(final);
    if (!composed.ok) return { issues: [{ step: 1, message: 'Confira a data, os serviços selecionados e seus parâmetros antes de continuar.' }] };
    return { proposal: final, issues: [] };
}
export const editorCatalog = listCatalogEntries().filter(e => !['assistance', 'technical-visit'].includes(e.id));
