/* Service worker: cachea la app para que funcione sin conexion en el iPad.
   La lista de recursos locales (assets.js) se genera con tools/gen_assets.js:
   si se anade o se quita un icono, hay que regenerarla. */
const CACHE = 'ajustes-ipados-18-v9';
/* Lista generada por tools/gen_assets.js (no editar a mano) */
const ASSETS = [
  './', './index.html', './styles.css', './data.js', './app.js',
  './device.js', './icons.js', './manifest.webmanifest', './icon-180.png', './icon-512.png',
  './icon-maskable-512.png', './icons-real/accessibility.png?v=8', './icons-real/airdrop.png?v=8', './icons-real/airplane.png?v=8', './icons-real/airplay.png?v=8',
  './icons-real/applecare.png?v=8', './icons-real/audiodesc.png?v=8', './icons-real/autofill.png?v=8', './icons-real/backgroundupdate.png?v=8', './icons-real/battery-hero.png?v=8',
  './icons-real/battery.png?v=8', './icons-real/bluetooth-hero.png?v=8', './icons-real/bluetooth.png?v=8', './icons-real/bluetooth_off.png?v=8', './icons-real/bluetooth_on.png?v=8',
  './icons-real/camera.png?v=8', './icons-real/controlcenter.png?v=8', './icons-real/datetime.png?v=8', './icons-real/dictionary.png?v=8', './icons-real/display.png?v=8',
  './icons-real/floatingtext.png?v=8', './icons-real/focus.png?v=8', './icons-real/fonts.png?v=8', './icons-real/gamecenter.png?v=8', './icons-real/gamepad.png?v=8',
  './icons-real/general-hero.png?v=8', './icons-real/general.png?v=8', './icons-real/homebutton.png?v=8', './icons-real/homescreen.png?v=8', './icons-real/icloud.png?v=8',
  './icons-real/info.png?v=8', './icons-real/keyboard.png?v=8', './icons-real/language.png?v=8', './icons-real/legal.png?v=8', './icons-real/motion.png?v=8',
  './icons-real/multitask.png?v=8', './icons-real/notifications.png?v=8', './icons-real/pencil.png?v=8', './icons-real/privacy.png?v=8', './icons-real/readcontent.png?v=8',
  './icons-real/screentime.png?v=8', './icons-real/search.png?v=8', './icons-real/shutdown.png?v=8', './icons-real/siri.png?v=8', './icons-real/softwareupdate.png?v=8',
  './icons-real/sounds.png?v=8', './icons-real/storage.png?v=8', './icons-real/switchcontrol.png?v=8', './icons-real/textsize.png?v=8', './icons-real/touch.png?v=8',
  './icons-real/touchid.png?v=8', './icons-real/transfer.png?v=8', './icons-real/tvprovider.png?v=8', './icons-real/voicecontrol.png?v=8', './icons-real/voiceover.png?v=8',
  './icons-real/vpn.png?v=8', './icons-real/wallet.png?v=8', './icons-real/wallpaper.png?v=8', './icons-real/wifi-hero.png?v=8', './icons-real/wifi.png?v=8',
  './icons-real/wifi_off.png?v=8', './icons-real/wifi_on.png?v=8', './icons-real/zoom.png?v=8',
];

/* Instalacion tolerante: si un recurso falla (404, red), no se cae todo el
   service worker; se cachea el resto y la app sigue funcionando. */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(ASSETS.map(url => c.add(url).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Red primero para el HTML/JS/CSS (asi se ven los cambios al recargar),
   cache primero para los iconos y el resto. */
const NETWORK_FIRST = /\.(?:html|js|css|webmanifest)$|\/$/;

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  if (NETWORK_FIRST.test(url.pathname)) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(hit =>
      hit || fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match('./index.html'))
    )
  );
});
