import type { ReactNode } from "react";
import { Container } from "./Container";
import { PartnerBadge } from "./BrandGraphics";
import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  highlight,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section
      className="relative overflow-hidden border-b border-zinc-200 pt-28 pb-14 sm:pt-36 sm:pb-16"
      style={{ backgroundColor: "#f3f4f6", color: "#090d16" }}
    >
      <Container className="relative">
        <Reveal>
          <PartnerBadge label={eyebrow} tag="Abeer Ahmad" />
          <h1
            className="mt-6 max-w-3xl text-[2.25rem] font-bold leading-[1.06] tracking-[-0.04em] sm:text-5xl lg:text-[3.5rem]"
            style={{ color: "#090d16" }}
          >
            {title}
            {highlight ? (
              <>
                {" "}
                <span style={{ color: "#001aff" }}>{highlight}</span>
              </>
            ) : null}
          </h1>
          {description ? (
            <p
              className="mt-5 max-w-2xl text-[16px] leading-[1.58] sm:text-[18px]"
              style={{ color: "#27272a" }}
            >
              {description}
            </p>
          ) : null}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
