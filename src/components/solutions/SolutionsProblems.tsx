import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SOLUTIONS } from "@/lib/solutions-data";
import { WebEngineeringVisual } from "./SolutionsVisuals";
import {
  CrmVisual,
  ChatbotVisual,
  BookingsVisual,
  DocsVisual,
  InsightsVisual,
} from "@/components/products/ProductVisuals";

function renderSolutionVisual(solutionId: string) {
  switch (solutionId) {
    case "digital-presence":
      return <WebEngineeringVisual />;
    case "customer-management":
      return <CrmVisual />;
    case "conversational-enquiries":
      return <ChatbotVisual />;
    case "fragmented-operations":
      return <BookingsVisual />;
    case "document-processing":
      return <DocsVisual />;
    case "business-data-visibility":
      return <InsightsVisual />;
    default:
      return null;
  }
}

export function SolutionsProblems() {
  return (
    <section id="problems-we-address" className="py-20 sm:py-28 lg:py-36 bg-limestone/40 border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-24 space-y-4">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-petrol/5 border border-petrol/15 text-petrol text-xs font-mono font-bold tracking-wider uppercase">
              <span>The Problems We Address</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-graphite leading-tight">
              Real business challenges. Focused engineering solutions.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed">
              We organize our capabilities around the specific friction points modern businesses experience daily: from fragmented client communications to manual data entry.
            </p>
          </ScrollReveal>
        </div>

        {/* 6 Solution Category Blocks */}
        <div className="space-y-20 lg:space-y-32">
          {SOLUTIONS.map((sol, index) => {
            const isEven = index % 2 === 1;

            return (
              <article
                key={sol.id}
                id={sol.id}
                className="p-6 sm:p-10 lg:p-14 rounded-3xl bg-pure-white border border-graphite/10 shadow-xs hover:border-petrol/30 transition-all duration-300 relative overflow-hidden"
              >
                {/* Top Meta: Number, Title & Status Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-graphite/10 mb-8 sm:mb-12">
                  <div className="flex items-center gap-3">
                    <span className="text-copper font-mono font-bold text-lg sm:text-xl">
                      {sol.number}
                    </span>
                    <span className="text-graphite/20 font-mono">/</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-graphite">
                      {sol.title}
                    </h3>
                  </div>

                  {/* Status Badge */}
                  {sol.isUpcomingProduct ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-copper/15 border border-copper/35 text-copper text-xs font-mono font-bold tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-copper animate-pulse" />
                      <span>UPCOMING PRODUCT &bull; COMING SOON</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-petrol/10 border border-petrol/20 text-petrol text-xs font-mono font-bold tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-petrol" />
                      <span>{sol.badge}</span>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                  {/* Left Column (Content Framework) */}
                  <div className={`lg:col-span-7 space-y-8 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    {/* 1. The Problem */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-copper">
                        <span>01 &bull; The Problem</span>
                      </div>
                      <p className="text-base text-graphite font-medium leading-relaxed">
                        {sol.problem.summary}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs font-mono text-graphite-muted">
                        {sol.problem.points.map((pt) => (
                          <li
                            key={pt}
                            className="flex items-start gap-2 p-2 rounded bg-limestone-light/70 border border-graphite/5"
                          >
                            <span className="text-copper font-bold">&bull;</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 2. Why It Matters */}
                    <div className="space-y-2 p-4 sm:p-5 rounded-xl bg-limestone-light/60 border border-graphite/10">
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-graphite">
                        02 &bull; Why It Matters
                      </div>
                      <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed">
                        {sol.whyItMatters}
                      </p>
                    </div>

                    {/* 3. Our Approach */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-petrol">
                        <span>03 &bull; Our Approach</span>
                      </div>
                      <p className="text-xs sm:text-sm text-graphite font-medium">
                        {sol.ourApproach.summary}
                      </p>
                      <ul className="space-y-1.5 text-xs font-mono text-graphite-muted">
                        {sol.ourApproach.points.map((apt) => (
                          <li key={apt} className="flex items-start gap-2">
                            <span className="text-sage font-bold">&rsaquo;</span>
                            <span>{apt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 4. The Solution */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-copper">
                        <span>04 &bull; The Solution</span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-graphite">
                        {sol.solution.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed">
                        {sol.solution.description}
                      </p>

                      {/* Sub-solutions if present (e.g., Bookings, Fit, Dine) */}
                      {sol.solution.subSolutions && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                          {sol.solution.subSolutions.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`/products/${sub.slug}`}
                              className="p-3.5 rounded-xl bg-limestone-light border border-graphite/10 hover:border-petrol/40 transition-colors group/sub block"
                            >
                              <span className="text-xs font-bold text-graphite group-hover/sub:text-petrol transition-colors block">
                                {sub.name}
                              </span>
                              <span className="text-[10px] text-copper font-mono italic block py-0.5">
                                {sub.tagline}
                              </span>
                              <p className="text-[11px] text-graphite-muted leading-tight mt-1">
                                {sub.description}
                              </p>
                              <span className="text-[10px] font-mono text-petrol font-semibold mt-2 inline-block">
                                Explore Concept &rarr;
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 5. Intended Outcomes */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-petrol">
                        <span>05 &bull; Intended Outcomes</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-graphite">
                        {sol.intendedOutcomes.map((out) => (
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

                    {/* 6. Related Orbion Product or Service */}
                    <div className="pt-4 border-t border-graphite/10 flex flex-wrap items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-mono text-graphite-muted uppercase block">
                          Related Offering &bull; {sol.relatedOffering.statusNote}
                        </span>
                        <span className="text-sm font-bold text-graphite">
                          {sol.relatedOffering.label}
                        </span>
                      </div>

                      {sol.relatedOffering.links && (
                        <div className="flex flex-wrap items-center gap-3">
                          {sol.relatedOffering.links.map((lnk) => (
                            <Link
                              key={lnk.name}
                              href={lnk.href}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-petrol text-pure-white text-xs font-mono font-semibold uppercase tracking-wider hover:bg-petrol-dark transition-colors"
                            >
                              <span>{lnk.name}</span>
                              <span>&rarr;</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column (Conceptual Visual Schematic) */}
                  <div className={`lg:col-span-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="sticky top-28">
                      {renderSolutionVisual(sol.id)}
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

