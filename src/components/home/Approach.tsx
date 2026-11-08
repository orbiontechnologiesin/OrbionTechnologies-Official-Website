import React from "react";
import { Container } from "@/components/ui/Container";
import { APPROACH_STEPS } from "@/lib/constants";

export function Approach() {
  return (
    <section id="approach" className="py-20 sm:py-28 lg:py-36 bg-petrol text-limestone-light relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-petrol opacity-30 pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl space-y-4 mb-16 lg:mb-20">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-sage block">
            Methodology & Standards
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-pure-white">
            Built with intention.
          </h2>
          <p className="text-base sm:text-lg text-limestone-muted leading-relaxed">
            We avoid quick shortcuts and cosmetic demos. Every system we design follows a disciplined engineering progression grounded in real utility.
          </p>
        </div>

        {/* 4-Step Sequential Editorial Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
          {APPROACH_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative p-6 sm:p-7 rounded-xl bg-petrol-surface/80 border border-limestone-light/10 flex flex-col justify-between space-y-6 transition-all duration-200 hover:border-sage/40"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-mono font-bold text-copper">
                    {step.step}
                  </span>
                  <span className="text-[11px] font-mono uppercase text-limestone-muted/60 tracking-wider">
                    PHASE {idx + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-pure-white tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-limestone-muted leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-limestone-light/10 text-[11px] font-mono text-sage/90 flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-sage" />
                <span>Deterministic Execution</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

