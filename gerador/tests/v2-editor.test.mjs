import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { loadV2 } from '../scripts/load-v2.mjs';
const { editor, api, dispose } = loadV2();
after(dispose);
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
