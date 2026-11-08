import React from "react";
import { Container } from "@/components/ui/Container";
import { TextRepel } from "@/components/ui/text-repel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutVision() {
  return (
    <section id="vision" className="py-20 sm:py-28 lg:py-36 bg-limestone-light">
      <Container>
        <div className="rounded-3xl bg-petrol p-8 sm:p-12 lg:p-16 text-limestone-light relative overflow-hidden shadow-2xl border border-petrol-light">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-grid-petrol opacity-30 pointer-events-none" />

          <div className="relative z-10 space-y-10 sm:space-y-12">
            {/* Header Badge */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-limestone-light/15 text-xs font-mono">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-petrol-dark/80 border border-limestone-light/15 text-sage">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                  <span>SECTION 05 &bull; ARCHITECTURAL HORIZON</span>
                </div>
                <span className="text-limestone-muted/70 tracking-wider uppercase">
                  LONG-TERM THESIS
                </span>
              </div>
            </ScrollReveal>

            {/* Vision Heading & Primary Statement */}
            <div className="max-w-4xl space-y-6">
              <ScrollReveal direction="up" delay={0.15}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-pure-white leading-tight">
                  Our Vision
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.2}>
                <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-sage tracking-tight leading-snug">
                  &ldquo;To shape a future where intelligent systems work together seamlessly, enabling businesses to operate, adapt, and innovate beyond traditional limitations.&rdquo;
                </p>
              </ScrollReveal>

              {/* Bold Typographic Visual Statement with TextRepel */}
              <ScrollReveal direction="up" delay={0.25}>
                <div className="pt-4 pb-2">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-pure-white leading-snug">
                    <TextRepel
                      text="A more intelligent way to build. A more capable way to operate."
                      className="justify-start text-left text-pure-white"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* In-Depth Explanation: The Long-Term Ambition */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-6 border-t border-limestone-light/15 text-sm sm:text-base text-limestone-muted leading-relaxed">
              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-base font-semibold text-pure-white font-mono uppercase tracking-wider">
                  Beyond Isolated Chat Interfaces
                </h3>
                <p>
                  We believe artificial intelligence will not remain confined to standalone chatbots or disconnected productivity tools. The next generational leap in enterprise software lies in connected systems—where intelligent agents collaborate with human experts, maintain context across multi-step processes, and execute complex workflows without manual supervision.
                </p>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-base font-semibold text-copper font-mono uppercase tracking-wider">
                  The AI Operating System Horizon
                </h3>
                <p>
                  Orbion Technologies is orienting its long-term engineering toward an integrated AI Operating System for modern businesses. This envisioned substrate will unify autonomous agent loops, model context protocols, deterministic schema validation, and enterprise software infrastructure into an orchestrated computational fabric.
                </p>
              </div>
            </div>

            {/* Architectural Grounding Disclaimer */}
            <ScrollReveal direction="up" delay={0.35}>
              <div className="p-4 sm:p-5 rounded-xl bg-petrol-dark/70 border border-limestone-light/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-limestone-muted/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-copper" />
                  <span>ROADMAP CLARITY: Long-term engineering ambition &bull; Currently in active exploratory development</span>
                </div>
                <span className="text-copper font-semibold">STAGE: RESEARCH &amp; ARCHITECTURE</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

