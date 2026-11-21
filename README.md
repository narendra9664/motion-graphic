# Motion Graphic Studio

> **AI motion graphics studio.** Describe a video in plain English and an AI agent (Claude Code or OpenCode) scripts it, designs it, animates every frame, adds voice, music and sound, and renders an MP4. Built on [HyperFrames](https://github.com/heygen-com/hyperframes). One backend, two pipelines: social reels that grow an audience, and SaaS launch videos for clients.

One backend, two frontends:

| | Frontend 1: **Content** | Frontend 2: **Client** |
|---|---|---|
| Purpose | Grow the @autonomous.buddy audience | Paid work |
| Output | 9:16 reels and shorts, 30-90 s, voiceover | SaaS explainers, promos, launch videos (30 s 16:9 + 9:16 / 1:1 cutdowns) |
| Published | Only on social media | Delivered to the client, confidential by default |
| Folder | `content/<date>-<slug>/` | `client/<client>/<date>-<slug>/` |
| Skill | `content-reel` | `client-video` |

## Layout

```
.claude/skills/        The skills (backend brain). Loaded by Claude Code and OpenCode automatically.
backend/
  workflows/           house-rules.md (wins over every skill), client-brief.md
  scripts/             new-project, voiceover, music, finish-audio, watch-video (Gemini), motion-profile
  templates/           reel-9x16 and client-16x9 HyperFrames starters
  assets/              shared library: logos, brands, characters, sfx, music, fonts (see its README)
  tests/               smoke and glass-flow test compositions
content/               audience-growth reels (one folder per video)
client/                client work (one folder per client; confidential folders are git-ignored)
docs/                  the user guide (PDF)
```

## Quick start

```bash
# 1. requirements: Node 22+, ffmpeg on PATH, Chrome/Edge (HyperFrames renders through it)
# 2. keys (never committed)
cp .env.example .env        # add ELEVENLABS_API_KEY (and optional GEMINI_API_KEY)
# 3. open the folder in Claude Code or OpenCode and ask:
#    "make a reel about <trending GitHub repo>"           -> content-reel skill
#    "make a 30 s launch video for <client>, brief attached" -> client-video skill
```

Manual commands:

```bash
node backend/scripts/new-project.mjs content my-topic 60
node backend/scripts/new-project.mjs client acme launch-video 30
cd content/<date>-my-topic && npm run check && npm run render && npm run finish
```

## Skills

`content-reel`, `client-video` (the two pipelines), `short-form-script`, `long-form-script`, `hyperframes`, `hyperframes-cli`, `hyperframes-registry`, `media-use`, `saas-animation`, `launch-motion`, `watch-video` (Gemini watches reference videos and reports their motion), plus three community skills: `saas-motion-kit` (MIT), `product-launch-motion` (MIT) and `animated-diagrams` (Apache-2.0), each with its licence in its folder. See `docs/Motion-Graphic-Studio-Guide.pdf` for what each one does.

## Inspiration and credits

Built on [HyperFrames](https://github.com/heygen-com/hyperframes) by HeyGen (HTML-to-video engine, Apache 2.0) and its agent skills. GSAP for animation. ElevenLabs for voice, music and SFX. Sound library items from Mixkit stay local (see `backend/assets/library/LICENSES.md`).

## Security

`.env` and every `.env.*` (except `.env.example`) are git-ignored. Rotate any key that was ever committed or pasted in chat.
