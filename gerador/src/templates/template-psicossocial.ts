// =====================================================
// TEMPLATE RISCOS PSICOSSOCIAIS - COMPLETO
// Modelo: 11 páginas (baseado na proposta de referência)
// =====================================================

import { DadosTemplate, EntregavelPsico, EmpresaGrupo } from '../types/proposta.types';
import { formatMoeda } from '../utils/formatters';

/**
 * Gera HTML para uma empresa do grupo
 */
function gerarEmpresaGrupoHTML(empresa: EmpresaGrupo, index: number): string {
    return `
        <div style="background: var(--light-color); border-radius: 10px; padding: 15px; margin-bottom: 12px; border-left: 4px solid var(--secondary-color);">
            <h4 style="font-family: var(--font-primary); font-size: 13px; color: var(--secondary-color); margin-bottom: 10px;">
                <i class="fas fa-building" style="margin-right: 6px;"></i>Empresa ${index + 1}: ${empresa.razaoSocial}
            </h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
                <div><strong>CNPJ:</strong> ${empresa.cnpj || '—'}</div>
                <div><strong>Colaboradores:</strong> ${empresa.qtdColaboradores || '—'}</div>
                <div style="grid-column: 1 / -1;"><strong>Endereço:</strong> ${empresa.endereco || '—'}, ${empresa.bairro || ''} - ${empresa.cidade || ''} / ${empresa.estado || ''}</div>
            </div>
        </div>
    `;
}

/**
 * Gera a tabela de investimento para proposta individual
 */
function gerarTabelaPrecificacao(qtdColaboradores: string, valorFinal: number): string {
    const qtd = parseInt(qtdColaboradores) || 0;

    return `
            <h3 class="subsection-title"><i class="fas fa-table"></i> Tabela de Investimento</h3>

            <table style="width: 100%; border-collapse: collapse; margin: 10px 0; border: 1px solid #cbd5e0;">
                <thead>
                    <tr style="background: var(--primary-color); color: white;">
                        <th style="padding: 8px 12px; text-align: center; font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 600; border: 1px solid var(--primary-color);">Nº de Colaboradores</th>
                        <th style="padding: 8px 12px; text-align: right; font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 600; border: 1px solid var(--primary-color);">Valor Final</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="background: white; border-bottom: 1px solid #e2e8f0;">
                        <td style="padding: 8px 12px; text-align: center; font-size: 10px; color: #2d3748; border: 1px solid #cbd5e0;">${qtd}</td>
                        <td style="padding: 8px 12px; text-align: right; font-size: 10px; color: #2d3748; border: 1px solid #cbd5e0; font-weight: 600;">R$ ${formatMoeda(valorFinal)}</td>
                    </tr>
                </tbody>
            </table>
    `;
}

/**
 * Gera a tabela de investimento por empresa (para proposta em grupo)
 */
function gerarTabelaInvestimentoGrupo(dados: DadosTemplate, valorFinal: number): string {
    if (!dados.isGrupo || !dados.empresasGrupo || dados.empresasGrupo.length === 0) {
        // Proposta individual - usa tabela de faixas
        return gerarTabelaPrecificacao(dados.qtdColaboradores, valorFinal);
    }
    
    // Proposta em grupo - tabela detalhada por empresa
    const totalColaboradores = dados.empresasGrupo.reduce((acc, emp) => acc + (parseInt(emp.qtdColaboradores || '0') || 0), 0);
    const totalValor = dados.empresasGrupo.reduce((acc, emp) => acc + (emp.valor || 0), 0);
    
    const linhasEmpresas = dados.empresasGrupo.map((emp) => `
        <tr>
            <td class="training-name">
                <i class="fas fa-building" style="color: var(--secondary-color);"></i> 
                ${emp.razaoSocial}
            </td>
            <td style="text-align: center;">${emp.qtdColaboradores || '—'}</td>
            <td style="text-align: right; font-weight: 600;">R$ ${formatMoeda(emp.valor || 0)}</td>
        </tr>
    `).join('');
    
    return `
        <table class="investment-table">
            <thead>
                <tr>
                    <th style="width: 50%;">Empresa</th>
                    <th style="width: 20%; text-align: center;">Nº Colaboradores</th>
                    <th style="width: 30%; text-align: right;">Valor</th>
                </tr>
            </thead>
            <tbody>
                ${linhasEmpresas}
            </tbody>
            <tfoot>
                <tr>
                    <td><i class="fas fa-calculator"></i> INVESTIMENTO TOTAL</td>
                    <td style="text-align: center;"><strong>${totalColaboradores}</strong></td>
                    <td style="text-align: right;">R$ ${formatMoeda(totalValor > 0 ? totalValor : valorFinal)}</td>
                </tr>
            </tfoot>
        </table>
    `;
}
/**
 * Gera a seção de empresas (individual ou grupo)
 */
function gerarSecaoEmpresas(dados: DadosTemplate): string {
    if (dados.isGrupo && dados.empresasGrupo && dados.empresasGrupo.length > 0) {
        const empresasHTML = dados.empresasGrupo.map((emp, i) => gerarEmpresaGrupoHTML(emp, i)).join('');
        const totalColaboradores = dados.empresasGrupo.reduce((acc, emp) => acc + (parseInt(emp.qtdColaboradores || '0') || 0), 0);
        
        return `
            <div class="info-box" style="margin-bottom: 15px; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-left-color: #10b981;">
                <h4 style="color: #10b981;"><i class="fas fa-layer-group"></i> Proposta para Grupo: ${dados.nomeGrupo || dados.razaoSocial}</h4>
                <p>Esta proposta abrange <strong>${dados.empresasGrupo.length} empresas</strong> do grupo, totalizando <strong>${totalColaboradores} colaboradores</strong>.</p>
            </div>
            
            <h3 class="subsection-title"><i class="fas fa-building"></i> Empresas do Grupo</h3>
            ${empresasHTML}
        `;
    } else {
        return `
            <h3 class="subsection-title"><i class="fas fa-building"></i> Dados da Empresa</h3>
            
            <div class="company-info-grid">
                <div class="company-info-item">
                    <label>Razão Social</label>
                    <span>${dados.razaoSocial}</span>
                </div>
                <div class="company-info-item">
                    <label>CNPJ</label>
                    <span>${dados.cnpj}</span>
                </div>
                <div class="company-info-item">
                    <label>Nome Fantasia</label>
                    <span>${dados.razaoSocial}</span>
                </div>
                <div class="company-info-item">
                    <label>Quantidade de Colaboradores</label>
                    <span>${dados.qtdColaboradores || '—'} colaboradores</span>
                </div>
                <div class="company-info-item">
                    <label>Endereço</label>
                    <span>${dados.endereco}</span>
                </div>
                <div class="company-info-item">
                    <label>Bairro</label>
                    <span>${dados.bairro}</span>
                </div>
                <div class="company-info-item">
                    <label>CEP</label>
                    <span>${dados.cep}</span>
                </div>
                <div class="company-info-item">
                    <label>Município / UF</label>
                    <span>${dados.cidade} - ${dados.uf}</span>
                </div>
            </div>
        `;
    }
}

/**
 * Entregáveis padrão caso não sejam fornecidos
 */
const entregaveisPadrao: EntregavelPsico[] = [
    {
        id: 'relatorio',
        titulo: 'Relatório Técnico de Avaliação de Riscos Psicossociais',
        icon: 'fas fa-file-alt',
        descricao: 'Documento completo com diagnóstico organizacional, análise quantitativa e qualitativa, classificação por criticidade e probabilidade, mapeamento por setor/função e indicadores de risco.',
        ativo: true
    },
    {
        id: 'plano',
        titulo: 'Plano de Ação Preventivo e Corretivo',
        icon: 'fas fa-tasks',
        descricao: 'Recomendações técnicas estruturadas com medidas de controle, prazos sugeridos, responsáveis indicados e priorização conforme matriz de risco.',
        ativo: true
    },
    {
        id: 'aep',
        titulo: 'AEP – Avaliação Ergonômica Preliminar',
        icon: 'fas fa-clipboard-check',
        descricao: 'Análise das condições ergonômicas correlacionadas aos fatores psicossociais identificados (quando aplicável ao contexto).',
        ativo: true
    },
    {
        id: 'palestras',
        titulo: 'Palestra de Conscientização',
        icon: 'fas fa-chalkboard-teacher',
        descricao: 'Palestra sobre Fatores de Riscos Psicossociais no ambiente de trabalho para sensibilização dos colaboradores.',
        ativo: true
    },
    {
        id: 'janeiro_branco',
        titulo: 'Campanha Janeiro Branco',
        icon: 'fas fa-ribbon',
        descricao: 'Material de conscientização sobre saúde mental para divulgação interna',
        ativo: true
    },
    {
        id: 'reavaliacao',
        titulo: 'Reavaliação Trimestral',
        icon: 'fas fa-redo',
        descricao: 'Uma reavaliação dos fatores de riscos psicossociais após 3 meses da entrega do relatório inicial',
        ativo: true
    }
];

/**
 * Gera HTML para os entregáveis principais (excluindo bônus)
 */
function gerarEntregaveisDinamicos(entregaveis?: EntregavelPsico[]): string {
    const lista = entregaveis && entregaveis.length > 0 ? entregaveis : entregaveisPadrao;
    
    const principais = lista.filter(e => 
        e.ativo && e.id !== 'janeiro_branco' && e.id !== 'reavaliacao'
    );
    
    return principais.map(entregavel => {
        let titulo = entregavel.titulo;
        if (entregavel.id === 'palestras' && entregavel.quantidade && entregavel.quantidade > 1) {
            titulo = `${entregavel.quantidade} ${entregavel.titulo}s`;
        }
        
        return `
                <div class="deliverable-item">
                    <div class="deliverable-icon"><i class="${entregavel.icon}"></i></div>
                    <div class="deliverable-text">
                        <h4>${titulo}</h4>
                        <p>${entregavel.descricao}</p>
                    </div>
                </div>
        `;
    }).join('');
}

/**
 * Gera o template HTML completo para proposta de Riscos Psicossociais
 * Modelo com 11 páginas (baseado na proposta de referência)
 */
export function getTemplatePsicossocial(
    dados: DadosTemplate,
    valorOriginal: number,
    valorFinal: number,
    perc: number,
    temDesconto: boolean
): string {
    const nomeFantasia = dados.razaoSocial;
    
    let descontoHTML = '';
    if (temDesconto && perc > 0) {
        descontoHTML = `
            <div style="background: linear-gradient(135deg, #38a169 0%, #2f855a 100%); color: #fff; padding: 12px 20px; border-radius: 10px; text-align: center; margin: 10px 0;">
                <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px; opacity: 0.9;"><i class="fas fa-tag"></i> Desconto Especial Aplicado</p>
                <p style="font-size: 14px; margin: 0;"><s style="opacity: 0.7;">De ${formatMoeda(valorOriginal)}</s> &nbsp;<strong style="font-size: 18px;">${perc}% OFF</strong></p>
            </div>`;
    }

    const entregaveis = dados.entregaveisPsico && dados.entregaveisPsico.length > 0 ? dados.entregaveisPsico : entregaveisPadrao;
    const temReavaliacao = entregaveis.some(e => e.id === 'reavaliacao' && e.ativo);

    const incluidosBase = [
        'Aplicação de questionário validado cientificamente',
        'Análise técnica dos dados coletados',
        'Relatório Técnico de Avaliação de Riscos Psicossociais',
        'Plano de Ação com medidas preventivas',
        'AEP – Avaliação Ergonômica Preliminar',
        'Palestra de Conscientização sobre Riscos Psicossociais',
    ];
    if (temReavaliacao) {
        incluidosBase.push('Reavaliação após 3 meses (bônus incluso)');
    }

    const incluidosHTML = incluidosBase.map(item => `
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i>
                    <span>${item}</span>
                </div>`).join('\n');

    return `
        <!-- ====== PÁGINA 1: CAPA ====== -->
        <div class="page page-cover">
            <span style="position: absolute; top: 25mm; left: 0; right: 0; text-align: center; font-family: var(--font-primary); font-size: 14px; font-weight: 700; color: var(--secondary-color); letter-spacing: 3px;">${dados.numero}</span>
            
            <img src="${dados.logoUrl}" alt="EngMarq Solution" class="cover-logo">
            
            <span class="cover-badge">
                <i class="fas fa-exclamation-circle"></i>
                Nova Obrigação Legal - NR-01
            </span>

            <div class="cover-icon">
                <i class="fas fa-brain"></i>
            </div>

            <h1 class="cover-title">
                Proposta Comercial<br>
                <span>Avaliação de Fatores de Riscos Psicossociais</span>
            </h1>
            <p class="cover-subtitle">
                Proposta técnica para adequação à atualização da NR-01 do Ministério do Trabalho
            </p>
            
            <div class="cover-client">
                <p class="cover-client-label">Proposta elaborada para</p>
                <p class="cover-client-name">${nomeFantasia}</p>
            </div>

            <p class="cover-date">
                <i class="fas fa-calendar-alt"></i>&nbsp;&nbsp;
                ${dados.data}
            </p>

            <div class="cover-footer">
                <p>EngMarq Solution | Engenharia de Segurança e Saúde do Trabalho | Natal - RN</p>
            </div>
        </div>

        <!-- ====== PÁGINA 2: SOBRE A EMPRESA CONTRATANTE ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">1</span>
                <span class="section-title-text">Sobre ${dados.isGrupo ? 'as Empresas Contratantes' : 'a Empresa Contratante'}</span>
            </h2>

            ${gerarSecaoEmpresas(dados)}

            ${dados.solicitante.nome ? `
            <h3 class="subsection-title" style="margin-top: 20px;"><i class="fas fa-user"></i> Solicitante</h3>
            <div class="company-info-grid">
                <div class="company-info-item"><label>Nome</label><span>${dados.solicitante.nome}</span></div>
                <div class="company-info-item"><label>Cargo</label><span>${dados.solicitante.cargo || '-'}</span></div>
                <div class="company-info-item"><label>E-mail</label><span>${dados.solicitante.email || '-'}</span></div>
                <div class="company-info-item"><label>Telefone</label><span>${dados.solicitante.telefone || '-'}</span></div>
            </div>
            ` : ''}

            <div class="info-box" style="margin-top: 25px;">
                <h4><i class="fas fa-handshake"></i> Proposta Especializada</h4>
                <p>Esta proposta foi desenvolvida para atender às necessidades de avaliação dos fatores de riscos psicossociais da empresa, em total conformidade com a NR-01 atualizada e com foco na segurança jurídica da organização.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">02</span>
            </div>
        </div>

        <!-- ====== PÁGINA 3: CONTEXTO E OBRIGAÇÃO LEGAL ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">2</span>
                <span class="section-title-text">Contexto e Obrigação Legal</span>
            </h2>

            <div class="alert-box">
                <h4><i class="fas fa-gavel"></i> Atenção: Nova Obrigação Legal</h4>
                <p>A atualização da <strong>NR-01</strong> pelo Ministério do Trabalho estabelece que <strong>todas as empresas</strong> devem realizar a avaliação e gestão dos <strong>Fatores de Riscos Psicossociais</strong> no ambiente de trabalho.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-file-contract"></i> O que mudou na NR-01?</h3>
            <p>
                A Norma Regulamentadora nº 01, que trata das disposições gerais sobre saúde e segurança no trabalho, foi atualizada para incluir explicitamente a obrigatoriedade de identificação, avaliação e gestão dos <strong>riscos psicossociais</strong> no Programa de Gerenciamento de Riscos (PGR).
            </p>
            <p>
                Essa mudança reconhece que fatores relacionados à organização do trabalho, às relações interpessoais e ao ambiente organizacional podem impactar significativamente a saúde mental e o bem-estar dos trabalhadores.
            </p>

            <div class="highlight-box">
                <p><strong>Prazo de adequação:</strong> As empresas devem se adequar às novas exigências imediatamente, incluindo a avaliação dos fatores de riscos psicossociais em seus programas de SST. O descumprimento pode resultar em autuações, multas e passivos trabalhistas significativos.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-exclamation-triangle"></i> Riscos Jurídicos do Não Cumprimento</h3>
            <ul class="feature-list">
                <li><strong>Multas e autuações</strong> em fiscalizações do Ministério do Trabalho e Emprego</li>
                <li><strong>Processos trabalhistas</strong> relacionados a doenças ocupacionais de origem psíquica</li>
                <li><strong>Ações regressivas</strong> do INSS por afastamentos decorrentes de transtornos mentais</li>
                <li><strong>Responsabilização civil e criminal</strong> em casos de omissão comprovada</li>
                <li><strong>Danos à imagem</strong> institucional e reputação da empresa</li>
                <li><strong>Aumento do FAP</strong> (Fator Acidentário de Prevenção) e custos previdenciários</li>
            </ul>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">03</span>
            </div>
        </div>

        <!-- ====== PÁGINA 4: O QUE SÃO FATORES DE RISCOS PSICOSSOCIAIS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">3</span>
                <span class="section-title-text">O que são Fatores de Riscos Psicossociais?</span>
            </h2>

            <p>
                Os <strong>Fatores de Riscos Psicossociais</strong> são aspectos da organização e gestão do trabalho, bem como do contexto social e ambiental, que têm potencial de causar danos psicológicos, sociais ou físicos aos trabalhadores.
            </p>

            <div class="purple-box">
                <h4><i class="fas fa-brain"></i> Definição Técnica</h4>
                <p>São elementos presentes no <strong>ambiente de trabalho</strong> que podem afetar a saúde mental, o bem-estar psicológico e a qualidade de vida dos trabalhadores, incluindo aspectos organizacionais, relacionais e contextuais.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-list-check"></i> Principais Fatores Avaliados</h3>

            <div class="factors-grid">
                <div class="factor-card">
                    <h4><i class="fas fa-building"></i> Ambiente Organizacional</h4>
                    <p>Clima organizacional, cultura da empresa, valores institucionais e políticas de gestão de pessoas.</p>
                </div>
                <div class="factor-card">
                    <h4><i class="fas fa-clock"></i> Carga de Trabalho</h4>
                    <p>Volume de demandas, ritmo de trabalho, prazos, pressão por resultados e metas estabelecidas.</p>
                </div>
                <div class="factor-card">
                    <h4><i class="fas fa-users"></i> Relações Interpessoais</h4>
                    <p>Qualidade das relações com colegas e lideranças, comunicação, conflitos e suporte social.</p>
                </div>
                <div class="factor-card">
                    <h4><i class="fas fa-hand-paper"></i> Assédio e Violência</h4>
                    <p>Ocorrência de assédio moral, sexual, discriminação e qualquer forma de violência no trabalho.</p>
                </div>
                <div class="factor-card">
                    <h4><i class="fas fa-balance-scale"></i> Autonomia e Controle</h4>
                    <p>Grau de autonomia nas tarefas, participação nas decisões e controle sobre o próprio trabalho.</p>
                </div>
                <div class="factor-card">
                    <h4><i class="fas fa-home"></i> Equilíbrio Trabalho-Vida</h4>
                    <p>Compatibilidade entre demandas profissionais e vida pessoal, flexibilidade e jornada de trabalho.</p>
                </div>
                <div class="factor-card">
                    <h4><i class="fas fa-award"></i> Reconhecimento</h4>
                    <p>Valorização do trabalho, feedback, oportunidades de crescimento e desenvolvimento profissional.</p>
                </div>
                <div class="factor-card">
                    <h4><i class="fas fa-shield-alt"></i> Segurança no Emprego</h4>
                    <p>Estabilidade, clareza sobre o futuro profissional e condições contratuais adequadas.</p>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">04</span>
            </div>
        </div>

        <!-- ====== PÁGINA 5: METODOLOGIA ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">4</span>
                <span class="section-title-text">Metodologia de Avaliação</span>
            </h2>

            <p>Nossa metodologia de avaliação dos Fatores de Riscos Psicossociais segue um fluxo técnico estruturado, com coleta de dados quantitativos e qualitativos, utilizando instrumentos validados cientificamente e em conformidade com a NR-01:</p>

            <div class="methodology-steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h4>Planejamento e Sensibilização da Liderança</h4>
                        <p>Reunião estratégica com a alta gestão e lideranças para apresentação do projeto, alinhamento de expectativas, definição de cronograma e engajamento organizacional para adesão dos colaboradores.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h4>Aplicação de Instrumentos Psicossociais Validados</h4>
                        <p>Coleta de dados por meio de questionários padronizados e validados cientificamente, garantindo confidencialidade, anonimato e adesão ética às diretrizes de pesquisa em saúde ocupacional.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h4>Análise Documental e Indicadores de RH <em style="font-weight: 400; color: var(--gray-color);">(caso dados disponíveis)</em></h4>
                        <p>Revisão de indicadores organizacionais (absenteísmo, turnover, afastamentos por CID-F, atestados médicos), políticas internas e histórico de ocorrências relacionadas à saúde mental.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                        <h4>Análise por Setor, Função e Grupo de Exposição</h4>
                        <p>Segmentação dos dados coletados por áreas, cargos e grupos homogêneos de exposição, permitindo identificação de fatores de risco específicos de cada contexto organizacional.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">5</div>
                    <div class="step-content">
                        <h4>Classificação dos Riscos: Criticidade e Probabilidade</h4>
                        <p>Aplicação de matriz de risco para classificação por índice de criticidade e probabilidade de ocorrência, priorizando ações conforme impacto potencial na saúde dos trabalhadores.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">6</div>
                    <div class="step-content">
                        <h4>Elaboração do Relatório Técnico</h4>
                        <p>Relatório técnico detalhado com diagnóstico, classificação dos riscos, recomendações preventivas e corretivas conforme metodologia validada.</p>
                    </div>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">05</span>
            </div>
        </div>

        <!-- ====== PÁGINA 6: ENTREGÁVEIS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">5</span>
                <span class="section-title-text">Entregáveis e Escopo dos Serviços</span>
            </h2>

            <div class="info-box" style="margin-bottom: 15px;">
                <p style="margin: 0;"><strong><i class="fas fa-users"></i> Abrangência:</strong> Avaliação para <strong>${dados.qtdColaboradores || '—'} colaboradores</strong></p>
            </div>

            <p>Ao final do trabalho, a empresa receberá os seguintes documentos técnicos, todos elaborados em conformidade com a NR-01 e metodologias reconhecidas:</p>

            <h3 class="subsection-title"><i class="fas fa-file-pdf"></i> Documentos Técnicos (PDF)</h3>

            <div class="deliverables-grid">
                ${gerarEntregaveisDinamicos(dados.entregaveisPsico)}
            </div>

            <h3 class="subsection-title"><i class="fas fa-user-md"></i> Atuação Técnica Especializada</h3>
            <p style="margin-bottom: 15px;">Os serviços contam com a atuação integrada de <strong>Engenharia de SST</strong> e <strong>Psicologia do Trabalho</strong>, garantindo:</p>
            <ul class="feature-list" style="margin-bottom: 20px;">
                <li>Diagnóstico e interpretação técnica dos dados psicossociais coletados</li>
                <li>Análise organizacional e comportamental do ambiente de trabalho</li>
                <li>Orientação técnica para prevenção de adoecimento mental ocupacional</li>
                <li>Recomendações alinhadas às boas práticas de gestão de saúde mental no trabalho</li>
            </ul>

            <div class="info-box">
                <h4><i class="fas fa-shield-alt"></i> Validade Legal e Técnica</h4>
                <p>Todos os documentos são assinados por profissionais habilitados, em conformidade com a NR-01 e metodologias validadas cientificamente, garantindo aceitação em fiscalizações do MTE e processos trabalhistas.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">06</span>
            </div>
        </div>

        <!-- ====== PÁGINA 7: INVESTIMENTO ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">6</span>
                <span class="section-title-text">Investimento</span>
            </h2>

            <div class="highlight-box" style="margin-bottom: 15px;">
                ${dados.isGrupo && dados.empresasGrupo && dados.empresasGrupo.length > 0 
                    ? `<p style="margin: 0;"><strong><i class="fas fa-building"></i> Proposta para ${dados.nomeGrupo || 'Grupo'}:</strong> ${dados.empresasGrupo.length} empresas | <strong>${dados.empresasGrupo.reduce((acc, emp) => acc + (parseInt(emp.qtdColaboradores || '0') || 0), 0)} colaboradores</strong></p>`
                    : `<p style="margin: 0;"><strong><i class="fas fa-users"></i> Abrangência:</strong> Serviço dimensionado para <strong>${dados.qtdColaboradores || '—'} colaboradores</strong></p>`
                }
            </div>

            ${descontoHTML}

            ${gerarTabelaInvestimentoGrupo(dados, valorFinal)}

            <div class="success-box" style="margin: 15px 0;">
                <h4><i class="fas fa-gift"></i> Bônus Exclusivo</h4>
                <p>Como diferencial desta proposta, a empresa receberá uma <strong>reavaliação dos fatores de riscos psicossociais após 3 meses</strong> da entrega do relatório inicial, sem custo adicional. Essa reavaliação permitirá verificar a eficácia das ações implementadas e acompanhar a evolução dos indicadores identificados na primeira avaliação.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-check-circle"></i> O Que Está Incluso</h3>
            
            <div class="included-services" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px; font-size: 10px;">
${incluidosHTML}
            </div>

            <div class="info-box" style="background: #f0f9ff; border-left: 4px solid #1a365d; padding: 12px 15px;">
                <p style="margin: 0; font-size: 10px;"><strong><i class="fas fa-info-circle"></i> Nota:</strong> Este valor contempla a execução integral do escopo técnico, incluindo a reavaliação após 3 meses. Serviços complementares, caso solicitados, serão objeto de negociação em separado.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">07</span>
            </div>
        </div>

        <!-- ====== PÁGINA 8: CONDIÇÕES COMERCIAIS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">7</span>
                <span class="section-title-text">Condições Comerciais</span>
            </h2>

            <div class="conditions-list">
                <div class="condition-item">
                    <div class="condition-icon"><i class="fas fa-calendar-check"></i></div>
                    <div class="condition-text">
                        <strong>Validade da Proposta</strong>
                        <span>Esta proposta comercial é válida por 15 (quinze) dias a partir da data de emissão.</span>
                    </div>
                </div>
                <div class="condition-item">
                    <div class="condition-icon"><i class="fas fa-credit-card"></i></div>
                    <div class="condition-text">
                        <strong>Condições de Pagamento</strong>
                        <span>50% na aprovação da proposta e 50% na entrega do relatório final. Outras condições podem ser negociadas.</span>
                    </div>
                </div>
                <div class="condition-item">
                    <div class="condition-icon"><i class="fas fa-clock"></i></div>
                    <div class="condition-text">
                        <strong>Prazo de Execução</strong>
                        <span>A avaliação será concluída em até 20 (vinte) dias úteis após a aprovação, condicionado à disponibilidade para aplicação dos questionários e fornecimento dos dados necessários pela empresa.</span>
                    </div>
                </div>
                <div class="condition-item">
                    <div class="condition-icon"><i class="fas fa-redo-alt"></i></div>
                    <div class="condition-text">
                        <strong>Reavaliação (Bônus)</strong>
                        <span>A reavaliação será realizada 3 meses após a entrega do relatório inicial, com aplicação dos mesmos instrumentos, permitindo análise comparativa da evolução dos indicadores.</span>
                    </div>
                </div>
                <div class="condition-item">
                    <div class="condition-icon"><i class="fas fa-user-shield"></i></div>
                    <div class="condition-text">
                        <strong>Confidencialidade</strong>
                        <span>Garantimos total sigilo sobre as informações coletadas. Os dados individuais são anonimizados e apenas resultados agregados são apresentados no relatório.</span>
                    </div>
                </div>
                <div class="condition-item">
                    <div class="condition-icon"><i class="fas fa-headset"></i></div>
                    <div class="condition-text">
                        <strong>Suporte Pós-Entrega</strong>
                        <span>Suporte técnico por 30 dias após a entrega para esclarecimento de dúvidas sobre o relatório e orientações sobre o plano de ação.</span>
                    </div>
                </div>
            </div>

            <div class="info-box">
                <h4><i class="fas fa-certificate"></i> Garantia Técnica</h4>
                <p>Todos os trabalhos são realizados por profissionais qualificados, utilizando metodologias validadas cientificamente e em conformidade com as exigências da NR-01 atualizada.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-handshake"></i> O que a empresa precisa fornecer</h3>
            <ul class="feature-list">
                <li>Lista de colaboradores por setor/área para dimensionamento</li>
                <li>Acesso aos colaboradores para aplicação dos questionários</li>
                <li>Indicadores de RH dos últimos 12 meses <em style="color: var(--gray-color);">(caso disponíveis)</em></li>
                <li>Disponibilidade da liderança para reuniões de alinhamento e apresentação</li>
            </ul>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">08</span>
            </div>
        </div>

        <!-- ====== PÁGINA 9: RESPONSÁVEL PELA PROPOSTA ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">8</span>
                <span class="section-title-text">Responsável pela Proposta</span>
            </h2>

            <p style="text-align: center; margin-bottom: 30px; color: var(--gray-color);">
                Esta proposta comercial foi elaborada para atender às exigências da NR-01 atualizada, garantindo segurança jurídica e promovendo um ambiente de trabalho saudável.
            </p>

            <div class="responsible-card">
                <div class="responsible-avatar"><i class="fas fa-user-tie"></i></div>
                <h3 class="responsible-name">${dados.elaborador.nome}</h3>
                <p class="responsible-role">${dados.elaborador.cargo}</p>
                <p class="responsible-company">EngMarq Solution</p>
                <div class="responsible-contacts">
                    <div class="responsible-contact-item"><i class="fab fa-whatsapp"></i><span>${dados.elaborador.telefone}</span></div>
                    <div class="responsible-contact-item"><i class="fas fa-envelope"></i><span>${dados.elaborador.email}</span></div>
                    <div class="responsible-contact-item"><i class="fas fa-map-marker-alt"></i><span>Natal - RN</span></div>
                </div>
            </div>

            <div class="purple-box" style="margin-top: 30px;">
                <h4><i class="fas fa-headset"></i> Atendimento Especializado</h4>
                <p>Estamos à disposição para esclarecer qualquer dúvida sobre o escopo dos serviços, ajustar a proposta conforme necessidade e acompanhar todo o processo de avaliação dos riscos psicossociais na sua empresa.</p>
            </div>

            <div class="info-box" style="margin-top: 20px;">
                <h4><i class="fas fa-clock"></i> Horário de Atendimento</h4>
                <p>Segunda a Sexta: 08h às 18h | Sábado: 08h às 12h</p>
                <p style="margin-top: 10px;"><strong>Atendimento via WhatsApp:</strong> Resposta em até 2 horas durante o horário comercial</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">09</span>
            </div>
        </div>

        <!-- ====== PÁGINA 10: ENCERRAMENTO E CONTATO ====== -->
        <div class="page page-contact">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <div class="contact-content">
                <div class="contact-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <h2 class="contact-title">Garanta a Segurança Jurídica da sua Empresa</h2>
                <p class="contact-subtitle">
                    A avaliação dos Fatores de Riscos Psicossociais é uma <strong>obrigação legal</strong> prevista na NR-01 atualizada. Conte com o apoio técnico especializado da EngMarq Solution para adequar sua empresa e protegê-la de passivos trabalhistas.
                </p>

                <div class="alert-box" style="text-align: left; max-width: 450px; margin: 0 auto 30px;">
                    <h4><i class="fas fa-gavel"></i> Não deixe para depois</h4>
                    <p>Empresas que não realizarem a avaliação estão sujeitas a multas, autuações e responsabilização em processos trabalhistas relacionados à saúde mental dos colaboradores.</p>
                </div>

                <div class="contact-info">
                    <div class="contact-item"><i class="fab fa-whatsapp"></i><span>+55 84 99928-5888</span></div>
                    <div class="contact-item"><i class="fas fa-envelope"></i><span>engmarqsolution@gmail.com</span></div>
                    <div class="contact-item"><i class="fas fa-map-marker-alt"></i><span>Natal - RN</span></div>
                </div>

                <div class="contact-signature">
                    <p class="signature-text">
                        <strong>EngMarq Solution</strong><br>
                        Engenharia de Segurança e Saúde do Trabalho<br>
                        <em>Garantindo segurança jurídica para sua empresa.</em>
                    </p>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">10</span>
            </div>
        </div>

        <!-- ====== PÁGINA 11: TERMO DE ACEITE E ASSINATURAS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number"><i class="fas fa-file-signature"></i></span>
                <span class="section-title-text">Termo de Aceite da Proposta</span>
            </h2>

            <div class="info-box" style="margin-bottom: 20px;">
                <h4><i class="fas fa-check-circle"></i> Declaração de Aceite</h4>
                <p>Ao assinar este documento, as partes declaram estar de acordo com todos os termos, condições, valores e prazos descritos nesta proposta comercial, formalizando a contratação dos serviços especificados.</p>
            </div>

            <div style="background: var(--light-color); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h3 style="font-family: var(--font-primary); color: var(--primary-color); font-size: 16px; margin-bottom: 15px; text-align: center; border-bottom: 2px solid var(--purple-color); padding-bottom: 10px;">
                    <i class="fas fa-building" style="color: var(--purple-color);"></i> RESPONSÁVEL PELA ELABORAÇÃO DA PROPOSTA
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Razão Social</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">Engmarq Solution LTDA</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">CNPJ</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">60.545.359/0001-76</p>
                    </div>
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 0; font-size: 13px; font-weight: 600;">${dados.elaborador.nome} - ${dados.elaborador.cargo}</p>
                </div>
                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed var(--gray-color);">
                    <div style="text-align: center;">
                        <div style="border-bottom: 1px solid var(--dark-color); margin: 0 auto 5px; height: 35px; max-width: 450px;"></div>
                        <p style="margin: 0; font-size: 11px; color: var(--gray-color); text-align: center;">Assinatura do Proponente</p>
                    </div>
                </div>
            </div>

            <div style="background: var(--light-color); border-radius: 12px; padding: 20px;">
                <h3 style="font-family: var(--font-primary); color: var(--primary-color); font-size: 16px; margin-bottom: 15px; text-align: center; border-bottom: 2px solid var(--secondary-color); padding-bottom: 10px;">
                    <i class="fas fa-user-tie" style="color: var(--secondary-color);"></i> RESPONSÁVEL PELA APROVAÇÃO DA PROPOSTA
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Razão Social</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${dados.razaoSocial}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">CNPJ</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${dados.cnpj}</p>
                    </div>
                </div>
                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed var(--gray-color);">
                    <div style="text-align: center;">
                        <div style="border-bottom: 1px solid var(--dark-color); margin: 0 auto 5px; height: 35px; max-width: 450px;"></div>
                        <p style="margin: 0; font-size: 11px; color: var(--gray-color); text-align: center;">Assinatura do Aprovador</p>
                    </div>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">11</span>
            </div>
        </div>
    `;
}
