// =====================================================
// GERADOR DE HTML DA PROPOSTA
// =====================================================

import { TipoProposta, DadosTemplate, DadosCliente } from '../types/proposta.types';
import { getPropostaStyles } from '../styles/proposta-styles';
import { getTemplateBrigada } from '../templates/template-brigada';
import { getTemplatePlataforma } from '../templates/template-plataforma';
import { getTemplatePlataformaPrincipal } from '../templates/template-plataforma-principal';
import { getTemplatePsicossocial } from '../templates/template-psicossocial';
import { getTemplateAssessoria } from '../templates/template-assessoria';
import { getTemplateKitSST } from '../templates/template-kit-sst';
import { getTemplateTreinamentos } from '../templates/template-treinamentos';
import { getTemplatePersonalizada } from '../templates/template-personalizada';
import { formatData } from '../utils/formatters';
import logoEngmarq from '../../assets/logoengmarq.png';

/**
 * Converte dados do cliente para dados formatados do template
 */
export function prepararDadosTemplate(dados: DadosCliente): DadosTemplate {
    return {
        numero: dados.codigoProposta,
        data: formatData(dados.dataProposta),
        razaoSocial: dados.razaoSocial,
        cnpj: dados.cnpj,
        endereco: dados.endereco,
        bairro: dados.bairro,
        cep: dados.cep,
        cidade: dados.cidade,
        uf: dados.estado,
        qtdColaboradores: dados.qtdColaboradores,
        elaborador: dados.elaborador,
        solicitante: dados.solicitante,
        logoUrl: logoEngmarq,
        treinamentos: dados.treinamentos,
        entregaveisPsico: dados.entregaveisPsico,
        itensPersonalizada: dados.itensPersonalizada,
        isGrupo: dados.isGrupo,
        nomeGrupo: dados.nomeGrupo,
        empresasGrupo: dados.empresasGrupo
    };
}

/**
 * Seleciona e gera o template apropriado para o tipo de proposta
 */
function selecionarTemplate(
    tipo: TipoProposta,
    dados: DadosTemplate,
    valorOriginal: number,
    valorFinal: number,
    percentualDesc: number,
    temDesconto: boolean
): string {
    switch (tipo) {
        case 'brigada':
            return getTemplateBrigada(dados, valorOriginal, valorFinal, percentualDesc, temDesconto);
        case 'plataforma':
            return getTemplatePlataforma(dados, valorOriginal, valorFinal, percentualDesc, temDesconto);
        case 'plataforma-principal':
            return getTemplatePlataformaPrincipal(dados, valorOriginal, valorFinal, percentualDesc, temDesconto);
        case 'psicossocial':
            return getTemplatePsicossocial(dados, valorOriginal, valorFinal, percentualDesc, temDesconto);
        case 'assessoria':
            return getTemplateAssessoria(dados, valorOriginal, valorFinal, percentualDesc, temDesconto);
        case 'kit-sst':
            return getTemplateKitSST(dados, valorOriginal, valorFinal, percentualDesc, temDesconto);
        case 'treinamentos':
            return getTemplateTreinamentos(dados, valorOriginal, valorFinal, percentualDesc, temDesconto);
        case 'personalizada':
            return getTemplatePersonalizada(dados, valorOriginal, valorFinal, percentualDesc, temDesconto);
        default:
            throw new Error(`Tipo de proposta não suportado: ${tipo}`);
    }
}

/**
 * Gera o HTML completo da proposta com estilos, template e scripts
 * @param tipo - Tipo de proposta (brigada, plataforma, psicossocial)
 * @param dadosCliente - Dados do cliente
 * @param valorOriginal - Valor original sem desconto
 * @param valorFinal - Valor final após desconto
 * @param percentualDesc - Percentual de desconto
 * @param temDesconto - Se há desconto aplicado
 * @returns String HTML completa
 */
export function gerarHTMLProposta(
    tipo: TipoProposta,
    dadosCliente: DadosCliente,
    valorOriginal: number,
    valorFinal: number,
    percentualDesc: number,
    temDesconto: boolean
): string {
    const dados = prepararDadosTemplate(dadosCliente);
    
    // Obtém o template do conteúdo
    const template = selecionarTemplate(tipo, dados, valorOriginal, valorFinal, percentualDesc, temDesconto);
    
    // Monta o HTML completo
    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proposta ${dados.numero} - ${dados.razaoSocial}</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        ${getPropostaStyles(tipo)}
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
        // Atalho de teclado para impressão
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                window.print();
            }
        });

        console.log('📄 Proposta ${dados.numero} gerada com sucesso!');
        console.log('💡 Pressione Ctrl+P ou clique em "Gerar PDF"');
    </script>
</body>
</html>`;

    return html;
}
