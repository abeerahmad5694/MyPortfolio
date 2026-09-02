import type { Service } from "../data/services";
import { IconCheck } from "./icons";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="card flex h-full flex-col p-6 transition-colors duration-200 hover:border-line-strong">
      <span className="font-mono text-[13px] font-medium text-accent-text">{service.number}</span>
      <h3 className="mt-3.5 text-base font-semibold tracking-tight text-heading">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-body">{service.description}</p>
      <ul className="mt-4 space-y-2">
        {service.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm text-body">
            <IconCheck className="mt-[3px] h-3.5 w-3.5 shrink-0 text-accent" />
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}
