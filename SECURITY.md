# Security Policy

## Scope

This repository is a **private, family project** — a kid-first game portal
and a personal AI use case built by Brian and his daughter. It is shared
privately, not for public consumption.

## Reporting a vulnerability

This project has no public attack surface: it is served only inside the
family home lab to devices on the home network and does not accept
contributions. If you are a participant and notice a problem, tell us
directly rather than opening a public issue.

## What this repo intentionally does NOT contain

To stay within GitHub's terms and keep the project safe to host:

- **No game ROMs or copyrighted software.** The portal serves only open-source
  games that carry their own licenses (each preserved in-repo).
- **No private infrastructure details.** Internal hostnames, ports, tokens,
  proxy configs, and auth material are deliberately excluded. The RA/emulator
  layer (`retroassembly`, shared-auth proxy, `uzdoom`, ROM libraries) is
  private family hardware and is not, and never will be, part of this repo.

## Secret scanning

Secret scanning is expected to be **enabled** on this repository. Any
credential-like content found here should be treated as an emergency.
