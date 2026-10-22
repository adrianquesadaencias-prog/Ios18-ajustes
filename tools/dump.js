/**
 * Vuelca la app como texto (para revisarlo en la consola).
 * Uso: node tools/dump.js [idPagina]
 */
const path = require('path');
const PW = 'C:/Users/adria/AppData/Roaming/npm/node_modules/openclaw/node_modules/playwright-core';
const { chromium } = require(PW);

const BASE = process.argv[3] || 'http://127.0.0.1:8000';
const target = process.argv[2] || 'general';

(async () => {
  const browser = await chromium.launch({
    executablePath: 'D:/playwright-browsers/chromium-1248/chrome-win64/chrome.exe',
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const ctx = await browser.newContext({ viewport: { width: 1080, height: 810 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(BASE + '/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  if (target !== 'general') {
    const r = await page.$(`[data-id="${target}"]`);
    if (r) await r.click();
    await page.waitForTimeout(500);
  }

  const data = await page.evaluate(() => {
    const side = [...document.querySelectorAll('.side-group')].map(g => {
      const card = g.querySelector('.side-card');
      const rows = [...g.querySelectorAll('.side-row')].map(r =>
        (r.classList.contains('selected') ? '> ' : '  ') +
        (r.querySelector('.ico') ? '\u25A0 ' : '  ') +
        r.querySelector('.lbl').textContent +
        (r.querySelector('.val') ? '  [' + r.querySelector('.val').textContent + ']' : ''));
      return rows;
    });
    const det = [...document.querySelectorAll('.page')].pop();
    const groups = [...det.querySelectorAll('.group')].map(gr =>
      [...gr.querySelectorAll('.row')].map(r =>
        '    ' + (r.querySelector('.ico') ? '\u25A0 ' : '  ') +
        (r.querySelector('.lbl') || r.firstElementChild ? (r.querySelector('.lbl')?.textContent || r.textContent.trim()) : r.textContent.trim()) +
        (r.querySelector('.val') ? '   -> ' + r.querySelector('.val').textContent : '')));
return {
        title: det.querySelector('.page-head .ttl')?.textContent || det.querySelector('.page-head')?.textContent.trim() || '',
        desc: det.querySelector('.page-desc')?.textContent || '',
        side, det: groups,
      };
  });

  console.log('\n=== LATERAL ===');
  data.side.forEach(g => g.forEach(l => console.log(l)));
  console.log('\n=== DETALLE: ' + data.title + ' ===');
  if (data.desc) console.log(data.desc);
  data.det.forEach(g => g.forEach(l => console.log(l)));
  await browser.close();
})().catch(e => { console.error('FALLO:', e); process.exit(1); });
