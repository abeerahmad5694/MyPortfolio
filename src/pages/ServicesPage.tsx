import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { PartnerBadge } from "../components/BrandGraphics";
import { ServiceCard } from "../components/ServiceCard";
import { TechChips } from "../components/TechChips";
import { CtaSection } from "../components/CtaSection";
import { usePageMeta } from "../hooks/usePageMeta";
import { services } from "../data/services";
import { site } from "../data/site";

export function ServicesPage() {
  usePageMeta(
    "Services | Abeer Ahmad",
    "Django web applications, ERP and POS development, Flutter mobile apps, REST APIs, Stripe payment integration, and ongoing maintenance.",
  );

  return (
    <>
      <section
        className="pt-32 pb-20 sm:pt-36 sm:pb-28"
        style={{ backgroundColor: "#f3f4f6", color: "#090d16" }}
      >
        <Container>
          {/* Centered Section Header matching image-3.png */}
          <Reveal>
            <div className="mx-auto max-w-[780px] text-center">
              <p
                className="text-[13px] font-medium"
                style={{ color: "#001aff" }}
              >
                Services &amp; Retainers
              </p>
              <h1
                className="mt-3 text-[clamp(2.35rem,4.6vw,4.1rem)] font-bold leading-[1.05] tracking-[-0.04em]"
                style={{ color: "#090d16" }}
              >
                Full-stack support for
                <br />
                your business operations
              </h1>
              <p className="mx-auto mt-5 max-w-[680px] text-[15.5px] leading-[1.6] text-zinc-600 sm:text-[16.5px]">
                Choose ongoing engineering support around the systems your
                business runs on. I also take on individual projects, including
                custom Django ERP &amp; POS builds, Flutter mobile apps, and
                Stripe integrations.
              </p>
              <p className="mx-auto mt-3 max-w-[680px] text-[15.5px] leading-[1.6] text-zinc-600 sm:text-[16.5px]">
                Explore custom retail ERP software, real-time point-of-sale
                syncing, Android &amp; iOS app store releases, and REST API
                development in {site.location}.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {services.map((service, index) => (
              <Reveal
                key={service.number}
                delay={(index % 3) * 60}
                className="h-full"
              >
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <div
              className="mt-12 rounded-2xl bg-white p-8 sm:p-10"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 1px 3px rgba(9, 13, 22, 0.04)",
              }}
            >
              <PartnerBadge label="Technology Stack" tag="Production" />
              <h2 className="mt-5 text-2xl font-bold tracking-[-0.03em] text-[#090d16]">
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
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600">
                Laravel and CodeIgniter don&rsquo;t appear in my core stack, but
                I&rsquo;ve used both in client projects and I&rsquo;m
                comfortable working with existing PHP codebases.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
