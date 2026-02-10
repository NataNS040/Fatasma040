import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                       */import{o as q,r as j}from"./usuarios-8b5f6MA8.js";import{v as A,f as k,p as T,a as g,l as S}from"./logoengmarq-Ddl6KjhT.js";function M(e){const r=A(e.valor);return`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Recibo ${e.numero} - EngMarq Solution</title>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
            <style>
                :root {
                    --primary-color: #1a365d;
                    --accent-color: #667eea;
                    --fire-color: #dd6b20;
                    --gray-color: #6b7280;
                    --dark-color: #1f2937;
                    --light-color: #f8fafc;
                    --font-primary: 'Montserrat', sans-serif;
                    --font-secondary: 'Open Sans', sans-serif;
                }
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: var(--font-secondary);
                    background: #f1f5f9;
                    color: var(--dark-color);
                    line-height: 1.6;
                }
                
                .page {
                    width: 210mm;
                    min-height: 297mm;
                    margin: 20px auto;
                    background: white;
                    padding: 25mm 20mm;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    position: relative;
                }
                
                @media print {
                    body {
                        background: white;
                    }
                    .page {
                        margin: 0;
                        box-shadow: none;
                        page-break-after: always;
                    }
                    .no-print {
                        display: none !important;
                    }
                }
                
                /* Header */
                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 20px;
                    border-bottom: 3px solid var(--primary-color);
                    margin-bottom: 30px;
                }
                
                .page-header-logo {
                    height: 80px;
                }
                
                .page-header-info {
                    text-align: right;
                    font-size: 11px;
                    color: var(--gray-color);
                }
                
                .page-header-info strong {
                    color: var(--primary-color);
                    font-size: 13px;
                }
                
                /* Título */
                .recibo-title {
                    text-align: center;
                    margin: 40px 0;
                }
                
                .recibo-title h1 {
                    font-family: var(--font-primary);
                    font-size: 32px;
                    font-weight: 800;
                    color: var(--primary-color);
                    text-transform: uppercase;
                    letter-spacing: 8px;
                    margin-bottom: 10px;
                }
                
                .recibo-numero {
                    font-size: 14px;
                    color: var(--gray-color);
                    font-weight: 500;
                }
                
                /* Seções */
                .section {
                    margin-bottom: 30px;
                }
                
                .section-title {
                    font-family: var(--font-primary);
                    font-size: 14px;
                    font-weight: 700;
                    color: var(--primary-color);
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-bottom: 15px;
                    padding-bottom: 8px;
                    border-bottom: 2px solid var(--accent-color);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .section-title i {
                    color: var(--accent-color);
                }
                
                /* Grid de dados */
                .data-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                }
                
                .data-item {
                    background: var(--light-color);
                    padding: 15px 20px;
                    border-radius: 8px;
                    border-left: 4px solid var(--accent-color);
                }
                
                .data-item.full {
                    grid-column: 1 / -1;
                }
                
                .data-label {
                    font-size: 11px;
                    color: var(--gray-color);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 5px;
                }
                
                .data-value {
                    font-size: 15px;
                    font-weight: 600;
                    color: var(--dark-color);
                }
                
                /* Tabela de Valores */
                .valor-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 25px 0;
                    border: 2px solid var(--primary-color);
                    border-radius: 8px;
                    overflow: hidden;
                }
                
                .valor-table thead {
                    background: var(--primary-color);
                    color: white;
                }
                
                .valor-table th {
                    padding: 12px 15px;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-weight: 600;
                    text-align: left;
                }
                
                .valor-table th:last-child {
                    text-align: right;
                }
                
                .valor-table tbody td {
                    padding: 15px;
                    font-size: 14px;
                    border-bottom: 1px solid #e2e8f0;
                }
                
                .valor-table tbody td:last-child {
                    text-align: right;
                    font-weight: 600;
                    color: var(--primary-color);
                    font-size: 16px;
                }
                
                .valor-table tfoot {
                    background: var(--light-color);
                    font-weight: 700;
                }
                
                .valor-table tfoot td {
                    padding: 15px;
                    font-size: 15px;
                    color: var(--primary-color);
                }
                
                .valor-table tfoot td:last-child {
                    text-align: right;
                    font-size: 18px;
                }
                
                .valor-extenso-row {
                    font-size: 11px;
                    color: var(--gray-color);
                    font-style: italic;
                    text-align: right;
                    margin-top: -20px;
                    margin-bottom: 20px;
                }
                
                @media print {
                    .valor-table thead {
                        background: var(--primary-color) !important;
                        color: white !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    
                    .valor-table tfoot {
                        background: var(--light-color) !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                }
                
                /* Declaração */
                .declaracao {
                    background: var(--light-color);
                    padding: 25px 30px;
                    border-radius: 10px;
                    margin: 30px 0;
                    border: 1px solid #e2e8f0;
                }
                
                .declaracao p {
                    font-size: 14px;
                    line-height: 1.8;
                    text-align: justify;
                }
                
                .declaracao strong {
                    color: var(--primary-color);
                }
                
                /* Assinaturas */
                .assinaturas {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 60px;
                    margin-top: 60px;
                    padding-top: 30px;
                }
                
                .assinatura-box {
                    text-align: center;
                }
                
                .assinatura-linha {
                    border-top: 2px solid var(--dark-color);
                    padding-top: 10px;
                    margin-top: 60px;
                }
                
                .assinatura-nome {
                    font-weight: 600;
                    font-size: 14px;
                    color: var(--dark-color);
                    margin-bottom: 3px;
                }
                
                .assinatura-cargo {
                    font-size: 12px;
                    color: var(--gray-color);
                }
                
                .assinatura-doc {
                    font-size: 11px;
                    color: var(--gray-color);
                    margin-top: 5px;
                }
                
                /* Local e Data */
                .local-data {
                    text-align: center;
                    margin-top: 50px;
                    font-size: 14px;
                    color: var(--gray-color);
                }
                
                /* Rodapé */
                .page-footer {
                    position: absolute;
                    bottom: 15mm;
                    left: 20mm;
                    right: 20mm;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 15px;
                    border-top: 1px solid #e2e8f0;
                    font-size: 10px;
                    color: var(--gray-color);
                }
                
                .footer-info {
                    display: flex;
                    gap: 15px;
                }
                
                .footer-info span {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                
                .footer-info i {
                    color: var(--accent-color);
                }
            </style>
        </head>
        <body>
            <div class="page">
                <!-- Header -->
                <div class="page-header">
                    <img src="${e.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                    <div class="page-header-info">
                        <strong>ENGMARQ SOLUTION LTDA</strong><br>
                        CNPJ: 60.545.359/0001-76<br>
                        Natal - RN
                    </div>
                </div>
                
                <!-- Título -->
                <div class="recibo-title">
                    <h1><i class="fas fa-file-invoice-dollar"></i> Recibo</h1>
                    <p class="recibo-numero">Nº ${e.numero}</p>
                </div>
                
                <!-- Dados do Vendedor -->
                <div class="section">
                    <h3 class="section-title"><i class="fas fa-user"></i> Dados do Beneficiário</h3>
                    <div class="data-grid">
                        <div class="data-item">
                            <p class="data-label">Nome Completo</p>
                            <p class="data-value">${e.vendedorNome}</p>
                        </div>
                        <div class="data-item">
                            <p class="data-label">CPF</p>
                            <p class="data-value">${e.vendedorCpf}</p>
                        </div>
                    </div>
                </div>
                
                <!-- Dados do Recebimento -->
                <div class="section">
                    <h3 class="section-title"><i class="fas fa-calendar-check"></i> Data do Recebimento</h3>
                    <div class="data-grid">
                        <div class="data-item full">
                            <p class="data-label">Data em que o valor foi recebido</p>
                            <p class="data-value">${e.dataRecebimento}</p>
                        </div>
                    </div>
                </div>
                
                <!-- Valor -->
                <div class="section">
                    <h3 class="section-title"><i class="fas fa-dollar-sign"></i> Discriminação do Valor</h3>
                    <table class="valor-table">
                        <thead>
                            <tr>
                                <th style="width: 60%;">Descrição</th>
                                <th style="width: 40%;">Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>${e.referencia}</strong></td>
                                <td>R$ ${k(e.valor)}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td><i class="fas fa-calculator"></i> VALOR TOTAL RECEBIDO</td>
                                <td>R$ ${k(e.valor)}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <p class="valor-extenso-row">(${r})</p>
                </div>
                
                <!-- Declaração -->
                <div class="declaracao">
                    <p>
                        Eu, <strong>${e.vendedorNome}</strong>, inscrito(a) no CPF sob o nº <strong>${e.vendedorCpf}</strong>, 
                        declaro para os devidos fins que recebi da empresa <strong>ENGMARQ SOLUTION LTDA</strong>, 
                        inscrita no CNPJ sob o nº <strong>60.545.359/0001-76</strong>, a quantia de 
                        <strong>R$ ${k(e.valor)} (${r})</strong>, 
                        referente a <strong>${e.referencia}</strong>, dando plena, geral e irrevogável quitação 
                        do valor acima descrito, nada mais havendo a reclamar a qualquer título.
                    </p>
                </div>
                
                <!-- Local e Data -->
                <div class="local-data">
                    <p>${e.local}, ${e.data}</p>
                </div>
                
                <!-- Assinaturas -->
                <div class="assinaturas">
                    <div class="assinatura-box">
                        <div class="assinatura-linha">
                            <p class="assinatura-nome">${e.vendedorNome}</p>
                            <p class="assinatura-cargo">Beneficiário</p>
                            <p class="assinatura-doc">CPF: ${e.vendedorCpf}</p>
                        </div>
                    </div>
                    <div class="assinatura-box">
                        <div class="assinatura-linha">
                            <p class="assinatura-nome">EngMarq Solution LTDA</p>
                            <p class="assinatura-cargo">Diretor</p>
                            <p class="assinatura-doc">CNPJ: 60.545.359/0001-76</p>
                        </div>
                    </div>
                </div>
                
                <!-- Rodapé -->
                <div class="page-footer">
                    <div class="footer-info">
                        <span><i class="fas fa-envelope"></i> engmarqsolution@gmail.com</span>
                        <span><i class="fas fa-phone"></i> +55 84 99928-5888</span>
                        <span><i class="fab fa-instagram"></i> @engmarq_solution</span>
                    </div>
                    <span>Documento gerado em ${e.data}</span>
                </div>
            </div>
            
            <!-- Botão de Impressão -->
            <div class="no-print" style="text-align: center; padding: 20px;">
                <button onclick="window.print()" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 15px 40px;
                    font-size: 16px;
                    font-weight: 600;
                    border-radius: 8px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                ">
                    <i class="fas fa-print"></i> Imprimir Recibo
                </button>
            </div>
        </body>
        </html>
    `}const O=q();O.logado||(window.location.href="./login.html");function B(){j(),window.location.href="./login.html"}window.fazerLogout=B;if(O.usuario){const e=document.getElementById("userNameText");e&&(e.textContent=O.usuario.nome||"")}function a(e){return document.getElementById(e)}function P(e){const r=e.replace(/\D/g,"");return r.length!==11?e:r.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,"$1.$2.$3-$4")}function f(){var h,w,y,_,$,R,D,z,N;const e=((h=a("numero_recibo"))==null?void 0:h.value)||"REC-001",r=((w=a("vendedor_nome"))==null?void 0:w.value)||"—",p=((y=a("vendedor_cpf"))==null?void 0:y.value)||"—",n=((_=a("valor_recibo"))==null?void 0:_.value)||"0",c=T(n),v=(($=a("referencia_pagamento"))==null?void 0:$.value)||"",l=((R=a("referencia_outro"))==null?void 0:R.value)||"",s=v==="Outro"?l:v,i=((D=a("data_recebimento"))==null?void 0:D.value)||"",t=((z=a("data_emissao"))==null?void 0:z.value)||"",o=((N=a("local"))==null?void 0:N.value)||"Natal - RN",d=a("preview_numero"),C=a("preview_nome"),E=a("preview_cpf"),m=a("preview_valor"),u=a("preview_referencia"),b=a("preview_data_recebimento"),x=a("preview_local_data");d&&(d.textContent=e),C&&(C.textContent=r),E&&(E.textContent=P(p)),m&&(m.textContent=`R$ ${k(c)}`),u&&(u.textContent=s||"—"),b&&(b.textContent=i?g(i):"—"),x&&(x.textContent=`${o}, ${t?g(t):"—"}`)}window.atualizarPreviewRecibo=f;async function F(){var u,b,x,h,w,y,_,$,R;const e=((u=a("numero_recibo"))==null?void 0:u.value)||"REC-001",r=((b=a("data_emissao"))==null?void 0:b.value)||"",p=((x=a("local"))==null?void 0:x.value)||"Natal - RN",n=((h=a("vendedor_nome"))==null?void 0:h.value)||"",c=((w=a("vendedor_cpf"))==null?void 0:w.value)||"",v=((y=a("valor_recibo"))==null?void 0:y.value)||"0",l=T(v),s=((_=a("referencia_pagamento"))==null?void 0:_.value)||"",i=(($=a("referencia_outro"))==null?void 0:$.value)||"",t=s==="Outro"?i:s,o=((R=a("data_recebimento"))==null?void 0:R.value)||"";if(!n.trim()){alert("Por favor, informe o nome do beneficiário.");return}if(!c.trim()){alert("Por favor, informe o CPF do beneficiário.");return}if(l<=0){alert("Por favor, informe um valor válido.");return}if(!t.trim()){alert("Por favor, informe a referência do pagamento.");return}let d=S;try{const z=await(await fetch(S)).blob();d=await new Promise(N=>{const L=new FileReader;L.onloadend=()=>N(L.result),L.readAsDataURL(z)})}catch(D){console.warn("Não foi possível converter a logo para base64, usando caminho direto",D)}const C={numero:e,data:r?g(r):g(new Date().toISOString().split("T")[0]),local:p,vendedorNome:n.trim(),vendedorCpf:P(c),valor:l,referencia:t.trim(),dataRecebimento:o?g(o):g(new Date().toISOString().split("T")[0]),logoUrl:d},E=M(C),m=window.open("","_blank");m&&(m.document.write(E),m.document.close())}window.gerarRecibo=F;document.addEventListener("DOMContentLoaded",()=>{const e=new Date().toISOString().split("T")[0],r=a("data_emissao"),p=a("data_recebimento");r&&(r.value=e),p&&(p.value=e);const n=a("referencia_pagamento"),c=a("referencia_outro_container");n==null||n.addEventListener("change",()=>{c&&(c.style.display=n.value==="Outro"?"block":"none"),f()}),["numero_recibo","vendedor_nome","vendedor_cpf","valor_recibo","referencia_outro","data_recebimento","data_emissao","local"].forEach(i=>{const t=a(i);t==null||t.addEventListener("input",f)});const l=a("vendedor_cpf");l==null||l.addEventListener("input",i=>{const t=i.target;let o=t.value.replace(/\D/g,"");o.length>11&&(o=o.substring(0,11)),o.length>9?o=o.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/,"$1.$2.$3-$4"):o.length>6?o=o.replace(/(\d{3})(\d{3})(\d{0,3})/,"$1.$2.$3"):o.length>3&&(o=o.replace(/(\d{3})(\d{0,3})/,"$1.$2")),t.value=o,f()});const s=a("valor_recibo");s==null||s.addEventListener("input",i=>{const t=i.target;let o=t.value.replace(/\D/g,"");if(o.length>0){const d=parseInt(o)/100;t.value=d.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2})}f()}),f()});
