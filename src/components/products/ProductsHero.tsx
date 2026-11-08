import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TextRepel } from "@/components/ui/text-repel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ProductsHero() {
  return (
    <section
      id="products-hero"
      className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-32 overflow-hidden bg-limestone-light bg-grid-subtle border-b border-graphite/10"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative Headline & Mission */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <ScrollReveal direction="up" delay={0.1}>
              {/* Architectural Eyebrow */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-pure-white border border-graphite/15 text-xs font-mono tracking-wider text-graphite-muted shadow-xs">
                <span className="h-2 w-2 rounded-full bg-copper animate-pulse" />
                <span className="font-semibold text-graphite">ORBION PRODUCT ECOSYSTEM</span>
                <span className="text-graphite/30">/</span>
                <span>FUTURE SPECIFICATION</span>
              </div>
            </ScrollReveal>

            {/* Main Headline with TextRepel */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-graphite leading-[1.12]">
                  <TextRepel
                    text="Ideas taking shape. Technology on the way."
                    className="justify-start text-left"
                  />
                </h1>
                <p className="text-xl sm:text-2xl font-medium text-petrol tracking-tight leading-snug">
                  We&apos;re building a collection of intelligent software products designed to simplify business operations, connect workflows, and make technology more useful.
                </p>
              </div>
            </ScrollReveal>

            {/* Supporting Statement */}
            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-base sm:text-lg text-graphite-muted leading-relaxed max-w-2xl">
                Every product begins with a problem worth solving. Here&apos;s a look at what we&apos;re working towards. None of these products are launched or live yet—they represent our active research, architectural planning, and long-term engineering vision.
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal direction="up" delay={0.35}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button href="#collection" variant="petrol" size="lg">
                  Explore Upcoming Products &darr;
                </Button>
                <Button href="#approach" variant="secondary" size="lg">
                  Our Engineering Approach &rarr;
                </Button>
              </div>
            </ScrollReveal>

            {/* Telemetry Strip */}
            <ScrollReveal direction="up" delay={0.4}>
              <div className="pt-6 sm:pt-8 border-t border-graphite/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-graphite-muted">
                <div>
                  <span className="block font-semibold text-graphite">PORTFOLIO STATUS</span>
                  <span className="text-copper font-medium">Coming Soon &bull; In Dev</span>
                </div>
                <div>
                  <span className="block font-semibold text-graphite">ARCHITECTURAL SCOPE</span>
                  <span className="text-graphite-muted/80">7 Unified Subsystems</span>
                </div>
                <div>
                  <span className="block font-semibold text-graphite">CORE PARADIGM</span>
                  <span className="text-graphite-muted/80">Intelligent Workflows</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Architectural Ecosystem Visual */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="up" delay={0.25}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-2xl bg-petrol p-6 sm:p-8 text-limestone-light shadow-xl shadow-petrol/15 border border-petrol-light relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

                  {/* Status Bar */}
                  <div className="relative z-10 flex items-center justify-between pb-5 border-b border-limestone-light/15 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-copper animate-pulse" />
                      <span className="tracking-wider uppercase text-limestone-muted">Ecosystem Blueprint</span>
                    </div>
                    <span className="text-sage font-semibold">PRE-RELEASE</span>
                  </div>

                  {/* Center Mark */}
                  <div className="relative z-10 my-8 py-2 flex flex-col items-center justify-center">
                    <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border border-limestone-light/20 border-dashed animate-[spin_60s_linear_infinite]" />
                      <div className="absolute inset-2 rounded-full border border-copper/40" />
                      <div className="relative h-14 w-14">
                        <Image
                          src="/brand/PNG Images/orbion-symbol-white.png"
                          alt="Orbion Sovereign Mark"
                          fill
                          sizes="56px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-base font-semibold tracking-wide text-pure-white">
                        Orbion Integrated Ecosystem
                      </p>
                      <p className="text-xs text-limestone-muted font-mono mt-0.5">
                        CRM &bull; AI Agents &bull; Operations &bull; Analytics
                      </p>
                    </div>
                  </div>

                  {/* Ecosystem Category Breakdown */}
                  <div className="relative z-10 space-y-2.5 text-xs font-mono">
                    <div className="flex items-center justify-between p-2.5 rounded bg-petrol-dark/70 border border-limestone-light/10">
                      <span className="text-limestone-muted">Business Operations</span>
                      <span className="text-copper font-medium">CRM &bull; Bookings &bull; Fit &bull; Dine</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-petrol-dark/70 border border-limestone-light/10">
                      <span className="text-limestone-muted">Artificial Intelligence</span>
                      <span className="text-sage font-medium">AI Chatbot &bull; Docs</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-petrol-dark/70 border border-limestone-light/10">
                      <span className="text-limestone-muted">Data Intelligence</span>
                      <span className="text-pure-white font-medium">Orbion Insights</span>
                    </div>
                  </div>

                  {/* Footnote */}
                  <div className="relative z-10 mt-5 pt-4 border-t border-limestone-light/15 flex items-center justify-between text-[11px] font-mono text-limestone-muted/70">
                    <span>STAGE: ARCHITECTURAL PLANNING</span>
                    <span className="text-copper">ALL PRODUCTS COMING SOON</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

