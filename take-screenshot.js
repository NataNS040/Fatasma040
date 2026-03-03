const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 1080, height: 1920 },
        deviceScaleFactor: 1
    });
    const page = await context.newPage();

    await page.goto('http://localhost:8799/story2-capture.html', { waitUntil: 'networkidle' });

    // Wait for fonts to load
    await page.waitForTimeout(3000);

    const outputPath = 'c:\\Users\\natap\\OneDrive\\Documentos\\GitHub Pessoal e testes\\engmarq-solution\\story2-vaga-comercial-engmarq.png';

    await page.screenshot({
        path: outputPath,
        type: 'png',
        clip: { x: 0, y: 0, width: 1080, height: 1920 }
    });

    console.log('Screenshot salvo em: ' + outputPath);

    // Verify dimensions
    const fs = require('fs');
    const stats = fs.statSync(outputPath);
    console.log('Tamanho do arquivo: ' + (stats.size / 1024).toFixed(1) + ' KB');

    await browser.close();
})();
