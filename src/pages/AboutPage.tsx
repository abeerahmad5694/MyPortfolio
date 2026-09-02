import { Container } from "../components/Container";
import { ButtonAnchor } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { EducationItem } from "../components/EducationItem";
import { CtaSection } from "../components/CtaSection";
import { usePageMeta } from "../hooks/usePageMeta";
import { education } from "../data/education";
import { IconDownload } from "../components/icons";
import { site } from "../data/site";

const principles = [
  {
    title: "Practical over clever",
    text: "The best system is one the business can actually run on — understandable, dependable, and easy to change.",
  },
  {
    title: "End-to-end ownership",
    text: "I take projects from data model to deployment, so nothing gets lost between “backend done” and “people are using it”.",
  },
  {
    title: "Support after launch",
    text: "Software that runs a business needs looking after. I provide ongoing maintenance and troubleshooting for live systems.",
  },
  {
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
      {/* Intro */}
      <section className="border-b border-line">
        <Container className="py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
            <Reveal>
              <p className="eyebrow">About</p>
              <h1 className="mt-2.5 text-2xl font-semibold tracking-tight text-heading sm:text-3xl">
                I build the systems businesses run on.
              </h1>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-body">
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

            <Reveal delay={120}>
              <div className="space-y-6">
                <div className="img-frame">
                  <img
                    src="/images/laptop-code.jpg"
                    alt="Hands typing code on a laptop at a wooden desk"
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/2]"
                  />
                </div>
                <aside className="card p-6">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    At a glance
                  </h2>
                  <dl className="mt-4 space-y-4">
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                        Role
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-heading">
                        Full-Stack Developer — Django &amp; Flutter
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                        Recent role
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-heading">
                        Software Engineer, Digital Ocean Technologies
                      </dd>
                      <dd className="mt-0.5 text-[13px] text-muted">June 2025 – August 2026</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                        Studying
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-heading">
                        BE Cyber Security
                      </dd>
                      <dd className="mt-0.5 text-[13px] text-muted">
                        PMAS Arid Agriculture University, Rawalpindi
                      </dd>
                    </div>
                  </dl>
                  <ButtonAnchor
                    href={site.cvPath}
                    variant="secondary"
                    className="mt-5 w-full"
                    download
                  >
                    <IconDownload className="h-4 w-4" />
                    Download CV
                  </ButtonAnchor>
                </aside>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Approach */}
      <section>
        <Container className="py-14 sm:py-16">
          <Reveal>
            <p className="eyebrow">How I work</p>
            <h2 className="mt-2.5 max-w-2xl text-[1.375rem] font-semibold tracking-tight text-heading sm:text-2xl">
              Four things I believe about business software
            </h2>
          </Reveal>
          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 70} className="h-full">
                <div className="card h-full p-6">
                  <h3 className="text-[15px] font-semibold text-heading">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    {principle.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Education */}
      <section className="border-t border-line bg-subtle">
        <Container className="py-14 sm:py-16">
          <Reveal>
            <p className="eyebrow">Education</p>
            <h2 className="mt-2.5 text-[1.375rem] font-semibold tracking-tight text-heading sm:text-2xl">
              Studying while building
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <ul className="card mt-9 px-6 py-2 sm:px-8">
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
