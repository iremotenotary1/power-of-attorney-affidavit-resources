import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const PORT = 4190;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".ico": "image/x-icon",
};

function isBlocked(urlPath) {
  const lowered = urlPath.toLowerCase();
  if (lowered.includes("/.") || lowered.startsWith("/.")) return true;
  const blocked = [
    "/readme",
    "/readme.md",
    "/.git",
    "/.env",
    "/node_modules",
    "/preview-server.py",
    "/preview-server.mjs",
    "/.gitignore",
    "/build-render.mjs",
    "/render.yaml",
    "/package.json",
    "/package-lock.json",
  ];
  return blocked.some((item) => lowered === item || lowered.startsWith(item + "/"));
}

function send(res, status, type, body) {
  res.writeHead(status, {
    "Content-Type": type,
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
  });
  res.end(body);
}

function send404(res) {
  const page = path.join(ROOT, "404.html");
  const body = fs.existsSync(page) ? fs.readFileSync(page) : Buffer.from("Not found");
  send(res, 404, "text/html; charset=utf-8", body);
}

const server = http.createServer((req, res) => {
  try {
    const url = new URL(req.url || "/", `http://127.0.0.1:${PORT}`);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === "/" || pathname === "") pathname = "/index.html";
    if (isBlocked(pathname)) return send404(res);

    const candidate = path.resolve(ROOT, "." + pathname);
    if (!candidate.startsWith(ROOT)) return send404(res);
    if (!fs.existsSync(candidate) || !fs.statSync(candidate).isFile()) return send404(res);

    const ext = path.extname(candidate).toLowerCase();
    const type = MIME[ext] || "application/octet-stream";
    send(res, 200, type, fs.readFileSync(candidate));
  } catch {
    send404(res);
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Serving ${ROOT} on http://127.0.0.1:${PORT}`);
});
