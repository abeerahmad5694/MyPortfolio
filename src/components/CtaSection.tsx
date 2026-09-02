import { Container } from "./Container";
import { ButtonLink } from "./Button";
import { Reveal } from "./Reveal";
import { site } from "../data/site";

export function CtaSection() {
  return (
    <section className="border-t border-line bg-blue-600">
      <Container className="py-14 sm:py-16">
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-14">
            <div className="max-w-2xl">
              <h2 className="text-[1.375rem] font-semibold tracking-tight text-white sm:text-2xl">
                Have a project in mind?
              </h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-blue-100">
                Tell me what you&rsquo;re building and what you need help with. Whether
                it&rsquo;s a new system, a mobile app, or an existing one that needs
                work — I&rsquo;ll give you a straight answer.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink to="/contact" variant="accent" size="lg">
                  Get in Touch
                </ButtonLink>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center justify-center px-2 py-3 text-sm font-medium text-blue-100 transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="img-frame rotate-1 border-white/20 transition-transform duration-300 hover:rotate-0">
                <img
                  src="/images/keyboard-detail.jpg"
                  alt="Close-up of hands typing on a backlit mechanical keyboard"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
