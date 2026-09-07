import type { ParameterDefinition, ParameterValues } from '../domain/content';
import type { ProposalItem } from '../domain/proposal';

export interface ParameterIssue { code: string; path: string; message: string }

/** Bindings limitados a campos já definidos no domínio; nunca escrevem caminhos arbitrários. */
export const supportedBindings = new Set([
    'participants', 'classes', 'hoursPerClass', 'occurrences', 'modality',
    'agent', 'method', 'quantity', 'unit', 'workGroups',
    'termMonths', 'visitsPerMonth', 'hoursPerVisit', 'support', 'renewal', 'adjustment',
    'psychosocial.participantCount', 'psychosocial.instruments', 'psychosocial.integration'
]);

export function readParameter(item: ProposalItem, definition: ParameterDefinition): unknown {
    if (!definition.binding) return item.parameters?.[definition.id];
    if (!supportedBindings.has(definition.binding)) return undefined;
    const [field, nested] = definition.binding.split('.');
    const value: unknown = (item as unknown as Record<string, unknown>)[field];
    return nested && value && typeof value === 'object' ? (value as Record<string, unknown>)[nested] : value;
}

export function validateParameterValue(definition: ParameterDefinition, value: unknown): string | undefined {
    if (value === undefined) return definition.required ? 'Parâmetro obrigatório não informado.' : undefined;
    switch (definition.type) {
        case 'number':
            return typeof value === 'number' && Number.isFinite(value) && value >= definition.min && (!definition.integer || Number.isSafeInteger(value)) ? undefined : 'Número fora dos limites do parâmetro.';
        case 'text':
            return typeof value === 'string' && value.trim() ? undefined : 'Informe um texto não vazio.';
        case 'choice':
            return typeof value === 'string' && definition.choices.includes(value) ? undefined : 'Opção não permitida para este parâmetro.';
        case 'list':
            return Array.isArray(value) && value.length > 0 && value.every(v => typeof v === 'string' && v.trim() && (!definition.choices || definition.choices.includes(v))) ? undefined : 'Informe uma lista não vazia com valores permitidos.';
    }
}

export function validateParameterValues(definitions: ParameterDefinition[], values: ParameterValues): ParameterIssue[] {
    const issues: ParameterIssue[] = [];
    for (const definition of definitions) {
        const message = validateParameterValue(definition, values[definition.id]);
        if (message) issues.push({ code: 'invalid-parameter', path: definition.id, message });
    }
    for (const id of Object.keys(values)) {
        if (!definitions.some(d => d.id === id)) issues.push({ code: 'unknown-parameter', path: id, message: 'Parâmetro não definido no snapshot técnico.' });
    }
    return issues;
}

export function validateItemParameters(item: ProposalItem): ParameterIssue[] {
    const definitions = item.content.profile?.parameters;
    if (!definitions) return [];
    const values: ParameterValues = {};
    for (const definition of definitions) {
        const value = readParameter(item, definition);
        if (value !== undefined) values[definition.id] = value as ParameterValues[string];
    }
    const issues = validateParameterValues(definitions, values);
    for (const id of Object.keys(item.parameters ?? {})) {
        const definition = definitions.find(d => d.id === id);
        if (!definition) issues.push({ code: 'unknown-parameter', path: id, message: 'Parâmetro não definido no snapshot técnico.' });
        else if (definition.binding) issues.push({ code: 'duplicate-parameter', path: id, message: 'Use somente o campo do domínio indicado no binding; não duplique em parameters.' });
    }
    return issues;
}
