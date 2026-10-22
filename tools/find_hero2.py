"""Busca bloques de color (iconos grandes) en la columna central del panel
de detalle, en toda la altura de la captura."""
import sys
from pathlib import Path
from PIL import Image

names = sys.argv[1:] or ["IMG_0100.PNG", "IMG_0101.PNG"]
folders = [Path(r"C:\Users\adria\AppData\Local\Temp\opencode"), Path(r"C:\Users\adria\OneDrive\iPad-ajustes")]

for name in names:
    p = next(f / name for f in folders if (f / name).exists())
    im = Image.open(p).convert("RGB")
    W, H = im.size
    px = im.load()
    runs = []
    for y in range(0, H):
        coloured = 0
        cols = []
        for x in range(1200, 1600, 2):
            r, g, b = px[x, y]
            if max(r, g, b) - min(r, g, b) > 45:
                coloured += 1
                cols.append(x)
        if coloured > 25:
            runs.append((y, min(cols), max(cols)))
    # agrupa
    groups = []
    for y, x0, x1 in runs:
        if groups and y - groups[-1][1] <= 2:
            groups[-1][1] = y
            groups[-1][2] = min(groups[-1][2], x0)
            groups[-1][3] = max(groups[-1][3], x1)
        else:
            groups.append([y, y, x0, x1])
    print(f"\n{name} ({W}x{H})")
    for g in groups:
        print(f"  banda y={g[0]}..{g[1]}  x={g[2]}..{g[3]}  color={px[(g[2]+g[3])//2, (g[0]+g[1])//2]}")
