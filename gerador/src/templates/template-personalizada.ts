// =====================================================
// TEMPLATE PROPOSTA PERSONALIZADA - CUSTOMIZÁVEL
// Modelo: 5 páginas (Capa, Empresa+SST, Orçamento, Contato, Assinatura)
// =====================================================

import { DadosTemplate, ItemPersonalizado, EmpresaGrupo } from '../types/proposta.types';
import { formatMoeda } from '../utils/formatters';

/**
 * Gera HTML para uma empresa do grupo
 */
function gerarEmpresaGrupoHTML(empresa: EmpresaGrupo, index: number): string {
    return `
        <div style="background: var(--light-color); border-radius: 10px; padding: 15px; margin-bottom: 12px; border-left: 4px solid var(--accent-color);">
            <h4 style="font-family: var(--font-primary); font-size: 13px; color: var(--accent-color); margin-bottom: 10px;">
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
 * Gera a seção de empresa (individual ou grupo)
 */
function gerarSecaoEmpresas(dados: DadosTemplate): string {
    if (dados.isGrupo && dados.empresasGrupo && dados.empresasGrupo.length > 0) {
        const empresasHTML = dados.empresasGrupo.map((emp, i) => gerarEmpresaGrupoHTML(emp, i)).join('');
        
        return `
            <div class="info-box" style="margin-bottom: 15px; background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); border-left-color: var(--accent-color);">
                <h4 style="color: var(--accent-color);"><i class="fas fa-layer-group"></i> Proposta para Grupo: ${dados.nomeGrupo || dados.razaoSocial}</h4>
                <p>Esta proposta abrange <strong>${dados.empresasGrupo.length} empresas</strong> do grupo.</p>
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
 * Gera a tabela de itens personalizados do orçamento
 */
function gerarTabelaItens(itens: ItemPersonalizado[], valorOriginal: number, valorFinal: number, perc: number, temDesconto: boolean): string {
    if (!itens || itens.length === 0) {
        return `
            <div class="info-box" style="text-align: center;">
                <p><i class="fas fa-exclamation-triangle" style="color: var(--secondary-color);"></i> Nenhum item foi adicionado ao orçamento.</p>
            </div>
        `;
    }

    const linhasItens = itens.map((item, index) => `
        <tr style="background: ${index % 2 === 0 ? 'white' : '#f7fafc'}; border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px 12px; font-size: 11px; border: 1px solid #cbd5e0; text-align: center; font-weight: 600; color: var(--primary-color);">${String(index + 1).padStart(2, '0')}</td>
            <td style="padding: 10px 12px; font-size: 11px; border: 1px solid #cbd5e0;">${item.descricao}</td>
            <td style="padding: 10px 12px; font-size: 11px; border: 1px solid #cbd5e0; text-align: center;">${item.quantidade}</td>
            <td style="padding: 10px 12px; font-size: 11px; border: 1px solid #cbd5e0; text-align: right;">R$ ${formatMoeda(item.valorUnitario)}</td>
            <td style="padding: 10px 12px; font-size: 11px; border: 1px solid #cbd5e0; text-align: right; font-weight: 600;">R$ ${formatMoeda(item.valorTotal)}</td>
        </tr>
    `).join('');

    let descontoRow = '';
    if (temDesconto && perc > 0) {
        descontoRow = `
            <tr style="background: #f0fff4;">
                <td colspan="4" style="padding: 8px 12px; font-size: 11px; border: 1px solid #cbd5e0; text-align: right; color: #38a169; font-weight: 600;">
                    <i class="fas fa-tag"></i> Desconto (${perc}%)
                </td>
                <td style="padding: 8px 12px; font-size: 11px; border: 1px solid #cbd5e0; text-align: right; color: #38a169; font-weight: 600;">
                    - R$ ${formatMoeda(valorOriginal - valorFinal)}
                </td>
            </tr>
        `;
    }

    return `
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0; border: 1px solid #cbd5e0;">
            <thead>
                <tr style="background: var(--primary-color); color: white;">
                    <th style="padding: 10px 12px; text-align: center; font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 600; border: 1px solid var(--primary-color); width: 50px;">Item</th>
                    <th style="padding: 10px 12px; text-align: left; font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 600; border: 1px solid var(--primary-color);">Descrição</th>
                    <th style="padding: 10px 12px; text-align: center; font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 600; border: 1px solid var(--primary-color); width: 60px;">Qtd.</th>
                    <th style="padding: 10px 12px; text-align: right; font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 600; border: 1px solid var(--primary-color); width: 110px;">Valor Unit.</th>
                    <th style="padding: 10px 12px; text-align: right; font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 600; border: 1px solid var(--primary-color); width: 110px;">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                ${linhasItens}
                ${descontoRow}
            </tbody>
            <tfoot>
                <tr style="background: var(--primary-color); color: white;">
                    <td colspan="4" style="padding: 12px; font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 700; border: 1px solid var(--primary-color);">
                        <i class="fas fa-calculator"></i> INVESTIMENTO TOTAL
                    </td>
                    <td style="padding: 12px; text-align: right; font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 700; border: 1px solid var(--primary-color);">
                        R$ ${formatMoeda(valorFinal)}
                    </td>
                </tr>
            </tfoot>
        </table>
    `;
}

/**
 * Gera o template HTML completo para proposta Personalizada
 * Modelo com 5 páginas (Capa, Empresa+SST, Orçamento, Contato, Assinatura)
 */
export function getTemplatePersonalizada(
    dados: DadosTemplate,
    valorOriginal: number,
    valorFinal: number,
    perc: number,
    temDesconto: boolean
): string {
    const nomeFantasia = dados.razaoSocial;
    const itens = dados.itensPersonalizada || [];

    return `
        <!-- ====== PÁGINA 1: CAPA ====== -->
        <div class="page page-cover">
            <span style="position: absolute; top: 25mm; left: 0; right: 0; text-align: center; font-family: var(--font-primary); font-size: 14px; font-weight: 700; color: var(--secondary-color); letter-spacing: 3px;">${dados.numero}</span>
            
            <img src="${dados.logoUrl}" alt="EngMarq Solution" class="cover-logo">
            
            <span class="cover-badge">
                <i class="fas fa-file-invoice"></i>
                Proposta Personalizada
            </span>

            <div class="cover-icon">
                <i class="fas fa-file-invoice"></i>
            </div>

            <h1 class="cover-title">
                Proposta Comercial<br>
                <span>Serviços Personalizados</span>
            </h1>
            <p class="cover-subtitle">
                Soluções sob medida em Segurança e Saúde do Trabalho para atender às necessidades da sua empresa
            </p>
            
            <div class="cover-client">
                <p class="cover-client-label">Proposta elaborada para</p>
                <p class="cover-client-name">${nomeFantasia}</p>
            </div>

            <p class="cover-date">
                <i class="far fa-calendar-alt" style="margin-right: 6px;"></i>${dados.data}
            </p>
            <p class="cover-footer">EngMarq Solution | Engenharia de Segurança e Saúde do Trabalho | Natal - RN</p>
        </div>

        <!-- ====== PÁGINA 2: EMPRESA + RESUMO SST ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Personalizada</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">1</span>
                <span class="section-title-text">Informações da Empresa</span>
            </h2>

            ${gerarSecaoEmpresas(dados)}

            <h2 class="section-title" style="margin-top: 30px;">
                <span class="section-number">2</span>
                <span class="section-title-text">Quem Somos</span>
            </h2>

            <p style="text-align: justify; line-height: 1.8; margin-bottom: 15px;">
                A <strong>EngMarq Solution</strong> é uma empresa especializada em <strong>Engenharia de Segurança e Saúde do Trabalho (SST)</strong>, atuando com soluções completas para adequação legal e proteção dos colaboradores.
            </p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
                <div style="background: var(--light-color); border-radius: 10px; padding: 15px; border-left: 4px solid var(--accent-color);">
                    <h4 style="font-family: var(--font-primary); font-size: 12px; color: var(--accent-color); margin-bottom: 8px;">
                        <i class="fas fa-file-medical-alt" style="margin-right: 6px;"></i>Documentação SST
                    </h4>
                    <p style="font-size: 11px; margin: 0; color: var(--gray-color);">PGR, PCMSO, LTCAT, PPP, Laudos Técnicos e toda documentação exigida pelas Normas Regulamentadoras.</p>
                </div>
                <div style="background: var(--light-color); border-radius: 10px; padding: 15px; border-left: 4px solid var(--accent-color);">
                    <h4 style="font-family: var(--font-primary); font-size: 12px; color: var(--accent-color); margin-bottom: 8px;">
                        <i class="fas fa-chalkboard-teacher" style="margin-right: 6px;"></i>Treinamentos
                    </h4>
                    <p style="font-size: 11px; margin: 0; color: var(--gray-color);">NR-10, NR-12, NR-33, NR-35, Brigada de Incêndio, CIPA, Primeiros Socorros e outros.</p>
                </div>
                <div style="background: var(--light-color); border-radius: 10px; padding: 15px; border-left: 4px solid var(--accent-color);">
                    <h4 style="font-family: var(--font-primary); font-size: 12px; color: var(--accent-color); margin-bottom: 8px;">
                        <i class="fas fa-brain" style="margin-right: 6px;"></i>Riscos Psicossociais
                    </h4>
                    <p style="font-size: 11px; margin: 0; color: var(--gray-color);">Avaliação dos Fatores de Riscos Psicossociais conforme atualização da NR-01 do Ministério do Trabalho.</p>
                </div>
                <div style="background: var(--light-color); border-radius: 10px; padding: 15px; border-left: 4px solid var(--accent-color);">
                    <h4 style="font-family: var(--font-primary); font-size: 12px; color: var(--accent-color); margin-bottom: 8px;">
                        <i class="fas fa-shield-alt" style="margin-right: 6px;"></i>Assessoria em SST
                    </h4>
                    <p style="font-size: 11px; margin: 0; color: var(--gray-color);">Gestão completa de SST, acompanhamento técnico, fiscalizações e conformidade legal permanente.</p>
                </div>
            </div>

            <div class="info-box">
                <h4><i class="fas fa-award"></i> Compromisso com a Qualidade</h4>
                <p>Todos os serviços são executados por profissionais habilitados, seguindo as melhores práticas do mercado e em total conformidade com a legislação vigente.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">02</span>
            </div>
        </div>

        <!-- ====== PÁGINA 3: ORÇAMENTO / INVESTIMENTO ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Personalizada</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">3</span>
                <span class="section-title-text">Investimento</span>
            </h2>

            <p style="margin-bottom: 15px; color: var(--gray-color);">
                Detalhamento dos serviços e valores propostos para <strong>${nomeFantasia}</strong>.
            </p>

            ${gerarTabelaItens(itens, valorOriginal, valorFinal, perc, temDesconto)}

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
                <div style="background: linear-gradient(135deg, var(--primary-color) 0%, #2a4a7f 100%); color: white; border-radius: 12px; padding: 20px; text-align: center;">
                    <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; opacity: 0.8;">Investimento Total</p>
                    <p style="font-size: 24px; font-weight: 800; font-family: var(--font-primary); margin: 0;">R$ ${formatMoeda(valorFinal)}</p>
                    ${temDesconto && perc > 0 ? `<p style="font-size: 11px; margin-top: 5px; opacity: 0.8;"><s>R$ ${formatMoeda(valorOriginal)}</s> · ${perc}% de desconto</p>` : ''}
                </div>
                <div style="background: var(--light-color); border-radius: 12px; padding: 20px; display: flex; flex-direction: column; justify-content: center;">
                    <h4 style="font-family: var(--font-primary); font-size: 12px; color: var(--primary-color); margin-bottom: 8px;">
                        <i class="fas fa-info-circle"></i> Condições
                    </h4>
                    <ul style="font-size: 11px; margin: 0; padding-left: 18px; color: var(--gray-color); line-height: 1.8;">
                        <li>Validade da proposta: <strong>15 dias</strong></li>
                        <li>Pagamento conforme negociação</li>
                        <li>Início após aprovação formal</li>
                    </ul>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">03</span>
            </div>
        </div>

        <!-- ====== PÁGINA 4: CONTATO / RESPONSÁVEL ====== -->
        <div class="page page-contact">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Personalizada</span>
            </div>

            <div class="contact-content">
                <div class="contact-icon">
                    <i class="fas fa-handshake"></i>
                </div>
                <h2 class="contact-title">Conte com a EngMarq Solution</h2>
                <p class="contact-subtitle">
                    Nossa equipe técnica está à disposição para esclarecer dúvidas, ajustar o escopo dos serviços e acompanhar todo o processo de execução. <strong>Fale conosco!</strong>
                </p>

                <div class="responsible-card" style="margin: 25px auto; max-width: 400px;">
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

                <div class="contact-info">
                    <div class="contact-item"><i class="fab fa-whatsapp"></i><span>+55 84 99928-5888</span></div>
                    <div class="contact-item"><i class="fas fa-envelope"></i><span>engmarqsolution@gmail.com</span></div>
                    <div class="contact-item"><i class="fas fa-map-marker-alt"></i><span>Natal - RN</span></div>
                </div>

                <div class="contact-signature">
                    <p class="signature-text">
                        <strong>EngMarq Solution</strong><br>
                        Engenharia de Segurança e Saúde do Trabalho<br>
                        <em>Segurança, conformidade e tranquilidade para sua empresa.</em>
                    </p>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">04</span>
            </div>
        </div>

        <!-- ====== PÁGINA 5: TERMO DE ACEITE E ASSINATURAS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Personalizada</span>
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
                <span class="page-number">05</span>
            </div>
        </div>
    `;
}
