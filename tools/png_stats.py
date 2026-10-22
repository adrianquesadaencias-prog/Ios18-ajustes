"""Describe los colores dominantes de un PNG (para validar que un recorte no
es un bloque plano / vacio)."""
import sys
from collections import Counter
from pathlib import Path
from PIL import Image

folder = Path(r"C:\Users\adria\Desktop\iPadOS-Settings-18\icons-real")
for name in (sys.argv[1:] or sorted(f.name for f in folder.glob("*-hero.png"))):
    im = Image.open(folder / name).convert("RGBA")
    px = list(im.getdata())
    cnt = Counter(px)
    tot = len(px)
    print(f"\n{name}  {im.size[0]}x{im.size[1]}  colores distintos={len(cnt)}")
    for c, k in cnt.most_common(6):
        print(f"   {c}  {100*k/tot:5.1f}%")
