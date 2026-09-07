# Auditoria de prontidão - Gerador V2

Data: 07/09/2026. Escopo: pré-persistência, equipe EngMarq, editor e documentos V2.
Nenhum banco, credencial, autenticação simulada ou integração Supabase foi criado.

## Parecer

**Apta para teste controlado da equipe com dados fictícios, em ambiente local.**
Não considerar esta fase uma implantação empresarial definitiva. Aprovação técnica
do catálogo, atualização do toolchain vulnerável, operação de dados e política de
acesso ainda precisam de decisão. O botão pronto atesta dados/layout, não aprovação
normativa, comercial ou autorização de acesso.

## Achados e tratamento

| Prioridade | Achado | Tratamento |
| --- | --- | --- |
| Alta | Público/perfil do treinamento se perdia ao materializar assessoria | Corrigido em `domain/assistance.ts` e `configurator/assistance.ts`; teste unitário e fluxo real comprovam preservação |
| Alta | Fila podia acumular paginações obsoletas; trabalho síncrono em cada tecla | Invalidação, descarte por revisão, cache de validação e debounce; testes concorrentes e rajadas no editor |
| Alta | Dependências instaladas tinham seis alertas npm, cinco altos | Atualizadas sete resoluções compatíveis; quatro alertas removidos; restam Vite/esbuild de desenvolvimento |
| Média | Erros finais do rascunho eram substituídos por mensagem genérica | Preservadas causa e etapa; teste de quantidade de turmas |
| Média | Condições de pagamento compostas só por espaços eram aceitas pela API | Validação semântica corrigida e regressão adicionada |
| Média | Saída da aba descartava rascunho sem aviso | `beforeunload` e guia explícito; sem promessa de recuperação |
| Baixa | Contato/responsável ausente produzia rótulo sem conteúdo | Contato vazio omitido; responsável explicitado como não informado no aceite |
| Baixa | CSS de contêiner removido e buscas repetidas em trechos compartilhados | CSS sem efeito removido e nomes indexados; referências visuais preservadas |
| Média | Arquitetura misturava funções atuais e etapas antigas ainda marcadas futuras | Especificação consolidada e guias operacionais criados |
| Baixa | Editor TypeScript apontava depreciação de baseUrl | Removido baseUrl com aliases explícitos equivalentes; typecheck completo aprovado |

O primeiro ensaio novo de assessoria/grupo falhou por seletor de teste incorreto
(`Calor` versus `Calor / IBUTG`). O seletor foi corrigido e o mesmo ensaio foi
reexecutado; nenhum teste foi ignorado para ocultar falha.

## Checklist auditado

| Área | Evidência e limite |
| --- | --- |
| V1 | Sem diff nos fontes funcionais verificados: main, auth, lib, config, templates, generators, types, entradas principal/assessoria e supabase. Build preserva entradas. Não houve homologação manual completa da V1 |
| Arquitetura | Núcleo modular, 27 entradas de catálogo, blocos semânticos; teste AST sem ciclos runtime, import V1/Supabase ou módulos executáveis órfãos |
| UX | Quatro etapas, presets, parâmetros, erros por etapa, preview desktop/mobile, grupo e assessoria em ensaios reais |
| Conteúdo | Standard comercialmente detalhado, full mais extenso, deduplicação com aplicabilidade; revisão normativa permanece pendente |
| Documentos | Dez regressões A4 de 2 a 21 páginas, capa, tabelas, header/footer, preços e assinaturas; inspeção visual por amostragem, não revisão humana de todas as páginas |
| PDF | Mesmo DOM paginado, assets aguardados, contagem de páginas, ausência de erros de layout nas fixtures; impressão direta fora do botão não controlável |
| Comercial | Único, mensal, ambos, parcelas, vigência, global oculto e valores individuais; ensaio verifica consolidado opcional e medição separada |
| Qualidade | TypeScript estrito; sem any explícito/logs de depuração no código V2 auditado; console.error de falha real mantido; contratos públicos históricos preservados |
| Performance | Sem composição por tecla, cache por revisão, fila serial com descarte; 60 eventos testados em mobile de grupo abaixo de 500 ms no ambiente local |
| Segurança | DOM textual, teste de HTML literal sem execução, nenhuma requisição externa no fluxo combinado; não é pentest nem varredura total de segredos do repositório |
| Documentação | Arquitetura/migração atualizadas, guias de usuário e desenvolvedor criados |

## Dependências e risco residual

Antes: npm audit reportou 6 dependências vulneráveis, 5 altas e 1 moderada.
Foi executado `npm update --prefix gerador nanoid postcss rollup ws`, sem `--force`,
sem alterar a versão principal do Vite nem a versão direta do cliente Supabase V1.
Resoluções verificadas: nanoid 3.3.18, postcss 8.5.28, rollup 4.63.1 e ws 8.21.3.
As resoluções estão registradas em `package-lock.json`; TypeScript instalado é 5.9.3.
O build passou após a atualização. Houve aviso EPERM de limpeza de binário antigo
do Rollup em uso no Windows, sem falha de instalação/compilação.

Depois: **2 alertas de desenvolvimento, 1 alto e 1 moderado**, em Vite 5.4.21 e
esbuild 0.21.5. Incluem problemas de acesso a arquivos/servidor dev e caminhos no
Windows. O npm propõe atualização principal do Vite; ela exige uma migração
de infraestrutura com verificação V1/V2 e não foi feita incidentalmente.

`npm audit --prefix gerador --omit=dev --json`: **zero alertas de produção** na
árvore instalada. Isso não prova ausência de vulnerabilidades desconhecidas.
O audit completo permanece com saída não zero por esses dois alertas; não faz
parte do resultado verde dos testes funcionais e não está sendo considerado aprovado.
Não foi auditado o toolchain independente do site da raiz como parte desta V2.

Não expor Vite dev à rede ou usá-lo como servidor de produção. Mesmo localhost
não elimina todos os riscos descritos pelos advisories: usar ambiente confiável,
sem navegação não confiável durante o ensaio, e priorizar atualização do toolchain.
Uma distribuição estática não executa Vite, mas não implementa proteção de acesso.

## O que ainda falta

- Homologação editorial/normativa dos serviços e das condições locais de treinamento/medição.
- Persistência, histórico, versões recuperáveis, importação/exportação editável e recuperação após falha.
- Projeto explícito de autorização/autenticação/RLS quando a persistência for autorizada.
- Atualização principal do Vite/esbuild e homologação das entradas V1 afetadas pelo toolchain.
- UI para excluir serviço de apenas um CNPJ e alterar vigência/parcelas por empresa; o domínio já suporta configurações mais amplas que a tela.
- Sete modelos especializados V1 ainda não migrados, detalhados em `V2-MIGRATION.md`.
- Homologação de browsers além do Chromium e de dispositivos de baixo desempenho.

## Bugs conhecidos e limitações

Nenhum defeito funcional bloqueante permaneceu reproduzido nos cenários cobertos
após as correções. Isso não equivale a ausência de bugs fora da cobertura.

Rascunho é volátil; recarga/fechamento perde dados, mesmo após gerar PDF. Não há
salvamento automático, e aviso de saída pode não aparecer em encerramento forçado.
Não há autenticação V2. Endereço/responsável ausente é warning por política, não
validação cadastral. CNPJ/CEP têm conferência de formato, não consulta oficial.
Texto livre pode contradizer parâmetros. Períodos de serviços como eSocial/suporte
não acompanham automaticamente a vigência comercial. Sem aceite, sua seção de
responsável/assinaturas não é impressa. Parcelas não geram cronograma financeiro.

Paged.js usa thread principal e não tem garantia para volume ilimitado. Uma linha
de tabela maior que A4 deve bloquear em vez de ser cortada. Baselines comparam
estrutura/geometria/estilos, não todos os pixels; inspeção visual continua necessária.
Build ainda avisa sobre script legado de orçamento sem módulo e chunk Paged.js
acima de 500 kB. O script legado `lint` não foi homologado como gate ESLint V2.

## Verificação e acesso

Execução final em 07/09/2026: **nove etapas aprovadas**, 76 testes unitários/AST
passando, zero falhas e zero testes ignorados. Typecheck e build aprovados;
nenhum diagnóstico do editor no pacote gerador. Todas as referências visuais
existentes passaram sem regeneração. O ensaio combinado produziu PDF de nove
páginas e não observou requisições externas nem erros de JavaScript.
Os avisos npm de desenvolvimento descritos acima permanecem abertos, separados
do resultado funcional. `git diff --check` não encontrou erros de whitespace;
avisos de conversão LF/CRLF do ambiente Windows não alteraram o resultado.

Comando integral: `npm run test:v2 --prefix gerador`. Resultado executivo em
`artifacts/v2-suite/results.json`; ensaio da equipe e tempo de handlers em
`artifacts/v2-audit/workflows.json`. A suíte inclui 76 testes unitários/arquitetura,
quatro cenários de paginação, editor, assessoria/grupo, 14 exemplos, dez regressões,
typecheck, build e isolamento de produção. Baselines existentes são comparados,
não atualizados para acomodar a auditoria.

Rota da equipe: `/gerador-de-proposta/v2.html`.
Lab dev: `/gerador-de-proposta/v2-quality-lab.html`.

```sh
npm run dev:v2 --prefix gerador -- --host 127.0.0.1
npm run type-check --prefix gerador
npm run test:v2 --prefix gerador
npm run build --prefix gerador
```

Servidor usa porta 5174 por padrão; se ocupada, observe a URL emitida pelo Vite.
Instalação e procedimentos estão em `V2-DEVELOPER-GUIDE.md`. O piloto deve usar
dados fictícios e revisão da equipe. Próximo projeto: persistência/Supabase,
somente após decisão explícita; nenhuma conexão foi antecipada nesta auditoria.