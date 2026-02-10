import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                       */import{f as c,v as S,l as B,a as N,p as E,c as M}from"./logoengmarq-Ddl6KjhT.js";import{o as _,r as U}from"./usuarios-8b5f6MA8.js";const F={brigada:{icon:"fa-fire",badge:"Treinamento Especializado",titleTop:"TREINAMENTO",titleMain:"BRIGADA DE INCÊNDIO",subtitle:"Capacitação teórica e prática conforme Instrução Técnica IT 17/2025 do Corpo de Bombeiros Militar do RN (CBMRN)",color:"#dd6b20",headerTitle:"Proposta Comercial - Brigada de Incêndio"},plataforma:{icon:"fa-layer-group",badge:"Projeto Técnico – EPC",titleTop:"ELABORAÇÃO DE PROJETO",titleMain:"PLATAFORMA SECUNDÁRIA",subtitle:"Equipamento de Proteção Coletiva (EPC) conforme NR 18 – Condições e Meio Ambiente de Trabalho na Indústria da Construção",color:"#4a5568",headerTitle:"Proposta Comercial - Plataforma Secundária"},"plataforma-principal":{icon:"fa-layer-group",badge:"Projeto Técnico – EPC",titleTop:"ELABORAÇÃO DE PROJETO",titleMain:"PLATAFORMA PRINCIPAL E SECUNDÁRIA",subtitle:"Equipamento de Proteção Coletiva (EPC) conforme NR 18 – Condições e Meio Ambiente de Trabalho na Indústria da Construção",color:"#c05621",headerTitle:"Proposta Comercial - Plataforma Principal e Secundária"},psicossocial:{icon:"fa-brain",badge:"Avaliação Técnica – NR-01",titleTop:"AVALIAÇÃO DE",titleMain:"RISCOS PSICOSSOCIAIS",subtitle:"Avaliação dos Fatores de Riscos Psicossociais relacionados ao trabalho conforme atualização da NR-01",color:"#805ad5",headerTitle:"Proposta Comercial - Riscos Psicossociais"},assessoria:{icon:"fa-shield-alt",badge:"Assessoria Técnica Especializada",titleTop:"ASSESSORIA EM",titleMain:"SEGURANÇA DO TRABALHO",subtitle:"Equipe técnica especializada, gestão de programas de SST e treinamentos de capacitação para conformidade legal",color:"#38a169",headerTitle:"Proposta Comercial - Assessoria em SST"},"kit-sst":{icon:"fa-file-medical-alt",badge:"Kit Integrado SST",titleTop:"KIT INTEGRADO",titleMain:"DOCUMENTAÇÃO SST",subtitle:"PGR, PCMSO, LTCAT e Laudos Técnicos para conformidade com as Normas Regulamentadoras",color:"#3182ce",headerTitle:"Proposta Comercial - Kit Integrado SST"},treinamentos:{icon:"fa-chalkboard-teacher",badge:"Treinamentos em SST",titleTop:"PROPOSTA COMERCIAL",titleMain:"TREINAMENTOS EM SST",subtitle:"Capacitação especializada em Normas Regulamentadoras com metodologia prática, certificação imediata e total conformidade legal",color:"#dd6b20",headerTitle:"Proposta Comercial - Treinamentos em SST"}};function V(a){return a==="brigada"||a==="plataforma"||a==="plataforma-principal"||a==="psicossocial"||a==="assessoria"||a==="kit-sst"||a==="treinamentos"}function J(a){switch(a){case"brigada":return"#dd6b20";case"plataforma":return"#f5a623";case"plataforma-principal":return"#c05621";case"psicossocial":return"#805ad5";case"assessoria":return"#38a169";default:return"#f5a623"}}function H(a="brigada"){const e=J(a);return`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
            --primary-color: #1a365d;
            --secondary-color: #f5a623;
            --accent-color: ${e};
            --dark-color: #2d3748;
            --gray-color: #718096;
            --light-color: #f7fafc;
            --white-color: #ffffff;
            --success-color: #38a169;
            --alert-color: #e53e3e;
            --purple-color: #805ad5;
            --fire-color: #dd6b20;
            --font-primary: 'Montserrat', sans-serif;
            --font-secondary: 'Open Sans', sans-serif;
        }
        body { font-family: var(--font-secondary); color: var(--dark-color); line-height: 1.6; background: #e2e8f0; }
        
        .pdf-controls { position: fixed; top: 20px; right: 20px; z-index: 1000; background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 25px rgba(0,0,0,0.15); max-width: 280px; }
        .btn-generate { background: var(--primary-color); color: white; padding: 15px 30px; border: none; border-radius: 8px; font-family: var(--font-primary); font-weight: 600; font-size: 15px; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: all 0.3s ease; width: 100%; justify-content: center; }
        .btn-generate:hover { background: var(--accent-color); transform: translateY(-2px); box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
        .pdf-instructions { margin-top: 15px; padding: 15px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid var(--primary-color); }
        .pdf-instructions h4 { font-family: var(--font-primary); font-size: 13px; color: var(--primary-color); margin-bottom: 8px; }
        .pdf-instructions ol { font-size: 12px; line-height: 1.6; color: var(--dark-color); padding-left: 18px; margin: 0; }
        .pdf-instructions li { margin-bottom: 4px; }
        .pdf-instructions strong { color: var(--secondary-color); }
        
        #pdf-content { width: 210mm; margin: 0 auto; background: white; box-shadow: 0 0 30px rgba(0,0,0,0.1); }
        
        .page { width: 210mm; height: 297mm; min-height: 297mm; max-height: 297mm; padding: 15mm 15mm 22mm 15mm; page-break-after: always; position: relative; background: var(--white-color); box-sizing: border-box; overflow: hidden; }
        .page:last-child { page-break-after: auto; }
        
        .page-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; margin-bottom: 18px; border-bottom: 2px solid var(--light-color); position: relative; }
        .page-header-logo { height: 40px; }
        .page-header-title { font-family: var(--font-primary); font-size: 11px; color: var(--gray-color); text-transform: uppercase; letter-spacing: 1px; }
        
        .page-footer { position: absolute; bottom: 15mm; left: 15mm; right: 15mm; display: flex; justify-content: space-between; align-items: center; padding-top: 8px; border-top: 1px solid var(--light-color); font-size: 10px; color: var(--gray-color); background: var(--white-color); z-index: 10; }
        .page-number { font-weight: 600; color: var(--primary-color); }
        
        /* ====== CAPA ====== */
        .page-cover { background: linear-gradient(160deg, #1a365d 0%, #234876 40%, #1a365d 70%, #0f2744 100%); color: var(--white-color); display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 25mm 20mm; position: relative; overflow: hidden; }
        .page-cover::before { content: ''; position: absolute; top: -50%; right: -30%; width: 80%; height: 200%; background: radial-gradient(ellipse, ${e}20 0%, transparent 60%); pointer-events: none; }
        .cover-logo { width: 180px; margin-bottom: 30px; filter: brightness(0) invert(1); position: relative; z-index: 1; }
        .cover-badge { background: ${e}e6; color: var(--white-color); padding: 10px 25px; border-radius: 20px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; position: relative; z-index: 1; }
        .cover-badge i { font-size: 12px; }
        .cover-icon { width: 70px; height: 70px; background: ${e}33; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; position: relative; z-index: 1; }
        .cover-icon i { font-size: 32px; color: ${e}; }
        .cover-title { font-family: var(--font-primary); font-size: 28px; font-weight: 800; margin-bottom: 15px; line-height: 1.25; position: relative; z-index: 1; }
        .cover-title span { color: ${e}; display: block; }
        .cover-subtitle { font-size: 14px; font-weight: 300; margin-bottom: 30px; opacity: 0.95; max-width: 450px; margin-left: auto; margin-right: auto; position: relative; z-index: 1; line-height: 1.5; }
        .cover-client { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 18px 35px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2); position: relative; z-index: 1; margin: 0 auto; max-width: 380px; }
        .cover-client-label { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.8; margin-bottom: 6px; text-align: center; }
        .cover-client-name { font-family: var(--font-primary); font-size: 18px; font-weight: 700; color: ${e}; text-align: center; }
        .cover-date { margin-top: 25px; font-size: 12px; opacity: 0.8; position: relative; z-index: 1; }
        .cover-footer { position: absolute; bottom: 18mm; left: 0; right: 0; text-align: center; font-size: 10px; opacity: 0.7; padding: 0 18mm; display: flex; justify-content: center; align-items: center; }
        .cover-footer p { margin: 0; text-align: center; width: 100%; }
        
        /* ====== TÍTULOS E TEXTOS ====== */
        .section-number { display: inline-block; background: ${e}; color: var(--white-color); width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-family: var(--font-primary); font-weight: 700; font-size: 13px; margin-right: 10px; }
        .section-title { font-family: var(--font-primary); font-size: 18px; font-weight: 700; color: var(--primary-color); margin-bottom: 14px; display: flex; align-items: center; padding-bottom: 10px; border-bottom: 3px solid ${e}; }
        .section-title-text { flex: 1; }
        .subsection-title { font-family: var(--font-primary); font-size: 13px; font-weight: 700; color: var(--primary-color); margin: 14px 0 10px; display: flex; align-items: center; gap: 8px; }
        .subsection-title i { color: ${e}; }
        
        p { margin-bottom: 10px; text-align: justify; font-size: 11px; line-height: 1.55; }
        
        /* Alert box vermelho */
        .alert-box { background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%); border-left: 4px solid var(--alert-color); padding: 10px 12px; margin: 10px 0; border-radius: 0 8px 8px 0; }
        .alert-box h4 { font-family: var(--font-primary); font-size: 12px; color: var(--alert-color); margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
        .alert-box p { margin-bottom: 0; color: var(--dark-color); font-size: 10px; line-height: 1.4; }
        
        /* Highlight box amarelo */
        .highlight-box { background: linear-gradient(135deg, #fef5e7 0%, #fdebd0 100%); border-left: 4px solid var(--secondary-color); padding: 10px 12px; margin: 10px 0; border-radius: 0 8px 8px 0; }
        .highlight-box p { margin-bottom: 0; color: var(--dark-color); font-size: 10px; line-height: 1.4; }
        .highlight-box strong { color: var(--primary-color); }
        
        /* Info box azul */
        .info-box { background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); border-left: 4px solid var(--primary-color); padding: 10px 12px; margin: 10px 0; border-radius: 0 8px 8px 0; }
        .info-box h4 { font-family: var(--font-primary); font-size: 12px; color: var(--primary-color); margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
        .info-box p { margin-bottom: 0; font-size: 11px; line-height: 1.4; }
        
        /* Green box */
        .green-box { background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); border-left: 4px solid var(--success-color); padding: 10px 12px; margin: 10px 0; border-radius: 0 8px 8px 0; }
        .green-box h4 { font-family: var(--font-primary); font-size: 12px; color: var(--success-color); margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
        .green-box p { margin-bottom: 0; font-size: 11px; line-height: 1.4; }
        
        /* Purple box */
        .purple-box { background: linear-gradient(135deg, #faf5ff 0%, #e9d8fd 100%); border-left: 4px solid var(--purple-color); padding: 10px 12px; margin: 10px 0; border-radius: 0 8px 8px 0; }
        .purple-box h4 { font-family: var(--font-primary); font-size: 12px; color: var(--purple-color); margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
        .purple-box p { margin-bottom: 0; font-size: 11px; line-height: 1.4; }
        
        /* Fire box laranja */
        .fire-box { background: linear-gradient(135deg, #fffaf0 0%, #fed7aa 100%); border-left: 4px solid var(--fire-color); padding: 10px 12px; margin: 10px 0; border-radius: 0 8px 8px 0; }
        .fire-box h4 { font-family: var(--font-primary); font-size: 12px; color: var(--fire-color); margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
        .fire-box p { margin-bottom: 0; font-size: 11px; line-height: 1.4; }
        
        /* Construction box laranja */
        .construction-box { background: linear-gradient(135deg, #fffaf0 0%, #feebc8 100%); border-left: 4px solid ${e}; padding: 12px 14px; margin: 12px 0; border-radius: 0 8px 8px 0; }
        .construction-box h4 { font-family: var(--font-primary); font-size: 12px; color: ${e}; margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
        .construction-box p { margin-bottom: 0; font-size: 11px; line-height: 1.45; }
        
        /* NR Box especial */
        .nr-box { background: linear-gradient(135deg, var(--primary-color) 0%, #0f2744 100%); color: var(--white-color); padding: 15px 18px; border-radius: 10px; margin: 15px 0; display: flex; align-items: center; gap: 15px; }
        .nr-box-icon { width: 50px; height: 50px; background: ${e}33; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .nr-box-icon i { font-size: 22px; color: ${e}; }
        .nr-box-content h4 { font-family: var(--font-primary); font-size: 13px; font-weight: 700; margin-bottom: 3px; }
        .nr-box-content p { font-size: 10px; margin: 0; opacity: 0.9; text-align: left; }
        
        /* ART Box verde */
        .art-box { background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); border-left: 4px solid var(--success-color); padding: 12px 14px; margin: 12px 0; border-radius: 0 8px 8px 0; }
        .art-box h4 { font-family: var(--font-primary); font-size: 12px; color: var(--success-color); margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
        .art-box p { margin-bottom: 0; font-size: 11px; line-height: 1.45; }
        
        /* Build list com ícone de construção */
        .build-list { list-style: none; margin: 12px 0; }
        .build-list li { padding: 6px 0; padding-left: 24px; position: relative; font-size: 11px; border-bottom: 1px solid var(--light-color); }
        .build-list li:last-child { border-bottom: none; }
        .build-list li::before { content: '\\f6e3'; font-family: 'Font Awesome 6 Free'; font-weight: 900; position: absolute; left: 0; color: ${e}; font-size: 10px; }
        
        /* Benefits grid */
        .benefits-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 15px 0; }
        .benefit-item { background: var(--light-color); padding: 12px; border-radius: 8px; text-align: center; border-bottom: 3px solid ${e}; }
        .benefit-item i { font-size: 22px; color: ${e}; margin-bottom: 8px; display: block; }
        .benefit-item h4 { font-family: var(--font-primary); font-size: 11px; color: var(--primary-color); margin-bottom: 4px; }
        .benefit-item p { font-size: 9px; margin: 0; color: var(--gray-color); }
        
        /* Entregáveis lista */
        .deliverables-list { margin: 15px 0; }
        .deliverable-section { background: var(--light-color); border-radius: 10px; margin-bottom: 12px; overflow: hidden; }
        .deliverable-header { background: linear-gradient(135deg, var(--primary-color) 0%, #0f2744 100%); color: var(--white-color); padding: 10px 14px; display: flex; align-items: center; gap: 10px; }
        .deliverable-header i { color: ${e}; font-size: 16px; }
        .deliverable-header h4 { font-family: var(--font-primary); font-size: 12px; font-weight: 700; margin: 0; }
        .deliverable-content { padding: 10px 14px; }
        .deliverable-content ul { list-style: none; margin: 0; }
        .deliverable-content li { padding: 4px 0; padding-left: 18px; position: relative; font-size: 10px; }
        .deliverable-content li::before { content: '\\f054'; font-family: 'Font Awesome 6 Free'; font-weight: 900; position: absolute; left: 0; color: ${e}; font-size: 8px; top: 6px; }
        
        /* Lista de itens */
        .feature-list { list-style: none; margin: 10px 0; }
        .feature-list li { padding: 5px 0; padding-left: 22px; position: relative; font-size: 11px; border-bottom: 1px solid var(--light-color); }
        .feature-list li:last-child { border-bottom: none; }
        .feature-list li::before { content: '\\f00c'; font-family: 'Font Awesome 6 Free'; font-weight: 900; position: absolute; left: 0; color: var(--success-color); font-size: 10px; }
        
        /* Fire list */
        .fire-list { list-style: none; margin: 10px 0; }
        .fire-list li { padding: 5px 0; padding-left: 22px; position: relative; font-size: 11px; border-bottom: 1px solid var(--light-color); }
        .fire-list li:last-child { border-bottom: none; }
        .fire-list li::before { content: '\\f06d'; font-family: 'Font Awesome 6 Free'; font-weight: 900; position: absolute; left: 0; color: var(--fire-color); font-size: 10px; }
        
        /* Factor cards */
        .factors-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin: 12px 0; }
        .factor-card { background: var(--light-color); padding: 8px 10px; border-radius: 6px; border-left: 3px solid var(--success-color); }
        .factor-card h4 { font-family: var(--font-primary); font-size: 10px; color: var(--primary-color); margin-bottom: 3px; display: flex; align-items: center; gap: 5px; }
        .factor-card h4 i { color: var(--success-color); font-size: 11px; }
        .factor-card p { font-size: 10px; margin-bottom: 0; line-height: 1.4; }
        
        /* Content grid */
        .content-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 12px 0; }
        .content-card { background: var(--light-color); padding: 10px 12px; border-radius: 8px; border-left: 3px solid ${e}; }
        .content-card h4 { font-family: var(--font-primary); font-size: 11px; color: var(--primary-color); margin-bottom: 4px; display: flex; align-items: center; gap: 6px; }
        .content-card h4 i { color: ${e}; font-size: 12px; }
        .content-card p { font-size: 10px; margin-bottom: 0; line-height: 1.4; }
        
        /* Metodologia */
        .methodology-steps { margin: 12px 0; }
        .step { display: flex; gap: 10px; margin-bottom: 8px; padding: 8px 10px; background: var(--light-color); border-radius: 6px; position: relative; }
        .step-number { background: var(--primary-color); color: var(--white-color); width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-primary); font-weight: 700; font-size: 11px; flex-shrink: 0; }
        .step-content h4 { font-family: var(--font-primary); font-size: 11px; color: var(--primary-color); margin-bottom: 2px; }
        .step-content p { font-size: 10px; margin-bottom: 0; line-height: 1.35; }
        
        /* Entregáveis */
        .deliverables-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 12px 0; }
        .deliverable-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px; background: var(--light-color); border-radius: 8px; }
        .deliverable-icon { width: 28px; height: 28px; background: ${e}; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: var(--white-color); font-size: 12px; flex-shrink: 0; }
        .deliverable-text h4 { font-family: var(--font-primary); font-size: 11px; color: var(--primary-color); margin-bottom: 3px; }
        .deliverable-text p { font-size: 10px; margin-bottom: 0; line-height: 1.4; }
        
        /* Condições */
        .conditions-list { margin: 12px 0; }
        .condition-item { display: flex; align-items: flex-start; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--light-color); }
        .condition-item:last-child { border-bottom: none; }
        .condition-icon { width: 26px; height: 26px; background: var(--light-color); border-radius: 5px; display: flex; align-items: center; justify-content: center; color: var(--primary-color); font-size: 11px; flex-shrink: 0; }
        .condition-text strong { font-family: var(--font-primary); font-size: 11px; color: var(--primary-color); display: block; margin-bottom: 2px; }
        .condition-text span { font-size: 10px; color: var(--gray-color); line-height: 1.3; }
        
        /* Carga horária */
        .carga-horaria { display: flex; gap: 12px; margin: 12px 0; }
        .carga-item { flex: 1; background: var(--light-color); padding: 12px; border-radius: 8px; text-align: center; border-top: 3px solid ${e}; }
        .carga-item i { font-size: 20px; color: ${e}; margin-bottom: 6px; display: block; }
        .carga-item h4 { font-family: var(--font-primary); font-size: 11px; color: var(--primary-color); margin-bottom: 3px; }
        .carga-item p { font-size: 10px; margin: 0; color: var(--gray-color); }
        .carga-total { background: linear-gradient(135deg, var(--primary-color) 0%, #0f2744 100%); color: white; padding: 12px 15px; border-radius: 8px; text-align: center; margin: 12px 0; }
        .carga-total h3 { font-family: var(--font-primary); font-size: 12px; margin-bottom: 4px; }
        .carga-total p { font-size: 24px; font-weight: 800; color: ${e}; margin: 0; }
        
        /* Empresa contratante */
        .company-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
        .company-info-item { padding: 10px 12px; background: var(--light-color); border-radius: 8px; border-left: 3px solid ${e}; }
        .company-info-item label { font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: var(--gray-color); font-weight: 600; display: block; margin-bottom: 4px; }
        .company-info-item span { font-size: 12px; color: var(--dark-color); font-weight: 500; }
        
        /* Responsável */
        .responsible-card { background: linear-gradient(135deg, var(--primary-color) 0%, #0f2744 100%); padding: 18px; border-radius: 10px; color: var(--white-color); text-align: center; margin: 15px 0; }
        .responsible-avatar { width: 60px; height: 60px; background: ${e}33; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-size: 26px; color: ${e}; border: 2px solid ${e}; }
        .responsible-name { font-family: var(--font-primary); font-size: 16px; font-weight: 700; margin-bottom: 3px; text-align: center; }
        .responsible-role { font-size: 11px; opacity: 0.9; margin-bottom: 3px; text-align: center; }
        .responsible-company { font-size: 10px; opacity: 0.8; margin-bottom: 12px; text-align: center; }
        .responsible-contacts { display: flex; flex-direction: column; gap: 6px; align-items: center; }
        .responsible-contact-item { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 10px; }
        .responsible-contact-item i { color: ${e}; width: 15px; text-align: center; }
        
        /* Diferenciais */
        .diferenciais-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 12px 0; }
        .diferencial-item { background: var(--light-color); padding: 12px; border-radius: 8px; text-align: center; border-bottom: 3px solid ${e}; }
        .diferencial-item i { font-size: 22px; color: ${e}; margin-bottom: 8px; display: block; }
        .diferencial-item h4 { font-family: var(--font-primary); font-size: 11px; color: var(--primary-color); margin-bottom: 4px; }
        .diferencial-item p { font-size: 10px; margin: 0; color: var(--gray-color); line-height: 1.4; }
        
        /* Página de contato */
        .page-contact { display: flex; flex-direction: column; justify-content: center; text-align: center; }
        .contact-content { margin: auto 0; }
        .contact-icon { width: 60px; height: 60px; background: linear-gradient(135deg, var(--primary-color) 0%, #0f2744 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-size: 26px; color: ${e}; }
        .contact-title { font-family: var(--font-primary); font-size: 20px; font-weight: 700; color: var(--primary-color); margin-bottom: 8px; }
        .contact-subtitle { font-size: 11px; color: var(--gray-color); margin-bottom: 15px; max-width: 400px; margin-left: auto; margin-right: auto; }
        .contact-info { display: flex; flex-direction: column; gap: 8px; align-items: center; }
        .contact-item { display: flex; align-items: center; gap: 10px; font-size: 12px; color: var(--dark-color); }
        .contact-item i { color: ${e}; font-size: 14px; width: 20px; }
        .contact-signature { margin-top: 20px; padding-top: 15px; border-top: 2px solid var(--light-color); }
        .signature-logo { height: 35px; margin-bottom: 8px; }
        .signature-text { font-size: 10px; color: var(--gray-color); line-height: 1.5; }
        
        /* Included services */
        .included-services { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; font-size: 10px; }
        
        /* Tabela de investimento */
        .investment-table { width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 11px; }
        .investment-table thead tr { background: linear-gradient(135deg, var(--primary-color) 0%, #0f2744 100%); color: white; }
        .investment-table th { padding: 10px 12px; font-family: var(--font-primary); font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; border: 1px solid var(--primary-color); }
        .investment-table tbody tr { background: white; }
        .investment-table tbody tr:nth-child(even) { background: var(--light-color); }
        .investment-table td { padding: 10px 12px; border: 1px solid #cbd5e0; vertical-align: middle; }
        .investment-table .training-name { font-weight: 600; color: var(--primary-color); display: flex; align-items: center; gap: 8px; }
        .investment-table .training-name i { font-size: 14px; }
        .investment-table tfoot tr { background: linear-gradient(135deg, var(--primary-color) 0%, #0f2744 100%); color: white; }
        .investment-table tfoot td { padding: 12px; font-family: var(--font-primary); font-weight: 700; font-size: 12px; border: 1px solid var(--primary-color); }
        .investment-table tfoot td:last-child { font-size: 14px; }
        
        /* Directors grid */
        .directors-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 12px 0; }
        .director-card { background: var(--light-color); padding: 12px; border-radius: 8px; text-align: center; }
        .director-card i { font-size: 26px; color: var(--primary-color); margin-bottom: 8px; display: block; }
        .director-card h4 { font-family: var(--font-primary); font-size: 12px; color: var(--primary-color); margin-bottom: 2px; }
        .director-card p { font-size: 10px; margin: 0; color: var(--gray-color); }
        
        @media print {
            .pdf-controls { display: none !important; }
            body { margin: 0; padding: 0; background: white; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            #pdf-content { width: 100%; margin: 0; box-shadow: none; }
            
            .page { 
                page-break-after: always !important; 
                page-break-inside: avoid !important; 
                page-break-before: auto !important;
                break-after: page !important;
                break-inside: avoid !important;
                width: 210mm !important; 
                height: 297mm !important; 
                min-height: 297mm !important; 
                max-height: 297mm !important; 
                margin: 0 !important; 
                padding: 12mm 15mm 18mm 15mm !important; 
                box-sizing: border-box !important; 
                overflow: hidden !important;
                position: relative !important;
            }
            
            .page:last-child { 
                page-break-after: auto !important;
                break-after: auto !important;
            }
            
            .page-cover {
                padding: 20mm 18mm 18mm 18mm !important;
            }
            
            .page-header {
                page-break-after: avoid !important;
                break-after: avoid !important;
                margin-bottom: 10px !important;
                padding-bottom: 8px !important;
            }
            
            .page-footer { 
                position: absolute !important; 
                bottom: 8mm !important; 
                left: 15mm !important; 
                right: 15mm !important;
                page-break-after: avoid !important;
                break-after: avoid !important;
                font-size: 9px !important;
            }
            
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
        @page { size: 210mm 297mm; margin: 0; }
    `}function Q(a,e,s,i,o){const t={headerTitle:"Proposta Comercial - Brigada de Incêndio"},r=o?`
        <div style="background: linear-gradient(135deg, #38a169 0%, #2f855a 100%); color: #fff; padding: 15px 25px; border-radius: 10px; text-align: center; margin: 15px 0;">
            <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; opacity: 0.9;"><i class="fas fa-tag"></i> Desconto Especial Aplicado</p>
            <p style="font-size: 16px; margin: 0;"><s style="opacity: 0.7;">De R$ ${c(e)}</s> &nbsp;<strong style="font-size: 20px;">${i}% OFF</strong></p>
        </div>`:"";return`
        <!-- CAPA -->
        <div class="page page-cover">
            <span style="position: absolute; top: 25mm; left: 0; right: 0; text-align: center; font-family: var(--font-primary); font-size: 14px; font-weight: 700; color: var(--fire-color); letter-spacing: 3px;">${a.numero}</span>
            <img src="${a.logoUrl}" alt="EngMarq Solution" class="cover-logo">
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${t.headerTitle}</span>
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${t.headerTitle}</span>
            </div>
            <h2 class="section-title"><span class="section-number"><i class="fas fa-building"></i></span><span class="section-title-text">Dados da Empresa Contratada</span></h2>
            <div class="fire-box" style="margin-bottom: 25px;">
                <h4><i class="fas fa-info-circle"></i> Informações para Faturamento e Contrato</h4>
                <p>Abaixo estão os dados cadastrais da EngMarq Solution para formalização contratual e emissão de documentos fiscais.</p>
            </div>
            <div style="background: var(--light-color); border-radius: 12px; padding: 30px; margin-bottom: 25px;">
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid var(--fire-color);">
                    <img src="${a.logoUrl}" alt="EngMarq Solution" style="height: 60px;">
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${t.headerTitle}</span>
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${t.headerTitle}</span>
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${t.headerTitle}</span>
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${t.headerTitle}</span>
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${t.headerTitle}</span>
            </div>
            <h2 class="section-title"><span class="section-number">8</span><span class="section-title-text">Investimento</span></h2>
            
            <div class="highlight-box" style="margin-bottom: 15px;">
                <p style="margin: 0;"><strong><i class="fas fa-users"></i> Abrangência:</strong> Treinamento dimensionado para <strong>${a.qtdColaboradores} colaboradores</strong></p>
            </div>

            <p>O valor abaixo corresponde ao investimento para realização do <strong>Treinamento de Brigada de Incêndio</strong> completo:</p>
            
            ${r}
            
            <table class="investment-table">
                <thead>
                    <tr>
                        <th style="width: 35%;">Treinamento</th>
                        <th style="width: 15%; text-align: center;">Carga Horária</th>
                        <th style="width: 20%; text-align: center;">Nº Colaboradores</th>
                        <th style="width: 30%; text-align: right;">Valor Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="training-name"><i class="fas fa-fire" style="color: var(--fire-color);"></i> Brigada de Incêndio (IT 17/2025)</td>
                        <td style="text-align: center;">04h</td>
                        <td style="text-align: center;">${a.qtdColaboradores}</td>
                        <td style="text-align: right; font-weight: 600;">R$ ${c(s)}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3"><i class="fas fa-calculator"></i> INVESTIMENTO TOTAL</td>
                        <td style="text-align: right;">R$ ${c(s)}</td>
                    </tr>
                </tfoot>
            </table>

            <p style="font-size: 10px; color: var(--gray-color); text-align: center; margin-top: 5px;">(${S(s)})</p>

            <h3 class="subsection-title"><i class="fas fa-check-circle"></i> O Que Está Incluso</h3>
            <div class="included-services" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 15px; font-size: 10px;">
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Treinamento teórico completo (conceitos, normas, procedimentos)</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Treinamento prático supervisionado</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Instrutor qualificado e habilitado</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Material didático expositivo (não físico)</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Lista de presença dos participantes</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Certificados digitais de participação</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Documentação para auditorias e fiscalizações</span></div>
            </div>

            <h3 class="subsection-title"><i class="fas fa-credit-card"></i> Condições de Pagamento</h3>
            <div class="company-info-grid">
                <div class="company-info-item"><label>Forma de Pagamento</label><span>Transferência Bancária ou PIX</span></div>
                <div class="company-info-item"><label>Prazo</label><span>50% no fechamento | 50% após conclusão</span></div>
                <div class="company-info-item"><label>Validade da Proposta</label><span>15 dias corridos</span></div>
                <div class="company-info-item"><label>Data do Treinamento</label><span>A combinar conforme disponibilidade</span></div>
            </div>

            <div class="info-box" style="margin-top: 15px;">
                <p style="margin: 0; font-size: 10px;"><strong><i class="fas fa-info-circle"></i> Observação:</strong> Os valores apresentados contemplam todos os custos de execução, incluindo deslocamento, material didático e certificação. Não há custos adicionais.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">08</span>
            </div>
        </div>

        <!-- PÁGINA 9: DIFERENCIAIS E ENCERRAMENTO -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${t.headerTitle}</span>
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

        <!-- PÁGINA 10: TERMO DE ACEITE E ASSINATURAS -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${t.headerTitle}</span>
            </div>
            <h2 class="section-title"><span class="section-number"><i class="fas fa-file-signature"></i></span><span class="section-title-text">Termo de Aceite da Proposta</span></h2>
            <div class="info-box" style="margin-bottom: 20px;">
                <h4><i class="fas fa-check-circle"></i> Declaração de Aceite</h4>
                <p>Ao assinar este documento, as partes declaram estar de acordo com todos os termos, condições, valores e prazos descritos nesta proposta comercial, formalizando a contratação dos serviços especificados.</p>
            </div>
            <div style="background: var(--light-color); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h3 style="font-family: var(--font-primary); color: var(--primary-color); font-size: 16px; margin-bottom: 15px; text-align: center; border-bottom: 2px solid var(--fire-color); padding-bottom: 10px;">
                    <i class="fas fa-building" style="color: var(--fire-color);"></i> RESPONSÁVEL PELA ELABORAÇÃO DA PROPOSTA
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Razão Social</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">Engmarq Solution LTDA</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">CNPJ</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">60.545.359/0001-76</p>
                    </div>
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.elaborador.nome} - ${a.elaborador.cargo}</p>
                </div>
                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed var(--gray-color);">
                    <div style="text-align: center;">
                        <div style="border-bottom: 1px solid var(--dark-color); margin: 0 auto 5px; height: 35px; max-width: 450px;"></div>
                        <p style="margin: 0; font-size: 11px; color: var(--gray-color); text-align: center;">Assinatura do Proponente</p>
                    </div>
                </div>
            </div>
            <div style="background: var(--light-color); border-radius: 12px; padding: 20px;">
                <h3 style="font-family: var(--font-primary); color: var(--primary-color); font-size: 16px; margin-bottom: 15px; text-align: center; border-bottom: 2px solid var(--secondary-color); padding-bottom: 10px;">
                    <i class="fas fa-user-tie" style="color: var(--secondary-color);"></i> RESPONSÁVEL PELA APROVAÇÃO DA PROPOSTA
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 10px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Razão Social</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.razaoSocial}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">CNPJ</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.cnpj||"-"}</p>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 10px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Nome Completo</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.solicitante.nome||"-"}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Cargo / Função</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.solicitante.cargo||"-"}</p>
                    </div>
                </div>
                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed var(--gray-color);">
                    <div style="text-align: center;">
                        <div style="border-bottom: 1px solid var(--dark-color); margin: 0 auto 5px; height: 35px; max-width: 450px;"></div>
                        <p style="margin: 0; font-size: 11px; color: var(--gray-color); text-align: center;">Assinatura do Aprovador</p>
                    </div>
                </div>
            </div>
            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">10</span>
            </div>
        </div>

        <!-- PÁGINA 11: CONTATO -->
        <div class="page page-contact">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${t.headerTitle}</span>
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
                    <img src="${a.logoUrl}" alt="EngMarq Solution" class="signature-logo">
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
                <span class="page-number">11</span>
            </div>
        </div>
    `}function K(a,e,s,i,o){const t=a.razaoSocial;let r="";return o&&i>0&&(r=`
            <div style="background: linear-gradient(135deg, #38a169 0%, #2f855a 100%); color: #fff; padding: 12px 20px; border-radius: 10px; text-align: center; margin: 10px 0;">
                <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px; opacity: 0.9;"><i class="fas fa-tag"></i> Desconto Especial Aplicado</p>
                <p style="font-size: 14px; margin: 0;"><s style="opacity: 0.7;">De ${c(e)}</s> &nbsp;<strong style="font-size: 18px;">${i}% OFF</strong></p>
            </div>`),`
        <!-- ====== PÁGINA 1: CAPA ====== -->
        <div class="page page-cover">
            <span style="position: absolute; top: 25mm; left: 0; right: 0; text-align: center; font-family: var(--font-primary); font-size: 14px; font-weight: 700; color: var(--accent-color); letter-spacing: 3px;">${a.numero}</span>
            
            <img src="${a.logoUrl}" alt="EngMarq Solution" class="cover-logo">
            
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
                <p class="cover-client-name">${t}</p>
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
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
                    <img src="${a.logoUrl}" alt="EngMarq Solution" style="height: 60px;">
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
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

        <!-- ====== PÁGINA 8: INVESTIMENTO ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">8</span>
                <span class="section-title-text">Investimento</span>
            </h2>

            <p>O valor abaixo corresponde ao investimento para elaboração do <strong>Projeto Técnico de Plataforma Secundária</strong> completo:</p>

            ${r}

            <table class="investment-table">
                <thead>
                    <tr>
                        <th style="width: 50%;">Serviço</th>
                        <th style="width: 50%; text-align: right;">Valor Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="training-name"><i class="fas fa-layer-group" style="color: var(--secondary-color);"></i> Projeto Técnico de Plataforma Secundária (NR 18)</td>
                        <td style="text-align: right; font-weight: 600;">R$ ${c(s)}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td><i class="fas fa-calculator"></i> INVESTIMENTO TOTAL</td>
                        <td style="text-align: right;">R$ ${c(s)}</td>
                    </tr>
                </tfoot>
            </table>

            <p style="font-size: 10px; color: var(--gray-color); text-align: center; margin-top: 5px;">(${S(s)})</p>

            <h3 class="subsection-title"><i class="fas fa-check-circle"></i> O Que Está Incluso</h3>
            <div class="included-services" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 15px; font-size: 10px;">
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Projeto técnico completo da plataforma</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Memorial descritivo detalhado</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Memória de cálculo estrutural</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Orientações para instalação</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>ART registrada junto ao CREA</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Suporte técnico para dúvidas</span></div>
            </div>

            <h3 class="subsection-title"><i class="fas fa-credit-card"></i> Condições de Pagamento</h3>
            <div class="company-info-grid">
                <div class="company-info-item"><label>Forma de Pagamento</label><span>Transferência Bancária ou PIX</span></div>
                <div class="company-info-item"><label>Prazo</label><span>50% no fechamento | 50% na entrega</span></div>
                <div class="company-info-item"><label>Validade da Proposta</label><span>15 dias corridos</span></div>
                <div class="company-info-item"><label>Prazo de Entrega</label><span>A combinar conforme complexidade</span></div>
            </div>

            <div class="info-box" style="margin-top: 15px;">
                <p style="margin: 0; font-size: 10px;"><strong><i class="fas fa-info-circle"></i> Observação:</strong> Os valores apresentados contemplam todos os custos de elaboração do projeto. A execução e instalação da plataforma são de responsabilidade da empresa executora da obra.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">08</span>
            </div>
        </div>

        <!-- ====== PÁGINA 9: DIFERENCIAIS E PRÓXIMOS PASSOS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Secundária</span>
            </div>

            <h2 class="section-title">
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

            <h2 class="section-title" style="margin-top: 20px;">
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

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">09</span>
            </div>
        </div>

        <!-- ====== PÁGINA 10: RESPONSÁVEL PELA PROPOSTA ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number"><i class="fas fa-user-tie"></i></span>
                <span class="section-title-text">Responsável pela Proposta</span>
            </h2>

            <p>Esta proposta foi elaborada pela equipe técnica da EngMarq Solution, sob responsabilidade do profissional abaixo identificado.</p>

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

            <div class="construction-box" style="margin-top: 25px;">
                <h4><i class="fas fa-headset"></i> Atendimento Personalizado</h4>
                <p>Estamos à disposição para esclarecer dúvidas, agendar reuniões e apresentar mais detalhes sobre nossa metodologia de trabalho. Entre em contato conosco!</p>
            </div>

            <div class="info-box">
                <h4><i class="fas fa-clock"></i> Horário de Atendimento</h4>
                <p>Segunda a Sexta: 08h às 18h | Sábado: 08h às 12h</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">10</span>
            </div>
        </div>

        <!-- ====== PÁGINA 11: TERMO DE ACEITE E ASSINATURAS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number"><i class="fas fa-file-signature"></i></span>
                <span class="section-title-text">Termo de Aceite da Proposta</span>
            </h2>

            <div class="info-box" style="margin-bottom: 20px;">
                <h4><i class="fas fa-check-circle"></i> Declaração de Aceite</h4>
                <p>Ao assinar este documento, as partes declaram estar de acordo com todos os termos, condições, valores e prazos descritos nesta proposta comercial, formalizando a contratação dos serviços especificados.</p>
            </div>

            <div style="background: var(--light-color); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h3 style="font-family: var(--font-primary); color: var(--primary-color); font-size: 16px; margin-bottom: 15px; text-align: center; border-bottom: 2px solid var(--accent-color); padding-bottom: 10px;">
                    <i class="fas fa-building" style="color: var(--accent-color);"></i> RESPONSÁVEL PELA ELABORAÇÃO DA PROPOSTA
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Razão Social</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">Engmarq Solution LTDA</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">CNPJ</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">60.545.359/0001-76</p>
                    </div>
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.elaborador.nome} - ${a.elaborador.cargo}</p>
                </div>
                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed var(--gray-color);">
                    <div style="text-align: center;">
                        <div style="border-bottom: 1px solid var(--dark-color); margin: 0 auto 5px; height: 35px; max-width: 450px;"></div>
                        <p style="margin: 0; font-size: 11px; color: var(--gray-color); text-align: center;">Assinatura do Proponente</p>
                    </div>
                </div>
            </div>

            <div style="background: var(--light-color); border-radius: 12px; padding: 20px;">
                <h3 style="font-family: var(--font-primary); color: var(--primary-color); font-size: 16px; margin-bottom: 15px; text-align: center; border-bottom: 2px solid var(--secondary-color); padding-bottom: 10px;">
                    <i class="fas fa-user-tie" style="color: var(--secondary-color);"></i> RESPONSÁVEL PELA APROVAÇÃO DA PROPOSTA
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 10px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Razão Social</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.razaoSocial}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">CNPJ</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.cnpj}</p>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 10px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Nome Completo</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.solicitante.nome||"A definir"}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Cargo / Função</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.solicitante.cargo||"A definir"}</p>
                    </div>
                </div>
                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed var(--gray-color);">
                    <div style="text-align: center;">
                        <div style="border-bottom: 1px solid var(--dark-color); margin: 0 auto 5px; height: 35px; max-width: 450px;"></div>
                        <p style="margin: 0; font-size: 11px; color: var(--gray-color); text-align: center;">Assinatura do Aprovador</p>
                    </div>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">11</span>
            </div>
        </div>

        <!-- ====== PÁGINA 12: CONTATO ====== -->
        <div class="page page-contact">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Secundária</span>
            </div>

            <div class="contact-content">
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
                    <div class="contact-item">
                        <i class="fas fa-globe"></i>
                        <span>www.engmarqsolution.com</span>
                    </div>
                </div>

                <div class="contact-signature">
                    <img src="${a.logoUrl}" alt="EngMarq Solution" class="signature-logo">
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
    `}function X(a,e,s,i,o){const t=a.razaoSocial;let r="";return o&&i>0&&(r=`
            <div style="background: linear-gradient(135deg, #38a169 0%, #2f855a 100%); color: #fff; padding: 12px 20px; border-radius: 10px; text-align: center; margin: 10px 0;">
                <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px; opacity: 0.9;"><i class="fas fa-tag"></i> Desconto Especial Aplicado</p>
                <p style="font-size: 14px; margin: 0;"><s style="opacity: 0.7;">De ${c(e)}</s> &nbsp;<strong style="font-size: 18px;">${i}% OFF</strong></p>
            </div>`),`
        <!-- ====== PÁGINA 1: CAPA ====== -->
        <div class="page page-cover">
            <span style="position: absolute; top: 25mm; left: 0; right: 0; text-align: center; font-family: var(--font-primary); font-size: 14px; font-weight: 700; color: var(--accent-color); letter-spacing: 3px;">${a.numero}</span>
            
            <img src="${a.logoUrl}" alt="EngMarq Solution" class="cover-logo">
            
            <span class="cover-badge">
                <i class="fas fa-hard-hat"></i>
                Projeto Técnico – EPC
            </span>

            <div class="cover-icon">
                <i class="fas fa-layer-group"></i>
            </div>
            
            <h1 class="cover-title">
                ELABORAÇÃO DE PROJETO
                <span>PLATAFORMA PRINCIPAL E SECUNDÁRIA</span>
            </h1>
            <p class="cover-subtitle">
                Equipamento de Proteção Coletiva (EPC) conforme NR 18 – Condições e Meio Ambiente de Trabalho na Indústria da Construção
            </p>
            
            <div class="cover-client">
                <p class="cover-client-label">Proposta elaborada para</p>
                <p class="cover-client-name">${t}</p>
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
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

            <div class="info-box" style="margin-top: 25px;">
                <h4><i class="fas fa-hard-hat"></i> Proposta Especializada</h4>
                <p>Esta proposta foi desenvolvida para atender às necessidades de elaboração do Projeto Técnico de Plataforma Principal e Secundária, em conformidade com a NR 18 e com foco na segurança dos trabalhadores e segurança jurídica da empresa.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">02</span>
            </div>
        </div>

        <!-- ====== PÁGINA 3: DADOS DA EMPRESA CONTRATADA ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number"><i class="fas fa-building"></i></span>
                <span class="section-title-text">Dados da Empresa Contratada</span>
            </h2>

            <div class="construction-box" style="margin-bottom: 25px;">
                <h4><i class="fas fa-info-circle"></i> Informações para Faturamento e Contrato</h4>
                <p>Abaixo estão os dados cadastrais da EngMarq Solution para formalização contratual e emissão de documentos fiscais.</p>
            </div>

            <div style="background: var(--light-color); border-radius: 12px; padding: 30px; margin-bottom: 25px;">
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid var(--accent-color);">
                    <img src="${a.logoUrl}" alt="EngMarq Solution" style="height: 60px;">
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">2</span>
                <span class="section-title-text">Apresentação</span>
            </h2>

            <p>A <strong>EngMarq Solution Ltda.</strong> é uma empresa especializada em Engenharia de Segurança e Saúde do Trabalho, com atuação técnica focada em soluções de engenharia para a indústria da construção civil. Oferecemos serviços de alta qualidade técnica, com compromisso com a conformidade normativa e a proteção efetiva dos trabalhadores.</p>

            <p>É com satisfação que apresentamos esta proposta para a <strong>elaboração do Projeto Técnico de Plataforma Principal e Secundária</strong>, equipamento de proteção coletiva (EPC) essencial para obras verticais, conforme exigências da <strong>NR 18 – Condições e Meio Ambiente de Trabalho na Indústria da Construção</strong>.</p>

            <div class="construction-box">
                <h4><i class="fas fa-hard-hat"></i> Plataforma Principal e Secundária de Proteção</h4>
                <p>A Plataforma Principal e Secundária é um <strong>equipamento de proteção coletiva (EPC)</strong> instalado em obras de edificações verticais, com a função de aparar e reter materiais e ferramentas que possam cair durante a execução dos serviços, protegendo trabalhadores e terceiros que circulam nos pavimentos inferiores e no entorno da obra.</p>
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">3</span>
                <span class="section-title-text">Objetivo do Projeto</span>
            </h2>

            <p>O objetivo desta proposta é a <strong>elaboração do Projeto Técnico da Plataforma Principal e Secundária</strong>, dimensionado conforme as características específicas da edificação e da obra, garantindo a proteção coletiva dos trabalhadores e o atendimento às normas de segurança vigentes.</p>

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

            <ul class="build-list">
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

        <!-- ====== PÁGINA 6: RESPONSABILIDADE TÉCNICA E ENTREGÁVEIS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">5</span>
                <span class="section-title-text">Responsabilidade Técnica</span>
            </h2>

            <p>O projeto técnico será elaborado por <strong>profissional legalmente habilitado</strong>, com registro ativo no Conselho Regional de Engenharia e Agronomia (CREA), assumindo integralmente a responsabilidade técnica pelo dimensionamento e concepção do projeto.</p>

            <div class="art-box">
                <h4><i class="fas fa-certificate"></i> Emissão de ART – Anotação de Responsabilidade Técnica</h4>
                <p>Será emitida <strong>ART junto ao CREA</strong>, vinculada exclusivamente ao projeto da Plataforma Principal e Secundária, formalizando a responsabilidade técnica do profissional pelo trabalho executado.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-user-tie"></i> O Profissional Responsável</h3>

            <ul class="feature-list">
                <li>Possui habilitação legal para elaboração de projetos de segurança na construção</li>
                <li>Assume responsabilidade técnica integral pelo dimensionamento</li>
                <li>Garante a conformidade do projeto com as normas vigentes</li>
                <li>Responde tecnicamente perante os órgãos de fiscalização</li>
            </ul>

            <div class="info-box">
                <h4><i class="fas fa-shield-alt"></i> Garantia de Qualidade Técnica</h4>
                <p>A elaboração do projeto por profissional habilitado, com emissão de ART, é a garantia de que o trabalho foi desenvolvido com <strong>critério técnico, responsabilidade profissional e conformidade normativa</strong>.</p>
            </div>

            <h2 class="section-title" style="margin-top: 25px;">
                <span class="section-number">6</span>
                <span class="section-title-text">Escopo do Projeto – Entregáveis</span>
            </h2>

            <p>A EngMarq Solution entregará os seguintes documentos técnicos:</p>

            <div class="deliverables-list">
                <div class="deliverable-section">
                    <div class="deliverable-header">
                        <i class="fas fa-drafting-compass"></i>
                        <h4>1. Projeto Técnico da Plataforma Principal e Secundária</h4>
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
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">06</span>
            </div>
        </div>

        <!-- ====== PÁGINA 7: ENTREGÁVEIS (CONTINUAÇÃO) ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">6</span>
                <span class="section-title-text">Escopo do Projeto – Entregáveis (Continuação)</span>
            </h2>

            <div class="deliverables-list">
                <div class="deliverable-section">
                    <div class="deliverable-header">
                        <i class="fas fa-file-alt"></i>
                        <h4>2. Memorial Descritivo</h4>
                    </div>
                    <div class="deliverable-content">
                        <ul>
                            <li>Descrição completa da Plataforma Principal e Secundária projetada</li>
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
                            <li>Vinculada exclusivamente ao projeto da Plataforma Principal e Secundária</li>
                            <li>Formalização da responsabilidade técnica do profissional</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">07</span>
            </div>
        </div>

        <!-- ====== PÁGINA 8: OBSERVAÇÃO IMPORTANTE E BENEFÍCIOS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">7</span>
                <span class="section-title-text">Observação Importante</span>
            </h2>

            <div class="alert-box" style="margin-bottom: 15px;">
                <h4><i class="fas fa-exclamation-triangle"></i> Responsabilidade de Execução</h4>
                <p style="margin-bottom: 8px;">Esta proposta refere-se <strong>exclusivamente à elaboração do projeto técnico</strong> da Plataforma Principal e Secundária.</p>
                <p style="margin-bottom: 8px;">A <strong>execução, montagem e instalação</strong> da plataforma são de <strong>responsabilidade da empresa executora</strong> da obra.</p>
                <p>A empresa executora deverá respeitar integralmente as <strong>orientações técnicas contidas no projeto</strong> para garantir a segurança e eficácia do sistema de proteção.</p>
            </div>

            <div class="highlight-box">
                <p><strong><i class="fas fa-info-circle"></i> Recomendação:</strong> A instalação da plataforma deve ser executada por profissionais capacitados, com supervisão técnica adequada, seguindo rigorosamente as especificações do projeto.</p>
            </div>

            <h2 class="section-title" style="margin-top: 25px;">
                <span class="section-number">8</span>
                <span class="section-title-text">Benefícios para a Empresa Contratante</span>
            </h2>

            <p>A contratação do projeto técnico de Plataforma Principal e Secundária oferece benefícios significativos para a empresa:</p>

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
                <span class="page-number">08</span>
            </div>
        </div>

        <!-- ====== PÁGINA 9: VALOR E DIFERENCIAIS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">9</span>
                <span class="section-title-text">Valor da Proposta</span>
            </h2>

            <p>O valor para elaboração do Projeto Técnico de Plataforma Principal e Secundária está apresentado abaixo:</p>

            ${r}

            <table class="investment-table">
                <thead>
                    <tr>
                        <th style="width: 60%;">Serviço</th>
                        <th style="width: 20%;">Unidade</th>
                        <th style="width: 20%;">Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="training-name">
                                <i class="fas fa-layer-group" style="color: var(--accent-color);"></i>
                                Projeto Técnico de Plataforma Principal e Secundária
                            </div>
                            <div style="font-size: 9px; color: var(--gray-color); margin-top: 4px;">
                                Projeto completo conforme NR 18, incluindo memorial descritivo, memória de cálculo, orientações para instalação e ART
                            </div>
                        </td>
                        <td style="text-align: center;">1 Projeto</td>
                        <td style="text-align: center; font-weight: 600;">R$ ${c(s)}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2" style="text-align: right;">VALOR TOTAL</td>
                        <td style="text-align: center;">R$ ${c(s)}</td>
                    </tr>
                </tfoot>
            </table>

            <h3 class="subsection-title"><i class="fas fa-check-circle"></i> O Que Está Incluso</h3>
            <div class="included-services" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 15px; font-size: 10px;">
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Projeto técnico completo da plataforma</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Memorial descritivo detalhado</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Memória de cálculo estrutural</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Orientações para instalação</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>ART registrada junto ao CREA</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Suporte técnico para dúvidas</span></div>
            </div>

            <h3 class="subsection-title"><i class="fas fa-credit-card"></i> Condições de Pagamento</h3>
            <div class="company-info-grid">
                <div class="company-info-item"><label>Forma de Pagamento</label><span>Transferência Bancária ou PIX</span></div>
                <div class="company-info-item"><label>Prazo</label><span>50% no fechamento | 50% na entrega</span></div>
                <div class="company-info-item"><label>Validade da Proposta</label><span>15 dias corridos</span></div>
                <div class="company-info-item"><label>Prazo de Entrega</label><span>A combinar conforme complexidade</span></div>
            </div>

            <div class="info-box" style="margin-top: 15px;">
                <p style="margin: 0; font-size: 10px;"><strong><i class="fas fa-info-circle"></i> Observação:</strong> Os valores apresentados contemplam todos os custos de elaboração do projeto. A execução e instalação da plataforma são de responsabilidade da empresa executora da obra.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">09</span>
            </div>
        </div>

        <!-- ====== PÁGINA 10: DIFERENCIAIS E PRÓXIMOS PASSOS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">10</span>
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

            <h2 class="section-title" style="margin-top: 20px;">
                <span class="section-number">11</span>
                <span class="section-title-text">Próximos Passos</span>
            </h2>

            <p>Estamos à disposição para dar continuidade à contratação do projeto. Os próximos passos incluem:</p>

            <ul class="feature-list">
                <li><strong>Alinhamento das informações da obra</strong> – Dados da edificação, plantas, altura, tipo de estrutura</li>
                <li><strong>Definição de prazos de entrega</strong> – Cronograma para elaboração e entrega do projeto</li>
                <li><strong>Formalização da contratação</strong> – Envio de contrato e condições comerciais</li>
            </ul>

            <div class="construction-box" style="margin-top: 20px;">
                <h4><i class="fas fa-hard-hat"></i> Projeto Técnico de Qualidade</h4>
                <p>Investir em um projeto técnico elaborado por profissional habilitado é investir na <strong>segurança dos trabalhadores</strong> e na <strong>proteção jurídica da empresa</strong>. Um projeto bem elaborado faz a diferença na execução segura da obra.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">10</span>
            </div>
        </div>

        <!-- ====== PÁGINA 11: RESPONSÁVEL PELA PROPOSTA ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number"><i class="fas fa-user-tie"></i></span>
                <span class="section-title-text">Responsável pela Proposta</span>
            </h2>

            <p>Esta proposta foi elaborada pela equipe técnica da EngMarq Solution, sob responsabilidade do profissional abaixo identificado.</p>

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

            <div class="construction-box" style="margin-top: 25px;">
                <h4><i class="fas fa-headset"></i> Atendimento Personalizado</h4>
                <p>Estamos à disposição para esclarecer dúvidas, agendar reuniões e apresentar mais detalhes sobre nossa metodologia de trabalho. Entre em contato conosco!</p>
            </div>

            <div class="info-box">
                <h4><i class="fas fa-clock"></i> Horário de Atendimento</h4>
                <p>Segunda a Sexta: 08h às 18h | Sábado: 08h às 12h</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">11</span>
            </div>
        </div>

        <!-- ====== PÁGINA 12: TERMO DE ACEITE E ASSINATURAS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
            </div>

            <h2 class="section-title">
                <span class="section-number"><i class="fas fa-file-signature"></i></span>
                <span class="section-title-text">Termo de Aceite da Proposta</span>
            </h2>

            <div class="info-box" style="margin-bottom: 20px;">
                <h4><i class="fas fa-check-circle"></i> Declaração de Aceite</h4>
                <p>Ao assinar este documento, as partes declaram estar de acordo com todos os termos, condições, valores e prazos descritos nesta proposta comercial, formalizando a contratação dos serviços especificados.</p>
            </div>

            <div style="background: var(--light-color); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h3 style="font-family: var(--font-primary); color: var(--primary-color); font-size: 16px; margin-bottom: 15px; text-align: center; border-bottom: 2px solid var(--accent-color); padding-bottom: 10px;">
                    <i class="fas fa-building" style="color: var(--accent-color);"></i> RESPONSÁVEL PELA ELABORAÇÃO DA PROPOSTA
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Razão Social</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">Engmarq Solution LTDA</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">CNPJ</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">60.545.359/0001-76</p>
                    </div>
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.elaborador.nome} - ${a.elaborador.cargo}</p>
                </div>
                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed var(--gray-color);">
                    <div style="text-align: center;">
                        <div style="border-bottom: 1px solid var(--dark-color); margin: 0 auto 5px; height: 35px; max-width: 450px;"></div>
                        <p style="margin: 0; font-size: 11px; color: var(--gray-color); text-align: center;">Assinatura do Proponente</p>
                    </div>
                </div>
            </div>

            <div style="background: var(--light-color); border-radius: 12px; padding: 20px;">
                <h3 style="font-family: var(--font-primary); color: var(--primary-color); font-size: 16px; margin-bottom: 15px; text-align: center; border-bottom: 2px solid var(--secondary-color); padding-bottom: 10px;">
                    <i class="fas fa-user-tie" style="color: var(--secondary-color);"></i> RESPONSÁVEL PELA APROVAÇÃO DA PROPOSTA
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 10px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Razão Social</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.razaoSocial}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">CNPJ</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.cnpj}</p>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 10px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Nome Completo</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.solicitante.nome||"A definir"}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Cargo / Função</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.solicitante.cargo||"A definir"}</p>
                    </div>
                </div>
                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed var(--gray-color);">
                    <div style="text-align: center;">
                        <div style="border-bottom: 1px solid var(--dark-color); margin: 0 auto 5px; height: 35px; max-width: 450px;"></div>
                        <p style="margin: 0; font-size: 11px; color: var(--gray-color); text-align: center;">Assinatura do Aprovador</p>
                    </div>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">12</span>
            </div>
        </div>

        <!-- ====== PÁGINA 13: CONTATO ====== -->
        <div class="page page-contact">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Plataforma Principal e Secundária</span>
            </div>

            <div class="contact-content">
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
                    <div class="contact-item">
                        <i class="fas fa-globe"></i>
                        <span>www.engmarqsolution.com</span>
                    </div>
                </div>

                <div class="contact-signature">
                    <img src="${a.logoUrl}" alt="EngMarq Solution" class="signature-logo">
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
                <span class="page-number">13</span>
            </div>
        </div>
    `}function W(a,e){return`
        <div style="background: var(--light-color); border-radius: 10px; padding: 15px; margin-bottom: 12px; border-left: 4px solid var(--accent-color);">
            <h4 style="font-family: var(--font-primary); font-size: 13px; color: var(--accent-color); margin-bottom: 10px;">
                <i class="fas fa-building" style="margin-right: 6px;"></i>Empresa ${e+1}: ${a.razaoSocial}
            </h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
                <div><strong>CNPJ:</strong> ${a.cnpj||"—"}</div>
                <div><strong>Colaboradores:</strong> ${a.qtdColaboradores||"—"}</div>
                <div style="grid-column: 1 / -1;"><strong>Endereço:</strong> ${a.endereco||"—"}, ${a.bairro||""} - ${a.cidade||""} / ${a.estado||""}</div>
            </div>
        </div>
    `}function Y(a,e){if(!a.isGrupo||!a.empresasGrupo||a.empresasGrupo.length===0)return`
            <table class="investment-table">
                <thead>
                    <tr>
                        <th style="width: 50%;">Serviço</th>
                        <th style="width: 20%; text-align: center;">Nº Colaboradores</th>
                        <th style="width: 30%; text-align: right;">Valor Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="training-name"><i class="fas fa-brain" style="color: var(--purple-color);"></i> Avaliação de Fatores de Riscos Psicossociais (NR-01)</td>
                        <td style="text-align: center;">${a.qtdColaboradores||"—"}</td>
                        <td style="text-align: right; font-weight: 600;">R$ ${c(e)}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2"><i class="fas fa-calculator"></i> INVESTIMENTO TOTAL</td>
                        <td style="text-align: right;">R$ ${c(e)}</td>
                    </tr>
                </tfoot>
            </table>
        `;const s=a.empresasGrupo.reduce((t,r)=>t+(parseInt(r.qtdColaboradores||"0")||0),0),i=a.empresasGrupo.reduce((t,r)=>t+(r.valor||0),0);return`
        <table class="investment-table">
            <thead>
                <tr>
                    <th style="width: 50%;">Empresa</th>
                    <th style="width: 20%; text-align: center;">Nº Colaboradores</th>
                    <th style="width: 30%; text-align: right;">Valor</th>
                </tr>
            </thead>
            <tbody>
                ${a.empresasGrupo.map(t=>`
        <tr>
            <td class="training-name">
                <i class="fas fa-building" style="color: var(--accent-color);"></i> 
                ${t.razaoSocial}
            </td>
            <td style="text-align: center;">${t.qtdColaboradores||"—"}</td>
            <td style="text-align: right; font-weight: 600;">R$ ${c(t.valor||0)}</td>
        </tr>
    `).join("")}
            </tbody>
            <tfoot>
                <tr>
                    <td><i class="fas fa-calculator"></i> INVESTIMENTO TOTAL</td>
                    <td style="text-align: center;"><strong>${s}</strong></td>
                    <td style="text-align: right;">R$ ${c(i>0?i:e)}</td>
                </tr>
            </tfoot>
        </table>
    `}function Z(a){if(a.isGrupo&&a.empresasGrupo&&a.empresasGrupo.length>0){const e=a.empresasGrupo.map((i,o)=>W(i,o)).join(""),s=a.empresasGrupo.reduce((i,o)=>i+(parseInt(o.qtdColaboradores||"0")||0),0);return`
            <div class="info-box" style="margin-bottom: 15px; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-left-color: #10b981;">
                <h4 style="color: #10b981;"><i class="fas fa-layer-group"></i> Proposta para Grupo: ${a.nomeGrupo||a.razaoSocial}</h4>
                <p>Esta proposta abrange <strong>${a.empresasGrupo.length} empresas</strong> do grupo, totalizando <strong>${s} colaboradores</strong>.</p>
            </div>
            
            <h3 class="subsection-title"><i class="fas fa-building"></i> Empresas do Grupo</h3>
            ${e}
        `}else return`
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
                    <span>${a.razaoSocial}</span>
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
        `}const I=[{id:"relatorio",titulo:"Relatório Técnico de Avaliação de Riscos Psicossociais",icon:"fas fa-file-alt",descricao:"Documento completo com diagnóstico organizacional, análise quantitativa e qualitativa, classificação por criticidade e probabilidade, mapeamento por setor/função e indicadores de risco.",ativo:!0},{id:"plano",titulo:"Plano de Ação Preventivo e Corretivo",icon:"fas fa-tasks",descricao:"Recomendações técnicas estruturadas com medidas de controle, prazos sugeridos, responsáveis indicados e priorização conforme matriz de risco.",ativo:!0},{id:"aep",titulo:"AEP – Avaliação Ergonômica Preliminar",icon:"fas fa-clipboard-check",descricao:"Análise das condições ergonômicas correlacionadas aos fatores psicossociais identificados (quando aplicável ao contexto).",ativo:!0},{id:"palestras",titulo:"Palestras de Conscientização",icon:"fas fa-chalkboard-teacher",descricao:"Palestras sobre Fatores de Riscos Psicossociais no ambiente de trabalho para sensibilização dos colaboradores.",quantidade:2,ativo:!0},{id:"janeiro_branco",titulo:"Campanha Janeiro Branco",icon:"fas fa-ribbon",descricao:"Material de conscientização sobre saúde mental para divulgação interna",ativo:!0},{id:"reavaliacao",titulo:"Reavaliação Trimestral",icon:"fas fa-redo",descricao:"Uma reavaliação dos fatores de riscos psicossociais após 3 meses da entrega do relatório inicial",ativo:!0}];function aa(a){return(a&&a.length>0?a:I).filter(i=>i.ativo&&i.id!=="janeiro_branco"&&i.id!=="reavaliacao").map(i=>{let o=i.titulo;return i.id==="palestras"&&i.quantidade&&(o=`${i.quantidade} ${i.titulo}`),`
            <div class="deliverable-item">
                <div class="deliverable-icon"><i class="${i.icon}"></i></div>
                <div class="deliverable-text">
                    <h4>${o}</h4>
                    <p>${i.descricao}</p>
                </div>
            </div>
        `}).join("")}function ea(a){const s=(a&&a.length>0?a:I).filter(o=>(o.id==="janeiro_branco"||o.id==="reavaliacao")&&o.ativo);return s.length===0?"":`
        <div class="info-box" style="margin-top: 15px; background: linear-gradient(135deg, #f9f0ff 0%, #ede9fe 100%); border-left-color: var(--accent-color);">
            <h4 style="color: var(--accent-color);"><i class="fas fa-gift"></i> Bônus Inclusos no Pacote</h4>
            ${s.map((o,t)=>{let r=`<strong>• ${o.titulo}</strong>`;return o.descricao&&(r+=` – ${o.descricao}`),`<p style="margin-bottom: ${t===s.length-1?"0":"8px"};">${r}</p>`}).join("")}
        </div>
    `}function oa(a,e,s,i,o){const t=a.razaoSocial;let r="";return o&&i>0&&(r=`
            <div style="background: linear-gradient(135deg, #38a169 0%, #2f855a 100%); color: #fff; padding: 12px 20px; border-radius: 10px; text-align: center; margin: 10px 0;">
                <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px; opacity: 0.9;"><i class="fas fa-tag"></i> Desconto Especial Aplicado</p>
                <p style="font-size: 14px; margin: 0;"><s style="opacity: 0.7;">De ${c(e)}</s> &nbsp;<strong style="font-size: 18px;">${i}% OFF</strong></p>
            </div>`),`
        <!-- ====== PÁGINA 1: CAPA ====== -->
        <div class="page page-cover">
            <span style="position: absolute; top: 25mm; left: 0; right: 0; text-align: center; font-family: var(--font-primary); font-size: 14px; font-weight: 700; color: var(--accent-color); letter-spacing: 3px;">${a.numero}</span>
            
            <img src="${a.logoUrl}" alt="EngMarq Solution" class="cover-logo">
            
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
                <p class="cover-client-name">${t}</p>
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">1</span>
                <span class="section-title-text">Sobre ${a.isGrupo?"as Empresas Contratantes":"a Empresa Contratante"}</span>
            </h2>

            ${Z(a)}

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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
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
                    <img src="${a.logoUrl}" alt="EngMarq Solution" style="height: 60px;">
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
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
                ${aa(a.entregaveisPsico)}
            </div>

            <div class="info-box" style="margin-top: 15px;">
                <h4><i class="fas fa-shield-alt"></i> Validade Legal e Técnica</h4>
                <p>Todos os documentos são assinados por profissionais habilitados, em conformidade com a NR-01 e metodologias validadas cientificamente, garantindo aceitação em fiscalizações do MTE e processos trabalhistas.</p>
            </div>

            ${ea(a.entregaveisPsico)}

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">08</span>
            </div>
        </div>

        <!-- ====== PÁGINA 9: SERVIÇOS COMPLEMENTARES ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">8</span>
                <span class="section-title-text">Investimento</span>
            </h2>

            <div class="highlight-box" style="margin-bottom: 15px;">
                ${a.isGrupo&&a.empresasGrupo&&a.empresasGrupo.length>0?`<p style="margin: 0;"><strong><i class="fas fa-building"></i> Proposta para ${a.nomeGrupo||"Grupo"}:</strong> ${a.empresasGrupo.length} empresas | <strong>${a.empresasGrupo.reduce((l,d)=>l+(parseInt(d.qtdColaboradores||"0")||0),0)} colaboradores</strong></p>`:`<p style="margin: 0;"><strong><i class="fas fa-users"></i> Abrangência:</strong> Serviço dimensionado para <strong>${a.qtdColaboradores||"—"} colaboradores</strong></p>`}
            </div>

            <p>O valor abaixo corresponde ao investimento para execução completa dos serviços de <strong>Avaliação de Fatores de Riscos Psicossociais</strong>:</p>

            ${r}

            ${Y(a,s)}

            <p style="font-size: 10px; color: var(--gray-color); text-align: center; margin-top: 5px;">(${a.isGrupo&&a.empresasGrupo&&a.empresasGrupo.length>0?S(a.empresasGrupo.reduce((l,d)=>l+(d.valor||0),0)||s):S(s)})</p>

            <h3 class="subsection-title"><i class="fas fa-check-circle"></i> O Que Está Incluso</h3>
            <div class="included-services" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 15px; font-size: 10px;">
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Aplicação de questionário validado cientificamente</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Análise técnica dos dados coletados</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Relatório Técnico de Avaliação de Riscos Psicossociais</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Plano de Ação com medidas preventivas</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>AEP – Avaliação Ergonômica Preliminar</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>2 Palestras de Conscientização sobre Riscos Psicossociais</span></div>
            </div>

            <h3 class="subsection-title"><i class="fas fa-credit-card"></i> Condições de Pagamento</h3>
            <div class="company-info-grid">
                <div class="company-info-item"><label>Forma de Pagamento</label><span>Transferência Bancária ou PIX</span></div>
                <div class="company-info-item"><label>Prazo</label><span>50% na aprovação | 50% na entrega</span></div>
                <div class="company-info-item"><label>Validade da Proposta</label><span>15 dias corridos</span></div>
                <div class="company-info-item"><label>Prazo de Execução</label><span>20 dias úteis após aprovação</span></div>
            </div>

            <div class="info-box" style="background: linear-gradient(135deg, #f9f0ff 0%, #ede9fe 100%); border-left-color: var(--accent-color); margin-top: 15px;">
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
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

        <!-- ====== PÁGINA 12: RESPONSÁVEL PELA PROPOSTA ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">10</span>
                <span class="section-title-text">Responsável pela Proposta</span>
            </h2>

            <p style="text-align: center; margin-bottom: 30px; color: var(--gray-color);">
                Esta proposta comercial foi elaborada para atender às exigências da NR-01 atualizada, garantindo segurança jurídica e promovendo um ambiente de trabalho saudável.
            </p>

            <div class="responsible-card">
                <div class="responsible-avatar"><i class="fas fa-user-tie"></i></div>
                <h3 class="responsible-name">${a.elaborador.nome}</h3>
                <p class="responsible-role">${a.elaborador.cargo}</p>
                <p class="responsible-company">EngMarq Solution</p>
                <div class="responsible-contacts">
                    <div class="responsible-contact-item"><i class="fab fa-whatsapp"></i><span>${a.elaborador.telefone}</span></div>
                    <div class="responsible-contact-item"><i class="fas fa-envelope"></i><span>${a.elaborador.email}</span></div>
                    <div class="responsible-contact-item"><i class="fas fa-map-marker-alt"></i><span>Natal - RN</span></div>
                </div>
            </div>

            <div class="purple-box" style="margin-top: 30px;">
                <h4><i class="fas fa-headset"></i> Atendimento Especializado</h4>
                <p>Estamos à disposição para esclarecer qualquer dúvida sobre o escopo dos serviços, ajustar a proposta conforme necessidade e acompanhar todo o processo de avaliação dos riscos psicossociais na sua empresa.</p>
            </div>

            <div class="info-box" style="margin-top: 20px;">
                <h4><i class="fas fa-clock"></i> Horário de Atendimento</h4>
                <p>Segunda a Sexta: 08h às 18h | Sábado: 08h às 12h</p>
                <p style="margin-top: 10px;"><strong>Atendimento via WhatsApp:</strong> Resposta em até 2 horas durante o horário comercial</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">12</span>
            </div>
        </div>

        <!-- ====== PÁGINA 13: TERMO DE ACEITE E ASSINATURAS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <h2 class="section-title">
                <span class="section-number"><i class="fas fa-file-signature"></i></span>
                <span class="section-title-text">Termo de Aceite da Proposta</span>
            </h2>

            <div class="info-box" style="margin-bottom: 20px;">
                <h4><i class="fas fa-check-circle"></i> Declaração de Aceite</h4>
                <p>Ao assinar este documento, as partes declaram estar de acordo com todos os termos, condições, valores e prazos descritos nesta proposta comercial, formalizando a contratação dos serviços especificados.</p>
            </div>

            <div style="background: var(--light-color); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h3 style="font-family: var(--font-primary); color: var(--primary-color); font-size: 16px; margin-bottom: 15px; text-align: center; border-bottom: 2px solid var(--purple-color); padding-bottom: 10px;">
                    <i class="fas fa-building" style="color: var(--purple-color);"></i> RESPONSÁVEL PELA ELABORAÇÃO DA PROPOSTA
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Razão Social</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">Engmarq Solution LTDA</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">CNPJ</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">60.545.359/0001-76</p>
                    </div>
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.elaborador.nome} - ${a.elaborador.cargo}</p>
                </div>
                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed var(--gray-color);">
                    <div style="text-align: center;">
                        <div style="border-bottom: 1px solid var(--dark-color); margin: 0 auto 5px; height: 35px; max-width: 450px;"></div>
                        <p style="margin: 0; font-size: 11px; color: var(--gray-color); text-align: center;">Assinatura do Proponente</p>
                    </div>
                </div>
            </div>

            <div style="background: var(--light-color); border-radius: 12px; padding: 20px;">
                <h3 style="font-family: var(--font-primary); color: var(--primary-color); font-size: 16px; margin-bottom: 15px; text-align: center; border-bottom: 2px solid var(--secondary-color); padding-bottom: 10px;">
                    <i class="fas fa-user-tie" style="color: var(--secondary-color);"></i> RESPONSÁVEL PELA APROVAÇÃO DA PROPOSTA
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 10px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Razão Social</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.razaoSocial}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">CNPJ</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.cnpj}</p>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 10px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Nome Completo</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.solicitante.nome||"A definir"}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Cargo / Função</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.solicitante.cargo||"A definir"}</p>
                    </div>
                </div>
                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed var(--gray-color);">
                    <div style="text-align: center;">
                        <div style="border-bottom: 1px solid var(--dark-color); margin: 0 auto 5px; height: 35px; max-width: 450px;"></div>
                        <p style="margin: 0; font-size: 11px; color: var(--gray-color); text-align: center;">Assinatura do Aprovador</p>
                    </div>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">13</span>
            </div>
        </div>

        <!-- ====== PÁGINA 14: CONTATO ====== -->
        <div class="page page-contact">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Riscos Psicossociais</span>
            </div>

            <div class="contact-content">
                <div class="contact-icon">
                    <i class="fas fa-handshake"></i>
                </div>
                <h2 class="contact-title">Fale Conosco</h2>
                <p class="contact-subtitle">
                    Estamos à disposição para dar continuidade ao processo de contratação e esclarecer eventuais dúvidas sobre a avaliação de riscos psicossociais.
                </p>

                <div class="contact-info">
                    <div class="contact-item"><i class="fab fa-whatsapp"></i><span>+55 84 99928-5888</span></div>
                    <div class="contact-item"><i class="fas fa-envelope"></i><span>engmarqsolution@gmail.com</span></div>
                    <div class="contact-item"><i class="fab fa-instagram"></i><span>@engmarq_solution</span></div>
                    <div class="contact-item"><i class="fas fa-globe"></i><span>www.engmarqsolution.com</span></div>
                </div>

                <div class="contact-signature">
                    <img src="${a.logoUrl}" alt="EngMarq Solution" class="signature-logo">
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
                <span class="page-number">14</span>
            </div>
        </div>
    `}function ia(a,e,s,i,o){const t=a.razaoSocial;let r="";return o&&i>0&&(r=`
            <div style="background: linear-gradient(135deg, #38a169 0%, #2f855a 100%); color: #fff; padding: 12px 20px; border-radius: 10px; text-align: center; margin: 10px 0;">
                <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px; opacity: 0.9;"><i class="fas fa-tag"></i> Desconto Especial Aplicado</p>
                <p style="font-size: 14px; margin: 0;"><s style="opacity: 0.7;">De ${c(e)}</s> &nbsp;<strong style="font-size: 18px;">${i}% OFF</strong></p>
            </div>`),`
        <!-- ====== PÁGINA 1: CAPA ====== -->
        <div class="page page-cover">
            <span style="position: absolute; top: 25mm; left: 0; right: 0; text-align: center; font-family: var(--font-primary); font-size: 14px; font-weight: 700; color: var(--accent-color); letter-spacing: 3px;">${a.numero}</span>
            
            <img src="${a.logoUrl}" alt="EngMarq Solution" class="cover-logo">
            
            <span class="cover-badge">
                <i class="fas fa-shield-alt"></i>
                Assessoria Técnica Especializada
            </span>

            <div class="cover-icon">
                <i class="fas fa-hard-hat"></i>
            </div>

            <h1 class="cover-title">
                Proposta Comercial<br>
                <span>Assessoria em Segurança do Trabalho</span>
            </h1>
            <p class="cover-subtitle">
                Equipe técnica especializada, gestão de programas de SST e treinamentos de capacitação para conformidade legal
            </p>
            
            <div class="cover-client">
                <p class="cover-client-label">Proposta elaborada para</p>
                <p class="cover-client-name">${t}</p>
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Assessoria em SST</span>
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
                    <span>${t}</span>
                </div>
                <div class="company-info-item">
                    <label>Quantidade de Colaboradores</label>
                    <span>${a.qtdColaboradores||"—"} colaboradores</span>
                </div>
                <div class="company-info-item">
                    <label>Endereço</label>
                    <span>${a.endereco}${a.bairro?" - "+a.bairro:""}</span>
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
            <h3 class="subsection-title" style="margin-top: 25px;"><i class="fas fa-user-tie"></i> Responsável pelo Recebimento da Proposta</h3>
            <div class="company-info-grid">
                <div class="company-info-item"><label>Nome do Responsável</label><span>${a.solicitante.nome}</span></div>
                <div class="company-info-item"><label>Cargo / Função</label><span>${a.solicitante.cargo||"A definir"}</span></div>
                <div class="company-info-item"><label>Telefone / WhatsApp</label><span>${a.solicitante.telefone||"A definir"}</span></div>
                <div class="company-info-item"><label>E-mail</label><span>${a.solicitante.email||"A definir"}</span></div>
            </div>
            `:""}

            <div class="info-box" style="margin-top: 25px;">
                <h4><i class="fas fa-handshake"></i> Proposta Especializada</h4>
                <p>Esta proposta contempla a prestação de serviços de assessoria em segurança do trabalho com equipe técnica dedicada, gestão de programas de SST e treinamentos de capacitação conforme as Normas Regulamentadoras.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">02</span>
            </div>
        </div>

        <!-- ====== PÁGINA 3: FORNECIMENTO DE EQUIPE TÉCNICA ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Assessoria em SST</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">2</span>
                <span class="section-title-text">Fornecimento de Equipe Técnica</span>
            </h2>

            <div class="info-box" style="margin-bottom: 15px;">
                <h4><i class="fas fa-users-cog"></i> Assessoria Personalizada em SST</h4>
                <p>Serviço customizado de acompanhamento e fiscalização dos processos de segurança do trabalho da empresa contratante, com profissional especializado e experiente no segmento.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-user-shield"></i> Profissionais Alocados</h3>

            <div class="factor-card" style="margin: 10px 0;">
                <h4><i class="fas fa-id-badge"></i> 1 Técnico de Segurança do Trabalho</h4>
                <p>Profissional habilitado e registrado conforme exigências do MTE.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-calendar-check"></i> Modalidade de Visitas</h3>

            <table style="width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 10px;">
                <tr style="background: var(--light-color);">
                    <td style="padding: 8px 12px; border: 1px solid #e2e8f0; width: 50%;"><strong>Frequência:</strong></td>
                    <td style="padding: 8px 12px; border: 1px solid #e2e8f0;"><i class="fas fa-check" style="color: var(--success-color);"></i> Visita técnica 1x por mês</td>
                </tr>
                <tr>
                    <td style="padding: 8px 12px; border: 1px solid #e2e8f0;"><strong>Total de visitas por mês:</strong></td>
                    <td style="padding: 8px 12px; border: 1px solid #e2e8f0;"><strong style="color: var(--primary-color);">1 visita</strong></td>
                </tr>
                <tr style="background: var(--light-color);">
                    <td style="padding: 8px 12px; border: 1px solid #e2e8f0;"><strong>Total de visitas por 12 meses:</strong></td>
                    <td style="padding: 8px 12px; border: 1px solid #e2e8f0;"><strong style="color: var(--primary-color);">12 visitas</strong></td>
                </tr>
                <tr>
                    <td style="padding: 8px 12px; border: 1px solid #e2e8f0;"><strong>Assessoria online:</strong></td>
                    <td style="padding: 8px 12px; border: 1px solid #e2e8f0;"><strong style="color: var(--success-color);">Sob demanda</strong></td>
                </tr>
            </table>

            <div class="highlight-box">
                <p><strong><i class="fas fa-clock"></i> Observação:</strong> Cada visita técnica é contabilizada como sendo de 1 turno (manhã ou tarde), sendo realizada em <strong>4 horas de trabalho</strong>.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-tasks"></i> Atividades do Profissional de Segurança do Trabalho</h3>

            <ul class="feature-list" style="font-size: 10px;">
                <li>Acompanhamento de OS - Ordem de Serviço, conforme NR-01, descrevendo deveres e obrigações perante à segurança do trabalho</li>
                <li>Acompanhamento técnico das atividades de inspeção de equipamento de proteção individual (NR-06)</li>
                <li>Acompanhamento técnico das atividades de inspeção de equipamento de proteção coletiva (NR-18)</li>
                <li>Acompanhamento técnico das atividades de investigação e análise de acidente de trabalho (NR-04)</li>
                <li>Acompanhamento técnico das atividades de emissão da CAT, evento S-2210 do eSocial, além do envio</li>
                <li>Acompanhamento técnico das atividades fiscalização de segurança do trabalho</li>
                <li>Gestão dos programas de SST (PGR, PCMSO e LTCAT), acompanhamento dos cronogramas de ações, riscos ocupacionais, funções e equipamentos de ordem individuais e coletivos</li>
            </ul>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">03</span>
            </div>
        </div>

        <!-- ====== PÁGINA 4: TREINAMENTOS DE CAPACITAÇÃO TÉCNICA ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Assessoria em SST</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">3</span>
                <span class="section-title-text">Treinamentos de Capacitação Técnica</span>
            </h2>

            <div class="info-box" style="margin-bottom: 20px;">
                <h4><i class="fas fa-graduation-cap"></i> Capacitação Técnica Inclusa</h4>
                <p>Programação de treinamentos integrada ao serviço de assessoria, executada nas instalações do cliente durante as visitas agendadas ou mediante demanda específica.</p>
            </div>

            <!-- Treinamento 1 -->
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <h4 style="margin: 0; font-family: var(--font-primary); font-size: 13px; color: var(--primary-color); font-weight: 600;">
                        <i class="fas fa-hard-hat" style="color: var(--secondary-color); margin-right: 6px;"></i>Integração Admissional - NR-18
                    </h4>
                    <div style="display: flex; gap: 8px; font-size: 10px;">
                        <span style="color: var(--gray-color);"><i class="fas fa-clock"></i> 04h</span>
                        <span style="background: #f7fafc; color: var(--primary-color); padding: 2px 8px; border-radius: 4px; font-weight: 600;">1x/mês</span>
                    </div>
                </div>
                <p style="margin: 0; font-size: 10px; line-height: 1.6; color: var(--gray-color);">Capacitação obrigatória para novos colaboradores admitidos, abordando segurança na construção civil. Realizado na empresa contratante durante visita técnica ou mediante agendamento específico.</p>
            </div>

            <!-- Treinamento 2 -->
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <h4 style="margin: 0; font-family: var(--font-primary); font-size: 13px; color: var(--primary-color); font-weight: 600;">
                        <i class="fas fa-users" style="color: var(--secondary-color); margin-right: 6px;"></i>Formação de CIPA
                    </h4>
                    <div style="display: flex; gap: 8px; font-size: 10px;">
                        <span style="color: var(--gray-color);"><i class="fas fa-clock"></i> 08h</span>
                        <span style="background: #f7fafc; color: var(--primary-color); padding: 2px 8px; border-radius: 4px; font-weight: 600;">1x/ano</span>
                    </div>
                </div>
                <p style="margin: 0; font-size: 10px; line-height: 1.6; color: var(--gray-color);">Capacitação anual para membros eleitos e designados da Comissão Interna de Prevenção de Acidentes, incluindo titulares e suplentes, executada nas dependências do contratante.</p>
            </div>

            <!-- Treinamento 3 -->
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <h4 style="margin: 0; font-family: var(--font-primary); font-size: 13px; color: var(--primary-color); font-weight: 600;">
                        <i class="fas fa-fire-extinguisher" style="color: var(--secondary-color); margin-right: 6px;"></i>Brigada de Emergência e Combate a Incêndio
                    </h4>
                    <div style="display: flex; gap: 8px; font-size: 10px;">
                        <span style="color: var(--gray-color);"><i class="fas fa-clock"></i> 04h</span>
                        <span style="background: #f7fafc; color: var(--primary-color); padding: 2px 8px; border-radius: 4px; font-weight: 600;">1x/ano</span>
                    </div>
                </div>
                <p style="margin: 0; font-size: 10px; line-height: 1.6; color: var(--gray-color);">Preparação de brigadistas voluntários para atuação em situações de emergência, com foco em prevenção e combate a princípios de incêndio, primeiros socorros e evacuação de áreas.</p>
            </div>

            <!-- Treinamento 4 -->
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <h4 style="margin: 0; font-family: var(--font-primary); font-size: 13px; color: var(--primary-color); font-weight: 600;">
                        <i class="fas fa-bolt" style="color: var(--secondary-color); margin-right: 6px;"></i>Segurança em Instalações Elétricas - NR-10
                    </h4>
                    <div style="display: flex; gap: 8px; font-size: 10px;">
                        <span style="color: var(--gray-color);"><i class="fas fa-clock"></i> 40h</span>
                        <span style="background: #f7fafc; color: var(--primary-color); padding: 2px 8px; border-radius: 4px; font-weight: 600;">1x/ano</span>
                    </div>
                </div>
                <p style="margin: 0; font-size: 10px; line-height: 1.6; color: var(--gray-color);">Formação básica para colaboradores autorizados a intervir em instalações elétricas. Pode ser realizado na sede da EngMarq Solution.</p>
            </div>

            <!-- Treinamento 5 -->
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <h4 style="margin: 0; font-family: var(--font-primary); font-size: 13px; color: var(--primary-color); font-weight: 600;">
                        <i class="fas fa-mountain" style="color: var(--secondary-color); margin-right: 6px;"></i>Trabalho em Altura - NR-35
                    </h4>
                    <div style="display: flex; gap: 8px; font-size: 10px;">
                        <span style="color: var(--gray-color);"><i class="fas fa-clock"></i> 08h</span>
                        <span style="background: #f7fafc; color: var(--primary-color); padding: 2px 8px; border-radius: 4px; font-weight: 600;">1x/ano</span>
                    </div>
                </div>
                <p style="margin: 0; font-size: 10px; line-height: 1.6; color: var(--gray-color);">Habilitação para atividades executadas acima de 2 metros do piso. Agendamento conforme disponibilidade de ambas as partes.</p>
            </div>

            <div class="highlight-box">
                <p style="font-size: 10px; margin: 0;"><strong><i class="fas fa-calendar-check"></i> Execução:</strong> Todos os treinamentos serão ministrados mediante solicitação prévia e coordenação de agenda entre as partes. Turmas adicionais, reciclagens ou outras capacitações podem ser contratadas separadamente.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">04</span>
            </div>
        </div>

        <!-- ====== PÁGINA 5: INVESTIMENTO ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Assessoria em SST</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">4</span>
                <span class="section-title-text">Investimento</span>
            </h2>

            ${r}

            <table class="investment-table">
                <thead>
                    <tr>
                        <th style="width: 70%;">Serviço</th>
                        <th style="width: 30%; text-align: right;">Valor Mensal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="training-name"><i class="fas fa-hard-hat" style="color: var(--secondary-color);"></i> Assessoria Personalizada em SST (1 visita/mês + suporte sob demanda + treinamentos inclusos)</td>
                        <td style="text-align: right; font-weight: 600;">R$ ${c(s)}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td><i class="fas fa-calculator"></i> INVESTIMENTO MENSAL</td>
                        <td style="text-align: right;">R$ ${c(s)}</td>
                    </tr>
                </tfoot>
            </table>

            <h3 class="subsection-title"><i class="fas fa-check-circle"></i> O Que Está Incluso</h3>
            <div class="included-services" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 15px; font-size: 10px;">
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>1 Técnico de Segurança do Trabalho</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>1 visita técnica mensal</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Assessoria online sob demanda</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Gestão de PGR, PCMSO e LTCAT</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Treinamento Admissional NR-18 (1/mês)</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Treinamento CIPA (1/ano)</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Treinamento Brigada de Incêndio (1/ano)</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Treinamento NR-10 (1/ano)</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Treinamento NR-35 (1/ano)</span></div>
                <div style="display: flex; align-items: flex-start; gap: 8px;"><i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i><span>Inspeções de EPIs e EPCs</span></div>
            </div>

            <h3 class="subsection-title"><i class="fas fa-credit-card"></i> Condições de Pagamento</h3>
            <div class="company-info-grid">
                <div class="company-info-item"><label>Forma de Pagamento</label><span>Transferência Bancária ou PIX</span></div>
                <div class="company-info-item"><label>Vencimento</label><span>Todo dia 10 do mês vigente</span></div>
                <div class="company-info-item"><label>Validade da Proposta</label><span>15 dias corridos</span></div>
                <div class="company-info-item"><label>Vigência do Contrato</label><span>12 meses (renovável)</span></div>
            </div>

            <div class="info-box" style="margin-top: 15px;">
                <p style="margin: 0; font-size: 10px;"><strong><i class="fas fa-info-circle"></i> Observação:</strong> Serviços adicionais não contemplados nesta proposta podem ser negociados separadamente.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">05</span>
            </div>
        </div>

        <!-- ====== PÁGINA 6: RESPONSÁVEL PELA PROPOSTA ====== -->
        <div class="page page-contact">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Assessoria em SST</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">5</span>
                <span class="section-title-text">Responsável pela Proposta</span>
            </h2>

            <div class="contact-content" style="margin-top: 15px;">
                <div class="responsible-card">
                    <div class="responsible-avatar">
                        <i class="fas fa-user-tie"></i>
                    </div>
                    <p class="responsible-name">${a.elaborador.nome}</p>
                    <p class="responsible-role">${a.elaborador.cargo}</p>
                    <p class="responsible-company">EngMarq Solution</p>

                    <div class="responsible-contacts">
                        <div class="responsible-contact-item">
                            <i class="fab fa-whatsapp"></i>
                            <span>${a.elaborador.telefone}</span>
                        </div>
                        <div class="responsible-contact-item">
                            <i class="fas fa-envelope"></i>
                            <span>${a.elaborador.email}</span>
                        </div>
                        <div class="responsible-contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Natal - RN</span>
                        </div>
                    </div>
                </div>

                <div class="info-box" style="margin-top: 15px;">
                    <h4><i class="fas fa-building"></i> Sobre a EngMarq Solution</h4>
                    <p>Somos uma empresa especializada em <strong>Engenharia de Segurança e Saúde do Trabalho</strong>, oferecendo soluções completas para adequação às Normas Regulamentadoras, gestão de riscos ocupacionais e promoção de ambientes de trabalho seguros e saudáveis.</p>
                </div>

                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px;">
                    <div style="text-align: center; padding: 12px; background: var(--light-color); border-radius: 8px;">
                        <i class="fas fa-award" style="font-size: 22px; color: var(--secondary-color); margin-bottom: 6px;"></i>
                        <p style="font-size: 10px; margin: 0; font-weight: 600; color: var(--primary-color);">Profissionais Qualificados</p>
                    </div>
                    <div style="text-align: center; padding: 12px; background: var(--light-color); border-radius: 8px;">
                        <i class="fas fa-handshake" style="font-size: 22px; color: var(--secondary-color); margin-bottom: 6px;"></i>
                        <p style="font-size: 10px; margin: 0; font-weight: 600; color: var(--primary-color);">Compromisso com Resultados</p>
                    </div>
                    <div style="text-align: center; padding: 12px; background: var(--light-color); border-radius: 8px;">
                        <i class="fas fa-shield-alt" style="font-size: 22px; color: var(--secondary-color); margin-bottom: 6px;"></i>
                        <p style="font-size: 10px; margin: 0; font-weight: 600; color: var(--primary-color);">Segurança em Primeiro Lugar</p>
                    </div>
                </div>

                <div class="contact-signature">
                    <p class="signature-text">
                        <strong>EngMarq Solution</strong><br>
                        Engenharia de Segurança e Saúde do Trabalho<br>
                        CNPJ: 60.545.359/0001-76 | Natal - RN<br>
                        <em>Transformando ambientes de trabalho em espaços seguros e produtivos.</em>
                    </p>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">06</span>
            </div>
        </div>

        <!-- ====== PÁGINA 7: TERMO DE ACEITE ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Assessoria em SST</span>
            </div>

            <h2 class="section-title">
                <span class="section-number"><i class="fas fa-file-signature"></i></span>
                <span class="section-title-text">Termo de Aceite e Assinaturas</span>
            </h2>

            <div class="info-box" style="margin-bottom: 15px;">
                <h4><i class="fas fa-handshake"></i> Formalização do Aceite</h4>
                <p>Ao assinar este documento, as partes declaram estar de acordo com todos os termos, condições, valores e prazos descritos nesta proposta comercial, formalizando a contratação dos serviços especificados.</p>
            </div>

            <div style="background: var(--light-color); border-radius: 12px; padding: 20px; margin-bottom: 15px;">
                <h3 style="font-family: var(--font-primary); color: var(--primary-color); font-size: 16px; margin-bottom: 15px; text-align: center; border-bottom: 2px solid var(--purple-color); padding-bottom: 10px;">
                    <i class="fas fa-building" style="color: var(--purple-color);"></i> RESPONSÁVEL PELA ELABORAÇÃO DA PROPOSTA
                </h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Razão Social</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">Engmarq Solution LTDA</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">CNPJ</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">60.545.359/0001-76</p>
                    </div>
                </div>

                <div style="margin-bottom: 15px;">
                    <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.elaborador.nome} - ${a.elaborador.cargo}</p>
                </div>

                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed var(--gray-color);">
                    <div style="text-align: center;">
                        <div style="border-bottom: 1px solid var(--dark-color); margin: 0 auto 5px; height: 35px; max-width: 450px;"></div>
                        <p style="margin: 0; font-size: 11px; color: var(--gray-color); text-align: center;">Assinatura do Proponente</p>
                    </div>
                </div>
            </div>

            <div style="background: var(--light-color); border-radius: 12px; padding: 20px;">
                <h3 style="font-family: var(--font-primary); color: var(--primary-color); font-size: 16px; margin-bottom: 15px; text-align: center; border-bottom: 2px solid var(--secondary-color); padding-bottom: 10px;">
                    <i class="fas fa-user-tie" style="color: var(--secondary-color);"></i> RESPONSÁVEL PELA APROVAÇÃO DA PROPOSTA
                </h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 10px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Razão Social</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.razaoSocial}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">CNPJ</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.cnpj}</p>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 10px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Nome Completo</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.solicitante.nome||"A definir"}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Cargo / Função</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.solicitante.cargo||"A definir"}</p>
                    </div>
                </div>

                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed var(--gray-color);">
                    <div style="text-align: center;">
                        <div style="border-bottom: 1px solid var(--dark-color); margin: 0 auto 5px; height: 35px; max-width: 450px;"></div>
                        <p style="margin: 0; font-size: 11px; color: var(--gray-color); text-align: center;">Assinatura do Aprovador</p>
                    </div>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">07</span>
            </div>
        </div>

        <!-- ====== PÁGINA 8: CONTATO ====== -->
        <div class="page page-contact">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Assessoria em SST</span>
            </div>

            <div class="contact-content">
                <div class="contact-icon">
                    <i class="fas fa-handshake"></i>
                </div>
                <h2 class="contact-title">Fale Conosco</h2>
                <p class="contact-subtitle">
                    Estamos à disposição para dar continuidade ao processo de contratação e esclarecer eventuais dúvidas sobre a assessoria em SST.
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
                    <div class="contact-item">
                        <i class="fas fa-globe"></i>
                        <span>www.engmarqsolution.com</span>
                    </div>
                </div>

                <div class="contact-signature">
                    <img src="${a.logoUrl}" alt="EngMarq Solution" class="signature-logo">
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
                <span class="page-number">08</span>
            </div>
        </div>
    `}function sa(a,e,s,i,o){const t=a.razaoSocial;let r="";return o&&i>0&&(r=`
            <div style="background: linear-gradient(135deg, #38a169 0%, #2f855a 100%); color: #fff; padding: 12px 20px; border-radius: 10px; text-align: center; margin: 10px 0;">
                <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px; opacity: 0.9;"><i class="fas fa-tag"></i> Desconto Especial Aplicado</p>
                <p style="font-size: 14px; margin: 0;"><s style="opacity: 0.7;">De ${c(e)}</s> &nbsp;<strong style="font-size: 18px;">${i}% OFF</strong></p>
            </div>`),`
        <!-- ====== PÁGINA 1: CAPA ====== -->
        <div class="page page-cover">
            <span style="position: absolute; top: 25mm; left: 0; right: 0; text-align: center; font-family: var(--font-primary); font-size: 14px; font-weight: 700; color: var(--accent-color); letter-spacing: 3px;">${a.numero}</span>
            
            <img src="${a.logoUrl}" alt="EngMarq Solution" class="cover-logo">
            
            <span class="cover-badge">
                <i class="fas fa-shield-alt"></i>
                Conformidade Legal NR-01 | NR-07 | IN 128
            </span>

            <div class="cover-icon">
                <i class="fas fa-file-medical-alt"></i>
            </div>

            <h1 class="cover-title">
                Proposta Comercial<br>
                <span>Kit Integrado de Programas de SST</span>
            </h1>
            <p class="cover-subtitle">
                PGR + LTCAT + PCMSO integrados para conformidade legal, prevenção de passivos trabalhistas e previdenciários
            </p>
            
            <div class="cover-client">
                <p class="cover-client-label">Proposta elaborada para</p>
                <p class="cover-client-name">${t}</p>
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
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Kit Integrado SST</span>
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
                    <span>${t}</span>
                </div>
                <div class="company-info-item">
                    <label>Quantidade de Colaboradores</label>
                    <span>${a.qtdColaboradores||"—"} colaboradores</span>
                </div>
                <div class="company-info-item">
                    <label>Endereço</label>
                    <span>${a.endereco}${a.bairro?" - "+a.bairro:""}</span>
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
            <h3 class="subsection-title" style="margin-top: 25px;"><i class="fas fa-user-tie"></i> Responsável pelo Recebimento da Proposta</h3>
            <div class="company-info-grid">
                <div class="company-info-item"><label>Nome do Responsável</label><span>${a.solicitante.nome}</span></div>
                <div class="company-info-item"><label>Cargo / Função</label><span>${a.solicitante.cargo||"A definir"}</span></div>
                <div class="company-info-item"><label>Telefone / WhatsApp</label><span>${a.solicitante.telefone||"A definir"}</span></div>
                <div class="company-info-item"><label>E-mail</label><span>${a.solicitante.email||"A definir"}</span></div>
            </div>
            `:""}

            <div class="info-box" style="margin-top: 25px;">
                <h4><i class="fas fa-handshake"></i> Proposta Integrada</h4>
                <p>Esta proposta contempla a elaboração integrada do <strong>PGR, LTCAT e PCMSO</strong>, garantindo conformidade legal plena com as NRs 01 e 07 do Ministério do Trabalho e com a legislação previdenciária vigente (IN 128/INSS).</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">02</span>
            </div>
        </div>

        <!-- ====== PÁGINA 3: CONTEXTO E OBRIGAÇÃO LEGAL ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Kit Integrado SST</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">2</span>
                <span class="section-title-text">Contexto e Obrigação Legal</span>
            </h2>

            <div class="alert-box">
                <h4><i class="fas fa-gavel"></i> Obrigações Legais Integradas</h4>
                <p>As <strong>NR-01, NR-07</strong> e a <strong>legislação previdenciária (IN 128/INSS)</strong> estabelecem que todas as empresas devem manter programas de SST atualizados, integrados e em conformidade com o eSocial.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-file-contract"></i> Base Legal dos Programas</h3>
            
            <p><strong>PGR – Programa de Gerenciamento de Riscos (NR-01):</strong> Obrigatório para todas as empresas, substitui o antigo PPRA. Constitui a base técnica para identificação, avaliação e controle dos riscos ocupacionais, alimentando o PCMSO e o LTCAT.</p>
            
            <p><strong>LTCAT – Laudo Técnico das Condições Ambientais do Trabalho:</strong> Exigido pela legislação previdenciária (Lei 8.213/91 e IN 128/INSS). Documenta a exposição a agentes nocivos para fins de aposentadoria especial e defesa em processos previdenciários.</p>
            
            <p><strong>PCMSO – Programa de Controle Médico de Saúde Ocupacional (NR-07):</strong> Programa obrigatório para todas as empresas que estabelece diretrizes e parâmetros para <strong>vigilância da saúde dos trabalhadores</strong>. Define os exames médicos ocupacionais com base nos riscos ocupacionais mapeados no PGR.</p>

            <div class="highlight-box">
                <p><strong>Integração obrigatória:</strong> A NR-01 determina que o PGR deve ser a <strong>base técnica</strong> para todos os demais programas de SST. O PCMSO e o LTCAT devem estar alinhados com os riscos identificados no inventário de riscos do PGR.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-exclamation-triangle"></i> Riscos Jurídicos do Não Cumprimento</h3>
            <ul class="feature-list">
                <li><strong>Multas do MTE</strong> por ausência ou inadequação dos programas de SST</li>
                <li><strong>Autuações do eSocial</strong> por inconsistências nas informações de SST</li>
                <li><strong>Ações regressivas do INSS</strong> por benefícios acidentários concedidos</li>
                <li><strong>Processos trabalhistas</strong> por doenças ocupacionais não prevenidas</li>
                <li><strong>Responsabilização criminal</strong> em caso de acidentes graves ou fatais</li>
            </ul>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">03</span>
            </div>
        </div>

        <!-- ====== PÁGINA 4: O QUE SÃO PGR, LTCAT E PCMSO ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Kit Integrado SST</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">3</span>
                <span class="section-title-text">O que são PGR, LTCAT e PCMSO?</span>
            </h2>

            <div class="green-box">
                <h4><i class="fas fa-shield-alt"></i> PGR – Programa de Gerenciamento de Riscos</h4>
                <p>Documento obrigatório pela <strong>NR-01</strong> que estabelece o processo sistemático de identificação de perigos, avaliação de riscos e implementação de medidas de controle. É a <strong>base técnica central</strong> que alimenta o PCMSO e o LTCAT.</p>
            </div>

            <div class="info-box">
                <h4><i class="fas fa-file-medical-alt"></i> LTCAT – Laudo Técnico das Condições Ambientais</h4>
                <p>Documento técnico-legal exigido pela <strong>legislação previdenciária</strong> que caracteriza a exposição dos trabalhadores a agentes nocivos (físicos, químicos e biológicos). Fundamenta o direito à <strong>aposentadoria especial</strong> e protege a empresa em processos previdenciários.</p>
            </div>

            <div class="purple-box">
                <h4><i class="fas fa-heartbeat"></i> PCMSO – Programa de Controle Médico de Saúde Ocupacional</h4>
                <p>Programa obrigatório pela <strong>NR-07</strong> que tem por objetivo a <strong>promoção e preservação da saúde dos trabalhadores</strong> através de ações integradas de vigilância epidemiológica e médica. Define os exames médicos ocupacionais com base nos riscos do PGR.</p>
            </div>

            <h3 class="subsection-title"><i class="fas fa-project-diagram"></i> Integração entre os Programas</h3>

            <div class="factors-grid">
                <div class="factor-card">
                    <h4><i class="fas fa-search"></i> Inventário de Riscos (PGR)</h4>
                    <p>Base técnica que mapeia todos os perigos e riscos ocupacionais por função e ambiente de trabalho.</p>
                </div>
                <div class="factor-card">
                    <h4><i class="fas fa-tasks"></i> Plano de Ação (PGR)</h4>
                    <p>Define medidas de controle, prazos e responsáveis para eliminação ou redução dos riscos.</p>
                </div>
                <div class="factor-card">
                    <h4><i class="fas fa-clipboard-check"></i> Caracterização de Exposição (LTCAT)</h4>
                    <p>Documenta a exposição a agentes nocivos conforme critérios técnicos e legais previdenciários.</p>
                </div>
                <div class="factor-card">
                    <h4><i class="fas fa-stethoscope"></i> Vigilância da Saúde (PCMSO)</h4>
                    <p>Define exames médicos e parâmetros de monitoramento baseados nos riscos do PGR.</p>
                </div>
            </div>

            <div class="highlight-box">
                <p><strong>Fluxo de Integração:</strong> O PGR identifica os riscos → O LTCAT caracteriza a exposição para fins previdenciários → O PCMSO define os exames médicos necessários. Todos devem estar <strong>consistentes e atualizados</strong>.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">04</span>
            </div>
        </div>

        <!-- ====== PÁGINA 5: ESCOPO E ENTREGÁVEIS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Kit Integrado SST</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">4</span>
                <span class="section-title-text">Escopo e Entregáveis</span>
            </h2>

            <h3 class="subsection-title"><i class="fas fa-file-alt"></i> PGR – Programa de Gerenciamento de Riscos</h3>
            <ul class="feature-list">
                <li>Visita técnica às instalações da empresa</li>
                <li>Inventário de Riscos Ocupacionais completo</li>
                <li>Identificação de perigos por função e ambiente</li>
                <li>Avaliação qualitativa dos riscos ocupacionais</li>
                <li>Plano de Ação com medidas de controle</li>
                <li>Documento técnico formatado e assinado</li>
            </ul>

            <h3 class="subsection-title"><i class="fas fa-file-medical-alt"></i> LTCAT – Laudo Técnico das Condições Ambientais</h3>
            <ul class="feature-list">
                <li>Caracterização dos ambientes de trabalho</li>
                <li>Identificação de agentes nocivos (físicos, químicos, biológicos)</li>
                <li>Enquadramento conforme Anexo IV do Decreto 3.048/99</li>
                <li>Conclusão técnica sobre exposição para fins previdenciários</li>
                <li>ART do engenheiro de segurança responsável</li>
            </ul>

            <h3 class="subsection-title"><i class="fas fa-heartbeat"></i> PCMSO – Programa de Controle Médico</h3>
            <ul class="feature-list">
                <li>Definição dos exames médicos ocupacionais por função</li>
                <li>Relação de exames complementares necessários</li>
                <li>Periodicidade dos exames conforme riscos</li>
                <li>Parâmetros de aptidão para cada função</li>
                <li>Cronograma anual de exames</li>
                <li>Assinatura do médico do trabalho coordenador</li>
            </ul>

            <div class="info-box" style="margin-top: 15px;">
                <h4><i class="fas fa-check-double"></i> Documentação Pronta para o eSocial</h4>
                <p>Todos os documentos são elaborados em conformidade com as exigências do eSocial, facilitando o envio dos eventos S-2220 (Monitoramento da Saúde) e S-2240 (Condições Ambientais).</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">05</span>
            </div>
        </div>

        <!-- ====== PÁGINA 6: INVESTIMENTO ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Kit Integrado SST</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">5</span>
                <span class="section-title-text">Investimento e Condições Comerciais</span>
            </h2>

            ${r}

            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #cbd5e0;">
                <thead>
                    <tr style="background: #2c5282; color: white;">
                        <th style="padding: 12px 15px; text-align: left; font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; border: 1px solid #2c5282;">Descrição</th>
                        <th style="padding: 12px 15px; text-align: center; font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; border: 1px solid #2c5282; width: 150px;">Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="background: white;">
                        <td style="padding: 12px 15px; font-size: 11px; color: #2d3748; border: 1px solid #cbd5e0;">
                            <strong>Kit Integrado SST</strong><br>
                            <span style="font-size: 10px; color: #718096;">PGR + LTCAT + PCMSO completos e integrados</span>
                        </td>
                        <td style="padding: 12px 15px; text-align: center; font-size: 16px; color: #2d3748; font-weight: 700; border: 1px solid #cbd5e0;">${c(s)}</td>
                    </tr>
                </tbody>
            </table>

            <h3 class="subsection-title"><i class="fas fa-check-circle"></i> O Que Está Incluso</h3>
            
            <div class="included-services" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px; font-size: 10px;">
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i>
                    <span>Visita técnica às instalações</span>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i>
                    <span>PGR completo (Inventário + Plano de Ação)</span>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i>
                    <span>LTCAT com enquadramento previdenciário</span>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i>
                    <span>PCMSO com exames por função</span>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i>
                    <span>ART do Engenheiro de Segurança</span>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                    <i class="fas fa-check" style="color: #38a169; margin-top: 2px; font-size: 10px;"></i>
                    <span>Documentação pronta para eSocial</span>
                </div>
            </div>

            <h3 class="subsection-title"><i class="fas fa-credit-card"></i> Condições de Pagamento</h3>

            <div class="conditions-list">
                <div class="condition-item">
                    <div class="condition-icon"><i class="fas fa-calendar-check"></i></div>
                    <div class="condition-text">
                        <strong>Validade da Proposta</strong>
                        <span>Esta proposta tem validade de 15 dias a partir da data de emissão.</span>
                    </div>
                </div>
                <div class="condition-item">
                    <div class="condition-icon"><i class="fas fa-money-bill-wave"></i></div>
                    <div class="condition-text">
                        <strong>Forma de Pagamento</strong>
                        <span>50% na aprovação + 50% na entrega dos documentos finais. PIX, boleto ou transferência.</span>
                    </div>
                </div>
                <div class="condition-item">
                    <div class="condition-icon"><i class="fas fa-clock"></i></div>
                    <div class="condition-text">
                        <strong>Prazo de Entrega</strong>
                        <span>15 a 20 dias úteis após aprovação e agendamento da visita técnica.</span>
                    </div>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">06</span>
            </div>
        </div>

        <!-- ====== PÁGINA 7: RESPONSÁVEL COMERCIAL ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">Proposta Comercial - Kit Integrado SST</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">6</span>
                <span class="section-title-text">Responsável pela Proposta</span>
            </h2>

            <div class="responsible-card">
                <div class="responsible-avatar">
                    <i class="fas fa-user-tie"></i>
                </div>
                <p class="responsible-name">${a.elaborador.nome}</p>
                <p class="responsible-role">${a.elaborador.cargo}</p>
                <p class="responsible-company">EngMarq Solution</p>
                <div class="responsible-contacts">
                    <div class="responsible-contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>${a.elaborador.email}</span>
                    </div>
                    <div class="responsible-contact-item">
                        <i class="fab fa-whatsapp"></i>
                        <span>${a.elaborador.telefone}</span>
                    </div>
                    <div class="responsible-contact-item">
                        <i class="fab fa-instagram"></i>
                        <span>${a.elaborador.instagram||"@engmarq_solution"}</span>
                    </div>
                </div>
            </div>

            <div class="info-box" style="margin-top: 20px;">
                <h4><i class="fas fa-handshake"></i> Próximos Passos</h4>
                <p>Após a aprovação desta proposta, entraremos em contato para agendar a visita técnica e iniciar o levantamento de informações necessárias para elaboração dos documentos.</p>
            </div>

            <h3 class="subsection-title" style="margin-top: 30px;"><i class="fas fa-signature"></i> Aprovação da Proposta</h3>
            
            <div style="background: var(--light-color); border-radius: 12px; padding: 20px;">
                <h3 style="font-family: var(--font-primary); color: var(--primary-color); font-size: 16px; margin-bottom: 15px; text-align: center; border-bottom: 2px solid var(--secondary-color); padding-bottom: 10px;">
                    <i class="fas fa-user-tie" style="color: var(--secondary-color);"></i> RESPONSÁVEL PELA APROVAÇÃO DA PROPOSTA
                </h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 10px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Razão Social</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.razaoSocial}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">CNPJ</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.cnpj}</p>
                    </div>
                </div>

                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed var(--gray-color);">
                    <div style="text-align: center;">
                        <div style="border-bottom: 1px solid var(--dark-color); margin: 0 auto 5px; height: 35px; max-width: 450px;"></div>
                        <p style="margin: 0; font-size: 11px; color: var(--gray-color); text-align: center;">Assinatura do Aprovador</p>
                    </div>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">07</span>
            </div>
        </div>
    `}const O={nr10:{bg:"linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",border:"#f59e0b",icon:"#d97706"},nr12:{bg:"linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",border:"#6366f1",icon:"#4f46e5"},nr33:{bg:"linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)",border:"#ec4899",icon:"#db2777"},nr35:{bg:"linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",border:"#3b82f6",icon:"#2563eb"},brigada:{bg:"linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",border:"#ef4444",icon:"#dc2626"},cipa:{bg:"linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",border:"#10b981",icon:"#059669"},"primeiros-socorros":{bg:"linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%)",border:"#f43f5e",icon:"#e11d48"}};function q(a){const e=O[a.id]||{bg:"linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",border:"#64748b",icon:"#475569"};return`
        <div style="
            background: ${e.bg};
            border-radius: 10px;
            padding: 12px;
            border-left: 4px solid ${e.border};
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            position: relative;
            overflow: hidden;
            page-break-inside: avoid;
        ">
            <!-- Ícone decorativo de fundo -->
            <div style="
                position: absolute;
                right: -5px;
                top: -5px;
                font-size: 50px;
                opacity: 0.06;
                color: ${e.border};
            ">
                <i class="${a.icon}"></i>
            </div>
            
            <!-- Cabeçalho do card -->
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px; position: relative; z-index: 1;">
                <div style="
                    width: 32px;
                    height: 32px;
                    background: white;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
                    flex-shrink: 0;
                ">
                    <i class="${a.icon}" style="font-size: 14px; color: ${e.icon};"></i>
                </div>
                <h4 style="
                    margin: 0;
                    font-family: 'Montserrat', sans-serif;
                    font-size: 11px;
                    font-weight: 700;
                    color: #1e293b;
                    line-height: 1.2;
                ">${a.nome}</h4>
            </div>
            
            <!-- Descrição -->
            <p style="
                margin: 0 0 8px 0;
                font-size: 9px;
                color: #475569;
                line-height: 1.4;
                position: relative;
                z-index: 1;
            ">${a.descricao}</p>
            
            <!-- Badges de informação -->
            <div style="display: flex; gap: 6px; flex-wrap: wrap; position: relative; z-index: 1;">
                ${a.cargaHoraria?`
                <div style="
                    background: white;
                    padding: 3px 8px;
                    border-radius: 12px;
                    font-size: 9px;
                    font-weight: 600;
                    color: ${e.icon};
                    display: flex;
                    align-items: center;
                    gap: 3px;
                ">
                    <i class="fas fa-clock" style="font-size: 8px;"></i>
                    ${a.cargaHoraria}
                </div>
                `:""}
                ${a.qtdTurmas?`
                <div style="
                    background: white;
                    padding: 3px 8px;
                    border-radius: 12px;
                    font-size: 9px;
                    font-weight: 600;
                    color: ${e.icon};
                    display: flex;
                    align-items: center;
                    gap: 3px;
                ">
                    <i class="fas fa-users" style="font-size: 8px;"></i>
                    ${a.qtdTurmas} turma${a.qtdTurmas>1?"s":""}
                </div>
                `:""}
            </div>
        </div>
    `}function ta(a){return a&&a.length>0?`
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                ${a.map(o=>q(o)).join("")}
            </div>
        `:`
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
            ${[{id:"nr10",nome:"NR-10 - Segurança em Eletricidade",icon:"fas fa-bolt",descricao:"Capacitação em Segurança em Instalações e Serviços em Eletricidade para profissionais que interagem com instalações elétricas.",cargaHoraria:"40h",qtdTurmas:1},{id:"nr12",nome:"NR-12 - Segurança em Máquinas",icon:"fas fa-cogs",descricao:"Capacitação para operação segura de máquinas e equipamentos, abordando riscos mecânicos, dispositivos de proteção e procedimentos seguros.",cargaHoraria:"16h",qtdTurmas:1},{id:"nr33",nome:"NR-33 - Espaço Confinado",icon:"fas fa-hard-hat",descricao:"Formação para trabalhos em espaços confinados, incluindo reconhecimento, avaliação e controle de riscos, procedimentos de emergência e resgate.",cargaHoraria:"16h",qtdTurmas:1},{id:"nr35",nome:"NR-35 - Trabalho em Altura",icon:"fas fa-arrow-up",descricao:"Habilitação para atividades executadas acima de 2 metros do piso, com técnicas de acesso, sistemas de proteção e resgate.",cargaHoraria:"8h",qtdTurmas:1},{id:"brigada",nome:"Brigada de Incêndio",icon:"fas fa-fire-extinguisher",descricao:"Formação de brigadistas conforme Instrução Técnica do CBMRN. Inclui teoria e prática de prevenção e combate a princípios de incêndio, primeiros socorros e evacuação.",cargaHoraria:"8h",qtdTurmas:1}].map(i=>q(i)).join("")}
        </div>
    `}function ra(a){if(!a||a.length===0)return"";const e=O,s=a.map((o,t)=>{const r=e[o.id]||{bg:"#f1f5f9",icon:"#475569"};return`
            <tr style="background: ${t%2===0?"white":"#f8fafc"};">
                <td style="padding: 10px 8px; border-bottom: 1px solid #e2e8f0;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="
                            width: 28px;
                            height: 28px;
                            background: ${r.bg};
                            border-radius: 6px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex-shrink: 0;
                        ">
                            <i class="${o.icon}" style="font-size: 12px; color: ${r.icon};"></i>
                        </div>
                        <span style="font-weight: 600; color: #1e293b; font-size: 11px;">${o.nome}</span>
                    </div>
                </td>
                <td style="padding: 10px 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">
                    <span style="
                        background: #f1f5f9;
                        padding: 3px 8px;
                        border-radius: 10px;
                        font-size: 10px;
                        font-weight: 600;
                        color: #475569;
                    ">${o.cargaHoraria||"-"}</span>
                </td>
                <td style="padding: 10px 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">
                    <span style="
                        background: #f1f5f9;
                        padding: 3px 8px;
                        border-radius: 10px;
                        font-size: 10px;
                        font-weight: 600;
                        color: #475569;
                    ">${o.qtdTurmas||1}</span>
                </td>
                <td style="padding: 10px 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">
                    <span style="
                        font-family: 'Montserrat', sans-serif;
                        font-weight: 700;
                        font-size: 12px;
                        color: #1e293b;
                    ">R$ ${c(o.valor||0)}</span>
                </td>
            </tr>
        `}).join(""),i=a.reduce((o,t)=>o+(t.valor||0),0);return`
        <div style="
            overflow: hidden;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            border: 1px solid #e2e8f0;
        ">
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                <thead>
                    <tr style="background: linear-gradient(135deg, var(--primary-color) 0%, #1e40af 100%);">
                        <th style="padding: 10px 8px; text-align: left; color: white; font-weight: 600; font-size: 10px;">
                            <i class="fas fa-graduation-cap" style="margin-right: 5px;"></i>Treinamento
                        </th>
                        <th style="padding: 10px 8px; text-align: center; color: white; font-weight: 600; font-size: 10px;">
                            <i class="fas fa-clock" style="margin-right: 5px;"></i>Carga
                        </th>
                        <th style="padding: 10px 8px; text-align: center; color: white; font-weight: 600; font-size: 10px;">
                            <i class="fas fa-users" style="margin-right: 5px;"></i>Turmas
                        </th>
                        <th style="padding: 10px 8px; text-align: right; color: white; font-weight: 600; font-size: 10px;">
                            <i class="fas fa-tag" style="margin-right: 5px;"></i>Valor
                        </th>
                    </tr>
                </thead>
                <tbody>
                    ${s}
                </tbody>
                <tfoot>
                    <tr style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);">
                        <td colspan="3" style="padding: 12px 8px; text-align: right; font-weight: 700; font-size: 12px; color: #475569; text-transform: uppercase;">
                            Valor Total
                        </td>
                        <td style="padding: 12px 8px; text-align: right;">
                            <span style="
                                font-family: 'Montserrat', sans-serif;
                                font-weight: 800;
                                font-size: 14px;
                                color: var(--accent-color);
                            ">R$ ${c(i)}</span>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    `}function na(a,e,s,i,o){const t={headerTitle:"Proposta Comercial - Treinamentos em SST"},r=o?`
        <div style="background: linear-gradient(135deg, #38a169 0%, #2f855a 100%); color: #fff; padding: 15px 25px; border-radius: 10px; text-align: center; margin: 15px 0;">
            <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; opacity: 0.9;"><i class="fas fa-tag"></i> Desconto Especial Aplicado</p>
            <p style="font-size: 16px; margin: 0;"><s style="opacity: 0.7;">De R$ ${c(e)}</s> &nbsp;<strong style="font-size: 20px;">${i}% OFF</strong></p>
        </div>`:"";return`
        <!-- ====== PÁGINA 1: CAPA ====== -->
        <div class="page page-cover">
            <span style="position: absolute; top: 25mm; left: 0; right: 0; text-align: center; font-family: var(--font-primary); font-size: 14px; font-weight: 700; color: var(--accent-color); letter-spacing: 3px;">${a.numero}</span>
            
            <img src="${a.logoUrl}" alt="EngMarq Solution" class="cover-logo">
            
            <span class="cover-badge">
                <i class="fas fa-chalkboard-teacher"></i>
                Treinamentos em SST
            </span>

            <div class="cover-icon">
                <i class="fas fa-graduation-cap"></i>
            </div>

            <h1 class="cover-title">
                Proposta Comercial<br>
                <span>Treinamentos em SST</span>
            </h1>
            <p class="cover-subtitle">
                Capacitação especializada em Normas Regulamentadoras com metodologia prática, certificação imediata e total conformidade legal
            </p>
            
            <div class="cover-client">
                <p class="cover-client-label">Proposta elaborada para</p>
                <p class="cover-client-name">${a.razaoSocial}</p>
            </div>

            <p class="cover-date">
                <i class="fas fa-calendar-alt"></i>&nbsp;&nbsp;
                ${a.data}
            </p>

            <div class="cover-footer">
                <p>EngMarq Solution | SST que traz segurança jurídica | Natal - RN</p> 
            </div>
        </div>

        <!-- ====== PÁGINA 2: APRESENTAÇÃO E DADOS DO CLIENTE ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${t.headerTitle}</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">1</span>
                <span class="section-title-text">Apresentação</span>
            </h2>

            <div class="info-box" style="margin-bottom: 15px;">
                <h4><i class="fas fa-handshake"></i> SST que traz segurança jurídica</h4>
                <p>A <strong>EngMarq Solution</strong> é uma empresa especializada em Engenharia de Segurança e Saúde do Trabalho. Nossa metodologia foi desenvolvida para garantir a <strong>conformidade legal</strong> da sua empresa com as Normas Regulamentadoras, através de treinamentos práticos e certificação imediata.</p>
            </div>

            ${a.solicitante.nome?`<p>Prezado(a) <strong>${a.solicitante.nome}</strong>,</p>`:"<p>Prezado(a) Cliente,</p>"}

            <p>Apresentamos nossa proposta comercial para a realização de treinamentos em Segurança e Saúde do Trabalho, desenvolvida especialmente para atender às necessidades da <strong>${a.razaoSocial}</strong>.</p>

            <p>Nossa metodologia contempla:</p>

            <ul class="feature-list">
                <li>Instrutores especializados e habilitados conforme cada Norma Regulamentadora</li>
                <li>Treinamentos teóricos e práticos com abordagem dinâmica</li>
                <li>Material didático atualizado e contextualizado</li>
                <li>Certificação imediata com validade legal conforme NRs</li>
                <li>Flexibilidade de horários adaptada à rotina da empresa</li>
            </ul>

            <h2 class="section-title" style="margin-top: 20px;">
                <span class="section-number">2</span>
                <span class="section-title-text">Dados do Cliente</span>
            </h2>

            <h3 class="subsection-title"><i class="fas fa-building"></i> Dados da Empresa</h3>
            
            <div class="company-info-grid">
                <div class="company-info-item">
                    <label>Razão Social</label>
                    <span>${a.razaoSocial}</span>
                </div>
                <div class="company-info-item">
                    <label>CNPJ</label>
                    <span>${a.cnpj||"-"}</span>
                </div>
                <div class="company-info-item">
                    <label>Endereço</label>
                    <span>${a.endereco||"-"}</span>
                </div>
                <div class="company-info-item">
                    <label>Bairro</label>
                    <span>${a.bairro||"-"}</span>
                </div>
                <div class="company-info-item">
                    <label>CEP</label>
                    <span>${a.cep||"-"}</span>
                </div>
                <div class="company-info-item">
                    <label>Município / UF</label>
                    <span>${a.cidade} - ${a.uf}</span>
                </div>
            </div>

            ${a.solicitante.nome?`
            <h3 class="subsection-title" style="margin-top: 15px;"><i class="fas fa-user-tie"></i> Solicitante da Proposta</h3>
            <div class="company-info-grid">
                <div class="company-info-item">
                    <label>Nome</label>
                    <span>${a.solicitante.nome}</span>
                </div>
                <div class="company-info-item">
                    <label>Cargo / Função</label>
                    <span>${a.solicitante.cargo||"-"}</span>
                </div>
                <div class="company-info-item">
                    <label>Telefone / WhatsApp</label>
                    <span>${a.solicitante.telefone||"-"}</span>
                </div>
            </div>
            `:""}

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">02</span>
            </div>
        </div>

        <!-- ====== PÁGINA 3: ESCOPO DOS TREINAMENTOS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${t.headerTitle}</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">3</span>
                <span class="section-title-text">Escopo dos Treinamentos</span>
            </h2>

            <!-- Cards de Treinamento em Grid -->
            ${ta(a.treinamentos)}

            ${a.treinamentos&&a.treinamentos.some(l=>l.id==="brigada")?`
            <div style="
                border-left: 4px solid #e53e3e;
                background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%);
                margin-top: 12px;
                padding: 10px 12px;
                border-radius: 8px;
                font-size: 10px;
            ">
                <p style="margin: 0;"><strong><i class="fas fa-exclamation-triangle" style="color: #e53e3e;"></i> Nota:</strong> Material de combate a incêndio será fornecido pela contratante, salvo acordo prévio.</p>
            </div>
            `:""}

            <div style="margin-top: 15px;">
                <h3 class="subsection-title" style="margin-bottom: 8px;"><i class="fas fa-clipboard-list"></i> Metodologia</h3>
                <p style="font-size: 10px; color: #475569; margin: 0; line-height: 1.5;">
                    Os treinamentos podem ser realizados em <strong>turmas personalizadas</strong>, respeitando a disponibilidade da empresa. Datas e horários serão acordados previamente.
                </p>
            </div>

            <div style="margin-top: 12px;">
                <h3 class="subsection-title" style="margin-bottom: 8px;"><i class="fas fa-certificate"></i> Certificação</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; font-size: 10px;">
                    <div style="display: flex; align-items: center; gap: 6px; color: #475569;">
                        <i class="fas fa-check-circle" style="color: #10b981; font-size: 10px;"></i>
                        <span>Certificados com validade legal</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px; color: #475569;">
                        <i class="fas fa-check-circle" style="color: #10b981; font-size: 10px;"></i>
                        <span>Lista de presença assinada</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px; color: #475569;">
                        <i class="fas fa-check-circle" style="color: #10b981; font-size: 10px;"></i>
                        <span>Registro fotográfico (opcional)</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px; color: #475569;">
                        <i class="fas fa-check-circle" style="color: #10b981; font-size: 10px;"></i>
                        <span>Conteúdo programático</span>
                    </div>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">03</span>
            </div>
        </div>

        <!-- ====== PÁGINA 4: INVESTIMENTO ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${t.headerTitle}</span>
            </div>

            <h2 class="section-title">
                <span class="section-number">4</span>
                <span class="section-title-text">Investimento</span>
            </h2>

            ${r}

            ${ra(a.treinamentos)}

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 15px;">
                <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 12px; border-radius: 10px; border-left: 4px solid #10b981;">
                    <h4 style="margin: 0 0 8px 0; font-size: 11px; color: #059669;"><i class="fas fa-star"></i> Benefícios Inclusos</h4>
                    <p style="margin: 0; font-size: 9px; color: #475569; line-height: 1.5;">
                        • Instrutores especializados<br>
                        • Certificados com validade legal<br>
                        • Material didático incluso
                    </p>
                </div>
                <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); padding: 12px; border-radius: 10px; border-left: 4px solid #3b82f6;">
                    <h4 style="margin: 0 0 8px 0; font-size: 11px; color: #2563eb;"><i class="fas fa-credit-card"></i> Condições de Pagamento</h4>
                    <p style="margin: 0; font-size: 9px; color: #475569; line-height: 1.5;">
                        • PIX ou Transferência Bancária<br>
                        • 50% fechamento | 50% conclusão<br>
                        • Validade: 15 dias
                    </p>
                </div>
            </div>

            <div style="
                margin-top: 12px;
                padding: 10px 12px;
                background: #fefce8;
                border-left: 4px solid #eab308;
                border-radius: 8px;
                font-size: 9px;
                color: #713f12;
            ">
                <p style="margin: 0;"><strong><i class="fas fa-info-circle"></i> Observação:</strong> Valores contemplam todos os custos (deslocamento, material, certificação). Cronograma detalhado após aprovação.</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">04</span>
            </div>
        </div>

        <!-- ====== PÁGINA 5: RESPONSÁVEL PELA PROPOSTA ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${t.headerTitle}</span>
            </div>

            <h2 class="section-title">
                <span class="section-number"><i class="fas fa-user-tie"></i></span>
                <span class="section-title-text">Responsável pela Proposta</span>
            </h2>

            <p style="text-align: center; margin-bottom: 20px; color: var(--gray-color); font-size: 11px;">
                Esta proposta foi elaborada pela equipe técnica da EngMarq Solution, sob responsabilidade do profissional abaixo identificado.
            </p>

            <div class="responsible-card">
                <div class="responsible-avatar">
                    <i class="fas fa-user-tie"></i>
                </div>
                <p class="responsible-name">${a.elaborador.nome}</p>
                <p class="responsible-role">${a.elaborador.cargo}</p>
                <p class="responsible-company">EngMarq Solution Ltda.</p>

                <div class="responsible-contacts">
                    <div class="responsible-contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>${a.elaborador.email}</span>
                    </div>
                    <div class="responsible-contact-item">
                        <i class="fab fa-whatsapp"></i>
                        <span>${a.elaborador.telefone}</span>
                    </div>
                    <div class="responsible-contact-item">
                        <i class="fab fa-instagram"></i>
                        <span>${a.elaborador.instagram}</span>
                    </div>
                </div>
            </div>

            <div class="construction-box" style="margin-top: 25px;">
                <h4><i class="fas fa-headset"></i> Atendimento Personalizado</h4>
                <p>Estamos à disposição para esclarecer dúvidas, agendar reuniões e apresentar mais detalhes sobre nossa metodologia de trabalho. Entre em contato conosco!</p>
            </div>

            <div class="info-box">
                <h4><i class="fas fa-clock"></i> Horário de Atendimento</h4>
                <p>Segunda a Sexta: 08h às 18h | Sábado: 08h às 12h</p>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">05</span>
            </div>
        </div>

        <!-- ====== PÁGINA 6: TERMO DE ACEITE E ASSINATURAS ====== -->
        <div class="page">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${t.headerTitle}</span>
            </div>

            <h2 class="section-title">
                <span class="section-number"><i class="fas fa-file-signature"></i></span>
                <span class="section-title-text">Termo de Aceite da Proposta</span>
            </h2>

            <div class="info-box" style="margin-bottom: 20px;">
                <h4><i class="fas fa-check-circle"></i> Declaração de Aceite</h4>
                <p>Ao assinar este documento, as partes declaram estar de acordo com todos os termos, condições, valores e prazos descritos nesta proposta comercial, formalizando a contratação dos serviços especificados.</p>
            </div>

            <div style="background: var(--light-color); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h3 style="font-family: var(--font-primary); color: var(--primary-color); font-size: 16px; margin-bottom: 15px; text-align: center; border-bottom: 2px solid var(--accent-color); padding-bottom: 10px;">
                    <i class="fas fa-building" style="color: var(--accent-color);"></i> RESPONSÁVEL PELA ELABORAÇÃO DA PROPOSTA
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Razão Social</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">Engmarq Solution LTDA</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">CNPJ</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">60.545.359/0001-76</p>
                    </div>
                </div>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.elaborador.nome} - ${a.elaborador.cargo}</p>
                </div>
                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed var(--gray-color);">
                    <div style="text-align: center;">
                        <div style="border-bottom: 1px solid var(--dark-color); margin: 0 auto 5px; height: 35px; max-width: 450px;"></div>
                        <p style="margin: 0; font-size: 11px; color: var(--gray-color); text-align: center;">Assinatura do Proponente</p>
                    </div>
                </div>
            </div>

            <div style="background: var(--light-color); border-radius: 12px; padding: 20px;">
                <h3 style="font-family: var(--font-primary); color: var(--primary-color); font-size: 16px; margin-bottom: 15px; text-align: center; border-bottom: 2px solid var(--secondary-color); padding-bottom: 10px;">
                    <i class="fas fa-user-tie" style="color: var(--secondary-color);"></i> RESPONSÁVEL PELA APROVAÇÃO DA PROPOSTA
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 10px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Razão Social</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.razaoSocial}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">CNPJ</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.cnpj}</p>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 10px;">
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Nome</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.solicitante.nome||"A definir"}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 3px 0; font-size: 11px; color: var(--gray-color); text-transform: uppercase;">Cargo / Função</p>
                        <p style="margin: 0; font-size: 13px; font-weight: 600;">${a.solicitante.cargo||"A definir"}</p>
                    </div>
                </div>
                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed var(--gray-color);">
                    <div style="text-align: center;">
                        <div style="border-bottom: 1px solid var(--dark-color); margin: 0 auto 5px; height: 35px; max-width: 450px;"></div>
                        <p style="margin: 0; font-size: 11px; color: var(--gray-color); text-align: center;">Assinatura do Aprovador</p>
                    </div>
                </div>
            </div>

            <div class="page-footer">
                <span>EngMarq Solution | engmarqsolution@gmail.com | +55 84 99928-5888 | @engmarq_solution</span>
                <span class="page-number">06</span>
            </div>
        </div>

        <!-- ====== PÁGINA 7: CONTATO ====== -->
        <div class="page page-contact">
            <div class="page-header">
                <img src="${a.logoUrl}" alt="EngMarq Solution" class="page-header-logo">
                <span class="page-header-title">${t.headerTitle}</span>
            </div>

            <div class="contact-content">
                <div class="contact-icon">
                    <i class="fas fa-handshake"></i>
                </div>
                <h2 class="contact-title">Fale Conosco</h2>
                <p class="contact-subtitle">
                    Estamos à disposição para dar continuidade ao processo de contratação e esclarecer eventuais dúvidas sobre os treinamentos.
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
                    <div class="contact-item">
                        <i class="fas fa-globe"></i>
                        <span>www.engmarqsolution.com</span>
                    </div>
                </div>

                <div class="contact-signature">
                    <img src="${a.logoUrl}" alt="EngMarq Solution" class="signature-logo">
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
                <span class="page-number">07</span>
            </div>
        </div>
    `}function la(a){return{numero:a.codigoProposta,data:N(a.dataProposta),razaoSocial:a.razaoSocial,cnpj:a.cnpj,endereco:a.endereco,bairro:a.bairro,cep:a.cep,cidade:a.cidade,uf:a.estado,qtdColaboradores:a.qtdColaboradores,elaborador:a.elaborador,solicitante:a.solicitante,logoUrl:B,treinamentos:a.treinamentos,entregaveisPsico:a.entregaveisPsico,isGrupo:a.isGrupo,nomeGrupo:a.nomeGrupo,empresasGrupo:a.empresasGrupo}}function ca(a,e,s,i,o,t){switch(a){case"brigada":return Q(e,s,i,o,t);case"plataforma":return K(e,s,i,o,t);case"plataforma-principal":return X(e,s,i,o,t);case"psicossocial":return oa(e,s,i,o,t);case"assessoria":return ia(e,s,i,o,t);case"kit-sst":return sa(e,s,i,o,t);case"treinamentos":return na(e,s,i,o,t);default:throw new Error(`Tipo de proposta não suportado: ${a}`)}}function pa(a,e,s,i,o,t){const r=la(e),l=ca(a,r,s,i,o,t);return`<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proposta ${r.numero} - ${r.razaoSocial}</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        ${H(a)}
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
        ${l}
    </div>

    <script>
        // Atalho de teclado para impressão
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                window.print();
            }
        });

        console.log('📄 Proposta ${r.numero} gerada com sucesso!');
        console.log('💡 Pressione Ctrl+P ou clique em "Gerar PDF"');
    <\/script>
</body>
</html>`}const A=_();A.logado||(window.location.href="./login.html");function da(){U(),window.location.href="./login.html"}window.fazerLogout=da;if(A.usuario){const a=document.getElementById("userNameText");a&&(a.textContent=A.usuario.nome||"")}function n(a){const e=document.getElementById(a);if(!e)throw new Error(`Elemento não encontrado: ${a}`);return e}function x(){const a=n("valor_proposta").value,e=E(a),s=n("aplicar_desconto").checked,i=parseFloat(n("percentual_desconto").value)||0;let o="";if(s&&i>0){const t=M(e,i);o=`<div class="original">R$ ${c(e)}</div>
                <span class="discount-badge">${i}% OFF</span>
                <div class="final">R$ ${c(t)}</div>`}else o=`<div class="final">R$ ${c(e)}</div>`;n("value-summary").innerHTML=o}const C={brigada:{icon:"fas fa-fire-extinguisher",titleTop:"TREINAMENTO",titleMain:"BRIGADA DE INCÊNDIO",subtitle:"Capacitação teórica e prática conforme Instrução Técnica IT 17/2025 do Corpo de Bombeiros Militar do RN (CBMRN)"},plataforma:{icon:"fas fa-hard-hat",titleTop:"PROJETO TÉCNICO",titleMain:"PLATAFORMA SECUNDÁRIA",subtitle:"Projeto técnico de engenharia para plataforma secundária em conformidade com a NR-18"},"plataforma-principal":{icon:"fas fa-layer-group",titleTop:"PROJETO TÉCNICO",titleMain:"PLATAFORMA PRINCIPAL E SECUNDÁRIA",subtitle:"Equipamento de Proteção Coletiva (EPC) conforme NR 18 – Condições e Meio Ambiente de Trabalho na Indústria da Construção"},psicossocial:{icon:"fas fa-brain",titleTop:"AVALIAÇÃO",titleMain:"RISCOS PSICOSSOCIAIS",subtitle:"Avaliação dos Fatores de Riscos Psicossociais conforme exigência da NR-01 atualizada"},assessoria:{icon:"fas fa-shield-alt",titleTop:"ASSESSORIA EM",titleMain:"SEGURANÇA DO TRABALHO",subtitle:"Equipe técnica especializada, gestão de programas de SST e treinamentos de capacitação para conformidade legal"},"kit-sst":{icon:"fas fa-file-medical-alt",titleTop:"KIT INTEGRADO",titleMain:"DOCUMENTAÇÃO SST",subtitle:"PGR, PCMSO, LTCAT e Laudos Técnicos para conformidade com as Normas Regulamentadoras"},treinamentos:{icon:"fas fa-chalkboard-teacher",titleTop:"TREINAMENTOS EM",titleMain:"SEGURANÇA DO TRABALHO",subtitle:"Capacitações em Normas Regulamentadoras para garantir a conformidade legal e a segurança dos colaboradores"}},ga={nr10:{nome:"NR-10 - Segurança em Instalações Elétricas",icon:"fas fa-bolt",descricao:"Capacitação para trabalhos com energia elétrica, abordando riscos, medidas de proteção e procedimentos de segurança."},nr12:{nome:"NR-12 - Segurança em Máquinas e Equipamentos",icon:"fas fa-cogs",descricao:"Treinamento sobre operação segura de máquinas, dispositivos de proteção e procedimentos operacionais."},nr33:{nome:"NR-33 - Segurança em Espaços Confinados",icon:"fas fa-hard-hat",descricao:"Capacitação para entrada e trabalho em espaços confinados, incluindo procedimentos de resgate."},nr35:{nome:"NR-35 - Trabalho em Altura",icon:"fas fa-arrow-up",descricao:"Treinamento para trabalhos acima de 2 metros, abordando sistemas de proteção contra quedas."},brigada:{nome:"Brigada de Incêndio",icon:"fas fa-fire-extinguisher",descricao:"Formação de brigadistas para prevenção e combate a incêndios, incluindo primeiros socorros básicos."},cipa:{nome:"CIPA - Comissão Interna de Prevenção de Acidentes",icon:"fas fa-users",descricao:"Capacitação dos membros da CIPA para identificação de riscos e prevenção de acidentes."},"primeiros-socorros":{nome:"Primeiros Socorros",icon:"fas fa-first-aid",descricao:"Treinamento em técnicas de primeiros socorros para atendimento emergencial."}};function w(){const a=[];return document.querySelectorAll('.training-item input[type="checkbox"]:checked').forEach(s=>{var t,r,l,d;const i=s.value,o=ga[i];if(o){const g=i.replace("-","_"),p=((t=document.getElementById(`${g}_carga`))==null?void 0:t.value)||"",m=parseInt(((r=document.getElementById(`${g}_alunos`))==null?void 0:r.value)||"0"),f=parseInt(((l=document.getElementById(`${g}_turmas`))==null?void 0:l.value)||"0"),v=((d=document.getElementById(`${g}_valor`))==null?void 0:d.value)||"0",u=E(v);a.push({id:i,nome:o.nome,icon:o.icon,descricao:o.descricao,cargaHoraria:p,qtdAlunos:m,qtdTurmas:f,valor:u})}}),a}function R(){const a=w(),e=a.reduce((o,t)=>o+(t.valor||0),0),s=document.getElementById("total-treinamentos");s&&(s.textContent=`R$ ${c(e)}`);const i=document.getElementById("valor_proposta");i&&a.length>0&&(i.value=c(e),x())}const ma={relatorio:{titulo:"Relatório Técnico de Avaliação de Riscos Psicossociais",icon:"fas fa-file-alt"},plano:{titulo:"Plano de Ação Preventivo e Corretivo",icon:"fas fa-tasks"},aep:{titulo:"AEP – Avaliação Ergonômica Preliminar",icon:"fas fa-clipboard-check"},palestras:{titulo:"Palestras de Conscientização",icon:"fas fa-chalkboard-teacher"},janeiro_branco:{titulo:"Campanha Janeiro Branco",icon:"fas fa-ribbon"},reavaliacao:{titulo:"Reavaliação Trimestral",icon:"fas fa-redo"}};function fa(){const a=[];return["relatorio","plano","aep","palestras","janeiro_branco","reavaliacao"].forEach(s=>{const i=document.getElementById(`psico_${s}`),o=ma[s];if(i&&o){const t=document.getElementById(`psico_${s}_desc`),r=(t==null?void 0:t.value)||"";let l;if(s==="palestras"){const d=document.getElementById("psico_palestras_qtd");l=d&&parseInt(d.value)||2}a.push({id:s,titulo:o.titulo,icon:o.icon,descricao:r,quantidade:l,ativo:i.checked})}}),a}let $=1;function va(){const a=document.getElementById("empresas-container");if(!a)return;const e=$;$++;const s=`
        <div class="empresa-item is-grupo" data-index="${e}">
            <div class="empresa-header">
                <span class="empresa-numero">Empresa ${e+1}</span>
                <button type="button" class="btn-remover-empresa" onclick="removerEmpresa(${e})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="form-group">
                <label>Razão Social *</label>
                <input type="text" class="empresa-razao" placeholder="Nome da empresa">
            </div>
            <div class="form-group">
                <label>CNPJ</label>
                <input type="text" class="empresa-cnpj" placeholder="00.000.000/0000-00">
            </div>
            <div class="form-group">
                <label>Endereço</label>
                <input type="text" class="empresa-endereco" placeholder="Rua, número">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Bairro</label>
                    <input type="text" class="empresa-bairro">
                </div>
                <div class="form-group">
                    <label>CEP</label>
                    <input type="text" class="empresa-cep" placeholder="00000-000">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Cidade</label>
                    <input type="text" class="empresa-cidade" value="Natal">
                </div>
                <div class="form-group">
                    <label>UF</label>
                    <select class="empresa-uf">
                        <option value="RN" selected>RN</option>
                        <option value="PB">PB</option>
                        <option value="CE">CE</option>
                        <option value="PE">PE</option>
                    </select>
                </div>
            </div>
            <div class="form-row empresa-valores-row">
                <div class="form-group">
                    <label><i class="fas fa-users"></i> Nº de Colaboradores</label>
                    <input type="number" class="empresa-colaboradores" value="20" min="1">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-dollar-sign"></i> Valor (R$)</label>
                    <input type="text" class="empresa-valor" placeholder="0,00">
                </div>
            </div>
        </div>
    `;a.insertAdjacentHTML("beforeend",s),D(),b()}function ua(a){const e=document.querySelector(`.empresa-item[data-index="${a}"]`);e&&(e.remove(),ba(),b())}function ba(){document.querySelectorAll(".empresa-item").forEach((e,s)=>{const i=e.querySelector(".empresa-numero");i&&(i.textContent=`Empresa ${s+1}`)})}function k(){const a=[];return document.querySelectorAll(".empresa-item").forEach(s=>{var o,t,r,l,d,g,p,m,f;const i=((o=s.querySelector(".empresa-razao"))==null?void 0:o.value)||"";if(i.trim()){const v=((t=s.querySelector(".empresa-valor"))==null?void 0:t.value)||"0",u=E(v);a.push({razaoSocial:i,cnpj:((r=s.querySelector(".empresa-cnpj"))==null?void 0:r.value)||"",endereco:((l=s.querySelector(".empresa-endereco"))==null?void 0:l.value)||"",bairro:((d=s.querySelector(".empresa-bairro"))==null?void 0:d.value)||"",cep:((g=s.querySelector(".empresa-cep"))==null?void 0:g.value)||"",cidade:((p=s.querySelector(".empresa-cidade"))==null?void 0:p.value)||"Natal",estado:((m=s.querySelector(".empresa-uf"))==null?void 0:m.value)||"RN",qtdColaboradores:((f=s.querySelector(".empresa-colaboradores"))==null?void 0:f.value)||"",valor:u})}}),a}function D(){var o;if(!(((o=document.getElementById("proposta_grupo"))==null?void 0:o.checked)||!1))return;const s=k().reduce((t,r)=>t+(r.valor||0),0),i=document.getElementById("valor_proposta");i&&s>0&&(i.value=c(s),x())}function b(){var d,g;const a=n("tipo_proposta").value,e=n("numero_proposta").value||"TM0000",s=n("data_proposta").value,i=((d=document.getElementById("proposta_grupo"))==null?void 0:d.checked)||!1,o=((g=document.getElementById("grupo_nome"))==null?void 0:g.value)||"";let t="Nome da Empresa";if(i&&o)t=o;else{const p=document.querySelector(".empresa-item .empresa-razao");t=(p==null?void 0:p.value)||"Nome da Empresa"}const r=n("preview-page");r.className="preview-page "+a,n("preview-badge").textContent=e;const l=C[a]||C.brigada;n("preview-icon").innerHTML=`<i class="${l.icon}"></i>`,n("preview-title-top").textContent=l.titleTop,n("preview-title-main").textContent=l.titleMain,n("preview-subtitle").textContent=l.subtitle,n("preview-client-name").textContent=t,s&&(n("preview-date").innerHTML=`
            <i class="far fa-calendar-alt"></i>
            <span>${N(s)}</span>
        `)}function xa(){const a=new Date;n("data_proposta").value=a.toISOString().split("T")[0],n("aplicar_desconto").addEventListener("change",function(){n("discount-field").style.display=this.checked?"block":"none",x()}),n("tipo_proposta").addEventListener("change",function(){const p=this.value,m=document.querySelector(".form-section:has(#num_colaboradores)");m&&(m.style.display=p==="psicossocial"?"block":"none");const f=document.getElementById("section-treinamentos");f&&(f.style.display=p==="treinamentos"?"block":"none");const v=document.getElementById("section-psicossocial");v&&(v.style.display=p==="psicossocial"?"block":"none"),b()}),n("percentual_desconto").addEventListener("input",x),n("valor_proposta").addEventListener("input",x);const e=n("tipo_proposta").value,s=document.querySelector(".form-section:has(#num_colaboradores)");s&&(s.style.display=e==="psicossocial"?"block":"none");const i=document.getElementById("section-treinamentos");i&&(i.style.display=e==="treinamentos"?"block":"none");const o=document.getElementById("section-psicossocial");o&&(o.style.display=e==="psicossocial"?"block":"none"),document.querySelectorAll('.training-item input[type="checkbox"]').forEach(p=>{p.addEventListener("change",R)}),document.querySelectorAll(".training-details input").forEach(p=>{p.addEventListener("input",R)}),n("btn-gerar-proposta").addEventListener("click",G),n("numero_proposta").addEventListener("input",b),n("data_proposta").addEventListener("change",b);const l=document.getElementById("proposta_grupo");l&&l.addEventListener("change",()=>{const p=l.checked,m=document.getElementById("grupo-nome-container"),f=document.getElementById("btn-adicionar-empresa-container"),v=document.querySelectorAll(".empresa-item");m&&(m.style.display=p?"block":"none"),f&&(f.style.display=p?"block":"none"),v.forEach((u,P)=>{const h=u.querySelector(".btn-remover-empresa"),y=u.querySelector(".empresa-valores-row");h&&(h.style.display=p&&P>0?"flex":"none"),y&&(y.style.display=p?"flex":"none"),p?u.classList.add("is-grupo"):u.classList.remove("is-grupo")}),b()});const d=document.getElementById("grupo_nome");d&&d.addEventListener("input",b);const g=document.getElementById("empresas-container");g&&g.addEventListener("input",p=>{p.target.classList.contains("empresa-valor")&&D(),b()}),x(),b()}function G(){var y,z;const a=n("tipo_proposta").value;if(!V(a)){alert("Tipo de proposta inválido");return}const e=a,s=e==="treinamentos"?w():void 0,i=e==="psicossocial"?fa():void 0;if(e==="treinamentos"&&(!s||s.length===0)){alert("Por favor, selecione pelo menos um treinamento para a proposta");return}const o=((y=document.getElementById("proposta_grupo"))==null?void 0:y.checked)||!1,t=((z=document.getElementById("grupo_nome"))==null?void 0:z.value)||"",r=k(),l=r[0]||{razaoSocial:"",cnpj:"",endereco:"",bairro:"",cep:"",cidade:"Natal",estado:"RN",qtdColaboradores:""};let d="";if(o&&r.length>0){const T=r.reduce((j,L)=>j+(parseInt(L.qtdColaboradores||"0")||0),0);d=T>0?T.toString():""}else d=l.qtdColaboradores||"";const g={codigoProposta:n("numero_proposta").value||"TM0000",dataProposta:n("data_proposta").value,razaoSocial:o&&t?t:l.razaoSocial,nomeFantasia:o&&t?t:l.razaoSocial,cnpj:l.cnpj,endereco:l.endereco,bairro:l.bairro,cep:l.cep,cidade:l.cidade,estado:l.estado,qtdColaboradores:d||n("num_colaboradores").value||"",elaborador:{nome:n("elaborador_nome").value||"Thiago Marques",cargo:n("elaborador_cargo").value||"Diretor",email:n("elaborador_email").value||"engmarqsolution@gmail.com",telefone:n("elaborador_telefone").value||"+55 84 99928-5888",instagram:n("elaborador_instagram").value||"@engmarq_solution"},solicitante:{nome:n("solicitante_nome").value||"",cargo:n("solicitante_cargo").value||"",email:n("solicitante_email").value||"",telefone:n("solicitante_telefone").value||""},treinamentos:s,entregaveisPsico:i,isGrupo:o,nomeGrupo:o?t:void 0,empresasGrupo:o?r:void 0};if(!g.razaoSocial&&r.length===0){alert("Por favor, preencha a Razão Social do cliente");return}if(o&&r.length<2){alert("Para proposta em grupo, adicione pelo menos 2 empresas");return}const p=n("valor_proposta").value,m=E(p),f=n("aplicar_desconto").checked,v=parseFloat(n("percentual_desconto").value)||0,u=f?M(m,v):m,P=pa(e,g,m,u,v,f),h=window.open("","_blank");h?(h.document.write(P),h.document.close()):alert("Não foi possível abrir a nova janela. Verifique se o bloqueador de pop-ups está ativado.")}document.addEventListener("DOMContentLoaded",xa);window.configs=F;window.gerarProposta=G;window.atualizarValor=x;window.formatMoeda=c;window.adicionarEmpresa=va;window.removerEmpresa=ua;
