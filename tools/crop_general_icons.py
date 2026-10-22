#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Recorta los mosaicos de icono de la pagina General de Ajustes real.

Localiza el mosaico en la columna de iconos (x=822..880) alrededor de la fila
indicada y lo guarda en icons-real/ como PNG con transparencia.
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = Path(r"C:\Users\adria\AppData\Local\Temp\opencode")
OUT = ROOT / "icons-real"
SIZE = 58
X = 822

# (captura, y del texto de la fila) -> nombre del icono
ROWS = [
    ("IMG_0106.PNG", 693, "info"),
    ("IMG_0106.PNG", 792, "softwareupdate"),
    ("IMG_0106.PNG", 888, "storage"),
    ("IMG_0106.PNG", 1057, "applecare"),
    ("IMG_0106.PNG", 1222, "airdrop"),
    ("IMG_0106.PNG", 1320, "airplay"),
    ("IMG_0106.PNG", 1485, "backgroundupdate"),
    ("IMG_0106.PNG", 1587, "autofill"),
    ("IMG_0108.PNG", 405, "dictionary"),
    ("IMG_0108.PNG", 508, "datetime"),
    ("IMG_0108.PNG", 603, "language"),
    ("IMG_0108.PNG", 697, "gamepad"),
    ("IMG_0108.PNG", 792, "keyboard"),
    ("IMG_0108.PNG", 889, "fonts"),
    ("IMG_0108.PNG", 1054, "tvprovider"),
    ("IMG_0108.PNG", 1221, "vpn"),
    ("IMG_0108.PNG", 1388, "legal"),
    ("IMG_0108.PNG", 1552, "transfer"),
]


def tile_box(im, text_y):
    """Busca el alto real del mosaico en la columna de iconos."""
    px = im.load()
    W, H = im.size
    top = None
    bottom = None
    for y in range(max(0, text_y - 45), min(H, text_y + 45)):
        row = [px[x, y] for x in range(X, X + SIZE)]
        # "mosaico" = pixel oscuro o saturado (excluye blanco y gris de fondo)
        ink = sum(1 for c in row if max(c) - min(c) > 12 or max(c) < 225)
        if ink > 3:
            if top is None:
                top = y
            bottom = y
    if top is None:
        return None
    return top, bottom


def main():
    OUT.mkdir(exist_ok=True)
    cache = {}
    for filename, text_y, name in ROWS:
        if filename not in cache:
            cache[filename] = Image.open(SRC / filename).convert("RGB")
        im = cache[filename]
        box = tile_box(im, text_y)
        if not box:
            print(f"{name:18s} SIN MOSAICO en {filename} (texto y={text_y})")
            continue
        top, bottom = box
        cy = (top + bottom) // 2
        y0 = max(0, cy - SIZE // 2)
        if y0 + SIZE > im.size[1]:
            print(f"{name:18s} FUERA DE MARGEN en {filename} (fila {text_y})")
            continue
        crop = im.crop((X, y0, X + SIZE, y0 + SIZE)).convert("RGBA")
        bg = crop.getpixel((0, 0))[:3]
        pix = crop.load()
        for cy2 in range(SIZE):
            for cx in range(SIZE):
                p = pix[cx, cy2]
                if p[:3] == bg:
                    pix[cx, cy2] = (*p[:3], 0)
        crop.save(OUT / f"{name}.png", optimize=True)
        print(f"{name:18s} {filename} y={y0} (fila {text_y}, mosaico {top}..{bottom})")


if __name__ == "__main__":
    main()
