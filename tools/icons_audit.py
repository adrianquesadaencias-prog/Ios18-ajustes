import os, hashlib, struct, zlib, sys

DIR = r'C:\Users\adria\Desktop\iPadOS-Settings-18\icons-real'

def png_stats(path):
    data = open(path, 'rb').read()
    if data[:8] != b'\x89PNG\r\n\x1a\n':
        return None
    pos = 8
    w = h = None
    idat = b''
    bitdepth = colortype = None
    while pos < len(data):
        ln = struct.unpack('>I', data[pos:pos+4])[0]
        typ = data[pos+4:pos+8]
        chunk = data[pos+8:pos+8+ln]
        if typ == b'IHDR':
            w, h, bitdepth, colortype = struct.unpack('>IIBB', chunk[:10])
        elif typ == b'IDAT':
            idat += chunk
        pos += 12 + ln
    try:
        raw = zlib.decompress(idat)
    except Exception:
        return (w, h, None, None)
    ch = {0: 1, 2: 3, 3: 1, 4: 2, 6: 4}.get(colortype, 4)
    stride = w * ch
    # unfilter
    out = bytearray()
    prev = bytearray(stride)
    p = 0
    for y in range(h):
        ft = raw[p]; p += 1
        line = bytearray(raw[p:p+stride]); p += stride
        if ft == 1:
            for i in range(ch, len(line)):
                line[i] = (line[i] + line[i-ch]) & 255
        elif ft == 2:
            for i in range(len(line)):
                line[i] = (line[i] + prev[i]) & 255
        elif ft == 3:
            for i in range(len(line)):
                a = line[i-ch] if i >= ch else 0
                line[i] = (line[i] + ((a + prev[i]) >> 1)) & 255
        elif ft == 4:
            for i in range(len(line)):
                a = line[i-ch] if i >= ch else 0
                b = prev[i]
                c = prev[i-ch] if i >= ch else 0
                pa, pb, pc = abs(b-c), abs(a-c), abs(a+b-2*c)
                pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                line[i] = (line[i] + pr) & 255
        out += line
        prev = line
    # alpha stats
    if ch == 4:
        alphas = out[3::4]
    elif ch == 2:
        alphas = out[1::2]
    else:
        alphas = b'\xff' * (w*h)
    opaque = sum(1 for a in alphas if a > 8)
    return (w, h, opaque / (w*h), out)

rows = []
for name in sorted(os.listdir(DIR)):
    if not name.endswith('.png'):
        continue
    path = os.path.join(DIR, name)
    r = png_stats(path)
    h = hashlib.md5(open(path, 'rb').read()).hexdigest()[:10]
    if r is None:
        print('NO PNG', name)
        continue
    w, hh, ratio, _ = r
    rows.append((name, os.path.getsize(path), w, hh, ratio, h))

print(f"{'archivo':26} {'bytes':>7} {'w':>4} {'h':>4} {'opaco':>7}  md5")
for name, size, w, hh, ratio, h in rows:
    flag = ''
    if ratio is not None and ratio < 0.20:
        flag = '  <-- CASI VACIO'
    if size < 400:
        flag += '  <-- MUY PEQUENO'
    print(f'{name:26} {size:7} {w:4} {hh:4} {(ratio if ratio is not None else -1):7.3f}  {h}{flag}')

# duplicados
seen = {}
for name, size, w, hh, ratio, h in rows:
    seen.setdefault(h, []).append(name)
dups = {k: v for k, v in seen.items() if len(v) > 1}
print('\nDuplicados exactos:')
for k, v in dups.items():
    print('  ', ', '.join(v))
