# House rules (apply to every video, content or client)

These are the owner's rules. When a skill says otherwise, these win.

## The four-step workflow
1. **Ingredients first.** Gather logos (high-res), real UI screenshots, brand fonts and colours, and the images the script needs. Ask for anything missing before building. Ask for the ratio and the idea before any content video.
2. **Numbered storyboard, approved before animating.** Time, frame, on-screen line, motion, and how each shot becomes the next. Notes are not approval: revise and show again.
3. **Build with transforms, never cross-dissolves.** The key object of each shot morphs or grows into the next one.
4. **Picture approval, then sound last.** Music and SFX are placed on the exact visual beats only after the picture is approved.

## Look
- Main action dead centre (invisible crosshair). Shallow depth of field: subject sharp, background blurred.
- Text: words slide into place one after another (small blur allowed). No bouncing text, no plain fades, no scale pops.
- Backgrounds never stand still: glows drift, grids scroll, light sweeps cross.
- Mix typography with intent: a serif for the soft line, a heavy condensed display face for the one big word, Inter for UI.

## Motion (borrowed from launch-motion, adapted)
- **The cursor travels on an arc**, eases in and out and settles with a tiny overshoot, like a hand. Never a straight slide.
- **Nothing ever fully stops.** Holding elements keep a slow drift (scale 1 to 1.02 or ±4 px); each scene's camera keeps a micro-push.
- **Anything important stays on screen at least ~1.5 s.** Count-ups run about 1 s with ease-out and never jump.
- **Group, offset, overlap.** Animate related pieces as one group; stagger children 2-4 frames; start the next move during the last ~20% of the previous one.
- Exits are faster than entrances (about 60%), ease-in. Every click gets a small press (1 to 0.96 to 1).

## Script
- Never use the phrase "You see".
- Every claim sourced; disclaimers the source requires (for example "not an officially supported product") are shown on screen.

## Sound
- Whooshes only under movement. No typing sounds, no dings.
- Place an effect at `start = hit time - peak offset` (offsets in backend/assets/README.md).
- Music bed around volume 0.2 under voice; final loudness -14 LUFS, -1.5 dBTP (`node backend/scripts/finish-audio.mjs`).

## Assets
- Characters and images: Canva connector first, else generate (Gemini or Higgsfield).
- Check `backend/assets/` before sourcing; add reusable assets back after each video and index them in its README.
- The creator handle **@autonomous.buddy** and its profile mark go on every content CTA (`backend/assets/brands/autonomous-buddy/`).

## Safety
- Never commit `.env` or paste keys into files. Client material stays under `client/` and is not published without written permission.
