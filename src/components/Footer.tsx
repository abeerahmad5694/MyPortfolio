import { Link } from "react-router-dom";
import { navLinks, site } from "../data/site";
import { BrandMark, PartnerBadge } from "./BrandGraphics";
import { Container } from "./Container";
import { IconArrowUpRight, IconDownload, IconMail, IconMapPin, IconPhone } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-line bg-subtle">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.1fr]">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 text-[18px] font-bold tracking-[-0.03em] text-heading"
            >
              <BrandMark className="h-5 w-5" />
              <span>
                {site.name}
                <span className="text-accent">.</span>
              </span>
            </Link>
            <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-body">
              {site.role} specializing in {site.specialty}, {site.focus}, REST APIs,
              and ongoing production support.
            </p>
            <div className="mt-4">
              <PartnerBadge label={site.role} tag={site.focus} />
            </div>
            <ul className="mt-5 space-y-2 text-[13px] text-body">
              <li className="flex items-center gap-2">
                <IconMapPin className="h-4 w-4 shrink-0 text-accent-text" />
                {site.location}
              </li>
              <li className="flex items-center gap-2">
                <IconMail className="h-4 w-4 shrink-0 text-accent-text" />
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-heading transition-colors hover:text-accent-text"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <IconPhone className="h-4 w-4 shrink-0 text-accent-text" />
                <a
                  href={site.phoneHref}
                  className="font-medium text-heading transition-colors hover:text-accent-text"
                >
                  {site.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer navigation">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              Navigation
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-medium text-body transition-colors hover:text-accent-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              Systems &amp; Work
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to="/projects/retail-erp-systems"
                  className="text-body transition-colors hover:text-accent-text"
                >
                  Retail ERP Systems
                </Link>
              </li>
              <li>
                <Link
                  to="/projects/pos-systems"
                  className="text-body transition-colors hover:text-accent-text"
                >
                  Real-Time POS Systems
                </Link>
              </li>
              <li>
                <Link
                  to="/projects/on-demand-services-app"
                  className="text-body transition-colors hover:text-accent-text"
                >
                  On-Demand Services App
                </Link>
              </li>
              <li>
                <Link
                  to="/projects/food-delivery-app"
                  className="text-body transition-colors hover:text-accent-text"
                >
                  Food Delivery Platform
                </Link>
              </li>
              <li>
                <Link
                  to="/projects/face-recognition-attendance"
                  className="text-body transition-colors hover:text-accent-text"
                >
                  Face Recognition Attendance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              Profiles &amp; CV
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-body transition-colors hover:text-accent-text"
                >
                  GitHub
                  <IconArrowUpRight className="h-3.5 w-3.5 text-muted" />
                </a>
                <p className="font-mono text-[11px] text-muted">{site.githubLabel}</p>
              </li>
              <li className="pt-1">
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-body transition-colors hover:text-accent-text"
                >
                  LinkedIn
                  <IconArrowUpRight className="h-3.5 w-3.5 text-muted" />
                </a>
                <p className="font-mono text-[11px] text-muted">{site.linkedinLabel}</p>
              </li>
              <li className="pt-2">
                <a
                  href={site.cvPath}
                  download
                  className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3.5 py-2 text-xs font-semibold text-heading transition-colors hover:border-line-strong"
                >
                  <IconDownload className="h-3.5 w-3.5 text-accent-text" />
                  Download CV (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>© 2026 {site.name}. Built for reliability and speed.</p>
          <p className="flex items-center gap-2 font-mono text-[11px]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Available for projects &amp; ongoing support · {site.location}
          </p>
        </div>
      </Container>
    </footer>
  );
}
