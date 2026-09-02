/**
 * Standalone production server:
 *   node server/serve.mjs
 * Serves the built site (dist/) + the SQLite-backed API on one port.
 * Run `npm run build` first.
 */
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { apiMiddleware } from "./api.mjs";

const distDir = path.resolve(process.cwd(), "dist");
const port = Number(process.env.PORT ?? 3000);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function sendFile(res, filePath) {
  const type = mimeTypes[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";
  res.writeHead(200, { "Content-Type": type, "Cache-Control": "public, max-age=3600" });
  res.end(readFileSync(filePath));
}

const server = createServer((req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");

  if (url.pathname.startsWith("/api/")) {
    apiMiddleware(req, res, () => send(res, 404, { ok: false, error: "Not found." }));
    return;
  }

  // Static files
  const requested = path.normalize(path.join(distDir, url.pathname));
  if (requested.startsWith(distDir) && existsSync(requested) && statSync(requested).isFile()) {
    sendFile(res, requested);
    return;
  }

  // SPA fallback
  const indexPath = path.join(distDir, "index.html");
  if (existsSync(indexPath)) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(readFileSync(indexPath));
  } else {
    res.writeHead(503, { "Content-Type": "text/plain" });
    res.end("Site not built yet — run: npm run build");
  }
});

server.listen(port, () => {
  console.log(`Portfolio server running at http://localhost:${port}`);
});
