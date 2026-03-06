// =====================================================
// TEMPLATE DE CONTRATO DE PRESTAÇÃO DE SERVIÇOS
// =====================================================

import { formatMoeda, valorPorExtenso } from '../utils/formatters';

/**
 * Tipos de contrato disponíveis
 */
export type TipoContrato = 'kit-sst' | 'brigada' | 'tela-fachada' | 'psicossocial' | 'treinamentos' | 'integrado';

/**
 * Dados de parcela de pagamento
 */
export interface ParcelaPagamento {
    percentual: number;
    descricao: string;
}

/**
 * Dados de função avaliada (para anexo)
 */
export interface FuncaoAvaliada {
    nome: string;
    cbo: string;
}

/**
 * Dados do contrato
 */
export interface DadosContrato {
    tipo: TipoContrato;
    // Contratante
    razaoSocial: string;
    cnpj: string;
    endereco: string;
    cidade: string;
    uf: string;
    representante: string;
    // Específicos
    qtdColaboradores: string;
    qtdFuncoes: string;
    qtdTurmas: string;
    qtdAlunos: string;
    qtdPavimentos: string;
    cargaHoraria: string;
    // Treinamentos
    treinamentoNome: string;
    normaReferencia: string;
    conteudoProgramatico: string[];
    // Valores e pagamento
    valor: number;
    formaPagamento: 'avista' | 'parcelado' | 'pos-servico';
    parcelas: ParcelaPagamento[];
    // Prazos
    prazoExecucao: string;
    prazoAviso: string;
    // Data
    dataContrato: string;
    // Funções avaliadas (para anexo)
    funcoes: FuncaoAvaliada[];
    // Itens do escopo customizado
    escopoCustomizado: string[];
    entregaveisCustomizados: string[];
    // Observações adicionais (para tipo integrado)
    servicosIntegrados: string[];
    logoUrl: string;
}

/**
 * Gera a seção de identificação das partes
 */
function gerarIdentificacaoPartes(dados: DadosContrato): string {
    return `
        <p>Pelo presente instrumento particular, as partes abaixo identificadas:</p>
        
        <p><strong>CONTRATANTE:</strong><br>
        ${dados.razaoSocial}, pessoa jurídica de direito privado, inscrita no CNPJ nº ${dados.cnpj}${dados.endereco ? `, com sede ${dados.endereco}, ${dados.cidade}/${dados.uf}` : `, com sede em ${dados.cidade}/${dados.uf}`}, doravante denominada simplesmente CONTRATANTE.</p>
        
        <p><strong>CONTRATADA:</strong><br>
        ENGMARQ SOLUTION LTDA, pessoa jurídica de direito privado, inscrita no CNPJ nº 60.545.359/0001-76, com sede em Natal/RN, neste ato representada por seu Diretor Thiago Marques, doravante denominada CONTRATADA.</p>
        
        <p>As partes resolvem celebrar o presente contrato, que se regerá pelas cláusulas e condições seguintes.</p>
    `;
}

/**
 * Gera cláusula de objeto - Kit SST
 */
function gerarObjetoKitSST(dados: DadosContrato): string {
    return `
        <h3>CLÁUSULA 1 – DO OBJETO</h3>
        <p>1.1. O presente contrato tem por objeto a prestação de serviços técnicos especializados para elaboração integrada dos Programas de Segurança e Saúde do Trabalho, compreendendo:</p>
        <p class="item-lista">a) Programa de Gerenciamento de Riscos – PGR;</p>
        <p class="item-lista">b) Laudo Técnico das Condições Ambientais do Trabalho – LTCAT;</p>
        <p class="item-lista">c) Programa de Controle Médico de Saúde Ocupacional – PCMSO;</p>
        <p>em conformidade com as Normas Regulamentadoras nº 01 e nº 07, legislação previdenciária vigente e demais normas aplicáveis.</p>
        <p>1.2. Os serviços serão executados com base na avaliação das funções exercidas na CONTRATANTE${dados.qtdFuncoes ? `, totalizando ${dados.qtdFuncoes} funções` : ''}${dados.qtdColaboradores ? ` e ${dados.qtdColaboradores} colaboradores` : ''}.</p>
    `;
}

/**
 * Gera cláusula de objeto - Brigada de Incêndio
 */
function gerarObjetoBrigada(dados: DadosContrato): string {
    return `
        <h3>CLÁUSULA 1 – DO OBJETO</h3>
        <p>1.1. O presente contrato tem por objeto a prestação de serviços de Treinamento de Brigada de Incêndio, conforme Instrução Técnica IT 17/2025 do Corpo de Bombeiros Militar do Rio Grande do Norte (CBMRN).</p>
        <p>1.2. O treinamento será realizado para ${dados.qtdAlunos || '30'} (${valorPorExtenso(parseInt(dados.qtdAlunos) || 30).replace(' reais', '').replace(' real', '')}) colaboradores${dados.qtdTurmas ? `, divididos em ${dados.qtdTurmas} turma(s) de até ${Math.ceil((parseInt(dados.qtdAlunos) || 30) / (parseInt(dados.qtdTurmas) || 1))} participantes` : ''}.
        </p>
        
        <h3>CLÁUSULA 2 – DA CARGA HORÁRIA E MODALIDADE</h3>
        <p>2.1. Cada turma terá carga horária de ${dados.cargaHoraria || '04 (quatro) horas'}${dados.qtdTurmas ? `, totalizando ${parseInt(dados.cargaHoraria) * parseInt(dados.qtdTurmas) || '—'} horas de treinamento` : ''}.</p>
        <p>2.2. As datas e horários serão definidos de comum acordo entre as partes.</p>
        
        <h3>CLÁUSULA 3 – DO CONTEÚDO PROGRAMÁTICO</h3>
        <p>3.1. O treinamento contemplará:</p>
        <p class="item-lista">a) Introdução à Brigada de Incêndio;</p>
        <p class="item-lista">b) Ciência do fogo e classes de incêndio;</p>
        <p class="item-lista">c) Métodos de prevenção;</p>
        <p class="item-lista">d) Equipamentos de combate a incêndio;</p>
        <p class="item-lista">e) Procedimentos de emergência e abandono de área;</p>
        <p class="item-lista">f) Noções básicas de primeiros socorros;</p>
        <p class="item-lista">g) Parte prática com simulação de combate a princípio de incêndio.</p>
        <p>3.2. O conteúdo seguirá integralmente as exigências da IT 17/2025 do CBMRN.</p>
    `;
}

/**
 * Gera cláusula de objeto - Treinamentos em SST (genérico)
 */
function gerarObjetoTreinamentos(dados: DadosContrato): string {
    const nomeTreinamento = dados.treinamentoNome || 'Treinamento em Segurança do Trabalho';
    const norma = dados.normaReferencia || 'Normas Regulamentadoras aplicáveis';

    let conteudoHTML = '';
    if (dados.conteudoProgramatico?.length > 0) {
        conteudoHTML = dados.conteudoProgramatico.map((item, i) =>
            `<p class="item-lista">${String.fromCharCode(97 + i)}) ${item};</p>`
        ).join('\n');
    } else {
        conteudoHTML = `
            <p class="item-lista">a) Conteúdo teórico conforme norma aplicável;</p>
            <p class="item-lista">b) Conceitos, definições e responsabilidades;</p>
            <p class="item-lista">c) Identificação de riscos e medidas de controle;</p>
            <p class="item-lista">d) Procedimentos de segurança;</p>
            <p class="item-lista">e) Parte prática (quando aplicável);</p>
            <p class="item-lista">f) Avaliação de conhecimento.</p>
        `;
    }

    return `
        <h3>CLÁUSULA 1 – DO OBJETO</h3>
        <p>1.1. O presente contrato tem por objeto a prestação de serviços de ${nomeTreinamento}, conforme ${norma}.</p>
        <p>1.2. O treinamento será realizado para ${dados.qtdAlunos || '—'} colaboradores${dados.qtdTurmas ? `, divididos em ${dados.qtdTurmas} turma(s)` : ''}.</p>
        
        <h3>CLÁUSULA 2 – DA CARGA HORÁRIA E MODALIDADE</h3>
        <p>2.1. Cada turma terá carga horária de ${dados.cargaHoraria || '—'} horas${dados.qtdTurmas ? `, totalizando ${(parseInt(dados.cargaHoraria) || 0) * (parseInt(dados.qtdTurmas) || 1)} horas de treinamento` : ''}.</p>
        <p>2.2. As datas e horários serão definidos de comum acordo entre as partes.</p>
        
        <h3>CLÁUSULA 3 – DO CONTEÚDO PROGRAMÁTICO</h3>
        <p>3.1. O treinamento contemplará:</p>
        ${conteudoHTML}
        <p>3.2. O conteúdo seguirá as exigências da ${norma}.</p>
    `;
}

/**
 * Gera cláusula de objeto - Tela de Proteção de Fachada
 */
function gerarObjetoTelaFachada(dados: DadosContrato): string {
    return `
        <h3>CLÁUSULA 1 – DO OBJETO</h3>
        <p>1.1. O presente contrato tem por objeto a prestação de serviços técnicos especializados de engenharia, consistentes na elaboração do Projeto Técnico de Implantação de Tela de Proteção de Fachada, classificado como Equipamento de Proteção Coletiva (EPC), para edificação com ${dados.qtdPavimentos || '—'} pavimentos, em conformidade com a Norma Regulamentadora nº 18 (NR-18) e demais normas técnicas aplicáveis.</p>
        <p>1.2. O projeto visa garantir a proteção coletiva contra quedas de pessoas, materiais, ferramentas e detritos, bem como assegurar a conformidade legal e segurança jurídica da obra.</p>
    `;
}

/**
 * Gera cláusula de objeto - Psicossocial
 */
function gerarObjetoPsicossocial(dados: DadosContrato): string {
    return `
        <h3>CLÁUSULA 1 – DO OBJETO</h3>
        <p>1.1. O presente contrato tem por objeto a prestação de serviços técnicos especializados de Avaliação de Riscos Psicossociais Relacionados ao Trabalho, em conformidade com a atualização da Norma Regulamentadora nº 01 (NR-01) e demais legislações aplicáveis.</p>
        <p>1.2. A avaliação abrangerá ${dados.qtdColaboradores || '—'} colaboradores${dados.qtdFuncoes ? ` em ${dados.qtdFuncoes} funções` : ''} da CONTRATANTE.</p>
    `;
}

/**
 * Gera cláusula de objeto - Integrado (serviços combinados)
 */
function gerarObjetoIntegrado(dados: DadosContrato): string {
    const servicos = dados.servicosIntegrados?.length > 0
        ? dados.servicosIntegrados.map((s, i) => `<p class="item-lista">${String.fromCharCode(97 + i)}) ${s};</p>`).join('\n')
        : '<p class="item-lista">a) Serviços conforme escopo definido;</p>';

    return `
        <h3>CLÁUSULA 1 – DO OBJETO</h3>
        <p>1.1. O presente contrato tem por objeto a prestação de serviços técnicos especializados, compreendendo:</p>
        ${servicos}
        <p>em conformidade com as Normas Regulamentadoras e demais legislações aplicáveis.</p>
        <p>1.2. Os serviços serão executados para a CONTRATANTE${dados.qtdColaboradores ? `, contemplando ${dados.qtdColaboradores} colaboradores` : ''}${dados.qtdFuncoes ? ` em ${dados.qtdFuncoes} funções` : ''}.</p>
    `;
}

/**
 * Gera cláusula de escopo
 */
function gerarEscopo(dados: DadosContrato): string {
    let escopoItems = '';

    if (dados.tipo === 'kit-sst') {
        escopoItems = `
            <p class="item-lista">2.1.1. Visita técnica às instalações da CONTRATANTE;</p>
            <p class="item-lista">2.1.2. Identificação e avaliação dos riscos ocupacionais por função;</p>
            <p class="item-lista">2.1.3. Elaboração do Inventário de Riscos e Plano de Ação (PGR);</p>
            <p class="item-lista">2.1.4. Elaboração do LTCAT com caracterização de exposição a agentes nocivos;</p>
            <p class="item-lista">2.1.5. Elaboração do PCMSO com definição de exames ocupacionais por função;</p>
            <p class="item-lista">2.1.6. Integração técnica entre PGR, LTCAT e PCMSO;</p>
            <p class="item-lista">2.1.7. Orientação técnica para atendimento ao eSocial, especialmente eventos S-2220 e S-2240;</p>
            <p class="item-lista">2.1.8. Análise dos riscos considerando atividades, ambientes, processos de trabalho e exposição ocupacional, por função.</p>
        `;
    } else if (dados.tipo === 'tela-fachada') {
        escopoItems = `
            <p class="item-lista">2.1.1. Análise das condições da edificação e definição do sistema de proteção;</p>
            <p class="item-lista">2.1.2. Dimensionamento técnico do sistema de tela de proteção;</p>
            <p class="item-lista">2.1.3. Definição de ancoragens, fixações e pontos de sustentação;</p>
            <p class="item-lista">2.1.4. Especificação dos materiais e componentes;</p>
            <p class="item-lista">2.1.5. Detalhamento construtivo do sistema;</p>
            <p class="item-lista">2.1.6. Procedimentos técnicos para instalação, inspeção, manutenção e desmontagem;</p>
            <p class="item-lista">2.1.7. Orientações técnicas para instalação, uso, inspeção, manutenção e desmontagem;</p>
            <p class="item-lista">2.1.8. Emissão de Anotação de Responsabilidade Técnica (ART) junto ao CREA, quando aplicável.</p>
        `;
    } else if (dados.tipo === 'psicossocial') {
        escopoItems = `
            <p class="item-lista">2.1.1. Aplicação de instrumentos validados de avaliação psicossocial;</p>
            <p class="item-lista">2.1.2. Análise quantitativa e qualitativa dos fatores de risco;</p>
            <p class="item-lista">2.1.3. Mapeamento dos riscos psicossociais por setor e função;</p>
            <p class="item-lista">2.1.4. Classificação dos riscos por grau de criticidade;</p>
            <p class="item-lista">2.1.5. Elaboração de relatório técnico com diagnóstico organizacional;</p>
            <p class="item-lista">2.1.6. Plano de ação preventivo e corretivo;</p>
            <p class="item-lista">2.1.7. Orientações para integração com o PGR da empresa.</p>
        `;
    } else if (dados.tipo === 'integrado' && dados.escopoCustomizado?.length > 0) {
        escopoItems = dados.escopoCustomizado.map((item, i) =>
            `<p class="item-lista">2.1.${i + 1}. ${item};</p>`
        ).join('\n');
    } else {
        escopoItems = `
            <p class="item-lista">2.1.1. Execução dos serviços conforme escopo definido na cláusula anterior;</p>
            <p class="item-lista">2.1.2. Elaboração da documentação técnica pertinente;</p>
            <p class="item-lista">2.1.3. Orientação técnica para conformidade legal.</p>
        `;
    }

    // Para brigada e treinamentos, o escopo fica dentro do objeto (cláusulas 2 e 3)
    if (dados.tipo === 'brigada' || dados.tipo === 'treinamentos') {
        return '';
    }

    return `
        <h3>CLÁUSULA 2 – DO ESCOPO DOS SERVIÇOS</h3>
        <p>2.1. Constituem atividades compreendidas neste contrato:</p>
        ${escopoItems}
    `;
}

/**
 * Gera cláusula de entregáveis
 */
function gerarEntregaveis(dados: DadosContrato): string {
    let clausulaNum = (dados.tipo === 'brigada' || dados.tipo === 'treinamentos') ? '4' : '3';
    let items = '';

    if (dados.tipo === 'treinamentos') {
        items = `
            <p class="item-lista">${clausulaNum}.1.1. Instrutor habilitado e qualificado;</p>
            <p class="item-lista">${clausulaNum}.1.2. Material didático expositivo;</p>
            <p class="item-lista">${clausulaNum}.1.3. Lista de presença;</p>
            <p class="item-lista">${clausulaNum}.1.4. ${dados.qtdAlunos || '—'} certificados digitais;</p>
            <p class="item-lista">${clausulaNum}.1.5. Registro da capacitação para fins de auditoria e fiscalização.</p>
        `;
    } else if (dados.tipo === 'kit-sst') {
        items = `
            <p class="item-lista">${clausulaNum}.1.1. Programa de Gerenciamento de Riscos – PGR;</p>
            <p class="item-lista">${clausulaNum}.1.2. Laudo Técnico das Condições Ambientais do Trabalho – LTCAT;</p>
            <p class="item-lista">${clausulaNum}.1.3. Programa de Controle Médico de Saúde Ocupacional – PCMSO;</p>
            <p class="item-lista">${clausulaNum}.1.4. Matriz de riscos ocupacionais por função;</p>
            <p class="item-lista">${clausulaNum}.1.5. Plano de ação preventivo e corretivo.</p>
        `;
    } else if (dados.tipo === 'brigada') {
        items = `
            <p class="item-lista">${clausulaNum}.1.1. Instrutor habilitado;</p>
            <p class="item-lista">${clausulaNum}.1.2. Material didático expositivo;</p>
            <p class="item-lista">${clausulaNum}.1.3. Lista de presença;</p>
            <p class="item-lista">${clausulaNum}.1.4. ${dados.qtdAlunos || '—'} certificados digitais;</p>
            <p class="item-lista">${clausulaNum}.1.5. Registro da capacitação para fins de auditoria e fiscalização.</p>
        `;
    } else if (dados.tipo === 'tela-fachada') {
        items = `
            <p class="item-lista">${clausulaNum}.1.1. Memorial Técnico Descritivo do Sistema de Tela de Proteção de Fachada;</p>
            <p class="item-lista">${clausulaNum}.1.2. Projeto Técnico com plantas, cortes e detalhamentos construtivos;</p>
            <p class="item-lista">${clausulaNum}.1.3. Procedimentos técnicos para instalação, inspeção, manutenção e desmontagem;</p>
            <p class="item-lista">${clausulaNum}.1.4. Análise dos riscos associados à fachada;</p>
            <p class="item-lista">${clausulaNum}.1.5. ART registrada no CREA, vinculada exclusivamente ao projeto contratado.</p>
        `;
    } else if (dados.tipo === 'psicossocial') {
        items = `
            <p class="item-lista">${clausulaNum}.1.1. Relatório Técnico de Avaliação de Riscos Psicossociais;</p>
            <p class="item-lista">${clausulaNum}.1.2. Plano de Ação Preventivo e Corretivo;</p>
            <p class="item-lista">${clausulaNum}.1.3. Matriz de riscos psicossociais por setor e função;</p>
            <p class="item-lista">${clausulaNum}.1.4. Orientações para integração com o PGR.</p>
        `;
    } else if (dados.entregaveisCustomizados?.length > 0) {
        items = dados.entregaveisCustomizados.map((item, i) =>
            `<p class="item-lista">${clausulaNum}.1.${i + 1}. ${item};</p>`
        ).join('\n');
    } else {
        items = `
            <p class="item-lista">${clausulaNum}.1.1. Documentação técnica conforme escopo contratado;</p>
            <p class="item-lista">${clausulaNum}.1.2. Relatório técnico dos serviços executados.</p>
        `;
    }

    return `
        <h3>CLÁUSULA ${clausulaNum} – DOS ENTREGÁVEIS</h3>
        <p>${clausulaNum}.1. A CONTRATADA entregará à CONTRATANTE os seguintes documentos/serviços:</p>
        ${items}
    `;
}

/**
 * Gera cláusula de prazo
 */
function gerarPrazo(dados: DadosContrato): string {
    const isTreinamento = dados.tipo === 'brigada' || dados.tipo === 'treinamentos';
    const clausulaNum = isTreinamento ? '5' : '4';
    const prazo = dados.prazoExecucao || '20 (vinte) dias úteis';

    if (isTreinamento) {
        return `
            <h3>CLÁUSULA ${clausulaNum} – DO INÍCIO DA EXECUÇÃO</h3>
            <p>${clausulaNum}.1. A execução do treinamento terá início após a formalização contratual e definição das datas entre as partes.</p>
        `;
    }

    return `
        <h3>CLÁUSULA ${clausulaNum} – DO PRAZO DE EXECUÇÃO</h3>
        <p>${clausulaNum}.1. A execução dos serviços terá início após a confirmação do pagamento inicial.</p>
        <p>${clausulaNum}.2. O prazo estimado para conclusão dos serviços é de até ${prazo}.</p>
        <p>${clausulaNum}.3. As partes reconhecem que o cronograma depende da disponibilidade de agenda da CONTRATADA e da CONTRATANTE, especialmente para realização da visita técnica e acesso às informações e colaboradores.</p>
        <p>${clausulaNum}.4. Eventuais ajustes no prazo, decorrentes de imprevistos operacionais, limitações de agenda ou necessidade de reprogramação consensual, não caracterizam inadimplemento, permanecendo como objetivo das partes a conclusão dos serviços no menor prazo possível.</p>
    `;
}

/**
 * Gera cláusula de obrigações
 */
function gerarObrigacoes(dados: DadosContrato): string {
    const isTreinamento = dados.tipo === 'brigada' || dados.tipo === 'treinamentos';
    const clausulaNum = isTreinamento ? '6' : '5';

    let obrigacoesContratada = '';
    let obrigacoesContratante = '';

    if (isTreinamento) {
        obrigacoesContratada = `
            <p class="item-lista">a) Ministrar o treinamento conforme normas vigentes;</p>
            <p class="item-lista">b) Disponibilizar profissional habilitado;</p>
            <p class="item-lista">c) Emitir Nota Fiscal de Serviço;</p>
            <p class="item-lista">d) Entregar os certificados e documentação.</p>
        `;
        obrigacoesContratante = `
            <p class="item-lista">a) Disponibilizar espaço adequado para parte teórica;</p>
            <p class="item-lista">b) Disponibilizar área segura para parte prática;</p>
            <p class="item-lista">c) Disponibilizar extintores e materiais necessários à simulação;</p>
            <p class="item-lista">d) Garantir a presença dos colaboradores inscritos.</p>
        `;
    } else if (dados.tipo === 'tela-fachada') {
        obrigacoesContratada = `
            <p class="item-lista">a) Executar os serviços conforme as normas técnicas, legais e boas práticas de engenharia;</p>
            <p class="item-lista">b) Utilizar profissional legalmente habilitado, com registro ativo no CREA;</p>
            <p class="item-lista">c) Assumir integral responsabilidade técnica pelo projeto elaborado;</p>
            <p class="item-lista">d) Entregar a documentação técnica conforme escopo contratado.</p>
        `;
        obrigacoesContratante = `
            <p class="item-lista">a) Fornecer todas as informações técnicas necessárias à elaboração do projeto;</p>
            <p class="item-lista">b) Disponibilizar acesso à obra para eventuais vistorias;</p>
            <p class="item-lista">c) Apoiar a organização das agendas e atividades técnicas.</p>
        `;
    } else {
        obrigacoesContratada = `
            <p class="item-lista">a) Executar os serviços com competência técnica e em conformidade com as normas vigentes;</p>
            <p class="item-lista">b) Manter sigilo sobre as informações da CONTRATANTE;</p>
            <p class="item-lista">c) Entregar a documentação técnica no prazo acordado;</p>
            <p class="item-lista">d) Emitir Nota Fiscal de Serviço.</p>
        `;
        obrigacoesContratante = `
            <p class="item-lista">a) Fornecer informações e documentos necessários;</p>
            <p class="item-lista">b) Disponibilizar acesso aos ambientes e colaboradores;</p>
            <p class="item-lista">c) Apoiar a organização das agendas e atividades técnicas.</p>
        `;
    }

    return `
        <h3>CLÁUSULA ${clausulaNum} – DAS OBRIGAÇÕES DAS PARTES</h3>
        <p>${clausulaNum}.1. Obrigações da CONTRATADA:</p>
        ${obrigacoesContratada}
        <p>${clausulaNum}.2. Obrigações da CONTRATANTE:</p>
        ${obrigacoesContratante}
    `;
}

/**
 * Gera cláusula de valor e pagamento
 */
function gerarValorPagamento(dados: DadosContrato): string {
    const isTreinamento = dados.tipo === 'brigada' || dados.tipo === 'treinamentos';
    const clausulaNum = isTreinamento ? '7' : '6';
    const valorExtenso = valorPorExtenso(dados.valor);

    let formaPagamentoHTML = '';

    if (dados.formaPagamento === 'avista') {
        formaPagamentoHTML = `
            <p>${clausulaNum}.2. O pagamento será realizado à vista, no ato da aprovação do contrato.</p>
        `;
    } else if (dados.formaPagamento === 'pos-servico') {
        formaPagamentoHTML = `
            <p>${clausulaNum}.2. O pagamento será realizado em parcela única, em até 30 (trinta) dias após a emissão da Nota Fiscal de Serviço.</p>
        `;
    } else if (dados.parcelas?.length > 0) {
        const parcelasHTML = dados.parcelas.map((p, i) =>
            `<p class="item-lista">${String.fromCharCode(97 + i)}) ${p.percentual}% (${valorPorExtenso(p.percentual).replace(' reais', '').replace(' real', '')} por cento) ${p.descricao}.</p>`
        ).join('\n');

        formaPagamentoHTML = `
            <p>${clausulaNum}.2. O pagamento será realizado da seguinte forma:</p>
            ${parcelasHTML}
        `;
    } else {
        formaPagamentoHTML = `
            <p>${clausulaNum}.2. O pagamento será realizado da seguinte forma:</p>
            <p class="item-lista">a) 50% (cinquenta por cento) na aprovação do contrato;</p>
            <p class="item-lista">b) 50% (cinquenta por cento) na entrega dos documentos finais.</p>
        `;
    }

    return `
        <h3>CLÁUSULA ${clausulaNum} – DO PREÇO E DAS CONDIÇÕES DE PAGAMENTO</h3>
        <p>${clausulaNum}.1. O valor global do presente contrato é de R$ ${formatMoeda(dados.valor)} (${valorExtenso}).</p>
        ${formaPagamentoHTML}
        <p>${clausulaNum}.3. O pagamento poderá ser efetuado via PIX ou depósito/transferência bancária.</p>
        
        <div class="dados-bancarios">
            <p><strong>Dados bancários da CONTRATADA:</strong></p>
            <p>Banco: 748 – Banco Cooperativo Sicredi S.A.</p>
            <p>Agência: 2207</p>
            <p>Conta Corrente: 65447-7</p>
            <p>Razão Social: ENGMARQ SOLUTION LTDA</p>
            <p>CNPJ: 60.545.359/0001-76</p>
            <p>Chave PIX: CNPJ da CONTRATADA</p>
        </div>
    `;
}

/**
 * Gera cláusulas finais (inadimplemento, responsabilidade, confidencialidade, rescisão, foro)
 */
function gerarClausulasFinais(dados: DadosContrato): string {
    const isTreinamento = dados.tipo === 'brigada' || dados.tipo === 'treinamentos';
    const baseNum = isTreinamento ? 8 : 7;

    let inadimplementoHTML = `
        <h3>CLÁUSULA ${baseNum} – DO INADIMPLEMENTO</h3>
        <p>${baseNum}.1. O inadimplemento financeiro autoriza a suspensão imediata dos serviços até a regularização.</p>
        <p>${baseNum}.2. Incidirá multa de 2% (dois por cento) sobre o valor devido, além de juros de 1% (um por cento) ao mês.</p>
    `;

    let responsabilidadeHTML = '';
    if (dados.tipo === 'tela-fachada') {
        responsabilidadeHTML = `
            <h3>CLÁUSULA ${baseNum + 1} – DA RESPONSABILIDADE TÉCNICA</h3>
            <p>${baseNum + 1}.1. A responsabilidade da CONTRATADA limita-se exclusivamente à elaboração do projeto técnico.</p>
            <p>${baseNum + 1}.2. A execução, montagem, instalação e manutenção da tela de proteção de fachada são de inteira responsabilidade da empresa executora da obra.</p>
        `;
    } else {
        responsabilidadeHTML = `
            <h3>CLÁUSULA ${baseNum + 1} – DA RESPONSABILIDADE TÉCNICA</h3>
            <p>${baseNum + 1}.1. A responsabilidade da CONTRATADA limita-se à elaboração técnica, análise e recomendações, não abrangendo a implementação prática das ações sugeridas.</p>
        `;
    }

    return `
        ${inadimplementoHTML}
        
        ${responsabilidadeHTML}
        
        <h3>CLÁUSULA ${baseNum + 2} – DA CONFIDENCIALIDADE E PROPRIEDADE INTELECTUAL</h3>
        <p>${baseNum + 2}.1. As informações coletadas são estritamente confidenciais.</p>
        <p>${baseNum + 2}.2. Os documentos técnicos produzidos são de propriedade intelectual da CONTRATADA, sendo vedada a reprodução, cessão ou utilização para fins diversos do objeto deste contrato sem autorização expressa.</p>
        
        <h3>CLÁUSULA ${baseNum + 3} – DA RESCISÃO</h3>
        <p>${baseNum + 3}.1. O presente contrato poderá ser rescindido por qualquer das partes mediante aviso prévio de ${dados.prazoAviso || '15 (quinze)'} dias.</p>
        
        <h3>CLÁUSULA ${baseNum + 4} – DO FORO</h3>
        <p>${baseNum + 4}.1. Fica eleito o foro da Comarca de Natal/RN, com renúncia expressa a qualquer outro.</p>
    `;
}

/**
 * Gera o Anexo II - Relação de Funções Avaliadas
 */
function gerarAnexoFuncoes(dados: DadosContrato): string {
    if (!dados.funcoes || dados.funcoes.length === 0) {
        return '';
    }

    const linhasFuncoes = dados.funcoes.map((f, i) => `
        <tr>
            <td style="text-align: center; padding: 6px 10px; border: 1px solid #ccc; font-size: 11px;">${i + 1}</td>
            <td style="padding: 6px 10px; border: 1px solid #ccc; font-size: 11px;">${f.nome}</td>
            <td style="text-align: center; padding: 6px 10px; border: 1px solid #ccc; font-size: 11px;">${f.cbo || '—'}</td>
        </tr>
    `).join('');

    return `
        <div class="page page-anexo">
            <h2 style="text-align: center; font-size: 14px; margin-bottom: 15px; color: #1a365d;">ANEXO II – RELAÇÃO DE FUNÇÕES AVALIADAS</h2>
            <p style="font-size: 11px; margin-bottom: 15px; text-align: justify;">O presente anexo contempla a relação das funções utilizadas como base técnica para a elaboração dos documentos, em conformidade com as Normas Regulamentadoras aplicáveis e demais legislações pertinentes.</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                    <tr style="background: #1a365d; color: white;">
                        <th style="padding: 8px 10px; text-align: center; font-size: 11px; width: 50px;">Nº</th>
                        <th style="padding: 8px 10px; text-align: left; font-size: 11px;">Função</th>
                        <th style="padding: 8px 10px; text-align: center; font-size: 11px; width: 100px;">CBO</th>
                    </tr>
                </thead>
                <tbody>
                    ${linhasFuncoes}
                </tbody>
            </table>
        </div>
    `;
}

/**
 * Retorna o título do contrato baseado no tipo
 */
function getTituloContrato(dados: DadosContrato): string {
    switch (dados.tipo) {
        case 'kit-sst':
            return 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE ENGENHARIA DE SEGURANÇA E SAÚDE DO TRABALHO<br><span style="font-size: 13px; font-weight: 600;">KIT INTEGRADO DE PROGRAMAS DE SST – PGR, LTCAT E PCMSO</span>';
        case 'brigada':
            return 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS<br><span style="font-size: 13px; font-weight: 600;">TREINAMENTO DE BRIGADA DE INCÊNDIO</span>';
        case 'treinamentos':
            return `CONTRATO DE PRESTAÇÃO DE SERVIÇOS<br><span style="font-size: 13px; font-weight: 600;">${(dados as any).treinamentoNome?.toUpperCase() || 'TREINAMENTO EM SEGURANÇA DO TRABALHO'}</span>`;
        case 'tela-fachada':
            return 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE ENGENHARIA<br><span style="font-size: 13px; font-weight: 600;">PROJETO TÉCNICO DE IMPLANTAÇÃO DE TELA DE PROTEÇÃO DE FACHADA (EPC – NR 18)</span>';
        case 'psicossocial':
            return 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS<br><span style="font-size: 13px; font-weight: 600;">AVALIAÇÃO DE RISCOS PSICOSSOCIAIS RELACIONADOS AO TRABALHO</span>';
        case 'integrado':
            return 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE ENGENHARIA DE SEGURANÇA E SAÚDE DO TRABALHO<br><span style="font-size: 13px; font-weight: 600;">SERVIÇOS INTEGRADOS DE SST</span>';
        default:
            return 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS';
    }
}

/**
 * Gera a cláusula de objeto conforme o tipo de contrato
 */
function gerarObjeto(dados: DadosContrato): string {
    switch (dados.tipo) {
        case 'kit-sst': return gerarObjetoKitSST(dados);
        case 'brigada': return gerarObjetoBrigada(dados);
        case 'treinamentos': return gerarObjetoTreinamentos(dados);
        case 'tela-fachada': return gerarObjetoTelaFachada(dados);
        case 'psicossocial': return gerarObjetoPsicossocial(dados);
        case 'integrado': return gerarObjetoIntegrado(dados);
        default: return gerarObjetoKitSST(dados);
    }
}

/**
 * Gera o HTML completo do contrato
 */
export function getTemplateContrato(dados: DadosContrato): string {
    const titulo = getTituloContrato(dados);

    return `
        <!-- ====== CONTRATO ====== -->
        <div class="page">
            <div class="contrato-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="contrato-logo">
            </div>
            
            <h2 class="contrato-titulo">${titulo}</h2>
            
            ${gerarIdentificacaoPartes(dados)}
            
            ${gerarObjeto(dados)}
            
            ${gerarEscopo(dados)}
            
            ${gerarEntregaveis(dados)}
        </div>
        
        <div class="page">
            <div class="contrato-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="contrato-logo">
            </div>
            
            ${gerarPrazo(dados)}
            
            ${gerarObrigacoes(dados)}
            
            ${gerarValorPagamento(dados)}
        </div>
        
        <div class="page">
            <div class="contrato-header">
                <img src="${dados.logoUrl}" alt="EngMarq Solution" class="contrato-logo">
            </div>
            
            ${gerarClausulasFinais(dados)}
            
            <div class="contrato-assinaturas">
                <p class="contrato-local-data">Natal/RN, ${dados.dataContrato}.</p>
                
                <div class="assinatura-bloco">
                    <p class="assinatura-label">CONTRATANTE:</p>
                    <div class="assinatura-linha"></div>
                    <p class="assinatura-nome">${dados.razaoSocial}</p>
                    ${dados.representante ? `<p class="assinatura-cargo">${dados.representante}</p>` : ''}
                </div>
                
                <div class="assinatura-bloco">
                    <p class="assinatura-label">CONTRATADA:</p>
                    <div class="assinatura-linha"></div>
                    <p class="assinatura-nome">ENGMARQ SOLUTION LTDA</p>
                    <p class="assinatura-cargo">Thiago Marques – Diretor</p>
                </div>
            </div>
        </div>
        
        ${gerarAnexoFuncoes(dados)}
    `;
}
