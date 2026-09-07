import { common, defineEntry, listParameter, numberParameter, sources, textParameter } from './shared';

const periodicity = { mode: 'contract' as const, description: 'Frequência e duração conforme o plano contratado; atividades adicionais devem ser alinhadas entre as partes.' };
const provider = [common.qualified, common.delivery];
const client = [common.information, common.access];

export const managementEntries = [
    defineEntry({
        id: 'psychosocial', kind: 'psychosocial', title: 'Avaliação de Fatores Psicossociais', shortName: 'Psicossocial',
        category: 'management', section: 'complementary', order: 20, icon: 'brain',
        summary: 'Avaliação dos fatores de riscos psicossociais relacionados ao trabalho, com relatório técnico, plano de ação e integração à gestão de riscos.',
        objective: 'Identificar fatores associados à organização do trabalho e orientar medidas preventivas para os grupos e participantes abrangidos.',
        scope: ['Planejamento e sensibilização da empresa e dos participantes.', 'Avaliação de fatores como demandas de trabalho, autonomia, relações interpessoais, violência e assédio.', 'Consolidação dos resultados por função ou setor e recomendações de intervenção.'],
        methodology: [common.planning, 'Aplicação de instrumento de avaliação definido pela equipe técnica para a população contratada.', 'Análise dos dados, identificação dos fatores de risco e devolutiva com recomendações.'],
        steps: ['Alinhar população, instrumento e cronograma.', 'Sensibilizar e orientar os participantes.', 'Aplicar a avaliação e consolidar os dados.', 'Elaborar relatório, plano de ação e orientações de integração ao PGR.'],
        deliverables: ['Relatório técnico de fatores psicossociais relacionados ao trabalho.', 'Plano de ação com recomendações preventivas.', 'Devolutiva e orientação para integração dos resultados ao PGR.'],
        references: ['NR-01 — Gerenciamento de Riscos Ocupacionais.'], provider,
        client: [...client, 'Apoiar a comunicação e disponibilizar os participantes nas condições acordadas.', common.implementation],
        inclusions: ['Aplicação do instrumento, análise técnica e documentação para a população dimensionada.'],
        exclusions: ['Palestras, campanhas e reavaliações não selecionadas na proposta.'],
        observations: ['O escopo trata de fatores relacionados ao trabalho, não de avaliação clínica individual.', 'Quantidades, instrumento e integração constam dos parâmetros do item.'],
        periodicity: { mode: 'on-demand', description: 'Aplicação conforme contratação; reavaliações e campanhas precisam de programação expressa.' },
        parameters: [numberParameter('participantCount', 'Participantes', 'pessoas', 'psychosocial.participantCount'), listParameter('instruments', 'Instrumentos previstos', 'psychosocial.instruments'), textParameter('integration', 'Integração dos resultados', 'psychosocial.integration')],
        sources: [sources.assistance, 'propostas/maio-2026/proposta-treinamentos-psicossocial-imperthane.html']
    }),
    defineEntry({
        id: 'esocial', kind: 'management', title: 'Gestão dos Eventos de SST do eSocial', shortName: 'eSocial SST',
        category: 'management', section: 'esocial', order: 10, icon: 'cloud-arrow-up',
        summary: 'Organização e envio dos eventos de SST selecionados, a partir das informações técnicas e cadastrais disponibilizadas pela contratante.',
        objective: 'Apoiar a manutenção das informações de SST no eSocial com consistência entre documentos, dados da empresa e eventos contratados.',
        scope: ['Conferência das informações necessárias aos eventos selecionados.', 'Preparação e transmissão das informações de SST abrangidas.', 'Acompanhamento dos registros de envio e orientação sobre pendências identificadas.'],
        methodology: [common.planning, 'Organização de dados cadastrais e documentos de SST relativos aos eventos previstos.', 'Preparação, envio e acompanhamento dos registros de transmissão.'],
        steps: ['Definir eventos abrangidos e responsáveis pelo fornecimento das informações.', 'Receber e conferir dados e documentos.', 'Transmitir os eventos contratados.', 'Disponibilizar registros de envio e comunicar pendências.'],
        deliverables: ['Registros dos eventos de SST transmitidos.', 'Orientação sobre informações e pendências necessárias aos envios.'],
        references: ['Manual de Orientação do eSocial — referência de operação utilizada nas propostas de origem.'],
        provider, client: [...client, 'Fornecer documentos técnicos, dados cadastrais e autorizações necessárias ao envio.', 'Comunicar ocorrências e alterações que afetem os eventos contratados.'],
        inclusions: ['Gestão dos eventos expressamente selecionados no item.'],
        exclusions: ['Elaboração de programas, laudos e realização de exames não contratados.', 'Eventos e rotinas não relacionados ao escopo de SST selecionado.'],
        observations: ['S-2210, S-2220 e S-2240 são opções de escopo, não inclusões automáticas.'], periodicity,
        parameters: [listParameter('events', 'Eventos contratados', undefined, true, ['S-2210', 'S-2220', 'S-2240']), textParameter('servicePeriod', 'Período de atendimento')],
        sources: [sources.assistance, sources.unimetais]
    }),
    defineEntry({
        id: 'art', kind: 'management', title: 'Anotação de Responsabilidade Técnica', shortName: 'ART',
        category: 'management', section: 'technical-responsibility', order: 10, icon: 'stamp',
        summary: 'Registro da responsabilidade técnica junto ao CREA para os serviços de engenharia expressamente abrangidos na contratação.',
        objective: 'Identificar o profissional responsável e vincular o registro técnico aos serviços e documentos contratados.',
        scope: ['Identificação do contratante, do profissional e das atividades técnicas abrangidas.', 'Registro da ART correspondente ao objeto contratado.'],
        methodology: [common.planning, 'Conferência do objeto e das atividades técnicas antes do preenchimento e registro da ART.'],
        steps: ['Identificar serviços e documentos abrangidos.', 'Conferir dados do contratante e do responsável técnico.', 'Registrar e disponibilizar a ART correspondente.'],
        deliverables: ['ART registrada vinculada aos serviços técnicos especificados.'],
        references: [], provider: [...provider, 'Providenciar o registro pelo profissional responsável pelas atividades técnicas abrangidas.'],
        client: ['Fornecer dados cadastrais e confirmar o objeto da contratação.'],
        inclusions: ['Registro técnico para o objeto e a quantidade expressamente contratados.'],
        exclusions: ['Registros de serviços ou empresas não abrangidos pela proposta.'],
        observations: ['O registro não substitui os programas ou laudos correspondentes.', 'A responsabilidade médica do PCMSO é distinta do registro de engenharia.'],
        periodicity: { mode: 'on-demand', description: 'Vinculada ao objeto contratado; alterações de objeto devem ser avaliadas pelo responsável técnico.' },
        parameters: [numberParameter('quantity', 'Registros previstos', 'ARTs'), listParameter('coveredServices', 'Serviços técnicos abrangidos')], sources: [sources.assistance, sources.group]
    }),
    defineEntry({
        id: 'technical-support', kind: 'management', title: 'Suporte Técnico em SST', shortName: 'Suporte SST',
        category: 'management', section: 'assistance', order: 20, icon: 'headset',
        summary: 'Orientação técnica à contratante para dúvidas e acompanhamento das rotinas de SST durante o período contratado.',
        objective: 'Apoiar a condução das ações de segurança do trabalho e o esclarecimento de dúvidas relacionadas ao escopo contratado.',
        scope: ['Orientações sobre documentos e rotinas de SST.', 'Esclarecimento de dúvidas pelos canais acordados.', 'Acompanhamento das demandas encaminhadas pela contratante.'],
        methodology: [common.planning, 'Recebimento das demandas, análise das informações e retorno técnico pelo canal definido.'],
        steps: ['Definir período, canais e abrangência do suporte.', 'Receber e analisar a solicitação.', 'Orientar a contratante e indicar encaminhamentos necessários.'],
        deliverables: ['Orientações técnicas sobre as demandas de SST abrangidas.'], references: [], provider,
        client: ['Apresentar as dúvidas e informações necessárias à análise.', common.implementation],
        inclusions: ['Atendimento pelos canais e período previstos no item.'],
        exclusions: ['Visitas, treinamentos e elaboração de novos documentos não contratados.'],
        observations: ['Suporte remoto não implica alocação permanente de profissional na empresa.'], periodicity,
        parameters: [listParameter('channels', 'Canais de atendimento'), textParameter('servicePeriod', 'Período de atendimento')], sources: [sources.assistance]
    }),
    defineEntry({
        id: 'technical-visit', kind: 'management', title: 'Visita Técnica em SST', shortName: 'Visita técnica',
        category: 'management', section: 'assistance', order: 30, icon: 'clipboard-check',
        summary: 'Visita de inspeção e orientação em segurança do trabalho, com registro das condições observadas e dos encaminhamentos recomendados.',
        objective: 'Reconhecer as condições de trabalho no local abrangido e orientar a contratante quanto às medidas de prevenção aplicáveis.',
        scope: ['Inspeção dos ambientes e atividades definidos.', 'Observação de condições de trabalho e utilização de EPI/EPC.', 'Orientações e registro dos pontos de atenção identificados.'],
        methodology: [common.planning, 'Inspeção acompanhada pelo representante da contratante e registro dos achados relevantes.'],
        steps: ['Agendar visita e confirmar local e acesso.', 'Inspecionar atividades e condições de trabalho.', 'Orientar responsáveis e consolidar registros de acompanhamento.'],
        deliverables: ['Registro ou relatório de visita com observações e recomendações.'], references: [], provider, client,
        inclusions: ['Visitas com quantidade, duração e locais delimitados.'],
        exclusions: ['Medições instrumentais e emissão de programas ou laudos não contratados.'],
        observations: ['Uma visita de reconhecimento integrada a outro serviço não deve ser cobrada novamente sem contratação adicional explícita.'], periodicity,
        parameters: [numberParameter('visits', 'Visitas contratadas', 'visitas'), numberParameter('hours', 'Duração por visita', 'horas', undefined, true, 0.25, false), listParameter('locations', 'Locais de atendimento')], sources: [sources.assistance, sources.cipa]
    }),
    defineEntry({
        id: 'assistance', kind: 'assistance', title: 'Assessoria em Segurança e Saúde do Trabalho', shortName: 'Assessoria SST',
        category: 'management', section: 'assistance', order: 10, icon: 'user-shield',
        summary: 'Acompanhamento técnico da gestão de SST, com visitas e suporte dimensionados para cada empresa.',
        objective: 'Apoiar a organização das rotinas de prevenção e da documentação de SST durante a vigência contratada.',
        scope: ['Visitas e orientações técnicas conforme plano contratado.', 'Acompanhamento das ações de prevenção e das demandas de SST.', 'Organização do atendimento individualizado por empresa.'],
        methodology: [common.planning, 'Acompanhamento periódico das condições de trabalho e dos encaminhamentos técnicos.', 'Suporte à contratante entre visitas, conforme canais e limites definidos.'],
        steps: ['Alinhar o plano de atendimento.', 'Realizar visitas e orientações programadas.', 'Acompanhar ações e comunicar pendências.', 'Consolidar registros de acompanhamento.'],
        deliverables: ['Registros das visitas e orientações técnicas.', 'Relatórios de acompanhamento das ações de SST.'], references: [], provider, client: [...client, common.implementation],
        inclusions: ['Rotina de atendimento descrita nos parâmetros da assessoria.'],
        exclusions: ['Programas, avaliações, treinamentos e registros não selecionados na proposta.'],
        observations: ['Itens inclusos na mensalidade devem ser selecionados e vinculados à cobrança de assessoria.'], periodicity,
        parameters: [numberParameter('termMonths', 'Vigência', 'meses', 'termMonths'), numberParameter('visitsPerMonth', 'Visitas mensais', 'visitas/mês', 'visitsPerMonth', true, 0), numberParameter('hoursPerVisit', 'Duração da visita', 'horas', 'hoursPerVisit', true, 0, false), listParameter('support', 'Canais de suporte', 'support'), textParameter('renewal', 'Renovação', 'renewal'), textParameter('adjustment', 'Reajuste', 'adjustment')],
        sources: [sources.assistance, sources.group]
    })
];
