/** Contratos de metadados da fundação, preservados para compatibilidade.
 * O resultado executável atual é ExportPreparation em engine.ts;
 * geometria real e avisos são inspecionados por layout.ts, nunca estimados por caracteres.
 */
export interface BlockLayout {
    blockId: string;
    heightMm: number;
    keepTogether: boolean;
    keepWithNext: boolean;
    breakBefore: boolean;
}

export interface DocumentPage {
    number: number;
    blockIds: string[];
}

export interface PaginationResult {
    pages: DocumentPage[];
    overflowBlockIds: string[];
}
