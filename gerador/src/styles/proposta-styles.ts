// =====================================================
// ESTILOS CSS PARA PROPOSTAS GERADAS
// =====================================================

/**
 * Retorna todos os estilos CSS necessários para a proposta em PDF
 * @returns String contendo o CSS completo
 */
export function getPropostaStyles(): string {
    return `
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
    `;
}
