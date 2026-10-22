#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Descarga del iPad las capturas de pantalla (DCIM) al PC."""
import asyncio
import os
import sys

DEST = r"C:\Users\adria\OneDrive\iPad-ajustes"
EXTS = ('.png', '.jpg', '.jpeg', '.heic')


async def main():
    from pymobiledevice3.lockdown import create_using_usbmux
    from pymobiledevice3.services.afc import AfcService

    os.makedirs(DEST, exist_ok=True)
    lockdown = await create_using_usbmux()
    afc = AfcService(lockdown)

    total = 0
    got = 0
    for folder in ('/DCIM/100APPLE', '/DCIM'):
        try:
            entries = await afc.listdir(folder)
        except Exception as e:
            print('  (no se pudo listar', folder, e, ')')
            continue
        for name in sorted(entries):
            if name in ('.', '..'):
                continue
            if not name.lower().endswith(EXTS):
                continue
            if name.lower().endswith(('.mov', '.mp4')):
                continue
            total += 1
            out = os.path.join(DEST, name)
            if os.path.exists(out) and os.path.getsize(out) > 0:
                print('  ya existe:', name)
                continue
            try:
                data = await afc.get_file_contents(f'{folder}/{name}')
                with open(out, 'wb') as fh:
                    fh.write(data)
                got += 1
                print(f'  {name}  {len(data)/1024:.0f} KB')
            except Exception as e:
                print('  ERROR', name, e)
        if got:
            break
    print(f'\nDescargadas {got} de {total} imagenes -> {DEST}')


if __name__ == '__main__':
    asyncio.run(main())
