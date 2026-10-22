#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Analiza las capturas reales de Ajustes: paleta de color y medidas de layout."""
import os
import glob
from collections import Counter
from PIL import Image
import numpy as np

D = r"C:\Users\adria\OneDrive\iPad-ajustes"


def hexc(t):
    r, g, b = (int(x) for x in t[:3])
    return f'#{r:02X}{g:02X}{b:02X}'


def paleta(path, top=14, q=16):
    im = Image.open(path).convert('RGB')
    a = np.array(im)
    qa = (a // q * q + q // 2).reshape(-1, 3)
    c = Counter(map(tuple, qa))
    return [(hexc(k), n) for k, n in c.most_common(top)], a.shape


def bandas(a):
    """Devuelve las filas (y) donde cambia el color de fondo de forma notable."""
    h, w, _ = a.shape
    col = a[:, 10]                       # columna izquierda (sidebar)
    cambios = []
    prev = tuple(col[0])
    for y in range(1, h):
        t = tuple(col[y])
        if max(abs(int(t[i]) - int(prev[i])) for i in range(3)) > 6:
            cambios.append((y, hexc(prev), hexc(t)))
        prev = t
    return cambios


def main():
    files = sorted(glob.glob(os.path.join(D, 'IMG_*.PNG')))
    print('=== PALETA de 4 capturas representativas ===')
    for p in [files[0], files[10], files[30], files[-1]]:
        pal, shape = paleta(p)
        print(f'\n{os.path.basename(p)}  {shape}')
        for c, n in pal:
            print(f'   {c}   {n:>10,} px')

    print('\n\n=== ESTRUCTURA DE UNA CAPTURA (columna x=10, sidebar) ===')
    p = files[30]
    pal, a = paleta(p)
    for y, c1, c2 in bandas(a)[:40]:
        print(f'   y={y:5}  {c1} -> {c2}')


if __name__ == '__main__':
    main()
