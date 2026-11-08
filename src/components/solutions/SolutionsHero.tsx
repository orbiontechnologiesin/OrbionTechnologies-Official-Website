"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextRepel } from "@/components/ui/text-repel";

export function SolutionsHero() {
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
              <span>ORBION TECHNOLOGIES / SOLUTIONS</span>
            </div>
          </ScrollReveal>

          {/* Main Headline with Text Repel */}
          <ScrollReveal direction="up" delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-graphite leading-[1.1]">
              <TextRepel text="Technology should solve something meaningful." />
            </h1>
          </ScrollReveal>

          {/* Supporting Description */}
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-lg sm:text-xl text-graphite-muted leading-relaxed max-w-3xl mx-auto font-normal">
              Every business faces challenges that slow progress, create complexity, or limit possibilities. At Orbion Technologies, we explore how thoughtful engineering, intelligent software, and automation can turn those challenges into opportunities.
            </p>
          </ScrollReveal>

          {/* Secondary Statement & Engineering Philosophy Chassis */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="pt-4">
              <div className="inline-block p-4 sm:p-5 rounded-2xl bg-pure-white border border-graphite/10 shadow-xs max-w-2xl mx-auto">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-mono text-graphite font-medium">
                  <span className="text-copper font-bold">THE PROBLEM</span>
                  <span className="text-graphite-muted/40">&rarr;</span>
                  <span className="text-petrol font-bold">OUR APPROACH</span>
                  <span className="text-graphite-muted/40">&rarr;</span>
                  <span className="text-sage-dark font-bold text-petrol">THE SOLUTION</span>
                  <span className="text-graphite-muted/40">&rarr;</span>
                  <span className="text-copper font-bold">THE OUTCOME</span>
                </div>
                <p className="pt-2 text-xs font-mono text-graphite-muted text-center">
                  &ldquo;We start with the problem. We engineer the approach. We focus on the outcome.&rdquo;
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

