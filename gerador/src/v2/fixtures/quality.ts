import { instantiatePreset } from '../presets/catalog-presets';
import type { DocumentMode, ParameterValues } from '../domain/content';
import type { Proposal } from '../domain/proposal';
import { singleProposal, tm136AssistanceProposal, tm137GroupProposal } from './proposals';

const parameters: Record<string, { parameters: ParameterValues }> = {
    psychosocial: { parameters: { participantCount: 18, instruments: ['Instrumento a validar no planejamento técnico'], integration: 'Devolutiva agregada e integração ao PGR.' } },
    noise: { parameters: { agent: 'Ruído contínuo ou intermitente', method: 'Dosimetria conforme estratégia de avaliação', quantity: 2, unit: 'dosimetry', workGroups: ['Produção'] } },
    heat: { parameters: { agent: 'Calor', method: 'IBUTG e análise da atividade', quantity: 1, unit: 'point', workGroups: ['Cozinha'] } },
    vibration: { parameters: { agent: 'Vibração de mãos e braços', method: 'NHO-10', quantity: 1, unit: 'point', workGroups: ['Operação de ferramentas'] } },
    chemicals: { parameters: { agent: 'Fumos metálicos', method: 'Amostragem e análise laboratorial a definir por agente', quantity: 2, unit: 'sample', workGroups: ['Soldagem'] } },
    dust: { parameters: { agent: 'Poeira respirável / sílica', method: 'Coleta de particulado e análise de sílica conforme estratégia técnica', quantity: 1, unit: 'sample', workGroups: ['Corte'] } },
    ...Object.fromEntries(['nr06', 'nr10', 'nr12', 'nr20', 'nr35', 'brigade'].map(id => [id, { parameters: { participants: 10, classes: 1, hoursPerClass: id === 'nr06' ? 2 : id === 'nr10' ? 40 : 8, occurrences: 1, modality: 'onsite', audience: 'Público e perfil sujeitos à validação técnica antes da mobilização' } }]))
};

function example(presetId: string, mode: DocumentMode): Proposal {
    const proposal = singleProposal();
    const overrides = Object.fromEntries(Object.entries(parameters).filter(([id]) => {
        const ids: Record<string, string[]> = { 'kit-psicossocial': ['psychosocial'], psychosocial: ['psychosocial'], 'pacote-medicoes': ['noise', 'heat', 'vibration', 'chemicals', 'dust'], 'treinamentos-operacionais': ['nr06', 'nr10', 'nr12', 'nr20', 'nr35'] };
        return (ids[presetId] ?? [presetId]).includes(id);
    }));
    const items = instantiatePreset(presetId, 'company-1', presetId, overrides);
    proposal.services = items.filter((item): item is Proposal['services'][number] => !['training', 'measurement', 'assistance'].includes(item.kind));
    proposal.trainings = items.filter((item): item is Proposal['trainings'][number] => item.kind === 'training');
    proposal.measurements = items.filter((item): item is Proposal['measurements'][number] => item.kind === 'measurement');
    proposal.metadata.number = `V2-QUALIDADE-${presetId.toUpperCase()}`;
    proposal.metadata.title = `Proposta de ${items.filter(item => item.catalogId !== 'art').map(item => item.content.profile?.shortName).join(' + ')}`;
    proposal.scope = { objective: `Execução de ${items.map(item => item.content.profile?.shortName).join(', ')} para a empresa e os quantitativos definidos nesta proposta.`, assumptions: ['Agendamento após aprovação e recebimento de dados, com acesso acompanhado aos locais.'], exclusions: ['Serviços não discriminados exigem aprovação técnica e comercial específica.'] };
    proposal.commercial.lines = items.map(item => ({ itemId: item.id, price: item === items[0] ? { mode: 'charge', cadence: 'once', amountCents: 280000 } : { mode: 'included', coveredByItemId: items[0].id } }));
    proposal.commercial.showMonthlyValue = false;
    proposal.commercial.showAggregateTotal = false;
    proposal.options = { documentMode: mode, detailLevel: 'standard', includeCover: mode !== 'compact', includeAcceptance: true };
    return proposal;
}

export const qualityScenarios: Record<string, () => Proposal> = {
    pgr: () => example('pgr', 'standard'),
    pcmso: () => example('pcmso', 'standard'),
    ltcat: () => example('ltcat', 'standard'),
    lip: () => example('lip', 'standard'),
    kit: () => example('kit-completo', 'standard'),
    'kit-psicossocial': () => example('kit-psicossocial', 'standard'),
    psicossocial: () => example('psychosocial', 'standard'),
    'medicao-unica': () => example('heat', 'compact'),
    medicoes: () => example('pacote-medicoes', 'standard'),
    'treinamento-simples': () => example('nr06', 'compact'),
    brigada: () => example('brigade', 'standard'),
    treinamentos: () => example('treinamentos-operacionais', 'standard'),
    assessoria: () => { const proposal = tm136AssistanceProposal(); proposal.options.documentMode = 'consultive'; return proposal; },
    grupo: () => { const proposal = tm137GroupProposal(); proposal.options.documentMode = 'consultive'; proposal.options.detailLevel = 'full'; return proposal; }
};