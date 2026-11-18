# Shared asset library

Reusable assets for every video in this project. Before making or downloading a logo, sound or bed, look here first.
After a project, copy anything that will likely come up again into the right folder and add a row below.
The original logo files the owner supplied are kept untouched in `logos/originals/`.
Also here: `fonts/` (Anton + Inter woff2 with fonts.css) and `library/` (Mixkit music and SFX, local only, see library/LICENSES.md).

## logos/  (square, trimmed, transparent PNG, ~4% padding)
| File | What | Size | Notes |
|---|---|---|---|
| github.png | GitHub Octocat mark, black | 552 | from 25231.png |
| github-white.png | same, white | 552 | for dark grounds |
| openai-chatgpt.png | OpenAI / ChatGPT knot, black | 2048 | from ChatGPT-Logo.png |
| openai-chatgpt-white.png | same, white | 2048 | for dark grounds |
| claude.png | Claude spark, orange | 2048 | from Claude_AI_symbol.svg.webp |
| gemini.png | Gemini sparkle, gradient | 756 | from gemini-google-icon...webp |
| meta.png | Meta infinity symbol, blue gradient | 1243 | Wikimedia Commons Meta Platforms logo SVG, rendered |
| astryx.png | Astryx symbol, #225bff | 2048 | astryx.atmeta.com/favicon.svg, rendered |
| google.png | Google "G", 4 colours | 994 | Wikimedia Commons Google G logo SVG, rendered |
| antigravity.png | Google Antigravity icon, gradient | 436 | antigravity.google/press (official press assets) |
| codex.png | OpenAI Codex cloud icon with prompt, cut out (transparent) | 480 | supplied by the user (EGM reel) |
| google-g.png | Google "G", four colours, transparent | 1500 | supplied by the user (EGM reel) |

## sfx/  (ElevenLabs sound generation)
| File | Use | Peak offset (s) |
|---|---|---|
| ui-pop-soft.mp3 | element pops in | 0.055 |
| ui-click-tactile.mp3 | cursor click / pin | 0.306 |
| hit-soft-boom.mp3 | soft hit on a key word | 0.677 |
| ui-swipe-slide.mp3 | panel slides | 0.005 |
| whoosh-airy-a.mp3 | camera move / transform | 0.25 |
| whoosh-airy-b.mp3 | alt whoosh | 0.15 |
| impact-smash-glass.mp3 | smash word / big reveal | 0.005 |
| riser-reverse-cymbal.mp3 | build into a drop | 2.656 |
| scissors-snip.mp3 | cut / trim | 0.075 |
| ui-seal-confirm.mp3 | confirm / saved | 0.742 |
| ui-card-open-swoosh.mp3 | card opens | 0.005 |
| ui-notification-ping.mp3 | notification | - |
| clock-ticks-tense.mp3 | time pressure | - |
| chaos-papers-swirl.mp3 | mess / clutter | - |
| pull-in-reverse-whoosh-thump.mp3 | things pulled into a centre | - |
| cards-tumble-fall.mp3 | items fall away | - |
| keyboard-typing-short.mp3 | typing (house style avoids it) | - |
Place audio at start = hit time - peak offset.

## music/  (ElevenLabs Music)
| File | Mood |
|---|---|
| calm-build-to-groove-100bpm-67s.mp3 | calm intro, builds, groove drop ~28 s |
| tense-to-drop-tech-124bpm-44s.mp3 | tense tech, drop, energetic |
| upbeat-tech-pluck-120bpm-61s.mp3 | upbeat tech reel, drums from bar 1, plucky arp, beats at 0.055 + 0.5n s (Astryx reel) |
| playful-curious-pluck-104bpm-61s.mp3 | playful, curious explainer bed: sparse 4 s intro, light groove, thins out at the end so it loops (EGM reel) |

## brands/
| Folder | Contents |
|---|---|
| meta/ | meta-lockup.png/.svg (symbol + wordmark), meta-wordmark-dark.png, meta-wordmark-white.png |
| egm/ | Elephant-Goldfish Model marks: egm-elephant (blue), egm-goldfish (orange), egm-mark (both) as PNG + SVG, from the repo's assets/icon.svg (Apache 2.0) |
| astryx/ | astryx-wordmark-blue.png, astryx-wordmark-white.png (keyed from the official README banner), astryx-symbol.svg, astryx-banner.jpg |

## images/
Empty for now: add reusable photos and backgrounds here.

## characters/  (cut-out, transparent PNG, 1080 px; made with Canva generate-image + HyperFrames remove-background)
| File | What |
|---|---|
| elephant-clay-pencil-paper.png | friendly blue-grey clay elephant, standing, pencil in trunk, holding a paper |
| goldfish-clay-side.png | friendly orange clay goldfish, side view facing left, big eye |

## brands/autonomous-buddy/
| File | What |
|---|---|
| avatar-rebuilt.svg | the user's profile mark rebuilt in SVG (3 rounded white-to-black gradient bars forming a triangle on black). Replace with the original file when the user provides it. |
