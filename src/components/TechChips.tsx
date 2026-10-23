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
          className="rounded border border-line bg-chip px-2.5 py-1 font-mono text-[11px] font-medium leading-none text-heading/80"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
