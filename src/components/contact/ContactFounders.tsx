"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { COMPANY } from "@/lib/constants";

export function ContactFounders() {
  return (
    <section className="py-20 sm:py-28 bg-limestone-light border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <ScrollReveal direction="down">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-copper">
              LEADERSHIP &amp; ENGINEERING DIRECT
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-graphite">
              The People Behind Orbion
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed max-w-2xl mx-auto font-normal">
              Orbion is driven by a shared ambition to engineer purposeful technology and build what&apos;s next.
            </p>
          </ScrollReveal>
        </div>

        {/* Founder Profiles Grid (Equal Visual Importance) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {COMPANY.founders.map((founder, idx) => (
            <ScrollReveal key={founder.name} direction="up" delay={0.1 * (idx + 1)}>
              <div className="h-full rounded-3xl bg-pure-white border border-graphite/10 p-8 sm:p-10 shadow-xs hover:border-petrol/30 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  {/* Top Bar with Initials Monogram & Role Pill */}
                  <div className="flex items-center justify-between pb-5 border-b border-graphite/10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-petrol/10 border border-petrol/15 flex items-center justify-center font-mono font-bold text-petrol text-base">
                        {founder.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-copper block">
                          {founder.role}
                        </span>
                        <span className="text-[11px] font-mono text-graphite-muted">
                          Orbion Technologies
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold text-graphite-muted/40">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Name & Designation */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-graphite">
                      {founder.name}
                    </h3>
                    <p className="text-xs font-mono text-petrol font-medium mt-1">
                      {founder.designation}
                    </p>
                  </div>

                  {/* Focus Area */}
                  <div className="p-4 rounded-2xl bg-limestone border border-graphite/10 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-graphite-muted font-bold block">
                      Engineering &amp; Technical Focus:
                    </span>
                    <p className="text-xs sm:text-sm text-graphite leading-relaxed font-normal">
                      {founder.focus}
                    </p>
                  </div>
                </div>

                {/* Verified Communication & Profile Channels */}
                <div className="pt-4 border-t border-graphite/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <a
                    href={`mailto:${founder.email}`}
                    className="text-petrol hover:text-copper transition-colors font-semibold flex items-center gap-1.5"
                  >
                    <span>{founder.email}</span>
                    <span>&rarr;</span>
                  </a>

                  <div className="flex items-center gap-4 text-graphite-muted">
                    <a
                      href={founder.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-graphite transition-colors underline-offset-4 hover:underline"
                    >
                      GitHub &nearr;
                    </a>
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-graphite transition-colors underline-offset-4 hover:underline"
                    >
                      LinkedIn &nearr;
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

