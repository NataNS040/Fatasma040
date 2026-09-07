import { element } from './document';
import { documentIcon, serviceIcon, type DocumentIcon } from './icons';

const fieldIcons: Record<string, DocumentIcon> = { objective: 'shield', deliverables: 'check', executionSteps: 'calendar', methodology: 'technical', providerResponsibilities: 'technical', clientResponsibilities: 'building', responsibilities: 'users', inclusions: 'check', exclusions: 'warning', observations: 'warning', references: 'document', periodicity: 'calendar', scope: 'document' };

export function serviceHeader(title: string, shortName: string, catalogId?: string): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const heading = element('h3', 'service-heading');
    heading.append(documentIcon(serviceIcon(catalogId)), document.createTextNode(shortName));
    if (title !== shortName) heading.append(element('span', 'service-subtitle', title));
    fragment.append(heading);
    return fragment;
}

export function editorialContent(field: string, title: string, values: string[], showHeading = true): DocumentFragment {
    const fragment = document.createDocumentFragment();
    if (field === 'summary') {
        values.forEach(value => fragment.append(element('p', 'service-summary', value)));
        return fragment;
    }
    if (showHeading) {
        const heading = element('h4', `editorial-label field-${field}`);
        if (fieldIcons[field]) heading.append(documentIcon(fieldIcons[field]));
        heading.append(document.createTextNode(title)); fragment.append(heading);
    }
    if (!values.length) return fragment;
    const list = field === 'executionSteps' ? element('ol', 'editorial-list method-steps') : element('ul', `editorial-list field-${field}`);
    values.forEach((value, index) => {
        const item = element('li', `editorial-item field-${field}`, value);
        if (field === 'executionSteps') item.dataset.step = String(index + 1).padStart(2, '0');
        if (['deliverables', 'inclusions'].includes(field)) item.prepend(documentIcon('check'));
        list.append(item);
    });
    fragment.append(list);
    return fragment;
}