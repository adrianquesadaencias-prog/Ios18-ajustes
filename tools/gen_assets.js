/**
 * Regenera la lista de recursos que precarga el service worker (sw.js).
 * Incluye el shell de la app y TODOS los archivos de icons-real/ que existan,
 * asi la cache offline nunca referencia un archivo inexistente (lo que hacia
 * fallar la instalacion del service worker y dejaba la app sin cache).
 *
 * Uso:  node tools/gen_assets.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SW = path.join(ROOT, 'sw.js');
const SHELL = ['./', './index.html', './styles.css', './data.js', './app.js', './device.js',
  './icons.js', './manifest.webmanifest', './icon-180.png', './icon-512.png', './icon-maskable-512.png'];

/* La version la manda icons.js (const ICON_VER = 'N'): las URLs de los PNG
   llevan ?v=N para saltarse la cache de Safari. Aqui se usa la misma, si no
   la precarga del service worker apuntaria a otras URLs. */
let iconVer = '';
try {
  const m = /const ICON_VER\s*=\s*'([^']+)'/.exec(fs.readFileSync(path.join(ROOT, 'icons.js'), 'utf8'));
  if (m) iconVer = '?v=' + m[1];
} catch (e) {
  console.warn('aviso: no pude leer ICON_VER de icons.js');
}

const icons = fs.readdirSync(path.join(ROOT, 'icons-real'))
  .filter(f => f.endsWith('.png'))
  .sort()
  .map(f => './icons-real/' + f + iconVer);

const all = [...SHELL, ...icons];
const lines = [];
for (let i = 0; i < all.length; i += 5) {
  lines.push('  ' + all.slice(i, i + 5).map(u => `'${u}'`).join(', ') + ',');
}
const block = 'const ASSETS = [\n' + lines.join('\n') + '\n];';

let src = fs.readFileSync(SW, 'utf8');
if (!/const ASSETS = \[[\s\S]*?\];/.test(src)) {
  console.error('No encuentro el bloque "const ASSETS = [...];" en sw.js');
  process.exit(1);
}
src = src.replace(/const ASSETS = \[[\s\S]*?\];/, block);
fs.writeFileSync(SW, src);
console.log(`sw.js: ${all.length} recursos (${icons.length} iconos de icons-real/)`);
