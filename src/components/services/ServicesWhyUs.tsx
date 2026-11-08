"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WHY_US_PRINCIPLES } from "@/lib/services-data";

export function ServicesWhyUs() {
  return (
    <section className="py-20 sm:py-28 bg-limestone border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <ScrollReveal direction="down">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-copper">
              FOUNDATIONAL COMMITMENTS
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-graphite">
              Engineering with intention.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed font-normal">
              Our core principles guide every architectural choice, line of code, and client interaction.
            </p>
          </ScrollReveal>
        </div>

        {/* 5 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_US_PRINCIPLES.map((principle, idx) => (
            <div
              key={principle.title}
              className={`p-6 sm:p-8 rounded-3xl border bg-pure-white transition-all hover:shadow-md flex flex-col justify-between ${
                idx === 0
                  ? "border-copper/40 shadow-xs"
                  : "border-graphite/10 hover:border-graphite/30"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-mono font-bold text-copper">
                    {principle.number}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-petrol" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-graphite">{principle.title}</h3>
                  <p className="text-xs text-copper font-medium mt-1">
                    {principle.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed">
                  {principle.description}
                </p>

                <div className="pt-2 space-y-1.5 border-t border-graphite/10">
                  {principle.keyAspects.map((aspect, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2 text-xs text-graphite">
                      <span className="text-petrol font-bold mt-0.5">&bull;</span>
                      <span>{aspect}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 text-[10px] font-mono text-graphite-muted uppercase tracking-wider">
                Orbion Standard
              </div>
            </div>
          ))}

          {/* 6th Slot: Startup Agility + Engineering Rigor */}
          <div className="p-6 sm:p-8 rounded-3xl border border-petrol/30 bg-petrol text-pure-white flex flex-col justify-between shadow-md">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-pure-white/10 text-sage text-[11px] font-mono font-bold inline-block">
                COLLABORATION PROMISE
              </span>
              <h3 className="text-xl font-bold text-pure-white">
                Direct founder-engineer access
              </h3>
              <p className="text-xs text-limestone-light/90 leading-relaxed">
                You work directly with the engineers designing and authoring your software. No layers of non-technical account managers, no games of telephone, and no speculative promises.
              </p>
              <div className="space-y-2 pt-2 text-xs text-limestone-light/80">
                <div className="flex items-center gap-2">
                  <span className="text-copper font-bold">&#10003;</span>
                  <span>Clear weekly engineering demos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-copper font-bold">&#10003;</span>
                  <span>Direct GitHub repository ownership</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-copper font-bold">&#10003;</span>
                  <span>Honest timelines with zero hidden fees</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-pure-white/10 text-[11px] font-mono text-sage">
              Transparent &bull; Accountable &bull; Committed
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

