const PW = 'C:/Users/adria/AppData/Roaming/npm/node_modules/openclaw/node_modules/playwright-core';
const { chromium } = require(PW);
const path = require('path');

(async () => {
  const browser = await chromium.launch({ executablePath: 'D:/playwright-browsers/chromium-1248/chrome-win64/chrome.exe', args: ['--no-sandbox', '--disable-gpu'] });
  const page = await browser.newPage({ viewport: { width: 1080, height: 810 }, deviceScaleFactor: 2 });
  await page.goto('http://127.0.0.1:8000/');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(__dirname, '..', 'shots', 'sidebar-groups.png') });
  const groups = await page.$$('.side-group');
  console.log('Grupos en sidebar:', groups.length);
  for (let i = 0; i < groups.length; i++) {
    const rows = await groups[i].$$('.side-row');
    const first = rows[0] ? await rows[0].textContent() : 'vacio';
    console.log('  Grupo', i, ':', rows.length, 'filas, primera:', first.trim());
  }
  await browser.close();
})();