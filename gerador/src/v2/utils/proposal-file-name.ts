import type { Proposal } from '../domain/proposal';

/** Nome base sem extensão; conserva acentos e limita o nome a 180 caracteres. */
export function buildProposalFileName(proposal: Proposal): string {
    const clean = (text: string): string => text.replace(/[<>:"/\\|?*\x00-\x1f\x7f]/g, ' ').replace(/\s+/g, ' ').trim().replace(/[. ]+$/g, '');
    const client = proposal.client.kind === 'individual' ? proposal.individualClient?.fullName
        : proposal.client.kind === 'group' ? proposal.groupName || proposal.client.displayName
        : proposal.companies[0]?.tradeName?.trim() || proposal.companies[0]?.legalName;
    const code = clean(proposal.metadata.number).slice(0, 60) || 'Proposta';
    return `${code} - ${clean(client || '') || 'Cliente'}`.slice(0, 180).replace(/[. ]+$/g, '');
}
