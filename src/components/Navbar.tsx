import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navLinks, site } from "../data/site";
import { projects } from "../data/projects";
import { cx } from "../lib/cx";
import { BrandMark } from "./BrandGraphics";
import { Container } from "./Container";

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
    <header
      className="relative z-40 pt-5 pb-2 sm:pt-7"
      style={{ backgroundColor: "#f3f4f6" }}
    >
      <Container>
        <div className="flex items-center justify-between gap-4">
          {/* Left Floating White Bar: [BrandMark + Name] ... [= Menu] */}
          <div
            className="flex flex-1 items-center justify-between rounded-xl bg-white px-4 py-3 sm:max-w-[540px] sm:px-5 sm:py-3.5"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 1px 2px rgba(9, 13, 22, 0.04)",
            }}
          >
            <Link
              to="/"
              className="group inline-flex items-center gap-2.5 text-[18px] font-bold tracking-[-0.03em] sm:text-[20px]"
              style={{ color: "#090d16" }}
              aria-label={`${site.name} — home`}
            >
              <BrandMark className="h-6 w-6 shrink-0 transition-transform duration-200 group-hover:scale-105" />
              <span>{site.name}</span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex items-center gap-2.5 rounded-md px-2 py-1 text-[14px] font-normal transition-opacity hover:opacity-70"
              style={{ color: "#090d16" }}
            >
              <span
                className="relative flex h-3.5 w-5 flex-col justify-center gap-[4px]"
                aria-hidden="true"
              >
                <span
                  className={cx(
                    "block h-[1.5px] w-5 transition-transform duration-200",
                    open && "translate-y-[2.75px] rotate-45",
                  )}
                  style={{ backgroundColor: "#090d16" }}
                />
                <span
                  className={cx(
                    "block h-[1.5px] w-5 transition-transform duration-200",
                    open && "-translate-y-[2.75px] -rotate-45",
                  )}
                  style={{ backgroundColor: "#090d16" }}
                />
              </span>
              <span>{open ? "Close" : "Menu"}</span>
            </button>
          </div>

          {/* Right Floating Split Button: [ Get in touch ][ ↘ ] */}
          <Link
            to="/contact"
            className="group inline-flex shrink-0 items-stretch overflow-hidden rounded-xl transition-transform duration-150 hover:-translate-y-0.5"
            style={{
              boxShadow: "0 1px 2px rgba(9, 13, 22, 0.06)",
            }}
          >
            <span
              className="inline-flex items-center px-4 py-3 text-[13.5px] font-medium sm:px-5 sm:py-3.5 sm:text-[14px]"
              style={{ backgroundColor: "#001aff", color: "#ffffff" }}
            >
              Get in touch
            </span>
            <span
              className="inline-flex items-center justify-center px-3.5 sm:px-4"
              style={{ backgroundColor: "#ffffff", color: "#090d16" }}
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 14 14"
                fill="none"
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
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
            className="mt-3 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 24px 48px -12px rgba(9, 13, 22, 0.14)",
            }}
          >
            <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
              {/* Column 1: Pages */}
              <nav aria-label="Main navigation">
                <p className="text-xs font-medium text-zinc-500">Pages</p>
                <ul className="mt-3 divide-y divide-zinc-200 border-y border-zinc-200">
                  {navLinks.map((link, idx) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        end={link.to === "/"}
                        className={({ isActive }) =>
                          cx(
                            "flex items-center justify-between py-3 text-[15px] transition-colors",
                            isActive
                              ? "font-bold text-[#001aff]"
                              : "font-medium text-[#090d16] hover:text-[#001aff]",
                          )
                        }
                      >
                        <span>{link.label}</span>
                        <span className="font-mono text-xs text-zinc-400">
                          0{idx + 1}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Column 2: Case studies */}
              <div>
                <p className="text-xs font-medium text-zinc-500">
                  Selected projects
                </p>
                <ul className="mt-3 divide-y divide-zinc-200 border-y border-zinc-200">
                  {projects.map((project) => (
                    <li key={project.slug}>
                      <Link
                        to={`/projects/${project.slug}`}
                        className="group flex items-center justify-between py-3 text-sm transition-colors"
                      >
                        <span className="font-medium text-[#090d16] group-hover:text-[#001aff]">
                          {project.name}
                        </span>
                        <span className="font-mono text-[11px] text-zinc-500">
                          {project.category}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Direct contact & CV */}
              <div
                className="flex flex-col justify-between rounded-xl p-6"
                style={{ backgroundColor: "#050505", color: "#ffffff" }}
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
                    <p>
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
