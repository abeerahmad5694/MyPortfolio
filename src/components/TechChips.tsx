import { cx } from "../lib/cx";

export function TechChips({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={cx("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-md border border-line bg-chip px-2 py-1 font-mono text-[11px] leading-none text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
