---
name: client-video
description: The client pipeline. Make SaaS explainers, product promos and launch videos for paying clients (default 30 s 16:9 master plus 9:16 and 1:1 cutdowns), from brief to delivery. Use when the work is for a client, a brand, a product launch, a Product Hunt video, an app promo or a spec ad. Projects live in client/<client>/.
---

# Client video pipeline (frontend 2: client work)

Client projects live in `client/<client-name>/<yyyy-mm-dd>-<slug>/`. They are confidential by default: never publish, post or reuse a client's material without written permission, and never commit a client folder the client has not cleared (add it to `.gitignore`).
Read `backend/workflows/house-rules.md` first, then use **saas-animation** (look and craft) and **launch-motion** (timing and motion rules, brief and storyboard templates).

## 0. Brief
Fill `backend/workflows/client-brief.md` with the client. The story path is always: hook (the pain) -> problem -> the product fixes it (real UI) -> payoff -> logo + CTA.

## 1. Ingredients
`node backend/scripts/new-project.mjs client <client> <slug> [seconds]`. Put the client's logo, brand guide, Figma SVG or screenshots and fonts in `ingredients/`. Rebuild UI in code or SVG so it stays sharp under camera zooms. Ask for anything missing.

## 2. Storyboard (approval gate)
Scene list with start-end times that add up to the total exactly: on screen, motion, camera, duration. Styleframes (snapshots) for the look. Wait for approval.

## 3. Build
HyperFrames compositions, one per scene. Position from the centre so 16:9 re-renders as 9:16 and 1:1; keep the key element inside the centre square. One camera group per scene with an easy-ease micro-push. Cursor on arcs. Counters about 1 s.
`npm run check` and stills at every scene boundary (no overlapping text, nothing appearing all at once). Render the picture pass and wait for approval.

## 4. Sound and delivery
Music + SFX on beats (or VO if the brief asks). `npm run finish` for loudness. Deliver the master plus cutdowns. On revisions change the smallest thing, and keep copy, numbers and colours in one place.
