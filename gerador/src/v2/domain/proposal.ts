import type { DetailLevel, DocumentMode, ParameterValues, ServiceProfile } from './content';
import type { AssistanceConfiguration, CompanyAssistanceConfiguration, ServiceFrequency, VisitConfiguration } from './assistance';

/** Contrato local V2. Strings são texto, nunca HTML. Datas civis: YYYY-MM-DD. */
export interface IndividualClient { fullName: string; cpf: string; }

/** Referência ao próprio cliente PF nos itens; não corresponde a uma Company. */
export const INDIVIDUAL_CLIENT_ID = '@individual';

export interface Contact {
    name: string;
    role?: string;
    email?: string;
    phone?: string;
}

export interface Company {
    id: string;
    legalName: string;
    tradeName?: string;
    taxId?: string;
    address?: { street: string; district?: string; postalCode?: string; city: string; state: string };
    employeeCount?: number;
    roleCount?: number;
    roles?: string[];
    assistanceConfig?: CompanyAssistanceConfiguration;
}

export type ServiceKind = 'program' | 'report' | 'psychosocial' | 'engineering' | 'management' | 'custom';
export type ContentKind = ServiceKind | 'training' | 'measurement' | 'assistance';

/** Snapshot técnico editável e versionado; referências não atestam vigência normativa. */
export interface TechnicalContent {
    title: string;
    objective: string;
    methodology: string[];
    deliverables: string[];
    exclusions: string[];
    responsibilities: string[];
    references: string[];
    provenance: { source: string; sources?: string[]; revision: string; review: 'pending' | 'reviewed' };
    /** Opcional para preservar snapshots da fundação V2 e conteúdo personalizado. */
    profile?: ServiceProfile;
}

export interface ScopeItem {
    id: string;
    /** ID da empresa ou INDIVIDUAL_CLIENT_ID para o próprio cliente PF, sem Company. */
    companyId: string;
    content: TechnicalContent;
    catalogId?: string;
    detailLevel?: DetailLevel;
    parameters?: ParameterValues;
    notes?: string;
}

export interface Service extends ScopeItem {
    kind: ServiceKind;
    psychosocial?: { participantCount: number; instruments: string[]; integration: string };
}

export interface Training extends ScopeItem {
    kind: 'training';
    modality: 'onsite' | 'online' | 'hybrid';
    participants: number;
    classes: number;
    hoursPerClass: number;
    occurrences: number;
    syllabus: string[];
    frequency?: ServiceFrequency;
}

export interface Measurement extends ScopeItem {
    kind: 'measurement';
    agent: string;
    method: string;
    quantity: number;
    unit: 'point' | 'sample' | 'dosimetry';
    workGroups: string[];
    pricingMode?: 'included' | 'separate-quote';
}

export interface Assistance extends ScopeItem {
    kind: 'assistance';
    termMonths: number;
    /** Compatibilidade com as fixtures anteriores; não combinar com visits. */
    visitsPerMonth?: number;
    hoursPerVisit?: number;
    visits?: VisitConfiguration;
    support: string[];
    renewal: string;
    adjustment: string;
}

/** Centavos inteiros. Itens inclusos apontam para a cobrança que os cobre. */
export type Price =
    | { mode: 'charge'; cadence: 'once' | 'monthly'; amountCents: number }
    | { mode: 'package'; onceCents: number; monthlyCents: number }
    | { mode: 'included'; coveredByItemId: string }
    | { mode: 'separate-quote' };

export interface BillingTerms {
    termMonths?: number;
    installmentCount?: number;
    paymentTerms?: string[];
}

export interface CommercialVisibility {
    showMonthlyValue: boolean;
    showContractTotal: boolean;
    showAggregateTotal: boolean;
    showPerCompanyPricing: boolean;
}

export interface Commercial extends BillingTerms, Partial<CommercialVisibility> {
    currency: 'BRL';
    lines: CommercialLine[];
    validityDays: number;
    paymentTerms: string[];
    executionTerms: string[];
}

export interface CommercialLine {
    itemId: string;
    price: Price;
    billing?: BillingTerms;
}

export interface Proposal {
    schemaVersion: 2;
    metadata: { id: string; number: string; issuedOn: string; revision: number; title: string; author: Contact };
    client: { kind: 'single' | 'group' | 'individual'; displayName: string; contact?: Contact };
    /** Explícitos no configurador; opcionais apenas para compatibilidade com Proposals V2 anteriores. */
    isGroup?: boolean;
    groupName?: string;
    individualClient?: IndividualClient;
    companies: Company[];
    scope: { objective: string; exclusions: string[]; assumptions: string[] };
    services: Service[];
    trainings: Training[];
    measurements: Measurement[];
    assistance: Assistance[];
    /** Fonte canônica configurável. Não combinar com coleções/linhas já materializadas. */
    assistanceConfiguration?: AssistanceConfiguration;
    commercial: Commercial;
    options: { includeCover: boolean; includeAcceptance: boolean; detailLevel?: DetailLevel; documentMode?: DocumentMode };
}

export type ProposalItem = Service | Training | Measurement | Assistance;

export function proposalItems(proposal: Proposal): ProposalItem[] {
    return [...proposal.services, ...proposal.trainings, ...proposal.measurements, ...proposal.assistance];
}
