# Qualidade comercial e migração V2

Data: 07/09/2026. Esta etapa continua a implementação existente; não substitui a V1.

## Auditoria antes de persistência

Atualização de 07/09/2026: arquitetura, editor, composição, renderer, paginação,
segurança local e dependências foram auditados sem conectar banco. Documentação
atual em [V2-ARCHITECTURE.md](V2-ARCHITECTURE.md), [guia da equipe](V2-USER-GUIDE.md),
[guia do desenvolvedor](V2-DEVELOPER-GUIDE.md) e [relatório de auditoria](V2-AUDIT.md).

Correções desta auditoria:

- Digitação não recompõe mais a proposta em cada tecla; validação por revisão e preparação após pausa.
- Fila descarta paginações superadas; resultado antigo não habilita PDF e o clique imprime somente a preparação atual.
- Público/perfil do treinamento agora passa integralmente pelo configurador de assessoria.
- Erros semânticos mantêm mensagem específica e etapa correta; condições de pagamento vazias são rejeitadas.
- Contato vazio não produz linha sem conteúdo; responsável ausente é explicitado quando a seção de aceite está presente.
- Aviso do navegador ao sair reduz perda acidental, mas não implementa salvamento.
- CSS sem efeito removido; nomes de serviços indexados no renderer para evitar buscas repetidas em grupos.
- Quatro testes de arquitetura e um ensaio Playwright completo de assessoria/grupo ampliam a cobertura.

Os contratos continuam `schemaVersion: 2` e `compositionVersion: 3`; foi adicionado
campo opcional `TrainingConfiguration.parameters` e resultado opcional `superseded`
em `ExportPreparation`. Consumidores devem ignorar resultados superados e nunca
tratá-los como prontos. Nenhum snapshot ou proposta histórica foi regravado.

Presets mantêm os 31 destinos dos 38 modelos V1. As sete pendências abaixo não
foram ocultadas nem transformadas em equivalências técnicas falsas. O núcleo V2
permanece sem importação funcional da V1; os arquivos funcionais V1 verificados
continuam sem diff. Dependências transitivas compatíveis do pacote compartilhado
foram atualizadas; a migração principal de Vite/esbuild fica explicitamente pendente.

Use `npm run test:v2 --prefix gerador` para a suíte completa. Resultados atuais
em `artifacts/v2-suite/results.json`; os números de 42 testes ao fim deste documento
pertencem à etapa histórica de conteúdo, não à auditoria atual.
Persistência/Supabase é o próximo projeto, ainda não iniciado.

## Estado confirmado antes da alteração

Leitura integral de `src/v2/` (40 arquivos), arquitetura, catálogo, assessoria,
paginação, interface, testes e scripts do commit `1ae8848`. Worktree inicialmente
limpo. Este documento ainda não existia.

Já estavam implementados: domínio tipado e snapshots, catálogo com 26 serviços,
composer puro, deduplicação exata por empresa/campo/texto, presets de kits,
assessoria comum com sobrescritas por CNPJ, preços individuais e visibilidade,
renderer DOM seguro, Paged.js com inspeção geométrica, fontes locais e interface
em quatro etapas. Não foi criada outra arquitetura, motor ou conexão de banco.

## Comparação com propostas reais

| Referência na raiz do repositório | Conteúdo aproveitado e diferença corrigida |
| --- | --- |
| `propostas/maio-2026/proposta-pgr-pcmso-ltcat-atecmontagem.html` | Integração PGR/PCMSO/LTCAT e documentos por CNPJ; inventário e plano de ação agora descrevem conteúdo verificável. |
| `propostas/maio-2026/proposta-programas-medicoes-unimetais.html` | Matriz médica, exposições, critérios de LIP e campanhas dimensionadas; medições, exames e eSocial continuam seleções distintas. |
| `propostas/agosto-2026/TM0132-ML5-Laudo-Insalubridade.html` | LI é escopo diferente do LIP; criada entrada `li`, sem contratar periculosidade implicitamente. |
| `propostas/maio-2026/proposta-medicoes-ml2.html` | Relatórios por agente, calibração, análise laboratorial e critérios de comparação; acrescentados rastreabilidade e limites de representatividade. |
| `propostas/maio-2026/proposta-treinamentos-psicossocial-imperthane.html` | População, instrumento, diagnóstico e devolutiva; acrescentados confidencialidade, adesão e limites não clínicos. |
| `propostas/maio-2026/proposta-brigada-incendio-ceneged.html` | Conteúdo teórico/prático, infraestrutura e certificados digitais; não copiados alunos, preço ou carga horária como padrão universal. |
| `propostas/julho-2026/TM0117-Colegio Marista Natal.html` | Cinco capacitações com públicos próprios; novo preset operacional explícito, sem prometer habilitação automática. |
| `propostas/agosto-2026/TM0136-Condominio Villaggio Di Roma.html` | Rotina de assessoria, pendências, exclusões quantitativas e cobranças recorrentes. |
| `propostas/agosto-2026/TM0137-Grupo Bertis.html` | Gestão coordenada com quantidades e preços individuais; planejamento consultivo e responsabilidade técnica sem repetir conteúdo por empresa. |
| `propostas/setembro-2026/TM0141-Servicos-SST-Joao-Camara.html` | Funções e colaboradores são dimensões distintas; aprovação de complementos e conclusões dependentes de evidências. PCA, PPR e AEP não foram equiparados a outros serviços. |

Os textos são adaptações, não reprodução dos contratos históricos. Não houve
verificação jurídica externa de vigência normativa. Catálogo permanece `pending`.
Notas editoriais de origem ficam em `provenance`, não no corpo comercial.

## Níveis e modos

`options.detailLevel` continua independente de `options.documentMode`.

- `summary`: compatibilidade com o resumo explícito anterior; não é a recomendação comercial.
- `standard`: resumo, escopo, metodologia, entregáveis, responsabilidades, referências, exclusões e observações úteis.
- `full`: acrescenta objetivo, etapas, inclusões e periodicidade. Não modifica preços nem snapshots.

| Modo | Composição |
| --- | --- |
| `compact` | Uma seção técnica com os serviços selecionados; termos compartilhados somente quando necessários. Recomendado para medições, treinamento simples e serviço pontual. |
| `standard` | Seções por família técnica, com limites e responsabilidades visíveis. Recomendado para kits, programas e turmas maiores. |
| `consultive` | Famílias técnicas e planejamento integrado condicional: integração documental, dependência das medições, acompanhamento, mobilização e devolutiva conforme os serviços contratados. Recomendado para assessorias, projetos, grupos e recorrência. |

Sem modo, mantém `standard`. `consultive` usa `full` apenas quando não há nível
explícito. Prioridade do detalhamento: item, proposta, padrão do catálogo.
Presets definem uma recomendação; a aplicação inicial no editor pode sugerir
modo e capa, mas aplicações posteriores preservam personalizações. Capa e aceite
continuam opções explícitas; o composer nunca os remove por causa do modo.

Campos idênticos dentro de um serviço aparecem uma vez. Compartilhamento entre
serviços continua exato e rastreável por item/CNPJ, sem fusão aproximada de frases.
O renderer reúne os trechos comuns por tema e aplicabilidade, mantém uma seção
de responsabilidade técnica e preserva a quantidade/objeto de cada ART.
Configurações simples não geram tabelas vazias. Quantidades não são deduplicadas.

`schemaVersion: 2` e `compositionVersion: 3` permanecem; adicionados modo opcional
e bloco `coordination`, emitido somente no novo modo consultivo. O renderer atual
trata esse bloco. Consumidores externos de blocos precisam reconhecê-lo antes
de optar pelo modo consultivo. Snapshots antigos não são reescritos pelo catálogo.

## Presets migrados

31 dos 38 modelos V1 têm destino explícito. `getPreset` e `instantiatePreset`
aceitam os aliases V1, mas não importam código V1 em produção.

| IDs V1 | Destino V2 |
| --- | --- |
| `pgr`, `pcmso`, `ltcat`, `aet`, `pgr-pcmso` | Mesmo ID. |
| `pgr-pcmso-ltcat` | `kit-programas`, preservado sem ART automática. |
| `pgr-pcmso-ltcat-lip` | `kit-completo`, preservado com ART editável. |
| `pgr-pcmso-ltcat-psico` | `kit-psicossocial`. |
| `combo-completo` | Mesmo ID: PGR, PCMSO, LTCAT, LIP, psicossocial e ART. |
| `laudo-insalubridade` | `li` + ART, não LIP. |
| `laudo-insalubridade-periculosidade` | `lip` + ART. |
| `psicossocial` | `psychosocial`. |
| `medicao-ruido`, `medicao-calor`, `medicao-vibracao`, `medicao-quimicos`, `medicao-poeiras` | `noise`, `heat`, `vibration`, `chemicals`, `dust`. |
| `pacote-medicoes` | Mesmo ID, agentes separados e ART editável. Desmarcar agentes não pertinentes antes de contratar. |
| `brigada` | `brigade`. |
| `treinamento-nr01`, `treinamento-nr05`, `treinamento-nr06`, `treinamento-nr10`, `treinamento-nr12`, `treinamento-nr18`, `treinamento-nr20`, `treinamento-nr33`, `treinamento-nr35` | IDs `nr01` a `nr35` correspondentes. |
| `assessoria`, `assessoria-programas`, `assessoria-psicossocial` | Mesmo ID; interface usa configurador nativo por empresa. |

Presets adicionais: `treinamentos-operacionais` (NR-06/10/12/20/35, referência
Marista) e `assessoria-integrada` (mantém o atalho de assessoria já existente).
O editor usa o mesmo registro, com sete atalhos preservados e menu dos demais.
API de presets materializa itens; não inventa preços, participantes, amostras,
horas ou vigências. Parâmetros obrigatórios ausentes impedem materialização.
O editor permite seleção incompleta e indica o que falta antes de gerar.

## Não migrados

| ID | Motivo e próximo passo |
| --- | --- |
| `pacote-treinamentos` | V1 não define composição; escolher capacitações. Preset Marista é alternativa específica, não alias equivalente. |
| `assessoria-obras` | Dimensionar canteiros, frentes, fases e rotina de campo antes de publicar preset próprio. |
| `assistente-tecnico-pericial` | Preservar fluxo especializado V1; exige processo, diligências, quesitos, manifestações e limites próprios. |
| `plataforma` | Catalogar geometria, estrutura e cargas da plataforma secundária. |
| `plataforma-principal` | Separar plataforma principal e secundária e revisar fonte compartilhada. |
| `tela-fachada` | Catalogar sistema, fixações e apoio; não tratar como programa SST. |
| `linha-vida` | Catalogar cobertura, ancoragens e usuários; não substituir por treinamento NR-35. |

Inventário executável em `src/v2/presets/migration.ts`; teste compara os 38 IDs
reais de `modelos-prontos.ts` com aliases migrados e pendências, sem lacunas.

## Duplicidades e inconsistências

- `kit-completo` V2 não é `combo-completo` V1: o segundo inclui psicossocial. Ambos preservados com composição explícita.
- `pgr-pcmso-ltcat` V1 menciona ART nos entregáveis; o kit V2 anterior não incluía. Preservado o comportamento V2; selecionar ART expressamente.
- LI e LIP não são duplicatas: adicionar periculosidade muda a contratação.
- Pacotes de químicos e poeiras podem sobrepor amostras; definir agente/fração/grupo, sem contar a mesma coleta duas vezes.
- `plataforma` e `plataforma-principal` citam a mesma fonte V1, apesar de escopos diferentes; pendentes de revisão.
- TM0136 alterna online e EAD/presencial; modalidade única continua no item.
- Imperthane promete validade EAD imediata; Marista associa NR-10 a habilitação legal. Não transpostos: modalidade, prática, aptidão e autorização têm critérios distintos.
- Unimetais e ML2 contêm garantias amplas, referências/métodos específicos e quantidades particulares. Não adotados como normas ou defaults globais.
- `assessoria-programas` V1 promete orientação de eSocial nos entregáveis sem delimitar eventos; V2 não presume transmissão. Selecionar eSocial e período quando contratado.
- O valor fixo e parcelamento de perícia V1 não foram copiados.

## Recomendações e limites

Priorizar homologação editorial dos serviços frequentes e depois perícia/obras.
Revisar norma, jurisdição, público, modalidade, prática, estratégia de amostragem,
objeto da ART e limites comerciais antes de enviar. Não converter a revisão
`pending` para `reviewed` apenas porque build ou paginação passaram.
Os avisos técnicos continuam na interface; não foi criado workflow de aprovação.
Não há importação arbitrária, persistência, banco, envio ou publicação novos.
Projetos já são representáveis como itens customizados; os presets especializados
acima continuam pendentes, sem falsa equivalência com serviços existentes.

## Exemplos e verificação

`node gerador/scripts/test-v2-quality.mjs` gera 14 HTMLs autônomos (fontes e logo
embutidos) em `examples/quality/`, PDFs, capturas de todas as páginas e relatório
em `artifacts/v2-quality/`. Dados e valores são fictícios, não preços sugeridos.

| Cenários | Páginas verificadas |
| --- | --- |
| PGR, PCMSO, LTCAT | 3 cada |
| LIP | 4 |
| Kit, kit + psicossocial | 6 cada |
| Psicossocial, brigada | 3 cada |
| Medição única, treinamento simples | 2 cada |
| Medições combinadas | 6 |
| Treinamentos operacionais | 5 |
| Assessoria consultiva, grupo consultivo | 15 e 21 |

Contagens são resultados, não metas. A suíte exige zero erros de conteúdo/layout,
assets carregados, PDF com mesma contagem, repaginação determinística e HTML
autônomo imprimível. Revisão visual por amostragem complementa a inspeção de
todas as páginas. Homologação limitada ao Chromium.

```sh
node --test gerador/tests/v2.test.mjs gerador/tests/v2-editor.test.mjs
node gerador/scripts/test-v2-quality.mjs
node gerador/scripts/test-v2-pagination.mjs
node gerador/scripts/test-v2-editor.mjs
npm run type-check --prefix gerador
npm run build --prefix gerador
```

Nenhuma entrada, template, catálogo, autenticação ou gerador V1 foi alterado.

Resultado final: 42 testes unitários aprovados; 14 cenários comerciais sem avisos
de layout, com HTML autônomo e PDF; quatro cenários anteriores de paginação
aprovados; interface desktop/mobile, edição após PDF e novos controles aprovados;
typecheck e build do gerador aprovados. Permanecem os avisos conhecidos do script
legado de orçamento sem módulo e do tamanho do chunk Paged.js. Não foi realizada
homologação manual de todas as telas V1.

Na regressão mobile foi corrigida a medição do preview oculto: durante preparação,
o painel fica mensurável fora da tela, pois Paged.js não funciona em `display:none`.
O fluxo mantém os bloqueios de exportação e a fila existentes.