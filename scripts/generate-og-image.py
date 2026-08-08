#!/usr/bin/env python3
"""
Generate public/og-image.png — the 1200x630 social card.

Layout mirrors the hero section: dark #0a0a0f canvas, violet/cyan radial
glows, and the name rendered with the exact hero `gradient-text` colors
(linear-gradient(135deg, #8b5cf6, #06b6d4)) so the card matches the site.

Run:  python3 scripts/generate-og-image.py
Needs: PIL + the Inter TTFs in /home/user/.fonts/Inter-*.ttf
"""

from PIL import Image, ImageDraw, ImageFont
import math

W, H = 1200, 630
BG = (10, 10, 15)
FONT_DIR = "/home/user/.fonts"

# Radial glow sources: (cx, cy, (r,g,b), radius, strength)
# falloff = strength * (1 - d/radius)^2, added per-pixel onto the background.
GLOWS = [
    (140, 100, (124, 58, 237), 520, 0.55),
    (1060, 100, (6, 182, 212), 520, 0.45),
    (600, 620, (124, 58, 237), 640, 0.40),
    (60, 600, (6, 182, 212), 420, 0.28),
]

# Hero gradient-text colors (src/styles/global.css .gradient-text)
NAME_GRADIENT_TOP = (139, 92, 246)   # --color-primary-light #8b5cf6
NAME_GRADIENT_BOTTOM = (6, 182, 212)  # --color-accent #06b6d4

ROLE_COLOR = (226, 232, 240)   # --color-text #e2e8f0
SUB_COLOR = (148, 163, 184)    # --color-text-muted #94a3b8
FOOTER_COLOR = (139, 92, 246)  # --color-primary-light #8b5cf6

# Text lines: (text, font, size, center_x, center_y)
LINES = [
    ("Gagan Jain", "Inter-Bold.ttf", 90, 600, 204),
    ("AI / LLM Engineer", "Inter-SemiBold.ttf", 37, 600, 323),
    ("Building production-grade GenAI systems", "Inter-Regular.ttf", 23, 600, 376),
    ("Agentic AI - RAG - LLM Fine-tuning - MCP", "Inter-Regular.ttf", 27, 600, 419),
    ("gaganjain.vercel.app", "Inter-Regular.ttf", 28, 600, 562),
]

PAD = 30  # gradient bbox padding so descenders (g, a) keep full contrast


def load_font(family, size):
    return ImageFont.truetype(f"{FONT_DIR}/{family}", size)


def add_glows(base):
    """Additive per-pixel radial glows on top of the flat background."""
    img = base.convert("RGB")
    px = img.load()
    for cx, cy, (cr, cg, cb), radius, strength in GLOWS:
        r2 = radius * radius
        x0, x1 = max(0, int(cx - radius)), min(W, int(cx + radius) + 1)
        y0, y1 = max(0, int(cy - radius)), min(H, int(cy + radius) + 1)
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


def gradient_text(draw, text, font, center_x, center_y, color_top, color_bottom):
    """Draw text with a 135deg (top-left -> bottom-right) gradient fill spanning
    the padded ink bbox, horizontally centered and ink-centered vertically."""
    probe = Image.new("L", (W, H), 0)
    pd = ImageDraw.Draw(probe)
    pd.text((0, 0), text, font=font, fill=255)
    ink = probe.getbbox()
    bx0, by0, bx1, by1 = ink
    bw, bh = bx1 - bx0, by1 - by0
    span = (bw + 2 * PAD) + (bh + 2 * PAD)

    mask = Image.new("L", (W, H), 0)
    md = ImageDraw.Draw(mask)
    x = center_x - (bx0 + bx1) // 2
    y = center_y - (by0 + by1) // 2
    md.text((x, y), text, font=font, fill=255)

    mpx = mask.load()
    out = Image.new("RGB", (W, H), (0, 0, 0))
    opx = out.load()
    ox = x + bx0 - PAD
    oy = y + by0 - PAD
    for yy in range(H):
        for xx in range(W):
            if mpx[xx, yy]:
                t = min(1.0, max(0.0, ((xx - ox) + (yy - oy)) / span))
                opx[xx, yy] = (
                    int(color_top[0] + (color_bottom[0] - color_top[0]) * t),
                    int(color_top[1] + (color_bottom[1] - color_top[1]) * t),
                    int(color_top[2] + (color_bottom[2] - color_top[2]) * t),
                )
    return out, mask


def main():
    base = Image.new("RGB", (W, H), BG)
    img = add_glows(base)

    for text, family, size, cx, cy in LINES:
        font = load_font(family, size)
        if text == "Gagan Jain":
            # name gets the hero gradient-text colors
            grad_img, mask = gradient_text(
                img, text, font, cx, cy, NAME_GRADIENT_TOP, NAME_GRADIENT_BOTTOM
            )
            img = Image.composite(grad_img, img, mask)
            continue

        color = FOOTER_COLOR if text == "gaganjain.vercel.app" else (
            ROLE_COLOR if family == "Inter-SemiBold.ttf" else SUB_COLOR
        )
        draw = ImageDraw.Draw(img)
        bbox = draw.textbbox((0, 0), text, font=font)
        x = cx - (bbox[0] + bbox[2]) // 2
        y = cy - (bbox[1] + bbox[3]) // 2
        draw.text((x, y), text, font=font, fill=color)

    img.save("/home/user/final-check/public/og-image.png")
    print("wrote public/og-image.png", img.size)


if __name__ == "__main__":
    main()
