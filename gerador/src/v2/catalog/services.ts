import { programEntries } from './programs';
import { managementEntries } from './management';
import { measurementEntries } from './measurements';
import { trainingEntries } from './trainings';
import type { CatalogEntry } from './types';

export type { CatalogEntry } from './types';
const entries: CatalogEntry[] = [...programEntries, ...managementEntries, ...measurementEntries, ...trainingEntries];

/** Retorna snapshots independentes; a composição nunca consulta este registro. */
export function listCatalogEntries(): CatalogEntry[] {
    return JSON.parse(JSON.stringify(entries)) as CatalogEntry[];
}

/** IDs da fundação V2 (noise, heat, brigade etc.) foram preservados. */
export function getCatalogEntry(id: string): CatalogEntry {
    const found = entries.find(item => item.id === id);
    if (!found) throw new Error(`Conteúdo não encontrado no catálogo: ${id}`);
    return JSON.parse(JSON.stringify(found)) as CatalogEntry;
}
