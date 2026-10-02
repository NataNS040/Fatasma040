import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { loadV2 } from '../scripts/load-v2.mjs';
const { editor, api, fixtures, dispose } = loadV2();
after(dispose);
test('nome automático: fantasia, razão social, PF, grupo, sanitização e comprimento', () => {
    const p = fixtures.singleProposal(); p.metadata.number = 'TM0141';
    p.companies[0].tradeName = 'Empresa Teste';
    assert.equal(api.buildProposalFileName(p), 'TM0141 - Empresa Teste');
    p.companies[0].tradeName = ' '; p.companies[0].legalName = 'Razão Teste';
    assert.equal(api.buildProposalFileName(p), 'TM0141 - Razão Teste');
    const pf = fixtures.individualProposal(); pf.metadata.number = 'TM0150';
    assert.equal(api.buildProposalFileName(pf), `TM0150 - ${pf.individualClient.fullName}`);
    const group = fixtures.mixedGroupProposal(); group.metadata.number = 'TM0151'; group.groupName = 'Grupo Teste';
    assert.equal(api.buildProposalFileName(group), 'TM0151 - Grupo Teste');
    p.companies[0].tradeName = 'Empresa<>:"/\\|?*\u0001 Teste...';
    assert.equal(api.buildProposalFileName(p), 'TM0141 - Empresa Teste');
    p.companies[0].tradeName = 'A'.repeat(500); assert.equal(api.buildProposalFileName(p).length, 180);
});
test('quatro categorias personalizadas, múltiplos itens, edição e remoção sem catálogo', () => {
    const d = complete(); d.selections = {};
    const catalog = api.listCatalogEntries();
    for (const category of ['programs', 'management', 'measurements', 'trainings']) {
        const item = editor.addCustomItem(d, category, `custom-${category}`);
        item.title = `Item ${category}`; item.description = `Escopo ${category}`; item.notes = 'Observação';
        if (category === 'trainings') item.parameters = { participants: 12, classes: 2, hours: 8, modality: 'onsite' };
        if (category === 'measurements') item.parameters = { quantity: 3, unit: 'pontos' };
    }
    const extra = editor.addCustomItem(d, 'trainings', 'extra'); extra.title = 'Extra';
    extra.title = 'Editado';
    let result = editor.draftProposal(d); assert.deepEqual(result.issues, []);
    const sections = api.composeProposal(result.proposal).document.blocks.filter(b => b.kind === 'technical-section');
    assert.equal(sections.find(b => b.group === 'trainings').services.length, 2);
    for (const category of ['programs', 'measurements', 'trainings']) assert.ok(sections.some(b => b.group === category));
    assert.ok(sections.some(b => b.group === 'assistance'));
    assert.equal(result.proposal.services[3].custom.participants, 12);
    editor.removeCustomItem(d, 'extra'); result = editor.draftProposal(d);
    assert.equal(result.proposal.services.length, 4);
    assert.deepEqual(api.listCatalogEntries(), catalog);
    d.customItems[3].parameters.classes = 13;
    assert.ok(editor.draftProposal(d).issues.length);
});
test('customizados em grupo com e sem assessoria preservam empresa, pacote e overrides', () => {
    for (const assistance of [false, true]) {
        const d = complete(); editor.setClientKind(d, 'group'); d.groupName = 'Grupo';
        d.companies[1].legalName = 'Segunda'; d.companies[1].once = '2000';
        d.assistance = assistance;
        for (const c of d.companies) c.monthly = '500';
        const item = editor.addCustomItem(d, 'trainings', 'custom-group'); item.title = 'Treinamento especial'; item.companyId = d.companies[1].id;
        const result = editor.draftProposal(d); assert.deepEqual(result.issues, []);
        const custom = result.proposal.services.find(i => i.id === item.id);
        assert.equal(custom.companyId, d.companies[1].id);
        const line = result.proposal.commercial.lines.find(l => l.itemId === item.id);
        assert.equal(line.price.mode, 'included');
        assert.ok(line.price.coveredByItemId.startsWith(d.companies[1].id));
        assert.equal(result.proposal.commercial.lines.filter(l => l.price.mode === 'package').length, 2);
    }
});
test('fixture personalizada e PF usam os bindings tipados sem parâmetros duplicados', () => {
    const fixture = fixtures.customItemsProposal();
    assert.equal(api.composeProposal(fixture).ok, true);
    const training = fixture.services.find(item => item.custom.category === 'trainings');
    assert.equal(training.parameters, undefined);
    training.custom.participants = 15;
    const document = api.composeProposal(fixture).document;
    const presented = document.blocks.find(b => b.kind === 'technical-section' && b.group === 'trainings').services[0];
    assert.equal(presented.parameters.find(p => p.id === 'participants').value, 15);
    const d = complete(); editor.setClientKind(d, 'individual'); d.selections = {};
    d.individualClient = { fullName: 'Maria Exemplo', cpf: '52998224725' }; d.individualPricing.once = '5000';
    const item = editor.addCustomItem(d, 'trainings', 'custom-pf'); item.title = 'Treinamento personalizado PF';
    const result = editor.draftProposal(d); assert.deepEqual(result.issues, []);
    assert.equal(result.proposal.services[0].companyId, api.INDIVIDUAL_CLIENT_ID);
    assert.deepEqual(result.proposal.companies, []);
    item.companyId = 'empresa-removida';
    assert.ok(editor.draftProposal(d).issues.some(issue => issue.message.includes('empresa relacionada')));
});
test('combinações de valor único/mensalidade não vazam valor oculto e preservam dinheiro', () => {
    for (const charge of ['once', 'both']) for (const once of [true, false]) for (const monthly of [true, false]) {
        const d = complete(); d.charge = charge; d.companies[0].once = '5000'; d.companies[0].monthly = '300';
        d.showOnceValue = once; d.showMonthlyValue = monthly; d.showAggregateTotal = true; d.showContractTotal = true;
        const result = editor.draftProposal(d); assert.deepEqual(result.issues, []);
        const p = result.proposal; const snapshot = JSON.stringify(p);
        const block = api.composeProposal(p).document.blocks.find(b => b.kind === 'investment');
        for (const value of [...block.rows.map(r => r.price), ...block.companyRows, block.totals]) {
            assert.equal(value.onceCents, once ? 500000 : undefined);
            assert.equal(value.monthlyCents, monthly && charge === 'both' ? 30000 : undefined);
            if (!once) assert.equal(value.contractTotalCents, undefined);
        }
        assert.equal(JSON.stringify(p), snapshot); assert.equal(p.commercial.lines[0].price.onceCents, 500000);
    }
});
test('ambos ocultos suprimem total contratual mesmo quando o componente único é zero', () => {
    const d = complete(); d.charge = 'both'; d.companies[0].once = '0'; d.companies[0].monthly = '300';
    d.showOnceValue = false; d.showMonthlyValue = false; d.showContractTotal = true; d.showAggregateTotal = true;
    const result = editor.draftProposal(d); assert.deepEqual(result.issues, []);
    const block = api.composeProposal(result.proposal).document.blocks.find(b => b.kind === 'investment');
    for (const value of [block.totals, ...block.companyRows, ...block.rows.map(row => row.price)]) {
        assert.equal(value.onceCents, undefined); assert.equal(value.monthlyCents, undefined); assert.equal(value.contractTotalCents, undefined);
    }
});
test('PF: serviço, treinamento, identificação própria e investimento sem empresa fictícia', () => {
    for (const training of [false, true]) {
        const p = fixtures.individualProposal(training);
        const result = api.composeProposal(p);
        assert.equal(result.ok, true, JSON.stringify(result.issues));
        assert.deepEqual(p.companies, []);
        assert.equal(result.document.blocks[0].clientName, p.individualClient.fullName);
        assert.ok(result.document.blocks.some(b => b.kind === 'individual'));
        assert.ok(!result.document.blocks.some(b => b.kind === 'companies'));
        const investment = result.document.blocks.find(b => b.kind === 'investment');
        assert.equal(investment.rows[0].price.onceCents, 150000);
        assert.equal(investment.companyRows, undefined);
    }
});
test('troca Empresa → PF → Empresa ignora dados incompatíveis e restaura validação empresarial', () => {
    const d = complete();
    d.email = 'email inválido'; d.companies[0].taxId = '123';
    editor.setClientKind(d, 'individual');
    d.individualClient = { fullName: 'Maria de Souza Exemplo', cpf: '52998224725' };
    d.individualPricing.once = '2500';
    const result = editor.draftProposal(d);
    assert.deepEqual(result.issues, []);
    assert.deepEqual(result.proposal.companies, []);
    assert.equal(result.proposal.client.contact, undefined);
    assert.equal(result.proposal.individualClient.cpf, '529.982.247-25');
    assert.ok(!JSON.stringify(result.proposal).includes('Empresa Exemplo'));
    for (const cpf of ['', '123', '11111111111', '529-982-247.25', 'abc52998224725']) {
        d.individualClient.cpf = cpf;
        assert.ok(editor.draftProposal(d).issues.some(i => i.step === 0 && i.message === 'Informe um CPF válido.'));
        const p = fixtures.individualProposal(); p.individualClient.cpf = cpf;
        assert.equal(api.composeProposal(p).ok, false);
    }
    editor.setClientKind(d, 'single');
    assert.ok(editor.draftProposal(d).issues.some(i => i.message.includes('CNPJ')));
    d.email = ''; d.companies[0].taxId = '';
    const company = editor.draftProposal(d);
    assert.deepEqual(company.issues, []);
    assert.equal(company.proposal.individualClient, undefined);
    assert.equal(company.proposal.client.kind, 'single');
});
test('PF permite medição avulsa, treinamento e preset de assessoria', () => {
    for (const kind of ['heat', 'nr06', 'assistance']) {
        const d = complete(); editor.setClientKind(d, 'individual');
        d.individualClient = { fullName: 'Maria Exemplo', cpf: '52998224725' };
        d.individualPricing = { once: '1500', monthly: '200' };
        d.selections = {};
        if (kind === 'assistance') editor.applyEditorPreset(d, 'assistance');
        else {
            d.selections[kind] = editor.newSelection(kind);
            Object.assign(d.selections[kind].parameters, kind === 'nr06'
                ? { modality: 'onsite', participants: 1, classes: 1, hoursPerClass: 2, occurrences: 1, audience: 'Cliente' }
                : { quantity: 1, workGroups: ['Local de execução'], agent: 'Calor', method: 'IBUTG' });
        }
        const result = editor.draftProposal(d);
        assert.deepEqual(result.issues, [], kind);
        assert.deepEqual(result.proposal.companies, []);
    }
});
function complete() {
    const d = editor.newDraft();
    d.number = 'UI-001'; d.contact = 'Contato Exemplo';
    d.companies[0].legalName = 'Empresa Exemplo'; d.companies[0].once = '1500,00';
    editor.applyEditorPreset(d, 'pgr'); return d;
}
test('assessoria preserva público do treinamento e explica inconsistências específicas', () => {
    const draft = complete();
    editor.applyEditorPreset(draft, 'assistance'); draft.companies[0].monthly = '1500';
    draft.selections.nr06 = editor.newSelection('nr06');
    Object.assign(draft.selections.nr06.parameters, { participants: 10, classes: 1, hoursPerClass: 2, occurrences: 1, audience: 'Equipe de manutenção: reciclagem' });
    const result = editor.draftProposal(draft);
    assert.deepEqual(result.issues, []);
    assert.equal(result.proposal.trainings[0].parameters.audience, 'Equipe de manutenção: reciclagem');
    draft.selections.nr06.parameters.classes = 11;
    const invalid = editor.draftProposal(draft);
    assert.equal(invalid.proposal, undefined);
    assert.ok(invalid.issues.some(issue => issue.step === 1 && issue.message.includes('turmas maior')));
});
test('rascunho incompleto retorna mensagens por etapa; valores monetários não são arredondados silenciosamente', () => {
    const result = editor.draftProposal(editor.newDraft());
    assert.equal(result.proposal, undefined);
    assert.deepEqual([...new Set(result.issues.map(i => i.step))].sort(), [0, 1, 2]);
    assert.equal(editor.parseMoney('1500,01'), 150001);
    for (const value of ['', '-1', '1.001', '1e3', 'NaN']) assert.equal(editor.parseMoney(value), undefined);
});
test('preset cria seleção editável e preserva escolhas anteriores; gera Proposal válida', () => {
    const d = complete(); d.selections.pgr.notes = 'Observação própria';
    editor.applyEditorPreset(d, 'complete');
    assert.equal(d.selections.pgr.notes, 'Observação própria');
    assert.deepEqual(Object.keys(d.selections), ['pgr', 'pcmso', 'ltcat', 'lip', 'art']);
    const result = editor.draftProposal(d);
    assert.deepEqual(result.issues, []);
    assert.equal(api.composeProposal(result.proposal).ok, true);
});
test('assessoria mensal e grupo mantêm valores individuais sem agregado', () => {
    const d = complete(); editor.applyEditorPreset(d, 'assistance');
    d.isGroup = true; d.groupName = 'Grupo Exemplo'; d.companies[0].monthly = '1500';
    const second = editor.newCompany('company-2'); second.legalName = 'Segunda Empresa'; second.monthly = '1800'; d.companies.push(second);
    const result = editor.draftProposal(d);
    assert.deepEqual(result.issues, []);
    assert.equal(result.proposal.assistance.length, 2);
    const block = api.composeProposal(result.proposal).document.blocks.find(b => b.kind === 'investment');
    assert.equal(block.totals, undefined);
    assert.deepEqual(block.companyRows.map(c => c.monthlyCents), [150000, 180000]);
});
test('visitas e medições têm quantidades próprias; dados incompletos não lançam erro técnico', () => {
    const d = complete(); d.visits = true; d.isGroup = true; d.groupName = 'Grupo Exemplo';
    const second = editor.newCompany('company-2'); second.legalName = 'Segunda Empresa'; second.once = '1800';
    second.visits = { quantity: '3', hours: '2', frequency: 'quarterly', notes: 'Agendar previamente.' }; d.companies.push(second);
    const valid = editor.draftProposal(d);
    assert.deepEqual(valid.issues, []);
    const visits = valid.proposal.services.filter(s => s.catalogId === 'technical-visit');
    assert.deepEqual(visits.map(s => s.parameters.visits), [1, 3]);
    d.selections.heat = editor.newSelection('heat');
    assert.ok(editor.draftProposal(d).issues.some(i => i.message.includes('quantidade')));
    delete d.selections.heat;
    d.visitHours = 'Infinity';
    assert.doesNotThrow(() => editor.draftProposal(d));
    assert.equal(editor.draftProposal(d).proposal, undefined);
    d.visitHours = '4'; d.date = '2026-02-31';
    assert.ok(editor.draftProposal(d).issues.some(i => i.step === 0 && i.message.includes('data')));
});

test('modo e presets do catálogo chegam à Proposal sem apagar personalizações', () => {
    const draft = editor.newDraft();
    editor.applyEditorPreset(draft, 'medicao-calor');
    assert.equal(draft.documentMode, 'compact');
    assert.equal(draft.cover, false);
    assert.ok(draft.selections.heat);
    draft.documentMode = 'consultive';
    editor.applyEditorPreset(draft, 'pgr-pcmso-ltcat');
    assert.equal(draft.documentMode, 'consultive');
    assert.ok(draft.selections.heat && draft.selections.ltcat);
    const valid = complete();
    valid.documentMode = 'compact';
    assert.equal(editor.draftProposal(valid).proposal.options.documentMode, 'compact');
});

test('avisos de endereço e responsáveis não impedem exportação; erros obrigatórios impedem', () => {
    const draft = complete();
    draft.author = ''; draft.contact = '';
    const result = editor.draftProposal(draft);
    assert.ok(result.proposal);
    assert.deepEqual(result.issues, []);
    assert.ok(result.warnings.some(issue => issue.message.includes('Endereço')));
    assert.ok(result.warnings.some(issue => issue.message.includes('Responsável')));
    for (const mutate of [
        value => value.companies[0].legalName = '',
        value => value.selections = {},
        value => value.companies[0].once = '',
        value => editor.applyEditorPreset(value, 'brigade')
    ]) {
        const invalid = complete(); mutate(invalid);
        assert.equal(editor.draftProposal(invalid).proposal, undefined);
        assert.ok(editor.draftProposal(invalid).issues.length);
    }
});
