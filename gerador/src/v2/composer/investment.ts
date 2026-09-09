import type { BillingTerms, CommercialVisibility, Proposal } from '../domain/proposal';
import { proposalItems } from '../domain/proposal';
import type { CompanyPricingRow, InvestmentBlock, InvestmentRow, InvestmentTotals, VisibleAmounts } from '../domain/document';
import type { ValidationIssue } from '../validation/proposal';

export function commercialVisibility(p: Proposal): CommercialVisibility {
    return {
        showMonthlyValue: p.commercial.showMonthlyValue ?? true,
        showContractTotal: p.commercial.showContractTotal ?? false,
        showAggregateTotal: p.commercial.showAggregateTotal ?? true,
        showPerCompanyPricing: p.commercial.showPerCompanyPricing ?? true
    };
}

/** Executa somente as agregações habilitadas. Usado após a validação dos valores individuais. */
export function composeInvestment(p: Proposal): { block: InvestmentBlock; issues: ValidationIssue[] } {
    const visibility = commercialVisibility(p);
    const issues: ValidationIssue[] = [];
    const items = proposalItems(p);
    const rows: InvestmentRow[] = [];
    const emptyAmounts = (): VisibleAmounts => ({ onceCents: 0, ...(visibility.showMonthlyValue ? { monthlyCents: 0 } : {}), ...(visibility.showContractTotal ? { contractTotalCents: 0 } : {}) });
    const companies = visibility.showPerCompanyPricing && p.client.kind !== 'individual' ? p.companies.map(company => ({ ...emptyAmounts(), companyId: company.id, companyName: company.tradeName ?? company.legalName, billing: [] as BillingTerms[] })) : undefined;
    const totals: InvestmentTotals | undefined = visibility.showAggregateTotal ? emptyAmounts() : undefined;
    const add = (target: VisibleAmounts, key: keyof VisibleAmounts, value: number): void => {
        const sum = (target[key] ?? 0) + value;
        if (!Number.isSafeInteger(sum) || sum < 0) issues.push({ severity: 'error', code: 'unsafe-total', path: `commercial.${key}`, message: 'Total solicitado fora da precisão segura em centavos.' });
        else target[key] = sum;
    };
    for (const line of p.commercial.lines) {
        const item = items.find(candidate => candidate.id === line.itemId)!;
        const row: InvestmentRow = { itemId: item.id, companyId: item.companyId, title: item.content.title, price: { mode: line.price.mode } };
        rows.push(row);
        if (line.price.mode === 'included') { row.price.coveredByItemId = line.price.coveredByItemId; continue; }
        if (line.price.mode === 'separate-quote') continue;
        const once = line.price.mode === 'package' ? line.price.onceCents : line.price.cadence === 'once' ? line.price.amountCents : 0;
        const monthly = line.price.mode === 'package' ? line.price.monthlyCents : line.price.cadence === 'monthly' ? line.price.amountCents : 0;
        const billing: BillingTerms = {
            termMonths: line.billing?.termMonths ?? (item.kind === 'assistance' ? item.termMonths : p.commercial.termMonths),
            installmentCount: line.billing?.installmentCount ?? p.commercial.installmentCount,
            paymentTerms: line.billing?.paymentTerms ?? p.commercial.paymentTerms
        };
        row.billing = billing;
        const company: CompanyPricingRow | undefined = companies?.find(candidate => candidate.companyId === item.companyId);
        if (p.client.kind === 'individual' && visibility.showPerCompanyPricing) {
            row.price.onceCents = once;
            if (visibility.showMonthlyValue) row.price.monthlyCents = monthly;
        }
        if (company) {
            if (!company.billing.some(terms => JSON.stringify(terms) === JSON.stringify(billing))) company.billing.push(billing);
            row.price.onceCents = once;
            add(company, 'onceCents', once);
            if (visibility.showMonthlyValue) { row.price.monthlyCents = monthly; add(company, 'monthlyCents', monthly); }
        }
        if (totals) {
            add(totals, 'onceCents', once);
            if (visibility.showMonthlyValue) add(totals, 'monthlyCents', monthly);
        }
        // Não calcula mensalidade × vigência quando a projeção contratual está desligada.
        if (visibility.showContractTotal && (company || totals || p.client.kind === 'individual' && visibility.showPerCompanyPricing)) {
            if (monthly > 0 && (!Number.isSafeInteger(billing.termMonths) || billing.termMonths! < 1)) {
                issues.push({ severity: 'error', code: 'contract-term-required', path: `commercial.lines.${line.itemId}`, message: 'Total contratual exige vigência explícita para cada cobrança recorrente.' });
                continue;
            }
            const contract = once + monthly * (billing.termMonths ?? 0);
            if (!Number.isSafeInteger(contract) || contract < 0) {
                issues.push({ severity: 'error', code: 'unsafe-total', path: `commercial.lines.${line.itemId}`, message: 'Valor contratual fora da precisão segura em centavos.' });
                continue;
            }
            if (p.client.kind === 'individual' && visibility.showPerCompanyPricing) row.price.contractTotalCents = contract;
            if (company) { row.price.contractTotalCents = contract; add(company, 'contractTotalCents', contract); }
            if (totals) add(totals, 'contractTotalCents', contract);
        }
    }
    const { lines: _lines, ...terms } = p.commercial;
    const block: InvestmentBlock = { id: 'investment', kind: 'investment', visibility, rows, terms };
    if (companies) block.companyRows = companies;
    if (totals) {
        if (companies) totals.byCompany = companies;
        block.totals = totals;
    }
    return { block, issues };
}
