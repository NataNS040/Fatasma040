`editor.ts` / `editor.css` implementam o formulário em quatro etapas de `gerador/v2.html`.
`draft.ts` mantém o rascunho tipado e o converte em Proposal validada, sem DOM ou persistência.
`preview.ts` continua como laboratório de fixtures em `gerador/v2-preview.html`.
O editor e o laboratório reutilizam o mesmo DocumentPaginator.
Nenhuma rota, menu, sessão ou tela V1 é conectada à V2.
