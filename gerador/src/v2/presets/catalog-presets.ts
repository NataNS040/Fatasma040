import type { DetailLevel, DocumentMode, ParameterValues } from '../domain/content';
import type { ProposalItem } from '../domain/proposal';
import { createCatalogItem } from '../catalog/select-service';
import { getCatalogEntry } from '../catalog/services';

export interface ProposalPreset {
    id: string;
    name: string;
    documentMode: DocumentMode;
    legacyIds: string[];
    services: { catalogId: string; detailLevel: DetailLevel; parameters?: ParameterValues }[];
}

const preset = (id: string, name: string, ids: string[], documentMode: DocumentMode = 'standard', legacyIds: string[] = []): ProposalPreset => ({
    id, name, documentMode, legacyIds,
    services: ids.map(catalogId => ({ catalogId, detailLevel: documentMode === 'consultive' ? 'full' : 'standard',
        ...(catalogId === 'art' ? { parameters: { quantity: 1, coveredServices: ids.filter(service => ['pgr', 'ltcat', 'lip', 'li', 'aet'].includes(service)).map(service => getCatalogEntry(service).content.profile.shortName) } } : {}) }))
});

const presets: ProposalPreset[] = [
    ...['pgr', 'pcmso', 'ltcat', 'aet'].map(id => preset(id, getCatalogEntry(id).content.profile.shortName, [id], 'standard', [id])),
    preset('pgr-pcmso', 'PGR + PCMSO', ['pgr', 'pcmso'], 'standard', ['pgr-pcmso']),
    preset('kit-programas', 'Kit de Programas', ['pgr', 'pcmso', 'ltcat'], 'standard', ['pgr-pcmso-ltcat']),
    preset('kit-completo', 'Kit Completo de SST', ['pgr', 'pcmso', 'ltcat', 'lip', 'art'], 'standard', ['pgr-pcmso-ltcat-lip']),
    preset('kit-psicossocial', 'Kit SST + Psicossocial', ['pgr', 'pcmso', 'ltcat', 'psychosocial'], 'standard', ['pgr-pcmso-ltcat-psico']),
    preset('combo-completo', 'Kit SST + LIP + Psicossocial + ART', ['pgr', 'pcmso', 'ltcat', 'lip', 'psychosocial', 'art'], 'standard', ['combo-completo']),
    preset('li', 'Laudo de Insalubridade', ['li', 'art'], 'standard', ['laudo-insalubridade']),
    preset('lip', 'Laudo de Insalubridade e Periculosidade', ['lip', 'art'], 'standard', ['laudo-insalubridade-periculosidade']),
    preset('psychosocial', 'Avaliação Psicossocial', ['psychosocial'], 'standard', ['psicossocial']),
    ...[['noise', 'ruido'], ['heat', 'calor'], ['vibration', 'vibracao'], ['chemicals', 'quimicos'], ['dust', 'poeiras']].map(([id, legacy]) => preset(id, getCatalogEntry(id).content.profile.shortName, [id], 'compact', [`medicao-${legacy}`])),
    preset('pacote-medicoes', 'Medições ocupacionais combinadas', ['noise', 'heat', 'vibration', 'chemicals', 'dust', 'art'], 'standard', ['pacote-medicoes']),
    ...['nr01', 'nr05', 'nr06', 'nr10', 'nr12', 'nr18', 'nr20', 'nr33', 'nr35'].map(id => preset(id, getCatalogEntry(id).content.profile.shortName, [id], ['nr01', 'nr06'].includes(id) ? 'compact' : 'standard', [`treinamento-${id}`])),
    preset('brigade', 'Brigada de Incêndio', ['brigade'], 'standard', ['brigada']),
    preset('treinamentos-operacionais', 'Treinamentos operacionais: EPI, eletricidade, máquinas, inflamáveis e altura', ['nr06', 'nr10', 'nr12', 'nr20', 'nr35']),
    preset('assessoria', 'Assessoria em SST', ['assistance'], 'consultive', ['assessoria']),
    preset('assessoria-programas', 'Assessoria + Programas', ['assistance', 'pgr', 'pcmso', 'ltcat'], 'consultive', ['assessoria-programas']),
    preset('assessoria-psicossocial', 'Assessoria + Programas + Psicossocial', ['assistance', 'pgr', 'pcmso', 'ltcat', 'psychosocial'], 'consultive', ['assessoria-psicossocial']),
    preset('assessoria-integrada', 'Assessoria integrada: programas, LIP, ART, eSocial e suporte', ['assistance', 'pgr', 'pcmso', 'ltcat', 'lip', 'art', 'esocial', 'technical-support'], 'consultive')
];

presets.find(item => item.id === 'pacote-medicoes')!.services.find(item => item.catalogId === 'art')!.parameters = { quantity: 1, coveredServices: ['Avaliações ocupacionais selecionadas'] };

export function listPresets(): ProposalPreset[] { return JSON.parse(JSON.stringify(presets)) as ProposalPreset[]; }

export function getPreset(id: string): ProposalPreset {
    const found = presets.find(candidate => candidate.id === id || candidate.legacyIds.includes(id));
    if (!found) throw new Error(`Preset desconhecido: ${id}`);
    return JSON.parse(JSON.stringify(found)) as ProposalPreset;
}

/** Quantidade de ART do preset é configuração editorial inicial, revisável por contratação. */
export function instantiatePreset(id: string, companyId: string, idPrefix: string, overrides: Record<string, { detailLevel?: DetailLevel; parameters?: ParameterValues }> = {}): ProposalItem[] {
    const preset = getPreset(id);
    for (const key of Object.keys(overrides)) {
        if (!preset.services.some(service => service.catalogId === key)) throw new Error(`Serviço fora do preset: ${key}`);
    }
    return preset.services.map(service => createCatalogItem(service.catalogId, {
        id: `${idPrefix}-${service.catalogId}`, companyId,
        detailLevel: overrides[service.catalogId]?.detailLevel ?? service.detailLevel,
        parameters: { ...service.parameters, ...overrides[service.catalogId]?.parameters }
    }));
}
