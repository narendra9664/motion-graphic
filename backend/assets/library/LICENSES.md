# LICENSES — content machine asset log (library level)

Every render additionally writes `ASSETS.md` in its own folder listing exactly the assets used (see template at bottom). Library files below are pooled sources, not per-render approvals.

## Sound effects — Mixkit (downloaded mini-kit in `audio/sfx/`)

- Source: https://mixkit.co/free-sound-effects/ (whoosh, swoosh, click, pop, riser, notification, suspense pages).
- License: **Mixkit Free License** — free for commercial and non-commercial use in video, no attribution required.
- Restrictions (keep): may NOT resell or redistribute the files as-is/standalone, use them as a competing asset library, or use them in a way that suggests endorsement. Allowed in client/agency video renders.
- Full text: https://mixkit.co/license/#sfxFree
- Per-file provenance: `audio/sfx/MANIFEST.json` (tag, original URL, bytes).

## Music — Pixabay (default source at pack sprints)

- License: **Pixabay Content License** — free for commercial use, no attribution required, modification allowed. Restriction: may NOT redistribute as standalone/competing item.
- Full text: https://pixabay.com/service/license-summary/
- At each render: log track title + Pixabay URL + artist in the render's `ASSETS.md`. Download into the pack folder, never hotlink.

## Backups (only if Pixabay lacks a mood)

- **Mixkit Music** (same Mixkit license).
- **FreePD** (https://freepd.com) — CC0 / public domain, attribution not required.
- **YouTube Audio Library** — free, but verify license flag per track.

## Fonts — `content/_fonts/`

- **Anton** (display, 400) — Google Fonts, **SIL Open Font License 1.1**. Local copies: `anton-latin.woff2`, `anton-latin-ext.woff2`.
- **Inter** variable (body, 100–900) — Google Fonts, **SIL OFL 1.1**. Local copies: `inter-variable-latin.woff2`, `inter-variable-latin-ext.woff2`.
- OFL: usable in video renders/integration; OFL-only restriction applies to selling the fonts themselves.
- Generated CSS: `content/_fonts/fonts.css` (declares families `anton`, `inter-variable`).

## Animation runtime — GSAP (vendored `content/_library/vendor/gsap.min.js`)

- GSAP core v3.13.0, GreenSock — **"Standard No Charge" license** (free, allows use in websites/apps; fine for composition runtime + rendered video). Do not bundle into a paid distribution of gsap itself.

## Brand material — frontdesk AI

- App/site copy, figures (demo names Rahul Mehta / Ananya Rao / Daniel Fernandes, Veloria Residences, scores, "DM AUDIT" CTA) — owned by the user's business. Real claims only, trace to https://frontdeskops-new.netlify.app/.

## AI-generated assets — Gemini API (when used)

- Google paid Gemini API image output ⇒ commercially usable output; log model + prompt + date in `ASSETS.md` when an asset is generated.
- Keys were pasted in plaintext chat: rotate both keys after pipeline is live.

---

## Per-render `ASSETS.md` template (copy into each video folder at render time)

```markdown
# ASSETS — <video name> (<date>)
| Asset | File/URL | License | Notes |
|---|---|---|---|
| Music | <pixabay track url> | Pixabay CL | |
| SFX hit | sfx/swoosh-XXXX.mp3 | Mixkit Free | |
| VO | audition-george | ElevenLabs free | voice=George id=JBFqn... |
| Fonts | _fonts/anton-latin.woff2 | SIL OFL 1.1 | |
| AI still | <path> | Gemini paid API | prompt | (only if used)
Claims: every figure on screen traced to frontdeskops-new.netlify.app (list lines).
```
