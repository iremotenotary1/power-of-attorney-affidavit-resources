import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const DIST = path.join(ROOT, "dist");

const PUBLIC_FILES = [
  "index.html",
  "privacy.html",
  "contact.html",
  "404.html",
  "styles.css",
  "site.js",
  "favicon.svg",
  "og-image.png",
  "robots.txt",
  "sitemap.xml",
];

function fail(message) {
  console.error(`build-render: ${message}`);
  process.exit(1);
}

if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true, force: true });
}
fs.mkdirSync(DIST, { recursive: true });

for (const name of PUBLIC_FILES) {
  const source = path.join(ROOT, name);
  if (!fs.existsSync(source) || !fs.statSync(source).isFile()) {
    fail(`missing required public source file: ${name}`);
  }
  fs.copyFileSync(source, path.join(DIST, name));
}

const copied = fs.readdirSync(DIST).sort();
if (copied.length !== PUBLIC_FILES.length) {
  fail(`expected ${PUBLIC_FILES.length} files in dist, found ${copied.length}: ${copied.join(", ")}`);
}

for (const name of PUBLIC_FILES) {
  if (!copied.includes(name)) {
    fail(`dist is missing allowlisted file: ${name}`);
  }
}

console.log(`build-render: wrote ${copied.length} files to ${DIST}`);
copied.forEach((name) => console.log(` - ${name}`));
