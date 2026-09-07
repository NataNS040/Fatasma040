import type { ProposalDocument, VisibleAmounts } from '../domain/document';
import { element, section, featureList, dataTable } from '../components/document';
const logoUrl = new URL('../../../assets/logoengmarq.png', import.meta.url).href;

const labels: Record<string, string> = {
    summary: 'Apresentação', objective: 'Objetivo', scope: 'Escopo', methodology: 'Metodologia', executionSteps: 'Etapas de execução',
    deliverables: 'Entregáveis', references: 'Fundamentação', providerResponsibilities: 'Responsabilidades da EngMarq', clientResponsibilities: 'Responsabilidades do cliente',
    responsibilities: 'Responsabilidades', inclusions: 'Inclusões', exclusions: 'Exclusões', observations: 'Observações', periodicity: 'Periodicidade',
    once: 'Única', weekly: 'Semanal', monthly: 'Mensal', quarterly: 'Trimestral', semiannual: 'Semestral', annual: 'Anual', 'on-demand': 'Sob demanda',
    onsite: 'Presencial', online: 'Online', hybrid: 'Híbrida', point: 'ponto', sample: 'amostra', dosimetry: 'dosimetria'
};
const translate = (value: string): string => labels[value] ?? value;
const money = (value: number): string => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100);
function amounts(value: VisibleAmounts): string {
    return [value.onceCents !== undefined ? `Valor único: ${money(value.onceCents)}` : '', value.monthlyCents !== undefined ? `Mensalidade: ${money(value.monthlyCents)}` : '', value.contractTotalCents !== undefined ? `Valor contratual: ${money(value.contractTotalCents)}` : ''].filter(Boolean).join('\n');
}

/** Renderiza exclusivamente os blocos de apresentação; nunca sourceItems ou preços brutos. */
export function renderDocument(model: ProposalDocument): HTMLElement {
    const root = element('article', 'engmarq-document');
    const header = element('header', 'page-header', `ENGMARQ SOLUTION · ${model.metadata.number}`);
    const footer = element('footer', 'page-footer', 'Engenharia de Segurança e Medicina do Trabalho');
    root.append(header, footer);
    const companies = model.blocks.find(block => block.kind === 'companies');
    const companyName = (id: string): string => companies?.kind === 'companies' ? companies.companies.find(c => c.id === id)?.legalName ?? id : id;
    for (const block of model.blocks) {
        let node: HTMLElement;
        switch (block.kind) {
            case 'cover': {
                node = element('section', 'cover');
                const logo = element('img', 'cover-logo'); logo.src = logoUrl; logo.alt = 'EngMarq Solution';
                node.append(logo, element('p', 'eyebrow', 'PROPOSTA TÉCNICA E COMERCIAL'), element('h1', '', block.title), element('p', 'cover-client', block.clientName), element('p', '', `${model.metadata.number} · ${model.metadata.issuedOn.split('-').reverse().join('/')} · Revisão ${model.metadata.revision}`));
                break;
            }
            case 'companies':
                node = section(model.isGroup ? `Empresas atendidas · ${model.groupName}` : 'Identificação da empresa');
                node.append(dataTable(['Empresa', 'Identificação e endereço', 'Equipe'], block.companies.map(c => [c.legalName + (c.tradeName ? `\n${c.tradeName}` : ''), [c.taxId, c.address ? `${c.address.street}, ${c.address.city} / ${c.address.state}` : ''].filter(Boolean).join('\n') || 'Não informado', [c.employeeCount !== undefined ? `${c.employeeCount} colaboradores` : '', c.roles?.join(', '), c.roleCount !== undefined ? `${c.roleCount} funções` : ''].filter(Boolean).join('\n')]), 'companies-table'));
                if (block.contact) node.append(element('p', '', `Contato: ${[block.contact.name, block.contact.email, block.contact.phone].filter(Boolean).join(' · ')}`));
                break;
            case 'scope':
                node = section('Sobre a proposta'); node.append(element('p', 'text-block', block.scope.objective));
                if (block.scope.assumptions.length) node.append(featureList('Premissas', block.scope.assumptions));
                if (block.scope.exclusions.length) node.append(featureList('Fora do escopo', block.scope.exclusions));
                break;
            case 'technical-section':
                node = section(block.title);
                // Conteúdo idêntico aparece uma vez, com configurações individuais em tabela.
                {
                    const groups = new Map<string, typeof block.services>();
                    for (const service of block.services) {
                        const key = JSON.stringify([service.title, service.fields]);
                        groups.set(key, [...(groups.get(key) ?? []), service]);
                    }
                    for (const services of groups.values()) {
                        const service = services[0];
                        const card = element('article', 'service-card');
                        card.append(element('h3', '', service.title));
                        const rows = services.map(s => [companyName(s.companyId), s.parameters.map(p => `${p.label}: ${Array.isArray(p.value) ? p.value.join(', ') : translate(String(p.value))}${p.unit ? ` ${p.unit}` : ''}`).join('\n') || 'Conforme escopo técnico', [s.frequency ? `Frequência: ${translate(s.frequency)}` : '', s.visits ? s.visits.included ? `Visitas: ${s.visits.quantity} no contrato · ${translate(s.visits.frequency)} · ${s.visits.durationHours} h por visita. ${s.visits.notes ?? ''}` : `Visitas não incluídas. ${s.visits.notes ?? ''}` : '', s.notes].filter(Boolean).join('\n')]);
                        card.append(dataTable(['Empresa', 'Configuração', 'Condições específicas'], rows, block.group === 'trainings' ? 'training-table' : 'data-grid'));
                        for (const [field, values] of Object.entries(service.fields)) if (values?.length) card.append(featureList(translate(field), values));
                        node.append(card);
                    }
                }
                break;
            case 'shared-technical':
                node = section(block.title);
                {
                const shared = new Map<string, { field: string; text: string; appliesTo: typeof block.content[number]['appliesTo'] }>();
                for (const item of block.content) {
                    const key = JSON.stringify([item.field, item.text]);
                    const existing = shared.get(key);
                    if (existing) existing.appliesTo.push(...item.appliesTo);
                    else shared.set(key, { ...item, appliesTo: [...item.appliesTo] });
                }
                for (const item of shared.values()) {
                    const box = element('div', 'info-box');
                    const applicability = new Map<string, string[]>();
                    for (const id of new Set(item.appliesTo.map(ref => ref.companyId))) {
                        const names = [...new Set(item.appliesTo.filter(ref => ref.companyId === id).map(ref => model.blocks.flatMap(b => b.kind === 'technical-section' ? b.services : []).find(s => s.itemId === ref.itemId)?.shortName ?? ref.itemId))].sort().join(', ');
                        applicability.set(names, [...(applicability.get(names) ?? []), companyName(id)]);
                    }
                    box.append(element('h4', '', translate(item.field)), element('p', '', item.text), element('p', 'applies-to', [...applicability].map(([services, names]) => `${names.join(' · ')} — ${services}`).join('\n')));
                    node.append(box);
                }
                }
                break;
            case 'additional-scope':
                node = section(block.title);
                node.append(dataTable(['Empresa / medição', 'Quantidade', 'Condição'], block.measurements.map(m => [`${companyName(m.companyId)}\n${m.title}`, `${m.quantity} ${translate(m.unit)}`, `Orçamento separado. ${m.notes ?? ''}`])));
                break;
            case 'investment':
                node = section('Condições comerciais');
                if (block.companyRows?.length) node.append(dataTable(['Empresa', 'Investimento', 'Vigência / pagamento'], block.companyRows.map(row => [row.companyName, amounts(row), row.billing.map(b => [b.termMonths ? `${b.termMonths} meses` : '', b.installmentCount ? `${b.installmentCount} parcelas` : '', ...(b.paymentTerms ?? [])].filter(Boolean).join(' · ')).join('\n')]), 'commercial-table'));
                else node.append(dataTable(['Serviço / empresa', 'Condição'], block.rows.map(row => [`${row.title}\n${companyName(row.companyId)}`, amounts(row.price) || (row.price.mode === 'included' ? 'Incluído no pacote' : row.price.mode === 'separate-quote' ? 'Orçamento separado' : 'Conforme condições comerciais')]), 'commercial-table'));
                if (block.totals && amounts(block.totals)) node.append(element('p', 'info-box', `Consolidado\n${amounts(block.totals)}`));
                node.append(element('p', '', `Validade da proposta: ${block.terms.validityDays} dias.`));
                if (block.terms.termMonths) node.append(element('p', '', `Vigência: ${block.terms.termMonths} meses.`));
                if (block.terms.installmentCount) node.append(element('p', '', `Parcelamento: ${block.terms.installmentCount} parcelas.`));
                node.append(featureList('Pagamento', block.terms.paymentTerms), featureList('Execução', block.terms.executionTerms));
                break;
            case 'acceptance':
                node = section('Aceite e responsabilidade');
                node.append(element('p', '', `Responsável pela proposta: ${[block.author.name, block.author.role, block.author.email, block.author.phone].filter(Boolean).join(' · ')}`));
                for (const id of block.companyIds) { const signature = element('div', 'signature', `${companyName(id)}\nResponsável: ________________________    Data: ____ / ____ / ______`); signature.dataset.atomic = 'signature'; node.append(signature); }
                break;
        }
        node.dataset.blockId = block.id;
        root.append(node);
    }
    // Fluxo raso evita a perda de irmãos em quebras de contêineres aninhados no Paged.js 0.4.
    for (const wrapper of root.querySelectorAll('.service-card,.feature-list')) wrapper.replaceWith(...wrapper.childNodes);
    root.querySelectorAll<HTMLElement>('.info-box').forEach(node => { node.dataset.atomic = 'info-box'; });
    root.querySelectorAll('p,li,h1,h2,h3,h4,tr,td,th,.signature,.info-box').forEach((node, index) => (node as HTMLElement).dataset.layoutId = `content-${index}`);
    return root;
}
