// =====================================================
// TEMPLATE DE RECIBO - ENGMARQ SOLUTION
// =====================================================

import { formatMoeda, valorPorExtenso } from '../utils/formatters';

/**
 * Interface para os dados do recibo
 */
export interface DadosRecibo {
    // Identificação
    numero: string;
    data: string;
    local: string;
    
    // Dados do Vendedor
    vendedorNome: string;
    vendedorCpf: string;
    
    // Dados do Recebimento
    valor: number;
    referencia: string;
    dataRecebimento: string;
    
    // Dados da Empresa (fixos)
    logoUrl: string;
}

/**
 * Gera o template HTML do recibo
 */
export function getTemplateRecibo(dados: DadosRecibo): string {
    const valorExtenso = valorPorExtenso(dados.valor);
    
    return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Recibo ${dados.numero} - EngMarq Solution</title>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
            <style>
                :root {
                    --primary-color: #1a365d;
                    --accent-color: #667eea;
                    --fire-color: #dd6b20;
                    --gray-color: #6b7280;
                    --dark-color: #1f2937;
                    --light-color: #f8fafc;
                    --font-primary: 'Montserrat', sans-serif;
                    --font-secondary: 'Open Sans', sans-serif;
                }
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: var(--font-secondary);
                    background: #f1f5f9;
                    color: var(--dark-color);
                    line-height: 1.6;
                }
                
                .page {
                    width: 210mm;
                    min-height: 297mm;
                    margin: 20px auto;
                    background: white;
                    padding: 25mm 20mm;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    position: relative;
                }
                
                @media print {
                    body {
                        background: white;
                    }
                    .page {
                        margin: 0;
                        box-shadow: none;
                        page-break-after: always;
                    }
                    .no-print {
                        display: none !important;
                    }
                }
                
                /* Header */
                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 20px;
                    border-bottom: 3px solid var(--primary-color);
                    margin-bottom: 30px;
                }
                
                .page-header-logo {
                    height: 80px;
                }
                
                .page-header-info {
                    text-align: right;
                    font-size: 11px;
                    color: var(--gray-color);
                }
                
                .page-header-info strong {
                    color: var(--primary-color);
                    font-size: 13px;
                }
                
                /* Título */
                .recibo-title {
                    text-align: center;
                    margin: 40px 0;
                }
                
                .recibo-title h1 {
                    font-family: var(--font-primary);
                    font-size: 32px;
                    font-weight: 800;
                    color: var(--primary-color);
                    text-transform: uppercase;
                    letter-spacing: 8px;
                    margin-bottom: 10px;
                }
                
                .recibo-numero {
                    font-size: 14px;
                    color: var(--gray-color);
                    font-weight: 500;
                }
                
                /* Seções */
                .section {
                    margin-bottom: 30px;
                }
                
                .section-title {
                    font-family: var(--font-primary);
                    font-size: 14px;
                    font-weight: 700;
                    color: var(--primary-color);
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-bottom: 15px;
                    padding-bottom: 8px;
                    border-bottom: 2px solid var(--accent-color);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .section-title i {
                    color: var(--accent-color);
                }
                
                /* Grid de dados */
                .data-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                }
                
                .data-item {
                    background: var(--light-color);
                    padding: 15px 20px;
                    border-radius: 8px;
                    border-left: 4px solid var(--accent-color);
                }
                
                .data-item.full {
                    grid-column: 1 / -1;
                }
                
                .data-label {
                    font-size: 11px;
                    color: var(--gray-color);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 5px;
                }
                
                .data-value {
                    font-size: 15px;
                    font-weight: 600;
                    color: var(--dark-color);
                }
                
                /* Box de Valor */
                .valor-box {
                    background: linear-gradient(135deg, var(--primary-color) 0%, #2c5282 100%);
                    color: white;
                    padding: 25px;
                    border-radius: 12px;
                    text-align: center;
                    margin: 30px 0;
                }
                
                .valor-label {
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    opacity: 0.9;
                    margin-bottom: 8px;
                }
                
                .valor-numero {
                    font-family: var(--font-primary);
                    font-size: 28px;
                    font-weight: 700;
                    margin-bottom: 8px;
                }
                
                .valor-extenso {
                    font-size: 12px;
                    font-style: italic;
                    opacity: 0.9;
                    padding: 8px 15px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 6px;
                    display: inline-block;
                }
                
                @media print {
                    .valor-box {
                        background: linear-gradient(135deg, var(--primary-color) 0%, #2c5282 100%) !important;
                        color: white !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                        padding: 25px !important;
                    }
                    
                    .valor-numero {
                        font-size: 28px !important;
                        font-weight: 700 !important;
                    }
                    
                    .valor-extenso {
                        background: rgba(255,255,255,0.1) !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                }
                
                /* Declaração */
                .declaracao {
                    background: var(--light-color);
                    padding: 25px 30px;
                    border-radius: 10px;
                    margin: 30px 0;
                    border: 1px solid #e2e8f0;
                }
                
                .declaracao p {
                    font-size: 14px;
                    line-height: 1.8;
                    text-align: justify;
                }
                
                .declaracao strong {
                    color: var(--primary-color);
                }
                
                /* Assinaturas */
                .assinaturas {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 60px;
                    margin-top: 60px;
                    padding-top: 30px;
                }
                
                .assinatura-box {
                    text-align: center;
                }
                
                .assinatura-linha {
                    border-top: 2px solid var(--dark-color);
                    padding-top: 10px;
                    margin-top: 60px;
                }
                
                .assinatura-nome {
                    font-weight: 600;
                    font-size: 14px;
                    color: var(--dark-color);
                    margin-bottom: 3px;
                }
                
                .assinatura-cargo {
                    font-size: 12px;
                    color: var(--gray-color);
                }
                
                .assinatura-doc {
                    font-size: 11px;
                    color: var(--gray-color);
                    margin-top: 5px;
                }
                
                /* Local e Data */
                .local-data {
                    text-align: center;
                    margin-top: 50px;
                    font-size: 14px;
                    color: var(--gray-color);
                }
                
                /* Rodapé */
                .page-footer {
                    position: absolute;
                    bottom: 15mm;
                    left: 20mm;
                    right: 20mm;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 15px;
                    border-top: 1px solid #e2e8f0;
                    font-size: 10px;
                    color: var(--gray-color);
                }
                
                .footer-info {
                    display: flex;
                    gap: 15px;
                }
                
                .footer-info span {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                
                .footer-info i {
                    color: var(--accent-color);
                }
            </style>
        </head>
        <body>
            <div class="page">
                <!-- Header -->
                <div class="page-header">
                    <img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                    <div class="page-header-info">
                        <strong>ENGMARQ SOLUTION LTDA</strong><br>
                        CNPJ: 60.545.359/0001-76<br>
                        Natal - RN
                    </div>
                </div>
                
                <!-- Título -->
                <div class="recibo-title">
                    <h1><i class="fas fa-file-invoice-dollar"></i> Recibo</h1>
                    <p class="recibo-numero">Nº ${dados.numero}</p>
                </div>
                
                <!-- Dados do Vendedor -->
                <div class="section">
                    <h3 class="section-title"><i class="fas fa-user"></i> Dados do Beneficiário</h3>
                    <div class="data-grid">
                        <div class="data-item">
                            <p class="data-label">Nome Completo</p>
                            <p class="data-value">${dados.vendedorNome}</p>
                        </div>
                        <div class="data-item">
                            <p class="data-label">CPF</p>
                            <p class="data-value">${dados.vendedorCpf}</p>
                        </div>
                    </div>
                </div>
                
                <!-- Dados do Recebimento -->
                <div class="section">
                    <h3 class="section-title"><i class="fas fa-hand-holding-usd"></i> Dados do Recebimento</h3>
                    <div class="data-grid">
                        <div class="data-item">
                            <p class="data-label">Referência do Pagamento</p>
                            <p class="data-value">${dados.referencia}</p>
                        </div>
                        <div class="data-item">
                            <p class="data-label">Data do Recebimento</p>
                            <p class="data-value">${dados.dataRecebimento}</p>
                        </div>
                    </div>
                </div>
                
                <!-- Valor -->
                <div class="valor-box">
                    <p class="valor-label">Valor Recebido</p>
                    <p class="valor-numero">R$ ${formatMoeda(dados.valor)}</p>
                    <p class="valor-extenso">(${valorExtenso})</p>
                </div>
                
                <!-- Declaração -->
                <div class="declaracao">
                    <p>
                        Eu, <strong>${dados.vendedorNome}</strong>, inscrito(a) no CPF sob o nº <strong>${dados.vendedorCpf}</strong>, 
                        declaro para os devidos fins que recebi da empresa <strong>ENGMARQ SOLUTION LTDA</strong>, 
                        inscrita no CNPJ sob o nº <strong>60.545.359/0001-76</strong>, a quantia de 
                        <strong>R$ ${formatMoeda(dados.valor)} (${valorExtenso})</strong>, 
                        referente a <strong>${dados.referencia}</strong>, dando plena, geral e irrevogável quitação 
                        do valor acima descrito, nada mais havendo a reclamar a qualquer título.
                    </p>
                </div>
                
                <!-- Local e Data -->
                <div class="local-data">
                    <p>${dados.local}, ${dados.data}</p>
                </div>
                
                <!-- Assinaturas -->
                <div class="assinaturas">
                    <div class="assinatura-box">
                        <div class="assinatura-linha">
                            <p class="assinatura-nome">${dados.vendedorNome}</p>
                            <p class="assinatura-cargo">Beneficiário</p>
                            <p class="assinatura-doc">CPF: ${dados.vendedorCpf}</p>
                        </div>
                    </div>
                    <div class="assinatura-box">
                        <div class="assinatura-linha">
                            <p class="assinatura-nome">EngMarq Solution LTDA</p>
                            <p class="assinatura-cargo">Diretor</p>
                            <p class="assinatura-doc">CNPJ: 60.545.359/0001-76</p>
                        </div>
                    </div>
                </div>
                
                <!-- Rodapé -->
                <div class="page-footer">
                    <div class="footer-info">
                        <span><i class="fas fa-envelope"></i> engmarqsolution@gmail.com</span>
                        <span><i class="fas fa-phone"></i> +55 84 99928-5888</span>
                        <span><i class="fab fa-instagram"></i> @engmarq_solution</span>
                    </div>
                    <span>Documento gerado em ${dados.data}</span>
                </div>
            </div>
            
            <!-- Botão de Impressão -->
            <div class="no-print" style="text-align: center; padding: 20px;">
                <button onclick="window.print()" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 15px 40px;
                    font-size: 16px;
                    font-weight: 600;
                    border-radius: 8px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                ">
                    <i class="fas fa-print"></i> Imprimir Recibo
                </button>
            </div>
        </body>
        </html>
    `;
}
