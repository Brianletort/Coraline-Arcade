# Coraline's Arcade 🕹️

A magical, kid-first game portal — a storybook-pink arcade built for my
daughter on our home lab. It runs entirely in the browser: no accounts, no
cloud, no tracking. Open it on any tablet or phone and play.

![Coraline's Arcade hero](art/hero.webp)

## What it is

Coraline's Arcade is a static web portal (HTML + a `games.json` catalog, no
frameworks, no build step) that bundles a hand-curated collection of
open-source browser games. The games are organized into friendly sections
(⭐ Classics, 🗺️ Quests, ♟️ Board, 🎲 Novelty, 🌈 More Games) and are all
kid-appropriate and touch-friendly.

**This repository contains the portal and the redistributable game pack.**
It does *not* include the ROM/emulator library layer — see
[Licensing & what's included](#licensing--whats-included).

## Quick start

```bash
# Any static file server works (the portal fetches games.json over HTTP):
python3 -m http.server 8080
# → open http://localhost:8080
```

Or simply open `index.html` locally. Everything runs client-side.

## Project layout

```
├── index.html          # The portal (single page, plain JS + CSS)
├── games.json          # Catalog of bundled games (relative URLs only)
├── art/                # Hero art, avatar, font
├── scripts/            # Repo tooling (catalog generation, etc.)
└── games/              # Open-source games, each keeping its own LICENSE
```

## Game packs

The bundled games are all open source. **Each game keeps its own LICENSE
file and copyright notice** — full attribution lives in the repo. Highlights:

| Pack | Source | License |
| --- | --- | --- |
| `mini/` (30+ single-file games) | [wangzifan396-wzf/mini-browser-games](https://github.com/wangzifan396-wzf/mini-browser-games) | MIT |
| 2048 / 2048-lite | [Gabriele Cirulli](https://github.com/gabrielecirulli/2048) | MIT |
| chess | Attogram Project | MIT |
| classic-pool | Chen Shmilovich | MIT |
| taptaptap | Mahdi Al-Farra | MIT |
| the-house | Artur Kot | MIT |
| hsc | razh | MIT |
| tower | BMQB | MIT |
| asteroids | Doug McInnes | BSD-style |
| hextris(+lite) | Hextris | GPLv3 |
| pacman(+lite) / pancamonde | attogram | GPLv3 |
| 3d-city, twisty-polyhedra, pond-lite, clumsy-bird, wolfenstein3d, missile-game | various | GPLv3 / AGPLv3 |
| hearts | [Yujian Yao](https://github.com/yyjhao/html5-hearts) | all-rights-reserved (see note) |

> ⚠️ `games/hearts/` carries an "All rights reserved" license. Include it with
> attribution, or delete the `games/hearts/` directory (and its entry in
> `games.json`) if you want a fully MIT/GPL-only pack.

## Licensing & what's included

- **This repo's original work** (the portal: `index.html`, `art/`, `games.json`,
  `scripts/`) is released under the [MIT license](LICENSE).
- **The bundled games are third-party open-source works** and remain under
  their own respective licenses, each preserved in-repo.
- **The ROM/emulator library is deliberately not published.** Playable ROMs
  are copyrighted and run on our private family hardware only. This is a
  portal over *redistributable* games, which keeps it legal to share.

## Why I built it

Built with a lot of love, a little AI assistance, and a self-hosted home lab
(the "DrFlex" lab). The whole thing runs from a Raspberry-Pi-class box plus a
couple of small servers in the garage — no game streaming subscription, no
ads, no tracking, just games.

---

Made with ♥ by Dad.
