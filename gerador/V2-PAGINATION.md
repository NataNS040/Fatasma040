# Documento, paginação e exportação V2

## Uso local

Na pasta `gerador`, execute `npm run dev` e abra
`http://localhost:5174/gerador-de-proposta/v2-preview.html` para o laboratório de fixtures.
O editor da equipe está em `v2.html`, descrito em [V2-UI.md](V2-UI.md).
A entrada é independente da autenticação, menus, templates e estilos da V1.
O seletor contém apenas fixtures fictícias; não é o formulário completo.

```ts
import { DocumentPaginator } from './src/v2/pagination/engine';
import { tm137GroupProposal } from './src/v2/fixtures/assistance';

const paginator = new DocumentPaginator(document.querySelector('#pages')!);
const result = await paginator.prepareDocumentForExport(tm137GroupProposal());
if (result.ready) window.print();
```

O chamador deve impedir exportação durante a preparação, como faz `ui/preview.ts`.
Cada instância serializa solicitações e descarta os estilos/páginas anteriores.
A UI usa um identificador de geração para impedir que uma solicitação antiga
libere o botão de uma seleção mais recente.

## Decisão técnica

Adotado **Paged.js 0.4.3**, importação ESM explícita e carregada sob demanda.
Não usamos o polyfill automático, que poderia capturar a página da aplicação.
O `Previewer` recebe somente o DOM do documento, CSS de impressão e destino.
O núcleo de domínio/composer continua independente de navegador.

Referências: [API e uso como módulo](https://pagedjs.org/devdocs/),
[conteúdo nas margens](https://pagedjs.org/en/documentation/7-generated-content-in-margin-boxes/)
e [código do projeto](https://github.com/pagedjs/pagedjs/).

Foi preferido à estimativa por caracteres ou alturas fixas por seção porque mede
o fluxo no navegador e gera páginas concretas que também serão impressas.
O preview usa essas mesmas páginas, sem uma segunda montagem para PDF.

Limitações concretas encontradas e corrigidas:

- Uma página nomeada de capa após elementos correntes produzia uma página inicial
  vazia. A capa usa agora `break-after: page`; a supressão do cabeçalho inicial
  só é aplicada quando existe capa.
- Na fixture média com conteúdo completo, contêineres de card/listas profundamente
  aninhados faziam o Paged.js omitir um trecho. O renderer normaliza os cards e
  listas para um fluxo mais raso, preservando títulos, listas e tabelas semânticas.
  A comparação de IDs **e texto integral dos fragmentos** detecta regressões.
- Um card longo não pode ser indivisível sem criar grandes vazios. Ele continua
  na próxima página; linhas de tabela e assinaturas são unidades indivisíveis.
  Conteúdo excepcionalmente maior que uma página deve ser reorganizado na origem,
  nunca reduzido automaticamente ou escondido com overflow.
- Alternar screen/print acionava o ResizeObserver interno sobre fragmentos e
  causava erros assíncronos de `findEndToken`. Após o fluxo inicial, os listeners
  automáticos de cada página são desligados. O resultado é um snapshot A4;
  alterações sempre passam pela repaginação explícita e sua validação.

## Camadas e componentes

`components/document.ts` cria elementos seguros, seções, cabeçalhos de seção,
listas e tabelas. `renderer/document.ts` monta Document, Cover, TextBlock,
InfoBox, ServiceCard, DataGrid, CompaniesTable, TrainingTable, CommercialTable,
Conditions, Responsible/Signature, PageHeader e PageFooter a partir de `blocks`.
São componentes DOM e variantes semânticas; não um template por proposta.
Todo texto é inserido por `textContent`, sem execução de HTML do cliente.

Conteúdo técnico idêntico pode ser apresentado uma vez com linhas de configuração
por empresa. Trechos compartilhados mantêm explicitamente quais serviços se aplicam
a cada empresa. A renderização nunca consulta preços brutos em `sourceItems`.

`renderer/document.css` define A4 (210 × 297 mm), margens superior de 19 mm,
laterais de 16 mm e inferior de 20 mm; cabeçalho e rodapé correntes; contador
de página e total de páginas. Usa `break-after: avoid` nos títulos,
`break-inside: avoid` nas linhas/assinaturas e `widows/orphans: 3` no texto.
Quadros curtos de informações compartilhadas também são mantidos juntos.
Seções usam fluxo automático. Não há rodapé absoluto sobre o corpo.

Fontes Montserrat e Open Sans (subconjunto latino) e logo são assets locais Vite.
A preparação aguarda os quatro pesos/fontes usados, `document.fonts.ready` e
`img.decode()`, com limite de espera e erro explícito para asset indisponível.
Depois pagina, aguarda os assets finais e dois frames e executa a inspeção.

`pagination/layout.ts` verifica geometria com tolerância de 2 px:
overflow do corpo, largura de tabelas, fragmentação de unidades indivisíveis,
invasão do rodapé, páginas vazias, páginas intermediárias com menos de 25% da
altura ocupada e conteúdo ausente/incompleto. Problemas graves bloqueiam o botão;
ocupação baixa é aviso. A capa e a última página não recebem alerta de baixa ocupação.
A inspeção não substitui revisão visual: composição tipográfica, viúvas e órfãs
dependem também do algoritmo do navegador/Paged.js.

## Verificação reproduzível

Da raiz do repositório:

```sh
node --test gerador/tests/v2.test.mjs
node gerador/scripts/test-v2-pagination.mjs
npm run type-check --prefix gerador
npm run build --prefix gerador
```

O teste usa o Playwright já disponível na raiz, inicia Vite em localhost:5186 e
gera screenshots de **todas** as páginas, HTML renderizado, PDFs e relatório em
`gerador/artifacts/v2-pagination/`. O Chromium precisa estar instalado no ambiente.

| Cenário | Detalhamento | Páginas verificadas |
| --- | --- | --- |
| Curta, PGR | standard | 3 |
| Média, kit + psicossocial + eSocial | standard | 5 |
| Assessoria inspirada em TM136 | full | 16 |
| Grupo de cinco empresas inspirado em TM137 | standard | 13 |

As contagens resultam do conteúdo; não são metas ou números fixos do motor.
Testamos repaginação, ausência de acúmulo, texto integral, mesma contagem no PDF,
dimensões A4 em screen/print, ocultação de agregado/valor contratual, overflow
artificial, invasão de rodapé, conteúdo ausente e imagem inválida.

## Limites e dívidas

- Validação visual automatizada nesta entrega é no Chromium do Playwright.
  Outros motores/impressoras precisam de homologação. Ao salvar manualmente,
  usar A4, escala 100%, fundos habilitados e cabeçalhos/rodapés do navegador
  desativados. O PDF de teste aplica essas opções programaticamente.
- Os textos técnicos do catálogo seguem marcados como pendentes de revisão
  editorial; os avisos aparecem no preview e não são erros de geometria.
- Paged.js traz dependências transitivas antigas (`@babel/polyfill`/`core-js`);
  não se usa o entrypoint polyfill. O lockfile fixa a versão para reprodução.
  Atualização/substituição deve repetir a suíte visual e a comparação de texto.
- O chunk do Paged.js tem cerca de 505 kB minificado e é carregado sob demanda;
  o Vite emite aviso de tamanho. Permanece também o aviso legado de `orcamento.js`
  sem `type="module"`, sem relação com a V2.
- Não há editor completo, parser seguro de JSON externo, persistência nem banco.
- Ctrl+P é comando do navegador e pode ser acionado antes de qualquer aplicação
  concluir trabalho. O fluxo suportado é o botão que prepara e valida antes de imprimir.

## Arquivos desta etapa

Criados: `v2.html`, `src/v2/components/document.ts`,
`src/v2/renderer/document.{ts,css}`, `src/v2/pagination/{engine,layout}.ts`,
`src/v2/pagination/pagedjs.d.ts`, `src/v2/ui/preview.{ts,css}`,
`scripts/test-v2-pagination.mjs` e este documento.
Atualizados: `package.json`, `package-lock.json`, `vite.config.ts` (apenas nova
entrada), documentação de arquitetura/componentes/UI e exemplos V2.
Arquivos de domínio/composer/configurador/fixtures/testes também incluem a etapa
de assessoria descrita em `V2-ASSISTANCE.md`.
