# Catálogo universal e composição técnica V2

## O que está implementado

26 entradas locais: os 25 serviços solicitados e a assessoria da fundação.
Não há preço, HTML, acesso à rede ou dependência de `modelos-prontos.ts` no catálogo.
Os textos são adaptações comerciais de fontes reais do repositório, com escopo
desvinculado das quantidades e condições particulares daqueles clientes.

| Arquivo em `src/v2/catalog/` | Serviços e IDs estáveis |
| --- | --- |
| `programs.ts` | `pgr`, `pcmso`, `ltcat`, `lip`, `aet` |
| `management.ts` | `psychosocial`, `esocial`, `art`, `technical-support`, `technical-visit`, `assistance` |
| `measurements.ts` | `noise`, `heat`, `vibration`, `chemicals`, `dust` |
| `trainings.ts` | `nr01`, `nr05`, `nr06`, `nr10`, `nr12`, `nr18`, `nr20`, `nr33`, `nr35`, `brigade` |

`services.ts` agrega as famílias. `getCatalogEntry(id)` e `listCatalogEntries()`
retornam cópias independentes. IDs `noise`, `heat`, `brigade` e demais IDs da
fundação foram mantidos. Categoria comercial e seção de apresentação são
independentes: por exemplo, a AET é catalogada entre programas/laudos e aparece
na seção de avaliações complementares.

## Conteúdo e rastreabilidade

`CatalogEntry` contém `id`, `kind` e `content`. Em `content` ficam nome completo
(`title`), objetivo, metodologia, entregáveis, fundamentação (`references`),
exclusões e origem/revisão (`provenance`). O objeto `content.profile` acrescenta:

- `shortName`, `category`, `summary` e `scope`;
- `executionSteps`, `providerResponsibilities`, `clientResponsibilities`;
- `inclusions`, `observations` e `periodicity`;
- `parameters`, `defaultDetail`, `icon` e `visual` (cor, grupo e ordem).

O campo anterior `responsibilities` continua disponível para snapshots da
fundação; novas entradas usam responsabilidades separadas entre EngMarq e cliente.
`TechnicalContent.profile` é opcional para conteúdo antigo/customizado e obrigatório
nas entradas do catálogo universal.

Cada entrada registra `provenance.source`, `sources[]`, `revision` e `review`.
As fontes principais são:

| Conteúdo | Fonte real a partir da raiz do repositório |
| --- | --- |
| PGR, PCMSO e LTCAT | `propostas/maio-2026/proposta-pgr-pcmso-ltcat-atecmontagem.html` |
| LIP, psicossocial, eSocial, ART e atendimento | `propostas/agosto-2026/TM0136-Condominio Villaggio Di Roma.html` e TM0137 Grupo Bertis |
| AET | `propostas/marco-2026/proposta-aet-clbi.html` |
| Ruído, vibração, químicos e poeiras | `propostas/maio-2026/proposta-medicoes-ml2.html` e `proposta-programas-medicoes-unimetais.html` |
| Calor | Unimetais e TM0137; a referência NHO-06 é registrada adicionalmente a partir do catálogo V1 |
| NR-01 | TM0137 Grupo Bertis |
| NR-05/CIPA | `propostas/junho-2026/TM0090-MVP Engenharia.html` e `propostas/agosto-2026/TM0123-RM de Oliveira Bebidas.html` |
| NR-06, NR-10, NR-12, NR-20 e NR-35 | `propostas/julho-2026/TM0117-Colegio Marista Natal.html` |
| NR-18 | `propostas/abril-2026/proposta-treinamentos-domus-esquadrias.html` |
| NR-33 | `propostas/janeiro-2026/proposta-treinamentos-modelo.html` |
| Brigada | `propostas/maio-2026/proposta-brigada-incendio-ceneged.html` |

São referências históricas do repositório, não uma revisão normativa atual.
Todos os conteúdos começam como `pending`. Não foram adicionadas fundamentações
genéricas para ART, visita ou suporte quando as fontes não as especificam.
Não se transportam afirmações de garantia de conformidade, habilitação automática,
modalidade EAD universal ou carga horária normativa fixa das propostas históricas.
As metodologias químicas/poeiras indicam a necessidade de seleção técnica do método,
sem generalizar o método de sílica para qualquer poeira.

## Seleção e parâmetros

`createCatalogItem(catalogId, selection)` materializa um `ProposalItem` com snapshot
completo. A seleção informa `id`, `companyId`, `parameters` e, opcionalmente,
`detailLevel`. O helper rejeita campos desconhecidos, obrigatórios ausentes,
listas vazias, opções não permitidas e números fora dos limites declarados.

Parâmetros admitem `number`, `text`, `choice` e `list`. Não recebem preços.
Campos estruturados preexistentes usam `binding`: por exemplo, `participants`
grava somente `Training.participants`; não replica o número em `item.parameters`.
Campos adicionais, como `events` de eSocial, ficam em `item.parameters`.
`validateProposal` valida os parâmetros contra o snapshot, sem buscar o catálogo.
As invariantes entre campos (como turmas versus participantes) são verificadas
pelo composer ao validar a Proposal completa.

```ts
import { createCatalogItem } from './src/v2';

const training = createCatalogItem('nr35', {
    id: 'empresa-1-nr35', companyId: 'empresa-1', detailLevel: 'standard',
    parameters: {
        participants: 12, classes: 2, hoursPerClass: 8,
        occurrences: 1, modality: 'hybrid'
    }
});

const heat = createCatalogItem('heat', {
    id: 'empresa-1-calor', companyId: 'empresa-1', detailLevel: 'full',
    parameters: {
        agent: 'Calor', method: 'IBUTG', quantity: 1,
        unit: 'point', workGroups: ['Cozinha']
    }
});
```

São configurações de exemplo, não parâmetros normativos universais. Os itens
devem ser adicionados à coleção correspondente da Proposal e ter uma linha em
`commercial.lines`. O tipo retornado é uma união discriminada: usar `item.kind`
para estreitar o tipo antes de inserir em `services`, `trainings`, `measurements`
ou `assistance`. Conteúdo programático de treinamento pode ser ajustado em
`item.syllabus`, sem alterar o catálogo.

## Níveis de apresentação

| Nível | Texto projetado |
| --- | --- |
| `summary` | Resumo comercial |
| `standard` | Resumo, metodologia e entregáveis |
| `full` | Resumo, objetivo, escopo, metodologia, etapas, entregáveis, responsabilidades, fundamentação, inclusões, exclusões, observações e periodicidade |

Prioridade: `item.detailLevel` → `Proposal.options.detailLevel` →
`content.profile.defaultDetail` → `standard`. Os parâmetros contratados ficam
identificados na apresentação em qualquer nível. Campos sem conteúdo são omitidos.
O nível não modifica o snapshot nem os valores; apenas controla a projeção de texto.
Limites específicos que precisem aparecer também numa proposta resumida devem
estar em `Proposal.scope.exclusions/assumptions` e nas condições comerciais.
O renderer futuro deve apresentar esses blocos e não tratar o resumo isolado
como a íntegra da contratação.

## Composição por seções

`composeProposal(proposal, options?)` valida e gera blocos semânticos. A fase
atual substitui blocos técnicos isolados por `technical-section` e, quando
necessário, `shared-technical`. O documento agora explicita `compositionVersion: 2`.
As entradas da fundação continuam aceitas, mas consumidores experimentais do
antigo `kind: 'technical'` devem passar a ler a nova estrutura.

- `document.sourceItems` conserva os itens completos para auditoria e recomposição.
- `document.blocks` contém a apresentação selecionada; o renderer deve consumir
  estes blocos, sem imprimir novamente os snapshots.
- Cada serviço apresentado mantém item, empresa, catálogo, nível, campos,
  parâmetros e `sharedContentIds`.
- Trechos comuns são agrupados por **empresa + campo + texto**. Apenas espaços
  são normalizados; não há fusão aproximada de frases ou remoção de negações.
- Cada trecho compartilhado tem `appliesTo[]`, com item e empresa. Uma lista de
  presença compartilhada significa uma entrega para cada capacitação indicada,
  não um documento único indistinto para todas elas.
- Objetivos, escopo e sequência de etapas permanecem específicos. Metodologias,
  entregáveis, referências e condições idênticas podem ser compartilhados.
- Valores, quantidades e dados de empresas nunca são deduplicados como texto.
- A ordem profissional vem de `presentation-policy.ts`; cada serviço declara seu
  grupo e prioridade editorial. A composição não escolhe grupos pelo ID do serviço.

```ts
const result = composeProposal(proposal, {
    sectionOrder: { esocial: 15, shared: 75 },
    sectionTitles: { esocial: 'Eventos de SST contratados' }
});
```

As opções reorganizam os grupos técnicos; capa, identificação, objeto, investimento
e aceite mantêm o enquadramento do documento. Grupos desconhecidos e ordens não
finitas são rejeitados. Não são geradas seções técnicas vazias.

## Presets

`presets/catalog-presets.ts` define:

- `kit-programas`: PGR, PCMSO e LTCAT;
- `kit-completo`: PGR, PCMSO, LTCAT, LIP e ART.

```ts
const items = instantiatePreset('kit-completo', 'empresa-1', 'kit', {
    pgr: { detailLevel: 'full' },
    art: { parameters: { quantity: 2, coveredServices: ['PGR', 'LTCAT', 'LIP'] } }
});
```

O preset cria seleções independentes e editáveis; não altera a Proposal existente,
não acrescenta preço e não carrega HTML. Sua configuração inicial de uma ART pode
ser revisada conforme o objeto contratado. Não vincula responsabilidade médica
do PCMSO à ART de engenharia. `createProgramKit` continua como atalho compatível.

## Como adicionar um serviço

1. Localizar a proposta real que contém escopo, metodologia e entregáveis.
   Registrar caminho exato em `sources`; preservar a distinção entre conteúdo
   reutilizável e condições particulares do cliente.
2. Em uma das quatro famílias, adicionar uma chamada a `defineEntry`, seguindo
   a entrada PGR ou AET de `programs.ts`. O tipo exige nome, resumo, objetivo,
   escopo, metodologia, etapas, entregáveis, referências, responsabilidades,
   inclusões, exclusões, observações, periodicidade, parâmetros, ícone e visual.
   Referências podem ficar vazias quando não houver fundamentação específica.
3. Escolher ID estável, `kind` compatível com o domínio, categoria comercial,
   seção e prioridade. Usar grupos existentes sempre que forem adequados.
4. Definir parâmetros com `numberParameter`, `textParameter`, `listParameter`
   ou uma definição `choice`. Usar binding somente para campos estruturados já
   suportados. Não duplicar quantidade ou modalidade no texto de apresentação.
5. Reutilizar `common` apenas quando o compromisso for efetivamente igual.
   Texto semelhante com limite ou condição diferente deve permanecer específico.
6. Atualizar a revisão editorial e manter `review: 'pending'` até revisão técnica.
   Editar uma proposta nunca deve modificar a entrada base do catálogo.
7. Se necessário, incluir o ID em um preset e declarar suas configurações.
   Um preset não pode referenciar um serviço inexistente.
8. Atualizar a cobertura do catálogo em `tests/v2.test.mjs`, testar seleção,
   parâmetros e nível de apresentação. Executar os comandos abaixo.

Novo serviço em grupo existente não exige alteração do composer. Um novo tipo
de seção requer estender `SectionGroup` e a política, não criar um template.

## Exemplo completo e resultado reproduzível

`universalCatalogProposal()` em [fixtures/proposals.ts](src/v2/fixtures/proposals.ts)
cria uma Proposal fictícia com o preset completo, psicossocial e eSocial.

| Configuração | Valor do exemplo |
| --- | --- |
| Empresa | `company-1` / Empresa Exemplo, 18 colaboradores |
| Detalhamento | `full` |
| Programas e laudos | PGR, PCMSO, LTCAT e LIP |
| Psicossocial | 18 participantes; instrumento e integração explicitados |
| eSocial | S-2220 e S-2240, período de 12 meses |
| ART | 1 registro com serviços de engenharia discriminados |
| Valores fictícios | R$ 6.000,00 em cobranças únicas e R$ 200,00/mês de eSocial |

```ts
import { composeProposal } from './src/v2';
import { universalCatalogProposal } from './src/v2/fixtures/proposals';

const proposal = universalCatalogProposal();
const result = composeProposal(proposal);
if (result.ok) console.log(result.document.blocks);
```

Estrutura resultante:

```text
cover
companies
scope — sobre a proposta
technical-section: programs — PGR, PCMSO, LTCAT, LIP
technical-section: complementary — Psicossocial
technical-section: esocial — eSocial SST
technical-section: technical-responsibility — ART
shared-technical — metodologia, entregas e condições com appliesTo por item/CNPJ
investment — R$ 6.000,00 únicos; R$ 200,00 mensais
acceptance
```

A frase de alinhamento inicial aparece uma única vez, vinculada aos sete itens.
A assinatura médica do PCMSO permanece no serviço correspondente.
O resultado não inclui medições, treinamentos ou assessoria que não foram selecionados.

Arquivos gerados pelo exemplo:

- [Proposal completa em JSON](examples/v2-catalog-proposal.json), com snapshots;
- [Estrutura do documento em JSON](examples/v2-catalog-document-outline.json),
  com campos apresentados, parâmetros, trechos compartilhados e valores.

O segundo arquivo é uma visão estrutural compacta, não o documento integral.
Nenhum dos arquivos é um PDF ou uma proposta liberada para uso comercial.

```sh
node gerador/scripts/v2-example.mjs
node --test gerador/tests/v2.test.mjs
npm run type-check --prefix gerador
npm run build --prefix gerador
```

## Limites preservados

Verificação da entrega: 29 testes passaram, incluindo os testes da fundação;
typecheck e build do pacote `gerador/` passaram. O aviso preexistente de
`orcamento.js` sem `type="module"` permanece. Os hashes do HTML principal,
assessoria e bundle principal V1 continuam idênticos aos da etapa anterior.

V1 e `src/config/modelos-prontos.ts` permanecem intocados. Não há interface nova,
banco, Supabase ou integração externa nesta fase. O catálogo não decide obrigação
legal, habilitação, duração normativa ou necessidade de serviços adicionais.
O composer não resolve contradições arbitrárias em texto livre e não pagina HTML.
Importação de JSON externo ainda exige parser estrutural de `unknown` antes da API
tipada; os JSONs de exemplo são fixtures locais conhecidas.
