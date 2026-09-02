import type { Experience } from "../data/experience";
import { TechChips } from "./TechChips";

export function ExperienceItem({ item }: { item: Experience }) {
  return (
    <li className="grid gap-4 border-t border-line py-9 first:border-t-0 first:pt-0 md:grid-cols-[180px_1fr] md:gap-10">
      <div>
        <p className="font-mono text-[13px] leading-relaxed text-muted">{item.period}</p>
        <p className="mt-1.5 text-sm text-muted">{item.location}</p>
      </div>
      <div>
        <h3 className="text-base font-semibold tracking-tight text-heading">{item.role}</h3>
        <p className="mt-0.5 text-sm font-medium text-heading/80">{item.company}</p>
        <ul className="mt-3.5 space-y-2.5">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5 text-sm leading-relaxed text-body">
              <span
                aria-hidden="true"
                className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-accent"
              />
              {bullet}
            </li>
          ))}
        </ul>
        <TechChips items={item.tech} className="mt-4" />
      </div>
    </li>
  );
}
