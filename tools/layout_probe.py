#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Analiza la geometria de una captura real de Ajustes (columnas, tarjetas, texto).

Uso:  python tools\layout_probe.py <ruta.png> [--tsv]
"""
import os
import subprocess
import sys

from PIL import Image

TESS = r"D:\scoop\apps\tesseract\current\tesseract.exe"
TESSDATA = r"D:\scoop\apps\tesseract-languages\current"
ENV = dict(os.environ, TESSDATA_PREFIX=TESSDATA)


def tsv(path):
    out = subprocess.run([TESS, path, "stdout", "-l", "spa+eng", "--psm", "6",
                          "--oem", "1", "tsv"], capture_output=True, env=ENV)
    rows = []
    lines = out.stdout.decode("utf-8", "replace").splitlines()
    for ln in lines[1:]:
        p = ln.split("\t")
        if len(p) < 12:
            continue
        try:
            lvl = int(p[0])
        except ValueError:
            continue
        if lvl != 5:
            continue
        txt = p[11].strip()
        if not txt:
            continue
        rows.append(dict(x=int(p[6]), y=int(p[7]), w=int(p[8]), h=int(p[9]),
                         cx=int(p[6]) + int(p[8]) // 2, cy=int(p[7]) + int(p[9]) // 2,
                         conf=float(p[10]), text=txt))
    return rows


def main():
    path = sys.argv[1]
    im = Image.open(path).convert("RGB")
    W, H = im.size
    print(f"== {os.path.basename(path)}  {W}x{H}")

    rows = tsv(path)
    # agrupa por lineas (y cercano)
    rows.sort(key=lambda r: (r["cy"], r["cx"]))
    lines = []
    for r in rows:
        placed = False
        for ln in lines:
            if abs(ln["cy"] - r["cy"]) <= 12:
                ln["items"].append(r)
                ln["cy"] = sum(i["cy"] for i in ln["items"]) // len(ln["items"])
                placed = True
                break
        if not placed:
            lines.append(dict(cy=r["cy"], items=[r]))
    lines.sort(key=lambda l: l["cy"])
    print("-- lineas de texto (x ordenados) --")
    for ln in lines:
        items = sorted(ln["items"], key=lambda i: i["cx"])
        txt = " | ".join(f"{i['text']}@{i['x']}" for i in items)
        print(f"  y={ln['cy']:5d}  {txt}")


if __name__ == "__main__":
    main()
