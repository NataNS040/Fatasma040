import type { ParameterDefinition } from './content';
import type { CustomItemDetails, Service } from './proposal';

/** Materializa um snapshot local, usando os mesmos contratos dos serviços oficiais. */
export function createCustomItem(input: { id: string; companyId: string; title: string; notes: string; custom: CustomItemDetails }): Service {
    const { custom, title } = input;
    const numeric = (id: string, label: string, integer = true): ParameterDefinition => ({ id, label, binding: `custom.${id}`, description: '', required: false, type: 'number', min: integer ? 1 : 0.01, integer, unit: '' });
    const parameters: ParameterDefinition[] = custom.category === 'trainings'
        ? [numeric('participants', 'Participantes'), numeric('classes', 'Turmas'), numeric('hours', 'Carga horária (h)', false), { id: 'modality', label: 'Modalidade', binding: 'custom.modality', description: '', required: false, type: 'choice', choices: ['onsite', 'online', 'hybrid'] }]
        : custom.category === 'measurements'
            ? [numeric('quantity', 'Quantidade'), { id: 'unit', label: 'Unidade / pontos', binding: 'custom.unit', description: '', required: false, type: 'text' }]
            : [];
    return {
        ...input, kind: 'custom', custom: { ...custom },
        content: {
            title, objective: custom.description || title, methodology: [], deliverables: [custom.description || title],
            exclusions: [], responsibilities: [], references: [], provenance: { source: 'Escopo personalizado desta proposta', revision: '1', review: 'pending' },
            profile: {
                shortName: title, category: custom.category, summary: custom.description, scope: [], executionSteps: [],
                providerResponsibilities: [], clientResponsibilities: [], inclusions: [], observations: [],
                periodicity: { mode: 'on-demand', description: '' }, defaultDetail: 'standard', icon: '',
                visual: { accent: '', section: custom.category === 'management' ? 'assistance' : custom.category, order: 100 }, parameters
            }
        }
    };
}
