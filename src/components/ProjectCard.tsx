import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import { IconArrowRight } from "./icons";
import { TechChips } from "./TechChips";

export function ProjectCard({ project }: { project: Project }) {
  const href = `/projects/${project.slug}`;

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white p-7 transition-transform duration-200 hover:-translate-y-0.5 sm:p-9"
      style={{
        backgroundColor: "#ffffff",
        boxShadow: "0 1px 3px rgba(9, 13, 22, 0.05)",
      }}
    >
      {/* Top oval pills matching image-3.png */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className="inline-flex items-center rounded-full px-4 py-1 text-[12.5px] font-medium"
          style={{ border: "1px solid #a1a1aa", color: "#090d16" }}
        >
          {project.category}
        </span>
        <span className="font-mono text-xs text-zinc-500">{project.role}</span>
      </div>

      {project.image ? (
        <Link
          to={href}
          tabIndex={-1}
          aria-hidden="true"
          className="relative mt-6 block aspect-[16/9] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100"
        >
          <img
            src={project.image}
            alt={project.imageAlt ?? ""}
            width={1312}
            height={816}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </Link>
      ) : null}

      <div className="mt-6 flex flex-1 flex-col">
        <h3 className="text-[24px] font-bold leading-[1.14] tracking-[-0.03em] text-[#090d16] sm:text-[28px]">
          <Link
            to={href}
            className="transition-colors group-hover:text-[#001aff]"
          >
            {project.name}
          </Link>
        </h3>

        <p className="mt-3 text-[15px] leading-relaxed text-zinc-600">
          {project.summary}
        </p>

        {/* Checklist in image-3.png format */}
        <div className="mt-7">
          <p className="text-[13.5px] font-bold text-[#090d16]">
            What&rsquo;s included:
          </p>
          <ul className="mt-3.5 space-y-2.5">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 text-[14px] leading-snug text-zinc-800"
              >
                <span className="mt-0.5 font-mono text-xs font-bold text-[#001aff]">
                  {"{}"}
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-7">
          <TechChips items={project.tech} />
          <div className="mt-5 flex items-center justify-between gap-4 border-t border-zinc-200 pt-5">
            <span className="truncate font-mono text-xs text-zinc-500">
              {project.status}
            </span>
            <Link
              to={href}
              className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-[#001aff] transition-opacity hover:opacity-75"
            >
              View case study
              <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
