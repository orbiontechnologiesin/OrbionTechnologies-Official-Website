import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TECHNOLOGY_PRINCIPLES } from "@/lib/solutions-data";

export function SolutionsPhilosophy() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-pure-white border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-petrol/5 border border-petrol/15 text-petrol text-xs font-mono font-bold tracking-wider uppercase">
              <span>Engineering Philosophy</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-graphite leading-tight">
              The right technology for the right problem.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed">
              We do not believe every operational challenge requires artificial intelligence or complex autonomous systems. Our discipline is in choosing the most robust, understandable, and maintainable technology for the specific task at hand.
            </p>
          </ScrollReveal>
        </div>

        {/* 4 Technology Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {TECHNOLOGY_PRINCIPLES.map((item, idx) => (
            <ScrollReveal key={item.number} direction="up" delay={0.06 * (idx + 1)}>
              <div className="p-7 sm:p-8 rounded-2xl bg-limestone-light/70 border border-graphite/10 hover:border-petrol/30 transition-all flex flex-col justify-between h-full group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-copper font-bold text-base font-mono">
                      {item.number}
                    </span>
                    <span className="text-graphite-muted/50 text-[10px] uppercase tracking-wider">
                      PHILOSOPHY
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-graphite group-hover:text-petrol transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-graphite/10 text-[11px] font-mono text-petrol/80 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-copper" />
                  <span>Disciplined Engineering Commitment</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

