"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TECH_CATEGORIES } from "@/lib/services-data";

export function ServicesTechStack() {
  return (
    <section className="py-20 sm:py-28 bg-limestone-light border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <ScrollReveal direction="down">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-copper">
              ENGINEERING STACK & TOOLING
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-graphite">
              The right tools for the right solution.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed font-normal">
              We select established, modern technologies based on project requirements, performance needs, and long-term maintainability — never technology for technology&apos;s sake.
            </p>
          </ScrollReveal>
        </div>

        {/* 5 Categorized Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.name}
              className={`p-6 sm:p-8 rounded-3xl border bg-pure-white transition-all hover:shadow-md ${
                idx === 0 || idx === 3
                  ? "border-petrol/20 hover:border-petrol/40"
                  : "border-graphite/10 hover:border-graphite/30"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-petrol/10 text-petrol text-[11px] font-mono font-bold">
                    {cat.badge}
                  </span>
                  <span className="text-xs font-mono text-copper font-semibold">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-graphite">{cat.name}</h3>
                  <p className="text-xs text-graphite-muted mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2 space-y-2">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="p-3 rounded-xl bg-limestone/60 border border-graphite/10 flex items-start gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-copper mt-1.5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-graphite font-mono">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-graphite-muted leading-tight mt-0.5">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Philosophy Chassis Box to round out the 6th slot */}
          <div className="p-6 sm:p-8 rounded-3xl border border-copper/30 bg-gradient-to-br from-pure-white to-limestone flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-copper/10 text-copper text-[11px] font-mono font-bold inline-block">
                STACK SELECTION STANDARD
              </span>
              <h3 className="text-xl font-bold text-graphite">
                Why we avoid tool dogma
              </h3>
              <p className="text-xs text-graphite-muted leading-relaxed">
                We believe engineering reliability comes from deep familiarity with proven primitives rather than chasing weekly frontend frameworks. Every library in our stack is chosen for:
              </p>
              <ul className="space-y-2 text-xs text-graphite font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-copper font-bold">&#10003;</span>
                  <span>Long-term community backing & support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-copper font-bold">&#10003;</span>
                  <span>Type-safety & compiler verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-copper font-bold">&#10003;</span>
                  <span>Zero unnecessary runtime overhead</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-copper font-bold">&#10003;</span>
                  <span>Easy onboarding for your future developers</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-graphite/10 text-[11px] font-mono text-petrol font-semibold">
              Practical &bull; Maintainable &bull; Scalable
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

