import React from "react";
import { Container } from "@/components/ui/Container";

export function Introduction() {
  return (
    <section id="about" className="py-20 sm:py-28 lg:py-36 bg-limestone/30 border-b border-graphite/10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Core Thesis */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-copper block">
              Editorial Thesis
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-graphite leading-tight">
              Technology with a purpose.
            </h2>
            <div className="h-1 w-16 bg-petrol rounded-full" />
            <p className="text-lg text-graphite font-medium leading-snug pt-2">
              The next generation of organizations will not rely solely on static software that waits for manual input. They will operate alongside intelligent systems engineered to reason, coordinate, and execute.
            </p>
          </div>

          {/* Right Column: In-Depth Perspective */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-graphite-muted leading-relaxed">
            <p>
              Orbion Technologies is an early-stage technology and deep-tech startup founded on a straightforward observation: modern organizations are overwhelmed by fragmented software, manual data handoffs, and brittle workflows. Adding another isolated chat interface does not solve the underlying operational friction.
            </p>
            <p>
              We focus on the disciplined convergence of <strong className="text-graphite font-semibold">software engineering</strong>, <strong className="text-graphite font-semibold">artificial intelligence</strong>, and <strong className="text-graphite font-semibold">workflow automation</strong>. Our objective is to build foundational systems that connect isolated applications, maintain persistent context, and execute multi-step procedures with measurable accuracy.
            </p>

            {/* Three Foundational Tenets */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-graphite/15 text-sm">
              <div className="space-y-1.5">
                <span className="font-mono text-xs text-petrol font-semibold block">01 / DISCIPLINE</span>
                <p className="text-graphite font-medium">Systems Over Hype</p>
                <p className="text-xs text-graphite-muted leading-normal">
                  Prioritizing deterministic execution, reproducible code, and reliable state over superficial generative demos.
                </p>
              </div>
              <div className="space-y-1.5">
                <span className="font-mono text-xs text-petrol font-semibold block">02 / INTEROPERABILITY</span>
                <p className="text-graphite font-medium">Protocol-Driven</p>
                <p className="text-xs text-graphite-muted leading-normal">
                  Embracing open standards such as the Model Context Protocol (MCP) to avoid proprietary software vendor lock-in.
                </p>
              </div>
              <div className="space-y-1.5">
                <span className="font-mono text-xs text-petrol font-semibold block">03 / SUBSTRATE</span>
                <p className="text-graphite font-medium">Autonomous OS</p>
                <p className="text-xs text-graphite-muted leading-normal">
                  Engineering the background scheduler, context compaction, and security boundaries needed for intelligent agents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

