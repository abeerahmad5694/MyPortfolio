import { Link } from "react-router-dom";
import { navLinks, site } from "../data/site";
import { Container } from "./Container";
import { IconMail, IconMapPin } from "./icons";
import { SocialIconLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-black/40">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="text-[17px] font-semibold tracking-tight text-white">
              {site.name}
              <span className="text-blue-400">.</span>
            </p>
            <p className="mt-1 text-sm">
              {site.role} — Django &amp; Flutter
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm">
              <IconMapPin className="h-4 w-4 text-slate-500" />
              {site.location}
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm">
              <IconMail className="h-4 w-4 text-slate-500" />
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-white"
              >
                {site.email}
              </a>
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Pages
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Elsewhere
            </p>
            <div className="mt-4">
              <SocialIconLinks />
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {site.githubLabel}
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {site.linkedinLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-slate-800/70 pt-6 text-sm sm:flex-row">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <p>{site.location}</p>
        </div>
      </Container>
    </footer>
  );
}
