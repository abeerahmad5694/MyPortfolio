import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "./Button";
import { Toast } from "./Toast";
import { IconCheck } from "./icons";
import { site } from "../data/site";
import { countryCodes } from "../data/countries";
import { getSavedTemplate, renderTemplate } from "../data/admin";

/**
 * Contact form delivery:
 *  1. Every submission is saved to the SQLite inquiries database (/api) —
 *     this always happens first, so a message is never lost.
 *  2. The inquiry is emailed to the site owner via FormSubmit, with the
 *     visitor's address as reply-to, and an automatic confirmation email
 *     (template managed on /admin) sent to the visitor.
 *
 * If the email delivery fails but the save succeeded, the visitor sees a
 * maintenance toast — the submission still counts.
 */
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/abeermkawan@gmail.com";

const projectTypes = [
  "Web application",
  "Mobile app",
  "ERP / POS system",
  "API / integration",
  "Maintenance & support",
  "Something else",
];

const labelClass = "mb-1.5 block text-sm font-medium text-heading/80";
const fieldClass =
  "w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-[15px] text-heading placeholder:text-muted transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

type Status = "idle" | "sending" | "success" | "maintenance" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [sentTo, setSentTo] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [emailAttempted, setEmailAttempted] = useState(false);
  // Admin-controlled switch: whether the form attempts email delivery at all.
  const [emailEnabled, setEmailEnabled] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/settings/email")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { enabled?: boolean } | null) => {
        if (!cancelled && data && typeof data.enabled === "boolean") {
          setEmailEnabled(data.enabled);
        }
      })
      .catch(() => {
        // Default to enabled when the API is unreachable (e.g. static preview).
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const countryCode = String(data.get("countryCode") ?? "").trim();
    const whatsappNumber = String(data.get("whatsapp") ?? "").trim();
    const projectType = String(data.get("projectType") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const honeypot = String(data.get("_honey") ?? "").trim();

    // Honeypot filled — almost certainly a bot; pretend everything is fine.
    if (honeypot) {
      form.reset();
      return;
    }

    setStatus("sending");
    setToastVisible(false);

    // Digits-only international WhatsApp number, e.g. +923001234567
    const whatsapp = whatsappNumber
      ? `${countryCode}${whatsappNumber.replace(/[^\d]/g, "")}`
      : "";

    // 1) Always save the inquiry to the database first.
    let savedId: number | null = null;
    try {
      const saveResponse = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, whatsapp, projectType, message }),
      });
      if (saveResponse.ok) {
        const result = (await saveResponse.json().catch(() => null)) as {
          id?: number;
        } | null;
        savedId = typeof result?.id === "number" ? result.id : null;
      }
    } catch {
      // Database unreachable (e.g. static hosting) — email path still runs.
    }

    // 2) Attempt the email delivery — only when the admin toggle is on.
    let emailSent = false;
    let attempted = false; // local (state updates are async within this handler)
    if (emailEnabled) {
      attempted = true;
      setEmailAttempted(true);
      try {
        const autoresponse = renderTemplate(getSavedTemplate(), {
          name,
          email,
          type: projectType,
        });

        const response = await fetch(FORMSUBMIT_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            Name: name,
            Email: email,
            WhatsApp: whatsapp || "—",
            "Project Type": projectType || "Not specified",
            Message: message,
            _subject: projectType
              ? `Project inquiry: ${projectType} — ${name}`
              : `Project inquiry — ${name}`,
            _replyto: email,
            _template: "table",
            _captcha: "false",
            _autoresponse: autoresponse,
            _honey: honeypot,
          }),
        });

        const result = (await response.json().catch(() => null)) as {
          success?: boolean | string;
        } | null;
        emailSent =
          response.ok &&
          (result?.success === true || result?.success === "true");
      } catch {
        emailSent = false;
      }
    }

    // 3) Record the delivery result on the saved inquiry.
    if (savedId !== null) {
      try {
        await fetch(`/api/inquiries/${savedId}/email-status`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: attempted ? (emailSent ? "sent" : "failed") : "disabled",
          }),
        });
      } catch {
        // Status tracking is best-effort.
      }
    }

    // Saved successfully — either the email went through, or email delivery
    // is switched off by design. The visitor's submission always counts.
    if (savedId !== null && (emailSent || !attempted)) {
      setSentTo(email);
      form.reset();
      setStatus("success");
      return;
    }

    if (savedId !== null) {
      // Email delivery failed but the inquiry is safely stored.
      setSentTo(email);
      form.reset();
      setStatus("maintenance");
      setToastVisible(true);
      return;
    }

    setStatus("error");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate={false}>
        {/* Honeypot — hidden from humans, catches spam bots */}
        <input
          type="text"
          name="_honey"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className={fieldClass}
            />
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="whatsapp" className={labelClass}>
            WhatsApp <span className="font-normal text-muted">(optional)</span>
          </label>
          <div className="flex gap-2">
            <div className="relative w-[9.5rem] shrink-0">
              <select
                id="countryCode"
                name="countryCode"
                defaultValue="+92"
                aria-label="Country code"
                className={`${fieldClass} appearance-none pr-8`}
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.label}
                  </option>
                ))}
              </select>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="3XX XXXXXXX"
              className={fieldClass}
            />
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="projectType" className={labelClass}>
            Project type
          </label>
          <div className="relative">
            <select
              id="projectType"
              name="projectType"
              defaultValue=""
              className={`${fieldClass} appearance-none pr-10`}
            >
              <option value="">Select a project type (optional)</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="message" className={labelClass}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="What are you building, and what you need help with?"
            className={`${fieldClass} resize-y`}
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            type="submit"
            size="lg"
            disabled={status === "sending"}
            aria-busy={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send Message"}
          </Button>
          <p className="text-[13px] leading-relaxed text-muted">
            {emailEnabled
              ? "Goes straight to my inbox — you\u2019ll also get a confirmation copy at the email you enter."
              : "Goes straight to my dashboard \u2014 I\u2019ll reply to you directly."}
          </p>
        </div>
      </form>

      {status === "success" ? (
        <div
          role="status"
          className="mt-6 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3.5"
        >
          <p className="flex items-start gap-2.5 text-sm leading-relaxed text-body">
            <IconCheck className="mt-[3px] h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
            <span>
              {emailAttempted ? (
                <>
                  Message sent. I&rsquo;ll reply to you at{" "}
                  <span className="font-medium text-heading">{sentTo}</span>,
                  and a confirmation copy is on its way to the same address.
                </>
              ) : (
                <>
                  Message received. I&rsquo;ll get back to you at{" "}
                  <span className="font-medium text-heading">{sentTo}</span>{" "}
                  directly.
                </>
              )}{" "}
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="font-medium text-accent-text hover:text-accent-text-hover"
              >
                Send another message
              </button>
              .
            </span>
          </p>
        </div>
      ) : null}

      {status === "maintenance" ? (
        <div
          role="status"
          className="mt-6 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3.5"
        >
          <p className="text-sm leading-relaxed text-body">
            <span className="font-medium text-heading">
              Your message has been received.
            </span>{" "}
            The email service is briefly under maintenance, so the automatic
            confirmation may not arrive — but your inquiry is saved and
            I&rsquo;ll get back to you at{" "}
            <span className="font-medium text-heading">{sentTo}</span>.{" "}
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="font-medium text-accent-text hover:text-accent-text-hover"
            >
              Send another message
            </button>
            .
          </p>
        </div>
      ) : null}

      {status === "error" ? (
        <div
          role="alert"
          className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3.5"
        >
          <p className="text-sm leading-relaxed text-body">
            The message couldn&rsquo;t be sent. Please email me directly at{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-accent-text hover:text-accent-text-hover"
            >
              {site.email}
            </a>{" "}
            — or try again in a moment.
          </p>
        </div>
      ) : null}

      {/* Maintenance toast */}
      <Toast
        show={toastVisible}
        onClose={() => setToastVisible(false)}
        tone="warning"
      >
        <span className="font-medium text-heading">Received — thank you!</span>{" "}
        Email delivery is under maintenance right now, but your inquiry was
        saved successfully and I&rsquo;ll respond to you directly.
      </Toast>
    </div>
  );
}
