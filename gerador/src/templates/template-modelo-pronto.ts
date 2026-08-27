import { DadosTemplate } from '../types/proposta.types';
import { ModeloPronto } from '../config/modelos-prontos';
import { formatMoeda } from '../utils/formatters';

const lista = (itens: string[]) => itens.map(item => `<li>${item}</li>`).join('');

export function getTemplateModeloPronto(modelo: ModeloPronto, dados: DadosTemplate, valorFinal: number): string {
    const pagamento = dados.condicoesPagamento || '50% na aprovação e 50% na entrega. PIX, boleto ou transferência.';
    const camposDimensionamento = [
        modelo.campos.includes('colaboradores') && dados.qtdColaboradores ? `<div class="company-info-item"><label>Colaboradores</label><span>${dados.qtdColaboradores}</span></div>` : '',
        modelo.campos.includes('funcoes') && dados.qtdFuncoes ? `<div class="company-info-item"><label>Funções</label><span>${dados.qtdFuncoes}</span></div>` : ''
    ].join('');
    return `
    <div class="page page-cover">
        <span style="position:absolute;top:25mm;left:0;right:0;text-align:center;font-weight:700;color:${modelo.cor};letter-spacing:3px">${dados.numero}</span>
        <img src="${dados.logoUrl}" alt="EngMarq Solution" class="cover-logo">
        <span class="cover-badge"><i class="${modelo.icone}"></i> ${modelo.categoria}</span>
        <div class="cover-icon" style="color:${modelo.cor}"><i class="${modelo.icone}"></i></div>
        <h1 class="cover-title">Proposta Comercial<br><span style="color:${modelo.cor}">${modelo.nome}</span></h1>
        <p class="cover-subtitle">${modelo.descricao}</p>
        <div class="cover-client"><p class="cover-client-label">Proposta elaborada para</p><p class="cover-client-name">${dados.razaoSocial}</p></div>
        <p class="cover-date"><i class="fas fa-calendar-alt"></i> ${dados.data}</p>
        <div class="cover-footer"><p>EngMarq Solution | Engenharia de Segurança e Saúde do Trabalho | Natal - RN</p></div>
    </div>
    <div class="page">
        <div class="page-header"><img src="${dados.logoUrl}" class="page-header-logo"><span class="page-header-title">${modelo.nome}</span></div>
        <h2 class="section-title"><span class="section-number">1</span><span class="section-title-text">Contratante e objeto</span></h2>
        <div class="company-info-grid">
            <div class="company-info-item"><label>Razão Social</label><span>${dados.razaoSocial}</span></div>
            <div class="company-info-item"><label>CNPJ</label><span>${dados.cnpj || 'A informar'}</span></div>
            <div class="company-info-item"><label>Endereço</label><span>${[dados.endereco, dados.bairro].filter(Boolean).join(' - ') || 'A informar'}</span></div>
            <div class="company-info-item"><label>Cidade / UF</label><span>${dados.cidade || 'A informar'} / ${dados.uf || '—'}</span></div>${camposDimensionamento}
        </div>
        <div class="info-box" style="margin-top:22px"><h4><i class="fas fa-bullseye"></i> Objeto da proposta</h4><p>${modelo.descricao}</p></div>
        <h3 class="subsection-title"><i class="fas fa-scale-balanced"></i> Fundamentação técnica</h3><p>${modelo.fundamentacao}</p>
        <div class="page-footer"><span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888</span><span class="page-number">02</span></div>
    </div>
    <div class="page">
        <div class="page-header"><img src="${dados.logoUrl}" class="page-header-logo"><span class="page-header-title">${modelo.nome}</span></div>
        <h2 class="section-title"><span class="section-number">2</span><span class="section-title-text">Escopo e entregáveis</span></h2>
        <h3 class="subsection-title"><i class="fas fa-briefcase"></i> Serviços contemplados</h3><ul class="feature-list">${lista(modelo.servicos)}</ul>
        <h3 class="subsection-title"><i class="fas fa-check-double"></i> Entregáveis</h3><ul class="feature-list">${lista(modelo.entregaveis)}</ul>
        <div class="highlight-box"><p>O cronograma e a estratégia de execução serão alinhados após a aprovação, considerando as instalações, funções, grupos de exposição e informações fornecidas pela contratante.</p></div>
        <div class="page-footer"><span>EngMarq Solution | Proposta ${dados.numero}</span><span class="page-number">03</span></div>
    </div>
    <div class="page">
        <div class="page-header"><img src="${dados.logoUrl}" class="page-header-logo"><span class="page-header-title">${modelo.nome}</span></div>
        <h2 class="section-title"><span class="section-number">3</span><span class="section-title-text">Investimento e condições</span></h2>
        <table style="width:100%;border-collapse:collapse;margin:20px 0"><thead><tr style="background:${modelo.cor};color:#fff"><th style="padding:14px;text-align:left">Serviço</th><th style="padding:14px;width:160px">Investimento</th></tr></thead><tbody><tr><td style="padding:14px;border:1px solid #cbd5e0"><strong>${modelo.nome}</strong><br><small>${modelo.servicos.join(' + ')}</small></td><td style="padding:14px;text-align:center;border:1px solid #cbd5e0;font-size:17px;font-weight:700">R$ ${formatMoeda(valorFinal)}</td></tr></tbody></table>
        <div class="conditions-list"><div class="condition-item"><div class="condition-icon"><i class="fas fa-credit-card"></i></div><div class="condition-text"><strong>Condições de pagamento</strong><span>${pagamento}</span></div></div><div class="condition-item"><div class="condition-icon"><i class="fas fa-calendar-check"></i></div><div class="condition-text"><strong>Validade</strong><span>15 dias a partir da emissão.</span></div></div></div>
        <h3 class="subsection-title"><i class="fas fa-user-tie"></i> Responsável pela proposta</h3><div class="responsible-card"><p class="responsible-name">${dados.elaborador.nome}</p><p class="responsible-role">${dados.elaborador.cargo}</p><div class="responsible-contacts"><div class="responsible-contact-item"><i class="fas fa-envelope"></i><span>${dados.elaborador.email}</span></div><div class="responsible-contact-item"><i class="fab fa-whatsapp"></i><span>${dados.elaborador.telefone}</span></div></div></div>
        <div class="page-footer"><span>EngMarq Solution | ${dados.razaoSocial}</span><span class="page-number">04</span></div>
    </div>`;
}
