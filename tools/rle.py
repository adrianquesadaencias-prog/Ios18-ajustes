#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""RLE horizontal/vertical de una captura: revela la geometria exacta."""
import sys
import numpy as np
from PIL import Image

P = sys.argv[1] if len(sys.argv) > 1 else r"C:\Users\adria\OneDrive\iPad-ajustes\IMG_0082.PNG"
im = Image.open(P).convert('RGB')
a = np.array(im).astype(int)
H, W, _ = a.shape
SCALE = 2.0   # captura de 2x (1080x810 pt)


def hx(t):
    return '#%02X%02X%02X' % tuple(int(v) for v in t)


def rle_row(y, x0=0, x1=None, minrun=3):
    x1 = x1 or W
    out = []
    prev = tuple(a[y, x0])
    start = x0
    for x in range(x0 + 1, x1):
        t = tuple(a[y, x])
        if max(abs(t[i] - prev[i]) for i in range(3)) > 10:
            if x - start >= minrun:
                out.append((start, x, hx(prev)))
            start, prev = x, t
    if x1 - start >= minrun:
        out.append((start, x1, hx(prev)))
    return out


def rle_col(x, y0=0, y1=None, minrun=3):
    y1 = y1 or H
    out = []
    prev = tuple(a[y0, x])
    start = y0
    for y in range(y0 + 1, y1):
        t = tuple(a[y, x])
        if max(abs(t[i] - prev[i]) for i in range(3)) > 10:
            if y - start >= minrun:
                out.append((start, y, hx(prev)))
            start, prev = y, t
    if y1 - start >= minrun:
        out.append((start, y1, hx(prev)))
    return out


print(f'{P}  {W}x{H}px = {W/SCALE:.0f}x{H/SCALE:.0f}pt\n')
for y in (int(sys.argv[2]) if len(sys.argv) > 2 else 300, 1200):
    print(f'--- RLE horizontal en y={y} ({y/SCALE:.0f}pt) ---')
    for s, e, c in rle_row(y):
        print(f'   x {s:5}..{e:5}  ({s/SCALE:6.1f}..{e/SCALE:6.1f} pt)  {c}')

for x in (int(sys.argv[3]) if len(sys.argv) > 3 else 800, 1300):
    print(f'\n--- RLE vertical en x={x} ({x/SCALE:.0f}pt) ---')
    for s, e, c in rle_col(x):
        print(f'   y {s:5}..{e:5}  ({s/SCALE:6.1f}..{e/SCALE:6.1f} pt)  {c}')
