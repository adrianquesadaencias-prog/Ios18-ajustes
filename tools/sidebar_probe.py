#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Compara la columna lateral (sidebar) entre la captura real y la replica.

Muestra las bandas de tinta del lateral: posicion de cada fila, separadores y
la tarjeta de la cuenta de Apple.
"""
import sys

from PIL import Image
import numpy as np

SID_X0, SID_X1 = 0, 760


def probe(path, tag):
    a = np.asarray(Image.open(path).convert("RGB"))
    print(f"== {tag}: {path.split(chr(92))[-1]}")
    reg = a[:, SID_X0:SID_X1].astype(int)
    mx = reg.max(axis=2)
    mn = reg.min(axis=2)
    white = mn > 250
    bggray = (~white) & (mx <= 250) & ((mx - mn) < 6)
    ink = ~(white | bggray)
    ys = np.where(ink.any(axis=1))[0]
    if not len(ys):
        print("   (vacio)")
        return
    bands = []
    s = p = ys[0]
    for y in ys[1:]:
        if y > p + 6:
            bands.append((s, p))
            s = y
        p = y
    bands.append((s, p))
    for (b0, b1) in bands:
        cols = np.where(ink[b0:b1 + 1].any(axis=0))[0]
        print(f"   banda y={b0:5d}..{b1:5d} (pt {b0/2:6.1f}..{b1/2:6.1f})  "
              f"x={cols.min():4d}..{cols.max():4d} (pt {cols.min()/2:6.1f}..{cols.max()/2:6.1f})")


if __name__ == "__main__":
    probe(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else "img")
    if len(sys.argv) > 3:
        probe(sys.argv[3], sys.argv[4] if len(sys.argv) > 4 else "replica")
