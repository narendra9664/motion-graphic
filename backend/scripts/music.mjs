// ElevenLabs Music: generate an instrumental bed.
// Usage: node backend/scripts/music.mjs "<prompt>" <seconds> <out.mp3>
import { writeFileSync } from "node:fs";
import { need } from "./_env.mjs";
const [prompt, secs, out] = process.argv.slice(2);
if (!prompt || !secs || !out) { console.log('node backend/scripts/music.mjs "<prompt>" <seconds> <out.mp3>'); process.exit(1); }
const res = await fetch("https://api.elevenlabs.io/v1/music", {
  method: "POST", headers: { "xi-api-key": need("ELEVENLABS_API_KEY"), "Content-Type": "application/json" },
  body: JSON.stringify({ prompt: `Instrumental only, no vocals. ${prompt}`, music_length_ms: Math.round(Number(secs) * 1000) }),
});
if (!res.ok) { console.error(`ElevenLabs error ${res.status}: ${await res.text()}`); process.exit(1); }
writeFileSync(out, Buffer.from(await res.arrayBuffer()));
console.log(`Wrote ${out}`);
