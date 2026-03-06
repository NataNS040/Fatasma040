// =====================================================
// GERADOR DE HTML DO CONTRATO
// =====================================================

import { DadosContrato, getTemplateContrato } from '../templates/template-contrato';
import { formatData } from '../utils/formatters';
import logoEngmarq from '../../assets/logoengmarq.png';

/**
 * Retorna os estilos CSS do contrato para impressão
 */
function getContratoStyles(): string {
    return `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        :root {
            --primary-color: #1a365d;
            --secondary-color: #f5a623;
            --dark-color: #2d3748;
            --gray-color: #718096;
            --light-color: #f7fafc;
            --white-color: #ffffff;
            --font-primary: 'Montserrat', sans-serif;
            --font-secondary: 'Open Sans', sans-serif;
        }
        
        body {
            font-family: var(--font-secondary);
            color: var(--dark-color);
            line-height: 1.7;
            background: #e2e8f0;
        }
        
        /* Controles de PDF */
        .pdf-controls {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 25px rgba(0,0,0,0.15);
            max-width: 280px;
        }
        .btn-generate {
            background: var(--primary-color);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 8px;
            font-family: var(--font-primary);
            font-weight: 600;
            font-size: 15px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
            width: 100%;
            justify-content: center;
        }
        .btn-generate:hover {
            background: var(--secondary-color);
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .pdf-instructions {
            margin-top: 15px;
            padding: 15px;
            background: #f0f9ff;
            border-radius: 8px;
            border-left: 4px solid var(--primary-color);
        }
        .pdf-instructions h4 {
            font-family: var(--font-primary);
            font-size: 13px;
            color: var(--primary-color);
            margin-bottom: 8px;
        }
        .pdf-instructions ol {
            font-size: 12px;
            line-height: 1.6;
            color: var(--dark-color);
            padding-left: 18px;
            margin: 0;
        }
        .pdf-instructions li { margin-bottom: 4px; }
        .pdf-instructions strong { color: var(--secondary-color); }
        
        /* Container PDF */
        #pdf-content {
            width: 210mm;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 30px rgba(0,0,0,0.1);
        }
        
        /* Página A4 */
        .page {
            width: 210mm;
            min-height: 297mm;
            padding: 20mm 25mm 25mm 25mm;
            page-break-after: always;
            position: relative;
            background: var(--white-color);
            box-sizing: border-box;
        }
        .page:last-child { page-break-after: auto; }
        .page-anexo { padding-top: 20mm; }
        
        /* Cabeçalho do contrato */
        .contrato-header {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--primary-color);
        }
        .contrato-logo {
            height: 45px;
        }
        
        /* Título do contrato */
        .contrato-titulo {
            font-family: var(--font-primary);
            font-size: 15px;
            font-weight: 700;
            color: var(--primary-color);
            text-align: center;
            margin: 20px 0 25px;
            line-height: 1.5;
        }
        
        /* Cláusulas */
        h3 {
            font-family: var(--font-primary);
            font-size: 12px;
            font-weight: 700;
            color: var(--primary-color);
            margin: 20px 0 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        p {
            font-size: 11px;
            line-height: 1.7;
            text-align: justify;
            margin-bottom: 8px;
        }
        
        .item-lista {
            padding-left: 20px;
            margin-bottom: 4px;
        }
        
        /* Dados bancários */
        .dados-bancarios {
            background: var(--light-color);
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 12px 16px;
            margin: 12px 0;
        }
        .dados-bancarios p {
            margin-bottom: 2px;
            font-size: 10px;
            line-height: 1.5;
        }
        
        /* Assinaturas */
        .contrato-assinaturas {
            margin-top: 40px;
        }
        .contrato-local-data {
            text-align: center;
            font-weight: 600;
            margin-bottom: 40px;
        }
        .assinatura-bloco {
            text-align: center;
            margin-bottom: 40px;
        }
        .assinatura-label {
            font-weight: 700;
            font-size: 11px;
            margin-bottom: 30px;
        }
        .assinatura-linha {
            border-bottom: 1px solid var(--dark-color);
            max-width: 350px;
            margin: 0 auto 5px;
            height: 1px;
        }
        .assinatura-nome {
            font-weight: 600;
            font-size: 11px;
            margin-bottom: 2px;
        }
        .assinatura-cargo {
            font-size: 10px;
            color: var(--gray-color);
        }
        
        /* ====== PRINT ====== */
        @media print {
            body { background: white; margin: 0; padding: 0; }
            .pdf-controls { display: none !important; }
            #pdf-content { width: 100%; margin: 0; box-shadow: none; }
            .page {
                width: 210mm;
                min-height: 297mm;
                padding: 20mm 25mm 25mm 25mm;
                page-break-after: always;
                margin: 0;
            }
            .page:last-child { page-break-after: auto; }
        }
        
        @page {
            size: A4;
            margin: 0;
        }
    `;
}

/**
 * Gera o HTML completo do contrato com estilos e scripts
 */
export function gerarHTMLContrato(dadosForm: any): string {
    // Montar dados do contrato
    const dados: DadosContrato = {
        tipo: dadosForm.tipo,
        razaoSocial: dadosForm.razaoSocial,
        cnpj: dadosForm.cnpj,
        endereco: dadosForm.endereco,
        cidade: dadosForm.cidade || 'Natal',
        uf: dadosForm.uf || 'RN',
        representante: dadosForm.representante || '',
        qtdColaboradores: dadosForm.qtdColaboradores || '',
        qtdFuncoes: dadosForm.qtdFuncoes || '',
        qtdTurmas: dadosForm.qtdTurmas || '',
        qtdAlunos: dadosForm.qtdAlunos || '',
        qtdPavimentos: dadosForm.qtdPavimentos || '',
        cargaHoraria: dadosForm.cargaHoraria || '',
        treinamentoNome: dadosForm.treinamentoNome || '',
        normaReferencia: dadosForm.normaReferencia || '',
        conteudoProgramatico: dadosForm.conteudoProgramatico || [],
        valor: dadosForm.valor || 0,
        formaPagamento: dadosForm.formaPagamento || 'parcelado',
        parcelas: dadosForm.parcelas || [],
        prazoExecucao: dadosForm.prazoExecucao || '',
        prazoAviso: dadosForm.prazoAviso || '15 (quinze)',
        dataContrato: formatData(dadosForm.dataContrato),
        funcoes: dadosForm.funcoes || [],
        escopoCustomizado: dadosForm.escopoCustomizado || [],
        entregaveisCustomizados: dadosForm.entregaveisCustomizados || [],
        servicosIntegrados: dadosForm.servicosIntegrados || [],
        logoUrl: logoEngmarq
    };

    const template = getTemplateContrato(dados);

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contrato - ${dados.razaoSocial}</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        ${getContratoStyles()}
    </style>
</head>
<body>
    <!-- Controles de PDF -->
    <div class="pdf-controls">
        <button class="btn-generate" onclick="window.print()">
            <i class="fas fa-file-pdf"></i>
            Gerar PDF
        </button>
        <div class="pdf-instructions">
            <h4><i class="fas fa-info-circle"></i> Como gerar o PDF:</h4>
            <ol>
                <li>Clique no botão acima</li>
                <li>Selecione <strong>"Salvar como PDF"</strong></li>
                <li>Clique em <strong>"Salvar"</strong></li>
            </ol>
        </div>
    </div>

    <!-- Conteúdo do PDF -->
    <div id="pdf-content">
        ${template}
    </div>

    <script>
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                window.print();
            }
        });
        console.log('📄 Contrato gerado com sucesso!');
        console.log('💡 Pressione Ctrl+P ou clique em "Gerar PDF"');
    </script>
</body>
</html>`;
}
