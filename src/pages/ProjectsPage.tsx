import { useState } from "react";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { ProjectGrid } from "../components/ProjectGrid";
import { CtaSection } from "../components/CtaSection";
import { usePageMeta } from "../hooks/usePageMeta";
import { projects } from "../data/projects";
import { cx } from "../lib/cx";

type FilterKey = "all" | "erp-pos" | "mobile" | "iot";

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All work" },
  { key: "erp-pos", label: "ERP & POS Systems" },
  { key: "mobile", label: "Mobile · Flutter" },
  { key: "iot", label: "IoT & Computer Vision" },
];

export function ProjectsPage() {
  usePageMeta(
    "Projects | Abeer Ahmad",
    "Case studies from real client work: ERP systems, POS systems, Flutter mobile apps, a food delivery platform, and a face recognition attendance system.",
  );

  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "erp-pos") {
      return p.category.includes("ERP") || p.category.includes("POS");
    }
    if (activeFilter === "mobile") {
      return p.category.includes("Mobile");
    }
    if (activeFilter === "iot") {
      return p.category.includes("IoT");
    }
    return true;
  });

  return (
    <>
      <section
        className="pt-24 pb-16 sm:pt-36 sm:pb-28"
        style={{ backgroundColor: "#f3f4f6", color: "#090d16" }}
      >
        <Container>
          <Reveal>
            <div className="mx-auto max-w-[780px] text-center">
              <p
                className="text-[13px] font-medium"
                style={{ color: "#001aff" }}
              >
                Case Studies
              </p>
              <h1
                className="mt-3 text-[clamp(2.35rem,4.6vw,4.1rem)] font-bold leading-[1.05] tracking-[-0.04em]"
                style={{ color: "#090d16" }}
              >
                Selected client work
                <br />
                and production systems
              </h1>
              <p className="mx-auto mt-5 max-w-[650px] text-[15.5px] leading-[1.6] text-zinc-600 sm:text-[16.5px]">
                Systems and apps I&rsquo;ve built — what each one does, how I
                approached it, and where it stands today.
              </p>
            </div>
          </Reveal>

          {/* Filter bar + count */}
          <div className="mt-12 mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-5">
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="flex flex-wrap gap-2"
            >
              {filters.map((filter) => {
                const active = activeFilter === filter.key;
                return (
                  <button
                    key={filter.key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveFilter(filter.key)}
                    className={cx(
                      "rounded-full px-4 py-2 text-xs font-medium transition-colors",
                      active
                        ? "bg-[#001aff] text-white"
                        : "border border-zinc-300 bg-white text-[#090d16] hover:border-zinc-400",
                    )}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            <p className="font-mono text-xs font-medium text-zinc-500">
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1 ? "project" : "projects"}
            </p>
          </div>

          <ProjectGrid projects={filteredProjects} />

          <Reveal delay={100}>
            <div className="mt-12 rounded-2xl bg-white p-6 sm:p-8">
              <p className="max-w-3xl text-[13.5px] leading-relaxed text-zinc-600">
                <span className="font-semibold text-[#090d16]">
                  Confidentiality note:
                </span>{" "}
                These projects were built for clients, so the software itself
                isn&rsquo;t public — the case studies above describe what was
                built and how. Screenshots show representative interfaces, not
                the client deployments.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
