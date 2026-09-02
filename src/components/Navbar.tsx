import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navLinks, site } from "../data/site";
import { cx } from "../lib/cx";
import { ButtonLink } from "./Button";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";
import { IconClose, IconMenu } from "./icons";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close the mobile menu with the Escape key.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            to="/"
            className="text-[17px] font-semibold tracking-tight text-heading"
            aria-label={`${site.name} — home`}
          >
            Abeer Ahmad<span className="text-accent">.</span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      cx(
                        "relative py-5 text-sm transition-colors",
                        isActive
                          ? "font-medium text-heading after:absolute after:inset-x-0 after:bottom-[-1px] after:h-0.5 after:bg-accent"
                          : "text-muted hover:text-heading",
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <ButtonLink to="/contact" size="sm">
              Let&rsquo;s Work Together
            </ButtonLink>
          </div>

          <div className="flex items-center gap-1.5 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-body transition-colors hover:bg-subtle hover:text-heading"
            >
              {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </Container>

      {open ? (
        <div id="mobile-menu" className="border-t border-line bg-canvas lg:hidden">
          <Container className="pb-6 pt-2">
            <nav aria-label="Mobile">
              <ul>
                {navLinks.map((link) => (
                  <li key={link.to} className="border-b border-line/60 last:border-b-0">
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      className={({ isActive }) =>
                        cx(
                          "block py-3.5 text-[15px] transition-colors",
                          isActive ? "font-medium text-heading" : "text-body",
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-5">
              <ButtonLink to="/contact" className="w-full">
                Let&rsquo;s Work Together
              </ButtonLink>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
