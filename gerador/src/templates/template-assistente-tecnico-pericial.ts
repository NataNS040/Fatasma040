import { DadosTemplate } from '../types/proposta.types';
import { formatMoeda } from '../utils/formatters';

const escopo = [
    ['Análise da petição inicial', 'avaliação técnica das alegações e pedidos relacionados às condições de trabalho, agentes nocivos e normas de SST'],
    ['Análise da documentação de Segurança e Saúde no Trabalho', 'exame dos documentos técnicos e registros relacionados ao processo, como PGR, PCMSO, PPP, ASOs e laudos'],
    ['Suporte técnico ao departamento jurídico', 'assessoria especializada para subsidiar a defesa e a estratégia processual da empresa'],
    ['Definição da estratégia técnica para a perícia', 'planejamento da atuação com base na documentação e nas especificidades do processo'],
    ['Elaboração de quesitos técnicos', 'formulação de quesitos periciais fundamentados'],
    ['Alinhamentos anteriores à perícia', 'comunicação com o perito judicial e com a equipe jurídica nos momentos prévios à diligência'],
    ['Acompanhamento da diligência pericial', 'presença técnica durante a perícia judicial'],
    ['Avaliação dos procedimentos periciais', 'análise crítica das metodologias, instrumentos e critérios utilizados pelo perito judicial'],
    ['Elaboração de parecer técnico', 'documento fundamentado com a avaliação técnica dos aspectos de SST discutidos no processo'],
    ['Análise do laudo pericial judicial', 'avaliação do laudo e identificação de inconsistências ou pontos passíveis de contestação'],
    ['Impugnação ou manifestação técnica', 'elaboração, quando necessária, de documento técnico contestando conclusões do laudo'],
    ['Quesitos complementares e esclarecimentos', 'formulação, quando aplicável, de quesitos suplementares para dúvidas técnicas remanescentes']
];

const beneficios = [
    ['fa-hard-hat', 'Suporte Técnico Especializado', 'Atuação em conformidade com as Normas Regulamentadoras e a legislação trabalhista vigente.'],
    ['fa-route', 'Maior Previsibilidade', 'Avaliação prévia das alegações e documentos para antecipar pontos críticos.'],
    ['fa-handshake', 'Apoio Técnico ao Jurídico', 'Interface direta com o jurídico para subsidiar a defesa com informações técnicas.'],
    ['fa-file-alt', 'Análise da Documentação', 'Exame dos documentos de SST, conformidades e eventuais fragilidades.'],
    ['fa-user-check', 'Acompanhamento da Perícia', 'Presença técnica durante a diligência pericial.'],
    ['fa-pen-alt', 'Manifestações Fundamentadas', 'Pareceres, impugnações e manifestações com embasamento técnico-científico.'],
    ['fa-search', 'Identificação de Pontos Críticos', 'Mapeamento dos aspectos técnicos que possam impactar o processo.'],
    ['fa-chess', 'Segurança nas Decisões', 'Informações precisas para orientar decisões estratégicas.']
];

export function getTemplateAssistenteTecnicoPericial(dados: DadosTemplate, valorFinal: number): string {
    const fantasia = dados.nomeFantasia || dados.razaoSocial;
    const endereco = [dados.endereco, dados.bairro, dados.cidade && `${dados.cidade} - ${dados.uf}`, dados.cep && `CEP: ${dados.cep}`].filter(Boolean).join(' — ');
    const contato = dados.solicitante.nome || 'A definir';
    const linhasPagamento = (dados.condicoesPagamento || 'Condição de pagamento a definir.\nPagamento via Pix, transferência bancária ou boleto bancário.')
        .split(/\r?\n/).map(linha => linha.trim()).filter(Boolean);
    const meiosPagamento = linhasPagamento.find(linha => /^pagamento via/i.test(linha)) || 'Pagamento via Pix, transferência bancária ou boleto bancário.';
    const parcelas = linhasPagamento.filter(linha => !/^pagamento via/i.test(linha));
    const cabecalho = () => `<div class="page-header"><img src="${dados.logoUrl}" alt="EngMarq Solution" class="page-header-logo"><span class="page-header-title">Proposta ${dados.numero} — Assistente Técnico Pericial | ${fantasia}</span></div>`;
    const rodape = (pagina: string) => `<div class="page-footer"><span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span><span class="page-number">${pagina}</span></div>`;

    return `
    <div class="page page-cover">
        <span style="position:absolute;top:25mm;left:0;right:0;text-align:center;font-family:var(--font-primary);font-size:14px;font-weight:700;color:#81e6d9;letter-spacing:3px;">${dados.numero}</span>
        <img src="${dados.logoUrl}" alt="EngMarq Solution" class="cover-logo">
        <span class="cover-badge"><i class="fas fa-gavel"></i> Assistente Técnico Pericial — Processo Trabalhista</span>
        <div class="cover-icon"><i class="fas fa-balance-scale"></i></div>
        <h1 class="cover-title">Proposta Comercial<br><span>Gestão e Assessoria Técnica Pericial</span></h1>
        <p class="cover-subtitle">Prestação de serviços de Engenharia de Segurança do Trabalho com atuação como Assistente Técnico em processo judicial trabalhista</p>
        <div class="cover-client"><p class="cover-client-label">Proposta elaborada para</p><p class="cover-client-name">${fantasia}</p><p class="cover-client-sub">${dados.razaoSocial}${dados.cnpj ? ` | CNPJ: ${dados.cnpj}` : ''}</p></div>
        <p class="cover-date"><i class="fas fa-calendar-alt"></i>&nbsp;&nbsp;${dados.data}</p>
        <div class="cover-footer"><p>EngMarq Solution | Engenharia de Segurança e Saúde do Trabalho | Natal - RN</p></div>
    </div>

    <div class="page">
        ${cabecalho()}
        <h2 class="section-title"><span class="section-number">1</span><span class="section-title-text">Identificação da Empresa Contratante</span></h2>
        <div class="company-info-grid">
            <div class="company-info-item"><label>Razão Social</label><span>${dados.razaoSocial}</span></div>
            <div class="company-info-item"><label>CNPJ</label><span>${dados.cnpj || 'A definir'}</span></div>
            <div class="company-info-item" style="grid-column:1/-1"><label>Endereço</label><span>${endereco || 'A definir'}</span></div>
            <div class="company-info-item"><label>Nome Fantasia</label><span>${fantasia}</span></div>
            <div class="company-info-item"><label>Responsável pelo Contato</label><span>${contato}</span></div>
        </div>
        <h2 class="section-title" style="margin-top:16px"><span class="section-number">2</span><span class="section-title-text">Objeto da Proposta</span></h2>
        <p>Esta proposta tem por objeto a prestação de serviços técnicos profissionais de <strong>Engenharia de Segurança do Trabalho</strong> para <strong>Gestão e Assessoria Técnica Pericial</strong>, incluindo a atuação como <strong>Assistente Técnico da empresa</strong> em processo judicial trabalhista.</p>
        <p>A atuação abrange a análise prévia da documentação de SST, o suporte técnico ao jurídico, o acompanhamento da diligência pericial, a elaboração de parecer técnico, a análise do laudo judicial e as manifestações técnicas pertinentes.</p>
        <div class="highlight-box"><p><strong><i class="fas fa-gavel"></i> Serviço:</strong> Gestão, Assessoria Técnica Pericial e atuação como Assistente Técnico da empresa em todas as fases do processo pericial.</p></div>
        <div class="info-box"><h4><i class="fas fa-shield-alt"></i> Dados do Processo</h4><p>Número do processo, reclamante, vara e data da perícia serão informados pela contratante ou por sua assessoria jurídica posteriormente. Nenhum dado processual é presumido nesta proposta.</p></div>
        ${rodape('02')}
    </div>

    <div class="page">
        ${cabecalho()}
        <h2 class="section-title"><span class="section-number">3</span><span class="section-title-text">Escopo dos Serviços</span></h2>
        <p>A prestação dos serviços compreende as seguintes atividades técnicas, realizadas de forma integrada ao longo das fases do processo pericial:</p>
        <ul class="feature-list">${escopo.map(([titulo, descricao]) => `<li><strong>${titulo}</strong> — ${descricao}</li>`).join('')}</ul>
        <div class="green-box"><h4><i class="fas fa-plus-circle"></i> Serviços Adicionais Incluídos</h4><p>Reuniões preliminares e pré-periciais por videoconferência, assessoria técnica sobre insalubridade e periculosidade e comunicação de eventuais desvios técnicos identificados.</p></div>
        ${rodape('03')}
    </div>

    <div class="page">
        ${cabecalho()}
        <h2 class="section-title"><span class="section-number">4</span><span class="section-title-text">Objetivo</span></h2>
        <p>Oferecer suporte técnico especializado à <strong>${fantasia}</strong> durante o processo pericial, proporcionando maior segurança técnica ao longo de todas as suas fases.</p>
        <p>A presença do Assistente Técnico permite que a defesa disponha de fundamentação sólida, baseada nas Normas Regulamentadoras e na legislação trabalhista vigente.</p>
        <div class="alert-box"><h4><i class="fas fa-exclamation-triangle"></i> Nota Importante</h4><p>A atuação da EngMarq Solution oferece suporte e fundamentação técnica. Não implica garantia ou promessa de resultado favorável no processo judicial.</p></div>
        <h2 class="section-title" style="margin-top:14px"><span class="section-number">5</span><span class="section-title-text">Benefícios para ${fantasia}</span></h2>
        <div class="factors-grid">${beneficios.map(([icone, titulo, descricao]) => `<div class="factor-card"><h4><i class="fas ${icone}"></i> ${titulo}</h4><p>${descricao}</p></div>`).join('')}</div>
        ${rodape('04')}
    </div>

    <div class="page page-investment">
        ${cabecalho()}
        <h2 class="section-title"><span class="section-number">6</span><span class="section-title-text">Investimento</span></h2>
        <div class="highlight-box"><p><strong><i class="fas fa-gavel"></i> Serviço:</strong> Gestão e Assessoria Técnica Pericial — Assistente Técnico em processo judicial trabalhista</p></div>
        <table class="inv-table"><thead><tr><th>Descrição do Serviço</th><th class="right">Valor</th></tr></thead><tbody><tr><td><strong>Gestão e Assessoria Técnica Pericial — Assistente Técnico</strong><br><span class="sub">Análise documental · suporte ao jurídico · quesitos · perícia · parecer · análise de laudo · manifestações</span></td><td class="right">R$ ${formatMoeda(valorFinal)}</td></tr><tr class="incluso-row"><td>Reuniões preliminares e pré-periciais por videoconferência</td><td class="right">Incluso</td></tr><tr class="incluso-row"><td>Assessoria sobre insalubridade e periculosidade</td><td class="right">Incluso</td></tr><tr class="total-row"><td>VALOR TOTAL — POR PROCESSO</td><td class="right">R$ ${formatMoeda(valorFinal)}</td></tr></tbody></table>
        <h3 class="subsection-title"><i class="fas fa-money-check-alt"></i> Condição de Pagamento</h3>
        <table class="pay-table"><thead><tr><th>Condição / Vencimento</th></tr></thead><tbody>${parcelas.map(linha => `<tr><td>${linha}</td></tr>`).join('')}</tbody></table>
        <div class="teal-box"><h4><i class="fas fa-info-circle"></i> Meios de Pagamento</h4><p>${meiosPagamento}</p></div>
        <h2 class="section-title"><span class="section-number">7</span><span class="section-title-text">Condições Gerais</span></h2>
        <div class="conditions-list">
            <div class="condition-item"><div class="condition-icon"><i class="fas fa-folder-open"></i></div><div class="condition-text"><strong>Fornecimento de Documentação</strong><span>A contratante deverá disponibilizar os documentos e informações necessários, incluindo registros de SST pertinentes ao processo.</span></div></div>
            <div class="condition-item"><div class="condition-icon"><i class="fas fa-calendar-alt"></i></div><div class="condition-text"><strong>Comunicação da Data da Perícia</strong><span>A diligência deverá ser informada preferencialmente com pelo menos 5 dias de antecedência.</span></div></div>
            <div class="condition-item"><div class="condition-icon"><i class="fas fa-redo"></i></div><div class="condition-text"><strong>Segunda Visita ou Perícia</strong><span>Poderá gerar honorários adicionais, negociados previamente.</span></div></div>
            <div class="condition-item"><div class="condition-icon"><i class="fas fa-plane"></i></div><div class="condition-text"><strong>Despesas Extraordinárias</strong><span>Viagem, hospedagem, alimentação ou deslocamento serão acordados separadamente quando necessários.</span></div></div>
            <div class="condition-item"><div class="condition-icon"><i class="fas fa-file-contract"></i></div><div class="condition-text"><strong>Escopo por Processo Individual</strong><span>Processos coletivos ou especiais serão analisados e negociados separadamente.</span></div></div>
            <div class="condition-item"><div class="condition-icon"><i class="fas fa-clock"></i></div><div class="condition-text"><strong>Validade</strong><span>Esta proposta é válida por 30 dias a partir da emissão.</span></div></div>
        </div>
        ${rodape('05')}
    </div>

    <div class="page">
        ${cabecalho()}
        <h2 class="section-title"><span class="section-number">8</span><span class="section-title-text">Responsável pela Proposta</span></h2>
        <div class="responsible-card"><div class="responsible-avatar"><i class="fas fa-user-tie"></i></div><p class="responsible-name">${dados.elaborador.nome}</p><p class="responsible-role">${dados.elaborador.cargo}</p><p class="responsible-company">EngMarq Solution</p><div class="responsible-contacts"><div class="responsible-contact-item"><i class="fab fa-whatsapp"></i><span>${dados.elaborador.telefone}</span></div><div class="responsible-contact-item"><i class="fas fa-envelope"></i><span>${dados.elaborador.email}</span></div><div class="responsible-contact-item"><i class="fas fa-map-marker-alt"></i><span>Natal - RN</span></div></div></div>
        <h2 class="section-title"><span class="section-number"><i class="fas fa-file-signature"></i></span><span class="section-title-text">Termo de Aceite e Assinaturas</span></h2>
        <div class="info-box"><h4><i class="fas fa-handshake"></i> Formalização do Aceite</h4><p>Ao assinar este documento, as partes concordam com os termos, valores e condições gerais, formalizando a contratação dos serviços de Gestão e Assessoria Técnica Pericial.</p></div>
        <div style="background:var(--light-color);border-radius:10px;padding:16px;margin:12px 0"><h3 style="text-align:center;border-bottom:2px solid var(--teal-color);padding-bottom:8px">RESPONSÁVEL PELA ELABORAÇÃO</h3><p><strong>Engmarq Solution LTDA</strong> — CNPJ 60.545.359/0001-76</p><p>${dados.elaborador.nome} — ${dados.elaborador.cargo}</p><div style="border-bottom:1px solid var(--dark-color);margin:25px auto 4px;max-width:400px"></div><p style="text-align:center">Assinatura do Proponente</p></div>
        <div style="background:var(--light-color);border-radius:10px;padding:16px"><h3 style="text-align:center;border-bottom:2px solid var(--secondary-color);padding-bottom:8px">RESPONSÁVEL PELA APROVAÇÃO</h3><div class="company-info-grid"><div><strong>${dados.razaoSocial}</strong></div><div><strong>${dados.cnpj || 'CNPJ a definir'}</strong></div><div>Responsável: ${contato}</div><div>Cargo: ${dados.solicitante.cargo || 'A definir'}</div></div><div style="border-bottom:1px solid var(--dark-color);margin:25px auto 4px;max-width:400px"></div><p style="text-align:center">Assinatura do Contratante</p></div>
        ${rodape('06')}
    </div>`;
}
