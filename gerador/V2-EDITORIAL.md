# V2: sistema editorial

## Escopo

Revisao visual e de densidade comercial de 07/09/2026, sobre a arquitetura
existente. A selecao contextual de campos fica no composer/presentation-policy;
o renderer recebe somente o conteudo a apresentar. Os dados tecnicos completos
continuam no catalogo e no snapshot. Validacao comercial, V1 e banco nao foram
alterados nesta etapa de densidade.

## Densidade comercial

- `compact`: resumo e entregas em uma secao conjunta, sem subsecoes tecnicas
	genericas. Mantem parametros, visitas, notas e condicoes essenciais.
- `standard`: padrao comercial, resumo e entregas organizados por familias.
	Nao exibe automaticamente escopo tecnico, metodologia, etapas, fundamentacao,
	responsabilidades, inclusoes, exclusoes ou observacoes genericas do catalogo.
- `consultive`: com um servico e sem nivel definido, permite conteudo completo;
	com nivel standard ou dois/tres servicos, seleciona resumo, objetivo, escopo,
	metodologia, entregas e exclusoes. Quatro ou mais servicos usam a apresentacao
	comercial por item, exceto assessoria e detalhamento completo explicito.
- `summary` explicito reduz a resumo, mantendo condicoes essenciais. `full`
	explicito amplia o conteudo em standard/consultive; compact continua resumido.
	`standard` herdado do preset nao anula full definido no documento. Para restringir
	especificamente um item, selecionar summary. Assistencia consultiva conserva
	seu detalhamento proprio.

A quantidade e calculada pelos catalogIds distintos (titulo para personalizados),
sem multiplicar os servicos pelos CNPJs. Nenhum limite de paginas e imposto.
Descricoes e entregas existentes nao sao truncadas por caracteres ou por frases.

`ServiceProfile.commercialConditions` e um metadado opcional de texto semantico:
marca explicitamente limites essenciais, sem classificador por palavras-chave.
Programas preservam, por exemplo, limites de medicoes, exames e ART. Condicoes
iguais podem aparecer uma vez em **Condicoes de execucao**, com aplicabilidade.
As demais observacoes permanecem disponiveis no catalogo. Notas especificas,
parametros, termos de pagamento e execucao continuam visiveis em todos os modos.
Nao existe mais secao tecnica automatica apenas para descarregar todos os campos.
Entregas comerciais ficam junto de cada servico, nao sao extraidas para o fim.

O estilo anterior dos entregaveis (itens destacados com checks) foi restaurado
com autorizacao do usuario: o experimento de fundo unico perdeu uma entrega de
ART no kit completo. A prioridade foi preservar integridade e concluir a politica
comercial; nao se alterou o paginador para contornar o problema. Uma condicao unica
de execucao usa paragrafo, nao uma lista aninhada de um item. Termos de pagamento
repetidos sao omitidos apenas quando ja constam integralmente na tabela para
todas as empresas.

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

Entregaveis usam spans de bloco com `role="list"` e `role="listitem"`, mantendo
a semantica acessivel e o visual dos itens. O Paged.js 0.4.3 clona esse grupo de
texto integralmente antes de medir, evitando perder os ultimos itens de listas
aninhadas em secoes longas (kit psicossocial e medicoes do grupo). O grupo continua
fragmentavel; cada item recebe layoutId e permanece sujeito a inspecao integral.
Os conteineres de secao foram preservados, sem mover conteudo entre blocos.

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

Na etapa editorial anterior houve uma extensao pontual: `pagination/table-headers.ts`,
registrada no hook `renderNode` de cada Previewer. Evidencia: a tabela de assessoria
do grupo continuava na pagina seguinte sem seu `thead`. O hook clona somente o
cabecalho ausente enquanto o Paged.js ainda mede os nos. Nao injeta conteudo depois
da medicao e nao altera break tokens, margens, fila, revisoes, espera de assets,
inspecao de layout ou criterios de liberacao do PDF. O algoritmo central permanece
o da biblioteca existente. A regressao exige cabecalho e dados em cada fragmento.
Na etapa atual de densidade nao houve alteracao nos arquivos de paginacao.

## Validacao visual

Fixtures de densidade: PGR sozinho, PGR + NR-20, tres programas, kit completo,
treinamento sozinho, assessoria robusta e grupo, comparados nos tres modos.
A fixture PGR + NR-20 standard tinha 5 paginas antes da politica contextual;
com estilo de entregas restaurado, tem 4 paginas. O experimento intermediario
de fundo unico chegou a 3, mas nao e a versao aprovada. O kit completo passou de
7 para 4 paginas. Assessorias/projetos com full explicito continuam extensos.

Capturas incluem tambem muitos servicos, brigada e medicao. A revisao abrange capas,
parametros, etapas, entregaveis, responsabilidades, tabelas comerciais e rodapes.
Os modos e niveis obedecem a precedencia documentada acima. O conteudo completo
continua disponivel, sem fontes diminutas ou paginas fixas.

Os candidatos foram gerados sem atualizar referencias. A atualizacao explicita
ocorre apos inspecao das capturas e verificacao de conteudo/layout. O snapshot de
regressao agora usa schema 2, incluindo geometria, estilo e paths dos SVGs.
Os 14 exemplos autonomos sao reabertos com rede desligada, validando icones, logo,
fontes e numero de paginas dos PDFs. Isso nao substitui revisao tecnica normativa.

Veja [V2-QUALITY.md](V2-QUALITY.md) para comandos, gates e localizacao das evidencias.