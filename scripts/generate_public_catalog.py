#!/usr/bin/env python3
"""Generate the public games.json for Coraline's Arcade GitHub repo.

Reads the staging copy's games.json (or a source path), keeps only the
sections and items that are safe to publish:

  - Items must use relative "games/..." URLs (no internal Tailscale/ROM hosts).
  - Items must point at directories we ship in this repo.
  - All ROM-library/emulator sections (absolute internal-service URLs) are dropped.

USAGE:
  python3 scripts/generate_public_catalog.py [source_games.json] [out.json]
"""

import json
import re
import sys
from pathlib import Path

# Directories we actually ship in the public repo. Anything not here is filtered.
SHIPPED_DIRS = (
    "2048",
    "2048-lite",
    "3d-city",
    "asteroids",
    "chess",
    "classic-pool",
    "clumsy-bird",
    "hearts",
    "hextris",
    "hextris-lite",
    "hsc",
    "mini",
    "missile-game",
    "pacman",
    "pacman-lite",
    "pond-lite",
    "shared",
    "taptaptap",
    "the-house",
    "tower",
    "twisty-polyhedra",
    "wolfenstein3d",
)

# Explicitly excluded even if they look "relative" — unlicensed or not shipped.
EXCLUDED_PREFIXES = (
    "games/browser-games/",
    "games/lrusso/",
    "games/kids/",
    "games/att/",
    "games/dead-valley/",
    "games/snakisms/",
    "games/mahjong/",
)

# Matches private lab hostnames/ports so the public catalog can never leak them.
INTERNAL_HOST = re.compile(r"drflex|tail[A-Za-z0-9]+\.ts\.net|:8090|:8092|:8093")


def is_safe(url: str) -> bool:
    if INTERNAL_HOST.search(url):
        return False
    if not url.startswith("games/"):
        return False
    if url.startswith(EXCLUDED_PREFIXES):
        return False
    top = url.split("/")[1] if "/" in url else ""
    return top in SHIPPED_DIRS


def main() -> None:
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("games.json")
    out = Path(sys.argv[2]) if len(sys.argv) > 2 else Path("games.public.json")

    data = json.loads(src.read_text())
    kept_sections = []
    removed_items = 0
    for sec in data["sections"]:
        kept = [i for i in sec["items"] if is_safe(i.get("url", ""))]
        removed_items += len(sec["items"]) - len(kept)
        if kept:
            # Rewrite the one SPI-hosted relative wolfenstein entry to local.
            for i in kept:
                if "wolfenstein" in i.get("url", "") and not i["url"].startswith(
                    "games/"
                ):
                    i["url"] = "games/wolfenstein3d/"
            sec["items"] = kept
            kept_sections.append(sec)

    out.write_text(
        json.dumps({"sections": kept_sections}, indent=2, ensure_ascii=False) + "\n"
    )
    total = sum(len(s["items"]) for s in kept_sections)
    print(
        f"kept sections: {len(kept_sections)}  kept items: {total}  removed items: {removed_items}"
    )
    print(f"wrote {out}")


if __name__ == "__main__":
    main()
