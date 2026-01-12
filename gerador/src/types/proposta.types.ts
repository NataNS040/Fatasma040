// =====================================================
// TYPES E INTERFACES PARA O GERADOR DE PROPOSTAS
// =====================================================

/**
 * Tipos de proposta disponíveis no sistema
 */
export type TipoProposta = 'brigada' | 'plataforma' | 'psicossocial';

/**
 * Configuração específica de cada tipo de proposta
 */
export interface PropostaConfig {
    icon: string;
    badge: string;
    titleTop: string;
    titleMain: string;
    subtitle: string;
    color: string;
    headerTitle: string;
}

/**
 * Mapeamento de todas as configurações de propostas
 */
export type PropostaConfigs = Record<TipoProposta, PropostaConfig>;

/**
 * Dados do cliente/empresa para a proposta
 */
export interface DadosCliente {
    codigoProposta: string;
    dataProposta: string;
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    endereco: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
    qtdColaboradores: string;
    elaborador: DadosElaborador;
    solicitante: DadosSolicitante;
}

/**
 * Dados do elaborador da proposta
 */
export interface DadosElaborador {
    nome: string;
    cargo: string;
    email: string;
    telefone: string;
    instagram: string;
}

/**
 * Dados do solicitante da proposta (contato da empresa cliente)
 */
export interface DadosSolicitante {
    nome: string;
    cargo: string;
    email: string;
    telefone: string;
}

/**
 * Dados formatados para uso nos templates
 */
export interface DadosTemplate {
    numero: string;
    data: string;
    razaoSocial: string;
    cnpj: string;
    endereco: string;
    bairro: string;
    cep: string;
    cidade: string;
    uf: string;
    qtdColaboradores: string;
    elaborador: DadosElaborador;
    solicitante: DadosSolicitante;
}

/**
 * Parâmetros de valor e desconto
 */
export interface ValoresDesconto {
    valorOriginal: number;
    valorFinal: number;
    percentualDesconto: number;
    temDesconto: boolean;
}

/**
 * Função de template - assinatura padrão
 */
export type TemplateFunction = (
    dados: DadosTemplate,
    valorOriginal: number,
    valorFinal: number,
    percentualDesc: number,
    temDesconto: boolean
) => string;

/**
 * Opções para formatação de moeda
 */
export interface FormatMoedaOptions {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
}

/**
 * Elementos do DOM usados no formulário
 */
export interface FormElements {
    tipoProposta: HTMLSelectElement;
    numeroProposta: HTMLInputElement;
    dataProposta: HTMLInputElement;
    razaoSocial: HTMLInputElement;
    cnpj: HTMLInputElement;
    endereco: HTMLInputElement;
    bairro: HTMLInputElement;
    cep: HTMLInputElement;
    cidade: HTMLInputElement;
    uf: HTMLInputElement;
    numColaboradores: HTMLInputElement;
    valorProposta: HTMLInputElement;
    aplicarDesconto: HTMLInputElement;
    percentualDesconto: HTMLInputElement;
    elaboradorNome: HTMLInputElement;
    elaboradorCargo: HTMLInputElement;
    elaboradorEmail: HTMLInputElement;
    elaboradorTelefone: HTMLInputElement;
    elaboradorInstagram: HTMLInputElement;
}

/**
 * Configuração de estilos por tipo de proposta
 */
export interface EstiloConfig {
    corPrincipal: string;
    corSecundaria: string;
    icone: string;
}

/**
 * Resultado da geração de proposta
 */
export interface PropostaGerada {
    html: string;
    tipo: TipoProposta;
    dados: DadosCliente;
    valores: ValoresDesconto;
}
