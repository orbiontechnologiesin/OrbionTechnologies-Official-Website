"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextRepel } from "@/components/ui/text-repel";

export function SolutionsClosingCTA() {
  return (
    <section className="py-24 sm:py-32 bg-pure-white border-b border-graphite/10 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-petrol opacity-20 pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Eyebrow */}
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-copper/10 border border-copper/20 text-copper text-xs font-mono font-bold tracking-wider uppercase">
              <span>Start the Dialogue</span>
            </div>
          </ScrollReveal>

          {/* Headline with Text Repel */}
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-graphite leading-[1.12]">
              <TextRepel text="Let's solve something meaningful." />
            </h2>
          </ScrollReveal>

          {/* Supporting Copy */}
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed max-w-2xl mx-auto">
              Every meaningful digital solution starts with understanding a real challenge. Tell us what you&apos;re trying to improve, and let&apos;s explore the right way to approach it.
            </p>
          </ScrollReveal>

          {/* Action Chassis */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-petrol text-pure-white text-xs font-mono font-semibold tracking-wider uppercase hover:bg-petrol-dark transition-colors shadow-xs"
              >
                Talk to Orbion
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-pure-white text-graphite border border-graphite/20 text-xs font-mono font-semibold tracking-wider uppercase hover:border-petrol/40 hover:text-petrol transition-colors"
              >
                Explore Upcoming Products &rarr;
              </Link>
            </div>
          </ScrollReveal>

          {/* Company Motto */}
          <ScrollReveal direction="up" delay={0.25}>
            <div className="pt-8 border-t border-graphite/10 max-w-sm mx-auto">
              <span className="text-xs font-mono tracking-widest uppercase text-copper font-bold block">
                Engineering What&apos;s Next.
              </span>
              <span className="text-[11px] font-mono text-graphite-muted block mt-1">
                Orbion Technologies &bull; Deep-Tech &amp; Intelligent Software
              </span>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

