import type { ReactNode } from "react";

/**
 * A labelled section of a case study: label column on the left,
 * content on the right (stacked on mobile).
 */
export function CaseStudySection({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-3 border-t border-line py-9 md:grid-cols-[200px_1fr] md:gap-10 md:py-11">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        {label}
      </h2>
      <div>{children}</div>
    </section>
  );
}

/** Renders an array of strings as spaced paragraphs. */
export function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-4">
      {items.map((paragraph) => (
        <p key={paragraph} className="text-[15px] leading-relaxed text-body">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
