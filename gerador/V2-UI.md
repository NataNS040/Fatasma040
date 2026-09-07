# Interface do Gerador V2

Para fixtures representativas, bloqueios de exportação e regressão automatizada,
consulte [V2-QUALITY.md](V2-QUALITY.md). O Quality Lab é exclusivo de desenvolvimento.
Responsáveis e endereço ausentes geram avisos; os campos técnicos e comerciais
obrigatórios continuam bloqueando o PDF.

O escopo agora oferece **Modo do documento** (Compacto, Padrão e Consultivo) e
**Outros presets**, alimentados pelo registro V2. Os sete atalhos anteriores
permanecem. Detalhamento, capa e aceite continuam editáveis separadamente.
Ver [V2-MIGRATION.md](V2-MIGRATION.md) para critérios e limitações dos presets.

## Abrir

Da raiz do repositório, execute `npm run dev:v2 --prefix gerador`.
O navegador abre `http://localhost:5174/gerador-de-proposta/v2.html`.
Na distribuição compilada, a entrada é `dist/v2.html`, servida pelo Vite/servidor
sob a base configurada. Não abrir diretamente pelo protocolo `file://`.

## Fluxo de uso

1. **Cliente:** escolha empresa única ou grupo. Cadastre empresas, endereço,
   colaboradores, funções, contato, responsável EngMarq e identificação da proposta.
   No grupo, adicione/remova unidades. Alternar para empresa única preserva as demais
   empresas no rascunho, mas elas não participam do documento enquanto o grupo estiver desativado.
2. **Escopo:** clique em PGR, PCMSO, Kit SST, Combo completo, Psicossocial, Brigada
   ou Assessoria. Atalhos adicionam seleções e preservam configurações existentes.
   Ative/desative serviços livremente. Os parâmetros aparecem quando o serviço é
   selecionado. Defina participantes, turmas, carga horária, frequência, quantidades,
   unidades, observações e medições incluídas ou em orçamento separado.
   Para grupos, abra a empresa em **Configurações por empresa** e personalize o
   serviço ou as visitas. Desativar a personalização restaura a herança do escopo comum.
3. **Comercial:** escolha valor único, mensalidade ou ambos. Preencha o preço de
   cada empresa em reais (`1500,00` ou `1500.00`, sem separador de milhar), parcelas,
   vigência, validade e condições. Use as quatro opções explícitas de visibilidade.
   Quantidades e parcelas não multiplicam automaticamente os valores informados.
4. **Revisão:** confira Cliente, Escopo, Comercial e Layout, as pendências e todas
   as páginas. Clique **Gerar PDF**; o documento será novamente preparado e validado.
   No diálogo do navegador, escolha Salvar como PDF, A4, escala 100%, fundos
   habilitados e cabeçalhos/rodapés do navegador desativados.

No desktop, formulário e documento ficam lado a lado com rolagens independentes.
No celular, **Ver preview** / **Voltar ao formulário** alternam as duas vistas.
Não há animações de transição nem persistência remota.

O editor invalida o PDF na primeira alteração, prepara após pausa de 550 ms e
reutiliza validação por revisão. Solicitações de paginação superadas são descartadas.
Há aviso ao sair de um rascunho alterado, mas ele não salva nem recupera dados.
Procedimentos e limites de uso em [V2-USER-GUIDE.md](V2-USER-GUIDE.md).

## Estado e responsabilidades

- `ui/draft.ts`: rascunho tipado incompleto, presets de seleção, validação amigável,
  valores em centavos exatos e adaptação para Proposal. Serviços avulsos e combos
  usam itens de catálogo; assessoria usa o configurador nativo existente.
- `ui/editor.ts`: componentes de formulário, navegação, campos condicionais,
  debounce de 550 ms, estado de preparação e impressão.
- `ui/editor.css`: layout responsivo, identidade EngMarq, foco visível, tabelas A4
  em preview e ocultação da interface na impressão.
- `v2-preview.html`: preserva o laboratório de quatro fixtures e seus testes.

Não foi adicionado framework. Todos os textos do usuário são nós DOM seguros.
Rascunhos vivem somente na memória da aba: recarregar/fechar a página descarta
os dados. Não há localStorage, banco, Supabase, login ou dependência da V1 na UI.

O documento anterior fica esmaecido enquanto os dados estão incompletos ou uma
nova composição está pendente. Alterações desabilitam imediatamente a exportação.
Resultados antigos não liberam o botão se o rascunho já mudou. A escala visual
é aplicada **depois** da paginação; medição e verificação ocorrem em escala 100%.
Os presets não escolhem HTML, layout ou páginas exclusivos.

Campos opcionais vazios são omitidos antes de chamar o catálogo. Pendências de
parâmetros usam nomes comerciais e limites, sem stack traces/códigos internos.
A checagem de CNPJ e CEP é de formato, não consulta cadastral ou validação jurídica.
Avisos de revisão editorial técnica continuam visíveis antes do envio comercial.

## Testes e evidências

```sh
node --test gerador/tests/v2.test.mjs gerador/tests/v2-editor.test.mjs
node gerador/scripts/test-v2-editor.mjs
node gerador/scripts/test-v2-pagination.mjs
npm run type-check --prefix gerador
npm run build --prefix gerador
```

As capturas em `artifacts/v2-editor/` mostram cliente, escopo em grupo,
comercial com preview, revisão desktop e as duas vistas mobile. O teste também
gera `grupo-interface.pdf` e `results.json`. Os dados são fictícios.

Cobertura: empresa única, grupo com adição/remoção de unidades, alteração após
preview, participantes 23/22 por empresa, mensalidades distintas sem agregado,
exportação após preparo, quantidade de páginas do PDF, layout mobile sem overflow
horizontal e ausência de erros JavaScript. Testes unitários verificam rascunhos
incompletos, presets editáveis, dinheiro, assessoria mensal e visitas individuais.
A suíte anterior de paginação permanece intacta, usando a entrada de laboratório.

## Arquivos desta etapa

Criados: `src/v2/ui/{draft,editor}.ts`, `src/v2/ui/editor.css`, `v2-preview.html`,
`tests/v2-editor.test.mjs`, `scripts/test-v2-editor.mjs`, este documento e artefatos.
Alterados: `v2.html`, `vite.config.ts` (entrada do laboratório), `package.json`
(atalho de desenvolvimento), `scripts/load-v2.mjs`, `scripts/test-v2-pagination.mjs`
(URL do laboratório), README da UI e documentos de arquitetura/paginação.
As regras do documento A4 foram preservadas; a interface define seus próprios
estilos de títulos e campos com seletores específicos.

Limites atuais: não há recuperação de rascunho ao fechar a aba, consulta de CNPJ/CEP,
edição do texto técnico completo do catálogo, upload de arquivos ou aprovação
editorial persistida. A homologação automatizada usa Chromium; outros navegadores
e impressoras seguem a limitação documentada no motor de paginação.
