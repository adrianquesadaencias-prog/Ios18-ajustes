/* =====================================================================
   app.js - motor de la replica de Ajustes iPadOS 18
   ===================================================================== */

const LS_KEY = 'ajustes-ipados-18-v3';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

const state = {
  stack: ['general'],          // pila de paginas (la primera es la raiz)
  switches: {},
  theme: 'light',
  search: ''
};

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const o = JSON.parse(raw);
      state.switches = o.switches || {};
      state.theme = o.theme || 'light';
    }
  } catch (e) { /* almacenamiento no disponible */ }
}
function saveState() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({ switches: state.switches, theme: state.theme }));
  } catch (e) { /* ignora */ }
}
loadState();

/* ------------------------------ UTILES ------------------------------ */
function chev() {
  return '<svg class="chev" viewBox="0 0 8 13" aria-hidden="true">' +
    '<path d="M1.2 0 0 1.3 5 6.5 0 11.7 1.2 13 7.2 6.5 1.2 0Z"/></svg>';
}

function swValue(id, def) {
  if (!id) return !!def;
  if (id in state.switches) return !!state.switches[id];
  return !!def;
}

function toast(msg, ms = 2000) {
  const t = $('#toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.hidden = true; }, ms);
}

/* --------------------------- HOJA MODAL ----------------------------- */
function showSheet(opts) {
  const host = $('#modal-host');
  host.innerHTML =
    '<div class="scrim"></div>' +
    '<div class="sheet" role="dialog" aria-modal="true">' +
      (opts.title ? `<div class="sh-title">${opts.title}</div>` : '') +
      (opts.body ? `<div class="sh-body">${opts.body}</div>` : '') +
      (opts.group ? `<div class="sh-group">${opts.group}</div>` : '') +
      '<div class="sh-actions">' +
        (opts.cancel ? `<button data-x="cancel">${opts.cancel}</button>` : '') +
        (opts.ok ? `<button data-x="ok" class="bold${opts.destructive ? ' destructive' : ''}">${opts.ok}</button>` : '') +
      '</div>' +
    '</div>';
  host.hidden = false;
  const close = (val) => {
    host.hidden = true;
    host.innerHTML = '';
    if (val && opts.onOk) opts.onOk();
  };
  host.querySelector('.scrim').onclick = () => close(false);
  host.querySelectorAll('.sh-actions button').forEach(b => {
    b.onclick = () => close(b.dataset.x === 'ok');
  });
}

/* ------------------------- CONSTRUCCION ---------------------------- */
function buildRow(r, iconMode = 'flat') {
  const el = document.createElement('div');
  const cls = ['row'];
  if (r.icon) cls.push('with-ico');
  if (r.indent) cls.push('indent');
  if (r.connected) cls.push('connected');
  if (r.noSep) cls.push('no-sep');
  if (r.tint === 'red') cls.push('red');
  if (r.tint === 'blue') cls.push('blue');
  if (r.disabled) cls.push('disabled');
  el.className = cls.join(' ');

  if (r.connected) {
    const check = document.createElement('span');
    check.className = 'network-check';
    check.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m3 10.5 4.3 4.3L17 5.2" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    el.appendChild(check);
  } else if (r.icon && !r.hideIcon) {
    const ico = document.createElement('span');
    const mode = typeof iconMode === 'function' ? iconMode(r) : iconMode;
    ico.innerHTML = mode === 'tile' ? iconSVG(r.icon) : iconFlatSVG(r.icon);
    const svg = ico.firstElementChild;
    if (svg) el.appendChild(svg);
    else console.warn('Icono sin definicion: ' + r.icon);
  }

  const txt = document.createElement('div');
  txt.className = 'txt';
  txt.innerHTML = `<div class="t1">${r.label || ''}</div>` +
    (r.sub ? `<div class="t2">${r.sub}</div>` : '');
  el.appendChild(txt);

  if (r.value !== undefined && r.value !== '') {
    const v = document.createElement('span');
    v.className = 'val';
    v.textContent = r.value;
    el.appendChild(v);
  }

  if (r.sw) {
    const on = swValue(r.sw, r.def);
    const sw = document.createElement('button');
    sw.className = 'switch' + (on ? ' on' : '') + (r.locked ? ' locked' : '');
    sw.setAttribute('role', 'switch');
    sw.setAttribute('aria-checked', on ? 'true' : 'false');
    sw.setAttribute('aria-label', r.label || '');
    sw.onclick = (ev) => {
      ev.stopPropagation();
      if (r.locked) {
        toast(r.lockNote || 'Gestionado por MDM: no se puede modificar');
        return;
      }
      const now = !sw.classList.contains('on');
      sw.classList.toggle('on', now);
      sw.setAttribute('aria-checked', now ? 'true' : 'false');
      state.switches[r.sw] = now;
      saveState();
    };
    el.appendChild(sw);
  }

  if (r.networkStatus) {
    const status = document.createElement('span');
    status.className = 'network-status';
    status.innerHTML = '<svg viewBox="0 0 14 16" aria-hidden="true"><path d="M4 6V4a3 3 0 0 1 6 0v2h1.4c.9 0 1.6.7 1.6 1.6v6.8c0 .9-.7 1.6-1.6 1.6H2.6c-.9 0-1.6-.7-1.6-1.6V7.6C1 6.7 1.7 6 2.6 6H4Zm1.7 0h2.6V4a1.3 1.3 0 0 0-2.6 0v2Z"/></svg><svg viewBox="0 0 18 14" aria-hidden="true"><path d="M9 12.5 6.8 10.3a3.1 3.1 0 0 1 4.4 0L9 12.5Zm0-5a6.3 6.3 0 0 0-4.5 1.9L3 7.9a8.5 8.5 0 0 1 12 0l-1.5 1.5A6.3 6.3 0 0 0 9 7.5ZM9 3a10.7 10.7 0 0 0-7.6 3.1L0 4.7a12.8 12.8 0 0 1 18 0l-1.4 1.4A10.7 10.7 0 0 0 9 3Z"/></svg><svg class="network-info" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="10" cy="6" r="1.1"/><path d="M9.1 8.4h1.8v5.8H9.1z"/></svg>';
    el.appendChild(status);
  }

  if (r.chev) {
    const c = document.createElement('span');
    c.innerHTML = chev();
    el.appendChild(c.firstElementChild);
  }

  /* Una fila con id de pagina abre esa pagina; action llama a handleAction */
  let act = r.action;
  if (!act && r.id && PAGES[r.id]) act = 'open:' + r.id;

  if (act && act !== 'noop') {
    el.classList.add('tappable');
    el.onclick = () => {
      if (act.startsWith('open:')) openPage(act.slice(5));
      else handleAction(act, r);
    };
  } else if (r.chev) {
    el.onclick = () => toast('Esta opción no hace nada en la simulación');
  }

  /* efecto de pulsacion */
  el.addEventListener('pointerdown', () => el.classList.add('press'));
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev =>
    el.addEventListener(ev, () => el.classList.remove('press')));

  return el;
}

function buildBody(body, iconMode = 'flat') {
  const frag = document.createDocumentFragment();
  body.forEach(item => {
    if (item.t === 'group') {
      if (item.header) {
        const h = document.createElement('div');
        h.className = 'group-head';
        h.textContent = item.header;
        frag.appendChild(h);
      }
      const card = document.createElement('div');
      card.className = 'group';
      item.rows.forEach(r => card.appendChild(buildRow(r, iconMode)));
      frag.appendChild(card);
    }
    else if (item.t === 'note') {
      const n = document.createElement('div');
      n.className = 'note' + (item.className ? ' ' + item.className : '');
      n.textContent = item.text;
      frag.appendChild(n);
    }
    else if (item.t === 'status') {
      /* Bloque de estado centrado (p. ej. version de iPadOS y "esta actualizado") */
      const s = document.createElement('div');
      s.className = 'status-block';
      const t1 = document.createElement('div');
      t1.className = 'status-title';
      t1.textContent = item.title || '';
      const t2 = document.createElement('div');
      t2.className = 'status-sub';
      t2.textContent = item.text || '';
      s.append(t1, t2);
      frag.appendChild(s);
    }
    else if (item.t === 'banner') {
      const b = document.createElement('div');
      b.className = 'warn';
      b.style.background = hexA(item.color, .12);
      b.style.color = item.color;
      b.innerHTML = `<b>${item.title}</b>${item.text}`;
      frag.appendChild(b);
    }
    else if (item.t === 'chart') {
      const c = document.createElement('div');
      c.className = 'chart';
      item.bars.forEach(b => {
        const bar = document.createElement('div');
        bar.className = 'bar ' + (b.cls || '');
        bar.style.height = b.v + '%';
        c.appendChild(bar);
      });
      frag.appendChild(c);
    }
    else if (item.t === 'seg') {
      const wrap = document.createElement('div');
      wrap.className = 'row center';
      const seg = document.createElement('div');
      seg.className = 'segmented';
      item.options.forEach((o, i) => {
        const b = document.createElement('button');
        b.textContent = o;
        if (i === item.active) b.classList.add('on');
        b.onclick = () => {
          $$('button', seg).forEach(x => x.classList.remove('on'));
          b.classList.add('on');
        };
        seg.appendChild(b);
      });
      wrap.appendChild(seg);
      frag.appendChild(wrap);
    }
  });
  return frag;
}

function hexA(hex, a) {
  if (!hex) return 'rgba(0,0,0,.1)';
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

/* --------------------------- PAGINAS ------------------------------- */
function pageEl(id) {
  const p = PAGES[id];
  const el = document.createElement('div');
  el.className = 'page page-' + id;
  el.dataset.id = id;

  /* Cabecera: titulo centrado + descripcion (diseno real iPadOS 18) */
  const head = document.createElement('div');
  head.className = 'page-head';
  const isRootPage = state.stack.length === 1;
  if (isRootPage) el.classList.add('root-page');
  if (isRootPage) {
    const section = SIDEBAR.flatMap(group => group.rows).find(row => row.id === id);
    const mark = document.createElement('div');
    mark.className = 'root-icon';
    if (section) {
      mark.innerHTML = iconHeroSVG(section.icon, 56);
      head.appendChild(mark);
    }
  }
  const ttl = document.createElement('div');
  ttl.className = 'page-title';
  ttl.textContent = p.title;
  head.appendChild(ttl);

  /* Barra superior fija (sticky): fondo difuminado + titulo pequeno.
     Es el destino del titulo grande cuando se hace scroll. */
  const nav = document.createElement('div');
  nav.className = 'page-nav';
  const navBg = document.createElement('div');
  navBg.className = 'page-nav-bg';
  const navTitle = document.createElement('div');
  navTitle.className = 'page-nav-title';
  navTitle.textContent = p.title;
  nav.append(navBg, navTitle);
  el.appendChild(nav);

  if (p.desc) {    const d = document.createElement('div');
    d.className = 'page-desc';
    if (id === 'wifi' && p.desc.endsWith('Más información...')) {
      d.innerHTML = `${p.desc.slice(0, -'Más información...'.length)}<span class="inline-link">Más información...</span>`;
    } else {
      d.textContent = p.desc;
    }
    head.appendChild(d);
  }
  if (id === 'wifi' && isRootPage) {
    const action = document.createElement('button');
    action.className = 'page-action';
    action.textContent = 'Editar';
    head.appendChild(action);
  }
  el.appendChild(head);

  if (p.rows) {
    const card = document.createElement('div');
    card.className = 'group';
    p.rows.forEach(r => card.appendChild(buildRow(r)));
    el.appendChild(card);
  }
  if (p.body) {
    const generalIconMode = r => 'tile';
    el.appendChild(buildBody(p.body, id === 'general' ? generalIconMode : id === 'accessibility' ? 'tile' : 'flat'));
  }
  return el;
}

let currentPage = null;

/* --- Titulo grande -> titulo pequeno, ligado al scroll ---
   El titulo grande vive dentro del scroller, asi que sube solo con el
   contenido. Encima se escala hasta el tamano del titulo de la barra
   (25 px -> 17 px) y, cuando su centro llega al centro de la barra, se
   cruza con el titulo pequeno (ya en la misma posicion y tamano), de modo
   que el cambio no se nota. Todo se calcula desde scrollTop: nada de
   temporizadores. */
const NAV_H = 44;
const TITLE_SMALL = 17;

function setupTitleAnimation(page) {
  const title = page.querySelector('.page-title');
  const navTitle = page.querySelector('.page-nav-title');
  const navBg = page.querySelector('.page-nav-bg');
  if (!title || !navTitle) return;

  let range = 0;
  let minScale = 0.68;
  let measured = false;

  const measure = () => {
    const center = title.offsetTop + title.offsetHeight / 2;
    const fs = parseFloat(getComputedStyle(title).fontSize) || 25;
    minScale = Math.min(1, Math.max(0.45, TITLE_SMALL / fs));
    range = Math.max(40, center - NAV_H / 2);
    measured = true;
  };

  let ticking = false;
  const update = () => {
    ticking = false;
    if (!measured) measure();
    if (!range) return;
    const maxY = page.scrollHeight - page.clientHeight;
    const y = Math.max(0, Math.min(page.scrollTop, Math.max(0, maxY)));
    const p = maxY <= 2 ? 0 : Math.min(1, y / range);
    const scale = 1 - (1 - minScale) * p;
    /* Se encoge sobre su propio centro: al final mide 17 px y esta justo
       en el centro de la barra, igual que el titulo pequeno. */
    title.style.transform = `scale(${scale.toFixed(4)})`;
    title.style.opacity = String(Math.min(1, Math.max(0, (1 - p) / 0.14)));
    navTitle.style.opacity = String(Math.min(1, Math.max(0, (p - 0.86) / 0.14)));
    navBg.style.opacity = String(Math.min(1, Math.max(0, (p - 0.6) / 0.38)));
  };
  page.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
  window.addEventListener('resize', () => { measured = false; measure(); update(); });
  /* La primera medida necesita el layout ya hecho. */
  requestAnimationFrame(() => { measure(); update(); });
}

function updateBackButton() {
  const button = $('#page-back');
  if (!button) return;
  const currentId = state.stack[state.stack.length - 1] || 'general';
  button.hidden = state.stack.length < 2 && currentId === 'general';
}

function openPage(id, opts = {}) {
  if (!PAGES[id]) return;
  const host = $('#pages');
  const old = currentPage;

  if (old && !opts.replace) {
    old.classList.remove('under');
    old.classList.add('under');
  }
  /* La pila se actualiza ANTES de construir la pagina: pageEl() decide con
     ella si la pagina es de primer nivel (icono grande) o una subpagina. */
  if (!opts.replace) {
    state.stack.push(id);
  } else {
    state.stack[state.stack.length - 1] = id;
  }

  const el = pageEl(id);
  el.classList.add('entering');
  host.appendChild(el);
  currentPage = el;

  if (opts.replace) {
    if (old && old !== el) old.remove();
  }
  el.addEventListener('animationend', () => {
    el.classList.remove('entering');
    if (old && !opts.replace) old.remove();
  }, { once: true });

  /* La cabecera se transforma en titulo pequeno al hacer scroll (todas). */
  setupTitleAnimation(el);

  buildSidebar();
  updateStatusbar();
  updateBackButton();
}

function goBack() {
  if (state.stack.length < 2) {
    if (state.stack[0] === 'general') return;
    state.stack = ['general'];
    openPage('general', { replace: true });
    return;
  }
  const host = $('#pages');
  const cur = currentPage;
  const prevId = state.stack[state.stack.length - 2];
  state.stack.pop();

  const prev = pageEl(prevId);
  prev.classList.add('under');
  host.appendChild(prev);
  setupTitleAnimation(prev);
  cur.classList.add('leaving');
  cur.addEventListener('animationend', () => {
    cur.remove();
    prev.classList.remove('under');
  }, { once: true });
  currentPage = prev;
  buildSidebar();
  updateStatusbar();
  updateBackButton();
}

/* --------------------------- ACCIONES ------------------------------- */
function handleAction(action, row) {
  switch (action) {
    case 'airdrop-todos':
      showSheet({
        title:'Todos durante 10 minutos',
        body:'Todos los dispositivos cercanos podrán verte durante los próximos 10 minutos.',
        cancel:'Cancelar', ok:'Aceptar',
        onOk: () => toast('AirDrop: todos durante 10 minutos')
      });
      break;
    case 'airdrop-contactos':
      toast('AirDrop: solo contactos');
      break;
    case 'reset':
      showSheet({
        title:'¿Borrar todos los contenidos y ajustes?',
        body:'Se borrarán todos los datos del iPad, incluidos Apple Pay y las contraseñas guardadas. Esta acción no se puede deshacer.',
        cancel:'Cancelar', ok:'Borrar todo', destructive:true,
        onOk: () => toast('Simulación: no se borra nada')
      });
      break;
    case 'certificates':
      openPage('certificates');
      break;
    case 'shutdown':
      showSheet({
        title:'¿Apagar el iPad?',
        body:'El iPad se apagará. Si hay datos sin guardar, se perderán.',
        cancel:'Cancelar', ok:'Apagar', destructive:true,
        onOk: () => toast('Simulación: el iPad no se apaga')
      });
      break;
    case 'applecare':
      openPage('applecare');
      break;
    case 'restrictions':
      openPage('restrictions');
      break;
    default:
      toast('Esta opción no hace nada en la simulación');
  }
}

/* -------------------------- COLUMNA LATERAL ------------------------ */
function makeSideRow(r) {
  const el = document.createElement('button');
  el.className = 'side-row';
  el.dataset.id = r.id;
  el.innerHTML =
    '<span class="ico">' + iconSVG(r.icon) + '</span>' +
    `<span class="lbl">${r.label}</span>` +
    (r.value ? `<span class="val">${r.value}</span>` : '');
  el.onclick = () => {
    if (state.stack.length === 1 && state.stack[0] === r.id) return;
    state.stack = [r.id];
    openPage(r.id, { replace: true });
  };
  el.addEventListener('pointerdown', () => el.classList.add('press'));
  ['pointerup','pointercancel','pointerleave'].forEach(ev =>
    el.addEventListener(ev, () => el.classList.remove('press')));
  return el;
}

function buildSidebar() {
  const nav = $('#side-list');
  nav.innerHTML = '';
  const sel = state.stack[0];

  SIDEBAR.forEach(sec => {
    const g = document.createElement('div');
    g.className = 'side-group';
    let card = null;
    sec.rows.forEach(r => {
      const el = makeSideRow(r);
      if (r.id === sel) {
        card = null;                       /* la seleccionada va suelta */
        el.classList.add('selected');
        g.appendChild(el);
      } else {
        if (!card) {
          card = document.createElement('div');
          card.className = 'side-card';
          g.appendChild(card);
        }
        card.appendChild(el);
      }
    });
    nav.appendChild(g);
  });
  if (state.search) filterSidebar();
}

/* ---------------------------- BUSCADOR ------------------------------ */
function setupSearch() {
  const input = $('#search');
  const bar = $('#searchbar');
  const cancelBtn = $('#search-cancel');

  input.addEventListener('focus', () => {
    bar.classList.add('searching');
    cancelBtn.hidden = false;
    showSearchView('');
  });

  input.addEventListener('input', () => {
    state.search = input.value.trim();
    bar.classList.toggle('has-text', !!state.search);
    filterSidebar();
  });

  cancelBtn.onclick = () => {
    input.value = '';
    state.search = '';
    bar.classList.remove('has-text', 'searching');
    cancelBtn.hidden = true;
    clearSearchView();
    filterSidebar();
    input.blur();
  };
}

function filterSidebar() {
  const q = state.search.toLowerCase();
  const results = [];
  $$('.side-row').forEach(el => {
    const txt = el.textContent.toLowerCase();
    const hit = !q || txt.includes(q);
    el.style.display = hit ? '' : 'none';
  });
  $$('.side-group').forEach(g => {
    const rows = [...g.querySelectorAll('.side-row')];
    g.style.display = rows.some(r => r.style.display !== 'none') ? '' : 'none';
  });

  if (!q) {
    clearSearchView();
    return;
  }

  /* Build search results: Suggestions + Recents + Matches */
  Object.keys(PAGES).forEach(id => {
    const p = PAGES[id];
    if (id.toLowerCase().includes(q) || p.title.toLowerCase().includes(q)) results.push(id);
  });
  showSearchView(q, results);
}

function clearSearchView() {
  const old = document.getElementById('search-view');
  if (old) old.remove();
  $$('.side-row').forEach(el => el.style.display = '');
  $$('.side-group').forEach(g => g.style.display = '');
}

function showSearchView(query, results = []) {
  clearSearchView();
  const nav = $('#side-list');

  const view = document.createElement('div');
  view.id = 'search-view';
  view.className = 'search-view';

  /* SUGERENCIAS */
  const suggestions = [
    'General', 'Información', 'Almacenamiento', 'Wi-Fi', 'Bluetooth',
    'Batería', 'Accesibilidad', 'Privacidad y seguridad', 'AirDrop'
  ].filter(s => s.toLowerCase().includes(query));

  if (suggestions.length) {
    const group = document.createElement('div');
    group.className = 'search-group';
    const header = document.createElement('div');
    header.className = 'search-group-header';
    header.textContent = 'SUGERENCIAS';
    group.appendChild(header);

    suggestions.forEach(s => {
      const pageId = Object.keys(PAGES).find(k => PAGES[k].title === s);
      if (!pageId) return;
      const row = document.createElement('button');
      row.className = 'search-row';
      row.innerHTML = `<span class="lbl">${s}</span>`;
      row.onclick = () => {
        clearSearchView();
        $('#search').value = '';
        state.search = '';
        $('#searchbar').classList.remove('has-text', 'searching');
        $('#search-cancel').hidden = true;
        $('#search').blur();
        state.stack = [pageId];
        openPage(pageId, { replace: true });
      };
      group.appendChild(row);
    });
    view.appendChild(group);
  }

  /* RECENTES (último usado en esta sesión) */
  const recents = ['Privacidad y seguridad', 'Transferir o restablecer el iPad', 'General', 'Accesibilidad', 'Informe de privacidad de las apps', 'Análisis y mejoras', 'Modo de aislamiento']
    .filter(s => s.toLowerCase().includes(query))
    .filter(s => Object.keys(PAGES).some(k => PAGES[k].title === s));

  if (recents.length) {
    const group = document.createElement('div');
    group.className = 'search-group';
    const header = document.createElement('div');
    header.className = 'search-group-header';
    header.textContent = 'RECIENTES';
    group.appendChild(header);

    recents.forEach(s => {
      const pageId = Object.keys(PAGES).find(k => PAGES[k].title === s);
      if (!pageId) return;
      const row = document.createElement('button');
      row.className = 'search-row';
      row.innerHTML = `<span class="lbl">${s}</span><span class="recent-badge">Reciente</span>`;
      row.onclick = () => {
        clearSearchView();
        $('#search').value = '';
        state.search = '';
        $('#searchbar').classList.remove('has-text', 'searching');
        $('#search-cancel').hidden = true;
        $('#search').blur();
        state.stack = [pageId];
        openPage(pageId, { replace: true });
      };
      group.appendChild(row);
    });
    view.appendChild(group);
  }

  /* RESULTADOS DE COINCIDENCIA */
  if (results.length) {
    const group = document.createElement('div');
    group.className = 'search-group';
    const header = document.createElement('div');
    header.className = 'search-group-header';
    header.textContent = 'ENCONTRADOS';
    group.appendChild(header);

    results.forEach(id => {
      const p = PAGES[id];
      const row = document.createElement('button');
      row.className = 'search-row';
      const icon = (SIDEBAR.flatMap(s => s.rows).find(x => x.id === id) || {}).icon;
      row.innerHTML = `<span class="ico">${icon ? iconSVG(icon) : ''}</span><span class="lbl">${p.title}</span>`;
      row.onclick = () => {
        clearSearchView();
        $('#search').value = '';
        state.search = '';
        $('#searchbar').classList.remove('has-text', 'searching');
        $('#search-cancel').hidden = true;
        $('#search').blur();
        state.stack = [id];
        openPage(id, { replace: true });
      };
      group.appendChild(row);
    });
    view.appendChild(group);
  }

  nav.appendChild(view);
}

/* --------------------------- BARRA ESTADO --------------------------- */
const DIAS  = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

function updateStatusbar() {
  // Status bar removed per user request
}

/* ------------------------------ TEMA -------------------------------- */
function setTheme(t) {
  state.theme = t;
  document.documentElement.dataset.theme = t;
  saveState();
}

/* ---------------------------- ARRANQUE ------------------------------ */
function boot() {
  document.documentElement.dataset.theme = state.theme;
  buildSidebar();
  setupSearch();
  updateStatusbar();
  $('#page-back').onclick = () => goBack();
  setInterval(updateStatusbar, 30000);
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    /* Si se publica una version nueva, el service worker toma el control y
       se recarga una sola vez para que se vean los iconos/estilos nuevos. */
    const hadController = !!navigator.serviceWorker.controller;
    let reloaded = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadController || reloaded) return;
      reloaded = true;
      location.reload();
    });
    navigator.serviceWorker.register('./sw.js')
      .then(reg => reg.update().catch(() => {}))
      .catch(() => {});
  }

  state.stack = ['general'];
  openPage('general', { replace: true });
  const p = currentPage;
  p.classList.remove('entering');

  /* navegacion por teclado */
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') goBack();
  });
}

document.addEventListener('DOMContentLoaded', boot);
