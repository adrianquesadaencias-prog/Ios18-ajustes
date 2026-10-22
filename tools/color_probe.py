#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Muestra una rejilla de colores de una region para saber si un icono es
mosaico (color plano saturado) o glifo plano (trazo gris/color sobre fondo)."""
import sys

from PIL import Image


def region(path, x0, y0, x1, y1, step=4):
    im = Image.open(path).convert("RGB")
    W, H = im.size
    print(f"== {path} {W}x{H}  region ({x0},{y0})-({x1},{y1})")
    hdr = "      " + "".join(f"{x:>4d}" for x in range(x0, x1, step))
    print(hdr)
    for y in range(y0, y1, step):
        line = f"  {y:4d} "
        for x in range(x0, x1, step):
            if x >= W or y >= H:
                line += "    "
                continue
            r, g, b = im.getpixel((x, y))
            mx, mn = max(r, g, b), min(r, g, b)
            if mx < 90:
                c = "  .."
            elif mx - mn < 18 and mx > 235:
                c = "  .."
            elif mx - mn < 18:
                c = f"{mx:4d}"
            elif r == g == b:
                c = "  ##"
            else:
                c = f"{r:02x}{g:02x}{b:02x}"[-4:]
            line += c
        print(line)


if __name__ == "__main__":
    p = sys.argv[1]
    region(p, *[int(v) for v in sys.argv[2:6]])
