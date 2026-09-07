import type { DetailLevel, ParameterValues } from './content';

export type ServiceFrequency = 'once' | 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual' | 'on-demand';
export type ProgramId = 'pgr' | 'pcmso' | 'ltcat' | 'lip' | 'aet';
export type ManagementId = 'psychosocial' | 'esocial' | 'art' | 'technical-support';
export type MeasurementId = 'noise' | 'heat' | 'vibration' | 'chemicals' | 'dust';
export type TrainingId = 'nr01' | 'nr05' | 'nr06' | 'nr10' | 'nr12' | 'nr18' | 'nr20' | 'nr33' | 'nr35' | 'brigade';

export interface CatalogServiceConfiguration {
    selected: boolean;
    parameters?: ParameterValues;
    detailLevel?: DetailLevel;
    notes?: string;
}

export type VisitConfiguration =
    | { included: false; notes?: string }
    | { included: true; frequency: ServiceFrequency; durationHours: number; quantity: number; notes?: string };

/** Campos podem ser completados na empresa; após herança todos os obrigatórios são validados. */
export interface TrainingConfiguration {
    selected: boolean;
    participants?: number;
    modality?: 'onsite' | 'online' | 'hybrid';
    frequency?: ServiceFrequency;
    /** Total de ocorrências contratado, não uma duração normativa presumida. */
    occurrences?: number;
    classes?: number;
    hoursPerClass?: number;
    notes?: string;
    detailLevel?: DetailLevel;
}

export interface MeasurementConfiguration {
    selected: boolean;
    quantity?: number;
    unit?: 'point' | 'sample' | 'dosimetry';
    agent?: string;
    method?: string;
    workGroups?: string[];
    pricingMode?: 'included' | 'separate-quote';
    notes?: string;
    detailLevel?: DetailLevel;
}

export interface AssistanceConfiguration {
    programs?: Partial<Record<ProgramId, CatalogServiceConfiguration>>;
    management?: Partial<Record<ManagementId, CatalogServiceConfiguration>>;
    measurements?: Partial<Record<MeasurementId, MeasurementConfiguration>>;
    trainings?: Partial<Record<TrainingId, TrainingConfiguration>>;
    /** Quantity é o total de visitas contratado na vigência. Frequency descreve a cadência. */
    visits: VisitConfiguration;
    renewal: string;
    adjustment: string;
    notes?: string;
}

export interface CompanyAssistancePricing {
    onceCents?: number;
    monthlyCents?: number;
    /** Quando omitidos, vigência/parcelas/pagamento usam os valores de commercial. */
    termMonths?: number;
    installmentCount?: number;
    paymentTerms?: string[];
}

export interface CompanyAssistanceConfiguration {
    programs?: Partial<Record<ProgramId, Partial<CatalogServiceConfiguration>>>;
    management?: Partial<Record<ManagementId, Partial<CatalogServiceConfiguration>>>;
    measurements?: Partial<Record<MeasurementId, Partial<MeasurementConfiguration>>>;
    trainings?: Partial<Record<TrainingId, Partial<TrainingConfiguration>>>;
    /** Substitui o plano de visitas inteiro, evitando restos de configuração desativada. */
    visits?: VisitConfiguration;
    renewal?: string;
    adjustment?: string;
    notes?: string;
    pricing: CompanyAssistancePricing;
}
