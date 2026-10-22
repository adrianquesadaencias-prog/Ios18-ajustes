/* =====================================================================
   Ajustes iPadOS 18 - CONTENIDO REAL
   ---------------------------------------------------------------------
   Extraido de las capturas reales del iPad (21/10/2026, 19:30-19:34)
   + volcado de dispositivo por USB (tools/ipad_extract.py).

   Esquema de una fila:
     { t:'row', label, value, icon, sub, chev, action, sw, id, tint,
       indent, noSep, locked, lockNote }
   ===================================================================== */

const DEV = (typeof DEVICE !== 'undefined' && DEVICE.identity) || {};
const MDM = (typeof DEVICE !== 'undefined' && DEVICE.restrictions) || {};

/* ---------- Datos reales del dispositivo ---------- */
const D = {
  name:        DEV.deviceName || 'Adrian Quesada Encinas',
  serial:      DEV.serial || 'DMPD3HL9MF3Q',
  osVersion:   DEV.osVersion || '18.7.10',
  osBuild:     DEV.osBuild || '22H374',
  model:       'iPad (7.ª generación)',
  modelNumber: 'MW772TY/A',
  modelShort:  DEV.modelShort || 'iPad (7.ª generación)',
  capacity:    '128 GB',
  available:   '85,99 GB',            // leido de la pantalla Informacion (captura 22/10 19:25)
  used:        '45,16 GB',
  wifi:        'Wedu',
   bluetooth:   'Sí',
   battery:     61,
  charging:    true,
  wifiMac:     '18:3E:EF:79:7B:F8',
  btMac:       '18:3E:EF:87:15:5D',
  region:      'España',
  modelCode:   'A2197',
  emc:         '3323'
};

/* =====================================================================
   COLUMNA LATERAL (orden real iPadOS 18 - SOLO los 4 separadores pedidos)
   ===================================================================== */
const SIDEBAR = [
  { group: 'system', rows: [
    { id:'airplane',    label:'Modo Avión',        icon:'airplane' },
    { id:'wifi',        label:'Wi-Fi',             icon:'wifi',       value:D.wifi },
    { id:'bluetooth',   label:'Bluetooth',         icon:'bluetooth',  value:D.bluetooth },
    { id:'battery',     label:'Batería',           icon:'battery' }
  ]},
  { group: 'apps', rows: [
    { id:'general',       label:'General',                      icon:'general' },
    { id:'accessibility', label:'Accesibilidad',                icon:'accessibility' },
    { id:'pencil',        label:'Apple Pencil',                 icon:'pencil' },
    { id:'search',        label:'Buscar',                       icon:'search' },
    { id:'camera',        label:'Cámara',                       icon:'camera' }
  ]},
  { group: 'more1', rows: [
    { id:'controlcenter', label:'Centro de control',                       icon:'controlcenter' },
    { id:'wallpaper',     label:'Fondo de pantalla',                       icon:'wallpaper' },
    { id:'multitask',     label:'Multitarea y gestos',                      icon:'multitask' },
    { id:'homescreen',    label:'Pantalla de inicio y biblioteca de apps',  icon:'homescreen' },
    { id:'display',       label:'Pantalla y brillo',                        icon:'display' },
    { id:'siri',          label:'Siri',                                     icon:'siri' }
  ]},
  { group: 'more2', rows: [
    { id:'notifications', label:'Notificaciones',                           icon:'notifications' },
    { id:'sounds',        label:'Sonidos',                                  icon:'sounds' },
    { id:'focus',         label:'Modos de concentración',                   icon:'focus' },
    { id:'screentime',    label:'Tiempo de uso',                            icon:'screentime' }
  ]},
  { group: 'end1', rows: [
    { id:'touchid',    label:'Touch ID y código',            icon:'touchid' },
    { id:'privacy',    label:'Privacidad y seguridad',       icon:'privacy' }
  ]},
  { group: 'end2', rows: [
    { id:'wallet',     label:'Cartera y Apple Pay',          icon:'wallet' },
    { id:'icloud',     label:'iCloud',                       icon:'icloud', disabled:true }
  ]}
];

/* =====================================================================
   PAGINAS
   ===================================================================== */
const PAGES = {

/* ------------------------------ GENERAL ----------------------------- */
general: {
  title:'General',
  desc:'Gestiona la configuración y las preferencias generales del iPad, como las actualizaciones de software, el idioma del dispositivo, AirDrop, etc.',
  body:[
    /* Grupo 1: avatar + 3 filas */
    { t:'group', rows:[
      { id:'info',           label:'Información',                    icon:'info' },
      { id:'softwareupdate', label:'Actualización de software',      icon:'softwareupdate' },
      { id:'storage',        label:'Almacenamiento del iPad',         icon:'storage' }
    ]},
    /* Grupo 2a: AppleCare (separado) */
    { t:'group', rows:[
      { id:'applecare',      label:'AppleCare y garantía',           icon:'applecare' }
    ]},
    /* Grupo 2b: AirDrop + AirPlay */
    { t:'group', rows:[
      { id:'airdrop',        label:'AirDrop',                        icon:'airdrop' },
      { id:'airplay',        label:'AirPlay y Continuidad',          icon:'airplay' }
    ]},
    /* Grupo 2c: Actualización 2º plano .. Tipos de letra (8 filas) */
    { t:'group', rows:[
      { id:'backgroundupdate', label:'Actualización en segundo plano', icon:'backgroundupdate' },
      { id:'autofill',       label:'Autorrelleno y contraseñas',     icon:'autofill' },
      { id:'dictionary',     label:'Diccionario',                    icon:'dictionary' },
      { id:'datetime',       label:'Fecha y hora',                   icon:'datetime' },
      { id:'language',       label:'Idioma y región',                icon:'language' },
      { id:'gamepad',        label:'Mandos de videojuegos',          icon:'gamepad' },
      { id:'keyboard',       label:'Teclado',                        icon:'keyboard' },
      { id:'fonts',          label:'Tipos de letra',                 icon:'fonts' }
    ]},
    /* Grupo 2d: Proveedor de TV (era Marco jurídico; swap 1) */
    { t:'group', rows:[
      { id:'tvprovider',     label:'Proveedor de TV',                icon:'tvprovider' }
    ]},
    /* Grupo 3: VPN y gestión (swap 2: era Marco jurídico) */
    { t:'group', rows:[
      { id:'vpn',            label:'VPN y gestión de dispositivos',  icon:'vpn' }
    ]},
    /* Grupo 4: Marco jurídico (era VPN; swap 2) */
    { t:'group', rows:[
      { id:'legal',          label:'Marco jurídico y normativo',     icon:'legal' }
    ]},
    /* Grupo 5: Transferir */
    { t:'group', rows:[
      { id:'transfer',       label:'Transferir o restablecer el iPad', icon:'transfer' }
    ]},
    /* Grupo 6: Apagar */
    { t:'group', rows:[
      { label:'Apagar', tint:'blue', action:'shutdown' }
    ]}
  ]
},

/* ------------------------------ Wi-Fi -------------------------------- */
wifi: {
  title:'Wi-Fi',
  desc:'Conéctate a una red Wi-Fi, consulta qué redes hay disponibles y gestiona los ajustes de conexión a redes y de los puntos de acceso cercanos. Más información...',
  body:[
    { t:'group', rows:[
      { label:'Wi-Fi', sw:'wifi.enabled', def:true, indent:true },
      { label:'Editar', action:'wifi-edit', indent:true }
    ]},
    { t:'group', rows:[
      { label:'Wedu', connected:true, networkStatus:true, icon:'wifi_on' },
      { label:'Wedu_prof',          hideIcon:true, indent:true, networkStatus:true },
      { label:'Wedu_prim',          hideIcon:true, indent:true, networkStatus:true },
      { label:'Wedu_CM',            hideIcon:true, indent:true, networkStatus:true },
      { label:'MOVISTAR_0C70',      hideIcon:true, indent:true, networkStatus:true }
    ]},
    { t:'group', header:'CONFIGURACIÓN', rows:[
      { label:'Notificaciones', chev:true, action:'noop' },
      { label:'Redes neuronales', chev:true, action:'noop' },
      { label:'Preguntar para unirse', sw:'wifi.askJoin', def:false }
    ]}
  ]
},

/* ----------------------------- Bluetooth ---------------------------- */
bluetooth: {
  title:'Bluetooth',
  desc:'Conéctate a los accesorios que puedes usar para reproducir música, llamar por teléfono, jugar u otro tipo de acciones. Más información...',
  body:[
    { t:'group', rows:[
      { label:'Bluetooth', sw:'bt.enabled', def:true, indent:true }
    ]},
    { t:'group', rows:[
      { label:'Permitir nuevas conexiones', tint:'blue', action:'noop' }
    ]},
    { t:'note', className:'bluetooth-note', text:'Se han desactivado las nuevas conexiones Bluetooth en el centro de control.' },
    { t:'group', header:'MIS DISPOSITIVOS', rows:[
      { label:'BFX-W100PRO', icon:'keyboard', value:'No conectado' },
      { label:'DualSense Wireless Controller', icon:'gamepad', value:'No conectado' },
      { label:'DualSense Wireless Controller', icon:'gamepad', value:'No conectado', noSep:true }
    ]},
    { t:'group', header:'OTROS DISPOSITIVOS (3)', rows:[
      { label:'Magic Keyboard', icon:'keyboard', value:'No conectado' },
      { label:'Magic Trackpad', icon:'multitask', value:'No conectado' },
      { label:'AirPods Pro', icon:'sounds', value:'No conectado' }
    ]}
  ]
},

/* ------------------------------ Batería ----------------------------- */
battery: {
  title:'Batería',
  desc:'El modo de bajo consumo reduce temporalmente la actividad en segundo plano, como las descargas y la comprobación del correo, hasta que el iPad pueda cargarse por completo.',
  body:[
    { t:'group', rows:[
      { label:'Porcentaje de bateria', value:'O' }
    ]},
    { t:'group', rows:[
      { label:'Modo de bajo consumo', sw:'bat.lowpower', def:false }
    ]},
    { t:'group', header:'NIVEL DE BATERÍA', rows:[
      { t:'chart', bars:[
        {v:12,cls:''},{v:22,cls:''},{v:30,cls:''},{v:44,cls:''},{v:38,cls:''},{v:52,cls:''},
        {v:47,cls:''},{v:58,cls:''},{v:64,cls:''},{v:55,cls:''},{v:71,cls:''},{v:66,cls:''},
        {v:78,cls:'hi'},{v:73,cls:'hi'},{v:85,cls:'hi'},{v:90,cls:'hi'},{v:82,cls:'hi'},
        {v:94,cls:'hi'},{v:88,cls:'hi'},{v:96,cls:'hi'},{v:92,cls:'hi'},{v:98,cls:'hi'},{v:95,cls:'hi'},
        {v:D.battery,cls:'charge'}
      ]},
      { t:'seg', options:['Últimas 24 horas','Últimos 10 días'], active:0, id:'bat.range' },
      { label:'Cargando: 65 %', sub:'ahora', noSep:true }
    ]},
    { t:'group', header:'ACTIVIDAD', rows:[
      { label:'Pantalla encendida', value:'4 h y 59 min' },
      { label:'Pantalla apagada', value:'1h y 4 min' }
    ]},
    { t:'group', header:'USO DE LA BATERÍA POR APPS', rows:[
      { label:'TikTok',                 value:'52 %' },
      { label:'Venice AI',              value:'8 %' },
      { label:'YouTube',                value:'6 %' },
      { label:'Safari',                 value:'5 %' },
      { label:'Pantalla inicio/bloqueo',value:'4 %' },
      { label:'App Store',              value:'4 %' },
      { label:'Conectado al cargador',  value:'3 %' },
      { label:'Actividad en segundo plano', value:'1 %' },
      { label:'Swift Playground',       value:'1 %' },
      { label:'Fotos',                  value:'1 %' },
      { label:'Casa',                   value:'1 %' },
      { label:'Accesorios',             value:'1 %' },
      { label:'Cámara',                 value:'1 %' },
      { label:'WhatsApp',               value:'0 %' },
      { label:'Getaway 2',              value:'—' },
      { label:'Mapas',                  value:'—' },
      { label:'Geometry Lite',          value:'—' },
      { label:'PS App',                 value:'—' },
      { label:'CarX Drift Racing 3',    value:'—' },
      { label:'Siri',                   value:'—' }
    ]},
    { t:'group', rows:[
      { label:'Mostrar actividad', chev:true, action:'noop' }
    ]}
  ]
},

/* ---------------------------- Información --------------------------- */
info: {
  title:'Información',
  back:'General',
  body:[
    { t:'group', rows:[
      { label:'Nombre',                 value:D.name },
      { label:'Versión de iPadOS',      value:D.osVersion },
      { label:'Nombre del modelo',      value:D.model },
      { label:'Número del modelo',     value:D.modelNumber },
      { label:'Número de serie',       value:D.serial }
    ]},
    { t:'group', rows:[
      { label:'Cobertura', value:'Caducada', chev:true, action:'applecare' }
    ]},
    // Como en el iPad real: un solo grupo con las seis filas, sin cabeceras
    { t:'group', rows:[
      { label:'Canciones',      value:'0' },
      { label:'Vídeos',         value:'8' },
      { label:'Fotos',          value:'84' },
      { label:'Aplicaciones',   value:'32' },
      { label:'Capacidad',      value:D.capacity },
      { label:'Disponible',     value:D.available }
    ]},
    { t:'group', rows:[
      { label:'Dirección Wi-Fi', value:D.wifiMac },
      { label:'Bluetooth',       value:D.btMac }
    ]},
    { t:'group', rows:[
      { label:'SEID',                   value:'—' },
      { label:'Certificados de confianza', chev:true, action:'certificates' }
    ]}
  ]
},

certificates: {
  title:'Certificados de confianza',
  back:'Información',
  desc:'Más información sobre los certificados de confianza',
  body:[
    { t:'group', rows:[
      { label:'Versión (certificado)', value:'2025031200' },
      { label:'Versión (componente)',  value:'1012' }
    ]}
  ]
},

/* ---------------------- Actualización de software ------------------- */
softwareupdate: {
  title:'Actualización de software',
  back:'General',
  body:[
    /* Captura real (iPad): tarjeta con el interruptor y, mucho más abajo,
       el estado de la version centrado sobre el fondo gris. */
    { t:'group', rows:[
      { label:'Actualizaciones automáticas', sw:'swu_auto', def:true }
    ]},
    { t:'status', title:'iPadOS 18.7.10', text:'iPadOS está actualizado.' }
  ]
},

/* ------------------------- AppleCare y garantía --------------------- */
applecare: {
  title:'AppleCare y garantía',
  back:'General',
  desc:'Consulta el estado de la cobertura de todos tus dispositivos y compra la cobertura de los dispositivos que cumplan los requisitos. Más información sobre la cobertura...',
  body:[
    { t:'group', header:'Este dispositivo', rows:[
      { label:D.name, value:'Cobertura caducada' }
    ]},
    { t:'group', rows:[
      { label:'Más información', chev:true, action:'noop' }
    ]}
  ]
},

/* ------------------------------ AirDrop ----------------------------- */
airdrop: {
  title:'AirDrop',
  back:'General',
  desc:'AirDrop te permite compartir contenido al instante con personas que estén cerca. Puedes elegir ser visible para todo el mundo para que cualquier persona pueda enviarte contenido. También puedes limitar la visibilidad a tus contactos. Acerca de AirDrop y la seguridad...',
  body:[
    { t:'group', header:'Recepción desactivada', rows:[
      { label:'Solo contactos',         action:'airdrop-contactos' },
      { label:'Todos durante 10 minutos', action:'airdrop-todos' }
    ]}
  ]
},

/* ------------------------ AirPlay y Continuidad --------------------- */
airplay: {
  title:'AirPlay y Continuidad',
  back:'General',
  body:[
    { t:'group', header:'Transmitir con AirPlay', rows:[
      { label:'Automáticamente', chev:true, action:'noop' }
    ]},
    { t:'group', rows:[
      { label:'Handoff', sw:'airplay.handoff', def:true }
    ]},
    { t:'note', text:'Handoff te permite iniciar una actividad en un dispositivo y continuarla al instante en otro dispositivo que utilice tu cuenta de iCloud. La app necesaria aparecerá en el selector de app y, en un Mac, en el Dock.' },
    { t:'group', rows:[
      { label:'Cursor y teclado', sw:'airplay.cursor', def:false }
    ]},
    { t:'note', text:'Usa el cursor y el teclado en cualquier Mac cercano en el que hayas iniciado sesión con tu cuenta de iCloud.' },
    { t:'group', header:'Receptor AirPlay', rows:[
      { label:'Receptor AirPlay', chev:true, action:'noop' }
    ]},
    { t:'note', text:'Transmite o comparte el contenido del Apple Vision Pro a tu iPad.' }
  ]
},

/* ------------------- Actualización en segundo plano ------------------ */
backgroundupdate: {
  title:'Actualización en segundo plano',
  back:'General',
  desc:'Permite que las apps actualicen sus contenidos en segundo plano cuando estés conectado a una red Wi-Fi. Si desactivas apps, ahorrarás batería.',
  body:[
    { t:'group', rows:[
      { label:'CarX Drift Racing 3', sw:'bu.carx', def:true },
      { label:'ChatGPT',             sw:'bu.chatgpt', def:true },
      { label:'Discord',             sw:'bu.discord', def:true },
      { label:'Epic Games',          sw:'bu.epic', def:true },
      { label:'Explain Every...',    sw:'bu.explain', def:true },
      { label:'Freeform',            sw:'bu.freeform', def:true },
      { label:'Gemini',              sw:'bu.gemini', def:true },
      { label:'Instagram',           sw:'bu.instagram', def:true },
      { label:'Kahoot!',             sw:'bu.kahoot', def:true }
    ]}
  ]
},

/* ---------------------- Autorrelleno y contraseñas ------------------ */
autofill: {
  title:'Autorrelleno y contraseñas',
  back:'General',
  desc:'Se sugerirán automáticamente contraseñas, llaves de acceso y códigos de verificación al iniciar sesión en apps y sitios web.',
  body:[
    { t:'group', rows:[
      { label:'Autorrellenar contraseñas y llaves de acceso', sw:'af.auto', def:false }
    ]},
    { t:'group', header:'Autorrellenar con', rows:[
      { label:'Contraseñas', sub:'Incluye llaves de acceso, contraseñas y códigos.', sw:'af.passwords', def:true },
      { label:'Brave', sub:'Incluye contraseñas.', sw:'af.brave', def:true }
    ]},
    { t:'group', header:'Códigos de verificación', rows:[
      { label:'Eliminar tras usarlos', sub:'Elimina automáticamente los códigos de verificación en las apps Mensajes y Mail después de usarlos.', sw:'af.otp', def:false },
      { label:'Configurar códigos en Contraseñas', sub:'Se usará la app Contraseñas para abrir los enlaces y los códigos QR que permiten configurar los códigos de verificación.', chev:true, action:'noop' }
    ]}
  ]
},

/* ----------------------------- Diccionario -------------------------- */
dictionary: {
  title:'Diccionario',
  back:'General',
  body:[
    { t:'group', header:'', rows:[
      { label:'Español', sub:'Larousse Editorial · Diccionario General de la Lengua Española' },
      { label:'Español-inglés', sub:'Gran Diccionario Oxford · Español-Inglés + Inglés-Español' },
      { label:'Diccionario Apple' },
      { label:'Alemán', sub:'Wissensnetz deutsche Sprache' },
      { label:'Alemán-francés', sub:'PONS Großwörterbuch Französisch Deutsch' },
      { label:'Alemán-inglés', sub:'Oxford German Dictionary' },
      { label:'Árabe-inglés', sub:'Oxford Arabic Dictionary' },
      { label:'Bengalí-inglés', sub:'Oxford Bengali Dictionaries' },
      { label:'Búlgaro', sub:'Електронен енциклопедичен речник' },
      { label:'Canarés-inglés', sub:'Oxford Kannada Dictionaries' },
      { label:'Cantonés (tradicional)-inglés', sub:'Rae BR Osea' },
      { label:'Cantonés (simplificado)-inglés' },
      { label:'Catalán', sub:'Diccionari de l\'Institut d\'Estudis Catalans' },
      { label:'Checo', sub:'Oxford Czech Dictionary' },
      { label:'Coreano', sub:'Oxford Korean Dictionary' },
      { label:'Danés', sub:'Oxford Danish Dictionary' },
      { label:'Eslovaco', sub:'Slovnik Slovenskeho Jazyka' },
      { label:'Español (Latinoamérica)' },
      { label:'Estonio', sub:'Eesti Keele Sõnaraamat' },
      { label:'Finés', sub:'Kielitoimiston sanakirja' },
      { label:'Francés', sub:'Le Robert' },
      { label:'Griego', sub:'Oxford Greek Dictionary' },
      { label:'Hindi', sub:'Oxford Hindi Dictionaries' },
      { label:'Húngaro', sub:'Magyar értelmező szótár' },
      { label:'Inglés', sub:'Oxford American English' },
      { label:'Italiano', sub:'Devoto-Olmütz' },
      { label:'Japonés', sub:'Oxford Japanese Dictionary' },
      { label:'Neerlandés', sub:'Van Dale' },
      { label:'Noruego', sub:'Bokmålsordboka' },
      { label:'Polaco', sub:'Uniwersalny Słownik Angielsko-Polski' },
      { label:'Portugués (Brasil)' },
      { label:'Portugués (Portugal)' },
      { label:'Rumano', sub:'DOOM' },
      { label:'Sueco', sub:'Svenska Akademiens ordbok' },
      { label:'Tailandés', sub:'Oxford Thai Dictionary' },
      { label:'Turco', sub:'Oxford Turkish Dictionary' },
      { label:'Ucraniano', sub:'Green Book' },
      { label:'Vietnamita', sub:'Oxford Vietnamese Dictionary' }
    ]}
  ]
},

/* ---------------------------- Fecha y hora -------------------------- */
datetime: {
  title:'Fecha y hora',
  back:'General',
  body:[
    { t:'group', rows:[
      { label:'Reloj de 24 horas', sw:'dt.24h', def:false },
      { label:'Mostrar la fecha en la barra de estado', sw:'dt.showdate', def:true }
    ]},
    { t:'group', rows:[
      { label:'Ajuste automático', sw:'dt.auto', def:true }
    ]},
    { t:'group', header:'Zona horaria', rows:[
      { label:'Zona horaria', chev:true, action:'noop' }
    ]},
    { t:'note', text:'Para ajustar la zona horaria automáticamente, debes activar la función de localización.' }
  ]
},

/* --------------------------- Idioma y región ------------------------ */
language: {
  title:'Idioma y región',
  back:'General',
  body:[
    { t:'group', header:'Idiomas preferidos', rows:[
      { label:'Español', icon:'language' }
    ]},
    { t:'group', header:'Idioma del iPad', rows:[
      { label:'Añadir idioma...', chev:true, action:'noop' }
    ]},
    { t:'note', text:'Las apps y los sitios web usarán el primer idioma de esta lista que esté disponible.' },
    { t:'group', header:'Tratamiento', rows:[
      { label:'Masculino', chev:true, action:'noop' }
    ]},
    { t:'group', header:'Región', rows:[
      { label:'Región', value:D.region, chev:true, action:'noop' }
    ]},
    { t:'group', header:'Formato', rows:[
      { label:'Calendario',        value:'Gregoriano' },
      { label:'Temperatura',       value:'°C' },
      { label:'Sistema de unidades', value:'Métrico' },
      { label:'Primer día de la semana', value:'Lunes' },
      { label:'Formato de fecha',   value:'19/8/26' },
      { label:'Formato numérico',   value:'1.234.567,89' }
    ]},
    { t:'group', header:'Ejemplo de formato regional', rows:[
      { label:'Fecha',    value:'Miércoles, 19 de agosto de 2026' },
      { label:'Hora',     value:'0:34' },
      { label:'Número',  value:'1.234.567,89' },
      { label:'Moneda',   value:'24,15 €' }
    ]}
  ]
},

/* ------------------------ Mandos de videojuegos --------------------- */
gamepad: {
  title:'Mandos de videojuegos',
  back:'General',
  body:[
    { t:'group', header:'Otros mandos', rows:[
      { label:'DualSense Wireless Controller', icon:'gamepad', value:'Desactivado' },
      { label:'DualSense Wireless Controller', icon:'gamepad', value:'Desactivado' }
    ]},
    { t:'note', text:'Conecta estos mandos para configurar los controles personalizados.' }
  ]
},

/* ------------------------------ Teclados ---------------------------- */
keyboard: {
  title:'Teclados',
  back:'General',
  body:[
    { t:'group', header:'Todos los teclados', rows:[
      { label:'Sustitución de texto', chev:true, action:'noop' }
    ]},
    { t:'group', header:'Sustitución de texto', rows:[
      { label:'Mayúsculas automáticas',        sw:'kb.cap', def:true },
      { label:'Autocorrección',                 sw:'kb.cor', def:true },
      { label:'Texto predictivo',               sw:'kb.pred', def:true },
      { label:'Texto predictivo integrado',     sw:'kb.integ', def:true },
      { label:'Mostrar resultados matemáticos', sw:'kb.math', def:true },
      { label:'Comprobar ortografía',           sw:'kb.spell', def:true },
      { label:'Bloqueo de mayúsculas',          sw:'kb.lock', def:false },
      { label:'Funciones rápidas',              sw:'kb.quick', def:true },
      { label:'Puntuación inteligente',         sw:'kb.smart', def:true },
      { label:'Teclado dividido',               sw:'kb.split', def:false },
      { label:'Deslizar teclas hacia abajo para puntuación', sw:'kb.swipe', def:false }
    ]}
  ]
},

/* ---------------------------- Tipos de letra ------------------------ */
fonts: {
  title:'Tipos de letra',
  back:'General',
  body:[
    { t:'group', rows:[
      { label:'Tipos de letra del sistema', chev:true, action:'noop' }
    ]},
    { t:'group', rows:[
      { label:'Mis tipos de letra', chev:true, action:'noop' }
    ]}
  ]
},

/* --------------------- VPN y gestión de dispositivos --------------- */
vpn: {
  title:'VPN y gestión de dispositivos',
  back:'General',
  body:[
    /* Grupo 1: VPN + Perfil MDM (exacto IMG_0128) */
    { t:'group', rows:[
      { label:'VPN', value:'', chev:true, action:'noop' },
      { label:'Jamf School Profile (versión: 1)', icon:'profile', sub:'MDM', chev:true, action:'mdm_profile' }
    ]},
    /* Grupo 2: GESTIÓN MDM (exacto IMG_0128) */
    { t:'group', header:'GESTIÓN MDM', rows:[
      { label:'Añadir/eliminar perfiles', icon:'add_remove', chev:true, action:'mdm_profiles' },
      { label:'Ver lista de perfiles de datos', icon:'list', chev:true, action:'mdm_data_profiles' },
      { label:'Ver información del dispositivo', icon:'info', chev:true, action:'mdm_device_info' },
      { label:'Ver información de red', icon:'network', chev:true, action:'mdm_network_info' },
      { label:'Ver lista de aplicaciones instaladas', icon:'apps', chev:true, action:'mdm_installed_apps' },
      { label:'Ver información de las restricciones', icon:'restrictions', chev:true, action:'mdm_restr_info' },
      { label:'Ver información de seguridad', icon:'security', chev:true, action:'mdm_security_info' },
      { label:'Aplicar ajustes', icon:'apply', tint:'blue', action:'mdm_apply' },
      { label:'Instalar / eliminar datos y aplicaciones', icon:'install', tint:'red', action:'mdm_install' }
    ]}
  ]
},

/* --------------------- Perfil MDM (Jamf School) -------------------- */
mdm_profile: {
  title:'Perfil',
  back:'VPN y gestión de dispositivos',
  body:[
    /* Grupo 1: Cabecera del perfil (exacto IMG_0129) */
    { t:'group', rows:[
      { label:'Jamf School (versión: 1)', icon:'profile', sub:'MDM' }
    ]},
    /* Grupo 2: Detalles del perfil */
    { t:'group', rows:[
      { label:'Firmado por', value:'*.jamfcloud.com' },
      { label:'Mobile Device Management Configuration', value:'' },
      { label:'Gestión de dispositivos móviles', value:'' },
      { label:'36 dispositivos gestionados', value:'' }
    ]},
    /* Grupo 3: Apps y libros */
    { t:'group', header:'APPS Y LIBROS', rows:[
      { label:'Apps', value:'36 gestionadas', icon:'apps', chev:true, action:'mdm_apps' },
      { label:'Libros', value:'1 gestionado', icon:'book', chev:true, action:'mdm_books' }
    ]},
    /* Grupo 4: Restricciones y contenido */
    { t:'group', header:'RESTRICCIONES Y CONTENIDO', rows:[
      { label:'Restricciones', value:'61', icon:'restrictions', chev:true, action:'mdm_restrictions' },
      { label:'Filtro de contenido web', icon:'restrictions', chev:true, action:'mdm_web_filter' },
      { label:'Redes Wi-Fi', value:'7', icon:'wifi', chev:true, action:'mdm_wifi' }
    ]},
    /* Grupo 5: Certificados y notificaciones */
    { t:'group', header:'CERTIFICADOS Y NOTIFICACIONES', rows:[
      { label:'Certificados', value:'6', icon:'certificates', chev:true, action:'mdm_certs' },
      { label:'Ajustes de notificaciones', value:'6', icon:'notifications', chev:true, action:'mdm_notif' }
    ]},
    /* Grupo 6: Configuración para educación */
    { t:'group', rows:[
      { label:'Configuración para educación', icon:'education', chev:true, action:'mdm_education' }
    ]},
    /* Grupo 7: Más detalles */
    { t:'group', rows:[
      { label:'Más detalles', tint:'blue', action:'mdm_details' }
    ]}
  ]
},

/* --------------------- Marco jurídico y normativo ------------------ */
legal: {
  title:'Marco jurídico y normativo',
  back:'General',
  body:[
    { t:'group', header:'Avisos legales', rows:[
      { label:'Licencia', chev:true, action:'noop' },
      { label:'Garantía', chev:true, action:'noop' },
      { label:'Exposición a RF', chev:true, action:'noop' }
    ]},
    { t:'group', header:'Certificación de normativas', rows:[
      { label:'Model A2197', sub:'EMC 3323' },
      { label:'United States', sub:'FCC ID: BCGA2197' },
      { label:'Canada', sub:'IC: 579C-A2197 · CAN ICES-3 (B)/NMB-3(B)' },
      { label:'Europe', sub:'Apple\'s EU Representative · Apple Distribution International, Hollyhill, Cork, Ireland.' },
      { label:'Australia/New Zealand', sub:'R-NZ' },
      { label:'Singapore', sub:'Complies with IMDA Standards DB00063' },
      { label:'Russia', sub:'Россия' },
      { label:'Armenia' },
      { label:'Kyrgyzstan' },
      { label:'Kazakhstan' },
      { label:'Malaysia', sub:'MCMC CIDF15000007' },
      { label:'Japan', sub:'5GHz band (W52, W53): Indoor use only' },
      { label:'Morocco' },
      { label:'Brazil', sub:'ODANATEL 05682-19-01993' },
      { label:'United Arab Emirates', sub:'TRA ID 0016472/08 · TA ER74307/19' },
      { label:'Kingdom of Saudi Arabia', sub:'CITC · TA 2019-1964' },
      { label:'China mainland', sub:'CMIIT ID: 2019AJ6686' },
      { label:'South Africa', sub:'refisa TA-2019/1227' },
      { label:'Argentina', sub:'spare C-24074' },
      { label:'South Korea', sub:'2.4193: A2197 AIZAt: Apple Inc. · OBA: Apple Inc.' },
      { label:'Mexico', sub:'IFT: RCPAPA219-1606' },
      { label:'Taiwan', sub:'BSMI · LA 33057 · NY RoHS' },
      { label:'Indonesia', sub:'63762/SDPPI/2019 · PLG ID: 4537' },
      { label:'Paraguay', sub:'NR: 2019-10-1-0573' }
    ]},
    { t:'group', rows:[
      { label:'Model A2197', sub:'One Apple Park Way, Cupertino CA 95014, USA' }
    ]}
  ]
},

/* ------------------- Transferir o restablecer el iPad ------------- */
transfer: {
  title:'Transferir o restablecer el iPad',
  back:'General',
  body:[
    { t:'group', header:'Prepárate para tu nuevo iPad', rows:[
      { label:'Primeros pasos', chev:true, action:'noop' }
    ]},
    { t:'note', text:'Asegúrate de tenerlo todo listo para transferir tu contenido a un nuevo iPad, aunque actualmente no dispongas de suficiente espacio de almacenamiento en iCloud para realizar una copia de seguridad.' },
    { t:'group', header:'Restablecer', rows:[
      { label:'Borrar contenidos y ajustes', tint:'red', chev:true, action:'reset' }
    ]}
  ]
},

/* --------------------------- Accesibilidad -------------------------- */
accessibility: {
  title:'Accesibilidad',
  body:[
    { t:'group', header:'Visión', rows:[
      { label:'VoiceOver',            icon:'voiceover', value:'No', chev:true, action:'noop' },
      { label:'Zoom',                 icon:'zoom', value:'No', chev:true, action:'noop' },
      { label:'Texto flotante',       icon:'floatingtext', value:'No', chev:true, action:'noop' },
      { label:'Pantalla y tamaño del texto', icon:'textsize', chev:true, action:'noop' },
      { label:'Movimiento',           icon:'motion', chev:true, action:'noop' },
      { label:'Contenido leído',      icon:'readcontent', chev:true, action:'noop' },
      { label:'Audiodescripción',     icon:'audiodesc', value:'No', chev:true, action:'noop' }
    ]},
    { t:'group', header:'Habilidades físicas y motoras', rows:[
      { label:'Tocar',              icon:'touch', chev:true, action:'noop' },
      { label:'Control por botón', icon:'switchcontrol', value:'No', chev:true, action:'noop' },
      { label:'Control por voz',   icon:'voicecontrol', value:'No', chev:true, action:'noop' },
      { label:'Botón de inicio',    icon:'homebutton', chev:true, action:'noop' }
    ]},
    { t:'group', header:'Audición', rows:[
      { label:'Sonido y vibración', chev:true, action:'noop' },
      { label:'Audio monoaural',    sw:'a11y.mono', def:false },
      { label:'Sonidos de emergencia', sw:'a11y.alarm', def:false },
      { label:'Ruido de fondo',     sw:'a11y.bg', def:false },
      { label:'Audio a la vista',  sw:'a11y.haptics', def:false }
    ]},
    { t:'group', header:'Movimiento', rows:[
      { label:'Reducir movimiento', sw:'a11y.reduce', def:false },
      { label:'Preferencias de movimiento', sw:'a11y.play', def:false }
    ]},
    { t:'group', header:'Apple Pencil', rows:[
      { label:'Dibujo a mano alzada', sw:'pencil.handy', def:false }
    ]}
  ]
},

/* ------------------------- Pantalla y brillo ----------------------- */
display: {
  title:'Pantalla y brillo',
  body:[
    { t:'group', rows:[
      { label:'Brillo', value:'Automático' },
      { label:'Escala de grises', sw:'disp.gray', def:false },
      { label:'True Tone', sw:'disp.truetone', def:true }
    ]},
    { t:'group', rows:[
      { label:'Brillo automático', sw:'disp.auto', def:true }
    ]},
    { t:'group', header:'Texto grande', rows:[
      { label:'Tamaño del texto', chev:true, action:'noop' }
    ]}
  ]
},

/* ------------------------- Centro de control ----------------------- */
controlcenter: {
  title:'Centro de control',
  body:[
    { t:'group', header:'Dispositivos', rows:[
      { label:'Conectividad', chev:true, action:'noop' }
    ]},
    { t:'group', header:'Controles del centro de control', rows:[
      { label:'Modo avión',    sw:'cc.airplane', def:false },
      { label:'Cellular',      sw:'cc.cellular', def:true },
      { label:'Wi-Fi',         sw:'cc.wifi', def:true },
      { label:'Bluetooth',     sw:'cc.bt', def:false },
      { label:'Aireplay',      sw:'cc.airplay', def:true },
      { label:'Enfoque',       sw:'cc.focus', def:false },
      { label:'Rotación',      sw:'cc.rot', def:false },
      { label:'No molestar',   sw:'cc.dnd', def:false },
      { label:'Linterna',      sw:'cc.flash', def:false },
      { label:'Calculadora',   sw:'cc.calc', def:false },
      { label:'Cámara',        sw:'cc.cam', def:false },
      { label:'Timers',        sw:'cc.timer', def:false },
      { label:'Grabación',     sw:'cc.rec', def:false },
      { label:'Pantalla espejo', sw:'cc.mirror', def:false }
    ]}
  ]
},

/* ------------------------- Fondo de pantalla ----------------------- */
wallpaper: {
  title:'Fondo de pantalla',
  body:[
    { t:'group', rows:[
      { label:'Añadir nuevo fondo de pantalla', chev:true, action:'noop' }
    ]},
    { t:'group', header:'Fondo de pantalla actual', rows:[
      { label:'iPad', chev:true, action:'noop' }
    ]}
  ]
},

/* ------------------------ Multitarea y gestos ----------------------- */
multitask: {
  title:'Multitarea y gestos',
  body:[
    { t:'group', header:'Gestos', rows:[
      { label:'Deslizar para ir a aplicaciones con varias instancias', sw:'mt.split', def:false }
    ]},
    { t:'group', header:'Interacción', rows:[
      { label:'Deslizar para cerrar', sw:'mt.swipeclose', def:false }
    ]}
  ]
},

/* ---------------- Pantalla de inicio y biblioteca de apps ---------- */
homescreen: {
  title:'Pantalla de inicio y biblioteca de apps',
  body:[
    { t:'group', header:'Interfaz', rows:[
      { label:'Añadir aplicación a la pantalla de inicio', sw:'hs.addapp', def:true }
    ]},
    { t:'group', rows:[
      { label:'Buscar con Siri', sw:'hs.siri', def:true }
    ]}
  ]
},

/* ------------------------------- Siri ------------------------------- */
siri: {
  title:'Siri',
  body:[
    { t:'group', rows:[
      { label:'Pedir a Siri', sw:'siri.ask', def:false },
      { label:'Respuestas de Siri', sw:'siri.voice', def:true },
      { label:'Permitir al compartir', sw:'siri.share', def:true },
      { label:'Escuchar retomas', sw:'siri.history', def:false },
      { label:'AirPlay con Siri', sw:'siri.airplay', def:false }
    ]},
    { t:'group', header:'Siri en el iPad', rows:[
      { label:'Siri disponible en', chev:true, action:'noop' }
    ]}
  ]
},

/* -------------------------- Notificaciones ------------------------- */
notifications: {
  title:'Notificaciones',
  body:[
    { t:'group', rows:[
      { label:'Permitir notificaciones', sw:'nt.allow', def:true },
      { label:'Mostrar notificaciones en la pantalla de bloqueo', sw:'nt.lock', def:true },
      { label:'Mostrar notificaciones en el Centro de control', sw:'nt.cc', def:true },
      { label:'Reproducir sonidos', sw:'nt.sound', def:true }
    ]},
    { t:'group', header:'Notificaciones pendientes', rows:[
      { label:'Silenciar vista previa', sw:'nt.preview', def:false }
    ]}
  ]
},

/* ----------------------------- Sonidos ------------------------------ */
sounds: {
  title:'Sonidos',
  body:[
    { t:'group', rows:[
      { label:'Silenciar con el botón de bloqueo', sw:'sd.mute', def:false }
    ]},
    { t:'group', header:'Tono de llamada y alertas', rows:[
      { label:'Toque', chev:true, action:'noop' },
      { label:'Timbre', chev:true, action:'noop' },
      { label:'Mensajes', chev:true, action:'noop' },
      { label:'Recordatorios', chev:true, action:'noop' },
      { label:'Calendario', chev:true, action:'noop' },
      { label:'Cámara', chev:true, action:'noop' }
    ]},
    { t:'group', header:'Sonidos de las apps', rows:[
      { label:'AirDrop', chev:true, action:'noop' },
      { label:'FaceTime', chev:true, action:'noop' }
    ]}
  ]
},

/* ----------------------- Modos de concentración -------------------- */
focus: {
  title:'Modos de concentración',
  body:[
    { t:'group', header:'No molestar', rows:[
      { label:'No molestar', sw:'fc.dnd', def:false }
    ]},
    { t:'group', header:'Concentración', rows:[
      { label:'Lectura', chev:true, action:'noop' },
      { label:'Trabajo', chev:true, action:'noop' },
      { label:'Personalizado', chev:true, action:'noop' }
    ]}
  ]
},

/* -------------------------- Tiempo de uso -------------------------- */
screentime: {
  title:'Tiempo de uso',
  body:[
    { t:'group', header:'Tiempo de uso', rows:[
      { label:'Hoy', value:'5 h 12 min' }
    ]},
    { t:'group', header:'App límites', rows:[
      { label:'Límites de apps', chev:true, action:'noop' }
    ]},
    { t:'group', header:'Límites de tiempo', rows:[
      { label:'Tiempo diario', chev:true, action:'noop' }
    ]}
  ]
},

/* ------------------------- Touch ID y código ----------------------- */
touchid: {
  title:'Touch ID y código',
  body:[
    { t:'group', header:'Touch ID', rows:[
      { label:'Touch ID y código', chev:true, action:'noop' }
    ]},
    { t:'group', header:'Configurar acceso', rows:[
      { label:'Desbloquear con el código de acceso', sw:'touch.pass', def:true }
    ]}
  ]
},

/* --------------------- Privacidad y seguridad ---------------------- */
privacy: {
  title:'Privacidad y seguridad',
  body:[
    { t:'group', header:'Ubicación', rows:[
      { label:'Servicios de ubicación', chev:true, action:'noop' }
    ]},
    { t:'group', header:'Seguimiento', rows:[
      { label:'Permitir que las apps pidan seguimiento', sw:'pr.track', def:false }
    ]},
    { t:'group', header:'Cámara', rows:[
      { label:'Cámara', sw:'pr.cam', def:true }
    ]},
    { t:'group', header:'Micrófono', rows:[
      { label:'Micrófono', sw:'pr.mic', def:true }
    ]},
    { t:'group', header:'Análisis y mejoras', rows:[
      { label:'Compartir datos de iCloud', sw:'pr.icloud', def:true }
    ]}
  ]
},

/* ------------------------ Cartera y Apple Pay ---------------------- */
wallet: {
  title:'Cartera y Apple Pay',
  body:[
    { t:'group', rows:[
      { label:'Apple Pay', chev:true, action:'noop' }
    ]},
    { t:'group', header:'Tarjetas de pago', rows:[
      { label:'Añadir tarjeta', chev:true, action:'noop' }
    ]}
  ]
},

/* --------------------------- Game Center --------------------------- */
gamecenter: {
  title:'Game Center',
  body:[
    { t:'group', rows:[
      { label:'Game Center', chev:true, action:'noop' }
    ]},
    { t:'group', header:'Juegos', rows:[
      { label:'Clouds', value:'Activado' }
    ]},
    { t:'group', header:'Contactos', rows:[
      { label:'Amigos', chev:true, action:'noop' }
    ]}
  ]
},

/* ------------------------------ iCloud ------------------------------ */
icloud: {
  title:'iCloud',
  body:[
    { t:'group', rows:[
      { label:'iCloud', icon:'icloud' }
    ]},
    { t:'group', header:'Almacenamiento', rows:[
      { label:'iCloud Drive', value:'45,16 GB de 200 GB' }
    ]},
    { t:'group', rows:[
      { label:'Manage Storage', chev:true, action:'noop' }
    ]}
  ]
},

/* --------------------------- Apple Pencil -------------------------- */
pencil: {
  title:'Apple Pencil',
  body:[
    { t:'group', header:'Conexiones', rows:[
      { label:'Se ha conectado BFX-W100PRO', value:'Desactivado' }
    ]},
    { t:'group', header:'Ajustes de Apple Pencil', rows:[
      { label:'Dibujo a mano alzada', chev:true, action:'noop' },
      { label:'Doble toque', sw:'pencil.double', def:true }
    ]}
  ]
},

/* ------------------------------- Cámara ----------------------------- */
camera: {
  title:'Cámara',
  body:[
    { t:'group', header:'Cámara', rows:[
      { label:'Usar la cámara', sw:'cam.use', def:true }
    ]},
    { t:'group', header:'Datos de la cámara', rows:[
      { label:'Registros de la cámara', chev:true, action:'noop' }
    ]}
  ]
},

/* ------------------------ Modo avión (sin datos) -------------------- */
airplane: {
  title:'Modo Avión',
  body:[
    { t:'group', rows:[
      { label:'Modo Avión', sw:'af.airplane', def:false }
    ]},
    { t:'note', text:'El modo avión desactiva las conexiones inalámbricas del iPad. Puedes volver a activarlo en la barra de estado o en Ajustes.' }
  ]
},

/* ------------------------- Almacenamiento del iPad ------------------ */
storage: {
  title:'Almacenamiento del iPad',
  back:'General',
  body:[
    { t:'group', header:'Capacidad', rows:[
      { label:'Capacidad total',  value:D.capacity },
      { label:'Disponible',       value:D.available },
      { label:'Usado',            value:D.used }
    ]},
    { t:'group', header:'Apps', rows:[
      { label:'Fotos',        value:'39 elementos' },
      { label:'Vídeos',       value:'6 elementos' },
      { label:'Canciones',    value:'0 elementos' }
    ]},
    { t:'group', rows:[
      { label:'Gestionar almacenamiento', chev:true, action:'noop' }
    ]}
  ]
},

/* ---------------- Proveedor de TV / Certificado / etc --------------- */
tvprovider: {
  title:'Proveedor de TV',
  back:'General',
  body:[
    { t:'group', rows:[
      { label:'Proveedor de TV', value:'Ninguno', chev:true, action:'noop' }
    ]}
  ]
},

/* ------------------------ Restricciones (MDM) ---------------------- */
restrictions: {
  title:'Restricciones',
  back:'VPN y gestión de dispositivos',
  body: buildRestrictionsBody()
}
};

/* =====================================================================
   MDM - se rellena con el volcado real del iPad 2
   ===================================================================== */
function buildMdmBody() {
  const m = MDM.mdm || {};
  const profs = MDM.profiles || [];
  const rows = [
    { label:'Estado de supervisión', value: MDM.supervised ? 'Supervisado' : 'No supervisado' },
    { label:'Gestión MDM', value: m.enrolled ? 'Enrolado' : 'No enrolado' }
  ];
  if (m.org)      rows.push({ label:'Organización', value:m.org });
  if (m.server)   rows.push({ label:'Servidor',    value:m.server });
  if (m.identity) rows.push({ label:'Identidad',   value:m.identity });
  const body = [
    { t:'banner', color: MDM.supervised ? '#FF3B30' : '#34C759',
      title: MDM.supervised ? 'Dispositivo supervisado' : 'Sin supervisión',
      text: MDM.supervised
        ? 'Este dispositivo está gestionado por un administrador. Algunas opciones están bloqueadas.'
        : 'Este dispositivo no está enrolado en ningún sistema de gestión. Conecta el iPad 2 para volcar sus datos reales de MDM.' },
    { t:'group', header:'Gestión de dispositivos', rows }
  ];
  if (profs.length) {
    body.push({ t:'group', header:'Perfiles de configuración', rows:
      profs.map(p => ({ label: p.name || 'Perfil', sub: p.identifier || '' })) });
  }
  return body;
}

/* =====================================================================
   Etiquetas en espanol de las claves de restriccion de Apple.
   OJO: en iOS el interruptor en ON significa "RESTRINGIDO".
   ===================================================================== */
const RESTRICTION_LABELS = {
  allowAccountModification:'Modificar cuentas', allowActivityContinuation:'Traspaso de actividad',
  allowAddingGameCenterFriends:'Añadir amigos de Game Center', allowAirDrop:'AirDrop',
  allowAirPlayIncomingRequests:'Solicitudes de AirPlay', allowAirPrint:'AirPrint',
  allowAppCellularDataModification:'Datos celulares de apps', allowAppClips:'App Clips',
  allowAppInstallation:'Instalar aplicaciones', allowAppRemoval:'Eliminar aplicaciones',
  allowAppsToBeHidden:'Ocultar aplicaciones', allowAppsToBeLocked:'Bloquear aplicaciones',
  allowAssistant:'Siri', allowAssistantWhileLocked:'Siri con el dispositivo bloqueado',
  allowAutoCorrection:'Autocorrección', allowAutoDim:'Atenuación automática',
  allowAutomaticAppDownloads:'Descargas automáticas', allowAutoUnlock:'Desbloqueo automático',
  allowBluetoothModification:'Modificar ajustes de Bluetooth', allowBookstore:'Books',
  allowCallRecording:'Grabar llamadas', allowCamera:'Cámara',
  allowCellularPlanModification:'Plan celular', allowChat:'iMessage',
  allowCloudBackup:'Copia de seguridad de iCloud', allowCloudBookmarks:'Marcadores de iCloud',
  allowCloudCalendar:'Calendarios de iCloud', allowCloudDesktopAndDocuments:'Escritorio y documentos de iCloud',
  allowCloudDocumentSync:'Sincronizar documentos de iCloud', allowCloudKeychainSync:'Sincronizar llavero de iCloud',
  allowCloudMail:'Correo de iCloud', allowCloudNotes:'Notas de iCloud',
  allowCloudPhotoLibrary:'Fotos de iCloud', allowCloudPrivateRelay:'Relay privado de iCloud',
  allowContactSync:'Sincronizar contactos', allowDeviceQuery:'Consultar el dispositivo',
  allowDictation:'Dictado', allowEnablingRestrictions:'Configurar restricciones',
  allowFIDOAuthentication:'Autenticación FIDO', allowInternalDiscovery:'Descubrimiento interno',
  allowLocationServices:'Ubicación', allowManagedApplicationInstallation:'Instalar apps gestionadas',
  allowOpenFromManagedToUnmanaged:'Salir de la gestión', allowScreenShot:'Capturas de pantalla',
  allowScreenShotNotifications:'Capturas de notificaciones', allowSMB:'SMB', allowVPN:'VPN',
  allowWiFiModification:'Modificar ajustes de Wi-Fi',
  allowUIConfigurationProfileInstallation:'Instalar perfiles de configuración',
  allowRequestingUnmanagedDeviceEnrollment:'Salir de la gestión MDM'
};

const RESTRICTION_SECTIONS = [
  { title:'Permitir instalar perfiles de configuración', keys:['allowUIConfigurationProfileInstallation'] },
  { title:'Permitir instalar aplicaciones',              keys:['allowAppInstallation','allowInstallApps'] },
  { title:'Permitir eliminar aplicaciones',               keys:['allowAppRemoval'] },
  { title:'Permitir configurar restricciones',           keys:['allowEnablingRestrictions'] },
  { title:'Permitir salir de la gestión MDM',             keys:['allowRequestingUnmanagedDeviceEnrollment','allowMDMEnrollment','allowOpenFromManagedToUnmanaged'] },
  { title:'Permitir usar la cámara',                     keys:['allowCamera'] },
  { title:'Permitir usar el micrófono',                  keys:['allowMicrophone','allowDictation'] },
  { title:'Permitir AirDrop',                            keys:['allowAirDrop'] },
  { title:'Permitir AirPrint',                           keys:['allowAirPrint'] },
  { title:'Permitir usar iMessage',                      keys:['allowChat'] },
  { title:'Permitir modificar cuentas',                  keys:['allowAccountModification'] },
  { title:'Permitir copia de seguridad en iCloud',       keys:['allowCloudBackup'] },
  { title:'Permitir sincronizar con iCloud',             keys:['allowCloudDocumentSync','allowCloudKeychainSync','allowCloudMail','allowCloudNotes','allowCloudPhotoLibrary','allowSync'] },
  { title:'Permitir capturas de pantalla',               keys:['allowScreenShot','allowScreenShotNotifications'] },
  { title:'Permitir SMB',                                keys:['allowSMB'] },
  { title:'Permitir VPN',                                keys:['allowVPN'] },
  { title:'Permitir ubicación',                          keys:['allowLocationServices','allowFrequentLocationUpdates'] },
  { title:'Permitir contenido multimedia',               keys:['allowMusicStreaming','allowVideoPlayback','allowPlay'] },
  { title:'Permitir modo hotspot personal',              keys:['allowPersonalHotspot'] },
  { title:'Permitir añadir amigos de Game Center',       keys:['allowAddingGameCenterFriends'] },
  { title:'Permitir usuario invitado',                   keys:['allowGuestUser'] }
];

/* Construye el cuerpo de la pagina "Restricciones" a partir de MDM.items */
function buildRestrictionsBody() {
  const items = MDM.items || [];
  if (!items.length) {
    return [
      { t:'banner', color:'#34C759', title:'Sin restricciones activas',
        text:'Este dispositivo no tiene ningún payload de restricciones (com.apple.applicationaccess) instalado. Conecta el iPad 2 para volcar sus restricciones reales.' },
      { t:'group', rows:[
        { label:'Estado de supervisión', value: MDM.supervised ? 'Supervisado' : 'No supervisado' },
        { label:'Gestión MDM', value:(MDM.mdm && MDM.mdm.enrolled) ? 'Enrolado' : 'No enrolado' }
      ]}
    ];
  }
  const byKey = {};
  items.forEach(i => { byKey[i.key] = i.allowed; });
  const used = new Set();
  const body = [
    { t:'banner', color:'#FF3B30',
      title: MDM.supervised ? 'Dispositivo supervisado' : 'Restricciones activas',
      text: (MDM.mdm && MDM.mdm.org)
        ? `Gestionado por ${MDM.mdm.org}. Los interruptores están bloqueados y no se pueden cambiar.`
        : 'Los interruptores están bloqueados por el administrador y no se pueden cambiar.' }
  ];
  for (const sec of RESTRICTION_SECTIONS) {
    const rows = [];
    for (const k of sec.keys) {
      if (!(k in byKey) || used.has(k)) continue;
      used.add(k);
      const blocked = byKey[k] === false;
      rows.push({ label: RESTRICTION_LABELS[k] || k, id:'mdm.' + k,
                  sw:'mdm.' + k, def:blocked, locked:true });
    }
    if (rows.length) body.push({ t:'group', header: sec.title, rows });
  }
  const rest = [];
  for (const i of items) {
    if (used.has(i.key)) continue;
    rest.push({ label: RESTRICTION_LABELS[i.key] || i.key, id:'mdm.' + i.key,
                sw:'mdm.' + i.key, def:i.allowed === false, locked:true });
  }
  if (rest.length) body.push({ t:'group', header:'Otras restricciones', rows: rest });
  body.push({ t:'note', text:'Valores reales leídos del payload com.apple.applicationaccess del dispositivo. En iOS el interruptor en ON significa que la función está restringida.' });
  return body;
}
