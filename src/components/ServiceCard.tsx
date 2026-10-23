import { Link } from "react-router-dom";
import type { Service } from "../data/services";
import { IconArrowRight } from "./icons";

export function ServiceCard({ service }: { service: Service }) {
  const isDark = service.number === "03" || service.number === "06";

  return (
    <article
      className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-8 sm:p-10"
      style={
        isDark
          ? {
              backgroundColor: "#040614",
              color: "#ffffff",
              boxShadow: "0 20px 44px -20px rgba(4, 6, 20, 0.45)",
            }
          : {
              backgroundColor: "#ffffff",
              color: "#090d16",
              boxShadow: "0 1px 3px rgba(9, 13, 22, 0.05)",
            }
      }
    >
      {isDark ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-45"
          style={{
            backgroundImage:
              "radial-gradient(circle at 82% 28%, rgba(0, 26, 255, 0.55) 0%, rgba(0, 26, 255, 0.18) 38%, transparent 70%), radial-gradient(#001aff 1.8px, transparent 1.8px)",
            backgroundSize: "100% 100%, 10px 10px",
          }}
        />
      ) : null}

      <div className="relative z-10">
        <span
          className="inline-flex items-center rounded-full px-4 py-1 text-[12.5px] font-medium"
          style={
            isDark
              ? { backgroundColor: "#001aff", color: "#ffffff" }
              : { border: "1px solid #a1a1aa", color: "#090d16" }
          }
        >
          {service.number} · Service
        </span>

        <h3
          className="mt-7 text-[26px] font-bold leading-[1.12] tracking-[-0.035em] sm:text-[29px]"
          style={{ color: isDark ? "#ffffff" : "#090d16" }}
        >
          {service.title}
        </h3>
        <p
          className="mt-3.5 text-[15px] leading-relaxed"
          style={{ color: isDark ? "#d4d4d8" : "#52525b" }}
        >
          {service.description}
        </p>

        <div className="mt-8">
          <p
            className="text-[13.5px] font-bold"
            style={{ color: isDark ? "#ffffff" : "#090d16" }}
          >
            What&rsquo;s included:
          </p>
          <ul className="mt-4 space-y-3.5">
            {service.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-[14.5px] leading-snug"
                style={{ color: isDark ? "#f4f4f5" : "#18181b" }}
              >
                <span
                  className="mt-0.5 inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center font-mono text-xs font-bold"
                  style={{ color: isDark ? "#4d6bff" : "#001aff" }}
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
          borderColor: isDark ? "rgba(255,255,255,0.12)" : "#e4e4e7",
        }}
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-[14px] font-semibold transition-opacity hover:opacity-75"
          style={{ color: isDark ? "#ffffff" : "#001aff" }}
        >
          Discuss your requirements
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
