import { Link } from "react-router-dom";
import type { Service } from "../data/services";
import { IconArrowRight, IconCheck } from "./icons";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="card group flex h-full flex-col justify-between p-6 transition-all duration-200 hover:border-line-strong hover:shadow-[0_14px_34px_-20px_rgb(9_13_22/0.16)] sm:p-7">
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center rounded border border-line bg-subtle px-2.5 py-1 font-mono text-xs font-semibold text-accent-text">
            {service.number}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            Production Service
          </span>
        </div>

        <h3 className="mt-4 text-lg font-bold tracking-[-0.02em] text-heading">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-body">
          {service.description}
        </p>

        <div className="mt-5 border-t border-line pt-4">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
            What&rsquo;s included:
          </p>
          <ul className="mt-3 space-y-2.5">
            {service.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-heading/90">
                <IconCheck className="mt-[3px] h-3.5 w-3.5 shrink-0 text-accent" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 border-t border-line pt-4">
        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent-text transition-colors hover:text-accent-text-hover"
        >
          Discuss your requirements
          <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
