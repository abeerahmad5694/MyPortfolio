import { Container } from "../components/Container";
import { ButtonAnchor } from "../components/Button";
import { DitherMatrix, PartnerBadge } from "../components/BrandGraphics";
import { Reveal } from "../components/Reveal";
import { EducationItem } from "../components/EducationItem";
import { CtaSection } from "../components/CtaSection";
import { usePageMeta } from "../hooks/usePageMeta";
import { education } from "../data/education";
import { IconDownload } from "../components/icons";
import { site } from "../data/site";

const principles = [
  {
    number: "01",
    title: "Practical over clever",
    text: "The best system is one the business can actually run on — understandable, dependable, and easy to change.",
  },
  {
    number: "02",
    title: "End-to-end ownership",
    text: "I take projects from data model to deployment, so nothing gets lost between “backend done” and “people are using it”.",
  },
  {
    number: "03",
    title: "Support after launch",
    text: "Software that runs a business needs looking after. I provide ongoing maintenance and troubleshooting for live systems.",
  },
  {
    number: "04",
    title: "Honest scoping",
    text: "If something is out of scope or unnecessary, I say so. Timelines should be real, and so should the work.",
  },
];

export function AboutPage() {
  usePageMeta(
    "About | Abeer Ahmad",
    "Abeer Ahmad is a full-stack developer in Rawalpindi, Pakistan, building ERP and POS systems, Flutter mobile apps, and REST APIs with Django.",
  );

  return (
    <>
      {/* Intro — Clean Legency-style typographic header + At a glance */}
      <section
        className="relative overflow-hidden border-b border-line pt-24 pb-14 sm:pt-36 sm:pb-20"
        style={{ backgroundColor: "#f3f4f6" }}
      >
        <DitherMatrix className="pointer-events-none absolute bottom-0 right-0 h-24 w-[320px] sm:h-32 sm:w-[460px]" />

        <Container className="relative">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,7.5fr)_minmax(0,4.5fr)] lg:gap-14">
            <Reveal>
              <PartnerBadge label="About Abeer Ahmad" tag="Rawalpindi, PK" />
              <h1 className="mt-5 text-[2rem] font-bold leading-[1.06] tracking-[-0.035em] text-heading sm:text-4xl lg:text-[3rem]">
                I build the systems{" "}
                <span className="text-accent-text">businesses run on.</span>
              </h1>
              <div className="mt-6 max-w-2xl space-y-4 text-[16px] leading-relaxed text-body">
                <p>
                  I&rsquo;m Abeer Ahmad, a full-stack developer from Rawalpindi,
                  Pakistan. My work sits where software meets daily operations: ERP
                  and POS systems for shops and showrooms, mobile apps with real
                  payment and delivery flows, and the APIs that hold everything
                  together.
                </p>
                <p>
                  Most of my projects have been built independently, end-to-end —
                  database schema, Django backend, REST APIs, frontend, deployment,
                  and the support that follows. That includes retail ERP systems for
                  marts, electronics stores, and automobile showrooms, and mobile
                  products released on both the Google Play Store and the Apple App
                  Store.
                </p>
                <p>
                  I care about software that holds up in real use: correct numbers at
                  the end of the day, inventory that matches the shelves, payments
                  that go through, and a system that&rsquo;s still maintained months
                  after launch. I&rsquo;d rather solve the actual problem in front of
                  me than add complexity for its own sake.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <aside className="card p-6 sm:p-7">
                <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-text">
                  At a glance
                </h2>
                <dl className="mt-4 divide-y divide-line">
                  <div className="pb-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      Role
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-heading">
                      Full-Stack Developer — Django &amp; Flutter
                    </dd>
                  </div>
                  <div className="py-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      Recent role
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-heading">
                      Software Engineer, Digital Ocean Technologies
                    </dd>
                    <dd className="mt-0.5 font-mono text-xs text-muted">
                      June 2025 – August 2026
                    </dd>
                  </div>
                  <div className="pt-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      Studying
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-heading">
                      BE Cyber Security
                    </dd>
                    <dd className="mt-0.5 text-xs text-muted">
                      PMAS Arid Agriculture University, Rawalpindi
                    </dd>
                  </div>
                </dl>
                <ButtonAnchor
                  href={site.cvPath}
                  variant="secondary"
                  className="mt-6 w-full"
                  download
                >
                  <IconDownload className="h-4 w-4 text-accent-text" />
                  Download CV
                </ButtonAnchor>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Principles — Swiss architectural grid */}
      <section>
        <Container className="py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow">How I work</p>
            <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-[-0.03em] text-heading sm:text-[1.875rem]">
              Four things I believe about{" "}
              <span className="text-accent-text">business software.</span>
            </h2>
          </Reveal>
          <div className="swiss-grid mt-10 sm:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle.title} className="swiss-cell p-6 sm:p-8">
                <span className="font-mono text-sm font-bold text-accent-text">
                  {principle.number}
                </span>
                <h3 className="mt-4 text-base font-bold tracking-[-0.02em] text-heading">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  {principle.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Education */}
      <section className="border-t border-line bg-subtle">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow">Education</p>
            <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-heading sm:text-[1.875rem]">
              Studying while building
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <ul className="card mt-9 px-6 py-3 sm:px-8">
              {education.map((item) => (
                <EducationItem key={item.degree} item={item} />
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
