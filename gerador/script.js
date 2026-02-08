// ===== CALCULADORA DE PRECIFICAÇÃO ENGMARQ =====

// Modelo de precificação EngMarq: 40% CUSTO, 60% LUCRO
const ENGMARQ_CUSTO_PERCENT = 0.40;
const ENGMARQ_LUCRO_PERCENT = 0.60;

// Elementos do DOM (serão carregados no init)
let el = {};

// ===== FORMATAÇÃO DE MOEDA =====
function formatCurrency(value) {
    if (isNaN(value) || value === null || value === undefined) {
        return 'R$ 0,00';
    }
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function formatPercent(value) {
    if (isNaN(value) || value === null || value === undefined) {
        return '0%';
    }
    return value.toFixed(2).replace('.', ',') + '%';
}

function parseCurrency(value) {
    if (!value) return 0;
    let cleaned = value.toString()
        .replace(/[R$\s]/g, '')
        .replace(/\./g, '')
        .replace(',', '.');
    return parseFloat(cleaned) || 0;
}

function parseNumber(value) {
    if (!value) return 0;
    let cleaned = value.toString().replace(',', '.');
    return parseFloat(cleaned) || 0;
}

// ===== MÁSCARA DE MOEDA =====
function applyCurrencyMask(input) {
    if (!input) return;
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value === '') {
            e.target.value = '';
            calcularTudo();
            return;
        }
        
        value = parseInt(value);
        value = (value / 100).toFixed(2);
        
        let parts = value.split('.');
        let intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        let decPart = parts[1];
        
        e.target.value = `R$ ${intPart},${decPart}`;
        calcularTudo();
    });
}

// ===== CÁLCULOS =====
function calcularCustoTecnico() {
    const horasTec = parseNumber(el.horasTecnico?.value || 0);
    const valorHoraTec = parseCurrency(el.valorHoraTecnico?.value || 0);
    const horasEng = parseNumber(el.horasEngenheiro?.value || 0);
    const valorHoraEng = parseCurrency(el.valorHoraEngenheiro?.value || 0);
    const qtdVisitas = parseNumber(el.qtdVisitas?.value || 0);
    const valorVisita = parseCurrency(el.valorVisita?.value || 0);
    const pgr = parseCurrency(el.valorPGR?.value || 0);
    const pcmso = parseCurrency(el.valorPCMSO?.value || 0);
    const ltcat = parseCurrency(el.valorLTCAT?.value || 0);
    const gestaoNr01 = parseCurrency(el.valorGestaoNR01?.value || 0);
    const treinamentos = parseCurrency(el.valorTreinamentos?.value || 0);
    const acompanhamento = parseCurrency(el.valorAcompanhamento?.value || 0);
    
    return (horasTec * valorHoraTec) +
           (horasEng * valorHoraEng) +
           (qtdVisitas * valorVisita) +
           pgr + pcmso + ltcat + gestaoNr01 + treinamentos + acompanhamento;
}

function calcularCustoOperacional() {
    const deslocamento = parseCurrency(el.valorDeslocamento?.value || 0);
    const alimentacao = parseCurrency(el.valorAlimentacao?.value || 0);
    const materiais = parseCurrency(el.valorMateriais?.value || 0);
    const taxas = parseCurrency(el.valorTaxas?.value || 0);
    const outros = parseCurrency(el.valorOutros?.value || 0);
    
    return deslocamento + alimentacao + materiais + taxas + outros;
}

function calcularImpostos(precoBase) {
    const iss = parseNumber(el.issPercent?.value || 0);
    const gerais = parseNumber(el.impostosPercent?.value || 0);
    
    return precoBase * ((iss + gerais) / 100);
}

function calcularComissao(preco) {
    const comissaoPercent = parseNumber(el.comissaoPercent?.value || 0);
    return preco * (comissaoPercent / 100);
}

function calcularTudo() {
    // 1. Calcular custo total (técnico + operacional)
    const custoTecnico = calcularCustoTecnico();
    const custoOperacional = calcularCustoOperacional();
    const custoTotal = custoTecnico + custoOperacional;
    
    // 2. Obter taxa de impostos
    const iss = parseNumber(el.issPercent?.value || 0);
    const gerais = parseNumber(el.impostosPercent?.value || 0);
    const taxaImpostos = (iss + gerais) / 100;
    
    // 3. Calcular preço ideal considerando impostos
    // Para manter 60% de lucro: preço = custo / (0.40 - taxaImpostos)
    const divisor = ENGMARQ_CUSTO_PERCENT - taxaImpostos;
    let precoIdeal = divisor > 0 ? custoTotal / divisor : custoTotal / ENGMARQ_CUSTO_PERCENT;
    
    // 4. Calcular impostos sobre o preço ideal
    const impostos = precoIdeal * taxaImpostos;
    
    // 5. Calcular lucro (preço - custo - impostos)
    const lucro = precoIdeal - custoTotal - impostos;
    
    // 6. Calcular margem real
    const margem = precoIdeal > 0 ? (lucro / precoIdeal) * 100 : 0;
    
    // 7. Calcular preço mínimo (custo + impostos, sem lucro)
    let precoMinimo = taxaImpostos < 1 ? custoTotal / (1 - taxaImpostos) : custoTotal;
    
    // 8. Calcular comissão
    const comissao = calcularComissao(precoIdeal);
    
    // Atualizar resultados principais
    if (el.resultCustoTotal) el.resultCustoTotal.textContent = formatCurrency(custoTotal);
    if (el.resultPrecoIdeal) el.resultPrecoIdeal.textContent = formatCurrency(precoIdeal);
    if (el.resultLucro) el.resultLucro.textContent = formatCurrency(lucro);
    if (el.resultMargem) el.resultMargem.textContent = formatPercent(margem);
    if (el.resultPrecoMinimo) el.resultPrecoMinimo.textContent = formatCurrency(precoMinimo);
    if (el.resultComissao) el.resultComissao.textContent = formatCurrency(comissao);
    
    // Calcular com desconto (APENAS se houver desconto informado)
    const descontoPercent = parseNumber(el.descontoPercent?.value || 0);
    
    let precoComDesconto = precoIdeal;
    let lucroComDesconto = lucro;
    let margemComDesconto = margem;
    
    // Mostrar/esconder card de desconto
    if (descontoPercent > 0) {
        precoComDesconto = precoIdeal * (1 - descontoPercent / 100);
        const impostosDesconto = precoComDesconto * taxaImpostos;
        lucroComDesconto = precoComDesconto - custoTotal - impostosDesconto;
        margemComDesconto = precoComDesconto > 0 ? (lucroComDesconto / precoComDesconto) * 100 : 0;
        
        if (el.cardDescontoResultados) el.cardDescontoResultados.classList.remove('hidden');
        if (el.descontoLabel) el.descontoLabel.textContent = descontoPercent;
    } else {
        if (el.cardDescontoResultados) el.cardDescontoResultados.classList.add('hidden');
    }
    
    if (el.resultPrecoDesconto) el.resultPrecoDesconto.textContent = formatCurrency(precoComDesconto);
    if (el.resultNovoLucro) el.resultNovoLucro.textContent = formatCurrency(lucroComDesconto);
    if (el.resultNovaMargem) el.resultNovaMargem.textContent = formatPercent(margemComDesconto);
    
    // Verificar alertas de margem
    if (custoTotal > 0) {
        // Alerta principal (sem desconto)
        if (margem < ENGMARQ_LUCRO_PERCENT * 100) {
            if (el.alertMargemPrincipal) el.alertMargemPrincipal.classList.remove('hidden');
            if (el.alertMargemPrincipalOk) el.alertMargemPrincipalOk.classList.add('hidden');
        } else {
            if (el.alertMargemPrincipal) el.alertMargemPrincipal.classList.add('hidden');
            if (el.alertMargemPrincipalOk) el.alertMargemPrincipalOk.classList.remove('hidden');
        }
        
        // Alerta na seção de desconto (quando há desconto)
        if (descontoPercent > 0) {
            if (margemComDesconto < ENGMARQ_LUCRO_PERCENT * 100) {
                if (el.alertMargem) el.alertMargem.classList.remove('hidden');
                if (el.alertMargemOk) el.alertMargemOk.classList.add('hidden');
            } else {
                if (el.alertMargem) el.alertMargem.classList.add('hidden');
                if (el.alertMargemOk) el.alertMargemOk.classList.remove('hidden');
            }
        }
    } else {
        // Esconder todos os alertas
        if (el.alertMargemPrincipal) el.alertMargemPrincipal.classList.add('hidden');
        if (el.alertMargemPrincipalOk) el.alertMargemPrincipalOk.classList.add('hidden');
        if (el.alertMargem) el.alertMargem.classList.add('hidden');
        if (el.alertMargemOk) el.alertMargemOk.classList.add('hidden');
    }
    
    // Calcular comparação com valor do vendedor
    const valorVendedor = parseCurrency(el.valorVendedor?.value || 0);
    
    if (valorVendedor > 0 && custoTotal > 0) {
        const diferencaIdeal = valorVendedor - precoIdeal;
        const impostosVendedor = valorVendedor * taxaImpostos;
        const lucroVendedor = valorVendedor - custoTotal - impostosVendedor;
        const margemVendedorCalc = valorVendedor > 0 ? (lucroVendedor / valorVendedor) * 100 : 0;
        
        // Mostrar card de resultados do vendedor
        if (el.cardVendedorResultados) el.cardVendedorResultados.classList.remove('hidden');
        
        // Atualizar elementos nos resultados
        if (el.resultPrecoVendedor) el.resultPrecoVendedor.textContent = formatCurrency(valorVendedor);
        
        if (el.resultDiferencaIdeal) {
            el.resultDiferencaIdeal.textContent = formatCurrency(diferencaIdeal);
            // Adicionar classe para cor
            const itemDif = document.getElementById('itemDiferenca');
            if (itemDif) {
                itemDif.classList.remove('success', 'warning');
                itemDif.classList.add(diferencaIdeal >= 0 ? 'success' : 'warning');
            }
        }
        
        if (el.resultLucroVendedor) {
            el.resultLucroVendedor.textContent = formatCurrency(lucroVendedor);
            const itemLucro = document.getElementById('itemLucroVendedor');
            if (itemLucro) {
                itemLucro.classList.remove('success', 'warning');
                itemLucro.classList.add(lucroVendedor >= 0 ? 'success' : 'warning');
            }
        }
        
        if (el.resultMargemVendedor) {
            el.resultMargemVendedor.textContent = formatPercent(margemVendedorCalc);
            const itemMargem = document.getElementById('itemMargemVendedor');
            if (itemMargem) {
                itemMargem.classList.remove('success', 'warning');
                itemMargem.classList.add(margemVendedorCalc >= ENGMARQ_LUCRO_PERCENT * 100 ? 'success' : 'warning');
            }
        }
        
        // Alertas do vendedor
        if (margemVendedorCalc >= ENGMARQ_LUCRO_PERCENT * 100) {
            if (el.alertVendedorOk) el.alertVendedorOk.classList.remove('hidden');
            if (el.alertVendedorDanger) el.alertVendedorDanger.classList.add('hidden');
        } else {
            if (el.alertVendedorOk) el.alertVendedorOk.classList.add('hidden');
            if (el.alertVendedorDanger) el.alertVendedorDanger.classList.remove('hidden');
        }
        
        // Atualizar também a comparação inline (na seção de input)
        if (el.diferencaIdeal) {
            el.diferencaIdeal.textContent = formatCurrency(diferencaIdeal);
            el.diferencaIdeal.classList.remove('positivo', 'negativo');
            el.diferencaIdeal.classList.add(diferencaIdeal >= 0 ? 'positivo' : 'negativo');
        }
        
        if (el.margemVendedor) {
            el.margemVendedor.textContent = formatPercent(margemVendedorCalc);
            el.margemVendedor.classList.remove('positivo', 'negativo');
            el.margemVendedor.classList.add(margemVendedorCalc >= ENGMARQ_LUCRO_PERCENT * 100 ? 'positivo' : 'negativo');
        }
        
        // Status inline
        if (margemVendedorCalc >= ENGMARQ_LUCRO_PERCENT * 100) {
            if (el.statusVendedor) el.statusVendedor.classList.remove('hidden');
            if (el.statusVendedorDanger) el.statusVendedorDanger.classList.add('hidden');
        } else {
            if (el.statusVendedor) el.statusVendedor.classList.add('hidden');
            if (el.statusVendedorDanger) el.statusVendedorDanger.classList.remove('hidden');
        }
    } else {
        // Esconder card de resultados do vendedor
        if (el.cardVendedorResultados) el.cardVendedorResultados.classList.add('hidden');
        
        // Resetar valores inline
        if (el.diferencaIdeal) {
            el.diferencaIdeal.textContent = 'R$ 0,00';
            el.diferencaIdeal.classList.remove('positivo', 'negativo');
        }
        if (el.margemVendedor) {
            el.margemVendedor.textContent = '0%';
            el.margemVendedor.classList.remove('positivo', 'negativo');
        }
        if (el.statusVendedor) el.statusVendedor.classList.add('hidden');
        if (el.statusVendedorDanger) el.statusVendedorDanger.classList.add('hidden');
    }
    
    return {
        custoTecnico,
        custoOperacional,
        custoTotal,
        precoIdeal,
        lucro,
        margem,
        precoMinimo,
        comissao,
        impostos,
        precoComDesconto,
        lucroComDesconto,
        margemComDesconto,
        descontoPercent
    };
}

// ===== GERAR RESUMO =====
function gerarResumo() {
    const dados = calcularTudo();
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    
    const html = `
        <div class="resume-section">
            <h4><i class="fas fa-calendar"></i> Data</h4>
            <div class="resume-row">
                <span>Data de geração</span>
                <span>${dataAtual}</span>
            </div>
        </div>
        
        <div class="resume-section">
            <h4><i class="fas fa-calculator"></i> Custos</h4>
            <div class="resume-row">
                <span>Custos Técnicos</span>
                <span>${formatCurrency(dados.custoTecnico)}</span>
            </div>
            <div class="resume-row">
                <span>Custos Operacionais</span>
                <span>${formatCurrency(dados.custoOperacional)}</span>
            </div>
            <div class="resume-row">
                <span>Impostos</span>
                <span>${formatCurrency(dados.impostos)}</span>
            </div>
            <div class="resume-row total">
                <span><strong>CUSTO TOTAL</strong></span>
                <span>${formatCurrency(dados.custoTotal)}</span>
            </div>
        </div>
        
        <div class="resume-section">
            <h4><i class="fas fa-tags"></i> Precificação</h4>
            <div class="resume-row highlight">
                <span>Preço Ideal (40% custo / 60% lucro)</span>
                <span>${formatCurrency(dados.precoIdeal)}</span>
            </div>
            <div class="resume-row">
                <span>Lucro Bruto</span>
                <span>${formatCurrency(dados.lucro)}</span>
            </div>
            <div class="resume-row">
                <span>Margem de Lucro</span>
                <span>${formatPercent(dados.margem)}</span>
            </div>
            <div class="resume-row">
                <span>Preço Mínimo (sem lucro)</span>
                <span>${formatCurrency(dados.precoMinimo)}</span>
            </div>
            <div class="resume-row">
                <span>Comissão do Vendedor</span>
                <span>${formatCurrency(dados.comissao)}</span>
            </div>
        </div>
        
        ${dados.descontoPercent > 0 ? `
        <div class="resume-section">
            <h4><i class="fas fa-percent"></i> Com Desconto de ${dados.descontoPercent}%</h4>
            <div class="resume-row ${dados.margemComDesconto < ENGMARQ_LUCRO_PERCENT * 100 ? 'warning' : 'highlight'}">
                <span>Preço com Desconto</span>
                <span>${formatCurrency(dados.precoComDesconto)}</span>
            </div>
            <div class="resume-row">
                <span>Novo Lucro</span>
                <span>${formatCurrency(dados.lucroComDesconto)}</span>
            </div>
            <div class="resume-row ${dados.margemComDesconto < ENGMARQ_LUCRO_PERCENT * 100 ? 'warning' : ''}">
                <span>Nova Margem</span>
                <span>${formatPercent(dados.margemComDesconto)}</span>
            </div>
            ${dados.margemComDesconto < ENGMARQ_LUCRO_PERCENT * 100 ? `
            <div style="background: #fff5f5; color: #e53e3e; padding: 12px; border-radius: 8px; text-align: center; margin-top: 12px;">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>ATENÇÃO: Margem abaixo do padrão EngMarq (60%)</strong>
            </div>
            ` : ''}
        </div>
        ` : ''}
    `;
    
    if (el.modalContent) el.modalContent.innerHTML = html;
    if (el.modalResumo) el.modalResumo.classList.remove('hidden');
}

// ===== COPIAR RESUMO =====
function copiarResumo() {
    const dados = calcularTudo();
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    
    let texto = `📋 RESUMO DE PRECIFICAÇÃO ENGMARQ
Data: ${dataAtual}

💰 CUSTOS
• Custos Técnicos: ${formatCurrency(dados.custoTecnico)}
• Custos Operacionais: ${formatCurrency(dados.custoOperacional)}
• Impostos: ${formatCurrency(dados.impostos)}
• CUSTO TOTAL: ${formatCurrency(dados.custoTotal)}

🏷️ PRECIFICAÇÃO
• Preço Ideal: ${formatCurrency(dados.precoIdeal)}
• Lucro Bruto: ${formatCurrency(dados.lucro)}
• Margem: ${formatPercent(dados.margem)}
• Preço Mínimo: ${formatCurrency(dados.precoMinimo)}
• Comissão: ${formatCurrency(dados.comissao)}`;

    if (dados.descontoPercent > 0) {
        texto += `

📊 COM DESCONTO DE ${dados.descontoPercent}%
• Preço c/ Desconto: ${formatCurrency(dados.precoComDesconto)}
• Novo Lucro: ${formatCurrency(dados.lucroComDesconto)}
• Nova Margem: ${formatPercent(dados.margemComDesconto)}
${dados.margemComDesconto < ENGMARQ_LUCRO_PERCENT * 100 ? '⚠️ ATENÇÃO: Margem abaixo do padrão EngMarq (60%)' : ''}`;
    }
    
    navigator.clipboard.writeText(texto.trim()).then(() => {
        if (el.btnCopiar) {
            const textoOriginal = el.btnCopiar.innerHTML;
            el.btnCopiar.innerHTML = '<i class="fas fa-check"></i> Copiado!';
            setTimeout(() => {
                el.btnCopiar.innerHTML = textoOriginal;
            }, 2000);
        }
    });
}

// ===== IMPRIMIR RESUMO =====
function imprimirResumo() {
    window.print();
}

// ===== LIMPAR FORMULÁRIO =====
function limparFormulario() {
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => {
        input.value = '';
    });
    
    // Resetar resultados
    if (el.resultCustoTotal) el.resultCustoTotal.textContent = 'R$ 0,00';
    if (el.resultPrecoIdeal) el.resultPrecoIdeal.textContent = 'R$ 0,00';
    if (el.resultLucro) el.resultLucro.textContent = 'R$ 0,00';
    if (el.resultMargem) el.resultMargem.textContent = '0%';
    if (el.resultPrecoMinimo) el.resultPrecoMinimo.textContent = 'R$ 0,00';
    if (el.resultComissao) el.resultComissao.textContent = 'R$ 0,00';
    if (el.resultPrecoDesconto) el.resultPrecoDesconto.textContent = 'R$ 0,00';
    if (el.resultNovoLucro) el.resultNovoLucro.textContent = 'R$ 0,00';
    if (el.resultNovaMargem) el.resultNovaMargem.textContent = '0%';
    
    // Esconder card de desconto
    if (el.cardDescontoResultados) el.cardDescontoResultados.classList.add('hidden');
    
    // Esconder todos os alertas
    if (el.alertMargemPrincipal) el.alertMargemPrincipal.classList.add('hidden');
    if (el.alertMargemPrincipalOk) el.alertMargemPrincipalOk.classList.add('hidden');
    if (el.alertMargem) el.alertMargem.classList.add('hidden');
    if (el.alertMargemOk) el.alertMargemOk.classList.add('hidden');
    
    // Resetar comparação vendedor
    if (el.diferencaIdeal) {
        el.diferencaIdeal.textContent = 'R$ 0,00';
        el.diferencaIdeal.classList.remove('positivo', 'negativo');
    }
    if (el.margemVendedor) {
        el.margemVendedor.textContent = '0%';
        el.margemVendedor.classList.remove('positivo', 'negativo');
    }
    if (el.statusVendedor) el.statusVendedor.classList.add('hidden');
    if (el.statusVendedorDanger) el.statusVendedorDanger.classList.add('hidden');
    
    // Esconder card de vendedor na coluna de resultados
    if (el.cardVendedorResultados) el.cardVendedorResultados.classList.add('hidden');
    if (el.alertVendedorOk) el.alertVendedorOk.classList.add('hidden');
    if (el.alertVendedorDanger) el.alertVendedorDanger.classList.add('hidden');
    
    // Restaurar valores padrão
    setDefaultValues();
}

// ===== INICIALIZAÇÃO =====
function init() {
    // Carregar referências dos elementos
    el = {
        // Custos Técnicos
        horasTecnico: document.getElementById('horasTecnico'),
        valorHoraTecnico: document.getElementById('valorHoraTecnico'),
        horasEngenheiro: document.getElementById('horasEngenheiro'),
        valorHoraEngenheiro: document.getElementById('valorHoraEngenheiro'),
        qtdVisitas: document.getElementById('qtdVisitas'),
        valorVisita: document.getElementById('valorVisita'),
        valorPGR: document.getElementById('valorPGR'),
        valorPCMSO: document.getElementById('valorPCMSO'),
        valorLTCAT: document.getElementById('valorLTCAT'),
        valorGestaoNR01: document.getElementById('valorGestaoNR01'),
        valorTreinamentos: document.getElementById('valorTreinamentos'),
        valorAcompanhamento: document.getElementById('valorAcompanhamento'),
        
        // Custos Operacionais
        valorDeslocamento: document.getElementById('valorDeslocamento'),
        valorAlimentacao: document.getElementById('valorAlimentacao'),
        valorMateriais: document.getElementById('valorMateriais'),
        valorTaxas: document.getElementById('valorTaxas'),
        valorOutros: document.getElementById('valorOutros'),
        
        // Impostos e Comissão
        issPercent: document.getElementById('issPercent'),
        impostosPercent: document.getElementById('impostosPercent'),
        comissaoPercent: document.getElementById('comissaoPercent'),
        
        // Desconto
        descontoPercent: document.getElementById('descontoPercent'),
        
        // Resultados Principais
        resultCustoTotal: document.getElementById('resultCustoTotal'),
        resultPrecoIdeal: document.getElementById('resultPrecoIdeal'),
        resultLucro: document.getElementById('resultLucro'),
        resultMargem: document.getElementById('resultMargem'),
        resultPrecoMinimo: document.getElementById('resultPrecoMinimo'),
        resultComissao: document.getElementById('resultComissao'),
        
        // Resultados com Desconto
        resultPrecoDesconto: document.getElementById('resultPrecoDesconto'),
        resultNovaMargem: document.getElementById('resultNovaMargem'),
        resultNovoLucro: document.getElementById('resultNovoLucro'),
        cardDescontoResultados: document.getElementById('cardDescontoResultados'),
        descontoLabel: document.getElementById('descontoLabel'),
        
        // Alertas (principal)
        alertMargemPrincipal: document.getElementById('alertMargemPrincipal'),
        alertMargemPrincipalOk: document.getElementById('alertMargemPrincipalOk'),
        
        // Alertas (desconto)
        alertMargem: document.getElementById('alertMargem'),
        alertMargemOk: document.getElementById('alertMargemOk'),
        
        // Valor Vendedor (input)
        valorVendedor: document.getElementById('valorVendedor'),
        diferencaIdeal: document.getElementById('diferencaIdeal'),
        margemVendedor: document.getElementById('margemVendedor'),
        statusVendedor: document.getElementById('statusVendedor'),
        statusVendedorDanger: document.getElementById('statusVendedorDanger'),
        
        // Resultados Vendedor (coluna de resultados)
        cardVendedorResultados: document.getElementById('cardVendedorResultados'),
        resultPrecoVendedor: document.getElementById('resultPrecoVendedor'),
        resultDiferencaIdeal: document.getElementById('resultDiferencaIdeal'),
        resultLucroVendedor: document.getElementById('resultLucroVendedor'),
        resultMargemVendedor: document.getElementById('resultMargemVendedor'),
        alertVendedorOk: document.getElementById('alertVendedorOk'),
        alertVendedorDanger: document.getElementById('alertVendedorDanger'),
        
        // Botões
        btnLimpar: document.getElementById('btnLimpar'),
        btnGerarResumo: document.getElementById('btnGerarResumo'),
        
        // Modal
        modalResumo: document.getElementById('modalResumo'),
        modalClose: document.getElementById('modalClose'),
        modalContent: document.getElementById('modalContent'),
        btnCopiar: document.getElementById('btnCopiar'),
        btnImprimir: document.getElementById('btnImprimir')
    };
    
    // Aplicar máscaras de moeda
    const currencyInputs = [
        'valorHoraTecnico', 'valorHoraEngenheiro', 'valorVisita',
        'valorPGR', 'valorPCMSO', 'valorLTCAT', 'valorGestaoNR01',
        'valorTreinamentos', 'valorAcompanhamento', 'valorDeslocamento',
        'valorAlimentacao', 'valorMateriais', 'valorTaxas', 'valorOutros'
    ];
    
    currencyInputs.forEach(id => {
        applyCurrencyMask(document.getElementById(id));
    });
    
    // Aplicar máscara no campo valor vendedor
    applyCurrencyMask(document.getElementById('valorVendedor'));
    
    // Adicionar listeners para recalcular em tempo real
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => {
        input.addEventListener('input', calcularTudo);
        input.addEventListener('change', calcularTudo);
    });
    
    // Botão Limpar
    if (el.btnLimpar) {
        el.btnLimpar.addEventListener('click', limparFormulario);
    }
    
    // Botão Gerar Resumo
    if (el.btnGerarResumo) {
        el.btnGerarResumo.addEventListener('click', gerarResumo);
    }
    
    // Fechar modal
    if (el.modalClose) {
        el.modalClose.addEventListener('click', () => {
            if (el.modalResumo) el.modalResumo.classList.add('hidden');
        });
    }
    
    if (el.modalResumo) {
        el.modalResumo.addEventListener('click', (e) => {
            if (e.target === el.modalResumo) {
                el.modalResumo.classList.add('hidden');
            }
        });
    }
    
    // Botões do modal
    if (el.btnCopiar) {
        el.btnCopiar.addEventListener('click', copiarResumo);
    }
    
    if (el.btnImprimir) {
        el.btnImprimir.addEventListener('click', imprimirResumo);
    }
    
    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && el.modalResumo && !el.modalResumo.classList.contains('hidden')) {
            el.modalResumo.classList.add('hidden');
        }
    });
    
    // Definir valores padrão
    setDefaultValues();
}

// Função para definir valores padrão
function setDefaultValues() {
    // Valor hora Técnico: R$ 50,00
    if (el.valorHoraTecnico) {
        el.valorHoraTecnico.value = 'R$ 50,00';
    }
    
    // Valor hora Engenheiro: R$ 70,00
    if (el.valorHoraEngenheiro) {
        el.valorHoraEngenheiro.value = 'R$ 70,00';
    }
    
    // Programas SST: R$ 500,00 cada
    if (el.valorPGR) {
        el.valorPGR.value = 'R$ 500,00';
    }
    if (el.valorPCMSO) {
        el.valorPCMSO.value = 'R$ 500,00';
    }
    if (el.valorLTCAT) {
        el.valorLTCAT.value = 'R$ 500,00';
    }
    
    // Comissão do Vendedor: 8%
    if (el.comissaoPercent) {
        el.comissaoPercent.value = '8';
    }
    
    // Impostos Gerais: 6%
    if (el.impostosPercent) {
        el.impostosPercent.value = '6';
    }
    
    // Calcular com valores padrão
    calcularTudo();
}

// Iniciar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', init);

