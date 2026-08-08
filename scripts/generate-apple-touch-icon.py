#!/usr/bin/env python3
"""Regenerate public/apple-touch-icon.png (180x180) with the brand gradient.

Dark #0a0a0f rounded square, "GJ" monogram filled with the site's hero
gradient (#8b5cf6 -> #06b6d4), matching favicon.svg and the avatar.

Run: python3 scripts/generate-apple-touch-icon.py
"""
from PIL import Image, ImageDraw, ImageFont
import math

SIZE = 180
BG = (10, 10, 15)
FONT_DIR = "/home/user/.fonts"
GRAD_TOP = (139, 92, 246)    # #8b5cf6
GRAD_BOTTOM = (6, 182, 212)  # #06b6d4
PAD = 10


def radial_glows(img):
    px = img.load()
    glows = [
        (40, 30, (124, 58, 237), 120, 0.5),
        (150, 30, (6, 182, 212), 110, 0.35),
        (90, 180, (124, 58, 237), 130, 0.3),
    ]
    for cx, cy, (cr, cg, cb), radius, strength in glows:
        r2 = radius * radius
        for y in range(max(0, int(cy - radius)), min(SIZE, int(cy + radius) + 1)):
            dy = y - cy
            for x in range(max(0, int(cx - radius)), min(SIZE, int(cx + radius) + 1)):
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


def gradient_text(draw, text, font, center_x, center_y):
    probe = Image.new("L", (SIZE, SIZE), 0)
    ImageDraw.Draw(probe).text((0, 0), text, font=font, fill=255)
    ink = probe.getbbox()
    bx0, by0, bx1, by1 = ink
    bw, bh = bx1 - bx0, by1 - by0
    span = (bw + 2 * PAD) + (bh + 2 * PAD)

    mask = Image.new("L", (SIZE, SIZE), 0)
    md = ImageDraw.Draw(mask)
    x = center_x - (bx0 + bx1) // 2
    y = center_y - (by0 + by1) // 2
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
    # Rounded-rect mask (apple icons are rounded squares, not circles)
    mask = Image.new("L", (SIZE, SIZE), 0)
    md = ImageDraw.Draw(mask)
    md.rounded_rectangle([0, 0, SIZE - 1, SIZE - 1], radius=40, fill=255)

    img = Image.new("RGB", (SIZE, SIZE), BG)
    img = radial_glows(img)

    font = ImageFont.truetype(f"{FONT_DIR}/Inter-Bold.ttf", 78)
    grad, gmask = gradient_text(img, "GJ", font, SIZE // 2, SIZE // 2)
    img = Image.composite(grad, img, gmask)

    out = Image.new("RGB", (SIZE, SIZE), (0, 0, 0))
    out.paste(img, (0, 0), mask)

    out.save("/home/user/final-check/public/apple-touch-icon.png")
    print("wrote public/apple-touch-icon.png", out.size)


if __name__ == "__main__":
    main()
