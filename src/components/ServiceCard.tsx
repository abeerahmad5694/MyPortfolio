import { Link } from "react-router-dom";
import type { Service } from "../data/services";
import { IconArrowRight } from "./icons";

export function ServiceCard({ service }: { service: Service }) {
  const isDark = service.number === "03" || service.number === "06";

  return (
    <article
      className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-transparent p-7 sm:p-10 dark:border-line"
      style={
        isDark
          ? {
              backgroundColor: "var(--dark-card)",
              color: "#ffffff",
            }
          : {
              backgroundColor: "var(--surface)",
              color: "var(--heading)",
              boxShadow: "var(--card-shadow)",
            }
      }
    >
      {isDark ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#001aff 1.8px, transparent 1.8px)",
            backgroundSize: "10px 10px",
          }}
        />
      ) : null}

      <div className="relative z-10">
        <span
          className="inline-flex items-center rounded-full px-4 py-1 text-[12.5px] font-medium"
          style={
            isDark
              ? { backgroundColor: "#001aff", color: "#ffffff" }
              : {
                  border: "1px solid var(--line-strong)",
                  color: "var(--heading)",
                }
          }
        >
          {service.number} · Service
        </span>

        <h3
          className="mt-7 text-[25px] font-bold leading-[1.12] tracking-[-0.035em] sm:text-[29px]"
          style={{ color: isDark ? "#ffffff" : "var(--heading)" }}
        >
          {service.title}
        </h3>
        <p
          className="mt-3.5 text-[15px] leading-relaxed"
          style={{ color: isDark ? "#d4d4d8" : "var(--body)" }}
        >
          {service.description}
        </p>

        <div className="mt-8">
          <p
            className="text-[13.5px] font-bold"
            style={{ color: isDark ? "#ffffff" : "var(--heading)" }}
          >
            What&rsquo;s included:
          </p>
          <ul className="mt-4 space-y-3.5">
            {service.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-[14.5px] leading-snug"
                style={{ color: isDark ? "#e4e4e7" : "var(--heading)" }}
              >
                <span
                  className="mt-0.5 inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center font-mono text-xs font-bold"
                  style={{ color: isDark ? "#5c78ff" : "var(--accent-text)" }}
                >
                  {"{}"}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="relative z-10 mt-9 border-t pt-5"
        style={{
          borderColor: isDark ? "rgba(255,255,255,0.12)" : "var(--line)",
        }}
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-[14px] font-semibold transition-opacity hover:opacity-75"
          style={{ color: isDark ? "#ffffff" : "var(--accent-text)" }}
        >
          Discuss your requirements
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
