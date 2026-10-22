#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Extrae la IDENTIDAD y las RESTRICCIONES/MDM de un iPad conectado por USB.

  iPad 1  -> identidad  (nombre, nº de serie, UDID, modelo, iPadOS, IMEI...)
  iPad 2  -> restricciones (payload com.apple.applicationaccess + perfil MDM)

Uso:
    python tools/ipad_extract.py              # actualiza device.js
    python tools/ipad_extract.py --dry-run    # solo muestra por pantalla
    python tools/ipad_extract.py --udid <UDID>

Requiere: el iPad desbloqueado, conectado por USB y emparejado con este PC.
"""

import argparse
import asyncio
import datetime
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT_DIR = os.path.join(HERE, 'out')
DEVICE_JS = os.path.join(ROOT, 'device.js')


# ----------------------------------------------------------------- helpers
def hr(title):
    print('\n' + '=' * 62)
    print('  ' + title)
    print('=' * 62)


def fmt_bytes(n):
    try:
        return f'{int(n):,}'.replace(',', '.')
    except Exception:
        return str(n)


async def get_lockdown_values(udid=None):
    from pymobiledevice3.lockdown import create_using_usbmux
    from pymobiledevice3.exceptions import NoDeviceConnectedError, PairingError

    try:
        if udid:
            lockdown = await create_using_usbmux(udid=udid)
        else:
            lockdown = await create_using_usbmux()
    except NoDeviceConnectedError:
        print('ERROR: no hay ningun iPad/iPhone conectado por USB.')
        print('       Conectalo, desbloquealo y pulsá "Confiar" en el dispositivo.')
        sys.exit(2)
    except PairingError as e:
        print('ERROR: este PC no esta emparejado con el dispositivo:', e)
        print('       Desbloquea el iPad y acepta "Confiar en este ordenador".')
        sys.exit(2)

    values = dict(lockdown.all_values)
    values['_udid'] = lockdown.udid
    return lockdown, values


def build_identity(values, lockdown, extra=None):
    v = values
    extra = extra or {}
    disk = extra.get('disk', {})
    batt = extra.get('battery', {})
    ident = {
        'deviceName':   (v.get('DeviceName') or 'iPad').strip(),
        'serial':       v.get('SerialNumber') or '',
        'udid':         v.get('UniqueDeviceID') or lockdown.udid,
        'productType':  v.get('ProductType') or '',
        'productName':  v.get('ProductName') or '',
        'modelShort':   _display_name(lockdown),
        'model':        v.get('ProductName') or '',
        'osVersion':    v.get('ProductVersion') or '',
        'osBuild':      v.get('BuildVersion') or '',
        'humanVersion': v.get('HumanReadableProductVersionString') or '',
        'hardwareModel': v.get('HardwareModel') or '',
        'modelNumber':  v.get('ModelNumber') or '',
        'mlbSerial':    v.get('MLBSerialNumber') or '',
        'boardSerial':  v.get('WirelessBoardSerialNumber') or '',
        'firmware':     v.get('FirmwareVersion') or '',
        'deviceColor':  v.get('DeviceColor') or '',
        'ecid':         v.get('UniqueChipID') or 0,
        'boardId':      v.get('BoardId') or 0,
        'chipId':       v.get('ChipID') or 0,
        'deviceClass':  v.get('DeviceClass') or '',
        'wifiMac':      v.get('WiFiAddress') or '',
        'btMac':        v.get('BluetoothAddress') or '',
        'imei':         v.get('InternationalMobileEquipmentIdentity') or '',
        'imei2':        v.get('InternationalMobileEquipmentIdentity2') or '',
        'meid':         v.get('MobileEquipmentIdentifier') or '',
        'activation':   v.get('ActivationState') or '',
        'region':       _region(v.get('RegionInfo')),
        'telephony':    bool(v.get('TelephonyCapability')),
        'families':     v.get('SupportedDeviceFamilies') or [],
        'productTypeName': '',
        'capacity':     _gb(disk.get('TotalDiskCapacity', '')),
        'dataCapacity': _gb(disk.get('TotalDataCapacity', '')),
        'dataUsed':     _gb((disk.get('TotalDataCapacity') or 0) - (disk.get('TotalDataAvailable') or 0)),
        'dataAvailable': _gb(disk.get('TotalDataAvailable', '')),
        'systemSize':   _gb(disk.get('TotalSystemCapacity', '')),
        'battery':      batt.get('BatteryCurrentCapacity') if isinstance(batt.get('BatteryCurrentCapacity'), (int, float)) else '',
    }
    # marketing name desde la tabla interna de pymobiledevice3
    try:
        ident['modelShort'] = lockdown.display_name or ident['modelShort']
    except Exception:
        pass
    return ident


def _region(info):
    """RegionInfo puede venir como dict o como texto."""
    if isinstance(info, dict):
        return info.get('region_code', '') or info.get('region', '')
    if isinstance(info, str):
        return info.strip()
    return ''


def _gb(n):
    """Bytes -> '128 GB'"""
    try:
        n = float(n)
    except Exception:
        return ''
    if n >= 1e9:
        g = n / 1e9
        txt = f'{g:.0f}' if abs(g - round(g)) < 0.05 else f'{g:.1f}'
        return txt + ' GB'
    if n >= 1e6:
        return f'{n/1e6:.0f} MB'
    return ''


async def get_extra_values(lockdown):
    """Dominios opcionales: capacidad de disco, bateria, iTunes."""
    extra = {}
    for dom, tag in (('com.apple.disk_usage', 'disk'),
                     ('com.apple.mobile.battery', 'battery'),
                     ('com.apple.mobile.iTunes', 'itunes')):
        try:
            v = await lockdown.get_value(dom)
            if isinstance(v, dict):
                extra[tag] = v
        except Exception:
            pass
    return extra


def _display_name(lockdown):
    try:
        return lockdown.display_name or ''
    except Exception:
        return ''


# --------------------------------------------------------------- profiles
RESTRICTIONS_PAYLOAD = 'com.apple.applicationaccess'
MDM_PAYLOAD = 'com.apple.mdm'


async def get_profiles(lockdown):
    from pymobiledevice3.services.mobile_config import MobileConfigService

    mc = MobileConfigService(lockdown=lockdown)
    try:
        return await mc.get_profile_list()
    except Exception as e:
        print('AVISO: no se pudo leer la lista de perfiles de configuracion:', e)
        return {}


def parse_profiles(raw):
    """Devuelve (restricciones, mdm, lista_resumen)."""
    restrictions = {}
    mdm = {}
    summary = []

    for prof in raw.get('ProfileList', []) or []:
        ptype = prof.get('PayloadType', '')
        name = prof.get('PayloadDisplayName') or prof.get('PayloadIdentifier') or 'Perfil'
        org = prof.get('PayloadOrganization') or ''
        summary.append({'name': name, 'type': ptype, 'org': org})

        for payload in prof.get('PayloadContent', []) or []:
            pt = payload.get('PayloadType', '')
            if pt == RESTRICTIONS_PAYLOAD:
                for k, val in payload.items():
                    if k.startswith('allow') or k in ('allowUIConfigurationProfileInstallation',):
                        restrictions[k] = val
            elif pt == MDM_PAYLOAD:
                mdm = {
                    'org':           payload.get('Organization', org),
                    'server':        payload.get('ServerURL', ''),
                    'checkinUrl':    payload.get('CheckinURL', ''),
                    'identity':      (payload.get('IdentityCertificate') or {}).get('PayloadCertificateFileName', ''),
                    'topic':         payload.get('Topic', ''),
                    'accessRights':  payload.get('AccessRights', []),
                    'enrolled':      True,
                }
    return restrictions, mdm, summary


# ------------------------------------------------------------------- main
def load_existing():
    """Carga el device.js actual (si existe) para no perder secciones."""
    if not os.path.exists(DEVICE_JS):
        return {}
    txt = open(DEVICE_JS, encoding='utf-8').read()
    start = txt.find('{')
    end = txt.rfind('}')
    if start < 0 or end < 0:
        return {}
    try:
        return json.loads(txt[start:end + 1])
    except Exception:
        return {}


def save_device_js(data):
    body = json.dumps(data, ensure_ascii=False, indent=2)
    head = (
        '/* =====================================================================\n'
        '   DATOS REALES DEL DISPOSITIVO\n'
        '   ---------------------------------------------------------------------\n'
        '   Generado por tools/ipad_extract.py. No editar a mano: se sobreescribe.\n'
        '   ===================================================================== */\n\n'
        'const DEVICE = '
    )
    with open(DEVICE_JS, 'w', encoding='utf-8') as fh:
        fh.write(head + body + ';\n')
    print('  -> device.js actualizado')


async def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--udid', default=None, help='UDID del dispositivo concreto')
    ap.add_argument('--dry-run', action='store_true', help='No escribe device.js')
    ap.add_argument('--keep', action='store_true', help='No sobrescribe lo ya extraido')
    args = ap.parse_args()

    os.makedirs(OUT_DIR, exist_ok=True)

    hr('1. IDENTIDAD (lockdown)')
    lockdown, values = await get_lockdown_values(args.udid)
    extra = await get_extra_values(lockdown)
    ident = build_identity(values, lockdown, extra)

    for k in ('DeviceName', 'SerialNumber', 'UniqueDeviceID', 'ProductType',
              'ProductName', 'ProductVersion', 'BuildVersion', 'HardwareModel',
              'ModelNumber', 'MLBSerialNumber', 'WirelessBoardSerialNumber',
              'DeviceClass', 'WiFiAddress', 'BluetoothAddress', 'UniqueChipID',
              'ActivationState', 'RegionInfo'):
        if k in values:
            print(f'  {k:26} = {values[k]}')
    if extra.get('disk'):
        print(f"  {'Capacidad total':26} = {ident['capacity']}  (datos {ident['dataCapacity']}, "
              f"usados {ident['dataUsed']}, libres {ident['dataAvailable']})")
    if extra.get('battery'):
        print(f"  {'Bateria':26} = {ident['battery']} %")

    with open(os.path.join(OUT_DIR, f'lockdown_{ident["udid"]}.json'), 'w', encoding='utf-8') as fh:
        json.dump(values, fh, ensure_ascii=False, indent=2, default=str)

    hr('2. PERFILES DE CONFIGURACION (MDM / Restricciones)')
    raw = await get_profiles(lockdown)
    with open(os.path.join(OUT_DIR, f'profiles_{ident["udid"]}.json'), 'w', encoding='utf-8') as fh:
        json.dump(raw, fh, ensure_ascii=False, indent=2, default=str)

    restrictions, mdm, summary = parse_profiles(raw)
    if not summary:
        print('  (el dispositivo no tiene ningun perfil de configuracion instalado)')
    for s in summary:
        print(f"  · {s['name']}  [{s['type']}]" + (f"  org={s['org']}" if s['org'] else ''))

    supervised = bool(mdm) or bool(restrictions)
    print(f'\n  MDM enrolado: {bool(mdm)}   |  Payload de restricciones: {bool(restrictions)}')

    hr('3. RESTRICCIONES ENCONTRADAS')
    if restrictions:
        for k, val in sorted(restrictions.items()):
            mark = 'PERMITIDO' if val else 'BLOQUEADO'
            print(f'  {k:52} = {str(val):5}  {mark}')
    else:
        print('  (ninguna)')

    device = load_existing()
    device.setdefault('identity', {})
    device.setdefault('restrictions', {})
    device['source'] = 'ipad'
    device['updatedAt'] = datetime.datetime.now().isoformat(timespec='seconds')

    if not args.keep:
        device['identity'] = ident
    else:
        device['identity'].update(ident)

    if restrictions or mdm:
        device['restrictions'] = {
            'active':      bool(restrictions),
            'supervised':  supervised,
            'mdm':         mdm,
            'profiles':    summary,
            'items':       [{'key': k, 'allowed': bool(v)} for k, v in sorted(restrictions.items())],
        }
    else:
        device['restrictions'].setdefault('active', False)

    if args.dry_run:
        hr('VISTA PREVIA (--dry-run, no se escribe)')
        print(json.dumps(device, ensure_ascii=False, indent=2))
        return

    save_device_js(device)


if __name__ == '__main__':
    asyncio.run(main())
