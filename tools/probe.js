/**
 * Sonda de diagnostico: imprime el arbol de la pagina actual con medidas
 * (offsetWidth/Height, bounding box) para detectar contenido invisible.
 * Uso: node tools/probe.js [idPagina]
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
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  await page.goto(BASE + '/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  if (target !== 'general') {
    const r = await page.$(`[data-id="${target}"]`);
    if (r) await r.click();
    await page.waitForTimeout(600);
  }

  const info = await page.evaluate(() => {
    const out = [];
    const walk = (el, depth) => {
      if (depth > 4) return;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      out.push(`${'  '.repeat(depth)}<${el.tagName.toLowerCase()}${el.className ? ' class="' + el.className + '"' : ''}> ` +
        `box=${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)} ` +
        `disp=${cs.display} vis=${cs.visibility} op=${cs.opacity} ov=${cs.overflow} pos=${cs.position} z=${cs.zIndex}`);
      [...el.children].forEach(c => walk(c, depth + 1));
    };
    const pages = document.querySelector('#pages');
    walk(pages, 0);
    return out.join('\n');
  });
  console.log(info);
  console.log('\nerrores:', errors.length ? errors.join('\n') : 'ninguno');
  await browser.close();
})().catch(e => { console.error('FALLO:', e); process.exit(1); });
