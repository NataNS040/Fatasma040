# Verificação das melhorias V2 — 02/10/2026

Implementadas no checkout de `NataNS040/Fatasma040`. V1, catálogo oficial,
presets e referências de regressão não foram alterados. Sem banco/persistência.

## Resultado

| Comando / etapa | Resultado |
| --- | --- |
| `npm run test:v2 --prefix gerador` | Exit 1: somente `regression-lab` falhou |
| Unitários/arquitetura | 92 testes passaram |
| Paginação, aceite, PF, acesso comercial, editor | Passaram |
| Novos personalizados / nome / finanças | Passou; 6 combinações, PDF de 8 páginas |
| Grupos e assessoria | Passaram |
| Exemplos | 14 HTMLs autônomos, PDFs e capturas aprovados |
| Isolamento de produção V1/V2 | Passou |
| `npm run type-check --prefix gerador` | Exit 0 |
| `npm run build --prefix gerador` | Exit 0 |

O build mantém os avisos existentes sobre `orcamento.js` sem `type="module"`
e tamanho de bundle. Relatório completo: `../v2-suite/results.json`.

## Pendência anterior à tarefa

As 12 referências do laboratório ainda contêm o parágrafo `LOCAL E DATA` no
aceite, removido no commit `8217aabc5eec8d111b21bbf5d9afec66e9e4dc47`.
A investigação comparou os JSONs atuais com as referências: número de páginas
igual e todas as páginas anteriores ao aceite exatamente iguais nos 12 casos.
A ausência daquele parágrafo muda os IDs e a posição das assinaturas na última
página. Não foram atualizados snapshots nem restaurado o campo retirado pelo
usuário em trabalho anterior. Não há regressão observada causada pelas melhorias
nos cenários existentes.

Os artefatos antigos e exemplos regenerados durante os testes foram restaurados;
somente os novos artefatos e o relatório final da suíte fazem parte desta entrega.

## Decisões

- `buildProposalFileName` produz `CÓDIGO - CLIENTE`, sem extensão: fantasia ou
  razão social, nome completo de PF ou nome do grupo. Normaliza espaços e
  caracteres inválidos, limita o código a 60 e o nome completo a 180 caracteres.
  A UI define `document.title` somente após preparar/validar o PDF e antes de
  `window.print()`, restaurando o título em `afterprint`. O teste verifica ambos
  os títulos por interceptação de `print()`. O seletor nativo de arquivos não é
  automatizado; a sugestão final depende do navegador.
- `createCustomItem` materializa `Service.kind='custom'`, sem `catalogId`.
  `CustomItemDetails` é discriminado por categoria, com campos opcionais de
  treinamento ou medição. ID, empresa, título, snapshot de escopo e observações
  seguem os contratos existentes. Os campos técnicos são lidos via bindings
  `custom.*`, sem cópias em `parameters`. Composer, renderer e paginador continuam
  usando o fluxo normal. Personalizados ficam nas seções de suas categorias.
- No grupo, cada item tem empresa explícita. Um escopo personalizado comum exige
  adicionar um item por empresa; não integra o mecanismo de overrides do catálogo.
  Na assessoria, entra após a resolução canônica e é incluído no pacote da empresa.
  Empresas removidas/inativas exigem reatribuição ou remoção dos seus itens.
- `showOnceValue` começa ligado e tem fallback ligado para propostas antigas.
  Desligá-lo não muda dinheiro nem validação de preços: remove somente os campos
  projetados e suprime totais contratuais que incluam o valor único oculto.
  Com ambos os componentes ocultos, nenhum total contratual é mostrado.
  Sem valores visíveis, tabela e consolidado são omitidos; condições textuais
  permanecem. A semântica anterior de mensalidade e total contratual é preservada.

## Cobertura adicionada

Nome com fantasia/fallback/PF/grupo, caracteres inválidos e limite de comprimento;
quatro categorias, múltiplos itens, edição/remoção, parâmetros opcionais e validação;
bindings canônicos, PF, empresas inválidas e grupos com/sem assessoria;
combinações financeiras com preservação de preços e bloqueio de totais derivados;
renderização pelo editor, título/restauração e PDF longo inspecionado em A4.

## Arquivos de implementação e documentação

- `src/v2/domain/proposal.ts`
- `src/v2/domain/custom-item.ts` (novo)
- `src/v2/utils/proposal-file-name.ts` (novo)
- `src/v2/index.ts`
- `src/v2/ui/draft.ts`
- `src/v2/ui/editor.ts`
- `src/v2/validation/proposal.ts`
- `src/v2/validation/parameters.ts`
- `src/v2/composer/investment.ts`
- `src/v2/renderer/document.ts`
- `src/v2/fixtures/proposals.ts`
- `tests/v2-editor.test.mjs`
- `scripts/test-v2-custom.mjs` (novo)
- `scripts/test-v2-all.mjs`
- `V2-ARCHITECTURE.md`
- `V2-CATALOG.md`
- `V2-UI.md`
- `V2-DEVELOPER-GUIDE.md`
- `artifacts/v2-suite/results.json`
- `artifacts/v2-custom/{results.json,verification.md,TM0141 - Empresa Teste.pdf}` (novos)

`v2.html` não precisou de alteração: já carrega o editor atualizado.
