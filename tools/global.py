#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Vista global en bloques: permite 'ver' la composicion completa de la pantalla."""
import sys
import numpy as np
from PIL import Image

P = sys.argv[1]
bx = int(sys.argv[2]) if len(sys.argv) > 2 else 20   # tamano de bloque en px

im = Image.open(P).convert('RGB')
a = np.array(im).astype(int)
H, W, _ = a.shape
cols = W // bx
rows = H // bx


def cls(t):
    r, g, b = float(t[0]), float(t[1]), float(t[2])
    if r > 246 and g > 246 and b > 246:
        return ' '
    if r > 232 and g > 232 and b > 232:
        return '.'
    if 205 < r <= 232 and 205 < g <= 232 and 205 < b <= 232:
        return ':'
    if 170 < r <= 205 and 170 < g <= 205 and 170 < b <= 205:
        return '-'
    if 100 < r <= 170 and 100 < g <= 170 and 100 < b <= 170:
        return '='
    if r < 100 and g < 100 and b < 100:
        return '#'
    if b > 140 and b - r > 55:
        return 'B'
    if g > 130 and g - r > 45 and g - b > 20:
        return 'G'
    if r > 165 and r - g > 55 and r - b > 55:
        return 'R'
    if r > 170 and g > 120 and b < 120 and r - b > 55:
        return 'O'
    if r > 140 and b > 140 and g < 120:
        return 'P'
    return '+'


print(f'{P}  {W}x{H}px   bloque={bx}px ({bx/2:.0f}pt)  escala horizontal: 1 col = {bx/2:.0f}pt')
for ry in range(rows):
    line = ''.join(cls(a[ry * bx + bx // 2, cx * bx + bx // 2]) for cx in range(cols))
    print(f'{ry*bx//2:5}pt |{line}|')
print(f'      {"0" * 1:5}    {"x = 0.." + str(W//2) + "pt  (cada col = " + str(bx//2) + "pt)"}')
