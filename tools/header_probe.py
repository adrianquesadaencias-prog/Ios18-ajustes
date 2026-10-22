#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Compara la cabecera de una pagina de la replica con la captura real.

Muestra: inicio de la hoja, bandas de tinta de la cabecera (icono grande, titulo),
posicion de la descripcion, primera tarjeta y separadores.
"""
import sys

from PIL import Image
import numpy as np

DET_X0, DET_X1 = 790, 2160   # columna de detalle (coord. de la captura, 2x)


def bands(ink, y_off):
    ys = np.where(ink.any(axis=1))[0]
    if not len(ys):
        return []
    out = []
    s = p = ys[0]
    for y in ys[1:]:
        if y > p + 3:
            out.append((s, p))
            s = y
        p = y
    out.append((s, p))
    res = []
    for (b0, b1) in out:
        cols = np.where(ink[b0:b1 + 1].any(axis=0))[0]
        res.append((b0 + y_off, b1 + y_off, cols.min() + DET_X0, cols.max() + DET_X0))
    return res


def probe(path, tag):
    a = np.asarray(Image.open(path).convert("RGB"))
    print(f"== {tag}: {path.split(chr(92))[-1]} {a.shape[1]}x{a.shape[0]}")
    # 1. inicio de la hoja blanca del detalle
    col = a[:, 1990]
    top = None
    for y in range(120, 400):
        c = tuple(int(v) for v in col[y])
        if c == (255, 255, 255):
            top = y
            break
    print(f"   hoja del detalle empieza en y={top} (pt {top/2:.1f})")
    # 2. bandas de la cabecera
    reg = a[178:460, DET_X0:DET_X1].astype(int)
    ink = (np.abs(reg - np.array([255, 255, 255])).sum(axis=2) > 60)
    for (y0, y1, x0, x1) in bands(ink, 178):
        print(f"   cabecera: y={y0}..{y1} (pt {y0/2:.1f}..{y1/2:.1f})  x={x0}..{x1} "
              f"(pt {x0/2:.1f}..{x1/2:.1f})")
    # 3. primeras tarjetas / separadores en la columna de texto
    prev = None
    print("   columna de texto:")
    for y in range(440, 1620):
        c = tuple(int(v) for v in a[y, 1990])
        if c != prev:
            print(f"      y={y:5d} (pt {y/2:6.1f})  {c}")
            prev = c


if __name__ == "__main__":
    probe(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else "img")
    if len(sys.argv) > 3:
        probe(sys.argv[3], sys.argv[4] if len(sys.argv) > 4 else "replica")
