import type { ParameterDefinition } from '../domain/content';
import type { CatalogEntry } from './types';

export const sources = {
    programs: 'propostas/maio-2026/proposta-pgr-pcmso-ltcat-atecmontagem.html',
    assistance: 'propostas/agosto-2026/TM0136-Condominio Villaggio Di Roma.html',
    group: 'propostas/agosto-2026/TM0137-Grupo Bertis.html',
    aet: 'propostas/marco-2026/proposta-aet-clbi.html',
    measurements: 'propostas/maio-2026/proposta-medicoes-ml2.html',
    unimetais: 'propostas/maio-2026/proposta-programas-medicoes-unimetais.html',
    marista: 'propostas/julho-2026/TM0117-Colegio Marista Natal.html',
    training: 'propostas/janeiro-2026/proposta-treinamentos-modelo.html',
    domus: 'propostas/abril-2026/proposta-treinamentos-domus-esquadrias.html',
    brigade: 'propostas/maio-2026/proposta-brigada-incendio-ceneged.html',
    cipa: 'propostas/junho-2026/TM0090-MVP Engenharia.html'
} as const;

// Frases comuns são compartilháveis por igualdade de texto, mantendo item e CNPJ.
export const common = {
    planning: 'Alinhamento inicial do escopo, coleta de documentos e definição do cronograma com a contratante.',
    information: 'Fornecer informações atualizadas sobre funções, atividades, ambientes e colaboradores abrangidos.',
    access: 'Disponibilizar acesso aos ambientes e um responsável para acompanhar as atividades agendadas.',
    qualified: 'Designar profissional com qualificação compatível com os serviços contratados.',
    delivery: 'Entregar os documentos e registros previstos no escopo, identificados por empresa.',
    implementation: 'A implementação das medidas recomendadas cabe à contratante.',
    quantitative: 'Medições quantitativas somente integram a contratação quando selecionadas e dimensionadas no escopo.',
    trainingPlanning: 'Organizar datas, participantes, turmas e infraestrutura com a contratante.',
    attendance: 'Lista de presença ou registro de conclusão por capacitação.',
    certificates: 'Certificados individuais correspondentes à capacitação efetivamente realizada.'
} as const;

export const numberParameter = (id: string, label: string, unit: string, binding?: string, required = true, min = 1, integer = true): ParameterDefinition => ({
    id, label, unit, binding, required, min, integer, type: 'number', description: `${label} considerados na contratação; ajustar à realidade da empresa.`
});
export const textParameter = (id: string, label: string, binding?: string, required = true): ParameterDefinition => ({
    id, label, binding, required, type: 'text', description: `${label} a definir no alinhamento técnico.`
});
export const listParameter = (id: string, label: string, binding?: string, required = true, choices?: string[]): ParameterDefinition => ({
    id, label, binding, required, choices, type: 'list', description: `${label} expressamente abrangidos pelo escopo.`
});

export const programParameters: ParameterDefinition[] = [
    numberParameter('employeeCount', 'Colaboradores abrangidos', 'pessoas', undefined, false),
    numberParameter('roleCount', 'Funções abrangidas', 'funções', undefined, false),
    listParameter('workAreas', 'Setores e unidades', undefined, false)
];

/** Exige os conteúdos específicos; compartilha apenas metadados e rotina administrativa. */
export function defineEntry(data: {
    id: string; kind: CatalogEntry['kind']; title: string; shortName: string;
    category: CatalogEntry['content']['profile']['category'];
    section: CatalogEntry['content']['profile']['visual']['section']; order: number; icon: string;
    summary: string; objective: string; scope: string[]; methodology: string[]; steps: string[];
    deliverables: string[]; references: string[]; provider: string[]; client: string[];
    inclusions: string[]; exclusions: string[]; observations: string[];
    periodicity: CatalogEntry['content']['profile']['periodicity']; parameters: ParameterDefinition[];
    sources: string[];
}): CatalogEntry {
    const accents = { programs: '#2b6cb0', management: '#38a169', measurements: '#0f766e', trainings: '#dd6b20' };
    return {
        id: data.id, kind: data.kind,
        content: {
            title: data.title, objective: data.objective, methodology: data.methodology,
            deliverables: data.deliverables, references: data.references, exclusions: data.exclusions,
            responsibilities: [],
            provenance: { source: data.sources[0], sources: [...new Set(data.sources)], revision: '2026-09-07.2', review: 'pending' },
            profile: {
                shortName: data.shortName, category: data.category, summary: data.summary,
                scope: data.scope, executionSteps: data.steps,
                providerResponsibilities: data.provider, clientResponsibilities: data.client,
                inclusions: data.inclusions, observations: data.observations, periodicity: data.periodicity,
                parameters: data.parameters, defaultDetail: 'standard', icon: data.icon,
                visual: { accent: accents[data.category], section: data.section, order: data.order }
            }
        }
    };
}
