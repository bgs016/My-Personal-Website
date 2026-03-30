#!/usr/bin/env python3
"""Regenerate public/logos/*.png with transparent backgrounds and uniform height.

NoTraffic and Motorola are sourced from the composite strip; Radware is maintained
as public/logos/radware.png (official dot-cluster mark) and only keyed/resized here.

Requires Pillow: python3 -m venv .venv && .venv/bin/pip install Pillow
Run from repo root: .venv/bin/python scripts/process-career-logos.py
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC_LOGOS = ROOT / "public" / "logos"
COMPOSITE = ROOT / "scripts" / "logo-composite-source.png"

MOTOROLA_BOX = (0, 308, 1024, 428)

TARGET_HEIGHT_PX = 256


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


def resize_to_height(im: Image.Image, target_h: int) -> Image.Image:
    w, h = im.size
    if h == target_h:
        return im
    ratio = target_h / h
    new_w = max(1, int(round(w * ratio)))
    return im.resize((new_w, target_h), Image.Resampling.LANCZOS)


def main() -> None:
    if not COMPOSITE.is_file():
        raise SystemExit(f"Missing {COMPOSITE}")

    comp = Image.open(COMPOSITE).convert("RGBA")
    motor_src = comp.crop(MOTOROLA_BOX)

    notraffic_path = PUBLIC_LOGOS / "notraffic.png"
    radware_path = PUBLIC_LOGOS / "radware.png"
    if not notraffic_path.is_file():
        raise SystemExit(f"Missing {notraffic_path}")
    if not radware_path.is_file():
        raise SystemExit(f"Missing {radware_path}")

    notraffic_raw = Image.open(notraffic_path).convert("RGBA")
    radware_raw = Image.open(radware_path).convert("RGBA")

    nt = trim_alpha(key_black(notraffic_raw))
    target_h = min(TARGET_HEIGHT_PX, max(64, nt.size[1]))
    nt = resize_to_height(nt, target_h)

    motor = resize_to_height(trim_alpha(key_black(motor_src)), target_h)
    rad = resize_to_height(trim_alpha(key_black(radware_raw)), target_h)

    outputs = [
        ("notraffic.png", nt),
        ("motorola-solutions.png", motor),
        ("radware.png", rad),
    ]

    for filename, out in outputs:
        dest = PUBLIC_LOGOS / filename
        out.save(dest, "PNG", optimize=True)
        print(f"wrote {dest.relative_to(ROOT)}  ({out.size[0]}×{out.size[1]})")


if __name__ == "__main__":
    main()
