import type { DetailLevel, ParameterValues } from '../domain/content';
import type { ProposalItem } from '../domain/proposal';
import { supportedBindings, validateParameterValues } from '../validation/parameters';
import { getCatalogEntry } from './services';

export interface ServiceSelection {
    id: string;
    companyId: string;
    detailLevel?: DetailLevel;
    parameters?: ParameterValues;
}

/** Materializa o snapshot e os campos do domínio. Não cria preços ou cláusulas comerciais. */
export function createCatalogItem(catalogId: string, selection: ServiceSelection): ProposalItem {
    const entry = getCatalogEntry(catalogId);
    const definitions = entry.content.profile.parameters;
    const values = selection.parameters ?? {};
    const issues = validateParameterValues(definitions, values);
    if (!selection.id.trim() || !selection.companyId.trim()) throw new Error('IDs de item e empresa são obrigatórios.');
    if (issues.length) throw new Error(issues.map(issue => `${issue.path}: ${issue.message}`).join('\n'));
    const fields: Record<string, unknown> = {};
    const parameters: ParameterValues = {};
    for (const definition of definitions) {
        const value = values[definition.id];
        if (value === undefined) continue;
        if (!definition.binding) parameters[definition.id] = value;
        else {
            if (!supportedBindings.has(definition.binding)) throw new Error(`Binding não suportado: ${definition.binding}`);
            const [field, nested] = definition.binding.split('.');
            if (nested) fields[field] = { ...(fields[field] as object ?? {}), [nested]: value };
            else fields[field] = value;
        }
    }
    if (entry.kind === 'training') fields['syllabus'] = [...entry.content.profile.scope];
    // As definições do catálogo validam tipos e campos obrigatórios antes da materialização.
    const item = { ...fields, id: selection.id, companyId: selection.companyId, catalogId,
        kind: entry.kind, content: entry.content, parameters, detailLevel: selection.detailLevel } as ProposalItem;
    // Evita referências compartilhadas com as listas de configuração fornecidas pelo chamador.
    return JSON.parse(JSON.stringify(item)) as ProposalItem;
}
