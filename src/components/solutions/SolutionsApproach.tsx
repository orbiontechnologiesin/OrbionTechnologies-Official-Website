import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const STAGES = [
  {
    number: "01",
    name: "Understand",
    description:
      "Identify the business challenge, understand the existing workflow, and determine where complexity or inefficiency exists.",
    details: "First-principles inquiry into root operational bottlenecks.",
  },
  {
    number: "02",
    name: "Design",
    description:
      "Explore an appropriate solution based on the business requirements, users, and intended outcomes.",
    details: "Clarity over complexity, structured user journeys.",
  },
  {
    number: "03",
    name: "Engineer",
    description:
      "Build the solution through software engineering, thoughtful architecture, automation, and appropriate technologies.",
    details: "Clean code, performance-conscious implementation.",
  },
  {
    number: "04",
    name: "Improve",
    description:
      "Test, evaluate, refine, and improve the solution based on feedback and changing needs.",
    details: "Continuous evaluation and ongoing architectural refinement.",
  },
];

export function SolutionsApproach() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-pure-white border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 border border-copper/20 text-copper text-xs font-mono font-bold tracking-wider uppercase">
              <span>Our Problem-Solving Approach</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-graphite leading-tight">
              Start with the problem. Build towards the outcome.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed">
              Every meaningful engineering solution begins with understanding the actual operational reality. We decompose complexity step by step to build systems that last.
            </p>
          </ScrollReveal>
        </div>

        {/* 4-Stage Process: Horizontal on Desktop, Vertical on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative">
          {STAGES.map((stage, idx) => (
            <ScrollReveal key={stage.number} direction="up" delay={0.08 * (idx + 1)}>
              <div className="h-full p-6 sm:p-7 rounded-2xl bg-limestone-light/70 border border-graphite/10 hover:border-petrol/30 transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-copper font-bold text-lg font-mono">
                      {stage.number}
                    </span>
                    <span className="text-graphite-muted/50 text-[10px] tracking-wider uppercase">
                      STAGE 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-graphite group-hover:text-petrol transition-colors">
                    {stage.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-graphite/10 text-[11px] font-mono text-petrol/80">
                  {stage.details}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Suggested Closing Statement */}
        <ScrollReveal direction="up" delay={0.25}>
          <div className="p-6 sm:p-8 rounded-2xl bg-petrol text-limestone-light text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-petrol opacity-30 pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-copper block">
                The Engineering Principle
              </span>
              <p className="text-lg sm:text-xl font-bold text-pure-white leading-snug">
                &ldquo;We don&apos;t begin with technology. We begin with understanding what needs to change.&rdquo;
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

