import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ProblemItem {
  title: string;
  description: string;
}

export function ProductProblem({
  problems,
  productName,
}: {
  problems: ProblemItem[];
  productName: string;
}) {
  return (
    <section className="py-20 lg:py-28 bg-limestone-light border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-4">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 border border-copper/20 text-copper text-xs font-mono font-bold tracking-wider uppercase">
              <span>Operational Challenges</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-graphite tracking-tight">
              The problems {productName} is designed to solve.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-sm sm:text-base text-graphite-muted leading-relaxed">
              Every feature in our intended roadmap addresses a concrete, verifiable point of failure in current manual workflows.
            </p>
          </ScrollReveal>
        </div>

        {/* 5 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, idx) => {
            const num = (idx + 1).toString().padStart(2, "0");

            return (
              <ScrollReveal key={problem.title} direction="up" delay={0.05 * (idx + 1)}>
                <div className="h-full p-6 sm:p-7 rounded-2xl bg-pure-white border border-graphite/10 shadow-xs hover:border-petrol/30 hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-copper font-bold text-base">{num}</span>
                      <span className="text-graphite-muted/60 uppercase tracking-widest text-[10px]">
                        CHALLENGE
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-graphite group-hover:text-petrol transition-colors">
                      {problem.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed">
                      {problem.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-graphite/5 text-[11px] font-mono text-copper/80 flex items-center gap-1.5">
                    <span>&bull;</span>
                    <span>TARGETED FOR RESOLUTION</span>
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

