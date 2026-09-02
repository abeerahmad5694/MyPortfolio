/**
 * Admin session helpers + visitor email template.
 *
 * Admin credentials are stored in the SQLite database (server/data) —
 * seeded with VM / vme34ne on first run and changeable from /admin.
 * At rest they are lightly obfuscated: a fixed marker is inserted at the
 * 2nd character ("admin" -> "ad@#min") and removed when reading back.
 * This is a simple gate, not real security.
 */
export const ADMIN_SESSION_KEY = "portfolio-admin-authed";
export const ADMIN_AUTH_KEY = "portfolio-admin-auth";
export const ADMIN_USER_KEY = "portfolio-admin-user";
export const EMAIL_TEMPLATE_KEY = "portfolio-email-template";

/**
 * Confirmation email automatically sent to the visitor after they submit
 * the contact form. Placeholders {name}, {email} and {type} are replaced
 * with the visitor's actual values before sending.
 */
export const DEFAULT_EMAIL_TEMPLATE = `Hi {name},

Thanks for reaching out through my website. I've received your message about "{type}" and will get back to you at {email} as soon as I can — usually within 24 hours.

In the meantime, feel free to browse my recent projects or connect with me on LinkedIn.

Best regards,
Abeer Ahmad
Full-Stack Developer — Django & Flutter
abeermkawan@gmail.com | +92 336 7804302`;

export function getSavedTemplate(): string {
  try {
    return localStorage.getItem(EMAIL_TEMPLATE_KEY) ?? DEFAULT_EMAIL_TEMPLATE;
  } catch {
    return DEFAULT_EMAIL_TEMPLATE;
  }
}

export function saveTemplate(template: string): void {
  try {
    localStorage.setItem(EMAIL_TEMPLATE_KEY, template);
  } catch {
    // Storage unavailable (private mode etc.) — template still usable this session.
  }
}

export function clearSavedTemplate(): void {
  try {
    localStorage.removeItem(EMAIL_TEMPLATE_KEY);
  } catch {
    // Ignore.
  }
}

export interface TemplateVars {
  name: string;
  email: string;
  type: string;
}

/** Replaces {name}, {email} and {type} placeholders in the template. */
export function renderTemplate(template: string, vars: TemplateVars): string {
  return template
    .replaceAll("{name}", vars.name || "there")
    .replaceAll("{email}", vars.email || "your email")
    .replaceAll("{type}", vars.type || "your project");
}

/* ---------------- Admin session (credentials live in the DB) ---------------- */

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  whatsapp: string | null;
  project_type: string | null;
  message: string;
  email_status: "pending" | "sent" | "failed" | "disabled";
  handled: 0 | 1;
  created_at: string;
}

export interface LoginResponse {
  ok: boolean;
  username?: string;
  auth?: string;
}

/** Stored Basic-auth header for admin API calls (empty when signed out). */
export function getAdminAuth(): string {
  try {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) ?? "";
  } catch {
    return "";
  }
}

export function setAdminSession(auth: string, username: string): void {
  try {
    sessionStorage.setItem(ADMIN_AUTH_KEY, auth);
    sessionStorage.setItem(ADMIN_USER_KEY, username);
    sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
  } catch {
    // Session storage unavailable — login still works for this view.
  }
}

export function getAdminUsername(): string {
  try {
    return sessionStorage.getItem(ADMIN_USER_KEY) ?? "";
  } catch {
    return "";
  }
}

export function clearAdminSession(): void {
  try {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    sessionStorage.removeItem(ADMIN_USER_KEY);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  } catch {
    // Ignore.
  }
}
