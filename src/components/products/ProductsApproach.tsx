import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ProductsApproach() {
  const principles = [
    {
      num: "01",
      title: "Understand",
      tagline: "Start with real problems, customer needs, and everyday workflows.",
      description:
        "We reject technology looking for a problem. Before writing a line of product code, we dissect actual operational friction points, identifying where workflows break down and where automation provides genuine leverage.",
    },
    {
      num: "02",
      title: "Engineer",
      tagline: "Build with thoughtful architecture, simplicity, and attention to detail.",
      description:
        "We build for stability and speed. Every subsystem is designed with strict schema typing, verified runtime boundaries, and minimalist interfaces that eliminate cognitive load rather than adding complexity.",
    },
    {
      num: "03",
      title: "Improve",
      tagline: "Learn, test, refine, and continuously improve the experience.",
      description:
        "Software is never static. We establish empirical validation feedback loops, tracking real operational telemetry to systematically improve performance, user clarity, and long-term product durability.",
    },
  ];

  return (
    <section id="approach" className="py-20 sm:py-28 lg:py-36 bg-limestone/20 border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16 lg:mb-20">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-copper block">
              Section 04 &bull; Product Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-graphite mt-2">
              Built with purpose. Not just features.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed">
              We believe useful software begins with understanding real problems. Our approach is to focus on meaningful workflows, thoughtful engineering, and products that can evolve with the people who use them.
            </p>
            <div className="h-1 w-16 bg-petrol rounded-full mt-4" />
          </ScrollReveal>
        </div>

        {/* 3 Principles Architectural Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {principles.map((item, index) => (
            <ScrollReveal key={item.num} direction="up" delay={0.1 * (index + 1)}>
              <div className="h-full rounded-2xl bg-pure-white border border-graphite/10 p-8 sm:p-10 shadow-xs hover:border-petrol/30 transition-all duration-200 flex flex-col justify-between space-y-6 group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-graphite/10">
                    <span className="text-xs font-mono font-semibold text-copper">
                      PRINCIPLE {item.num}
                    </span>
                    <span className="text-[10px] font-mono text-graphite-muted/60 uppercase">
                      ORBION CRAFT
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold tracking-tight text-graphite group-hover:text-petrol transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm font-medium text-copper font-mono">
                    {item.tagline}
                  </p>

                  <p className="text-sm text-graphite-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-graphite/5 text-[11px] font-mono text-graphite-muted/60 uppercase tracking-wider">
                  Guiding Standard
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

