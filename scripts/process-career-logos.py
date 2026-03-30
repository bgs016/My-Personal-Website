#!/usr/bin/env python3
"""Regenerate public/logos/*.png with transparent backgrounds.

Requires Pillow: python3 -m venv .venv && .venv/bin/pip install Pillow
Run from repo root: .venv/bin/python scripts/process-career-logos.py
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC_LOGOS = ROOT / "public" / "logos"
COMPOSITE = ROOT / "scripts" / "logo-composite-source.png"

# Vertical slices in the 1024×1024 composite (logos stacked in center band).
MOTOROLA_BOX = (0, 310, 1024, 388)
RADWARE_BOX = (0, 466, 1024, 545)


def key_black(im: Image.Image, threshold: int = 44) -> Image.Image:
    """Turn near-black pixels fully transparent (keeps logo colors and white)."""
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if max(r, g, b) <= threshold:
                px[x, y] = (0, 0, 0, 0)
    return im


def trim_alpha(im: Image.Image) -> Image.Image:
    im = im.convert("RGBA")
    bbox = im.getbbox()
    return im.crop(bbox) if bbox else im


def main() -> None:
    if not COMPOSITE.is_file():
        raise SystemExit(f"Missing {COMPOSITE}")

    comp = Image.open(COMPOSITE).convert("RGBA")
    motor = comp.crop(MOTOROLA_BOX)
    rad = comp.crop(RADWARE_BOX)

    notraffic_path = PUBLIC_LOGOS / "notraffic.png"
    if not notraffic_path.is_file():
        raise SystemExit(f"Missing {notraffic_path}")
    notraffic = Image.open(notraffic_path).convert("RGBA")

    outputs: list[tuple[str, Image.Image]] = [
        ("motorola-solutions.png", motor),
        ("radware.png", rad),
        ("notraffic.png", notraffic),
    ]

    for filename, src in outputs:
        out = trim_alpha(key_black(src))
        dest = PUBLIC_LOGOS / filename
        out.save(dest, "PNG", optimize=True)
        print(f"wrote {dest.relative_to(ROOT)}  ({out.size[0]}×{out.size[1]})")


if __name__ == "__main__":
    main()
