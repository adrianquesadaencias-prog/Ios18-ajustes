/**
 * Prueba de la app con Playwright:
 *  - carga la pagina con el tamano real del iPad (1080x810 pt, 2x)
 *  - recoge errores de consola
 *  - navega por las secciones y hace capturas
 *
 * Uso:  node tools/test_app.js [http://127.0.0.1:8000]
 */
const path = require('path');
const fs = require('fs');

const PW = 'C:/Users/adria/AppData/Roaming/npm/node_modules/openclaw/node_modules/playwright-core';
const { chromium } = require(PW);

const BASE = process.argv[2] || 'http://127.0.0.1:8000';
const SHOTS = path.join(__dirname, '..', 'shots');
fs.mkdirSync(SHOTS, { recursive: true });

(async () => {
  const browser = await chromium.launch({
    executablePath: 'D:/playwright-browsers/chromium-1248/chrome-win64/chrome.exe',
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const ctx = await browser.newContext({
    viewport: { width: 1080, height: 810 },
    deviceScaleFactor: 2,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1',
  });
  const page = await ctx.newPage();

  const errors = [];
  const failedChecks = [];
  const serviceWorker = fs.readFileSync(path.join(__dirname, '..', 'sw.js'), 'utf8');
  const cachedIcons = [...serviceWorker.matchAll(/'\.\/icons-real\/([^']+\.png)'/g)].map(m => m[1]);
  const missingIcons = cachedIcons.filter(name => !fs.existsSync(path.join(__dirname, '..', 'icons-real', name)));
  if (missingIcons.length) failedChecks.push('Faltan iconos en la precarga offline: ' + missingIcons.join(', '));
  page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  page.on('response', r => {
    if (r.url().includes('/icons-real/') && !r.ok()) errors.push(`ICON ${r.status()}: ${r.url()}`);
  });

  await page.goto(BASE + '/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
  const swActive = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return false;
    try { return !!(await navigator.serviceWorker.ready).active; }
    catch { return false; }
  });
  console.log('   ', swActive ? 'OK  ' : 'FALTA', 'service worker y caché PWA activos');
  if (!swActive) failedChecks.push('PWA: no se activó el service worker');
  const accountVisual = await page.evaluate(() => {
    const account = document.querySelector('#account');
    return {
      disabled: account?.getAttribute('aria-disabled') === 'true',
      gray: getComputedStyle(account).backgroundColor === 'rgb(229, 229, 234)',
      removedMessages: !/Supervisado por|No se puede hacer una copia/i.test(account?.textContent || '')
    };
  });
  if (!accountVisual.disabled || !accountVisual.gray || !accountVisual.removedMessages) {
    failedChecks.push('Apple ID: debe seguir bloqueado, sin los dos mensajes eliminados');
  }

  const shot = async (name) => {
    await page.waitForTimeout(450);
    await page.screenshot({ path: path.join(SHOTS, name + '.png') });
    console.log('  captura:', name + '.png');
  };

  // 1. Pantalla inicial (General + columna lateral)
  await shot('01-general');
  const generalVisual = await page.evaluate(() => {
    const p = document.querySelector('.page-general');
    const head = p?.querySelector('.page-head');
    return {
      heroIcon: !!head?.querySelector('.root-icon'),
      floatedPanel: !!p && getComputedStyle(p).borderTopLeftRadius !== '0px',
      roundedGroups: [...(p?.querySelectorAll('.group') || [])].every(g => getComputedStyle(g).borderRadius !== '0px'),
      sidebarChevrons: document.querySelectorAll('.side-row .chev').length
    };
  });
  console.log('\n  -- fidelidad visual General --');
  console.log('   ', generalVisual.heroIcon ? 'OK  ' : 'FALTA', 'icono grande de General');
  console.log('   ', generalVisual.floatedPanel ? 'OK  ' : 'FALTA', 'panel con esquinas redondeadas');
  console.log('   ', generalVisual.roundedGroups ? 'OK  ' : 'FALTA', 'tarjetas de grupos redondeadas');
  console.log('   ', generalVisual.sidebarChevrons === 0 ? 'OK  ' : 'FALTA', 'sin cheurones en el sidebar =', generalVisual.sidebarChevrons);
  if (!generalVisual.heroIcon) failedChecks.push('General: falta el icono principal');
  if (!generalVisual.floatedPanel) failedChecks.push('General: panel sin esquinas redondeadas');
  if (!generalVisual.roundedGroups) failedChecks.push('General: grupos sin esquinas redondeadas');
  if (generalVisual.sidebarChevrons !== 0) failedChecks.push('General: cheurones extra en el sidebar');

  // 2. Informacion (identidad real del iPad)
  const infoRow = await page.$('.page .row:has-text("Información")');
  if (infoRow) await infoRow.click();
  await page.waitForTimeout(500);
  await shot('02-informacion');
  const detailBack = await page.$('#page-back:not([hidden])');
  console.log('   ', detailBack ? 'OK  ' : 'FALTA', 'Atrás visible en Información');
  if (!detailBack) failedChecks.push('Información: falta el botón Atrás');

  const body = await page.textContent('.pages');
  const side = await page.textContent('.sidebar');
  const checks = {
    'numero de serie': 'DMPD3HL9MF3Q',
    'modelo': 'iPad (7.ª generación)',
    'numero de modelo': 'MW772TY/A',
    'version': '18.7.10',
    'capacidad': '128 GB',
    'disponible': '85,99 GB'
  };
  const sideChecks = {
    'wi-fi': 'Wedu',
    'bluetooth': 'Sí'
  };
  console.log('\n  -- datos reales en pantalla --');
  for (const [k, v] of Object.entries(checks)) {
    const ok = body.includes(v);
    console.log('   ', ok ? 'OK  ' : 'FALTA', k, '=', v);
    if (!ok) failedChecks.push(`dato ${k}: falta ${v}`);
  }
  for (const [k, v] of Object.entries(sideChecks)) {
    const ok = side.includes(v);
    console.log('   ', ok ? 'OK  ' : 'FALTA', 'sidebar', k, '=', v);
    if (!ok) failedChecks.push(`sidebar ${k}: falta ${v}`);
  }
  

  // 3. Volver y abrir Bateria
  const back = await page.$('#page-back:not([hidden])');
  if (back) await back.click();
  await page.waitForTimeout(500);
  await page.click('[data-id="battery"]');
  await page.waitForTimeout(500);
  await shot('03-bateria');
  const batteryPageText = await page.textContent('.page-battery');
  console.log('   ', batteryPageText.includes('Cargando: 65 %') ? 'OK  ' : 'FALTA', 'detalle de batería actualizado = 65%');
  if (!batteryPageText.includes('Cargando: 65 %')) failedChecks.push('Batería: el porcentaje de carga no coincide con el estado observado');

  // 4. Wi-Fi
  await page.click('[data-id="wifi"]');
  await page.waitForTimeout(500);
  await shot('04-wifi');
  const wifiVisual = await page.evaluate(() => ({
    heroIcon: !!document.querySelector('.page-wifi .root-icon'),
    editAction: document.querySelector('.page-wifi .page-action')?.textContent === 'Editar',
    connectedNetwork: !!document.querySelector('.page-wifi .network-check'),
    networkRows: document.querySelectorAll('.page-wifi .network-status').length,
    weduNetworks: ['Wedu','Wedu_prof','Wedu_prim','Wedu_CM'].every(n => document.querySelector('.page-wifi')?.textContent.includes(n))
  }));
  console.log('\n  -- fidelidad visual Wi-Fi --');
  console.log('   ', wifiVisual.heroIcon ? 'OK  ' : 'FALTA', 'icono y cabecera de sección');
  console.log('   ', wifiVisual.editAction ? 'OK  ' : 'FALTA', 'acción Editar');
  console.log('   ', wifiVisual.connectedNetwork ? 'OK  ' : 'FALTA', 'red actual marcada');
  console.log('   ', wifiVisual.networkRows === 5 && wifiVisual.weduNetworks ? 'OK  ' : 'FALTA', 'redes WEDU + red adicional =', wifiVisual.networkRows);
  if (!wifiVisual.heroIcon) failedChecks.push('Wi-Fi: falta la cabecera visual');
  if (!wifiVisual.editAction) failedChecks.push('Wi-Fi: falta la acción Editar');
  if (!wifiVisual.connectedNetwork) failedChecks.push('Wi-Fi: falta marcar la red actual');
  if (wifiVisual.networkRows !== 5 || !wifiVisual.weduNetworks) failedChecks.push('Wi-Fi: lista WEDU incorrecta');

  // 5. Accesibilidad
  await page.click('[data-id="accessibility"]');
  await page.waitForTimeout(500);
  await shot('05-accesibilidad');

  // 6. Informacion legal
  await page.click('[data-id="general"]');
  await page.waitForTimeout(500);
  const legal = await page.$('.page .row:has-text("Marco jurídico")');
  if (legal) { await legal.click(); await page.waitForTimeout(500); }
  await shot('06-legal');

  // 7. Buscador
  await page.fill('#search', 'bateria');
  await page.waitForTimeout(400);
  await shot('07-buscar');
  await page.fill('#search', '');
  await page.waitForTimeout(300);

  // 10. Galería ligera de todas las secciones principales: mismo armazón visual,
  // sin probar ni ampliar los controles internos de cada sección.
  const rootPages = await page.evaluate(() => SIDEBAR.flatMap(g => g.rows)
    .filter(r => PAGES[r.id]).map(r => r.id));
  console.log('\n  -- secciones principales --');
  for (const id of rootPages) {
    await page.click(`[data-id="${id}"]`);
    await page.waitForTimeout(120);
    const visual = await page.evaluate(id => {
      const p = document.querySelector(`.page-${id}`);
      return {
        root: !!p?.classList.contains('root-page'),
        icon: !!p?.querySelector('.root-icon'),
        back: id === 'general' || !document.querySelector('#page-back')?.hidden,
        iconLoaded: [...(p?.querySelectorAll('.root-icon image') || [])].every(img => (img.getAttribute('href') || '').includes('icons-real/'))
      };
    }, id);
    console.log('   ', visual.root && visual.icon && visual.back && visual.iconLoaded ? 'OK  ' : 'FALTA', id, 'icono de referencia + atrás');
    if (!visual.root || !visual.icon) failedChecks.push(`${id}: falta el marco visual principal`);
    if (!visual.back) failedChecks.push(`${id}: falta el botón Atrás`);
    if (!visual.iconLoaded) failedChecks.push(`${id}: no usa el icono recortado de referencia`);
    await shot(`root-${id}`);
    if (id === 'wifi') {
      await page.click('#page-back');
      await page.waitForTimeout(500);
      const returnedToGeneral = await page.evaluate(() => !!document.querySelector('.page-general'));
      console.log('   ', returnedToGeneral ? 'OK  ' : 'FALTA', 'Atrás desde Wi-Fi vuelve a General');
      if (!returnedToGeneral) failedChecks.push('Wi-Fi: Atrás no vuelve a General');
    }
  }

  // 8. Modo oscuro (ya no hay status bar, saltamos)
  await shot('08-oscuro');

  // 9. Comprobacion funcional del lateral (pildora de seleccion + buscador)
  console.log('\n  -- lateral --');
  await page.click('[data-id="wifi"]');
  await page.waitForTimeout(400);
  const sel = await page.evaluate(() => {
    const s = document.querySelector('.side-row.selected');
    if (!s) return { id: null, parent: null };
    return { id: s.dataset.id, parent: s.parentElement.className };
  });
  console.log('   ', sel.id === 'wifi' ? 'OK  ' : 'FALTA', 'pildora en la fila correcta =', sel.id);
  console.log('   ', sel.parent === 'side-group' ? 'OK  ' : 'FALTA', 'pildora suelta fuera de la tarjeta =', sel.parent);

  await page.locator('.side-row[data-id="wifi"]').dispatchEvent('pointerdown');
  const pressedSide = await page.locator('.side-row[data-id="wifi"]').evaluate(el => getComputedStyle(el).backgroundColor);
  await page.locator('.side-row[data-id="wifi"]').dispatchEvent('pointerup');
  console.log('   ', pressedSide === 'rgb(209, 209, 214)' ? 'OK  ' : 'FALTA', 'pulsación lateral en gris =', pressedSide);
  if (pressedSide !== 'rgb(209, 209, 214)') failedChecks.push('sidebar: el feedback de pulsación no es gris');

  console.log('   ', accountVisual.disabled && accountVisual.gray && accountVisual.removedMessages ? 'OK  ' : 'FALTA', 'Apple ID gris y sin avisos antiguos');
  if (!accountVisual.disabled || !accountVisual.gray || !accountVisual.removedMessages) failedChecks.push('Apple ID: estado gris o textos antiguos presentes');

  await page.fill('#search', 'accesibilidad');
  await page.waitForTimeout(400);
  const searchViewResults = await page.evaluate(() => {
    const view = document.getElementById('search-view');
    if (!view) return { found: false };
    const rows = [...view.querySelectorAll('.search-row')];
    return {
      found: rows.some(r => r.textContent.includes('Accesibilidad')),
      count: rows.length,
      items: rows.map(r => r.textContent.trim()).slice(0, 10)
    };
  });
  console.log('   ', searchViewResults.found ? 'OK  ' : 'FALTA', 'búsqueda "accesibilidad" encuentra Accesibilidad');
  if (!searchViewResults.found) failedChecks.push('Búsqueda: no encuentra Accesibilidad');
  console.log('   ', searchViewResults.count > 0 ? 'OK  ' : 'FALTA', `resultados de búsqueda = ${searchViewResults.count}`);
  await page.fill('#search', '');
  await page.waitForTimeout(300);

  console.log('\n  -- errores de consola --');
  console.log(errors.length ? errors.join('\n') : '   ninguno');
  if (failedChecks.length) console.error('\n  -- validaciones fallidas --\n   ' + failedChecks.join('\n   '));

  await browser.close();
  process.exit(errors.length || failedChecks.length ? 1 : 0);
})().catch(e => { console.error('FALLO:', e); process.exit(1); });
