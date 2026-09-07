# V2 Quality Lab e regressão

Sistema visual e decisão pontual de repetição de cabeçalhos:
[V2-EDITORIAL.md](V2-EDITORIAL.md). A regressão editorial compara os três modos,
confere textos integrais e SVGs locais, exige cabeçalhos nas tabelas fragmentadas
e reabre os exemplos autônomos com a rede desligada.

Auditoria pré-persistência: ver [V2-AUDIT.md](V2-AUDIT.md). A suíte agora inclui
quatro testes AST de arquitetura/segurança e `test-v2-workflows.mjs`, com assessoria
em grupo, público do treinamento, visitas individuais, valores, texto literal,
rajada de digitação mobile e aviso de saída. A paginação também testa descarte
de solicitações superadas. Não há conexão de banco.

## Executar

Da raiz do repositório:

```sh
npm run test:v2 --prefix gerador
npm run dev:v2:quality --prefix gerador
```

O laboratório fica em `/gerador-de-proposta/v2-quality-lab.html` no servidor Vite
de desenvolvimento. Não é entrada do build; o módulo também exige `import.meta.env.DEV`.
A suíte verifica ausência do HTML e código do Lab na distribuição e na resposta
do servidor de preview. Um servidor com fallback SPA pode responder com a página
padrão, mas não disponibiliza o laboratório. A V1 não depende destas fixtures.

Pré-requisitos: Node.js compatível com Vite 5, dependências instaladas na raiz e
em `gerador`, e Chromium do Playwright (`npx playwright install chromium` na raiz).
Playwright vem do pacote raiz; TypeScript, Vite, Paged.js e fontes vêm de `gerador`.
As suítes antigas usam portas 5186/5187; devem estar livres. O Lab de regressão
usa porta efêmera. Todos os servidores de teste são encerrados ao terminar.

## Fixtures e fontes

`src/v2/fixtures/regression.ts` é o registro único do Lab e dos testes: treinamento
simples, brigada, psicossocial, PGR + PCMSO + LTCAT, kit completo, medição pontual,
assessoria simples, assessoria robusta, grupo empresarial e muitos serviços.
Reutiliza catálogo, presets e configuração de assessoria existentes. Há data,
identificação e valores determinísticos. O cenário extenso contém pelo menos 15 itens.

Cada fixture referencia uma proposta HTML real do repositório. Os testes verificam
que as fontes existem; o conteúdo técnico mantém sua proveniência no catálogo.
São referências de organização/escopo, não reprodução integral ou aprovação técnica.
Valores e quantitativos de ensaio não devem ser enviados como orçamento real.

## Cobertura funcional

| Superfície | Verificação automatizada |
| --- | --- |
| Schema semântico | Dez propostas válidas; campos obrigatórios; valores ausentes/inválidos; empresa única/grupo; enumerações; identidade e vínculos |
| Composer | Determinismo, imutabilidade, ordem, deduplicação exata com aplicabilidade, textos divergentes, summary/standard/full, compact/standard/consultive |
| Comercial | Valor único e mensal, centavos exatos, inclusão, total contratual e agregado desligados, valores por empresa, retorno das flags ao estado inicial |
| Exportação | Cliente, escopo, investimento e participantes obrigatórios bloqueiam; avisos não bloqueiam; nova preparação antes da impressão |
| Layout | Overflow horizontal/vertical, contêiner cortado, tabela larga, fragmentação atômica, página vazia/invisível, rodapé invadido, texto ausente; página pouco ocupada gera aviso |
| Navegador | Dez fixtures do Lab, quatro cenários anteriores, 14 exemplos autônomos, fluxos do editor desktop/mobile, logo/fontes e contagem de páginas no PDF |
| Regressão visual estrutural | Texto/ordem, geometria, estilos, imagens e quantidade de páginas comparados a referências versionadas; repaginação estável |
| Produção | Typecheck/build e ausência do Lab na distribuição; entradas V1/V2 presentes |

A validação é semântica de `Proposal` tipada, não um parser de JSON arbitrário.
O editor faz a adaptação de rascunhos incompletos. A cobertura acima é uma matriz
funcional, não um percentual de linhas/branches instrumentado. Testes não substituem
revisão técnica normativa nem homologação manual de toda a V1.

## Erros e avisos

Erros obrigatórios impedem a composição/exportação: cliente sem nome, escopo vazio,
preço obrigatório ausente e treinamento sem participantes, além das demais regras
numéricas e de integridade. Ausência de endereço ou responsáveis e medição sem
observação são avisos. Revisão técnica pendente continua sendo aviso explícito.
O editor não exige mais responsáveis nos rótulos e exibe as mensagens reais na revisão.

O paginador só libera PDF com ao menos uma página e nenhum diagnóstico de erro.
Testes introduzem deliberadamente defeitos de layout e verificam a política comum.
No Lab e no editor real, overflow introduzido antes do clique impede `window.print()`.
Impressão direta pelo navegador fora do botão não é controlável pela aplicação.

## Referências estáveis

```sh
npm run test:v2:regression --prefix gerador
npm run test:v2:update-baselines --prefix gerador
```

Execução normal nunca atualiza `tests/baselines/v2`. Referência ausente ou diferença
faz o teste falhar. A atualização é explícita e só grava depois de todas as fixtures
e verificações passarem. Mudanças de referências devem ser revisadas junto das
capturas e alterações de conteúdo. Os testes também provam que o comparador rejeita
mudanças de texto, cor, posição e número de páginas.

Ambiente registrado em `tests/baselines/v2/environment.json`: Chromium, sistema,
viewport 1440x1000, DPR 1; fontes locais aguardadas antes de medir. Geometria relativa
à área A4 tem tolerância de 1px. Texto normalizado usa hash SHA-256 truncado; estilo
e identidade dos elementos são exatos. Imagens comparam caminho e dimensões naturais.
O schema 2 inclui os SVGs inline: paths, geometria e estilos. A inspeção também
confere bounding boxes não vazias, currentColor e ausência de referências externas.
Não há diff pixel a pixel: mudanças de rasterização, pixels de uma imagem substituída
com mesmo nome/tamanho e estilos não capturados exigem inspeção das PNGs. Mudança de
browser/SO/fontes pode exigir regeneração justificada, nunca tolerância automática maior.

Cada página possui PNG e cada fixture possui PDF e geometria atual em
`artifacts/v2-regression/<fixture>`. Capturas A4 removem temporariamente a rolagem
interna do Lab para evitar que screenshots de páginas altas capturem a página errada.
As capturas desktop/mobile preservam a interface normal.

## Relatórios

`artifacts/v2-audit/workflows.json` registra o ensaio combinado da equipe e tempo
dos handlers de digitação; esse tempo não inclui a paginação nem é um SLA.
`artifacts/v2-suite/results.json` registra cada etapa, duração, código de saída e
falha. O comando completo continua as etapas independentes após falhas e termina
com código diferente de zero se qualquer uma falhar. Não atualiza referências,
não omite falhas e não transforma testes quebrados em testes ignorados.
`artifacts/v2-regression/results.json` registra resultado por fixture;
`layout-diagnostics.json` registra os defeitos induzidos e a decisão de exportação.
Outras evidências permanecem em `artifacts/v2-{pagination,editor,quality}` e
os 14 HTMLs autônomos em `examples/quality`.