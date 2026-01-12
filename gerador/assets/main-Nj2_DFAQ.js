(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const u={brigada:{icon:"fa-fire",badge:"Treinamento Especializado",titleTop:"TREINAMENTO",titleMain:"BRIGADA DE INCÊNDIO",subtitle:"Capacitação teórica e prática conforme Instrução Técnica IT 17/2025 do Corpo de Bombeiros Militar do RN (CBMRN)",color:"#dd6b20",headerTitle:"Proposta Comercial - Brigada de Incêndio"},plataforma:{icon:"fa-layer-group",badge:"Projeto Técnico – EPC",titleTop:"ELABORAÇÃO DE PROJETO",titleMain:"PLATAFORMA SECUNDÁRIA",subtitle:"Equipamento de Proteção Coletiva (EPC) conforme NR 18 – Condições e Meio Ambiente de Trabalho na Indústria da Construção",color:"#4a5568",headerTitle:"Proposta Comercial - Plataforma Secundária"},psicossocial:{icon:"fa-brain",badge:"Avaliação Técnica – NR-01",titleTop:"AVALIAÇÃO DE",titleMain:"RISCOS PSICOSSOCIAIS",subtitle:"Avaliação dos Fatores de Riscos Psicossociais relacionados ao trabalho conforme atualização da NR-01",color:"#805ad5",headerTitle:"Proposta Comercial - Riscos Psicossociais"}};function E(a){return a==="brigada"||a==="plataforma"||a==="psicossocial"}function p(a){return a.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2})}function b(a){if(!a)return"";const s=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],[t,n,i]=a.split("-");return`${parseInt(i)} de ${s[parseInt(n)-1]} de ${t}`}function f(a){const s=["","um","dois","três","quatro","cinco","seis","sete","oito","nove","dez","onze","doze","treze","quatorze","quinze","dezesseis","dezessete","dezoito","dezenove"],t=["","","vinte","trinta","quarenta","cinquenta","sessenta","setenta","oitenta","noventa"],n=["","cento","duzentos","trezentos","quatrocentos","quinhentos","seiscentos","setecentos","oitocentos","novecentos"];if(a===0)return"zero reais";if(a===100)return"cem reais";const i=Math.floor(a),o=Math.round((a-i)*100);let r="";if(i>=1e3){const c=Math.floor(i/1e3);c===1?r+="mil":c<20?r+=s[c]+" mil":r+=t[Math.floor(c/10)]+(c%10?" e "+s[c%10]:"")+" mil",i%1e3>0&&(r+=" ")}const l=i%1e3;l>=100&&(l===100?r+="cem":r+=n[Math.floor(l/100)],l%100>0&&(r+=" e "));const d=l%100;return d>0&&(d<20?r+=s[d]:r+=t[Math.floor(d/10)]+(d%10?" e "+s[d%10]:"")),r+=i===1?" real":" reais",o>0&&(r+=" e ",o<20?r+=s[o]:r+=t[Math.floor(o/10)]+(o%10?" e "+s[o%10]:""),r+=o===1?" centavo":" centavos"),r}function h(a){return parseFloat(a.replace(/\./g,"").replace(",","."))||0}function x(a,s){return a-a*s/100}function q(){return`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
            --primary-color: #1a365d;
            --secondary-color: #f5a623;
            --dark-color: #2d3748;
            --gray-color: #718096;
            --light-color: #f7fafc;
            --white-color: #ffffff;
            --success-color: #38a169;
            --alert-color: #e53e3e;
            --fire-color: #dd6b20;
            --font-primary: 'Montserrat', sans-serif;
            --font-secondary: 'Open Sans', sans-serif;
        }
        body { font-family: var(--font-secondary); color: var(--dark-color); line-height: 1.6; background: #e2e8f0; }
        
        .pdf-controls { position: fixed; top: 20px; right: 20px; z-index: 1000; background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 25px rgba(0,0,0,0.15); max-width: 280px; }
        .btn-generate { background: var(--primary-color); color: white; padding: 15px 30px; border: none; border-radius: 8px; font-family: var(--font-primary); font-weight: 600; font-size: 15px; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: all 0.3s ease; width: 100%; justify-content: center; }
        .btn-generate:hover { background: var(--fire-color); transform: translateY(-2px); box-shadow: 0 4px 15px rgba(221, 107, 32, 0.4); }
        .pdf-instructions { margin-top: 15px; padding: 15px; background: #fffaf0; border-radius: 8px; border-left: 4px solid var(--fire-color); }
        .pdf-instructions h4 { font-family: var(--font-primary); font-size: 13px; color: var(--fire-color); margin-bottom: 8px; }
        .pdf-instructions ol { font-size: 12px; line-height: 1.6; color: var(--dark-color); padding-left: 18px; margin: 0; }
        
        #pdf-content { width: 210mm; margin: 0 auto; background: white; box-shadow: 0 0 30px rgba(0,0,0,0.1); }
        
        .page { width: 210mm; height: 297mm; min-height: 297mm; max-height: 297mm; padding: 15mm 15mm 22mm 15mm; page-break-after: always; position: relative; background: var(--white-color); box-sizing: border-box; }
        .page:last-child { page-break-after: auto; }
        
        .page-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; margin-bottom: 18px; border-bottom: 2px solid var(--light-color); }
        .page-header-logo { height: 40px; }
        .page-header-title { font-family: var(--font-primary); font-size: 11px; color: var(--gray-color); text-transform: uppercase; letter-spacing: 1px; }
        
        .page-footer { position: absolute; bottom: 15mm; left: 15mm; right: 15mm; display: flex; justify-content: space-between; align-items: center; padding-top: 8px; border-top: 1px solid var(--light-color); font-size: 10px; color: var(--gray-color); background: white; z-index: 10; }
        .page-number { font-weight: 600; color: var(--primary-color); }
        
        .page-cover { background: linear-gradient(160deg, #1a365d 0%, #234876 40%, #1a365d 70%, #0f2744 100%); color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 25mm 20mm; position: relative; overflow: hidden; }
        .page-cover::before { content: ''; position: absolute; top: -50%; right: -30%; width: 80%; height: 200%; background: radial-gradient(ellipse, rgba(221, 107, 32, 0.15) 0%, transparent 60%); pointer-events: none; }
        .cover-logo { width: 180px; margin-bottom: 30px; filter: brightness(0) invert(1); position: relative; z-index: 1; }
        .cover-badge { background: rgba(221, 107, 32, 0.9); color: white; padding: 10px 25px; border-radius: 20px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; position: relative; z-index: 1; }
        .cover-icon { width: 70px; height: 70px; background: rgba(221, 107, 32, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; position: relative; z-index: 1; }
        .cover-icon i { font-size: 32px; color: var(--fire-color); }
        .cover-title { font-family: var(--font-primary); font-size: 28px; font-weight: 800; margin-bottom: 15px; line-height: 1.25; position: relative; z-index: 1; }
        .cover-title span { color: var(--fire-color); display: block; }
        .cover-subtitle { font-size: 14px; font-weight: 300; margin-bottom: 30px; opacity: 0.95; max-width: 450px; margin-left: auto; margin-right: auto; position: relative; z-index: 1; line-height: 1.5; }
        .cover-client { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 18px 35px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2); position: relative; z-index: 1; margin: 0 auto; max-width: 380px; }
        .cover-client-label { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.8; margin-bottom: 6px; text-align: center; }
        .cover-client-name { font-family: var(--font-primary); font-size: 18px; font-weight: 700; color: var(--fire-color); text-align: center; }
        .cover-date { margin-top: 25px; font-size: 12px; opacity: 0.8; position: relative; z-index: 1; }
        .cover-footer { position: absolute; bottom: 18mm; left: 0; right: 0; text-align: center; font-size: 10px; opacity: 0.7; padding: 0 18mm; }
        
        .section-number { display: inline-block; background: var(--fire-color); color: white; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-family: var(--font-primary); font-weight: 700; font-size: 13px; margin-right: 10px; }
        .section-title { font-family: var(--font-primary); font-size: 18px; font-weight: 700; color: var(--primary-color); margin-bottom: 14px; display: flex; align-items: center; padding-bottom: 10px; border-bottom: 3px solid var(--fire-color); }
        .section-title-text { flex: 1; }
        .subsection-title { font-family: var(--font-primary); font-size: 13px; font-weight: 700; color: var(--primary-color); margin: 14px 0 10px; display: flex; align-items: center; gap: 8px; }
        .subsection-title i { color: var(--fire-color); }
        
        p { margin-bottom: 10px; text-align: justify; font-size: 11px; line-height: 1.55; }
        
        .alert-box { background: linear-gradient(135deg, #fffaf0 0%, #feebc8 100%); border-left: 4px solid var(--fire-color); padding: 12px 14px; margin: 12px 0; border-radius: 0 8px 8px 0; }
        .alert-box h4 { font-family: var(--font-primary); font-size: 12px; color: var(--fire-color); margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
        .alert-box p { margin-bottom: 0; color: var(--dark-color); font-size: 10px; line-height: 1.45; }
        
        .highlight-box { background: linear-gradient(135deg, #fef5e7 0%, #fdebd0 100%); border-left: 4px solid var(--secondary-color); padding: 12px 14px; margin: 12px 0; border-radius: 0 8px 8px 0; }
        .highlight-box p { margin-bottom: 0; color: var(--dark-color); font-size: 11px; line-height: 1.45; }
        .highlight-box strong { color: var(--primary-color); }
        
        .info-box { background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); border-left: 4px solid var(--primary-color); padding: 12px 14px; margin: 12px 0; border-radius: 0 8px 8px 0; }
        .info-box h4 { font-family: var(--font-primary); font-size: 12px; color: var(--primary-color); margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
        .info-box p { margin-bottom: 0; font-size: 11px; line-height: 1.45; }
        
        .fire-box { background: linear-gradient(135deg, #fffaf0 0%, #fed7aa 100%); border-left: 4px solid var(--fire-color); padding: 12px 14px; margin: 12px 0; border-radius: 0 8px 8px 0; }
        .fire-box h4 { font-family: var(--font-primary); font-size: 12px; color: var(--fire-color); margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
        .fire-box p { margin-bottom: 0; font-size: 11px; line-height: 1.45; }
        
        .feature-list { list-style: none; margin: 12px 0; }
        .feature-list li { padding: 6px 0 6px 24px; position: relative; font-size: 11px; border-bottom: 1px solid var(--light-color); }
        .feature-list li:last-child { border-bottom: none; }
        .feature-list li::before { content: '\\f00c'; font-family: 'Font Awesome 6 Free'; font-weight: 900; position: absolute; left: 0; color: var(--success-color); font-size: 10px; }
        
        .fire-list { list-style: none; margin: 12px 0; }
        .fire-list li { padding: 6px 0 6px 24px; position: relative; font-size: 11px; border-bottom: 1px solid var(--light-color); }
        .fire-list li:last-child { border-bottom: none; }
        .fire-list li::before { content: '\\f06d'; font-family: 'Font Awesome 6 Free'; font-weight: 900; position: absolute; left: 0; color: var(--fire-color); font-size: 10px; }
        
        .content-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 12px 0; }
        .content-card { background: var(--light-color); padding: 10px 12px; border-radius: 8px; border-left: 3px solid var(--fire-color); }
        .content-card h4 { font-family: var(--font-primary); font-size: 11px; color: var(--primary-color); margin-bottom: 4px; display: flex; align-items: center; gap: 6px; }
        .content-card h4 i { color: var(--fire-color); font-size: 12px; }
        .content-card p { font-size: 10px; margin-bottom: 0; line-height: 1.4; }
        
        .deliverables-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 12px 0; }
        .deliverable-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px; background: var(--light-color); border-radius: 8px; }
        .deliverable-icon { width: 28px; height: 28px; background: var(--fire-color); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; flex-shrink: 0; }
        .deliverable-text h4 { font-family: var(--font-primary); font-size: 10px; color: var(--primary-color); margin-bottom: 2px; }
        .deliverable-text p { font-size: 9px; margin-bottom: 0; line-height: 1.35; }
        
        .carga-horaria { display: flex; gap: 15px; margin: 15px 0; }
        .carga-item { flex: 1; background: var(--light-color); padding: 15px; border-radius: 10px; text-align: center; border-top: 4px solid var(--fire-color); }
        .carga-item i { font-size: 24px; color: var(--fire-color); margin-bottom: 8px; }
        .carga-item h4 { font-family: var(--font-primary); font-size: 12px; color: var(--primary-color); margin-bottom: 4px; }
        .carga-item p { font-size: 10px; margin: 0; color: var(--gray-color); }
        .carga-total { background: linear-gradient(135deg, var(--primary-color) 0%, #0f2744 100%); color: white; padding: 15px 20px; border-radius: 10px; text-align: center; margin: 15px 0; }
        .carga-total h3 { font-family: var(--font-primary); font-size: 14px; margin-bottom: 5px; }
        .carga-total p { font-size: 28px; font-weight: 800; color: var(--fire-color); margin: 0; }
        
        .company-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
        .company-info-item { padding: 10px 12px; background: var(--light-color); border-radius: 8px; border-left: 3px solid var(--fire-color); }
        .company-info-item label { font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: var(--gray-color); font-weight: 600; display: block; margin-bottom: 3px; }
        .company-info-item span { font-size: 11px; color: var(--dark-color); font-weight: 500; }
        
        .responsible-card { background: linear-gradient(135deg, var(--primary-color) 0%, #0f2744 100%); padding: 20px; border-radius: 12px; color: white; text-align: center; margin: 15px 0; display: flex; flex-direction: column; align-items: center; }
        .responsible-avatar { width: 60px; height: 60px; background: rgba(221, 107, 32, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-size: 26px; color: var(--fire-color); border: 2px solid var(--fire-color); }
        .responsible-name { font-family: var(--font-primary); font-size: 16px; font-weight: 700; margin-bottom: 3px; text-align: center; width: 100%; }
        .responsible-role { font-size: 11px; opacity: 0.9; margin-bottom: 3px; text-align: center; width: 100%; }
        .responsible-company { font-size: 10px; opacity: 0.8; margin-bottom: 12px; text-align: center; width: 100%; }
        .responsible-contacts { display: flex; flex-direction: column; gap: 6px; align-items: center; width: 100%; }
        .responsible-contact-item { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 10px; width: 100%; }
        .responsible-contact-item i { color: var(--fire-color); width: 15px; text-align: center; }
        
        .diferenciais-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 15px 0; }
        .diferencial-item { background: var(--light-color); padding: 12px; border-radius: 8px; text-align: center; border-bottom: 3px solid var(--fire-color); }
        .diferencial-item i { font-size: 22px; color: var(--fire-color); margin-bottom: 8px; }
        .diferencial-item h4 { font-family: var(--font-primary); font-size: 11px; color: var(--primary-color); margin-bottom: 4px; }
        .diferencial-item p { font-size: 9px; margin: 0; color: var(--gray-color); }
        
        .page-contact { display: flex; flex-direction: column; justify-content: center; text-align: center; }
        .contact-content { margin: auto 0; }
        .contact-icon { width: 70px; height: 70px; background: linear-gradient(135deg, var(--primary-color) 0%, #0f2744 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-size: 30px; color: var(--fire-color); }
        .contact-title { font-family: var(--font-primary); font-size: 22px; font-weight: 700; color: var(--primary-color); margin-bottom: 10px; }
        .contact-subtitle { font-size: 12px; color: var(--gray-color); margin-bottom: 20px; max-width: 400px; margin-left: auto; margin-right: auto; }
        .contact-info { display: flex; flex-direction: column; gap: 10px; align-items: center; }
        .contact-item { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--dark-color); }
        .contact-item i { color: var(--fire-color); font-size: 16px; width: 22px; }
        .contact-signature { margin-top: 25px; padding-top: 18px; border-top: 2px solid var(--light-color); }
        .signature-logo { height: 40px; margin-bottom: 10px; }
        .signature-text { font-size: 10px; color: var(--gray-color); line-height: 1.5; }
        
        @media print {
            .pdf-controls { display: none !important; }
            body { margin: 0; padding: 0; background: white; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            #pdf-content { width: 100%; margin: 0; box-shadow: none; }
            .page { page-break-after: always !important; page-break-inside: avoid !important; width: 210mm !important; height: 297mm !important; min-height: 297mm !important; max-height: 297mm !important; margin: 0 !important; padding: 12mm 15mm 18mm 15mm !important; box-sizing: border-box !important; overflow: hidden !important; }
            .page:last-child { page-break-after: auto !important; }
            .page-footer { position: absolute !important; bottom: 8mm !important; left: 15mm !important; right: 15mm !important; }
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
        @page { size: 210mm 297mm; margin: 0; }
    `}function S(a,s,t,n,i){const o={headerTitle:"Proposta Comercial - Brigada de Incêndio"},r=i?`
        <div style="background: linear-gradient(135deg, #38a169 0%, #2f855a 100%); color: #fff; padding: 15px 25px; border-radius: 10px; text-align: center; margin: 15px 0;">
            <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; opacity: 0.9;"><i class="fas fa-tag"></i> Desconto Especial Aplicado</p>
            <p style="font-size: 16px; margin: 0;"><s style="opacity: 0.7;">De R$ ${p(s)}</s> &nbsp;<strong style="font-size: 20px;">${n}% OFF</strong></p>
        </div>`:"";return`
        <!-- CAPA -->
        <div class="page page-cover">
            <span style="position: absolute; top: 25mm; left: 0; right: 0; text-align: center; font-family: var(--font-primary); font-size: 14px; font-weight: 700; color: var(--fire-color); letter-spacing: 3px;">${a.numero}</span>
            <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="cover-logo">
            <span class="cover-badge"><i class="fas fa-fire-extinguisher"></i> Treinamento Especializado</span>
            <div class="cover-icon"><i class="fas fa-fire"></i></div>
            <h1 class="cover-title">TREINAMENTO<span>BRIGADA DE INCÊNDIO</span></h1>
            <p class="cover-subtitle">Capacitação teórica e prática conforme Instrução Técnica IT 17/2025 do Corpo de Bombeiros Militar do RN (CBMRN)</p>
            <div class="cover-client">
                <p class="cover-client-label">Proposta elaborada para</p>
                <p class="cover-client-name">${a.razaoSocial}</p>
            </div>
            <p class="cover-date"><i class="fas fa-calendar-alt"></i>&nbsp;&nbsp;${a.data}</p>
            <div class="cover-footer"><p>EngMarq Solution | Engenharia de Segurança e Saúde do Trabalho | Natal - RN</p></div>
        </div>

        <!-- PÁGINA 2: EMPRESA CONTRATANTE -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${o.headerTitle}</span>
            </div>
            <h2 class="section-title"><span class="section-number">1</span><span class="section-title-text">Sobre a Empresa Contratante</span></h2>
            <h3 class="subsection-title"><i class="fas fa-building"></i> Dados da Empresa</h3>
            <div class="company-info-grid">
                <div class="company-info-item"><label>Razão Social</label><span>${a.razaoSocial}</span></div>
                <div class="company-info-item"><label>CNPJ</label><span>${a.cnpj||"-"}</span></div>
                <div class="company-info-item"><label>Endereço da Obra</label><span>${a.endereco||"-"}</span></div>
                <div class="company-info-item"><label>Bairro</label><span>${a.bairro||"-"}</span></div>
                <div class="company-info-item"><label>CEP</label><span>${a.cep||"-"}</span></div>
                <div class="company-info-item"><label>Município / UF</label><span>${a.cidade} - ${a.uf}</span></div>
            </div>
            ${a.solicitante.nome?`
            <h3 class="subsection-title" style="margin-top: 20px;"><i class="fas fa-user"></i> Solicitante</h3>
            <div class="company-info-grid">
                <div class="company-info-item"><label>Nome</label><span>${a.solicitante.nome}</span></div>
                <div class="company-info-item"><label>Cargo</label><span>${a.solicitante.cargo||"-"}</span></div>
                <div class="company-info-item"><label>E-mail</label><span>${a.solicitante.email||"-"}</span></div>
                <div class="company-info-item"><label>Telefone</label><span>${a.solicitante.telefone||"-"}</span></div>
            </div>
            `:""}
            <div class="info-box" style="margin-top: 25px;">
                <h4><i class="fas fa-fire-extinguisher"></i> Proposta Especializada</h4>
                <p>Esta proposta foi desenvolvida para atender às necessidades de capacitação da brigada de incêndio da empresa, em conformidade com a IT 17/2025 do CBMRN e com foco na segurança dos trabalhadores e segurança jurídica da empresa.</p>
            </div>
            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">02</span>
            </div>
        </div>

        <!-- PÁGINA 3: EMPRESA CONTRATADA -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${o.headerTitle}</span>
            </div>
            <h2 class="section-title"><span class="section-number"><i class="fas fa-building"></i></span><span class="section-title-text">Dados da Empresa Contratada</span></h2>
            <div class="fire-box" style="margin-bottom: 25px;">
                <h4><i class="fas fa-info-circle"></i> Informações para Faturamento e Contrato</h4>
                <p>Abaixo estão os dados cadastrais da EngMarq Solution para formalização contratual e emissão de documentos fiscais.</p>
            </div>
            <div style="background: var(--light-color); border-radius: 12px; padding: 30px; margin-bottom: 25px;">
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid var(--fire-color);">
                    <img src="assets/logoengmarq.png" alt="EngMarq Solution" style="height: 60px;">
                    <div>
                        <h3 style="font-family: var(--font-primary); color: var(--primary-color); font-size: 20px; margin-bottom: 5px;">EngMarq Solution LTDA</h3>
                        <p style="margin: 0; color: var(--gray-color); font-size: 13px;">Engenharia de Segurança e Saúde do Trabalho</p>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid var(--primary-color);">
                        <p style="margin: 0 0 5px 0; font-size: 12px; color: var(--gray-color); text-transform: uppercase; letter-spacing: 1px;">CNPJ</p>
                        <p style="margin: 0; font-size: 16px; font-weight: 600; color: var(--dark-color);">60.545.359/0001-76</p>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid var(--primary-color);">
                        <p style="margin: 0 0 5px 0; font-size: 12px; color: var(--gray-color); text-transform: uppercase; letter-spacing: 1px;">Razão Social</p>
                        <p style="margin: 0; font-size: 16px; font-weight: 600; color: var(--dark-color);">Engmarq Solution LTDA</p>
                    </div>
                </div>
            </div>
            <div class="highlight-box">
                <p><strong><i class="fas fa-file-contract"></i> Documentação:</strong> Todos os documentos societários, certidões e comprovações de regularidade fiscal estão disponíveis mediante solicitação para processo de homologação de fornecedores.</p>
            </div>
            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">03</span>
            </div>
        </div>

        <!-- PÁGINA 4: APRESENTAÇÃO -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${o.headerTitle}</span>
            </div>
            <h2 class="section-title"><span class="section-number">2</span><span class="section-title-text">Apresentação</span></h2>
            <p>A <strong>EngMarq Solution Ltda.</strong> é uma empresa especializada em Engenharia de Segurança e Saúde do Trabalho, com atuação focada na prestação de serviços técnicos de alta qualidade para organizações que buscam conformidade legal e proteção efetiva de seus colaboradores.</p>
            <p>É com satisfação que apresentamos esta proposta para realização do <strong>Treinamento de Brigada de Incêndio</strong>, desenvolvido para capacitar os colaboradores designados como brigadistas, preparando-os para atuar com segurança e eficiência em situações de emergência envolvendo princípios de incêndio.</p>
            <div class="fire-box">
                <h4><i class="fas fa-fire-extinguisher"></i> Sobre o Treinamento</h4>
                <p>O treinamento possui <strong>carga horária total de 4 (quatro) horas</strong>, contemplando parte teórica e prática, e é elaborado em conformidade com a <strong>Instrução Técnica IT 17/2025 do Corpo de Bombeiros Militar do RN (CBMRN)</strong>.</p>
            </div>
            <div class="info-box">
                <h4><i class="fas fa-users"></i> Dimensionamento</h4>
                <p>Treinamento dimensionado para <strong>${a.qtdColaboradores} colaboradores</strong>, conforme acordado com a empresa contratante.</p>
            </div>
            <h3 class="subsection-title"><i class="fas fa-bullseye"></i> Foco do Treinamento</h3>
            <ul class="fire-list">
                <li>Capacitação técnica para prevenção e combate inicial a incêndios</li>
                <li>Preparo prático para atuação em situações de emergência</li>
                <li>Conformidade com a legislação estadual de segurança contra incêndio</li>
                <li>Desenvolvimento de cultura de prevenção na empresa</li>
            </ul>
            <div class="info-box">
                <h4><i class="fas fa-shield-alt"></i> Compromisso com a Segurança</h4>
                <p>Nosso objetivo é garantir que os brigadistas estejam <strong>efetivamente preparados</strong> para agir de forma segura e coordenada, protegendo vidas e patrimônio até a chegada do Corpo de Bombeiros.</p>
            </div>
            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">04</span>
            </div>
        </div>

        <!-- PÁGINA 5: OBJETIVO E EMBASAMENTO -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${o.headerTitle}</span>
            </div>
            <h2 class="section-title"><span class="section-number">3</span><span class="section-title-text">Objetivo do Treinamento</span></h2>
            <p>O objetivo principal do treinamento é <strong>capacitar os colaboradores designados como brigadistas</strong> para atuarem de forma segura, técnica e coordenada em situações de emergência envolvendo incêndio.</p>
            <h3 class="subsection-title"><i class="fas fa-tasks"></i> Competências Desenvolvidas</h3>
            <div class="content-grid">
                <div class="content-card"><h4><i class="fas fa-shield-alt"></i> Prevenção de Incêndios</h4><p>Identificar e eliminar condições de risco que possam originar princípios de incêndio no ambiente de trabalho.</p></div>
                <div class="content-card"><h4><i class="fas fa-search"></i> Identificação de Riscos</h4><p>Reconhecer situações de perigo e avaliar cenários para tomada de decisão rápida e segura.</p></div>
                <div class="content-card"><h4><i class="fas fa-fire-extinguisher"></i> Combate Inicial</h4><p>Executar procedimentos iniciais de combate ao incêndio utilizando os equipamentos disponíveis.</p></div>
                <div class="content-card"><h4><i class="fas fa-running"></i> Abandono Seguro</h4><p>Realizar a evacuação ordenada da edificação, orientando pessoas e garantindo rotas seguras.</p></div>
            </div>
            <div class="highlight-box">
                <p><strong><i class="fas fa-info-circle"></i> Atuação Coordenada:</strong> Os brigadistas serão capacitados para agir corretamente até a chegada do Corpo de Bombeiros, mantendo a situação sob controle e minimizando danos.</p>
            </div>
            <h2 class="section-title" style="margin-top: 20px;"><span class="section-number">4</span><span class="section-title-text">Embasamento Normativo</span></h2>
            <p>O treinamento é elaborado em estrita conformidade com as normas e instruções técnicas vigentes:</p>
            <ul class="feature-list">
                <li><strong>Instrução Técnica IT 17/2025</strong> – do Corpo de Bombeiros Militar do RN (CBMRN) – Brigada de Incêndio</li>
                <li><strong>Legislação Estadual</strong> – Normas de segurança contra incêndio do Rio Grande do Norte</li>
                <li><strong>Boas Práticas</strong> – Procedimentos reconhecidos de segurança e resposta a emergências</li>
            </ul>
            <div class="info-box">
                <h4><i class="fas fa-certificate"></i> Conformidade Legal</h4>
                <p>O treinamento atende aos requisitos legais para formação de brigadistas, garantindo que a empresa esteja em conformidade com as exigências do Corpo de Bombeiros e demais órgãos fiscalizadores.</p>
            </div>
            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">05</span>
            </div>
        </div>

        <!-- PÁGINA 6: CARGA HORÁRIA E CONTEÚDO -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${o.headerTitle}</span>
            </div>
            <h2 class="section-title"><span class="section-number">5</span><span class="section-title-text">Carga Horária</span></h2>
            <div class="carga-total"><h3>Carga Horária Total</h3><p>4 HORAS</p></div>
            <div class="carga-horaria">
                <div class="carga-item"><i class="fas fa-chalkboard-teacher"></i><h4>Parte Teórica</h4><p>Conceitos, normas e procedimentos</p></div>
                <div class="carga-item"><i class="fas fa-fire-extinguisher"></i><h4>Parte Prática</h4><p>Simulações e uso de equipamentos</p></div>
            </div>
            <h2 class="section-title" style="margin-top: 20px;"><span class="section-number">6</span><span class="section-title-text">Conteúdo a ser Estudado</span></h2>
            <h3 class="subsection-title"><i class="fas fa-book"></i> Parte Teórica</h3>
            <div class="content-grid">
                <div class="content-card"><h4><i class="fas fa-users"></i> Brigada de Incêndio</h4><p>Introdução, funções e responsabilidades do brigadista</p></div>
                <div class="content-card"><h4><i class="fas fa-fire"></i> Ciência do Fogo</h4><p>Triângulo e tetraedro do fogo, propagação e classes de incêndio</p></div>
                <div class="content-card"><h4><i class="fas fa-exclamation-triangle"></i> Prevenção</h4><p>Métodos preventivos e riscos no ambiente de trabalho</p></div>
                <div class="content-card"><h4><i class="fas fa-tools"></i> Equipamentos</h4><p>Tipos de extintores, hidrantes e equipamentos de combate</p></div>
                <div class="content-card"><h4><i class="fas fa-clipboard-list"></i> Procedimentos</h4><p>Ações de emergência e técnicas de abandono de área</p></div>
                <div class="content-card"><h4><i class="fas fa-first-aid"></i> Primeiros Socorros</h4><p>Noções básicas conforme IT do CBM/RN</p></div>
            </div>
            <h3 class="subsection-title"><i class="fas fa-fire-extinguisher"></i> Parte Prática</h3>
            <ul class="fire-list">
                <li>Reconhecimento dos equipamentos de combate a incêndio disponíveis</li>
                <li>Técnicas corretas de manuseio e uso de extintores</li>
                <li>Simulação prática de combate a princípio de incêndio</li>
                <li>Orientações de postura, aproximação e segurança do brigadista</li>
                <li>Treinamento supervisionado por instrutor habilitado</li>
            </ul>
            <div class="highlight-box" style="margin-top: 15px;">
                <p><strong><i class="fas fa-info-circle"></i> Nota:</strong> Os conteúdos apresentados acima são descritos de forma macro. O detalhamento, desenvolvimento e aplicação integral do treinamento seguirão rigorosamente o disposto na <strong>Instrução Técnica IT 17/2025 do Corpo de Bombeiros Militar do Rio Grande do Norte (CBMRN)</strong>.</p>
            </div>
            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">06</span>
            </div>
        </div>

        <!-- PÁGINA 7: ENTREGÁVEIS -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${o.headerTitle}</span>
            </div>
            <h2 class="section-title"><span class="section-number">7</span><span class="section-title-text">Entregáveis</span></h2>
            <p>Ao final do treinamento, a empresa receberá os seguintes itens e documentos:</p>
            <div class="deliverables-grid">
                <div class="deliverable-item"><div class="deliverable-icon"><i class="fas fa-chalkboard-teacher"></i></div><div class="deliverable-text"><h4>Treinamento Completo</h4><p>Capacitação teórica e prática conforme IT 17/2025 CBMRN com 4 horas de duração.</p></div></div>
                <div class="deliverable-item"><div class="deliverable-icon"><i class="fas fa-user-tie"></i></div><div class="deliverable-text"><h4>Instrutor Qualificado</h4><p>Profissional habilitado e experiente em treinamentos de brigada.</p></div></div>
                <div class="deliverable-item"><div class="deliverable-icon"><i class="fas fa-desktop"></i></div><div class="deliverable-text"><h4>Material Didático Expositivo</h4><p>Conteúdo expositivo aplicado durante o treinamento (não físico).</p></div></div>
                <div class="deliverable-item"><div class="deliverable-icon"><i class="fas fa-clipboard-list"></i></div><div class="deliverable-text"><h4>Lista de Presença</h4><p>Registro oficial dos participantes para controle e documentação.</p></div></div>
                <div class="deliverable-item"><div class="deliverable-icon"><i class="fas fa-certificate"></i></div><div class="deliverable-text"><h4>Certificados Digitais</h4><p>Certificados disponibilizados em formato digital. A impressão fica a critério da empresa contratante.</p></div></div>
                <div class="deliverable-item"><div class="deliverable-icon"><i class="fas fa-folder-open"></i></div><div class="deliverable-text"><h4>Registro da Capacitação</h4><p>Documentação completa para auditorias e fiscalizações.</p></div></div>
            </div>
            <div class="alert-box" style="margin-top: 20px;">
                <h4><i class="fas fa-exclamation-triangle"></i> Nota Importante – Atividade Prática</h4>
                <p style="margin-bottom: 8px;">A <strong>empresa contratante</strong> será responsável por disponibilizar os materiais necessários à realização da parte prática do treinamento:</p>
                <ul style="margin: 8px 0 0 20px; font-size: 10px;">
                    <li>Extintores de incêndio para uso no treinamento</li>
                    <li>Materiais para geração controlada do fogo (simulação)</li>
                    <li>Área externa segura e adequada para execução das práticas</li>
                </ul>
            </div>
            <div class="info-box">
                <h4><i class="fas fa-info-circle"></i> Observação</h4>
                <p>Caso a empresa não disponha dos materiais necessários, a EngMarq Solution pode auxiliar na orientação para aquisição ou locação dos itens para a prática.</p>
            </div>
            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">07</span>
            </div>
        </div>

        <!-- PÁGINA 8: INVESTIMENTO -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${o.headerTitle}</span>
            </div>
            <h2 class="section-title"><span class="section-number">8</span><span class="section-title-text">Investimento</span></h2>
            <p>O valor abaixo corresponde ao investimento para realização do <strong>Treinamento de Brigada de Incêndio</strong> completo, com 4 horas de duração:</p>
            ${r}
            <div class="investment-highlight" style="background: linear-gradient(135deg, #1a365d 0%, #234876 100%); color: #fff; padding: 25px 30px; border-radius: 12px; text-align: center; margin: 15px 0;">
                <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; opacity: 0.9;">Valor do Treinamento</p>
                <p style="font-size: 38px; font-weight: 800; font-family: 'Montserrat', sans-serif; margin-bottom: 8px; letter-spacing: 1px;">R$ ${p(t)}</p>
                <p style="font-size: 12px; opacity: 0.85;">(${f(t)})</p>
            </div>
            <h3 class="subsection-title"><i class="fas fa-check-circle"></i> O Que Está Incluso</h3>
            <ul class="feature-list">
                <li>Treinamento teórico completo (conceitos, normas, procedimentos)</li>
                <li>Treinamento prático supervisionado</li>
                <li>Instrutor qualificado e habilitado</li>
                <li>Material didático expositivo (não físico)</li>
                <li>Lista de presença dos participantes</li>
                <li>Certificados digitais de participação individuais</li>
                <li>Documentação para auditorias e fiscalizações</li>
            </ul>
            <div class="highlight-box">
                <p><strong><i class="fas fa-clock"></i> Carga Horária:</strong> 4 horas de treinamento (teórico + prático), em data e horário a serem acordados com a empresa.</p>
            </div>
            <div class="info-box">
                <h4><i class="fas fa-handshake"></i> Forma de Pagamento</h4>
                <p><strong>50%</strong> no fechamento do contrato<br><strong>50%</strong> na finalização do treinamento</p>
            </div>
            <div class="fire-box">
                <h4><i class="fas fa-users"></i> Abrangência</h4>
                <p>Treinamento dimensionado para <strong>${a.qtdColaboradores} colaboradores</strong>.</p>
            </div>
            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">08</span>
            </div>
        </div>

        <!-- PÁGINA 9: DIFERENCIAIS E ENCERRAMENTO -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${o.headerTitle}</span>
            </div>
            <h2 class="section-title"><span class="section-number">9</span><span class="section-title-text">Diferenciais da EngMarq Solution</span></h2>
            <div class="diferenciais-grid">
                <div class="diferencial-item"><i class="fas fa-hard-hat"></i><h4>Atuação Técnica e Responsável</h4><p>Profissionais qualificados com experiência em SST e treinamentos de emergência.</p></div>
                <div class="diferencial-item"><i class="fas fa-balance-scale"></i><h4>Conformidade Legal</h4><p>Treinamento em total conformidade com a IT 17/2025 do CBMRN e legislação vigente.</p></div>
                <div class="diferencial-item"><i class="fas fa-bullseye"></i><h4>Foco no Preparo Real</h4><p>Capacitação prática e efetiva, não apenas documental ou formal.</p></div>
                <div class="diferencial-item"><i class="fas fa-shield-alt"></i><h4>Compromisso com a Segurança</h4><p>Dedicação à proteção das pessoas e do patrimônio da empresa.</p></div>
            </div>
            <h2 class="section-title" style="margin-top: 25px;"><span class="section-number">10</span><span class="section-title-text">Próximos Passos</span></h2>
            <p>Estamos à disposição para dar continuidade à contratação do treinamento. Os próximos passos incluem:</p>
            <ul class="feature-list">
                <li><strong>Alinhamento de datas e horários</strong> – Definição da melhor data para realização do treinamento</li>
                <li><strong>Adequação à realidade da empresa</strong> – Ajustes no conteúdo conforme necessidades específicas</li>
                <li><strong>Formalização da contratação</strong> – Envio de contrato e condições comerciais</li>
            </ul>
            <div class="fire-box" style="margin-top: 20px;">
                <h4><i class="fas fa-fire-extinguisher"></i> Preparação Salva Vidas</h4>
                <p>Investir no treinamento da brigada de incêndio é investir na <strong>segurança das pessoas</strong> e na <strong>proteção do patrimônio</strong>. Uma equipe bem preparada pode fazer a diferença em situações de emergência.</p>
            </div>
            <div class="responsible-card">
                <div class="responsible-avatar"><i class="fas fa-user-tie"></i></div>
                <p class="responsible-name">${a.elaborador.nome}</p>
                <p class="responsible-role">${a.elaborador.cargo}</p>
                <p class="responsible-company">EngMarq Solution Ltda.</p>
                <div class="responsible-contacts">
                    <div class="responsible-contact-item"><i class="fas fa-envelope"></i><span>${a.elaborador.email}</span></div>
                    <div class="responsible-contact-item"><i class="fab fa-whatsapp"></i><span>${a.elaborador.telefone}</span></div>
                    <div class="responsible-contact-item"><i class="fab fa-instagram"></i><span>${a.elaborador.instagram}</span></div>
                </div>
            </div>
            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">09</span>
            </div>
        </div>

        <!-- PÁGINA 10: CONTATO -->
        <div class="page page-contact">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${o.headerTitle}</span>
            </div>
            <div class="contact-content">
                <div class="contact-icon"><i class="fas fa-handshake"></i></div>
                <h2 class="contact-title">Fale Conosco</h2>
                <p class="contact-subtitle">Estamos à disposição para dar continuidade ao processo de contratação e esclarecer eventuais dúvidas sobre o treinamento.</p>
                <div class="contact-info">
                    <div class="contact-item"><i class="fab fa-whatsapp"></i><span>+55 84 99928-5888</span></div>
                    <div class="contact-item"><i class="fas fa-envelope"></i><span>engmarqsolution@gmail.com</span></div>
                    <div class="contact-item"><i class="fab fa-instagram"></i><span>@engmarq_solution</span></div>
                    <div class="contact-item"><i class="fas fa-globe"></i><span>www.engmarqsolution.com</span></div>
                </div>
                <div class="contact-signature">
                    <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="signature-logo">
                    <p class="signature-text">
                        <strong>EngMarq Solution</strong><br>
                        Engenharia de Segurança e Saúde do Trabalho<br>
                        <em style="color: var(--primary-color); font-style: italic; font-size: 11px;">Garantindo segurança jurídica para sua empresa.</em><br>
                        Natal - Rio Grande do Norte
                    </p>
                </div>
            </div>
            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">10</span>
            </div>
        </div>
    `}function z(a,s,t,n,i){const o=a.razaoSocial;let r="";return i&&n>0&&(r=`
            <div style="background: linear-gradient(135deg, #38a169 0%, #2f855a 100%); color: #fff; padding: 12px 20px; border-radius: 10px; text-align: center; margin: 10px 0;">
                <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px; opacity: 0.9;"><i class="fas fa-tag"></i> Desconto Especial Aplicado</p>
                <p style="font-size: 14px; margin: 0;"><s style="opacity: 0.7;">De ${p(s)}</s> &nbsp;<strong style="font-size: 18px;">${n}% OFF</strong></p>
            </div>`),`
        <!-- ====== PÁGINA 1: CAPA ====== -->
        <div class="page page-cover">
            <span style="position: absolute; top: 25mm; left: 0; right: 0; text-align: center; font-family: var(--font-primary); font-size: 14px; font-weight: 700; color: var(--accent-color); letter-spacing: 3px;">${a.numero}</span>
            
            <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="cover-logo">
            
            <span class="cover-badge">
                <i class="fas fa-hard-hat"></i>
                Projeto Técnico – EPC
            </span>

            <div class="cover-icon">
                <i class="fas fa-layer-group"></i>
            </div>
            
            <h1 class="cover-title">
                ELABORAÇÃO DE PROJETO
                <span>PLATAFORMA SECUNDÁRIA</span>
            </h1>
            <p class="cover-subtitle">
                Equipamento de Proteção Coletiva (EPC) conforme NR 18 – Condições e Meio Ambiente de Trabalho na Indústria da Construção
            </p>
            
            <div class="cover-client">
                <p class="cover-client-label">Proposta elaborada para</p>
                <p class="cover-client-name">${o}</p>
            </div>

            <p class="cover-date">
                <i class="fas fa-calendar-alt"></i>&nbsp;&nbsp;
                ${a.data}
            </p>

            <div class="cover-footer">
                <p>EngMarq Solution | Engenharia de Segurança e Saúde do Trabalho | Natal - RN</p>
            </div>
        </div>

        <!-- ====== PÁGINA 2: SOBRE A EMPRESA CONTRATANTE ====== -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">1</span>
                <span class="section-title-text">Sobre a Empresa Contratante</span>
            </h2>

            <h3 class="subsection-title"><i class="fas fa-building"></i> Dados da Empresa</h3>
            
            <div class="company-info-grid">
                <div class="company-info-item">
                    <label>Razão Social</label>
                    <span>${a.razaoSocial}</span>
                </div>
                <div class="company-info-item">
                    <label>CNPJ</label>
                    <span>${a.cnpj}</span>
                </div>
                <div class="company-info-item">
                    <label>Endereço da Obra</label>
                    <span>${a.endereco}</span>
                </div>
                <div class="company-info-item">
                    <label>Bairro</label>
                    <span>${a.bairro}</span>
                </div>
                <div class="company-info-item">
                    <label>CEP</label>
                    <span>${a.cep}</span>
                </div>
                <div class="company-info-item">
                    <label>Município / UF</label>
                    <span>${a.cidade} - ${a.uf}</span>
                </div>
            </div>

            ${a.solicitante.nome?`
            <h3 class="subsection-title" style="margin-top: 20px;"><i class="fas fa-user"></i> Solicitante</h3>
            <div class="company-info-grid">
                <div class="company-info-item"><label>Nome</label><span>${a.solicitante.nome}</span></div>
                <div class="company-info-item"><label>Cargo</label><span>${a.solicitante.cargo||"-"}</span></div>
                <div class="company-info-item"><label>E-mail</label><span>${a.solicitante.email||"-"}</span></div>
                <div class="company-info-item"><label>Telefone</label><span>${a.solicitante.telefone||"-"}</span></div>
            </div>
            `:""}

            <div class="info-box" style="margin-top: 25px;">
                <h4><i class="fas fa-hard-hat"></i> Proposta Especializada</h4>
                <p>Esta proposta foi desenvolvida para atender às necessidades de elaboração do Projeto Técnico de Plataforma Secundária, em conformidade com a NR 18 e com foco na segurança dos trabalhadores e segurança jurídica da empresa.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">02</span>
            </div>
        </div>

        <!-- ====== PÁGINA 3: DADOS DA EMPRESA CONTRATADA ====== -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number"><i class="fas fa-building"></i></span>
                <span class="section-title-text">Dados da Empresa Contratada</span>
            </h2>

            <div class="info-box" style="margin-bottom: 25px; background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-left-color: var(--accent-color);">
                <h4 style="color: var(--accent-color);"><i class="fas fa-info-circle"></i> Informações para Faturamento e Contrato</h4>
                <p>Abaixo estão os dados cadastrais da EngMarq Solution para formalização contratual e emissão de documentos fiscais.</p>
            </div>

            <div style="background: var(--light-color); border-radius: 12px; padding: 30px; margin-bottom: 25px;">
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid var(--accent-color);">
                    <img src="assets/logoengmarq.png" alt="EngMarq Solution" style="height: 60px;">
                    <div>
                        <h3 style="font-family: var(--font-primary); color: var(--primary-color); font-size: 20px; margin-bottom: 5px;">EngMarq Solution LTDA</h3>
                        <p style="margin: 0; color: var(--gray-color); font-size: 13px;">Engenharia de Segurança e Saúde do Trabalho</p>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid var(--primary-color);">
                        <p style="margin: 0 0 5px 0; font-size: 12px; color: var(--gray-color); text-transform: uppercase; letter-spacing: 1px;">CNPJ</p>
                        <p style="margin: 0; font-size: 16px; font-weight: 600; color: var(--dark-color);">60.545.359/0001-76</p>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid var(--primary-color);">
                        <p style="margin: 0 0 5px 0; font-size: 12px; color: var(--gray-color); text-transform: uppercase; letter-spacing: 1px;">Razão Social</p>
                        <p style="margin: 0; font-size: 16px; font-weight: 600; color: var(--dark-color);">Engmarq Solution LTDA</p>
                    </div>
                </div>
            </div>

            <div class="highlight-box">
                <p><strong><i class="fas fa-file-contract"></i> Documentação:</strong> Todos os documentos societários, certidões e comprovações de regularidade fiscal estão disponíveis mediante solicitação para processo de homologação de fornecedores.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">03</span>
            </div>
        </div>

        <!-- ====== PÁGINA 4: APRESENTAÇÃO ====== -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">2</span>
                <span class="section-title-text">Apresentação</span>
            </h2>

            <p>A <strong>EngMarq Solution Ltda.</strong> é uma empresa especializada em Engenharia de Segurança e Saúde do Trabalho, com atuação técnica focada em soluções de engenharia para a indústria da construção civil. Oferecemos serviços de alta qualidade técnica, com compromisso com a conformidade normativa e a proteção efetiva dos trabalhadores.</p>

            <p>É com satisfação que apresentamos esta proposta para a <strong>elaboração do Projeto Técnico de Plataforma Secundária</strong>, equipamento de proteção coletiva (EPC) essencial para obras verticais, conforme exigências da <strong>NR 18 – Condições e Meio Ambiente de Trabalho na Indústria da Construção</strong>.</p>

            <div class="info-box" style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-left-color: var(--accent-color);">
                <h4 style="color: var(--accent-color);"><i class="fas fa-hard-hat"></i> Plataforma Secundária de Proteção</h4>
                <p>A plataforma secundária é um <strong>equipamento de proteção coletiva (EPC)</strong> instalado em obras de edificações verticais, com a função de aparar e reter materiais e ferramentas que possam cair durante a execução dos serviços, protegendo trabalhadores e terceiros que circulam nos pavimentos inferiores e no entorno da obra.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-shield-alt"></i> Importância do Projeto</h3>

            <p>A elaboração do projeto técnico por profissional habilitado é requisito fundamental para garantir:</p>

            <ul class="feature-list">
                <li><strong>Segurança dos trabalhadores</strong> – Proteção efetiva contra quedas de materiais</li>
                <li><strong>Conformidade legal</strong> – Atendimento integral às exigências da NR 18</li>
                <li><strong>Segurança jurídica</strong> – Documentação técnica adequada para fiscalizações</li>
                <li><strong>Responsabilidade técnica</strong> – Projeto com ART registrada junto ao CREA</li>
            </ul>

            <div class="info-box">
                <h4><i class="fas fa-balance-scale"></i> Conformidade e Segurança Jurídica</h4>
                <p>A existência de projeto técnico elaborado por profissional habilitado, com ART devidamente registrada, é condição essencial para demonstrar o cumprimento das obrigações legais perante órgãos fiscalizadores, evitando <strong>autuações, interdições e responsabilizações</strong> em caso de acidentes.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">04</span>
            </div>
        </div>

        <!-- ====== PÁGINA 5: OBJETIVO E EMBASAMENTO ====== -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">3</span>
                <span class="section-title-text">Objetivo do Projeto</span>
            </h2>

            <p>O objetivo desta proposta é a <strong>elaboração do Projeto Técnico da Plataforma Secundária</strong>, dimensionado conforme as características específicas da edificação e da obra, garantindo a proteção coletiva dos trabalhadores e o atendimento às normas de segurança vigentes.</p>

            <h3 class="subsection-title"><i class="fas fa-bullseye"></i> O Projeto Garantirá</h3>

            <div class="content-grid">
                <div class="content-card">
                    <h4><i class="fas fa-users-cog"></i> Proteção Coletiva</h4>
                    <p>Sistema eficaz de proteção contra quedas de pessoas, materiais e ferramentas durante a obra.</p>
                </div>
                <div class="content-card">
                    <h4><i class="fas fa-clipboard-check"></i> Atendimento à NR 18</h4>
                    <p>Conformidade integral com as exigências normativas para plataformas de proteção.</p>
                </div>
                <div class="content-card">
                    <h4><i class="fas fa-file-contract"></i> Base Técnica Segura</h4>
                    <p>Documentação completa para instalação correta e para apresentação em fiscalizações.</p>
                </div>
                <div class="content-card">
                    <h4><i class="fas fa-exclamation-triangle"></i> Redução de Riscos</h4>
                    <p>Minimização de riscos de acidentes, autuações trabalhistas e interdições da obra.</p>
                </div>
            </div>

            <h2 class="section-title" style="margin-top: 20px;">
                <span class="section-number">4</span>
                <span class="section-title-text">Embasamento Legal e Normativo</span>
            </h2>

            <p>O projeto será elaborado com base nas seguintes normas e referências técnicas:</p>

            <div class="nr-box">
                <div class="nr-box-icon">
                    <i class="fas fa-gavel"></i>
                </div>
                <div class="nr-box-content">
                    <h4>NR 18 – Condições e Meio Ambiente de Trabalho na Indústria da Construção</h4>
                    <p>Norma regulamentadora do Ministério do Trabalho que estabelece diretrizes de segurança para a indústria da construção, incluindo requisitos para plataformas de proteção.</p>
                </div>
            </div>

            <ul class="feature-list">
                <li><strong>Normas técnicas aplicáveis</strong> ao dimensionamento estrutural de plataformas</li>
                <li><strong>Boas práticas de engenharia</strong> e segurança do trabalho na construção civil</li>
                <li><strong>Legislação profissional CREA/CONFEA</strong> – Responsabilidade técnica do profissional</li>
                <li><strong>Normas de segurança</strong> para proteção contra quedas de materiais</li>
            </ul>

            <div class="highlight-box">
                <p><strong><i class="fas fa-info-circle"></i> Nota:</strong> O projeto será desenvolvido considerando as características específicas da edificação (altura, dimensões, tipo de estrutura) para garantir eficácia técnica e conformidade normativa.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">05</span>
            </div>
        </div>

        <!-- ====== PÁGINA 6: ENTREGÁVEIS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">5</span>
                <span class="section-title-text">Escopo do Projeto – Entregáveis</span>
            </h2>

            <p>A EngMarq Solution entregará os seguintes documentos técnicos:</p>

            <div class="deliverables-list">
                <div class="deliverable-section">
                    <div class="deliverable-header">
                        <i class="fas fa-drafting-compass"></i>
                        <h4>1. Projeto Técnico da Plataforma Secundária</h4>
                    </div>
                    <div class="deliverable-content">
                        <ul>
                            <li>Plantas e detalhamentos técnicos completos</li>
                            <li>Representação gráfica da plataforma e seus componentes</li>
                            <li>Indicação dos pontos de fixação na estrutura</li>
                            <li>Dimensões e especificações construtivas</li>
                        </ul>
                    </div>
                </div>

                <div class="deliverable-section">
                    <div class="deliverable-header">
                        <i class="fas fa-file-alt"></i>
                        <h4>2. Memorial Descritivo</h4>
                    </div>
                    <div class="deliverable-content">
                        <ul>
                            <li>Descrição completa da plataforma secundária projetada</li>
                            <li>Especificação dos materiais a serem utilizados</li>
                            <li>Características técnicas do sistema de proteção</li>
                            <li>Condições de uso e limitações do equipamento</li>
                        </ul>
                    </div>
                </div>

                <div class="deliverable-section">
                    <div class="deliverable-header">
                        <i class="fas fa-calculator"></i>
                        <h4>3. Memória de Cálculo</h4>
                    </div>
                    <div class="deliverable-content">
                        <ul>
                            <li>Critérios técnicos adotados para o dimensionamento</li>
                            <li>Cargas consideradas no cálculo estrutural</li>
                            <li>Metodologia de cálculo aplicada</li>
                            <li>Demonstração da resistência e estabilidade estrutural</li>
                        </ul>
                    </div>
                </div>

                <div class="deliverable-section">
                    <div class="deliverable-header">
                        <i class="fas fa-tools"></i>
                        <h4>4. Orientações para Instalação</h4>
                    </div>
                    <div class="deliverable-content">
                        <ul>
                            <li>Informações técnicas para correta instalação da plataforma</li>
                            <li>Premissas de segurança a serem observadas</li>
                            <li>Diretrizes para montagem conforme projeto</li>
                            <li>Recomendações para verificação após instalação</li>
                        </ul>
                    </div>
                </div>

                <div class="deliverable-section">
                    <div class="deliverable-header">
                        <i class="fas fa-stamp"></i>
                        <h4>5. Emissão de ART</h4>
                    </div>
                    <div class="deliverable-content">
                        <ul>
                            <li>ART registrada junto ao CREA</li>
                            <li>Vinculada exclusivamente ao projeto da plataforma secundária</li>
                            <li>Formalização da responsabilidade técnica do profissional</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">06</span>
            </div>
        </div>

        <!-- ====== PÁGINA 7: OBSERVAÇÃO E BENEFÍCIOS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">6</span>
                <span class="section-title-text">Observação Importante</span>
            </h2>

            <div class="alert-box" style="margin-bottom: 15px;">
                <h4><i class="fas fa-exclamation-triangle"></i> Responsabilidade de Execução</h4>
                <p style="margin-bottom: 8px;">Esta proposta refere-se <strong>exclusivamente à elaboração do projeto técnico</strong> da plataforma secundária.</p>
                <p style="margin-bottom: 8px;">A <strong>execução, montagem e instalação</strong> da plataforma são de <strong>responsabilidade da empresa executora</strong> da obra.</p>
                <p>A empresa executora deverá respeitar integralmente as <strong>orientações técnicas contidas no projeto</strong> para garantir a segurança e eficácia do sistema de proteção.</p>
            </div>

            <div class="highlight-box">
                <p><strong><i class="fas fa-info-circle"></i> Recomendação:</strong> A instalação da plataforma deve ser executada por profissionais capacitados, com supervisão técnica adequada, seguindo rigorosamente as especificações do projeto.</p>
            </div>

            <h2 class="section-title" style="margin-top: 25px;">
                <span class="section-number">7</span>
                <span class="section-title-text">Benefícios para a Empresa Contratante</span>
            </h2>

            <p>A contratação do projeto técnico de plataforma secundária oferece benefícios significativos para a empresa:</p>

            <div class="benefits-grid">
                <div class="benefit-item">
                    <i class="fas fa-clipboard-check"></i>
                    <h4>Conformidade com NR 18</h4>
                    <p>Atendimento integral às exigências normativas de segurança na construção.</p>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-user-shield"></i>
                    <h4>Proteção dos Trabalhadores</h4>
                    <p>Sistema projetado para proteção efetiva contra quedas de materiais.</p>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-balance-scale"></i>
                    <h4>Segurança Jurídica</h4>
                    <p>Documentação técnica adequada para fiscalizações e auditorias.</p>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-exclamation-circle"></i>
                    <h4>Redução de Riscos</h4>
                    <p>Minimização de riscos de acidentes graves e fatais na obra.</p>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-ban"></i>
                    <h4>Prevenção de Autuações</h4>
                    <p>Evita multas, interdições e responsabilizações por descumprimento.</p>
                </div>
                <div class="benefit-item">
                    <i class="fas fa-cogs"></i>
                    <h4>Base Técnica Sólida</h4>
                    <p>Projeto dimensionado para execução segura e eficiente.</p>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">07</span>
            </div>
        </div>

        <!-- ====== PÁGINA 8: VALOR E DIFERENCIAIS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">8</span>
                <span class="section-title-text">Valor da Proposta</span>
            </h2>

            <p>O valor para elaboração do Projeto Técnico de Plataforma Secundária está apresentado abaixo:</p>

            ${r}

            <div class="investment-highlight" style="background: linear-gradient(135deg, #1a365d 0%, #234876 100%); color: #fff; padding: 18px 25px; border-radius: 12px; text-align: center; margin: 10px 0;">
                <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px; opacity: 0.9;">Investimento</p>
                <p style="font-size: 32px; font-weight: 800; font-family: 'Montserrat', sans-serif; margin-bottom: 6px; letter-spacing: 1px;">R$ ${p(t)}</p>
                <p style="font-size: 10px; opacity: 0.85;">(${f(t)})</p>
            </div>

            <div class="info-box" style="margin: 10px 0; padding: 10px 12px;">
                <h4><i class="fas fa-money-bill-wave"></i> Forma de Pagamento</h4>
                <p><strong>50%</strong> no fechamento do contrato e <strong>50%</strong> na entrega do projeto.</p>
            </div>

            <h2 class="section-title" style="margin-top: 15px;">
                <span class="section-number">9</span>
                <span class="section-title-text">Diferenciais da EngMarq Solution</span>
            </h2>

            <div class="diferenciais-grid" style="gap: 8px; margin: 10px 0;">
                <div class="diferencial-item" style="padding: 10px;">
                    <i class="fas fa-hard-hat" style="font-size: 18px; margin-bottom: 5px;"></i>
                    <h4>Especialização em SST</h4>
                    <p>Atuação focada em Engenharia de Segurança e Saúde do Trabalho.</p>
                </div>
                <div class="diferencial-item" style="padding: 10px;">
                    <i class="fas fa-clipboard-check" style="font-size: 18px; margin-bottom: 5px;"></i>
                    <h4>Conformidade Normativa</h4>
                    <p>Projetos elaborados com foco no atendimento às normas vigentes.</p>
                </div>
                <div class="diferencial-item" style="padding: 10px;">
                    <i class="fas fa-tools" style="font-size: 18px; margin-bottom: 5px;"></i>
                    <h4>Aplicabilidade Prática</h4>
                    <p>Soluções técnicas viáveis e adequadas à realidade da obra.</p>
                </div>
                <div class="diferencial-item" style="padding: 10px;">
                    <i class="fas fa-certificate" style="font-size: 18px; margin-bottom: 5px;"></i>
                    <h4>Responsabilidade Técnica</h4>
                    <p>Compromisso com a qualidade e responsabilidade legal do trabalho.</p>
                </div>
            </div>

            <div class="info-box" style="margin: 10px 0; padding: 10px 12px; background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-left-color: var(--accent-color);">
                <h4 style="color: var(--accent-color);"><i class="fas fa-eye"></i> Visão Estratégica de Prevenção</h4>
                <p>Nossos projetos são desenvolvidos com uma visão estratégica de prevenção de riscos, buscando não apenas o cumprimento formal das normas, mas a <strong>proteção efetiva dos trabalhadores</strong> e a <strong>segurança jurídica da empresa</strong>.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">08</span>
            </div>
        </div>

        <!-- ====== PÁGINA 9: PRÓXIMOS PASSOS E CONTATO ====== -->
        <div class="page page-contact">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">10</span>
                <span class="section-title-text">Próximos Passos</span>
            </h2>

            <p>Estamos à disposição para dar continuidade à contratação do projeto. Os próximos passos incluem:</p>

            <ul class="feature-list">
                <li><strong>Alinhamento das informações da obra</strong> – Dados da edificação, plantas, altura, tipo de estrutura</li>
                <li><strong>Definição de prazos de entrega</strong> – Cronograma para elaboração e entrega do projeto</li>
                <li><strong>Formalização da contratação</strong> – Envio de contrato e condições comerciais</li>
            </ul>

            <div class="info-box" style="margin: 20px 0; background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-left-color: var(--accent-color);">
                <h4 style="color: var(--accent-color);"><i class="fas fa-hard-hat"></i> Projeto Técnico de Qualidade</h4>
                <p>Investir em um projeto técnico elaborado por profissional habilitado é investir na <strong>segurança dos trabalhadores</strong> e na <strong>proteção jurídica da empresa</strong>. Um projeto bem elaborado faz a diferença na execução segura da obra.</p>
            </div>

            <div class="responsible-card">
                <div class="responsible-avatar"><i class="fas fa-user-tie"></i></div>
                <p class="responsible-name">${a.elaborador.nome}</p>
                <p class="responsible-role">${a.elaborador.cargo}</p>
                <p class="responsible-company">EngMarq Solution Ltda.</p>
                <div class="responsible-contacts">
                    <div class="responsible-contact-item"><i class="fas fa-envelope"></i><span>${a.elaborador.email}</span></div>
                    <div class="responsible-contact-item"><i class="fab fa-whatsapp"></i><span>${a.elaborador.telefone}</span></div>
                    <div class="responsible-contact-item"><i class="fab fa-instagram"></i><span>${a.elaborador.instagram}</span></div>
                </div>
            </div>

            <div class="contact-content" style="margin-top: 30px;">
                <div class="contact-icon">
                    <i class="fas fa-handshake"></i>
                </div>
                <h2 class="contact-title">Fale Conosco</h2>
                <p class="contact-subtitle">
                    Estamos à disposição para dar continuidade ao processo de contratação e esclarecer eventuais dúvidas sobre o projeto.
                </p>

                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fab fa-whatsapp"></i>
                        <span>+55 84 99928-5888</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>engmarqsolution@gmail.com</span>
                    </div>
                    <div class="contact-item">
                        <i class="fab fa-instagram"></i>
                        <span>@engmarq_solution</span>
                    </div>
                </div>

                <div class="contact-signature">
                    <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="signature-logo">
                    <p class="signature-text">
                        <strong>EngMarq Solution</strong><br>
                        Engenharia de Segurança e Saúde do Trabalho<br>
                        <em style="color: var(--primary-color); font-style: italic; font-size: 11px;">Garantindo segurança jurídica para sua empresa.</em><br>
                        Natal - Rio Grande do Norte
                    </p>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">09</span>
            </div>
        </div>
    `}function P(a,s,t,n,i){const o=a.razaoSocial;let r="";return i&&n>0&&(r=`
            <div style="background: linear-gradient(135deg, #38a169 0%, #2f855a 100%); color: #fff; padding: 12px 20px; border-radius: 10px; text-align: center; margin: 10px 0;">
                <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px; opacity: 0.9;"><i class="fas fa-tag"></i> Desconto Especial Aplicado</p>
                <p style="font-size: 14px; margin: 0;"><s style="opacity: 0.7;">De ${p(s)}</s> &nbsp;<strong style="font-size: 18px;">${n}% OFF</strong></p>
            </div>`),`
        <!-- ====== PÁGINA 1: CAPA ====== -->
        <div class="page page-cover">
            <span style="position: absolute; top: 25mm; left: 0; right: 0; text-align: center; font-family: var(--font-primary); font-size: 14px; font-weight: 700; color: var(--accent-color); letter-spacing: 3px;">${a.numero}</span>
            
            <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="cover-logo">
            
            <span class="cover-badge">
                <i class="fas fa-exclamation-circle"></i>
                Nova Obrigação Legal - NR-01
            </span>

            <div class="cover-icon">
                <i class="fas fa-brain"></i>
            </div>

            <h1 class="cover-title">
                Proposta Comercial<br>
                <span>Avaliação de Fatores de Riscos Psicossociais</span>
            </h1>
            <p class="cover-subtitle">
                Proposta técnica para adequação à atualização da NR-01 do Ministério do Trabalho
            </p>
            
            <div class="cover-client">
                <p class="cover-client-label">Proposta elaborada para</p>
                <p class="cover-client-name">${o}</p>
            </div>

            <p class="cover-date">
                <i class="fas fa-calendar-alt"></i>&nbsp;&nbsp;
                ${a.data}
            </p>

            <div class="cover-footer">
                <p>EngMarq Solution | Engenharia de Segurança e Saúde do Trabalho | Natal - RN</p>
            </div>
        </div>

        <!-- ====== PÁGINA 2: SOBRE A EMPRESA CONTRATANTE ====== -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">1</span>
                <span class="section-title-text">Sobre a Empresa Contratante</span>
            </h2>

            <h3 class="subsection-title"><i class="fas fa-building"></i> Dados da Empresa</h3>
            
            <div class="company-info-grid">
                <div class="company-info-item">
                    <label>Razão Social</label>
                    <span>${a.razaoSocial}</span>
                </div>
                <div class="company-info-item">
                    <label>CNPJ</label>
                    <span>${a.cnpj}</span>
                </div>
                <div class="company-info-item">
                    <label>Nome Fantasia</label>
                    <span>${o}</span>
                </div>
                <div class="company-info-item">
                    <label>Quantidade de Colaboradores</label>
                    <span>${a.qtdColaboradores||"—"} colaboradores</span>
                </div>
                <div class="company-info-item">
                    <label>Endereço</label>
                    <span>${a.endereco}</span>
                </div>
                <div class="company-info-item">
                    <label>Bairro</label>
                    <span>${a.bairro}</span>
                </div>
                <div class="company-info-item">
                    <label>CEP</label>
                    <span>${a.cep}</span>
                </div>
                <div class="company-info-item">
                    <label>Município / UF</label>
                    <span>${a.cidade} - ${a.uf}</span>
                </div>
            </div>

            ${a.solicitante.nome?`
            <h3 class="subsection-title" style="margin-top: 20px;"><i class="fas fa-user"></i> Solicitante</h3>
            <div class="company-info-grid">
                <div class="company-info-item"><label>Nome</label><span>${a.solicitante.nome}</span></div>
                <div class="company-info-item"><label>Cargo</label><span>${a.solicitante.cargo||"-"}</span></div>
                <div class="company-info-item"><label>E-mail</label><span>${a.solicitante.email||"-"}</span></div>
                <div class="company-info-item"><label>Telefone</label><span>${a.solicitante.telefone||"-"}</span></div>
            </div>
            `:""}

            <div class="info-box" style="margin-top: 25px; background: linear-gradient(135deg, #f9f0ff 0%, #ede9fe 100%); border-left-color: var(--accent-color);">
                <h4 style="color: var(--accent-color);"><i class="fas fa-handshake"></i> Proposta Especializada</h4>
                <p>Esta proposta foi desenvolvida para atender às necessidades de avaliação dos fatores de riscos psicossociais da empresa, em total conformidade com a NR-01 atualizada e com foco na segurança jurídica da organização.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">02</span>
            </div>
        </div>

        <!-- ====== PÁGINA 3: DADOS DA EMPRESA CONTRATADA ====== -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number"><i class="fas fa-building"></i></span>
                <span class="section-title-text">Dados da Empresa Contratada</span>
            </h2>

            <div class="info-box" style="margin-bottom: 25px; background: linear-gradient(135deg, #f9f0ff 0%, #ede9fe 100%); border-left-color: var(--accent-color);">
                <h4 style="color: var(--accent-color);"><i class="fas fa-info-circle"></i> Informações para Faturamento e Contrato</h4>
                <p>Abaixo estão os dados cadastrais da EngMarq Solution para formalização contratual e emissão de documentos fiscais.</p>
            </div>

            <div style="background: var(--light-color); border-radius: 12px; padding: 30px; margin-bottom: 25px;">
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid var(--accent-color);">
                    <img src="assets/logoengmarq.png" alt="EngMarq Solution" style="height: 60px;">
                    <div>
                        <h3 style="font-family: var(--font-primary); color: var(--primary-color); font-size: 20px; margin-bottom: 5px;">EngMarq Solution LTDA</h3>
                        <p style="margin: 0; color: var(--gray-color); font-size: 13px;">Engenharia de Segurança e Saúde do Trabalho</p>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid var(--primary-color);">
                        <p style="margin: 0 0 5px 0; font-size: 12px; color: var(--gray-color); text-transform: uppercase; letter-spacing: 1px;">CNPJ</p>
                        <p style="margin: 0; font-size: 16px; font-weight: 600; color: var(--dark-color);">60.545.359/0001-76</p>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid var(--primary-color);">
                        <p style="margin: 0 0 5px 0; font-size: 12px; color: var(--gray-color); text-transform: uppercase; letter-spacing: 1px;">Razão Social</p>
                        <p style="margin: 0; font-size: 16px; font-weight: 600; color: var(--dark-color);">Engmarq Solution LTDA</p>
                    </div>
                </div>
            </div>

            <div class="highlight-box">
                <p><strong><i class="fas fa-file-contract"></i> Documentação:</strong> Todos os documentos societários, certidões e comprovações de regularidade fiscal estão disponíveis mediante solicitação para processo de homologação de fornecedores.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">03</span>
            </div>
        </div>

        <!-- ====== PÁGINA 4: CONTEXTO E OBRIGAÇÃO LEGAL ====== -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">2</span>
                <span class="section-title-text">Contexto e Obrigação Legal</span>
            </h2>

            <div class="alert-box">
                <h4><i class="fas fa-gavel"></i> Atenção: Nova Obrigação Legal</h4>
                <p>A atualização da <strong>NR-01</strong> pelo Ministério do Trabalho estabelece que <strong>todas as empresas</strong> devem realizar a avaliação e gestão dos <strong>Fatores de Riscos Psicossociais</strong> no ambiente de trabalho.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-file-contract"></i> O que mudou na NR-01?</h3>
            <p>
                A Norma Regulamentadora nº 01, que trata das disposições gerais sobre saúde e segurança no trabalho, foi atualizada para incluir explicitamente a obrigatoriedade de identificação, avaliação e gestão dos <strong>riscos psicossociais</strong> no Programa de Gerenciamento de Riscos (PGR).
            </p>
            <p>
                Essa mudança reconhece que fatores relacionados à organização do trabalho, às relações interpessoais e ao ambiente organizacional podem impactar significativamente a saúde mental e o bem-estar dos trabalhadores.
            </p>

            <div class="highlight-box">
                <p><strong>Prazo de adequação:</strong> As empresas devem se adequar às novas exigências imediatamente, incluindo a avaliação dos fatores de riscos psicossociais em seus programas de SST. O descumprimento pode resultar em autuações, multas e passivos trabalhistas significativos.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-exclamation-triangle"></i> Riscos Jurídicos do Não Cumprimento</h3>
            <ul class="feature-list">
                <li><strong>Multas e autuações</strong> em fiscalizações do Ministério do Trabalho e Emprego</li>
                <li><strong>Processos trabalhistas</strong> relacionados a doenças ocupacionais de origem psíquica</li>
                <li><strong>Ações regressivas</strong> do INSS por afastamentos decorrentes de transtornos mentais</li>
                <li><strong>Responsabilização civil e criminal</strong> em casos de omissão comprovada</li>
                <li><strong>Danos à imagem</strong> institucional e reputação da empresa</li>
                <li><strong>Aumento do FAP</strong> (Fator Acidentário de Prevenção) e custos previdenciários</li>
            </ul>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">04</span>
            </div>
        </div>

        <!-- ====== PÁGINA 5: O QUE SÃO FATORES DE RISCOS PSICOSSOCIAIS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">3</span>
                <span class="section-title-text">O que são Fatores de Riscos Psicossociais?</span>
            </h2>

            <p>
                Os <strong>Fatores de Riscos Psicossociais</strong> são aspectos da organização e gestão do trabalho, bem como do contexto social e ambiental, que têm potencial de causar danos psicológicos, sociais ou físicos aos trabalhadores.
            </p>

            <div class="info-box" style="background: linear-gradient(135deg, #f9f0ff 0%, #ede9fe 100%); border-left-color: var(--accent-color);">
                <h4 style="color: var(--accent-color);"><i class="fas fa-brain"></i> Definição Técnica</h4>
                <p>São elementos presentes no <strong>ambiente de trabalho</strong> que podem afetar a saúde mental, o bem-estar psicológico e a qualidade de vida dos trabalhadores, incluindo aspectos organizacionais, relacionais e contextuais.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-list-check"></i> Principais Fatores Avaliados</h3>

            <div class="factors-grid">
                <div class="factor-card">
                    <h4><i class="fas fa-building"></i> Ambiente Organizacional</h4>
                    <p>Clima organizacional, cultura da empresa, valores institucionais e políticas de gestão de pessoas.</p>
                </div>
                <div class="factor-card">
                    <h4><i class="fas fa-clock"></i> Carga de Trabalho</h4>
                    <p>Volume de demandas, ritmo de trabalho, prazos, pressão por resultados e metas estabelecidas.</p>
                </div>
                <div class="factor-card">
                    <h4><i class="fas fa-users"></i> Relações Interpessoais</h4>
                    <p>Qualidade das relações com colegas e lideranças, comunicação, conflitos e suporte social.</p>
                </div>
                <div class="factor-card">
                    <h4><i class="fas fa-hand-paper"></i> Assédio e Violência</h4>
                    <p>Ocorrência de assédio moral, sexual, discriminação e qualquer forma de violência no trabalho.</p>
                </div>
                <div class="factor-card">
                    <h4><i class="fas fa-balance-scale"></i> Autonomia e Controle</h4>
                    <p>Grau de autonomia nas tarefas, participação nas decisões e controle sobre o próprio trabalho.</p>
                </div>
                <div class="factor-card">
                    <h4><i class="fas fa-home"></i> Equilíbrio Trabalho-Vida</h4>
                    <p>Compatibilidade entre demandas profissionais e vida pessoal, flexibilidade e jornada de trabalho.</p>
                </div>
                <div class="factor-card">
                    <h4><i class="fas fa-award"></i> Reconhecimento</h4>
                    <p>Valorização do trabalho, feedback, oportunidades de crescimento e desenvolvimento profissional.</p>
                </div>
                <div class="factor-card">
                    <h4><i class="fas fa-shield-alt"></i> Segurança no Emprego</h4>
                    <p>Estabilidade, clareza sobre o futuro profissional e condições contratuais adequadas.</p>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">05</span>
            </div>
        </div>

        <!-- ====== PÁGINA 6: IMPORTÂNCIA E BENEFÍCIOS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">4</span>
                <span class="section-title-text">Importância e Benefícios da Avaliação</span>
            </h2>

            <h3 class="subsection-title"><i class="fas fa-chart-line"></i> Cenário Atual</h3>
            <p>
                Os <strong>transtornos mentais e comportamentais</strong> figuram entre as principais causas de afastamento do trabalho no Brasil. Ansiedade, depressão, burnout e estresse ocupacional têm apresentado crescimento expressivo, impactando diretamente a produtividade das empresas e gerando passivos trabalhistas e previdenciários.
            </p>

            <div class="info-box">
                <h4><i class="fas fa-shield-alt"></i> Segurança Jurídica</h4>
                <p>A avaliação preventiva dos fatores de riscos psicossociais é a principal ferramenta para demonstrar a diligência da empresa no cumprimento das obrigações legais, protegendo a organização de autuações, processos e responsabilizações.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-star"></i> Benefícios para a Empresa</h3>
            <ul class="feature-list">
                <li><strong>Conformidade legal</strong> com a atualização da NR-01 e proteção contra autuações</li>
                <li><strong>Prevenção de passivos trabalhistas</strong> relacionados a doenças ocupacionais psíquicas</li>
                <li><strong>Redução do absenteísmo</strong> por problemas de saúde mental</li>
                <li><strong>Diminuição da rotatividade</strong> e custos com desligamentos e contratações</li>
                <li><strong>Melhoria da produtividade</strong> e engajamento dos colaboradores</li>
                <li><strong>Ambiente de trabalho saudável</strong> e melhoria do clima organizacional</li>
                <li><strong>Fortalecimento da marca empregadora</strong> e reputação institucional</li>
                <li><strong>Redução de custos</strong> com planos de saúde e afastamentos previdenciários</li>
            </ul>

            <div class="highlight-box">
                <p><strong>Investimento preventivo:</strong> A avaliação e gestão adequada dos riscos psicossociais representa um investimento na saúde organizacional, com impactos positivos na redução de custos operacionais, melhoria do clima de trabalho e proteção jurídica da empresa.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">06</span>
            </div>
        </div>

        <!-- ====== PÁGINA 7: METODOLOGIA ====== -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">5</span>
                <span class="section-title-text">Metodologia de Avaliação</span>
            </h2>

            <p>Nossa metodologia de avaliação dos Fatores de Riscos Psicossociais segue um fluxo técnico estruturado, com coleta de dados quantitativos e qualitativos, utilizando instrumentos validados cientificamente e em conformidade com a NR-01:</p>

            <div class="methodology-steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h4>Planejamento e Sensibilização da Liderança</h4>
                        <p>Reunião estratégica com a alta gestão e lideranças para apresentação do projeto, alinhamento de expectativas, definição de cronograma e engajamento organizacional para adesão dos colaboradores.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h4>Aplicação de Instrumentos Psicossociais Validados</h4>
                        <p>Coleta de dados por meio de questionários padronizados e validados cientificamente, garantindo confidencialidade, anonimato e adesão ética às diretrizes de pesquisa em saúde ocupacional.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h4>Análise Documental e Indicadores de RH <em style="font-weight: 400; color: var(--gray-color);">(caso dados disponíveis)</em></h4>
                        <p>Revisão de indicadores organizacionais (absenteísmo, turnover, afastamentos por CID-F, atestados médicos), políticas internas e histórico de ocorrências relacionadas à saúde mental.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                        <h4>Análise por Setor, Função e Grupo de Exposição</h4>
                        <p>Segmentação dos dados coletados por áreas, cargos e grupos homogêneos de exposição, permitindo identificação de fatores de risco específicos de cada contexto organizacional.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">5</div>
                    <div class="step-content">
                        <h4>Classificação dos Riscos: Criticidade e Probabilidade</h4>
                        <p>Aplicação de matriz de risco para classificação por índice de criticidade e probabilidade de ocorrência, priorizando ações conforme impacto potencial na saúde dos trabalhadores.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">6</div>
                    <div class="step-content">
                        <h4>Elaboração do Relatório Técnico</h4>
                        <p>Relatório técnico detalhado com diagnóstico, classificação dos riscos, recomendações preventivas e corretivas conforme metodologia validada.</p>
                    </div>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">07</span>
            </div>
        </div>

        <!-- ====== PÁGINA 8: ENTREGÁVEIS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">6</span>
                <span class="section-title-text">Entregáveis e Escopo dos Serviços</span>
            </h2>

            <div class="info-box" style="margin-bottom: 15px; background: linear-gradient(135deg, #f9f0ff 0%, #ede9fe 100%); border-left-color: var(--accent-color);">
                <p style="margin: 0;"><strong><i class="fas fa-users"></i> Abrangência:</strong> Avaliação para <strong>${a.qtdColaboradores||"—"} colaboradores</strong></p>
            </div>

            <p>Ao final do trabalho, a empresa receberá os seguintes documentos técnicos, todos elaborados em conformidade com a NR-01 e metodologias reconhecidas:</p>

            <h3 class="subsection-title"><i class="fas fa-file-pdf"></i> Documentos Técnicos (PDF)</h3>

            <div class="deliverables-grid">
                <div class="deliverable-item">
                    <div class="deliverable-icon"><i class="fas fa-file-alt"></i></div>
                    <div class="deliverable-text">
                        <h4>Relatório Técnico de Avaliação de Riscos Psicossociais</h4>
                        <p>Documento completo com diagnóstico organizacional, análise quantitativa e qualitativa, classificação por criticidade e probabilidade, mapeamento por setor/função e indicadores de risco.</p>
                    </div>
                </div>
                <div class="deliverable-item">
                    <div class="deliverable-icon"><i class="fas fa-tasks"></i></div>
                    <div class="deliverable-text">
                        <h4>Plano de Ação Preventivo e Corretivo</h4>
                        <p>Recomendações técnicas estruturadas com medidas de controle, prazos sugeridos, responsáveis indicados e priorização conforme matriz de risco.</p>
                    </div>
                </div>
                <div class="deliverable-item">
                    <div class="deliverable-icon"><i class="fas fa-clipboard-check"></i></div>
                    <div class="deliverable-text">
                        <h4>AEP – Avaliação Ergonômica Preliminar</h4>
                        <p>Análise das condições ergonômicas correlacionadas aos fatores psicossociais identificados (quando aplicável ao contexto).</p>
                    </div>
                </div>
                <div class="deliverable-item">
                    <div class="deliverable-icon"><i class="fas fa-chalkboard-teacher"></i></div>
                    <div class="deliverable-text">
                        <h4>2 Palestras de Conscientização</h4>
                        <p>Duas palestras sobre Fatores de Riscos Psicossociais no ambiente de trabalho para sensibilização dos colaboradores.</p>
                    </div>
                </div>
            </div>

            <div class="info-box" style="margin-top: 15px;">
                <h4><i class="fas fa-shield-alt"></i> Validade Legal e Técnica</h4>
                <p>Todos os documentos são assinados por profissionais habilitados, em conformidade com a NR-01 e metodologias validadas cientificamente, garantindo aceitação em fiscalizações do MTE e processos trabalhistas.</p>
            </div>

            <div class="info-box" style="margin-top: 15px; background: linear-gradient(135deg, #f9f0ff 0%, #ede9fe 100%); border-left-color: var(--accent-color);">
                <h4 style="color: var(--accent-color);"><i class="fas fa-gift"></i> Bônus Inclusos no Pacote</h4>
                <p style="margin-bottom: 8px;"><strong>• Campanha Janeiro Branco</strong> – Material de conscientização sobre saúde mental para divulgação interna</p>
                <p style="margin: 0;"><strong>• Reavaliação Trimestral</strong> – Uma reavaliação dos fatores de riscos psicossociais após 3 meses da entrega do relatório inicial</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">08</span>
            </div>
        </div>

        <!-- ====== PÁGINA 9: SERVIÇOS COMPLEMENTARES ====== -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">7</span>
                <span class="section-title-text">Serviços Complementares Disponíveis</span>
            </h2>

            <p>Além da avaliação obrigatória, a EngMarq Solution oferece um portfólio completo de serviços para <strong>gestão contínua dos riscos psicossociais</strong> e <strong>promoção da saúde mental no trabalho</strong>:</p>

            <h3 class="subsection-title"><i class="fas fa-chart-line"></i> Gestão e Monitoramento de Riscos Psicossociais</h3>
            <ul class="feature-list" style="margin-bottom: 20px;">
                <li>Monitoramento contínuo dos riscos identificados com indicadores de acompanhamento</li>
                <li>Apoio técnico à empresa na gestão dos fatores psicossociais</li>
                <li>Recomendações preventivas e corretivas periódicas</li>
                <li>Integração com RH, CIPA, SIPAT e programas de SST</li>
                <li>Reavaliações anuais com comparativo evolutivo</li>
            </ul>

            <h3 class="subsection-title"><i class="fas fa-heart"></i> Programas de Saúde Mental no Trabalho</h3>
            <ul class="feature-list" style="margin-bottom: 20px;">
                <li>Programas contínuos de promoção da saúde mental organizacional</li>
                <li>Grupos de escuta e rodas de conversa com colaboradores</li>
                <li>Dinâmicas de clima organizacional e bem-estar</li>
                <li>Práticas de mindfulness e atenção plena no ambiente corporativo</li>
                <li>Campanhas institucionais: Janeiro Branco, Setembro Amarelo</li>
                <li>Apoio técnico a ações de prevenção ao assédio moral e sexual</li>
                <li>Suporte à criação e gestão de canal de denúncia</li>
            </ul>

            <h3 class="subsection-title"><i class="fas fa-chalkboard-teacher"></i> Treinamentos e Capacitações Psicossociais</h3>
            <ul class="feature-list" style="margin-bottom: 20px;">
                <li><strong>Sensibilização sobre Saúde Mental no Trabalho</strong> – para todos os colaboradores</li>
                <li><strong>Capacitação de Lideranças em Riscos Psicossociais</strong> – gestão de equipes saudáveis</li>
                <li><strong>Primeiros Socorros Psicológicos</strong> – apoio inicial em crises emocionais</li>
                <li><strong>Comunicação Saudável e Prevenção de Conflitos</strong> – relacionamento interpessoal</li>
                <li><strong>Ambientes Psicologicamente Seguros</strong> – preparação de equipes</li>
            </ul>

            <div class="info-box">
                <h4><i class="fas fa-info-circle"></i> Contratação Sob Demanda</h4>
                <p>Os serviços complementares acima não estão incluídos no valor desta proposta e podem ser contratados separadamente, conforme necessidade e interesse da empresa.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">09</span>
            </div>
        </div>

        <!-- ====== PÁGINA 10: INVESTIMENTO ====== -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">8</span>
                <span class="section-title-text">Investimento</span>
            </h2>

            <div class="highlight-box" style="margin-bottom: 15px;">
                <p style="margin: 0;"><strong><i class="fas fa-users"></i> Abrangência:</strong> Serviço dimensionado para <strong>${a.qtdColaboradores||"—"} colaboradores</strong></p>
            </div>

            <p>O valor abaixo corresponde ao investimento global para execução completa dos serviços de <strong>Avaliação de Fatores de Riscos Psicossociais</strong> descritos nesta proposta:</p>

            ${r}

            <div class="investment-highlight" style="background: linear-gradient(135deg, #1a365d 0%, #234876 100%); color: #fff; padding: 30px 35px; border-radius: 12px; text-align: center; margin: 15px 0;">
                <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; opacity: 0.9;">Investimento</p>
                <p style="font-size: 48px; font-weight: 800; font-family: 'Montserrat', sans-serif; margin-bottom: 8px; letter-spacing: 1px;">R$ ${p(t)}</p>
                <p style="font-size: 13px; opacity: 0.85;">(${f(t)})</p>
            </div>

            <div class="info-box" style="margin: 10px 0; padding: 10px 12px;">
                <h4><i class="fas fa-money-bill-wave"></i> Forma de Pagamento</h4>
                <p><strong>50%</strong> na aprovação da proposta e <strong>50%</strong> na entrega do relatório final. Outras condições podem ser negociadas.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-check-circle"></i> O Que Está Incluso</h3>
            
            <div class="included-services" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px; font-size: 10px;">
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i>
                    <span>Aplicação de questionário validado cientificamente</span>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i>
                    <span>Análise técnica dos dados coletados</span>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i>
                    <span>Relatório Técnico de Avaliação de Riscos Psicossociais</span>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i>
                    <span>Plano de Ação com medidas preventivas</span>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i>
                    <span>AEP – Avaliação Ergonômica Preliminar</span>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i>
                    <span>2 Palestras de Conscientização sobre Riscos Psicossociais</span>
                </div>
            </div>

            <div class="info-box" style="background: linear-gradient(135deg, #f9f0ff 0%, #ede9fe 100%); border-left-color: var(--accent-color); margin-bottom: 15px;">
                <h4 style="color: var(--accent-color);"><i class="fas fa-gift"></i> Bônus Inclusos no Pacote</h4>
                <p style="margin-bottom: 5px;"><strong>• Campanha Janeiro Branco</strong> – Material de conscientização sobre saúde mental</p>
                <p style="margin: 0;"><strong>• Reavaliação Trimestral</strong> – Uma reavaliação dos riscos psicossociais após 3 meses</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">10</span>
            </div>
        </div>

        <!-- ====== PÁGINA 11: CONDIÇÕES COMERCIAIS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">9</span>
                <span class="section-title-text">Condições Comerciais</span>
            </h2>

            <div class="conditions-list">
                <div class="condition-item">
                    <div class="condition-icon"><i class="fas fa-calendar-check"></i></div>
                    <div class="condition-text">
                        <strong>Validade da Proposta</strong>
                        <span>Esta proposta comercial é válida por 15 (quinze) dias a partir da data de emissão.</span>
                    </div>
                </div>
                <div class="condition-item">
                    <div class="condition-icon"><i class="fas fa-credit-card"></i></div>
                    <div class="condition-text">
                        <strong>Condições de Pagamento</strong>
                        <span>50% na aprovação da proposta e 50% na entrega do relatório final. Outras condições podem ser negociadas.</span>
                    </div>
                </div>
                <div class="condition-item">
                    <div class="condition-icon"><i class="fas fa-clock"></i></div>
                    <div class="condition-text">
                        <strong>Prazo de Execução</strong>
                        <span>A avaliação será concluída em até 20 (vinte) dias úteis após a aprovação, condicionado à disponibilidade para aplicação dos questionários e fornecimento dos dados necessários pela empresa.</span>
                    </div>
                </div>
                <div class="condition-item">
                    <div class="condition-icon"><i class="fas fa-user-shield"></i></div>
                    <div class="condition-text">
                        <strong>Confidencialidade</strong>
                        <span>Garantimos total sigilo sobre as informações coletadas. Os dados individuais são anonimizados e apenas resultados agregados são apresentados no relatório.</span>
                    </div>
                </div>
                <div class="condition-item">
                    <div class="condition-icon"><i class="fas fa-headset"></i></div>
                    <div class="condition-text">
                        <strong>Suporte Pós-Entrega</strong>
                        <span>Suporte técnico por 60 dias após a entrega para esclarecimento de dúvidas sobre o relatório e orientações sobre o plano de ação.</span>
                    </div>
                </div>
            </div>

            <div class="info-box">
                <h4><i class="fas fa-certificate"></i> Garantia Técnica</h4>
                <p>Todos os trabalhos são realizados por profissionais qualificados, utilizando metodologias validadas cientificamente e em conformidade com as exigências da NR-01 atualizada.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-handshake"></i> O que a empresa precisa fornecer</h3>
            <ul class="feature-list">
                <li>Lista de colaboradores por setor/área para dimensionamento</li>
                <li>Acesso aos colaboradores para aplicação dos questionários</li>
                <li>Indicadores de RH dos últimos 12 meses <em style="color: var(--gray-color);">(caso disponíveis)</em></li>
                <li>Disponibilidade da liderança para reuniões de alinhamento e apresentação</li>
            </ul>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">11</span>
            </div>
        </div>

        <!-- ====== PÁGINA 12: ENCERRAMENTO E CONTATO ====== -->
        <div class="page page-contact">
            <div class="page-header">
                <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <div class="contact-content">
                <div class="contact-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <h2 class="contact-title">Garanta a Segurança Jurídica da sua Empresa</h2>
                <p class="contact-subtitle">
                    A avaliação dos Fatores de Riscos Psicossociais é uma <strong>obrigação legal</strong> prevista na NR-01 atualizada. Conte com o apoio técnico especializado da EngMarq Solution para adequar sua empresa e protegê-la de passivos trabalhistas.
                </p>

                <div class="alert-box" style="text-align: left; max-width: 450px; margin: 0 auto 30px;">
                    <h4><i class="fas fa-gavel"></i> Não deixe para depois</h4>
                    <p>Empresas que não realizarem a avaliação estão sujeitas a multas, autuações e responsabilização em processos trabalhistas relacionados à saúde mental dos colaboradores.</p>
                </div>

                <div class="responsible-card">
                    <div class="responsible-avatar"><i class="fas fa-user-tie"></i></div>
                    <p class="responsible-name">${a.elaborador.nome}</p>
                    <p class="responsible-role">${a.elaborador.cargo}</p>
                    <p class="responsible-company">EngMarq Solution Ltda.</p>
                    <div class="responsible-contacts">
                        <div class="responsible-contact-item"><i class="fas fa-envelope"></i><span>${a.elaborador.email}</span></div>
                        <div class="responsible-contact-item"><i class="fab fa-whatsapp"></i><span>${a.elaborador.telefone}</span></div>
                        <div class="responsible-contact-item"><i class="fab fa-instagram"></i><span>${a.elaborador.instagram}</span></div>
                    </div>
                </div>

                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fab fa-whatsapp"></i>
                        <span>+55 84 99928-5888</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>engmarqsolution@gmail.com</span>
                    </div>
                    <div class="contact-item">
                        <i class="fab fa-instagram"></i>
                        <span>@engmarq_solution</span>
                    </div>
                </div>

                <div class="contact-signature">
                    <img src="assets/logoengmarq.png" alt="EngMarq Solution" class="signature-logo">
                    <p class="signature-text">
                        <strong>EngMarq Solution</strong><br>
                        Engenharia de Segurança e Saúde do Trabalho<br>
                        <em style="color: var(--primary-color); font-style: italic; font-size: 11px;">Garantindo segurança jurídica para sua empresa.</em><br>
                        Natal - Rio Grande do Norte
                    </p>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">12</span>
            </div>
        </div>
    `}function A(a){return{numero:a.codigoProposta,data:b(a.dataProposta),razaoSocial:a.razaoSocial,cnpj:a.cnpj,endereco:a.endereco,bairro:a.bairro,cep:a.cep,cidade:a.cidade,uf:a.estado,qtdColaboradores:a.qtdColaboradores,elaborador:a.elaborador,solicitante:a.solicitante}}function C(a,s,t,n,i,o){switch(a){case"brigada":return S(s,t,n,i,o);case"plataforma":return z(s,t,n,i,o);case"psicossocial":return P(s,t,n,i,o);default:throw new Error(`Tipo de proposta não suportado: ${a}`)}}function T(a,s,t,n,i,o){const r=u[a],l=A(s),d=C(a,l,t,n,i,o);return`<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proposta ${l.numero} - ${l.razaoSocial}</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        ${q()}
        
        /* Ajuste de cor por tipo de proposta */
        :root {
            --accent-color: ${r.color};
        }
    </style>
</head>
<body>
    <!-- Controles de PDF -->
    <div class="pdf-controls">
        <button class="btn-generate" onclick="window.print()">
            <i class="fas fa-file-pdf"></i>
            Gerar PDF
        </button>
        <div class="pdf-instructions">
            <h4><i class="fas fa-info-circle"></i> Como gerar o PDF:</h4>
            <ol>
                <li>Clique no botão acima</li>
                <li>Selecione <strong>"Salvar como PDF"</strong></li>
                <li>Clique em <strong>"Salvar"</strong></li>
            </ol>
        </div>
    </div>

    <!-- Conteúdo do PDF -->
    <div id="pdf-content">
        ${d}
    </div>

    <script>
        // Atalho de teclado para impressão
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                window.print();
            }
        });

        console.log('📄 Proposta ${l.numero} gerada com sucesso!');
        console.log('💡 Pressione Ctrl+P ou clique em "Gerar PDF"');
    <\/script>
</body>
</html>`}function e(a){const s=document.getElementById(a);if(!s)throw new Error(`Elemento não encontrado: ${a}`);return s}function m(){const a=e("valor_proposta").value,s=h(a),t=e("aplicar_desconto").checked,n=parseFloat(e("percentual_desconto").value)||0;let i="";if(t&&n>0){const o=x(s,n);i=`<div class="original">R$ ${p(s)}</div>
                <span class="discount-badge">${n}% OFF</span>
                <div class="final">R$ ${p(o)}</div>`}else i=`<div class="final">R$ ${p(s)}</div>`;e("value-summary").innerHTML=i}const v={brigada:{icon:"fas fa-fire-extinguisher",titleTop:"TREINAMENTO",titleMain:"BRIGADA DE INCÊNDIO",subtitle:"Capacitação teórica e prática conforme Instrução Técnica IT 17/2025 do Corpo de Bombeiros Militar do RN (CBMRN)"},plataforma:{icon:"fas fa-hard-hat",titleTop:"PROJETO TÉCNICO",titleMain:"PLATAFORMA SECUNDÁRIA",subtitle:"Projeto técnico de engenharia para plataforma secundária em conformidade com a NR-18"},psicossocial:{icon:"fas fa-brain",titleTop:"AVALIAÇÃO",titleMain:"RISCOS PSICOSSOCIAIS",subtitle:"Avaliação dos Fatores de Riscos Psicossociais conforme exigência da NR-01 atualizada"}};function g(){const a=e("tipo_proposta").value,s=e("numero_proposta").value||"TM0000",t=e("data_proposta").value,n=e("razao_social").value||"Nome da Empresa",i=e("preview-page");i.className="preview-page "+a,e("preview-badge").textContent=s;const o=v[a]||v.brigada;e("preview-icon").innerHTML=`<i class="${o.icon}"></i>`,e("preview-title-top").textContent=o.titleTop,e("preview-title-main").textContent=o.titleMain,e("preview-subtitle").textContent=o.subtitle,e("preview-client-name").textContent=n,t&&(e("preview-date").innerHTML=`
            <i class="far fa-calendar-alt"></i>
            <span>${b(t)}</span>
        `)}function R(){const a=new Date;e("data_proposta").value=a.toISOString().split("T")[0],e("aplicar_desconto").addEventListener("change",function(){e("discount-field").style.display=this.checked?"block":"none",m()}),e("tipo_proposta").addEventListener("change",function(){const n=this.value,i=document.querySelector(".form-section:has(#num_colaboradores)");i&&(i.style.display=n==="psicossocial"?"block":"none"),g()}),e("percentual_desconto").addEventListener("input",m),e("valor_proposta").addEventListener("input",m);const s=e("tipo_proposta").value,t=document.querySelector(".form-section:has(#num_colaboradores)");t&&(t.style.display=s==="psicossocial"?"block":"none"),e("btn-gerar-proposta").addEventListener("click",y),e("numero_proposta").addEventListener("input",g),e("data_proposta").addEventListener("change",g),e("razao_social").addEventListener("input",g),m(),g()}function y(){const a=e("tipo_proposta").value;if(!E(a)){alert("Tipo de proposta inválido");return}const s=a,t={codigoProposta:e("numero_proposta").value||"TM0000",dataProposta:e("data_proposta").value,razaoSocial:e("razao_social").value,nomeFantasia:e("razao_social").value,cnpj:e("cnpj").value,endereco:e("endereco").value,bairro:e("bairro").value,cep:e("cep").value,cidade:e("cidade").value,estado:e("uf").value,qtdColaboradores:e("num_colaboradores").value||"",elaborador:{nome:e("elaborador_nome").value||"Thiago Marques",cargo:e("elaborador_cargo").value||"Diretor",email:e("elaborador_email").value||"engmarqsolution@gmail.com",telefone:e("elaborador_telefone").value||"+55 84 99928-5888",instagram:e("elaborador_instagram").value||"@engmarq_solution"},solicitante:{nome:e("solicitante_nome").value||"",cargo:e("solicitante_cargo").value||"",email:e("solicitante_email").value||"",telefone:e("solicitante_telefone").value||""}};if(!t.razaoSocial){alert("Por favor, preencha a Razão Social do cliente");return}const n=e("valor_proposta").value,i=h(n),o=e("aplicar_desconto").checked,r=parseFloat(e("percentual_desconto").value)||0,l=o?x(i,r):i,d=T(s,t,i,l,r,o),c=window.open("","_blank");c?(c.document.write(d),c.document.close()):alert("Não foi possível abrir a nova janela. Verifique se o bloqueador de pop-ups está ativado.")}document.addEventListener("DOMContentLoaded",R);window.configs=u;window.gerarProposta=y;window.atualizarValor=m;window.formatMoeda=p;
