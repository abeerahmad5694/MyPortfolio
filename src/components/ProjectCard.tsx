import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import { IconArrowRight } from "./icons";
import { TechChips } from "./TechChips";

export function ProjectCard({ project }: { project: Project }) {
  const href = `/projects/${project.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-all duration-200 hover:border-line-strong hover:shadow-[0_16px_40px_-22px_rgb(15_23_42/0.35)] dark:hover:shadow-[0_20px_45px_-20px_rgba(0,0,0,0.8)]">
      {project.image ? (
        <Link
          to={href}
          tabIndex={-1}
          aria-hidden="true"
          className="relative block aspect-[16/9] overflow-hidden border-b border-line"
        >
          <img
            src={project.image}
            alt={project.imageAlt ?? ""}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        </Link>
      ) : null}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-text">
          {project.category}
        </p>

        <h3 className="mt-2.5 text-base font-semibold tracking-tight text-heading">
          <Link to={href} className="transition-colors hover:text-accent-text">
            {project.name}
          </Link>
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-body">{project.summary}</p>

        <ul className="mt-3.5 space-y-1.5">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2.5 text-sm text-body">
              <span
                aria-hidden="true"
                className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent"
              />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t border-line pt-4">
          <TechChips items={project.tech} className="mt-5" />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="text-xs text-muted">
              <span>Role — </span>
              <span className="text-body">{project.role}</span>
            </p>
            <Link
              to={href}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-text transition-colors hover:text-accent-text-hover"
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
