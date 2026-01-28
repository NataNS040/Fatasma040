// =====================================================
// TEMPLATE BRIGADA DE INCÊNDIO - COMPLETO
// =====================================================

import { DadosTemplate } from '../types/proposta.types';
import { formatMoeda, valorPorExtenso } from '../utils/formatters';

/**
 * Configuração específica do template de Brigada
 */
interface BrigadaConfig {
    color: string;
    headerTitle: string;
}

/**
 * Gera o template HTML completo para proposta de Brigada de Incêndio
 * @param dados - Dados do cliente/proposta
 * @param valorOriginal - Valor original sem desconto
 * @param valorFinal - Valor final após desconto
 * @param percentualDesc - Percentual de desconto aplicado
 * @param temDesconto - Se há desconto aplicado
 * @returns String HTML do template completo (10 páginas)
 */
export function getTemplateBrigada(
    dados: DadosTemplate,
    valorOriginal: number,
    valorFinal: number,
    percentualDesc: number,
    temDesconto: boolean
): string {
    const cfg: BrigadaConfig = {
        color: '#dd6b20',
        headerTitle: 'Proposta Comercial - Brigada de Incêndio'
    };
    
    const descontoHTML: string = temDesconto ? `
        <div style="background: linear-gradient(135deg, #38a169 0%, #2f855a 100%); color: #fff; padding: 15px 25px; border-radius: 10px; text-align: center; margin: 15px 0;">
            <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; opacity: 0.9;"><i class="fas fa-tag"></i> Desconto Especial Aplicado</p>
            <p style="font-size: 16px; margin: 0;"><s style="opacity: 0.7;">De R$ ${formatMoeda(valorOriginal)}</s> &nbsp;<strong style="font-size: 20px;">${percentualDesc}% OFF</strong></p>
        </div>` : '';

    return `
        <!-- CAPA -->
        <div class="page page-cover">
            <span style="position: absolute; top: 25mm; left: 0; right: 0; text-align: center; font-family: var(--font-primary); font-size: 14px; font-weight: 700; color: var(--fire-color); letter-spacing: 3px;">${dados.numero}</span>
            <img src="${dados.logoUrl}" alt="EngMarq Solution" class="cover-logo">
            <span class="cover-badge"><i class="fas fa-fire-extinguisher"></i> Treinamento Especializado</span>
            <div class="cover-icon"><i class="fas fa-fire"></i></div>
            <h1 class="cover-title">TREINAMENTO<span>BRIGADA DE INCÊNDIO</span></h1>
            <p class="cover-subtitle">Capacitação teórica e prática conforme Instrução Técnica IT 17/2025 do Corpo de Bombeiros Militar do RN (CBMRN)</p>
            <div class="cover-client">
                <p class="cover-client-label">Proposta elaborada para</p>
                <p class="cover-client-name">${dados.razaoSocial}</p>
            </div>
            <p class="cover-date"><i class="fas fa-calendar-alt"></i>&nbsp;&nbsp;${dados.data}</p>
            <div class="cover-footer"><p>EngMarq Solution | Engenharia de Segurança e Saúde do Trabalho | Natal - RN</p></div>
        </div>

        <!-- PÁGINA 2: EMPRESA CONTRATANTE -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${cfg.headerTitle}</span>
            </div>
            <h2 class="section-title"><span class="section-number">1</span><span class="section-title-text">Sobre a Empresa Contratante</span></h2>
            <h3 class="subsection-title"><i class="fas fa-building"></i> Dados da Empresa</h3>
            <div class="company-info-grid">
                <div class="company-info-item"><label>Razão Social</label><span>${dados.razaoSocial}</span></div>
                <div class="company-info-item"><label>CNPJ</label><span>${dados.cnpj || '-'}</span></div>
                <div class="company-info-item"><label>Endereço da Obra</label><span>${dados.endereco || '-'}</span></div>
                <div class="company-info-item"><label>Bairro</label><span>${dados.bairro || '-'}</span></div>
                <div class="company-info-item"><label>CEP</label><span>${dados.cep || '-'}</span></div>
                <div class="company-info-item"><label>Município / UF</label><span>${dados.cidade} - ${dados.uf}</span></div>
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
            <div class="info-box" style="margin-top: 25px;">
                <h4><i class="fas fa-fire-extinguisher"></i> Proposta Especializada</h4>
                <p>Esta proposta foi desenvolvida para atender às necessidades de capacitação da brigada de incêndio da empresa, em conformidade com a IT 17/2025 do CBMRN e com foco na segurança dos trabalhadores e segurança jurídica da empresa.</p>
            </div>
            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">02</span>
            </div>
        </div>

        <!-- PÁGINA 3: EMPRESA CONTRATADA -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${cfg.headerTitle}</span>
            </div>
            <h2 class="section-title"><span class="section-number"><i class="fas fa-building"></i></span><span class="section-title-text">Dados da Empresa Contratada</span></h2>
            <div class="fire-box" style="margin-bottom: 25px;">
                <h4><i class="fas fa-info-circle"></i> Informações para Faturamento e Contrato</h4>
                <p>Abaixo estão os dados cadastrais da EngMarq Solution para formalização contratual e emissão de documentos fiscais.</p>
            </div>
            <div style="background: var(--light-color); border-radius: 12px; padding: 30px; margin-bottom: 25px;">
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid var(--fire-color);">
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

        <!-- PÁGINA 4: APRESENTAÇÃO -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${cfg.headerTitle}</span>
            </div>
            <h2 class="section-title"><span class="section-number">2</span><span class="section-title-text">Apresentação</span></h2>
            <p>A <strong>EngMarq Solution Ltda.</strong> é uma empresa especializada em Engenharia de Segurança e Saúde do Trabalho, com atuação focada na prestação de serviços técnicos de alta qualidade para organizações que buscam conformidade legal e proteção efetiva de seus colaboradores.</p>
            <p>É com satisfação que apresentamos esta proposta para realização do <strong>Treinamento de Brigada de Incêndio</strong>, desenvolvido para capacitar os colaboradores designados como brigadistas, preparando-os para atuar com segurança e eficiência em situações de emergência envolvendo princípios de incêndio.</p>
            <div class="fire-box">
                <h4><i class="fas fa-fire-extinguisher"></i> Sobre o Treinamento</h4>
                <p>O treinamento possui <strong>carga horária total de 4 (quatro) horas</strong>, contemplando parte teórica e prática, e é elaborado em conformidade com a <strong>Instrução Técnica IT 17/2025 do Corpo de Bombeiros Militar do RN (CBMRN)</strong>.</p>
            </div>
            <div class="info-box">
                <h4><i class="fas fa-users"></i> Dimensionamento</h4>
                <p>Treinamento dimensionado para <strong>${dados.qtdColaboradores} colaboradores</strong>, conforme acordado com a empresa contratante.</p>
            </div>
            <h3 class="subsection-title"><i class="fas fa-bullseye"></i> Foco do Treinamento</h3>
            <ul class="fire-list">
                <li>Capacitação técnica para prevenção e combate inicial a incêndios</li>
                <li>Preparo prático para atuação em situações de emergência</li>
                <li>Conformidade com a legislação estadual de segurança contra incêndio</li>
                <li>Desenvolvimento de cultura de prevenção na empresa</li>
            </ul>
            <div class="info-box">
                <h4><i class="fas fa-shield-alt"></i> Compromisso com a Segurança</h4>
                <p>Nosso objetivo é garantir que os brigadistas estejam <strong>efetivamente preparados</strong> para agir de forma segura e coordenada, protegendo vidas e patrimônio até a chegada do Corpo de Bombeiros.</p>
            </div>
            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">04</span>
            </div>
        </div>

        <!-- PÁGINA 5: OBJETIVO E EMBASAMENTO -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${cfg.headerTitle}</span>
            </div>
            <h2 class="section-title"><span class="section-number">3</span><span class="section-title-text">Objetivo do Treinamento</span></h2>
            <p>O objetivo principal do treinamento é <strong>capacitar os colaboradores designados como brigadistas</strong> para atuarem de forma segura, técnica e coordenada em situações de emergência envolvendo incêndio.</p>
            <h3 class="subsection-title"><i class="fas fa-tasks"></i> Competências Desenvolvidas</h3>
            <div class="content-grid">
                <div class="content-card"><h4><i class="fas fa-shield-alt"></i> Prevenção de Incêndios</h4><p>Identificar e eliminar condições de risco que possam originar princípios de incêndio no ambiente de trabalho.</p></div>
                <div class="content-card"><h4><i class="fas fa-search"></i> Identificação de Riscos</h4><p>Reconhecer situações de perigo e avaliar cenários para tomada de decisão rápida e segura.</p></div>
                <div class="content-card"><h4><i class="fas fa-fire-extinguisher"></i> Combate Inicial</h4><p>Executar procedimentos iniciais de combate ao incêndio utilizando os equipamentos disponíveis.</p></div>
                <div class="content-card"><h4><i class="fas fa-running"></i> Abandono Seguro</h4><p>Realizar a evacuação ordenada da edificação, orientando pessoas e garantindo rotas seguras.</p></div>
            </div>
            <div class="highlight-box">
                <p><strong><i class="fas fa-info-circle"></i> Atuação Coordenada:</strong> Os brigadistas serão capacitados para agir corretamente até a chegada do Corpo de Bombeiros, mantendo a situação sob controle e minimizando danos.</p>
            </div>
            <h2 class="section-title" style="margin-top: 20px;"><span class="section-number">4</span><span class="section-title-text">Embasamento Normativo</span></h2>
            <p>O treinamento é elaborado em estrita conformidade com as normas e instruções técnicas vigentes:</p>
            <ul class="feature-list">
                <li><strong>Instrução Técnica IT 17/2025</strong> – do Corpo de Bombeiros Militar do RN (CBMRN) – Brigada de Incêndio</li>
                <li><strong>Legislação Estadual</strong> – Normas de segurança contra incêndio do Rio Grande do Norte</li>
                <li><strong>Boas Práticas</strong> – Procedimentos reconhecidos de segurança e resposta a emergências</li>
            </ul>
            <div class="info-box">
                <h4><i class="fas fa-certificate"></i> Conformidade Legal</h4>
                <p>O treinamento atende aos requisitos legais para formação de brigadistas, garantindo que a empresa esteja em conformidade com as exigências do Corpo de Bombeiros e demais órgãos fiscalizadores.</p>
            </div>
            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">05</span>
            </div>
        </div>

        <!-- PÁGINA 6: CARGA HORÁRIA E CONTEÚDO -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${cfg.headerTitle}</span>
            </div>
            <h2 class="section-title"><span class="section-number">5</span><span class="section-title-text">Carga Horária</span></h2>
            <div class="carga-total"><h3>Carga Horária Total</h3><p>4 HORAS</p></div>
            <div class="carga-horaria">
                <div class="carga-item"><i class="fas fa-chalkboard-teacher"></i><h4>Parte Teórica</h4><p>Conceitos, normas e procedimentos</p></div>
                <div class="carga-item"><i class="fas fa-fire-extinguisher"></i><h4>Parte Prática</h4><p>Simulações e uso de equipamentos</p></div>
            </div>
            <h2 class="section-title" style="margin-top: 20px;"><span class="section-number">6</span><span class="section-title-text">Conteúdo a ser Estudado</span></h2>
            <h3 class="subsection-title"><i class="fas fa-book"></i> Parte Teórica</h3>
            <div class="content-grid">
                <div class="content-card"><h4><i class="fas fa-users"></i> Brigada de Incêndio</h4><p>Introdução, funções e responsabilidades do brigadista</p></div>
                <div class="content-card"><h4><i class="fas fa-fire"></i> Ciência do Fogo</h4><p>Triângulo e tetraedro do fogo, propagação e classes de incêndio</p></div>
                <div class="content-card"><h4><i class="fas fa-exclamation-triangle"></i> Prevenção</h4><p>Métodos preventivos e riscos no ambiente de trabalho</p></div>
                <div class="content-card"><h4><i class="fas fa-tools"></i> Equipamentos</h4><p>Tipos de extintores, hidrantes e equipamentos de combate</p></div>
                <div class="content-card"><h4><i class="fas fa-clipboard-list"></i> Procedimentos</h4><p>Ações de emergência e técnicas de abandono de área</p></div>
                <div class="content-card"><h4><i class="fas fa-first-aid"></i> Primeiros Socorros</h4><p>Noções básicas conforme IT do CBM/RN</p></div>
            </div>
            <h3 class="subsection-title"><i class="fas fa-fire-extinguisher"></i> Parte Prática</h3>
            <ul class="fire-list">
                <li>Reconhecimento dos equipamentos de combate a incêndio disponíveis</li>
                <li>Técnicas corretas de manuseio e uso de extintores</li>
                <li>Simulação prática de combate a princípio de incêndio</li>
                <li>Orientações de postura, aproximação e segurança do brigadista</li>
                <li>Treinamento supervisionado por instrutor habilitado</li>
            </ul>
            <div class="highlight-box" style="margin-top: 15px;">
                <p><strong><i class="fas fa-info-circle"></i> Nota:</strong> Os conteúdos apresentados acima são descritos de forma macro. O detalhamento, desenvolvimento e aplicação integral do treinamento seguirão rigorosamente o disposto na <strong>Instrução Técnica IT 17/2025 do Corpo de Bombeiros Militar do Rio Grande do Norte (CBMRN)</strong>.</p>
            </div>
            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">06</span>
            </div>
        </div>

        <!-- PÁGINA 7: ENTREGÁVEIS -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${cfg.headerTitle}</span>
            </div>
            <h2 class="section-title"><span class="section-number">7</span><span class="section-title-text">Entregáveis</span></h2>
            <p>Ao final do treinamento, a empresa receberá os seguintes itens e documentos:</p>
            <div class="deliverables-grid">
                <div class="deliverable-item"><div class="deliverable-icon"><i class="fas fa-chalkboard-teacher"></i></div><div class="deliverable-text"><h4>Treinamento Completo</h4><p>Capacitação teórica e prática conforme IT 17/2025 CBMRN com 4 horas de duração.</p></div></div>
                <div class="deliverable-item"><div class="deliverable-icon"><i class="fas fa-user-tie"></i></div><div class="deliverable-text"><h4>Instrutor Qualificado</h4><p>Profissional habilitado e experiente em treinamentos de brigada.</p></div></div>
                <div class="deliverable-item"><div class="deliverable-icon"><i class="fas fa-desktop"></i></div><div class="deliverable-text"><h4>Material Didático Expositivo</h4><p>Conteúdo expositivo aplicado durante o treinamento (não físico).</p></div></div>
                <div class="deliverable-item"><div class="deliverable-icon"><i class="fas fa-clipboard-list"></i></div><div class="deliverable-text"><h4>Lista de Presença</h4><p>Registro oficial dos participantes para controle e documentação.</p></div></div>
                <div class="deliverable-item"><div class="deliverable-icon"><i class="fas fa-certificate"></i></div><div class="deliverable-text"><h4>Certificados Digitais</h4><p>Certificados disponibilizados em formato digital. A impressão fica a critério da empresa contratante.</p></div></div>
                <div class="deliverable-item"><div class="deliverable-icon"><i class="fas fa-folder-open"></i></div><div class="deliverable-text"><h4>Registro da Capacitação</h4><p>Documentação completa para auditorias e fiscalizações.</p></div></div>
            </div>
            <div class="alert-box" style="margin-top: 20px;">
                <h4><i class="fas fa-exclamation-triangle"></i> Nota Importante – Atividade Prática</h4>
                <p style="margin-bottom: 8px;">A <strong>empresa contratante</strong> será responsável por disponibilizar os materiais necessários à realização da parte prática do treinamento:</p>
                <ul style="margin: 8px 0 0 20px; font-size: 10px;">
                    <li>Extintores de incêndio para uso no treinamento</li>
                    <li>Materiais para geração controlada do fogo (simulação)</li>
                    <li>Área externa segura e adequada para execução das práticas</li>
                </ul>
            </div>
            <div class="info-box">
                <h4><i class="fas fa-info-circle"></i> Observação</h4>
                <p>Caso a empresa não disponha dos materiais necessários, a EngMarq Solution pode auxiliar na orientação para aquisição ou locação dos itens para a prática.</p>
            </div>
            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">07</span>
            </div>
        </div>

        <!-- PÁGINA 8: INVESTIMENTO -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${cfg.headerTitle}</span>
            </div>
            <h2 class="section-title"><span class="section-number">8</span><span class="section-title-text">Investimento</span></h2>
            
            <div class="highlight-box" style="margin-bottom: 15px;">
                <p style="margin: 0;"><strong><i class="fas fa-users"></i> Abrangência:</strong> Treinamento dimensionado para <strong>${dados.qtdColaboradores} colaboradores</strong></p>
            </div>

            <p>O valor abaixo corresponde ao investimento para realização do <strong>Treinamento de Brigada de Incêndio</strong> completo:</p>
            
            ${descontoHTML}
            
            <table class="investment-table">
                <thead>
                    <tr>
                        <th style="width: 35%;">Treinamento</th>
                        <th style="width: 15%; text-align: center;">Carga Horária</th>
                        <th style="width: 20%; text-align: center;">Nº Colaboradores</th>
                        <th style="width: 30%; text-align: right;">Valor Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="training-name"><i class="fas fa-fire" style="color: var(--fire-color);"></i> Brigada de Incêndio (IT 17/2025)</td>
                        <td style="text-align: center;">04h</td>
                        <td style="text-align: center;">${dados.qtdColaboradores}</td>
                        <td style="text-align: right; font-weight: 600;">R$ ${formatMoeda(valorFinal)}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3"><i class="fas fa-calculator"></i> INVESTIMENTO TOTAL</td>
                        <td style="text-align: right;">R$ ${formatMoeda(valorFinal)}</td>
                    </tr>
                </tfoot>
            </table>

            <p style="font-size: 10px; color: var(--gray-color); text-align: center; margin-top: 5px;">(${valorPorExtenso(valorFinal)})</p>

            <h3 class="subsection-title"><i class="fas fa-check-circle"></i> O Que Está Incluso</h3>
            <div class="included-services" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 15px; font-size: 10px;">
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Treinamento teórico completo (conceitos, normas, procedimentos)</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Treinamento prático supervisionado</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Instrutor qualificado e habilitado</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Material didático expositivo (não físico)</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Lista de presença dos participantes</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Certificados digitais de participação</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Documentação para auditorias e fiscalizações</span></div>
            </div>

            <h3 class="subsection-title"><i class="fas fa-credit-card"></i> Condições de Pagamento</h3>
            <div class="company-info-grid">
                <div class="company-info-item"><label>Forma de Pagamento</label><span>Transferência Bancária ou PIX</span></div>
                <div class="company-info-item"><label>Prazo</label><span>50% no fechamento | 50% após conclusão</span></div>
                <div class="company-info-item"><label>Validade da Proposta</label><span>15 dias corridos</span></div>
                <div class="company-info-item"><label>Data do Treinamento</label><span>A combinar conforme disponibilidade</span></div>
            </div>

            <div class="info-box" style="margin-top: 15px;">
                <p style="margin: 0; font-size: 10px;"><strong><i class="fas fa-info-circle"></i> Observação:</strong> Os valores apresentados contemplam todos os custos de execução, incluindo deslocamento, material didático e certificação. Não há custos adicionais.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">08</span>
            </div>
        </div>

        <!-- PÁGINA 9: DIFERENCIAIS E ENCERRAMENTO -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${cfg.headerTitle}</span>
            </div>
            <h2 class="section-title"><span class="section-number">9</span><span class="section-title-text">Diferenciais da EngMarq Solution</span></h2>
            <div class="diferenciais-grid">
                <div class="diferencial-item"><i class="fas fa-hard-hat"></i><h4>Atuação Técnica e Responsável</h4><p>Profissionais qualificados com experiência em SST e treinamentos de emergência.</p></div>
                <div class="diferencial-item"><i class="fas fa-balance-scale"></i><h4>Conformidade Legal</h4><p>Treinamento em total conformidade com a IT 17/2025 do CBMRN e legislação vigente.</p></div>
                <div class="diferencial-item"><i class="fas fa-bullseye"></i><h4>Foco no Preparo Real</h4><p>Capacitação prática e efetiva, não apenas documental ou formal.</p></div>
                <div class="diferencial-item"><i class="fas fa-shield-alt"></i><h4>Compromisso com a Segurança</h4><p>Dedicação à proteção das pessoas e do patrimônio da empresa.</p></div>
            </div>
            <h2 class="section-title" style="margin-top: 25px;"><span class="section-number">10</span><span class="section-title-text">Próximos Passos</span></h2>
            <p>Estamos à disposição para dar continuidade à contratação do treinamento. Os próximos passos incluem:</p>
            <ul class="feature-list">
                <li><strong>Alinhamento de datas e horários</strong> – Definição da melhor data para realização do treinamento</li>
                <li><strong>Adequação à realidade da empresa</strong> – Ajustes no conteúdo conforme necessidades específicas</li>
                <li><strong>Formalização da contratação</strong> – Envio de contrato e condições comerciais</li>
            </ul>
            <div class="fire-box" style="margin-top: 20px;">
                <h4><i class="fas fa-fire-extinguisher"></i> Preparação Salva Vidas</h4>
                <p>Investir no treinamento da brigada de incêndio é investir na <strong>segurança das pessoas</strong> e na <strong>proteção do patrimônio</strong>. Uma equipe bem preparada pode fazer a diferença em situações de emergência.</p>
            </div>
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
            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">09</span>
            </div>
        </div>

        <!-- PÁGINA 10: TERMO DE ACEITE E ASSINATURAS -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${cfg.headerTitle}</span>
            </div>
            <h2 class="section-title"><span class="section-number"><i class="fas fa-file-signature"></i></span><span class="section-title-text">Termo de Aceite da Proposta</span></h2>
            <div class="info-box" style="margin-bottom: 20px;">
                <h4><i class="fas fa-check-circle"></i> Declaração de Aceite</h4>
                <p>Ao assinar este documento, as partes declaram estar de acordo com todos os termos, condições, valores e prazos descritos nesta proposta comercial, formalizando a contratação dos serviços especificados.</p>
            </div>
            <div style="background: var(--light-color); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h3 style="font-family: var(--font-primary); color: var(--primary-color); font-size: 16px; margin-bottom: 15px; text-align: center; border-bottom: 2px solid var(--fire-color); padding-bottom: 10px;">
                    <i class="fas fa-building" style="color: var(--fire-color);"></i> RESPONSÁVEL PELA ELABORAÇÃO DA PROPOSTA
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
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${dados.cnpj || '-'}</p>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 10px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Nome Completo</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${dados.solicitante.nome || '-'}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Cargo / Função</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${dados.solicitante.cargo || '-'}</p>
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
                <span class="page-number">10</span>
            </div>
        </div>

        <!-- PÁGINA 11: CONTATO -->
        <div class="page page-contact">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${cfg.headerTitle}</span>
            </div>
            <div class="contact-content">
                <div class="contact-icon"><i class="fas fa-handshake"></i></div>
                <h2 class="contact-title">Fale Conosco</h2>
                <p class="contact-subtitle">Estamos à disposição para dar continuidade ao processo de contratação e esclarecer eventuais dúvidas sobre o treinamento.</p>
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
                <span class="page-number">11</span>
            </div>
        </div>
    `;
}

