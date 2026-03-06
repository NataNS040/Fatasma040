// =====================================================
// SCRIPT DO GERADOR DE CONTRATOS
// =====================================================

import { obterSessao, removerSessao } from './auth/usuarios';
import { formatMoeda, parseValorMonetario, formatData } from './utils/formatters';
import { gerarHTMLContrato } from './generators/gerador-contrato';
import type { TipoContrato, FuncaoAvaliada, ParcelaPagamento } from './templates/template-contrato';

// =====================================================
// VERIFICAÇÃO DE AUTENTICAÇÃO
// =====================================================
const sessao = obterSessao();
if (!sessao.logado) {
    window.location.href = './login.html';
}

// Expor globalmente para uso no HTML
declare global {
    interface Window {
        fazerLogout: () => void;
        adicionarFuncao: () => void;
        removerFuncao: (index: number) => void;
        adicionarServico: () => void;
        removerServico: (index: number) => void;
        adicionarEscopo: () => void;
        removerEscopo: (index: number) => void;
        adicionarEntregavel: () => void;
        removerEntregavel: (index: number) => void;
        adicionarParcela: () => void;
        removerParcela: (index: number) => void;
        adicionarConteudo: () => void;
        removerConteudo: (index: number) => void;
    }
}

/**
 * Logout
 */
function fazerLogout(): void {
    removerSessao();
    window.location.href = './login.html';
}
window.fazerLogout = fazerLogout;

// Mostrar nome do usuário
if (sessao.usuario) {
    const userNameText = document.getElementById('userNameText');
    if (userNameText) {
        userNameText.textContent = sessao.usuario.nome || '';
    }
}

/**
 * Utilitário para obter elemento por ID
 */
function getEl<T extends HTMLElement>(id: string): T {
    return document.getElementById(id) as T;
}

// =====================================================
// MAPEAMENTO DE TIPOS → LABELS
// =====================================================
const TIPO_LABELS: Record<string, string> = {
    'kit-sst': 'KIT INTEGRADO DE PROGRAMAS DE SST',
    'brigada': 'TREINAMENTO DE BRIGADA DE INCÊNDIO',
    'tela-fachada': 'PROJETO DE TELA DE PROTEÇÃO DE FACHADA',
    'psicossocial': 'AVALIAÇÃO DE RISCOS PSICOSSOCIAIS',
    'integrado': 'SERVIÇOS INTEGRADOS DE SST'
};

/**
 * Dados pré-preenchidos de cada treinamento
 */
interface DadosTreinamento {
    nome: string;
    norma: string;
    label: string;
}

const TREINAMENTOS: Record<string, DadosTreinamento> = {
    'trein-nr05': {
        nome: 'Treinamento NR-05 – CIPA (Comissão Interna de Prevenção de Acidentes)',
        norma: 'Norma Regulamentadora nº 05 (NR-05)',
        label: 'CIPA – NR-05'
    },
    'trein-nr06': {
        nome: 'Treinamento NR-06 – Uso Correto de Equipamentos de Proteção Individual',
        norma: 'Norma Regulamentadora nº 06 (NR-06)',
        label: 'USO DE EPIs – NR-06'
    },
    'trein-nr10': {
        nome: 'Treinamento NR-10 – Segurança em Instalações e Serviços em Eletricidade',
        norma: 'Norma Regulamentadora nº 10 (NR-10)',
        label: 'SEGURANÇA EM ELETRICIDADE – NR-10'
    },
    'trein-nr11': {
        nome: 'Treinamento NR-11 – Operação de Empilhadeira e Transporte de Materiais',
        norma: 'Norma Regulamentadora nº 11 (NR-11)',
        label: 'OPERAÇÃO DE EMPILHADEIRA – NR-11'
    },
    'trein-nr12': {
        nome: 'Treinamento NR-12 – Segurança no Trabalho em Máquinas e Equipamentos',
        norma: 'Norma Regulamentadora nº 12 (NR-12)',
        label: 'MÁQUINAS E EQUIPAMENTOS – NR-12'
    },
    'trein-nr18': {
        nome: 'Treinamento NR-18 – Segurança e Saúde na Indústria da Construção',
        norma: 'Norma Regulamentadora nº 18 (NR-18)',
        label: 'CONSTRUÇÃO CIVIL – NR-18'
    },
    'trein-nr20': {
        nome: 'Treinamento NR-20 – Segurança com Líquidos Inflamáveis e Combustíveis',
        norma: 'Norma Regulamentadora nº 20 (NR-20)',
        label: 'LÍQUIDOS INFLAMÁVEIS – NR-20'
    },
    'trein-nr33': {
        nome: 'Treinamento NR-33 – Segurança e Saúde em Espaços Confinados',
        norma: 'Norma Regulamentadora nº 33 (NR-33)',
        label: 'ESPAÇOS CONFINADOS – NR-33'
    },
    'trein-nr35': {
        nome: 'Treinamento NR-35 – Trabalho em Altura',
        norma: 'Norma Regulamentadora nº 35 (NR-35)',
        label: 'TRABALHO EM ALTURA – NR-35'
    },
    'trein-primeiros-socorros': {
        nome: 'Treinamento de Primeiros Socorros',
        norma: 'Norma Regulamentadora nº 07 (NR-07) e diretrizes do Ministério da Saúde',
        label: 'PRIMEIROS SOCORROS'
    },
    'trein-outros': {
        nome: '',
        norma: 'Normas Regulamentadoras aplicáveis',
        label: 'TREINAMENTO EM SST'
    }
};

/**
 * Verifica se o tipo selecionado é um treinamento
 */
function isTreinamento(tipo: string): boolean {
    return tipo.startsWith('trein-');
}

/**
 * Retorna o TipoContrato real para enviar ao template
 */
function getTipoReal(tipo: string): TipoContrato {
    return isTreinamento(tipo) ? 'treinamentos' : tipo as TipoContrato;
}

/**
 * Retorna o label para preview
 */
function getLabelTipo(tipo: string): string {
    if (isTreinamento(tipo)) {
        return TREINAMENTOS[tipo]?.label || 'TREINAMENTO EM SST';
    }
    return TIPO_LABELS[tipo] || tipo;
}

// =====================================================
// INICIALIZAÇÃO
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    // Definir data de hoje
    const hoje = new Date().toISOString().split('T')[0];
    getEl<HTMLInputElement>('data_contrato').value = hoje;

    // Eventos
    inicializarEventos();
    atualizarCamposVisiveis();
    atualizarPreview();
});

/**
 * Inicializar eventos do formulário
 */
function inicializarEventos(): void {
    // Tipo de contrato
    getEl<HTMLSelectElement>('tipo_contrato').addEventListener('change', () => {
        atualizarCamposVisiveis();
        atualizarPreview();
    });

    // Forma de pagamento
    getEl<HTMLSelectElement>('forma_pagamento').addEventListener('change', () => {
        const forma = getEl<HTMLSelectElement>('forma_pagamento').value;
        const parcelasContainer = document.getElementById('parcelas-container');
        if (parcelasContainer) {
            parcelasContainer.style.display = forma === 'personalizado' ? 'block' : 'none';
        }
    });

    // Campos de preview
    ['razao_social', 'data_contrato', 'valor_contrato'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', atualizarPreview);
            el.addEventListener('change', atualizarPreview);
        }
    });

    // Botão gerar
    getEl('btn-gerar-contrato').addEventListener('click', gerarContrato);
}

/**
 * Mostra/esconde campos conforme tipo de contrato
 */
function atualizarCamposVisiveis(): void {
    const tipo = getEl<HTMLSelectElement>('tipo_contrato').value;
    const tipoReal = getTipoReal(tipo);
    
    // Campos de colaboradores/funções
    const rowColaboradores = document.getElementById('row-colaboradores');
    const groupFuncoes = document.getElementById('group-funcoes');
    const camposBrigada = document.getElementById('campos-brigada');
    const camposFachada = document.getElementById('campos-fachada');
    const camposTreinamentos = document.getElementById('campos-treinamentos');
    const sectionIntegrado = document.getElementById('section-integrado');
    const sectionEscopoCustom = document.getElementById('section-escopo-custom');
    const sectionEntregaveisCustom = document.getElementById('section-entregaveis-custom');
    const sectionFuncoes = document.getElementById('section-funcoes');

    // Resetar tudo
    if (rowColaboradores) rowColaboradores.style.display = 'flex';
    if (groupFuncoes) groupFuncoes.style.display = 'block';
    if (camposBrigada) camposBrigada.style.display = 'none';
    if (camposFachada) camposFachada.style.display = 'none';
    if (camposTreinamentos) camposTreinamentos.style.display = 'none';
    if (sectionIntegrado) sectionIntegrado.style.display = 'none';
    if (sectionEscopoCustom) sectionEscopoCustom.style.display = 'none';
    if (sectionEntregaveisCustom) sectionEntregaveisCustom.style.display = 'none';
    if (sectionFuncoes) sectionFuncoes.style.display = 'block';

    switch (tipoReal) {
        case 'brigada':
            if (rowColaboradores) rowColaboradores.style.display = 'none';
            if (groupFuncoes) groupFuncoes.style.display = 'none';
            if (camposBrigada) camposBrigada.style.display = 'block';
            if (sectionFuncoes) sectionFuncoes.style.display = 'none';
            break;
        case 'tela-fachada':
            if (rowColaboradores) rowColaboradores.style.display = 'none';
            if (groupFuncoes) groupFuncoes.style.display = 'none';
            if (camposFachada) camposFachada.style.display = 'block';
            if (sectionFuncoes) sectionFuncoes.style.display = 'none';
            break;
        case 'treinamentos':
            if (rowColaboradores) rowColaboradores.style.display = 'none';
            if (groupFuncoes) groupFuncoes.style.display = 'none';
            if (camposTreinamentos) camposTreinamentos.style.display = 'block';
            if (sectionFuncoes) sectionFuncoes.style.display = 'none';
            // Preencher campos com dados do treinamento selecionado
            preencherDadosTreinamento(tipo);
            break;
        case 'integrado':
            if (sectionIntegrado) sectionIntegrado.style.display = 'block';
            if (sectionEscopoCustom) sectionEscopoCustom.style.display = 'block';
            if (sectionEntregaveisCustom) sectionEntregaveisCustom.style.display = 'block';
            break;
    }
}

/**
 * Atualizar pré-visualização
 */
function atualizarPreview(): void {
    const tipo = getEl<HTMLSelectElement>('tipo_contrato').value;
    const razaoSocial = getEl<HTMLInputElement>('razao_social').value || 'Nome da Empresa';
    const data = getEl<HTMLInputElement>('data_contrato').value;
    const valorStr = getEl<HTMLInputElement>('valor_contrato').value;
    const valor = parseValorMonetario(valorStr);

    const previewTipo = document.getElementById('preview-tipo-contrato');
    const previewRazao = document.getElementById('preview-razao-social');
    const previewData = document.getElementById('preview-data');
    const previewValor = document.getElementById('preview-valor');

    if (previewTipo) previewTipo.textContent = getLabelTipo(tipo);
    if (previewRazao) previewRazao.textContent = razaoSocial;
    if (previewData) previewData.innerHTML = data ? `<i class="fas fa-calendar-alt"></i> ${formatData(data)}` : '<i class="fas fa-calendar-alt"></i> —';
    if (previewValor) previewValor.textContent = `R$ ${formatMoeda(valor)}`;
}

// =====================================================
// GERENCIAMENTO DINÂMICO DE LISTAS
// =====================================================

/**
 * Funções avaliadas
 */
function adicionarFuncao(): void {
    const container = document.getElementById('funcoes-container');
    if (!container) return;
    
    const index = container.querySelectorAll('.funcao-item').length;
    const div = document.createElement('div');
    div.className = 'funcao-item';
    div.setAttribute('data-index', String(index));
    div.innerHTML = `
        <div class="form-row" style="align-items: flex-end;">
            <div class="form-group" style="flex: 1;">
                <label>Função</label>
                <input type="text" class="funcao-nome" placeholder="Ex: Almoxarife">
            </div>
            <div class="form-group" style="flex: 0 0 120px;">
                <label>CBO</label>
                <input type="text" class="funcao-cbo" placeholder="0000-00">
            </div>
            <button type="button" onclick="removerFuncao(${index})" style="background: #e53e3e; color: white; border: none; border-radius: 6px; padding: 8px 12px; cursor: pointer; margin-bottom: 15px;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    container.appendChild(div);
}
window.adicionarFuncao = adicionarFuncao;

function removerFuncao(index: number): void {
    const container = document.getElementById('funcoes-container');
    if (!container) return;
    const items = container.querySelectorAll('.funcao-item');
    if (items[index]) items[index].remove();
}
window.removerFuncao = removerFuncao;

/**
 * Serviços integrados
 */
function adicionarServico(): void {
    const container = document.getElementById('servicos-container');
    if (!container) return;
    
    const index = container.querySelectorAll('.servico-item').length;
    const div = document.createElement('div');
    div.className = 'servico-item';
    div.setAttribute('data-index', String(index));
    div.innerHTML = `
        <div class="form-row" style="align-items: flex-end;">
            <div class="form-group" style="flex: 1;">
                <input type="text" class="servico-descricao" placeholder="Descrição do serviço">
            </div>
            <button type="button" onclick="removerServico(${index})" style="background: #e53e3e; color: white; border: none; border-radius: 6px; padding: 8px 12px; cursor: pointer; margin-bottom: 15px;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    container.appendChild(div);
}
window.adicionarServico = adicionarServico;

function removerServico(index: number): void {
    const container = document.getElementById('servicos-container');
    if (!container) return;
    const items = container.querySelectorAll('.servico-item');
    if (items[index]) items[index].remove();
}
window.removerServico = removerServico;

/**
 * Escopo customizado
 */
function adicionarEscopo(): void {
    const container = document.getElementById('escopo-container');
    if (!container) return;
    
    const index = container.querySelectorAll('.escopo-item').length;
    const div = document.createElement('div');
    div.className = 'escopo-item';
    div.setAttribute('data-index', String(index));
    div.innerHTML = `
        <div class="form-row" style="align-items: flex-end;">
            <div class="form-group" style="flex: 1;">
                <input type="text" class="escopo-descricao" placeholder="Item do escopo">
            </div>
            <button type="button" onclick="removerEscopo(${index})" style="background: #e53e3e; color: white; border: none; border-radius: 6px; padding: 8px 12px; cursor: pointer; margin-bottom: 15px;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    container.appendChild(div);
}
window.adicionarEscopo = adicionarEscopo;

function removerEscopo(index: number): void {
    const container = document.getElementById('escopo-container');
    if (!container) return;
    const items = container.querySelectorAll('.escopo-item');
    if (items[index]) items[index].remove();
}
window.removerEscopo = removerEscopo;

/**
 * Entregáveis customizados
 */
function adicionarEntregavel(): void {
    const container = document.getElementById('entregaveis-container');
    if (!container) return;
    
    const index = container.querySelectorAll('.entregavel-item').length;
    const div = document.createElement('div');
    div.className = 'entregavel-item';
    div.setAttribute('data-index', String(index));
    div.innerHTML = `
        <div class="form-row" style="align-items: flex-end;">
            <div class="form-group" style="flex: 1;">
                <input type="text" class="entregavel-descricao" placeholder="Entregável">
            </div>
            <button type="button" onclick="removerEntregavel(${index})" style="background: #e53e3e; color: white; border: none; border-radius: 6px; padding: 8px 12px; cursor: pointer; margin-bottom: 15px;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    container.appendChild(div);
}
window.adicionarEntregavel = adicionarEntregavel;

function removerEntregavel(index: number): void {
    const container = document.getElementById('entregaveis-container');
    if (!container) return;
    const items = container.querySelectorAll('.entregavel-item');
    if (items[index]) items[index].remove();
}
window.removerEntregavel = removerEntregavel;

/**
 * Parcelas de pagamento
 */
function adicionarParcela(): void {
    const container = document.getElementById('parcelas-lista');
    if (!container) return;
    
    const index = container.querySelectorAll('.parcela-item').length;
    const div = document.createElement('div');
    div.className = 'parcela-item';
    div.setAttribute('data-index', String(index));
    div.innerHTML = `
        <div class="form-row">
            <div class="form-group" style="flex: 0 0 100px;">
                <label>% do Valor</label>
                <input type="number" class="parcela-percentual" value="50" min="1" max="100">
            </div>
            <div class="form-group" style="flex: 1;">
                <label>Descrição/Condição</label>
                <input type="text" class="parcela-descricao" placeholder="Ex: na entrega dos documentos">
            </div>
            <button type="button" onclick="removerParcela(${index})" style="background: #e53e3e; color: white; border: none; border-radius: 6px; padding: 8px 12px; cursor: pointer; margin-bottom: 15px;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    container.appendChild(div);
}
window.adicionarParcela = adicionarParcela;

function removerParcela(index: number): void {
    const container = document.getElementById('parcelas-lista');
    if (!container) return;
    const items = container.querySelectorAll('.parcela-item');
    if (items[index]) items[index].remove();
}
window.removerParcela = removerParcela;

/**
 * Preenche automaticamente os campos do treinamento selecionado
 */
function preencherDadosTreinamento(tipo: string): void {
    const dados = TREINAMENTOS[tipo];
    if (!dados) return;

    const nomeInput = getEl<HTMLInputElement>('treinamento_nome');
    const normaInput = getEl<HTMLInputElement>('norma_referencia');

    if (nomeInput && dados.nome) nomeInput.value = dados.nome;
    if (normaInput && dados.norma) normaInput.value = dados.norma;

    // Para "Outro", limpar o nome para o usuário preencher
    if (tipo === 'trein-outros' && nomeInput) {
        nomeInput.value = '';
        nomeInput.focus();
    }
}

/**
 * Conteúdo programático (treinamentos)
 */
function adicionarConteudo(): void {
    const container = document.getElementById('conteudo-container');
    if (!container) return;
    
    const index = container.querySelectorAll('.conteudo-item').length;
    const div = document.createElement('div');
    div.className = 'conteudo-item';
    div.setAttribute('data-index', String(index));
    div.innerHTML = `
        <div class="form-row" style="align-items: flex-end;">
            <div class="form-group" style="flex: 1;">
                <input type="text" class="conteudo-descricao" placeholder="Ex: Identificação e avaliação de riscos">
            </div>
            <button type="button" onclick="removerConteudo(${index})" style="background: #e53e3e; color: white; border: none; border-radius: 6px; padding: 8px 12px; cursor: pointer; margin-bottom: 15px;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    container.appendChild(div);
}
window.adicionarConteudo = adicionarConteudo;

function removerConteudo(index: number): void {
    const container = document.getElementById('conteudo-container');
    if (!container) return;
    const items = container.querySelectorAll('.conteudo-item');
    if (items[index]) items[index].remove();
}
window.removerConteudo = removerConteudo;

// =====================================================
// COLETA DE DADOS E GERAÇÃO DO CONTRATO
// =====================================================

/**
 * Coleta funções avaliadas do formulário
 */
function coletarFuncoes(): FuncaoAvaliada[] {
    const funcoes: FuncaoAvaliada[] = [];
    const items = document.querySelectorAll('.funcao-item');
    items.forEach(item => {
        const nome = (item.querySelector('.funcao-nome') as HTMLInputElement)?.value?.trim();
        const cbo = (item.querySelector('.funcao-cbo') as HTMLInputElement)?.value?.trim();
        if (nome) {
            funcoes.push({ nome, cbo: cbo || '—' });
        }
    });
    return funcoes;
}

/**
 * Coleta parcelas personalizadas
 */
function coletarParcelas(): ParcelaPagamento[] {
    const parcelas: ParcelaPagamento[] = [];
    const items = document.querySelectorAll('.parcela-item');
    items.forEach(item => {
        const percentual = parseFloat((item.querySelector('.parcela-percentual') as HTMLInputElement)?.value) || 0;
        const descricao = (item.querySelector('.parcela-descricao') as HTMLInputElement)?.value?.trim() || '';
        if (percentual > 0) {
            parcelas.push({ percentual, descricao });
        }
    });
    return parcelas;
}

/**
 * Coleta itens de uma lista dinâmica
 */
function coletarLista(seletor: string): string[] {
    const itens: string[] = [];
    const inputs = document.querySelectorAll(seletor);
    inputs.forEach(input => {
        const valor = (input as HTMLInputElement).value?.trim();
        if (valor) itens.push(valor);
    });
    return itens;
}

/**
 * Gera o contrato completo
 */
function gerarContrato(): void {
    const tipoSelecionado = getEl<HTMLSelectElement>('tipo_contrato').value;
    const tipo = getTipoReal(tipoSelecionado);
    const razaoSocial = getEl<HTMLInputElement>('razao_social').value.trim();

    if (!razaoSocial) {
        alert('Por favor, preencha a Razão Social da contratante.');
        return;
    }

    const formaPagamento = getEl<HTMLSelectElement>('forma_pagamento').value;
    let parcelas: ParcelaPagamento[] = [];
    
    if (formaPagamento === 'personalizado') {
        parcelas = coletarParcelas();
    } else if (formaPagamento === 'parcelado') {
        parcelas = [
            { percentual: 50, descricao: 'na aprovação do contrato' },
            { percentual: 50, descricao: 'na entrega dos documentos finais' }
        ];
    }

    const dadosForm = {
        tipo,
        razaoSocial,
        cnpj: getEl<HTMLInputElement>('cnpj').value.trim(),
        endereco: getEl<HTMLInputElement>('endereco').value.trim(),
        cidade: getEl<HTMLInputElement>('cidade').value.trim() || 'Natal',
        uf: getEl<HTMLSelectElement>('uf').value || 'RN',
        representante: getEl<HTMLInputElement>('representante').value.trim(),
        qtdColaboradores: getEl<HTMLInputElement>('qtd_colaboradores')?.value?.trim() || '',
        qtdFuncoes: getEl<HTMLInputElement>('qtd_funcoes')?.value?.trim() || '',
        qtdTurmas: isTreinamento(tipoSelecionado)
            ? (getEl<HTMLInputElement>('qtd_turmas_trein')?.value?.trim() || '')
            : (getEl<HTMLInputElement>('qtd_turmas')?.value?.trim() || ''),
        qtdAlunos: isTreinamento(tipoSelecionado)
            ? (getEl<HTMLInputElement>('qtd_alunos_trein')?.value?.trim() || '')
            : (getEl<HTMLInputElement>('qtd_alunos')?.value?.trim() || ''),
        qtdPavimentos: getEl<HTMLInputElement>('qtd_pavimentos')?.value?.trim() || '',
        cargaHoraria: isTreinamento(tipoSelecionado)
            ? (getEl<HTMLInputElement>('carga_horaria_trein')?.value?.trim() || '')
            : (getEl<HTMLInputElement>('carga_horaria')?.value?.trim() || ''),
        treinamentoNome: getEl<HTMLInputElement>('treinamento_nome')?.value?.trim() || '',
        normaReferencia: getEl<HTMLInputElement>('norma_referencia')?.value?.trim() || '',
        conteudoProgramatico: coletarLista('.conteudo-descricao'),
        valor: parseValorMonetario(getEl<HTMLInputElement>('valor_contrato').value),
        formaPagamento: formaPagamento as any,
        parcelas,
        prazoExecucao: getEl<HTMLInputElement>('prazo_execucao').value.trim(),
        prazoAviso: getEl<HTMLInputElement>('prazo_aviso').value.trim(),
        dataContrato: getEl<HTMLInputElement>('data_contrato').value,
        funcoes: coletarFuncoes(),
        servicosIntegrados: coletarLista('.servico-descricao'),
        escopoCustomizado: coletarLista('.escopo-descricao'),
        entregaveisCustomizados: coletarLista('.entregavel-descricao'),
    };

    const html = gerarHTMLContrato(dadosForm);

    // Abrir em nova aba
    const novaJanela = window.open('', '_blank');
    if (novaJanela) {
        novaJanela.document.write(html);
        novaJanela.document.close();
    } else {
        alert('Erro ao abrir nova janela. Verifique se o pop-up está bloqueado.');
    }
}
