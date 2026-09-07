import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { loadV2 } from './load-v2.mjs';

const { api, fixtures, dispose } = loadV2();
try {
    const proposal = fixtures.universalCatalogProposal();
    const result = api.composeProposal(proposal);
    if (!result.ok) throw new Error(JSON.stringify(result.issues));
    const directory = new URL('../examples/', import.meta.url);
    mkdirSync(directory, { recursive: true });
    // Snapshot de entrada integral e saída estrutural compacta; não é exportação PDF.
    const outline = {
        proposalNumber: result.document.metadata.number,
        compositionVersion: result.document.compositionVersion,
        stage: result.document.stage,
        sourceItemIds: result.document.sourceItems.map(item => item.id),
        blocks: result.document.blocks.map(block => {
            switch (block.kind) {
                case 'technical-section': return { id: block.id, kind: block.kind, title: block.title, services: block.services.map(service => ({
                    itemId: service.itemId, catalogId: service.catalogId, companyId: service.companyId,
                    level: service.level, fields: Object.keys(service.fields), parameters: service.parameters, sharedContentIds: service.sharedContentIds
                })) };
                case 'shared-technical': return { id: block.id, kind: block.kind, title: block.title, content: block.content };
                case 'investment': return { id: block.id, kind: block.kind, totals: block.totals };
                default: return { id: block.id, kind: block.kind };
            }
        })
    };
    writeFileSync(new URL('v2-catalog-proposal.json', directory), JSON.stringify(proposal, null, 2) + '\n', 'utf8');
    writeFileSync(new URL('v2-catalog-document-outline.json', directory), JSON.stringify(outline, null, 2) + '\n', 'utf8');
    console.log(`Exemplos gerados em ${fileURLToPath(directory)}`);
    console.log(outline.blocks.map(block => block.title ?? block.kind).join(' → '));
    for (const [name, factory] of [['assistance', fixtures.tm136AssistanceProposal], ['group', fixtures.tm137GroupProposal]]) {
        const configured = factory();
        const composed = api.composeProposal(configured);
        if (!composed.ok) throw new Error(JSON.stringify(composed.issues));
        writeFileSync(new URL(`v2-${name}-proposal.json`, directory), JSON.stringify(configured, null, 2) + '\n', 'utf8');
        writeFileSync(new URL(`v2-${name}-document-outline.json`, directory), JSON.stringify({
            compositionVersion: composed.document.compositionVersion,
            isGroup: composed.document.isGroup,
            blocks: composed.document.blocks.map(block => block.kind === 'investment' ? block : block.kind === 'technical-section' ? {
                id: block.id, kind: block.kind, title: block.title,
                services: block.services.map(s => ({ itemId: s.itemId, companyId: s.companyId, catalogId: s.catalogId, parameters: s.parameters, visits: s.visits, frequency: s.frequency }))
            } : { id: block.id, kind: block.kind })
        }, null, 2) + '\n', 'utf8');
    }
} finally {
    dispose();
}
