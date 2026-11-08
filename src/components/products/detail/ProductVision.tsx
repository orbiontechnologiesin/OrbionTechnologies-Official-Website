import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ProductVision({
  vision,
  productName,
}: {
  vision: {
    statement: string;
    narrative: string;
  };
  productName: string;
}) {
  return (
    <section className="py-20 lg:py-28 bg-limestone border-b border-graphite/10 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-grid-petrol opacity-20 pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-petrol/5 border border-petrol/15 text-petrol text-xs font-mono font-bold tracking-wider uppercase">
              <span>Product Vision</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-bold text-graphite tracking-tight leading-snug">
              &ldquo;{vision.statement}&rdquo;
            </blockquote>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed">
              {vision.narrative}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="pt-4 flex items-center justify-center gap-3 text-xs font-mono text-graphite-muted">
              <span>{productName}</span>
              <span>&bull;</span>
              <span className="text-copper font-medium">Orbion Technologies Product Ecosystem</span>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

