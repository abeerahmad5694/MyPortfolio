import { useState } from "react";
import { Link } from "react-router-dom";
import { PartnerBadge } from "../components/BrandGraphics";
import { Container } from "../components/Container";
import { CtaSection } from "../components/CtaSection";
import { InteractiveGlobe } from "../components/InteractiveGlobe";
import { ProjectGrid } from "../components/ProjectGrid";
import { Reveal } from "../components/Reveal";
import { IconArrowRight } from "../components/icons";
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

interface TierFeature {
  icon:
    | "nodes"
    | "code"
    | "db"
    | "chat"
    | "page"
    | "search"
    | "bolt"
    | "calendar"
    | "flask"
    | "chart"
    | "bars";
  text: string;
}

const supportTiers: {
  pill: string;
  title: string;
  subtitle: string;
  dark?: boolean;
  features: TierFeature[];
}[] = [
  {
    pill: "Core",
    title: "Django ERP, POS and backend maintenance",
    subtitle: "What's included:",
    features: [
      { icon: "nodes", text: "Custom Django ERP & POS development" },
      { icon: "code", text: "Bug fixes & backend troubleshooting" },
      { icon: "db", text: "MySQL database setup & schema updates" },
      { icon: "bolt", text: "Real-time stock syncing across counters" },
      { icon: "chart", text: "Accounting & daily sales reporting" },
      { icon: "chat", text: "Direct developer support & maintenance" },
    ],
  },
  {
    pill: "Velocity",
    title: "Flutter mobile apps and REST APIs",
    subtitle: "Everything in Core, plus:",
    features: [
      { icon: "page", text: "Android & iOS apps from one Flutter codebase" },
      { icon: "search", text: "REST APIs connecting web & mobile clients" },
      { icon: "bolt", text: "Stripe recurring subscription billing" },
      { icon: "nodes", text: "Live maps & real-time push notifications" },
      { icon: "calendar", text: "Google Play & Apple App Store release" },
      { icon: "code", text: "Laravel & CodeIgniter backend customization" },
    ],
  },
  {
    pill: "Premium",
    title: "End-to-end systems architecture and custom builds",
    subtitle: "Everything in Velocity, plus:",
    dark: true,
    features: [
      {
        icon: "flask",
        text: "Multi-branch retail, mart & showroom ERP systems",
      },
      {
        icon: "chart",
        text: "Custom accounting & financial workflow automation",
      },
      {
        icon: "bars",
        text: "ESP32 IoT & face-recognition camera integration",
      },
      {
        icon: "calendar",
        text: "Weekly architecture & sprint planning calls",
      },
      {
        icon: "bolt",
        text: "Priority handling for production-critical updates",
      },
      {
        icon: "db",
        text: "Complete source ownership & server deployment",
      },
    ],
  },
];

const approachSteps: {
  pill: string;
  title: string;
  body: string;
  dark?: boolean;
}[] = [
  {
    pill: "Step 01",
    title: "Start with the real workflow",
    body: "Every build starts with how your operation actually runs — how stock arrives, how a sale or booking happens, and what the owner needs to see at the end of the day.",
  },
  {
    pill: "Step 02",
    title: "Data model & backend first",
    body: "Clean MySQL schemas, Django MTV backends, and REST APIs are designed first so web interfaces, POS terminals, and mobile apps all read from the same source of truth.",
  },
  {
    pill: "Step 03",
    title: "Deployment & ongoing support",
    body: "I handle full deployment — from server setup to Google Play and App Store release — and stay on after launch to troubleshoot, maintain, and evolve the system.",
    dark: true,
  },
];

function FeatureLineIcon({
  type,
  dark,
}: {
  type: TierFeature["icon"];
  dark?: boolean;
}) {
  const color = dark ? "#e4e4e7" : "#18181b";
  switch (type) {
    case "code":
      return (
        <span
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center font-mono text-[13px] font-semibold"
          style={{ color }}
        >
          {"{ }"}
        </span>
      );
    case "db":
      return (
        <svg
          viewBox="0 0 18 18"
          fill="none"
          className="h-4.5 w-4.5 shrink-0"
          style={{ color }}
        >
          <ellipse
            cx="9"
            cy="4.5"
            rx="6"
            ry="2.2"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M3 4.5V9c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2V4.5M3 9v4.5c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2V9"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      );
    case "chat":
      return (
        <svg
          viewBox="0 0 18 18"
          fill="none"
          className="h-4.5 w-4.5 shrink-0"
          style={{ color }}
        >
          <path
            d="M9 15.5c3.6 0 6.5-2.5 6.5-5.7S12.6 4 9 4 2.5 6.6 2.5 9.8c0 1.4.6 2.7 1.6 3.7L3 15.5l2.8-.6c1 .4 2.1.6 3.2.6Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "page":
      return (
        <svg
          viewBox="0 0 18 18"
          fill="none"
          className="h-4.5 w-4.5 shrink-0"
          style={{ color }}
        >
          <rect
            x="3.5"
            y="2.5"
            width="11"
            height="13"
            rx="1.8"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M6.5 6.5h5M6.5 9.5h5M6.5 12.5h3"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "search":
      return (
        <svg
          viewBox="0 0 18 18"
          fill="none"
          className="h-4.5 w-4.5 shrink-0"
          style={{ color }}
        >
          <circle
            cx="8"
            cy="8"
            r="4.8"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M11.6 11.6L15 15"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "bolt":
      return (
        <svg
          viewBox="0 0 18 18"
          fill="none"
          className="h-4.5 w-4.5 shrink-0"
          style={{ color }}
        >
          <path
            d="M10 2.5L4 10h4.5l-.5 5.5L14 8H9.5l.5-5.5Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "calendar":
      return (
        <svg
          viewBox="0 0 18 18"
          fill="none"
          className="h-4.5 w-4.5 shrink-0"
          style={{ color }}
        >
          <rect
            x="2.8"
            y="4"
            width="12.4"
            height="11.2"
            rx="1.8"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M6 2.5v3M12 2.5v3M2.8 7.5h12.4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "flask":
      return (
        <svg
          viewBox="0 0 18 18"
          fill="none"
          className="h-4.5 w-4.5 shrink-0"
          style={{ color }}
        >
          <path
            d="M7 3h4M7.8 3v4.2L4 13.8a1.2 1.2 0 0 0 1 1.7h8a1.2 1.2 0 0 0 1-1.7l-3.8-6.6V3"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "chart":
      return (
        <svg
          viewBox="0 0 18 18"
          fill="none"
          className="h-4.5 w-4.5 shrink-0"
          style={{ color }}
        >
          <path
            d="M3 3.5v11h12M6 11.5l3-3 2.2 2 3.3-4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "bars":
      return (
        <svg
          viewBox="0 0 18 18"
          fill="none"
          className="h-4.5 w-4.5 shrink-0"
          style={{ color }}
        >
          <rect
            x="3"
            y="9.5"
            width="2.8"
            height="5.5"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <rect
            x="7.6"
            y="6.5"
            width="2.8"
            height="8.5"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <rect
            x="12.2"
            y="3.5"
            width="2.8"
            height="11.5"
            stroke="currentColor"
            strokeWidth="1.3"
          />
        </svg>
      );
    default:
      return (
        <svg
          viewBox="0 0 18 18"
          fill="none"
          className="h-4.5 w-4.5 shrink-0"
          style={{ color }}
        >
          <circle cx="9" cy="4" r="1.7" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="9" cy="14" r="1.7" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="4" cy="9" r="1.7" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="14" cy="9" r="1.7" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
  }
}

/**
 * Subtle dark-blue pixel-dither matrix inside the dark "Premium" card (matching image-3.png).
 */
function DarkCardPixelBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-45"
      style={{
        backgroundImage:
          "radial-gradient(circle at 82% 28%, rgba(0, 26, 255, 0.55) 0%, rgba(0, 26, 255, 0.18) 38%, transparent 70%), radial-gradient(circle at 22% 78%, rgba(0, 26, 255, 0.38) 0%, transparent 58%)",
      }}
    >
      <div
        className="h-full w-full"
        style={{
          backgroundImage:
            "radial-gradient(#001aff 2px, transparent 2px)",
          backgroundSize: "10px 10px",
          opacity: 0.35,
        }}
      />
    </div>
  );
}

function ProjectMarkIcon({ glyph }: { glyph: string }) {
  if (glyph === "brackets") {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 shrink-0">
        <rect x="2" y="2" width="10" height="3.5" />
        <rect x="9.5" y="5.5" width="3.5" height="9" />
        <rect x="2" y="14.5" width="10" height="3.5" />
      </svg>
    );
  }
  if (glyph === "corner") {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 shrink-0">
        <rect x="2" y="2" width="11" height="3.5" />
        <rect x="2" y="5.5" width="3.5" height="9" />
        <rect x="2" y="14.5" width="11" height="3.5" />
        <rect x="13" y="11" width="4" height="4" />
      </svg>
    );
  }
  if (glyph === "bars") {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 shrink-0">
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
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 shrink-0">
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
          HERO — Full-Width Widescreen Layout Matching image-2.png
          ===================================================================== */}
      <section
        className="relative overflow-hidden pt-24 pb-20 sm:min-h-[660px] sm:pt-36 sm:pb-28 lg:min-h-[730px] lg:pt-40 lg:pb-32"
        style={{ backgroundColor: "#f3f4f6", color: "#090d16" }}
      >
        {/* Full-Bleed Right-Side Bayer Pixel-Dithered Electric Blue Ringed Planet */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-35 sm:opacity-80 lg:w-[64%] lg:opacity-100"
        >
          <InteractiveGlobe className="h-full w-full" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-[780px]">
            {/* White Credential Pill Badge: [W] Full-Stack Partner [ERP & POS] */}
            <PartnerBadge label="Full-Stack Partner" tag="ERP & POS" />

            {/* Massive Tight-Tracked Editorial Headline with #001AFF Accent + Black Period */}
            <h1
              className="mt-6 text-[clamp(2.25rem,8vw,5.35rem)] font-bold leading-[1.04] tracking-[-0.042em] sm:mt-8 sm:text-[clamp(2.85rem,5.6vw,5.35rem)] sm:leading-[1.02]"
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
              className="mt-5 max-w-[560px] text-[15.5px] leading-[1.58] font-normal sm:mt-7 sm:text-[18.5px] sm:leading-[1.56]"
              style={{ color: "#18181b" }}
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
        className="relative z-20 border-b border-zinc-200 pb-16 sm:pb-24"
        style={{ backgroundColor: "#ffffff" }}
      >
        <Container>
          <div className="grid items-start gap-9 lg:grid-cols-12 lg:gap-14">
            {/* LEFT: Solid Black (#050505) Track Record Card pulled up into the Hero */}
            <div className="-mt-10 sm:-mt-16 lg:col-span-4 lg:-mt-20">
              <div
                className="rounded-2xl p-6 sm:p-9"
                style={{ backgroundColor: "#050505", color: "#ffffff" }}
              >
                <p
                  className="text-[11px] font-normal uppercase tracking-[0.08em] sm:text-[12px]"
                  style={{ color: "#a1a1aa" }}
                >
                  Track record
                </p>

                <div className="mt-3 divide-y divide-white/12 sm:mt-4">
                  {trackRecordRows.map((row) => (
                    <div
                      key={row.value}
                      className="flex items-center justify-between gap-3 py-4.5 first:pt-3 last:pb-1 sm:gap-4 sm:py-6 sm:first:pt-4"
                    >
                      <span
                        className="shrink-0 text-[22px] font-bold tracking-[-0.035em] sm:text-[32px]"
                        style={{ color: "#ffffff" }}
                      >
                        {row.value}
                      </span>
                      <span
                        className="max-w-[185px] text-right text-[11.5px] leading-[1.45] sm:max-w-[215px] sm:text-[12.5px]"
                        style={{ color: "#a1a1aa" }}
                      >
                        {row.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Selected Clients and Software Projects (image-2.png wide layout) */}
            <div className="pt-1 lg:col-span-8 lg:pt-10 lg:pl-4">
              <p
                className="text-[13px] font-normal sm:text-[13.5px]"
                style={{ color: "#27272a" }}
              >
                Selected clients and software projects
              </p>

              {/* Bold Monochrome Geometric Project Wordmarks */}
              <div className="mt-5 grid grid-cols-2 gap-4 sm:mt-7 sm:grid-cols-4 sm:gap-8 lg:gap-10">
                {featuredProjectLogos.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/projects/${item.slug}`}
                    className="group inline-flex items-center gap-2.5 py-1.5 transition-opacity hover:opacity-70 sm:gap-3 sm:py-2"
                    style={{ color: "#18181b" }}
                  >
                    <ProjectMarkIcon glyph={item.glyph} />
                    <span className="text-[18px] font-bold tracking-[-0.035em] sm:text-[25px]">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>

              {/* 16-item capability directory below the project marks */}
              <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-zinc-200 pt-6 sm:mt-10 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-3 sm:pt-7">
                {systemCapabilities.map((item) => (
                  <div
                    key={item}
                    className="text-[12px] font-normal text-zinc-600 sm:text-[13px]"
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
          SERVICES & TIER CARDS — Exact Layout from image-3.png
          (Centered Editorial Header + 2 White Cards & 1 Dark Pixel-Dithered Card)
          ===================================================================== */}
      <section
        className="border-b border-zinc-200 py-20 sm:py-28"
        style={{ backgroundColor: "#f3f4f6" }}
      >
        <Container>
          {/* Centered Section Header matching image-3.png */}
          <Reveal>
            <div className="mx-auto max-w-[780px] text-center">
              <p
                className="text-[13px] font-medium"
                style={{ color: "#001aff" }}
              >
                Services &amp; Retainers
              </p>
              <h2
                className="mt-3 text-[clamp(2.25rem,4.4vw,3.85rem)] font-bold leading-[1.05] tracking-[-0.04em]"
                style={{ color: "#090d16" }}
              >
                Full-stack support for
                <br />
                your business operations
              </h2>
              <p className="mx-auto mt-5 max-w-[680px] text-[15px] leading-[1.6] text-zinc-600 sm:text-[16px]">
                Choose ongoing engineering support around the systems your
                business runs on. I also take on individual projects, including
                custom Django ERP &amp; POS builds, Flutter mobile apps, and
                Stripe integrations.
              </p>
              <p className="mx-auto mt-3 max-w-[680px] text-[15px] leading-[1.6] text-zinc-600 sm:text-[16px]">
                Explore custom retail ERP software, real-time point-of-sale
                syncing, Android &amp; iOS app store releases, and REST API
                development in {site.location}.
              </p>
            </div>
          </Reveal>

          {/* 3-Column Tiered Cards Grid matching image-3.png */}
          <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-7">
            {supportTiers.map((tier) => (
              <Reveal
                key={tier.pill}
                className="relative flex flex-col justify-between overflow-hidden rounded-2xl p-8 sm:p-10 lg:p-11"
                style={
                  tier.dark
                    ? {
                        backgroundColor: "#040614",
                        color: "#ffffff",
                        boxShadow: "0 20px 44px -20px rgba(4, 6, 20, 0.45)",
                      }
                    : {
                        backgroundColor: "#ffffff",
                        color: "#090d16",
                        boxShadow: "0 1px 3px rgba(9, 13, 22, 0.04)",
                      }
                }
              >
                {tier.dark ? <DarkCardPixelBackdrop /> : null}

                <div className="relative z-10">
                  {/* Top Oval Pill (Core / Velocity / Premium) */}
                  <span
                    className="inline-flex items-center rounded-full px-4 py-1 text-[13px] font-medium"
                    style={
                      tier.dark
                        ? {
                            backgroundColor: "#001aff",
                            color: "#ffffff",
                          }
                        : {
                            border: "1px solid #a1a1aa",
                            color: "#090d16",
                          }
                    }
                  >
                    {tier.pill}
                  </span>

                  {/* Large Bold 2–3 Line Card Title */}
                  <h3
                    className="mt-7 text-[26px] font-bold leading-[1.12] tracking-[-0.035em] sm:text-[31px]"
                    style={{ color: tier.dark ? "#ffffff" : "#090d16" }}
                  >
                    {tier.title}
                  </h3>

                  {/* Bold Checklist Heading */}
                  <p
                    className="mt-10 text-[13.5px] font-bold"
                    style={{ color: tier.dark ? "#ffffff" : "#090d16" }}
                  >
                    {tier.subtitle}
                  </p>

                  {/* Icon-Led Feature List matching image-3.png */}
                  <ul className="mt-5 space-y-4">
                    {tier.features.map((feat) => (
                      <li
                        key={feat.text}
                        className="flex items-start gap-3.5 text-[14.5px] leading-snug"
                        style={{ color: tier.dark ? "#f4f4f5" : "#18181b" }}
                      >
                        <FeatureLineIcon type={feat.icon} dark={tier.dark} />
                        <span>{feat.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="relative z-10 mt-10 border-t pt-6"
                  style={{
                    borderColor: tier.dark
                      ? "rgba(255,255,255,0.12)"
                      : "#e4e4e7",
                  }}
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-[14px] font-semibold transition-opacity hover:opacity-75"
                    style={{ color: tier.dark ? "#ffffff" : "#001aff" }}
                  >
                    <span>Discuss your requirements</span>
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          {/* All 6 Individual Services Cards Below in the Same Rounded-2xl Card Style */}
          <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {services.map((service) => (
              <Reveal
                key={service.number}
                className="flex flex-col justify-between rounded-2xl bg-white p-8 sm:p-9"
                style={{
                  backgroundColor: "#ffffff",
                  boxShadow: "0 1px 3px rgba(9, 13, 22, 0.04)",
                }}
              >
                <div>
                  <span
                    className="inline-flex items-center rounded-full px-3.5 py-1 text-[12px] font-medium"
                    style={{
                      border: "1px solid #d4d4d8",
                      color: "#090d16",
                    }}
                  >
                    {service.number} · Capability
                  </span>
                  <h3 className="mt-5 text-[22px] font-bold leading-[1.15] tracking-[-0.03em] text-[#090d16]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-zinc-600">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-2.5 border-t border-zinc-200 pt-5">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-[13.5px] text-zinc-800"
                      >
                        <FeatureLineIcon type="bolt" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* =====================================================================
          CLIENT RESULT SWITCHER — Legency's interactive `← → 1/5` Client Result section
          ===================================================================== */}
      {activeResult ? (
        <section className="border-b border-zinc-200 bg-white py-20 sm:py-28">
          <Container>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-6">
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-medium text-[#001aff]">
                  Client result
                </span>
                <span className="font-mono text-xs text-zinc-500">
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
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-300 bg-white font-mono text-sm font-bold text-[#090d16] transition-colors hover:bg-zinc-100"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setResultIndex((prev) => (prev + 1) % projects.length)
                  }
                  aria-label="Next project result"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-300 bg-white font-mono text-sm font-bold text-[#090d16] transition-colors hover:bg-zinc-100"
                >
                  →
                </button>
              </div>
            </div>

            <div className="mt-10 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center rounded-full border border-zinc-300 px-3.5 py-1 text-xs font-medium text-[#090d16]">
                  {activeResult.name} · {activeResult.category}
                </span>

                <blockquote className="mt-5 text-2xl font-bold leading-[1.15] tracking-[-0.03em] text-[#090d16] sm:text-3xl lg:text-[34px]">
                  &ldquo;{activeResult.summary}&rdquo;
                </blockquote>

                <p className="mt-5 text-[15.5px] leading-relaxed text-zinc-600 sm:text-[17px]">
                  {activeResult.built[0]}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    to={`/projects/${activeResult.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#001aff" }}
                  >
                    Read case study
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                  <span className="font-mono text-xs text-zinc-500">
                    Role: {activeResult.role} · {activeResult.status}
                  </span>
                </div>
              </div>

              <div className="grid gap-4 lg:col-span-5">
                {activeResult.highlights.map((highlight, idx) => (
                  <div
                    key={highlight}
                    className="rounded-2xl border border-zinc-200 bg-[#f3f4f6] p-6"
                  >
                    <p className="font-mono text-xs font-semibold text-[#001aff]">
                      0{idx + 1} · DELIVERABLE
                    </p>
                    <p className="mt-2 text-base font-bold tracking-[-0.02em] text-[#090d16]">
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
          SELECTED WORK + MARQUEE TICKER
          ===================================================================== */}
      <section
        className="border-b border-zinc-200 py-20 sm:py-28"
        style={{ backgroundColor: "#f3f4f6" }}
      >
        <Container>
          <div className="mx-auto max-w-[780px] text-center">
            <p
              className="text-[13px] font-medium"
              style={{ color: "#001aff" }}
            >
              Case Studies
            </p>
            <h2 className="mt-3 text-[clamp(2.2rem,4.2vw,3.6rem)] font-bold leading-[1.06] tracking-[-0.04em] text-[#090d16]">
              Selected client systems
              <br />
              and production builds
            </h2>
            <p className="mx-auto mt-4 max-w-[620px] text-[15.5px] leading-[1.6] text-zinc-600">
              Every project below was built for real daily operations — from
              retail ERP and POS platforms to published Android and iOS apps.
            </p>
          </div>

          <div className="mt-14">
            <ProjectGrid projects={featuredProjects} />
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#090d16] shadow-xs transition-colors hover:text-[#001aff]"
            >
              View all {projects.length} case studies
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>

        {/* Continuous Marquee Strip below Selected Work */}
        <div
          className="mt-16 overflow-hidden border-y border-zinc-200 bg-white py-4"
          aria-label="Core technical capabilities"
        >
          <div className="marquee-track flex items-center gap-8">
            {[...allSkills, ...allSkills].map((skill, idx) => (
              <div
                key={`${skill}-${idx}`}
                className="flex shrink-0 items-center gap-8 font-mono text-xs font-medium uppercase tracking-[0.1em] text-zinc-500"
              >
                <span>{skill}</span>
                <span
                  className="h-1.5 w-1.5"
                  style={{ backgroundColor: "#001aff" }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          APPROACH — 3-Card Layout Matching image-3.png (2 White + 1 Dark Pixel Card)
          ===================================================================== */}
      <section className="border-b border-zinc-200 bg-white py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-[760px] text-center">
            <p
              className="text-[13px] font-medium"
              style={{ color: "#001aff" }}
            >
              How I Work
            </p>
            <h2 className="mt-3 text-[clamp(2.2rem,4.2vw,3.6rem)] font-bold leading-[1.06] tracking-[-0.04em] text-[#090d16]">
              Built for long-term operational
              <br />
              reliability, not demos
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-7">
            {approachSteps.map((step) => (
              <Reveal
                key={step.pill}
                className="relative flex flex-col justify-between overflow-hidden rounded-2xl p-8 sm:p-10"
                style={
                  step.dark
                    ? {
                        backgroundColor: "#040614",
                        color: "#ffffff",
                      }
                    : {
                        backgroundColor: "#f3f4f6",
                        color: "#090d16",
                      }
                }
              >
                {step.dark ? <DarkCardPixelBackdrop /> : null}
                <div className="relative z-10">
                  <span
                    className="inline-flex items-center rounded-full px-4 py-1 text-[12.5px] font-medium"
                    style={
                      step.dark
                        ? { backgroundColor: "#001aff", color: "#ffffff" }
                        : { border: "1px solid #a1a1aa", color: "#090d16" }
                    }
                  >
                    {step.pill}
                  </span>
                  <h3
                    className="mt-7 text-[26px] font-bold leading-[1.14] tracking-[-0.03em]"
                    style={{ color: step.dark ? "#ffffff" : "#090d16" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-4 text-[15px] leading-relaxed"
                    style={{ color: step.dark ? "#d4d4d8" : "#3f3f46" }}
                  >
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Floating Bottom-Right Partner Badge matching image-3.png */}
      <div className="fixed right-6 bottom-5 z-40 hidden xl:block">
        <PartnerBadge label="Full-Stack Partner" tag="Enterprise" />
      </div>

      <CtaSection />
    </>
  );
}
