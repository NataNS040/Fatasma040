// =====================================================
// EXPORTAÇÃO PRINCIPAL - INDEX
// =====================================================

// Types
export * from './types/proposta.types';

// Config
export { configs, getConfig, isValidTipo } from './config/proposta-config';

// Utils
export { 
    formatMoeda, 
    formatData, 
    valorPorExtenso, 
    parseValorMonetario, 
    calcularDesconto 
} from './utils/formatters';

// Styles
export { getPropostaStyles } from './styles/proposta-styles';

// Templates
export * from './templates/index';

// Generators
export { gerarHTMLProposta, prepararDadosTemplate } from './generators/gerador-proposta';

// Main
export { gerarProposta, atualizarValor } from './main';
