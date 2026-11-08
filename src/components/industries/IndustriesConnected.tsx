import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CROSS_INDUSTRY_MAPPING } from "@/lib/industries-data";

export function IndustriesConnected() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-pure-white border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 border border-copper/20 text-copper text-xs font-mono font-bold tracking-wider uppercase">
              <span>Cross-Sector Architecture</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-graphite leading-tight">
              Different industries. Shared challenges.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed">
              While industry terminologies differ, the underlying operational requirements are remarkably consistent: managing relationships, organizing schedules, retrieving business knowledge, and processing transactions.
            </p>
          </ScrollReveal>
        </div>

        {/* Cross-Industry Mapping Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {CROSS_INDUSTRY_MAPPING.map((item, idx) => {
            const isService = item.type === "Engineering Service";

            return (
              <ScrollReveal key={item.technology} direction="up" delay={0.05 * (idx + 1)}>
                <div className="h-full p-6 sm:p-7 rounded-2xl bg-limestone-light/50 border border-graphite/10 hover:border-petrol/30 transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-copper font-bold text-xs uppercase tracking-wider">
                        FOCUS 0{idx + 1}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                          isService
                            ? "bg-petrol/10 text-petrol border border-petrol/20"
                            : "bg-copper/15 text-copper border border-copper/30"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isService ? "bg-petrol" : "bg-copper animate-pulse"
                          }`}
                        />
                        <span>{item.status}</span>
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-graphite group-hover:text-petrol transition-colors">
                      {item.technology}
                    </h3>

                    <div className="space-y-2 pt-1">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-graphite-muted block">
                        Relevant Industry Sectors:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.relevantIndustries.map((ind) => (
                          <span
                            key={ind}
                            className="text-xs font-mono px-2.5 py-1 rounded-md bg-pure-white border border-graphite/10 text-graphite font-medium shadow-2xs"
                          >
                            {ind}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-graphite/10 text-[11px] font-mono text-petrol/80 flex items-center gap-1.5">
                    <span>&bull;</span>
                    <span>Unified Architectural Pattern</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

