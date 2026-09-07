import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { loadV2 } from '../scripts/load-v2.mjs';

const { api, regression, dispose } = loadV2();
after(dispose);
const { createRegressionFixture: fixture, regressionFixtures } = regression;
const { composeProposal, proposalItems } = api;
const document = proposal => { const result = composeProposal(proposal); assert.equal(result.ok, true, JSON.stringify(result.issues)); return result.document; };
const technical = model => model.blocks.filter(block => ['technical-section', 'shared-technical'].includes(block.kind));
const pricing = model => model.blocks.find(block => block.kind === 'investment');

for (const entry of regressionFixtures) {
    test(`regressão representativa: ${entry.id} / schema, determinismo e snapshot`, () => {
        assert.ok(existsSync(new URL(`../../${entry.source}`, import.meta.url)));
        const proposal = fixture(entry.id);
        const before = structuredClone(proposal);
        const model = document(proposal);
        assert.deepEqual(proposal, before);
        assert.deepEqual(model, document(fixture(entry.id)));
        assert.equal(model.client.kind, entry.id === 'group' ? 'group' : 'single');
        assert.ok(model.sourceItems.length > 0);
        model.sourceItems[0].content.title = 'Mutação de teste';
        assert.notEqual(document(proposal).sourceItems[0].content.title, 'Mutação de teste');
    });
}

const invalid = [
    ['condições de pagamento vazias', 'training', proposal => proposal.commercial.paymentTerms = ['   '], 'payment-terms'],
    ['cliente sem nome', 'training', proposal => proposal.client.displayName = '', 'required'],
    ['razão social ausente', 'training', proposal => delete proposal.companies[0].legalName, 'required'],
    ['nenhum serviço', 'training', proposal => { proposal.trainings = []; proposal.commercial.lines = []; }, 'empty-scope'],
    ['investimento ausente', 'training', proposal => proposal.commercial.lines = [], 'missing-price'],
    ['valor obrigatório ausente', 'training', proposal => delete proposal.commercial.lines[0].price.amountCents, 'invalid-number'],
    ['participantes ausentes', 'training', proposal => delete proposal.trainings[0].participants, 'invalid-number'],
    ['grupo com uma empresa', 'group', proposal => proposal.companies = proposal.companies.slice(0, 1), 'company-count'],
    ['empresa única com dois cadastros', 'training', proposal => proposal.companies.push({ id: 'extra', legalName: 'Extra' }), 'company-count'],
    ['grupo sem nome', 'group', proposal => proposal.groupName = '', 'group-name'],
    ['tipo de cliente desconhecido', 'training', proposal => proposal.client.kind = 'invalid', 'client-kind'],
    ['cadência desconhecida', 'training', proposal => proposal.commercial.lines[0].price.cadence = 'invalid', 'price-cadence'],
    ['cobrança desconhecida', 'training', proposal => proposal.commercial.lines[0].price.mode = 'invalid', 'price-mode'],
    ['modalidade desconhecida', 'training', proposal => proposal.trainings[0].modality = 'invalid', 'training-modality']
];
for (const [name, id, mutate, code] of invalid) test(`schema bloqueia ${name}`, () => {
    const proposal = fixture(id); mutate(proposal);
    const result = composeProposal(proposal);
    assert.equal(result.ok, false);
    assert.ok(result.issues.some(issue => issue.code === code && issue.severity === 'error'), JSON.stringify(result.issues));
});

test('warnings não bloqueiam: responsáveis, endereço e observação de medição', () => {
    const proposal = fixture('measurement');
    proposal.metadata.author.name = ''; delete proposal.client.contact;
    const result = composeProposal(proposal);
    assert.equal(result.ok, true);
    for (const code of ['missing-responsible', 'missing-contact', 'missing-address', 'measurement-notes']) assert.ok(result.issues.some(issue => issue.code === code && issue.severity === 'warning'));
});

test('composer: ordem estável e deduplicação preservam contextos diferentes', () => {
    const proposal = fixture('many-services');
    assert.ok(proposalItems(proposal).length >= 15);
    const before = document(proposal);
    proposal.services.reverse(); proposal.trainings.reverse(); proposal.measurements.reverse();
    assert.deepEqual(technical(document(proposal)), technical(before));
    const fragments = before.blocks.find(block => block.kind === 'shared-technical').content;
    const planning = fragments.filter(fragment => fragment.text.startsWith('Alinhamento inicial'));
    assert.equal(planning.length, 1);
    assert.ok(planning[0].appliesTo.length > 1);
    const changed = fixture('program-kit');
    changed.options.documentMode = 'consultive';
    changed.services[0].content.methodology = ['Visita: 2 horas.'];
    changed.services[1].content.methodology = ['Visita: 4 horas.'];
    const text = JSON.stringify(technical(document(changed)));
    assert.ok(text.includes('Visita: 2 horas.') && text.includes('Visita: 4 horas.'));
});

test('composer: três níveis preservam valores e fonte, sem reduzir standard a nome/preço', () => {
    const proposal = fixture('program-kit');
    proposal.services.forEach(item => delete item.detailLevel);
    const models = ['summary', 'standard', 'full'].map(level => { proposal.options.detailLevel = level; return document(proposal); });
    for (const model of models) {
        assert.deepEqual(model.sourceItems, models[0].sourceItems);
        assert.deepEqual(pricing(model), pricing(models[0]));
    }
    const text = JSON.stringify(technical(models[1]));
    assert.ok(text.includes('deliverables'));
    for (const field of ['exclusions', 'methodology', 'clientResponsibilities']) assert.ok(!text.includes(field));
    assert.ok(JSON.stringify(technical(models[2])).includes('executionSteps'));
    assert.ok(JSON.stringify(technical(models[2])).length > text.length);
});

test('densidade comercial: standard projeta resumo/entregas, sem bloco técnico automático', () => {
    for (const id of ['pgr', 'pgr-nr20', 'program-kit', 'complete-kit', 'training']) {
        const proposal = fixture(id); proposal.options.documentMode = 'standard';
        const model = document(proposal);
        for (const shared of model.blocks.filter(block => block.kind === 'shared-technical')) {
            assert.equal(shared.title, 'Condições de execução');
            assert.ok(shared.content.every(content => content.field === 'observations'));
        }
        for (const service of model.blocks.flatMap(block => block.kind === 'technical-section' ? block.services : [])) {
            assert.deepEqual(Object.keys(service.fields).filter(field => field !== 'observations'), ['summary', 'deliverables']);
            const source = model.sourceItems.find(item => item.id === service.itemId);
            assert.deepEqual(service.fields.deliverables, source.content.deliverables);
            assert.ok((service.fields.observations ?? []).every(text => source.content.profile.commercialConditions?.includes(text)));
        }
    }
});

test('contexto: serviço único consultivo mais detalhado que kit, full explícito e assessoria preservados', () => {
    const single = fixture('pgr'); single.options.documentMode = 'consultive'; delete single.options.detailLevel;
    const singleService = document(single).blocks.find(block => block.kind === 'technical-section').services[0];
    assert.ok(singleService.fields.executionSteps?.length);
    const kit = fixture('complete-kit'); kit.options.documentMode = 'consultive'; delete kit.options.detailLevel;
    assert.ok(document(kit).blocks.filter(block => block.kind === 'technical-section').flatMap(block => block.services).every(service => !service.fields.methodology && !service.fields.executionSteps));
    kit.services[0].detailLevel = 'full';
    assert.ok(document(kit).blocks.find(block => block.kind === 'technical-section').services[0].fields.executionSteps?.length);
    for (const id of ['robust-assistance', 'group']) assert.ok(JSON.stringify(technical(document(fixture(id)))).includes('executionSteps'));
});

test('modos preservam condições explícitas, parâmetros, fontes e investimento', () => {
    const proposal = fixture('pgr-nr20');
    proposal.trainings[0].notes = 'Exige liberação da turma antes da mobilização.';
    const models = ['compact', 'standard', 'consultive'].map(mode => { proposal.options.documentMode = mode; return document(proposal); });
    for (const model of models) {
        assert.deepEqual(model.sourceItems, models[0].sourceItems);
        assert.deepEqual(pricing(model), pricing(models[0]));
        const training = model.blocks.flatMap(block => block.kind === 'technical-section' ? block.services : []).find(service => service.catalogId === 'nr20');
        assert.equal(training.notes, proposal.trainings[0].notes);
        assert.ok(training.parameters.some(parameter => parameter.value === 25));
    }
    assert.equal(models[0].blocks.filter(block => block.kind === 'technical-section').length, 1);
    assert.equal(models[1].blocks.filter(block => block.kind === 'technical-section').length, 2);
    assert.ok(JSON.stringify(technical(models[2])).length > JSON.stringify(technical(models[1])).length);
});

test('comercial: valor único, mensalidade, flags e valores individuais exatos', () => {
    assert.equal(pricing(document(fixture('program-kit'))).totals.onceCents, 300000);
    const simple = pricing(document(fixture('simple-assistance')));
    assert.equal(simple.companyRows[0].monthlyCents, 95000);
    assert.equal(simple.totals, undefined);
    assert.equal(simple.companyRows[0].contractTotalCents, undefined);
    const proposal = fixture('group');
    const block = pricing(document(proposal));
    assert.deepEqual(block.companyRows.map(row => row.monthlyCents), [157000, 154500, 149000, 121000, 125000]);
    assert.equal(block.totals, undefined);
    assert.ok(!JSON.stringify(block).includes('contractTotalCents'));
    proposal.commercial.showContractTotal = true;
    proposal.commercial.showAggregateTotal = true;
    const enabled = pricing(document(proposal));
    assert.equal(enabled.totals.monthlyCents, 706500);
    assert.equal(enabled.totals.contractTotalCents, 8478000);
    proposal.commercial.showContractTotal = false;
    proposal.commercial.showAggregateTotal = false;
    assert.deepEqual(pricing(document(proposal)), block);
});

test('condições essenciais sobrevivem a todos os modos e ao nível resumido', () => {
    for (const mode of ['compact', 'standard', 'consultive']) {
        const proposal = fixture('complete-kit');
        proposal.options.documentMode = mode; proposal.options.detailLevel = 'summary';
        const model = document(proposal);
        const text = JSON.stringify(technical(model));
        for (const item of model.sourceItems) for (const condition of item.content.profile?.commercialConditions ?? []) assert.ok(text.includes(condition));
        assert.ok(!text.includes('methodology'));
    }
});

test('quantidade contextual conta serviços distintos, não repetições por empresa', () => {
    const proposal = fixture('pgr');
    proposal.options.documentMode = 'consultive'; delete proposal.options.detailLevel;
    proposal.client.kind = 'group'; proposal.client.displayName = 'Grupo de teste';
    const original = proposal.services[0];
    for (const suffix of ['2', '3', '4']) {
        const companyId = `company-${suffix}`;
        proposal.companies.push({ id: companyId, legalName: `Empresa ${suffix}` });
        proposal.services.push({ ...structuredClone(original), id: `pgr-${suffix}`, companyId });
        proposal.commercial.lines.push({ itemId: `pgr-${suffix}`, price: { mode: 'charge', cadence: 'once', amountCents: 100000 } });
    }
    assert.ok(document(proposal).blocks.flatMap(block => block.kind === 'technical-section' ? block.services : []).every(service => service.fields.executionSteps?.length));
});