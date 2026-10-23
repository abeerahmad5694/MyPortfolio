import { useState } from "react";
import { Link } from "react-router-dom";
import { PartnerBadge } from "../components/BrandGraphics";
import { Container } from "../components/Container";
import { CtaSection } from "../components/CtaSection";
import { InteractiveGlobe } from "../components/InteractiveGlobe";
import { ProjectGrid } from "../components/ProjectGrid";
import { Reveal } from "../components/Reveal";
import {
  IconArrowRight,
  IconCheck,
} from "../components/icons";
import { projects } from "../data/projects";
import { services } from "../data/services";
import { site } from "../data/site";
import { skillGroups } from "../data/skills";
import { usePageMeta } from "../hooks/usePageMeta";

const trackRecordRows = [
  {
    value: "5+ systems",
    description:
      "Custom ERP, POS, and mobile platforms running in daily production.",
  },
  {
    value: "3+ sectors",
    description:
      "Trusted builds for retail marts, electronics stores, and auto showrooms.",
  },
  {
    value: "2 stores",
    description:
      "End-to-end Flutter apps published on Google Play and the App Store.",
  },
] as const;

const featuredProjectLogos = [
  {
    name: "RetailERP",
    slug: "retail-erp-systems",
    glyph: "brackets",
  },
  {
    name: "POSSync",
    slug: "pos-systems",
    glyph: "corner",
  },
  {
    name: "ServiceApp",
    slug: "on-demand-services-app",
    glyph: "bars",
  },
  {
    name: "DeliveryOS",
    slug: "food-delivery-app",
    glyph: "grid",
  },
] as const;

const systemCapabilities = [
  "Retail ERP Systems",
  "Point-of-Sale (POS)",
  "On-Demand Mobile Apps",
  "Food Delivery Platforms",
  "Face Recognition IoT",
  "Django MTV Backends",
  "Flutter iOS & Android",
  "MySQL Schema Design",
  "REST API Architecture",
  "Stripe Subscriptions",
  "Real-Time Stock Sync",
  "Accounting Workflows",
  "Live Maps Tracking",
  "Push Notifications",
  "Play & App Store Release",
  "Production Support",
] as const;

const serviceFit: Record<string, { badge: string; forWho: string }> = {
  "01": {
    badge: "Web Platforms",
    forWho:
      "Businesses that need custom dashboards, internal tools, or customer-facing web apps built around their real workflows.",
  },
  "02": {
    badge: "Retail & Operations",
    forWho:
      "Marts, electronics stores, and automobile showrooms that need inventory, sales, and accounting in one system.",
  },
  "03": {
    badge: "iOS & Android",
    forWho:
      "Founders and companies launching a cross-platform mobile product from development through Play Store and App Store release.",
  },
  "04": {
    badge: "Systems & Integrations",
    forWho:
      "Teams connecting web apps, mobile apps, payment gateways, maps, notifications, or existing PHP/Django backends.",
  },
  "05": {
    badge: "Billing & Subscriptions",
    forWho:
      "Platforms that need reliable Stripe payment flows and recurring subscription billing tested in production.",
  },
  "06": {
    badge: "Long-Term Reliability",
    forWho:
      "Businesses running live software that need ongoing bug fixing, troubleshooting, new features, and release management.",
  },
};

const approachSteps = [
  {
    number: "01",
    title: "Start with the real workflow",
    body: "Every build starts with how your operation actually runs — how stock arrives, how a sale or booking happens, and what the owner needs to see at the end of the day.",
  },
  {
    number: "02",
    title: "Data model & backend first",
    body: "Clean MySQL schemas, Django MTV backends, and REST APIs are designed first so web interfaces, POS terminals, and mobile apps all read from the same source of truth.",
  },
  {
    number: "03",
    title: "Interfaces built for daily use",
    body: "Whether it is a retail counter POS, an owner's reporting dashboard, or a Flutter customer app with Stripe and live maps, the interface stays fast and straightforward.",
  },
  {
    number: "04",
    title: "Deployment & ongoing support",
    body: "I handle full deployment — from server setup to Google Play and App Store release — and stay on after launch to troubleshoot, maintain, and evolve the system.",
  },
] as const;

function ProjectMarkIcon({ glyph }: { glyph: string }) {
  if (glyph === "brackets") {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0">
        <rect x="2" y="2" width="10" height="3.5" />
        <rect x="9.5" y="5.5" width="3.5" height="9" />
        <rect x="2" y="14.5" width="10" height="3.5" />
      </svg>
    );
  }
  if (glyph === "corner") {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0">
        <rect x="2" y="2" width="11" height="3.5" />
        <rect x="2" y="5.5" width="3.5" height="9" />
        <rect x="2" y="14.5" width="11" height="3.5" />
        <rect x="13" y="11" width="4" height="4" />
      </svg>
    );
  }
  if (glyph === "bars") {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0">
        <rect x="2" y="2.5" width="8" height="3.2" />
        <rect x="12" y="2.5" width="4" height="3.2" />
        <rect x="2" y="8.4" width="8" height="3.2" />
        <rect x="12" y="8.4" width="6" height="3.2" />
        <rect x="2" y="14.3" width="8" height="3.2" />
        <rect x="12" y="14.3" width="4" height="3.2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0">
      <rect x="2" y="2" width="6" height="6" />
      <rect x="11" y="2" width="6" height="6" />
      <rect x="2" y="11" width="6" height="6" />
      <rect x="11" y="11" width="6" height="6" />
    </svg>
  );
}

export function HomePage() {
  usePageMeta(
    `${site.name} | ${site.role} — ${site.specialty} (${site.focus})`,
    "Full-Stack Developer in Rawalpindi, Pakistan specialising in Django & Flutter — building Retail ERP & POS systems, mobile apps, REST APIs, and Stripe integrations.",
  );

  const featuredProjects = projects.filter((p) => p.featured);
  const [resultIndex, setResultIndex] = useState(0);
  const activeResult = projects[resultIndex] ?? projects[0];
  const allSkills = skillGroups.flatMap((g) => g.items);

  return (
    <>
      {/* =====================================================================
          HERO — Exact Legency Media Light Grey (#F3F4F6) Canvas +
          Bayer-Dithered Electric Blue (#001AFF) Ringed Planet on the Right
          ===================================================================== */}
      <section
        className="relative overflow-hidden pt-8 pb-20 sm:pt-12 sm:pb-24"
        style={{ backgroundColor: "#f3f4f6", color: "#090d16" }}
      >
        {/* Right-Side Bayer Pixel-Dithered Electric Blue Ringed Planet */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-12 h-[480px] w-[520px] opacity-95 sm:-top-28 sm:right-0 sm:h-[580px] sm:w-[660px] lg:-top-32 lg:right-[2%] lg:h-[650px] lg:w-[760px]"
        >
          <InteractiveGlobe className="h-full w-full" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-[650px]">
            {/* White Credential Pill Badge: [W] Full-Stack Partner [ERP & POS] */}
            <PartnerBadge
              label="Full-Stack Partner"
              tag={`${site.specialty} · ${site.focus}`}
            />

            {/* Massive Tight-Tracked Editorial Headline with #001AFF Accent + Black Period */}
            <h1
              className="mt-7 text-[clamp(2.6rem,5.4vw,4.65rem)] font-bold leading-[1.03] tracking-[-0.04em]"
              style={{ color: "#090d16" }}
            >
              The Full-Stack
              <br />
              partner for{" "}
              <span style={{ color: "#001aff" }}>
                retail &amp;
                <br />
                business systems
              </span>
              <span style={{ color: "#090d16" }}>.</span>
            </h1>

            {/* Clean 3-Line Editorial Subheadline */}
            <p
              className="mt-6 max-w-[520px] text-[16px] leading-[1.58] font-normal sm:text-[17.5px]"
              style={{ color: "#27272a" }}
            >
              I build and maintain custom Django ERP &amp; POS systems alongside
              Flutter mobile apps and Stripe payment integrations. Your business
              gets software built around your real daily workflow and ongoing
              direct support.
            </p>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          FOLD BOUNDARY — Black `TRACK RECORD` Card Overlapping the #F3F4F6 Hero
          on the Left + `Selected clients and software projects` on the Right
          ===================================================================== */}
      <section
        className="relative z-20 border-b border-zinc-200 pb-16 sm:pb-20"
        style={{ backgroundColor: "#ffffff" }}
      >
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* LEFT: Solid Black (#050505) Track Record Card pulled up into the Hero */}
            <div className="-mt-12 lg:col-span-5 lg:-mt-14">
              <div
                className="rounded-2xl p-7 sm:p-8"
                style={{ backgroundColor: "#050505", color: "#ffffff" }}
              >
                <p
                  className="text-[11px] font-medium uppercase tracking-[0.1em]"
                  style={{ color: "#a1a1aa" }}
                >
                  Track record
                </p>

                <div className="mt-3 divide-y divide-white/12">
                  {trackRecordRows.map((row) => (
                    <div
                      key={row.value}
                      className="flex items-center justify-between gap-4 py-5 first:pt-4 last:pb-1"
                    >
                      <span
                        className="shrink-0 text-[26px] font-bold tracking-[-0.035em] sm:text-[30px]"
                        style={{ color: "#ffffff" }}
                      >
                        {row.value}
                      </span>
                      <span
                        className="max-w-[210px] text-right text-[12px] leading-[1.45]"
                        style={{ color: "#a1a1aa" }}
                      >
                        {row.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Selected Clients and Software Projects (Datasite / Grata / Blueflame style) */}
            <div className="pt-2 lg:col-span-7 lg:pt-8">
              <p
                className="text-[13px] font-normal"
                style={{ color: "#3f3f46" }}
              >
                Selected clients and software projects
              </p>

              {/* Bold Monochrome Geometric Project Marks */}
              <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {featuredProjectLogos.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/projects/${item.slug}`}
                    className="group inline-flex items-center gap-2.5 py-2 transition-opacity hover:opacity-70"
                    style={{ color: "#18181b" }}
                  >
                    <ProjectMarkIcon glyph={item.glyph} />
                    <span className="text-[20px] font-bold tracking-[-0.035em] sm:text-[22px]">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>

              {/* 16-item capability directory below the project marks */}
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2.5 border-t border-zinc-200 pt-6 sm:grid-cols-4">
                {systemCapabilities.map((item) => (
                  <div
                    key={item}
                    className="text-[12.5px] font-normal text-zinc-600"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          WHAT I DO — Legency's "What we do" section with "What's included" + "For:"
          ===================================================================== */}
      <section className="border-b border-line bg-subtle py-16 sm:py-24">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <span className="eyebrow">What I do</span>
              <h2 className="mt-3 text-2xl font-bold leading-[1.1] tracking-[-0.035em] text-heading sm:text-3xl lg:text-[2.5rem]">
                Six ways I work with businesses, depending on what you need
                built.
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 swiss-grid md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const meta = serviceFit[service.number] ?? {
                badge: "Engineering",
                forWho: "Businesses that need reliable custom software.",
              };
              return (
                <Reveal
                  key={service.number}
                  className="swiss-cell flex flex-col justify-between p-6 sm:p-7"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-block rounded bg-accent-soft px-2.5 py-1 font-mono text-[11px] font-semibold text-accent-text">
                        {meta.badge}
                      </span>
                      <span className="font-mono text-xs font-medium text-muted">
                        {service.number}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-bold tracking-[-0.025em] text-heading">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-body">
                      {service.description}
                    </p>

                    <div className="mt-6 border-t border-line pt-5">
                      <p className="text-xs font-medium text-muted">
                        What&apos;s included
                      </p>
                      <ul className="mt-3.5 space-y-2.5">
                        {service.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2.5 text-xs leading-relaxed text-body"
                          >
                            <IconCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-text" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-7 border-t border-line pt-4">
                    <p className="text-xs leading-relaxed text-muted">
                      <strong className="font-semibold text-heading">
                        For:{" "}
                      </strong>
                      {meta.forWho}
                    </p>

                    <Link
                      to="/contact"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-text transition-colors hover:text-accent-text-hover"
                    >
                      Discuss your requirements
                      <IconArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =====================================================================
          CLIENT RESULT SWITCHER — Legency's interactive `← → 1/5` Client Result section
          ===================================================================== */}
      {activeResult ? (
        <section className="border-b border-line bg-canvas py-16 sm:py-24">
          <Container>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
              <div className="flex items-center gap-3">
                <span className="eyebrow">Client result</span>
                <span className="font-mono text-xs text-muted">
                  {resultIndex + 1} / {projects.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setResultIndex(
                      (prev) => (prev - 1 + projects.length) % projects.length,
                    )
                  }
                  aria-label="Previous project result"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface font-mono text-sm font-bold text-heading transition-colors hover:border-line-strong hover:bg-subtle"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setResultIndex((prev) => (prev + 1) % projects.length)
                  }
                  aria-label="Next project result"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface font-mono text-sm font-bold text-heading transition-colors hover:border-line-strong hover:bg-subtle"
                >
                  →
                </button>
              </div>
            </div>

            <div className="mt-8 grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold text-accent-text">
                  {activeResult.name} · {activeResult.category}
                </p>

                <blockquote className="mt-4 text-xl font-bold leading-snug tracking-[-0.025em] text-heading sm:text-2xl lg:text-[26px]">
                  &ldquo;{activeResult.summary}&rdquo;
                </blockquote>

                <p className="mt-4 text-sm leading-relaxed text-body sm:text-base">
                  {activeResult.built[0]}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    to={`/projects/${activeResult.slug}`}
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#001aff" }}
                  >
                    Read case study
                    <IconArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <span className="font-mono text-xs text-muted">
                    Role: {activeResult.role} · {activeResult.status}
                  </span>
                </div>
              </div>

              <div className="swiss-grid lg:col-span-5">
                {activeResult.highlights.map((highlight, idx) => (
                  <div key={highlight} className="swiss-cell p-5">
                    <p className="font-mono text-xs font-bold text-accent-text">
                      0{idx + 1} · DELIVERABLE
                    </p>
                    <p className="mt-1.5 text-sm font-semibold text-heading">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* =====================================================================
          SELECTED WORK + MARQUEE TICKER — Legency's "Selected work" + scrolling strip
          ===================================================================== */}
      <section className="border-b border-line bg-subtle py-16 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="eyebrow">Selected work</span>
              <h2 className="mt-3 text-2xl font-bold tracking-[-0.035em] text-heading sm:text-3xl lg:text-[2.5rem]">
                Recent production builds &amp; case studies.
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text hover:text-accent-text-hover"
            >
              View all work ({projects.length})
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10">
            <ProjectGrid projects={featuredProjects} />
          </div>
        </Container>

        {/* Continuous Marquee Strip below Selected Work */}
        <div
          className="mt-14 overflow-hidden border-y border-line bg-canvas py-3.5"
          aria-label="Core technical capabilities"
        >
          <div className="marquee-track flex items-center gap-8">
            {[...allSkills, ...allSkills].map((skill, idx) => (
              <div
                key={`${skill}-${idx}`}
                className="flex shrink-0 items-center gap-8 font-mono text-xs font-medium uppercase tracking-[0.1em] text-muted"
              >
                <span>{skill}</span>
                <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          APPROACH — Legency's "Approach / How we work" numbered 01–04 cards
          ===================================================================== */}
      <section className="border-b border-line bg-canvas py-16 sm:py-24">
        <Container>
          <div className="grid items-end justify-between gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="eyebrow">Approach</span>
              <h2 className="mt-3 text-2xl font-bold tracking-[-0.035em] text-heading sm:text-3xl lg:text-[2.5rem]">
                Built for long-term operational reliability, not demos.
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-body lg:col-span-5">
              Every project is engineered around real-world workflows, clean
              database design, and complete deployment so your business stays
              fast and independent.
            </p>
          </div>

          <div className="mt-10 swiss-grid sm:grid-cols-2 lg:grid-cols-4">
            {approachSteps.map((step) => (
              <Reveal
                key={step.number}
                className="swiss-cell flex flex-col justify-between p-6 sm:p-7"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-accent-text">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-[-0.02em] text-heading">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-body">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
