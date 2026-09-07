export const pendingLegacyPresets = [
    { id: 'pacote-treinamentos', reason: 'O modelo não define quais capacitações compõem o pacote. Usar seleção individual ou o preset explícito treinamentos-operacionais, sem presumir equivalência.' },
    { id: 'assessoria-obras', reason: 'Exige delimitação de canteiros, frentes, fases da obra e rotina de campo. Não substituir por assessoria genérica.' },
    { id: 'assistente-tecnico-pericial', reason: 'Exige processo, diligências, quesitos e limites de manifestações. Preservar o fluxo especializado V1 e não importar seu preço fixo.' },
    { id: 'plataforma', reason: 'Projeto de plataforma secundária exige parâmetros de geometria, estrutura e cargas ainda não catalogados.' },
    { id: 'plataforma-principal', reason: 'Plataforma principal e secundária compartilham fonte V1, mas não são escopos equivalentes; requerem revisão técnica própria.' },
    { id: 'tela-fachada', reason: 'Exige sistema, fixações, estrutura de apoio e dimensionamento específicos, ausentes do catálogo V2.' },
    { id: 'linha-vida', reason: 'Exige caracterização da cobertura, ancoragens, usuários e critérios de projeto, sem equivalência com treinamento NR-35.' }
] as const;