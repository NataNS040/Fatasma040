# Assessoria e grupos nativos

`domain/assistance.ts` define a configuração comum. Cada empresa pode sobrescrever
seleções, parâmetros, visitas, treinamentos, medições e condições comerciais em
`companies[].assistanceConfig`. O configurador não possui template próprio.

Fluxo: `createAssistanceProposal` → Proposal canônica →
`resolveAssistanceProposal` → itens individuais → validação/composer → documento.
Não se misturam configurações canônicas com itens/linhas já materializados.
O resolver não altera a entrada. Listas são substituídas, parâmetros são mesclados
por chave; `selected: false` desativa explicitamente a seleção herdada.

Programas: PGR, PCMSO, LTCAT, LIP, AET. Gestão: psicossocial, eSocial, ART,
suporte técnico. Medições: ruído, calor, vibração, químicos e poeiras.
Treinamentos: os dez itens do catálogo, com quantidade de participantes,
modalidade, frequência, turmas, ocorrências, carga horária e observação próprias.
Não há duração normativa ou inclusão presumida.

Visitas têm inclusão, frequência, duração, quantidade total no contrato e notas.
Medições têm quantidade, unidade, método, agente, grupos e `pricingMode`:
`included` ou `separate-quote`. Uma medição em orçamento separado aparece em
bloco próprio; não se apresenta como entrega incluída na assessoria.

`isGroup` e `groupName` identificam grupos; `companies[]` mantém razão social,
nome fantasia, CNPJ/endereço opcionais, colaboradores, funções e configurações.
Escopo comum se expande por empresa, preservando entregas e preços individuais.

## Exemplo executável

```ts
import { tm137GroupProposal } from './src/v2/fixtures/assistance';
import { composeProposal } from './src/v2';

const proposal = tm137GroupProposal();
proposal.companies[0].assistanceConfig!.trainings!.nr01!.participants = 23;
proposal.companies[0].assistanceConfig!.trainings!.brigade!.participants = 10;
proposal.commercial.showMonthlyValue = true;
proposal.commercial.showContractTotal = false;
proposal.commercial.showAggregateTotal = false;
proposal.commercial.showPerCompanyPricing = true;
const result = composeProposal(proposal);
// result.document.blocks: cover → companies → scope → technical-section[]
// → shared-technical → investment { companyRows: [...], sem totals } → acceptance
```

`fixtures/assistance.ts` tem dois cenários fictícios, sem CNPJs/contatos reais:
TM136 (empresa única, mensalidade por 12 meses e calor em orçamento separado)
e TM137 (cinco empresas, participantes NR01/NR06 23/22/17/8/9 e brigada
10/10/10/8/9). Valores são demonstrativos, não reprodução das propostas reais.
Os JSONs de entrada e resumos de saída estão em `examples/v2-assistance-*` e
`examples/v2-group-*`, gerados pelo script `scripts/v2-example.mjs`.

## Valores e visibilidade

`pricing.onceCents`, `monthlyCents`, `termMonths`, `installmentCount` e
`paymentTerms` são independentes; condições por empresa substituem as comuns.
Valores são centavos inteiros seguros. Parcelas não multiplicam o valor informado.

- `showMonthlyValue`: apresenta mensalidade.
- `showContractTotal`: permite calcular/apresentar valor único + mensalidade × vigência.
- `showAggregateTotal`: permite calcular/apresentar agregado entre empresas.
- `showPerCompanyPricing`: permite apresentar preços individuais.

Com agregado desativado, `investment.totals` nem existe; nenhuma soma global é
executada. Com valor contratual desativado, não há multiplicação pela vigência.
O bloco comercial só carrega os campos autorizados e não copia `commercial.lines`
para as condições. Texto livre ainda precisa de revisão: flags não reescrevem
uma cláusula em que alguém tenha digitado valores manualmente.

`ProposalDocument.compositionVersion` passa a **3**. A Proposal continua versão 2;
snapshots anteriores sem configuração seguem aceitos. Campos antigos de visitas
continuam aceitos quando não se usa o novo plano estruturado.

Arquivos adicionados nesta etapa: `domain/assistance.ts`,
`configurator/assistance.ts`, `composer/investment.ts`, `fixtures/assistance.ts`.
Ampliados: tipos Proposal/Document, compositor técnico/principal, validação,
exports, fixtures e testes V2. Os 33 testes unitários incluem os dois cenários,
sobrescritas por empresa, valores ocultos e overflow aritmético somente quando
o cálculo correspondente está habilitado.
