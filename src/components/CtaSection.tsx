import { Link } from "react-router-dom";
import { Container } from "./Container";
import { DitherMatrix } from "./BrandGraphics";
import { Reveal } from "./Reveal";
import { site } from "../data/site";
import { IconCheck } from "./icons";

const assurances = [
  "Scoped directly with the developer — no agency handoffs",
  "End-to-end delivery from database schema to live release",
  "Ongoing maintenance and support after launch",
];

export function CtaSection() {
  return (
    <section
      className="relative overflow-hidden border-t border-zinc-800"
      style={{ backgroundColor: "#050505", color: "#ffffff" }}
    >
      <DitherMatrix className="absolute right-4 bottom-0 h-24 w-80 opacity-85" />

      <Container className="relative py-16 sm:py-20">
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400">
                Next step
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-3xl lg:text-[2.4rem]">
                Have a project in mind?{" "}
                <span style={{ color: "#4d6bff" }}>
                  Let&rsquo;s scope it properly.
                </span>
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-zinc-300 sm:text-base">
                Tell me what you&rsquo;re building and what you need help with.
                Whether it&rsquo;s a new ERP or POS system, a Flutter mobile
                app, or an existing platform that needs work — I&rsquo;ll give
                you a straight answer.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/contact"
                  className="group inline-flex items-stretch overflow-hidden rounded-xl"
                >
                  <span
                    className="inline-flex items-center px-5 py-3.5 text-sm font-medium text-white"
                    style={{ backgroundColor: "#001aff" }}
                  >
                    Get in touch
                  </span>
                  <span
                    className="inline-flex items-center justify-center bg-white px-4 text-[#090d16]"
                    aria-hidden="true"
                  >
                    ↘
                  </span>
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 font-mono text-[13px] font-medium text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  {site.email}
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-6">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400">
                How we work together
              </p>
              <ul className="mt-4 space-y-3">
                {assurances.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-zinc-200"
                  >
                    <IconCheck className="mt-[3px] h-4 w-4 shrink-0 text-[#4d6bff]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs text-zinc-400">
                <span>{site.location}</span>
                <a
                  href={site.phoneHref}
                  className="text-zinc-200 transition-colors hover:text-white"
                >
                  {site.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
