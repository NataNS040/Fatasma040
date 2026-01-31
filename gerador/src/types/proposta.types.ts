// =====================================================
// TYPES E INTERFACES PARA O GERADOR DE PROPOSTAS
// =====================================================

/**
 * Tipos de proposta disponíveis no sistema
 */
export type TipoProposta = 'brigada' | 'plataforma' | 'plataforma-principal' | 'psicossocial' | 'assessoria' | 'kit-sst' | 'treinamentos';

/**
 * IDs dos treinamentos disponíveis
 */
export type TreinamentoId = 'nr10' | 'nr12' | 'nr33' | 'nr35' | 'brigada' | 'cipa' | 'primeiros-socorros';

/**
 * Treinamento selecionado com seus dados
 */
export interface TreinamentoSelecionado {
    id: TreinamentoId;
    nome: string;
    icon: string;
    descricao: string;
    cargaHoraria?: string;
    qtdAlunos?: number;
    qtdTurmas?: number;
    valor?: number;
}

/**
 * IDs dos entregáveis psicossociais
 */
export type EntregavelPsicoId = 'relatorio' | 'plano' | 'aep' | 'palestras' | 'janeiro_branco' | 'reavaliacao';

/**
 * Entregável psicossocial selecionado
 */
export interface EntregavelPsico {
    id: EntregavelPsicoId;
    titulo: string;
    icon: string;
    descricao: string;
    quantidade?: number;
    ativo: boolean;
}

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
 * Dados de uma empresa individual (para grupo)
 */
export interface EmpresaGrupo {
    razaoSocial: string;
    cnpj: string;
    endereco: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
    qtdColaboradores?: string;
    valor?: number;
}

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
    treinamentos?: TreinamentoSelecionado[];
    entregaveisPsico?: EntregavelPsico[];
    // Campos para proposta em grupo
    isGrupo?: boolean;
    nomeGrupo?: string;
    empresasGrupo?: EmpresaGrupo[];
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
    logoUrl: string;
    treinamentos?: TreinamentoSelecionado[];
    entregaveisPsico?: EntregavelPsico[];
    // Campos para proposta em grupo
    isGrupo?: boolean;
    nomeGrupo?: string;
    empresasGrupo?: EmpresaGrupo[];
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
