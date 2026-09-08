# Correção de apresentação — Gerador EngMarq V2

## Documento

A capa usa `page: cover` e `@page cover { size: A4; margin: 0 }`, com fundo azul, detalhe laranja, logo e dados existentes. Cabeçalho, rodapé e contador ficam desativados apenas nessa página. Os elementos correntes são inseridos após a capa para evitar uma página inicial vazia no Paged.js. As margens internas permanecem em 19 mm no topo, 16 mm nas laterais e 20 mm na base. A impressão preserva as cores.

O aceite começa em nova página, com declaração, local/data e dois blocos de assinatura. Há 30 mm livres para assinatura manual. Autor e cargo vêm de `metadata.author`; razão social e contato vêm dos dados existentes. Nome/cargo ausentes recebem linhas para preenchimento. O aceite não tem altura fixa nem recorte por overflow.

Em grupos, o domínio atual possui um contato compartilhado e não possui indicação de aceite individual por empresa. O bloco CONTRATANTE representa o grupo e lista as empresas abrangidas, sem inventar responsáveis. Uma futura indicação explícita de aceite individual precisará ser modelada antes de gerar assinaturas individuais.

Referências estruturais: páginas “Termo de Aceite e Assinaturas” de `propostas/setembro-2026/TM0139-Pinheiros-Pneus-Assessoria-SST.html` e `propostas/agosto-2026/TM0137-Grupo Bertis.html`. A proposta antiga de grupo também usa um único bloco de contratante.

Na preparação do preview mobile, o contêiner temporário permanece invisível na posição normal, em vez de deslocado 10.000 px para a esquerda. O deslocamento negativo interferia na geometria do Paged.js com páginas nomeadas e fragmentava linhas da tabela de empresas ao trocar presets. A aparência e o fluxo do editor foram preservados.

## Comercial

Conta: **Equipe Comercial**, `comercial@engmarqsolution.com`, cargo **comercial**.

Ferramentas permitidas no painel:

- Gerador V2 e preview;
- Gerador Universal, Assessoria SST e Modelos Prontos/V1;
- Contratos e Orçamentos, já integrantes dos documentos comerciais;
- Calculadora de Precificação.

Recibos, Encaminhamento de Exame e painel de Segurança ficam bloqueados. Seções sem cards são removidas e os contadores são recalculados. Admin continua vendo os nove cards. Os acessos anteriores de vendedor, financeiro e segurança foram preservados.

`public/access-policy.js` centraliza permissões e proteção das páginas legadas. O painel usa a mesma política após sincronizar a sessão Supabase. Recibos e Encaminhamento também executam a proteção ao abrir diretamente a URL; as duas URLs de Encaminhamento usam o mesmo HTML protegido. O script público é copiado para o build pelo Vite.

Este controle usa o mecanismo de sessão atual do projeto. O fallback guarda uma sessão Base64 editável no navegador e credenciais no frontend; não constitui uma barreira de autorização no servidor contra adulteração deliberada. Dados de backend precisam continuar protegidos no servidor/RLS. Esta correção não implementa banco nem substitui a autenticação existente.

## Credencial de apresentação

Neste checkout não há `.env` do Supabase. O fallback comercial foi adicionado em `src/auth/usuarios.ts`, na entrada com e-mail `comercial@engmarqsolution.com`. A senha temporária aleatória de 32 caracteres pode ser recuperada no campo `senha` dessa entrada; não está neste documento nem nos artefatos de teste. As credenciais anteriores não foram alteradas. Há TODO explícito para remover a credencial hardcoded quando Supabase assumir a autenticação.

Se a hospedagem fornecer `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`, o login usa Supabase e não tenta o fallback após uma falha. Nesse caso, criar a conta pelo painel administrativo do Supabase Auth, definir uma senha forte e configurar `user_metadata.nome = "Equipe Comercial"` e, preferencialmente, `app_metadata.role = "comercial"` por administração confiável. Também são reconhecidos `app_metadata.cargo` e o legado `user_metadata.cargo`. Não foi criada conta por código frontend, e a configuração da hospedagem não foi inspecionada.

## Evidências

Os quatro cenários de paginação foram executados antes e depois:

| Fixture | Antes | Depois |
|---|---:|---:|
| Curta | 3 | 4 |
| Média | 6 | 6 |
| Assessoria | 19 | 20 |
| Grupo | 12 | 13 |

`artifacts/presentation-before.json` registra a execução anterior. `artifacts/v2-pagination/results.json` e os PDFs/screenshots nas subpastas registram a versão corrigida.

`artifacts/presentation-internal-comparison.json` compara as 12 referências de regressão anteriores com as novas: nenhum elemento do miolo mudou de conteúdo, estilo, geometria ou página. As referências visuais foram atualizadas para a capa e o aceite. Alguns cenários possuem aviso de página pouco preenchida imediatamente antes do aceite obrigatório; não são páginas vazias.

Os resultados da suíte completa ficam em `artifacts/v2-suite/results.json`; autenticação e URLs diretas em `artifacts/commercial-access/results.json`.

Resultado final: **11 etapas aprovadas** em `npm run test:v2 --prefix gerador`: 83 testes unitários, quatro cenários de paginação, aceite, autenticação/permissões, editor desktop/mobile, auditoria de uso, 14 exemplos de qualidade, 12 fixtures de regressão, TypeScript, build e isolamento de produção. A proteção Comercial também foi verificada no build produzido. `npm run type-check --prefix gerador` e `npm run build --prefix gerador` foram executados separadamente e passaram. Preview e PDF mantiveram a mesma quantidade de páginas; não houve página vazia, overflow, perda de conteúdo nem assinatura fragmentada nos casos aprovados.

## Limitações para a apresentação

- A configuração de autenticação da hospedagem não foi verificada: usar a conta fallback apenas quando Supabase não estiver configurado, ou criar a conta no Supabase conforme indicado acima.
- A proteção de URL usa a sessão frontend existente; a limitação de adulteração deliberada do fallback permanece.
- Alguns documentos têm uma página pouco preenchida antes do aceite. Os testes distinguem esse aviso de página vazia, overflow e sobreposição do rodapé.
- O build mantém avisos preexistentes de tamanho de bundle e do script legado `orcamento.js`: ele existe na fonte, mas não é incluído em `dist` pelo HTML atual sem `type="module"`. O acesso ao card de Orçamentos foi preservado por fazer parte do fluxo comercial existente; seu funcionamento na hospedagem tem essa limitação anterior. A V2 não depende desse script. Não foram alterados preços nem o gerador legado de orçamento nesta correção.
- Uma execução encontrou erro de sistema de arquivos ao sobrescrever `artifacts/v2-regression/training/mode-consultive.png`; o registro dessa execução foi preservado em `artifacts/presentation-suite-first-results.json` e a suíte foi repetida.
