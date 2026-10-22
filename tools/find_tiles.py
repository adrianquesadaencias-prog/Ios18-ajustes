"""Detecta los mosaicos (iconos) de la barra lateral en una captura real:
recorre la columna x=66..124 y agrupa las bandas de color, indicando el color
medio de cada banda. Sirve para comprobar/ajustar las coordenadas de recorte."""
import sys
from pathlib import Path
from PIL import Image

folders = [Path(r"C:\Users\adria\AppData\Local\Temp\opencode"), Path(r"C:\Users\adria\OneDrive\iPad-ajustes")]
name = sys.argv[1] if len(sys.argv) > 1 else "IMG_0040.PNG"
x0, x1 = (int(sys.argv[2]), int(sys.argv[3])) if len(sys.argv) > 3 else (66, 124)

p = next(f / name for f in folders if (f / name).exists())
im = Image.open(p).convert("RGB")
W, H = im.size
px = im.load()

def is_tile(y):
    """El centro de un mosaico es de color plano saturado o gris oscuro."""
    vals = [px[x, y] for x in range(x0 + 8, x1 - 8)]
    r = sum(v[0] for v in vals) / len(vals)
    g = sum(v[1] for v in vals) / len(vals)
    b = sum(v[2] for v in vals) / len(vals)
    sat = max(r, g, b) - min(r, g, b)
    return (sat > 30 and max(r, g, b) < 250) or (max(r, g, b) < 190)

bands = []
for y in range(H):
    if is_tile(y):
        if bands and y - bands[-1][1] <= 3:
            bands[-1][1] = y
        else:
            bands.append([y, y])

print(f"{name}  x={x0}..{x1}  ({W}x{H})")
for a, b in bands:
    if b - a < 20:
        continue
    cy = (a + b) // 2
    c = px[(x0 + x1) // 2, cy]
    print(f"  banda y={a:4}..{b:4} alto={b-a+1:3}  centro=({(x0+x1)//2},{cy}) color={c}")
