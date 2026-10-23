/**
 * Pixel-diamond brand mark matching Legency Media's electric blue (#001AFF) geometric pixel mark.
 */
export function BrandMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Top & bottom outer pixels */}
      <rect x="12" y="1" width="4" height="4" fill="var(--accent-text)" />
      <rect x="12" y="23" width="4" height="4" fill="var(--accent-text)" />
      {/* Left & right outer pixels */}
      <rect x="1" y="12" width="4" height="4" fill="var(--accent-text)" />
      <rect x="23" y="12" width="4" height="4" fill="var(--accent-text)" />
      {/* Inner diagonal ring */}
      <rect x="7" y="5" width="4" height="4" fill="var(--accent-text)" />
      <rect x="17" y="5" width="4" height="4" fill="var(--accent-text)" />
      <rect x="5" y="10" width="4" height="4" fill="var(--accent-text)" />
      <rect x="19" y="10" width="4" height="4" fill="var(--accent-text)" />
      <rect x="5" y="14" width="4" height="4" fill="var(--accent-text)" />
      <rect x="19" y="14" width="4" height="4" fill="var(--accent-text)" />
      <rect x="7" y="19" width="4" height="4" fill="var(--accent-text)" />
      <rect x="17" y="19" width="4" height="4" fill="var(--accent-text)" />
      {/* Core accents */}
      <rect
        x="11"
        y="8"
        width="3"
        height="3"
        fill="var(--accent-text)"
        opacity="0.55"
      />
      <rect
        x="14"
        y="17"
        width="3"
        height="3"
        fill="var(--accent-text)"
        opacity="0.55"
      />
    </svg>
  );
}

/**
 * Legency-style credential badge:
 * White rounded pill in Light mode, matte dark surface pill in Dark mode.
 */
export function PartnerBadge({
  label = "Full-Stack Partner",
  tag = "ERP & POS",
}: {
  label?: string;
  tag?: string;
}) {
  return (
    <div
      className="inline-flex items-center gap-2.5 rounded-lg border border-transparent px-3 py-1.5 dark:border-line"
      style={{
        backgroundColor: "var(--surface)",
        boxShadow: "0 1px 2px rgba(9, 13, 22, 0.05)",
      }}
    >
      {/* Blue W/pixel geometric icon matching the screenshot */}
      <svg
        viewBox="0 0 20 14"
        fill="none"
        aria-hidden="true"
        className="h-3.5 w-5 shrink-0"
      >
        <path
          d="M0 1h4.2l2.1 7.2L8.8 1h3.6l2.1 7.2L16.6 1H20l-3.8 12h-3.7L10.5 6l-2 7H4.8L0 1Z"
          fill="var(--accent-text)"
        />
      </svg>
      <span
        className="text-[13px] font-semibold tracking-[-0.01em]"
        style={{ color: "var(--heading)" }}
      >
        {label}
      </span>
      <span
        className="rounded px-2 py-0.5 text-[11px] font-semibold tracking-[-0.01em] bg-[#090d16] text-white dark:bg-[#0b0c10] dark:border dark:border-line"
      >
        {tag}
      </span>
    </div>
  );
}

/**
 * Architectural pixel-dither matrix accent used in callout footers.
 */
export function DitherMatrix({ className = "" }: { className?: string }) {
  const cols = 20;
  const rows = 8;
  const cells: { x: number; y: number; opacity: number }[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dist = (c / cols) * 0.65 + (r / rows) * 0.55;
      const checker = (r + c) % 2 === 0;
      if (dist > 0.72) {
        cells.push({ x: c, y: r, opacity: checker ? 0.9 : 0.5 });
      } else if (dist > 0.5 && checker) {
        cells.push({ x: c, y: r, opacity: 0.35 });
      } else if (dist > 0.32 && r % 2 === 0 && c % 2 === 0) {
        cells.push({ x: c, y: r, opacity: 0.16 });
      }
    }
  }

  return (
    <svg
      viewBox={`0 0 ${cols * 8} ${rows * 8}`}
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      {cells.map((cell, i) => (
        <rect
          key={i}
          x={cell.x * 8}
          y={cell.y * 8}
          width="5"
          height="5"
          fill="#001AFF"
          fillOpacity={cell.opacity}
        />
      ))}
    </svg>
  );
}
