// Reads KEY=VALUE pairs from the repo-root .env (never committed). Values are never printed.
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export function env(name) {
  if (process.env[name]) return process.env[name];
  const p = join(ROOT, ".env");
  if (!existsSync(p)) return undefined;
  for (const line of readFileSync(p, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"#]*)"?\s*$/);
    if (m && m[1] === name) return m[2].trim();
  }
}
export function need(name) {
  const v = env(name);
  if (!v) { console.error(`Missing ${name}. Copy .env.example to .env and fill it in.`); process.exit(1); }
  return v;
}
export const FFMPEG = process.env.FFMPEG || "ffmpeg";
