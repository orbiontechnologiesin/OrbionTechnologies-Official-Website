"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextRepel } from "@/components/ui/text-repel";

export function ContactClosingCTA() {
  const handleScrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("contact-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-petrol text-pure-white">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-grid-limestone opacity-10 pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Eyebrow */}
          <ScrollReveal direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pure-white/10 border border-pure-white/15 text-sage text-xs font-mono font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-copper" />
              <span>ENGAGE ORBION</span>
            </div>
          </ScrollReveal>

          {/* Headline with Text Repel */}
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-pure-white leading-[1.15]">
              <TextRepel text="Every great idea starts with a conversation." />
            </h2>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-limestone-light/90 leading-relaxed max-w-2xl mx-auto font-normal">
              Tell us what you&apos;re thinking. Let&apos;s explore what&apos;s possible.
            </p>
          </ScrollReveal>

          {/* Action CTAs */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Button
                href="#contact-form"
                onClick={handleScrollToForm}
                variant="primary"
                size="lg"
              >
                Start a Conversation &rarr;
              </Button>
              <Button
                href="/services"
                variant="outline"
                size="lg"
                className="border-pure-white/30 text-pure-white hover:bg-pure-white/10"
              >
                Explore Services
              </Button>
            </div>
          </ScrollReveal>

          {/* Brand Tagline */}
          <ScrollReveal direction="up" delay={0.25}>
            <div className="pt-8 text-xs font-mono tracking-widest text-sage uppercase opacity-80">
              Orbion Technologies &bull; Engineering What&apos;s Next.
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
