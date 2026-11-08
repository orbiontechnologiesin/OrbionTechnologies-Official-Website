import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TextRepel } from "@/components/ui/text-repel";
import { COMPANY } from "@/lib/constants";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-32 overflow-hidden bg-limestone-light bg-grid-subtle border-b border-graphite/10"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative & Action */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Architectural Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-pure-white border border-graphite/15 text-xs font-mono tracking-wider text-graphite-muted shadow-xs">
              <span className="h-2 w-2 rounded-full bg-copper animate-pulse" />
              <span className="font-semibold text-graphite">ORBION ARCHITECTURE</span>
              <span className="text-graphite/30">/</span>
              <span>EARLY-STAGE DEEP-TECH</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-graphite leading-[1.12]">
                <TextRepel
                  text="Building technology for what's ahead."
                  className="justify-start text-left"
                />
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-petrol tracking-tight">
                {COMPANY.tagline}
              </p>
            </div>

            {/* Narrative Body */}
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed max-w-2xl">
              {COMPANY.heroSubheadline} We engineer cognitive runtime systems, workflow automation, and an AI Operating System designed to help modern businesses operate with verifiable reliability.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button href="#contact" variant="primary" size="lg">
                Get in Touch
              </Button>
              <Button href="#about" variant="secondary" size="lg">
                Explore Orbion &rarr;
              </Button>
            </div>

            {/* Technical Substrate Telemetry Strip */}
            <div className="pt-6 sm:pt-8 border-t border-graphite/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-graphite-muted">
              <div>
                <span className="block font-semibold text-graphite">SUBSTRATE</span>
                <span className="text-graphite-muted/80">Autonomous OS</span>
              </div>
              <div>
                <span className="block font-semibold text-graphite">INTEROPERABILITY</span>
                <span className="text-graphite-muted/80">Model Context Protocol</span>
              </div>
              <div>
                <span className="block font-semibold text-graphite">EXECUTION</span>
                <span className="text-graphite-muted/80">Deterministic Guardrails</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Schematic Visual */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Instrument-Grade Chassis */}
              <div className="rounded-2xl bg-petrol p-6 sm:p-8 text-limestone-light shadow-xl shadow-petrol/15 border border-petrol-light relative overflow-hidden">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

                {/* Top Status Bar */}
                <div className="relative z-10 flex items-center justify-between pb-5 border-b border-limestone-light/15 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-sage" />
                    <span className="tracking-wider uppercase text-limestone-muted">Runtime Kernel</span>
                  </div>
                  <span className="text-limestone-muted/70">v0.1 PREVIEW</span>
                </div>

                {/* Center Schematic Graphic */}
                <div className="relative z-10 my-8 py-4 flex flex-col items-center justify-center">
                  <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex items-center justify-center">
                    {/* Concentric Orbital Rings */}
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
                      Orbion Core Substrate
                    </p>
                    <p className="text-xs text-limestone-muted font-mono mt-0.5">
                      Process Scheduler &bull; Memory &bull; Guardrails
                    </p>
                  </div>
                </div>

                {/* Modular Architecture Stack */}
                <div className="relative z-10 space-y-2.5 text-xs font-mono">
                  <div className="flex items-center justify-between p-2.5 rounded bg-petrol-dark/70 border border-limestone-light/10">
                    <span className="text-limestone-muted">Task Decomposition</span>
                    <span className="text-sage font-medium">Verified DAG</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded bg-petrol-dark/70 border border-limestone-light/10">
                    <span className="text-limestone-muted">Tool Protocol</span>
                    <span className="text-copper font-medium">MCP Compliant</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded bg-petrol-dark/70 border border-limestone-light/10">
                    <span className="text-limestone-muted">State Management</span>
                    <span className="text-pure-white font-medium">Deterministic</span>
                  </div>
                </div>

                {/* Footnote */}
                <div className="relative z-10 mt-5 pt-4 border-t border-limestone-light/15 flex items-center justify-between text-[11px] font-mono text-limestone-muted/70">
                  <span>SYSTEM LATENCY: MINIMAL</span>
                  <span>ZERO-DRIFT LOGIC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
