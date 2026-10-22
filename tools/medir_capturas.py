#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Mide la geometria real de la pantalla de Ajustes del iPad (pixel a pixel)."""
import sys
import numpy as np
from PIL import Image

P = sys.argv[1] if len(sys.argv) > 1 else r"C:\Users\adria\OneDrive\iPad-ajustes\IMG_0082.PNG"
im = Image.open(P).convert('RGB')
a = np.array(im).astype(int)
H, W, _ = a.shape
print(f'{P}  {W}x{H}')


def px(x, y):
    return tuple(a[y, x])


def hx(t):
    return '#%02X%02X%02X' % tuple(int(v) for v in t)


# --- 1)找出侧边栏和右侧面板的分界线：逐列统计"与上一列不同的像素数" ---
diff = np.abs(np.diff(a, axis=1)).sum(axis=2)
colchanges = (diff > 24).sum(axis=0)
print('\n=== columnas con cambio fuerte (posibles bordes) ===')
for x in range(1, W):
    if colchanges[x] > H * 0.35:
        print(f'   x={x}  ({x/W*100:.1f}%)  cambios={colchanges[x]}  color izq={hx(px(x-1, H//2))} der={hx(px(x, H//2))}')

# --- 2) fondo dominante por franjas verticales ---
print('\n=== color de fondo en la banda y=800..900 (cada 200px) ===')
for x in range(0, W, 200):
    band = a[800:900, x:x+40].reshape(-1, 3)
    m = band.mean(axis=0)
    print(f'   x={x:5}  {hx(m)}')

# --- 3) separadores horizontales en el panel derecho ---
print('\n=== separadores (filas horizontales con gris) en x=1200..2100 ===')
seg = []
for y in range(1, H):
    row = a[y, 1200:2100]
    if len(row) == 0:
        continue
    uniq = np.unique(row, axis=0)
    if len(uniq) == 1 and uniq[0][0] < 235 and uniq[0][0] > 150 and abs(int(uniq[0][0]) - int(uniq[0][1])) < 12 and abs(int(uniq[0][1]) - int(uniq[0][2])) < 14:
        seg.append((y, hx(uniq[0])))
for y, c in seg[:40]:
    print(f'   y={y:5}  {c}')
print(f'   total separadores detectados: {len(seg)}')

# --- 4) cajas de color (iconos redondeados) en la columna de la derecha ---
print('\n=== cajas de icono (pixeles saturados) en x=1200..1400 ===')
sat = a[:, :, 0].astype(int) - a[:, :, 2].astype(int)
ys, xs = np.where(np.abs(sat) > 40)
print(f'   pixeles saturados: {len(xs)}')
if len(xs):
    print(f'   x: {xs.min()}..{xs.max()}   y: {ys.min()}..{ys.max()}')
