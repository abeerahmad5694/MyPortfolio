import type { ReactNode } from "react";
import { cx } from "../lib/cx";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("flex flex-wrap items-end justify-between gap-x-8 gap-y-4", className)}>
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2.5 text-[1.375rem] font-semibold tracking-tight text-heading sm:text-2xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-2.5 text-[15px] leading-relaxed text-body">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
