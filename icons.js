/* =====================================================================
   icons.js - Iconos estilo iPadOS 18 (mosaico squircle + glifo blanco)
   ---------------------------------------------------------------------
   Cada icono: pastilla con degradado + glifo blanco centrado.
   viewBox 0 0 60 60.  Los glifos se dibujan en una rejilla de 24x24
   y se centran con translate(18,18).
   ===================================================================== */

const SQUIRCLE =
  'M30 0C45 0 60 0 60 30S45 60 30 60 0 60 0 30 15 0 30 0Z';

/* Colores planos del sistema (iPadOS 18). El mosaico es de color plano. */
const GRADS = {
  blue:    ['#007AFF', '#007AFF'],
  indigo:  ['#5856D6', '#5856D6'],
  purple:  ['#AF52DE', '#AF52DE'],
  pink:    ['#FF2D55', '#FF2D55'],
  red:     ['#FF3B30', '#FF3B30'],
  orange:  ['#FF9500', '#FF9500'],
  yellow:  ['#FFCC00', '#FFCC00'],
  green:   ['#34C759', '#34C759'],
  teal:    ['#5AC8FA', '#5AC8FA'],
  gray:    ['#8E8E93', '#8E8E93'],
  dark:    ['#3A3A3C', '#3A3A3C'],
  black:   ['#000000', '#000000'],
  appler:  ['#CF1F2B', '#CF1F2B'],
  /* Colores MDM */
  mdm_blue:  ['#007AFF', '#007AFF'],
  mdm_green: ['#34C759', '#34C759'],
  mdm_orange: ['#FF9500', '#FF9500'],
  mdm_red:   ['#FF3B30', '#FF3B30'],
  mdm_purple: ['#AF52DE', '#AF52DE'],
  mdm_gray:  ['#8E8E93', '#8E8E93'],
  multigrad: null
};

/* Color plano equivalente para los glifos sin mosaico (panel de detalle) */
const FLAT = {
  blue:'#007AFF', indigo:'#5856D6', purple:'#AF52DE', pink:'#FF2D55',
  red:'#FF3B30', orange:'#FF9500', yellow:'#FFCC00', green:'#34C759',
  teal:'#5AC8FA', gray:'#8E8E93', dark:'#3A3A3C', black:'#000000',
  appler:'#CF1F2B'
};

/* Glifos (rejilla 24x24, trazo blanco) */
const GLYPH = {
  /* --- Barra de estado / sistema --- */
  airplane:
    '<path d="M12 2.2c.83 0 1.5.67 1.5 1.5v4.66l7.9 4.63v2.2l-7.9-2.5v4.24l2.6 1.93v1.6L12 19.5l-4.1.96v-1.6l2.6-1.93v-4.24l-7.9 2.5v-2.2l7.9-4.63V3.7c0-.83.67-1.5 1.5-1.5Z"/>',
  wifi:
    '<path d="M12 19.3a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Z"/>' +
    '<path d="M12 12.6c1.5 0 2.9.6 3.9 1.6l-1.5 1.5a3.7 3.7 0 0 0-4.8 0l-1.5-1.5a5.5 5.5 0 0 1 3.9-1.6Z"/>' +
    '<path d="M12 8.2c2.9 0 5.5 1.2 7.4 3.1l-1.5 1.5a8.2 8.2 0 0 0-11.8 0L4.6 11.3A10.3 10.3 0 0 1 12 8.2Z"/>' +
    '<path d="M12 3.8c4.3 0 8.2 1.7 11.1 4.6L21.6 6.9A14.2 14.2 0 0 0 12 1.4 14.2 14.2 0 0 0 2.4 6.9l1.5 1.5A12.3 12.3 0 0 1 12 3.8Z"/>',
  bluetooth:
    '<path d="M11.2 2.4 6.6 6.7l3.3 3.2-3.3 3.3 4.6 4.3V2.4Zm1.6 3.5v4.5l2.2-2.2-2.2-2.3Zm0 8.2v4.4l2.2-2.3-2.2-2.1Z"/>',
  battery:
    '<path d="M9 3.4h6a1.4 1.4 0 0 1 1.4 1.4v1.1h1.3A1.4 1.4 0 0 1 19.1 7.3v9.4a1.4 1.4 0 0 1-1.4 1.4h-1.3v1.1a1.4 1.4 0 0 1-1.4 1.4H9a1.4 1.4 0 0 1-1.4-1.4v-1.1H6.3a1.4 1.4 0 0 1-1.4-1.4V7.3a1.4 1.4 0 0 1 1.4-1.4h1.3V4.8A1.4 1.4 0 0 1 9 3.4Zm-2.3 4.4v9.2h10.6V7.8H6.7Z" opacity=".95"/>' +
    '<path d="M8.6 9.6h6.8v6.2H8.6z"/>',
  gears:
    '<path d="M19.4 13a7.7 7.7 0 0 0 0-2l2-1.5-2-3.4-2.4 1a7.8 7.8 0 0 0-1.7-1L15 3.5h-4l-.4 2.6a7.8 7.8 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.5a7.7 7.7 0 0 0 0 2l-2 1.5 2 3.4 2.4-1a7.8 7.8 0 0 0 1.7 1l.4 2.6h4l.4-2.6a7.8 7.8 0 0 0 1.7-1l2.4 1 2-3.4-2.1-1.5ZM13 15.7a3.7 3.7 0 1 1 0-7.4 3.7 3.7 0 0 1 0 7.4Z"/>',
  accessibility:
    '<circle cx="12" cy="4.9" r="2.2"/><path d="M12 8.4c-2.3 0-4.2 1.3-4.2 3 0 .7.2 1.4.6 2l-2 4.2c-.3.7.1 1.4.8 1.6.6.2 1.2-.1 1.4-.7l1.3-2.8v3.2l-1.5 2.9c-.3.7.1 1.4.8 1.6.6.2 1.2-.1 1.4-.7l1.4-2.7 1.4 2.7c.3.6.8.9 1.4.7.7-.2 1.1-.9.8-1.6l-1.5-2.9v-3.2l1.3 2.8c.3.6.8.9 1.4.7.7-.2 1.1-.9.8-1.6l-2-4.2c.4-.6.6-1.3.6-2 0-1.7-1.9-3-4.2-3Z"/>',
  pencil:
    '<path d="M17.6 2.5c.9-.9 2.3-.9 3.2 0l.7.7c.9.9.9 2.3 0 3.2l-1.2 1.2-3.9-3.9 1.2-1.2ZM14.9 5.2l3.9 3.9-8.8 8.8-4.5.6.6-4.5 8.8-8.8Z"/>',
  camera:
    '<path d="M9.1 4.3h5.8c.5 0 1 .3 1.3.7l.6 1h2.4c1 0 1.8.8 1.8 1.8v9.1c0 1-.8 1.8-1.8 1.8H4.8c-1 0-1.8-.8-1.8-1.8V7.8c0-1 .8-1.8 1.8-1.8h2.4l.6-1c.3-.4.8-.7 1.3-.7Zm2.9 4.4a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 0 0 0-8.2Z"/>',
  controlcenter:
    '<rect x="3" y="4" width="7.2" height="16" rx="2.4"/><rect x="13.8" y="4" width="7.2" height="7.6" rx="2.4"/><rect x="13.8" y="14.4" width="7.2" height="5.6" rx="2.4"/>',
  wallpaper:
    '<rect x="2.6" y="4.4" width="18.8" height="15.2" rx="3"/><circle cx="8" cy="9.4" r="1.7"/><path d="M4 17.4 9.4 12l3.4 3.4 2.6-2.6 4.6 4.6v.2H4v-.2Z"/>',
  multitask:
    '<rect x="2.4" y="5" width="12" height="14" rx="2.6"/><path d="M17.6 8.2h2.2c.9 0 1.6.7 1.6 1.6v8.2c0 .9-.7 1.6-1.6 1.6h-2.2V8.2Z" opacity=".85"/>',
  homescreen:
    '<rect x="3" y="3" width="7.4" height="7.4" rx="2.2"/><rect x="13.6" y="3" width="7.4" height="7.4" rx="2.2"/><rect x="3" y="13.6" width="7.4" height="7.4" rx="2.2"/><rect x="13.6" y="13.6" width="7.4" height="7.4" rx="2.2"/>',
  display:
    '<circle cx="12" cy="12" r="4.4"/><path d="M12 1.6v3M12 19.4v3M1.6 12h3M19.4 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M19.4 4.6l-2.1 2.1M6.7 17.3l-2.1 2.1" stroke="#fff" stroke-width="1.9" stroke-linecap="round" fill="none"/>',
  siri:
    '<circle cx="12" cy="12" r="9.2" fill="url(#siriGrad)"/><circle cx="12" cy="12" r="9.2" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1"/>',
  notifications:
    '<path d="M12 2.6c-3.5 0-6.1 2.7-6.1 6.2v3.4L4 15.6c-.4.6 0 1.4.7 1.4h14.6c.7 0 1.1-.8.7-1.4l-1.9-3.4V8.8c0-3.5-2.6-6.2-6.1-6.2Zm2.7 15.2c-.4 1-1.4 1.7-2.7 1.7s-2.3-.7-2.7-1.7h5.4Z"/>',
  sounds:
    '<path d="M11.4 3.6 6.9 7.4H3.6c-.9 0-1.6.7-1.6 1.6v5.9c0 .9.7 1.6 1.6 1.6h3.3l4.5 3.8c.9.7 2.1 0 2.1-1.1V4.7c0-1.1-1.2-1.8-2.1-1.1Z"/>' +
    '<path d="M15.3 8.2a1 1 0 0 1 1.4.1 5.2 5.2 0 0 1 0 7.4 1 1 0 1 1-1.3-1.5 3.2 3.2 0 0 0 0-4.4 1 1 0 0 1-.1-1.6Z"/>' +
    '<path d="M17.9 5.2a1 1 0 0 1 1.4.2 9.4 9.4 0 0 1 0 12.8 1 1 0 1 1-1.5-1.3 7.4 7.4 0 0 0 0-10.2 1 1 0 0 1 .1-1.5Z"/>',
  focus:
    '<path d="M20.2 14.6A8.6 8.6 0 0 1 9.4 3.8 8.6 8.6 0 1 0 20.2 14.6Z"/>',
  screentime:
    '<path d="M6 3h12c.9 0 1.6.7 1.6 1.6v14.8c0 .9-.7 1.6-1.6 1.6H6c-.9 0-1.6-.7-1.6-1.6V4.6C4.4 3.7 5.1 3 6 3Zm2.6 2.6v1.9h6.8V5.6H8.6Zm0 4.6v1.9h6.8v-1.9H8.6Z"/>',
  touchid:
    '<path d="M12 2.6a9.4 9.4 0 0 0-3.3 18.2 1 1 0 0 0 .3-2 7.4 7.4 0 1 1 6 0 1 1 0 0 0 .3 2A9.4 9.4 0 0 0 12 2.6Z" opacity=".9"/>' +
    '<path d="M12 6.2a5.8 5.8 0 0 0-5.8 5.8v2.4" stroke="#fff" stroke-width="1.7" stroke-linecap="round" fill="none"/>' +
    '<path d="M12 8.2a3.8 3.8 0 0 0-3.8 3.8v4.4" stroke="#fff" stroke-width="1.7" stroke-linecap="round" fill="none"/>' +
    '<path d="M12 10.2a1.8 1.8 0 0 0-1.8 1.8v5.4" stroke="#fff" stroke-width="1.7" stroke-linecap="round" fill="none"/>' +
    '<path d="M15.8 8.6a5.7 5.7 0 0 1 1.6 4v2.2" stroke="#fff" stroke-width="1.7" stroke-linecap="round" fill="none"/>',
  privacy:
    '<path d="M12 2.2c.7 0 1.2.5 1.2 1.1v1.4h3.3c1 0 1.8.8 1.8 1.8v3.3h1.3c.6 0 1.1.5 1.1 1.1v6.2c0 3-2.4 5.4-5.4 5.4h-3.6c-3 0-5.4-2.4-5.4-5.4v-2.4c0-.6.5-1.1 1.1-1.1h1.1V6.5c0-1 .8-1.8 1.8-1.8h3.3V3.3c0-.6.5-1.1 1.2-1.1Zm-1.6 5.2c-.5 0-.9.4-.9.9v1.4h3V8.3c0-.5-.4-.9-.9-.9h-1.2Z"/>',
  wallet:
    '<path d="M4 6.4c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v1.2h-1.4a2.4 2.4 0 0 0 0 4.8H20v5.2c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6.4Zm13.4 4.2a1 1 0 0 0 0 2h2.2v-2h-2.2Z"/>',
  gamecenter:
    '<circle cx="8" cy="9" r="4.6"/><circle cx="16" cy="9" r="4.6" opacity=".85"/><circle cx="8" cy="16" r="4.6" opacity=".85"/><circle cx="16" cy="16" r="4.6" opacity=".7"/>',
  icloud:
    '<path d="M7.2 19.4h10.3a4.5 4.5 0 0 0 .4-9 5.9 5.9 0 0 0-11.2 1.4 3.9 3.9 0 0 0 .5 7.6Z"/>',
  info:
    '<rect x="7" y="2.7" width="10" height="18.6" rx="1.8" fill="none" stroke="#fff" stroke-width="1.8"/><path d="M10 4.7h4v.9h-4zM11.2 18.4h1.6v1h-1.6z"/>',
  softwareupdate:
    '<path d="M12 3.2a8.8 8.8 0 0 1 8.1 5.4l-1.8.8A6.8 6.8 0 0 0 5.2 12H3.2A8.8 8.8 0 0 1 12 3.2Zm-6.1 5.2 1.8.8A6.8 6.8 0 0 0 18.8 12h2A8.8 8.8 0 0 1 5.1 17.4l1.8-.8A6.8 6.8 0 0 0 18.8 12"/>' +
    '<path d="M4.2 7.6 3 11.6l4.2-.6-3-3.4Zm15.6 8.8 1.2-4 1.2 4-4.2.6 1.8-.6Z"/>',
  storage:
    '<path d="M4 6.2h16l1.5 3.2v7.8c0 1.1-.9 2-2 2h-15c-1.1 0-2-.9-2-2V9.4L4 6.2Z"/><path d="M2.8 10.2h18.4v2.1H2.8z" fill="#8E8E93"/><circle cx="17.5" cy="15.7" r="1" fill="#8E8E93"/>',
  applecare:
    '<path d="M15.9 12.4c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.6 2.3 2.8 2.2 1.1 0 1.6-.7 2.9-.7s1.7.7 2.9.7c1.2 0 2-1.1 2.7-2.2.9-1.2 1.2-2.4 1.2-2.5-.1 0-2.2-.9-2.2-3.4ZM13.5 5.3c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.8-.9 2.8 1 .1 2-.5 2.6-1.3Z"/>',
  airdrop:
    '<circle cx="12" cy="12" r="2.6"/><path d="M12 5.6a6.4 6.4 0 0 1 6.4 6.4h-2.2A4.2 4.2 0 0 0 12 7.8a4.2 4.2 0 0 0-4.2 4.2H5.6A6.4 6.4 0 0 1 12 5.6Z"/>' +
    '<path d="M12 2.2A9.8 9.8 0 0 1 21.8 12h-2.2A7.6 7.6 0 0 0 12 4.4 7.6 7.6 0 0 0 4.4 12H2.2A9.8 9.8 0 0 1 12 2.2Z"/>',
  airplay:
    '<path d="M4.4 3.6h15.2c1.1 0 2 .9 2 2v8.6c0 1.1-.9 2-2 2H4.4c-1.1 0-2-.9-2-2V5.6c0-1.1.9-2 2-2Z" opacity=".55"/>' +
    '<path d="m12 13.2 4.6 6.2H7.4l4.6-6.2Z"/>',
  backgroundupdate:
    '<path d="M12 3.4a8.6 8.6 0 0 1 7.9 5.2l-1.9.9A6.6 6.6 0 0 0 5.4 12H3.4A8.6 8.6 0 0 1 12 3.4Z"/>' +
    '<path d="M12 20.6a8.6 8.6 0 0 1-7.9-5.2l1.9-.9A6.6 6.6 0 0 0 18.6 12h2A8.6 8.6 0 0 1 12 20.6Z"/>' +
    '<path d="M17.4 2.6 20.8 4.2l-2.2 3.3.2-4.9Zm-10.8 18.8L3.2 19.8l2.2-3.3-.2 4.9Z"/>',
  autofill:
    '<circle cx="8" cy="12" r="4.4" fill="none" stroke="#fff" stroke-width="2"/>' +
    '<path d="M11.4 12h9.2v2.2h-4.2v7h-2.4v-7h-2.6V12Z"/>',
  dictionary:
    '<path d="M3 5.2c0-.8.6-1.4 1.4-1.4H10c1.2 0 2 .6 2 1.6v14c0-1-.8-1.6-2-1.6H4.4c-.8 0-1.4-.6-1.4-1.4V5.2Z" opacity=".65"/>' +
    '<path d="M21 5.2c0-.8-.6-1.4-1.4-1.4H14c-1.2 0-2 .6-2 1.6v14c0-1 .8-1.6 2-1.6h5.6c.8 0 1.4-.6 1.4-1.4V5.2Z"/>',
  datetime:
    '<circle cx="12" cy="12" r="9.3" fill="none" stroke="#fff" stroke-width="1.9"/><path d="M12 6.6V12l3.6 2.2" stroke="#fff" stroke-width="1.9" stroke-linecap="round" fill="none"/>',
  language:
    '<circle cx="12" cy="12" r="9.3" fill="none" stroke="#fff" stroke-width="1.8"/>' +
    '<path d="M2.9 12h18.2" stroke="#fff" stroke-width="1.8"/>' +
    '<path d="M12 2.7c2.3 2.6 3.5 6 3.5 9.3S14.3 18.7 12 21.3C9.7 18.7 8.5 15.3 8.5 12S9.7 5.3 12 2.7Z" stroke="#fff" stroke-width="1.8" fill="none"/>',
  gamepad:
    '<path d="M8.2 6.6h7.6c2.6 0 4.5 2.4 5 5.2l.4 2.2c.4 2.2-1.9 3.9-3.7 2.7l-2.2-1.5H8.7l-2.2 1.5c-1.8 1.2-4.1-.5-3.7-2.7l.4-2.2c.5-2.8 2.4-5.2 5-5.2Z" opacity=".9"/>' +
    '<path d="M6.6 9.6h1.8v1.6H10v1.7H8.4v1.6H6.6v-1.6H5v-1.7h1.6V9.6Z"/><circle cx="16.4" cy="10.6" r="1.1"/><circle cx="18.2" cy="12.6" r="1.1"/>',
  keyboard:
    '<rect x="1.8" y="5" width="20.4" height="14" rx="2.4" fill="none" stroke="#fff" stroke-width="1.8"/>' +
    '<path d="M5.2 8.2h1.6v1.6H5.2zm3.2 0h1.6v1.6H8.4zm3.2 0h1.6v1.6h-1.6zm3.2 0h1.6v1.6h-1.6zm3.2 0h1.6v1.6H18zM5.2 11.4h1.6V13H5.2zm3.2 0h1.6V13H8.4zm3.2 0h1.6V13h-1.6zm3.2 0h1.6V13h-1.6zm3.2 0h1.6V13H18zM6.6 14.6h10.8v1.5H6.6z" />',
  fonts:
    '<path d="M4.4 19.6 10 4.4h1.8l5.6 15.2h-2.4l-1.5-4.2H8.1l-1.5 4.2H4.4Zm4.3-6.2h4.4L10.8 6.4 8.7 13.4Z"/>' +
    '<path d="M17.2 19.6V13h-1.5v-1.2h1.5V8.6a1.8 1.8 0 0 1 1.8-1.8h1.4v1.3h-1c-.6 0-.9.3-.9.9v2.8h1.9V13h-1.9v6.6h-1.3Z"/>',
  tvprovider:
    '<rect x="2.4" y="4.4" width="19.2" height="12.6" rx="2.2"/><path d="M8 20.2h8l-1.2-2H9.2l-1.2 2Z"/>',
  vpn:
    '<path d="M12 2.4 20 5.6v6.1c0 4.7-3.2 8.9-8 10.1-4.8-1.2-8-5.4-8-10.1V5.6l8-3.2Z" opacity=".55"/>' +
    '<path d="M10.6 9.4h2.8v3.1h1.5a.9.9 0 0 1 .9.9v3.4a.9.9 0 0 1-.9.9H9.1a.9.9 0 0 1-.9-.9v-3.4a.9.9 0 0 1 .9-.9h1.5V9.4Zm.7-2.2a.7.7 0 0 1 1.4 0v1.6h-1.4V7.2Z"/>',
  legal:
    '<path d="M5.6 2.8h8.6l4.2 4.2v14.2H5.6V2.8Zm7.6 1.6v3.2h3.2l-3.2-3.2Z" opacity=".65"/>' +
    '<path d="M8 10.4h8v1.5H8v-1.5Zm0 3.4h8v1.5H8v-1.5Zm0 3.4h5.2v1.5H8v-1.5Z"/>',
  transfer:
    '<path d="M12 3.6a8.4 8.4 0 0 1 7.8 5.2l-1.9.9A6.4 6.4 0 0 0 5.6 12H3.6A8.4 8.4 0 0 1 12 3.6Z"/>' +
    '<path d="M12 20.4a8.4 8.4 0 0 1-7.8-5.2l1.9-.9A6.4 6.4 0 0 0 18.4 12h2a8.4 8.4 0 0 1-8.4 8.4Z"/>' +
    '<path d="M17.6 1.8 21.2 3.6l-2.4 3.6.4-5.4ZM6.4 22.2 2.8 20.4l2.4-3.6-.4 5.4Z"/>',
  certificates:
    '<path d="M12 1.8 14.3 4l3.3-.2.5 3.2 2.4 2.1-1.6 2.9 1.6 2.9-2.4 2.1-.5 3.2-3.3-.2L12 21.3l-2.3-2.2-3.3.2-.5-3.2-2.4-2.1L5.1 11l-1.6-2.9 2.4-2.1.5-3.2L9.7 4 12 1.8Z" opacity=".75"/>' +
    '<path d="m10.9 14.4-2.6-2.6 1.3-1.3 1.3 1.3 3.5-3.5 1.3 1.3-4.8 4.8Z"/>',
  magnifier:
    '<path d="M10.4 2.6a7.8 7.8 0 1 1 0 15.6 7.8 7.8 0 0 1 0-15.6Zm0 1.8a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z"/>' +
    '<path d="m16.1 16.1 1.3 1.3 4.1-4.1-1.3-1.3-4.1 4.1Z"/>',
  chevron:
    '<path d="M8.6 4.4 15.2 12l-6.6 7.6 1.7 1.6 8.2-9.2-8.2-9.2L8.6 4.4Z"/>',
  /* Iconos MDM / VPN añadidos */
  profile:
    '<circle cx="12" cy="8.5" r="3.8" fill="none" stroke="#fff" stroke-width="1.8"/>' +
    '<path d="M12 17.5c-4.2 0-7.5 3.3-7.5 7.5h15c0-4.2-3.3-7.5-7.5-7.5Z" stroke="#fff" stroke-width="1.8" fill="none"/>',
  apps:
    '<rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/>',
  book:
    '<path d="M3.5 4h17c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H3.5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Zm0 2v12h17V6H3.5Z" stroke="#fff" stroke-width="1.8" fill="none"/>' +
    '<path d="M11 6v12" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>',
  education:
    '<path d="M12 3.5L4 7.5v12h16V7.5L12 3.5Z" fill="none" stroke="#fff" stroke-width="1.8"/>' +
    '<path d="M12 7.5v12" stroke="#fff" stroke-width="1.8"/>' +
    '<path d="M7.5 10.5h9M7.5 14.5h9M7.5 18.5h9" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>',
  add_remove:
    '<circle cx="12" cy="12" r="9" fill="none" stroke="#fff" stroke-width="1.8"/>' +
    '<path d="M12 5v14M5 12h14" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>' +
    '<path d="M12 19.5 12 21.5M19.5 12h2M4.5 12h2" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>',
  list:
    '<path d="M4.5 6h15M4.5 12h15M4.5 18h15" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>' +
    '<circle cx="10" cy="6" r="1.2"/><circle cx="10" cy="12" r="1.2"/><circle cx="10" cy="18" r="1.2"/>',
  network:
    '<circle cx="12" cy="12" r="7" fill="none" stroke="#fff" stroke-width="1.8"/>' +
    '<path d="M12 5v14M5 12h14" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>' +
    '<circle cx="12" cy="12" r="2.2" fill="#fff"/>',
  security:
    '<path d="M12 3.5a8.5 8.5 0 0 1 8.5 8.5h-1a6.5 6.5 0 1 0-13 0 8.5 8.5 0 0 1 4.5-8.5Z" fill="none" stroke="#fff" stroke-width="1.8"/>' +
    '<circle cx="12" cy="12" r="2.8" fill="none" stroke="#fff" stroke-width="1.8"/>' +
    '<path d="M12 9.5v2.5M12 15.5h.01" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>',
  apply:
    '<path d="M8.5 17.5l5.5-5.5 2.2 2.2-7.7 7.7-3.5-3.5 2.2-2.2 5.5 5.5Z" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  install:
    '<path d="M12 4.5v15M4.5 12h15" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>' +
    '<path d="M12 19.5 12 21.5M19.5 12h2M4.5 12h2" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>' +
    '<path d="M8 15.5h8M12 11.5v8" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="3 3"/>'
};

/* Iconos con color propio (siri multicolor) */
const SPECIAL = {
  siri: `<defs>
      <linearGradient id="siriGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FF4E8A"/><stop offset="35%" stop-color="#FF9B3D"/>
        <stop offset="65%" stop-color="#5BC8FF"/><stop offset="100%" stop-color="#8A5BFF"/>
      </linearGradient></defs>
      <g transform="translate(18,18)">${GLYPH.siri}</g>`
};

/* Mapa: id -> [degradado, glifo] */
const ICONS = {
  airplane:       ['orange', GLYPH.airplane],
  wifi:          ['blue', GLYPH.wifi],
  wifi_on:        ['blue', GLYPH.wifi],
  wifi_off:       ['gray', GLYPH.wifi],
  bluetooth:      ['blue', GLYPH.bluetooth],
  bluetooth_on:   ['blue', GLYPH.bluetooth],
  bluetooth_off:  ['gray', GLYPH.bluetooth],
  battery:        ['green', GLYPH.battery],
  battery_charge: ['green', GLYPH.battery],
  general:        ['gray', GLYPH.gears],
  accessibility:  ['blue', GLYPH.accessibility],
  pencil:        ['orange', GLYPH.pencil],
  camera:         ['dark', GLYPH.camera],
  controlcenter:  ['dark', GLYPH.controlcenter],
  wallpaper:      ['teal', GLYPH.wallpaper],
  multitask:      ['dark', GLYPH.multitask],
  homescreen:     ['dark', GLYPH.homescreen],
  display:        ['blue', GLYPH.display],
  siri:           ['multigrad', null],
  notifications:  ['red', GLYPH.notifications],
  sounds:         ['pink', GLYPH.sounds],
  focus:          ['purple', GLYPH.focus],
  screentime:     ['indigo', GLYPH.screentime],
  touchid:        ['teal', GLYPH.touchid],
  privacy:        ['blue', GLYPH.privacy],
  wallet:         ['black', GLYPH.wallet],
  gamecenter:     ['blue', GLYPH.gamecenter],
  icloud:         ['blue', GLYPH.info],
  info:           ['gray', GLYPH.info],
  softwareupdate: ['gray', GLYPH.softwareupdate],
  storage:        ['gray', GLYPH.storage],
  applecare:      ['appler', GLYPH.applecare],
  airdrop:        ['blue', GLYPH.airdrop],
  airplay:        ['blue', GLYPH.airplay],
  backgroundupdate: ['gray', GLYPH.backgroundupdate],
  autofill:       ['gray', GLYPH.autofill],
  dictionary:     ['orange', GLYPH.dictionary],
  datetime:       ['gray', GLYPH.datetime],
  language:       ['blue', GLYPH.language],
  gamepad:        ['dark', GLYPH.gamepad],
  keyboard:       ['gray', GLYPH.keyboard],
  fonts:          ['blue', GLYPH.fonts],
  tvprovider:     ['dark', GLYPH.tvprovider],
  vpn:            ['blue', GLYPH.vpn],
  legal:          ['gray', GLYPH.legal],
  transfer:       ['gray', GLYPH.transfer],
  certificates:   ['gray', GLYPH.certificates],
  magnifier:      ['gray', GLYPH.magnifier],
  /* MDM / VPN nuevos */
  profile:       ['mdm_blue', GLYPH.profile],
  apps:          ['mdm_blue', GLYPH.apps],
  book:          ['mdm_orange', GLYPH.book],
  education:     ['mdm_purple', GLYPH.education],
  add_remove:    ['mdm_green', GLYPH.add_remove],
  list:          ['mdm_gray', GLYPH.list],
  network:       ['mdm_blue', GLYPH.network],
  security:      ['mdm_red', GLYPH.security],
  apply:         ['mdm_blue', GLYPH.apply],
  install:       ['mdm_red', GLYPH.install],
  restrictions:  ['mdm_gray', GLYPH.certificates],
  search:         ['gray', GLYPH.magnifier],
  voiceover:      ['black', GLYPH.accessibility],
  zoom:           ['black', GLYPH.magnifier],
  floatingtext:   ['blue', GLYPH.fonts],
  textsize:       ['blue', GLYPH.fonts],
  motion:         ['green', GLYPH.backgroundupdate],
  readcontent:    ['black', GLYPH.sounds],
  audiodesc:      ['blue', GLYPH.airdrop],
  touch:          ['blue', GLYPH.accessibility],
  switchcontrol:  ['black', GLYPH.controlcenter],
  voicecontrol:   ['blue', GLYPH.sounds],
  homebutton:     ['blue', GLYPH.info],

  /* Iconos de página General (cuadrados con color) */
  info:           ['gray', GLYPH.info],
  softwareupdate: ['gray', GLYPH.softwareupdate],
  storage:        ['gray', GLYPH.storage],
  applecare:      ['appler', GLYPH.applecare],
  airdrop:        ['blue', GLYPH.airdrop],
  airplay:        ['blue', GLYPH.airplay],
  backgroundupdate: ['gray', GLYPH.backgroundupdate],
  autofill:       ['gray', GLYPH.autofill],
  dictionary:     ['orange', GLYPH.dictionary],
  datetime:       ['gray', GLYPH.datetime],
  language:       ['blue', GLYPH.language],
  gamepad:        ['dark', GLYPH.gamepad],
  keyboard:       ['gray', GLYPH.keyboard],
  fonts:          ['blue', GLYPH.fonts],
  tvprovider:     ['dark', GLYPH.tvprovider],
  vpn:            ['blue', GLYPH.vpn],
  legal:          ['gray', GLYPH.legal],
  transfer:       ['gray', GLYPH.transfer],
  certificates:   ['gray', GLYPH.certificates],

  /* Iconos de página Wi-Fi */
  wifi_on:        ['blue', GLYPH.wifi],
  wifi_off:       ['gray', GLYPH.wifi],
  wifi_hero:      ['blue', GLYPH.wifi],
  wifi_checkmark: ['blue', GLYPH.wifi],
  network_check:  ['blue', GLYPH.wifi],
  network_status: ['blue', GLYPH.wifi],

  /* Iconos de página Bluetooth */
  bluetooth_on:   ['blue', GLYPH.bluetooth],
  bluetooth_off:  ['gray', GLYPH.bluetooth],
  bluetooth_hero: ['blue', GLYPH.bluetooth],
  bluetooth_checkmark: ['blue', GLYPH.bluetooth],

  /* Iconos de página Batería */
  battery:        ['green', GLYPH.battery],
  battery_charge: ['green', GLYPH.battery],
  battery_hero:   ['green', GLYPH.battery],
  battery_pct:    ['green', GLYPH.battery],
  low_power_mode: ['green', GLYPH.battery],
  charging:       ['green', GLYPH.battery],
  screen_on:      ['green', GLYPH.battery],
  screen_off:     ['green', GLYPH.battery],
  tiktok:         ['pink', GLYPH.sounds],

  /* Iconos de página Wi-Fi (detalle) */
  wifi_on_detail: ['blue', GLYPH.wifi],
  wifi_off_detail: ['gray', GLYPH.wifi],
  wifi_edit:      ['blue', GLYPH.wifi],
  network_check:  ['blue', GLYPH.wifi],
  network_status: ['blue', GLYPH.wifi],

  /* Iconos de página Bluetooth (detalle) */
  bluetooth_on_detail: ['blue', GLYPH.bluetooth],
  bluetooth_off_detail: ['gray', GLYPH.bluetooth],
  bluetooth_checkmark: ['blue', GLYPH.bluetooth],

  /* Iconos de página Batería (detalle) */
  battery_hero:   ['green', GLYPH.battery],
  battery_pct:    ['green', GLYPH.battery],
  low_power_mode: ['green', GLYPH.battery],
  charging:       ['green', GLYPH.battery],
  screen_on:      ['green', GLYPH.battery],
  screen_off:     ['green', GLYPH.battery],
  tiktok:         ['pink', GLYPH.sounds],

  /* Iconos de página Información (detalle) */
  info_hero:      ['gray', GLYPH.info],
  serial:         ['gray', GLYPH.info],
  model:          ['gray', GLYPH.info],
  model_number:   ['gray', GLYPH.info],
  serial_number:  ['gray', GLYPH.info],
  capacity:       ['gray', GLYPH.info],
  available:      ['gray', GLYPH.info],
  wifi_address:   ['blue', GLYPH.wifi],
  bluetooth_address: ['blue', GLYPH.bluetooth],
  seid:           ['gray', GLYPH.info],
  cert:           ['gray', GLYPH.certificates],

  /* Iconos de página Batería (detalle) */
  battery_pct:    ['green', GLYPH.battery],
  low_power_mode: ['green', GLYPH.battery],
  charging:       ['green', GLYPH.battery],
  screen_on:      ['green', GLYPH.battery],
  screen_off:     ['green', GLYPH.battery],
  tiktok:         ['pink', GLYPH.sounds],

  /* Iconos de página Wi-Fi (detalle) */
  wifi_on_detail: ['blue', GLYPH.wifi],
  wifi_off_detail: ['gray', GLYPH.wifi],
  wifi_edit:      ['blue', GLYPH.wifi],
  network_check:  ['blue', GLYPH.wifi],
  network_status: ['blue', GLYPH.wifi],

  /* Iconos de página Bluetooth (detalle) */
  bluetooth_on_detail: ['blue', GLYPH.bluetooth],
  bluetooth_off_detail: ['gray', GLYPH.bluetooth],
  bluetooth_checkmark: ['blue', GLYPH.bluetooth],

  /* Iconos de página Batería (detalle) */
  battery_pct:    ['green', GLYPH.battery],
  low_power_mode: ['green', GLYPH.battery],
  charging:       ['green', GLYPH.battery],
  screen_on:      ['green', GLYPH.battery],
  screen_off:     ['green', GLYPH.battery],
  tiktok:         ['pink', GLYPH.sounds],

  /* Iconos de página Información (detalle) */
  info_hero:      ['gray', GLYPH.info],
  serial:         ['gray', GLYPH.info],
  model:          ['gray', GLYPH.info],
  model_number:   ['gray', GLYPH.info],
  serial_number:  ['gray', GLYPH.info],
  capacity:       ['gray', GLYPH.info],
  available:      ['gray', GLYPH.info],
  wifi_address:   ['blue', GLYPH.wifi],
  bluetooth_address: ['blue', GLYPH.bluetooth],
  seid:           ['gray', GLYPH.info],
  cert:           ['gray', GLYPH.certificates],

  /* Iconos de página Batería (detalle) */
  battery_pct:    ['green', GLYPH.battery],
  low_power_mode: ['green', GLYPH.battery],
  charging:       ['green', GLYPH.battery],
  screen_on:      ['green', GLYPH.battery],
  screen_off:     ['green', GLYPH.battery],
  tiktok:         ['pink', GLYPH.sounds],

  /* Iconos de página Información (detalle) */
  info_hero:      ['gray', GLYPH.info],
  serial:         ['gray', GLYPH.info],
  model:          ['gray', GLYPH.info],
  model_number:   ['gray', GLYPH.info],
  serial_number:  ['gray', GLYPH.info],
  capacity:       ['gray', GLYPH.info],
  available:      ['gray', GLYPH.info],
  wifi_address:   ['blue', GLYPH.wifi],
  bluetooth_address: ['blue', GLYPH.bluetooth],
  seid:           ['gray', GLYPH.info],
  cert:           ['gray', GLYPH.certificates],
};

/* Iconos rasterizados de las capturas reales del iPad (icons-real/).
   Solo se listan los que existen como archivo: un id sin PNG produciria
   una <image> rota y un hueco en la fila. */
const REAL_ICON_IDS = new Set([
  'accessibility', 'airdrop', 'airplane', 'airplay', 'applecare', 'audiodesc', 'autofill',
  'backgroundupdate', 'battery', 'bluetooth', 'bluetooth_off', 'bluetooth_on', 'camera', 'controlcenter',
  'datetime', 'dictionary', 'display', 'floatingtext', 'focus', 'fonts', 'gamecenter',
  'gamepad', 'general', 'homebutton', 'homescreen', 'icloud', 'info', 'keyboard',
  'language', 'legal', 'motion', 'multitask', 'notifications', 'pencil', 'privacy',
  'readcontent', 'screentime', 'search', 'shutdown', 'siri', 'softwareupdate', 'sounds',
  'storage', 'switchcontrol', 'textsize', 'touch', 'touchid', 'transfer', 'tvprovider',
  'voicecontrol', 'voiceover', 'vpn', 'wallet', 'wallpaper', 'wifi', 'wifi_off',
  'wifi_on', 'zoom'
]);

/* Iconos grandes de cabecera (recortados a 120x120) */
const REAL_HERO_IDS = new Set([
  'battery', 'bluetooth', 'general', 'wifi'
]);

/* Version de los PNG: se añade a la URL para saltarse la cache del navegador
   y la del service worker cuando se recortan iconos nuevos del iPad.
   Subir este numero cada vez que cambien los archivos de icons-real/. */
const ICON_VER = '8';

function iconImageSVG(id, size) {
  if (!REAL_ICON_IDS.has(id)) return null;
  const sizeAttr = size ? ` width="${size}" height="${size}"` : '';
  return `<svg${sizeAttr} viewBox="0 0 60 60" class="ico" aria-hidden="true">` +
    `<image href="icons-real/${id}.png?v=${ICON_VER}" x="0" y="0" width="60" height="60"/></svg>`;
}

function iconHeroSVG(id, size = 56) {
  if (!REAL_HERO_IDS.has(id)) return iconImageSVG(id, size) || iconSVG(id, size);
  return `<svg width="${size}" height="${size}" viewBox="0 0 120 120" class="ico" aria-hidden="true">` +
    `<image href="icons-real/${id}-hero.png?v=${ICON_VER}" x="0" y="0" width="120" height="120"/></svg>`;
}

function iconFlatSVG(id, size, state) {
  let iconId = id;
  if (state !== undefined) {
    if (id === 'wifi') iconId = state.enabled ? 'wifi_on' : 'wifi_off';
    else if (id === 'bluetooth') iconId = state.enabled ? 'bluetooth_on' : 'bluetooth_off';
    else if (id === 'battery') iconId = state.charging ? 'battery_charge' : 'battery';
  }
  const image = iconImageSVG(iconId, size);
  if (image) return image;
  const spec = ICONS[iconId];
  if (!spec) return '';
  const sizeAttr = size ? ` width="${size}" height="${size}"` : '';
  if (iconId === 'siri') {
    return `<svg${sizeAttr} viewBox="0 0 60 60" class="ico" aria-hidden="true">${SPECIAL.siri}</svg>`;
  }
  const [grad, glyph] = spec;
  const color = FLAT[grad] || '#8E8E93';
  const g2 = glyph.split('#fff').join(color);
  return `<svg${sizeAttr} viewBox="0 0 60 60" class="ico" aria-hidden="true">` +
    `<g transform="translate(6,6) scale(2)" fill="${color}">${g2}</g></svg>`;
}

/* Devuelve el SVG completo del mosaico de icono */
function iconSVG(id, size, state) {
  // Manejar iconos dinámicos basados en estado
  let iconId = id;
  if (state !== undefined) {
    if (id === 'wifi') iconId = state.enabled ? 'wifi_on' : 'wifi_off';
    else if (id === 'bluetooth') iconId = state.enabled ? 'bluetooth_on' : 'bluetooth_off';
    else if (id === 'battery') iconId = state.charging ? 'battery_charge' : 'battery';
    else if (id === 'wifi_detail') iconId = state.enabled ? 'wifi_on_detail' : 'wifi_off_detail';
    else if (id === 'bluetooth_detail') iconId = state.enabled ? 'bluetooth_on_detail' : 'bluetooth_off_detail';
    else if (id === 'battery_detail') iconId = state.charging ? 'battery_charge' : 'battery';
    else if (id === 'battery_detail_pct') iconId = state.charging ? 'battery_charge' : 'battery';
  }
  const image = iconImageSVG(iconId, size);
  if (image) return image;
  const spec = ICONS[iconId];
  if (!spec) return '';
  const sizeAttr = size ? ` width="${size}" height="${size}"` : '';
  if (iconId === 'siri') {
    return `<svg${sizeAttr} viewBox="0 0 60 60" class="ico" aria-hidden="true">${SPECIAL.siri}</svg>`;
  }
  const [grad, glyph] = spec;
  const [c1, c2] = GRADS[grad];
  const gid = 'g_' + iconId;
  return `<svg${sizeAttr} viewBox="0 0 60 60" class="ico" aria-hidden="true">` +
    `<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient></defs>` +
    `<path d="${SQUIRCLE}" fill="url(#${gid})"/>` +
    `<g transform="translate(6,6) scale(2)" fill="#fff">${glyph}</g>` +
    `</svg>`;
}
