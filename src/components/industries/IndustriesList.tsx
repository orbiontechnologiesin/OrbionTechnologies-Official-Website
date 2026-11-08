import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { INDUSTRIES } from "@/lib/industries-data";
import { IndustryVisual } from "./IndustryVisuals";

export function IndustriesList() {
  return (
    <section id="focus-sectors" className="py-20 sm:py-28 lg:py-36 bg-limestone/40 border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-24 space-y-4">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 border border-copper/20 text-copper text-xs font-mono font-bold tracking-wider uppercase">
              <span>Industries We Focus On</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-graphite leading-tight">
              Where we&apos;re exploring possibilities.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed">
              From everyday business operations to emerging digital experiences, we are exploring opportunities across industries where technology can create meaningful value.
            </p>
          </ScrollReveal>
        </div>

        {/* 8 Industry Editorial Blocks */}
        <div className="space-y-20 lg:space-y-32">
          {INDUSTRIES.map((ind, index) => {
            const isEven = index % 2 === 1;

            return (
              <article
                key={ind.id}
                id={ind.id}
                className="p-6 sm:p-10 lg:p-14 rounded-3xl bg-pure-white border border-graphite/10 shadow-xs hover:border-petrol/30 transition-all duration-300 relative overflow-hidden"
              >
                {/* Header Meta: Number, Title, Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-graphite/10 mb-8 sm:mb-12">
                  <div className="flex items-center gap-3">
                    <span className="text-copper font-mono font-bold text-lg sm:text-xl">
                      {ind.number}
                    </span>
                    <span className="text-graphite/20 font-mono">/</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-graphite">
                      {ind.name}
                    </h3>
                  </div>

                  {ind.badge && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-petrol/10 border border-petrol/20 text-petrol text-xs font-mono font-bold tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-petrol" />
                      <span>{ind.badge}</span>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                  {/* Left Column (Content Framework) */}
                  <div className={`lg:col-span-7 space-y-8 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    {/* Introduction */}
                    <p className="text-base sm:text-lg text-graphite-muted leading-relaxed font-normal">
                      {ind.introduction}
                    </p>

                    {/* Common Industry Challenges */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-copper">
                        <span>Common Industry Challenges</span>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-graphite-muted">
                        {ind.challenges.map((ch) => (
                          <li
                            key={ch}
                            className="flex items-start gap-2 p-2.5 rounded bg-limestone-light/70 border border-graphite/5"
                          >
                            <span className="text-copper font-bold">&bull;</span>
                            <span>{ch}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Orbion's Approach */}
                    <div className="space-y-3 p-5 rounded-2xl bg-limestone-light/50 border border-graphite/10">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-petrol">
                        <span>Orbion&apos;s Technology Approach</span>
                      </div>
                      <p className="text-xs sm:text-sm text-graphite font-medium">
                        {ind.approach.summary}
                      </p>
                      <ul className="space-y-1.5 text-xs font-mono text-graphite-muted">
                        {ind.approach.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2">
                            <span className="text-sage font-bold">&rsaquo;</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Relevant Offerings & Product Concepts */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-copper">
                        <span>Relevant Offerings &amp; Upcoming Concepts</span>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {ind.relevantOfferings.map((off) => {
                          const isProduct = off.type === "product";

                          return (
                            <Link
                              key={off.name}
                              href={off.href}
                              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-pure-white border border-graphite/15 hover:border-petrol/40 transition-all text-xs font-mono group/item shadow-2xs"
                            >
                              <span className="font-semibold text-graphite group-hover/item:text-petrol transition-colors">
                                {off.name}
                              </span>
                              {off.statusTag && (
                                <span
                                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                    isProduct
                                      ? "bg-copper/15 text-copper border border-copper/30"
                                      : "bg-petrol/10 text-petrol border border-petrol/20"
                                  }`}
                                >
                                  {off.statusTag}
                                </span>
                              )}
                              <span className="text-graphite/30 group-hover/item:text-petrol transition-colors">
                                &rarr;
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Intended Outcomes */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-petrol">
                        <span>Intended Business Outcomes</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-graphite">
                        {ind.intendedOutcomes.map((out) => (
                          <div
                            key={out}
                            className="flex items-start gap-2 p-2 rounded bg-sage/10 border border-sage/20"
                          >
                            <span className="text-petrol font-bold">&#10003;</span>
                            <span className="text-graphite font-medium">{out}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Transparency Notice if specified */}
                    {ind.transparencyNote && (
                      <div className="p-3.5 rounded-xl bg-copper/5 border border-copper/25 text-[11px] font-mono text-graphite-muted flex items-start gap-2 leading-relaxed">
                        <span className="text-copper font-bold text-xs leading-none">&bull;</span>
                        <p>
                          <strong className="text-graphite font-semibold">Scope Clarity: </strong>
                          {ind.transparencyNote}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column (Conceptual Visual Schematic) */}
                  <div className={`lg:col-span-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="sticky top-28">
                      <IndustryVisual id={ind.id} />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

