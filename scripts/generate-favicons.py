#!/usr/bin/env python3
"""Generate PNG favicons + ICO matching public/favicon.svg's design.

Dark rounded tile, violet/cyan glow orbs, gradient border ring, and a GJ
monogram in the brand gradient — rasterized with PIL + Inter TTFs so the
result is crisp at every favicon size.

Run:  python3 scripts/generate-favicons.py
"""
from PIL import Image, ImageDraw, ImageFont
import math

FONT_DIR = "/home/user/.fonts"
OUT = "/home/user/final-check/public"

BG = (10, 10, 15)
GRAD_TOP = (139, 92, 246)    # #8b5cf6
GRAD_BOTTOM = (6, 182, 212)  # #06b6d4
RING_TOP = (167, 139, 250)   # #a78bfa
RING_BOTTOM = (34, 211, 238)  # #22d3ee

GLOWS = [
    (0.30, 0.25, (124, 58, 237), 0.62, 0.5),   # top-left violet
    (0.75, 0.80, (6, 182, 212), 0.62, 0.38),   # bottom-right cyan
]


def radial_glow(px, size, cx, cy, color, radius, strength):
    r2 = radius * radius
    x0, x1 = max(0, int(cx - radius)), min(size, int(cx + radius) + 1)
    y0, y1 = max(0, int(cy - radius)), min(size, int(cy + radius) + 1)
    for y in range(y0, y1):
        dy = y - cy
        for x in range(x0, x1):
            dx = x - cx
            d2 = dx * dx + dy * dy
            if d2 > r2:
                continue
            d = math.sqrt(d2)
            t = max(0.0, 1.0 - d / radius)
            s = strength * t * t
            r, g, b = px[x, y]
            px[x, y] = (
                min(255, int(r + color[0] * s)),
                min(255, int(g + color[1] * s)),
                min(255, int(b + color[2] * s)),
            )


def gradient_text(draw, text, font, cx, cy, c1, c2, pad):
    probe = Image.new("L", (1, 1), 0)
    # measure with the actual font
    probe = Image.new("L", (512, 512), 0)
    ImageDraw.Draw(probe).text((0, 0), text, font=font, fill=255)
    ink = probe.getbbox()
    bx0, by0, bx1, by1 = ink
    bw, bh = bx1 - bx0, by1 - by0
    span = (bw + 2 * pad) + (bh + 2 * pad)
    return bx0, by0, bw, bh, span


def make(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    # rounded tile mask
    tile = Image.new("L", (size, size), 0)
    td = ImageDraw.Draw(tile)
    pad = max(1, int(size * 0.02))
    radius = int(size * 0.22)
    td.rounded_rectangle([pad, pad, size - pad - 1, size - pad - 1], radius=radius, fill=255)

    # dark tile with glows
    tile_img = Image.new("RGB", (size, size), BG)
    px = tile_img.load()
    for (fx, fy, color, fr, fs) in GLOWS:
        radial_glow(px, size, int(size * fx), int(size * fy), color, size * fr, fs)

    # gradient border ring: draw a slightly larger rounded rect in gradient
    ring = Image.new("RGB", (size, size), (0, 0, 0))
    rp = ring.load()
    bw = 2.5 / 100 * size  # favicon.svg stroke-width 2.5
    outer = size - 2 * pad
    inner = outer - 2 * bw
    # draw gradient on the ring band
    for y in range(size):
        for x in range(size):
            # distance check via rounded-rect mask approximation
            t = min(1.0, (x + y) / (2 * size))
            col = (
                int(RING_TOP[0] + (RING_BOTTOM[0] - RING_TOP[0]) * t),
                int(RING_TOP[1] + (RING_BOTTOM[1] - RING_TOP[1]) * t),
                int(RING_TOP[2] + (RING_BOTTOM[2] - RING_TOP[2]) * t),
            )
            rp[x, y] = col

    ring_mask = Image.new("L", (size, size), 0)
    rd = ImageDraw.Draw(ring_mask)
    rd.rounded_rectangle([pad, pad, size - pad - 1, size - pad - 1], radius=radius, fill=255)
    inner_mask = Image.new("L", (size, size), 0)
    idd = ImageDraw.Draw(inner_mask)
    in_pad = pad + int(bw)
    in_r = max(1, radius - int(bw))
    idd.rounded_rectangle([in_pad, in_pad, size - in_pad - 1, size - in_pad - 1], radius=in_r, fill=255)
    ring_final = Image.composite(ring, Image.new("RGB", (size, size), (0, 0, 0)), ring_mask)
    ring_final = Image.composite(Image.new("RGB", (size, size), (0, 0, 0)), ring_final, inner_mask)
    # add ring onto tile
    tile_img = Image.composite(ring_final, tile_img, ring_mask)

    # GJ monogram in brand gradient
    fs = int(size * 0.5)
    font = ImageFont.truetype(f"{FONT_DIR}/Inter-Bold.ttf", fs)
    # 1) render the glyph mask at an offset so no bearing is clipped
    off = size
    tmask = Image.new("L", (size * 2, size * 2), 0)
    tmd = ImageDraw.Draw(tmask)
    tmd.text((off, off), "GJ", font=font, fill=255)
    ink = tmask.getbbox()
    iw, ih = ink[2] - ink[0], ink[3] - ink[1]
    # 2) center the ink box
    tx = (size - iw) // 2
    ty = (size - ih) // 2
    tmask = Image.new("L", (size, size), 0)
    tmd = ImageDraw.Draw(tmask)
    # paste the glyph at the centered position (subtract the ink origin)
    glyph = tmask2 = Image.new("L", (iw, ih), 0)
    src = Image.new("L", (size * 2, size * 2), 0)
    sd = ImageDraw.Draw(src)
    sd.text((off, off), "GJ", font=font, fill=255)
    src.crop((ink[0], ink[1], ink[2], ink[3])).save.__self__  # noop
    glyph = src.crop((ink[0], ink[1], ink[2], ink[3]))
    tmask.paste(glyph, (tx, ty))
    # 3) fill with the brand gradient across the ink box
    mono = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    px_m = mono.load()
    tink = tmask.getbbox()
    if tink:
        gx0, gy0 = tink[0], tink[1]
        grad_span = (tink[2] - tink[0]) + (tink[3] - tink[1])
        for y in range(tink[1], tink[3] + 1):
            for x in range(tink[0], tink[2] + 1):
                if tmask.getpixel((x, y)) > 0:
                    t = min(1.0, ((x - gx0) + (y - gy0)) / max(grad_span, 1))
                    px_m[x, y] = (
                        int(GRAD_TOP[0] + (GRAD_BOTTOM[0] - GRAD_TOP[0]) * t),
                        int(GRAD_TOP[1] + (GRAD_BOTTOM[1] - GRAD_TOP[1]) * t),
                        int(GRAD_TOP[2] + (GRAD_BOTTOM[2] - GRAD_TOP[2]) * t),
                        255,
                    )

    # composite: tile + text, clipped by rounded tile mask
    base = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    base.paste(Image.merge("RGBA", (*[c.convert("L") for c in tile_img.split()[:3]], tile)), (0, 0))
    base = Image.alpha_composite(base, mono)
    return base


sizes = [16, 32, 192, 512]
pngs = {}
for s in sizes:
    img = make(s)
    path = f"{OUT}/favicon-{s}.png"
    img.save(path)
    pngs[s] = img
    print(f"wrote favicon-{s}.png")

# favicon.ico (32x32 + 16x16)
ico = Image.new("RGBA", (32, 32), (0, 0, 0, 0))
ico.paste(pngs[32], (0, 0))
ico16 = pngs[16]
# Pillow can write multi-size ICO directly
ico_path = f"{OUT}/favicon.ico"
pngs[16].save(ico_path, format="ICO", sizes=[(16, 16), (32, 32)])
print("wrote favicon.ico")
