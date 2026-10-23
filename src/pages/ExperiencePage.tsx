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
        title="Where I’ve"
        highlight="worked."
        description="Professional experience building and maintaining production systems for real businesses."
      />

      <section>
        <Container className="py-14 sm:py-16">
          <Reveal>
            <div className="card p-6 sm:p-8">
              <ul>
                {experience.map((item) => (
                  <ExperienceItem key={item.company} item={item} />
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Skills */}
      <section className="border-t border-line bg-subtle">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <p className="eyebrow">Skills &amp; tools</p>
            <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-[-0.03em] text-heading sm:text-[1.875rem]">
              What I work with{" "}
              <span className="text-accent-text">day to day.</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, index) => (
              <Reveal key={group.title} delay={(index % 3) * 60} className="h-full">
                <SkillGroupCard group={group} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={80}>
            <p className="mt-6 max-w-2xl text-[13px] leading-relaxed text-muted">
              {skillsNote}
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
