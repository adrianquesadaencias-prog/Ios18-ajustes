#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Mapa de bandas horizontales: para varias filas imprime los tramos de color."""
import sys

from PIL import Image
import numpy as np


def runs(a, y, minlen=8):
    row = a[y]
    out = []
    start = 0
    prev = tuple(int(v) for v in row[0])
    for x in range(1, a.shape[1]):
        c = tuple(int(v) for v in row[x])
        if c != prev:
            if x - start >= minlen:
                out.append((start, x, prev))
            start = x
            prev = c
    if a.shape[1] - start >= minlen:
        out.append((start, a.shape[1], prev))
    return out


def main():
    path = sys.argv[1]
    ys = [int(v) for v in sys.argv[2:]] or [400]
    im = Image.open(path).convert("RGB")
    a = np.asarray(im)
    print(f"== {path.split(chr(92))[-1]} {im.size}")
    for y in ys:
        print(f"-- y={y} (pt {y/2:.1f})")
        for (x0, x1, c) in runs(a, y):
            print(f"    x {x0:5d}..{x1:5d} (pt {x0/2:6.1f}..{x1/2:6.1f})  {c}")


if __name__ == "__main__":
    main()
