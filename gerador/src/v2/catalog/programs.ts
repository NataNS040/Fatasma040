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
        deliverables: ['Inventário com perigos, fontes, grupos expostos, controles existentes e classificação dos riscos por atividade.', 'Plano de ação com medidas priorizadas, proposta de cronograma e responsáveis a pactuar com a contratante.', 'PGR identificado e assinado pelo responsável técnico.'],
        references: ['NR-01 — Gerenciamento de Riscos Ocupacionais.'], provider, client,
        inclusions: ['Levantamento qualitativo necessário à elaboração do programa.', 'Orientações para utilização do inventário e do plano de ação.'],
        exclusions: ['Avaliações quantitativas não selecionadas no escopo.', 'Execução das adequações e medidas de controle propostas.'],
        observations: [common.quantitative, 'PCMSO, LTCAT e demais serviços mantêm entregáveis próprios, ainda que contratados em conjunto.'],
        commercialConditions: [common.quantitative],
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
        deliverables: ['Matriz de exames clínicos e complementares por função e risco, com periodicidades e critérios definidos pelo médico responsável.', 'Cronograma de acompanhamento médico e orientações para encaminhamento dos trabalhadores.', 'PCMSO assinado pelo médico responsável.'],
        references: ['NR-07 — Programa de Controle Médico de Saúde Ocupacional.'],
        provider: [...provider, 'Disponibilizar responsabilidade médica para elaboração do PCMSO.'],
        client: [...client, 'Disponibilizar o inventário de riscos e organizar a realização dos exames previstos.'],
        inclusions: ['Elaboração documental do programa médico e orientação sobre a matriz de exames.'],
        exclusions: ['Realização e custeio de exames, consultas e procedimentos médicos não contratados.'],
        observations: ['A contratação do PCMSO não pressupõe a contratação de clínica ou de exames ocupacionais.', 'O programa depende de inventário de riscos consistente; lacunas devem ser comunicadas para complementação antes das definições médicas afetadas.'],
        commercialConditions: ['A contratação do PCMSO não pressupõe a contratação de clínica ou de exames ocupacionais.'],
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
        deliverables: ['Caracterização de agentes, fontes, frequência e duração das exposições por função ou grupo avaliado.', 'Conclusões previdenciárias fundamentadas nas evidências disponíveis, com indicação de controles e limitações da avaliação.', 'LTCAT assinado pelo responsável técnico.'],
        references: ['Lei nº 8.213/91.', 'Decreto nº 3.048/1999.', 'IN 128/INSS e alterações aplicáveis.'],
        provider, client,
        inclusions: ['Levantamento e análise técnica para elaboração do laudo.'],
        exclusions: ['Avaliações quantitativas não selecionadas no escopo.', 'Envio de eventos do eSocial quando não contratado.'],
        observations: [common.quantitative, common.art, 'O LTCAT subsidia informações previdenciárias e o PPP, mas não substitui o LIP nem garante reconhecimento de benefício. Evidências insuficientes devem ser complementadas antes da conclusão afetada.'],
        commercialConditions: [common.quantitative, common.art],
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
        deliverables: ['Descrição das atividades, exposições e medidas de proteção verificadas.', 'Análise dos critérios e anexos aplicáveis das NR-15 e NR-16, com caracterização ou descaracterização fundamentada e grau de insalubridade quando cabível.', 'Laudo com conclusões por atividade e assinatura do responsável técnico.'],
        references: ['NR-15 — Atividades e Operações Insalubres.', 'NR-16 — Atividades e Operações Perigosas.'],
        provider, client,
        inclusions: ['Análise técnica documental e das atividades incluídas na proposta.'],
        exclusions: ['Avaliações quantitativas não selecionadas no escopo.', 'Atuação como assistente técnico judicial não contratada.'],
        observations: [common.quantitative, common.art, 'As conclusões dependem das condições efetivamente constatadas; não há resultado de enquadramento predeterminado.'],
        commercialConditions: [common.quantitative, common.art],
        periodicity, parameters: programParameters, sources: [sources.assistance, sources.unimetais]
    }),
    defineEntry({
        id: 'li', kind: 'report', title: 'Laudo de Insalubridade', shortName: 'LI',
        category: 'programs', section: 'programs', order: 45, icon: 'file-circle-exclamation',
        summary: 'Avaliação das condições de trabalho para caracterização ou descaracterização da insalubridade nas atividades contratadas.',
        objective: 'Fundamentar a análise de insalubridade com base nas exposições constatadas e nos critérios aplicáveis da NR-15.',
        scope: ['Inspeção das atividades, agentes e controles existentes.', 'Análise dos anexos aplicáveis e conclusão por função ou grupo avaliado.'],
        methodology: [common.planning, 'Inspeção, análise documental e interpretação das avaliações disponíveis, verificando representatividade e necessidade de complementação.'],
        steps: ['Delimitar atividades e grupos.', 'Reconhecer agentes e controles.', 'Analisar evidências e critérios aplicáveis.', 'Emitir conclusões fundamentadas.'],
        deliverables: ['Descrição das atividades, agentes e medidas de proteção.', 'Conclusão fundamentada de insalubridade, com grau quando aplicável e limitações das evidências.', 'Laudo de Insalubridade assinado pelo responsável técnico.'],
        references: ['NR-15 — Atividades e Operações Insalubres.'], provider, client,
        inclusions: ['Análise de insalubridade das atividades dimensionadas na contratação.'],
        exclusions: ['Laudo de Periculosidade e assistência judicial não contratados.', 'Medições quantitativas não selecionadas e dimensionadas.'],
        observations: [common.art, 'Não há conclusão de enquadramento predeterminada. A emissão depende da suficiência das evidências técnicas.'],
        periodicity, parameters: programParameters,
        sources: ['propostas/agosto-2026/TM0132-ML5-Laudo-Insalubridade.html']
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
        observations: ['Ferramentas de análise são selecionadas conforme a demanda e as atividades reais. Medições ambientais instrumentais precisam de dimensionamento e contratação expressos.'],
        periodicity, parameters: [...programParameters, listParameter('ergonomicTools', 'Ferramentas ergonômicas previstas', undefined, false)], sources: [sources.aet]
    })
];
