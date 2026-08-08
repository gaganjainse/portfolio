#!/usr/bin/env python3
"""
Generate screenshots/avatar.png — a square 512x512 project avatar
matching the site's branding: dark #0a0a0f, violet/cyan glows, and a
"GJ" monogram in the hero gradient (#8b5cf6 -> #06b6d4).

Run:  python3 scripts/generate-avatar.py
"""

from PIL import Image, ImageDraw, ImageFont
import math

SIZE = 512
BG = (10, 10, 15)
FONT_DIR = "/home/user/.fonts"

GLOWS = [
    (90, 60, (124, 58, 237), 340, 0.55),
    (430, 70, (6, 182, 212), 320, 0.4),
    (256, 500, (124, 58, 237), 380, 0.35),
]

GRAD_TOP = (139, 92, 246)   # #8b5cf6
GRAD_BOTTOM = (6, 182, 212)  # #06b6d4
PAD = 26


def add_glows(img):
    px = img.load()
    for cx, cy, (cr, cg, cb), radius, strength in GLOWS:
        r2 = radius * radius
        x0, x1 = max(0, int(cx - radius)), min(SIZE, int(cx + radius) + 1)
        y0, y1 = max(0, int(cy - radius)), min(SIZE, int(cy + radius) + 1)
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
                    min(255, int(r + cr * s)),
                    min(255, int(g + cg * s)),
                    min(255, int(b + cb * s)),
                )
    return img


def gradient_monogram(img, text, font, cy):
    probe = Image.new("L", (SIZE, SIZE), 0)
    ImageDraw.Draw(probe).text((0, 0), text, font=font, fill=255)
    ink = probe.getbbox()
    bx0, by0, bx1, by1 = ink
    bw, bh = bx1 - bx0, by1 - by0
    span = (bw + 2 * PAD) + (bh + 2 * PAD)

    mask = Image.new("L", (SIZE, SIZE), 0)
    md = ImageDraw.Draw(mask)
    x = (SIZE - (bx0 + bx1)) // 2
    y = cy - (by0 + by1) // 2
    md.text((x, y), text, font=font, fill=255)

    out = Image.new("RGB", (SIZE, SIZE), (0, 0, 0))
    opx = out.load()
    mpx = mask.load()
    ox = x + bx0 - PAD
    oy = y + by0 - PAD
    for yy in range(SIZE):
        for xx in range(SIZE):
            if mpx[xx, yy]:
                t = min(1.0, max(0.0, ((xx - ox) + (yy - oy)) / span))
                opx[xx, yy] = (
                    int(GRAD_TOP[0] + (GRAD_BOTTOM[0] - GRAD_TOP[0]) * t),
                    int(GRAD_TOP[1] + (GRAD_BOTTOM[1] - GRAD_TOP[1]) * t),
                    int(GRAD_TOP[2] + (GRAD_BOTTOM[2] - GRAD_TOP[2]) * t),
                )
    return out, mask


def main():
    img = Image.new("RGB", (SIZE, SIZE), BG)
    img = add_glows(img)

    # "GJ" monogram centered, big
    font = ImageFont.truetype(f"{FONT_DIR}/Inter-Bold.ttf", 170)
    grad, mask = gradient_monogram(img, "GJ", font, 238)
    img = Image.composite(grad, img, mask)

    # small name line below
    small = ImageFont.truetype(f"{FONT_DIR}/Inter-SemiBold.ttf", 34)
    d = ImageDraw.Draw(img)
    text = "GAGAN JAIN"
    bb = d.textbbox((0, 0), text, font=small)
    d.text(
        ((SIZE - (bb[0] + bb[2])) // 2, 360 - (bb[1] + bb[3]) // 2),
        text,
        font=small,
        fill=(148, 163, 184),
    )

    img.save("/home/user/final-check/screenshots/avatar.png")
    print("wrote screenshots/avatar.png", img.size)


if __name__ == "__main__":
    main()
