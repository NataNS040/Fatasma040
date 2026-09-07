import type { ContentField, DetailLevel, DocumentMode, ParameterValue, SectionGroup } from '../domain/content';
import type { ProposalItem } from '../domain/proposal';
import type { ServicePresentation, SharedTechnicalContent, TechnicalSectionBlock } from '../domain/document';
import { readParameter } from '../validation/parameters';
import { presentationFields, sectionDefinitions, sharedFields, type CompositionOptions } from './presentation-policy';

const compare = (a: string, b: string): number => a < b ? -1 : a > b ? 1 : 0;
const normalized = (text: string): string => text.trim().replace(/\s+/g, ' ');
const fallbackGroups: Record<ProposalItem['kind'], SectionGroup> = {
    program: 'programs', report: 'programs', psychosocial: 'complementary', engineering: 'technical-responsibility',
    management: 'assistance', custom: 'other', training: 'trainings', measurement: 'measurements', assistance: 'assistance'
};

function projectService(item: ProposalItem, proposalLevel?: DetailLevel): ServicePresentation {
    const c = item.content;
    const profile = c.profile;
    const level = item.detailLevel ?? proposalLevel ?? profile?.defaultDetail ?? 'standard';
    const available: Record<ContentField, string[]> = {
        summary: [profile?.summary ?? c.objective], objective: [c.objective],
        scope: item.kind === 'training' ? item.syllabus : profile?.scope ?? [], methodology: c.methodology,
        executionSteps: profile?.executionSteps ?? [], deliverables: c.deliverables,
        references: c.references, responsibilities: c.responsibilities,
        providerResponsibilities: profile?.providerResponsibilities ?? [], clientResponsibilities: profile?.clientResponsibilities ?? [],
        inclusions: profile?.inclusions ?? [], exclusions: c.exclusions, observations: profile?.observations ?? [],
        periodicity: profile ? [profile.periodicity.description] : []
    };
    const fields: ServicePresentation['fields'] = {};
    const presented = new Set<string>();
    for (const field of presentationFields[level]) {
        const values = available[field].filter(text => {
            const key = normalized(text);
            if (!key || presented.has(key)) return false;
            presented.add(key);
            return true;
        });
        if (values.length) fields[field] = [...values];
    }
    const parameters: ServicePresentation['parameters'] = [];
    for (const definition of profile?.parameters ?? []) {
        const value = readParameter(item, definition);
        if (value !== undefined) parameters.push({ id: definition.id, label: definition.label, value: value as ParameterValue, ...(definition.type === 'number' ? { unit: definition.unit } : {}) });
    }
    return { itemId: item.id, companyId: item.companyId, catalogId: item.catalogId, title: c.title,
        shortName: profile?.shortName ?? c.title, level, fields, parameters, sharedContentIds: [],
        ...(item.notes !== undefined ? { notes: item.notes } : {}),
        ...(item.kind === 'training' && item.frequency ? { frequency: item.frequency } : {}),
        ...(item.kind === 'assistance' && item.visits ? { visits: item.visits } : {}) };
}

/** Entrada já validada pelo composer público. Compartilha texto exato por campo e CNPJ. */
export function composeTechnicalSections(items: ProposalItem[], companyIds: string[], defaultLevel: DetailLevel | undefined, options: CompositionOptions, mode: DocumentMode = 'standard'): TechnicalSectionBlock[] {
    const sectionOrder = (group: SectionGroup | 'shared'): number => options.sectionOrder?.[group] ?? sectionDefinitions[group].order;
    const title = (group: SectionGroup | 'shared'): string => options.sectionTitles?.[group] ?? sectionDefinitions[group].title;
    const groupOf = (item: ProposalItem): SectionGroup => item.content.profile?.visual.section ?? fallbackGroups[item.kind];
    const ordered = [...items].sort((a, b) =>
        sectionOrder(groupOf(a)) - sectionOrder(groupOf(b)) || compare(groupOf(a), groupOf(b)) ||
        companyIds.indexOf(a.companyId) - companyIds.indexOf(b.companyId) ||
        (a.content.profile?.visual.order ?? 100) - (b.content.profile?.visual.order ?? 100) || compare(a.id, b.id));
    const sections = new Map<SectionGroup, Extract<TechnicalSectionBlock, { kind: 'technical-section' }>>();
    for (const item of ordered) {
        const group = groupOf(item);
        let section = sections.get(group);
        if (!section) {
            section = { id: `section:${group}`, kind: 'technical-section', group, title: title(group), services: [] };
            sections.set(group, section);
        }
        section.services.push(projectService(item, defaultLevel));
    }
    const presentations = [...sections.values()].flatMap(section => section.services);
    const candidates = new Map<string, { field: ContentField; text: string; entries: ServicePresentation[] }>();
    for (const service of presentations) {
        for (const field of sharedFields) {
            for (const text of service.fields[field] ?? []) {
                const key = JSON.stringify([service.companyId, field, normalized(text)]);
                const candidate = candidates.get(key) ?? { field, text, entries: [] };
                if (!candidate.entries.includes(service)) candidate.entries.push(service);
                candidates.set(key, candidate);
            }
        }
    }
    const shared: SharedTechnicalContent[] = [];
    for (const candidate of candidates.values()) {
        if (candidate.entries.length < 2) continue;
        const id = `shared:${shared.length + 1}`;
        shared.push({ id, field: candidate.field, text: candidate.text,
            appliesTo: candidate.entries.map(service => ({ itemId: service.itemId, companyId: service.companyId })) });
        for (const service of candidate.entries) {
            const remaining = service.fields[candidate.field]!.filter(text => normalized(text) !== normalized(candidate.text));
            if (remaining.length) service.fields[candidate.field] = remaining;
            else delete service.fields[candidate.field];
            service.sharedContentIds.push(id);
        }
    }
    const blocks: TechnicalSectionBlock[] = [...sections.values()];
    if (shared.length) blocks.push({ id: 'section:shared', kind: 'shared-technical', title: title('shared'), content: shared });
    blocks.sort((a, b) => {
        const aGroup = a.kind === 'technical-section' ? a.group : 'shared';
        const bGroup = b.kind === 'technical-section' ? b.group : 'shared';
        return sectionOrder(aGroup) - sectionOrder(bGroup) || compare(aGroup, bGroup);
    });
    if (mode === 'compact' && sections.size) {
        return [{ id: 'section:compact', kind: 'technical-section', group: 'other', title: 'Escopo técnico contratado', services: blocks.flatMap(block => block.kind === 'technical-section' ? block.services : []) }, ...blocks.filter(block => block.kind === 'shared-technical')];
    }
    return blocks;
}
