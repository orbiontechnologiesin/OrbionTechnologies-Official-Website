import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { FeatureItem } from "@/lib/product-detail-data";

export function ProductFeatures({
  features,
  productName,
}: {
  features: FeatureItem[];
  productName: string;
}) {
  return (
    <section className="py-20 lg:py-28 bg-limestone-light border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-4">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-petrol/5 border border-petrol/15 text-petrol text-xs font-mono font-bold tracking-wider uppercase">
              <span>Planned Capabilities</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-graphite tracking-tight">
              Planned features for {productName}.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-sm sm:text-base text-graphite-muted leading-relaxed">
              Every planned feature is architected to eliminate manual friction and bring predictability to everyday operations.
            </p>
          </ScrollReveal>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feat, idx) => (
            <ScrollReveal key={feat.number} direction="up" delay={0.05 * (idx + 1)}>
              <div className="h-full p-6 sm:p-7 rounded-2xl bg-pure-white border border-graphite/10 shadow-xs hover:border-copper/40 hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-copper font-bold text-base font-mono">
                      {feat.number}
                    </span>
                    <span className="text-graphite-muted/50 text-[10px] uppercase tracking-wider">
                      SPECIFICATION
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-graphite group-hover:text-petrol transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-graphite/5 text-[11px] font-mono text-petrol/70 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-petrol/40" />
                  <span>PLANNED SUBSYSTEM</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Technical Evolution Disclaimer */}
        <ScrollReveal direction="up" delay={0.25}>
          <div className="p-4 rounded-xl bg-pure-white border border-graphite/10 text-xs font-mono text-graphite-muted text-center">
            Feature set reflects current architectural specifications and is subject to evolution during active prototyping.
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

