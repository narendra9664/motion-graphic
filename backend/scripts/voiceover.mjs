// ElevenLabs voiceover with word timestamps.
// Usage: node backend/scripts/voiceover.mjs <script.txt> <out-dir> [voiceId]
// Writes <out-dir>/vo.mp3 and <out-dir>/words.json ([{w, s, e}] in seconds). Default voice: Liam.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { need } from "./_env.mjs";
const [txt, outDir, voice = "TX3LPaxmHKxFdv7VOQHJ"] = process.argv.slice(2);
if (!txt || !outDir) { console.log("node backend/scripts/voiceover.mjs <script.txt> <out-dir> [voiceId]"); process.exit(1); }
const key = need("ELEVENLABS_API_KEY");
const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}/with-timestamps?output_format=mp3_44100_128`, {
  method: "POST", headers: { "xi-api-key": key, "Content-Type": "application/json" },
  body: JSON.stringify({ text: readFileSync(txt, "utf8"), model_id: "eleven_v3" }),
});
if (!res.ok) { console.error(`ElevenLabs error ${res.status}: ${await res.text()}`); process.exit(1); }
const j = await res.json();
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "vo.mp3"), Buffer.from(j.audio_base64, "base64"));
const a = j.alignment, words = []; let cur = null;
a.characters.forEach((ch, i) => {
  if (/\s/.test(ch)) { if (cur) words.push(cur); cur = null; return; }
  if (!cur) cur = { w: "", s: a.character_start_times_seconds[i], e: 0 };
  cur.w += ch; cur.e = a.character_end_times_seconds[i];
});
if (cur) words.push(cur);
writeFileSync(join(outDir, "words.json"), JSON.stringify(words, null, 1));
console.log(`Wrote vo.mp3 and words.json (${words.length} words) to ${outDir}`);
