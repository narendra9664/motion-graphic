---
name: content-reel
description: The audience-growth pipeline. Make a vertical reel/short (9:16, 30-90 s) for @autonomous.buddy's social channels (AI tools, trending GitHub repos, tech stories, tips) from idea to a -14 LUFS social render. Use when asked for a reel, short, TikTok, "make one more", "a video about <repo/tool>", or anything that will be posted on social media to grow the audience. Projects live in content/.
---

# Content reel pipeline (frontend 1: audience growth)

Everything here is published only on social media to grow the audience. Projects live in `content/<yyyy-mm-dd>-<slug>/`.
Read `backend/workflows/house-rules.md` first; it overrides every other skill.

## 0. Ask first (one message)
Idea or topic (or offer 3-4 trending picks), ratio (default 9:16), look (reuse or new), and whether the owner supplies images or you source them.

## 1. Script
Use the **short-form-script** skill: package, fact sheet with sources, end-first outline, hook, loop ending. 140-220 words for about 60 s. Never "You see". Get approval.
Then list every image the script needs and ask for each one.

## 2. Ingredients
`node backend/scripts/new-project.mjs content <slug> [seconds]` creates the project.
Pull from `backend/assets/` (logos, sfx, music, characters, brands). Source the rest: Canva connector, then Gemini or Higgsfield for characters; official press kits for logos. Cut out with `npx hyperframes remove-background <abs-in> -o <abs-out.png>`.
Voiceover: `node backend/scripts/voiceover.mjs vo/script.txt assets` (ElevenLabs, word timestamps). Use the word times for every cue.

## 3. Storyboard (approval gate)
Numbered table: time, voice line, frame and motion, how it becomes the next shot. Wait for "approved".

## 4. Build
Use the **hyperframes** skill (render contract) and **hyperframes-registry** for ready blocks. One composition per act, one paused GSAP timeline each. Transforms only (no left/top tweens). Fonts that resolve: Inter, EB Garamond, JetBrains Mono, or a local @font-face (Anton in `backend/assets/fonts`).
Loop ending: the last frame matches the first.
`npm run check`, `npm run snapshot -- --at 1,5,...`, fix, then `npm run render`. Send the picture pass and wait for picture approval.

## 5. Sound
Music bed (`node backend/scripts/music.mjs` or the library) at about 0.2, SFX from `backend/assets/sfx` on visual beats (`start = hit - peak`). Render, then `npm run finish` for the -14 LUFS social file. Check sync, send.

## 6. Close out
Copy reusable assets into `backend/assets/` and index them. Note numbers that change daily (stars, followers) to re-check before posting. Suggest a cover frame (frame 0 may be a loop frame).
