import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import ts from 'typescript';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadV2 } from '../scripts/load-v2.mjs';

// Compila apenas a V2 para um diretório temporário, sem dependências de teste adicionais.
const { api, fixtures, dispose } = loadV2();
after(dispose);
const { composeProposal, getCatalogEntry, listCatalogEntries, createCatalogItem, createProgramKit, instantiatePreset, listPresets, proposalItems } = api;
const { singleProposal, mixedGroupProposal, universalCatalogProposal } = fixtures;
const { tm136AssistanceProposal, tm137GroupProposal } = fixtures;
const investment = result => {
    assert.equal(result.ok, true);
    return result.document.blocks.find(block => block.kind === 'investment');
};

test('serviço avulso: documento determinístico, texto literal e snapshot independente', () => {
    const p = singleProposal();
    p.client.displayName = '<script>texto</script>';
    const before = JSON.stringify(p);
    const result = composeProposal(p);
    assert.equal(investment(result).totals.onceCents, 150000);
    assert.deepEqual(result, composeProposal(p));
    assert.equal(JSON.stringify(p), before);
    assert.equal(result.document.blocks[0].clientName, p.client.displayName);
    result.document.sourceItems[0].content.title = 'Editado';
    assert.equal(p.services[0].content.title, getCatalogEntry('pgr').content.title);
});

test('grupo misto: todas as entregas por empresa, inclusão sem duplicar mensalidade', () => {
    const p = mixedGroupProposal();
    const result = composeProposal(p);
    const block = investment(result);
    assert.equal(block.totals.monthlyCents, 750000);
    assert.equal(block.totals.onceCents, 0);
    assert.equal(block.totals.byCompany.length, 5);
    assert.equal(block.rows.length, 50);
    assert.equal(result.document.blocks.filter(b => b.kind === 'technical-section').flatMap(b => b.services).length, proposalItems(p).length);
    const technical = result.document.sourceItems;
    assert.deepEqual(technical.filter(i => i.id.endsWith('-brigade')).map(i => i.participants), [10, 10, 8, 9, 10]);
    assert.equal(technical.filter(i => i.kind === 'measurement').reduce((sum, i) => sum + i.quantity, 0), 5);
    assert.ok(result.issues.some(i => i.code === 'technical-review'));
});

test('mensalidade e cobrança única coexistem sem total ambíguo', () => {
    const p = mixedGroupProposal();
    p.commercial.lines[0].price = { mode: 'charge', cadence: 'once', amountCents: 12345 };
    const totals = investment(composeProposal(p)).totals;
    assert.equal(totals.onceCents, 12345);
    assert.equal(totals.monthlyCents, 750000);
    assert.equal(totals.byCompany[0].onceCents, 12345);
});

test('kit expande seleções; catálogo e presets não compartilham dados mutáveis', () => {
    const p = singleProposal();
    p.services = createProgramKit('company-1', 'kit');
    p.commercial.lines = p.services.map(item => ({ itemId: item.id, price: { mode: 'charge', cadence: 'once', amountCents: 10000 } }));
    assert.equal(investment(composeProposal(p)).totals.onceCents, 30000);
    p.services[0].content.deliverables.push('Personalizado');
    assert.equal(getCatalogEntry('pgr').content.deliverables.includes('Personalizado'), false);
    assert.throws(() => getCatalogEntry('inexistente'));
});

for (const kind of ['training', 'measurement', 'psychosocial', 'assistance']) {
    test(`suporta ${kind} avulso, sem exigir programas`, () => {
        const p = singleProposal();
        const item = proposalItems(mixedGroupProposal()).find(i => i.kind === kind);
        p.services = kind === 'psychosocial' ? [item] : [];
        p.trainings = kind === 'training' ? [item] : [];
        p.measurements = kind === 'measurement' ? [item] : [];
        p.assistance = kind === 'assistance' ? [item] : [];
        p.commercial.lines = [{ itemId: item.id, price: { mode: 'charge', cadence: kind === 'assistance' ? 'monthly' : 'once', amountCents: 10000 } }];
        assert.equal(composeProposal(p).ok, true);
    });
}

const invalidCases = [
    ['duplicate-id', p => p.services.push({ ...p.services[0] })],
    ['unknown-company', p => { p.services[0].companyId = 'missing'; }],
    ['missing-price', p => { p.commercial.lines = []; }],
    ['invalid-number', p => { p.commercial.lines[0].price.amountCents = NaN; }],
    ['invalid-number', p => { p.commercial.lines[0].price.amountCents = 0.5; }],
    ['invalid-number', p => { p.commercial.lines[0].price.amountCents = -1; }],
    ['invalid-date', p => { p.metadata.issuedOn = '2026-02-30'; }],
    ['company-count', p => { p.client.kind = 'group'; }],
    ['invalid-inclusion', p => { p.commercial.lines[0].price = { mode: 'included', coveredByItemId: 'pgr-1' }; }],
    ['duplicate-price', p => p.commercial.lines.push(p.commercial.lines[0])],
    ['empty-scope', p => { p.services = []; p.commercial.lines = []; }]
];
for (const [code, mutate] of invalidCases) {
    test(`bloqueia ${code}`, () => {
        const p = singleProposal();
        mutate(p);
        const result = composeProposal(p);
        assert.equal(result.ok, false);
        assert.ok(result.issues.some(i => i.code === code));
        assert.equal('document' in result, false);
    });
}

test('bloqueia inclusão cruzada entre empresas e overflow financeiro', () => {
    const p = mixedGroupProposal();
    p.commercial.lines[0].price = { mode: 'included', coveredByItemId: 'company-2-assistance' };
    assert.equal(composeProposal(p).ok, false);
    for (const line of p.commercial.lines) line.price = { mode: 'charge', cadence: 'monthly', amountCents: Number.MAX_SAFE_INTEGER };
    assert.ok(composeProposal(p).issues.some(i => i.code === 'unsafe-total'));
});

test('opções removem só capa e aceite; conteúdo longo não é cortado', () => {
    const p = singleProposal();
    p.options = { includeCover: false, includeAcceptance: false, detailLevel: 'full' };
    p.services[0].content.objective = 'Conteúdo longo. '.repeat(10000);
    const result = composeProposal(p);
    assert.equal(result.ok, true);
    assert.equal(result.document.blocks.some(b => b.kind === 'cover' || b.kind === 'acceptance'), false);
    assert.equal(result.document.blocks.find(b => b.kind === 'technical-section').services[0].fields.objective[0], p.services[0].content.objective);
    assert.equal(result.document.stage, 'composed');
});

test('catálogo cobre os serviços anteriores e LI específico, com conteúdo e fontes locais', () => {
    const entries = listCatalogEntries();
    const expected = ['pgr', 'pcmso', 'ltcat', 'lip', 'li', 'aet', 'psychosocial', 'esocial', 'art', 'technical-support', 'technical-visit', 'noise', 'heat', 'vibration', 'chemicals', 'dust', 'nr01', 'nr05', 'nr06', 'nr10', 'nr12', 'nr18', 'nr20', 'nr33', 'nr35', 'brigade', 'assistance'];
    assert.deepEqual(entries.map(e => e.id).sort(), expected.sort());
    assert.equal(new Set(entries.map(e => e.id)).size, entries.length);
    const root = fileURLToPath(new URL('../../', import.meta.url));
    for (const { id, content: c } of entries) {
        for (const key of ['methodology', 'deliverables', 'exclusions']) assert.ok(c[key].length > 0, `${id}.${key}`);
        for (const key of ['scope', 'executionSteps', 'providerResponsibilities', 'clientResponsibilities', 'inclusions', 'observations', 'parameters']) assert.ok(c.profile[key].length > 0, `${id}.${key}`);
        assert.ok(c.objective.trim() && c.profile.summary.trim() && c.profile.shortName.trim());
        assert.ok(c.profile.icon && c.profile.visual.accent && c.profile.periodicity.description);
        assert.equal(c.provenance.review, 'pending');
        assert.ok(c.provenance.sources.every(path => existsSync(resolve(root, path))), id);
        assert.equal(new Set(c.profile.parameters.map(p => p.id)).size, c.profile.parameters.length);
        assert.equal(/<\/?(?:div|p|ul|li|script)\b/.test(JSON.stringify(c)), false);
    }
    entries[0].content.profile.scope.push('Mutação externa');
    assert.equal(getCatalogEntry('pgr').content.profile.scope.includes('Mutação externa'), false);
});

test('summary, standard e full projetam campos diferentes sem apagar o snapshot', () => {
    const p = singleProposal();
    const expected = { summary: ['summary', 'observations'], standard: ['summary', 'deliverables', 'observations'] };
    const snapshots = [];
    for (const level of ['summary', 'standard', 'full']) {
        p.options.detailLevel = level;
        const result = composeProposal(p);
        assert.equal(result.ok, true);
        const service = result.document.blocks.find(b => b.kind === 'technical-section').services[0];
        assert.equal(service.level, level);
        if (level !== 'full') assert.deepEqual(Object.keys(service.fields), expected[level]);
        else for (const key of ['objective', 'methodology', 'executionSteps', 'deliverables', 'providerResponsibilities', 'clientResponsibilities', 'references']) assert.ok(service.fields[key]?.length, key);
        snapshots.push(result.document.sourceItems);
    }
    assert.deepEqual(snapshots[0], snapshots[2]);
    p.services[0].detailLevel = 'summary';
    assert.equal(composeProposal(p).document.blocks.find(b => b.kind === 'technical-section').services[0].level, 'summary');
});

test('sete serviços formam seções ordenadas com conteúdo comum rastreável', () => {
    const p = universalCatalogProposal();
    const result = composeProposal(p);
    assert.equal(result.ok, true);
    const sections = result.document.blocks.filter(b => b.kind === 'technical-section');
    assert.deepEqual(sections.map(b => b.group), ['programs', 'complementary', 'esocial', 'technical-responsibility']);
    assert.deepEqual(sections[0].services.map(s => s.catalogId), ['pgr', 'pcmso', 'ltcat', 'lip']);
    const shared = result.document.blocks.find(b => b.kind === 'shared-technical').content;
    const planning = shared.filter(s => s.field === 'methodology' && s.text.startsWith('Alinhamento inicial'));
    assert.equal(planning.length, 1);
    assert.equal(planning[0].appliesTo.length, 7);
    const methodology = sections.flatMap(b => b.services).flatMap(s => s.fields.methodology ?? []);
    assert.equal(methodology.includes(planning[0].text), false);
    assert.ok(sections[0].services.find(s => s.catalogId === 'pcmso').fields.deliverables.includes('PCMSO assinado pelo médico responsável.'));
    assert.equal(investment(result).totals.onceCents, 600000);
    assert.equal(investment(result).totals.monthlyCents, 20000);
    const shuffled = structuredClone(p);
    shuffled.services.reverse();
    assert.deepEqual(composeProposal(shuffled).document.blocks.filter(b => ['technical-section', 'shared-technical'].includes(b.kind)), result.document.blocks.filter(b => ['technical-section', 'shared-technical'].includes(b.kind)));
});

test('deduplicação preserva campo, empresa e texto divergente', () => {
    const p = mixedGroupProposal();
    p.options.detailLevel = 'full';
    const result = composeProposal(p);
    assert.equal(result.ok, true);
    const shared = result.document.blocks.find(b => b.kind === 'shared-technical').content;
    assert.ok(shared.length);
    for (const fragment of shared) assert.equal(new Set(fragment.appliesTo.map(i => i.companyId)).size, 1);
    const q = singleProposal();
    q.options.documentMode = 'consultive';
    q.services = createProgramKit('company-1', 'kit');
    q.services[0].content.methodology = ['Visita de 4 horas.'];
    q.services[1].content.methodology = ['Visita de 8 horas.'];
    q.services[2].content.methodology = ['Visita de 4 horas.'];
    q.commercial.lines = q.services.map(item => ({ itemId: item.id, price: { mode: 'charge', cadence: 'once', amountCents: 100 } }));
    const r = composeProposal(q);
    const common = r.document.blocks.find(b => b.kind === 'shared-technical').content;
    assert.equal(common.find(c => c.text === 'Visita de 4 horas.').appliesTo.length, 2);
    assert.ok(r.document.blocks.find(b => b.kind === 'technical-section').services[1].fields.methodology.includes('Visita de 8 horas.'));
});

test('política permite reordenar e renomear seções, rejeitando configuração inválida', () => {
    const p = universalCatalogProposal();
    const result = composeProposal(p, { sectionOrder: { esocial: 5 }, sectionTitles: { esocial: 'Eventos de SST contratados' } });
    assert.equal(result.ok, true);
    const first = result.document.blocks.find(b => b.kind === 'technical-section');
    assert.equal(first.group, 'esocial');
    assert.equal(first.title, 'Eventos de SST contratados');
    assert.equal(composeProposal(p, { sectionOrder: { esocial: NaN } }).ok, false);
    assert.equal(composeProposal(p, { sectionTitles: { unknown: 'Inexistente' } }).ok, false);
});

test('kit-completo materializa cinco seleções editáveis e não possui HTML ou preços', () => {
    const selections = instantiatePreset('kit-completo', 'company-1', 'preset', { art: { parameters: { quantity: 2 } }, pgr: { detailLevel: 'full' } });
    assert.deepEqual(selections.map(s => s.catalogId), ['pgr', 'pcmso', 'ltcat', 'lip', 'art']);
    assert.equal(selections[4].parameters.quantity, 2);
    assert.equal(selections[0].detailLevel, 'full');
    selections[0].content.methodology.push('Personalizado');
    assert.equal(instantiatePreset('kit-completo', 'company-1', 'other')[0].content.methodology.includes('Personalizado'), false);
    assert.equal(JSON.stringify(listPresets()).includes('template'), false);
    assert.equal(selections.some(s => 'price' in s), false);
    assert.throws(() => instantiatePreset('kit-completo', 'c', 'x', { noise: {} }));
});

test('presets migrados preservam aliases, parâmetros obrigatórios e escopos distintos', () => {
    const presets = listPresets();
    const legacyIds = presets.flatMap(preset => preset.legacyIds);
    assert.equal(new Set(legacyIds).size, legacyIds.length);
    for (const preset of presets) {
        assert.equal(new Set(preset.services.map(service => service.catalogId)).size, preset.services.length);
        for (const service of preset.services) assert.ok(getCatalogEntry(service.catalogId));
    }
    assert.deepEqual(instantiatePreset('pgr-pcmso-ltcat', 'company', 'kit'), instantiatePreset('kit-programas', 'company', 'kit'));
    const li = instantiatePreset('laudo-insalubridade', 'company', 'li');
    assert.deepEqual(li.map(item => item.catalogId), ['li', 'art']);
    assert.ok(li[0].content.exclusions.some(text => text.includes('Periculosidade')));
    assert.throws(() => instantiatePreset('medicao-ruido', 'company', 'noise'));
    assert.throws(() => instantiatePreset('brigada', 'company', 'brigade'));
    assert.equal(api.getPreset('combo-completo').services.some(service => service.catalogId === 'psychosocial'), true);
    assert.equal(api.getPreset('assessoria-programas').documentMode, 'consultive');
});

test('todos os modelos V1 têm destino ou pendência documentada, sem importar V1 em produção', async () => {
    const source = readFileSync(new URL('../src/config/modelos-prontos.ts', import.meta.url), 'utf8');
    const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
    const legacy = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
    const accounted = [...listPresets().flatMap(preset => preset.legacyIds), ...api.pendingLegacyPresets.map(preset => preset.id)];
    assert.equal(new Set(accounted).size, accounted.length);
    assert.deepEqual(accounted.sort(), legacy.modelosProntos.map(model => model.id).sort());
});

test('parâmetros configuram treinamentos e medições sem duplicar campos do domínio', () => {
    const training = createCatalogItem('nr35', { id: 't', companyId: 'company-1', parameters: { participants: 12, classes: 2, hoursPerClass: 8, occurrences: 1, modality: 'hybrid' } });
    assert.equal(training.participants, 12);
    assert.equal(training.parameters.participants, undefined);
    assert.ok(training.syllabus.length);
    const measurement = createCatalogItem('dust', { id: 'm', companyId: 'company-1', parameters: { agent: 'Poeira respirável / sílica', method: 'Método definido no planejamento', quantity: 3, unit: 'sample', workGroups: ['Corte'] } });
    assert.equal(measurement.quantity, 3);
    const p = singleProposal();
    p.trainings.push(training);
    p.measurements.push(measurement);
    p.commercial.lines.push(...[training, measurement].map(item => ({ itemId: item.id, price: { mode: 'charge', cadence: 'once', amountCents: 100 } })));
    assert.equal(composeProposal(p).ok, true);
    training.parameters.participants = 100;
    assert.ok(composeProposal(p).issues.some(i => i.code === 'duplicate-parameter'));
    assert.throws(() => createCatalogItem('esocial', { id: 'e', companyId: 'c', parameters: { events: ['S-9999'], servicePeriod: '12 meses' } }));
    assert.throws(() => createCatalogItem('nr10', { id: 'e', companyId: 'c' }));
    assert.throws(() => createCatalogItem('pgr', { id: 'e', companyId: 'c', parameters: { employeeCount: -2 } }));
    assert.throws(() => createCatalogItem('pgr', { id: 'e', companyId: 'c', parameters: { unknown: 1 } }));
});

test('snapshots antigos sem profile e itens customizados continuam compondo', () => {
    const p = singleProposal();
    delete p.services[0].content.profile;
    p.services[0].kind = 'custom';
    p.services[0].content.objective = 'Objetivo específico editado.';
    const result = composeProposal(p);
    assert.equal(result.ok, true);
    const section = result.document.blocks.find(b => b.kind === 'technical-section');
    assert.equal(section.group, 'other');
    assert.deepEqual(section.services[0].fields.summary, ['Objetivo específico editado.']);
});

test('TM136: mensalidade por 12 meses sem total global; medição em orçamento separado', () => {
    const p = tm136AssistanceProposal();
    const before = JSON.stringify(p);
    const result = composeProposal(p);
    assert.equal(result.ok, true, JSON.stringify(result.issues));
    const block = investment(result);
    assert.equal('totals' in block, false);
    assert.equal(block.companyRows[0].monthlyCents, 146000);
    assert.equal('contractTotalCents' in block.companyRows[0], false);
    assert.equal(block.companyRows[0].billing[0].termMonths, 12);
    assert.equal(block.companyRows[0].billing[0].installmentCount, 12);
    assert.equal('lines' in block.terms, false);
    assert.equal(JSON.stringify(p), before);
    const optional = result.document.blocks.find(b => b.kind === 'additional-scope');
    assert.equal(optional.measurements[0].status, 'separate-quote');
    assert.equal(result.document.blocks.filter(b => b.kind === 'technical-section').flatMap(b => b.services).some(s => s.catalogId === 'heat'), false);
    assert.equal(JSON.stringify(result.document).includes('assistanceConfig'), false);
});

test('modos adaptam seções sem alterar escopo, preço ou opções explícitas', () => {
    const proposal = universalCatalogProposal();
    const documents = ['compact', 'standard', 'consultive'].map(documentMode => {
        proposal.options.documentMode = documentMode;
        const result = composeProposal(proposal);
        assert.equal(result.ok, true);
        assert.equal(result.document.documentMode, documentMode);
        return result.document;
    });
    assert.equal(documents[0].blocks.filter(block => block.kind === 'technical-section').length, 1);
    assert.ok(documents[1].blocks.filter(block => block.kind === 'technical-section').length > 1);
    assert.ok(documents[2].blocks.some(block => block.kind === 'coordination'));
    for (const document of documents) {
        assert.deepEqual(document.sourceItems, documents[0].sourceItems);
        assert.deepEqual(document.blocks.find(block => block.kind === 'investment'), documents[0].blocks.find(block => block.kind === 'investment'));
        assert.ok(document.blocks.some(block => block.kind === 'cover'));
    }
    proposal.options.documentMode = 'invalid';
    assert.equal(composeProposal(proposal).ok, false);
});

test('consultive respeita detalhes explícitos e exclui dependências não contratadas', () => {
    const proposal = tm136AssistanceProposal();
    proposal.options.documentMode = 'consultive';
    delete proposal.options.detailLevel;
    const document = composeProposal(proposal).document;
    const services = document.blocks.filter(block => block.kind === 'technical-section').flatMap(block => block.services);
    assert.equal(services.find(service => service.catalogId === 'assistance').level, 'full');
    assert.ok(services.filter(service => service.catalogId !== 'assistance').every(service => service.level === 'standard'));
    assert.ok(!document.blocks.find(block => block.kind === 'coordination').entries.some(entry => entry.title === 'Dependência das avaliações'));
    proposal.options.detailLevel = 'standard';
    assert.ok(composeProposal(proposal).document.blocks.filter(block => block.kind === 'technical-section').flatMap(block => block.services).filter(service => service.catalogId !== 'assistance').every(service => service.level === 'standard'));
    proposal.options.detailLevel = 'full';
    assert.ok(composeProposal(proposal).document.blocks.filter(block => block.kind === 'technical-section').flatMap(block => block.services).every(service => service.level === 'full'));
});

test('TM137: escopo comum, participantes e mensalidades individuais, nenhum agregado', () => {
    const p = tm137GroupProposal();
    const result = composeProposal(p);
    assert.equal(result.ok, true, JSON.stringify(result.issues));
    assert.equal(result.document.isGroup, true);
    assert.equal(investment(result).companyRows.length, 5);
    assert.equal('totals' in investment(result), false);
    const items = result.document.sourceItems;
    assert.deepEqual(items.filter(i => i.catalogId === 'nr01').map(i => i.participants), [23, 22, 17, 8, 9]);
    assert.deepEqual(items.filter(i => i.catalogId === 'brigade').map(i => i.participants), [10, 10, 10, 8, 9]);
    assert.equal(items.filter(i => i.kind === 'measurement').length, 5);
    p.companies[0].assistanceConfig.programs = { aet: { selected: true } };
    p.companies[0].assistanceConfig.visits = { included: false, notes: 'Atendimento sem visitas.' };
    p.companies[0].assistanceConfig.trainings.brigade.selected = false;
    const updated = composeProposal(p);
    assert.equal(updated.ok, true, JSON.stringify(updated.issues));
    assert.equal(updated.document.sourceItems.filter(i => i.catalogId === 'aet').length, 1);
    assert.equal(updated.document.sourceItems.filter(i => i.catalogId === 'brigade').length, 4);
    assert.equal(updated.document.sourceItems.find(i => i.id === 'padaria:assistance').visits.included, false);
});

test('opções comerciais removem campos; desativar agregados realmente evita cálculo', () => {
    const p = tm137GroupProposal();
    for (const c of p.companies) c.assistanceConfig.pricing.monthlyCents = Number.MAX_SAFE_INTEGER;
    assert.equal(composeProposal(p).ok, true); // A soma e multiplicação por 12 estourariam: não são executadas.
    p.commercial.showAggregateTotal = true;
    assert.equal(composeProposal(p).ok, false);
    p.commercial.showAggregateTotal = false;
    p.commercial.showContractTotal = true;
    assert.equal(composeProposal(p).ok, false);
    const q = tm136AssistanceProposal();
    q.commercial.showMonthlyValue = false;
    q.commercial.showPerCompanyPricing = false;
    const hidden = investment(composeProposal(q));
    assert.equal('companyRows' in hidden, false);
    assert.equal(JSON.stringify(hidden).includes('146000'), false);
    assert.equal(JSON.stringify(hidden).includes('monthlyCents'), false);
});

test('valor único, mensalidade, total contratual e parcelas são independentes', () => {
    const p = tm136AssistanceProposal();
    p.companies[0].assistanceConfig.pricing = { onceCents: 50000, monthlyCents: 10000, termMonths: 6, installmentCount: 3 };
    p.commercial.showContractTotal = true;
    p.commercial.showMonthlyValue = false;
    const result = composeProposal(p);
    assert.equal(result.ok, true);
    const row = investment(result).companyRows[0];
    assert.equal(row.onceCents, 50000);
    assert.equal(row.contractTotalCents, 110000);
    assert.equal('monthlyCents' in row, false);
    assert.equal(row.billing[0].installmentCount, 3);
    p.commercial.lines.push({ itemId: 'stale', price: { mode: 'charge', cadence: 'once', amountCents: 1 } });
    assert.equal(composeProposal(p).ok, false);
});
