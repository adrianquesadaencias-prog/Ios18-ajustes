const PW = 'C:/Users/adria/AppData/Roaming/npm/node_modules/openclaw/node_modules/playwright-core';
const { chromium } = require(PW);
const path = require('path');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'D:/playwright-browsers/chromium-1248/chrome-win64/chrome.exe',
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const ctx = await browser.newContext({
    viewport: { width: 1080, height: 810 }, deviceScaleFactor: 2, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1',
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('http://127.0.0.1:8000/');
  await page.waitForTimeout(900);

  const ids = ['general', 'info', 'softwareupdate', 'wifi', 'accessibility'];
  for (const id of ids) {
    await page.evaluate(() => { document.querySelectorAll('.page').forEach(p => p.remove()); });
    await page.evaluate(() => { state.stack = ['general']; });
    await page.evaluate(id => openPage(id), id);
    await page.waitForTimeout(450);

    const info = await page.evaluate(() => {
      const pg = document.querySelector('.page:last-child') || document.querySelector('.page');
      return { scrollH: pg.scrollHeight, clientH: pg.clientHeight };
    });

    const sample = async (label) => {
      const r = await page.evaluate(() => {
        const pg = document.querySelector('.page:last-child') || document.querySelector('.page');
        const t = pg.querySelector('.page-title');
        const nt = pg.querySelector('.page-nav-title');
        const nb = pg.querySelector('.page-nav-bg');
        const cs = getComputedStyle(t);
        const rect = t.getBoundingClientRect();
        return {
          scrollTop: Math.round(pg.scrollTop),
          transform: cs.transform,
          opacity: Number(cs.opacity).toFixed(2),
          titleCenterY: Math.round(rect.top + rect.height / 2),
          navTitleOpacity: Number(getComputedStyle(nt).opacity).toFixed(2),
          navBgOpacity: Number(getComputedStyle(nb).opacity).toFixed(2),
        };
      });
      console.log('   ', label, JSON.stringify(r));
    };

    await sample('scroll 0');
    await page.screenshot({ path: path.join(__dirname, '..', 'shots', 'anim-' + id + '-0.png') });

    for (const y of [30, 70, 120]) {
      await page.evaluate(y => {
        const pg = document.querySelector('.page:last-child') || document.querySelector('.page');
        pg.scrollTop = y;
      }, y);
      await page.waitForTimeout(180);
      await sample('scroll ' + y);
    }
    await page.screenshot({ path: path.join(__dirname, '..', 'shots', 'anim-' + id + '-120.png') });
    await page.evaluate(() => {
      const pg = document.querySelector('.page:last-child') || document.querySelector('.page');
      pg.scrollTop = 0;
    });
    console.log('  ', id, 'scrollHeight/cliente', info.scrollH + '/' + info.clientH);
  }
  console.log('errores consola:', errors.length ? errors : 'ninguno');
  await browser.close();
})();
