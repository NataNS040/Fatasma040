// ==========================================
// GERADOR DE ORÇAMENTO — EngMarq Solution
// Dados extraídos de 30+ propostas comerciais
// ==========================================

// ===== BASE DE PREÇOS (referência do mercado) =====
const SERVICOS = {
    documentacoes: [
        { id: 'pcmso', nome: 'PCMSO Avulso', min: 1000, med: 1250, max: 1500, unidade: 'empresa', descricao: 'Programa de Controle Médico de Saúde Ocupacional' },
        { id: 'pgr', nome: 'PGR Avulso', min: 1000, med: 1250, max: 1500, unidade: 'empresa', descricao: 'Programa de Gerenciamento de Riscos' },
        { id: 'ltcat', nome: 'LTCAT Avulso', min: 800, med: 1000, max: 1200, unidade: 'empresa', descricao: 'Laudo Técnico das Condições Ambientais do Trabalho' },
        { id: 'kit_basico', nome: 'Kit SST Básico (PGR+LTCAT+PCMSO)', min: 1500, med: 2100, max: 2700, unidade: 'empresa', descricao: 'Pacote fundamental de documentações' },
        { id: 'kit_completo', nome: 'Kit SST Completo (+LIP+eSocial)', min: 1700, med: 2600, max: 3537, unidade: 'empresa', descricao: 'Kit completo com extras' },
        { id: 'lip', nome: 'Laudo de Insalubridade/Periculosidade', min: 800, med: 1200, max: 1500, unidade: 'empresa', descricao: 'LIP — Laudo técnico individual' },
        { id: 'esocial', nome: 'Envio eSocial SST', min: 300, med: 500, max: 700, unidade: 'empresa', descricao: 'Eventos S-2210, S-2220, S-2240' },
    ],
    treinamentos: [
        { id: 'trein_4h', nome: 'Treinamento NR (4 horas)', min: 1100, med: 1700, max: 5300, unidade: 'turma', descricao: 'NRs diversas — carga 4h' },
        { id: 'trein_8h', nome: 'Treinamento NR (8 horas)', min: 1100, med: 2245, max: 3190, unidade: 'turma', descricao: 'NRs diversas — carga 8h' },
        { id: 'cipa_20h', nome: 'CIPA / NR-05 (20 horas)', min: 1100, med: 1200, max: 1500, unidade: 'turma', descricao: 'Treinamento completo de CIPA' },
        { id: 'brigada', nome: 'Brigada de Incêndio', min: 1400, med: 2000, max: 3190, unidade: 'turma', descricao: 'Formação de Brigada — teórico e prático' },
        { id: 'trein_nr01', nome: 'NR-01 Riscos Psicossociais', min: 1000, med: 1500, max: 2000, unidade: 'turma', descricao: 'Treinamento específico NR-01 (2025)' },
    ],
    consultorias: [
        { id: 'psicossocial', nome: 'Avaliação Psicossocial', min: 22, med: 48, max: 82, unidade: 'colaborador', descricao: 'Avaliação por colaborador — escala regressiva', qtdDefault: 50 },
        { id: 'assessoria_mensal', nome: 'Assessoria SST Mensal', min: 1800, med: 2800, max: 3887, unidade: 'mês', descricao: 'Assessoria contínua mensal', qtdDefault: 12 },
        { id: 'aet', nome: 'AET — Análise Ergonômica', min: 5000, med: 12000, max: 18950, unidade: 'projeto', descricao: 'Análise Ergonômica do Trabalho (varia por setores)' },
    ],
    projetos: [
        { id: 'proj_linha_vida', nome: 'Projeto Linha de Vida', min: 2300, med: 3200, max: 4500, unidade: 'projeto', descricao: 'Projeto de linha de vida e ancoragem' },
        { id: 'proj_tela_fachada', nome: 'Tela de Proteção de Fachada', min: 3000, med: 4500, max: 6000, unidade: 'projeto', descricao: 'Projeto de tela para proteção de fachada' },
        { id: 'proj_plataforma', nome: 'Plataforma Secundária', min: 2300, med: 3500, max: 5000, unidade: 'projeto', descricao: 'Projeto de plataforma secundária' },
        { id: 'combo_sst_psico', nome: 'Combo SST + Psicossocial', min: 2600, med: 5000, max: 9000, unidade: 'empresa', descricao: 'Kit completo com avaliação psicossocial inclusa' },
    ]
};

// ===== STATE =====
let itensSelecionados = [];
let idCounter = 0;

// ===== UTILS =====
function formatCurrency(valor) {
    return 'R$ ' + valor.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function parseCurrency(str) {
    if (!str) return 0;
    return parseFloat(String(str).replace(/[R$\s.]/g, '').replace(',', '.')) || 0;
}

// ===== RENDER SERVIÇOS =====
function renderServicos() {
    const cats = {
        documentacoes: document.getElementById('listaDocumentacoes'),
        treinamentos: document.getElementById('listaTreinamentos'),
        consultorias: document.getElementById('listaConsultorias'),
        projetos: document.getElementById('listaProjetos'),
    };

    Object.entries(SERVICOS).forEach(([catKey, items]) => {
        const container = cats[catKey];
        if (!container) return;
        container.innerHTML = '';

        items.forEach(srv => {
            const isSelected = itensSelecionados.some(it => it.servicoId === srv.id);

            // Checkbox row
            const row = document.createElement('label');
            row.className = 'servico-checkbox' + (isSelected ? ' selected' : '');
            row.innerHTML = `
                <input type="checkbox" data-srv-id="${srv.id}" data-cat="${catKey}" ${isSelected ? 'checked' : ''}>
                <div class="servico-info">
                    <div class="nome">${srv.nome}</div>
                    <div class="faixa">${srv.descricao} · <span class="badge-sm badge-min">Mín ${formatCurrency(srv.min)}</span> <span class="badge-sm badge-med">Méd ${formatCurrency(srv.med)}</span> <span class="badge-sm badge-max">Máx ${formatCurrency(srv.max)}</span></div>
                </div>
                <div class="servico-valor-ref">${formatCurrency(srv.med)}/${srv.unidade}</div>
            `;
            container.appendChild(row);

            // Config panel (if selected)
            if (isSelected) {
                const item = itensSelecionados.find(it => it.servicoId === srv.id);
                const panel = document.createElement('div');
                panel.className = 'item-config';
                const showQtd = srv.unidade === 'colaborador' || srv.unidade === 'turma' || srv.unidade === 'mês';
                panel.innerHTML = `
                    <div class="item-config-header">
                        <h4><i class="fas fa-sliders-h"></i> Configurar: ${srv.nome}</h4>
                        <button class="btn-remove" data-item-id="${item.id}" title="Remover"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="config-row">
                        <div class="config-group">
                            <label>Referência de Preço</label>
                            <select data-item-id="${item.id}" data-field="ref">
                                <option value="min" ${item.refPreco === 'min' ? 'selected' : ''}>Mínimo — ${formatCurrency(srv.min)}</option>
                                <option value="med" ${item.refPreco === 'med' ? 'selected' : ''}>Médio — ${formatCurrency(srv.med)}</option>
                                <option value="max" ${item.refPreco === 'max' ? 'selected' : ''}>Máximo — ${formatCurrency(srv.max)}</option>
                                <option value="custom" ${item.refPreco === 'custom' ? 'selected' : ''}>Personalizado</option>
                            </select>
                        </div>
                        ${showQtd ? `<div class="config-group">
                            <label>Quantidade (${srv.unidade}s)</label>
                            <input type="number" min="1" value="${item.quantidade}" data-item-id="${item.id}" data-field="qtd">
                        </div>` : `<div class="config-group">
                            <label>Valor Unitário</label>
                            <input type="text" value="${formatCurrency(item.valorUnitario)}" data-item-id="${item.id}" data-field="valor" ${item.refPreco !== 'custom' ? 'readonly style="background:#edf2f7"' : ''}>
                        </div>`}
                    </div>
                    ${showQtd ? `<div class="config-row" style="margin-top: 8px;">
                        <div class="config-group">
                            <label>Valor Unitário</label>
                            <input type="text" value="${formatCurrency(item.valorUnitario)}" data-item-id="${item.id}" data-field="valor" ${item.refPreco !== 'custom' ? 'readonly style="background:#edf2f7"' : ''}>
                        </div>
                        <div></div>
                    </div>` : ''}
                    <div class="valor-sugerido">
                        <span class="label-sug">Subtotal com margem:</span>
                        <span class="valor-sug">${formatCurrency(item.subtotalComMargem)}</span>
                    </div>
                `;
                container.appendChild(panel);
            }
        });
    });

    bindEvents();
}

// ===== FIND SERVICE =====
function findServico(servicoId) {
    for (const cat of Object.values(SERVICOS)) {
        const found = cat.find(s => s.id === servicoId);
        if (found) return found;
    }
    return null;
}

// ===== TOGGLE SERVICE =====
function toggleServico(servicoId, catKey) {
    const idx = itensSelecionados.findIndex(it => it.servicoId === servicoId);
    if (idx >= 0) {
        itensSelecionados.splice(idx, 1);
    } else {
        const srv = findServico(servicoId);
        if (!srv) return;
        idCounter++;
        itensSelecionados.push({
            id: idCounter,
            servicoId: srv.id,
            nome: srv.nome,
            unidade: srv.unidade,
            refPreco: 'med',
            valorUnitario: srv.med,
            quantidade: srv.qtdDefault || 1,
            subtotalComMargem: calcSubtotal(srv.med, srv.qtdDefault || 1),
        });
    }
    renderServicos();
    calcularOrcamento();
}

// ===== CALC SUBTOTAL =====
function calcSubtotal(valorUnit, qtd) {
    const margem = parseFloat(document.getElementById('margemLucro').value) || 60;
    const custoBase = valorUnit * qtd;
    // Valor final = custoBase / (1 - margem/100)
    return custoBase / (1 - margem / 100);
}

// ===== CALC ORÇAMENTO GERAL =====
function calcularOrcamento() {
    const margem = parseFloat(document.getElementById('margemLucro').value) || 60;
    const desconto = parseFloat(document.getElementById('descontoCliente').value) || 0;

    let totalCusto = 0;

    itensSelecionados.forEach(item => {
        const subtotalBase = item.valorUnitario * item.quantidade;
        item.subtotalComMargem = subtotalBase / (1 - margem / 100);
        totalCusto += subtotalBase;
    });

    const totalSemDesconto = itensSelecionados.reduce((sum, it) => sum + it.subtotalComMargem, 0);
    const descontoValor = totalSemDesconto * (desconto / 100);
    const totalFinal = totalSemDesconto - descontoValor;
    const lucroEstimado = totalFinal - totalCusto;
    const margemReal = totalFinal > 0 ? ((lucroEstimado / totalFinal) * 100) : 0;

    // Update DOM
    document.getElementById('valorFinalCliente').textContent = formatCurrency(totalFinal);
    document.getElementById('totalDesc').textContent =
        itensSelecionados.length > 0
            ? `${itensSelecionados.length} serviço(s) · Margem ${margem}%${desconto > 0 ? ' · Desc. ' + desconto + '%' : ''}`
            : 'Selecione os serviços ao lado';

    document.getElementById('resCustoBase').textContent = formatCurrency(totalCusto);
    document.getElementById('resLucro').textContent = formatCurrency(lucroEstimado);
    document.getElementById('resMargemReal').textContent = margemReal.toFixed(1) + '%';
    document.getElementById('resQtdServicos').textContent = itensSelecionados.length;

    const rowDesc = document.getElementById('rowDesconto');
    if (desconto > 0) {
        rowDesc.style.display = '';
        document.getElementById('resDesconto').textContent = '- ' + formatCurrency(descontoValor);
    } else {
        rowDesc.style.display = 'none';
    }

    // Pagamento sugerido
    if (totalFinal > 5000) {
        document.getElementById('resPagamento').textContent = '50% início / 50% entrega';
    } else {
        document.getElementById('resPagamento').textContent = 'À vista ou 2x';
    }

    // Render itens no resumo
    const resumoEl = document.getElementById('resumoItens');
    const resultadosEl = document.getElementById('resumoResultados');

    if (itensSelecionados.length === 0) {
        resumoEl.innerHTML = `<div class="resumo-vazio"><i class="fas fa-hand-pointer"></i> Selecione serviços à esquerda para montar o orçamento</div>`;
        resultadosEl.style.display = 'none';
    } else {
        resultadosEl.style.display = '';
        let html = '';
        itensSelecionados.forEach(item => {
            const detalhe = item.quantidade > 1 ? `${item.quantidade} ${item.unidade}(s) × ${formatCurrency(item.valorUnitario)}` : item.unidade;
            html += `<div class="resumo-item">
                <div>
                    <div class="ri-nome">${item.nome}</div>
                    <div class="ri-detalhe">${detalhe}</div>
                </div>
                <div class="ri-valor">${formatCurrency(item.subtotalComMargem)}</div>
            </div>`;
        });
        resumoEl.innerHTML = html;
    }

    // Update config panels valor-sug
    document.querySelectorAll('.valor-sug').forEach(el => {
        const panel = el.closest('.item-config');
        if (!panel) return;
        const btn = panel.querySelector('.btn-remove');
        if (!btn) return;
        const itemId = parseInt(btn.dataset.itemId);
        const item = itensSelecionados.find(it => it.id === itemId);
        if (item) el.textContent = formatCurrency(item.subtotalComMargem);
    });
}

// Debounce para evitar loops
let recalcTimeout = null;
function recalcDebounced() {
    clearTimeout(recalcTimeout);
    recalcTimeout = setTimeout(() => {
        renderServicos();
        calcularOrcamento();
    }, 80);
}

// ===== EVENTOS =====
function bindEvents() {
    // Checkboxes
    document.querySelectorAll('.servico-checkbox input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', (e) => {
            e.stopPropagation();
            const srvId = e.target.dataset.srvId;
            const cat = e.target.dataset.cat;
            toggleServico(srvId, cat);
        });
    });

    // Remover
    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = parseInt(e.currentTarget.dataset.itemId);
            itensSelecionados = itensSelecionados.filter(it => it.id !== itemId);
            renderServicos();
            calcularOrcamento();
        });
    });

    // Selects (referência de preço)
    document.querySelectorAll('select[data-field="ref"]').forEach(sel => {
        sel.addEventListener('change', (e) => {
            const itemId = parseInt(e.target.dataset.itemId);
            const item = itensSelecionados.find(it => it.id === itemId);
            if (!item) return;
            item.refPreco = e.target.value;
            if (e.target.value !== 'custom') {
                const srv = findServico(item.servicoId);
                if (srv) item.valorUnitario = srv[e.target.value];
            }
            recalcDebounced();
        });
    });

    // Quantidade
    document.querySelectorAll('input[data-field="qtd"]').forEach(inp => {
        inp.addEventListener('input', (e) => {
            const itemId = parseInt(e.target.dataset.itemId);
            const item = itensSelecionados.find(it => it.id === itemId);
            if (!item) return;
            item.quantidade = Math.max(1, parseInt(e.target.value) || 1);
            recalcDebounced();
        });
    });

    // Valor personalizado
    document.querySelectorAll('input[data-field="valor"]').forEach(inp => {
        inp.addEventListener('blur', (e) => {
            const itemId = parseInt(e.target.dataset.itemId);
            const item = itensSelecionados.find(it => it.id === itemId);
            if (!item || item.refPreco !== 'custom') return;
            item.valorUnitario = parseCurrency(e.target.value);
            recalcDebounced();
        });
    });
}

// ===== COPIAR RESUMO =====
function copiarResumo() {
    if (itensSelecionados.length === 0) return;

    const margem = parseFloat(document.getElementById('margemLucro').value) || 60;
    const desconto = parseFloat(document.getElementById('descontoCliente').value) || 0;

    let texto = '📋 ORÇAMENTO ENGMARQ SOLUTION\n';
    texto += '━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

    itensSelecionados.forEach((item, idx) => {
        const detalhe = item.quantidade > 1 ? ` (${item.quantidade} ${item.unidade}s)` : '';
        texto += `${idx + 1}. ${item.nome}${detalhe}\n`;
        texto += `   Valor: ${formatCurrency(item.subtotalComMargem)}\n\n`;
    });

    texto += '━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    texto += `💰 TOTAL: ${document.getElementById('valorFinalCliente').textContent}\n`;
    if (desconto > 0) texto += `🏷️ Desconto: ${desconto}%\n`;
    texto += `📊 Pagamento: ${document.getElementById('resPagamento').textContent}\n`;
    texto += '\n✅ Orçamento sujeito a avaliação técnica.\n';
    texto += '📞 EngMarq Solution — Engenharia & Segurança do Trabalho';

    navigator.clipboard.writeText(texto).then(() => {
        const btn = document.getElementById('btnCopiar');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
        btn.style.background = 'var(--success-color)';
        btn.style.color = 'white';
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.style.color = '';
        }, 2000);
    });
}

// ===== ENVIAR PARA CALCULADORA =====
function enviarParaCalculadora() {
    if (itensSelecionados.length === 0) return;
    const dados = itensSelecionados.map(item => ({
        nome: item.nome,
        tipo: item.unidade,
        detalhe: `Ref. orçamento — ${item.quantidade} ${item.unidade}(s)`,
        quantidade: item.quantidade,
        valorUnitario: item.valorUnitario,
    }));
    localStorage.setItem('engmarq_orcamento_items', JSON.stringify(dados));
    window.location.href = './calculadora.html?from=orcamento';
}

// ===== LIMPAR =====
function limpar() {
    itensSelecionados = [];
    idCounter = 0;
    renderServicos();
    calcularOrcamento();
}

// ===== AUTH (reused from gerador) =====
function carregarSessaoHeader() {
    try {
        const sessao = localStorage.getItem('engmarq_session');
        if (!sessao) {
            window.location.href = './login.html';
            return;
        }
        const dados = JSON.parse(sessao);
        const el = document.getElementById('userNameText');
        if (el) el.textContent = dados.nome || dados.email || 'Usuário';
    } catch {
        window.location.href = './login.html';
    }
}

function fazerLogout() {
    localStorage.removeItem('engmarq_session');
    window.location.href = './login.html';
}

// ===== INIT =====
function init() {
    carregarSessaoHeader();
    renderServicos();

    // Margem e desconto listeners
    document.getElementById('margemLucro').addEventListener('input', recalcDebounced);
    document.getElementById('descontoCliente').addEventListener('input', recalcDebounced);

    // Botões
    document.getElementById('btnLimpar').addEventListener('click', limpar);
    document.getElementById('btnCopiar').addEventListener('click', copiarResumo);
    document.getElementById('btnEnviarCalc').addEventListener('click', enviarParaCalculadora);
}

document.addEventListener('DOMContentLoaded', init);
