/**
 * Captura una pagina concreta de la replica (1080x810 @2x) para compararla
 * con una captura real del iPad.
 * Uso: node tools/shot.js [idPagina] [ficheroSalida]
 */
const path = require('path');
const fs = require('fs');
const PW = 'C:/Users/adria/AppData/Roaming/npm/node_modules/openclaw/node_modules/playwright-core';
const { chromium } = require(PW);

const BASE = process.env.BASE || 'http://127.0.0.1:8000';
const target = process.argv[2] || 'general';
const out = process.argv[3] || path.join(__dirname, '..', 'shots', 'cmp-' + target + '.png');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'D:/playwright-browsers/chromium-1248/chrome-win64/chrome.exe',
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const ctx = await browser.newContext({
    viewport: { width: 1080, height: 810 },
    deviceScaleFactor: 2,
    hasTouch: true,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  await page.goto(BASE + '/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);

  if (target !== 'general') {
    const r = await page.$(`[data-id="${target}"]`);
    if (r) await r.click();
    await page.waitForTimeout(700);
  }
  await page.screenshot({ path: out });
  console.log('captura ->', out);
  if (errors.length) console.log('errores:\n' + errors.join('\n'));
  await browser.close();
})().catch(e => { console.error('FALLO:', e); process.exit(1); });
