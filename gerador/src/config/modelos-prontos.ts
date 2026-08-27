import { TipoProposta } from '../types/proposta.types';

export type CategoriaModelo =
    | 'Programas e Laudos'
    | 'Avaliações e Medições'
    | 'Treinamentos'
    | 'Assessoria'
    | 'Psicossocial'
    | 'Engenharia / NR-18'
    | 'Combos / Kits';

export interface ModeloPronto {
    id: string;
    nome: string;
    categoria: CategoriaModelo;
    descricao: string;
    icone: string;
    cor: string;
    servicos: string[];
    entregaveis: string[];
    fundamentacao: string;
    campos: Array<'colaboradores' | 'funcoes'>;
    tipoLegado?: TipoProposta;
    fonte: string;
}

const programa = (id: string, nome: string, servicos: string[], entregaveis: string[], fundamentacao: string, fonte: string): ModeloPronto => ({
    id, nome, categoria: 'Programas e Laudos', descricao: `Elaboração de ${nome}, com levantamento técnico, documentação assinada e orientação para implantação.`,
    icone: 'fas fa-file-shield', cor: '#2b6cb0', servicos, entregaveis, fundamentacao, campos: ['colaboradores', 'funcoes'], fonte
});

const treinamento = (id: string, nome: string, fundamento: string, fonte: string): ModeloPronto => ({
    id, nome, categoria: 'Treinamentos', descricao: `Capacitação teórica e prática em ${nome}, com conteúdo e carga horária ajustados à atividade da contratante.`,
    icone: 'fas fa-chalkboard-teacher', cor: '#dd6b20', servicos: [nome],
    entregaveis: ['Planejamento e material didático', 'Instrutor qualificado', 'Lista de presença', 'Avaliação de aprendizagem', 'Certificados dos participantes'],
    fundamentacao: fundamento, campos: ['colaboradores'], fonte
});

export const modelosProntos: ModeloPronto[] = [
    programa('pgr', 'PGR', ['PGR – Programa de Gerenciamento de Riscos'], ['Visita técnica', 'Inventário de riscos ocupacionais', 'Avaliação qualitativa dos riscos', 'Plano de ação', 'Documento técnico assinado'], 'NR-01 – Gerenciamento de Riscos Ocupacionais.', 'TM0031, TM0077 e TM0129'),
    programa('pcmso', 'PCMSO', ['PCMSO – Programa de Controle Médico de Saúde Ocupacional'], ['Definição de exames por função', 'Periodicidade dos exames', 'Cronograma anual', 'Documento assinado pelo médico responsável'], 'NR-07 – Programa de Controle Médico de Saúde Ocupacional.', 'proposta-esquadro-engenharia e TM0096'),
    programa('ltcat', 'LTCAT', ['LTCAT – Laudo Técnico das Condições Ambientais do Trabalho'], ['Levantamento dos agentes nocivos', 'Caracterização da exposição', 'Conclusão previdenciária', 'Documento técnico e ART'], 'Lei 8.213/91, Decreto 3.048/99 e IN 128/INSS.', 'RC0002 e kits integrados de 2026'),
    programa('pgr-pcmso', 'PGR + PCMSO', ['PGR', 'PCMSO'], ['Inventário de riscos e plano de ação', 'Programa médico alinhado aos riscos', 'Definição de exames por função', 'Documentos técnicos assinados'], 'NR-01 e NR-07.', 'TM0109 e TM0054'),
    { ...programa('pgr-pcmso-ltcat', 'PGR + PCMSO + LTCAT', ['PGR', 'PCMSO', 'LTCAT'], ['Visita técnica', 'Inventário de riscos e plano de ação', 'Programa médico por função', 'Caracterização previdenciária', 'Documentos técnicos assinados e ART'], 'NR-01, NR-07 e legislação previdenciária vigente.', 'proposta-pgr-pcmso-ltcat-atecmontagem e TM0108'), categoria: 'Combos / Kits', tipoLegado: 'kit-sst' },
    { ...programa('pgr-pcmso-ltcat-lip', 'PGR + PCMSO + LTCAT + LIP', ['PGR', 'PCMSO', 'LTCAT', 'Laudos de Insalubridade e Periculosidade'], ['Programas integrados de SST', 'Caracterização das exposições', 'Conclusões de insalubridade e periculosidade', 'ART e documentos assinados'], 'NR-01, NR-07, NR-15, NR-16 e legislação previdenciária.', 'TM0020, proposta-aco-plus e TM0108'), categoria: 'Combos / Kits' },
    { ...programa('pgr-pcmso-ltcat-psico', 'PGR + PCMSO + LTCAT + Psicossocial', ['PGR', 'PCMSO', 'LTCAT', 'Avaliação de Fatores de Riscos Psicossociais'], ['Programas integrados', 'Inventário de riscos psicossociais', 'Plano de ação', 'Relatório técnico e devolutiva'], 'NR-01, NR-07 e legislação previdenciária.', 'TM0067, TM0099 e TM0105'), categoria: 'Combos / Kits' },
    { ...programa('combo-completo', 'PGR + PCMSO + LTCAT + LIP + Psicossocial', ['PGR', 'PCMSO', 'LTCAT', 'Laudos de Insalubridade e Periculosidade', 'Avaliação Psicossocial'], ['Visita e levantamento técnico', 'Programas e laudos integrados', 'Inventário de riscos psicossociais', 'Plano de ação', 'ART e documentos assinados'], 'NR-01, NR-07, NR-15, NR-16 e legislação previdenciária.', 'proposta Grupo Bertis, Nino Auto Center e TM0107'), categoria: 'Combos / Kits' },
    programa('laudo-insalubridade', 'Laudo de Insalubridade', ['Laudo de Insalubridade'], ['Inspeção técnica', 'Análise das atividades e exposições', 'Avaliações aplicáveis', 'Conclusão e enquadramento', 'Laudo assinado e ART'], 'NR-15 e seus anexos.', 'TM0093 e TM0132–TM0135'),
    programa('laudo-insalubridade-periculosidade', 'Laudo de Insalubridade e Periculosidade', ['Laudo de Insalubridade', 'Laudo de Periculosidade'], ['Inspeção técnica', 'Análise de agentes e operações perigosas', 'Enquadramento nas NRs', 'Conclusões técnicas', 'Laudos assinados e ART'], 'NR-15 e NR-16.', 'LIPs recorrentes de fevereiro a julho de 2026'),
    { id: 'aet', nome: 'Análise Ergonômica do Trabalho (AET)', categoria: 'Avaliações e Medições', descricao: 'Análise ergonômica das atividades, organização, condições e exigências do trabalho.', icone: 'fas fa-person-walking', cor: '#805ad5', servicos: ['AET – Análise Ergonômica do Trabalho'], entregaveis: ['Levantamento em campo', 'Análise das tarefas e postos', 'Diagnóstico ergonômico', 'Recomendações e plano de melhorias', 'Relatório técnico'], fundamentacao: 'NR-17 – Ergonomia.', campos: ['colaboradores', 'funcoes'], fonte: 'proposta-aet-clbi e TM0101' },
    { id: 'psicossocial', nome: 'Avaliação de Riscos Psicossociais / NR-01', categoria: 'Psicossocial', descricao: 'Identificação e avaliação dos fatores de riscos psicossociais relacionados ao trabalho, com plano de ação.', icone: 'fas fa-brain', cor: '#805ad5', servicos: ['Avaliação de Fatores de Riscos Psicossociais'], entregaveis: ['Planejamento e sensibilização', 'Aplicação de instrumento de avaliação', 'Análise técnica dos resultados', 'Relatório técnico', 'Plano de ação e devolutiva'], fundamentacao: 'NR-01 – Gerenciamento de Riscos Ocupacionais.', campos: ['colaboradores', 'funcoes'], tipoLegado: 'psicossocial', fonte: 'modelos recorrentes de janeiro a agosto de 2026' },
    ...[
        ['medicao-ruido', 'Dosimetria de Ruído', 'Dosimetrias, memória de cálculo e relatório técnico', 'NR-15, Anexo 1, e NHO-01/Fundacentro.'],
        ['medicao-calor', 'Avaliação de Calor / IBUTG', 'Medições de IBUTG, memória de cálculo e relatório técnico', 'NR-15, Anexo 3, e NHO-06/Fundacentro.'],
        ['medicao-vibracao', 'Avaliação de Vibração', 'Medições de vibração, memória de cálculo e relatório técnico', 'NR-15 e NHO-09/NHO-10 da Fundacentro.'],
        ['medicao-quimicos', 'Avaliação de Agentes Químicos', 'Amostragem de agentes químicos e relatório técnico', 'NR-15 e métodos técnicos aplicáveis ao agente.'],
        ['medicao-poeiras', 'Avaliação de Poeiras', 'Amostragem de poeira respirável e relatório técnico', 'NR-15 e métodos técnicos aplicáveis.']
    ].map(([id, nome, entrega, fundamento]) => ({ id, nome, categoria: 'Avaliações e Medições' as CategoriaModelo, descricao: `${nome} nos postos e funções definidos pela contratante.`, icone: 'fas fa-gauge-high', cor: '#0f766e', servicos: [nome], entregaveis: ['Planejamento da estratégia de amostragem', entrega, 'Análise dos resultados e comparação com limites', 'Responsabilidade técnica'], fundamentacao: fundamento, campos: ['funcoes'] as Array<'funcoes'>, fonte: 'propostas-medicoes ML2/ML5, TM0066 e programas-medições Unimetais' })),
    { id: 'pacote-medicoes', nome: 'Pacote de Medições Ocupacionais', categoria: 'Avaliações e Medições', descricao: 'Pacote configurável de avaliações quantitativas ocupacionais conforme os agentes identificados.', icone: 'fas fa-chart-line', cor: '#0f766e', servicos: ['Dosimetria de ruído', 'Calor / IBUTG', 'Vibração', 'Agentes químicos e poeiras'], entregaveis: ['Estratégia de amostragem', 'Medições por grupo/função', 'Memórias de cálculo', 'Relatório consolidado', 'ART'], fundamentacao: 'NR-09, NR-15 e Normas de Higiene Ocupacional da Fundacentro.', campos: ['funcoes'], fonte: 'proposta-medicoes-ml2, proposta-medicoes-ml5 e proposta-programas-medicoes-unimetais' },
    { ...treinamento('brigada', 'Brigada de Incêndio', 'IT 17/2025 do CBMRN e legislação estadual aplicável.', 'modelos de janeiro, fevereiro, maio, julho e agosto'), tipoLegado: 'brigada' },
    treinamento('treinamento-nr01', 'NR-01 – Integração/Admissional', 'NR-01 – Disposições Gerais e Gerenciamento de Riscos Ocupacionais.', 'combo admissional de fevereiro, TM0056 e TM0100'),
    treinamento('treinamento-nr05', 'NR-05 – CIPA', 'NR-05 – Comissão Interna de Prevenção de Acidentes e de Assédio.', 'propostas de treinamentos de 2026'),
    treinamento('treinamento-nr06', 'NR-06 – EPI', 'NR-06 – Equipamento de Proteção Individual.', 'Domus, TM0078, TM0100 e Marista'),
    treinamento('treinamento-nr10', 'NR-10 – Segurança em Eletricidade', 'NR-10 – Segurança em Instalações e Serviços em Eletricidade.', 'Hospital do Coração, Domus, BD Energia e Marista'),
    treinamento('treinamento-nr12', 'NR-12 – Máquinas e Equipamentos', 'NR-12 – Segurança no Trabalho em Máquinas e Equipamentos.', 'Hospital do Coração, Domus, Humana e Marista'),
    treinamento('treinamento-nr18', 'NR-18 – Construção Civil', 'NR-18 – Segurança e Saúde no Trabalho na Indústria da Construção.', 'Domus, Imperthane, Marista e assessorias de obra'),
    treinamento('treinamento-nr20', 'NR-20 – Inflamáveis e Combustíveis', 'NR-20 – Segurança e Saúde no Trabalho com Inflamáveis e Combustíveis.', 'TM0114 T Militão e TM0117 Marista'),
    treinamento('treinamento-nr33', 'NR-33 – Espaços Confinados', 'NR-33 – Segurança e Saúde nos Trabalhos em Espaços Confinados.', 'modelo treinamentos e Hospital do Coração'),
    treinamento('treinamento-nr35', 'NR-35 – Trabalho em Altura', 'NR-35 – Trabalho em Altura.', 'modelo treinamentos, Domus, BD Energia e Marista'),
    { ...treinamento('pacote-treinamentos', 'Pacote de Treinamentos em SST', 'Normas Regulamentadoras aplicáveis aos treinamentos selecionados.', 'Hospital do Coração, Domus, TM0100 e Marista'), servicos: ['Pacote de treinamentos conforme necessidades da contratante'], tipoLegado: 'treinamentos' },
    { id: 'assessoria', nome: 'Assessoria em SST', categoria: 'Assessoria', descricao: 'Acompanhamento técnico contínuo para gestão de SST, conformidade legal e suporte à contratante.', icone: 'fas fa-shield-alt', cor: '#2f855a', servicos: ['Assessoria técnica em Segurança e Saúde do Trabalho'], entregaveis: ['Visitas técnicas periódicas', 'Inspeções e orientações', 'Gestão de documentos e planos de ação', 'Suporte técnico', 'Relatórios de acompanhamento'], fundamentacao: 'Normas Regulamentadoras e legislação de SST aplicáveis.', campos: ['colaboradores', 'funcoes'], tipoLegado: 'assessoria', fonte: 'assessorias recorrentes de fevereiro a agosto de 2026' },
    { id: 'assessoria-programas', nome: 'Assessoria + Programas de SST', categoria: 'Assessoria', descricao: 'Assessoria contínua com elaboração, implantação e gestão dos programas legais de SST.', icone: 'fas fa-clipboard-check', cor: '#2f855a', servicos: ['Assessoria em SST', 'PGR', 'PCMSO', 'LTCAT e gestão documental'], entregaveis: ['Visitas e suporte periódico', 'Programas atualizados', 'Planos de ação', 'Orientação para eSocial', 'Relatórios de acompanhamento'], fundamentacao: 'NR-01, NR-07 e legislação previdenciária.', campos: ['colaboradores', 'funcoes'], fonte: 'assessorias Ibis, El Aram, CIADE, Jockey e Casa do Bizote' },
    { id: 'assessoria-psicossocial', nome: 'Assessoria + Programas + Psicossocial', categoria: 'Assessoria', descricao: 'Gestão integrada de SST incluindo programas legais e fatores de riscos psicossociais.', icone: 'fas fa-people-group', cor: '#2f855a', servicos: ['Assessoria em SST', 'Programas legais', 'Avaliação psicossocial / NR-01'], entregaveis: ['Rotina de assessoria', 'Programas atualizados', 'Avaliação psicossocial', 'Plano de ação integrado', 'Relatórios gerenciais'], fundamentacao: 'NR-01, NR-07 e demais NRs aplicáveis.', campos: ['colaboradores', 'funcoes'], fonte: 'Escola Ideal, Grupo El Aram, SERVMIX, CKJ e Grupo Bertis' },
    { id: 'assessoria-obras', nome: 'Assessoria SST em Obras', categoria: 'Assessoria', descricao: 'Acompanhamento de segurança do trabalho direcionado a canteiros e frentes de obra.', icone: 'fas fa-helmet-safety', cor: '#2f855a', servicos: ['Assessoria SST em obras', 'Inspeções de campo', 'Gestão documental e treinamentos'], entregaveis: ['Visitas ao canteiro', 'Relatórios fotográficos', 'Planos de ação', 'Orientações de conformidade', 'Suporte a treinamentos e documentos'], fundamentacao: 'NR-18 e demais Normas Regulamentadoras aplicáveis.', campos: ['colaboradores', 'funcoes'], fonte: 'MVP Engenharia TM0089/TM0090 e RP Sondagens TM0127' },
    { id: 'plataforma', nome: 'Projeto de Plataforma Secundária – NR-18', categoria: 'Engenharia / NR-18', descricao: 'Projeto técnico de equipamento de proteção coletiva para plataforma secundária.', icone: 'fas fa-layer-group', cor: '#4a5568', servicos: ['Projeto de Plataforma Secundária'], entregaveis: ['Levantamento de dados', 'Memória de cálculo', 'Detalhamento técnico', 'Pranchas do projeto', 'ART'], fundamentacao: 'NR-18 e normas técnicas aplicáveis.', campos: [], tipoLegado: 'plataforma', fonte: 'proposta-plataforma-secundaria de janeiro' },
    { id: 'plataforma-principal', nome: 'Projeto de Plataforma Principal + Secundária – NR-18', categoria: 'Engenharia / NR-18', descricao: 'Projeto técnico integrado das plataformas principal e secundária para proteção coletiva.', icone: 'fas fa-layer-group', cor: '#c05621', servicos: ['Projeto de Plataforma Principal', 'Projeto de Plataforma Secundária'], entregaveis: ['Levantamento de dados', 'Memória de cálculo', 'Detalhamento e pranchas', 'Especificações técnicas', 'ART'], fundamentacao: 'NR-18 e normas técnicas aplicáveis.', campos: [], tipoLegado: 'plataforma-principal', fonte: 'proposta-plataforma-secundaria de janeiro' },
    { id: 'tela-fachada', nome: 'Projeto de Tela de Proteção de Fachada', categoria: 'Engenharia / NR-18', descricao: 'Projeto técnico do sistema de proteção periférica de fachada.', icone: 'fas fa-border-all', cor: '#c05621', servicos: ['Projeto de Tela de Proteção de Fachada'], entregaveis: ['Levantamento técnico', 'Dimensionamento', 'Detalhes de fixação', 'Pranchas', 'ART'], fundamentacao: 'NR-18 e normas técnicas aplicáveis.', campos: [], fonte: 'proposta-tela-protecao-fachada de janeiro' },
    { id: 'linha-vida', nome: 'Projeto de Linha de Vida Fixa', categoria: 'Engenharia / NR-18', descricao: 'Projeto de sistema permanente de proteção contra quedas para cobertura.', icone: 'fas fa-link', cor: '#c05621', servicos: ['Projeto de Linha de Vida Fixa'], entregaveis: ['Levantamento', 'Dimensionamento do sistema', 'Memória de cálculo', 'Detalhamento', 'ART'], fundamentacao: 'NR-35, NR-18 e normas técnicas aplicáveis.', campos: [], fonte: 'TM0032 Prevent Engenharia' }
];

export const modelosPorId = Object.fromEntries(modelosProntos.map(modelo => [modelo.id, modelo]));

export function getModeloPronto(id: string): ModeloPronto | undefined {
    return modelosPorId[id];
}
