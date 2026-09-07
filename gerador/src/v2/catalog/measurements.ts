import { common, defineEntry, listParameter, numberParameter, sources, textParameter } from './shared';

const definitions = [
    {
        id: 'noise', name: 'Ruído / Dosimetria Ocupacional', short: 'Dosimetria', icon: 'ear-listen',
        summary: 'Avaliação quantitativa da exposição ocupacional ao ruído por dosimetria, com registros, análise e relatório técnico.',
        objective: 'Caracterizar a exposição ao ruído nas funções e grupos selecionados para subsidiar programas e laudos de SST.',
        scope: ['Dosimetrias nos trabalhadores ou grupos definidos na estratégia de avaliação.', 'Registro das atividades e condições de exposição durante a avaliação.'],
        method: 'Utilização de dosímetros calibrados, com acompanhamento das condições de exposição e análise dos resultados obtidos.',
        steps: ['Definir grupos e dosimetrias previstas.', 'Preparar instrumentos e registrar condições da atividade.', 'Realizar dosimetria e consolidar registros.', 'Analisar resultados e emitir relatório.'],
        deliverables: ['Registros de dosimetria e exposição ao ruído.', 'Memória de cálculo e relatório técnico do agente avaliado.'],
        references: ['NHO-01 da Fundacentro.', 'NR-15, Anexo 1.'], sources: [sources.measurements]
    },
    {
        id: 'heat', name: 'Calor / Avaliação de IBUTG', short: 'Calor / IBUTG', icon: 'temperature-high',
        summary: 'Avaliação da exposição ao calor com medição de IBUTG nos pontos e atividades contratados.',
        objective: 'Caracterizar a exposição ocupacional ao calor a partir das condições ambientais e das atividades abrangidas.',
        scope: ['Medições de calor nos pontos definidos.', 'Registro das condições de trabalho e informações necessárias à análise da exposição.'],
        method: 'Medições com equipamento para avaliação de calor, incluindo termômetro de globo, e análise dos registros de IBUTG.',
        steps: ['Planejar pontos e condições de avaliação.', 'Registrar atividades e condições ambientais.', 'Realizar medições de IBUTG.', 'Consolidar cálculo, análise e relatório.'],
        deliverables: ['Registros das medições de IBUTG.', 'Memória de cálculo e relatório técnico de exposição ao calor.'],
        references: ['NR-15, Anexo 3.', 'NHO-06 da Fundacentro — referência do catálogo V1.'], sources: [sources.unimetais, sources.group, 'gerador/src/config/modelos-prontos.ts']
    },
    {
        id: 'vibration', name: 'Avaliação de Vibração Ocupacional', short: 'Vibração', icon: 'wave-square',
        summary: 'Avaliação de vibração de corpo inteiro e/ou de mãos e braços, conforme atividades e equipamentos definidos no escopo.',
        objective: 'Caracterizar a exposição à vibração nas operações contratadas e subsidiar a avaliação técnica das condições de trabalho.',
        scope: ['Avaliação de vibração em mãos e braços e/ou corpo inteiro, conforme seleção.', 'Registro das operações, equipamentos e condições de exposição.'],
        method: 'Medições com acelerômetro triaxial calibrado e análise dos dados conforme o tipo de vibração avaliado.',
        steps: ['Definir tipo de vibração e operações avaliadas.', 'Preparar instrumentação e registrar condições de execução.', 'Realizar as medições contratadas.', 'Consolidar resultados e conclusões técnicas.'],
        deliverables: ['Registros das avaliações de VMB/VCI contratadas.', 'Relatório técnico com metodologia, resultados e conclusões.'],
        references: ['NHO-09 e NHO-10 da Fundacentro.', 'NR-15, Anexo 8.'], sources: [sources.measurements]
    },
    {
        id: 'chemicals', name: 'Avaliação de Agentes Químicos', short: 'Agentes químicos', icon: 'flask',
        summary: 'Amostragem de agentes químicos selecionados, com análise laboratorial e avaliação técnica dos resultados.',
        objective: 'Quantificar as exposições aos agentes químicos discriminados na contratação, considerando atividades e estratégia de amostragem.',
        scope: ['Coleta dos agentes expressamente indicados no item.', 'Encaminhamento das amostras para análise e consolidação dos resultados.'],
        method: 'Coleta com bomba de amostragem e meios de coleta compatíveis com o agente, seguida de análise laboratorial pelo método definido tecnicamente.',
        steps: ['Identificar agentes, grupos e quantidade de amostras.', 'Definir método e meios de coleta com o laboratório.', 'Executar e registrar a amostragem.', 'Consolidar resultados laboratoriais e relatório técnico.'],
        deliverables: ['Registros de coleta e resultados laboratoriais dos agentes contratados.', 'Relatório técnico com método, análise e conclusões.'],
        references: ['NR-15 e métodos técnicos aplicáveis ao agente avaliado.', 'Métodos NIOSH/OSHA — referências presentes na proposta de origem, sujeitos à seleção técnica.'], sources: [sources.unimetais, sources.measurements]
    },
    {
        id: 'dust', name: 'Avaliação de Poeiras Ocupacionais', short: 'Poeiras', icon: 'smog',
        summary: 'Amostragem de poeira nas frações e agentes definidos, com análise laboratorial e relatório de exposição ocupacional.',
        objective: 'Avaliar a exposição às poeiras selecionadas e documentar os resultados para os grupos de trabalho abrangidos.',
        scope: ['Coleta de poeiras conforme fração e composição previstas na estratégia de avaliação.', 'Análise laboratorial da amostra para o agente contratado.'],
        method: 'Amostragem com bomba e sistema de coleta compatíveis com a fração selecionada; análise laboratorial definida conforme a composição investigada.',
        steps: ['Definir poeira, fração, grupos e amostras.', 'Selecionar meios de coleta e método laboratorial.', 'Executar a coleta e registrar condições de exposição.', 'Analisar resultados e emitir relatório.'],
        deliverables: ['Registros de amostragem e resultados laboratoriais da poeira avaliada.', 'Relatório técnico de exposição às poeiras contratadas.'],
        references: ['NR-15 — critérios aplicáveis ao agente.', 'NHO-08 e NIOSH 7500 — referências da avaliação de poeira respirável/sílica na proposta ML2.'], sources: [sources.measurements]
    }
];

export const measurementEntries = definitions.map((d, index) => defineEntry({
    id: d.id, kind: 'measurement', title: d.name, shortName: d.short,
    category: 'measurements', section: 'measurements', order: (index + 1) * 10, icon: d.icon,
    summary: d.summary, objective: d.objective, scope: d.scope,
    methodology: [common.planning, d.method], steps: d.steps, deliverables: d.deliverables, references: d.references,
    provider: [common.qualified, 'Utilizar instrumentação compatível com a avaliação e com registros de calibração.', common.delivery],
    client: [common.information, common.access, 'Disponibilizar as atividades e condições operacionais necessárias à avaliação programada.'],
    inclusions: ['Avaliações e registros correspondentes ao agente, método e quantidades contratados.'],
    exclusions: ['Agentes, amostras, pontos e avaliações adicionais não discriminados.', 'Elaboração ou atualização de programas e laudos não selecionados.'],
    observations: ['Cada quantidade se aplica à empresa e ao agente indicados no item.', 'Referências da fonte não substituem a definição do método aplicável à avaliação contratada.'],
    periodicity: { mode: 'on-demand', description: 'Campanha de avaliação conforme escopo; novas campanhas dependem de contratação ou previsão expressa.' },
    parameters: [textParameter('agent', 'Agente e tipo de exposição', 'agent'), textParameter('method', 'Método previsto', 'method'), numberParameter('quantity', 'Quantidade contratada', 'avaliações', 'quantity'), { id: 'unit', label: 'Unidade de medição', description: 'Unidade que delimita o quantitativo contratado.', required: true, type: 'choice', choices: ['point', 'sample', 'dosimetry'], binding: 'unit' }, listParameter('workGroups', 'Grupos e atividades', 'workGroups')],
    sources: d.sources
}));
