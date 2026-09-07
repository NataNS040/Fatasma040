# Guia do desenvolvedor - Gerador V2

## Ambiente e fronteiras

Ambiente auditado: Node.js 22.18, npm, Windows e Chromium do Playwright. Raiz e
`gerador` são pacotes distintos. Playwright vem da raiz; Vite, TypeScript,
Paged.js e fontes vêm de `gerador`. Não ligar banco ao editar catálogo/layout.

```sh
npm install
npm install --prefix gerador
npx playwright install chromium
npm run dev:v2 --prefix gerador -- --host 127.0.0.1
```

Instale apenas quando necessário, preserve lockfiles e não use `audit fix --force`.
Use `npm ci` com lockfile versionado/coerente. Vite dev somente local; existem
alertas conhecidos, ver `V2-AUDIT.md`. A V2 não exige `.env`, chaves ou credenciais.
Não simular autenticação nem importar sessão V1.

Leia `V2-ARCHITECTURE.md`: núcleo retorna dados, UI adapta rascunhos, renderer cria
DOM e paginador verifica exportação. Composto não significa PDF aprovado.

## Adicionar serviço

1. Escolha `catalog/programs.ts`, `management.ts`, `measurements.ts` ou `trainings.ts`.
2. Use `defineEntry` de `catalog/shared.ts`: ID estável, kind, categoria, título, shortName, ordem e seção.
3. Preencha resumo, objetivo, escopo, metodologia, etapas, entregáveis, referências, responsabilidades, inclusões, exclusões, observações e periodicidade. Cite fonte verificável.
4. Defina parâmetros com os helpers locais. Binding escreve no domínio; sem binding, valor fica em `item.parameters`. Novo binding exige suporte em `validation/parameters.ts`.
5. Confirme registro em `catalog/services.ts`. Materialize via `createCatalogItem`, nunca HTML ou preço no catálogo.
6. Para assessoria, atualize tipos/IDs em `domain/assistance.ts` e categoria permitida em `configurator/assistance.ts`; preserve parâmetros extras.
7. Adicione teste de parâmetros obrigatórios, materialização, snapshot independente e fixture. Confira seleção na UI.

Exemplo de materialização existente:

```ts
import { createCatalogItem } from './src/v2/catalog/select-service';

const training = createCatalogItem('nr06', {
    id: 'company-1:nr06',
    companyId: 'company-1',
    parameters: {
        participants: 10,
        classes: 1,
        hoursPerClass: 2,
        occurrences: 1,
        modality: 'onsite',
        audience: 'Público de ensaio sujeito à revisão técnica'
    }
});
```

Quantidades do exemplo não são recomendações normativas. Preserve `review: pending`
até revisão técnica. Registre revisão editorial ao alterar conteúdo; não reescreva
snapshots históricos. Trechos comuns usam igualdade e aplicabilidade; não force
equivalência aproximada entre textos de serviços distintos.

## Adicionar preset

Registre em `presets/catalog-presets.ts` usando `preset`, IDs existentes e modo
recomendado. Não inclua preço, HTML ou regra de paginação. Parâmetros iniciais
exigem justificativa editorial; não inventar participantes ou horas.
`instantiatePreset` aceita overrides e rejeita serviço fora da composição.

`listPresets()` alimenta Outros presets automaticamente; atalho principal é
decisão separada em `ui/draft.ts`. Preserve os sete nomes existentes. Assessoria
usa o configurador nativo, não duas fontes de itens. Para alias V1, atualize
`legacyIds` e `presets/migration.ts`; o teste deve cobrir todo ID legado com destino
ou pendência explícita.

## Adicionar bloco

1. Defina contrato discriminado em `domain/document.ts` e inclua em `DocumentBlock`.
2. Emita o bloco no composer apenas se houver escopo que o justifique, sem DOM nem estimativa de páginas.
3. Implemente no renderer com `element`, `section`, `featureList` ou `dataTable`. Dados do cliente só como texto.
4. Adicione CSS A4 sem recorte para esconder conteúdo. Evite wrappers profundos por causa das quebras do Paged.js 0.4.
5. Garanta folhas com `data-layout-id`; marque `data-atomic` apenas nos indivisíveis. Tabelas usam `thead` e linhas atômicas.
6. Teste presença/ausência, conteúdo, ordem, paginação e PDF; avalie versionamento se afetar consumidores do contrato.

Nunca renderize preços brutos ou `sourceItems`: use blocos projetados. Preserve
cálculos desabilitados pelas flags comerciais. Tags novas devem entrar na
atribuição de IDs e inspeção; caso contrário, parte do conteúdo ficará sem cobertura.

## Criar fixture

Crie fábrica determinística e registre `id`, `name`, `source` e `create` em
`fixtures/regression.ts`. Lab e testes usam esse registro. IDs, datas e valores
devem ser fixos; dados, fictícios. Todo item precisa de empresa e preço válido.

Reutilize catálogo/presets ou `createAssistanceProposal`, não HTML histórico.
Fonte real orienta estrutura e conteúdo, não importação de clientes. Acrescente
asserts que distingam a fixture: quantidade, serviço, valor individual ou total
ausente/presente. Não criar exemplos que passem sem provar sua regra principal.

## Testar paginação

```sh
npm run test:v2:unit --prefix gerador
node gerador/scripts/test-v2-pagination.mjs
node gerador/scripts/test-v2-editor.mjs
node gerador/scripts/test-v2-workflows.mjs
node gerador/scripts/test-v2-quality.mjs
npm run test:v2:regression --prefix gerador
npm run test:v2 --prefix gerador
```

Suíte completa: unitários/arquitetura, quatro paginações, editor, fluxo de
assessoria/grupo, 14 HTMLs autônomos, dez regressões do Lab, typecheck, build e
isolamento de produção. Não atualiza referências e falha se qualquer etapa falhar.
Relatório em `artifacts/v2-suite/results.json`.

```sh
npm run dev:v2:quality --prefix gerador -- --host 127.0.0.1
```

O Lab percorre fixtures e casos inválidos em `/gerador-de-proposta/v2-quality-lab.html`.
Não incluí-lo no build. Suítes antigas usam portas 5186/5187; novas usam portas
efêmeras. Cada script encerra seus servidores/navegadores.

Referências comparam texto/ordem, geometria com tolerância 1px, estilos, imagens
e páginas. Não são diff pixel a pixel. PNG/PDF e JSON atual estão em
`artifacts/v2-regression`. Examine página interna, não só capa: captura A4 remove
temporariamente rolagem interna para não capturar página errada.

Somente após justificar/revisar mudança intencional:

```sh
npm run test:v2:update-baselines --prefix gerador
npm run test:v2:regression --prefix gerador
```

Não atualize referência para ocultar defeito. Ausência de referência é falha;
gravação só ocorre após todas as verificações passarem. Mudança de browser, fonte
ou SO deve ser registrada, não compensada automaticamente com tolerância maior.

## Estado assíncrono e manutenção

Editor bloqueia PDF imediatamente, debounces preparação e reutiliza validação por
revisão. Não chamar composer por tecla. Paginador serial usa `invalidate()` ao mudar
dados; `superseded` não pode liberar impressão. Não usar Previewers concorrentes
no mesmo destino. Preserve preview mobile mensurável e checagem pós-await.

Não remova contratos públicos só por não aparecerem na UI. Teste de módulos
alcançáveis distingue API pública de arquivo órfão; TypeScript verifica locais e
parâmetros não usados. Mantenha diagnóstico de falha real, não logs por tecla ou
dumps de propostas. Comentários devem explicar restrições/invariantes.

O comando legado `lint` não representa configuração ESLint homologada da V2;
gates atuais são TypeScript estrito, auditoria AST e testes. No próximo projeto,
tratar explicitamente parser de entrada, autorização, RLS, armazenamento e
versionamento. Nada disso foi simulado ou conectado nesta fase.