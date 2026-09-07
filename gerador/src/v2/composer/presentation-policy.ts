import type { ContentField, DetailLevel, SectionGroup } from '../domain/content';

export const presentationFields: Readonly<Record<DetailLevel, readonly ContentField[]>> = {
    summary: ['summary'],
    standard: ['summary', 'methodology', 'deliverables'],
    full: ['summary', 'objective', 'scope', 'methodology', 'executionSteps', 'deliverables', 'providerResponsibilities', 'clientResponsibilities', 'responsibilities', 'references', 'inclusions', 'exclusions', 'observations', 'periodicity']
};

export const sectionDefinitions: Readonly<Record<SectionGroup | 'shared', { title: string; order: number }>> = {
    assistance: { title: 'Escopo da assessoria e acompanhamento', order: 10 },
    programs: { title: 'Programas e laudos de SST', order: 20 },
    complementary: { title: 'Avaliações complementares', order: 30 },
    esocial: { title: 'Gestão do eSocial', order: 40 },
    measurements: { title: 'Medições ocupacionais', order: 50 },
    trainings: { title: 'Treinamentos', order: 60 },
    'technical-responsibility': { title: 'Responsabilidade técnica', order: 70 },
    other: { title: 'Serviços complementares', order: 80 },
    shared: { title: 'Metodologia, entregas e condições compartilhadas', order: 90 }
};

export interface CompositionOptions {
    sectionOrder?: Partial<Record<SectionGroup | 'shared', number>>;
    sectionTitles?: Partial<Record<SectionGroup | 'shared', string>>;
}

/** Não deduplicar objetivos, etapas ou escopo: a sequência e o contexto são relevantes. */
export const sharedFields: readonly ContentField[] = ['methodology', 'deliverables', 'providerResponsibilities', 'clientResponsibilities', 'responsibilities', 'references', 'inclusions', 'exclusions', 'observations'];
