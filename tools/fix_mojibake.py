#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Repara archivos UTF-8 que fueron guardados con doble codificacion
(mojibake: 'Â·', 'Ã¡', 'â€"'...). Convierte cada caracter a su byte original
(cp1252/latin-1) y vuelve a decodificar como UTF-8.

Uso:  python tools/fix_mojibake.py [carpeta]
"""
import os
import sys


def to_bytes(s):
    out = bytearray()
    for ch in s:
        o = ord(ch)
        if o < 256:
            out.append(o)
        else:
            try:
                out.extend(ch.encode('cp1252'))
            except UnicodeEncodeError:
                out.extend(ch.encode('utf-8', 'surrogatepass'))
    return bytes(out)


def looks_mojibake(text):
    markers = ('\u00c3', '\u00c2', '\u00e2\u20ac', '\u00e2\u0080')
    return any(m in text for m in markers)


def fix_text(text):
    body = text.lstrip('\ufeff')
    bom = '\ufeff' if text.startswith('\ufeff') else ''
    try:
        fixed = to_bytes(body).decode('utf-8')
    except UnicodeDecodeError:
        return None
    return bom + fixed


def main():
    root = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    exts = ('.js', '.css', '.html', '.json', '.webmanifest', '.md', '.txt', '.py')
    changed = 0
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in ('.git', 'node_modules', 'tools')]
        for fn in filenames:
            if not fn.lower().endswith(exts):
                continue
            p = os.path.join(dirpath, fn)
            raw = open(p, 'rb').read()
            try:
                text = raw.decode('utf-8')
            except UnicodeDecodeError:
                continue
            if not looks_mojibake(text):
                continue
            fixed = fix_text(text)
            if fixed is None or fixed == text:
                print('  ?? no reparable:', p)
                continue
            open(p, 'wb').write(fixed.encode('utf-8'))
            changed += 1
            print('  OK reparado:', os.path.relpath(p, root))
    print('Archivos reparados:', changed)


if __name__ == '__main__':
    main()
