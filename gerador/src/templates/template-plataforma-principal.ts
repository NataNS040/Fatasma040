// =====================================================
// TEMPLATE PLATAFORMA PRINCIPAL E SECUNDÁRIA - COMPLETO
// =====================================================

import { DadosTemplate } from '../types/proposta.types';
import { formatMoeda } from '../utils/formatters';

/**
 * Gera o template HTML completo para proposta de Plataforma Principal e Secundária
 * @param dados - Dados do cliente/proposta
 * @param valorOriginal - Valor original sem desconto
 * @param valorFinal - Valor final após desconto
 * @param perc - Percentual de desconto aplicado
 * @param temDesconto - Se há desconto aplicado
 * @returns String HTML do template completo (9 páginas)
 */
export function getTemplatePlataformaPrincipal(
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
                <i class="fas fa-hard-hat"></i>
                Projeto Técnico – EPC
            </span>

            <div class="cover-icon">
                <i class="fas fa-layer-group"></i>
            </div>
            
            <h1 class="cover-title">
                ELABORAÇÃO DE PROJETO
                <span>PLATAFORMA PRINCIPAL E SECUNDÁRIA</span>
            </h1>
            <p class="cover-subtitle">
                Equipamento de Proteção Coletiva (EPC) conforme NR 18 – Condições e Meio Ambiente de Trabalho na Indústria da Construção
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
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
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
                    <label>Endereço da Obra</label>
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

            <div class="info-box" style="margin-top: 25px;">
                <h4><i class="fas fa-hard-hat"></i> Proposta Especializada</h4>
                <p>Esta proposta foi desenvolvida para atender às necessidades de elaboração do Projeto Técnico de Plataforma Principal e Secundária, em conformidade com a NR 18 e com foco na segurança dos trabalhadores e segurança jurídica da empresa.</p>
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
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number"><i class="fas fa-building"></i></span>
                <span class="section-title-text">Dados da Empresa Contratada</span>
            </h2>

            <div class="construction-box" style="margin-bottom: 25px;">
                <h4><i class="fas fa-info-circle"></i> Informações para Faturamento e Contrato</h4>
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

        <!-- ====== PÁGINA 4: APRESENTAÇÃO ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">2</span>
                <span class="section-title-text">Apresentação</span>
            </h2>

            <p>A <strong>EngMarq Solution Ltda.</strong> é uma empresa especializada em Engenharia de Segurança e Saúde do Trabalho, com atuação técnica focada em soluções de engenharia para a indústria da construção civil. Oferecemos serviços de alta qualidade técnica, com compromisso com a conformidade normativa e a proteção efetiva dos trabalhadores.</p>

            <p>É com satisfação que apresentamos esta proposta para a <strong>elaboração do Projeto Técnico de Plataforma Principal e Secundária</strong>, equipamento de proteção coletiva (EPC) essencial para obras verticais, conforme exigências da <strong>NR 18 – Condições e Meio Ambiente de Trabalho na Indústria da Construção</strong>.</p>

            <div class="construction-box">
                <h4><i class="fas fa-hard-hat"></i> Plataforma Principal e Secundária de Proteção</h4>
                <p>A Plataforma Principal e Secundária é um <strong>equipamento de proteção coletiva (EPC)</strong> instalado em obras de edificações verticais, com a função de aparar e reter materiais e ferramentas que possam cair durante a execução dos serviços, protegendo trabalhadores e terceiros que circulam nos pavimentos inferiores e no entorno da obra.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-shield-alt"></i> Importância do Projeto</h3>

            <p>A elaboração do projeto técnico por profissional habilitado é requisito fundamental para garantir:</p>

            <ul class="feature-list">
                <li><strong>Segurança dos trabalhadores</strong> – Proteção efetiva contra quedas de materiais</li>
                <li><strong>Conformidade legal</strong> – Atendimento integral às exigências da NR 18</li>
                <li><strong>Segurança jurídica</strong> – Documentação técnica adequada para fiscalizações</li>
                <li><strong>Responsabilidade técnica</strong> – Projeto com ART registrada junto ao CREA</li>
            </ul>

            <div class="info-box">
                <h4><i class="fas fa-balance-scale"></i> Conformidade e Segurança Jurídica</h4>
                <p>A existência de projeto técnico elaborado por profissional habilitado, com ART devidamente registrada, é condição essencial para demonstrar o cumprimento das obrigações legais perante órgãos fiscalizadores, evitando <strong>autuações, interdições e responsabilizações</strong> em caso de acidentes.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">04</span>
            </div>
        </div>

        <!-- ====== PÁGINA 5: OBJETIVO E EMBASAMENTO ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">3</span>
                <span class="section-title-text">Objetivo do Projeto</span>
            </h2>

            <p>O objetivo desta proposta é a <strong>elaboração do Projeto Técnico da Plataforma Principal e Secundária</strong>, dimensionado conforme as características específicas da edificação e da obra, garantindo a proteção coletiva dos trabalhadores e o atendimento às normas de segurança vigentes.</p>

            <h3 class="subsection-title"><i class="fas fa-bullseye"></i> O Projeto Garantirá</h3>

            <div class="content-grid">
                <div class="content-card">
                    <h4><i class="fas fa-users-cog"></i> Proteção Coletiva</h4>
                    <p>Sistema eficaz de proteção contra quedas de pessoas, materiais e ferramentas durante a obra.</p>
                </div>
                <div class="content-card">
                    <h4><i class="fas fa-clipboard-check"></i> Atendimento à NR 18</h4>
                    <p>Conformidade integral com as exigências normativas para plataformas de proteção.</p>
                </div>
                <div class="content-card">
                    <h4><i class="fas fa-file-contract"></i> Base Técnica Segura</h4>
                    <p>Documentação completa para instalação correta e para apresentação em fiscalizações.</p>
                </div>
                <div class="content-card">
                    <h4><i class="fas fa-exclamation-triangle"></i> Redução de Riscos</h4>
                    <p>Minimização de riscos de acidentes, autuações trabalhistas e interdições da obra.</p>
                </div>
            </div>

            <h2 class="section-title" style="margin-top: 20px;">
                <span class="section-number">4</span>
                <span class="section-title-text">Embasamento Legal e Normativo</span>
            </h2>

            <p>O projeto será elaborado com base nas seguintes normas e referências técnicas:</p>

            <div class="nr-box">
                <div class="nr-box-icon">
                    <i class="fas fa-gavel"></i>
                </div>
                <div class="nr-box-content">
                    <h4>NR 18 – Condições e Meio Ambiente de Trabalho na Indústria da Construção</h4>
                    <p>Norma regulamentadora do Ministério do Trabalho que estabelece diretrizes de segurança para a indústria da construção, incluindo requisitos para plataformas de proteção.</p>
                </div>
            </div>

            <ul class="build-list">
                <li><strong>Normas técnicas aplicáveis</strong> ao dimensionamento estrutural de plataformas</li>
                <li><strong>Boas práticas de engenharia</strong> e segurança do trabalho na construção civil</li>
                <li><strong>Legislação profissional CREA/CONFEA</strong> – Responsabilidade técnica do profissional</li>
                <li><strong>Normas de segurança</strong> para proteção contra quedas de materiais</li>
            </ul>

            <div class="highlight-box">
                <p><strong><i class="fas fa-info-circle"></i> Nota:</strong> O projeto será desenvolvido considerando as características específicas da edificação (altura, dimensões, tipo de estrutura) para garantir eficácia técnica e conformidade normativa.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">05</span>
            </div>
        </div>

        <!-- ====== PÁGINA 6: RESPONSABILIDADE TÉCNICA E ENTREGÁVEIS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">5</span>
                <span class="section-title-text">Responsabilidade Técnica</span>
            </h2>

            <p>O projeto técnico será elaborado por <strong>profissional legalmente habilitado</strong>, com registro ativo no Conselho Regional de Engenharia e Agronomia (CREA), assumindo integralmente a responsabilidade técnica pelo dimensionamento e concepção do projeto.</p>

            <div class="art-box">
                <h4><i class="fas fa-certificate"></i> Emissão de ART – Anotação de Responsabilidade Técnica</h4>
                <p>Será emitida <strong>ART junto ao CREA</strong>, vinculada exclusivamente ao projeto da Plataforma Principal e Secundária, formalizando a responsabilidade técnica do profissional pelo trabalho executado.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-user-tie"></i> O Profissional Responsável</h3>

            <ul class="feature-list">
                <li>Possui habilitação legal para elaboração de projetos de segurança na construção</li>
                <li>Assume responsabilidade técnica integral pelo dimensionamento</li>
                <li>Garante a conformidade do projeto com as normas vigentes</li>
                <li>Responde tecnicamente perante os órgãos de fiscalização</li>
            </ul>

            <div class="info-box">
                <h4><i class="fas fa-shield-alt"></i> Garantia de Qualidade Técnica</h4>
                <p>A elaboração do projeto por profissional habilitado, com emissão de ART, é a garantia de que o trabalho foi desenvolvido com <strong>critério técnico, responsabilidade profissional e conformidade normativa</strong>.</p>
            </div>

            <h2 class="section-title" style="margin-top: 25px;">
                <span class="section-number">6</span>
                <span class="section-title-text">Escopo do Projeto – Entregáveis</span>
            </h2>

            <p>A EngMarq Solution entregará os seguintes documentos técnicos:</p>

            <div class="deliverables-list">
                <div class="deliverable-section">
                    <div class="deliverable-header">
                        <i class="fas fa-drafting-compass"></i>
                        <h4>1. Projeto Técnico da Plataforma Principal e Secundária</h4>
                    </div>
                    <div class="deliverable-content">
                        <ul>
                            <li>Plantas e detalhamentos técnicos completos</li>
                            <li>Representação gráfica da plataforma e seus componentes</li>
                            <li>Indicação dos pontos de fixação na estrutura</li>
                            <li>Dimensões e especificações construtivas</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">06</span>
            </div>
        </div>

        <!-- ====== PÁGINA 7: ENTREGÁVEIS (CONTINUAÇÃO) ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">6</span>
                <span class="section-title-text">Escopo do Projeto – Entregáveis (Continuação)</span>
            </h2>

            <div class="deliverables-list">
                <div class="deliverable-section">
                    <div class="deliverable-header">
                        <i class="fas fa-file-alt"></i>
                        <h4>2. Memorial Descritivo</h4>
                    </div>
                    <div class="deliverable-content">
                        <ul>
                            <li>Descrição completa da Plataforma Principal e Secundária projetada</li>
                            <li>Especificação dos materiais a serem utilizados</li>
                            <li>Características técnicas do sistema de proteção</li>
                            <li>Condições de uso e limitações do equipamento</li>
                        </ul>
                    </div>
                </div>

                <div class="deliverable-section">
                    <div class="deliverable-header">
                        <i class="fas fa-calculator"></i>
                        <h4>3. Memória de Cálculo</h4>
                    </div>
                    <div class="deliverable-content">
                        <ul>
                            <li>Critérios técnicos adotados para o dimensionamento</li>
                            <li>Cargas consideradas no cálculo estrutural</li>
                            <li>Metodologia de cálculo aplicada</li>
                            <li>Demonstração da resistência e estabilidade estrutural</li>
                        </ul>
                    </div>
                </div>

                <div class="deliverable-section">
                    <div class="deliverable-header">
                        <i class="fas fa-tools"></i>
                        <h4>4. Orientações para Instalação</h4>
                    </div>
                    <div class="deliverable-content">
                        <ul>
                            <li>Informações técnicas para correta instalação da plataforma</li>
                            <li>Premissas de segurança a serem observadas</li>
                            <li>Diretrizes para montagem conforme projeto</li>
                            <li>Recomendações para verificação após instalação</li>
                        </ul>
                    </div>
                </div>

                <div class="deliverable-section">
                    <div class="deliverable-header">
                        <i class="fas fa-stamp"></i>
                        <h4>5. Emissão de ART</h4>
                    </div>
                    <div class="deliverable-content">
                        <ul>
                            <li>ART registrada junto ao CREA</li>
                            <li>Vinculada exclusivamente ao projeto da Plataforma Principal e Secundária</li>
                            <li>Formalização da responsabilidade técnica do profissional</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">07</span>
            </div>
        </div>

        <!-- ====== PÁGINA 8: OBSERVAÇÃO IMPORTANTE E BENEFÍCIOS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">7</span>
                <span class="section-title-text">Observação Importante</span>
            </h2>

            <div class="alert-box" style="margin-bottom: 15px;">
                <h4><i class="fas fa-exclamation-triangle"></i> Responsabilidade de Execução</h4>
                <p style="margin-bottom: 8px;">Esta proposta refere-se <strong>exclusivamente à elaboração do projeto técnico</strong> da Plataforma Principal e Secundária.</p>
                <p style="margin-bottom: 8px;">A <strong>execução, montagem e instalação</strong> da plataforma são de <strong>responsabilidade da empresa executora</strong> da obra.</p>
                <p>A empresa executora deverá respeitar integralmente as <strong>orientações técnicas contidas no projeto</strong> para garantir a segurança e eficácia do sistema de proteção.</p>
            </div>

            <div class="highlight-box">
                <p><strong><i class="fas fa-info-circle"></i> Recomendação:</strong> A instalação da plataforma deve ser executada por profissionais capacitados, com supervisão técnica adequada, seguindo rigorosamente as especificações do projeto.</p>
            </div>

            <h2 class="section-title" style="margin-top: 25px;">
                <span class="section-number">8</span>
                <span class="section-title-text">Benefícios para a Empresa Contratante</span>
            </h2>

            <p>A contratação do projeto técnico de Plataforma Principal e Secundária oferece benefícios significativos para a empresa:</p>

            <div class="benefits-grid">
                <div class="benefit-item">
                    <i class="fas fa-clipboard-check"></i>
                    <h4>Conformidade com NR 18</h4>
                    <p>Atendimento integral às exigências normativas de segurança na construção.</p>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-user-shield"></i>
                    <h4>Proteção dos Trabalhadores</h4>
                    <p>Sistema projetado para proteção efetiva contra quedas de materiais.</p>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-balance-scale"></i>
                    <h4>Segurança Jurídica</h4>
                    <p>Documentação técnica adequada para fiscalizações e auditorias.</p>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-exclamation-circle"></i>
                    <h4>Redução de Riscos</h4>
                    <p>Minimização de riscos de acidentes graves e fatais na obra.</p>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-ban"></i>
                    <h4>Prevenção de Autuações</h4>
                    <p>Evita multas, interdições e responsabilizações por descumprimento.</p>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-cogs"></i>
                    <h4>Base Técnica Sólida</h4>
                    <p>Projeto dimensionado para execução segura e eficiente.</p>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">08</span>
            </div>
        </div>

        <!-- ====== PÁGINA 9: VALOR E DIFERENCIAIS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">9</span>
                <span class="section-title-text">Valor da Proposta</span>
            </h2>

            <p>O valor para elaboração do Projeto Técnico de Plataforma Principal e Secundária está apresentado abaixo:</p>

            ${descontoHTML}

            <table class="investment-table">
                <thead>
                    <tr>
                        <th style="width: 60%;">Serviço</th>
                        <th style="width: 20%;">Unidade</th>
                        <th style="width: 20%;">Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="training-name">
                                <i class="fas fa-layer-group" style="color: var(--accent-color);"></i>
                                Projeto Técnico de Plataforma Principal e Secundária
                            </div>
                            <div style="font-size: 9px; color: var(--gray-color); margin-top: 4px;">
                                Projeto completo conforme NR 18, incluindo memorial descritivo, memória de cálculo, orientações para instalação e ART
                            </div>
                        </td>
                        <td style="text-align: center;">1 Projeto</td>
                        <td style="text-align: center; font-weight: 600;">R$ ${formatMoeda(valorFinal)}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2" style="text-align: right;">VALOR TOTAL</td>
                        <td style="text-align: center;">R$ ${formatMoeda(valorFinal)}</td>
                    </tr>
                </tfoot>
            </table>

            <h3 class="subsection-title"><i class="fas fa-check-circle"></i> O Que Está Incluso</h3>
            <div class="included-services" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 15px; font-size: 10px;">
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Projeto técnico completo da plataforma</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Memorial descritivo detalhado</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Memória de cálculo estrutural</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Orientações para instalação</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>ART registrada junto ao CREA</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Suporte técnico para dúvidas</span></div>
            </div>

            <h3 class="subsection-title"><i class="fas fa-credit-card"></i> Condições de Pagamento</h3>
            <div class="company-info-grid">
                <div class="company-info-item"><label>Forma de Pagamento</label><span>Transferência Bancária ou PIX</span></div>
                <div class="company-info-item"><label>Prazo</label><span>50% no fechamento | 50% na entrega</span></div>
                <div class="company-info-item"><label>Validade da Proposta</label><span>15 dias corridos</span></div>
                <div class="company-info-item"><label>Prazo de Entrega</label><span>A combinar conforme complexidade</span></div>
            </div>

            <div class="info-box" style="margin-top: 15px;">
                <p style="margin: 0; font-size: 10px;"><strong><i class="fas fa-info-circle"></i> Observação:</strong> Os valores apresentados contemplam todos os custos de elaboração do projeto. A execução e instalação da plataforma são de responsabilidade da empresa executora da obra.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">09</span>
            </div>
        </div>

        <!-- ====== PÁGINA 10: DIFERENCIAIS E PRÓXIMOS PASSOS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">10</span>
                <span class="section-title-text">Diferenciais da EngMarq Solution</span>
            </h2>

            <div class="diferenciais-grid" style="gap: 8px; margin: 10px 0;">
                <div class="diferencial-item" style="padding: 10px;">
                    <i class="fas fa-hard-hat" style="font-size: 18px; margin-bottom: 5px;"></i>
                    <h4>Especialização em SST</h4>
                    <p>Atuação focada em Engenharia de Segurança e Saúde do Trabalho.</p>
                </div>
                <div class="diferencial-item" style="padding: 10px;">
                    <i class="fas fa-clipboard-check" style="font-size: 18px; margin-bottom: 5px;"></i>
                    <h4>Conformidade Normativa</h4>
                    <p>Projetos elaborados com foco no atendimento às normas vigentes.</p>
                </div>
                <div class="diferencial-item" style="padding: 10px;">
                    <i class="fas fa-tools" style="font-size: 18px; margin-bottom: 5px;"></i>
                    <h4>Aplicabilidade Prática</h4>
                    <p>Soluções técnicas viáveis e adequadas à realidade da obra.</p>
                </div>
                <div class="diferencial-item" style="padding: 10px;">
                    <i class="fas fa-certificate" style="font-size: 18px; margin-bottom: 5px;"></i>
                    <h4>Responsabilidade Técnica</h4>
                    <p>Compromisso com a qualidade e responsabilidade legal do trabalho.</p>
                </div>
            </div>

            <h2 class="section-title" style="margin-top: 20px;">
                <span class="section-number">11</span>
                <span class="section-title-text">Próximos Passos</span>
            </h2>

            <p>Estamos à disposição para dar continuidade à contratação do projeto. Os próximos passos incluem:</p>

            <ul class="feature-list">
                <li><strong>Alinhamento das informações da obra</strong> – Dados da edificação, plantas, altura, tipo de estrutura</li>
                <li><strong>Definição de prazos de entrega</strong> – Cronograma para elaboração e entrega do projeto</li>
                <li><strong>Formalização da contratação</strong> – Envio de contrato e condições comerciais</li>
            </ul>

            <div class="construction-box" style="margin-top: 20px;">
                <h4><i class="fas fa-hard-hat"></i> Projeto Técnico de Qualidade</h4>
                <p>Investir em um projeto técnico elaborado por profissional habilitado é investir na <strong>segurança dos trabalhadores</strong> e na <strong>proteção jurídica da empresa</strong>. Um projeto bem elaborado faz a diferença na execução segura da obra.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">10</span>
            </div>
        </div>

        <!-- ====== PÁGINA 11: RESPONSÁVEL PELA PROPOSTA ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number"><i class="fas fa-user-tie"></i></span>
                <span class="section-title-text">Responsável pela Proposta</span>
            </h2>

            <p>Esta proposta foi elaborada pela equipe técnica da EngMarq Solution, sob responsabilidade do profissional abaixo identificado.</p>

            <div class="responsible-card">
                <div class="responsible-avatar"><i class="fas fa-user-tie"></i></div>
                <p class="responsible-name">${dados.elaborador.nome}</p>
                <p class="responsible-role">${dados.elaborador.cargo}</p>
                <p class="responsible-company">EngMarq Solution Ltda.</p>
                <div class="responsible-contacts">
                    <div class="responsible-contact-item"><i class="fas fa-envelope"></i><span>${dados.elaborador.email}</span></div>
                    <div class="responsible-contact-item"><i class="fab fa-whatsapp"></i><span>${dados.elaborador.telefone}</span></div>
                    <div class="responsible-contact-item"><i class="fab fa-instagram"></i><span>${dados.elaborador.instagram}</span></div>
                </div>
            </div>

            <div class="construction-box" style="margin-top: 25px;">
                <h4><i class="fas fa-headset"></i> Atendimento Personalizado</h4>
                <p>Estamos à disposição para esclarecer dúvidas, agendar reuniões e apresentar mais detalhes sobre nossa metodologia de trabalho. Entre em contato conosco!</p>
            </div>

            <div class="info-box">
                <h4><i class="fas fa-clock"></i> Horário de Atendimento</h4>
                <p>Segunda a Sexta: 08h às 18h | Sábado: 08h às 12h</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">11</span>
            </div>
        </div>

        <!-- ====== PÁGINA 12: TERMO DE ACEITE E ASSINATURAS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
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
                <h3 style="font-family: var(--font-primary); color: var(--primary-color); font-size: 16px; margin-bottom: 15px; text-align: center; border-bottom: 2px solid var(--accent-color); padding-bottom: 10px;">
                    <i class="fas fa-building" style="color: var(--accent-color);"></i> RESPONSÁVEL PELA ELABORAÇÃO DA PROPOSTA
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
                <span class="page-number">12</span>
            </div>
        </div>

        <!-- ====== PÁGINA 13: CONTATO ====== -->
        <div class="page page-contact">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
            </div>

            <div class="contact-content">
                <div class="contact-icon">
                    <i class="fas fa-handshake"></i>
                </div>
                <h2 class="contact-title">Fale Conosco</h2>
                <p class="contact-subtitle">
                    Estamos à disposição para dar continuidade ao processo de contratação e esclarecer eventuais dúvidas sobre o projeto.
                </p>

                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fab fa-whatsapp"></i>
                        <span>+55 84 99928-5888</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>engmarqsolution@gmail.com</span>
                    </div>
                    <div class="contact-item">
                        <i class="fab fa-instagram"></i>
                        <span>@engmarq_solution</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-globe"></i>
                        <span>www.engmarqsolution.com</span>
                    </div>
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
                <span class="page-number">13</span>
            </div>
        </div>
    `;
}
