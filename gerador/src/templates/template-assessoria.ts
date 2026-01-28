// =====================================================
// TEMPLATE ASSESSORIA EM SST - COMPLETO
// =====================================================

import { DadosTemplate } from '../types/proposta.types';
import { formatMoeda } from '../utils/formatters';

/**
 * Gera o template HTML completo para proposta de Assessoria em SST
 */
export function getTemplateAssessoria(
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
                Assessoria Técnica Especializada
            </span>

            <div class="cover-icon">
                <i class="fas fa-hard-hat"></i>
            </div>

            <h1 class="cover-title">
                Proposta Comercial<br>
                <span>Assessoria em Segurança do Trabalho</span>
            </h1>
            <p class="cover-subtitle">
                Equipe técnica especializada, gestão de programas de SST e treinamentos de capacitação para conformidade legal
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
                <span class="page-header-title">Proposta Comercial - Assessoria em SST</span>
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
                <h4><i class="fas fa-handshake"></i> Proposta Especializada</h4>
                <p>Esta proposta contempla a prestação de serviços de assessoria em segurança do trabalho com equipe técnica dedicada, gestão de programas de SST e treinamentos de capacitação conforme as Normas Regulamentadoras.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">02</span>
            </div>
        </div>

        <!-- ====== PÁGINA 3: FORNECIMENTO DE EQUIPE TÉCNICA ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Assessoria em SST</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">2</span>
                <span class="section-title-text">Fornecimento de Equipe Técnica</span>
            </h2>

            <div class="info-box" style="margin-bottom: 15px;">
                <h4><i class="fas fa-users-cog"></i> Assessoria Personalizada em SST</h4>
                <p>Serviço customizado de acompanhamento e fiscalização dos processos de segurança do trabalho da empresa contratante, com profissional especializado e experiente no segmento.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-user-shield"></i> Profissionais Alocados</h3>

            <div class="factor-card" style="margin: 10px 0;">
                <h4><i class="fas fa-id-badge"></i> 1 Técnico de Segurança do Trabalho</h4>
                <p>Profissional habilitado e registrado conforme exigências do MTE.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-calendar-check"></i> Modalidade de Visitas</h3>

            <table style="width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 10px;">
                <tr style="background: var(--light-color);">
                    <td style="padding: 8px 12px; border: 1px solid #e2e8f0; width: 50%;"><strong>Frequência:</strong></td>
                    <td style="padding: 8px 12px; border: 1px solid #e2e8f0;"><i class="fas fa-check" style="color: var(--success-color);"></i> Visita técnica 1x por mês</td>
                </tr>
                <tr>
                    <td style="padding: 8px 12px; border: 1px solid #e2e8f0;"><strong>Total de visitas por mês:</strong></td>
                    <td style="padding: 8px 12px; border: 1px solid #e2e8f0;"><strong style="color: var(--primary-color);">1 visita</strong></td>
                </tr>
                <tr style="background: var(--light-color);">
                    <td style="padding: 8px 12px; border: 1px solid #e2e8f0;"><strong>Total de visitas por 12 meses:</strong></td>
                    <td style="padding: 8px 12px; border: 1px solid #e2e8f0;"><strong style="color: var(--primary-color);">12 visitas</strong></td>
                </tr>
                <tr>
                    <td style="padding: 8px 12px; border: 1px solid #e2e8f0;"><strong>Assessoria online:</strong></td>
                    <td style="padding: 8px 12px; border: 1px solid #e2e8f0;"><strong style="color: var(--success-color);">Sob demanda</strong></td>
                </tr>
            </table>

            <div class="highlight-box">
                <p><strong><i class="fas fa-clock"></i> Observação:</strong> Cada visita técnica é contabilizada como sendo de 1 turno (manhã ou tarde), sendo realizada em <strong>4 horas de trabalho</strong>.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-tasks"></i> Atividades do Profissional de Segurança do Trabalho</h3>

            <ul class="feature-list" style="font-size: 10px;">
                <li>Acompanhamento de OS - Ordem de Serviço, conforme NR-01, descrevendo deveres e obrigações perante à segurança do trabalho</li>
                <li>Acompanhamento técnico das atividades de inspeção de equipamento de proteção individual (NR-06)</li>
                <li>Acompanhamento técnico das atividades de inspeção de equipamento de proteção coletiva (NR-18)</li>
                <li>Acompanhamento técnico das atividades de investigação e análise de acidente de trabalho (NR-04)</li>
                <li>Acompanhamento técnico das atividades de emissão da CAT, evento S-2210 do eSocial, além do envio</li>
                <li>Acompanhamento técnico das atividades fiscalização de segurança do trabalho</li>
                <li>Gestão dos programas de SST (PGR, PCMSO e LTCAT), acompanhamento dos cronogramas de ações, riscos ocupacionais, funções e equipamentos de ordem individuais e coletivos</li>
            </ul>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">03</span>
            </div>
        </div>

        <!-- ====== PÁGINA 4: TREINAMENTOS DE CAPACITAÇÃO TÉCNICA ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Assessoria em SST</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">3</span>
                <span class="section-title-text">Treinamentos de Capacitação Técnica</span>
            </h2>

            <div class="info-box" style="margin-bottom: 20px;">
                <h4><i class="fas fa-graduation-cap"></i> Capacitação Técnica Inclusa</h4>
                <p>Programação de treinamentos integrada ao serviço de assessoria, executada nas instalações do cliente durante as visitas agendadas ou mediante demanda específica.</p>
            </div>

            <!-- Treinamento 1 -->
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <h4 style="margin: 0; font-family: var(--font-primary); font-size: 13px; color: var(--primary-color); font-weight: 600;">
                        <i class="fas fa-hard-hat" style="color: var(--secondary-color); margin-right: 6px;"></i>Integração Admissional - NR-18
                    </h4>
                    <div style="display: flex; gap: 8px; font-size: 10px;">
                        <span style="color: var(--gray-color);"><i class="fas fa-clock"></i> 04h</span>
                        <span style="background: #f7fafc; color: var(--primary-color); padding: 2px 8px; border-radius: 4px; font-weight: 600;">1x/mês</span>
                    </div>
                </div>
                <p style="margin: 0; font-size: 10px; line-height: 1.6; color: var(--gray-color);">Capacitação obrigatória para novos colaboradores admitidos, abordando segurança na construção civil. Realizado na empresa contratante durante visita técnica ou mediante agendamento específico.</p>
            </div>

            <!-- Treinamento 2 -->
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <h4 style="margin: 0; font-family: var(--font-primary); font-size: 13px; color: var(--primary-color); font-weight: 600;">
                        <i class="fas fa-users" style="color: var(--secondary-color); margin-right: 6px;"></i>Formação de CIPA
                    </h4>
                    <div style="display: flex; gap: 8px; font-size: 10px;">
                        <span style="color: var(--gray-color);"><i class="fas fa-clock"></i> 08h</span>
                        <span style="background: #f7fafc; color: var(--primary-color); padding: 2px 8px; border-radius: 4px; font-weight: 600;">1x/ano</span>
                    </div>
                </div>
                <p style="margin: 0; font-size: 10px; line-height: 1.6; color: var(--gray-color);">Capacitação anual para membros eleitos e designados da Comissão Interna de Prevenção de Acidentes, incluindo titulares e suplentes, executada nas dependências do contratante.</p>
            </div>

            <!-- Treinamento 3 -->
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <h4 style="margin: 0; font-family: var(--font-primary); font-size: 13px; color: var(--primary-color); font-weight: 600;">
                        <i class="fas fa-fire-extinguisher" style="color: var(--secondary-color); margin-right: 6px;"></i>Brigada de Emergência e Combate a Incêndio
                    </h4>
                    <div style="display: flex; gap: 8px; font-size: 10px;">
                        <span style="color: var(--gray-color);"><i class="fas fa-clock"></i> 04h</span>
                        <span style="background: #f7fafc; color: var(--primary-color); padding: 2px 8px; border-radius: 4px; font-weight: 600;">1x/ano</span>
                    </div>
                </div>
                <p style="margin: 0; font-size: 10px; line-height: 1.6; color: var(--gray-color);">Preparação de brigadistas voluntários para atuação em situações de emergência, com foco em prevenção e combate a princípios de incêndio, primeiros socorros e evacuação de áreas.</p>
            </div>

            <!-- Treinamento 4 -->
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <h4 style="margin: 0; font-family: var(--font-primary); font-size: 13px; color: var(--primary-color); font-weight: 600;">
                        <i class="fas fa-bolt" style="color: var(--secondary-color); margin-right: 6px;"></i>Segurança em Instalações Elétricas - NR-10
                    </h4>
                    <div style="display: flex; gap: 8px; font-size: 10px;">
                        <span style="color: var(--gray-color);"><i class="fas fa-clock"></i> 40h</span>
                        <span style="background: #f7fafc; color: var(--primary-color); padding: 2px 8px; border-radius: 4px; font-weight: 600;">1x/ano</span>
                    </div>
                </div>
                <p style="margin: 0; font-size: 10px; line-height: 1.6; color: var(--gray-color);">Formação básica para colaboradores autorizados a intervir em instalações elétricas. Pode ser realizado na sede da EngMarq Solution.</p>
            </div>

            <!-- Treinamento 5 -->
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <h4 style="margin: 0; font-family: var(--font-primary); font-size: 13px; color: var(--primary-color); font-weight: 600;">
                        <i class="fas fa-mountain" style="color: var(--secondary-color); margin-right: 6px;"></i>Trabalho em Altura - NR-35
                    </h4>
                    <div style="display: flex; gap: 8px; font-size: 10px;">
                        <span style="color: var(--gray-color);"><i class="fas fa-clock"></i> 08h</span>
                        <span style="background: #f7fafc; color: var(--primary-color); padding: 2px 8px; border-radius: 4px; font-weight: 600;">1x/ano</span>
                    </div>
                </div>
                <p style="margin: 0; font-size: 10px; line-height: 1.6; color: var(--gray-color);">Habilitação para atividades executadas acima de 2 metros do piso. Agendamento conforme disponibilidade de ambas as partes.</p>
            </div>

            <div class="highlight-box">
                <p style="font-size: 10px; margin: 0;"><strong><i class="fas fa-calendar-check"></i> Execução:</strong> Todos os treinamentos serão ministrados mediante solicitação prévia e coordenação de agenda entre as partes. Turmas adicionais, reciclagens ou outras capacitações podem ser contratadas separadamente.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">04</span>
            </div>
        </div>

        <!-- ====== PÁGINA 5: INVESTIMENTO ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Assessoria em SST</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">4</span>
                <span class="section-title-text">Investimento</span>
            </h2>

            ${descontoHTML}

            <table class="investment-table">
                <thead>
                    <tr>
                        <th style="width: 70%;">Serviço</th>
                        <th style="width: 30%; text-align: right;">Valor Mensal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="training-name"><i class="fas fa-hard-hat" style="color: var(--secondary-color);"></i> Assessoria Personalizada em SST (1 visita/mês + suporte sob demanda + treinamentos inclusos)</td>
                        <td style="text-align: right; font-weight: 600;">R$ ${formatMoeda(valorFinal)}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td><i class="fas fa-calculator"></i> INVESTIMENTO MENSAL</td>
                        <td style="text-align: right;">R$ ${formatMoeda(valorFinal)}</td>
                    </tr>
                </tfoot>
            </table>

            <h3 class="subsection-title"><i class="fas fa-check-circle"></i> O Que Está Incluso</h3>
            <div class="included-services" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 15px; font-size: 10px;">
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>1 Técnico de Segurança do Trabalho</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>1 visita técnica mensal</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Assessoria online sob demanda</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Gestão de PGR, PCMSO e LTCAT</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Treinamento Admissional NR-18 (1/mês)</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Treinamento CIPA (1/ano)</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Treinamento Brigada de Incêndio (1/ano)</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Treinamento NR-10 (1/ano)</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Treinamento NR-35 (1/ano)</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Inspeções de EPIs e EPCs</span></div>
            </div>

            <h3 class="subsection-title"><i class="fas fa-credit-card"></i> Condições de Pagamento</h3>
            <div class="company-info-grid">
                <div class="company-info-item"><label>Forma de Pagamento</label><span>Transferência Bancária ou PIX</span></div>
                <div class="company-info-item"><label>Vencimento</label><span>Todo dia 10 do mês vigente</span></div>
                <div class="company-info-item"><label>Validade da Proposta</label><span>15 dias corridos</span></div>
                <div class="company-info-item"><label>Vigência do Contrato</label><span>12 meses (renovável)</span></div>
            </div>

            <div class="info-box" style="margin-top: 15px;">
                <p style="margin: 0; font-size: 10px;"><strong><i class="fas fa-info-circle"></i> Observação:</strong> Serviços adicionais não contemplados nesta proposta podem ser negociados separadamente.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">05</span>
            </div>
        </div>

        <!-- ====== PÁGINA 6: RESPONSÁVEL PELA PROPOSTA ====== -->
        <div class="page page-contact">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Assessoria em SST</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">5</span>
                <span class="section-title-text">Responsável pela Proposta</span>
            </h2>

            <div class="contact-content" style="margin-top: 15px;">
                <div class="responsible-card">
                    <div class="responsible-avatar">
                        <i class="fas fa-user-tie"></i>
                    </div>
                    <p class="responsible-name">${dados.elaborador.nome}</p>
                    <p class="responsible-role">${dados.elaborador.cargo}</p>
                    <p class="responsible-company">EngMarq Solution</p>

                    <div class="responsible-contacts">
                        <div class="responsible-contact-item">
                            <i class="fab fa-whatsapp"></i>
                            <span>${dados.elaborador.telefone}</span>
                        </div>
                        <div class="responsible-contact-item">
                            <i class="fas fa-envelope"></i>
                            <span>${dados.elaborador.email}</span>
                        </div>
                        <div class="responsible-contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Natal - RN</span>
                        </div>
                    </div>
                </div>

                <div class="info-box" style="margin-top: 15px;">
                    <h4><i class="fas fa-building"></i> Sobre a EngMarq Solution</h4>
                    <p>Somos uma empresa especializada em <strong>Engenharia de Segurança e Saúde do Trabalho</strong>, oferecendo soluções completas para adequação às Normas Regulamentadoras, gestão de riscos ocupacionais e promoção de ambientes de trabalho seguros e saudáveis.</p>
                </div>

                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px;">
                    <div style="text-align: center; padding: 12px; background: var(--light-color); border-radius: 8px;">
                        <i class="fas fa-award" style="font-size: 22px; color: var(--secondary-color); margin-bottom: 6px;"></i>
                        <p style="font-size: 10px; margin: 0; font-weight: 600; color: var(--primary-color);">Profissionais Qualificados</p>
                    </div>
                    <div style="text-align: center; padding: 12px; background: var(--light-color); border-radius: 8px;">
                        <i class="fas fa-handshake" style="font-size: 22px; color: var(--secondary-color); margin-bottom: 6px;"></i>
                        <p style="font-size: 10px; margin: 0; font-weight: 600; color: var(--primary-color);">Compromisso com Resultados</p>
                    </div>
                    <div style="text-align: center; padding: 12px; background: var(--light-color); border-radius: 8px;">
                        <i class="fas fa-shield-alt" style="font-size: 22px; color: var(--secondary-color); margin-bottom: 6px;"></i>
                        <p style="font-size: 10px; margin: 0; font-weight: 600; color: var(--primary-color);">Segurança em Primeiro Lugar</p>
                    </div>
                </div>

                <div class="contact-signature">
                    <p class="signature-text">
                        <strong>EngMarq Solution</strong><br>
                        Engenharia de Segurança e Saúde do Trabalho<br>
                        CNPJ: 60.545.359/0001-76 | Natal - RN<br>
                        <em>Transformando ambientes de trabalho em espaços seguros e produtivos.</em>
                    </p>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">06</span>
            </div>
        </div>

        <!-- ====== PÁGINA 7: TERMO DE ACEITE ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Assessoria em SST</span>
            </div>

            <h2 class="section-title">
                <span class="section-number"><i class="fas fa-file-signature"></i></span>
                <span class="section-title-text">Termo de Aceite e Assinaturas</span>
            </h2>

            <div class="info-box" style="margin-bottom: 15px;">
                <h4><i class="fas fa-handshake"></i> Formalização do Aceite</h4>
                <p>Ao assinar este documento, as partes declaram estar de acordo com todos os termos, condições, valores e prazos descritos nesta proposta comercial, formalizando a contratação dos serviços especificados.</p>
            </div>

            <div style="background: var(--light-color); border-radius: 12px; padding: 20px; margin-bottom: 15px;">
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
                <span class="page-number">07</span>
            </div>
        </div>

        <!-- ====== PÁGINA 8: CONTATO ====== -->
        <div class="page page-contact">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Assessoria em SST</span>
            </div>

            <div class="contact-content">
                <div class="contact-icon">
                    <i class="fas fa-handshake"></i>
                </div>
                <h2 class="contact-title">Fale Conosco</h2>
                <p class="contact-subtitle">
                    Estamos à disposição para dar continuidade ao processo de contratação e esclarecer eventuais dúvidas sobre a assessoria em SST.
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
                <span class="page-number">08</span>
            </div>
        </div>
    `;
}

