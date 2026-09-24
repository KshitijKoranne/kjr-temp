// npm run check: 1) list placeholders in content, 2) fail on broken internal links in /out.
// ponytail: imports site.ts via Node 22 type stripping; no test framework, no glob lib.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const site = await import("../content/site.ts");
const found = [];
const walk = (v, path) => {
  if (Array.isArray(v)) return v.forEach((x, i) => walk(x, `${path}[${i}]`));
  if (v && typeof v === "object") {
    if (v.placeholder === true) found.push(`${path}${v.name ? ` (${v.name})` : v.slug ? ` (${v.slug})` : ""}`);
    for (const [k, x] of Object.entries(v)) walk(x, `${path}.${k}`);
  }
};
for (const [k, v] of Object.entries(site)) walk(v, k);
console.log(`\nPlaceholders (${found.length}):`);
found.forEach((p) => console.log("  - " + p));

const out = "out";
if (!existsSync(out)) { console.error("\nNo /out. Run npm run build first."); process.exit(1); }
const files = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? files(join(d, f)) : [join(d, f)]));
const html = files(out).filter((f) => f.endsWith(".html"));
const broken = [];
for (const f of html) {
  for (const [, href] of readFileSync(f, "utf8").matchAll(/href="(\/[^"#?]*)/g)) {
    if (href.startsWith("//")) continue;
    const p = join(out, decodeURI(href));
    if (!(existsSync(p) && statSync(p).isFile()) && !existsSync(join(p, "index.html")) && !existsSync(p + ".html")) broken.push(`${f} -> ${href}`);
  }
}
const home = [...readFileSync(join(out, "index.html"), "utf8").matchAll(/src="(\/_next\/[^"]+\.js)"/g)].map((m) => m[1]);
const { gzipSync } = await import("node:zlib");
const kb = [...new Set(home)].reduce((s, f) => s + gzipSync(readFileSync(join(out, f))).length, 0) / 1024;
console.log(`\nHome JS: ${kb.toFixed(0)} KB gzip.`);
console.log(`Checked ${html.length} HTML files.`);
if (broken.length) { console.error(`\nBroken links (${broken.length}):`); broken.forEach((b) => console.error("  - " + b)); process.exit(1); }
console.log("No broken internal links.");
