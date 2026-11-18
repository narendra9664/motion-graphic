# Agent instructions (Claude Code reads CLAUDE.md, OpenCode reads this file; both say the same)

This repo is a motion graphics studio. Videos are HyperFrames projects (HTML + GSAP rendered to MP4).

1. Read `backend/workflows/house-rules.md` before any video work. It wins over every skill.
2. Pick the pipeline:
   - Reels/shorts for social growth -> skill `content-reel`, projects in `content/`.
   - Client explainers, promos, launch videos -> skill `client-video`, projects in `client/<client>/`.
3. Create projects with `node backend/scripts/new-project.mjs ...`; never build in the repo root.
4. Shared assets live in `backend/assets/` (check its README first; add reusable assets back).
5. Keys come from the root `.env` through `backend/scripts/_env.mjs`. Never print a key, never write one into a tracked file, never commit `.env`.
6. Client folders are confidential: do not publish them; add a client to `.gitignore` unless the owner says it is cleared.
7. Approval gates: script, storyboard, picture, then sound. Do not skip a gate.
