import type { ContentKind, TechnicalContent } from '../domain/proposal';
import type { ServiceProfile } from '../domain/content';

export interface CatalogEntry {
    id: string;
    kind: ContentKind;
    content: TechnicalContent & { profile: ServiceProfile };
}
