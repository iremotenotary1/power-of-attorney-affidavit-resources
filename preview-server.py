import http.server
import os
import socketserver
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parent
PORT = 4190

MIME = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".txt": "text/plain; charset=utf-8",
    ".xml": "application/xml; charset=utf-8",
    ".ico": "image/x-icon",
}


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        parsed = urlparse(self.path)
        path = unquote(parsed.path)
        if path in ("", "/"):
            path = "/index.html"

        # Deny sensitive paths
        lowered = path.lower()
        blocked_prefixes = (
            "/.",
            "/readme",
            "/readme.md",
            "/.git",
            "/.env",
            "/node_modules",
            "/preview-server",
            "/build-render.mjs",
            "/render.yaml",
            "/.gitignore",
            "/package.json",
            "/package-lock.json",
        )
        if any(lowered.startswith(p) or lowered == p.rstrip("/") for p in blocked_prefixes) or "/." in lowered:
            return self.send_branded_404()

        candidate = (ROOT / path.lstrip("/")).resolve()
        try:
            candidate.relative_to(ROOT)
        except ValueError:
            return self.send_branded_404()

        if candidate.is_file():
            return self.serve_file(candidate)

        return self.send_branded_404()

    def serve_file(self, path: Path):
        data = path.read_bytes()
        ctype = MIME.get(path.suffix.lower(), "application/octet-stream")
        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)

    def send_branded_404(self):
        page = ROOT / "404.html"
        data = page.read_bytes() if page.exists() else b"Not found"
        self.send_response(404)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, fmt, *args):
        sys_stderr = __import__("sys").stderr
        sys_stderr.write("%s - %s\n" % (self.address_string(), fmt % args))


if __name__ == "__main__":
    os.chdir(ROOT)
    with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
        print(f"Serving {ROOT} on http://127.0.0.1:{PORT}")
        httpd.serve_forever()
