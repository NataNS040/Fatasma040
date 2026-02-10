// =====================================================
// TEMPLATE KIT INTEGRADO SST (PGR + PCMSO + LTCAT)
// =====================================================

import { DadosTemplate } from '../types/proposta.types';
import { formatMoeda } from '../utils/formatters';

/**
 * Gera o template HTML completo para proposta de Kit Integrado SST
 */
export function getTemplateKitSST(
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
                <i class="fas fa-shield-alt"></i>
                Conformidade Legal NR-01 | NR-07 | IN 128
            </span>

            <div class="cover-icon">
                <i class="fas fa-file-medical-alt"></i>
            </div>

            <h1 class="cover-title">
                Proposta Comercial<br>
                <span>Kit Integrado de Programas de SST</span>
            </h1>
            <p class="cover-subtitle">
                PGR + LTCAT + PCMSO integrados para conformidade legal, prevenção de passivos trabalhistas e previdenciários
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
                <span class="page-header-title">Proposta Comercial - Kit Integrado SST</span>
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
                    <span>${dados.endereco}${dados.bairro ? ' - ' + dados.bairro : ''}</span>
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
            <h3 class="subsection-title" style="margin-top: 25px;"><i class="fas fa-user-tie"></i> Responsável pelo Recebimento da Proposta</h3>
            <div class="company-info-grid">
                <div class="company-info-item"><label>Nome do Responsável</label><span>${dados.solicitante.nome}</span></div>
                <div class="company-info-item"><label>Cargo / Função</label><span>${dados.solicitante.cargo || 'A definir'}</span></div>
                <div class="company-info-item"><label>Telefone / WhatsApp</label><span>${dados.solicitante.telefone || 'A definir'}</span></div>
                <div class="company-info-item"><label>E-mail</label><span>${dados.solicitante.email || 'A definir'}</span></div>
            </div>
            ` : ''}

            <div class="info-box" style="margin-top: 25px;">
                <h4><i class="fas fa-handshake"></i> Proposta Integrada</h4>
                <p>Esta proposta contempla a elaboração integrada do <strong>PGR, LTCAT e PCMSO</strong>, garantindo conformidade legal plena com as NRs 01 e 07 do Ministério do Trabalho e com a legislação previdenciária vigente (IN 128/INSS).</p>
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
                <span class="page-header-title">Proposta Comercial - Kit Integrado SST</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">2</span>
                <span class="section-title-text">Contexto e Obrigação Legal</span>
            </h2>

            <div class="alert-box">
                <h4><i class="fas fa-gavel"></i> Obrigações Legais Integradas</h4>
                <p>As <strong>NR-01, NR-07</strong> e a <strong>legislação previdenciária (IN 128/INSS)</strong> estabelecem que todas as empresas devem manter programas de SST atualizados, integrados e em conformidade com o eSocial.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-file-contract"></i> Base Legal dos Programas</h3>
            
            <p><strong>PGR – Programa de Gerenciamento de Riscos (NR-01):</strong> Obrigatório para todas as empresas, substitui o antigo PPRA. Constitui a base técnica para identificação, avaliação e controle dos riscos ocupacionais, alimentando o PCMSO e o LTCAT.</p>
            
            <p><strong>LTCAT – Laudo Técnico das Condições Ambientais do Trabalho:</strong> Exigido pela legislação previdenciária (Lei 8.213/91 e IN 128/INSS). Documenta a exposição a agentes nocivos para fins de aposentadoria especial e defesa em processos previdenciários.</p>
            
            <p><strong>PCMSO – Programa de Controle Médico de Saúde Ocupacional (NR-07):</strong> Programa obrigatório para todas as empresas que estabelece diretrizes e parâmetros para <strong>vigilância da saúde dos trabalhadores</strong>. Define os exames médicos ocupacionais com base nos riscos ocupacionais mapeados no PGR.</p>

            <div class="highlight-box">
                <p><strong>Integração obrigatória:</strong> A NR-01 determina que o PGR deve ser a <strong>base técnica</strong> para todos os demais programas de SST. O PCMSO e o LTCAT devem estar alinhados com os riscos identificados no inventário de riscos do PGR.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-exclamation-triangle"></i> Riscos Jurídicos do Não Cumprimento</h3>
            <ul class="feature-list">
                <li><strong>Multas do MTE</strong> por ausência ou inadequação dos programas de SST</li>
                <li><strong>Autuações do eSocial</strong> por inconsistências nas informações de SST</li>
                <li><strong>Ações regressivas do INSS</strong> por benefícios acidentários concedidos</li>
                <li><strong>Processos trabalhistas</strong> por doenças ocupacionais não prevenidas</li>
                <li><strong>Responsabilização criminal</strong> em caso de acidentes graves ou fatais</li>
            </ul>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">03</span>
            </div>
        </div>

        <!-- ====== PÁGINA 4: O QUE SÃO PGR, LTCAT E PCMSO ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Kit Integrado SST</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">3</span>
                <span class="section-title-text">O que são PGR, LTCAT e PCMSO?</span>
            </h2>

            <div class="green-box">
                <h4><i class="fas fa-shield-alt"></i> PGR – Programa de Gerenciamento de Riscos</h4>
                <p>Documento obrigatório pela <strong>NR-01</strong> que estabelece o processo sistemático de identificação de perigos, avaliação de riscos e implementação de medidas de controle. É a <strong>base técnica central</strong> que alimenta o PCMSO e o LTCAT.</p>
            </div>

            <div class="info-box">
                <h4><i class="fas fa-file-medical-alt"></i> LTCAT – Laudo Técnico das Condições Ambientais</h4>
                <p>Documento técnico-legal exigido pela <strong>legislação previdenciária</strong> que caracteriza a exposição dos trabalhadores a agentes nocivos (físicos, químicos e biológicos). Fundamenta o direito à <strong>aposentadoria especial</strong> e protege a empresa em processos previdenciários.</p>
            </div>

            <div class="purple-box">
                <h4><i class="fas fa-heartbeat"></i> PCMSO – Programa de Controle Médico de Saúde Ocupacional</h4>
                <p>Programa obrigatório pela <strong>NR-07</strong> que tem por objetivo a <strong>promoção e preservação da saúde dos trabalhadores</strong> através de ações integradas de vigilância epidemiológica e médica. Define os exames médicos ocupacionais com base nos riscos do PGR.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-project-diagram"></i> Integração entre os Programas</h3>

            <div class="factors-grid">
                <div class="factor-card">
                    <h4><i class="fas fa-search"></i> Inventário de Riscos (PGR)</h4>
                    <p>Base técnica que mapeia todos os perigos e riscos ocupacionais por função e ambiente de trabalho.</p>
                </div>
                <div class="factor-card">
                    <h4><i class="fas fa-tasks"></i> Plano de Ação (PGR)</h4>
                    <p>Define medidas de controle, prazos e responsáveis para eliminação ou redução dos riscos.</p>
                </div>
                <div class="factor-card">
                    <h4><i class="fas fa-clipboard-check"></i> Caracterização de Exposição (LTCAT)</h4>
                    <p>Documenta a exposição a agentes nocivos conforme critérios técnicos e legais previdenciários.</p>
                </div>
                <div class="factor-card">
                    <h4><i class="fas fa-stethoscope"></i> Vigilância da Saúde (PCMSO)</h4>
                    <p>Define exames médicos e parâmetros de monitoramento baseados nos riscos do PGR.</p>
                </div>
            </div>

            <div class="highlight-box">
                <p><strong>Fluxo de Integração:</strong> O PGR identifica os riscos → O LTCAT caracteriza a exposição para fins previdenciários → O PCMSO define os exames médicos necessários. Todos devem estar <strong>consistentes e atualizados</strong>.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">04</span>
            </div>
        </div>

        <!-- ====== PÁGINA 5: ESCOPO E ENTREGÁVEIS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Kit Integrado SST</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">4</span>
                <span class="section-title-text">Escopo e Entregáveis</span>
            </h2>

            <h3 class="subsection-title"><i class="fas fa-file-alt"></i> PGR – Programa de Gerenciamento de Riscos</h3>
            <ul class="feature-list">
                <li>Visita técnica às instalações da empresa</li>
                <li>Inventário de Riscos Ocupacionais completo</li>
                <li>Identificação de perigos por função e ambiente</li>
                <li>Avaliação qualitativa dos riscos ocupacionais</li>
                <li>Plano de Ação com medidas de controle</li>
                <li>Documento técnico formatado e assinado</li>
            </ul>

            <h3 class="subsection-title"><i class="fas fa-file-medical-alt"></i> LTCAT – Laudo Técnico das Condições Ambientais</h3>
            <ul class="feature-list">
                <li>Caracterização dos ambientes de trabalho</li>
                <li>Identificação de agentes nocivos (físicos, químicos, biológicos)</li>
                <li>Enquadramento conforme Anexo IV do Decreto 3.048/99</li>
                <li>Conclusão técnica sobre exposição para fins previdenciários</li>
                <li>ART do engenheiro de segurança responsável</li>
            </ul>

            <h3 class="subsection-title"><i class="fas fa-heartbeat"></i> PCMSO – Programa de Controle Médico</h3>
            <ul class="feature-list">
                <li>Definição dos exames médicos ocupacionais por função</li>
                <li>Relação de exames complementares necessários</li>
                <li>Periodicidade dos exames conforme riscos</li>
                <li>Parâmetros de aptidão para cada função</li>
                <li>Cronograma anual de exames</li>
                <li>Assinatura do médico do trabalho coordenador</li>
            </ul>

            <div class="info-box" style="margin-top: 15px;">
                <h4><i class="fas fa-check-double"></i> Documentação Pronta para o eSocial</h4>
                <p>Todos os documentos são elaborados em conformidade com as exigências do eSocial, facilitando o envio dos eventos S-2220 (Monitoramento da Saúde) e S-2240 (Condições Ambientais).</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">05</span>
            </div>
        </div>

        <!-- ====== PÁGINA 6: INVESTIMENTO ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Kit Integrado SST</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">5</span>
                <span class="section-title-text">Investimento e Condições Comerciais</span>
            </h2>

            ${descontoHTML}

            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #cbd5e0;">
                <thead>
                    <tr style="background: #2c5282; color: white;">
                        <th style="padding: 12px 15px; text-align: left; font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; border: 1px solid #2c5282;">Descrição</th>
                        <th style="padding: 12px 15px; text-align: center; font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; border: 1px solid #2c5282; width: 150px;">Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="background: white;">
                        <td style="padding: 12px 15px; font-size: 11px; color: #2d3748; border: 1px solid #cbd5e0;">
                            <strong>Kit Integrado SST</strong><br>
                            <span style="font-size: 10px; color: #718096;">PGR + LTCAT + PCMSO completos e integrados</span>
                        </td>
                        <td style="padding: 12px 15px; text-align: center; font-size: 16px; color: #2d3748; font-weight: 700; border: 1px solid #cbd5e0;">${formatMoeda(valorFinal)}</td>
                    </tr>
                </tbody>
            </table>

            <h3 class="subsection-title"><i class="fas fa-check-circle"></i> O Que Está Incluso</h3>
            
            <div class="included-services" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px; font-size: 10px;">
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i>
                    <span>Visita técnica às instalações</span>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i>
                    <span>PGR completo (Inventário + Plano de Ação)</span>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i>
                    <span>LTCAT com enquadramento previdenciário</span>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i>
                    <span>PCMSO com exames por função</span>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i>
                    <span>ART do Engenheiro de Segurança</span>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i>
                    <span>Documentação pronta para eSocial</span>
                </div>
            </div>

            <h3 class="subsection-title"><i class="fas fa-credit-card"></i> Condições de Pagamento</h3>

            <div class="conditions-list">
                <div class="condition-item">
                    <div class="condition-icon"><i class="fas fa-calendar-check"></i></div>
                    <div class="condition-text">
                        <strong>Validade da Proposta</strong>
                        <span>Esta proposta tem validade de 15 dias a partir da data de emissão.</span>
                    </div>
                </div>
                <div class="condition-item">
                    <div class="condition-icon"><i class="fas fa-money-bill-wave"></i></div>
                    <div class="condition-text">
                        <strong>Forma de Pagamento</strong>
                        <span>50% na aprovação + 50% na entrega dos documentos finais. PIX, boleto ou transferência.</span>
                    </div>
                </div>
                <div class="condition-item">
                    <div class="condition-icon"><i class="fas fa-clock"></i></div>
                    <div class="condition-text">
                        <strong>Prazo de Entrega</strong>
                        <span>15 a 20 dias úteis após aprovação e agendamento da visita técnica.</span>
                    </div>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">06</span>
            </div>
        </div>

        <!-- ====== PÁGINA 7: RESPONSÁVEL COMERCIAL ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Kit Integrado SST</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">6</span>
                <span class="section-title-text">Responsável pela Proposta</span>
            </h2>

            <div class="responsible-card">
                <div class="responsible-avatar">
                    <i class="fas fa-user-tie"></i>
                </div>
                <p class="responsible-name">${dados.elaborador.nome}</p>
                <p class="responsible-role">${dados.elaborador.cargo}</p>
                <p class="responsible-company">EngMarq Solution</p>
                <div class="responsible-contacts">
                    <div class="responsible-contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>${dados.elaborador.email}</span>
                    </div>
                    <div class="responsible-contact-item">
                        <i class="fab fa-whatsapp"></i>
                        <span>${dados.elaborador.telefone}</span>
                    </div>
                    <div class="responsible-contact-item">
                        <i class="fab fa-instagram"></i>
                        <span>${dados.elaborador.instagram || '@engmarq_solution'}</span>
                    </div>
                </div>
            </div>

            <div class="info-box" style="margin-top: 20px;">
                <h4><i class="fas fa-handshake"></i> Próximos Passos</h4>
                <p>Após a aprovação desta proposta, entraremos em contato para agendar a visita técnica e iniciar o levantamento de informações necessárias para elaboração dos documentos.</p>
            </div>

            <h3 class="subsection-title" style="margin-top: 30px;"><i class="fas fa-signature"></i> Aprovação da Proposta</h3>
            
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

                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed var(--gray-color);">
                    <div style="text-align: center;">
                        <div style="border-bottom: 1px solid var(--dark-color); margin: 0 auto 5px; height: 35px; max-width: 450px;"></div>
                        <p style="margin: 0; font-size: 11px; color: var(--gray-color); text-align: center;">Assinatura do Aprovador</p>
                    </div>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">07</span>
            </div>
        </div>
    `;
}
