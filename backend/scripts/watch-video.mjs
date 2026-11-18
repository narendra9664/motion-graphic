// Watch a video with Gemini and get a motion-design breakdown (shots, camera, easing, transitions, light, colour).
// Gemini receives the whole file and samples it at --fps frames per second, so it sees motion, not just stills.
//
// Usage:
//   node backend/scripts/watch-video.mjs <video.mp4> [--fps 10] [--model gemini-flash-latest] [--res low|medium|high] [--out notes.md] [--ask "extra question"]
//
// Needs GEMINI_API_KEY in the repo-root .env. Do not send client material you are not allowed to share.
import { readFileSync, writeFileSync, statSync } from "node:fs";
import { basename, extname } from "node:path";
import { need } from "./_env.mjs";

const args = process.argv.slice(2);
const file = args[0] && !args[0].startsWith("--") ? args[0] : null;
const opt = (k, d) => { const i = args.indexOf("--" + k); return i >= 0 ? args[i + 1] : d; };
if (!file) { console.log('node backend/scripts/watch-video.mjs <video> [--fps 10] [--model gemini-flash-latest] [--res low|medium|high] [--out notes.md] [--ask "..."]'); process.exit(1); }
const fps = Number(opt("fps", "10"));
const model = opt("model", "gemini-flash-latest"); // free tier: Flash works, Pro needs billing
const res = opt("res", "medium"); // low | medium | high (low = ~4x fewer tokens)
const out = opt("out", file.replace(/\.[^.]+$/, "") + ".motion.md");
const ask = opt("ask", "");
const key = need("GEMINI_API_KEY");
const mime = { ".mp4": "video/mp4", ".mov": "video/quicktime", ".webm": "video/webm", ".mkv": "video/x-matroska" }[extname(file).toLowerCase()] || "video/mp4";
const size = statSync(file).size;
const API = "https://generativelanguage.googleapis.com";

// 1. resumable upload to the Files API
const start = await fetch(`${API}/upload/v1beta/files`, {
  method: "POST",
  headers: { "x-goog-api-key": key, "X-Goog-Upload-Protocol": "resumable", "X-Goog-Upload-Command": "start", "X-Goog-Upload-Header-Content-Length": String(size), "X-Goog-Upload-Header-Content-Type": mime, "Content-Type": "application/json" },
  body: JSON.stringify({ file: { display_name: basename(file) } }),
});
const upUrl = start.headers.get("x-goog-upload-url");
if (!upUrl) { console.error("Upload start failed", start.status, await start.text()); process.exit(1); }
const up = await fetch(upUrl, { method: "POST", headers: { "Content-Length": String(size), "X-Goog-Upload-Offset": "0", "X-Goog-Upload-Command": "upload, finalize" }, body: readFileSync(file) });
const fileInfo = (await up.json()).file;
process.stderr.write(`uploaded ${basename(file)} (${(size / 1e6).toFixed(1)} MB), processing`);

// 2. wait until the video is processed
let f = fileInfo;
for (let i = 0; i < 120 && f.state !== "ACTIVE"; i++) {
  await new Promise((r) => setTimeout(r, 2000)); process.stderr.write(".");
  f = await (await fetch(`${API}/v1beta/${fileInfo.name}`, { headers: { "x-goog-api-key": key } })).json();
  if (f.state === "FAILED") { console.error("\nprocessing failed"); process.exit(1); }
}
process.stderr.write(" ready\n");

// 3. ask for a motion-design breakdown
const prompt = `You are a senior motion designer reverse-engineering this video so it can be rebuilt in code (HTML + GSAP).
Watch the MOTION, not just the frames. Be concrete and measurable; use timestamps (m:ss.s).

Return markdown with these sections:
1. **Overview**: length, aspect, style in one line, pacing (average shot length, how often something new happens).
2. **Shot list** (table): time range | what is on screen | camera (push-in, pull-out, pan, tilt, roll, orbit, parallax, dolly-zoom; speed and easing) | element motion (entrances/exits, direction, duration, easing character such as snappy expo-out or soft sine, overshoot, stagger) | transition into the next shot (match cut, morph, zoom-through, whip pan with blur, mask/wipe, scale-through, light flash...) with its duration.
3. **Camera language**: does the camera ever stop? typical zoom ranges (e.g. 100% to 115%), drift speed, use of 3D tilt/perspective, depth of field.
4. **Lighting and colour**: backgrounds, gradients (colours, direction, whether they move), glows, light sweeps, shadows, colour shifts between sections.
5. **Typography motion**: how words/lines enter, sizes, weights, mixing of fonts, kinetic tricks.
6. **Sound sync** (if there is audio): what lands on beats, whooshes, hits, risers.
7. **Steal list**: 10-15 specific techniques worth copying, each with suggested GSAP-style parameters (duration in s, ease name, distances/scales/angles).
${ask ? "\nAlso answer: " + ask : ""}`;
const body = { contents: [{ role: "user", parts: [{ fileData: { fileUri: f.uri, mimeType: f.mimeType }, videoMetadata: { fps } }, { text: prompt }] }], generationConfig: { temperature: 0.4, mediaResolution: "MEDIA_RESOLUTION_" + res.toUpperCase() } };
let r2, j;
const chain = [model, "gemini-3.5-flash", "gemini-3-flash-preview", "gemini-2.5-flash"].filter((m, i, a) => a.indexOf(m) === i);
let used = model;
for (let attempt = 0; attempt < 8; attempt++) {
  used = chain[Math.min(Math.floor(attempt / 2), chain.length - 1)];
  r2 = await fetch(`${API}/v1beta/models/${used}:generateContent`, { method: "POST", headers: { "x-goog-api-key": key, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const raw = await r2.text(); try { j = JSON.parse(raw); } catch { j = { error: raw.slice(0, 300) }; }
  if (r2.status !== 429 && r2.status !== 503 && r2.status !== 500) break;
  const wait = Number((JSON.stringify(j).match(/"retryDelay":"(\d+)s"/) || [])[1] || 40) + 2;
  process.stderr.write(`rate limited, retrying in ${wait}s
`); await new Promise((r) => setTimeout(r, wait * 1000));
}
if (!r2.ok) { console.error("Gemini error", r2.status, JSON.stringify(j).slice(0, 600)); await fetch(`${API}/v1beta/${fileInfo.name}`, { method: "DELETE", headers: { "x-goog-api-key": key } }); process.exit(1); }
const text = (j.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("");
writeFileSync(out, `# Motion breakdown: ${basename(file)}\n\nModel: ${used} · sampled at ${fps} fps · ${res} resolution\n\n${text}\n`);
// 4. clean up the uploaded file
await fetch(`${API}/v1beta/${fileInfo.name}`, { method: "DELETE", headers: { "x-goog-api-key": key } });
console.log(`Wrote ${out}`);
