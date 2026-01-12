// =====================================================
// FUNÇÕES UTILITÁRIAS - FORMATAÇÃO
// =====================================================

/**
 * Formata um valor numérico para moeda brasileira (R$)
 * @param valor - Valor a ser formatado
 * @returns String formatada (ex: "1.500,00")
 */
export function formatMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

/**
 * Formata uma data ISO para formato extenso brasileiro
 * @param data - Data no formato YYYY-MM-DD
 * @returns String formatada (ex: "15 de Janeiro de 2025")
 */
export function formatData(data: string): string {
    if (!data) return '';
    
    const meses: string[] = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril',
        'Maio', 'Junho', 'Julho', 'Agosto',
        'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    const [ano, mes, dia] = data.split('-');
    return `${parseInt(dia)} de ${meses[parseInt(mes) - 1]} de ${ano}`;
}

/**
 * Converte um valor numérico para valor por extenso em português
 * @param valor - Valor numérico a ser convertido
 * @returns String com o valor por extenso (ex: "mil e quinhentos reais")
 */
export function valorPorExtenso(valor: number): string {
    const unidades: string[] = [
        '', 'um', 'dois', 'três', 'quatro', 'cinco',
        'seis', 'sete', 'oito', 'nove', 'dez',
        'onze', 'doze', 'treze', 'quatorze', 'quinze',
        'dezesseis', 'dezessete', 'dezoito', 'dezenove'
    ];
    
    const dezenas: string[] = [
        '', '', 'vinte', 'trinta', 'quarenta',
        'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'
    ];
    
    const centenas: string[] = [
        '', 'cento', 'duzentos', 'trezentos', 'quatrocentos',
        'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'
    ];
    
    if (valor === 0) return 'zero reais';
    if (valor === 100) return 'cem reais';
    
    const inteiro = Math.floor(valor);
    const centavos = Math.round((valor - inteiro) * 100);
    
    let resultado = '';
    
    // Milhares
    if (inteiro >= 1000) {
        const milhares = Math.floor(inteiro / 1000);
        if (milhares === 1) {
            resultado += 'mil';
        } else if (milhares < 20) {
            resultado += unidades[milhares] + ' mil';
        } else {
            resultado += dezenas[Math.floor(milhares / 10)] + 
                (milhares % 10 ? ' e ' + unidades[milhares % 10] : '') + ' mil';
        }
        
        const resto = inteiro % 1000;
        if (resto > 0) resultado += ' ';
    }
    
    // Centenas
    const resto = inteiro % 1000;
    if (resto >= 100) {
        if (resto === 100) {
            resultado += 'cem';
        } else {
            resultado += centenas[Math.floor(resto / 100)];
        }
        if (resto % 100 > 0) resultado += ' e ';
    }
    
    // Dezenas e unidades
    const dezena = resto % 100;
    if (dezena > 0) {
        if (dezena < 20) {
            resultado += unidades[dezena];
        } else {
            resultado += dezenas[Math.floor(dezena / 10)] + 
                (dezena % 10 ? ' e ' + unidades[dezena % 10] : '');
        }
    }
    
    resultado += inteiro === 1 ? ' real' : ' reais';
    
    // Centavos
    if (centavos > 0) {
        resultado += ' e ';
        if (centavos < 20) {
            resultado += unidades[centavos];
        } else {
            resultado += dezenas[Math.floor(centavos / 10)] + 
                (centavos % 10 ? ' e ' + unidades[centavos % 10] : '');
        }
        resultado += centavos === 1 ? ' centavo' : ' centavos';
    }
    
    return resultado;
}

/**
 * Converte string de valor monetário para número
 * @param valorStr - String no formato brasileiro (ex: "1.500,00")
 * @returns Número parseado
 */
export function parseValorMonetario(valorStr: string): number {
    return parseFloat(valorStr.replace(/\./g, '').replace(',', '.')) || 0;
}

/**
 * Calcula valor com desconto
 * @param valorOriginal - Valor original
 * @param percentualDesconto - Percentual de desconto (0-100)
 * @returns Valor final com desconto aplicado
 */
export function calcularDesconto(valorOriginal: number, percentualDesconto: number): number {
    return valorOriginal - (valorOriginal * percentualDesconto / 100);
}
