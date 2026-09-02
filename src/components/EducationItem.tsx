import type { Education } from "../data/education";

export function EducationItem({ item }: { item: Education }) {
  return (
    <li className="grid gap-3 border-t border-line py-5 first:border-t-0 first:pt-0 sm:grid-cols-[180px_1fr] sm:gap-10">
      <div>
        <p className="font-mono text-[13px] leading-relaxed text-muted">{item.period}</p>
        <p className="mt-1 text-sm text-muted">{item.status}</p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-heading">{item.degree}</h3>
        <p className="mt-0.5 text-sm text-body">{item.institution}</p>
        <p className="mt-1 text-[13px] text-muted">
          {item.location}
          {item.grade ? ` · Grade: ${item.grade}` : ""}
        </p>
      </div>
    </li>
  );
}
