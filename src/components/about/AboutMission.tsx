import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutMission() {
  const missionPrinciples = [
    {
      num: "01",
      title: "Build technology that serves a clear purpose",
      description:
        "We reject complexity for the sake of novelty. Every system, pipeline, and architecture we develop must target real operational bottlenecks and deliver demonstrable utility.",
    },
    {
      num: "02",
      title: "Combine intelligent systems with thoughtful engineering",
      description:
        "We believe artificial intelligence achieves true enterprise value only when supported by deterministic software engineering, rigorous testing, and resilient guardrails.",
    },
    {
      num: "03",
      title: "Make complex technology practical and useful",
      description:
        "Advanced cognitive runtimes and autonomous agent workflows should simplify everyday business operations, abstracting cognitive overhead away from human operators.",
    },
    {
      num: "04",
      title: "Focus on quality, reliability, and continuous improvement",
      description:
        "We prioritize enduring architectural foundations over rushed prototypes. Reliability, low latency, and deterministic verification govern every system we ship.",
    },
    {
      num: "05",
      title: "Turn ideas into products and solutions with real value",
      description:
        "Meaningful progress is measured by practical execution. We transform emerging research and conceptual models into dependable software infrastructure.",
    },
  ];

  return (
    <section id="mission" className="py-20 sm:py-28 lg:py-36 bg-limestone/20 border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16 lg:mb-20">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-copper block">
              Section 04 &bull; Foundational Purpose
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-graphite mt-2">
              Our Mission
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <div className="h-1 w-16 bg-petrol rounded-full mt-4" />
          </ScrollReveal>
        </div>

        {/* Mission Statement Hero Box */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="rounded-2xl bg-pure-white border border-graphite/10 p-8 sm:p-12 shadow-xs mb-16 max-w-4xl">
            <span className="text-xs font-mono uppercase tracking-widest text-petrol font-semibold block mb-3">
              Mission Statement
            </span>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-graphite leading-snug">
              &ldquo;To engineer intelligent, purposeful, and reliable technology that helps businesses solve meaningful problems, simplify complexity, and unlock new possibilities.&rdquo;
            </p>
          </div>
        </ScrollReveal>

        {/* Supporting Principles: Restrained Architectural List */}
        <div className="space-y-6">
          <ScrollReveal direction="up" delay={0.25}>
            <div className="flex items-center justify-between pb-4 border-b border-graphite/10 text-xs font-mono text-graphite-muted">
              <span className="uppercase tracking-wider font-semibold text-graphite">
                Supporting Principles
              </span>
              <span>FIVE COMMITMENTS</span>
            </div>
          </ScrollReveal>

          <div className="divide-y divide-graphite/10">
            {missionPrinciples.map((item, index) => (
              <ScrollReveal key={item.num} direction="up" delay={0.1 * (index + 1)}>
                <div className="py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start group">
                  <div className="lg:col-span-1">
                    <span className="text-sm font-mono font-semibold text-copper group-hover:text-petrol transition-colors">
                      {item.num}
                    </span>
                  </div>
                  <div className="lg:col-span-5">
                    <h3 className="text-lg sm:text-xl font-semibold text-graphite group-hover:text-petrol transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-6">
                    <p className="text-sm sm:text-base text-graphite-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

