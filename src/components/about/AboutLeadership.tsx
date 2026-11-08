import React from "react";
import { Container } from "@/components/ui/Container";
import { TextRepel } from "@/components/ui/text-repel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { COMPANY } from "@/lib/constants";

export function AboutLeadership() {
  return (
    <section id="leadership" className="py-20 sm:py-28 lg:py-36 bg-limestone/20 border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16 lg:mb-20">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-copper block">
              Section 07 &bull; Founding Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-graphite mt-2">
              The people behind the ambition.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed">
              Orbion Technologies is driven by a founding team united by an interest in engineering, emerging technologies, and building meaningful digital products.
            </p>
            <div className="h-1 w-16 bg-petrol rounded-full mt-4" />
          </ScrollReveal>
        </div>

        {/* Sophisticated Typography-Led Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {COMPANY.founders.map((founder, index) => (
            <ScrollReveal key={founder.name} direction="up" delay={0.1 * (index + 1)}>
              <div className="h-full rounded-2xl bg-pure-white border border-graphite/10 p-8 sm:p-10 shadow-xs flex flex-col justify-between space-y-8 transition-all duration-200 hover:border-petrol/30 hover:shadow-md group">
                <div className="space-y-6">
                  {/* Top Bar with Monogram & Organization Pill */}
                  <div className="flex items-center justify-between pb-6 border-b border-graphite/10 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-limestone-light border border-graphite/10 flex items-center justify-center font-mono font-semibold text-petrol text-sm shrink-0">
                        {founder.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-xs font-mono font-semibold tracking-wider uppercase text-petrol">
                        {founder.role}
                      </span>
                    </div>
                    <span className="hidden sm:inline-block text-xs font-mono text-graphite-muted/60 uppercase tracking-wider">
                      ORBION TECHNOLOGIES
                    </span>
                  </div>

                  {/* Name with TextRepel */}
                  <div className="space-y-1">
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-graphite">
                      <TextRepel
                        text={founder.name}
                        className="justify-start text-left"
                      />
                    </h3>
                    <p className="text-sm font-medium text-copper font-mono">
                      {founder.designation}
                    </p>
                  </div>

                  {/* Focus Description */}
                  <p className="text-sm sm:text-base text-graphite-muted leading-relaxed">
                    Directs technical planning and implementation with an emphasis on {founder.focus}.
                  </p>
                </div>

                {/* Verified Channels & Contact */}
                <div className="pt-6 border-t border-graphite/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <a
                      href={founder.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-graphite-muted hover:text-petrol transition-colors underline underline-offset-4"
                    >
                      GitHub
                    </a>
                    <span className="text-graphite/20">&bull;</span>
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-graphite-muted hover:text-petrol transition-colors underline underline-offset-4"
                    >
                      LinkedIn
                    </a>
                  </div>
                  <a
                    href={`mailto:${founder.email}`}
                    className="text-copper hover:text-copper-hover font-medium transition-colors"
                  >
                    Direct Email &rarr;
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
