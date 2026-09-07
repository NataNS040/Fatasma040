/** Centavos e contagens nunca aceitam NaN, Infinity ou perda de precisão. */
export function isNonNegativeInteger(value: number): boolean {
    return Number.isSafeInteger(value) && value >= 0;
}

export function isCivilDate(value: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(`${value}T00:00:00.000Z`);
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
