"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextRepel } from "@/components/ui/text-repel";

export function ServicesHero() {
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
              <span>ORBION TECHNOLOGIES / SERVICES</span>
            </div>
          </ScrollReveal>

          {/* Main Headline with Text Repel */}
          <ScrollReveal direction="up" delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-graphite leading-[1.1]">
              <TextRepel text="We turn ideas into engineered solutions." />
            </h1>
          </ScrollReveal>

          {/* Supporting Description */}
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-lg sm:text-xl text-graphite-muted leading-relaxed max-w-3xl mx-auto font-normal">
              From digital experiences and custom software to intelligent applications and workflow automation, we help businesses transform ideas and requirements into purposeful technology.
            </p>
          </ScrollReveal>

          {/* Secondary Statement & Engineering Callout */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="pt-2">
              <div className="inline-block p-4 sm:p-5 rounded-2xl bg-pure-white border border-graphite/10 shadow-xs max-w-2xl mx-auto">
                <p className="text-sm sm:text-base font-medium text-graphite">
                  Thoughtful engineering. Practical technology. Solutions built around real needs.
                </p>
                <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-graphite-muted">
                  <span className="text-copper font-semibold">Web & E-Commerce</span>
                  <span className="text-graphite-muted/40">&bull;</span>
                  <span className="text-petrol font-semibold">Custom Software</span>
                  <span className="text-graphite-muted/40">&bull;</span>
                  <span className="text-copper font-semibold">AI Integration</span>
                  <span className="text-graphite-muted/40">&bull;</span>
                  <span className="text-petrol font-semibold">Automation</span>
                  <span className="text-graphite-muted/40">&bull;</span>
                  <span className="text-copper font-semibold">UI/UX</span>
                  <span className="text-graphite-muted/40">&bull;</span>
                  <span className="text-petrol font-semibold">APIs</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Action CTAs */}
          <ScrollReveal direction="up" delay={0.25}>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Button href="/#contact" variant="petrol" size="lg">
                Start a Project &rarr;
              </Button>
              <Button href="#our-services" variant="outline" size="lg">
                Explore Our Services
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

