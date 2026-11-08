import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { INDUSTRY_ENGINEERING_PRINCIPLES } from "@/lib/industries-data";

export function IndustriesApproach() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-limestone/50 border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-petrol/5 border border-petrol/15 text-petrol text-xs font-mono font-bold tracking-wider uppercase">
              <span>Our Engineering Approach</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-graphite leading-tight">
              Industry knowledge meets thoughtful engineering.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed">
              We approach each industry with humility and rigorous inquiry: learning the constraints, identifying the actual point of failure, and engineering purpose-built software.
            </p>
          </ScrollReveal>
        </div>

        {/* 5 Principles Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {INDUSTRY_ENGINEERING_PRINCIPLES.map((principle, idx) => {
            const isFeatured = idx === 0 || idx === 4;

            return (
              <ScrollReveal
                key={principle.number}
                direction="up"
                delay={0.06 * (idx + 1)}
              >
                <div
                  className={`h-full p-6 sm:p-8 rounded-2xl border transition-all flex flex-col justify-between group ${
                    isFeatured
                      ? "bg-pure-white border-petrol/30 shadow-xs"
                      : "bg-pure-white border-graphite/10 shadow-xs"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-copper font-bold text-lg font-mono">
                        {principle.number}
                      </span>
                      <span className="text-graphite-muted/50 text-[10px] uppercase tracking-wider">
                        PRINCIPLE
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-graphite group-hover:text-petrol transition-colors">
                      {principle.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed">
                      {principle.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-graphite/10 text-[11px] font-mono text-petrol/80 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-copper" />
                    <span>Disciplined Method</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

