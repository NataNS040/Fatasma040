// =====================================================
// SCRIPT PRINCIPAL DO GERADOR DE PROPOSTAS
// =====================================================

import { TipoProposta, DadosCliente, PropostaConfigs } from './types/proposta.types';
import { configs, isValidTipo } from './config/proposta-config';
import { formatMoeda, parseValorMonetario, calcularDesconto, formatData } from './utils/formatters';
import { gerarHTMLProposta } from './generators/gerador-proposta';

// Expor globalmente para uso no HTML
declare global {
    interface Window {
        configs: PropostaConfigs;
        gerarProposta: () => void;
        atualizarValor: () => void;
        formatMoeda: (v: number) => string;
    }
}

/**
 * Obtém um elemento do DOM pelo ID com tipagem
 */
function getElement<T extends HTMLElement>(id: string): T {
    const el = document.getElementById(id);
    if (!el) {
        throw new Error(`Elemento não encontrado: ${id}`);
    }
    return el as T;
}

/**
 * Atualiza o resumo de valor com desconto
 */
function atualizarValor(): void {
    const valorStr = getElement<HTMLInputElement>('valor_proposta').value;
    const valor = parseValorMonetario(valorStr);
    const aplicar = getElement<HTMLInputElement>('aplicar_desconto').checked;
    const perc = parseFloat(getElement<HTMLInputElement>('percentual_desconto').value) || 0;
    
    let html = '';
    if (aplicar && perc > 0) {
        const final = calcularDesconto(valor, perc);
        html = `<div class="original">R$ ${formatMoeda(valor)}</div>
                <span class="discount-badge">${perc}% OFF</span>
                <div class="final">R$ ${formatMoeda(final)}</div>`;
    } else {
        html = `<div class="final">R$ ${formatMoeda(valor)}</div>`;
    }
    getElement<HTMLDivElement>('value-summary').innerHTML = html;
}

/**
 * Configurações de preview por tipo de proposta
 */
const previewConfigs: Record<string, { icon: string; titleTop: string; titleMain: string; subtitle: string }> = {
    brigada: {
        icon: 'fas fa-fire-extinguisher',
        titleTop: 'TREINAMENTO',
        titleMain: 'BRIGADA DE INCÊNDIO',
        subtitle: 'Capacitação teórica e prática conforme Instrução Técnica IT 17/2025 do Corpo de Bombeiros Militar do RN (CBMRN)'
    },
    plataforma: {
        icon: 'fas fa-hard-hat',
        titleTop: 'PROJETO TÉCNICO',
        titleMain: 'PLATAFORMA SECUNDÁRIA',
        subtitle: 'Projeto técnico de engenharia para plataforma secundária em conformidade com a NR-18'
    },
    'plataforma-principal': {
        icon: 'fas fa-layer-group',
        titleTop: 'PROJETO TÉCNICO',
        titleMain: 'PLATAFORMA PRINCIPAL E SECUNDÁRIA',
        subtitle: 'Equipamento de Proteção Coletiva (EPC) conforme NR 18 – Condições e Meio Ambiente de Trabalho na Indústria da Construção'
    },
    psicossocial: {
        icon: 'fas fa-brain',
        titleTop: 'AVALIAÇÃO',
        titleMain: 'RISCOS PSICOSSOCIAIS',
        subtitle: 'Avaliação dos Fatores de Riscos Psicossociais conforme exigência da NR-01 atualizada'
    },
    assessoria: {
        icon: 'fas fa-shield-alt',
        titleTop: 'ASSESSORIA EM',
        titleMain: 'SEGURANÇA DO TRABALHO',
        subtitle: 'Equipe técnica especializada, gestão de programas de SST e treinamentos de capacitação para conformidade legal'
    }
};

/**
 * Atualiza a pré-visualização da capa em tempo real
 */
function atualizarPreview(): void {
    const tipo = getElement<HTMLSelectElement>('tipo_proposta').value;
    const numero = getElement<HTMLInputElement>('numero_proposta').value || 'TM0000';
    const dataStr = getElement<HTMLInputElement>('data_proposta').value;
    const razaoSocial = getElement<HTMLInputElement>('razao_social').value || 'Nome da Empresa';
    
    // Atualizar classe do tipo
    const previewPage = getElement<HTMLDivElement>('preview-page');
    previewPage.className = 'preview-page ' + tipo;
    
    // Atualizar badge (número da proposta)
    getElement<HTMLDivElement>('preview-badge').textContent = numero;
    
    // Atualizar ícone
    const config = previewConfigs[tipo] || previewConfigs.brigada;
    getElement<HTMLDivElement>('preview-icon').innerHTML = `<i class="${config.icon}"></i>`;
    
    // Atualizar títulos
    getElement<HTMLSpanElement>('preview-title-top').textContent = config.titleTop;
    getElement<HTMLSpanElement>('preview-title-main').textContent = config.titleMain;
    getElement<HTMLParagraphElement>('preview-subtitle').textContent = config.subtitle;
    
    // Atualizar nome do cliente
    getElement<HTMLParagraphElement>('preview-client-name').textContent = razaoSocial;
    
    // Atualizar data
    if (dataStr) {
        getElement<HTMLParagraphElement>('preview-date').innerHTML = `
            <i class="far fa-calendar-alt"></i>
            <span>${formatData(dataStr)}</span>
        `;
    }
}

/**
 * Inicializa os event listeners do formulário
 */
function inicializarEventos(): void {
    // Data inicial
    const hoje = new Date();
    getElement<HTMLInputElement>('data_proposta').value = hoje.toISOString().split('T')[0];
    
    // Controle de desconto
    getElement<HTMLInputElement>('aplicar_desconto').addEventListener('change', function(this: HTMLInputElement) {
        getElement<HTMLDivElement>('discount-field').style.display = this.checked ? 'block' : 'none';
        atualizarValor();
    });
    
    // Controle de visibilidade do campo colaboradores baseado no tipo
    getElement<HTMLSelectElement>('tipo_proposta').addEventListener('change', function(this: HTMLSelectElement) {
        const tipo = this.value;
        const section = document.querySelector('.form-section:has(#num_colaboradores)') as HTMLElement | null;
        if (section) {
            section.style.display = tipo === 'psicossocial' ? 'block' : 'none';
        }
        atualizarPreview();
    });
    
    getElement<HTMLInputElement>('percentual_desconto').addEventListener('input', atualizarValor);
    getElement<HTMLInputElement>('valor_proposta').addEventListener('input', atualizarValor);
    
    // Inicializar visibilidade do campo colaboradores
    const tipoInicial = getElement<HTMLSelectElement>('tipo_proposta').value;
    const section = document.querySelector('.form-section:has(#num_colaboradores)') as HTMLElement | null;
    if (section) {
        section.style.display = tipoInicial === 'psicossocial' ? 'block' : 'none';
    }
    
    // Botão de gerar proposta
    getElement<HTMLButtonElement>('btn-gerar-proposta').addEventListener('click', gerarProposta);
    
    // Event listeners para atualizar preview em tempo real
    getElement<HTMLInputElement>('numero_proposta').addEventListener('input', atualizarPreview);
    getElement<HTMLInputElement>('data_proposta').addEventListener('change', atualizarPreview);
    getElement<HTMLInputElement>('razao_social').addEventListener('input', atualizarPreview);
    
    atualizarValor();
    atualizarPreview();
}

/**
 * Gera a proposta com base nos dados do formulário
 */
function gerarProposta(): void {
    const tipoStr = getElement<HTMLSelectElement>('tipo_proposta').value;
    
    if (!isValidTipo(tipoStr)) {
        alert('Tipo de proposta inválido');
        return;
    }
    
    const tipo: TipoProposta = tipoStr;
    
    const dados: DadosCliente = {
        codigoProposta: getElement<HTMLInputElement>('numero_proposta').value || 'TM0000',
        dataProposta: getElement<HTMLInputElement>('data_proposta').value,
        razaoSocial: getElement<HTMLInputElement>('razao_social').value,
        nomeFantasia: getElement<HTMLInputElement>('razao_social').value,
        cnpj: getElement<HTMLInputElement>('cnpj').value,
        endereco: getElement<HTMLInputElement>('endereco').value,
        bairro: getElement<HTMLInputElement>('bairro').value,
        cep: getElement<HTMLInputElement>('cep').value,
        cidade: getElement<HTMLInputElement>('cidade').value,
        estado: getElement<HTMLInputElement>('uf').value,
        qtdColaboradores: getElement<HTMLInputElement>('num_colaboradores').value || '',
        elaborador: {
            nome: getElement<HTMLInputElement>('elaborador_nome').value || 'Thiago Marques',
            cargo: getElement<HTMLInputElement>('elaborador_cargo').value || 'Diretor',
            email: getElement<HTMLInputElement>('elaborador_email').value || 'engmarqsolution@gmail.com',
            telefone: getElement<HTMLInputElement>('elaborador_telefone').value || '+55 84 99928-5888',
            instagram: getElement<HTMLInputElement>('elaborador_instagram').value || '@engmarq_solution'
        },
        solicitante: {
            nome: getElement<HTMLInputElement>('solicitante_nome').value || '',
            cargo: getElement<HTMLInputElement>('solicitante_cargo').value || '',
            email: getElement<HTMLInputElement>('solicitante_email').value || '',
            telefone: getElement<HTMLInputElement>('solicitante_telefone').value || ''
        }
    };
    
    if (!dados.razaoSocial) {
        alert('Por favor, preencha a Razão Social do cliente');
        return;
    }
    
    const valorStr = getElement<HTMLInputElement>('valor_proposta').value;
    const valor = parseValorMonetario(valorStr);
    const aplicarDesc = getElement<HTMLInputElement>('aplicar_desconto').checked;
    const perc = parseFloat(getElement<HTMLInputElement>('percentual_desconto').value) || 0;
    const valorFinal = aplicarDesc ? calcularDesconto(valor, perc) : valor;
    
    // Gerar HTML da proposta
    const proposta = gerarHTMLProposta(tipo, dados, valor, valorFinal, perc, aplicarDesc);
    
    // Abrir em nova janela
    const novaJanela = window.open('', '_blank');
    if (novaJanela) {
        novaJanela.document.write(proposta);
        novaJanela.document.close();
    } else {
        alert('Não foi possível abrir a nova janela. Verifique se o bloqueador de pop-ups está ativado.');
    }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', inicializarEventos);

// Expor funções globalmente
window.configs = configs;
window.gerarProposta = gerarProposta;
window.atualizarValor = atualizarValor;
window.formatMoeda = formatMoeda;

// Re-exportar módulos para acesso externo se necessário
export {
    configs,
    gerarProposta,
    atualizarValor,
    formatMoeda,
    parseValorMonetario,
    calcularDesconto
};
