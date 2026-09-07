import { createAssistanceProposal } from '../configurator/assistance';
import type { AssistanceConfiguration } from '../domain/assistance';
import type { Company, Proposal } from '../domain/proposal';

/** Dados fictícios. Quantitativos inspirados em TM0136/TM0137, sem CNPJ/endereço pessoais. */
function commonScope(): AssistanceConfiguration {
    return {
        programs: { pgr: { selected: true }, pcmso: { selected: true }, ltcat: { selected: true }, lip: { selected: true }, aet: { selected: false } },
        management: {
            psychosocial: { selected: true, parameters: { instruments: ['Instrumento definido no planejamento técnico'], integration: 'Integração dos resultados ao PGR da empresa.' } },
            esocial: { selected: true, parameters: { events: ['S-2210', 'S-2220', 'S-2240'], servicePeriod: '12 meses' } },
            art: { selected: true, parameters: { quantity: 1, coveredServices: ['PGR', 'LTCAT', 'LIP'] } },
            'technical-support': { selected: true, parameters: { channels: ['E-mail', 'Atendimento remoto'], servicePeriod: '12 meses' } }
        },
        visits: { included: true, frequency: 'monthly', durationHours: 4, quantity: 12, notes: 'Agendamento com o responsável pela unidade.' },
        trainings: {
            nr01: { selected: true, modality: 'online', frequency: 'annual', occurrences: 1, classes: 1, hoursPerClass: 4 },
            nr06: { selected: true, modality: 'online', frequency: 'annual', occurrences: 1, classes: 1, hoursPerClass: 2 },
            brigade: { selected: true, modality: 'onsite', frequency: 'annual', occurrences: 1, classes: 1, hoursPerClass: 8, notes: 'Prática conforme planejamento e infraestrutura acordados.' }
        },
        measurements: { heat: { selected: true, quantity: 1, unit: 'point', agent: 'Calor', method: 'IBUTG', workGroups: ['Área operacional'], pricingMode: 'included' } },
        renewal: 'Renovação mediante acordo entre as partes.', adjustment: 'Reajuste conforme condições contratuais.'
    };
}

function company(id: string, name: string, employees: number, brigade: number, monthly: number): Company {
    return { id, legalName: name, tradeName: name, employeeCount: employees, roleCount: 3,
        roles: ['Atendimento', 'Operação', 'Administração'],
        assistanceConfig: {
            management: { psychosocial: { parameters: { participantCount: employees } } },
            trainings: { nr01: { participants: employees }, nr06: { participants: employees }, brigade: { participants: brigade } },
            pricing: { monthlyCents: monthly }
        } };
}

function base(companies: Company[], isGroup: boolean, scope: AssistanceConfiguration): Proposal {
    return createAssistanceProposal({
        isGroup, ...(isGroup ? { groupName: 'Grupo Alimentação Exemplo' } : {}), companies,
        metadata: { id: isGroup ? 'fixture-tm137' : 'fixture-tm136', number: isGroup ? 'V2-GRUPO-EXEMPLO' : 'V2-ASSESSORIA-EXEMPLO', issuedOn: '2026-08-27', revision: 1, title: 'Assessoria em Segurança e Saúde do Trabalho', author: { name: 'Equipe EngMarq', role: 'Responsável pela proposta' } },
        scope: { objective: 'Assessoria em SST com programas, gestão, capacitações e avaliações individualizados conforme a configuração de cada empresa.', exclusions: ['Demandas fora do escopo dependem de contratação específica.'], assumptions: ['Acesso aos locais e informações fornecidos pela contratante.'] },
        assistanceConfiguration: scope,
        commercial: { currency: 'BRL', termMonths: 12, installmentCount: 12, validityDays: 15, paymentTerms: ['Pagamento mensal por PIX, boleto ou transferência.'], executionTerms: ['Início após formalização e alinhamento do cronograma.'], showMonthlyValue: true, showContractTotal: false, showAggregateTotal: false, showPerCompanyPricing: true },
        options: { includeCover: true, includeAcceptance: true, detailLevel: isGroup ? 'standard' : 'full' }
    });
}

export function tm136AssistanceProposal(): Proposal {
    const scope = commonScope();
    scope.measurements = {
        heat: { selected: true, quantity: 1, unit: 'point', agent: 'Calor', method: 'IBUTG', workGroups: ['Área operacional'], pricingMode: 'separate-quote', notes: 'Somente executar após orçamento específico e aprovação.' },
        noise: { selected: false }
    };
    return base([company('condominio-exemplo', 'Condomínio Residencial Exemplo', 18, 10, 146000)], false, scope);
}

export function tm137GroupProposal(): Proposal {
    return base([
        company('padaria', 'Padaria Exemplo', 23, 10, 157000),
        company('pizzaria-salao', 'Pizzaria Salão Exemplo', 22, 10, 154500),
        company('pizzaria-norte', 'Pizzaria Norte Exemplo', 17, 10, 149000),
        company('pizzaria-sul', 'Pizzaria Sul Exemplo', 8, 8, 121000),
        company('delivery', 'Delivery Exemplo', 9, 9, 125000)
    ], true, commonScope());
}
