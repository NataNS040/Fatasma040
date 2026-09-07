import type { DocumentBlock } from '../domain/document';
import type { ProposalItem } from '../domain/proposal';

export function composeCoordination(items: ProposalItem[], companyIds: string[]): Extract<DocumentBlock, { kind: 'coordination' }> | undefined {
    const entries: Extract<DocumentBlock, { kind: 'coordination' }>['entries'] = [];
    const add = (title: string, text: string, matches: (own: ProposalItem[]) => boolean): void => {
        const applicable = companyIds.filter(companyId => matches(items.filter(item => item.companyId === companyId)));
        if (applicable.length) entries.push({ title, text, companyIds: applicable });
    };
    add('Integração documental', 'Conferir funções, ambientes e exposições na mesma base cadastral. O PGR organiza os riscos; o PCMSO utiliza essa base para o planejamento médico, e os laudos mantêm suas finalidades e critérios próprios. Pendências técnicas devem ser resolvidas antes das conclusões afetadas.', own => own.filter(item => ['pgr', 'pcmso', 'ltcat', 'lip'].includes(item.catalogId ?? '')).length > 1);
    add('Dependência das avaliações', 'Programar as avaliações selecionadas em condições representativas de trabalho. Disponibilizar os resultados aos responsáveis pelos documentos abrangidos; coleta, análise e emissão precisam respeitar essa sequência.', own => own.some(item => item.kind === 'measurement') && own.some(item => item.kind === 'program' || item.kind === 'report'));
    add('Plano de atendimento', 'Na abertura, pactuar prioridades, responsáveis e agenda dos serviços selecionados. Nos acompanhamentos contratados, registrar avanços, pendências e decisões da contratante. Mudanças de unidades, atividades ou quantitativos exigem reavaliação do escopo e aprovação prévia.', own => own.some(item => item.kind === 'assistance'));
    add('Mobilização das capacitações', 'Organizar as turmas pelos públicos definidos em cada item, confirmando disponibilidade, pré-requisitos e infraestrutura. Os registros de conclusão permanecem individualizados por capacitação e participante.', own => own.filter(item => item.kind === 'training').length > 1);
    add('Devolutiva e ações preventivas', 'Alinhar a devolutiva dos resultados agregados com os responsáveis pela gestão de riscos. Definir responsáveis e prioridades para as ações organizacionais, preservando a confidencialidade dos participantes.', own => own.some(item => item.kind === 'psychosocial'));
    return entries.length ? { id: 'coordination', kind: 'coordination', title: 'Planejamento integrado e acompanhamento', entries } : undefined;
}