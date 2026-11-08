import React from "react";
import { Container } from "@/components/ui/Container";
import { CAPABILITIES } from "@/lib/constants";

export function Capabilities() {
  return (
    <section id="what-we-do" className="py-20 sm:py-28 lg:py-36 bg-limestone-light border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16 lg:mb-20">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-copper block">
            Capabilities & Focus
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-graphite">
            What we do.
          </h2>
          <p className="text-base sm:text-lg text-graphite-muted leading-relaxed">
            We focus our engineering efforts on three complementary disciplines that form the building blocks of modern, intelligent enterprise infrastructure.
          </p>
        </div>

        {/* Distinctive Asymmetric Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: Intelligent Systems (Heroic Primary Card) */}
          <div className="lg:col-span-12 rounded-2xl bg-pure-white border border-graphite/10 p-8 sm:p-10 lg:p-12 shadow-xs transition-all duration-200 hover:border-petrol/40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-petrol block">
                  {CAPABILITIES[0].eyebrow}
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-graphite">
                  {CAPABILITIES[0].title}
                </h3>
                <p className="text-base text-graphite-muted leading-relaxed">
                  {CAPABILITIES[0].description}
                </p>
              </div>

              <div className="lg:col-span-7 bg-limestone-light/70 rounded-xl p-6 sm:p-7 border border-graphite/10 space-y-4">
                <p className="text-xs font-mono uppercase tracking-wider text-graphite font-semibold">
                  Technical Pillars
                </p>
                <div className="space-y-3">
                  {CAPABILITIES[0].details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="h-5 w-5 rounded bg-petrol/10 text-petrol font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-graphite font-medium leading-relaxed">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Software Engineering */}
          <div className="lg:col-span-6 rounded-2xl bg-pure-white border border-graphite/10 p-8 sm:p-10 shadow-xs flex flex-col justify-between transition-all duration-200 hover:border-petrol/40">
            <div className="space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-copper block">
                {CAPABILITIES[1].eyebrow}
              </span>
              <h3 className="text-2xl font-semibold tracking-tight text-graphite">
                {CAPABILITIES[1].title}
              </h3>
              <p className="text-sm sm:text-base text-graphite-muted leading-relaxed">
                {CAPABILITIES[1].description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-graphite/10 space-y-2.5">
              {CAPABILITIES[1].details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-mono text-graphite">
                  <span className="h-1.5 w-1.5 rounded-full bg-copper" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Automation & AI */}
          <div className="lg:col-span-6 rounded-2xl bg-pure-white border border-graphite/10 p-8 sm:p-10 shadow-xs flex flex-col justify-between transition-all duration-200 hover:border-petrol/40">
            <div className="space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sage-dark block">
                {CAPABILITIES[2].eyebrow}
              </span>
              <h3 className="text-2xl font-semibold tracking-tight text-graphite">
                {CAPABILITIES[2].title}
              </h3>
              <p className="text-sm sm:text-base text-graphite-muted leading-relaxed">
                {CAPABILITIES[2].description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-graphite/10 space-y-2.5">
              {CAPABILITIES[2].details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-mono text-graphite">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage-dark" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="mt-12 text-center text-xs font-mono text-graphite-muted/80">
          * These focus domains guide active prototype verification and core system development.
        </p>
      </Container>
    </section>
  );
}

