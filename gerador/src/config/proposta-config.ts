// =====================================================
// CONFIGURAÇÕES DOS TIPOS DE PROPOSTA
// =====================================================

import { TipoProposta, PropostaConfig, PropostaConfigs } from '../types/proposta.types';

/**
 * Configurações de cada tipo de proposta
 */
export const configs: PropostaConfigs = {
    brigada: {
        icon: 'fa-fire',
        badge: 'Treinamento Especializado',
        titleTop: 'TREINAMENTO',
        titleMain: 'BRIGADA DE INCÊNDIO',
        subtitle: 'Capacitação teórica e prática conforme Instrução Técnica IT 17/2025 do Corpo de Bombeiros Militar do RN (CBMRN)',
        color: '#dd6b20',
        headerTitle: 'Proposta Comercial - Brigada de Incêndio'
    },
    plataforma: {
        icon: 'fa-layer-group',
        badge: 'Projeto Técnico – EPC',
        titleTop: 'ELABORAÇÃO DE PROJETO',
        titleMain: 'PLATAFORMA SECUNDÁRIA',
        subtitle: 'Equipamento de Proteção Coletiva (EPC) conforme NR 18 – Condições e Meio Ambiente de Trabalho na Indústria da Construção',
        color: '#4a5568',
        headerTitle: 'Proposta Comercial - Plataforma Secundária'
    },
    psicossocial: {
        icon: 'fa-brain',
        badge: 'Avaliação Técnica – NR-01',
        titleTop: 'AVALIAÇÃO DE',
        titleMain: 'RISCOS PSICOSSOCIAIS',
        subtitle: 'Avaliação dos Fatores de Riscos Psicossociais relacionados ao trabalho conforme atualização da NR-01',
        color: '#805ad5',
        headerTitle: 'Proposta Comercial - Riscos Psicossociais'
    },
    assessoria: {
        icon: 'fa-shield-alt',
        badge: 'Assessoria Técnica Especializada',
        titleTop: 'ASSESSORIA EM',
        titleMain: 'SEGURANÇA DO TRABALHO',
        subtitle: 'Equipe técnica especializada, gestão de programas de SST e treinamentos de capacitação para conformidade legal',
        color: '#38a169',
        headerTitle: 'Proposta Comercial - Assessoria em SST'
    },
    'kit-sst': {
        icon: 'fa-file-medical-alt',
        badge: 'Kit Integrado SST',
        titleTop: 'KIT INTEGRADO',
        titleMain: 'DOCUMENTAÇÃO SST',
        subtitle: 'PGR, PCMSO, LTCAT e Laudos Técnicos para conformidade com as Normas Regulamentadoras',
        color: '#3182ce',
        headerTitle: 'Proposta Comercial - Kit Integrado SST'
    }
};

/**
 * Obtém a configuração de um tipo de proposta
 */
export function getConfig(tipo: TipoProposta): PropostaConfig {
    return configs[tipo];
}

/**
 * Verifica se um tipo é válido
 */
export function isValidTipo(tipo: string): tipo is TipoProposta {
    return tipo === 'brigada' || tipo === 'plataforma' || tipo === 'psicossocial' || tipo === 'assessoria' || tipo === 'kit-sst';
}
