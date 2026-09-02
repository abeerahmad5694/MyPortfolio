import { site } from "../data/site";
import { cx } from "../lib/cx";
import { IconArrowUpRight, IconGitHub, IconLinkedIn } from "./icons";

const socials = [
  { label: "GitHub", href: site.github, icon: IconGitHub },
  { label: "LinkedIn", href: site.linkedin, icon: IconLinkedIn },
];

/** Compact text links with an external arrow — used in the hero. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cx("flex flex-wrap items-center gap-x-6 gap-y-2", className)}>
      {socials.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[13px] text-muted transition-colors hover:text-heading"
          >
            {social.label}
            <IconArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Icon-only links with accessible labels — used in the footer. */
export function SocialIconLinks({ className }: { className?: string }) {
  return (
    <ul className={cx("flex items-center gap-3", className)}>
      {socials.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${social.label} (opens in a new tab)`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <social.icon className="h-[18px] w-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Icon + label rows — used on the contact page. */
export function SocialLabeledLinks() {
  return (
    <ul className="space-y-1">
      {socials.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-md py-1.5 text-sm text-body transition-colors hover:text-accent-text"
          >
            <social.icon className="h-4 w-4 text-muted transition-colors group-hover:text-accent-text" />
            <span className="font-medium">{social.label}</span>
            <span className="truncate font-mono text-xs text-muted">
              {social.label === "GitHub" ? site.githubLabel : site.linkedinLabel}
            </span>
            <IconArrowUpRight className="h-3.5 w-3.5 text-muted transition-colors group-hover:text-accent-text" />
          </a>
        </li>
      ))}
    </ul>
  );
}
