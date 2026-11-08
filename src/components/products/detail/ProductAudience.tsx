import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface AudienceItem {
  title: string;
  description: string;
}

export function ProductAudience({
  audiences,
  disclaimer,
  productName,
}: {
  audiences: AudienceItem[];
  disclaimer: string;
  productName: string;
}) {
  return (
    <section className="py-20 lg:py-28 bg-pure-white border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-4">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage/20 border border-sage/40 text-petrol text-xs font-mono font-bold tracking-wider uppercase">
              <span>Target Audiences</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-graphite tracking-tight">
              Who {productName} is designed for.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-sm sm:text-base text-graphite-muted leading-relaxed">
              Tailored around the specific operational profiles and team workflows that benefit most from structured automation.
            </p>
          </ScrollReveal>
        </div>

        {/* Audience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {audiences.map((aud, idx) => (
            <ScrollReveal key={aud.title} direction="up" delay={0.05 * (idx + 1)}>
              <div className="p-6 rounded-2xl bg-limestone-light/70 border border-graphite/10 hover:border-petrol/30 transition-all flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="text-xs font-mono font-bold text-petrol uppercase tracking-wider">
                    TARGET PROFILE 0{idx + 1}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-graphite">
                    {aud.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed">
                    {aud.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mandatory Transparency Disclaimer */}
        <ScrollReveal direction="up" delay={0.25}>
          <div className="p-4 rounded-xl bg-copper/5 border border-copper/20 flex items-start gap-3 text-xs font-mono text-graphite-muted">
            <span className="text-copper font-bold text-sm leading-none">&bull;</span>
            <p className="leading-relaxed">
              <strong className="text-graphite font-semibold">Transparency Note: </strong>
              {disclaimer}
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

