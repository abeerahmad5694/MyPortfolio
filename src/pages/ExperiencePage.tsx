import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { PageHeader } from "../components/PageHeader";
import { ExperienceItem } from "../components/ExperienceItem";
import { SkillGroupCard } from "../components/SkillGroup";
import { CtaSection } from "../components/CtaSection";
import { usePageMeta } from "../hooks/usePageMeta";
import { experience } from "../data/experience";
import { skillGroups, skillsNote } from "../data/skills";

export function ExperiencePage() {
  usePageMeta(
    "Experience | Abeer Ahmad",
    "Abeer Ahmad's professional experience: Software Engineer at Digital Ocean Technologies, building and maintaining ERP and POS systems for retail clients.",
  );

  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Where I’ve worked"
        description="Professional experience building and maintaining production systems for real businesses."
      />

      {/* Experience + side image */}
      <section>
        <Container className="py-12 sm:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-14">
            <Reveal>
              <ul>
                {experience.map((item) => (
                  <ExperienceItem key={item.company} item={item} />
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <div className="lg:sticky lg:top-24">
                <div className="img-frame">
                  <img
                    src="/images/about-workspace.jpg"
                    alt="A developer working across multiple monitors filled with code in a dark room"
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10]"
                  />
                </div>
                <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-muted">
                  Two years of building and running production systems for retail
                  clients — ERP, POS, and everything around them.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Skills */}
      <section className="border-t border-line bg-subtle">
        <Container className="py-14 sm:py-16">
          <Reveal>
            <p className="eyebrow">Skills & tools</p>
            <h2 className="mt-2.5 max-w-2xl text-[1.375rem] font-semibold tracking-tight text-heading sm:text-2xl">
              What I work with day to day
            </h2>
          </Reveal>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, index) => (
              <Reveal key={group.title} delay={(index % 3) * 70} className="h-full">
                <SkillGroupCard group={group} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <p className="mt-6 max-w-2xl text-[13px] leading-relaxed text-muted">{skillsNote}</p>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
