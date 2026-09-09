import { getCatalogEntry } from '../catalog/services';
import { createProgramKit } from '../presets/program-kit';
import { INDIVIDUAL_CLIENT_ID, proposalItems, type Proposal } from '../domain/proposal';
import { createCatalogItem } from '../catalog/select-service';
import { instantiatePreset } from '../presets/catalog-presets';
export { tm136AssistanceProposal, tm137GroupProposal } from './assistance';

/** Cliente e CPF fictícios, usados apenas nos testes. */
export function individualProposal(training = false): Proposal {
    const p = singleProposal();
    p.metadata.id = 'fixture-individual';
    p.client = { kind: 'individual', displayName: 'Maria de Souza Exemplo' };
    p.individualClient = { fullName: p.client.displayName, cpf: '529.982.247-25' };
    p.isGroup = false;
    p.companies = [];
    p.scope.objective = 'Prestação do serviço contratado para o cliente identificado.';
    const item = createCatalogItem(training ? 'nr06' : 'lip', {
        id: 'individual-service', companyId: INDIVIDUAL_CLIENT_ID,
        parameters: training ? { modality: 'onsite', participants: 1, classes: 1, hoursPerClass: 2, occurrences: 1, audience: 'Cliente contratante' } : {}
    });
    p.services = item.kind === 'training' ? [] : [item as Proposal['services'][number]];
    p.trainings = item.kind === 'training' ? [item] : [];
    p.commercial.lines = [{ itemId: item.id, price: { mode: 'charge', cadence: 'once', amountCents: 150000 } }];
    return p;
}

/** Dados fictícios: cenários inspirados nas fontes, sem reprodução comercial integral. */
export function singleProposal(): Proposal {
    return {
        schemaVersion: 2,
        metadata: { id: 'fixture-single', number: 'V2-DEMO-001', issuedOn: '2026-08-25', revision: 0, title: 'Proposta técnica e comercial', author: { name: 'Equipe EngMarq' } },
        client: { kind: 'single', displayName: 'Empresa Exemplo' },
        companies: [{ id: 'company-1', legalName: 'Empresa Exemplo', employeeCount: 18 }],
        scope: { objective: 'Elaboração de PGR para a empresa indicada.', exclusions: ['Medições quantitativas não contratadas.'], assumptions: ['Disponibilização de informações pela contratante.'] },
        services: [{ id: 'pgr-1', companyId: 'company-1', kind: 'program', content: getCatalogEntry('pgr').content }],
        trainings: [], measurements: [], assistance: [],
        commercial: { currency: 'BRL', lines: [{ itemId: 'pgr-1', price: { mode: 'charge', cadence: 'once', amountCents: 150000 } }], validityDays: 15, paymentTerms: ['50% na aprovação e 50% na entrega.'], executionTerms: ['Prazo a acordar após recebimento dos dados.'] },
        options: { includeCover: true, includeAcceptance: true }
    };
}

/** Cinco empresas, quantidades próprias e itens inclusos, como o caso TM0137. */
export function mixedGroupProposal(): Proposal {
    const p = singleProposal();
    p.metadata.id = 'fixture-group';
    p.metadata.number = 'V2-DEMO-002';
    p.client = { kind: 'group', displayName: 'Grupo Exemplo' };
    p.scope = { objective: 'Assessoria com programas, psicossocial, treinamentos e calor por empresa.', exclusions: ['Medições além das quantidades explicitadas.'], assumptions: ['Agenda alinhada por unidade.'] };
    p.companies = [17, 22, 8, 9, 23].map((count, i) => ({ id: `company-${i + 1}`, legalName: `Empresa Exemplo ${i + 1}`, employeeCount: count }));
    p.services = [];
    p.commercial.lines = [];
    for (const company of p.companies) {
        const id = company.id;
        p.services.push(...createProgramKit(id, id));
        p.services.push({ id: `${id}-lip`, companyId: id, kind: 'report', content: getCatalogEntry('lip').content });
        p.services.push({ id: `${id}-psico`, companyId: id, kind: 'psychosocial', content: getCatalogEntry('psychosocial').content, psychosocial: { participantCount: company.employeeCount!, instruments: ['Instrumento a revisar pela equipe técnica'], integration: 'Integração ao PGR da empresa.' } });
        for (const training of ['nr01', 'nr06', 'brigade']) {
            p.trainings.push({ id: `${id}-${training}`, companyId: id, kind: 'training', content: getCatalogEntry(training).content, modality: 'onsite', participants: training === 'brigade' ? Math.min(company.employeeCount!, 10) : company.employeeCount!, classes: 1, hoursPerClass: 8, occurrences: 1, syllabus: ['Conteúdo a detalhar e revisar conforme escopo.'] });
        }
        p.measurements.push({ id: `${id}-heat`, companyId: id, kind: 'measurement', content: getCatalogEntry('heat').content, agent: 'Calor', method: 'IBUTG', quantity: 1, unit: 'point', workGroups: ['Cozinha'] });
        p.assistance.push({ id: `${id}-assistance`, companyId: id, kind: 'assistance', content: getCatalogEntry('assistance').content, termMonths: 12, visitsPerMonth: 1, hoursPerVisit: 4, support: ['Suporte remoto'], renewal: 'Mediante acordo entre as partes.', adjustment: 'Conforme condições contratuais.' });
    }
    p.commercial.lines = proposalItems(p).map(item => ({ itemId: item.id, price: item.kind === 'assistance' ? { mode: 'charge', cadence: 'monthly', amountCents: 150000 } : { mode: 'included', coveredByItemId: `${item.companyId}-assistance` } }));
    p.commercial.paymentTerms = ['Pagamento mensal conforme condições contratuais.'];
    return p;
}

/** Exemplo executável da fase catálogo/composer. Valores meramente demonstrativos. */
export function universalCatalogProposal(): Proposal {
    const p = singleProposal();
    p.metadata.id = 'fixture-universal-catalog';
    p.metadata.number = 'V2-DEMO-003';
    p.metadata.title = 'Programas, avaliações e gestão de SST';
    p.options.detailLevel = 'full';
    p.scope = {
        objective: 'Elaboração de programas e laudos, avaliação psicossocial, gestão dos eventos SST e registro de responsabilidade técnica para a Empresa Exemplo.',
        exclusions: ['Medições quantitativas não selecionadas.', 'Exames médicos ocupacionais não contratados.'],
        assumptions: ['Disponibilização dos dados da empresa e dos colaboradores.']
    };
    const selected = instantiatePreset('kit-completo', 'company-1', 'demo', {
        pgr: { detailLevel: 'full' }, pcmso: { detailLevel: 'full' }, ltcat: { detailLevel: 'full' },
        lip: { detailLevel: 'full' }, art: { detailLevel: 'full' }
    });
    selected.push(createCatalogItem('psychosocial', {
        id: 'demo-psychosocial', companyId: 'company-1',
        parameters: { participantCount: 18, instruments: ['Instrumento definido no planejamento técnico'], integration: 'Integração ao PGR da Empresa Exemplo.' }
    }));
    selected.push(createCatalogItem('esocial', {
        id: 'demo-esocial', companyId: 'company-1',
        parameters: { events: ['S-2220', 'S-2240'], servicePeriod: '12 meses' }
    }));
    p.services = selected.filter((item): item is Proposal['services'][number] => item.kind !== 'training' && item.kind !== 'measurement' && item.kind !== 'assistance');
    p.commercial.lines = selected.map(item => ({ itemId: item.id, price: {
        mode: 'charge', cadence: item.catalogId === 'esocial' ? 'monthly' : 'once',
        amountCents: item.catalogId === 'esocial' ? 20000 : 100000
    } }));
    p.commercial.paymentTerms = ['Serviços únicos: 50% na aprovação e 50% na entrega.', 'eSocial: cobrança mensal durante 12 meses.'];
    return p;
}
