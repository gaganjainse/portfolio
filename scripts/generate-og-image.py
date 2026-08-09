#!/usr/bin/env python3
"""
Generate public/og-image.png — the 1200x630 social card.

Layout mirrors the hero section: dark #0a0a0f canvas, violet/cyan radial
glows, and the name rendered with the exact hero `gradient-text` colors
(linear-gradient(135deg, #8b5cf6, #06b6d4)) so the card matches the site.

Run:  python3 scripts/generate-og-image.py
Needs: PIL + the Inter TTFs (FONT_DIR env, or ~/.fonts, ~/.local/share/fonts,
       /usr/share/fonts)
"""

import math
import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (10, 10, 15)
FONT_DIR = os.environ.get(
    "FONT_DIR",
    next(
        (
            str(p)
            for p in (
                Path.home() / ".fonts",
                Path.home() / ".local/share/fonts",
                Path("/usr/share/fonts"),
            )
            if (p / "Inter-Bold.ttf").exists()
        ),
        "/home/user/.fonts",
    ),
)
OUT = os.environ.get("OUT_DIR", str(Path(__file__).resolve().parent.parent / "public"))

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
# Layout: GJ tile near the top, generous gap, then name + details.
LINES = [
    ("Gagan Jain", "Inter-Bold.ttf", 92, 600, 250),
    ("AI / LLM Engineer", "Inter-SemiBold.ttf", 38, 600, 352),
    ("Building production-grade GenAI systems", "Inter-Regular.ttf", 24, 600, 404),
    ("Agentic AI - RAG - LLM Fine-tuning - MCP", "Inter-Regular.ttf", 28, 600, 448),
    ("gaganjain.vercel.app", "Inter-Regular.ttf", 30, 600, 560),
]

TILE_CENTER = (600, 86)   # favicon-style GJ tile, well above the name
TILE_SIZE = 128

# The whole card is rendered at 2x then LANCZOS-downsampled so the text and
# the tile are crisp on every platform (PIL draws at exact sizes otherwise).
SCALE = 2

PAD = 30  # gradient bbox padding so descenders (g, a) keep full contrast


def load_font(family, size):
    return ImageFont.truetype(f"{FONT_DIR}/{family}", size)


def add_glows(base):
    """Additive per-pixel radial glows on top of the flat background.
    Glow coordinates/radii are relative to the base size (works at 2x)."""
    img = base.convert("RGB")
    px = img.load()
    iw, ih = img.size
    sx, sy = iw / W, ih / H
    for cx, cy, (cr, cg, cb), radius, strength in GLOWS:
        cx, cy, radius = cx * sx, cy * sy, radius * sx
        r2 = radius * radius
        x0, x1 = max(0, int(cx - radius)), min(iw, int(cx + radius) + 1)
        y0, y1 = max(0, int(cy - radius)), min(ih, int(cy + radius) + 1)
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
    the padded ink bbox, horizontally centered and ink-centered vertically.
    Works at any canvas size (used at 2x for the final downscale)."""
    import sys
    canvas = (int(center_x) * 2 + 400, int(center_y) * 2 + 400)
    probe = Image.new("L", canvas, 0)
    pd = ImageDraw.Draw(probe)
    pd.text((0, 0), text, font=font, fill=255)
    ink = probe.getbbox()
    bx0, by0, bx1, by1 = ink
    bw, bh = bx1 - bx0, by1 - by0
    span = (bw + 2 * PAD) + (bh + 2 * PAD)

    mask = Image.new("L", canvas, 0)
    md = ImageDraw.Draw(mask)
    x = center_x - (bx0 + bx1) // 2
    y = center_y - (by0 + by1) // 2
    md.text((x, y), text, font=font, fill=255)

    mpx = mask.load()
    out = Image.new("RGB", canvas, (0, 0, 0))
    opx = out.load()
    ox = x + bx0 - PAD
    oy = y + by0 - PAD
    cw, ch = canvas
    for yy in range(ch):
        for xx in range(cw):
            if mpx[xx, yy]:
                t = min(1.0, max(0.0, ((xx - ox) + (yy - oy)) / span))
                opx[xx, yy] = (
                    int(color_top[0] + (color_bottom[0] - color_top[0]) * t),
                    int(color_top[1] + (color_bottom[1] - color_top[1]) * t),
                    int(color_top[2] + (color_bottom[2] - color_top[2]) * t),
                )
    return out, mask


def draw_favicon_tile(img, cx, cy, size):
    """Paste the favicon design (dark tile, gradient ring, glow orbs, GJ) —
    rendered by the same make() used for the favicon PNGs, so it matches
    exactly and the glow orbs are smooth radial gradients (no hard edges)."""
    # import from the sibling generator (make is pure; writes only under __main__)
    import sys, os, importlib.util
    here = os.path.dirname(os.path.abspath(__file__))
    spec = importlib.util.spec_from_file_location(
        "generate_favicons", os.path.join(here, "generate-favicons.py")
    )
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    make_tile = mod.make

    tile = make_tile(size).convert("RGBA")
    # paste centered at (cx, cy)
    x0 = cx - size // 2
    y0 = cy - size // 2
    img.paste(tile, (x0, y0), tile)


def main():
    # Render at 2x for sharpness, then downsample with LANCZOS.
    SW, SH = W * SCALE, H * SCALE
    base = Image.new("RGB", (SW, SH), BG)
    img = add_glows(base)

    # favicon-style GJ tile above the name (scaled)
    draw_favicon_tile(img, TILE_CENTER[0] * SCALE, TILE_CENTER[1] * SCALE, TILE_SIZE * SCALE)

    for text, family, size, cx, cy in LINES:
        font = load_font(family, size * SCALE)
        cx, cy = cx * SCALE, cy * SCALE
        if text == "Gagan Jain":
            # name gets the hero gradient-text colors
            grad_img, mask = gradient_text(
                img, text, font, cx, cy, NAME_GRADIENT_TOP, NAME_GRADIENT_BOTTOM
            )
            img = Image.composite(grad_img, img, mask)
            continue

        if text == "gaganjain.vercel.app":
            # website in the brand gradient too
            grad_img, mask = gradient_text(
                img, text, font, cx, cy, NAME_GRADIENT_TOP, NAME_GRADIENT_BOTTOM
            )
            img = Image.composite(grad_img, img, mask)
            continue

        color = ROLE_COLOR if family == "Inter-SemiBold.ttf" else SUB_COLOR
        draw = ImageDraw.Draw(img)
        bbox = draw.textbbox((0, 0), text, font=font)
        x = cx - (bbox[0] + bbox[2]) // 2
        y = cy - (bbox[1] + bbox[3]) // 2
        draw.text((x, y), text, font=font, fill=color)

    img = img.resize((W, H), Image.LANCZOS)
    img.save(f"{OUT}/og-image.png")
    print("wrote public/og-image.png", img.size)


if __name__ == "__main__":
    main()
