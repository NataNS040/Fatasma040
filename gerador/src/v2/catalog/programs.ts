import { common, defineEntry, listParameter, programParameters, sources } from './shared';

const provider = [common.qualified, common.delivery];
const client = [common.information, common.access, common.implementation];
const periodicity = { mode: 'on-demand' as const, description: 'Elaboração conforme contratação; revisões por alterações de atividades ou condições de trabalho devem ter seu alcance definido no escopo.' };

export const programEntries = [
    defineEntry({
        id: 'pgr', kind: 'program', title: 'PGR — Programa de Gerenciamento de Riscos', shortName: 'PGR',
        category: 'programs', section: 'programs', order: 10, icon: 'file-shield',
        summary: 'Elaboração do inventário de riscos ocupacionais e do plano de ação, considerando atividades, funções e ambientes da empresa.',
        objective: 'Organizar a identificação de perigos, a avaliação dos riscos e as medidas de prevenção para subsidiar a gestão de SST da contratante.',
        scope: ['Reconhecimento das atividades e dos ambientes abrangidos.', 'Avaliação qualitativa dos riscos físicos, químicos, biológicos, ergonômicos e de acidentes.', 'Inventário de riscos e plano de ação individualizados por empresa.'],
        methodology: [common.planning, 'Visita de reconhecimento, análise documental e levantamento das exposições por função e ambiente.', 'Classificação dos riscos e priorização das medidas de prevenção conforme as condições identificadas.'],
        steps: ['Alinhar dados cadastrais, funções e cronograma.', 'Reconhecer perigos e condições de exposição.', 'Consolidar inventário e prioridades de controle.', 'Elaborar plano de ação e entregar o programa.'],
        deliverables: ['Inventário de riscos ocupacionais.', 'Plano de ação com medidas preventivas, prioridades e orientação de acompanhamento.', 'PGR identificado e assinado pelo responsável técnico.'],
        references: ['NR-01 — Gerenciamento de Riscos Ocupacionais.'], provider, client,
        inclusions: ['Levantamento qualitativo necessário à elaboração do programa.', 'Orientações para utilização do inventário e do plano de ação.'],
        exclusions: ['Avaliações quantitativas não selecionadas no escopo.', 'Execução das adequações e medidas de controle propostas.'],
        observations: [common.quantitative, 'PCMSO, LTCAT e demais serviços mantêm entregáveis próprios, ainda que contratados em conjunto.'],
        periodicity, parameters: programParameters, sources: [sources.programs, sources.assistance]
    }),
    defineEntry({
        id: 'pcmso', kind: 'program', title: 'PCMSO — Programa de Controle Médico de Saúde Ocupacional', shortName: 'PCMSO',
        category: 'programs', section: 'programs', order: 20, icon: 'file-medical',
        summary: 'Programa médico ocupacional com matriz de exames por função e planejamento do acompanhamento da saúde dos trabalhadores.',
        objective: 'Orientar a vigilância da saúde dos trabalhadores com base nos riscos ocupacionais informados e identificados para a empresa.',
        scope: ['Análise dos riscos relacionados às funções abrangidas.', 'Definição dos exames ocupacionais e respectivos critérios de acompanhamento.', 'Organização do cronograma de ações de saúde ocupacional.'],
        methodology: [common.planning, 'Análise do inventário de riscos disponível e das informações de funções e exposições.', 'Planejamento médico dos exames e ações de acompanhamento, alinhado aos riscos do PGR.'],
        steps: ['Receber inventário e relação de funções.', 'Definir matriz de exames e periodicidades aplicáveis.', 'Organizar cronograma de acompanhamento.', 'Entregar o programa sob responsabilidade médica.'],
        deliverables: ['Matriz de exames ocupacionais por função.', 'Cronograma de acompanhamento médico.', 'PCMSO assinado pelo médico responsável.'],
        references: ['NR-07 — Programa de Controle Médico de Saúde Ocupacional.'],
        provider: [...provider, 'Disponibilizar responsabilidade médica para elaboração do PCMSO.'],
        client: [...client, 'Disponibilizar o inventário de riscos e organizar a realização dos exames previstos.'],
        inclusions: ['Elaboração documental do programa médico e orientação sobre a matriz de exames.'],
        exclusions: ['Realização e custeio de exames, consultas e procedimentos médicos não contratados.'],
        observations: ['A contratação do PCMSO não pressupõe a contratação de clínica ou de exames ocupacionais.'],
        periodicity, parameters: programParameters, sources: [sources.programs]
    }),
    defineEntry({
        id: 'ltcat', kind: 'report', title: 'LTCAT — Laudo Técnico das Condições Ambientais do Trabalho', shortName: 'LTCAT',
        category: 'programs', section: 'programs', order: 30, icon: 'file-lines',
        summary: 'Caracterização técnica das condições ambientais e da exposição a agentes nocivos para subsidiar a documentação previdenciária.',
        objective: 'Documentar as condições de exposição ocupacional das funções abrangidas e apresentar conclusões técnicas para fins previdenciários.',
        scope: ['Levantamento das atividades, agentes e condições de exposição.', 'Análise das informações ambientais e avaliações disponíveis.', 'Conclusão técnica relativa às condições de trabalho avaliadas.'],
        methodology: [common.planning, 'Reconhecimento dos ambientes e análise das exposições por função.', 'Análise técnica das evidências disponíveis e dos resultados de avaliações contratadas.'],
        steps: ['Levantar funções, atividades e agentes nocivos.', 'Analisar condições e registros de exposição.', 'Identificar necessidade de informações ou avaliações complementares.', 'Emitir o laudo com conclusões e identificação da responsabilidade técnica.'],
        deliverables: ['Caracterização das exposições por função ou grupo avaliado.', 'Conclusões técnicas previdenciárias.', 'LTCAT assinado pelo responsável técnico.'],
        references: ['Lei nº 8.213/91.', 'Decreto nº 3.048/1999.', 'IN 128/INSS — referência utilizada nas propostas de origem.'],
        provider, client,
        inclusions: ['Levantamento e análise técnica para elaboração do laudo.'],
        exclusions: ['Avaliações quantitativas não selecionadas no escopo.', 'Envio de eventos do eSocial quando não contratado.'],
        observations: [common.quantitative, 'ART deve constar expressamente nos itens contratados quando aplicável; não é cobrada novamente dentro deste item.'],
        periodicity, parameters: programParameters, sources: [sources.programs, sources.unimetais]
    }),
    defineEntry({
        id: 'lip', kind: 'report', title: 'Laudo de Insalubridade e Periculosidade', shortName: 'LIP',
        category: 'programs', section: 'programs', order: 40, icon: 'file-circle-exclamation',
        summary: 'Análise das atividades e ambientes para caracterização técnica das condições de insalubridade e periculosidade.',
        objective: 'Avaliar as condições de trabalho abrangidas e fundamentar as conclusões técnicas relativas às exposições e operações analisadas.',
        scope: ['Inspeção das atividades e condições de exposição.', 'Análise dos agentes e operações presentes no escopo.', 'Conclusões de insalubridade e periculosidade por atividade avaliada.'],
        methodology: [common.planning, 'Inspeção técnica, análise documental e avaliação das exposições conforme os critérios aplicáveis.', 'Consideração dos resultados de medições contratadas e dos controles existentes.'],
        steps: ['Identificar atividades e exposições.', 'Analisar medidas de proteção e avaliações disponíveis.', 'Aplicar os critérios técnicos pertinentes.', 'Consolidar conclusões no laudo.'],
        deliverables: ['Descrição das atividades e exposições avaliadas.', 'Análise técnica de insalubridade e periculosidade.', 'Laudo com conclusões e assinatura do responsável técnico.'],
        references: ['NR-15 — Atividades e Operações Insalubres.', 'NR-16 — Atividades e Operações Perigosas.'],
        provider, client,
        inclusions: ['Análise técnica documental e das atividades incluídas na proposta.'],
        exclusions: ['Avaliações quantitativas não selecionadas no escopo.', 'Atuação como assistente técnico judicial não contratada.'],
        observations: [common.quantitative, 'As conclusões dependem das condições efetivamente constatadas; não há resultado de enquadramento predeterminado.'],
        periodicity, parameters: programParameters, sources: [sources.assistance, sources.unimetais]
    }),
    defineEntry({
        id: 'aet', kind: 'report', title: 'Análise Ergonômica do Trabalho', shortName: 'AET',
        category: 'programs', section: 'complementary', order: 10, icon: 'person-walking',
        summary: 'Estudo das tarefas, atividades e postos de trabalho, com diagnóstico ergonômico e recomendações priorizadas por setor.',
        objective: 'Avaliar a adequação das condições de trabalho às características dos trabalhadores e orientar melhorias nos postos e na organização das atividades.',
        scope: ['Organização do trabalho, tarefas prescritas e atividades reais.', 'Posturas, esforços, repetitividade, manuseio de cargas e demandas cognitivas.', 'Mobiliário, ferramentas, equipamentos e condições ambientais dos postos selecionados.'],
        methodology: [common.planning, 'Observação sistemática das atividades, entrevistas e análise dos postos e condições de trabalho.', 'Aplicação de ferramentas ergonômicas compatíveis com a demanda, como RULA, REBA, OWAS ou Equação de NIOSH, conforme planejamento técnico.', 'Consolidação do diagnóstico por setor com priorização de recomendações.'],
        steps: ['Analisar demanda e planejar acesso aos setores.', 'Observar tarefas e atividades reais.', 'Avaliar mobiliário, exigências físicas e organização do trabalho.', 'Aplicar ferramentas selecionadas e consolidar diagnóstico.', 'Entregar relatório e plano de ação ergonômico.'],
        deliverables: ['Relatório de AET com análise dos postos e diagnóstico por setor.', 'Matriz de riscos ergonômicos e registros das condições avaliadas.', 'Plano de ação ergonômico com recomendações priorizadas.'],
        references: ['NR-17 — Ergonomia.'], provider, client,
        inclusions: ['Análise das atividades e dos postos expressamente abrangidos.', 'Recomendações técnicas e orientação sobre o plano de ação.'],
        exclusions: ['Aquisição ou fornecimento de mobiliário.', 'Implementação das adequações e projetos de reforma.', 'Treinamentos ou medições instrumentais não discriminados na contratação.'],
        observations: ['A proposta de origem do CLBI contém medições ambientais; no catálogo universal essas avaliações devem ser dimensionadas expressamente, sem replicar os quantitativos daquele cliente.'],
        periodicity, parameters: [...programParameters, listParameter('ergonomicTools', 'Ferramentas ergonômicas previstas', undefined, false)], sources: [sources.aet]
    })
];
