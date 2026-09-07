import { proposalItems, type Proposal } from '../domain/proposal';
import type { DocumentBlock, ProposalDocument } from '../domain/document';
import { validateProposal, type ValidationIssue } from '../validation/proposal';
import { composeTechnicalSections } from './technical-sections';
import { sectionDefinitions, type CompositionOptions } from './presentation-policy';
import { resolveAssistanceProposal } from '../configurator/assistance';
import { composeInvestment } from './investment';
import { composeCoordination } from './coordination';

export type CompositionResult =
    | { ok: false; issues: ValidationIssue[] }
    | { ok: true; document: ProposalDocument; issues: ValidationIssue[] };

/** Puro, determinístico e local: não acessa DOM, rede, relógio, storage ou V1. */
export function composeProposal(input: Proposal, options: CompositionOptions = {}): CompositionResult {
    const resolved = resolveAssistanceProposal(input);
    if (!resolved.ok) return resolved;
    const issues = validateProposal(resolved.proposal);
    for (const [group, order] of Object.entries(options.sectionOrder ?? {})) {
        if (!Object.prototype.hasOwnProperty.call(sectionDefinitions, group) || !Number.isFinite(order)) issues.push({ severity: 'error', code: 'section-policy', path: `sectionOrder.${group}`, message: 'Grupo desconhecido ou ordem inválida.' });
    }
    for (const [group, title] of Object.entries(options.sectionTitles ?? {})) {
        if (!Object.prototype.hasOwnProperty.call(sectionDefinitions, group) || !title?.trim()) issues.push({ severity: 'error', code: 'section-policy', path: `sectionTitles.${group}`, message: 'Grupo desconhecido ou título vazio.' });
    }
    if (issues.some(issue => issue.severity === 'error')) return { ok: false, issues };
    // Dados são JSON por contrato. O documento possui seu próprio snapshot editável.
    const p = JSON.parse(JSON.stringify(resolved.proposal)) as Proposal;
    const items = proposalItems(p);
    const blocks: DocumentBlock[] = [];
    if (p.options.includeCover) blocks.push({ id: 'cover', kind: 'cover', title: p.metadata.title, clientName: p.client.displayName });
    blocks.push({ id: 'companies', kind: 'companies', companies: p.companies, contact: p.client.contact });
    blocks.push({ id: 'scope', kind: 'scope', scope: p.scope });
    const separateIds = new Set(p.commercial.lines.filter(line => line.price.mode === 'separate-quote').map(line => line.itemId));
    const mode = p.options.documentMode ?? 'standard';
    const includedItems = items.filter(item => !separateIds.has(item.id));
    const companyIds = p.companies.map(company => company.id);
    if (mode === 'consultive') {
        const coordination = composeCoordination(includedItems, companyIds);
        if (coordination) blocks.push(coordination);
    }
    blocks.push(...composeTechnicalSections(includedItems, companyIds, p.options.detailLevel ?? (mode === 'consultive' ? 'full' : undefined), options, mode));
    const separateMeasurements = p.measurements.filter(item => separateIds.has(item.id));
    if (separateMeasurements.length) blocks.push({ id: 'additional-scope', kind: 'additional-scope', title: 'Medições sujeitas a orçamento separado', measurements: separateMeasurements.map(item => ({ itemId: item.id, companyId: item.companyId, title: item.content.title, quantity: item.quantity, unit: item.unit, notes: item.notes, status: 'separate-quote' })) });
    blocks.push(composeInvestment(p).block);
    if (p.options.includeAcceptance) blocks.push({ id: 'acceptance', kind: 'acceptance', companyIds: p.companies.map(company => company.id), author: p.metadata.author });
    return {
        ok: true, issues,
        document: { schemaVersion: 2, compositionVersion: 3, stage: 'composed', metadata: p.metadata, client: p.client, isGroup: p.isGroup ?? p.client.kind === 'group', ...(p.client.kind === 'group' ? { groupName: p.groupName ?? p.client.displayName } : {}), locale: 'pt-BR', currency: 'BRL', theme: 'engmarq', documentMode: mode, sourceItems: items, blocks }
    };
}
