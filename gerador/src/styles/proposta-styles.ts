// =====================================================
// ESTILOS CSS PARA PROPOSTAS GERADAS
// =====================================================

import { TipoProposta } from '../types/proposta.types';

/**
 * Retorna a cor de destaque baseada no tipo de proposta
 */
function getAccentColor(tipo: TipoProposta): string {
    switch (tipo) {
        case 'brigada': return '#dd6b20';
        case 'plataforma': return '#f5a623';
        case 'plataforma-principal': return '#c05621';
        case 'psicossocial': return '#805ad5';
        case 'assessoria': return '#38a169';
        default: return '#f5a623';
    }
}

/**
 * Retorna todos os estilos CSS necessários para a proposta em PDF
 * @param tipo - Tipo da proposta para customização de cores
 * @returns String contendo o CSS completo
 */
export function getPropostaStyles(tipo: TipoProposta = 'brigada'): string {
    const accentColor = getAccentColor(tipo);
    
    return `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
            --primary-color: #1a365d;
            --secondary-color: #f5a623;
            --accent-color: ${accentColor};
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
        .page-cover::before { content: ''; position: absolute; top: -50%; right: -30%; width: 80%; height: 200%; background: radial-gradient(ellipse, ${accentColor}20 0%, transparent 60%); pointer-events: none; }
        .cover-logo { width: 180px; margin-bottom: 30px; filter: brightness(0) invert(1); position: relative; z-index: 1; }
        .cover-badge { background: ${accentColor}e6; color: var(--white-color); padding: 10px 25px; border-radius: 20px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; position: relative; z-index: 1; }
        .cover-badge i { font-size: 12px; }
        .cover-icon { width: 70px; height: 70px; background: ${accentColor}33; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; position: relative; z-index: 1; }
        .cover-icon i { font-size: 32px; color: ${accentColor}; }
        .cover-title { font-family: var(--font-primary); font-size: 28px; font-weight: 800; margin-bottom: 15px; line-height: 1.25; position: relative; z-index: 1; }
        .cover-title span { color: ${accentColor}; display: block; }
        .cover-subtitle { font-size: 14px; font-weight: 300; margin-bottom: 30px; opacity: 0.95; max-width: 450px; margin-left: auto; margin-right: auto; position: relative; z-index: 1; line-height: 1.5; }
        .cover-client { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 18px 35px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2); position: relative; z-index: 1; margin: 0 auto; max-width: 380px; }
        .cover-client-label { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.8; margin-bottom: 6px; text-align: center; }
        .cover-client-name { font-family: var(--font-primary); font-size: 18px; font-weight: 700; color: ${accentColor}; text-align: center; }
        .cover-date { margin-top: 25px; font-size: 12px; opacity: 0.8; position: relative; z-index: 1; }
        .cover-footer { position: absolute; bottom: 18mm; left: 0; right: 0; text-align: center; font-size: 10px; opacity: 0.7; padding: 0 18mm; display: flex; justify-content: center; align-items: center; }
        .cover-footer p { margin: 0; text-align: center; width: 100%; }
        
        /* ====== TÍTULOS E TEXTOS ====== */
        .section-number { display: inline-block; background: ${accentColor}; color: var(--white-color); width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-family: var(--font-primary); font-weight: 700; font-size: 13px; margin-right: 10px; }
        .section-title { font-family: var(--font-primary); font-size: 18px; font-weight: 700; color: var(--primary-color); margin-bottom: 14px; display: flex; align-items: center; padding-bottom: 10px; border-bottom: 3px solid ${accentColor}; }
        .section-title-text { flex: 1; }
        .subsection-title { font-family: var(--font-primary); font-size: 13px; font-weight: 700; color: var(--primary-color); margin: 14px 0 10px; display: flex; align-items: center; gap: 8px; }
        .subsection-title i { color: ${accentColor}; }
        
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
        .construction-box { background: linear-gradient(135deg, #fffaf0 0%, #feebc8 100%); border-left: 4px solid ${accentColor}; padding: 12px 14px; margin: 12px 0; border-radius: 0 8px 8px 0; }
        .construction-box h4 { font-family: var(--font-primary); font-size: 12px; color: ${accentColor}; margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
        .construction-box p { margin-bottom: 0; font-size: 11px; line-height: 1.45; }
        
        /* NR Box especial */
        .nr-box { background: linear-gradient(135deg, var(--primary-color) 0%, #0f2744 100%); color: var(--white-color); padding: 15px 18px; border-radius: 10px; margin: 15px 0; display: flex; align-items: center; gap: 15px; }
        .nr-box-icon { width: 50px; height: 50px; background: ${accentColor}33; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .nr-box-icon i { font-size: 22px; color: ${accentColor}; }
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
        .build-list li::before { content: '\\f6e3'; font-family: 'Font Awesome 6 Free'; font-weight: 900; position: absolute; left: 0; color: ${accentColor}; font-size: 10px; }
        
        /* Benefits grid */
        .benefits-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 15px 0; }
        .benefit-item { background: var(--light-color); padding: 12px; border-radius: 8px; text-align: center; border-bottom: 3px solid ${accentColor}; }
        .benefit-item i { font-size: 22px; color: ${accentColor}; margin-bottom: 8px; display: block; }
        .benefit-item h4 { font-family: var(--font-primary); font-size: 11px; color: var(--primary-color); margin-bottom: 4px; }
        .benefit-item p { font-size: 9px; margin: 0; color: var(--gray-color); }
        
        /* Entregáveis lista */
        .deliverables-list { margin: 15px 0; }
        .deliverable-section { background: var(--light-color); border-radius: 10px; margin-bottom: 12px; overflow: hidden; }
        .deliverable-header { background: linear-gradient(135deg, var(--primary-color) 0%, #0f2744 100%); color: var(--white-color); padding: 10px 14px; display: flex; align-items: center; gap: 10px; }
        .deliverable-header i { color: ${accentColor}; font-size: 16px; }
        .deliverable-header h4 { font-family: var(--font-primary); font-size: 12px; font-weight: 700; margin: 0; }
        .deliverable-content { padding: 10px 14px; }
        .deliverable-content ul { list-style: none; margin: 0; }
        .deliverable-content li { padding: 4px 0; padding-left: 18px; position: relative; font-size: 10px; }
        .deliverable-content li::before { content: '\\f054'; font-family: 'Font Awesome 6 Free'; font-weight: 900; position: absolute; left: 0; color: ${accentColor}; font-size: 8px; top: 6px; }
        
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
        .content-card { background: var(--light-color); padding: 10px 12px; border-radius: 8px; border-left: 3px solid ${accentColor}; }
        .content-card h4 { font-family: var(--font-primary); font-size: 11px; color: var(--primary-color); margin-bottom: 4px; display: flex; align-items: center; gap: 6px; }
        .content-card h4 i { color: ${accentColor}; font-size: 12px; }
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
        .deliverable-icon { width: 28px; height: 28px; background: ${accentColor}; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: var(--white-color); font-size: 12px; flex-shrink: 0; }
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
        .carga-item { flex: 1; background: var(--light-color); padding: 12px; border-radius: 8px; text-align: center; border-top: 3px solid ${accentColor}; }
        .carga-item i { font-size: 20px; color: ${accentColor}; margin-bottom: 6px; display: block; }
        .carga-item h4 { font-family: var(--font-primary); font-size: 11px; color: var(--primary-color); margin-bottom: 3px; }
        .carga-item p { font-size: 10px; margin: 0; color: var(--gray-color); }
        .carga-total { background: linear-gradient(135deg, var(--primary-color) 0%, #0f2744 100%); color: white; padding: 12px 15px; border-radius: 8px; text-align: center; margin: 12px 0; }
        .carga-total h3 { font-family: var(--font-primary); font-size: 12px; margin-bottom: 4px; }
        .carga-total p { font-size: 24px; font-weight: 800; color: ${accentColor}; margin: 0; }
        
        /* Empresa contratante */
        .company-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
        .company-info-item { padding: 10px 12px; background: var(--light-color); border-radius: 8px; border-left: 3px solid ${accentColor}; }
        .company-info-item label { font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: var(--gray-color); font-weight: 600; display: block; margin-bottom: 4px; }
        .company-info-item span { font-size: 12px; color: var(--dark-color); font-weight: 500; }
        
        /* Responsável */
        .responsible-card { background: linear-gradient(135deg, var(--primary-color) 0%, #0f2744 100%); padding: 18px; border-radius: 10px; color: var(--white-color); text-align: center; margin: 15px 0; }
        .responsible-avatar { width: 60px; height: 60px; background: ${accentColor}33; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-size: 26px; color: ${accentColor}; border: 2px solid ${accentColor}; }
        .responsible-name { font-family: var(--font-primary); font-size: 16px; font-weight: 700; margin-bottom: 3px; text-align: center; }
        .responsible-role { font-size: 11px; opacity: 0.9; margin-bottom: 3px; text-align: center; }
        .responsible-company { font-size: 10px; opacity: 0.8; margin-bottom: 12px; text-align: center; }
        .responsible-contacts { display: flex; flex-direction: column; gap: 6px; align-items: center; }
        .responsible-contact-item { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 10px; }
        .responsible-contact-item i { color: ${accentColor}; width: 15px; text-align: center; }
        
        /* Diferenciais */
        .diferenciais-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 12px 0; }
        .diferencial-item { background: var(--light-color); padding: 12px; border-radius: 8px; text-align: center; border-bottom: 3px solid ${accentColor}; }
        .diferencial-item i { font-size: 22px; color: ${accentColor}; margin-bottom: 8px; display: block; }
        .diferencial-item h4 { font-family: var(--font-primary); font-size: 11px; color: var(--primary-color); margin-bottom: 4px; }
        .diferencial-item p { font-size: 10px; margin: 0; color: var(--gray-color); line-height: 1.4; }
        
        /* Página de contato */
        .page-contact { display: flex; flex-direction: column; justify-content: center; text-align: center; }
        .contact-content { margin: auto 0; }
        .contact-icon { width: 60px; height: 60px; background: linear-gradient(135deg, var(--primary-color) 0%, #0f2744 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-size: 26px; color: ${accentColor}; }
        .contact-title { font-family: var(--font-primary); font-size: 20px; font-weight: 700; color: var(--primary-color); margin-bottom: 8px; }
        .contact-subtitle { font-size: 11px; color: var(--gray-color); margin-bottom: 15px; max-width: 400px; margin-left: auto; margin-right: auto; }
        .contact-info { display: flex; flex-direction: column; gap: 8px; align-items: center; }
        .contact-item { display: flex; align-items: center; gap: 10px; font-size: 12px; color: var(--dark-color); }
        .contact-item i { color: ${accentColor}; font-size: 14px; width: 20px; }
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
    `;
}
