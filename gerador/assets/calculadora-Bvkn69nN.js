import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                       */const N=.4,u=.6;let e={};function a(t){return isNaN(t)||t===null||t===void 0?"R$ 0,00":t.toLocaleString("pt-BR",{style:"currency",currency:"BRL",minimumFractionDigits:2,maximumFractionDigits:2})}function f(t){return isNaN(t)||t===null||t===void 0?"0%":t.toFixed(2).replace(".",",")+"%"}function s(t){if(!t)return 0;let r=t.toString().replace(/[R$\s]/g,"").replace(/\./g,"").replace(",",".");return parseFloat(r)||0}function P(t){if(!t)return 0;let r=t.toString().replace(",",".");return parseFloat(r)||0}function b(t){t&&t.addEventListener("input",function(r){let o=r.target.value.replace(/\D/g,"");if(o===""){r.target.value="",V();return}o=parseInt(o),o=(o/100).toFixed(2);let l=o.split("."),L=l[0].replace(/\B(?=(\d{3})+(?!\d))/g,"."),d=l[1];r.target.value=`R$ ${L},${d}`,V()})}function w(){var y,p,c,E,M,m,D,B,T,O,v,x;const t=P(((y=e.horasTecnico)==null?void 0:y.value)||0),r=s(((p=e.valorHoraTecnico)==null?void 0:p.value)||0),o=P(((c=e.horasEngenheiro)==null?void 0:c.value)||0),l=s(((E=e.valorHoraEngenheiro)==null?void 0:E.value)||0),L=P(((M=e.qtdVisitas)==null?void 0:M.value)||0),d=s(((m=e.valorVisita)==null?void 0:m.value)||0),C=s(((D=e.valorPGR)==null?void 0:D.value)||0),n=s(((B=e.valorPCMSO)==null?void 0:B.value)||0),I=s(((T=e.valorLTCAT)==null?void 0:T.value)||0),g=s(((O=e.valorGestaoNR01)==null?void 0:O.value)||0),h=s(((v=e.valorTreinamentos)==null?void 0:v.value)||0),$=s(((x=e.valorAcompanhamento)==null?void 0:x.value)||0);return t*r+o*l+L*d+C+n+I+g+h+$}function S(){var d,C,n,I,g;const t=s(((d=e.valorDeslocamento)==null?void 0:d.value)||0),r=s(((C=e.valorAlimentacao)==null?void 0:C.value)||0),o=s(((n=e.valorMateriais)==null?void 0:n.value)||0),l=s(((I=e.valorTaxas)==null?void 0:I.value)||0),L=s(((g=e.valorOutros)==null?void 0:g.value)||0);return t+r+o+l+L}function H(t){var o;const r=P(((o=e.comissaoPercent)==null?void 0:o.value)||0);return t*(r/100)}function V(){var D,B,T,O;const t=w(),r=S(),o=t+r,l=P(((D=e.issPercent)==null?void 0:D.value)||0),L=P(((B=e.impostosPercent)==null?void 0:B.value)||0),d=(l+L)/100,C=N-d;let n=C>0?o/C:o/N;const I=n*d,g=n-o-I,h=n>0?g/n*100:0;let $=d<1?o/(1-d):o;const y=H(n);e.resultCustoTotal&&(e.resultCustoTotal.textContent=a(o)),e.resultPrecoIdeal&&(e.resultPrecoIdeal.textContent=a(n)),e.resultLucro&&(e.resultLucro.textContent=a(g)),e.resultMargem&&(e.resultMargem.textContent=f(h)),e.resultPrecoMinimo&&(e.resultPrecoMinimo.textContent=a($)),e.resultComissao&&(e.resultComissao.textContent=a(y));const p=P(((T=e.descontoPercent)==null?void 0:T.value)||0);let c=n,E=g,M=h;if(p>0){c=n*(1-p/100);const v=c*d;E=c-o-v,M=c>0?E/c*100:0,e.cardDescontoResultados&&e.cardDescontoResultados.classList.remove("hidden"),e.descontoLabel&&(e.descontoLabel.textContent=p)}else e.cardDescontoResultados&&e.cardDescontoResultados.classList.add("hidden");e.resultPrecoDesconto&&(e.resultPrecoDesconto.textContent=a(c)),e.resultNovoLucro&&(e.resultNovoLucro.textContent=a(E)),e.resultNovaMargem&&(e.resultNovaMargem.textContent=f(M)),o>0?(h<u*100?(e.alertMargemPrincipal&&e.alertMargemPrincipal.classList.remove("hidden"),e.alertMargemPrincipalOk&&e.alertMargemPrincipalOk.classList.add("hidden")):(e.alertMargemPrincipal&&e.alertMargemPrincipal.classList.add("hidden"),e.alertMargemPrincipalOk&&e.alertMargemPrincipalOk.classList.remove("hidden")),p>0&&(M<u*100?(e.alertMargem&&e.alertMargem.classList.remove("hidden"),e.alertMargemOk&&e.alertMargemOk.classList.add("hidden")):(e.alertMargem&&e.alertMargem.classList.add("hidden"),e.alertMargemOk&&e.alertMargemOk.classList.remove("hidden")))):(e.alertMargemPrincipal&&e.alertMargemPrincipal.classList.add("hidden"),e.alertMargemPrincipalOk&&e.alertMargemPrincipalOk.classList.add("hidden"),e.alertMargem&&e.alertMargem.classList.add("hidden"),e.alertMargemOk&&e.alertMargemOk.classList.add("hidden"));const m=s(((O=e.valorVendedor)==null?void 0:O.value)||0);if(m>0&&o>0){const v=m-n,x=m*d,k=m-o-x,R=m>0?k/m*100:0;if(e.cardVendedorResultados&&e.cardVendedorResultados.classList.remove("hidden"),e.resultPrecoVendedor&&(e.resultPrecoVendedor.textContent=a(m)),e.resultDiferencaIdeal){e.resultDiferencaIdeal.textContent=a(v);const i=document.getElementById("itemDiferenca");i&&(i.classList.remove("success","warning"),i.classList.add(v>=0?"success":"warning"))}if(e.resultLucroVendedor){e.resultLucroVendedor.textContent=a(k);const i=document.getElementById("itemLucroVendedor");i&&(i.classList.remove("success","warning"),i.classList.add(k>=0?"success":"warning"))}if(e.resultMargemVendedor){e.resultMargemVendedor.textContent=f(R);const i=document.getElementById("itemMargemVendedor");i&&(i.classList.remove("success","warning"),i.classList.add(R>=u*100?"success":"warning"))}R>=u*100?(e.alertVendedorOk&&e.alertVendedorOk.classList.remove("hidden"),e.alertVendedorDanger&&e.alertVendedorDanger.classList.add("hidden")):(e.alertVendedorOk&&e.alertVendedorOk.classList.add("hidden"),e.alertVendedorDanger&&e.alertVendedorDanger.classList.remove("hidden")),e.diferencaIdeal&&(e.diferencaIdeal.textContent=a(v),e.diferencaIdeal.classList.remove("positivo","negativo"),e.diferencaIdeal.classList.add(v>=0?"positivo":"negativo")),e.margemVendedor&&(e.margemVendedor.textContent=f(R),e.margemVendedor.classList.remove("positivo","negativo"),e.margemVendedor.classList.add(R>=u*100?"positivo":"negativo")),R>=u*100?(e.statusVendedor&&e.statusVendedor.classList.remove("hidden"),e.statusVendedorDanger&&e.statusVendedorDanger.classList.add("hidden")):(e.statusVendedor&&e.statusVendedor.classList.add("hidden"),e.statusVendedorDanger&&e.statusVendedorDanger.classList.remove("hidden"))}else e.cardVendedorResultados&&e.cardVendedorResultados.classList.add("hidden"),e.diferencaIdeal&&(e.diferencaIdeal.textContent="R$ 0,00",e.diferencaIdeal.classList.remove("positivo","negativo")),e.margemVendedor&&(e.margemVendedor.textContent="0%",e.margemVendedor.classList.remove("positivo","negativo")),e.statusVendedor&&e.statusVendedor.classList.add("hidden"),e.statusVendedorDanger&&e.statusVendedorDanger.classList.add("hidden");return{custoTecnico:t,custoOperacional:r,custoTotal:o,precoIdeal:n,lucro:g,margem:h,precoMinimo:$,comissao:y,impostos:I,precoComDesconto:c,lucroComDesconto:E,margemComDesconto:M,descontoPercent:p}}function G(){const t=V(),o=`
        <div class="resume-section">
            <h4><i class="fas fa-calendar"></i> Data</h4>
            <div class="resume-row">
                <span>Data de geração</span>
                <span>${new Date().toLocaleDateString("pt-BR")}</span>
            </div>
        </div>
        
        <div class="resume-section">
            <h4><i class="fas fa-calculator"></i> Custos</h4>
            <div class="resume-row">
                <span>Custos Técnicos</span>
                <span>${a(t.custoTecnico)}</span>
            </div>
            <div class="resume-row">
                <span>Custos Operacionais</span>
                <span>${a(t.custoOperacional)}</span>
            </div>
            <div class="resume-row">
                <span>Impostos</span>
                <span>${a(t.impostos)}</span>
            </div>
            <div class="resume-row total">
                <span><strong>CUSTO TOTAL</strong></span>
                <span>${a(t.custoTotal)}</span>
            </div>
        </div>
        
        <div class="resume-section">
            <h4><i class="fas fa-tags"></i> Precificação</h4>
            <div class="resume-row highlight">
                <span>Preço Ideal (40% custo / 60% lucro)</span>
                <span>${a(t.precoIdeal)}</span>
            </div>
            <div class="resume-row">
                <span>Lucro Bruto</span>
                <span>${a(t.lucro)}</span>
            </div>
            <div class="resume-row">
                <span>Margem de Lucro</span>
                <span>${f(t.margem)}</span>
            </div>
            <div class="resume-row">
                <span>Preço Mínimo (sem lucro)</span>
                <span>${a(t.precoMinimo)}</span>
            </div>
            <div class="resume-row">
                <span>Comissão do Vendedor</span>
                <span>${a(t.comissao)}</span>
            </div>
        </div>
        
        ${t.descontoPercent>0?`
        <div class="resume-section">
            <h4><i class="fas fa-percent"></i> Com Desconto de ${t.descontoPercent}%</h4>
            <div class="resume-row ${t.margemComDesconto<u*100?"warning":"highlight"}">
                <span>Preço com Desconto</span>
                <span>${a(t.precoComDesconto)}</span>
            </div>
            <div class="resume-row">
                <span>Novo Lucro</span>
                <span>${a(t.lucroComDesconto)}</span>
            </div>
            <div class="resume-row ${t.margemComDesconto<u*100?"warning":""}">
                <span>Nova Margem</span>
                <span>${f(t.margemComDesconto)}</span>
            </div>
            ${t.margemComDesconto<u*100?`
            <div style="background: #fff5f5; color: #e53e3e; padding: 12px; border-radius: 8px; text-align: center; margin-top: 12px;">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>ATENÇÃO: Margem abaixo do padrão EngMarq (60%)</strong>
            </div>
            `:""}
        </div>
        `:""}
    `;e.modalContent&&(e.modalContent.innerHTML=o),e.modalResumo&&e.modalResumo.classList.remove("hidden")}function F(){const t=V();let o=`📋 RESUMO DE PRECIFICAÇÃO ENGMARQ
Data: ${new Date().toLocaleDateString("pt-BR")}

💰 CUSTOS
• Custos Técnicos: ${a(t.custoTecnico)}
• Custos Operacionais: ${a(t.custoOperacional)}
• Impostos: ${a(t.impostos)}
• CUSTO TOTAL: ${a(t.custoTotal)}

🏷️ PRECIFICAÇÃO
• Preço Ideal: ${a(t.precoIdeal)}
• Lucro Bruto: ${a(t.lucro)}
• Margem: ${f(t.margem)}
• Preço Mínimo: ${a(t.precoMinimo)}
• Comissão: ${a(t.comissao)}`;t.descontoPercent>0&&(o+=`

📊 COM DESCONTO DE ${t.descontoPercent}%
• Preço c/ Desconto: ${a(t.precoComDesconto)}
• Novo Lucro: ${a(t.lucroComDesconto)}
• Nova Margem: ${f(t.margemComDesconto)}
${t.margemComDesconto<u*100?"⚠️ ATENÇÃO: Margem abaixo do padrão EngMarq (60%)":""}`),navigator.clipboard.writeText(o.trim()).then(()=>{if(e.btnCopiar){const l=e.btnCopiar.innerHTML;e.btnCopiar.innerHTML='<i class="fas fa-check"></i> Copiado!',setTimeout(()=>{e.btnCopiar.innerHTML=l},2e3)}})}function q(){window.print()}function U(){document.querySelectorAll("input").forEach(r=>{r.value=""}),e.resultCustoTotal&&(e.resultCustoTotal.textContent="R$ 0,00"),e.resultPrecoIdeal&&(e.resultPrecoIdeal.textContent="R$ 0,00"),e.resultLucro&&(e.resultLucro.textContent="R$ 0,00"),e.resultMargem&&(e.resultMargem.textContent="0%"),e.resultPrecoMinimo&&(e.resultPrecoMinimo.textContent="R$ 0,00"),e.resultComissao&&(e.resultComissao.textContent="R$ 0,00"),e.resultPrecoDesconto&&(e.resultPrecoDesconto.textContent="R$ 0,00"),e.resultNovoLucro&&(e.resultNovoLucro.textContent="R$ 0,00"),e.resultNovaMargem&&(e.resultNovaMargem.textContent="0%"),e.cardDescontoResultados&&e.cardDescontoResultados.classList.add("hidden"),e.alertMargemPrincipal&&e.alertMargemPrincipal.classList.add("hidden"),e.alertMargemPrincipalOk&&e.alertMargemPrincipalOk.classList.add("hidden"),e.alertMargem&&e.alertMargem.classList.add("hidden"),e.alertMargemOk&&e.alertMargemOk.classList.add("hidden"),e.diferencaIdeal&&(e.diferencaIdeal.textContent="R$ 0,00",e.diferencaIdeal.classList.remove("positivo","negativo")),e.margemVendedor&&(e.margemVendedor.textContent="0%",e.margemVendedor.classList.remove("positivo","negativo")),e.statusVendedor&&e.statusVendedor.classList.add("hidden"),e.statusVendedorDanger&&e.statusVendedorDanger.classList.add("hidden"),e.cardVendedorResultados&&e.cardVendedorResultados.classList.add("hidden"),e.alertVendedorOk&&e.alertVendedorOk.classList.add("hidden"),e.alertVendedorDanger&&e.alertVendedorDanger.classList.add("hidden"),A()}function _(){e={horasTecnico:document.getElementById("horasTecnico"),valorHoraTecnico:document.getElementById("valorHoraTecnico"),horasEngenheiro:document.getElementById("horasEngenheiro"),valorHoraEngenheiro:document.getElementById("valorHoraEngenheiro"),qtdVisitas:document.getElementById("qtdVisitas"),valorVisita:document.getElementById("valorVisita"),valorPGR:document.getElementById("valorPGR"),valorPCMSO:document.getElementById("valorPCMSO"),valorLTCAT:document.getElementById("valorLTCAT"),valorGestaoNR01:document.getElementById("valorGestaoNR01"),valorTreinamentos:document.getElementById("valorTreinamentos"),valorAcompanhamento:document.getElementById("valorAcompanhamento"),valorDeslocamento:document.getElementById("valorDeslocamento"),valorAlimentacao:document.getElementById("valorAlimentacao"),valorMateriais:document.getElementById("valorMateriais"),valorTaxas:document.getElementById("valorTaxas"),valorOutros:document.getElementById("valorOutros"),issPercent:document.getElementById("issPercent"),impostosPercent:document.getElementById("impostosPercent"),comissaoPercent:document.getElementById("comissaoPercent"),descontoPercent:document.getElementById("descontoPercent"),resultCustoTotal:document.getElementById("resultCustoTotal"),resultPrecoIdeal:document.getElementById("resultPrecoIdeal"),resultLucro:document.getElementById("resultLucro"),resultMargem:document.getElementById("resultMargem"),resultPrecoMinimo:document.getElementById("resultPrecoMinimo"),resultComissao:document.getElementById("resultComissao"),resultPrecoDesconto:document.getElementById("resultPrecoDesconto"),resultNovaMargem:document.getElementById("resultNovaMargem"),resultNovoLucro:document.getElementById("resultNovoLucro"),cardDescontoResultados:document.getElementById("cardDescontoResultados"),descontoLabel:document.getElementById("descontoLabel"),alertMargemPrincipal:document.getElementById("alertMargemPrincipal"),alertMargemPrincipalOk:document.getElementById("alertMargemPrincipalOk"),alertMargem:document.getElementById("alertMargem"),alertMargemOk:document.getElementById("alertMargemOk"),valorVendedor:document.getElementById("valorVendedor"),diferencaIdeal:document.getElementById("diferencaIdeal"),margemVendedor:document.getElementById("margemVendedor"),statusVendedor:document.getElementById("statusVendedor"),statusVendedorDanger:document.getElementById("statusVendedorDanger"),cardVendedorResultados:document.getElementById("cardVendedorResultados"),resultPrecoVendedor:document.getElementById("resultPrecoVendedor"),resultDiferencaIdeal:document.getElementById("resultDiferencaIdeal"),resultLucroVendedor:document.getElementById("resultLucroVendedor"),resultMargemVendedor:document.getElementById("resultMargemVendedor"),alertVendedorOk:document.getElementById("alertVendedorOk"),alertVendedorDanger:document.getElementById("alertVendedorDanger"),btnLimpar:document.getElementById("btnLimpar"),btnGerarResumo:document.getElementById("btnGerarResumo"),modalResumo:document.getElementById("modalResumo"),modalClose:document.getElementById("modalClose"),modalContent:document.getElementById("modalContent"),btnCopiar:document.getElementById("btnCopiar"),btnImprimir:document.getElementById("btnImprimir")},["valorHoraTecnico","valorHoraEngenheiro","valorVisita","valorPGR","valorPCMSO","valorLTCAT","valorGestaoNR01","valorTreinamentos","valorAcompanhamento","valorDeslocamento","valorAlimentacao","valorMateriais","valorTaxas","valorOutros"].forEach(o=>{b(document.getElementById(o))}),b(document.getElementById("valorVendedor")),document.querySelectorAll("input").forEach(o=>{o.addEventListener("input",V),o.addEventListener("change",V)}),e.btnLimpar&&e.btnLimpar.addEventListener("click",U),e.btnGerarResumo&&e.btnGerarResumo.addEventListener("click",G),e.modalClose&&e.modalClose.addEventListener("click",()=>{e.modalResumo&&e.modalResumo.classList.add("hidden")}),e.modalResumo&&e.modalResumo.addEventListener("click",o=>{o.target===e.modalResumo&&e.modalResumo.classList.add("hidden")}),e.btnCopiar&&e.btnCopiar.addEventListener("click",F),e.btnImprimir&&e.btnImprimir.addEventListener("click",q),document.addEventListener("keydown",o=>{o.key==="Escape"&&e.modalResumo&&!e.modalResumo.classList.contains("hidden")&&e.modalResumo.classList.add("hidden")}),A()}function A(){e.valorHoraTecnico&&(e.valorHoraTecnico.value="R$ 50,00"),e.valorHoraEngenheiro&&(e.valorHoraEngenheiro.value="R$ 70,00"),e.valorPGR&&(e.valorPGR.value="R$ 500,00"),e.valorPCMSO&&(e.valorPCMSO.value="R$ 500,00"),e.valorLTCAT&&(e.valorLTCAT.value="R$ 500,00"),e.comissaoPercent&&(e.comissaoPercent.value="8"),e.impostosPercent&&(e.impostosPercent.value="6"),V()}document.addEventListener("DOMContentLoaded",_);
