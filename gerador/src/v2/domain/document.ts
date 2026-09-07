import type { BillingTerms, CommercialVisibility, Company, Contact, Price, Proposal, ProposalItem } from './proposal';
import type { ServiceFrequency, VisitConfiguration } from './assistance';
import type { ContentField, DetailLevel, ParameterValue, SectionGroup } from './content';

export interface ServicePresentation {
    itemId: string;
    companyId: string;
    catalogId?: string;
    title: string;
    shortName: string;
    level: DetailLevel;
    fields: Partial<Record<ContentField, string[]>>;
    parameters: { id: string; label: string; value: ParameterValue; unit?: string }[];
    sharedContentIds: string[];
    notes?: string;
    frequency?: ServiceFrequency;
    visits?: VisitConfiguration;
}

export interface SharedTechnicalContent {
    id: string;
    field: ContentField;
    text: string;
    /** O texto se aplica individualmente a cada item, nunca a uma entrega única global. */
    appliesTo: { itemId: string; companyId: string }[];
}

export type TechnicalSectionBlock =
    | { id: string; kind: 'technical-section'; group: SectionGroup; title: string; services: ServicePresentation[] }
    | { id: string; kind: 'shared-technical'; title: string; content: SharedTechnicalContent[] };

/** Documento sem HTML e sem páginas presumidas. O renderer deve escapar todo texto. */
export type DocumentBlock =
    | { id: string; kind: 'cover'; title: string; clientName: string }
    | { id: string; kind: 'companies'; companies: Omit<Company, 'assistanceConfig'>[]; contact?: Contact }
    | { id: string; kind: 'scope'; scope: Proposal['scope'] }
    | TechnicalSectionBlock
    | { id: string; kind: 'additional-scope'; title: string; measurements: { itemId: string; companyId: string; title: string; quantity: number; unit: string; notes?: string; status: 'separate-quote' }[] }
    | InvestmentBlock
    | { id: string; kind: 'acceptance'; companyIds: string[]; author: Contact };

export interface InvestmentRow {
    itemId: string;
    companyId: string;
    title: string;
    /** Apenas campos autorizados para apresentação; nunca o Price bruto de entrada. */
    price: VisibleAmounts & { mode: Price['mode']; coveredByItemId?: string };
    billing?: BillingTerms;
}

export interface VisibleAmounts {
    onceCents?: number;
    monthlyCents?: number;
    contractTotalCents?: number;
}

export interface CompanyPricingRow extends VisibleAmounts {
    companyId: string;
    companyName: string;
    billing: BillingTerms[];
}

export interface InvestmentTotals extends VisibleAmounts {
    byCompany?: CompanyPricingRow[];
}

export interface InvestmentBlock {
    id: 'investment';
    kind: 'investment';
    visibility: CommercialVisibility;
    rows: InvestmentRow[];
    companyRows?: CompanyPricingRow[];
    /** Ausente e não calculado quando showAggregateTotal=false. */
    totals?: InvestmentTotals;
    /** Linhas brutas jamais são copiadas para as condições exibidas. */
    terms: Omit<Proposal['commercial'], 'lines'>;
}

export interface ProposalDocument {
    schemaVersion: 2;
    compositionVersion: 3;
    stage: 'composed';
    metadata: Proposal['metadata'];
    client: Proposal['client'];
    isGroup: boolean;
    groupName?: string;
    locale: 'pt-BR';
    currency: 'BRL';
    theme: 'engmarq';
    /** Snapshot integral para revisão/recomposição; o renderer apresenta somente blocks. */
    sourceItems: ProposalItem[];
    blocks: DocumentBlock[];
}
