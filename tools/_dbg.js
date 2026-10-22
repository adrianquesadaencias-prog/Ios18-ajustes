const fs = require('fs');
const path = require('path');
const LOG = path.join('C:/Users/adria/AppData/Local/Temp/opencode', 'dbg.log');
fs.writeFileSync(LOG, '');
const log = (...a) => fs.appendFileSync(LOG, a.join(' ') + '\n');
const PW = 'C:/Users/adria/AppData/Roaming/npm/node_modules/openclaw/node_modules/playwright-core';
const { chromium } = require(PW);
const BASE = 'http://127.0.0.1:8000';

(async () => {
  log('launch');
  const browser = await chromium.launch({
    executablePath: 'D:/playwright-browsers/chromium-1248/chrome-win64/chrome.exe',
    args: ['--no-sandbox', '--disable-gpu'],
    timeout: 30000,
  });
  log('launched');
  const ctx = await browser.newContext({
    viewport: { width: 1080, height: 810 },
    deviceScaleFactor: 2,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1',
  });
  log('context');
  const page = await ctx.newPage();
  page.on('pageerror', e => log('PAGEERROR', e.message));
  page.on('console', m => { if (m.type() === 'error') log('CONSOLE', m.text()); });
  log('goto');
  await page.goto(BASE + '/index.html', { waitUntil: 'domcontentloaded', timeout: 20000 });
  log('goto done');
  await page.waitForTimeout(1500);
  log('sw check');
  const sw = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return 'no-sw-api';
    try { return !!(await navigator.serviceWorker.ready).active ? 'active' : 'inactive'; }
    catch (e) { return 'err ' + e.message; }
  });
  log('sw =', sw);
  log('screenshot');
  await page.screenshot({ path: path.join('C:/Users/adria/Desktop/iPadOS-Settings-18/shots', '_dbg.png'), timeout: 20000 });
  log('screenshot done');
  await browser.close();
  log('closed');
})().catch(e => { log('FALLO', e.message); process.exit(1); });
