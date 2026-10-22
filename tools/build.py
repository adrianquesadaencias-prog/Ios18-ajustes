#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Construye los recursos graficos de la app "Ajustes iPadOS 18":
  1. Descarga el sprite de Bootstrap Icons (MIT) y extrae SOLO los simbolos
     que usa la app, inyectandolos en index.html (funciona en file:// y http://).
  2. Genera los iconos PNG de la app (180x180, 512x512, maskable) sin dependencias.

Uso:  python tools/build.py
"""
import os, re, sys, zlib, struct, math, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SPRITE_URL = "https://registry.npmjs.org/bootstrap-icons/-/bootstrap-icons-1.11.3.tgz"
CACHE = os.path.join(HERE, "bootstrap-icons.svg")


# --------------------------------------------------------------- utilidades
def log(*a):
    print(*a)


def fetch_sprite():
    if os.path.exists(CACHE) and os.path.getsize(CACHE) > 100_000:
        log("[+] sprite en cache:", CACHE)
        return open(CACHE, "r", encoding="utf-8").read()
    log("[+] descargando paquete de iconos (npm)...")
    import tarfile, io
    req = urllib.request.Request(SPRITE_URL, headers={"User-Agent": "Mozilla/5.0"})
    raw = urllib.request.urlopen(req, timeout=180).read()
    with tarfile.open(fileobj=io.BytesIO(raw), mode="r:gz") as tf:
        member = tf.getmember("package/bootstrap-icons.svg")
        data = tf.extractfile(member).read().decode("utf-8")
    with open(CACHE, "w", encoding="utf-8") as f:
        f.write(data)
    log("[+] sprite guardado:", CACHE, "(%.1f KB)" % (len(data) / 1024))
    return data


def used_icons():
    """Escanea data.js y app.js en busca de nombres de iconos usados."""
    names = set()
    for fn in ("data.js", "app.js"):
        p = os.path.join(ROOT, fn)
        if not os.path.exists(p):
            continue
        src = open(p, "r", encoding="utf-8").read()
        names |= set(re.findall(r"icon:\s*'([a-z0-9-]+)'", src))
        names |= set(re.findall(r"href=\"#([a-z0-9-]+)\"", src))
        names |= set(re.findall(r"use href=\"#([a-z0-9-]+)\"", src))
    names.discard("SPRITE")
    return sorted(names)


def extract_symbols(svg, wanted):
    out, missing = [], []
    for name in wanted:
        m = re.search(r'<symbol[^>]*id="%s"[^>]*>.*?</symbol>' % re.escape(name), svg, re.S)
        if m:
            out.append(m.group(0))
        else:
            missing.append(name)
    return out, missing


def inject_sprite(symbols):
    p = os.path.join(ROOT, "index.html")
    html = open(p, "r", encoding="utf-8").read()
    block = "\n".join(symbols)
    new = re.sub(r"<!--SPRITE-->", block, html)
    open(p, "w", encoding="utf-8").write(new)
    log("[+] %d simbolos inyectados en index.html" % len(symbols))


# --------------------------------------------------------------- PNG a pelo
def write_png(path, w, h, pixels):
    """pixels: bytes RGBa -> lista de filas RGBA"""
    raw = b""
    for y in range(h):
        raw += b"\x00" + pixels[y * w * 4:(y + 1) * w * 4]

    def chunk(tag, data):
        c = struct.pack(">I", len(data)) + tag + data
        return c + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0))
    png += chunk(b"IDAT", zlib.compress(raw, 9))
    png += chunk(b"IEND", b"")
    open(path, "wb").write(png)
    log("[+] escrito", os.path.basename(path), "%dx%d" % (w, h))


def app_icon(size, maskable=False):
    """Icono tipo Ajustes de iOS: fondo gris degradado + engranaje blanco."""
    SS = 3  # supersampling
    W = H = size
    r = size * (0.225 if not maskable else 0.5)
    cx = cy = size / 2

    base_r = size * (0.30 if not maskable else 0.255)
    tooth = size * 0.075
    hole = size * 0.115

    px = bytearray(W * H * 4)
    for y in range(H):
        for x in range(W):
            r_acc = g_acc = b_acc = a_acc = 0.0
            for sy in range(SS):
                for sx in range(SS):
                    fx = x + (sx + 0.5) / SS
                    fy = y + (sy + 0.5) / SS

                    # fondo redondeado (fuera -> transparente en version normal)
                    inside = True
                    if not maskable:
                        dx = max(r - fx, 0, fx - (W - r))
                        dy = max(r - fy, 0, fy - (H - r))
                        inside = (dx * dx + dy * dy) <= r * r

                    if not inside:
                        continue

                    # degradado vertical gris (como el icono real de Ajustes)
                    t = fy / H
                    br = int(196 + (118 - 196) * t)
                    bg = int(200 + (122 - 200) * t)
                    bb = int(206 + (128 - 206) * t)
                    col = (br, bg, bb)

                    # engranaje
                    ddx = fx - cx
                    ddy = fy - cy
                    rad = math.hypot(ddx, ddy)
                    ang = math.atan2(ddy, ddx)
                    rim = base_r + tooth * (0.5 + 0.5 * math.cos(8 * ang)) ** 1.6
                    if hole < rad <= rim:
                        col = (252, 252, 253)

                    r_acc += col[0]; g_acc += col[1]; b_acc += col[2]; a_acc += 255

            n = SS * SS
            i = (y * W + x) * 4
            if a_acc == 0:
                px[i:i + 4] = b"\x00\x00\x00\x00"
            else:
                cov = a_acc / (255.0 * n)
                px[i]     = int(r_acc / (a_acc / 255.0))
                px[i + 1] = int(g_acc / (a_acc / 255.0))
                px[i + 2] = int(b_acc / (a_acc / 255.0))
                px[i + 3] = int(255 * cov)
    return bytes(px)


def main():
    svg = fetch_sprite()
    wanted = used_icons()
    log("[+] iconos referenciados en el codigo:", len(wanted))
    symbols, missing = extract_symbols(svg, wanted)
    if missing:
        log("[!] NO ENCONTRADOS en Bootstrap Icons:", ", ".join(missing))
    inject_sprite(symbols)

    for size, name in ((180, "icon-180.png"), (512, "icon-512.png")):
        write_png(os.path.join(ROOT, name), size, size, app_icon(size))
    write_png(os.path.join(ROOT, "icon-maskable-512.png"), 512, 512, app_icon(512, maskable=True))


if __name__ == "__main__":
    main()
