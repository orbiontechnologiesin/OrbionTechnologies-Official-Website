import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { INDUSTRY_ENABLEMENT_GOALS } from "@/lib/industries-data";

export function IndustriesEnablement() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-pure-white border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage/20 border border-sage/40 text-petrol text-xs font-mono font-bold tracking-wider uppercase">
              <span>What We Aim to Enable</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-graphite leading-tight">
              Technology that creates room for progress.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed">
              We focus on building systems that reduce mechanical friction, bringing transparency and dependable structure to the businesses that power everyday life.
            </p>
          </ScrollReveal>
        </div>

        {/* 6 Enablement Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {INDUSTRY_ENABLEMENT_GOALS.map((goal, idx) => (
            <ScrollReveal key={goal.title} direction="up" delay={0.06 * (idx + 1)}>
              <div className="h-full p-6 sm:p-7 rounded-2xl bg-limestone-light/50 border border-graphite/10 hover:border-petrol/30 transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-copper font-bold text-xs uppercase tracking-wider">
                      GOAL 0{idx + 1}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-petrol/40" />
                  </div>

                  <h3 className="text-xl font-bold text-graphite group-hover:text-petrol transition-colors">
                    {goal.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed">
                    {goal.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-graphite/5 text-[11px] font-mono text-petrol/80 flex items-center gap-1.5">
                  <span className="text-copper font-bold">&#10003;</span>
                  <span>Architectural Priority</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Integrity Notice */}
        <ScrollReveal direction="up" delay={0.25}>
          <div className="p-4 sm:p-5 rounded-xl bg-copper/5 border border-copper/25 text-xs font-mono text-graphite-muted max-w-3xl mx-auto text-center leading-relaxed">
            <strong className="text-graphite font-semibold">Integrity Notice: </strong>
            These represent our architectural design goals and intended business outcomes across industry sectors. We do not manufacture speculative client counts, artificial efficiency gains, or unverified case studies.
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

