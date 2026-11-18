---
name: watch-video
description: Actually watch a video's motion instead of guessing from still frames. Sends the file to Gemini (it samples 8-10 fps, so it sees camera moves, easing, transitions, light and colour over time) and measures motion energy locally with ffmpeg. Use before building or revising any motion graphic to study reference videos, to compare our render against a reference, or when the user says "look at the reference", "study the motion", "see the actual video", "why does it feel static".
---

# Watch video

Still frames hide the motion. Use both tools below: Gemini for *what* moves and *how*, the profile for *how much* and *when*.

## 1. Gemini motion breakdown (what and how)

```bash
node backend/scripts/watch-video.mjs <video.mp4> --fps 10 --res low --out notes.md [--ask "what makes the transitions feel smooth?"]
```

- Returns markdown: shot list with timestamps, camera language, element easing and durations, transitions, lighting and colour, typography motion, sound sync, and a steal list with GSAP parameters.
- Default model `gemini-flash-latest` with fallbacks (free tier works). Pro models need billing on the Gemini key.
- `--res low` uses about 4x fewer tokens (fine for motion; use `medium` when small UI text matters). Free tier has per-minute limits: run files one after another; the script retries on 429/503.
- The upload is deleted from Gemini after the answer. Never send client material that is not cleared for third-party processing.
- Treat the breakdown as a strong observation, not ground truth: verify exact timings with the profile or frames.

## 2. Motion profile (how much and when)

```bash
node backend/scripts/motion-profile.mjs <video.mp4> --step 0.25 [--from 0 --to 15]
```

- One bar per time step = mean frame difference. `C` marks likely hard cuts.
- Read it for pacing: a premium SaaS reference keeps a **baseline that never drops near zero** (constant camera drift) with spikes on transitions. A flat near-zero baseline between spikes means the piece feels static.
- Run it on our render and on the reference with the same step and compare.

## 3. Turn findings into the build

1. Write the steal list into the project's storyboard notes (technique, where it is used, parameters).
2. Before rendering, profile our picture pass: no stretch longer than ~1 s with near-zero energy, unless it is a deliberate hold on a key message.
3. After rendering, re-run the breakdown on our own video with `--ask "compare to a premium SaaS launch video: what still feels cheap or static?"` and fix what it finds.
