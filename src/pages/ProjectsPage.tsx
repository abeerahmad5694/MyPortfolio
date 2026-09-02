import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { PageHeader } from "../components/PageHeader";
import { ProjectGrid } from "../components/ProjectGrid";
import { CtaSection } from "../components/CtaSection";
import { usePageMeta } from "../hooks/usePageMeta";
import { projects } from "../data/projects";

export function ProjectsPage() {
  usePageMeta(
    "Projects | Abeer Ahmad",
    "Case studies from real client work: ERP systems, POS systems, Flutter mobile apps, a food delivery platform, and a face recognition attendance system.",
  );

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Projects & case studies"
        description="Systems and apps I’ve built — what each one does, how I approached it, and where it stands today."
      />

      <section>
        <Container className="py-12 sm:py-16">
          <ProjectGrid projects={projects} />
          <Reveal delay={100}>
            <p className="mt-9 max-w-2xl text-[13px] leading-relaxed text-muted">
              These projects were built for clients, so the software itself isn&rsquo;t
              public — the case studies above describe what was built and how.
              Screenshots show representative interfaces, not the client deployments.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
