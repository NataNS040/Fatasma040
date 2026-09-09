/** Aceita CPF sem máscara ou com a máscara completa; nenhuma consulta externa. */
export function isValidCpf(value: string): boolean {
    return /^(?:\d{11}|\d{3}\.\d{3}\.\d{3}-\d{2})$/.test(value.trim()) && !/^(\d)\1{10}$/.test(value.replace(/\D/g, ''));
}
export function formatCpf(value: string): string {
    return value.replace(/\D/g, '').slice(0, 11).replace(/^(\d{3})(\d)/, '$1.$2').replace(/^(\d{3}\.\d{3})(\d)/, '$1.$2').replace(/(\d{3}\.\d{3}\.\d{3})(\d)/, '$1-$2');
}
