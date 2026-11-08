"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { TextRepel } from "@/components/ui/text-repel";
import { PRICING_COPY } from "@/lib/pricing-data";

export function PricingLoggedOut() {
  const { eyebrow, headline, description, cardTitle, cardDescription, primaryCta, secondaryCta } =
    PRICING_COPY.unauthenticated;

  return (
    <div className="relative py-28 sm:py-36 overflow-hidden bg-limestone-light">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-grid-petrol opacity-20 pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
          {/* Eyebrow */}
          <ScrollReveal direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-petrol/5 border border-petrol/15 text-petrol text-xs font-mono font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-copper" />
              <span>{eyebrow}</span>
            </div>
          </ScrollReveal>

          {/* Headline with Text Repel */}
          <ScrollReveal direction="up" delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-graphite leading-[1.15]">
              <TextRepel text={headline} />
            </h1>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-lg sm:text-xl text-graphite-muted leading-relaxed max-w-2xl mx-auto font-normal">
              {description}
            </p>
          </ScrollReveal>
        </div>

        {/* Login-Required Access Panel */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="max-w-2xl mx-auto bg-pure-white rounded-3xl border border-graphite/10 p-8 sm:p-12 shadow-lg text-center relative overflow-hidden">
            {/* Top Decorative Access Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-petrol via-copper to-sage" />

            {/* Lock / Security Icon */}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-petrol/5 border border-petrol/15 flex items-center justify-center mb-6 text-petrol shadow-inner">
              <svg
                className="w-8 h-8 text-copper"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.75}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>

            {/* Access Status Eyebrow */}
            <span className="text-[11px] font-mono uppercase tracking-widest text-copper font-bold block mb-2">
              RESTRICTED MEMBER AREA
            </span>

            {/* Main Message */}
            <h2 className="text-2xl sm:text-3xl font-bold text-graphite mb-3">
              {cardTitle}
            </h2>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-graphite-muted leading-relaxed max-w-lg mx-auto mb-8 font-normal">
              {cardDescription}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
              <Button
                href="/login?callbackURL=/pricing"
                variant="petrol"
                size="lg"
                className="w-full sm:w-auto shadow-sm"
              >
                {primaryCta} &rarr;
              </Button>
              <Button
                href="/products"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                {secondaryCta}
              </Button>
            </div>

            {/* Authentication Assurance Badges */}
            <div className="pt-6 border-t border-graphite/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="p-3 rounded-xl bg-limestone/50 border border-graphite/5">
                <span className="text-xs font-mono font-bold text-petrol block mb-1">
                  Member Preview
                </span>
                <p className="text-[11px] text-graphite-muted leading-tight">
                  Registered members gain advance access to product pricing structures.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-limestone/50 border border-graphite/5">
                <span className="text-xs font-mono font-bold text-petrol block mb-1">
                  No Speculative Plans
                </span>
                <p className="text-[11px] text-graphite-muted leading-tight">
                  We finalize pricing plans only after software capabilities are tested.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-limestone/50 border border-graphite/5">
                <span className="text-xs font-mono font-bold text-petrol block mb-1">
                  Zero Obligation
                </span>
                <p className="text-[11px] text-graphite-muted leading-tight">
                  Access roadmaps and upcoming features without financial commitments.
                </p>
              </div>
            </div>

            {/* Safe Callback Verification Notice */}
            <div className="mt-6 text-[11px] font-mono text-graphite-muted/70">
              Safe authentication redirect: return destination locked to /pricing
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}

