import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { OUTCOME_PRINCIPLES } from "@/lib/solutions-data";

export function SolutionsOutcomes() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-limestone/50 border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage/20 border border-sage/40 text-petrol text-xs font-mono font-bold tracking-wider uppercase">
              <span>Intended Outcomes</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-graphite leading-tight">
              Technology is only valuable when it makes a difference.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed">
              We define success not by the volume of software shipped, but by the tangible operational order, clarity, and durability our systems introduce into everyday business life.
            </p>
          </ScrollReveal>
        </div>

        {/* 5 Outcome Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {OUTCOME_PRINCIPLES.map((principle, idx) => (
            <ScrollReveal
              key={principle.number}
              direction="up"
              delay={0.06 * (idx + 1)}
            >
              <div className="h-full p-6 sm:p-7 rounded-2xl bg-pure-white border border-graphite/10 shadow-xs hover:border-petrol/30 transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-copper font-bold text-lg font-mono">
                      {principle.number}
                    </span>
                    <span className="text-graphite-muted/50 text-[10px] uppercase tracking-wider">
                      DESIGN GOAL
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-graphite group-hover:text-petrol transition-colors">
                    {principle.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed">
                    {principle.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-graphite/5 text-[11px] font-mono text-petrol/70 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-petrol/40" />
                  <span>CORE INTENDED OUTCOME</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Integrity & Transparency Callout */}
        <ScrollReveal direction="up" delay={0.25}>
          <div className="p-4 sm:p-5 rounded-xl bg-copper/5 border border-copper/25 text-xs font-mono text-graphite-muted max-w-3xl mx-auto text-center leading-relaxed">
            <strong className="text-graphite font-semibold">Integrity Notice: </strong>
            These represent our architectural design goals and intended customer outcomes. We do not manufacture speculative percentages, guaranteed operational improvements, or unsubstantiated case studies.
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

