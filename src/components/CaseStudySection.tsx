import type { ReactNode } from "react";

export function CaseStudySection({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-3 border-t border-line py-9 md:grid-cols-[220px_1fr] md:gap-10 md:py-11">
      <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-text">
        {label}
      </h2>
      <div>{children}</div>
    </section>
  );
}

export function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-4">
      {items.map((paragraph) => (
        <p key={paragraph} className="text-[15px] leading-relaxed text-body sm:text-base">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
