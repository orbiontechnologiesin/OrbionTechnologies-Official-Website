import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TextRepel } from "@/components/ui/text-repel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { COMPANY } from "@/lib/constants";

export function AboutHero() {
  return (
    <section
      id="about-hero"
      className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-32 overflow-hidden bg-limestone-light bg-grid-subtle border-b border-graphite/10"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <ScrollReveal direction="up" delay={0.1}>
              {/* Architectural Eyebrow */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-pure-white border border-graphite/15 text-xs font-mono tracking-wider text-graphite-muted shadow-xs">
                <span className="h-2 w-2 rounded-full bg-copper animate-pulse" />
                <span className="font-semibold text-graphite">ORBION IDENTITY</span>
                <span className="text-graphite/30">/</span>
                <span>COMPANY DOSSIER</span>
              </div>
            </ScrollReveal>

            {/* Headline with TextRepel */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-graphite leading-[1.12]">
                  <TextRepel
                    text="We are building what comes next."
                    className="justify-start text-left"
                  />
                </h1>
                <p className="text-xl sm:text-2xl font-medium text-petrol tracking-tight leading-snug">
                  Orbion Technologies is an emerging deep-tech company driven by a simple belief: technology should do more than solve today&apos;s problems. It should create possibilities for tomorrow.
                </p>
              </div>
            </ScrollReveal>

            {/* Supporting Statement */}
            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-base sm:text-lg text-graphite-muted leading-relaxed max-w-2xl">
                From intelligent software to autonomous systems, we are exploring and engineering the technologies shaping the next generation of businesses. We combine software engineering, artificial intelligence, and systems thinking to create useful, enduring digital foundations.
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal direction="up" delay={0.35}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button href="#story" variant="petrol" size="lg">
                  Read Our Story &darr;
                </Button>
                <Button href="#leadership" variant="secondary" size="lg">
                  Meet the Founders &rarr;
                </Button>
              </div>
            </ScrollReveal>

            {/* Architectural Telemetry Ribbon */}
            <ScrollReveal direction="up" delay={0.4}>
              <div className="pt-6 sm:pt-8 border-t border-graphite/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-graphite-muted">
                <div>
                  <span className="block font-semibold text-graphite">FOUNDING STAGE</span>
                  <span className="text-graphite-muted/80">Early-Stage Deep-Tech</span>
                </div>
                <div>
                  <span className="block font-semibold text-graphite">LONG-TERM HORIZON</span>
                  <span className="text-graphite-muted/80">AI Operating System</span>
                </div>
                <div>
                  <span className="block font-semibold text-graphite">OPERATIONAL BASE</span>
                  <span className="text-graphite-muted/80">Solapur, Maharashtra, IN</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Architectural Schematic Dossier Visual */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="up" delay={0.25}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-2xl bg-petrol p-6 sm:p-8 text-limestone-light shadow-xl shadow-petrol/15 border border-petrol-light relative overflow-hidden">
                  {/* Subtle Grid Pattern */}
                  <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

                  {/* Top Status Bar */}
                  <div className="relative z-10 flex items-center justify-between pb-5 border-b border-limestone-light/15 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-sage" />
                      <span className="tracking-wider uppercase text-limestone-muted">Company Dossier</span>
                    </div>
                    <span className="text-limestone-muted/70">ARCH-SPEC 2026</span>
                  </div>

                  {/* Center Schematic Mark */}
                  <div className="relative z-10 my-8 py-4 flex flex-col items-center justify-center">
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
                        Orbion Engineering Laboratory
                      </p>
                      <p className="text-xs text-limestone-muted font-mono mt-0.5">
                        Intelligence &bull; Autonomy &bull; Craft
                      </p>
                    </div>
                  </div>

                  {/* Architectural Pillars */}
                  <div className="relative z-10 space-y-2.5 text-xs font-mono">
                    <div className="flex items-center justify-between p-2.5 rounded bg-petrol-dark/70 border border-limestone-light/10">
                      <span className="text-limestone-muted">Foundational Mission</span>
                      <span className="text-sage font-medium">Purpose-Driven Tech</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-petrol-dark/70 border border-limestone-light/10">
                      <span className="text-limestone-muted">System Architecture</span>
                      <span className="text-copper font-medium">Autonomous Runtime</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-petrol-dark/70 border border-limestone-light/10">
                      <span className="text-limestone-muted">Core Philosophy</span>
                      <span className="text-pure-white font-medium">Simplicity &amp; Discipline</span>
                    </div>
                  </div>

                  {/* Footnote */}
                  <div className="relative z-10 mt-5 pt-4 border-t border-limestone-light/15 flex items-center justify-between text-[11px] font-mono text-limestone-muted/70">
                    <span>STAGE: EARLY-STAGE DEEP-TECH</span>
                    <span>{COMPANY.tagline}</span>
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

