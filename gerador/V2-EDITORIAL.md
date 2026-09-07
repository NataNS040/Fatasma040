# V2: sistema editorial

## Escopo

Revisao visual de 07/09/2026, sobre a arquitetura existente. Composer, catalogo,
schema, validacao comercial, V1 e integracoes de banco nao foram alterados nesta
etapa. Os campos continuam semanticos; o renderer decide a apresentacao.

Referencias visuais abertas antes da implementacao: proposta TM0136 (Condominio
Villaggio Di Roma) e proposta de programas/medicoes do Grupo Unimetais, maio/2026.
Foram aproveitados identidade institucional, hierarquia e destaques de entregas,
nao suas alturas fixas, recortes ou dependencias de CDN.

## Componentes

| Equivalente editorial | Implementacao |
| --- | --- |
| Capa institucional | `.cover`: azul #1a365d, detalhe #f5a623, logo local claro, codigo, PROPOSTA COMERCIAL, titulo, razao social/grupo, data e revisao |
| SectionIntro | `.section-intro`, abertura em paragrafo |
| ServiceHeader | `serviceHeader`, icone, nome curto e nome completo no mesmo heading |
| ServiceSummary | `editorialContent('summary')`, paragrafos antes dos parametros |
| ObjectiveBox | `editorialContent('objective')`, destaque discreto com faixa dourada |
| DeliverablesBox | `editorialContent('deliverables')`, lista de entregas com checks e fundo verde suave |
| MethodSteps | `editorialContent('executionSteps')`, lista ordenada somente para etapas existentes |
| FeatureList | listas de escopo, metodologia e fundamentacao, sem inventar conteudo |
| ResponsibilitiesGrid | campos provider/client, rotulos e faixas distintas; fallback deliberado de uma coluna para permitir fragmentacao |
| InclusionsBox / ExclusionsBox | inclusoes com checks; exclusoes com faixa neutra e titulo explicito |
| MeasurementTable / TrainingTable | `dataTable`, parametros por item e configuracoes por empresa; quantitativos preservados |
| CommercialBox | tabela comercial, valores destacados e consolidado somente quando projetado pelo composer |
| InfoCallout | observacoes e condicoes especificas com faixas discretas |

`components/editorial.ts` retorna fragmentos rasos. Listas extensas nao viram cards
indivisiveis. Os mesmos tratamentos se aplicam aos textos tecnicos compartilhados,
preservando a indicacao das empresas e dos servicos aos quais se aplicam.

`components/icons.ts` contem 15 icones SVG locais de poucos paths, com currentColor,
viewBox e traco consistentes. Templates DOM sao clonados; nao ha innerHTML, CDN,
fontes de icones, imagens externas ou dependencias de simbolos fora da pagina.
Montserrat e Open Sans continuam sendo carregadas dos pacotes locais existentes.

## Paginacao

A capa e a unica quebra de pagina explicitamente forcada pelo sistema editorial.
Ela usa altura minima dentro da area imprimivel, sem altura maxima ou overflow
oculto. As demais secoes continuam em fluxo A4. Apenas cabecalhos compactos,
linhas de tabela e assinaturas recebem restricoes locais de quebra.

Os primeiros titulos de secao/servico ficam juntos em `.section-start`; o corpo do
servico permanece fora desse grupo. Nome curto e completo compartilham o heading.
CSS impede separar o cabecalho da primeira linha da tabela.

Foi necessaria uma extensao pontual no paginador: `pagination/table-headers.ts`,
registrada no hook `renderNode` de cada Previewer. Evidencia: a tabela de assessoria
do grupo continuava na pagina seguinte sem seu `thead`. O hook clona somente o
cabecalho ausente enquanto o Paged.js ainda mede os nos. Nao injeta conteudo depois
da medicao e nao altera break tokens, margens, fila, revisoes, espera de assets,
inspecao de layout ou criterios de liberacao do PDF. O algoritmo central permanece
o da biblioteca existente. A regressao exige cabecalho e dados em cada fragmento.

## Validacao visual

Capturas inspecionadas: assessoria robusta, grupo, kit de programas, kit completo,
muitos servicos, treinamento simples, brigada e medicao. A revisao incluiu capas,
parametros, etapas, entregaveis, responsabilidades, tabelas comerciais e rodapes.
Os modos compact, standard e consultive foram comparados no Quality Lab mantendo
independentes os niveis de detalhe. O conteudo completo ocupa mais paginas que a
versao anterior; isso nao e compensado com remocao de conteudo ou fonte diminuta.

Os candidatos foram gerados sem atualizar referencias. A atualizacao explicita
ocorre apos inspecao das capturas e verificacao de conteudo/layout. O snapshot de
regressao agora usa schema 2, incluindo geometria, estilo e paths dos SVGs.
Os 14 exemplos autonomos sao reabertos com rede desligada, validando icones, logo,
fontes e numero de paginas dos PDFs. Isso nao substitui revisao tecnica normativa.

Veja [V2-QUALITY.md](V2-QUALITY.md) para comandos, gates e localizacao das evidencias.