import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { usePageMeta } from "../hooks/usePageMeta";
import {
  ADMIN_SESSION_KEY,
  DEFAULT_EMAIL_TEMPLATE,
  clearAdminSession,
  getAdminAuth,
  getAdminUsername,
  clearSavedTemplate,
  getSavedTemplate,
  renderTemplate,
  saveTemplate,
  setAdminSession,
} from "../data/admin";
import type { Inquiry } from "../data/admin";

const fieldClass =
  "w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-[15px] text-heading placeholder:text-muted transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

export function AdminPage() {
  usePageMeta("Admin | Abeer Ahmad");

  const [authed, setAuthed] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_SESSION_KEY) === "1";
    } catch {
      return false;
    }
  });

  // Keep the admin page out of search engines.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, []);

  const signOut = () => {
    clearAdminSession();
    setAuthed(false);
  };

  return (
    <section className="border-t border-line bg-subtle">
      <Container className="py-14 sm:py-20">
        {authed ? (
          <div className="mx-auto max-w-3xl space-y-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Admin</p>
                <h1 className="mt-2 text-xl font-semibold tracking-tight text-heading">
                  Dashboard
                </h1>
                <p className="mt-1.5 text-sm text-body">
                  Signed in as{" "}
                  <span className="font-medium text-heading">{getAdminUsername()}</span> —
                  credentials are stored in the database and can be changed below.
                </p>
              </div>
              <Button variant="secondary" size="sm" onClick={signOut}>
                Sign Out
              </Button>
            </div>
            <EmailToggleCard />
            <InquiriesPanel />
            <TemplateEditor />
            <CredentialsCard />
          </div>
        ) : (
          <LoginForm onSuccess={() => setAuthed(true)} />
        )}
      </Container>
    </section>
  );
}

/* ---------------- Login (verified against the database) ---------------- */

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        username?: string;
        auth?: string;
      } | null;

      if (response.ok && data?.ok && data.auth && data.username) {
        setAdminSession(data.auth, data.username);
        onSuccess();
      } else {
        setError("Wrong username or password.");
      }
    } catch {
      setError("Couldn&rsquo;t reach the server — is it running?");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm">
      <div className="card p-6 sm:p-8">
        <p className="eyebrow">Admin</p>
        <h1 className="mt-2.5 text-xl font-semibold tracking-tight text-heading">Sign in</h1>
        <p className="mt-1.5 text-sm text-body">
          Manage contact-form inquiries and the confirmation email template.
        </p>

        <form onSubmit={(e) => void handleSubmit(e)} className="mt-6">
          <div>
            <label htmlFor="admin-user" className="mb-1.5 block text-sm font-medium text-heading/80">
              Username
            </label>
            <input
              id="admin-user"
              type="text"
              required
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="admin-pass" className="mb-1.5 block text-sm font-medium text-heading/80">
              Password
            </label>
            <input
              id="admin-pass"
              type="password"
              required
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldClass}
            />
          </div>

          {error ? (
            <p
              role="alert"
              className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-body"
            >
              {error === "Couldn&rsquo;t reach the server — is it running?"
                ? "Couldn’t reach the server — is it running?"
                : error}
            </p>
          ) : null}

          <Button type="submit" className="mt-5 w-full" disabled={busy}>
            {busy ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}

/* ---------------- Email-on-submit toggle ---------------- */

function Toggle({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 disabled:opacity-50 ${
        checked ? "bg-accent" : "bg-slate-300 dark:bg-slate-700"
      }`}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-4.5 w-4.5 rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? "translate-x-[1.5rem]" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function EmailToggleCard() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/settings/email")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { enabled?: boolean } | null) => {
        if (data && typeof data.enabled === "boolean") setEnabled(data.enabled);
      })
      .catch(() => setEnabled(null));
  }, []);

  const update = async (next: boolean) => {
    const previous = enabled;
    setEnabled(next); // optimistic
    setBusy(true);
    try {
      const response = await fetch("/api/settings/email", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: getAdminAuth() },
        body: JSON.stringify({ enabled: next }),
      });
      if (!response.ok) throw new Error(String(response.status));
    } catch {
      setEnabled(previous); // revert on failure
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-heading">Send emails on form submit</h2>
          <p className="mt-1 text-[13px] leading-relaxed text-body">
            {enabled === false
              ? "Off — submissions are still saved to the database; no emails are sent (visitors see a “received” notice)."
              : "On — every submission emails you the inquiry and sends the visitor a confirmation copy."}
          </p>
        </div>
        <Toggle
          checked={enabled === true}
          onChange={(next) => void update(next)}
          disabled={enabled === null || busy}
          label="Send emails on form submit"
        />
      </div>
      {enabled === null ? (
        <p className="mt-3 text-xs text-muted">Loading setting… (is the server running?)</p>
      ) : null}
    </div>
  );
}

/* ---------------- Inquiries (SQLite) ---------------- */

function EmailStatusBadge({ status }: { status: Inquiry["email_status"] }) {
  if (status === "sent") {
    return (
      <span className="inline-flex items-center gap-1 rounded-md border border-green-500/30 bg-green-500/10 px-2 py-0.5 text-[11px] font-medium text-green-700 dark:text-green-400">
        Email sent
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:text-amber-400">
        Email not delivered
      </span>
    );
  }
  if (status === "disabled") {
    return (
      <span className="inline-flex items-center gap-1 rounded-md border border-line bg-chip px-2 py-0.5 text-[11px] font-medium text-muted">
        Email off
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-line bg-chip px-2 py-0.5 text-[11px] font-medium text-muted">
      Email pending
    </span>
  );
}

function InquiriesPanel() {
  const [inquiries, setInquiries] = useState<Inquiry[] | null>(null);
  const [loadError, setLoadError] = useState<"none" | "server" | "auth">("none");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setBusy(true);
    setLoadError("none");
    try {
      const response = await fetch("/api/inquiries", {
        headers: { Authorization: getAdminAuth() },
      });
      if (response.status === 401) {
        setLoadError("auth");
        return;
      }
      if (!response.ok) throw new Error(String(response.status));
      const result = (await response.json()) as { inquiries: Inquiry[] };
      setInquiries(result.inquiries);
    } catch {
      setLoadError("server");
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const toggleHandled = async (inquiry: Inquiry) => {
    setInquiries((current) =>
      current
        ? current.map((item) =>
            item.id === inquiry.id ? { ...item, handled: item.handled ? 0 : 1 } : item,
          )
        : current,
    );
    try {
      await fetch(`/api/inquiries/${inquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: getAdminAuth() },
        body: JSON.stringify({ handled: !inquiry.handled }),
      });
    } catch {
      void load();
    }
  };

  const remove = async (inquiry: Inquiry) => {
    const previous = inquiries;
    setInquiries((current) => (current ? current.filter((item) => item.id !== inquiry.id) : current));
    try {
      const response = await fetch(`/api/inquiries/${inquiry.id}`, {
        method: "DELETE",
        headers: { Authorization: getAdminAuth() },
      });
      if (!response.ok) throw new Error(String(response.status));
    } catch {
      if (previous) setInquiries(previous);
    }
  };

  const unread = inquiries?.filter((item) => !item.handled).length ?? 0;

  return (
    <div className="card p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-heading">
            Inquiries
            {inquiries ? (
              <span className="ml-2 font-normal text-muted">
                {inquiries.length} total{unread > 0 ? ` · ${unread} new` : ""}
              </span>
            ) : null}
          </h2>
          <p className="mt-0.5 text-xs text-muted">
            Saved to the SQLite database (server/data/portfolio.db).
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => void load()} disabled={busy}>
          {busy ? "Loading…" : "Refresh"}
        </Button>
      </div>

      {loadError === "auth" ? (
        <p role="alert" className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-body">
          Session expired or credentials changed — sign out and sign in again.
        </p>
      ) : null}
      {loadError === "server" ? (
        <p role="alert" className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-body">
          Couldn&rsquo;t load inquiries — the API server isn&rsquo;t reachable. Run the
          site with <code className="font-mono text-[12px]">npm run dev</code> or{" "}
          <code className="font-mono text-[12px]">npm start</code>.
        </p>
      ) : null}

      {inquiries !== null && inquiries.length === 0 && loadError === "none" ? (
        <p className="mt-5 rounded-lg border border-line bg-chip px-4 py-3 text-sm text-muted">
          No inquiries yet — messages from the contact form will appear here.
        </p>
      ) : null}

      <ul className="mt-5 space-y-4">
        {(inquiries ?? []).map((inquiry) => (
          <li
            key={inquiry.id}
            className={`rounded-lg border p-4 transition-colors ${
              inquiry.handled ? "border-line bg-chip opacity-75" : "border-line bg-surface"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
              <div>
                <p className="text-[15px] font-semibold text-heading">
                  {inquiry.name}
                  {inquiry.handled ? (
                    <span className="ml-2 align-middle text-[11px] font-medium text-green-600 dark:text-green-400">
                      ✓ handled
                    </span>
                  ) : null}
                </p>
                <p className="mt-0.5 font-mono text-xs text-muted">
                  {new Date(`${inquiry.created_at.replace(" ", "T")}Z`).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
              <EmailStatusBadge status={inquiry.email_status} />
            </div>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
              <a
                href={`mailto:${inquiry.email}`}
                className="font-medium text-accent-text hover:text-accent-text-hover"
              >
                {inquiry.email}
              </a>
              {inquiry.whatsapp ? (
                <a
                  href={`https://wa.me/${inquiry.whatsapp.replace(/[^\d]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-body transition-colors hover:text-accent-text"
                >
                  WhatsApp {inquiry.whatsapp}
                </a>
              ) : null}
              {inquiry.project_type ? (
                <span className="rounded-md border border-line bg-chip px-2 py-0.5 font-mono text-[11px] text-muted">
                  {inquiry.project_type}
                </span>
              ) : null}
            </div>

            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-body">
              {inquiry.message}
            </p>

            <div className="mt-3.5 flex flex-wrap gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => void toggleHandled(inquiry)}
              >
                {inquiry.handled ? "Mark New" : "Mark Handled"}
              </Button>
              <Button variant="secondary" size="sm" onClick={() => void remove(inquiry)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Template editor ---------------- */

const sampleVars = {
  name: "Sana Khan",
  email: "sana@example.com",
  type: "ERP / POS system",
};

function TemplateEditor() {
  const [template, setTemplate] = useState<string>(getSavedTemplate);
  const [saved, setSaved] = useState(false);
  const isDefault = template === DEFAULT_EMAIL_TEMPLATE;

  const handleSave = () => {
    saveTemplate(template);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    clearSavedTemplate();
    setTemplate(DEFAULT_EMAIL_TEMPLATE);
  };

  return (
    <div className="card p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-heading">Visitor confirmation email</h2>
        <p className="text-xs text-muted">
          Placeholders:{" "}
          <code className="rounded border border-line bg-chip px-1.5 py-0.5 font-mono text-[11px]">{"{name}"}</code>{" "}
          <code className="rounded border border-line bg-chip px-1.5 py-0.5 font-mono text-[11px]">{"{email}"}</code>{" "}
          <code className="rounded border border-line bg-chip px-1.5 py-0.5 font-mono text-[11px]">{"{type}"}</code>
        </p>
      </div>
      <textarea
        aria-label="Email template"
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
        rows={11}
        className={`${fieldClass} mt-3 resize-y font-mono text-[13px] leading-relaxed`}
      />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button onClick={handleSave}>Save Template</Button>
        <Button variant="secondary" onClick={handleReset} disabled={isDefault}>
          Restore Default
        </Button>
        <span aria-live="polite" className="text-sm text-green-600 dark:text-green-400">
          {saved ? "Saved ✓" : isDefault ? "Using the default template" : "Unsaved changes"}
        </span>
      </div>

      <div className="mt-5 border-t border-line pt-5">
        <h3 className="text-sm font-semibold text-heading">Preview</h3>
        <pre className="mt-3 whitespace-pre-wrap rounded-lg border border-line bg-chip p-4 font-mono text-[13px] leading-relaxed text-body">
          {renderTemplate(template, sampleVars)}
        </pre>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Saving applies it in this browser. To make it permanent for all
          visitors, copy the text into{" "}
          <code className="rounded border border-line bg-chip px-1.5 py-0.5 font-mono text-[11px]">
            DEFAULT_EMAIL_TEMPLATE
          </code>{" "}
          in{" "}
          <code className="rounded border border-line bg-chip px-1.5 py-0.5 font-mono text-[11px]">
            src/data/admin.ts
          </code>{" "}
          and rebuild.
        </p>
      </div>
    </div>
  );
}

/* ---------------- Change credentials (stored in the DB) ---------------- */

function CredentialsCard() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [username, setUsername] = useState(() => getAdminUsername());
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    setMessage(null);

    if (password !== confirm) {
      setMessage({ tone: "error", text: "New password and confirmation don’t match." });
      return;
    }
    if (password.length < 6) {
      setMessage({ tone: "error", text: "New password must be at least 6 characters." });
      return;
    }

    setBusy(true);
    try {
      const response = await fetch("/api/admin/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: getAdminAuth() },
        body: JSON.stringify({ currentPassword, username, password }),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        auth?: string;
        username?: string;
      } | null;

      if (response.ok && data?.ok && data.auth && data.username) {
        setAdminSession(data.auth, data.username);
        setCurrentPassword("");
        setPassword("");
        setConfirm("");
        setMessage({ tone: "ok", text: "Credentials updated — stored in the database." });
      } else {
        setMessage({
          tone: "error",
          text: data?.error ?? "Couldn’t update credentials.",
        });
      }
    } catch {
      setMessage({ tone: "error", text: "Couldn’t reach the server." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card p-6 sm:p-7">
      <h2 className="text-sm font-semibold text-heading">Admin credentials</h2>
      <p className="mt-1 text-[13px] leading-relaxed text-body">
        Stored in the SQLite database. Enter your current password to make changes;
        new sign-ins (and this session) will use the new credentials.
      </p>

      <form onSubmit={(e) => void handleSubmit(e)} className="mt-5">
        <div>
          <label htmlFor="cred-current" className="mb-1.5 block text-sm font-medium text-heading/80">
            Current password
          </label>
          <input
            id="cred-current"
            type="password"
            required
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cred-user" className="mb-1.5 block text-sm font-medium text-heading/80">
              New username
            </label>
            <input
              id="cred-user"
              type="text"
              required
              minLength={2}
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="cred-pass" className="mb-1.5 block text-sm font-medium text-heading/80">
              New password
            </label>
            <input
              id="cred-pass"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="cred-confirm" className="mb-1.5 block text-sm font-medium text-heading/80">
            Confirm new password
          </label>
          <input
            id="cred-confirm"
            type="password"
            required
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={fieldClass}
          />
        </div>

        {message ? (
          <p
            role={message.tone === "error" ? "alert" : "status"}
            className={`mt-4 rounded-lg px-3.5 py-2.5 text-sm ${
              message.tone === "error"
                ? "border border-red-500/30 bg-red-500/10 text-body"
                : "border border-green-500/30 bg-green-500/10 text-body"
            }`}
          >
            {message.text}
          </p>
        ) : null}

        <Button type="submit" className="mt-5" disabled={busy}>
          {busy ? "Saving…" : "Update Credentials"}
        </Button>
      </form>
    </div>
  );
}
