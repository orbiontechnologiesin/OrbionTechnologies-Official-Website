import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ProductOverview({
  overview,
  productName,
}: {
  overview: {
    context: string[];
    envisagedSolution: string;
  };
  productName: string;
}) {
  return (
    <section className="py-20 lg:py-28 bg-pure-white border-b border-graphite/10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Section Indicator */}
          <div className="lg:col-span-4">
            <ScrollReveal direction="up">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-petrol/5 border border-petrol/15 text-petrol text-xs font-mono font-bold tracking-wider uppercase">
                  <span>Product Overview</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-graphite tracking-tight leading-tight">
                  Why we are building {productName}.
                </h2>
                <p className="text-sm font-mono text-graphite-muted leading-relaxed">
                  Understanding everyday operational friction before writing code.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Context & Solution Narrative */}
          <div className="lg:col-span-8 space-y-8">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="space-y-5 text-base sm:text-lg text-graphite-muted leading-relaxed">
                {overview.context.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </ScrollReveal>

            {/* Envisaged Solution Callout Box */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="p-6 sm:p-8 rounded-2xl bg-limestone-light border border-copper/30 relative overflow-hidden space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-copper">
                  <span className="w-2 h-2 rounded-full bg-copper" />
                  <span>The Envisioned Solution</span>
                </div>
                <p className="text-base sm:text-lg font-medium text-graphite leading-relaxed">
                  {overview.envisagedSolution}
                </p>
                <div className="pt-2 text-[11px] font-mono text-graphite-muted">
                  ARCHITECTURAL DIRECTION &bull; SUBJECT TO REFINEMENT
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

