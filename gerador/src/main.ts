// =====================================================
// SCRIPT PRINCIPAL DO GERADOR DE PROPOSTAS
// =====================================================

import { TipoProposta, DadosCliente, PropostaConfigs, TreinamentoSelecionado, TreinamentoId, EntregavelPsico, EntregavelPsicoId, EmpresaGrupo } from './types/proposta.types';
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
        adicionarEmpresa: () => void;
        removerEmpresa: (index: number) => void;
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
    },
    treinamentos: {
        icon: 'fas fa-chalkboard-teacher',
        titleTop: 'TREINAMENTOS EM',
        titleMain: 'SEGURANÇA DO TRABALHO',
        subtitle: 'Capacitações em Normas Regulamentadoras para garantir a conformidade legal e a segurança dos colaboradores'
    }
};

/**
 * Dados dos treinamentos disponíveis
 */
const treinamentosDisponiveis: Record<string, { nome: string; icon: string; descricao: string }> = {
    nr10: {
        nome: 'NR-10 - Segurança em Instalações Elétricas',
        icon: 'fas fa-bolt',
        descricao: 'Capacitação para trabalhos com energia elétrica, abordando riscos, medidas de proteção e procedimentos de segurança.'
    },
    nr12: {
        nome: 'NR-12 - Segurança em Máquinas e Equipamentos',
        icon: 'fas fa-cogs',
        descricao: 'Treinamento sobre operação segura de máquinas, dispositivos de proteção e procedimentos operacionais.'
    },
    nr33: {
        nome: 'NR-33 - Segurança em Espaços Confinados',
        icon: 'fas fa-hard-hat',
        descricao: 'Capacitação para entrada e trabalho em espaços confinados, incluindo procedimentos de resgate.'
    },
    nr35: {
        nome: 'NR-35 - Trabalho em Altura',
        icon: 'fas fa-arrow-up',
        descricao: 'Treinamento para trabalhos acima de 2 metros, abordando sistemas de proteção contra quedas.'
    },
    brigada: {
        nome: 'Brigada de Incêndio',
        icon: 'fas fa-fire-extinguisher',
        descricao: 'Formação de brigadistas para prevenção e combate a incêndios, incluindo primeiros socorros básicos.'
    },
    cipa: {
        nome: 'CIPA - Comissão Interna de Prevenção de Acidentes',
        icon: 'fas fa-users',
        descricao: 'Capacitação dos membros da CIPA para identificação de riscos e prevenção de acidentes.'
    },
    'primeiros-socorros': {
        nome: 'Primeiros Socorros',
        icon: 'fas fa-first-aid',
        descricao: 'Treinamento em técnicas de primeiros socorros para atendimento emergencial.'
    }
};

/**
 * Captura os treinamentos selecionados do formulário
 */
function capturarTreinamentosSelecionados(): TreinamentoSelecionado[] {
    const treinamentos: TreinamentoSelecionado[] = [];
    
    const checkboxes = document.querySelectorAll('.training-item input[type="checkbox"]:checked');
    
    checkboxes.forEach((checkbox) => {
        const id = (checkbox as HTMLInputElement).value as TreinamentoId;
        const treinamentoBase = treinamentosDisponiveis[id];
        
        if (treinamentoBase) {
            // Obter valores específicos dos campos
            const prefixo = id.replace('-', '_');
            const carga = (document.getElementById(`${prefixo}_carga`) as HTMLInputElement)?.value || '';
            const alunos = parseInt((document.getElementById(`${prefixo}_alunos`) as HTMLInputElement)?.value || '0');
            const turmas = parseInt((document.getElementById(`${prefixo}_turmas`) as HTMLInputElement)?.value || '0');
            const valorStr = (document.getElementById(`${prefixo}_valor`) as HTMLInputElement)?.value || '0';
            const valor = parseValorMonetario(valorStr);
            
            treinamentos.push({
                id,
                nome: treinamentoBase.nome,
                icon: treinamentoBase.icon,
                descricao: treinamentoBase.descricao,
                cargaHoraria: carga,
                qtdAlunos: alunos,
                qtdTurmas: turmas,
                valor
            });
        }
    });
    
    return treinamentos;
}

/**
 * Atualiza o total dos treinamentos selecionados
 */
function atualizarTotalTreinamentos(): void {
    const treinamentos = capturarTreinamentosSelecionados();
    const total = treinamentos.reduce((acc, t) => acc + (t.valor || 0), 0);
    
    const totalElement = document.getElementById('total-treinamentos');
    if (totalElement) {
        totalElement.textContent = `R$ ${formatMoeda(total)}`;
    }
    
    // Atualizar também o campo de valor da proposta
    const valorInput = document.getElementById('valor_proposta') as HTMLInputElement;
    if (valorInput && treinamentos.length > 0) {
        valorInput.value = formatMoeda(total);
        atualizarValor();
    }
}

/**
 * Definição dos entregáveis psicossociais base
 */
const entregaveisPsicoBase: Record<EntregavelPsicoId, { titulo: string; icon: string }> = {
    relatorio: {
        titulo: 'Relatório Técnico de Avaliação de Riscos Psicossociais',
        icon: 'fas fa-file-alt'
    },
    plano: {
        titulo: 'Plano de Ação Preventivo e Corretivo',
        icon: 'fas fa-tasks'
    },
    aep: {
        titulo: 'AEP – Avaliação Ergonômica Preliminar',
        icon: 'fas fa-clipboard-check'
    },
    palestras: {
        titulo: 'Palestras de Conscientização',
        icon: 'fas fa-chalkboard-teacher'
    },
    janeiro_branco: {
        titulo: 'Campanha Janeiro Branco',
        icon: 'fas fa-ribbon'
    },
    reavaliacao: {
        titulo: 'Reavaliação Trimestral',
        icon: 'fas fa-redo'
    }
};

/**
 * Captura os entregáveis psicossociais selecionados do formulário
 */
function capturarEntregaveisPsico(): EntregavelPsico[] {
    const entregaveis: EntregavelPsico[] = [];
    const ids: EntregavelPsicoId[] = ['relatorio', 'plano', 'aep', 'palestras', 'janeiro_branco', 'reavaliacao'];
    
    ids.forEach(id => {
        const checkbox = document.getElementById(`psico_${id}`) as HTMLInputElement | null;
        const base = entregaveisPsicoBase[id];
        
        if (checkbox && base) {
            const descTextarea = document.getElementById(`psico_${id}_desc`) as HTMLTextAreaElement | null;
            const descricao = descTextarea?.value || '';
            
            // Para palestras, pegar quantidade também
            let quantidade: number | undefined;
            if (id === 'palestras') {
                const qtdInput = document.getElementById('psico_palestras_qtd') as HTMLInputElement | null;
                quantidade = qtdInput ? parseInt(qtdInput.value) || 2 : 2;
            }
            
            entregaveis.push({
                id,
                titulo: base.titulo,
                icon: base.icon,
                descricao,
                quantidade,
                ativo: checkbox.checked
            });
        }
    });
    
    return entregaveis;
}

/**
 * Contador de empresas para o grupo
 */
let empresaCounter = 1;

/**
 * Adiciona uma nova empresa ao grupo
 */
function adicionarEmpresa(): void {
    const container = document.getElementById('empresas-container');
    if (!container) return;
    
    const index = empresaCounter;
    empresaCounter++;
    
    const empresaHTML = `
        <div class="empresa-item is-grupo" data-index="${index}">
            <div class="empresa-header">
                <span class="empresa-numero">Empresa ${index + 1}</span>
                <button type="button" class="btn-remover-empresa" onclick="removerEmpresa(${index})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="form-group">
                <label>Razão Social *</label>
                <input type="text" class="empresa-razao" placeholder="Nome da empresa">
            </div>
            <div class="form-group">
                <label>CNPJ</label>
                <input type="text" class="empresa-cnpj" placeholder="00.000.000/0000-00">
            </div>
            <div class="form-group">
                <label>Endereço</label>
                <input type="text" class="empresa-endereco" placeholder="Rua, número">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Bairro</label>
                    <input type="text" class="empresa-bairro">
                </div>
                <div class="form-group">
                    <label>CEP</label>
                    <input type="text" class="empresa-cep" placeholder="00000-000">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Cidade</label>
                    <input type="text" class="empresa-cidade" value="Natal">
                </div>
                <div class="form-group">
                    <label>UF</label>
                    <select class="empresa-uf">
                        <option value="RN" selected>RN</option>
                        <option value="PB">PB</option>
                        <option value="CE">CE</option>
                        <option value="PE">PE</option>
                    </select>
                </div>
            </div>
            <div class="form-row empresa-valores-row">
                <div class="form-group">
                    <label><i class="fas fa-users"></i> Nº de Colaboradores</label>
                    <input type="number" class="empresa-colaboradores" value="20" min="1">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-dollar-sign"></i> Valor (R$)</label>
                    <input type="text" class="empresa-valor" placeholder="0,00">
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', empresaHTML);
    atualizarTotalGrupo();
    atualizarPreview();
}

/**
 * Remove uma empresa do grupo
 */
function removerEmpresa(index: number): void {
    const empresa = document.querySelector(`.empresa-item[data-index="${index}"]`);
    if (empresa) {
        empresa.remove();
        atualizarNumerosEmpresas();
        atualizarPreview();
    }
}

/**
 * Atualiza a numeração das empresas após remoção
 */
function atualizarNumerosEmpresas(): void {
    const empresas = document.querySelectorAll('.empresa-item');
    empresas.forEach((empresa, i) => {
        const numero = empresa.querySelector('.empresa-numero');
        if (numero) {
            numero.textContent = `Empresa ${i + 1}`;
        }
    });
}

/**
 * Captura os dados de todas as empresas do formulário
 */
function capturarEmpresas(): EmpresaGrupo[] {
    const empresas: EmpresaGrupo[] = [];
    const empresaItems = document.querySelectorAll('.empresa-item');
    
    empresaItems.forEach(item => {
        const razao = (item.querySelector('.empresa-razao') as HTMLInputElement)?.value || '';
        if (razao.trim()) {
            const valorStr = (item.querySelector('.empresa-valor') as HTMLInputElement)?.value || '0';
            const valor = parseValorMonetario(valorStr);
            
            empresas.push({
                razaoSocial: razao,
                cnpj: (item.querySelector('.empresa-cnpj') as HTMLInputElement)?.value || '',
                endereco: (item.querySelector('.empresa-endereco') as HTMLInputElement)?.value || '',
                bairro: (item.querySelector('.empresa-bairro') as HTMLInputElement)?.value || '',
                cep: (item.querySelector('.empresa-cep') as HTMLInputElement)?.value || '',
                cidade: (item.querySelector('.empresa-cidade') as HTMLInputElement)?.value || 'Natal',
                estado: (item.querySelector('.empresa-uf') as HTMLSelectElement)?.value || 'RN',
                qtdColaboradores: (item.querySelector('.empresa-colaboradores') as HTMLInputElement)?.value || '',
                valor: valor
            });
        }
    });
    
    return empresas;
}

/**
 * Atualiza o total do grupo e o campo de valor da proposta
 */
function atualizarTotalGrupo(): void {
    const isGrupo = (document.getElementById('proposta_grupo') as HTMLInputElement)?.checked || false;
    if (!isGrupo) return;
    
    const empresas = capturarEmpresas();
    const total = empresas.reduce((acc, emp) => acc + (emp.valor || 0), 0);
    
    // Atualizar o campo de valor da proposta com o total
    const valorInput = document.getElementById('valor_proposta') as HTMLInputElement;
    if (valorInput && total > 0) {
        valorInput.value = formatMoeda(total);
        atualizarValor();
    }
}

/**
 * Atualiza a pré-visualização da capa em tempo real
 */
function atualizarPreview(): void {
    const tipo = getElement<HTMLSelectElement>('tipo_proposta').value;
    const numero = getElement<HTMLInputElement>('numero_proposta').value || 'TM0000';
    const dataStr = getElement<HTMLInputElement>('data_proposta').value;
    
    // Verificar se é proposta em grupo
    const isGrupo = (document.getElementById('proposta_grupo') as HTMLInputElement)?.checked || false;
    const nomeGrupo = (document.getElementById('grupo_nome') as HTMLInputElement)?.value || '';
    
    let razaoSocial = 'Nome da Empresa';
    if (isGrupo && nomeGrupo) {
        razaoSocial = nomeGrupo;
    } else {
        const primeiraEmpresa = document.querySelector('.empresa-item .empresa-razao') as HTMLInputElement;
        razaoSocial = primeiraEmpresa?.value || 'Nome da Empresa';
    }
    
    // Atualizar classe do tipo
    const previewPage = getElement<HTMLDivElement>('preview-page');
    previewPage.className = 'preview-page ' + tipo;
    
    // Atualizar badge (número da proposta)
    getElement<HTMLDivElement>('preview-badge').textContent = numero;
    
    // Atualizar ícone
    const config = previewConfigs[tipo] || previewConfigs.brigada;
    getElement<HTMLDivElement>('preview-icon').innerHTML = `<i class="${config.icon}"></i>`;
    
    // Atualizar títulos
    
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
    
    // Controle de visibilidade baseado no tipo
    getElement<HTMLSelectElement>('tipo_proposta').addEventListener('change', function(this: HTMLSelectElement) {
        const tipo = this.value;
        
        // Seção de colaboradores (apenas para psicossocial)
        const sectionColaboradores = document.querySelector('.form-section:has(#num_colaboradores)') as HTMLElement | null;
        if (sectionColaboradores) {
            sectionColaboradores.style.display = tipo === 'psicossocial' ? 'block' : 'none';
        }
        
        // Seção de treinamentos (apenas para treinamentos)
        const sectionTreinamentos = document.getElementById('section-treinamentos');
        if (sectionTreinamentos) {
            sectionTreinamentos.style.display = tipo === 'treinamentos' ? 'block' : 'none';
        }
        
        // Seção de entregáveis psicossocial (apenas para psicossocial)
        const sectionPsicossocial = document.getElementById('section-psicossocial');
        if (sectionPsicossocial) {
            sectionPsicossocial.style.display = tipo === 'psicossocial' ? 'block' : 'none';
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
    
    // Inicializar visibilidade da seção de treinamentos
    const sectionTreinamentos = document.getElementById('section-treinamentos');
    if (sectionTreinamentos) {
        sectionTreinamentos.style.display = tipoInicial === 'treinamentos' ? 'block' : 'none';
    }
    
    // Inicializar visibilidade da seção de psicossocial
    const sectionPsicossocial = document.getElementById('section-psicossocial');
    if (sectionPsicossocial) {
        sectionPsicossocial.style.display = tipoInicial === 'psicossocial' ? 'block' : 'none';
    }
    
    // Event listeners para checkboxes de treinamentos
    const trainingCheckboxes = document.querySelectorAll('.training-item input[type="checkbox"]');
    trainingCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', atualizarTotalTreinamentos);
    });
    
    // Event listeners para campos de valor dos treinamentos
    const trainingValueInputs = document.querySelectorAll('.training-details input');
    trainingValueInputs.forEach(input => {
        input.addEventListener('input', atualizarTotalTreinamentos);
    });
    
    // Botão de gerar proposta
    getElement<HTMLButtonElement>('btn-gerar-proposta').addEventListener('click', gerarProposta);
    
    // Event listeners para atualizar preview em tempo real
    getElement<HTMLInputElement>('numero_proposta').addEventListener('input', atualizarPreview);
    getElement<HTMLInputElement>('data_proposta').addEventListener('change', atualizarPreview);
    
    // Event listener para toggle de grupo
    const grupoCheckbox = document.getElementById('proposta_grupo') as HTMLInputElement;
    if (grupoCheckbox) {
        grupoCheckbox.addEventListener('change', () => {
            const isGrupo = grupoCheckbox.checked;
            const grupoNomeContainer = document.getElementById('grupo-nome-container');
            const btnAdicionarContainer = document.getElementById('btn-adicionar-empresa-container');
            const empresas = document.querySelectorAll('.empresa-item');
            
            if (grupoNomeContainer) {
                grupoNomeContainer.style.display = isGrupo ? 'block' : 'none';
            }
            if (btnAdicionarContainer) {
                btnAdicionarContainer.style.display = isGrupo ? 'block' : 'none';
            }
            
            // Mostrar/esconder campos de valores e botões de remover
            empresas.forEach((empresa, index) => {
                const btnRemover = empresa.querySelector('.btn-remover-empresa') as HTMLElement;
                const valoresRow = empresa.querySelector('.empresa-valores-row') as HTMLElement;
                
                if (btnRemover) {
                    btnRemover.style.display = isGrupo && index > 0 ? 'flex' : 'none';
                }
                if (valoresRow) {
                    valoresRow.style.display = isGrupo ? 'flex' : 'none';
                }
                if (isGrupo) {
                    empresa.classList.add('is-grupo');
                } else {
                    empresa.classList.remove('is-grupo');
                }
            });
            
            atualizarPreview();
        });
    }
    
    // Event listener para nome do grupo
    const grupoNome = document.getElementById('grupo_nome') as HTMLInputElement;
    if (grupoNome) {
        grupoNome.addEventListener('input', atualizarPreview);
    }
    
    // Event listener para mudanças nas empresas (preview e total)
    const empresasContainer = document.getElementById('empresas-container');
    if (empresasContainer) {
        empresasContainer.addEventListener('input', (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('empresa-valor')) {
                atualizarTotalGrupo();
            }
            atualizarPreview();
        });
    }
    
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
    
    // Capturar treinamentos se for proposta de treinamentos
    const treinamentos = tipo === 'treinamentos' ? capturarTreinamentosSelecionados() : undefined;
    
    // Capturar entregáveis psicossociais se for proposta de psicossocial
    const entregaveisPsico = tipo === 'psicossocial' ? capturarEntregaveisPsico() : undefined;
    
    // Validar se tem pelo menos um treinamento selecionado
    if (tipo === 'treinamentos' && (!treinamentos || treinamentos.length === 0)) {
        alert('Por favor, selecione pelo menos um treinamento para a proposta');
        return;
    }
    
    // Verificar se é proposta em grupo
    const isGrupo = (document.getElementById('proposta_grupo') as HTMLInputElement)?.checked || false;
    const nomeGrupo = (document.getElementById('grupo_nome') as HTMLInputElement)?.value || '';
    const empresasGrupo = capturarEmpresas();
    
    // Pegar dados da primeira empresa como dados principais
    const primeiraEmpresa = empresasGrupo[0] || {
        razaoSocial: '',
        cnpj: '',
        endereco: '',
        bairro: '',
        cep: '',
        cidade: 'Natal',
        estado: 'RN',
        qtdColaboradores: ''
    };
    
    // Calcular total de colaboradores se for grupo
    let qtdColaboradoresTotal = '';
    if (isGrupo && empresasGrupo.length > 0) {
        const total = empresasGrupo.reduce((acc, emp) => {
            return acc + (parseInt(emp.qtdColaboradores || '0') || 0);
        }, 0);
        qtdColaboradoresTotal = total > 0 ? total.toString() : '';
    } else {
        qtdColaboradoresTotal = primeiraEmpresa.qtdColaboradores || '';
    }
    
    const dados: DadosCliente = {
        codigoProposta: getElement<HTMLInputElement>('numero_proposta').value || 'TM0000',
        dataProposta: getElement<HTMLInputElement>('data_proposta').value,
        razaoSocial: isGrupo && nomeGrupo ? nomeGrupo : primeiraEmpresa.razaoSocial,
        nomeFantasia: isGrupo && nomeGrupo ? nomeGrupo : primeiraEmpresa.razaoSocial,
        cnpj: primeiraEmpresa.cnpj,
        endereco: primeiraEmpresa.endereco,
        bairro: primeiraEmpresa.bairro,
        cep: primeiraEmpresa.cep,
        cidade: primeiraEmpresa.cidade,
        estado: primeiraEmpresa.estado,
        qtdColaboradores: qtdColaboradoresTotal || getElement<HTMLInputElement>('num_colaboradores').value || '',
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
        },
        treinamentos,
        entregaveisPsico,
        isGrupo,
        nomeGrupo: isGrupo ? nomeGrupo : undefined,
        empresasGrupo: isGrupo ? empresasGrupo : undefined
    };
    
    if (!dados.razaoSocial && empresasGrupo.length === 0) {
        alert('Por favor, preencha a Razão Social do cliente');
        return;
    }
    
    if (isGrupo && empresasGrupo.length < 2) {
        alert('Para proposta em grupo, adicione pelo menos 2 empresas');
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
window.adicionarEmpresa = adicionarEmpresa;
window.removerEmpresa = removerEmpresa;

// Re-exportar módulos para acesso externo se necessário
export {
    configs,
    gerarProposta,
    atualizarValor,
    formatMoeda,
    parseValorMonetario,
    calcularDesconto
};
