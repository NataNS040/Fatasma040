import { formatCpf } from '../utils/cpf';
import type { ProposalDocument, VisibleAmounts } from '../domain/document';
import { element, section, featureList, dataTable } from '../components/document';
import { editorialContent, serviceHeader } from '../components/editorial';
import { documentIcon } from '../components/icons';
const logoUrl = new URL('../../../assets/logoengmarq.png', import.meta.url).href;

const labels: Record<string, string> = {
    summary: 'Apresentação', objective: 'Objetivo', scope: 'Escopo', methodology: 'Metodologia', executionSteps: 'Etapas de execução',
    deliverables: 'Principais entregas', references: 'Fundamentação', providerResponsibilities: 'Responsabilidades da EngMarq', clientResponsibilities: 'Responsabilidades do cliente',
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
    const root = element('article', `engmarq-document mode-${model.documentMode ?? 'standard'}`);
    const header = element('header', 'page-header', `ENGMARQ SOLUTION · ${model.metadata.number}`);
    const footer = element('footer', 'page-footer', 'Engenharia de Segurança e Medicina do Trabalho');
    if (!model.blocks.some(block => block.kind === 'cover')) root.append(header, footer);
    const individual = model.blocks.find(block => block.kind === 'individual');
    const companies = model.blocks.find(block => block.kind === 'companies');
    const serviceNames = new Map(model.blocks.flatMap(block => block.kind === 'technical-section' ? block.services.map(service => [service.itemId, service.shortName] as const) : []));
    const companyName = (id: string): string => individual?.kind === 'individual' ? individual.client.fullName : companies?.kind === 'companies' ? companies.companies.find(c => c.id === id)?.legalName ?? id : id;
    for (const block of model.blocks) {
        let node: HTMLElement;
        switch (block.kind) {
            case 'cover': {
                node = element('section', 'cover');
                const logo = element('img', 'cover-logo'); logo.src = logoUrl; logo.alt = 'EngMarq Solution';
                const clientName = model.isGroup ? model.groupName || block.clientName : (companies?.kind === 'companies' ? companies.companies[0]?.legalName : undefined) || block.clientName;
                node.append(logo, element('p', 'cover-code', model.metadata.number), element('p', 'eyebrow', 'PROPOSTA COMERCIAL'), element('h1', '', block.title), element('p', 'cover-caption', 'ELABORADA PARA'), element('p', 'cover-client', clientName), element('p', 'cover-date', `${model.metadata.issuedOn.split('-').reverse().join('/')} · Revisão ${model.metadata.revision}`), element('p', 'cover-brand', 'EngMarq Solution\nEngenharia de Segurança e Medicina do Trabalho'));
                break;
            }
            case 'individual': {
                node = section('Identificação do cliente');
                const identification = element('div', 'info-box');
                identification.append(element('p', '', `Nome completo: ${block.client.fullName}`), element('p', '', `CPF: ${formatCpf(block.client.cpf)}`));
                node.append(identification);
                break;
            }
            case 'companies':
                node = section(model.isGroup ? `Empresas atendidas · ${model.groupName}` : 'Identificação da empresa');
                node.append(dataTable(['Empresa', 'Identificação e endereço', 'Equipe'], block.companies.map(c => [c.legalName + (c.tradeName && c.tradeName !== c.legalName ? `\n${c.tradeName}` : ''), [c.taxId, c.address ? `${c.address.street}, ${c.address.city} / ${c.address.state}` : ''].filter(Boolean).join('\n') || 'Não informado', [c.employeeCount !== undefined ? `${c.employeeCount} colaboradores` : '', c.roles?.join(', '), c.roleCount !== undefined ? `${c.roleCount} funções` : ''].filter(Boolean).join('\n')]), 'companies-table'));
                if (block.contact && [block.contact.name, block.contact.email, block.contact.phone].some(value => value?.trim())) node.append(element('p', '', `Contato: ${[block.contact.name, block.contact.email, block.contact.phone].filter(Boolean).join(' · ')}`));
                break;
            case 'scope':
                node = section('Sobre a proposta'); node.append(element('p', 'section-intro', block.scope.objective));
                if (block.scope.assumptions.length) node.append(featureList('Premissas', block.scope.assumptions));
                if (block.scope.exclusions.length) node.append(editorialContent('exclusions', 'Fora do escopo', block.scope.exclusions));
                break;
            case 'coordination':
                node = section(block.title);
                for (const entry of block.entries) {
                    node.append(element('h3', '', entry.title), element('p', '', entry.text));
                    if (model.isGroup) node.append(element('p', 'applies-to', entry.companyIds.map(companyName).join(' · ')));
                }
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
                        card.append(serviceHeader(service.title, service.shortName, service.catalogId));
                        if (service.fields.summary?.length) card.append(editorialContent('summary', '', service.fields.summary));
                        const rows = services.map(s => [companyName(s.companyId), s.parameters.map(p => `${p.label}: ${Array.isArray(p.value) ? p.value.join(', ') : translate(String(p.value))}${p.unit ? ` ${p.unit}` : ''}`).join('\n'), [s.frequency ? `Frequência: ${translate(s.frequency)}` : '', s.visits ? s.visits.included ? `Visitas: ${s.visits.quantity} no contrato · ${translate(s.visits.frequency)} · ${s.visits.durationHours} h por visita. ${s.visits.notes ?? ''}` : `Visitas não incluídas. ${s.visits.notes ?? ''}` : '', s.notes].filter(Boolean).join('\n')]);
                        if (!model.isGroup) {
                            const parameters = services.flatMap(item => item.parameters);
                            if (parameters.length) card.append(dataTable(['Parâmetro', 'Configuração contratada'], parameters.map(parameter => [parameter.label, `${Array.isArray(parameter.value) ? parameter.value.join(', ') : translate(String(parameter.value))}${parameter.unit ? ` ${parameter.unit}` : ''}`]), `parameter-table${block.group === 'trainings' ? ' training-table' : ''}`));
                            rows.forEach(row => { if (row[2]) card.append(element('p', 'service-configuration', row[2])); });
                        } else {
                            const columns = [0, 1, 2].filter(index => rows.some(row => row[index]));
                            if (columns.length === 1) card.append(element('p', 'applies-to', `Empresas: ${rows.map(row => row[0]).join(' · ')}`));
                            else card.append(dataTable(columns.map(index => ['Empresa', 'Configuração', 'Condições específicas'][index]), rows.map(row => columns.map(index => row[index])), block.group === 'trainings' ? 'training-table' : 'data-grid'));
                        }
                        for (const [field, values] of Object.entries(service.fields)) if (field !== 'summary' && values?.length) card.append(editorialContent(field, translate(field), values));
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
                const grouped = new Map<string, Map<string, string[]>>();
                for (const item of shared.values()) {
                    const applicability = new Map<string, string[]>();
                    for (const id of new Set(item.appliesTo.map(ref => ref.companyId))) {
                        const names = [...new Set(item.appliesTo.filter(ref => ref.companyId === id).map(ref => serviceNames.get(ref.itemId) ?? ref.itemId))].sort().join(', ');
                        applicability.set(names, [...(applicability.get(names) ?? []), companyName(id)]);
                    }
                    const applies = [...applicability].map(([services, names]) => `${names.join(' · ')} — ${services}`).join('\n');
                    const field = grouped.get(item.field) ?? new Map<string, string[]>();
                    field.set(applies, [...(field.get(applies) ?? []), item.text]);
                    grouped.set(item.field, field);
                }
                for (const [field, groups] of grouped) {
                    node.append(editorialContent(field, translate(field), []));
                    for (const [applies, texts] of groups) {
                        node.append(editorialContent(field, translate(field), texts, false), element('p', 'applies-to', applies));
                    }
                }
                }
                break;
            case 'additional-scope':
                node = section(block.title);
                node.append(dataTable([individual ? 'Cliente / medição' : 'Empresa / medição', 'Quantidade', 'Condição'], block.measurements.map(m => [`${companyName(m.companyId)}\n${m.title}`, `${m.quantity} ${translate(m.unit)}`, `Orçamento separado. ${m.notes ?? ''}`]), 'measurement-table'));
                break;
            case 'investment':
                node = section('Condições comerciais');
                node.querySelector('h2')!.prepend(documentIcon('money'));
                if (block.companyRows?.length) node.append(dataTable(['Empresa', 'Investimento', 'Pagamento'], block.companyRows.map(row => [row.companyName, amounts(row), row.billing.map(b => [b.installmentCount ? `${b.installmentCount} parcelas` : '', ...(b.paymentTerms ?? [])].filter(Boolean).join(' · ')).join('\n')]), 'commercial-table'));
                else node.append(dataTable([individual ? 'Serviço / cliente' : 'Serviço / empresa', 'Condição'], block.rows.map(row => [`${row.title}\n${companyName(row.companyId)}`, amounts(row.price) || (row.price.mode === 'included' ? 'Incluído no pacote' : row.price.mode === 'separate-quote' ? 'Orçamento separado' : 'Conforme condições comerciais')]), 'commercial-table'));
                if (block.totals && amounts(block.totals)) node.append(element('p', 'info-box', `Consolidado\n${amounts(block.totals)}`));
                node.append(element('p', '', `Validade da proposta: ${block.terms.validityDays} dias.`));
                if (block.terms.installmentCount) node.append(element('p', '', `Parcelamento: ${block.terms.installmentCount} parcelas.`));
                if (!block.companyRows?.length || !block.companyRows.every(row => block.terms.paymentTerms.every(term => row.billing.some(billing => billing.paymentTerms?.includes(term))))) node.append(featureList('Pagamento', block.terms.paymentTerms));
                if (block.terms.executionTerms.length === 1) node.append(element('h4', '', 'Execução'), element('p', '', block.terms.executionTerms[0]));
                else node.append(featureList('Execução', block.terms.executionTerms));
                break;
            case 'acceptance': {
                node = section('Aceite da proposta');
                node.classList.add('acceptance-page');
                const intro = element('div', 'acceptance-intro');
                intro.append(node.firstElementChild!, element('p', '', 'Declaramos estar de acordo com o escopo, condições e valores apresentados nesta proposta.'));
                node.append(intro);
                const pair = element('div', 'signature-pair');
                const contact = companies?.kind === 'companies' ? companies.contact : undefined;
                const signature = (label: string, company: string, name?: string): HTMLElement => {
                    const card = element('div', 'signature'); card.dataset.atomic = 'signature';
                    card.append(element('h3', '', label), element('div', 'signature-line'), element('p', 'signature-company', company), element('p', 'signature-field', name?.trim() || 'Nome: __________________________'));
                    return card;
                };
                pair.append(signature('ENGMARQ SOLUTION', 'EngMarq Solution', block.author.name));
                if (individual?.kind === 'individual') pair.append(signature('CLIENTE', individual.client.fullName, `CPF: ${formatCpf(individual.client.cpf)}`));
                else pair.append(signature('CONTRATANTE', model.isGroup ? model.groupName || block.companyIds.map(companyName).join(' · ') : companyName(block.companyIds[0]), contact?.name));
                node.append(pair);
                if (model.isGroup) node.append(element('p', 'applies-to', `Empresas abrangidas pelo aceite: ${block.companyIds.map(companyName).join(' · ')}`));
                break;
            }
        }
        node.dataset.blockId = block.id;
        root.append(node);
        // Running elements before a named cover create an empty default page in Paged.js.
        if (block.kind === 'cover') root.append(header, footer);
    }
    // Fluxo raso evita a perda de irmãos em quebras de contêineres aninhados no Paged.js 0.4.
    for (const wrapper of root.querySelectorAll('.service-card,.feature-list')) wrapper.replaceWith(...wrapper.childNodes);
    for (const sectionNode of root.querySelectorAll('.document-section')) {
        const heading = sectionNode.firstElementChild;
        const service = heading?.nextElementSibling;
        if (heading?.tagName === 'H2' && service?.matches('.service-heading')) {
            const start = element('div', 'section-start');
            heading.replaceWith(start); start.append(heading, service);
        }
    }
    root.querySelectorAll<HTMLElement>('.info-box').forEach(node => { node.dataset.atomic = 'info-box'; });
    root.querySelectorAll('p,li,h1,h2,h3,h4,tr,td,th,.signature,.info-box,[role="listitem"]').forEach((node, index) => (node as HTMLElement).dataset.layoutId = `content-${index}`);
    return root;
}
