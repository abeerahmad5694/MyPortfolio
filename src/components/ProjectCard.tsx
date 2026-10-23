import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import { IconArrowRight } from "./icons";
import { TechChips } from "./TechChips";

export function ProjectCard({ project }: { project: Project }) {
  const href = `/projects/${project.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface transition-all duration-200 hover:border-line-strong hover:shadow-[0_20px_48px_-24px_rgb(9_13_22/0.22)] dark:hover:shadow-[0_24px_52px_-20px_rgba(0,0,0,0.85)]">
      {/* Top architectural bar */}
      <div className="flex items-center justify-between gap-3 border-b border-line bg-subtle/60 px-5 py-3">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-text">
          <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
          {project.category}
        </span>
        <span className="rounded border border-line bg-surface px-2 py-0.5 font-mono text-[11px] text-muted">
          {project.role}
        </span>
      </div>

      {project.image ? (
        <Link
          to={href}
          tabIndex={-1}
          aria-hidden="true"
          className="relative block aspect-[16/9] overflow-hidden border-b border-line bg-subtle"
        >
          <img
            src={project.image}
            alt={project.imageAlt ?? ""}
            width={1312}
            height={816}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
          {project.timeline ? (
            <span className="absolute bottom-3 left-3.5 rounded bg-slate-950/80 px-2.5 py-1 font-mono text-[10px] font-medium text-white backdrop-blur-sm">
              {project.timeline}
            </span>
          ) : null}
        </Link>
      ) : null}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-bold tracking-[-0.025em] text-heading sm:text-[19px]">
          <Link to={href} className="transition-colors group-hover:text-accent-text">
            {project.name}
          </Link>
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-body">{project.summary}</p>

        {/* Legency-inspired structured key outcomes matrix */}
        <div className="mt-5 rounded-md border border-line bg-subtle/50 p-3.5">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
            Key deliverables &amp; outcomes
          </p>
          <ul className="mt-2.5 divide-y divide-line/80">
            {project.highlights.map((highlight, idx) => (
              <li
                key={highlight}
                className="flex items-start gap-2.5 py-1.5 text-[13px] leading-snug text-heading first:pt-0 last:pb-0"
              >
                <span className="mt-0.5 font-mono text-[10px] font-semibold text-accent-text">
                  0{idx + 1}
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-5">
          <TechChips items={project.tech} />
          <div className="mt-4 flex items-center justify-between gap-4 border-t border-line pt-4">
            <span className="truncate font-mono text-[11px] text-muted">
              {project.status}
            </span>
            <Link
              to={href}
              className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-accent-text transition-colors hover:text-accent-text-hover"
            >
              View case study
              <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
