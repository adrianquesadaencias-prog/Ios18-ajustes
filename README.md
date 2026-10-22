# Ajustes · Réplica de iPadOS 18

Réplica visual de la app **Ajustes** de iPadOS 18 (iPad Pro / iPad 7ª gen), instalable como
aplicación en el iPad y con los **datos reales del dispositivo** copiados por USB.

```
C:\Users\adria\Desktop\iPadOS-Settings-18\
├─ index.html              estructura + sprite de 92 iconos Bootstrap Icons
├─ styles.css              tokens iOS, sidebar translúcido, switch, slider, hojas, animaciones
├─ data.js                 CATÁLOGO de las ~85 páginas (Ajustes, General, Privacidad, ...)
├─ app.js                  motor: navegación push/pop, estado, modales, gráficos, tema
├─ device.js               DATOS REALES del iPad (generado, no editar a mano)
├─ manifest.webmanifest    PWA instalable
├─ sw.js                   service worker (offline)
├─ servidor.bat            levanta el servidor local para el iPad
├─ icon-*.png              iconos de la app
├─ tools\
│  ├─ ipad_extract.py      extrae identidad + restricciones del iPad por USB
│  ├─ build.py             genera el sprite de iconos y los PNG
│  ├─ fix_mojibake.py      repara archivos con doble codificación
│  ├─ test_app.js          prueba con Playwright + capturas
│  └─ out\                 volcados crudos (lockdown/profiles JSON)
└─ shots\                  capturas de la prueba automática
```

## Arrancar en el PC

```bat
servidor.bat
```

Abre <http://localhost:8000> en el PC y en el iPad <http://192.168.1.72:8000>
(el iPad y el PC deben estar en la misma Wi-Fi).

## Instalar en el iPad (como app)

1. Safari → `http://192.168.1.72:8000`
2. Compartir → **Añadir a pantalla de inicio**
3. Se abre a pantalla completa, sin barra de Safari, y funciona sin conexión
   (el service worker cachea los archivos).

## Datos reales del iPad

`device.js` se genera con:

```bat
python tools\ipad_extract.py
```

Extrae del iPad conectado por USB (desbloqueado y emparejado):

| Dato | De dónde sale |
|---|---|
| Nombre, nº de serie, UDID, ECID | dominio raíz de lockdown |
| Modelo (iPad7,11), nº de modelo (MW772) | lockdown `ProductType` / `ModelNumber` |
| iPadOS y compilación | `ProductVersion` / `BuildVersion` |
| Capacidad, espacio usado/libre | dominio `com.apple.disk_usage` |
| MAC de Wi-Fi y Bluetooth | lockdown |
| MLB, nº de serie de placa, firmware iBoot | lockdown |
| **Restricciones / MDM** | servicio `MobileConfig` → payload `com.apple.applicationaccess` |

Si el iPad está **supervisado** (perfil MDM instalado), la app muestra en
**Restricciones** la lista exacta de restricciones con los interruptores
**bloqueados**, igual que en iOS, y en **VPN y gestión de dispositivos** el
perfil instalado y la organización que lo gestiona.

## Personalizar

- `data.js` → contenido de cada página (títulos, filas, interruptores, sliders).
- `styles.css` → colores y medidas.
- Los cambios de los interruptores se guardan en el `localStorage` del navegador
  (`ipad18-settings-v1`) y no tocan ningún dispositivo real.

## Pruebas

```bat
node tools\test_app.js
```

Abre la app en un viewport de iPad (1194×834 @2x), comprueba que aparecen los
datos reales, navega por varias secciones y deja capturas en `shots\`.
Requiere Chromium en `D:\playwright-browsers`.
