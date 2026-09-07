export type DocumentIcon = 'document' | 'shield' | 'health' | 'users' | 'training' | 'fire' | 'measurement' | 'temperature' | 'noise' | 'check' | 'calendar' | 'money' | 'building' | 'technical' | 'warning';

const paths: Record<DocumentIcon, string[]> = {
    document: ['M14 2H5v20h14V7z M14 2v5h5 M8 12h8 M8 16h8'],
    shield: ['M12 3 3 7v5c0 5 9 9 9 9s9-4 9-9V7z', 'm8 12 3 3 5-6'],
    health: ['M9 3h6v6h6v6h-6v6H9v-6H3V9h6z'],
    users: ['M16 21v-3a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v3 M16 4a4 4 0 0 1 0 8 M22 21v-3a4 4 0 0 0-3-4', 'M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0'],
    training: ['m2 8 10-5 10 5-10 5z M6 10v7c4 3 8 3 12 0v-7 M22 8v8'],
    fire: ['M13 2c1 6-5 7-4 11 2-1 3-2 4-4 5 4 8 8 4 12-5 4-13 1-13-5 0-4 3-6 4-8 0 3 1 3 2 3 2-2 3-5 3-9Z'],
    measurement: ['m3 17 14-14 4 4L7 21z M12 8l3 3 M8 12l3 3'],
    temperature: ['M9 14V5a3 3 0 0 1 6 0v9a5 5 0 1 1-6 0 M12 8v10 M18 5h3 M18 9h2'],
    noise: ['M3 9h4l5-5v16l-5-5H3z M16 8a6 6 0 0 1 0 8 M19 5a10 10 0 0 1 0 14'],
    check: ['m5 12 4 4L19 6'],
    calendar: ['M4 5h16v16H4z M8 3v4 M16 3v4 M4 10h16 M8 14h2 M14 14h2 M8 18h2'],
    money: ['M3 5h18v14H3z M16 12h2 M6 12h2', 'M14 12a2 3 0 1 1-4 0 2 3 0 0 1 4 0'],
    building: ['M5 22V2h14v20 M2 22h20 M9 6h1 M14 6h1 M9 10h1 M14 10h1 M9 14h1 M14 14h1 M10 22v-4h4v4'],
    technical: ['m14 6 4 4 M3 21l6-2 12-12-4-4L5 15z M5 15l4 4'],
    warning: ['m12 3 10 18H2z M12 9v5 M12 17v.1']
};
const templates = new Map<DocumentIcon, SVGSVGElement>();

export function documentIcon(id: DocumentIcon): SVGSVGElement {
    let template = templates.get(id);
    if (!template) {
        const namespace = 'http://www.w3.org/2000/svg';
        template = document.createElementNS(namespace, 'svg');
        for (const [name, value] of Object.entries({ viewBox: '0 0 24 24', width: '24', height: '24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true', focusable: 'false', class: 'document-icon', 'data-icon': id })) template.setAttribute(name, value);
        for (const data of paths[id]) { const path = document.createElementNS(namespace, 'path'); path.setAttribute('d', data); template.append(path); }
        templates.set(id, template);
    }
    return template.cloneNode(true) as SVGSVGElement;
}

export function serviceIcon(catalogId?: string): DocumentIcon {
    if (catalogId?.startsWith('nr')) return 'training';
    const services: Record<string, DocumentIcon> = { pgr: 'shield', pcmso: 'health', psychosocial: 'users', brigade: 'fire', heat: 'temperature', noise: 'noise', vibration: 'measurement', chemicals: 'measurement', dust: 'measurement', assistance: 'shield', art: 'technical', esocial: 'users', 'technical-support': 'technical', 'technical-visit': 'calendar' };
    return services[catalogId ?? ''] ?? 'document';
}