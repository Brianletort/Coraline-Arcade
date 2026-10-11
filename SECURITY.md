# Security Policy

## Scope

This repository is a **family-built, open-source project** — a kid-first game
portal and a personal AI use case built by Brian and his daughter. It is
publicly shared for others to explore, learn from, and run themselves.

## Reporting a vulnerability

If you find a security issue, please report it privately **via GitHub's
private security advisory flow** (Security → Report a vulnerability) rather
than opening a public issue. There is no bug bounty; we'll do our best to
respond and fix promptly.

## Supported hosting

- Any static file server (`python3 -m http.server`, nginx, Caddy, GitHub
  Pages) works. The portal fetches `games.json` over HTTP — nothing else is
  required.

## What this repo intentionally does NOT contain

To stay within GitHub's terms and keep the project safe to host:

- **No game ROMs or copyrighted software.** The portal serves only open-source
  games that carry their own licenses (each preserved in-repo).
- **No private infrastructure details.** Internal hostnames, ports, tokens,
  proxy configs, and auth material are deliberately excluded. The private
  emulator/ROM layer used at home is separate and not part of this repository.

## Secret scanning

Secret scanning is expected to be **enabled** on this repository. Any
credential-like content found here should be treated as an emergency.
