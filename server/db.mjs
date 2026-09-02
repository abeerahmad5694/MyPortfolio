/**
 * SQLite database for the portfolio: admin credentials, settings,
 * and contact-form inquiries.
 * The DB file lives at server/data/portfolio.db (created automatically).
 */
import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { DEFAULT_ADMIN_PASSWORD, DEFAULT_ADMIN_USERNAME } from "./config.mjs";

const dataDir = path.resolve(process.cwd(), "server", "data");
mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, "portfolio.db"));
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp TEXT,
    project_type TEXT,
    message TEXT NOT NULL,
    email_status TEXT NOT NULL DEFAULT 'pending',
    handled INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);

/* ---------------- Masking (simple at-rest obfuscation) ----------------
 * A fixed marker is inserted at the 2nd character when saving and removed
 * when reading back:  "admin" -> "ad@#min" -> "admin".
 * This is deliberately NOT hashing — reversible by design.
 * ------------------------------------------------------------------- */
const MARKER = "@#";

export function mask(value) {
  if (value.length < 2) return value + MARKER;
  return value.slice(0, 2) + MARKER + value.slice(2);
}

export function unmask(value) {
  return value.replace(MARKER, "");
}

/* ---------------- Seed defaults (first run only) ---------------- */

const adminCount = db.prepare("SELECT COUNT(*) AS c FROM admin_users").get();
if (adminCount.c === 0) {
  db.prepare("INSERT INTO admin_users (username, password) VALUES (?, ?)").run(
    mask(DEFAULT_ADMIN_USERNAME),
    mask(DEFAULT_ADMIN_PASSWORD),
  );
}

const emailSetting = db
  .prepare("SELECT value FROM settings WHERE key = 'email_enabled'")
  .get();
if (!emailSetting) {
  db.prepare("INSERT INTO settings (key, value) VALUES ('email_enabled', '1')").run();
}

/* ---------------- Admin credentials ---------------- */

export function getAdminRecord() {
  return db.prepare("SELECT username, password FROM admin_users WHERE id = 1").get();
}

export function verifyAdminCredentials(username, password) {
  const row = getAdminRecord();
  if (!row) return false;
  return unmask(row.username) === username.trim() && unmask(row.password) === password;
}

export function updateAdminCredentials(username, password) {
  db.prepare(
    "UPDATE admin_users SET username = @username, password = @password, updated_at = datetime('now') WHERE id = 1",
  ).run({ username: mask(username.trim()), password: mask(password) });
}

/* ---------------- Settings ---------------- */

export function getEmailEnabled() {
  const row = db.prepare("SELECT value FROM settings WHERE key = 'email_enabled'").get();
  return row?.value === "1";
}

export function setEmailEnabled(enabled) {
  db.prepare(
    "INSERT INTO settings (key, value) VALUES ('email_enabled', @value) ON CONFLICT(key) DO UPDATE SET value = @value",
  ).run({ value: enabled ? "1" : "0" });
}

/* ---------------- Inquiries ---------------- */

export function insertInquiry({ name, email, whatsapp, projectType, message }) {
  const stmt = db.prepare(`
    INSERT INTO inquiries (name, email, whatsapp, project_type, message)
    VALUES (@name, @email, @whatsapp, @projectType, @message)
  `);
  const info = stmt.run({
    name,
    email,
    whatsapp: whatsapp || null,
    projectType: projectType || null,
    message,
  });
  return Number(info.lastInsertRowid);
}

export function setEmailStatus(id, status) {
  if (!["sent", "failed", "pending", "disabled"].includes(status)) return false;
  const info = db
    .prepare("UPDATE inquiries SET email_status = @status WHERE id = @id")
    .run({ id, status });
  return info.changes > 0;
}

export function listInquiries(limit = 200) {
  return db
    .prepare("SELECT * FROM inquiries ORDER BY id DESC LIMIT @limit")
    .all({ limit });
}

export function setHandled(id, handled) {
  const info = db
    .prepare("UPDATE inquiries SET handled = @handled WHERE id = @id")
    .run({ id, handled: handled ? 1 : 0 });
  return info.changes > 0;
}

export function deleteInquiry(id) {
  const info = db.prepare("DELETE FROM inquiries WHERE id = @id").run({ id });
  return info.changes > 0;
}
