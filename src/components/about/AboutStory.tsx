import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutStory() {
  const storyPhases = [
    {
      phase: "01",
      eyebrow: "THE OBSERVATION",
      title: "Questioning Fragmented Tools",
      description:
        "Modern organizations struggle with disconnected software, manual handoffs, and brittle automations. We saw that adding another surface-level chat wrapper does not solve fundamental workflow friction. Real progress requires rethinking how software coordinates and reasons.",
    },
    {
      phase: "02",
      eyebrow: "THE FOUNDATION",
      title: "Establishing the Engineering Laboratory",
      description:
        "Orbion Technologies was formed to unite deep software engineering with modern artificial intelligence. We approach systems from first principles: deterministic validation, persistent memory, and agentic workflows designed to execute multi-step procedures with verifiable accuracy.",
    },
    {
      phase: "03",
      eyebrow: "THE HORIZON",
      title: "Engineering What's Next",
      description:
        "We are at the beginning of this journey. Our long-term focus is to build toward an AI Operating System for modern businesses—creating software environments where intelligent systems work in concert with humans to make organizations more adaptable and capable.",
    },
  ];

  return (
    <section id="story" className="py-20 sm:py-28 lg:py-36 bg-limestone/30 border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16 lg:mb-20">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-copper block">
              Section 02 &bull; Origin &amp; Trajectory
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-graphite leading-tight mt-2">
              Every meaningful idea begins with a question.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <div className="h-1 w-16 bg-petrol rounded-full mt-4" />
          </ScrollReveal>
        </div>

        {/* Editorial Storytelling Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Deep Narrative Prose */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-graphite-muted leading-relaxed">
            <ScrollReveal direction="up" delay={0.2}>
              <p>
                Orbion Technologies began with an ambition to build technology with genuine purpose. We believe the next generation of digital innovation will come not from isolated features or superficial wrappers, but from bringing <strong className="text-graphite font-semibold">intelligence</strong>, <strong className="text-graphite font-semibold">rigorous engineering</strong>, and <strong className="text-graphite font-semibold">thoughtful systems design</strong> together.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.25}>
              <p>
                What started as an interest in building software and exploring emerging technologies is evolving into a broader ambition: engineering intelligent systems that can make businesses more capable, connected, and adaptable. We observed that modern enterprises are burdened by fragmented tools, repetitive manual handoffs, and software that merely waits for user commands without understanding organizational context.
              </p>
            </ScrollReveal>

            {/* Large Typographic Breakout Statement */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="my-8 py-6 px-6 sm:px-8 border-l-2 border-copper bg-pure-white rounded-r-xl border border-graphite/10 shadow-xs">
                <blockquote className="text-xl sm:text-2xl font-serif italic text-graphite font-normal leading-snug">
                  &ldquo;We believe software should not simply wait for manual input. It should reason, coordinate, and execute with verified precision.&rdquo;
                </blockquote>
                <cite className="block text-xs font-mono uppercase tracking-wider text-copper font-medium mt-3 not-italic">
                  The Orbion Architectural Thesis
                </cite>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.35}>
              <p>
                Rather than treating artificial intelligence as a separate experiment or an isolated novelty, we treat it as a foundational computational substrate. By combining model intelligence with deterministic runtime guardrails, strict type-safe schemas, and robust orchestration protocols, we are laying the groundwork for software that teams can trust in high-stakes environments.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <p>
                We are at the beginning of that journey. Our focus is on learning, experimenting, building, and systematically turning promising ideas into real, dependable technology. We call this pursuit <strong className="text-petrol font-semibold">Engineering What&apos;s Next</strong>.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column: Progressive Trajectory Track */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal direction="up" delay={0.25}>
              <div className="rounded-2xl bg-pure-white border border-graphite/10 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-graphite/10 text-xs font-mono">
                  <span className="text-petrol font-semibold uppercase tracking-wider">
                    Trajectory Progression
                  </span>
                  <span className="text-graphite-muted">3-STAGE HORIZON</span>
                </div>

                <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-graphite/10">
                  {storyPhases.map((item) => (
                    <div key={item.phase} className="relative pl-9 space-y-2">
                      <div className="absolute left-2 top-1 -translate-x-1/2 w-4 h-4 rounded-full bg-pure-white border-2 border-copper flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-copper" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold text-copper">
                          {item.phase}
                        </span>
                        <span className="text-graphite/30 text-xs font-mono">/</span>
                        <span className="text-xs font-mono tracking-wider text-graphite-muted uppercase">
                          {item.eyebrow}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-graphite">
                        {item.title}
                      </h3>
                      <p className="text-sm text-graphite-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Grounding Note */}
                <div className="pt-4 border-t border-graphite/10 text-xs font-mono text-graphite-muted flex items-center justify-between">
                  <span>DISCIPLINE: FIRST PRINCIPLES</span>
                  <span className="text-petrol font-semibold">HONEST ROADMAP</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
