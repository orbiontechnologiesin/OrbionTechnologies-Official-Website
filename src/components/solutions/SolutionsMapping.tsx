import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PROBLEM_SOLUTION_MAPPING } from "@/lib/solutions-data";

export function SolutionsMapping() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-pure-white border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 border border-copper/20 text-copper text-xs font-mono font-bold tracking-wider uppercase">
              <span>Problem to Solution Matrix</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-graphite leading-tight">
              Different challenges. Thoughtful engineering.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed">
              How concrete operational friction translates into tailored digital engineering and upcoming software architectures.
            </p>
          </ScrollReveal>
        </div>

        {/* Editorial Mapping Grid */}
        <div className="rounded-2xl border border-graphite/15 overflow-hidden bg-limestone-light/30 shadow-xs">
          {/* Header Row (Hidden on Small Mobile) */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-petrol text-limestone-light text-xs font-mono uppercase tracking-wider font-semibold border-b border-petrol-dark">
            <div className="md:col-span-5">Business Challenge</div>
            <div className="md:col-span-4">Orbion Solution</div>
            <div className="md:col-span-3 text-right">Category &amp; Action</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-graphite/10">
            {PROBLEM_SOLUTION_MAPPING.map((item, idx) => {
              const isService = item.type === "Engineering Service";

              return (
                <ScrollReveal key={item.problem} direction="up" delay={0.04 * (idx + 1)}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-5 hover:bg-pure-white transition-colors items-center group">
                    {/* Challenge Column */}
                    <div className="md:col-span-5 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-copper block md:hidden">
                        Challenge
                      </span>
                      <p className="text-sm sm:text-base font-semibold text-graphite">
                        {item.problem}
                      </p>
                    </div>

                    {/* Solution Column */}
                    <div className="md:col-span-4 space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-petrol block md:hidden">
                        Orbion Solution
                      </span>
                      <p className="text-sm sm:text-base font-bold text-petrol group-hover:text-copper transition-colors">
                        {item.solution}
                      </p>
                    </div>

                    {/* Category & Link Column */}
                    <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium ${
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
                        <span>{item.tag}</span>
                      </span>

                      <Link
                        href={item.href}
                        className="text-xs font-mono text-petrol hover:text-copper font-semibold flex items-center gap-1"
                      >
                        <span>View</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

