import { useState } from "react";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { PageHeader } from "../components/PageHeader";
import { ContactForm } from "../components/ContactForm";
import { SocialLabeledLinks } from "../components/SocialLinks";
import { usePageMeta } from "../hooks/usePageMeta";
import { site } from "../data/site";
import {
  IconCheck,
  IconCopy,
  IconMail,
  IconMapPin,
  IconPhone,
} from "../components/icons";

export function ContactPage() {
  usePageMeta(
    "Contact | Abeer Ahmad",
    "Get in touch with Abeer Ahmad about web applications, mobile apps, ERP and POS systems, APIs, or maintenance of an existing system.",
  );

  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the address is visible right next to the button.
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Have a project"
        highlight="in mind?"
        description="Tell me what you’re building and what you need help with."
      />

      <section>
        <Container className="py-12 sm:py-16">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
            <Reveal>
              <div className="card p-6 sm:p-8">
                <ContactForm />
              </div>
            </Reveal>

            <Reveal delay={80}>
              <aside className="card p-6 sm:p-7">
                <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-text">
                  Direct contact
                </h2>

                <dl className="mt-4 divide-y divide-line">
                  <div className="pb-4">
                    <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                      <IconMail className="h-3.5 w-3.5 text-accent-text" />
                      Email
                    </dt>
                    <dd className="mt-1.5 flex flex-wrap items-center gap-2">
                      <a
                        href={`mailto:${site.email}`}
                        className="text-[15px] font-bold text-heading transition-colors hover:text-accent-text"
                      >
                        {site.email}
                      </a>
                      <button
                        type="button"
                        onClick={copyEmail}
                        aria-label="Copy email address"
                        className="inline-flex h-7 w-7 items-center justify-center rounded border border-line bg-subtle text-muted transition-colors hover:border-line-strong hover:text-heading"
                      >
                        {copied ? (
                          <IconCheck className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <IconCopy className="h-3.5 w-3.5" />
                        )}
                      </button>
                      <span
                        aria-live="polite"
                        className="font-mono text-xs text-emerald-600 dark:text-emerald-400"
                      >
                        {copied ? "Copied" : ""}
                      </span>
                    </dd>
                  </div>

                  <div className="py-4">
                    <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                      <IconPhone className="h-3.5 w-3.5 text-accent-text" />
                      Phone
                    </dt>
                    <dd className="mt-1.5">
                      <a
                        href={site.phoneHref}
                        className="text-[15px] font-bold text-heading transition-colors hover:text-accent-text"
                      >
                        {site.phoneDisplay}
                      </a>
                    </dd>
                  </div>

                  <div className="pt-4">
                    <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                      <IconMapPin className="h-3.5 w-3.5 text-accent-text" />
                      Location
                    </dt>
                    <dd className="mt-1.5 text-[15px] font-bold text-heading">
                      {site.location}
                    </dd>
                  </div>
                </dl>

                <h2 className="mt-7 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Elsewhere
                </h2>
                <div className="mt-3">
                  <SocialLabeledLinks />
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
