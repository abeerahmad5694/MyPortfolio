import { Link, Navigate, useParams } from "react-router-dom";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { CaseStudySection, Paragraphs } from "../components/CaseStudySection";
import { TechChips } from "../components/TechChips";
import { CtaSection } from "../components/CtaSection";
import { usePageMeta } from "../hooks/usePageMeta";
import { getProject, projectIndex, projects } from "../data/projects";
import { IconArrowRight, IconCheck } from "../components/icons";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProject(slug);

  usePageMeta(
    project ? `${project.name} | Abeer Ahmad` : "Project | Abeer Ahmad",
    project ? project.summary : undefined,
  );

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const index = projectIndex(project.slug);
  const previous = index > 0 ? projects[index - 1] : undefined;
  const next = index < projects.length - 1 ? projects[index + 1] : undefined;

  return (
    <>
      {/* Case study header */}
      <section className="border-b border-line bg-subtle/60">
        <Container className="py-10 sm:py-14">
          <Reveal>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 rounded border border-line bg-surface px-3 py-1.5 font-mono text-xs font-medium text-heading transition-colors hover:border-line-strong"
            >
              <IconArrowRight className="h-3.5 w-3.5 rotate-180 text-accent-text" />
              All projects
            </Link>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <p className="eyebrow">{project.category}</p>
              <span className="rounded border border-line bg-surface px-2.5 py-0.5 font-mono text-[11px] text-muted">
                Case Study 0{index + 1}
              </span>
            </div>

            <h1 className="mt-3 max-w-3xl text-2xl font-bold leading-[1.1] tracking-[-0.03em] text-heading sm:text-4xl">
              {project.name}
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-body sm:text-[17px]">
              {project.summary}
            </p>

            {/* Architectural metadata Swiss grid */}
            <dl className="swiss-grid mt-8 sm:grid-cols-3">
              <div className="swiss-cell p-4 sm:p-5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  Role
                </dt>
                <dd className="mt-1.5 text-sm font-bold text-heading">{project.role}</dd>
              </div>
              <div className="swiss-cell p-4 sm:p-5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  Timeline
                </dt>
                <dd className="mt-1.5 text-sm font-bold text-heading">
                  {project.timeline ?? "Client project"}
                </dd>
              </div>
              <div className="swiss-cell p-4 sm:p-5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  Status
                </dt>
                <dd className="mt-1.5 text-sm font-bold text-heading">{project.status}</dd>
              </div>
            </dl>

            {/* Key outcomes bar */}
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {project.highlights.map((highlight, idx) => (
                <div
                  key={highlight}
                  className="rounded-md border border-line bg-surface p-4"
                >
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-text">
                    Deliverable 0{idx + 1}
                  </p>
                  <p className="mt-1.5 text-sm font-semibold leading-snug text-heading">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Case study banner image */}
      {project.image ? (
        <Container className="pt-9 sm:pt-12">
          <Reveal>
            <figure>
              <div className="img-frame">
                <img
                  src={project.image}
                  alt={project.imageAlt ?? ""}
                  width={1312}
                  height={816}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/9]"
                />
              </div>
              <figcaption className="mt-3 font-mono text-xs text-muted">
                Representative interface — not the client&rsquo;s production deployment.
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      ) : null}

      {/* Case study body */}
      <section>
        <Container className="py-6 sm:py-10">
          <CaseStudySection label="01 / Overview">
            <Paragraphs items={project.overview} />
          </CaseStudySection>

          <CaseStudySection label="02 / The Challenge">
            <Paragraphs items={project.challenge} />
          </CaseStudySection>

          <CaseStudySection label="03 / What I Built">
            <Paragraphs items={project.built} />
          </CaseStudySection>

          <CaseStudySection label="04 / Key Features">
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 rounded-md border border-line bg-subtle/50 p-3.5 text-sm leading-relaxed text-heading"
                >
                  <IconCheck className="mt-[3px] h-4 w-4 shrink-0 text-accent" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CaseStudySection>

          <CaseStudySection label="05 / Technology">
            <TechChips items={project.tech} />
          </CaseStudySection>

          <CaseStudySection label="06 / Development Process">
            <Paragraphs items={project.process} />
          </CaseStudySection>

          <CaseStudySection label="07 / Current Status">
            <p className="text-[15px] font-medium leading-relaxed text-heading">
              {project.status}.
            </p>
            {project.links && project.links.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-4 py-2 text-sm font-medium text-heading transition-colors hover:border-line-strong hover:bg-subtle"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </CaseStudySection>
        </Container>
      </section>

      {/* Previous / next project */}
      {previous || next ? (
        <section className="border-t border-line bg-subtle">
          <Container className="py-10 sm:py-12">
            <nav aria-label="More projects" className="grid gap-4 sm:grid-cols-2">
              {previous ? (
                <Link
                  to={`/projects/${previous.slug}`}
                  className="group card p-5 transition-colors hover:border-line-strong"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    Previous case study
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-base font-bold text-heading group-hover:text-accent-text">
                    <IconArrowRight className="h-4 w-4 rotate-180 text-accent-text transition-transform group-hover:-translate-x-0.5" />
                    {previous.name}
                  </p>
                </Link>
              ) : (
                <span aria-hidden="true" />
              )}
              {next ? (
                <Link
                  to={`/projects/${next.slug}`}
                  className="group card p-5 text-right transition-colors hover:border-line-strong"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    Next case study
                  </p>
                  <p className="mt-2 flex items-center justify-end gap-2 text-base font-bold text-heading group-hover:text-accent-text">
                    {next.name}
                    <IconArrowRight className="h-4 w-4 text-accent-text transition-transform group-hover:translate-x-0.5" />
                  </p>
                </Link>
              ) : null}
            </nav>
          </Container>
        </section>
      ) : null}

      <CtaSection />
    </>
  );
}
