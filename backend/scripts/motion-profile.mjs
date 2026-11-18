// Measure how much the picture changes over time (motion energy), find cuts, holds and speed ramps.
// Prints one bar per time step, so an agent can "see" pacing and easing without watching.
//
// Usage: node backend/scripts/motion-profile.mjs <video> [--step 0.1] [--from 0] [--to end]
import { spawnSync } from "node:child_process";
import { FFMPEG } from "./_env.mjs";

const args = process.argv.slice(2);
const file = args[0];
const opt = (k, d) => { const i = args.indexOf("--" + k); return i >= 0 ? Number(args[i + 1]) : d; };
if (!file) { console.log("node backend/scripts/motion-profile.mjs <video> [--step 0.1] [--from 0] [--to 30]"); process.exit(1); }
const step = opt("step", 0.1), from = opt("from", 0), to = opt("to", 0);
const ff = ["-hide_banner", "-ss", String(from)];
if (to) ff.push("-to", String(to));
ff.push("-i", file, "-an", "-vf", "scale=320:-2,signalstats,metadata=print:key=lavfi.signalstats.YDIF", "-f", "null", "-");
const r = spawnSync(FFMPEG, ff, { encoding: "utf8", maxBuffer: 1 << 28 });
const lines = (r.stderr || "").split(/\r?\n/);
const pts = []; let t = null;
for (const l of lines) {
  const mt = l.match(/pts_time:([\d.]+)/); if (mt) t = Number(mt[1]);
  const mv = l.match(/YDIF=([\d.]+)/); if (mv && t !== null) pts.push([t + from, Number(mv[1])]);
}
if (!pts.length) { console.error("No frames measured. Is ffmpeg on PATH (or FFMPEG in .env)?"); process.exit(1); }
// bucket into steps
const buckets = new Map();
for (const [tt, v] of pts) { const k = Math.floor(tt / step); const b = buckets.get(k) || []; b.push(v); buckets.set(k, b); }
const rows = [...buckets.entries()].sort((a, b) => a[0] - b[0]).map(([k, vs]) => [k * step, vs.reduce((a, b) => a + b, 0) / vs.length, Math.max(...vs)]);
const max = Math.max(...rows.map((r) => r[1])) || 1;
console.log(`motion energy per ${step}s (mean frame difference, 0-${max.toFixed(1)}); C = likely cut (single-frame spike)`);
for (const [tt, mean, peak] of rows) {
  const bar = "█".repeat(Math.round((mean / max) * 50));
  const cut = peak > 3 * Math.max(mean, 1) && peak > max * 0.8 ? " C" : "";
  console.log(`${tt.toFixed(1).padStart(6)}s ${mean.toFixed(1).padStart(6)} ${bar}${cut}`);
}
