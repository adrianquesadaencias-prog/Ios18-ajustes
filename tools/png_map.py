"""Vuelca un mapa de color grueso (20x20) de un PNG como texto, para ver sin
imagen si el recorte contiene el icono esperado."""
import sys
from pathlib import Path
from PIL import Image

folder = Path(r"C:\Users\adria\Desktop\iPadOS-Settings-18\icons-real")
out = open(r"C:\Users\adria\AppData\Local\Temp\opencode\map.txt", "w", encoding="utf-8")

def name_for(c):
    r, g, b, a = c
    if a < 32:
        return ".."
    if r > 240 and g > 240 and b > 240:
        return "WW"
    if r < 40 and g < 160 and b > 200:
        return "BB"   # azul iOS
    if r < 60 and g > 160 and b < 120:
        return "GG"   # verde
    if abs(r - g) < 14 and abs(g - b) < 14:
        return "##" if r < 200 else "gg"
    if r > 150 and g < 110 and b < 110:
        return "RR"
    return "??"

for arg in (sys.argv[1:] or ["general-hero.png", "battery-hero.png", "info.png", "battery.png"]):
    p = folder / arg
    im = Image.open(p).convert("RGBA")
    W, H = im.size
    px = im.load()
    out.write(f"\n== {arg} {W}x{H} esquinas: {px[0,0]} {px[W-1,0]} {px[0,H-1]} {px[W-1,H-1]}\n")
    N = 24
    for j in range(N):
        line = []
        for i in range(N):
            x = int((i + 0.5) * W / N)
            y = int((j + 0.5) * H / N)
            line.append(name_for(px[x, y]))
        out.write(''.join(line) + '\n')
out.close()
print("ok")
