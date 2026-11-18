// Loudness-normalise a render for social platforms (-14 LUFS, -1.5 dBTP) -> <name>-social.mp4
// Usage: node backend/scripts/finish-audio.mjs renders/video.mp4
import { spawnSync } from "node:child_process";
import { FFMPEG } from "./_env.mjs";
const src = process.argv[2];
if (!src) { console.log("node backend/scripts/finish-audio.mjs <render.mp4>"); process.exit(1); }
const out = src.replace(/\.mp4$/i, "-social.mp4");
const r = spawnSync(FFMPEG, ["-v", "error", "-y", "-i", src, "-c:v", "copy", "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-ar", "48000", "-c:a", "aac", "-b:a", "192k", out], { stdio: "inherit" });
if (r.status === 0) console.log(`Wrote ${out}`); else process.exit(r.status ?? 1);
