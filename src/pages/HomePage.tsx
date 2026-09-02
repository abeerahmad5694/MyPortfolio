import { Container } from "../components/Container";
import { ButtonLink } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { ProjectGrid } from "../components/ProjectGrid";
import { TextLink } from "../components/TextLink";
import { SocialLinks } from "../components/SocialLinks";
import { CtaSection } from "../components/CtaSection";
import { usePageMeta } from "../hooks/usePageMeta";
import { projects } from "../data/projects";
import { IconMapPin } from "../components/icons";
import {
  IconBrowser,
  IconCube,
  IconMobile,
  IconNodes,
} from "../components/icons";

const capabilities = [
  {
    icon: IconBrowser,
    title: "Web Applications",
    text: "Django-powered business apps — from internal tools to customer-facing platforms.",
  },
  {
    icon: IconMobile,
    title: "Mobile Applications",
    text: "Flutter apps for Android and iOS, shipped to both app stores.",
  },
  {
    icon: IconCube,
    title: "ERP & POS Systems",
    text: "Inventory, sales, reporting, and accounting for day-to-day operations.",
  },
  {
    icon: IconNodes,
    title: "APIs & Integrations",
    text: "REST APIs, payment gateways, maps, and notifications that connect it all.",
  },
];

const approach = [
  {
    number: "01",
    title: "Understand the workflow",
    text: "I start with how the business actually runs, then shape the software around it — not the other way round.",
  },
  {
    number: "02",
    title: "Build end-to-end",
    text: "Database, backend, API, frontend, mobile app — designed to work together as one system.",
  },
  {
    number: "03",
    title: "Deploy properly",
    text: "App store releases, payment gateways, server setup — the parts that make software actually usable.",
  },
  {
    number: "04",
    title: "Stay for support",
    text: "Live systems need attention. I stick around to fix, improve, and keep things running.",
  },
];

const techStack = [
  "Python",
  "Django",
  "Flutter",
  "MySQL",
  "REST APIs",
  "Stripe",
  "Firebase",
  "ESP32",
];

export function HomePage() {
  usePageMeta(
    "Abeer Ahmad | Full-Stack Developer",
    "Full-stack developer specializing in Django, Flutter, ERP and POS systems, REST APIs, and business applications. Based in Rawalpindi, Pakistan.",
  );

  const featured = projects.filter((project) => project.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Subtle background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_0%,var(--glow),transparent_70%)]"
        />
        <Container className="pb-14 pt-12 sm:pt-16 lg:pb-20 lg:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-14">
            <Reveal>
              <p className="eyebrow">Full-Stack Developer</p>
              <h1 className="mt-3.5 text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.02em] text-heading sm:text-4xl lg:text-[2.75rem]">
                Building reliable software for real business needs.
              </h1>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-body sm:text-base">
                I&rsquo;m Abeer Ahmad, a full-stack developer in Rawalpindi, Pakistan.
                I build web applications, Flutter mobile apps, ERP and POS systems,
                and REST APIs — with Django on the backend — and I support them after
                they go live.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#featured-projects"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-hover sm:px-6 sm:py-3 sm:text-[15px]"
                >
                  View My Work
                </a>
                <ButtonLink to="/contact" variant="secondary" size="lg">
                  Let&rsquo;s Talk
                </ButtonLink>
              </div>
              <SocialLinks className="mt-7" />
            </Reveal>

            <Reveal delay={120}>
              <div className="relative">
                <div className="img-frame">
                  <img
                    src="/images/hero-setup.jpg"
                    alt="A developer workspace at night with an ultrawide monitor showing code in a dark editor"
                    decoding="async"
                    className="aspect-[16/10]"
                  />
                </div>
                {/* Location chip */}
                <div className="absolute -bottom-4 left-5 flex items-center gap-2 rounded-lg border border-line bg-surface/95 px-3.5 py-2.5 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.45)] backdrop-blur">
                  <IconMapPin className="h-4 w-4 text-accent" />
                  <span className="text-[13px] font-medium text-heading">
                    Rawalpindi, Pakistan
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-1 h-2 w-2 rounded-full bg-green-500"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Facts + stack strip */}
          <Reveal delay={150}>
            <div className="mt-20 grid gap-x-8 gap-y-6 border-t border-line pt-7 sm:grid-cols-3">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  Recently
                </p>
                <p className="mt-2 text-sm font-medium leading-snug text-heading">
                  Software Engineer, Digital Ocean Technologies
                </p>
                <p className="mt-0.5 text-[13px] text-muted">Jun 2025 – Aug 2026 · ERP &amp; POS systems</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  Now
                </p>
                <p className="mt-2 text-sm font-medium leading-snug text-heading">
                  BE Cyber Security, PMAS Arid Agriculture University
                </p>
                <p className="mt-0.5 text-[13px] text-muted">Started September 2026</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  Works with
                </p>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {techStack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-line bg-chip px-2 py-1 font-mono text-[11px] leading-none text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* What I build */}
      <section className="border-y border-line bg-subtle">
        <Container className="py-14 sm:py-16">
          <SectionHeading
            eyebrow="What I do"
            title="Software for the way businesses actually work"
            description="Most of my work is systems that shops, showrooms, and service businesses rely on every day."
          />
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((capability, index) => (
              <Reveal key={capability.title} delay={index * 70} className="h-full">
                <div className="card h-full p-5 transition-colors duration-200 hover:border-line-strong">
                  <capability.icon className="h-5 w-5 text-accent" />
                  <h3 className="mt-3.5 text-[15px] font-semibold text-heading">
                    {capability.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-body">
                    {capability.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured projects */}
      <section id="featured-projects" className="scroll-mt-20">
        <Container className="py-14 sm:py-16">
          <SectionHeading
            eyebrow="Selected work"
            title="Featured projects"
            description="Real systems and apps built for real clients — each with a short case study."
            action={<TextLink to="/projects">All projects</TextLink>}
          />
          <div className="mt-9">
            <ProjectGrid projects={featured} />
          </div>
        </Container>
      </section>

      {/* Approach */}
      <section className="border-t border-line bg-subtle">
        <Container className="py-14 sm:py-16">
          <SectionHeading
            eyebrow="Approach"
            title="From first build to daily operations"
          />
          <ol className="mt-9 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((step, index) => (
              <Reveal key={step.number} delay={index * 70}>
                <li>
                  <p className="font-mono text-[13px] font-medium text-accent-text">{step.number}</p>
                  <h3 className="mt-2.5 text-[15px] font-semibold text-heading">{step.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-body">{step.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
