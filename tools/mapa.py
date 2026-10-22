#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Mapa ASCII de una region de la captura para 'ver' la estructura."""
import sys
import numpy as np
from PIL import Image

P = sys.argv[1]
x0, y0, x1, y1 = (int(v) for v in sys.argv[2:6])
step = int(sys.argv[6]) if len(sys.argv) > 6 else 4

im = Image.open(P).convert('RGB')
a = np.array(im).astype(int)


def cls(t):
    r, g, b = t
    if r > 245 and g > 245 and b > 245:
        return '.'
    if r > 230 and g > 230 and b > 230:
        return ':'
    if r > 200 and g > 200 and b > 200:
        return '-'
    if r > 150 and g > 150 and b > 150:
        return '='
    if r < 90 and g < 90 and b < 90:
        return '#'
    if b > 150 and b - r > 50:
        return 'B'
    if g > 130 and g - r > 50:
        return 'G'
    if r > 170 and g > 100 and b < 100:
        return 'O'
    return '+'


for y in range(y0, y1, step):
    row = ''.join(cls(a[y, x]) for x in range(x0, x1, step))
    print(f'{y:5} {row}')
print(f'      x={x0}..{x1} step={step} ({int((x1-x0)/step)} col)  px={x0}..{x1}')
