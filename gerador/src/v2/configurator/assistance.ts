import type { AssistanceConfiguration, CatalogServiceConfiguration, MeasurementConfiguration, TrainingConfiguration } from '../domain/assistance';
import type { Commercial, Contact, Proposal, ProposalItem } from '../domain/proposal';
import type { ParameterValues } from '../domain/content';
import type { ValidationIssue } from '../validation/proposal';
import { createCatalogItem } from '../catalog/select-service';
import { getCatalogEntry } from '../catalog/services';

export type AssistanceProposalInput = Omit<Proposal, 'schemaVersion' | 'services' | 'trainings' | 'measurements' | 'assistance' | 'commercial' | 'client' | 'isGroup'> & {
    isGroup: boolean;
    assistanceConfiguration: AssistanceConfiguration;
    commercial: Omit<Commercial, 'lines'>;
    contact?: Contact;
};

/** Configurador local, sem DOM. Mantém configuração canônica até a composição. */
export function createAssistanceProposal(input: AssistanceProposalInput): Proposal {
    const { contact, ...data } = input;
    return {
        ...data, schemaVersion: 2,
        client: { kind: input.isGroup ? 'group' : 'single', displayName: input.isGroup ? input.groupName ?? '' : input.companies[0]?.tradeName ?? input.companies[0]?.legalName ?? '', contact },
        services: [], trainings: [], measurements: [], assistance: [],
        commercial: { ...input.commercial, lines: [] }
    };
}

const allowedIds = {
    programs: ['pgr', 'pcmso', 'ltcat', 'lip', 'aet'],
    management: ['psychosocial', 'esocial', 'art', 'technical-support'],
    measurements: ['noise', 'heat', 'vibration', 'chemicals', 'dust'],
    trainings: ['nr01', 'nr05', 'nr06', 'nr10', 'nr12', 'nr18', 'nr20', 'nr33', 'nr35', 'brigade']
};

/** Merge por serviço; parâmetros são mesclados por chave; listas são substituídas. */
function mergeOptions<T>(base: Partial<Record<string, T>> = {}, overrides: Partial<Record<string, Partial<T>>> = {}): Record<string, T> {
    const result: Record<string, T> = {};
    for (const id of new Set([...Object.keys(base), ...Object.keys(overrides)])) {
        const value = { ...base[id], ...overrides[id] };
        const a = base[id] as { parameters?: ParameterValues } | undefined;
        const b = overrides[id] as { parameters?: ParameterValues } | undefined;
        if (a?.parameters || b?.parameters) (value as { parameters?: ParameterValues }).parameters = { ...a?.parameters, ...b?.parameters };
        result[id] = value as T;
    }
    return result;
}

export type AssistanceResolution = { ok: true; proposal: Proposal } | { ok: false; issues: ValidationIssue[] };

/** Não mantém duas fontes de verdade: entradas configuradas não podem conter itens gerados. */
export function resolveAssistanceProposal(input: Proposal): AssistanceResolution {
    if (!input.assistanceConfiguration) {
        if (input.companies.some(company => company.assistanceConfig)) return { ok: false, issues: [{ severity: 'error', code: 'assistance-config', path: 'assistanceConfiguration', message: 'Configuração por empresa exige um escopo comum de assessoria.' }] };
        return { ok: true, proposal: input };
    }
    if ([...input.services, ...input.trainings, ...input.measurements, ...input.assistance, ...input.commercial.lines].length) {
        return { ok: false, issues: [{ severity: 'error', code: 'mixed-assistance-input', path: 'assistanceConfiguration', message: 'Use a configuração ou itens materializados, sem combinar as duas fontes.' }] };
    }
    const common = input.assistanceConfiguration;
    const issues: ValidationIssue[] = [];
    const error = (path: string, message: string): void => { issues.push({ severity: 'error', code: 'assistance-config', path, message }); };
    const p: Proposal = { ...input, companies: input.companies.map(company => { const copy = { ...company }; delete copy.assistanceConfig; return copy; }),
        services: [], trainings: [], measurements: [], assistance: [], commercial: { ...input.commercial, lines: [] } };
    delete p.assistanceConfiguration;
    for (const [index, company] of input.companies.entries()) {
        const config = company.assistanceConfig;
        const path = `companies[${index}].assistanceConfig`;
        if (!config) { error(path, 'Defina a configuração comercial individual da empresa.'); continue; }
        const billing = {
            termMonths: config.pricing.termMonths ?? input.commercial.termMonths,
            installmentCount: config.pricing.installmentCount ?? input.commercial.installmentCount,
            paymentTerms: config.pricing.paymentTerms ?? input.commercial.paymentTerms
        };
        if (!Number.isSafeInteger(billing.termMonths) || billing.termMonths! < 1) error(`${path}.pricing.termMonths`, 'Defina vigência positiva em meses, individual ou comum.');
        if (!Number.isSafeInteger(billing.installmentCount) || billing.installmentCount! < 1) error(`${path}.pricing.installmentCount`, 'Defina a quantidade de parcelas, individual ou comum.');
        if (config.pricing.onceCents === undefined && config.pricing.monthlyCents === undefined) error(`${path}.pricing`, 'Informe valor único ou mensalidade, inclusive zero quando deliberado.');
        const services = {
            programs: mergeOptions<CatalogServiceConfiguration>(common.programs, config.programs),
            management: mergeOptions<CatalogServiceConfiguration>(common.management, config.management),
            measurements: mergeOptions<MeasurementConfiguration>(common.measurements, config.measurements),
            trainings: mergeOptions<TrainingConfiguration>(common.trainings, config.trainings)
        };
        for (const category of Object.keys(allowedIds) as Array<keyof typeof allowedIds>) {
            for (const id of Object.keys(services[category])) if (!allowedIds[category].includes(id)) error(`${path}.${category}.${id}`, 'Serviço não permitido nesta categoria.');
        }
        const visits = config.visits ?? common.visits;
        const assistanceId = `${company.id}:assistance`;
        const content = getCatalogEntry('assistance').content;
        // Nenhuma visita, suporte, programa ou medição é prometido pelo texto base.
        content.objective = 'Coordenar os serviços de SST expressamente selecionados para a empresa durante a vigência contratada.';
        content.methodology = ['Alinhamento inicial dos serviços contratados e acompanhamento de sua execução.'];
        content.deliverables = ['Registros de acompanhamento dos serviços contratados.'];
        content.profile.summary = 'Gestão e acompanhamento de SST conforme o escopo individual configurado para a empresa.';
        content.profile.scope = ['Coordenação das entregas expressamente selecionadas na proposta.'];
        content.profile.executionSteps = ['Alinhar a programação.', 'Acompanhar os serviços contratados.', 'Consolidar registros e orientações.'];
        content.profile.parameters = content.profile.parameters.filter(definition => !['visitsPerMonth', 'hoursPerVisit', 'support'].includes(definition.id));
        const support = services.management['technical-support'];
        const channels = support?.selected && Array.isArray(support.parameters?.['channels']) ? support.parameters['channels'] : [];
        p.assistance.push({ id: assistanceId, companyId: company.id, catalogId: 'assistance', kind: 'assistance', content,
            termMonths: billing.termMonths!, visits, support: channels,
            renewal: config.renewal ?? common.renewal, adjustment: config.adjustment ?? common.adjustment,
            notes: config.notes ?? common.notes });
        p.commercial.lines.push({ itemId: assistanceId, price: { mode: 'package', onceCents: config.pricing.onceCents ?? 0, monthlyCents: config.pricing.monthlyCents ?? 0 }, billing });
        const add = (id: string, option: CatalogServiceConfiguration | TrainingConfiguration | MeasurementConfiguration, parameters: ParameterValues, category: string): ProposalItem | undefined => {
            try {
                const item = createCatalogItem(id, { id: `${company.id}:${id}`, companyId: company.id, parameters, detailLevel: option.detailLevel });
                if (option.notes !== undefined) item.notes = option.notes;
                p.commercial.lines.push({ itemId: item.id, price: { mode: 'included', coveredByItemId: assistanceId } });
                return item;
            } catch (failure) {
                error(`${path}.${category}.${id}`, failure instanceof Error ? failure.message : 'Configuração inválida.');
                return undefined;
            }
        };
        for (const category of ['programs', 'management'] as const) {
            for (const [id, option] of Object.entries(services[category])) {
                if (!option.selected || !allowedIds[category].includes(id)) continue;
                const item = add(id, option, option.parameters ?? {}, category);
                if (item && item.kind !== 'training' && item.kind !== 'measurement' && item.kind !== 'assistance') p.services.push(item);
            }
        }
        for (const [id, option] of Object.entries(services.trainings)) {
            if (!option.selected || !allowedIds.trainings.includes(id)) continue;
            if (!option.frequency) error(`${path}.trainings.${id}.frequency`, 'Defina a frequência do treinamento.');
            const parameters = { participants: option.participants, classes: option.classes, hoursPerClass: option.hoursPerClass, occurrences: option.occurrences, modality: option.modality };
            const item = add(id, option, parameters as ParameterValues, 'trainings');
            if (item?.kind === 'training') { item.frequency = option.frequency; p.trainings.push(item); }
        }
        for (const [id, option] of Object.entries(services.measurements)) {
            if (!option.selected || !allowedIds.measurements.includes(id)) continue;
            if (!['included', 'separate-quote'].includes(option.pricingMode ?? '')) error(`${path}.measurements.${id}.pricingMode`, 'Defina inclusão ou orçamento separado.');
            const parameters = { quantity: option.quantity, unit: option.unit, agent: option.agent, method: option.method, workGroups: option.workGroups };
            const item = add(id, option, parameters as ParameterValues, 'measurements');
            if (item?.kind === 'measurement') {
                item.pricingMode = option.pricingMode;
                p.measurements.push(item);
                if (option.pricingMode === 'separate-quote') p.commercial.lines[p.commercial.lines.length - 1].price = { mode: 'separate-quote' };
            }
        }
    }
    return issues.length ? { ok: false, issues } : { ok: true, proposal: p };
}
