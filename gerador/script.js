// ===== CALCULADORA DE PRECIFICAÇÃO ENGMARQ (MODO PLANILHA) =====

let el = {};
let itensPlanilha = [];

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
    const cleaned = value.toString()
        .replace(/[R$\s]/g, '')
        .replace(/\./g, '')
        .replace(',', '.');
    return parseFloat(cleaned) || 0;
}

function parseNumber(value) {
    if (!value) return 0;
    return parseFloat(value.toString().replace(',', '.')) || 0;
}

function applyCurrencyMask(input) {
    if (!input) return;
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value === '') {
            e.target.value = '';
            calcularTudo();
            return;
        }

        value = parseInt(value, 10);
        value = (value / 100).toFixed(2);

        const parts = value.split('.');
        const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        const decPart = parts[1];

        e.target.value = `R$ ${intPart},${decPart}`;
        calcularTudo();
    });
}

function gerarIdItem() {
    return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function adicionarItem(nome, quantidade, valorUnitario, opcoes = {}) {
    if (!nome || quantidade <= 0 || valorUnitario <= 0) {
        return;
    }

    const tipo = opcoes.tipo || 'Item livre';
    const detalhe = opcoes.detalhe || '';

    itensPlanilha.push({
        id: gerarIdItem(),
        nome,
        tipo,
        detalhe,
        quantidade,
        valorUnitario,
        subtotal: quantidade * valorUnitario
    });

    renderizarLista();
    calcularTudo();
}

function adicionarItemManual() {
    const nome = (el.itemNome?.value || '').trim();
    const detalhe = (el.itemDetalhe?.value || '').trim();
    const quantidade = parseNumber(el.itemQuantidade?.value || 0);
    const valorUnitario = parseCurrency(el.itemValorUnitario?.value || 0);

    adicionarItem(nome, quantidade, valorUnitario, {
        tipo: 'Item livre',
        detalhe
    });

    if (el.itemNome) el.itemNome.value = '';
    if (el.itemQuantidade) el.itemQuantidade.value = '1';
    if (el.itemValorUnitario) el.itemValorUnitario.value = '';
    if (el.itemDetalhe) el.itemDetalhe.value = '';
}

function adicionarTecnico() {
    const qtdTecnicos = parseNumber(el.tecQuantidade?.value || 0);
    const horasPorTecnico = parseNumber(el.tecHoras?.value || 0);
    const valorHora = parseCurrency(el.tecValorHora?.value || 0);

    const quantidade = qtdTecnicos * horasPorTecnico;
    const detalhe = `${qtdTecnicos} técnico(s) x ${horasPorTecnico} hora(s)`;
    adicionarItem('Técnico de Segurança', quantidade, valorHora, {
        tipo: 'Técnico',
        detalhe
    });

    if (el.tecQuantidade) el.tecQuantidade.value = '';
    if (el.tecHoras) el.tecHoras.value = '';
    if (el.tecValorHora) el.tecValorHora.value = '';
}

function adicionarPsicossocial() {
    const colaboradores = parseNumber(el.psicoColaboradores?.value || 0);
    const valorPorColaborador = parseCurrency(el.psicoValorColaborador?.value || 0);

    const detalhe = `${colaboradores} colaborador(es)`;
    adicionarItem('Avaliação Psicossocial', colaboradores, valorPorColaborador, {
        tipo: 'Psicossocial',
        detalhe
    });

    if (el.psicoColaboradores) el.psicoColaboradores.value = '';
    if (el.psicoValorColaborador) el.psicoValorColaborador.value = '';
}

function adicionarTreinamento() {
    const nomeTreinamento = (el.treinamentoNome?.value || '').trim();
    const colaboradores = parseNumber(el.treinamentoColaboradores?.value || 0);
    const qtdInstrutores = parseNumber(el.treinamentoQtdInstrutores?.value || 0);
    const horasTreinamento = parseNumber(el.treinamentoHorasTreinamento?.value || 0);
    const valorHoraInstrutor = parseCurrency(el.treinamentoValorHoraInstrutor?.value || 0);
    const valorPorColaborador = parseCurrency(el.treinamentoValorPorColaborador?.value || 0);

    const nome = nomeTreinamento ? `Treinamento: ${nomeTreinamento}` : 'Treinamento';
    const custoInstrutor = qtdInstrutores * horasTreinamento * valorHoraInstrutor;
    const custoColaboradores = colaboradores * valorPorColaborador;
    const custoTotalTreinamento = custoInstrutor + custoColaboradores;
    const detalhe = `${colaboradores} colaborador(es) x ${formatCurrency(valorPorColaborador)} + ${qtdInstrutores} instrutor(es) x ${horasTreinamento}h x ${formatCurrency(valorHoraInstrutor)}`;
    adicionarItem(nome, 1, custoTotalTreinamento, {
        tipo: 'Treinamento',
        detalhe
    });

    if (el.treinamentoNome) el.treinamentoNome.value = '';
    if (el.treinamentoColaboradores) el.treinamentoColaboradores.value = '';
    if (el.treinamentoQtdInstrutores) el.treinamentoQtdInstrutores.value = '1';
    if (el.treinamentoHorasTreinamento) el.treinamentoHorasTreinamento.value = '';
    if (el.treinamentoValorHoraInstrutor) el.treinamentoValorHoraInstrutor.value = '';
    if (el.treinamentoValorPorColaborador) el.treinamentoValorPorColaborador.value = '';
}

function removerItem(id) {
    itensPlanilha = itensPlanilha.filter((item) => item.id !== id);
    renderizarLista();
    calcularTudo();
}

function renderizarLista() {
    if (!el.planilhaLista) return;

    if (itensPlanilha.length === 0) {
        el.planilhaLista.innerHTML = '<p class="planilha-vazia">Nenhum item adicionado.</p>';
        return;
    }

    el.planilhaLista.innerHTML = itensPlanilha
        .map((item) => `
            <div class="planilha-item-linha">
                <div class="planilha-item-main">
                    <div class="planilha-item-topo">
                        <span class="planilha-item-tipo">${item.tipo}</span>
                        <div class="planilha-item-nome">${item.nome}</div>
                    </div>
                    ${item.detalhe ? `<div class="planilha-item-detalhe">${item.detalhe}</div>` : ''}
                    <div class="planilha-item-meta">Memória de cálculo: ${item.quantidade} x ${formatCurrency(item.valorUnitario)}</div>
                </div>
                <div class="planilha-item-right">
                    <span class="planilha-item-subtotal">${formatCurrency(item.subtotal)}</span>
                    <button type="button" class="btn-remover-item" data-id="${item.id}" title="Remover item">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `)
        .join('');

    el.planilhaLista.querySelectorAll('.btn-remover-item').forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            if (id) removerItem(id);
        });
    });
}

function calcularTudo() {
    const custoTotal = itensPlanilha.reduce((acc, item) => acc + item.subtotal, 0);
    const lucroDesejado = parseCurrency(el.lucroDesejado?.value || 0);

    let custoDesejadoPercent = parseNumber(el.custoDesejadoPercent?.value || 0);
    if (custoDesejadoPercent <= 0) custoDesejadoPercent = 1;
    if (custoDesejadoPercent > 100) custoDesejadoPercent = 100;

    const precoPorCusto = custoTotal / (custoDesejadoPercent / 100);
    const precoPorLucro = custoTotal + lucroDesejado;
    const propostaFinal = Math.max(precoPorCusto, precoPorLucro);

    const lucroFinal = propostaFinal - custoTotal;
    const percentualCustoFinal = propostaFinal > 0 ? (custoTotal / propostaFinal) * 100 : 0;

    if (el.resultCustoTotal) el.resultCustoTotal.textContent = formatCurrency(custoTotal);
    if (el.resultPrecoPorCusto) el.resultPrecoPorCusto.textContent = formatCurrency(precoPorCusto);
    if (el.resultPrecoPorLucro) el.resultPrecoPorLucro.textContent = formatCurrency(precoPorLucro);
    if (el.resultPropostaFinal) el.resultPropostaFinal.textContent = formatCurrency(propostaFinal);
    if (el.resultLucroFinal) el.resultLucroFinal.textContent = formatCurrency(lucroFinal);
    if (el.resultPercentualCustoFinal) el.resultPercentualCustoFinal.textContent = formatPercent(percentualCustoFinal);
    if (el.resultQtdItens) el.resultQtdItens.textContent = String(itensPlanilha.length);

    return {
        custoTotal,
        lucroDesejado,
        custoDesejadoPercent,
        precoPorCusto,
        precoPorLucro,
        propostaFinal,
        lucroFinal,
        percentualCustoFinal,
        qtdItens: itensPlanilha.length
    };
}

function gerarResumo() {
    const dados = calcularTudo();
    const dataAtual = new Date().toLocaleDateString('pt-BR');

    const itensHtml = itensPlanilha.length
        ? itensPlanilha
            .map((item) => `
                <div class="resume-row">
                    <span>[${item.tipo}] ${item.nome}${item.detalhe ? ` - ${item.detalhe}` : ''} (${item.quantidade} x ${formatCurrency(item.valorUnitario)})</span>
                    <span>${formatCurrency(item.subtotal)}</span>
                </div>
            `)
            .join('')
        : '<div class="resume-row"><span>Nenhum item</span><span>R$ 0,00</span></div>';

    const html = `
        <div class="resume-section">
            <h4><i class="fas fa-calendar"></i> Data</h4>
            <div class="resume-row">
                <span>Data de geração</span>
                <span>${dataAtual}</span>
            </div>
        </div>

        <div class="resume-section">
            <h4><i class="fas fa-list-ul"></i> Itens da Planilha</h4>
            ${itensHtml}
            <div class="resume-row total">
                <span><strong>CUSTO TOTAL</strong></span>
                <span>${formatCurrency(dados.custoTotal)}</span>
            </div>
        </div>

        <div class="resume-section">
            <h4><i class="fas fa-bullseye"></i> Metas e Resultado</h4>
            <div class="resume-row">
                <span>Lucro desejado</span>
                <span>${formatCurrency(dados.lucroDesejado)}</span>
            </div>
            <div class="resume-row">
                <span>Custo alvo no final</span>
                <span>${formatPercent(dados.custoDesejadoPercent)}</span>
            </div>
            <div class="resume-row">
                <span>Preço por % de custo</span>
                <span>${formatCurrency(dados.precoPorCusto)}</span>
            </div>
            <div class="resume-row">
                <span>Preço por lucro desejado</span>
                <span>${formatCurrency(dados.precoPorLucro)}</span>
            </div>
            <div class="resume-row highlight">
                <span>VALOR FINAL DA PROPOSTA</span>
                <span>${formatCurrency(dados.propostaFinal)}</span>
            </div>
            <div class="resume-row">
                <span>Lucro previsto</span>
                <span>${formatCurrency(dados.lucroFinal)}</span>
            </div>
            <div class="resume-row">
                <span>% de custo no final</span>
                <span>${formatPercent(dados.percentualCustoFinal)}</span>
            </div>
        </div>
    `;

    if (el.modalContent) el.modalContent.innerHTML = html;
    if (el.modalResumo) el.modalResumo.classList.remove('hidden');
}

function copiarResumo() {
    const dados = calcularTudo();

    const itensTexto = itensPlanilha.length
        ? itensPlanilha
            .map((item) => `• [${item.tipo}] ${item.nome}${item.detalhe ? ` (${item.detalhe})` : ''}: ${item.quantidade} x ${formatCurrency(item.valorUnitario)} = ${formatCurrency(item.subtotal)}`)
            .join('\n')
        : '• Nenhum item adicionado';

    const texto = `📋 RESUMO DE PRECIFICAÇÃO ENGMARQ\n\n🧾 ITENS DA PLANILHA\n${itensTexto}\n\n💰 CUSTO TOTAL\n• ${formatCurrency(dados.custoTotal)}\n\n🎯 METAS\n• Lucro desejado: ${formatCurrency(dados.lucroDesejado)}\n• Custo alvo no final: ${formatPercent(dados.custoDesejadoPercent)}\n\n🏷️ PROPOSTA\n• Preço por % de custo: ${formatCurrency(dados.precoPorCusto)}\n• Preço por lucro desejado: ${formatCurrency(dados.precoPorLucro)}\n• VALOR FINAL DA PROPOSTA: ${formatCurrency(dados.propostaFinal)}\n• Lucro previsto: ${formatCurrency(dados.lucroFinal)}\n• % de custo no final: ${formatPercent(dados.percentualCustoFinal)}`;

    navigator.clipboard.writeText(texto).then(() => {
        if (el.btnCopiar) {
            const original = el.btnCopiar.innerHTML;
            el.btnCopiar.innerHTML = '<i class="fas fa-check"></i> Copiado!';
            setTimeout(() => {
                el.btnCopiar.innerHTML = original;
            }, 1800);
        }
    });
}

function imprimirResumo() {
    window.print();
}

function limparFormulario() {
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach((input) => {
        if (input.type === 'number') {
            input.value = '';
        } else {
            input.value = '';
        }
    });

    if (el.itemQuantidade) el.itemQuantidade.value = '1';
    if (el.treinamentoQtdInstrutores) el.treinamentoQtdInstrutores.value = '1';
    if (el.custoDesejadoPercent) el.custoDesejadoPercent.value = '40';

    itensPlanilha = [];
    renderizarLista();
    calcularTudo();
}

function carregarSessaoHeader() {
    const token = localStorage.getItem('engmarq_session');
    if (!token) return;

    try {
        const payload = JSON.parse(atob(token));
        if (payload?.nome && el.userNameText) {
            el.userNameText.textContent = payload.nome;
        }
    } catch {
        // silêncio intencional
    }
}

function fazerLogout() {
    localStorage.removeItem('engmarq_session');
    window.location.href = './login.html';
}

window.fazerLogout = fazerLogout;

function init() {
    el = {
        userNameText: document.getElementById('userNameText'),

        itemNome: document.getElementById('itemNome'),
        itemDetalhe: document.getElementById('itemDetalhe'),
        itemQuantidade: document.getElementById('itemQuantidade'),
        itemValorUnitario: document.getElementById('itemValorUnitario'),
        btnAdicionarItemManual: document.getElementById('btnAdicionarItemManual'),

        tecQuantidade: document.getElementById('tecQuantidade'),
        tecHoras: document.getElementById('tecHoras'),
        tecValorHora: document.getElementById('tecValorHora'),
        btnAdicionarTecnico: document.getElementById('btnAdicionarTecnico'),

        psicoColaboradores: document.getElementById('psicoColaboradores'),
        psicoValorColaborador: document.getElementById('psicoValorColaborador'),
        btnAdicionarPsicossocial: document.getElementById('btnAdicionarPsicossocial'),

        treinamentoNome: document.getElementById('treinamentoNome'),
        treinamentoColaboradores: document.getElementById('treinamentoColaboradores'),
        treinamentoQtdInstrutores: document.getElementById('treinamentoQtdInstrutores'),
        treinamentoHorasTreinamento: document.getElementById('treinamentoHorasTreinamento'),
        treinamentoValorHoraInstrutor: document.getElementById('treinamentoValorHoraInstrutor'),
        treinamentoValorPorColaborador: document.getElementById('treinamentoValorPorColaborador'),
        btnAdicionarTreinamento: document.getElementById('btnAdicionarTreinamento'),

        lucroDesejado: document.getElementById('lucroDesejado'),
        custoDesejadoPercent: document.getElementById('custoDesejadoPercent'),

        planilhaLista: document.getElementById('planilhaLista'),

        resultCustoTotal: document.getElementById('resultCustoTotal'),
        resultPrecoPorCusto: document.getElementById('resultPrecoPorCusto'),
        resultPrecoPorLucro: document.getElementById('resultPrecoPorLucro'),
        resultPropostaFinal: document.getElementById('resultPropostaFinal'),
        resultLucroFinal: document.getElementById('resultLucroFinal'),
        resultPercentualCustoFinal: document.getElementById('resultPercentualCustoFinal'),
        resultQtdItens: document.getElementById('resultQtdItens'),

        btnLimpar: document.getElementById('btnLimpar'),
        btnGerarResumo: document.getElementById('btnGerarResumo'),

        modalResumo: document.getElementById('modalResumo'),
        modalClose: document.getElementById('modalClose'),
        modalContent: document.getElementById('modalContent'),
        btnCopiar: document.getElementById('btnCopiar'),
        btnImprimir: document.getElementById('btnImprimir')
    };

    [
        el.itemValorUnitario,
        el.tecValorHora,
        el.psicoValorColaborador,
        el.treinamentoValorHoraInstrutor,
        el.treinamentoValorPorColaborador,
        el.lucroDesejado
    ].forEach((input) => applyCurrencyMask(input));

    if (el.btnAdicionarItemManual) el.btnAdicionarItemManual.addEventListener('click', adicionarItemManual);
    if (el.btnAdicionarTecnico) el.btnAdicionarTecnico.addEventListener('click', adicionarTecnico);
    if (el.btnAdicionarPsicossocial) el.btnAdicionarPsicossocial.addEventListener('click', adicionarPsicossocial);
    if (el.btnAdicionarTreinamento) el.btnAdicionarTreinamento.addEventListener('click', adicionarTreinamento);

    const recalcInputs = [el.lucroDesejado, el.custoDesejadoPercent];
    recalcInputs.forEach((input) => {
        if (!input) return;
        input.addEventListener('input', calcularTudo);
        input.addEventListener('change', calcularTudo);
    });

    [
        el.itemNome,
        el.itemDetalhe,
        el.itemQuantidade,
        el.itemValorUnitario,
        el.tecQuantidade,
        el.tecHoras,
        el.tecValorHora,
        el.psicoColaboradores,
        el.psicoValorColaborador,
        el.treinamentoNome,
        el.treinamentoColaboradores,
        el.treinamentoQtdInstrutores,
        el.treinamentoHorasTreinamento,
        el.treinamentoValorHoraInstrutor,
        el.treinamentoValorPorColaborador
    ].forEach((input) => {
        if (!input) return;
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        });
    });

    if (el.btnLimpar) el.btnLimpar.addEventListener('click', limparFormulario);
    if (el.btnGerarResumo) el.btnGerarResumo.addEventListener('click', gerarResumo);
    if (el.btnCopiar) el.btnCopiar.addEventListener('click', copiarResumo);
    if (el.btnImprimir) el.btnImprimir.addEventListener('click', imprimirResumo);

    if (el.modalClose) {
        el.modalClose.addEventListener('click', () => {
            if (el.modalResumo) el.modalResumo.classList.add('hidden');
        });
    }

    if (el.modalResumo) {
        el.modalResumo.addEventListener('click', (e) => {
            if (e.target === el.modalResumo) el.modalResumo.classList.add('hidden');
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && el.modalResumo && !el.modalResumo.classList.contains('hidden')) {
            el.modalResumo.classList.add('hidden');
        }
    });

    if (el.itemQuantidade) el.itemQuantidade.value = '1';
    if (el.treinamentoQtdInstrutores) el.treinamentoQtdInstrutores.value = '1';
    if (el.custoDesejadoPercent) el.custoDesejadoPercent.value = '40';

    carregarSessaoHeader();
    renderizarLista();
    calcularTudo();
}

document.addEventListener('DOMContentLoaded', init);
