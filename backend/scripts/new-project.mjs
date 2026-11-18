// Usage:
//   node backend/scripts/new-project.mjs content <slug> [seconds]
//   node backend/scripts/new-project.mjs client <client-name> <slug> [seconds]
// Creates content/<date>-<slug>/ (9:16 reel) or client/<client>/<date>-<slug>/ (16:9 promo) from the templates.
import { cpSync, readdirSync, readFileSync, writeFileSync, statSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "./_env.mjs";

const [kind, a, b, c] = process.argv.slice(2);
if (!["content", "client"].includes(kind) || !a) {
  console.log("node backend/scripts/new-project.mjs content <slug> [seconds]\nnode backend/scripts/new-project.mjs client <client-name> <slug> [seconds]");
  process.exit(1);
}
const date = new Date().toISOString().slice(0, 10);
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const isClient = kind === "client";
const slug = `${date}-${slugify(isClient ? b : a)}`;
const seconds = Number((isClient ? c : b) || (isClient ? 30 : 60));
const dest = isClient ? join(ROOT, "client", slugify(a), slug) : join(ROOT, "content", slug);
if (existsSync(dest)) { console.error(`Already exists: ${dest}`); process.exit(1); }
mkdirSync(dest, { recursive: true });
cpSync(join(ROOT, "backend", "templates", isClient ? "client-16x9" : "reel-9x16"), dest, { recursive: true });

const fill = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) { fill(p); continue; }
    if (!/\.(html|json|md)$/.test(f)) continue;
    writeFileSync(p, readFileSync(p, "utf8").replaceAll("__DUR__", String(seconds)).replaceAll("__SLUG__", slug));
  }
};
fill(dest);
for (const d of ["renders", "ingredients", "assets/img", "assets/sfx", "assets/music", "storyboard"]) mkdirSync(join(dest, d), { recursive: true });
writeFileSync(join(dest, "meta.json"), JSON.stringify({ id: slug, name: slug, kind, createdAt: new Date().toISOString() }, null, 2));
writeFileSync(join(dest, "BRIEF.md"), isClient
  ? `# ${a} — ${b}\n\nFill in with backend/workflows/client-brief.md, then draft the storyboard.\n`
  : `# ${a}\n\n- Idea in one sentence:\n- Ratio: 9:16\n- Images needed:\n\nWrite the script with the short-form-script skill, then the storyboard.\n`);
console.log(`Created ${dest}\nNext: cd into it, then ask Claude: "${isClient ? "use the client-video skill" : "use the content-reel skill"}".`);
