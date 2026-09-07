# Guia da equipe - Gerador V2

## Antes de começar

Use `/gerador-de-proposta/v2.html` no endereço local informado pela equipe técnica.
O motor verificado é Chromium; prefira Chrome ou Edge atualizados e confira o
PDF final. Não abra o HTML diretamente pelo explorador de arquivos.

**O rascunho não é salvo.** Existe apenas nesta aba. Recarregar, fechar a aba ou
encerrar o navegador perde os dados. Há aviso ao sair de um rascunho alterado,
mas não é backup. Não há lista de propostas, histórico, login V2 ou Supabase.
O PDF não pode ser reimportado para continuar a edição.

Nesta fase, use dados fictícios para homologação. Não envie documento comercial
sem revisão de conteúdo, quantitativos, condições e responsabilidade técnica.
Não use o Quality Lab para proposta real: ele contém fixtures de teste.

## Criar proposta

1. Em **Cliente**, escolha Empresa única e preencha razão social, número da proposta e data.
2. Informe nome fantasia, CNPJ, endereço, cidade, UF, CEP, colaboradores e funções quando disponíveis. Em Funções, use uma por linha.
3. Preencha responsável do cliente e responsável EngMarq. A ausência é aviso, mas o documento real deve identificar quem o revisou.
4. Em **Escopo**, selecione um preset ou marque serviços individualmente.
5. Complete os parâmetros dos serviços selecionados.
6. Em **Comercial**, preencha investimento e condições.
7. Em **Revisão**, confira pendências e todas as páginas antes de gerar PDF.

Revisite etapas pelos botões superiores. Alterar dados bloqueia PDF e esmaece o
documento anterior. Após pausa na digitação, o preview atualiza. No celular,
use **Ver preview** e **Voltar ao formulário**.

## Usar preset

Os atalhos PGR, PCMSO, Kit SST, Combo completo, Psicossocial, Brigada e Assessoria
adicionam serviços. **Outros presets** oferece as demais combinações. Presets não
preenchem preço, participantes, amostras ou cargas horárias obrigatórias.

Outro preset acrescenta seleções sem apagar as anteriores. Desmarcar um serviço
remove também suas personalizações por empresa. O primeiro preset pode sugerir
modo, detalhamento e capa; escolhas posteriores são preservadas. Presets de
assessoria ativam cobrança mensal e sugerem parcelas conforme a vigência atual:
confira Comercial após aplicá-los.

**Kit SST** inclui PGR, PCMSO e LTCAT. **Combo completo**, no atalho principal,
inclui também LIP e ART, mas não psicossocial. O preset de nome explícito
**Kit SST + LIP + Psicossocial + ART** inclui psicossocial. Confira os serviços
marcados, não só o nome do atalho. LI e LIP têm escopos diferentes.

## Criar assessoria

1. Aplique um preset de assessoria ou use **Ativar assessoria em SST**.
2. Marque somente os programas, laudos, gestão, treinamentos e medições contratados.
3. Ative **Incluir visitas** apenas quando houver visitas contratadas.
4. Informe quantidade total de visitas na vigência, duração por visita e frequência. Doze visitas mensais em doze meses significam quantidade total 12, não 1.
5. Em medição adicional, escolha **Orçamento separado**. Ela fica fora do escopo incluído e não aumenta automaticamente o preço.
6. Confira mensalidade, vigência, parcelas e execução em Comercial.

Assessoria não promete automaticamente todo o catálogo. O preset integrado inclui
programas, LIP, ART, eSocial e suporte; desmarque o não contratado. Períodos textuais
de eSocial/suporte são editáveis no serviço e não mudam automaticamente com a
vigência comercial. Compatibilize-os. Renovação/reajuste padrão exigem revisão;
não há editor completo de cláusulas contratuais nesta interface.

## Criar grupo

1. Em Cliente, selecione **Grupo empresarial**, informe nome e pelo menos duas empresas.
2. Use **Adicionar empresa** para outras unidades; grupo deve manter ao menos duas.
3. Em Escopo, a seleção principal é comum às empresas.
4. Abra **Configurações por empresa** e marque **Personalizar** para alterar participantes, parâmetros, observações ou visitas de uma unidade.
5. Em Comercial, informe o valor de cada empresa. Desligue total agregado e valor total do contrato quando não deve haver global.

Remover uma personalização restaura a herança comum. Ao alternar para Empresa única,
apenas a primeira participa do documento; as demais continuam no rascunho para
eventual retorno ao grupo. A UI personaliza parâmetros, mas não oferece exclusão
de um serviço para apenas um CNPJ nem vigências/parcelas distintas por CNPJ.
Esses casos existem no modelo técnico, mas precisam de evolução da interface
ou propostas separadas.

## Editar treinamento

Marque a capacitação e informe participantes, turmas, horas por turma, ocorrências,
modalidade, frequência, público/perfil e observações. Personalize por empresa
quando necessário. O público é preservado também em assessoria.

Turmas não podem exceder participantes. Frequência única exige uma ocorrência.
Carga horária, modalidade, perfil inicial/reciclagem, prática e pré-requisitos
precisam de confirmação técnica: o gerador não certifica adequação normativa.
Certificado não substitui habilitação, aptidão ou autorização do empregador.

## Configurar comercial

| Campo | Significado |
| --- | --- |
| Valor único | Investimento total único por empresa, não valor por participante |
| Mensalidade | Investimento mensal por empresa |
| Valor único + mensalidade | Duas cobranças independentes no mesmo contrato |
| Parcelas | Quantidade exibida; não calcula boletos, vencimentos ou valor por parcela |
| Vigência | Duração em meses; usada na projeção contratual quando habilitada |
| Validade | Prazo da proposta em dias |
| Pagamento/execução | Condições textuais que exigem revisão |

Digite `1500,00` ou `1500.00`, sem separador de milhar. Valores negativos, mais
de duas casas decimais ou obrigatórios vazios impedem gerar. Zero é aceito quando
deliberado; confira para não enviar investimento zerado por engano.

**Exibir mensalidade** controla o valor mensal. **Exibir valor total do contrato**
mostra valor único mais mensalidade vezes vigência. **Exibir total agregado**
permite o consolidado; **Exibir valores por empresa** permite preços individuais.
Desligar todas as exibições pode deixar a proposta sem preço visível: confirme a
intenção. As opções não eliminam os valores do rascunho.

## Escolher apresentação

**Modo do documento**: Compacto reúne resumos e entregas em uma seção; Padrão
organiza essa apresentação comercial por famílias, sem todas as subseções técnicas.
Consultivo acrescenta planejamento e conteúdo técnico conforme a quantidade de
serviços: um permite maior detalhe, dois/três usam seleção intermediária e quatro
ou mais ficam resumidos por serviço, salvo assessoria ou nível Completo explícito.
Abra **Texto e apresentação do documento** para título, objetivo, premissas,
exclusões, detalhamento, capa e aceite.

Detalhamento Padrão é a recomendação usual; Completo amplia etapas/inclusões nos
modos Padrão e Consultivo. Compacto permanece comercial. Resumido reduz conteúdo
por escolha explícita. Notas, parâmetros e condições essenciais continuam visíveis;
modo não altera preços/quantidades. O catálogo técnico completo não é apagado.
Sem aceite, as assinaturas e a identificação do responsável dessa seção não são
impressas; mantenha a opção para documentos que exigem aceite/responsabilidade.

## Interpretar warnings

**Erro** impede PDF: cliente sem nome, escopo vazio, investimento ausente,
treinamento incompleto, turmas inconsistentes ou conteúdo fora da página.
Na Revisão, a mensagem de dados permite ir à etapa correspondente.

**Aviso (warning)** permite preparar PDF, mas exige análise: endereço/responsável
ausente, medição sem observação e revisão técnica pendente. Botão habilitado não
significa aprovação da engenharia. Página intermediária pouco ocupada pode pedir
conferência; capa e página final de assinaturas podem ter espaço livre.

Para erro de layout, veja a página indicada, textos longos e linhas de tabelas.
Corrija excesso desnecessário ou peça apoio. Não apague escopo obrigatório apenas
para caber e não use Ctrl+P para contornar bloqueios.

## Gerar PDF

1. Aguarde **Pronto para gerar** e confira todas as páginas, valores e assinaturas.
2. Clique **Gerar PDF**. Dados, fontes, imagens e layout são verificados novamente.
3. Escolha Salvar como PDF, papel A4, escala 100%, fundos habilitados e cabeçalhos/rodapés do navegador desabilitados.
4. Confira contagem de páginas, nomes, preços, conteúdo e rodapé no PDF final.
5. Encaminhe para revisão responsável antes do envio ao cliente.

Cancelar o diálogo não apaga o rascunho. Na falha de preparação, o PDF permanece
bloqueado: revise pendências e use **Conferir documento** para tentar novamente.
Ao reportar problema, informe preset, empresa/grupo, ação, página, navegador e
captura sem dados sensíveis.