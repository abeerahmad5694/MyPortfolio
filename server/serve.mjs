/**
 * Standalone production server:
 *   node server/serve.mjs
 * Serves the built site (dist/) + the SQLite-backed API on one port,
 * with automatic Gzip compression and immutable asset caching.
 * Run `npm run build` first.
 */
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { gzipSync } from "node:zlib";
import path from "node:path";
import { apiMiddleware } from "./api.mjs";

const distDir = path.resolve(process.cwd(), "dist");
const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "0.0.0.0";

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

const compressibleExts = new Set([".html", ".js", ".css", ".svg", ".json", ".txt"]);

function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(body);
}

function sendFile(req, res, filePath, isHashedAsset = false) {
  const ext = path.extname(filePath).toLowerCase();
  const type = mimeTypes[ext] ?? "application/octet-stream";
  const cacheControl = isHashedAsset
    ? "public, max-age=31536000, immutable"
    : ext === ".html"
      ? "no-cache"
      : "public, max-age=86400";

  const raw = readFileSync(filePath);
  const acceptEncoding = String(req.headers["accept-encoding"] ?? "");

  if (compressibleExts.has(ext) && raw.length > 1024 && acceptEncoding.includes("gzip")) {
    const compressed = gzipSync(raw);
    res.writeHead(200, {
      "Content-Type": type,
      "Content-Encoding": "gzip",
      Vary: "Accept-Encoding",
      "Cache-Control": cacheControl,
    });
    res.end(compressed);
    return;
  }

  res.writeHead(200, {
    "Content-Type": type,
    "Cache-Control": cacheControl,
  });
  res.end(raw);
}

const server = createServer((req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");

  if (url.pathname.startsWith("/api/")) {
    apiMiddleware(req, res, () => sendJson(res, 404, { ok: false, error: "Not found." }));
    return;
  }

  // Static files
  const requested = path.normalize(path.join(distDir, url.pathname));
  if (requested.startsWith(distDir) && existsSync(requested) && statSync(requested).isFile()) {
    const isHashedAsset = url.pathname.startsWith("/assets/");
    sendFile(req, res, requested, isHashedAsset);
    return;
  }

  // SPA fallback
  const indexPath = path.join(distDir, "index.html");
  if (existsSync(indexPath)) {
    sendFile(req, res, indexPath, false);
  } else {
    res.writeHead(503, { "Content-Type": "text/plain" });
    res.end("Site not built yet — run: npm run build");
  }
});

server.listen(port, host, () => {
  console.log(`Portfolio server running at http://localhost:${port}`);
});
