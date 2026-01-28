// =====================================================
// TEMPLATE TREINAMENTOS EM SST - COMPLETO
// =====================================================

import { DadosTemplate } from '../types/proposta.types';
import { formatMoeda, valorPorExtenso } from '../utils/formatters';

/**
 * Configuração específica do template de Treinamentos
 */
interface TreinamentosConfig {
    color: string;
    headerTitle: string;
}

/**
 * Gera o template HTML completo para proposta de Treinamentos em SST
 * @param dados - Dados do cliente/proposta
 * @param valorOriginal - Valor original sem desconto
 * @param valorFinal - Valor final após desconto
 * @param percentualDesc - Percentual de desconto aplicado
 * @param temDesconto - Se há desconto aplicado
 * @returns String HTML do template completo (7 páginas)
 */
export function getTemplateTreinamentos(
    dados: DadosTemplate,
    valorOriginal: number,
    valorFinal: number,
    percentualDesc: number,
    temDesconto: boolean
): string {
    const cfg: TreinamentosConfig = {
        color: '#dd6b20',
        headerTitle: 'Proposta Comercial - Treinamentos em SST'
    };
    
    const descontoHTML: string = temDesconto ? `
        <div style="background: linear-gradient(135deg, #38a169 0%, #2f855a 100%); color: #fff; padding: 15px 25px; border-radius: 10px; text-align: center; margin: 15px 0;">
            <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; opacity: 0.9;"><i class="fas fa-tag"></i> Desconto Especial Aplicado</p>
            <p style="font-size: 16px; margin: 0;"><s style="opacity: 0.7;">De R$ ${formatMoeda(valorOriginal)}</s> &nbsp;<strong style="font-size: 20px;">${percentualDesc}% OFF</strong></p>
        </div>` : '';

    return `
        <!-- ====== PÁGINA 1: CAPA ====== -->
        <div class="page page-cover">
            <span style="position: absolute; top: 25mm; left: 0; right: 0; text-align: center; font-family: var(--font-primary); font-size: 14px; font-weight: 700; color: var(--accent-color); letter-spacing: 3px;">${dados.numero}</span>
            
            <img src="${dados.logoUrl}" alt="EngMarq Solution" class="cover-logo">
            
            <span class="cover-badge">
                <i class="fas fa-chalkboard-teacher"></i>
                Treinamentos em SST
            </span>

            <div class="cover-icon">
                <i class="fas fa-graduation-cap"></i>
            </div>

            <h1 class="cover-title">
                Proposta Comercial<br>
                <span>Treinamentos em SST</span>
            </h1>
            <p class="cover-subtitle">
                Capacitação especializada em Normas Regulamentadoras com metodologia prática, certificação imediata e total conformidade legal
            </p>
            
            <div class="cover-client">
                <p class="cover-client-label">Proposta elaborada para</p>
                <p class="cover-client-name">${dados.razaoSocial}</p>
            </div>

            <p class="cover-date">
                <i class="fas fa-calendar-alt"></i>&nbsp;&nbsp;
                ${dados.data}
            </p>

            <div class="cover-footer">
                <p>EngMarq Solution | SST que traz segurança jurídica | Natal - RN</p> 
            </div>
        </div>

        <!-- ====== PÁGINA 2: APRESENTAÇÃO E DADOS DO CLIENTE ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${cfg.headerTitle}</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">1</span>
                <span class="section-title-text">Apresentação</span>
            </h2>

            <div class="info-box" style="margin-bottom: 15px;">
                <h4><i class="fas fa-handshake"></i> SST que traz segurança jurídica</h4>
                <p>A <strong>EngMarq Solution</strong> é uma empresa especializada em Engenharia de Segurança e Saúde do Trabalho. Nossa metodologia foi desenvolvida para garantir a <strong>conformidade legal</strong> da sua empresa com as Normas Regulamentadoras, através de treinamentos práticos e certificação imediata.</p>
            </div>

            ${dados.solicitante.nome ? `<p>Prezado(a) <strong>${dados.solicitante.nome}</strong>,</p>` : '<p>Prezado(a) Cliente,</p>'}

            <p>Apresentamos nossa proposta comercial para a realização de treinamentos em Segurança e Saúde do Trabalho, desenvolvida especialmente para atender às necessidades da <strong>${dados.razaoSocial}</strong>.</p>

            <p>Nossa metodologia contempla:</p>

            <ul class="feature-list">
                <li>Instrutores especializados e habilitados conforme cada Norma Regulamentadora</li>
                <li>Treinamentos teóricos e práticos com abordagem dinâmica</li>
                <li>Material didático atualizado e contextualizado</li>
                <li>Certificação imediata com validade legal conforme NRs</li>
                <li>Flexibilidade de horários adaptada à rotina da empresa</li>
            </ul>

            <h2 class="section-title" style="margin-top: 20px;">
                <span class="section-number">2</span>
                <span class="section-title-text">Dados do Cliente</span>
            </h2>

            <h3 class="subsection-title"><i class="fas fa-building"></i> Dados da Empresa</h3>
            
            <div class="company-info-grid">
                <div class="company-info-item">
                    <label>Razão Social</label>
                    <span>${dados.razaoSocial}</span>
                </div>
                <div class="company-info-item">
                    <label>CNPJ</label>
                    <span>${dados.cnpj || '-'}</span>
                </div>
                <div class="company-info-item">
                    <label>Endereço</label>
                    <span>${dados.endereco || '-'}</span>
                </div>
                <div class="company-info-item">
                    <label>Bairro</label>
                    <span>${dados.bairro || '-'}</span>
                </div>
                <div class="company-info-item">
                    <label>CEP</label>
                    <span>${dados.cep || '-'}</span>
                </div>
                <div class="company-info-item">
                    <label>Município / UF</label>
                    <span>${dados.cidade} - ${dados.uf}</span>
                </div>
            </div>

            ${dados.solicitante.nome ? `
            <h3 class="subsection-title" style="margin-top: 15px;"><i class="fas fa-user-tie"></i> Solicitante da Proposta</h3>
            <div class="company-info-grid">
                <div class="company-info-item">
                    <label>Nome</label>
                    <span>${dados.solicitante.nome}</span>
                </div>
                <div class="company-info-item">
                    <label>Cargo / Função</label>
                    <span>${dados.solicitante.cargo || '-'}</span>
                </div>
                <div class="company-info-item">
                    <label>Telefone / WhatsApp</label>
                    <span>${dados.solicitante.telefone || '-'}</span>
                </div>
            </div>
            ` : ''}

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">02</span>
            </div>
        </div>

        <!-- ====== PÁGINA 3: ESCOPO DOS TREINAMENTOS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${cfg.headerTitle}</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">3</span>
                <span class="section-title-text">Escopo dos Treinamentos</span>
            </h2>

            <div class="training-cards">
                <div class="training-card">
                    <h4><i class="fas fa-bolt"></i> NR-10 - Segurança em Eletricidade</h4>
                    <p>Capacitação em Segurança em Instalações e Serviços em Eletricidade para profissionais que interagem com instalações elétricas.</p>
                </div>
                <div class="training-card">
                    <h4><i class="fas fa-cogs"></i> NR-12 - Segurança em Máquinas</h4>
                    <p>Capacitação para operação segura de máquinas e equipamentos, abordando riscos mecânicos, dispositivos de proteção e procedimentos seguros.</p>
                </div>
                <div class="training-card">
                    <h4><i class="fas fa-hard-hat"></i> NR-33 - Espaço Confinado</h4>
                    <p>Formação para trabalhos em espaços confinados, incluindo reconhecimento, avaliação e controle de riscos, procedimentos de emergência e resgate.</p>
                </div>
                <div class="training-card">
                    <h4><i class="fas fa-mountain"></i> NR-35 - Trabalho em Altura</h4>
                    <p>Habilitação para atividades executadas acima de 2 metros do piso, com técnicas de acesso, sistemas de proteção e resgate.</p>
                </div>
            </div>

            <div class="training-card" style="border-left-color: #e53e3e;">
                <h4><i class="fas fa-fire-extinguisher" style="color: #e53e3e;"></i> Brigada de Incêndio</h4>
                <p>Formação de brigadistas conforme Instrução Técnica do CBMRN. Inclui teoria e prática de prevenção e combate a princípios de incêndio, primeiros socorros e evacuação.</p>
            </div>

            <div class="highlight-box" style="border-left-color: #e53e3e; background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%);">
                <p><strong><i class="fas fa-exclamation-triangle"></i> Nota Importante:</strong> O material de combate a incêndio (extintores, mangueiras, etc.) utilizado nas práticas será fornecido pela contratante, salvo acordo prévio em contrário.</p>
            </div>

            <h3 class="subsection-title" style="margin-top: 20px;"><i class="fas fa-clipboard-list"></i> Metodologia de Execução</h3>

            <div class="info-box">
                <h4><i class="fas fa-calendar-check"></i> Flexibilidade na Execução</h4>
                <p>Os treinamentos podem ser realizados em <strong>turmas personalizadas</strong>, respeitando a disponibilidade da empresa. As datas e horários serão acordados previamente para garantir a máxima participação dos colaboradores sem impacto na operação.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-certificate"></i> Certificação e Documentação</h3>

            <ul class="feature-list">
                <li>Certificados individuais com validade legal conforme cada NR</li>
                <li>Lista de presença assinada por todos os participantes</li>
                <li>Registro fotográfico dos treinamentos (opcional)</li>
                <li>Conteúdo programático ministrado</li>
            </ul>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">03</span>
            </div>
        </div>

        <!-- ====== PÁGINA 4: INVESTIMENTO ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${cfg.headerTitle}</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">4</span>
                <span class="section-title-text">Investimento</span>
            </h2>

            ${descontoHTML}

            <div class="investment-box">
                <div class="investment-header">
                    <i class="fas fa-graduation-cap"></i>
                    <span>Treinamentos em SST</span>
                </div>
                <div class="investment-value">${formatMoeda(valorFinal)}</div>
                <p class="investment-extenso">${valorPorExtenso(valorFinal)}</p>
            </div>

            <div class="info-box" style="margin-top: 20px;">
                <h4><i class="fas fa-star"></i> Benefícios Inclusos</h4>
                <p>• Instrutores especializados e habilitados conforme cada NR<br>
                • Certificados individuais com registro e validade legal<br>
                • Material didático e apostilas inclusos</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-credit-card"></i> Condições de Pagamento</h3>

            <div class="company-info-grid">
                <div class="company-info-item">
                    <label>Forma de Pagamento</label>
                    <span>Transferência Bancária ou PIX</span>
                </div>
                <div class="company-info-item">
                    <label>Prazo</label>
                    <span>50% no fechamento | 50% após conclusão</span>
                </div>
                <div class="company-info-item">
                    <label>Validade da Proposta</label>
                    <span>15 dias corridos</span>
                </div>
                <div class="company-info-item">
                    <label>Início do Serviço</label>
                    <span>A combinar conforme disponibilidade</span>
                </div>
            </div>

            <div class="highlight-box" style="margin-top: 15px;">
                <p><strong><i class="fas fa-info-circle"></i> Observação:</strong> Os valores apresentados contemplam todos os custos de execução, incluindo deslocamento, material e certificação. Não há custos adicionais. Cronograma detalhado será apresentado após aprovação da proposta.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">04</span>
            </div>
        </div>

        <!-- ====== PÁGINA 5: RESPONSÁVEL PELA PROPOSTA ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${cfg.headerTitle}</span>
            </div>

            <h2 class="section-title">
                <span class="section-number"><i class="fas fa-user-tie"></i></span>
                <span class="section-title-text">Responsável pela Proposta</span>
            </h2>

            <p style="text-align: center; margin-bottom: 20px; color: var(--gray-color); font-size: 11px;">
                Esta proposta foi elaborada pela equipe técnica da EngMarq Solution, sob responsabilidade do profissional abaixo identificado.
            </p>

            <div class="responsible-card">
                <div class="responsible-avatar">
                    <i class="fas fa-user-tie"></i>
                </div>
                <p class="responsible-name">${dados.elaborador.nome}</p>
                <p class="responsible-role">${dados.elaborador.cargo}</p>
                <p class="responsible-company">EngMarq Solution Ltda.</p>

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
                        <span>${dados.elaborador.instagram}</span>
                    </div>
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
                <span class="page-number">05</span>
            </div>
        </div>

        <!-- ====== PÁGINA 6: TERMO DE ACEITE E ASSINATURAS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${cfg.headerTitle}</span>
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
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Nome</p>
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
                <span class="page-number">06</span>
            </div>
        </div>

        <!-- ====== PÁGINA 7: CONTATO ====== -->
        <div class="page page-contact">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${cfg.headerTitle}</span>
            </div>

            <div class="contact-content">
                <div class="contact-icon">
                    <i class="fas fa-handshake"></i>
                </div>
                <h2 class="contact-title">Fale Conosco</h2>
                <p class="contact-subtitle">
                    Estamos à disposição para dar continuidade ao processo de contratação e esclarecer eventuais dúvidas sobre os treinamentos.
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
                <span class="page-number">07</span>
            </div>
        </div>
    `;
}
