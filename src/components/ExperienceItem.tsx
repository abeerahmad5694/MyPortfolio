import type { Experience } from "../data/experience";
import { IconCheck } from "./icons";
import { TechChips } from "./TechChips";

export function ExperienceItem({ item }: { item: Experience }) {
  return (
    <li className="grid gap-4 border-t border-line py-8 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[200px_1fr] md:gap-10">
      <div>
        <span className="inline-flex rounded border border-line bg-subtle px-2.5 py-1 font-mono text-xs font-semibold text-accent-text">
          {item.period}
        </span>
        <p className="mt-2 font-mono text-xs text-muted">{item.location}</p>
      </div>
      <div>
        <h3 className="text-lg font-bold tracking-[-0.02em] text-heading">{item.role}</h3>
        <p className="mt-0.5 text-sm font-semibold text-accent-text">{item.company}</p>
        <ul className="mt-4 space-y-2.5">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5 text-sm leading-relaxed text-body">
              <IconCheck className="mt-[3px] h-4 w-4 shrink-0 text-accent" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <TechChips items={item.tech} className="mt-5" />
      </div>
    </li>
  );
}
