#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Descompone una banda horizontal de una captura: clusters de tinta (iconos/texto)
con su caja y color dominante. Sirve para comparar con la replica."""
import sys

from PIL import Image
import numpy as np


def analyze(path, y0, y1, x0=0, x1=None, gap=12):
    im = Image.open(path).convert("RGB")
    W, H = im.size
    x1 = x1 or W
    a = np.asarray(im.crop((x0, y0, x1, y1))).astype(int)
    # tinta = diferencia respecto al fondo (predominante de la fila)
    bg = np.median(a.reshape(-1, 3), axis=0)
    dist = np.abs(a - bg).sum(axis=2)
    mask = dist > 60
    cols = mask.any(axis=0)
    clusters = []
    start = None
    for i, v in enumerate(cols):
        if v and start is None:
            start = i
        elif not v and start is not None:
            if i - start >= 1:
                clusters.append((start + x0, i + x0))
            start = None
    if start is not None:
        clusters.append((start + x0, len(cols) + x0))
    # fusiona clusters cercanos
    merged = []
    for c in clusters:
        if merged and c[0] - merged[-1][1] <= gap:
            merged[-1] = (merged[-1][0], c[1])
        else:
            merged.append(list(c) if False else (c[0], c[1]))
    merged = [list(m) for m in merged]
    print(f"== {path.split(chr(92))[-1]} banda y={y0}..{y1} fondo={bg}")
    for (cx0, cx1) in merged:
        seg = a[:, cx0 - x0:cx1 - x0].reshape(-1, 3)
        sat = seg.max(axis=1) - seg.min(axis=1)
        strong = seg[sat > 40]
        dom = strong.mean(axis=0).round().astype(int) if len(strong) else seg.mean(axis=0).round().astype(int)
        print(f"   x {cx0:5d}..{cx1:5d} ({(cx1-cx0)/2:6.1f}pt)  color={tuple(dom)}  "
              f"satpix={len(strong)}/{len(seg)}")


if __name__ == "__main__":
    p = sys.argv[1]
    y0 = int(sys.argv[2]); y1 = int(sys.argv[3])
    x0 = int(sys.argv[4]) if len(sys.argv) > 4 else 0
    x1 = int(sys.argv[5]) if len(sys.argv) > 5 else None
    analyze(p, y0, y1, x0, x1)
