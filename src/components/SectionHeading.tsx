import type { ReactNode } from "react";
import { cx } from "../lib/cx";

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  action,
  className,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("flex flex-wrap items-end justify-between gap-x-8 gap-y-4", className)}>
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 text-2xl font-bold leading-[1.12] tracking-[-0.03em] text-heading sm:text-[1.875rem]">
          {title}
          {highlight ? (
            <>
              {" "}
              <span className="text-accent-text">{highlight}</span>
            </>
          ) : null}
        </h2>
        {description ? (
          <p className="mt-3 text-[15px] leading-relaxed text-body sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
