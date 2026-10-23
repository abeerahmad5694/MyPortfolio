import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navLinks, site } from "../data/site";
import { projects } from "../data/projects";
import { cx } from "../lib/cx";
import { BrandMark } from "./BrandGraphics";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="pointer-events-none sticky top-0 z-50 -mb-[76px] pt-3.5 pb-2.5 sm:-mb-[96px] sm:pt-7 sm:pb-3">
      <Container>
        <div className="flex items-center justify-between gap-2.5 sm:gap-4">
          {/* Left Floating Bar: [BrandMark + Name] ... [ThemeToggle | = Menu] */}
          <div
            className="pointer-events-auto flex min-w-0 flex-1 items-center justify-between gap-2 rounded-xl border border-transparent px-3.5 py-2.5 sm:max-w-[580px] sm:px-6 sm:py-4 dark:border-line"
            style={{
              backgroundColor: "var(--surface)",
              boxShadow: "var(--pill-shadow)",
            }}
          >
            <Link
              to="/"
              className="group inline-flex min-w-0 items-center gap-2 text-[16px] font-bold tracking-[-0.035em] sm:gap-3 sm:text-[22px]"
              style={{ color: "var(--heading)" }}
              aria-label={`${site.name} — home`}
            >
              <BrandMark className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-105 sm:h-7 sm:w-7" />
              <span className="truncate">{site.name}</span>
            </Link>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
              <ThemeToggle />

              <span
                aria-hidden="true"
                className="h-4 w-px bg-zinc-200 dark:bg-zinc-700"
              />

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="site-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="inline-flex shrink-0 items-center gap-2 rounded-md px-1.5 py-1 text-[13px] font-normal transition-opacity hover:opacity-70 sm:gap-3 sm:px-2 sm:text-[14.5px]"
                style={{ color: "var(--heading)" }}
              >
                <span
                  className="relative flex h-3.5 w-4 flex-col justify-center gap-[4px] sm:w-5"
                  aria-hidden="true"
                >
                  <span
                    className={cx(
                      "block h-[1.5px] w-full transition-transform duration-200",
                      open && "translate-y-[2.75px] rotate-45",
                    )}
                    style={{ backgroundColor: "var(--heading)" }}
                  />
                  <span
                    className={cx(
                      "block h-[1.5px] w-full transition-transform duration-200",
                      open && "-translate-y-[2.75px] -rotate-45",
                    )}
                    style={{ backgroundColor: "var(--heading)" }}
                  />
                </span>
                <span>{open ? "Close" : "Menu"}</span>
              </button>
            </div>
          </div>

          {/* Right Floating Split Button: [ Get in touch ][ ↘ ] */}
          <Link
            to="/contact"
            className="pointer-events-auto group inline-flex shrink-0 items-stretch overflow-hidden rounded-xl border border-transparent transition-transform duration-150 hover:-translate-y-0.5 dark:border-line"
            style={{
              boxShadow: "var(--pill-shadow)",
            }}
          >
            <span
              className="inline-flex items-center px-3.5 py-2.5 text-[12.5px] font-medium sm:px-7 sm:py-4 sm:text-[15px]"
              style={{ backgroundColor: "#001aff", color: "#ffffff" }}
            >
              Get in touch
            </span>
            <span
              className="hidden items-center justify-center px-3 min-[390px]:inline-flex sm:px-4.5"
              style={{
                backgroundColor: "var(--surface)",
                color: "var(--heading)",
              }}
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 14 14"
                fill="none"
                className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5 sm:h-3.5 sm:w-3.5"
              >
                <path
                  d="M3 3L11 11M11 11V4.5M11 11H4.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>

        {/* Architectural Menu Drawer when `= Menu` is clicked */}
        {open ? (
          <div
            id="site-menu"
            className="pointer-events-auto mt-2.5 max-h-[calc(100dvh-88px)] overflow-y-auto overscroll-contain rounded-2xl border border-line bg-surface p-5 sm:mt-3 sm:max-h-[calc(100dvh-110px)] sm:p-8"
            style={{
              boxShadow: "0 24px 48px -12px rgba(9, 13, 22, 0.22)",
            }}
          >
            <div className="grid gap-7 md:grid-cols-3 lg:gap-12">
              {/* Column 1: Pages */}
              <nav aria-label="Main navigation">
                <p className="text-xs font-medium text-muted">Pages</p>
                <ul className="mt-2.5 divide-y divide-line border-y border-line sm:mt-3">
                  {navLinks.map((link, idx) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        end={link.to === "/"}
                        className={({ isActive }) =>
                          cx(
                            "flex items-center justify-between py-3 text-[15px] transition-colors",
                            isActive
                              ? "font-bold text-accent-text"
                              : "font-medium text-heading hover:text-accent-text",
                          )
                        }
                      >
                        <span>{link.label}</span>
                        <span className="font-mono text-xs text-muted">
                          0{idx + 1}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Column 2: Case studies */}
              <div>
                <p className="text-xs font-medium text-muted">
                  Selected projects
                </p>
                <ul className="mt-2.5 divide-y divide-line border-y border-line sm:mt-3">
                  {projects.map((project) => (
                    <li key={project.slug}>
                      <Link
                        to={`/projects/${project.slug}`}
                        className="group flex items-center justify-between gap-2 py-3 text-sm transition-colors"
                      >
                        <span className="font-medium text-heading group-hover:text-accent-text">
                          {project.name}
                        </span>
                        <span className="shrink-0 font-mono text-[11px] text-muted">
                          {project.category}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Direct contact & CV */}
              <div
                className="flex flex-col justify-between rounded-xl border border-transparent p-5 sm:p-6 dark:border-line"
                style={{ backgroundColor: "var(--dark-card)", color: "#ffffff" }}
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-400">
                    Direct contact
                  </p>
                  <p className="mt-2 text-lg font-bold tracking-[-0.02em] text-white">
                    {site.name}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    {site.role} · {site.specialty} · {site.focus}
                  </p>
                  <div className="mt-4 space-y-1.5 text-sm text-zinc-300">
                    <p className="break-all">
                      <a
                        href={`mailto:${site.email}`}
                        className="hover:text-white"
                      >
                        {site.email}
                      </a>
                    </p>
                    <p>
                      <a href={site.phoneHref} className="hover:text-white">
                        {site.phoneDisplay}
                      </a>
                    </p>
                    <p className="text-zinc-500">{site.location}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-white"
                    style={{ backgroundColor: "#001aff" }}
                  >
                    Get in touch →
                  </Link>
                  <a
                    href={site.cvPath}
                    download
                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10"
                  >
                    Download CV
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
