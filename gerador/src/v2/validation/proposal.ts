import { isValidCpf } from '../utils/cpf';
import { INDIVIDUAL_CLIENT_ID, proposalItems, type Proposal } from '../domain/proposal';
import { isCivilDate, isNonNegativeInteger } from '../utils/value';
import { validateItemParameters } from './parameters';
import { resolveAssistanceProposal } from '../configurator/assistance';
import { composeInvestment } from '../composer/investment';

export interface ValidationIssue {
    severity: 'error' | 'warning';
    code: string;
    path: string;
    message: string;
}

/** Validação semântica de Proposal tipada. Não é um parser de JSON desconhecido. */
export function validateProposal(input: Proposal): ValidationIssue[] {
    const resolved = resolveAssistanceProposal(input);
    if (!resolved.ok) return resolved.issues;
    const p = resolved.proposal;
    const issues: ValidationIssue[] = [];
    const error = (code: string, path: string, message: string): void => { issues.push({ severity: 'error', code, path, message }); };
    const warning = (code: string, path: string, message: string): void => { issues.push({ severity: 'warning', code, path, message }); };
    const required = (value: string, path: string): void => {
        if (typeof value !== 'string' || !value.trim()) error('required', path, 'Preencha o texto obrigatório.');
    };
    const integer = (value: number, path: string, min = 0): void => {
        if (!isNonNegativeInteger(value) || value < min) error('invalid-number', path, `Informe inteiro seguro maior ou igual a ${min}.`);
    };
    const positive = (value: number, path: string): void => {
        if (!Number.isFinite(value) || value <= 0) error('invalid-number', path, 'Informe número finito positivo.');
    };
    if (p.schemaVersion !== 2) error('schema-version', 'schemaVersion', 'Versão de schema não suportada.');
    required(p.metadata.id, 'metadata.id');
    required(p.metadata.number, 'metadata.number');
    required(p.metadata.title, 'metadata.title');
    if (!p.metadata.author.name?.trim()) warning('missing-responsible', 'metadata.author.name', 'Responsável da EngMarq não informado.');
    if (p.client.kind !== 'individual' && !p.client.contact?.name?.trim()) warning('missing-contact', 'client.contact.name', 'Responsável do cliente não informado.');
    integer(p.metadata.revision, 'metadata.revision');
    if (!isCivilDate(p.metadata.issuedOn)) error('invalid-date', 'metadata.issuedOn', 'Use uma data civil válida YYYY-MM-DD.');
    required(p.client.displayName, 'client.displayName');
    if (!['single', 'group', 'individual'].includes(p.client.kind)) error('client-kind', 'client.kind', 'Tipo de cliente inválido.');
    if (p.isGroup !== undefined && p.isGroup !== (p.client.kind === 'group')) error('group-identity', 'isGroup', 'isGroup deve corresponder ao tipo de cliente.');
    if (p.isGroup === true && (!p.groupName?.trim() || p.groupName !== p.client.displayName)) error('group-name', 'groupName', 'Defina o nome do grupo, igual ao destinatário da proposta.');
    if (p.client.kind === 'single' && p.groupName !== undefined) error('group-name', 'groupName', 'Empresa única não possui nome de grupo.');
    required(p.scope.objective, 'scope.objective');
    const levels = ['summary', 'standard', 'full'];
    if (p.options.documentMode !== undefined && !['compact', 'standard', 'consultive'].includes(p.options.documentMode)) error('document-mode', 'options.documentMode', 'Modo de documento inválido.');
    if (p.options.detailLevel !== undefined && !levels.includes(p.options.detailLevel)) error('detail-level', 'options.detailLevel', 'Nível de apresentação inválido.');
    const individual = p.client.kind === 'individual';
    if (individual) {
        required(p.individualClient?.fullName ?? '', 'individualClient.fullName');
        if (!isValidCpf(p.individualClient?.cpf ?? '')) error('invalid-cpf', 'individualClient.cpf', 'Informe um CPF válido.');
        if (p.individualClient?.fullName !== p.client.displayName) error('individual-name', 'individualClient.fullName', 'O destinatário deve corresponder ao nome completo.');
        if (p.companies.length || p.groupName !== undefined || p.client.contact || p.assistanceConfiguration) error('individual-identity', 'client', 'Pessoa física não possui cadastro empresarial ou contato adicional.');
    }
    const minCompanies = p.client.kind === 'group' ? 2 : 1;
    if (!individual && (p.companies.length < minCompanies || (p.client.kind === 'single' && p.companies.length !== 1))) {
        error('company-count', 'companies', 'Empresa única exige um cadastro; grupo exige pelo menos dois.');
    }
    const companyIds = new Set<string>();
    p.companies.forEach((company, index) => {
        const path = `companies[${index}]`;
        required(company.id, `${path}.id`);
        required(company.legalName, `${path}.legalName`);
        if (!company.address?.street?.trim() || !company.address.city?.trim() || !company.address.state?.trim()) warning('missing-address', `${path}.address`, `Endereço incompleto ou ausente: ${company.legalName || company.id}.`);
        if (companyIds.has(company.id)) error('duplicate-id', `${path}.id`, 'ID de empresa duplicado.');
        companyIds.add(company.id);
        if (company.employeeCount !== undefined) integer(company.employeeCount, `${path}.employeeCount`);
        if (company.roleCount !== undefined) integer(company.roleCount, `${path}.roleCount`);
    });
    const items = proposalItems(p);
    const frequencies = ['once', 'weekly', 'monthly', 'quarterly', 'semiannual', 'annual', 'on-demand'];
    if (!items.length) error('empty-scope', 'services', 'Selecione pelo menos um serviço, treinamento, medição ou assessoria.');
    const itemIds = new Set<string>();
    items.forEach((item, index) => {
        const path = `items[${index}]`;
        required(item.id, `${path}.id`);
        if (itemIds.has(item.id)) error('duplicate-id', `${path}.id`, 'ID de item duplicado.');
        itemIds.add(item.id);
        if (individual ? item.companyId !== INDIVIDUAL_CLIENT_ID : !companyIds.has(item.companyId)) error('unknown-company', `${path}.companyId`, 'Empresa fora da proposta.');
        required(item.content.title, `${path}.content.title`);
        required(item.content.objective, `${path}.content.objective`);
        if (!item.content.deliverables.length) error('empty-deliverables', `${path}.content.deliverables`, 'Defina os entregáveis do item.');
        item.content.deliverables.forEach((text, i) => required(text, `${path}.content.deliverables[${i}]`));
        required(item.content.provenance.source, `${path}.content.provenance.source`);
        required(item.content.provenance.revision, `${path}.content.provenance.revision`);
        if (item.detailLevel !== undefined && !levels.includes(item.detailLevel)) error('detail-level', `${path}.detailLevel`, 'Nível de apresentação inválido.');
        if (item.content.profile && !levels.includes(item.content.profile.defaultDetail)) error('detail-level', `${path}.content.profile.defaultDetail`, 'Nível padrão inválido.');
        for (const issue of validateItemParameters(item)) error(issue.code, `${path}.parameters.${issue.path}`, issue.message);
        if (item.content.provenance.review === 'pending') issues.push({ severity: 'warning', code: 'technical-review', path: `${path}.content`, message: 'Conteúdo técnico pendente de revisão antes de uso comercial.' });
        switch (item.kind) {
            case 'training':
                if (!['onsite', 'online', 'hybrid'].includes(item.modality)) error('training-modality', `${path}.modality`, 'Modalidade de treinamento inválida.');
                integer(item.participants, `${path}.participants`, 1);
                integer(item.classes, `${path}.classes`, 1);
                positive(item.hoursPerClass, `${path}.hoursPerClass`);
                integer(item.occurrences, `${path}.occurrences`, 1);
                if (item.classes > item.participants) error('training-capacity', path, 'Quantidade de turmas maior que a de participantes.');
                if (!item.syllabus.length) error('empty-syllabus', `${path}.syllabus`, 'Defina o conteúdo programático.');
                if (item.frequency !== undefined && !frequencies.includes(item.frequency)) error('frequency', `${path}.frequency`, 'Frequência inválida.');
                if (item.frequency === 'once' && item.occurrences !== 1) error('frequency', `${path}.occurrences`, 'Frequência única exige uma ocorrência.');
                break;
            case 'measurement':
                if (!item.notes?.trim()) warning('measurement-notes', `${path}.notes`, `Medição sem observação de execução: ${item.content.title}.`);
                integer(item.quantity, `${path}.quantity`, 1);
                required(item.agent, `${path}.agent`);
                required(item.method, `${path}.method`);
                if (!['point', 'sample', 'dosimetry'].includes(item.unit)) error('measurement-unit', `${path}.unit`, 'Unidade de medição inválida.');
                if (item.pricingMode !== undefined) {
                    const price = p.commercial.lines.find(line => line.itemId === item.id)?.price;
                    if (!['included', 'separate-quote'].includes(item.pricingMode) || price?.mode !== item.pricingMode) error('measurement-pricing', `${path}.pricingMode`, 'Inclusão/orçamento separado deve corresponder à linha comercial.');
                }
                break;
            case 'assistance':
                integer(item.termMonths, `${path}.termMonths`, 1);
                if (item.visits) {
                    if (item.visitsPerMonth !== undefined || item.hoursPerVisit !== undefined) error('duplicate-visits', `${path}.visits`, 'Não combine visitas configuráveis com os campos mensais antigos.');
                    if (item.visits.included) {
                        integer(item.visits.quantity, `${path}.visits.quantity`, 1);
                        positive(item.visits.durationHours, `${path}.visits.durationHours`);
                        if (!frequencies.includes(item.visits.frequency)) error('frequency', `${path}.visits.frequency`, 'Frequência inválida.');
                    } else if ('quantity' in item.visits || 'durationHours' in item.visits || 'frequency' in item.visits) error('disabled-visits', `${path}.visits`, 'Visitas desativadas não podem manter quantidade, duração ou frequência ativa.');
                } else {
                    integer(item.visitsPerMonth!, `${path}.visitsPerMonth`);
                    if (item.visitsPerMonth! > 0) positive(item.hoursPerVisit!, `${path}.hoursPerVisit`);
                    else if (item.hoursPerVisit !== 0) error('visit-hours', `${path}.hoursPerVisit`, 'Sem visitas, a carga de visita deve ser zero.');
                }
                required(item.renewal, `${path}.renewal`);
                required(item.adjustment, `${path}.adjustment`);
                break;
            case 'psychosocial':
                if (!item.psychosocial) error('psychosocial-scope', path, 'Defina participantes, instrumentos e integração.');
                else {
                    integer(item.psychosocial.participantCount, `${path}.psychosocial.participantCount`, 1);
                    if (!item.psychosocial.instruments.length) error('psychosocial-instrument', path, 'Defina o instrumento planejado.');
                    required(item.psychosocial.integration, `${path}.psychosocial.integration`);
                }
                break;
        }
    });
    if (p.commercial.currency !== 'BRL') error('currency', 'commercial.currency', 'Moeda não suportada.');
    integer(p.commercial.validityDays, 'commercial.validityDays', 1);
    if (!p.commercial.paymentTerms.length || p.commercial.paymentTerms.some(term => typeof term !== 'string' || !term.trim())) error('payment-terms', 'commercial.paymentTerms', 'Defina condições de pagamento não vazias.');
    for (const key of ['showMonthlyValue', 'showContractTotal', 'showAggregateTotal', 'showPerCompanyPricing'] as const) {
        if (p.commercial[key] !== undefined && typeof p.commercial[key] !== 'boolean') error('commercial-visibility', `commercial.${key}`, 'A opção de exibição deve ser booleana.');
    }
    if (p.commercial.termMonths !== undefined) integer(p.commercial.termMonths, 'commercial.termMonths', 1);
    if (p.commercial.installmentCount !== undefined) integer(p.commercial.installmentCount, 'commercial.installmentCount', 1);
    const priced = new Set<string>();
    p.commercial.lines.forEach((line, index) => {
        const path = `commercial.lines[${index}]`;
        if (!itemIds.has(line.itemId)) error('unknown-item', `${path}.itemId`, 'Item comercial fora do escopo.');
        if (priced.has(line.itemId)) error('duplicate-price', `${path}.itemId`, 'Cada item deve ter uma única condição de preço.');
        priced.add(line.itemId);
        if (line.price.mode === 'charge') {
            if (!['once', 'monthly'].includes(line.price.cadence)) error('price-cadence', `${path}.price.cadence`, 'Cadência de cobrança inválida.');
            integer(line.price.amountCents, `${path}.price.amountCents`);
        } else if (line.price.mode === 'package') {
            integer(line.price.onceCents, `${path}.price.onceCents`);
            integer(line.price.monthlyCents, `${path}.price.monthlyCents`);
        } else if (line.price.mode === 'included') {
            const targetId = line.price.coveredByItemId;
            const target = p.commercial.lines.find(other => other.itemId === targetId);
            const item = items.find(other => other.id === line.itemId);
            const coveringItem = items.find(other => other.id === targetId);
            if (targetId === line.itemId || !target || !['charge', 'package'].includes(target.price.mode) || !item || !coveringItem || item.companyId !== coveringItem.companyId) {
                error('invalid-inclusion', `${path}.price.coveredByItemId`, 'Item incluso deve apontar diretamente para uma cobrança da mesma empresa.');
            }
        } else if (line.price.mode !== 'separate-quote') error('price-mode', `${path}.price.mode`, 'Modo de cobrança inválido.');
        if (line.billing?.termMonths !== undefined) integer(line.billing.termMonths, `${path}.billing.termMonths`, 1);
        if (line.billing?.installmentCount !== undefined) integer(line.billing.installmentCount, `${path}.billing.installmentCount`, 1);
        if (line.billing?.paymentTerms !== undefined && (!line.billing.paymentTerms.length || line.billing.paymentTerms.some(term => !term.trim()))) error('payment-terms', `${path}.billing.paymentTerms`, 'Informe condições de pagamento não vazias.');
    });
    for (const id of itemIds) if (!priced.has(id)) error('missing-price', 'commercial.lines', `Defina cobrança ou inclusão para o item ${id}.`);
    // Valida overflow somente nas somas/projeções efetivamente solicitadas para exibição.
    if (!issues.some(issue => issue.severity === 'error')) issues.push(...composeInvestment(p).issues);
    return issues;
}
