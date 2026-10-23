import type { Education } from "../data/education";

export function EducationItem({ item }: { item: Education }) {
  return (
    <li className="grid gap-3 border-t border-line py-5 first:border-t-0 first:pt-2 last:pb-2 sm:grid-cols-[200px_1fr] sm:gap-10">
      <div>
        <p className="font-mono text-xs font-semibold text-accent-text">{item.period}</p>
        <span className="mt-1.5 inline-flex rounded border border-line bg-subtle px-2 py-0.5 font-mono text-[11px] text-muted">
          {item.status}
        </span>
      </div>
      <div>
        <h3 className="text-[15px] font-bold tracking-[-0.01em] text-heading">{item.degree}</h3>
        <p className="mt-0.5 text-sm font-medium text-body">{item.institution}</p>
        <p className="mt-1 font-mono text-xs text-muted">
          {item.location}
          {item.grade ? ` · Grade: ${item.grade}` : ""}
        </p>
      </div>
    </li>
  );
}
