#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Pasa OCR a las capturas del iPad y guarda el texto de cada una."""
import glob
import os
import subprocess
import sys

D = r"C:\Users\adria\OneDrive\iPad-ajustes"
OUT = r"C:\Users\adria\Desktop\iPadOS-Settings-18\tools\ocr"
TESS = r"D:\scoop\apps\tesseract\current\tesseract.exe"
TESSDATA = r"D:\scoop\apps\tesseract-languages\current"

os.makedirs(OUT, exist_ok=True)
env = dict(os.environ, TESSDATA_PREFIX=TESSDATA)

files = sorted(glob.glob(os.path.join(D, 'IMG_*.PNG')))
if len(sys.argv) > 1:
    files = [f for f in files if sys.argv[1] in os.path.basename(f)]

for p in files:
    name = os.path.splitext(os.path.basename(p))[0]
    dst = os.path.join(OUT, name + '.txt')
    if os.path.exists(dst) and os.path.getsize(dst) > 10:
        print('  ya tiene OCR:', name)
        continue
    cmd = [TESS, p, os.path.join(OUT, name), '-l', 'spa+eng',
           '--psm', '6', '--oem', '1', '-c', 'preserve_interword_spaces=1']
    try:
        subprocess.run(cmd, check=True, capture_output=True, env=env, timeout=180)
        txt = open(dst, encoding='utf-8', errors='replace').read()
        print(f'  {name}: {len(txt)} chars')
    except subprocess.CalledProcessError as e:
        print('  ERROR', name, e.stderr.decode('utf-8', 'replace')[:200])
    except Exception as e:
        print('  ERROR', name, e)
print('listo ->', OUT)
