import { useState } from "react";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { PageHeader } from "../components/PageHeader";
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
      <PageHeader
        eyebrow="Case studies"
        title="Selected client work"
        highlight="& systems."
        description="Systems and apps I’ve built — what each one does, how I approached it, and where it stands today."
      />

      <section>
        <Container className="py-12 sm:py-16">
          {/* Legency-inspired filter bar + count */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
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
                      "rounded-md px-3.5 py-2 text-xs font-semibold transition-colors",
                      active
                        ? "bg-accent text-white shadow-xs"
                        : "border border-line bg-surface text-body hover:border-line-strong hover:text-heading",
                    )}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            <p className="font-mono text-xs font-medium text-muted">
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1 ? "project" : "projects"}
            </p>
          </div>

          <ProjectGrid projects={filteredProjects} />

          <Reveal delay={100}>
            <div className="mt-10 rounded-lg border border-line bg-subtle p-5 sm:p-6">
              <p className="max-w-3xl text-[13px] leading-relaxed text-muted">
                <span className="font-semibold text-heading">Confidentiality note:</span>{" "}
                These projects were built for clients, so the software itself isn&rsquo;t
                public — the case studies above describe what was built and how.
                Screenshots show representative interfaces, not the client deployments.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
