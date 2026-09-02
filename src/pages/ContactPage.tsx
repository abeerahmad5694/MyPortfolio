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
        title="Have a project in mind?"
        description="Tell me what you’re building and what you need help with."
      />

      <section>
        <Container className="py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
            <Reveal>
              <ContactForm />
            </Reveal>

            <Reveal delay={120}>
              <aside className="space-y-6">
                <div className="img-frame">
                  <img
                    src="/images/desk-night.jpg"
                    alt="Code on a dark screen in a dimly lit room"
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/2]"
                  />
                </div>

                <div className="card p-6 sm:p-7">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Direct contact
                  </h2>

                  <dl className="mt-4 space-y-4">
                    <div>
                      <dt className="flex items-center gap-2 text-sm font-medium text-heading/80">
                        <IconMail className="h-4 w-4 text-muted" />
                        Email
                      </dt>
                      <dd className="mt-1.5 flex flex-wrap items-center gap-2">
                        <a
                          href={`mailto:${site.email}`}
                          className="text-[15px] font-medium text-heading transition-colors hover:text-accent-text"
                        >
                          {site.email}
                        </a>
                        <button
                          type="button"
                          onClick={copyEmail}
                          aria-label="Copy email address"
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-heading"
                        >
                          {copied ? (
                            <IconCheck className="h-3.5 w-3.5 text-green-500" />
                          ) : (
                            <IconCopy className="h-3.5 w-3.5" />
                          )}
                        </button>
                        <span aria-live="polite" className="text-xs text-green-600 dark:text-green-400">
                          {copied ? "Copied" : ""}
                        </span>
                      </dd>
                    </div>

                    <div>
                      <dt className="flex items-center gap-2 text-sm font-medium text-heading/80">
                        <IconPhone className="h-4 w-4 text-muted" />
                        Phone
                      </dt>
                      <dd className="mt-1.5">
                        <a
                          href={site.phoneHref}
                          className="text-[15px] font-medium text-heading transition-colors hover:text-accent-text"
                        >
                          {site.phoneDisplay}
                        </a>
                      </dd>
                    </div>

                    <div>
                      <dt className="flex items-center gap-2 text-sm font-medium text-heading/80">
                        <IconMapPin className="h-4 w-4 text-muted" />
                        Location
                      </dt>
                      <dd className="mt-1.5 text-[15px] font-medium text-heading">
                        {site.location}
                      </dd>
                    </div>
                  </dl>

                  <h2 className="mt-7 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Elsewhere
                  </h2>
                  <div className="mt-3">
                    <SocialLabeledLinks />
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
