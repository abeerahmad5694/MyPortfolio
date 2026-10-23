import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { cx } from "../lib/cx";
import { IconArrowRight } from "./icons";

export function TextLink({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cx(
        "group inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text transition-colors hover:text-accent-text-hover",
        className,
      )}
    >
      {children}
      <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}
