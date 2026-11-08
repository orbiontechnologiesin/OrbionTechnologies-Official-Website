"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { DELIVERY_STAGES } from "@/lib/services-data";

export function ServicesProcess() {
  const [selectedStage, setSelectedStage] = useState<number>(0);

  const activeStage = DELIVERY_STAGES[selectedStage];

  return (
    <section className="py-20 sm:py-28 bg-limestone border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <ScrollReveal direction="down">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-copper">
              STRUCTURED DELIVERY LIFECYCLE
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-graphite">
              From the first conversation to the final implementation.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed font-normal">
              A transparent, milestone-driven engineering process designed to eliminate ambiguity, maintain momentum, and deliver robust software.
            </p>
          </ScrollReveal>
        </div>

        {/* Timeline Navigation Bar (Desktop Horizontal, Mobile Responsive Grid) */}
        <div className="mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {DELIVERY_STAGES.map((stage, idx) => (
              <button
                key={stage.number}
                type="button"
                onClick={() => setSelectedStage(idx)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedStage === idx
                    ? "bg-pure-white border-petrol shadow-md ring-2 ring-petrol/20 scale-[1.02]"
                    : "bg-pure-white/70 border-graphite/10 hover:border-graphite/30 hover:bg-pure-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-mono font-bold ${
                      selectedStage === idx ? "text-copper" : "text-graphite-muted"
                    }`}
                  >
                    Phase {stage.number}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      selectedStage === idx ? "bg-copper" : "bg-graphite/20"
                    }`}
                  />
                </div>
                <div className="text-base font-bold text-graphite">{stage.name}</div>
                <div className="text-[11px] text-graphite-muted mt-1 truncate">
                  {stage.summary}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Deep Dive on Active Delivery Stage */}
        <div className="bg-pure-white rounded-3xl border border-graphite/10 p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Overview */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-copper/10 text-copper text-xs font-mono font-bold">
                  {activeStage.duration}
                </span>
                <span className="text-xs font-mono text-graphite-muted">
                  STAGE {activeStage.number} OF 06
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-graphite">
                Stage {activeStage.number}: {activeStage.name}
              </h3>

              <p className="text-sm sm:text-base text-graphite font-medium leading-relaxed">
                {activeStage.summary}
              </p>

              <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed">
                {activeStage.description}
              </p>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  disabled={selectedStage === 0}
                  onClick={() => setSelectedStage((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-lg border border-graphite/20 text-xs font-mono font-semibold text-graphite disabled:opacity-30 disabled:cursor-not-allowed hover:bg-limestone transition-colors"
                >
                  &larr; Previous Stage
                </button>
                <button
                  type="button"
                  disabled={selectedStage === DELIVERY_STAGES.length - 1}
                  onClick={() => setSelectedStage((prev) => Math.min(DELIVERY_STAGES.length - 1, prev + 1))}
                  className="px-3 py-1.5 rounded-lg bg-petrol text-pure-white text-xs font-mono font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-petrol-dark transition-colors"
                >
                  Next Stage &rarr;
                </button>
              </div>
            </div>

            {/* Activities & Deliverables */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Primary Activities */}
              <div className="p-6 rounded-2xl bg-limestone/80 border border-graphite/10 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-petrol" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-graphite">
                    Key Activities & Workflows
                  </h4>
                </div>
                <ul className="space-y-2.5 text-xs text-graphite-muted">
                  {activeStage.activities.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-copper font-bold mt-0.5">&bull;</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tangible Deliverables */}
              <div className="p-6 rounded-2xl bg-pure-white border border-graphite/15 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-copper" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-graphite">
                    Tangible Deliverables
                  </h4>
                </div>
                <div className="space-y-2.5">
                  {activeStage.deliverables.map((del, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-limestone-light border border-graphite/10 flex items-center gap-2 text-xs font-medium text-graphite"
                    >
                      <span className="text-copper font-bold">&#10003;</span>
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

