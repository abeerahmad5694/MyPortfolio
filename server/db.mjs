/**
 * SQLite database for the portfolio: admin credentials, settings,
 * and contact-form inquiries.
 * The DB file lives at server/data/portfolio.db (created automatically on first API call).
 * Uses Node.js built-in `node:sqlite` (DatabaseSync) for zero-dependency speed.
 */
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { DEFAULT_ADMIN_PASSWORD, DEFAULT_ADMIN_USERNAME } from "./config.mjs";

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

let _db = null;

function getDb() {
  if (_db) return _db;

  const dataDir = path.resolve(process.cwd(), "server", "data");
  mkdirSync(dataDir, { recursive: true });

  const db = new DatabaseSync(path.join(dataDir, "portfolio.db"));
  db.exec("PRAGMA journal_mode = WAL;");

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

  // Seed defaults (first run only)
  const adminCount = db.prepare("SELECT COUNT(*) AS c FROM admin_users").get();
  if (!adminCount || Number(adminCount.c) === 0) {
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

  _db = db;
  return _db;
}

/* ---------------- Admin credentials ---------------- */

export function getAdminRecord() {
  const row = getDb()
    .prepare("SELECT username, password FROM admin_users WHERE id = 1")
    .get();
  return row ? { username: String(row.username), password: String(row.password) } : null;
}

export function verifyAdminCredentials(username, password) {
  const row = getAdminRecord();
  if (!row) return false;
  return unmask(row.username) === username.trim() && unmask(row.password) === password;
}

export function updateAdminCredentials(username, password) {
  getDb()
    .prepare(
      "UPDATE admin_users SET username = ?, password = ?, updated_at = datetime('now') WHERE id = 1",
    )
    .run(mask(username.trim()), mask(password));
}

/* ---------------- Settings ---------------- */

export function getEmailEnabled() {
  const row = getDb()
    .prepare("SELECT value FROM settings WHERE key = 'email_enabled'")
    .get();
  return row?.value === "1";
}

export function setEmailEnabled(enabled) {
  const value = enabled ? "1" : "0";
  getDb()
    .prepare(
      "INSERT INTO settings (key, value) VALUES ('email_enabled', ?) ON CONFLICT(key) DO UPDATE SET value = ?",
    )
    .run(value, value);
}

/* ---------------- Inquiries ---------------- */

export function insertInquiry({ name, email, whatsapp, projectType, message }) {
  const stmt = getDb().prepare(`
    INSERT INTO inquiries (name, email, whatsapp, project_type, message)
    VALUES (?, ?, ?, ?, ?)
  `);
  const info = stmt.run(
    name,
    email,
    whatsapp || null,
    projectType || null,
    message,
  );
  return Number(info.lastInsertRowid);
}

export function setEmailStatus(id, status) {
  if (!["sent", "failed", "pending", "disabled"].includes(status)) return false;
  const info = getDb()
    .prepare("UPDATE inquiries SET email_status = ? WHERE id = ?")
    .run(status, Number(id));
  return Number(info.changes) > 0;
}

export function listInquiries(limit = 200) {
  const rows = getDb()
    .prepare("SELECT * FROM inquiries ORDER BY id DESC LIMIT ?")
    .all(Number(limit));
  return rows.map((r) => ({ ...r }));
}

export function setHandled(id, handled) {
  const info = getDb()
    .prepare("UPDATE inquiries SET handled = ? WHERE id = ?")
    .run(handled ? 1 : 0, Number(id));
  return Number(info.changes) > 0;
}

export function deleteInquiry(id) {
  const info = getDb()
    .prepare("DELETE FROM inquiries WHERE id = ?")
    .run(Number(id));
  return Number(info.changes) > 0;
}
