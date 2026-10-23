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
        title="What I can build"
        highlight="for you."
        description="Based on the systems I’ve built and maintained for real clients — from retail ERP platforms to mobile apps published on both app stores."
      />

      <section>
        <Container className="py-14 sm:py-18">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.number} delay={(index % 3) * 60} className="h-full">
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <div className="card mt-12 p-6 sm:p-8">
              <p className="eyebrow">Technology stack</p>
              <h2 className="mt-2.5 text-xl font-bold tracking-[-0.025em] text-heading">
                Technologies I work with
              </h2>
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
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-body">
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
