import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { PageHeader } from "../components/PageHeader";
import { ServiceCard } from "../components/ServiceCard";
import { TechChips } from "../components/TechChips";
import { CtaSection } from "../components/CtaSection";
import { usePageMeta } from "../hooks/usePageMeta";
import { services } from "../data/services";

export function ServicesPage() {
  usePageMeta(
    "Services | Abeer Ahmad",
    "Django web applications, ERP and POS development, Flutter mobile apps, REST APIs, Stripe payment integration, and ongoing maintenance.",
  );

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What I can build for you"
        description="Based on the systems I’ve built and maintained for real clients — from retail ERP platforms to mobile apps published on both app stores."
      />

      {/* Header image band */}
      <Container className="pt-9 sm:pt-10">
        <Reveal>
          <div className="img-frame">
            <img
              src="/images/code-dark.jpg"
              alt="Close-up of source code on a dark screen"
              loading="lazy"
              decoding="async"
              className="aspect-[21/8]"
            />
          </div>
        </Reveal>
      </Container>

      <section>
        <Container className="py-12 sm:py-14">
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((service, index) => (
              <Reveal key={service.number} delay={(index % 2) * 80} className="h-full">
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div className="card mt-9 p-6 sm:p-8">
              <h2 className="text-sm font-semibold text-heading">Technologies I work with</h2>
              <TechChips
                items={[
                  "Python",
                  "Django",
                  "Flutter",
                  "PHP",
                  "MySQL",
                  "JavaScript",
                  "REST APIs",
                  "Stripe",
                  "Firebase",
                  "Git & GitHub",
                  "ESP32",
                ]}
                className="mt-4"
              />
              <p className="mt-4 text-sm leading-relaxed text-body">
                Laravel and CodeIgniter don&rsquo;t appear in my core stack, but
                I&rsquo;ve used both in client projects and I&rsquo;m comfortable
                working with existing PHP codebases.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
