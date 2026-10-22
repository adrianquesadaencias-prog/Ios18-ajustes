#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Compara una captura real del iPad con la captura de la replica (alineacion global).

Uso:  python tools/diff_real.py REAL.png MIA.png [--x 100,400,1000] [--y 0,1620] [--min 4]

Extrae la secuencia vertical de color en varias columnas x (ignorando el
antialiasing: solo bloques de al menos --min puntos), alinea ambas secuencias
con difflib y reporta las diferencias con su desfase vertical en pt.
"""
import sys
import difflib
from PIL import Image

TOL = 8          # tolerancia por canal para considerar el mismo color


def label(c):
    r, g, b = c
    if abs(r - g) < 12 and abs(g - b) < 12:
        if r > 246: return "blanco"
        if r > 236: return "gris-claro"
        if r > 200: return "gris-medio"
        if r > 120: return "gris-oscuro"
        return "negro"
    if b > r + 20: return "azul"
    if r > 180 and g > 180 and b < 150: return "ambar"
    if r < 120 and g < 160 and b < 120: return "verde"
    return "color"


def runs(path, x, y0, y1, min_h):
    im = Image.open(path).convert("RGB")
    px = im.load()
    raw = []
    prev = None
    start = y0
    for y in range(y0, y1):
        c = px[x, y]
        if prev is None or max(abs(c[i] - prev[i]) for i in range(3)) > TOL:
            if prev is not None:
                raw.append((start, y - 1, prev))
            prev = c
            start = y
    raw.append((start, y1 - 1, prev))
    # une bloques contiguos del mismo label
    out = []
    for a, b, c in raw:
        lb = label(c)
        if out and out[-1][2] == lb and a - out[-1][1] <= 4:
            out[-1] = (out[-1][0], b, lb)
        else:
            out.append((a, b, lb))
    return [r for r in out if (r[1] - r[0]) / 2 >= min_h]


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    opts = {}
    for a in sys.argv[1:]:
        if a.startswith("--"):
            k, _, v = a[2:].partition("=")
            opts[k] = v
    real, mia = args[0], args[1]
    xs = [int(v) for v in opts.get("x", "100,400,1000,1800").split(",")]
    y0, y1 = (int(v) for v in opts.get("y", "0,1620").split(","))
    min_h = int(opts.get("min", "4"))

    print(f"real={real}\nmia ={mia}\n")
    total = 0
    for x in xs:
        ra = runs(real, x, y0, y1, min_h)
        rb = runs(mia, x, y0, y1, min_h)
        sa = [r[2] for r in ra]
        sb = [r[2] for r in rb]
        sm = difflib.SequenceMatcher(a=sa, b=sb, autojunk=False)
        print(f"=== x={x/2:.0f}pt  bloques real={len(ra)} mio={len(rb)}  similitud={sm.ratio():.2f} ===")
        for tag, i1, i2, j1, j2 in sm.get_opcodes():
            if tag == "equal":
                # comprueba el desfase vertical medio
                d = [(rb[j][0] - ra[i][0]) / 2 for i, j in zip(range(i1, i2), range(j1, j2))]
                if d and abs(sum(d) / len(d)) > 2:
                    print(f"  DESFASE global x={x/2:.0f}pt: {sum(d)/len(d):+.1f}pt "
                          f"({len(d)} bloques, real {ra[i1][0]/2:.1f}..{ra[i2-1][1]/2:.1f} / "
                          f"mia {rb[j1][0]/2:.1f}..{rb[j2-1][1]/2:.1f})")
                    total += 1
                continue
            print(f"  {tag.upper()} x={x/2:.0f}pt:")
            for k in range(i1, i2):
                print(f"      solo REAL: {ra[k][0]/2:8.1f}-{ra[k][1]/2:8.1f}pt  {ra[k][2]}")
            for k in range(j1, j2):
                print(f"      solo MIA : {rb[k][0]/2:8.1f}-{rb[k][1]/2:8.1f}pt  {rb[k][2]}")
            total += max(i2 - i1, j2 - j1)
    print(f"\n>>> desajustes: {total}")


if __name__ == "__main__":
    main()
