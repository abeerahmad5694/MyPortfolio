import { Link, Navigate, useParams } from "react-router-dom";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { CaseStudySection, Paragraphs } from "../components/CaseStudySection";
import { TechChips } from "../components/TechChips";
import { CtaSection } from "../components/CtaSection";
import { usePageMeta } from "../hooks/usePageMeta";
import { getProject, projectIndex, projects } from "../data/projects";
import { IconArrowRight } from "../components/icons";

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
      <section className="border-b border-line">
        <Container className="py-10 sm:py-14">
          <Reveal>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 font-mono text-[13px] text-muted transition-colors hover:text-heading"
            >
              <IconArrowRight className="h-3.5 w-3.5 rotate-180" />
              All projects
            </Link>

            <p className="eyebrow mt-7">{project.category}</p>
            <h1 className="mt-2.5 max-w-3xl text-2xl font-semibold tracking-tight text-heading sm:text-3xl">
              {project.name}
            </h1>
            <p className="mt-3.5 max-w-2xl text-[15px] leading-relaxed text-body sm:text-base">
              {project.summary}
            </p>

            <dl className="mt-7 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  Role
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-heading">{project.role}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  Timeline
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-heading">
                  {project.timeline ?? "Client project"}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  Status
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-heading">{project.status}</dd>
              </div>
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* Case study banner image */}
      {project.image ? (
        <Container className="pt-9 sm:pt-10">
          <Reveal>
            <figure>
              <div className="img-frame">
                <img
                  src={project.image}
                  alt={project.imageAlt ?? ""}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/9]"
                />
              </div>
              <figcaption className="mt-3 text-xs text-muted">
                Representative interface — not the client&rsquo;s production deployment.
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      ) : null}

      {/* Case study body */}
      <section>
        <Container className="py-4 sm:py-6">
          <CaseStudySection label="Overview">
            <Paragraphs items={project.overview} />
          </CaseStudySection>

          <CaseStudySection label="The Challenge">
            <Paragraphs items={project.challenge} />
          </CaseStudySection>

          <CaseStudySection label="What I Built">
            <Paragraphs items={project.built} />
          </CaseStudySection>

          <CaseStudySection label="Key Features">
            <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-body">
                  <span
                    aria-hidden="true"
                    className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-accent"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </CaseStudySection>

          <CaseStudySection label="Technology">
            <TechChips items={project.tech} />
          </CaseStudySection>

          <CaseStudySection label="Development Process">
            <Paragraphs items={project.process} />
          </CaseStudySection>

          <CaseStudySection label="Current Status">
            <p className="text-[15px] leading-relaxed text-body">{project.status}.</p>
            {project.links && project.links.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium text-heading transition-colors hover:border-line-strong hover:bg-subtle"
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
          <Container className="py-9 sm:py-11">
            <nav aria-label="More projects" className="grid gap-4 sm:grid-cols-2">
              {previous ? (
                <Link
                  to={`/projects/${previous.slug}`}
                  className="group card p-5 transition-colors hover:border-line-strong"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    Previous project
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-[15px] font-semibold text-heading">
                    <IconArrowRight className="h-4 w-4 rotate-180 text-muted transition-transform group-hover:-translate-x-0.5" />
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
                    Next project
                  </p>
                  <p className="mt-2 flex items-center justify-end gap-2 text-[15px] font-semibold text-heading">
                    {next.name}
                    <IconArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5" />
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
