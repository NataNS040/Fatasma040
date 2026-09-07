import type { ContentField, DetailLevel, DocumentMode, SectionGroup } from '../domain/content';
import type { ProposalItem } from '../domain/proposal';

export const presentationFields: Readonly<Record<DetailLevel, readonly ContentField[]>> = {
    summary: ['summary'],
    standard: ['summary', 'scope', 'methodology', 'deliverables', 'providerResponsibilities', 'clientResponsibilities', 'responsibilities', 'references', 'exclusions', 'observations'],
    full: ['summary', 'objective', 'scope', 'methodology', 'executionSteps', 'deliverables', 'providerResponsibilities', 'clientResponsibilities', 'responsibilities', 'references', 'inclusions', 'exclusions', 'observations', 'periodicity']
};

export function servicePresentationPolicy(item: ProposalItem, mode: DocumentMode, serviceCount: number, proposalLevel?: DetailLevel): { level: DetailLevel; fields: readonly ContentField[]; technical: boolean } {
    const explicit = item.detailLevel && item.detailLevel !== 'standard' ? item.detailLevel : proposalLevel;
    if (explicit === 'summary') return { level: 'summary', fields: presentationFields.summary, technical: false };
    const commercial: readonly ContentField[] = ['summary', 'deliverables'];
    if (mode === 'compact') return { level: 'standard', fields: commercial, technical: false };
    if (explicit === 'full') return { level: 'full', fields: presentationFields.full, technical: true };
    if (mode === 'standard') return { level: 'standard', fields: commercial, technical: false };
    if (item.kind === 'assistance' || (serviceCount === 1 && explicit !== 'standard')) return { level: 'full', fields: presentationFields.full, technical: true };
    if (serviceCount >= 4) return { level: 'standard', fields: commercial, technical: false };
    return { level: 'standard', fields: ['summary', 'objective', 'scope', 'methodology', 'deliverables', 'exclusions'], technical: true };
}

export const sectionDefinitions: Readonly<Record<SectionGroup | 'shared', { title: string; order: number }>> = {
    assistance: { title: 'Escopo da assessoria e acompanhamento', order: 10 },
    programs: { title: 'Programas e laudos de SST', order: 20 },
    complementary: { title: 'Avaliações complementares', order: 30 },
    esocial: { title: 'Gestão do eSocial', order: 40 },
    measurements: { title: 'Medições ocupacionais', order: 50 },
    trainings: { title: 'Treinamentos', order: 60 },
    'technical-responsibility': { title: 'Responsabilidade técnica', order: 70 },
    other: { title: 'Serviços complementares', order: 80 },
    shared: { title: 'Condições de execução', order: 90 }
};

export interface CompositionOptions {
    sectionOrder?: Partial<Record<SectionGroup | 'shared', number>>;
    sectionTitles?: Partial<Record<SectionGroup | 'shared', string>>;
}

/** Não deduplicar objetivos, etapas ou escopo: a sequência e o contexto são relevantes. */
export const sharedFields: readonly ContentField[] = ['methodology', 'deliverables', 'providerResponsibilities', 'clientResponsibilities', 'responsibilities', 'references', 'inclusions', 'exclusions', 'observations'];
