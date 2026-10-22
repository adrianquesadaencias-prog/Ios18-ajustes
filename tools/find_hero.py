"""Busca el icono grande (mosaico de 60pt = 120px) en la franja superior del
panel de detalle de cada captura real y describe su color, para identificar
que captura corresponde a cada seccion y donde esta el mosaico."""
from pathlib import Path
from PIL import Image

SRC = [Path(r"C:\Users\adria\AppData\Local\Temp\opencode"), Path(r"C:\Users\adria\OneDrive\iPad-ajustes")]

for folder in SRC:
    for p in sorted(folder.glob("IMG_*.PNG")):
        im = Image.open(p).convert("RGB")
        W, H = im.size
        px = im.load()
        # franja donde suele estar el hero: y 150..420, x 1200..1700
        best = None
        for y0 in range(140, 420, 4):
            for x0 in range(1200, 1700, 4):
                # color saturado en el centro de un bloque 120x120
                cx, cy = x0 + 60, y0 + 60
                if cx >= W or cy >= H:
                    continue
                r, g, b = px[cx, cy]
                sat = max(r, g, b) - min(r, g, b)
                if sat > 60 and not (max(r, g, b) > 240 and min(r, g, b) > 235):
                    # comprobar que el bloque es homogeneo (mosaico de color)
                    ok = 0
                    for dy in (-40, 0, 40):
                        for dx in (-40, 0, 40):
                            rr, gg, bb = px[cx + dx, cy + dy]
                            if abs(rr - r) + abs(gg - g) + abs(bb - b) < 40:
                                ok += 1
                    if ok >= 8:
                        best = (x0, y0, (r, g, b), sat)
                        break
            if best:
                break
        if best:
            print(f"{p.name:14} hero? x={best[0]} y={best[1]} rgb={best[2]} sat={best[3]}")
        else:
            print(f"{p.name:14} sin mosaico de color en la franja superior")
