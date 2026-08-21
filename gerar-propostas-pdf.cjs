// Converte todos os HTMLs de propostas/ para PDF em propostas-pdf/
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROOT   = 'c:\\Users\\natap\\OneDrive\\Documentos\\GitHub Pessoal e testes\\engmarq-solution';
const SRC    = path.join(ROOT, 'propostas');
const DEST   = path.join(ROOT, 'propostas-pdf');
const MESES  = ['dezembro-2025','janeiro-2026','fevereiro-2026','marco-2026',
                 'abril-2026','maio-2026','junho-2026','julho-2026','agosto-2026','sem-data'];

(async () => {
    // Criar pastas de destino
    for (const mes of MESES) {
        fs.mkdirSync(path.join(DEST, mes), { recursive: true });
    }

    const browser = await chromium.launch();
    let total = 0, erros = 0;

    for (const mes of MESES) {
        const srcDir  = path.join(SRC, mes);
        const destDir = path.join(DEST, mes);
        if (!fs.existsSync(srcDir)) continue;

        const htmlFiles = fs.readdirSync(srcDir).filter(f => f.endsWith('.html'));
        if (htmlFiles.length === 0) continue;

        console.log(`\n[${mes}] ${htmlFiles.length} arquivo(s)`);

        for (const file of htmlFiles) {
            const htmlPath = path.join(srcDir, file);
            const pdfName  = file.replace(/\.html$/, '.pdf');
            const pdfPath  = path.join(destDir, pdfName);

            try {
                const page = await browser.newPage();
                const url  = 'file:///' + htmlPath.replace(/\\/g, '/');
                await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
                await page.waitForTimeout(1500); // aguarda fontes e imagens

                await page.pdf({
                    path: pdfPath,
                    format: 'A4',
                    printBackground: true,
                    margin: { top: '0', right: '0', bottom: '0', left: '0' },
                });
                await page.close();
                console.log(`  OK  ${pdfName}`);
                total++;
            } catch (err) {
                console.error(`  ERRO ${file}: ${err.message}`);
                erros++;
            }
        }
    }

    await browser.close();
    console.log(`\n=== CONCLUIDO: ${total} PDFs gerados, ${erros} erro(s) ===`);
})();
