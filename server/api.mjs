/**
 * Connect-compatible API middleware (used by both the Vite dev server
 * and the standalone production server in serve.mjs).
 *
 * Public routes:
 *   POST /api/inquiries                    — save an inquiry
 *   POST /api/inquiries/:id/email-status   — record email delivery result
 *   POST /api/admin/login                  — verify credentials, returns auth header
 *   GET  /api/settings/email               — is email-on-submit enabled?
 *
 * Admin routes (Basic auth against the DB credentials):
 *   GET    /api/inquiries                  — list inquiries
 *   PATCH  /api/inquiries/:id              — toggle handled
 *   DELETE /api/inquiries/:id              — remove an inquiry
 *   POST   /api/admin/credentials          — change username/password
 *   PUT    /api/settings/email             — toggle email-on-submit
 */
import {
  deleteInquiry,
  getEmailEnabled,
  getAdminRecord,
  insertInquiry,
  listInquiries,
  setHandled,
  setEmailEnabled,
  setEmailStatus,
  unmask,
  updateAdminCredentials,
  verifyAdminCredentials,
} from "./db.mjs";

const MAX_BODY_BYTES = 64 * 1024;

function send(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve) => {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        resolve(null);
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        resolve(null);
      }
    });
    req.on("error", () => resolve(null));
  });
}

function credentialsFromRequest(req) {
  const header = req.headers.authorization ?? "";
  if (!header.startsWith("Basic ")) return null;
  let decoded = "";
  try {
    decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
  } catch {
    return null;
  }
  const separator = decoded.indexOf(":");
  if (separator === -1) return null;
  return { user: decoded.slice(0, separator), pass: decoded.slice(separator + 1) };
}

function isAuthed(req) {
  const credentials = credentialsFromRequest(req);
  if (!credentials) return false;
  return verifyAdminCredentials(credentials.user, credentials.pass);
}

function authHeaderValue(username, password) {
  return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
}

const str = (value, max = 5000) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export function apiMiddleware(req, res, next) {
  const url = new URL(req.url ?? "/", "http://localhost");
  const pathName = url.pathname;

  if (!pathName.startsWith("/api/")) {
    next();
    return;
  }

  const handle = async () => {
    /* ---------------- Public routes ---------------- */

    // Save a new inquiry
    if (req.method === "POST" && pathName === "/api/inquiries") {
      const body = await readBody(req);
      if (!body) {
        send(res, 400, { ok: false, error: "Invalid JSON body." });
        return;
      }
      const name = str(body.name, 120);
      const email = str(body.email, 200);
      const message = str(body.message, 5000);
      if (!name || !email || !message) {
        send(res, 422, { ok: false, error: "Name, email and message are required." });
        return;
      }
      const whatsapp = str(body.whatsapp, 40);
      const projectType = str(body.projectType, 120);
      const id = insertInquiry({ name, email, whatsapp, projectType, message });
      send(res, 201, { ok: true, id });
      return;
    }

    // Record email delivery result
    const emailStatusMatch = pathName.match(/^\/api\/inquiries\/(\d+)\/email-status$/);
    if (req.method === "POST" && emailStatusMatch) {
      const body = await readBody(req);
      const status = body && typeof body.status === "string" ? body.status : "";
      const updated = setEmailStatus(Number(emailStatusMatch[1]), status);
      send(res, updated ? 200 : 404, { ok: updated });
      return;
    }

    // Admin login — verifies against the DB, returns a ready-to-use auth header
    if (req.method === "POST" && pathName === "/api/admin/login") {
      const body = await readBody(req);
      const username = str(body?.username, 60);
      const password = typeof body?.password === "string" ? body.password : "";
      if (!verifyAdminCredentials(username, password)) {
        send(res, 401, { ok: false, error: "Wrong username or password." });
        return;
      }
      send(res, 200, {
        ok: true,
        username: username.trim(),
        auth: authHeaderValue(username.trim(), password),
      });
      return;
    }

    // Email-on-submit toggle state (public — the contact form reads this)
    if (req.method === "GET" && pathName === "/api/settings/email") {
      send(res, 200, { enabled: getEmailEnabled() });
      return;
    }

    /* ---------------- Admin routes ---------------- */

    if (!isAuthed(req)) {
      res.writeHead(401, {
        "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"',
        "Content-Type": "application/json; charset=utf-8",
      });
      res.end(JSON.stringify({ ok: false, error: "Unauthorized." }));
      return;
    }

    if (req.method === "GET" && pathName === "/api/inquiries") {
      send(res, 200, { ok: true, inquiries: listInquiries() });
      return;
    }

    const idMatch = pathName.match(/^\/api\/inquiries\/(\d+)$/);
    if (idMatch) {
      const id = Number(idMatch[1]);
      if (req.method === "PATCH") {
        const body = await readBody(req);
        if (!body || typeof body.handled !== "boolean") {
          send(res, 422, { ok: false, error: "handled (boolean) is required." });
          return;
        }
        send(res, setHandled(id, body.handled) ? 200 : 404, { ok: true });
        return;
      }
      if (req.method === "DELETE") {
        send(res, deleteInquiry(id) ? 200 : 404, { ok: true });
        return;
      }
    }

    // Change admin username/password (current password required)
    if (req.method === "POST" && pathName === "/api/admin/credentials") {
      const body = await readBody(req);
      const currentPassword =
        typeof body?.currentPassword === "string" ? body.currentPassword : "";
      const username = str(body?.username, 60);
      const password = typeof body?.password === "string" ? body.password : "";

      const record = getAdminRecord();
      if (!record || unmask(record.password) !== currentPassword) {
        send(res, 403, { ok: false, error: "Current password is incorrect." });
        return;
      }
      if (username.length < 2) {
        send(res, 422, { ok: false, error: "Username must be at least 2 characters." });
        return;
      }
      if (password.length < 6) {
        send(res, 422, { ok: false, error: "Password must be at least 6 characters." });
        return;
      }
      updateAdminCredentials(username, password);
      send(res, 200, {
        ok: true,
        username: username.trim(),
        auth: authHeaderValue(username.trim(), password),
      });
      return;
    }

    // Toggle email-on-submit
    if (req.method === "PUT" && pathName === "/api/settings/email") {
      const body = await readBody(req);
      if (!body || typeof body.enabled !== "boolean") {
        send(res, 422, { ok: false, error: "enabled (boolean) is required." });
        return;
      }
      setEmailEnabled(body.enabled);
      send(res, 200, { ok: true, enabled: body.enabled });
      return;
    }

    send(res, 404, { ok: false, error: "Not found." });
  };

  handle().catch(() => {
    if (!res.headersSent) {
      send(res, 500, { ok: false, error: "Server error." });
    }
  });
}
