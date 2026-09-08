import assert from 'node:assert/strict';

export async function checkPresentation(page) {
    const geometry = await page.evaluate(() => {
        const pages = [...document.querySelectorAll('.pagedjs_page')];
        const first = pages[0].getBoundingClientRect();
        const cover = pages[0].querySelector('.cover').getBoundingClientRect();
        const internal = pages[1].querySelector('.pagedjs_page_content').getBoundingClientRect();
        const second = pages[1].getBoundingClientRect();
        return {
            size: [first.width, first.height],
            cover: [cover.left - first.left, cover.top - first.top, cover.width, cover.height],
            blue: getComputedStyle(pages[0].querySelector('.cover')).backgroundColor,
            margin: [internal.left - second.left, internal.top - second.top],
            coverMargins: [...pages[0].querySelectorAll('.pagedjs_margin-content')].map(n => n.textContent.trim()).filter(Boolean),
            logo: pages[0].querySelector('img').naturalWidth > 0,
            acceptanceOnLast: document.querySelector('.acceptance-page').closest('.pagedjs_page') === pages.at(-1),
            signatures: [...document.querySelectorAll('.signature')].map(n => n.closest('.pagedjs_page').dataset.pageNumber),
            signatureHeight: [...document.querySelectorAll('.signature-line')].map(n => n.getBoundingClientRect().height),
        };
    });
    assert.ok(Math.abs(geometry.size[0] - 210 * 96 / 25.4) < 1);
    assert.ok(Math.abs(geometry.size[1] - 297 * 96 / 25.4) < 1);
    assert.ok(geometry.cover.every((v, i) => Math.abs(v - [0, 0, ...geometry.size][i]) < 1), 'Capa ocupa toda a folha A4');
    assert.equal(geometry.blue, 'rgb(26, 54, 93)');
    assert.deepEqual(geometry.coverMargins, [], 'Capa sem cabeçalho, rodapé ou número');
    assert.ok(geometry.margin[0] > 60 && geometry.margin[1] > 71, 'Margens internas preservadas');
    assert.ok(geometry.logo && geometry.acceptanceOnLast);
    assert.equal(geometry.signatures.length, 2, 'EngMarq e um contratante, inclusive no grupo');
    assert.equal(new Set(geometry.signatures).size, 1, 'Assinaturas na mesma página');
    assert.ok(geometry.signatureHeight.every(h => h >= 30 * 96 / 25.4 - 1));
}
