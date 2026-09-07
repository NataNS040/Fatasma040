import type { DetailLevel, ParameterValues } from '../domain/content';
import type { ProposalItem } from '../domain/proposal';
import { createCatalogItem } from '../catalog/select-service';

export interface ProposalPreset {
    id: string;
    name: string;
    services: { catalogId: string; detailLevel: DetailLevel; parameters?: ParameterValues }[];
}

const presets: ProposalPreset[] = [
    { id: 'kit-programas', name: 'Kit de Programas', services: ['pgr', 'pcmso', 'ltcat'].map(catalogId => ({ catalogId, detailLevel: 'standard' })) },
    { id: 'kit-completo', name: 'Kit Completo de SST', services: [
        ...['pgr', 'pcmso', 'ltcat', 'lip'].map(catalogId => ({ catalogId, detailLevel: 'standard' as const })),
        { catalogId: 'art', detailLevel: 'standard', parameters: { quantity: 1, coveredServices: ['PGR', 'LTCAT', 'LIP'] } }
    ] }
];

export function listPresets(): ProposalPreset[] { return JSON.parse(JSON.stringify(presets)) as ProposalPreset[]; }

/** Quantidade de ART do preset é configuração editorial inicial, revisável por contratação. */
export function instantiatePreset(id: string, companyId: string, idPrefix: string, overrides: Record<string, { detailLevel?: DetailLevel; parameters?: ParameterValues }> = {}): ProposalItem[] {
    const preset = presets.find(candidate => candidate.id === id);
    if (!preset) throw new Error(`Preset desconhecido: ${id}`);
    for (const key of Object.keys(overrides)) {
        if (!preset.services.some(service => service.catalogId === key)) throw new Error(`Serviço fora do preset: ${key}`);
    }
    return preset.services.map(service => createCatalogItem(service.catalogId, {
        id: `${idPrefix}-${service.catalogId}`, companyId,
        detailLevel: overrides[service.catalogId]?.detailLevel ?? service.detailLevel,
        parameters: { ...service.parameters, ...overrides[service.catalogId]?.parameters }
    }));
}
