"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextRepel } from "@/components/ui/text-repel";

export function IndustriesHero() {
  return (
    <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden bg-limestone border-b border-graphite/10">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-grid-petrol opacity-20 pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Eyebrow Label */}
          <ScrollReveal direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-petrol/5 border border-petrol/15 text-petrol text-xs font-mono font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-copper" />
              <span>ORBION TECHNOLOGIES / INDUSTRIES</span>
            </div>
          </ScrollReveal>

          {/* Main Headline with Text Repel */}
          <ScrollReveal direction="up" delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-graphite leading-[1.1]">
              <TextRepel text="Technology for industries moving forward." />
            </h1>
          </ScrollReveal>

          {/* Supporting Description */}
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-lg sm:text-xl text-graphite-muted leading-relaxed max-w-3xl mx-auto font-normal">
              Every industry has its own challenges, workflows, and opportunities. At Orbion Technologies, we explore how software engineering, intelligent systems, and automation can help businesses adapt and build for what&apos;s next.
            </p>
          </ScrollReveal>

          {/* Additional Statement Box */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="pt-2">
              <div className="inline-block p-4 sm:p-5 rounded-2xl bg-pure-white border border-graphite/10 shadow-xs max-w-2xl mx-auto">
                <p className="text-xs sm:text-sm font-mono text-graphite font-semibold text-center">
                  &ldquo;Different industries. Different challenges. One commitment to thoughtful engineering.&rdquo;
                </p>
                <div className="pt-2 flex items-center justify-center gap-3 text-[11px] font-mono text-graphite-muted">
                  <span className="text-copper font-medium">8 Targeted Sectors</span>
                  <span>&bull;</span>
                  <span>Real-World Grounding</span>
                  <span>&bull;</span>
                  <span className="text-petrol font-medium">Zero Fabricated Claims</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

