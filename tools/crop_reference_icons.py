#!/usr/bin/env python
"""Recorta los iconos raster originales de capturas de Ajustes del iPad."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
REFERENCES = Path(r"C:\Users\adria\OneDrive\iPad-ajustes")
OUTPUT = ROOT / "icons-real"
SIZE = 58
HERO_SIZE = 120

# (captura, x, y). Las capturas son de 2160x1620 (2x); cada recorte mide 29pt.
CROPS = {
    "airplane": ("IMG_0040.PNG", 66, 772),
    "wifi": ("IMG_0040.PNG", 66, 860),
    "bluetooth": ("IMG_0040.PNG", 66, 948),
    "battery": ("IMG_0040.PNG", 66, 1036),
    "general": ("IMG_0040.PNG", 66, 1194),
    "accessibility": ("IMG_0040.PNG", 66, 1282),
    "pencil": ("IMG_0040.PNG", 66, 1370),
    "search": ("IMG_0040.PNG", 66, 1458),
    "camera": ("IMG_0040.PNG", 66, 1546),
    "controlcenter": ("IMG_0083.PNG", 66, 166),
    "wallpaper": ("IMG_0083.PNG", 66, 254),
    "multitask": ("IMG_0083.PNG", 66, 342),
    "homescreen": ("IMG_0083.PNG", 66, 455),
    "display": ("IMG_0083.PNG", 66, 568),
    "siri": ("IMG_0083.PNG", 66, 654),
    "notifications": ("IMG_0083.PNG", 66, 814),
    "sounds": ("IMG_0083.PNG", 66, 902),
    "focus": ("IMG_0083.PNG", 66, 990),
    "screentime": ("IMG_0083.PNG", 66, 1078),
    "touchid": ("IMG_0083.PNG", 66, 1232),
    "privacy": ("IMG_0083.PNG", 66, 1324),
    "wallet": ("IMG_0084.PNG", 66, 1172),
    "gamecenter": ("IMG_0084.PNG", 66, 1264),
    "icloud": ("IMG_0084.PNG", 66, 1352),
    "info": ("IMG_0040.PNG", 822, 668),
    "softwareupdate": ("IMG_0040.PNG", 822, 764),
    "storage": ("IMG_0040.PNG", 822, 860),
    "applecare": ("IMG_0040.PNG", 822, 1028),
    "airdrop": ("IMG_0040.PNG", 822, 1188),
    "airplay": ("IMG_0040.PNG", 822, 1288),
    "backgroundupdate": ("IMG_0040.PNG", 822, 1454),
    "autofill": ("IMG_0040.PNG", 822, 1556),
    "voiceover": ("IMG_0083.PNG", 822, 349),
    "zoom": ("IMG_0083.PNG", 822, 445),
    "floatingtext": ("IMG_0083.PNG", 822, 541),
    "textsize": ("IMG_0083.PNG", 822, 637),
    "motion": ("IMG_0083.PNG", 822, 733),
    "readcontent": ("IMG_0083.PNG", 822, 829),
    "audiodesc": ("IMG_0083.PNG", 822, 925),
    "touch": ("IMG_0083.PNG", 822, 1144),
    "switchcontrol": ("IMG_0083.PNG", 822, 1240),
    "voicecontrol": ("IMG_0083.PNG", 822, 1336),
    "homebutton": ("IMG_0083.PNG", 822, 1432),
}

HERO_CROPS = {
    "general": ("IMG_0040.PNG", 1395, 226),
    "wifi": ("IMG_0045.PNG", 1395, 262),
    "bluetooth": ("IMG_0046.PNG", 1395, 226),
}


def main():
    OUTPUT.mkdir(exist_ok=True)
    for name, (filename, x, y) in CROPS.items():
        image = Image.open(REFERENCES / filename).convert("RGBA")
        if image.size != (2160, 1620):
            raise ValueError(f"Unexpected reference size: {filename}={image.size}")
        crop = image.crop((x, y, x + SIZE, y + SIZE))
        background = crop.getpixel((0, 0))[:3]
        pixels = crop.load()
        for cy in range(SIZE):
            for cx in range(SIZE):
                pixel = pixels[cx, cy]
                if pixel[:3] == background:
                    pixels[cx, cy] = (*pixel[:3], 0)
        crop.save(OUTPUT / f"{name}.png", optimize=True)
        print(f"{name}: {filename} ({x},{y})")
    for name, (filename, x, y) in HERO_CROPS.items():
        image = Image.open(REFERENCES / filename).convert("RGBA")
        crop = image.crop((x, y, x + HERO_SIZE, y + HERO_SIZE))
        background = crop.getpixel((0, 0))[:3]
        pixels = crop.load()
        for cy in range(HERO_SIZE):
            for cx in range(HERO_SIZE):
                pixel = pixels[cx, cy]
                if pixel[:3] == background:
                    pixels[cx, cy] = (*pixel[:3], 0)
        crop.save(OUTPUT / f"{name}-hero.png", optimize=True)
        print(f"{name}-hero: {filename} ({x},{y})")


if __name__ == "__main__":
    main()
