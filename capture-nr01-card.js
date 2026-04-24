import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 1080, height: 1080 },
        deviceScaleFactor: 2
    });
    const page = await context.newPage();

    const filePath = path.resolve(__dirname, 'nr01-card.html');
    await page.goto('file:///' + filePath.replace(/\\/g, '/'), { waitUntil: 'networkidle' });

    // Wait for fonts
    await page.waitForTimeout(2500);

    const outputPath = path.resolve(__dirname, 'nr01-card-whatsapp.png');

    await page.screenshot({
        path: outputPath,
        type: 'png',
        fullPage: true
    });

    console.log('Imagem salva em: ' + outputPath);

    const fs2 = fs;
    const stats = fs2.statSync(outputPath);
    console.log('Tamanho: ' + (stats.size / 1024).toFixed(1) + ' KB');

    await browser.close();
})();
