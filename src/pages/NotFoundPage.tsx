import { Container } from "../components/Container";
import { ButtonLink } from "../components/Button";
import { usePageMeta } from "../hooks/usePageMeta";

export function NotFoundPage() {
  usePageMeta(
    "Page Not Found | Abeer Ahmad",
    "The page you're looking for doesn't exist. Head back to the homepage or browse projects.",
  );

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_0%,var(--glow),transparent_70%)]"
      />
      <Container className="flex flex-col items-center py-24 text-center sm:py-28">
        <p className="font-mono text-sm font-medium tracking-[0.14em] text-accent-text">404</p>
        <h1 className="mt-3.5 text-2xl font-semibold tracking-tight text-heading sm:text-3xl">
          Page not found
        </h1>
        <p className="mt-3.5 max-w-md text-[15px] leading-relaxed text-body">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/" size="lg">
            Back to Home
          </ButtonLink>
          <ButtonLink to="/projects" variant="secondary" size="lg">
            View Projects
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
