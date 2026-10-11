# Coraline's Arcade 🕹️

A magical, kid-first game portal — a storybook-pink arcade my daughter and I
built together. It runs entirely in the browser on our home lab: no accounts,
no cloud, no tracking. Open it on any tablet or phone and play.

![Coraline's Arcade hero](art/hero.webp)

<video controls loop muted playsinline autoplay width="100%" src="media/arcade-preview-13s.mp4">
  Your browser does not support HTML video. <a href="media/arcade-preview-13s.mp4">Download the preview</a> instead.
</video>

## ▶️ Live demo

**Play it right now:** <https://brianletort.github.io/Coraline-Arcade/>
(Serves the exact files in this repo — same portal, same games, hosted on
GitHub Pages.)

**Vertical preview:** [9:16 vertical video](media/arcade-vert.mp4)

## A private AI use case

This began as a personal experiment: can a non-enterprise, home-scale project
with a small **local-first AI assistant** (homelab, no cloud) deliver something
my 11-year-old genuinely uses every day? The answer, for us, was yes.

**How we built it together**

- **Planning:** we sketched the idea on a whiteboard — "her magical game
  portal" — and broke it into pieces: the landing page, the catalog, the game
  pick, touch controls for the iPad.
- **Building:** the portal is a single `index.html` (plain JS + CSS, no
  frameworks) that renders a `games.json` catalog. My AI assistant wrote most
  of the tricky bits — touch controllers, the castle-gradient hero, the
  responsive layout — and I reviewed and shipped each pass.
- **Testing with my daughter:** she was the QA lead. "The buttons are too
  small." "I want the puppy one." "Make it pinker." Every round of feedback
  became the next change.
- **Deploying on our hardware:** it runs from the DrFlex home lab, bound to
  localhost, shared only inside the family network.

The takeaway: local-first AI isn't about benchmarks. It's about the sense that
a tool can build something personal and useful on your own hardware, with your
kid beside you, and your data never leaving the house.

## What's in this repo

```
├── index.html          # The portal (single page, plain JS + CSS)
├── games.json          # Catalog of bundled games (relative URLs only)
├── art/                # Hero art, avatar, font
├── scripts/            # Repo tooling
└── games/              # Open-source games, each keeping its own LICENSE
```

This repository contains the **portal and the redistributable game pack only
(51 games)**. It deliberately does not include the private emulator/ROM layer
— that stays on family hardware. See [SECURITY.md](SECURITY.md) and
[Licensing & what's included](#licensing--whats-included).

## Quick start

```bash
# Any static file server works (the portal fetches games.json over HTTP):
python3 -m http.server 8080
# → open http://localhost:8080
```

Or simply open `index.html` locally. Everything runs client-side.

## Game packs

The bundled games are all open source. **Each game keeps its own LICENSE
file and copyright notice.** Highlights:

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
| pacman(+lite) | attogram | GPLv3 |
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
  portal over *redistributable* games, which keeps it legal and safe to host.

---

Made with ♥ by Dad (and my co-designer 🎨).
