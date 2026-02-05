// =====================================================
// SCRIPT DO GERADOR DE RECIBOS
// =====================================================

import { obterSessao, removerSessao } from './auth/usuarios';
import { getTemplateRecibo, DadosRecibo } from './templates/template-recibo';
import { parseValorMonetario, formatMoeda, formatData } from './utils/formatters';
import logoEngmarq from '../assets/logoengmarq.png';

// =====================================================
// VERIFICAÇÃO DE AUTENTICAÇÃO
// =====================================================
const sessao = obterSessao();
if (!sessao.logado) {
    window.location.href = './login.html';
}

// Expor globalmente
declare global {
    interface Window {
        gerarRecibo: () => void;
        atualizarPreviewRecibo: () => void;
        fazerLogout: () => void;
    }
}

/**
 * Função para fazer logout
 */
function fazerLogout(): void {
    removerSessao();
    window.location.href = './login.html';
}
window.fazerLogout = fazerLogout;

// Mostrar nome do usuário logado
if (sessao.usuario) {
    const userNameText = document.getElementById('userNameText');
    if (userNameText) {
        userNameText.textContent = sessao.usuario.nome || '';
    }
}

/**
 * Obtém elemento do DOM
 */
function getElement<T extends HTMLElement>(id: string): T | null {
    return document.getElementById(id) as T | null;
}

/**
 * Formata CPF
 */
function formatCPF(cpf: string): string {
    const nums = cpf.replace(/\D/g, '');
    if (nums.length !== 11) return cpf;
    return nums.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Atualiza preview do recibo em tempo real
 */
function atualizarPreviewRecibo(): void {
    const numero = getElement<HTMLInputElement>('numero_recibo')?.value || 'REC-001';
    const nome = getElement<HTMLInputElement>('vendedor_nome')?.value || '—';
    const cpf = getElement<HTMLInputElement>('vendedor_cpf')?.value || '—';
    const valorStr = getElement<HTMLInputElement>('valor_recibo')?.value || '0';
    const valor = parseValorMonetario(valorStr);
    const referenciaSelect = getElement<HTMLSelectElement>('referencia_pagamento')?.value || '';
    const referenciaOutro = getElement<HTMLInputElement>('referencia_outro')?.value || '';
    const referencia = referenciaSelect === 'Outro' ? referenciaOutro : referenciaSelect;
    const dataRecebimento = getElement<HTMLInputElement>('data_recebimento')?.value || '';
    const dataEmissao = getElement<HTMLInputElement>('data_emissao')?.value || '';
    const local = getElement<HTMLInputElement>('local')?.value || 'Natal - RN';
    
    // Atualizar elementos do preview
    const previewNumero = getElement<HTMLSpanElement>('preview_numero');
    const previewNome = getElement<HTMLParagraphElement>('preview_nome');
    const previewCpf = getElement<HTMLParagraphElement>('preview_cpf');
    const previewValor = getElement<HTMLParagraphElement>('preview_valor');
    const previewReferencia = getElement<HTMLParagraphElement>('preview_referencia');
    const previewDataRecebimento = getElement<HTMLParagraphElement>('preview_data_recebimento');
    const previewLocalData = getElement<HTMLParagraphElement>('preview_local_data');
    
    if (previewNumero) previewNumero.textContent = numero;
    if (previewNome) previewNome.textContent = nome || '—';
    if (previewCpf) previewCpf.textContent = cpf ? formatCPF(cpf) : '—';
    if (previewValor) previewValor.textContent = `R$ ${formatMoeda(valor)}`;
    if (previewReferencia) previewReferencia.textContent = referencia || '—';
    if (previewDataRecebimento) previewDataRecebimento.textContent = dataRecebimento ? formatData(dataRecebimento) : '—';
    if (previewLocalData) previewLocalData.textContent = `${local}, ${dataEmissao ? formatData(dataEmissao) : '—'}`;
}
window.atualizarPreviewRecibo = atualizarPreviewRecibo;

/**
 * Gera o recibo e abre em nova janela
 */
async function gerarRecibo(): Promise<void> {
    // Capturar dados do formulário
    const numero = getElement<HTMLInputElement>('numero_recibo')?.value || 'REC-001';
    const dataEmissao = getElement<HTMLInputElement>('data_emissao')?.value || '';
    const local = getElement<HTMLInputElement>('local')?.value || 'Natal - RN';
    const vendedorNome = getElement<HTMLInputElement>('vendedor_nome')?.value || '';
    const vendedorCpf = getElement<HTMLInputElement>('vendedor_cpf')?.value || '';
    const valorStr = getElement<HTMLInputElement>('valor_recibo')?.value || '0';
    const valor = parseValorMonetario(valorStr);
    const referenciaSelect = getElement<HTMLSelectElement>('referencia_pagamento')?.value || '';
    const referenciaOutro = getElement<HTMLInputElement>('referencia_outro')?.value || '';
    const referencia = referenciaSelect === 'Outro' ? referenciaOutro : referenciaSelect;
    const dataRecebimento = getElement<HTMLInputElement>('data_recebimento')?.value || '';
    
    // Validações
    if (!vendedorNome.trim()) {
        alert('Por favor, informe o nome do beneficiário.');
        return;
    }
    if (!vendedorCpf.trim()) {
        alert('Por favor, informe o CPF do beneficiário.');
        return;
    }
    if (valor <= 0) {
        alert('Por favor, informe um valor válido.');
        return;
    }
    if (!referencia.trim()) {
        alert('Por favor, informe a referência do pagamento.');
        return;
    }
    
    // Converter logo para base64
    let logoBase64 = logoEngmarq;
    try {
        const response = await fetch(logoEngmarq);
        const blob = await response.blob();
        logoBase64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.warn('Não foi possível converter a logo para base64, usando caminho direto', error);
    }
    
    // Montar dados do recibo
    const dados: DadosRecibo = {
        numero,
        data: dataEmissao ? formatData(dataEmissao) : formatData(new Date().toISOString().split('T')[0]),
        local,
        vendedorNome: vendedorNome.trim(),
        vendedorCpf: formatCPF(vendedorCpf),
        valor,
        referencia: referencia.trim(),
        dataRecebimento: dataRecebimento ? formatData(dataRecebimento) : formatData(new Date().toISOString().split('T')[0]),
        logoUrl: logoBase64
    };
    
    // Gerar HTML
    const html = getTemplateRecibo(dados);
    
    // Abrir em nova janela
    const novaJanela = window.open('', '_blank');
    if (novaJanela) {
        novaJanela.document.write(html);
        novaJanela.document.close();
    }
}
window.gerarRecibo = gerarRecibo;

// =====================================================
// INICIALIZAÇÃO
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    // Definir data atual como padrão
    const hoje = new Date().toISOString().split('T')[0];
    const dataEmissao = getElement<HTMLInputElement>('data_emissao');
    const dataRecebimento = getElement<HTMLInputElement>('data_recebimento');
    
    if (dataEmissao) dataEmissao.value = hoje;
    if (dataRecebimento) dataRecebimento.value = hoje;
    
    // Toggle para referência "Outro"
    const referenciaSelect = getElement<HTMLSelectElement>('referencia_pagamento');
    const referenciaOutroContainer = getElement<HTMLDivElement>('referencia_outro_container');
    
    referenciaSelect?.addEventListener('change', () => {
        if (referenciaOutroContainer) {
            referenciaOutroContainer.style.display = referenciaSelect.value === 'Outro' ? 'block' : 'none';
        }
        atualizarPreviewRecibo();
    });
    
    // Listeners para atualizar preview
    const campos = ['numero_recibo', 'vendedor_nome', 'vendedor_cpf', 'valor_recibo', 'referencia_outro', 'data_recebimento', 'data_emissao', 'local'];
    campos.forEach(id => {
        const el = getElement<HTMLInputElement>(id);
        el?.addEventListener('input', atualizarPreviewRecibo);
    });
    
    // Máscara de CPF
    const cpfInput = getElement<HTMLInputElement>('vendedor_cpf');
    cpfInput?.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        let value = target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.substring(0, 11);
        if (value.length > 9) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
        } else if (value.length > 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
        } else if (value.length > 3) {
            value = value.replace(/(\d{3})(\d{0,3})/, '$1.$2');
        }
        target.value = value;
        atualizarPreviewRecibo();
    });
    
    // Máscara de valor
    const valorInput = getElement<HTMLInputElement>('valor_recibo');
    valorInput?.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        let value = target.value.replace(/\D/g, '');
        if (value.length > 0) {
            const numValue = parseInt(value) / 100;
            target.value = numValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        atualizarPreviewRecibo();
    });
    
    // Atualizar preview inicial
    atualizarPreviewRecibo();
});
