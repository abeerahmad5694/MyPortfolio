import type { ReactNode } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line">
      <Container className="py-10 sm:py-14">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-2.5 max-w-3xl text-2xl font-semibold tracking-tight text-heading sm:text-3xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-3.5 max-w-2xl text-[15px] leading-relaxed text-body sm:text-base">
              {description}
            </p>
          ) : null}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
