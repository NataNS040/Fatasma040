import { instantiatePreset } from './catalog-presets';
import type { Service } from '../domain/proposal';

/** Preset cria seleções editáveis; não escolhe layout, preço ou inclui medições. */
export function createProgramKit(companyId: string, idPrefix: string): Service[] {
    return instantiatePreset('kit-programas', companyId, idPrefix) as Service[];
}
