import React from "react";
import { Container } from "@/components/ui/Container";
import { TextRepel } from "@/components/ui/text-repel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutMotto() {
  return (
    <section
      id="motto"
      className="py-24 sm:py-32 lg:py-40 bg-limestone-light relative overflow-hidden border-b border-graphite/10"
    >
      {/* Subtle Grid Accent */}
      <div className="absolute inset-0 bg-grid-subtle opacity-60 pointer-events-none" />

      <Container size="narrow">
        <div className="relative z-10 text-center space-y-8 sm:space-y-10">
          {/* Eyebrow Label */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pure-white border border-graphite/15 text-xs font-mono tracking-widest uppercase text-copper shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-copper" />
              <span>Section 03 &bull; Company Motto</span>
            </div>
          </ScrollReveal>

          {/* Large Typographic Motto with TextRepel */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="py-2">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-copper leading-[1.08]">
                <TextRepel
                  text="Engineering What's Next."
                  className="justify-center text-center"
                />
              </h2>
            </div>
          </ScrollReveal>

          {/* Supporting Copy */}
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-lg sm:text-xl lg:text-2xl text-graphite-muted font-normal leading-relaxed max-w-2xl mx-auto">
              Not simply following what technology can do today, but exploring what it can become tomorrow. We believe in thoughtful engineering, ambitious ideas, and the discipline to turn possibilities into reality.
            </p>
          </ScrollReveal>

          {/* Architectural Framing Accents */}
          <ScrollReveal direction="up" delay={0.35}>
            <div className="pt-8 flex items-center justify-center gap-6 text-xs font-mono text-graphite-muted/70">
              <span>EXPLORATION</span>
              <span>&bull;</span>
              <span>AMBITION</span>
              <span>&bull;</span>
              <span>DISCIPLINE</span>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

