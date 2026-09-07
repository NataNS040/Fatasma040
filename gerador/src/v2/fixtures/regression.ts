import type { Proposal } from '../domain/proposal';
import { proposalItems } from '../domain/proposal';
import { createProgramKit } from '../presets/program-kit';
import { qualityScenarios } from './quality';
import { singleProposal, tm136AssistanceProposal } from './proposals';
import { instantiatePreset } from '../presets/catalog-presets';

function pgrTraining(): Proposal {
    const proposal = qualityScenarios.pgr();
    const items = instantiatePreset('nr20', 'company-1', 'regression-nr20', { nr20: { parameters: { participants: 25, classes: 1, hoursPerClass: 8, occurrences: 1, modality: 'onsite' } } });
    proposal.trainings = items.filter((item): item is Proposal['trainings'][number] => item.kind === 'training');
    proposal.metadata.title = 'Proposta de PGR + NR-20';
    proposal.scope.objective = 'Elaboração do PGR e capacitação NR-20 para a empresa e os quantitativos definidos nesta proposta.';
    proposal.commercial.lines.push(...proposal.trainings.map(item => ({ itemId: item.id, price: { mode: 'charge' as const, cadence: 'once' as const, amountCents: 180000 } })));
    return proposal;
}

function programKit(): Proposal {
    const proposal = singleProposal();
    proposal.services = createProgramKit('company-1', 'regression-kit');
    proposal.commercial.lines = proposal.services.map(item => ({ itemId: item.id, price: { mode: 'charge', cadence: 'once', amountCents: 100000 } }));
    proposal.options.documentMode = 'standard';
    return proposal;
}

function simpleAssistance(): Proposal {
    const proposal = tm136AssistanceProposal();
    proposal.assistanceConfiguration = {
        visits: { included: true, quantity: 6, durationHours: 2, frequency: 'monthly' },
        renewal: 'Mediante acordo entre as partes.', adjustment: 'Conforme contrato.'
    };
    proposal.companies[0].assistanceConfig = { pricing: { monthlyCents: 95000, termMonths: 6, installmentCount: 6 } };
    proposal.options.documentMode = 'consultive';
    return proposal;
}

function manyServices(): Proposal {
    const proposal = qualityScenarios.kit();
    const additions = [qualityScenarios.psicossocial(), qualityScenarios.medicoes(), qualityScenarios.treinamentos()];
    const ids = new Set(proposalItems(proposal).map(item => item.catalogId));
    for (const source of additions) {
        for (const item of proposalItems(source)) {
            if (ids.has(item.catalogId)) continue;
            ids.add(item.catalogId);
            if (item.kind === 'training') proposal.trainings.push(item);
            else if (item.kind === 'measurement') proposal.measurements.push(item);
            else if (item.kind !== 'assistance') proposal.services.push(item);
        }
    }
    proposal.metadata.title = 'Projeto integrado de programas, avaliações e capacitação';
    proposal.scope.objective = 'Execução integrada dos programas, avaliações e treinamentos expressamente dimensionados nesta proposta.';
    proposal.options = { documentMode: 'consultive', detailLevel: 'full', includeCover: true, includeAcceptance: true };
    proposal.commercial.lines = proposalItems(proposal).map(item => ({ itemId: item.id, price: { mode: 'charge', cadence: 'once', amountCents: 125000 } }));
    return proposal;
}

export const regressionFixtures = [
    { id: 'pgr', name: 'PGR sozinho', source: 'propostas/maio-2026/proposta-pgr-pcmso-ltcat-atecmontagem.html', create: qualityScenarios.pgr },
    { id: 'pgr-nr20', name: 'PGR + NR-20', source: 'propostas/julho-2026/TM0117-Colegio Marista Natal.html', create: pgrTraining },
    { id: 'training', name: 'Treinamento simples', source: 'propostas/julho-2026/TM0117-Colegio Marista Natal.html', create: qualityScenarios['treinamento-simples'] },
    { id: 'brigade', name: 'Brigada', source: 'propostas/maio-2026/proposta-brigada-incendio-ceneged.html', create: qualityScenarios.brigada },
    { id: 'psychosocial', name: 'Psicossocial', source: 'propostas/maio-2026/proposta-treinamentos-psicossocial-imperthane.html', create: qualityScenarios.psicossocial },
    { id: 'program-kit', name: 'PGR + PCMSO + LTCAT', source: 'propostas/maio-2026/proposta-pgr-pcmso-ltcat-atecmontagem.html', create: programKit },
    { id: 'complete-kit', name: 'Kit completo', source: 'propostas/maio-2026/proposta-programas-medicoes-unimetais.html', create: qualityScenarios.kit },
    { id: 'measurement', name: 'Medição pontual', source: 'propostas/maio-2026/proposta-programas-medicoes-unimetais.html', create: qualityScenarios['medicao-unica'] },
    { id: 'simple-assistance', name: 'Assessoria simples', source: 'propostas/agosto-2026/TM0136-Condominio Villaggio Di Roma.html', create: simpleAssistance },
    { id: 'robust-assistance', name: 'Assessoria robusta', source: 'propostas/agosto-2026/TM0136-Condominio Villaggio Di Roma.html', create: qualityScenarios.assessoria },
    { id: 'group', name: 'Grupo empresarial', source: 'propostas/agosto-2026/TM0137-Grupo Bertis.html', create: qualityScenarios.grupo },
    { id: 'many-services', name: 'Muitos serviços', source: 'propostas/maio-2026/proposta-programas-medicoes-unimetais.html', create: manyServices }
];

export function createRegressionFixture(id: string): Proposal {
    const fixture = regressionFixtures.find(candidate => candidate.id === id);
    if (!fixture) throw new Error(`Fixture desconhecida: ${id}`);
    const proposal = fixture.create();
    proposal.metadata.id = `regression-${id}`;
    proposal.metadata.number = `V2-REG-${id.toUpperCase()}`;
    proposal.metadata.issuedOn = '2026-09-07';
    return proposal;
}