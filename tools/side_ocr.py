#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Extrae las palabras del lateral (x<760) con su posicion vertical y las
compara entre la captura real y la replica."""
import os
import subprocess
import sys

import numpy as np
from PIL import Image

TESS = r"D:\scoop\apps\tesseract\current\tesseract.exe"
TESSDATA = r"D:\scoop\apps\tesseract-languages\current"
ENV = dict(os.environ, TESSDATA_PREFIX=TESSDATA)


def words(path, x_max=760):
    out = subprocess.run([TESS, path, "stdout", "-l", "spa+eng", "--psm", "6",
                          "--oem", "1", "tsv"], capture_output=True, env=ENV)
    rows = []
    for ln in out.stdout.decode("utf-8", "replace").splitlines()[1:]:
        p = ln.split("\t")
        if len(p) < 12 or p[0] != "5":
            continue
        t = p[11].strip()
        if not t:
            continue
        x, y = int(p[6]), int(p[7])
        if x >= x_max:
            continue
        rows.append((y, x, t))
    # agrupa por lineas
    rows.sort()
    lines = []
    for (y, x, t) in rows:
        if lines and abs(lines[-1][0] - y) <= 12:
            lines[-1][1].append((x, t))
            lines[-1][0] = (lines[-1][0] + y) // 2
        else:
            lines.append([y, [(x, t)]])
    return [(y, " ".join(t for _, t in sorted(items))) for y, items in lines]


def main():
    files = sys.argv[1:]
    all = []
    for f in files:
        lines = words(f)
        all.append(lines)
        print(f"== {os.path.basename(f)}")
        for y, t in lines:
            print(f"   y={y:5d} (pt {y/2:6.1f})  {t}")
    if len(all) == 2:
        print("\n== comparacion (real | replica) ==")
        a, b = all
        for i in range(max(len(a), len(b))):
            ta = a[i][1] if i < len(a) else ""
            tb = b[i][1] if i < len(b) else ""
            ya = a[i][0] if i < len(a) else -1
            yb = b[i][0] if i < len(b) else -1
            d = (yb - ya) / 2 if (ya >= 0 and yb >= 0) else 0
            flag = "" if abs(d) < 6 else ("  <-- %+0.1f pt" % d)
            print(f"   {ta[:34]:34s} | {tb[:34]:34s}{flag}")


if __name__ == "__main__":
    main()
