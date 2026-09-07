/** Tokens extraídos dos estilos V1; não injeta CSS global nem altera assets. */
export const engmarqTheme = {
    id: 'engmarq',
    colors: { primary: '#1a365d', secondary: '#f5a623', text: '#2d3748', muted: '#718096', background: '#ffffff', assistance: '#38a169', psychosocial: '#805ad5', training: '#dd6b20' },
    fonts: { heading: 'Montserrat', body: 'Open Sans' },
    logoSource: 'gerador/assets/logoengmarq.png',
    paper: { widthMm: 210, heightMm: 297 }
} as const;
