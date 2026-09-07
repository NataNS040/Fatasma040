export type DetailLevel = 'summary' | 'standard' | 'full';
export type DocumentMode = 'compact' | 'standard' | 'consultive';
export type ServiceCategory = 'programs' | 'management' | 'measurements' | 'trainings';
export type SectionGroup = 'assistance' | 'programs' | 'complementary' | 'esocial' | 'measurements' | 'trainings' | 'technical-responsibility' | 'other';
export type ParameterValue = string | number | string[];
export type ParameterValues = Record<string, ParameterValue>;

interface ParameterBase {
    id: string;
    label: string;
    description: string;
    required: boolean;
    /** Campo existente no domínio. Sem binding, o valor pertence a item.parameters. */
    binding?: string;
}
export type ParameterDefinition = ParameterBase & (
    | { type: 'number'; min: number; integer: boolean; unit: string }
    | { type: 'text' }
    | { type: 'choice'; choices: string[] }
    | { type: 'list'; choices?: string[] }
);

/** Conteúdo editorial expandido. Fica no snapshot, não é resolvido ao renderizar. */
export interface ServiceProfile {
    shortName: string;
    category: ServiceCategory;
    summary: string;
    scope: string[];
    executionSteps: string[];
    providerResponsibilities: string[];
    clientResponsibilities: string[];
    inclusions: string[];
    observations: string[];
    commercialConditions?: string[];
    periodicity: { mode: 'on-demand' | 'contract'; description: string };
    parameters: ParameterDefinition[];
    defaultDetail: DetailLevel;
    icon: string;
    visual: { accent: string; section: SectionGroup; order: number };
}

export type ContentField = 'summary' | 'objective' | 'scope' | 'methodology' | 'executionSteps' | 'deliverables' | 'references' | 'providerResponsibilities' | 'clientResponsibilities' | 'responsibilities' | 'inclusions' | 'exclusions' | 'observations' | 'periodicity';
