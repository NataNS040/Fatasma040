// =====================================================
// TEMPLATE TREINAMENTOS EM SST - COMPLETO
// =====================================================

import { DadosTemplate, TreinamentoSelecionado } from '../types/proposta.types';
import { formatMoeda } from '../utils/formatters';

/**
 * Configuração específica do template de Treinamentos
 */
interface TreinamentosConfig {
    color: string;
    headerTitle: string;
}

/**
 * Cores por tipo de treinamento para melhor visualização
 */
const coresTreinamentos: Record<string, { bg: string; border: string; icon: string }> = {
    nr10: { bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '#f59e0b', icon: '#d97706' },
    nr12: { bg: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', border: '#6366f1', icon: '#4f46e5' },
    nr33: { bg: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)', border: '#ec4899', icon: '#db2777' },
    nr35: { bg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', border: '#3b82f6', icon: '#2563eb' },
    brigada: { bg: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', border: '#ef4444', icon: '#dc2626' },
    cipa: { bg: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', border: '#10b981', icon: '#059669' },
    'primeiros-socorros': { bg: 'linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%)', border: '#f43f5e', icon: '#e11d48' }
};

/**
 * Gera o HTML de um card de treinamento com visual melhorado (compacto para caber na página)
 */
function gerarCardTreinamento(treinamento: TreinamentoSelecionado): string {
    const cores = coresTreinamentos[treinamento.id] || { bg: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', border: '#64748b', icon: '#475569' };
    
    return `
        <div style="
            background: ${cores.bg};
            border-radius: 10px;
            padding: 12px;
            border-left: 4px solid ${cores.border};
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            position: relative;
            overflow: hidden;
            page-break-inside: avoid;
        ">
            <!-- Ícone decorativo de fundo -->
            <div style="
                position: absolute;
                right: -5px;
                top: -5px;
                font-size: 50px;
                opacity: 0.06;
                color: ${cores.border};
            ">
                <i class="${treinamento.icon}"></i>
            </div>
            
            <!-- Cabeçalho do card -->
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px; position: relative; z-index: 1;">
                <div style="
                    width: 32px;
                    height: 32px;
                    background: white;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
                    flex-shrink: 0;
                ">
                    <i class="${treinamento.icon}" style="font-size: 14px; color: ${cores.icon};"></i>
                </div>
                <h4 style="
                    margin: 0;
                    font-family: 'Montserrat', sans-serif;
                    font-size: 11px;
                    font-weight: 700;
                    color: #1e293b;
                    line-height: 1.2;
                ">${treinamento.nome}</h4>
            </div>
            
            <!-- Descrição -->
            <p style="
                margin: 0 0 8px 0;
                font-size: 9px;
                color: #475569;
                line-height: 1.4;
                position: relative;
                z-index: 1;
            ">${treinamento.descricao}</p>
            
            <!-- Badges de informação -->
            <div style="display: flex; gap: 6px; flex-wrap: wrap; position: relative; z-index: 1;">
                ${treinamento.cargaHoraria ? `
                <div style="
                    background: white;
                    padding: 3px 8px;
                    border-radius: 12px;
                    font-size: 9px;
                    font-weight: 600;
                    color: ${cores.icon};
                    display: flex;
                    align-items: center;
                    gap: 3px;
                ">
                    <i class="fas fa-clock" style="font-size: 8px;"></i>
                    ${treinamento.cargaHoraria}
                </div>
                ` : ''}
                ${treinamento.qtdTurmas ? `
                <div style="
                    background: white;
                    padding: 3px 8px;
                    border-radius: 12px;
                    font-size: 9px;
                    font-weight: 600;
                    color: ${cores.icon};
                    display: flex;
                    align-items: center;
                    gap: 3px;
                ">
                    <i class="fas fa-users" style="font-size: 8px;"></i>
                    ${treinamento.qtdTurmas} turma${treinamento.qtdTurmas > 1 ? 's' : ''}
                </div>
                ` : ''}
            </div>
        </div>
    `;
}

/**
 * Gera os cards de treinamento a partir dos selecionados ou usa os cards padrão
 */
function gerarCardsEscopo(treinamentos?: TreinamentoSelecionado[]): string {
    // Se houver treinamentos selecionados, gera dinamicamente
    if (treinamentos && treinamentos.length > 0) {
        const cards = treinamentos.map(t => gerarCardTreinamento(t)).join('');
        return `
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                ${cards}
            </div>
        `;
    }
    
    // Fallback: cards padrão para retrocompatibilidade (com visual melhorado)
    const treinamentosPadrao: TreinamentoSelecionado[] = [
        { id: 'nr10', nome: 'NR-10 - Segurança em Eletricidade', icon: 'fas fa-bolt', descricao: 'Capacitação em Segurança em Instalações e Serviços em Eletricidade para profissionais que interagem com instalações elétricas.', cargaHoraria: '40h', qtdTurmas: 1 },
        { id: 'nr12', nome: 'NR-12 - Segurança em Máquinas', icon: 'fas fa-cogs', descricao: 'Capacitação para operação segura de máquinas e equipamentos, abordando riscos mecânicos, dispositivos de proteção e procedimentos seguros.', cargaHoraria: '16h', qtdTurmas: 1 },
        { id: 'nr33', nome: 'NR-33 - Espaço Confinado', icon: 'fas fa-hard-hat', descricao: 'Formação para trabalhos em espaços confinados, incluindo reconhecimento, avaliação e controle de riscos, procedimentos de emergência e resgate.', cargaHoraria: '16h', qtdTurmas: 1 },
        { id: 'nr35', nome: 'NR-35 - Trabalho em Altura', icon: 'fas fa-arrow-up', descricao: 'Habilitação para atividades executadas acima de 2 metros do piso, com técnicas de acesso, sistemas de proteção e resgate.', cargaHoraria: '8h', qtdTurmas: 1 },
        { id: 'brigada', nome: 'Brigada de Incêndio', icon: 'fas fa-fire-extinguisher', descricao: 'Formação de brigadistas conforme Instrução Técnica do CBMRN. Inclui teoria e prática de prevenção e combate a princípios de incêndio, primeiros socorros e evacuação.', cargaHoraria: '8h', qtdTurmas: 1 }
    ];
    
    const cards = treinamentosPadrao.map(t => gerarCardTreinamento(t)).join('');
    return `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
            ${cards}
        </div>
    `;
}

/**
 * Gera a tabela de detalhamento dos treinamentos com visual compacto
 */
function gerarTabelaTreinamentos(treinamentos?: TreinamentoSelecionado[]): string {
    if (!treinamentos || treinamentos.length === 0) {
        return '';
    }
    
    const cores = coresTreinamentos;
    
    const rows = treinamentos.map((t, index) => {
        const corTreinamento = cores[t.id] || { bg: '#f1f5f9', border: '#64748b', icon: '#475569' };
        return `
            <tr style="background: ${index % 2 === 0 ? 'white' : '#f8fafc'};">
                <td style="padding: 10px 8px; border-bottom: 1px solid #e2e8f0;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="
                            width: 28px;
                            height: 28px;
                            background: ${corTreinamento.bg};
                            border-radius: 6px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex-shrink: 0;
                        ">
                            <i class="${t.icon}" style="font-size: 12px; color: ${corTreinamento.icon};"></i>
                        </div>
                        <span style="font-weight: 600; color: #1e293b; font-size: 11px;">${t.nome}</span>
                    </div>
                </td>
                <td style="padding: 10px 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">
                    <span style="
                        background: #f1f5f9;
                        padding: 3px 8px;
                        border-radius: 10px;
                        font-size: 10px;
                        font-weight: 600;
                        color: #475569;
                    ">${t.cargaHoraria || '-'}</span>
                </td>
                <td style="padding: 10px 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">
                    <span style="
                        background: #f1f5f9;
                        padding: 3px 8px;
                        border-radius: 10px;
                        font-size: 10px;
                        font-weight: 600;
                        color: #475569;
                    ">${t.qtdTurmas || 1}</span>
                </td>
                <td style="padding: 10px 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="
                        font-family: 'Montserrat', sans-serif;
                        font-weight: 700;
                        font-size: 12px;
                        color: #1e293b;
                    ">R$ ${formatMoeda(t.valor || 0)}</span>
                </td>
            </tr>
        `;
    }).join('');
    
    const total = treinamentos.reduce((acc, t) => acc + (t.valor || 0), 0);
    
    return `
        <div style="
            overflow: hidden;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            border: 1px solid #e2e8f0;
        ">
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                <thead>
                    <tr style="background: linear-gradient(135deg, var(--primary-color) 0%, #1e40af 100%);">
                        <th style="padding: 10px 8px; text-align: left; color: white; font-weight: 600; font-size: 10px;">
                            <i class="fas fa-graduation-cap" style="margin-right: 5px;"></i>Treinamento
                        </th>
                        <th style="padding: 10px 8px; text-align: center; color: white; font-weight: 600; font-size: 10px;">
                            <i class="fas fa-clock" style="margin-right: 5px;"></i>Carga
                        </th>
                        <th style="padding: 10px 8px; text-align: center; color: white; font-weight: 600; font-size: 10px;">
                            <i class="fas fa-users" style="margin-right: 5px;"></i>Turmas
                        </th>
                        <th style="padding: 10px 8px; text-align: right; color: white; font-weight: 600; font-size: 10px;">
                            <i class="fas fa-tag" style="margin-right: 5px;"></i>Valor
                        </th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
                <tfoot>
                    <tr style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);">
                        <td colspan="3" style="padding: 12px 8px; text-align: right; font-weight: 700; font-size: 12px; color: #475569; text-transform: uppercase;">
                            Valor Total
                        </td>
                        <td style="padding: 12px 8px; text-align: right;">
                            <span style="
                                font-family: 'Montserrat', sans-serif;
                                font-weight: 800;
                                font-size: 14px;
                                color: var(--accent-color);
                            ">R$ ${formatMoeda(total)}</span>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    `;
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
    _valorFinal: number,
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

            <!-- Cards de Treinamento em Grid -->
            ${gerarCardsEscopo(dados.treinamentos)}

            ${dados.treinamentos && dados.treinamentos.some(t => t.id === 'brigada') ? `
            <div style="
                border-left: 4px solid #e53e3e;
                background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%);
                margin-top: 12px;
                padding: 10px 12px;
                border-radius: 8px;
                font-size: 10px;
            ">
                <p style="margin: 0;"><strong><i class="fas fa-exclamation-triangle" style="color: #e53e3e;"></i> Nota:</strong> Material de combate a incêndio será fornecido pela contratante, salvo acordo prévio.</p>
            </div>
            ` : ''}

            <div style="margin-top: 15px;">
                <h3 class="subsection-title" style="margin-bottom: 8px;"><i class="fas fa-clipboard-list"></i> Metodologia</h3>
                <p style="font-size: 10px; color: #475569; margin: 0; line-height: 1.5;">
                    Os treinamentos podem ser realizados em <strong>turmas personalizadas</strong>, respeitando a disponibilidade da empresa. Datas e horários serão acordados previamente.
                </p>
            </div>

            <div style="margin-top: 12px;">
                <h3 class="subsection-title" style="margin-bottom: 8px;"><i class="fas fa-certificate"></i> Certificação</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; font-size: 10px;">
                    <div style="display: flex; align-items: center; gap: 6px; color: #475569;">
                        <i class="fas fa-check-circle" style="color: #10b981; font-size: 10px;"></i>
                        <span>Certificados com validade legal</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px; color: #475569;">
                        <i class="fas fa-check-circle" style="color: #10b981; font-size: 10px;"></i>
                        <span>Lista de presença assinada</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px; color: #475569;">
                        <i class="fas fa-check-circle" style="color: #10b981; font-size: 10px;"></i>
                        <span>Registro fotográfico (opcional)</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px; color: #475569;">
                        <i class="fas fa-check-circle" style="color: #10b981; font-size: 10px;"></i>
                        <span>Conteúdo programático</span>
                    </div>
                </div>
            </div>

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

            ${gerarTabelaTreinamentos(dados.treinamentos)}

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 15px;">
                <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 12px; border-radius: 10px; border-left: 4px solid #10b981;">
                    <h4 style="margin: 0 0 8px 0; font-size: 11px; color: #059669;"><i class="fas fa-star"></i> Benefícios Inclusos</h4>
                    <p style="margin: 0; font-size: 9px; color: #475569; line-height: 1.5;">
                        • Instrutores especializados<br>
                        • Certificados com validade legal<br>
                        • Material didático incluso
                    </p>
                </div>
                <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); padding: 12px; border-radius: 10px; border-left: 4px solid #3b82f6;">
                    <h4 style="margin: 0 0 8px 0; font-size: 11px; color: #2563eb;"><i class="fas fa-credit-card"></i> Condições de Pagamento</h4>
                    <p style="margin: 0; font-size: 9px; color: #475569; line-height: 1.5;">
                        • PIX ou Transferência Bancária<br>
                        • 50% fechamento | 50% conclusão<br>
                        • Validade: 15 dias
                    </p>
                </div>
            </div>

            <div style="
                margin-top: 12px;
                padding: 10px 12px;
                background: #fefce8;
                border-left: 4px solid #eab308;
                border-radius: 8px;
                font-size: 9px;
                color: #713f12;
            ">
                <p style="margin: 0;"><strong><i class="fas fa-info-circle"></i> Observação:</strong> Valores contemplam todos os custos (deslocamento, material, certificação). Cronograma detalhado após aprovação.</p>
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
