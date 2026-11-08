"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextRepel } from "@/components/ui/text-repel";
import { COMPANY } from "@/lib/constants";

export function ContactHero() {
  const handleScrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("contact-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

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
              <span>LET&apos;S BUILD SOMETHING MEANINGFUL</span>
            </div>
          </ScrollReveal>

          {/* Main Headline with Text Repel */}
          <ScrollReveal direction="up" delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-graphite leading-[1.1]">
              <TextRepel text="Have an idea? Let's make it happen." />
            </h1>
          </ScrollReveal>

          {/* Supporting Description */}
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-lg sm:text-xl text-graphite-muted leading-relaxed max-w-3xl mx-auto font-normal">
              Whether you&apos;re exploring a new digital product, looking to streamline your business with intelligent technology, or interested in working together, we&apos;d love to hear from you.
            </p>
          </ScrollReveal>

          {/* Action CTAs */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Button
                href="#contact-form"
                onClick={handleScrollToForm}
                variant="petrol"
                size="lg"
              >
                Send an Enquiry &darr;
              </Button>
              <Button
                href={`mailto:${COMPANY.emails.general}`}
                variant="outline"
                size="lg"
              >
                Email Orbion &rarr;
              </Button>
            </div>
          </ScrollReveal>

          {/* Key Engagement Standards Bar */}
          <ScrollReveal direction="up" delay={0.25}>
            <div className="pt-6">
              <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-3 rounded-2xl bg-pure-white border border-graphite/10 shadow-xs text-xs font-mono text-graphite">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span>24–48hr Response Window</span>
                </div>
                <div className="hidden sm:block text-graphite-muted/30">&bull;</div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-copper" />
                  <span>Direct Founder Dialogue</span>
                </div>
                <div className="hidden sm:block text-graphite-muted/30">&bull;</div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-petrol" />
                  <span>Mutual NDA on Request</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
