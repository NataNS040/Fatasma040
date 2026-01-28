// =====================================================
// TEMPLATE RISCOS PSICOSSOCIAIS - COMPLETO
// =====================================================

import { DadosTemplate } from '../types/proposta.types';
import { formatMoeda, valorPorExtenso } from '../utils/formatters';

/**
 * Gera o template HTML completo para proposta de Riscos Psicossociais
 * @param dados - Dados do cliente/proposta
 * @param valorOriginal - Valor original sem desconto
 * @param valorFinal - Valor final após desconto
 * @param perc - Percentual de desconto aplicado
 * @param temDesconto - Se há desconto aplicado
 * @returns String HTML do template completo (12 páginas)
 */
export function getTemplatePsicossocial(
    dados: DadosTemplate,
    valorOriginal: number,
    valorFinal: number,
    perc: number,
    temDesconto: boolean
): string {
    const nomeFantasia = dados.razaoSocial;
    
    // Seção de desconto
    let descontoHTML = '';
    if (temDesconto && perc > 0) {
        descontoHTML = `
            <div style="background: linear-gradient(135deg, #38a169 0%, #2f855a 100%); color: #fff; padding: 12px 20px; border-radius: 10px; text-align: center; margin: 10px 0;">
                <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px; opacity: 0.9;"><i class="fas fa-tag"></i> Desconto Especial Aplicado</p>
                <p style="font-size: 14px; margin: 0;"><s style="opacity: 0.7;">De ${formatMoeda(valorOriginal)}</s> &nbsp;<strong style="font-size: 18px;">${perc}% OFF</strong></p>
            </div>`;
    }

    return `
        <!-- ====== PÁGINA 1: CAPA ====== -->
        <div class="page page-cover">
            <span style="position: absolute; top: 25mm; left: 0; right: 0; text-align: center; font-family: var(--font-primary); font-size: 14px; font-weight: 700; color: var(--accent-color); letter-spacing: 3px;">${dados.numero}</span>
            
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
                <span class="section-title-text">Sobre a Empresa Contratante</span>
            </h2>

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
                    <span>${nomeFantasia}</span>
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

            ${dados.solicitante.nome ? `
            <h3 class="subsection-title" style="margin-top: 20px;"><i class="fas fa-user"></i> Solicitante</h3>
            <div class="company-info-grid">
                <div class="company-info-item"><label>Nome</label><span>${dados.solicitante.nome}</span></div>
                <div class="company-info-item"><label>Cargo</label><span>${dados.solicitante.cargo || '-'}</span></div>
                <div class="company-info-item"><label>E-mail</label><span>${dados.solicitante.email || '-'}</span></div>
                <div class="company-info-item"><label>Telefone</label><span>${dados.solicitante.telefone || '-'}</span></div>
            </div>
            ` : ''}

            <div class="info-box" style="margin-top: 25px; background: linear-gradient(135deg, #f9f0ff 0%, #ede9fe 100%); border-left-color: var(--accent-color);">
                <h4 style="color: var(--accent-color);"><i class="fas fa-handshake"></i> Proposta Especializada</h4>
                <p>Esta proposta foi desenvolvida para atender às necessidades de avaliação dos fatores de riscos psicossociais da empresa, em total conformidade com a NR-01 atualizada e com foco na segurança jurídica da organização.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">02</span>
            </div>
        </div>

        <!-- ====== PÁGINA 3: DADOS DA EMPRESA CONTRATADA ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number"><i class="fas fa-building"></i></span>
                <span class="section-title-text">Dados da Empresa Contratada</span>
            </h2>

            <div class="info-box" style="margin-bottom: 25px; background: linear-gradient(135deg, #f9f0ff 0%, #ede9fe 100%); border-left-color: var(--accent-color);">
                <h4 style="color: var(--accent-color);"><i class="fas fa-info-circle"></i> Informações para Faturamento e Contrato</h4>
                <p>Abaixo estão os dados cadastrais da EngMarq Solution para formalização contratual e emissão de documentos fiscais.</p>
            </div>

            <div style="background: var(--light-color); border-radius: 12px; padding: 30px; margin-bottom: 25px;">
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid var(--accent-color);">
                    <img src="${dados.logoUrl}" alt="EngMarq Solution" style="height: 60px;">
                    <div>
                        <h3 style="font-family: var(--font-primary); color: var(--primary-color); font-size: 20px; margin-bottom: 5px;">EngMarq Solution LTDA</h3>
                        <p style="margin: 0; color: var(--gray-color); font-size: 13px;">Engenharia de Segurança e Saúde do Trabalho</p>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid var(--primary-color);">
                        <p style="margin: 0 0 5px 0; font-size: 12px; color: var(--gray-color); text-transform: uppercase; letter-spacing: 1px;">CNPJ</p>
                        <p style="margin: 0; font-size: 16px; font-weight: 600; color: var(--dark-color);">60.545.359/0001-76</p>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid var(--primary-color);">
                        <p style="margin: 0 0 5px 0; font-size: 12px; color: var(--gray-color); text-transform: uppercase; letter-spacing: 1px;">Razão Social</p>
                        <p style="margin: 0; font-size: 16px; font-weight: 600; color: var(--dark-color);">Engmarq Solution LTDA</p>
                    </div>
                </div>
            </div>

            <div class="highlight-box">
                <p><strong><i class="fas fa-file-contract"></i> Documentação:</strong> Todos os documentos societários, certidões e comprovações de regularidade fiscal estão disponíveis mediante solicitação para processo de homologação de fornecedores.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">03</span>
            </div>
        </div>

        <!-- ====== PÁGINA 4: CONTEXTO E OBRIGAÇÃO LEGAL ====== -->
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
                <span class="page-number">04</span>
            </div>
        </div>

        <!-- ====== PÁGINA 5: O QUE SÃO FATORES DE RISCOS PSICOSSOCIAIS ====== -->
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

            <div class="info-box" style="background: linear-gradient(135deg, #f9f0ff 0%, #ede9fe 100%); border-left-color: var(--accent-color);">
                <h4 style="color: var(--accent-color);"><i class="fas fa-brain"></i> Definição Técnica</h4>
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
                <span class="page-number">05</span>
            </div>
        </div>

        <!-- ====== PÁGINA 6: IMPORTÂNCIA E BENEFÍCIOS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">4</span>
                <span class="section-title-text">Importância e Benefícios da Avaliação</span>
            </h2>

            <h3 class="subsection-title"><i class="fas fa-chart-line"></i> Cenário Atual</h3>
            <p>
                Os <strong>transtornos mentais e comportamentais</strong> figuram entre as principais causas de afastamento do trabalho no Brasil. Ansiedade, depressão, burnout e estresse ocupacional têm apresentado crescimento expressivo, impactando diretamente a produtividade das empresas e gerando passivos trabalhistas e previdenciários.
            </p>

            <div class="info-box">
                <h4><i class="fas fa-shield-alt"></i> Segurança Jurídica</h4>
                <p>A avaliação preventiva dos fatores de riscos psicossociais é a principal ferramenta para demonstrar a diligência da empresa no cumprimento das obrigações legais, protegendo a organização de autuações, processos e responsabilizações.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-star"></i> Benefícios para a Empresa</h3>
            <ul class="feature-list">
                <li><strong>Conformidade legal</strong> com a atualização da NR-01 e proteção contra autuações</li>
                <li><strong>Prevenção de passivos trabalhistas</strong> relacionados a doenças ocupacionais psíquicas</li>
                <li><strong>Redução do absenteísmo</strong> por problemas de saúde mental</li>
                <li><strong>Diminuição da rotatividade</strong> e custos com desligamentos e contratações</li>
                <li><strong>Melhoria da produtividade</strong> e engajamento dos colaboradores</li>
                <li><strong>Ambiente de trabalho saudável</strong> e melhoria do clima organizacional</li>
                <li><strong>Fortalecimento da marca empregadora</strong> e reputação institucional</li>
                <li><strong>Redução de custos</strong> com planos de saúde e afastamentos previdenciários</li>
            </ul>

            <div class="highlight-box">
                <p><strong>Investimento preventivo:</strong> A avaliação e gestão adequada dos riscos psicossociais representa um investimento na saúde organizacional, com impactos positivos na redução de custos operacionais, melhoria do clima de trabalho e proteção jurídica da empresa.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">06</span>
            </div>
        </div>

        <!-- ====== PÁGINA 7: METODOLOGIA ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">5</span>
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
                <span class="page-number">07</span>
            </div>
        </div>

        <!-- ====== PÁGINA 8: ENTREGÁVEIS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">6</span>
                <span class="section-title-text">Entregáveis e Escopo dos Serviços</span>
            </h2>

            <div class="info-box" style="margin-bottom: 15px; background: linear-gradient(135deg, #f9f0ff 0%, #ede9fe 100%); border-left-color: var(--accent-color);">
                <p style="margin: 0;"><strong><i class="fas fa-users"></i> Abrangência:</strong> Avaliação para <strong>${dados.qtdColaboradores || '—'} colaboradores</strong></p>
            </div>

            <p>Ao final do trabalho, a empresa receberá os seguintes documentos técnicos, todos elaborados em conformidade com a NR-01 e metodologias reconhecidas:</p>

            <h3 class="subsection-title"><i class="fas fa-file-pdf"></i> Documentos Técnicos (PDF)</h3>

            <div class="deliverables-grid">
                <div class="deliverable-item">
                    <div class="deliverable-icon"><i class="fas fa-file-alt"></i></div>
                    <div class="deliverable-text">
                        <h4>Relatório Técnico de Avaliação de Riscos Psicossociais</h4>
                        <p>Documento completo com diagnóstico organizacional, análise quantitativa e qualitativa, classificação por criticidade e probabilidade, mapeamento por setor/função e indicadores de risco.</p>
                    </div>
                </div>
                <div class="deliverable-item">
                    <div class="deliverable-icon"><i class="fas fa-tasks"></i></div>
                    <div class="deliverable-text">
                        <h4>Plano de Ação Preventivo e Corretivo</h4>
                        <p>Recomendações técnicas estruturadas com medidas de controle, prazos sugeridos, responsáveis indicados e priorização conforme matriz de risco.</p>
                    </div>
                </div>
                <div class="deliverable-item">
                    <div class="deliverable-icon"><i class="fas fa-clipboard-check"></i></div>
                    <div class="deliverable-text">
                        <h4>AEP – Avaliação Ergonômica Preliminar</h4>
                        <p>Análise das condições ergonômicas correlacionadas aos fatores psicossociais identificados (quando aplicável ao contexto).</p>
                    </div>
                </div>
                <div class="deliverable-item">
                    <div class="deliverable-icon"><i class="fas fa-chalkboard-teacher"></i></div>
                    <div class="deliverable-text">
                        <h4>2 Palestras de Conscientização</h4>
                        <p>Duas palestras sobre Fatores de Riscos Psicossociais no ambiente de trabalho para sensibilização dos colaboradores.</p>
                    </div>
                </div>
            </div>

            <div class="info-box" style="margin-top: 15px;">
                <h4><i class="fas fa-shield-alt"></i> Validade Legal e Técnica</h4>
                <p>Todos os documentos são assinados por profissionais habilitados, em conformidade com a NR-01 e metodologias validadas cientificamente, garantindo aceitação em fiscalizações do MTE e processos trabalhistas.</p>
            </div>

            <div class="info-box" style="margin-top: 15px; background: linear-gradient(135deg, #f9f0ff 0%, #ede9fe 100%); border-left-color: var(--accent-color);">
                <h4 style="color: var(--accent-color);"><i class="fas fa-gift"></i> Bônus Inclusos no Pacote</h4>
                <p style="margin-bottom: 8px;"><strong>• Campanha Janeiro Branco</strong> – Material de conscientização sobre saúde mental para divulgação interna</p>
                <p style="margin: 0;"><strong>• Reavaliação Trimestral</strong> – Uma reavaliação dos fatores de riscos psicossociais após 3 meses da entrega do relatório inicial</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">08</span>
            </div>
        </div>

        <!-- ====== PÁGINA 9: SERVIÇOS COMPLEMENTARES ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">7</span>
                <span class="section-title-text">Serviços Complementares Disponíveis</span>
            </h2>

            <p>Além da avaliação obrigatória, a EngMarq Solution oferece um portfólio completo de serviços para <strong>gestão contínua dos riscos psicossociais</strong> e <strong>promoção da saúde mental no trabalho</strong>:</p>

            <h3 class="subsection-title"><i class="fas fa-chart-line"></i> Gestão e Monitoramento de Riscos Psicossociais</h3>
            <ul class="feature-list" style="margin-bottom: 20px;">
                <li>Monitoramento contínuo dos riscos identificados com indicadores de acompanhamento</li>
                <li>Apoio técnico à empresa na gestão dos fatores psicossociais</li>
                <li>Recomendações preventivas e corretivas periódicas</li>
                <li>Integração com RH, CIPA, SIPAT e programas de SST</li>
                <li>Reavaliações anuais com comparativo evolutivo</li>
            </ul>

            <h3 class="subsection-title"><i class="fas fa-heart"></i> Programas de Saúde Mental no Trabalho</h3>
            <ul class="feature-list" style="margin-bottom: 20px;">
                <li>Programas contínuos de promoção da saúde mental organizacional</li>
                <li>Grupos de escuta e rodas de conversa com colaboradores</li>
                <li>Dinâmicas de clima organizacional e bem-estar</li>
                <li>Práticas de mindfulness e atenção plena no ambiente corporativo</li>
                <li>Campanhas institucionais: Janeiro Branco, Setembro Amarelo</li>
                <li>Apoio técnico a ações de prevenção ao assédio moral e sexual</li>
                <li>Suporte à criação e gestão de canal de denúncia</li>
            </ul>

            <h3 class="subsection-title"><i class="fas fa-chalkboard-teacher"></i> Treinamentos e Capacitações Psicossociais</h3>
            <ul class="feature-list" style="margin-bottom: 20px;">
                <li><strong>Sensibilização sobre Saúde Mental no Trabalho</strong> – para todos os colaboradores</li>
                <li><strong>Capacitação de Lideranças em Riscos Psicossociais</strong> – gestão de equipes saudáveis</li>
                <li><strong>Primeiros Socorros Psicológicos</strong> – apoio inicial em crises emocionais</li>
                <li><strong>Comunicação Saudável e Prevenção de Conflitos</strong> – relacionamento interpessoal</li>
                <li><strong>Ambientes Psicologicamente Seguros</strong> – preparação de equipes</li>
            </ul>

            <div class="info-box">
                <h4><i class="fas fa-info-circle"></i> Contratação Sob Demanda</h4>
                <p>Os serviços complementares acima não estão incluídos no valor desta proposta e podem ser contratados separadamente, conforme necessidade e interesse da empresa.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">09</span>
            </div>
        </div>

        <!-- ====== PÁGINA 10: INVESTIMENTO ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">8</span>
                <span class="section-title-text">Investimento</span>
            </h2>

            <div class="highlight-box" style="margin-bottom: 15px;">
                <p style="margin: 0;"><strong><i class="fas fa-users"></i> Abrangência:</strong> Serviço dimensionado para <strong>${dados.qtdColaboradores || '—'} colaboradores</strong></p>
            </div>

            <p>O valor abaixo corresponde ao investimento para execução completa dos serviços de <strong>Avaliação de Fatores de Riscos Psicossociais</strong>:</p>

            ${descontoHTML}

            <table class="investment-table">
                <thead>
                    <tr>
                        <th style="width: 50%;">Serviço</th>
                        <th style="width: 20%; text-align: center;">Nº Colaboradores</th>
                        <th style="width: 30%; text-align: right;">Valor Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="training-name"><i class="fas fa-brain" style="color: var(--purple-color);"></i> Avaliação de Fatores de Riscos Psicossociais (NR-01)</td>
                        <td style="text-align: center;">${dados.qtdColaboradores || '—'}</td>
                        <td style="text-align: right; font-weight: 600;">R$ ${formatMoeda(valorFinal)}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2"><i class="fas fa-calculator"></i> INVESTIMENTO TOTAL</td>
                        <td style="text-align: right;">R$ ${formatMoeda(valorFinal)}</td>
                    </tr>
                </tfoot>
            </table>

            <p style="font-size: 10px; color: var(--gray-color); text-align: center; margin-top: 5px;">(${valorPorExtenso(valorFinal)})</p>

            <h3 class="subsection-title"><i class="fas fa-check-circle"></i> O Que Está Incluso</h3>
            <div class="included-services" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 15px; font-size: 10px;">
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Aplicação de questionário validado cientificamente</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Análise técnica dos dados coletados</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Relatório Técnico de Avaliação de Riscos Psicossociais</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Plano de Ação com medidas preventivas</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>AEP – Avaliação Ergonômica Preliminar</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>2 Palestras de Conscientização sobre Riscos Psicossociais</span></div>
            </div>

            <h3 class="subsection-title"><i class="fas fa-credit-card"></i> Condições de Pagamento</h3>
            <div class="company-info-grid">
                <div class="company-info-item"><label>Forma de Pagamento</label><span>Transferência Bancária ou PIX</span></div>
                <div class="company-info-item"><label>Prazo</label><span>50% na aprovação | 50% na entrega</span></div>
                <div class="company-info-item"><label>Validade da Proposta</label><span>15 dias corridos</span></div>
                <div class="company-info-item"><label>Prazo de Execução</label><span>20 dias úteis após aprovação</span></div>
            </div>

            <div class="info-box" style="background: linear-gradient(135deg, #f9f0ff 0%, #ede9fe 100%); border-left-color: var(--accent-color); margin-top: 15px;">
                <h4 style="color: var(--accent-color);"><i class="fas fa-gift"></i> Bônus Inclusos no Pacote</h4>
                <p style="margin-bottom: 5px;"><strong>• Campanha Janeiro Branco</strong> – Material de conscientização sobre saúde mental</p>
                <p style="margin: 0;"><strong>• Reavaliação Trimestral</strong> – Uma reavaliação dos riscos psicossociais após 3 meses</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">10</span>
            </div>
        </div>

        <!-- ====== PÁGINA 11: CONDIÇÕES COMERCIAIS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">9</span>
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
                        <span>Suporte técnico por 60 dias após a entrega para esclarecimento de dúvidas sobre o relatório e orientações sobre o plano de ação.</span>
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
                <span class="page-number">11</span>
            </div>
        </div>

        <!-- ====== PÁGINA 12: RESPONSÁVEL PELA PROPOSTA ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">10</span>
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
                <span class="page-number">12</span>
            </div>
        </div>

        <!-- ====== PÁGINA 13: TERMO DE ACEITE E ASSINATURAS ====== -->
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
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 10px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Razão Social</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${dados.razaoSocial}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">CNPJ</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${dados.cnpj}</p>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 10px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Nome Completo</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${dados.solicitante.nome || 'A definir'}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Cargo / Função</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${dados.solicitante.cargo || 'A definir'}</p>
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
                <span class="page-number">13</span>
            </div>
        </div>

        <!-- ====== PÁGINA 14: CONTATO ====== -->
        <div class="page page-contact">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <div class="contact-content">
                <div class="contact-icon">
                    <i class="fas fa-handshake"></i>
                </div>
                <h2 class="contact-title">Fale Conosco</h2>
                <p class="contact-subtitle">
                    Estamos à disposição para dar continuidade ao processo de contratação e esclarecer eventuais dúvidas sobre a avaliação de riscos psicossociais.
                </p>

                <div class="contact-info">
                    <div class="contact-item"><i class="fab fa-whatsapp"></i><span>+55 84 99928-5888</span></div>
                    <div class="contact-item"><i class="fas fa-envelope"></i><span>engmarqsolution@gmail.com</span></div>
                    <div class="contact-item"><i class="fab fa-instagram"></i><span>@engmarq_solution</span></div>
                    <div class="contact-item"><i class="fas fa-globe"></i><span>www.engmarqsolution.com</span></div>
                </div>

                <div class="contact-signature">
                    <img src="${dados.logoUrl}" alt="EngMarq Solution" class="signature-logo">
                    <p class="signature-text">
                        <strong>EngMarq Solution</strong><br>
                        Engenharia de Segurança e Saúde do Trabalho<br>
                        <em style="color: var(--primary-color); font-style: italic; font-size: 11px;">Garantindo segurança jurídica para sua empresa.</em><br>
                        Natal - Rio Grande do Norte
                    </p>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">14</span>
            </div>
        </div>
    `;
}
