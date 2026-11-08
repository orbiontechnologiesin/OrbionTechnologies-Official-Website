"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PROJECT_INQUIRY_TYPES } from "@/lib/services-data";

export function ServicesProjectTypes() {
  return (
    <section className="py-20 sm:py-28 bg-limestone-light border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <ScrollReveal direction="down">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-copper">
              PROJECT INITIATION
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-graphite">
              Have something in mind?
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed font-normal">
              Whether you are architecting a new digital product from scratch or streamlining existing operational infrastructure, here are the engagement scopes we regularly explore.
            </p>
          </ScrollReveal>
        </div>

        {/* 8 Project Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROJECT_INQUIRY_TYPES.map((project, idx) => (
            <Link
              key={project.id}
              href="/#contact"
              className="group p-6 rounded-2xl bg-pure-white border border-graphite/10 hover:border-petrol hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-copper">
                    0{idx + 1}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-graphite/20 group-hover:bg-copper transition-colors" />
                </div>

                <h3 className="text-base font-bold text-graphite group-hover:text-petrol transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-graphite-muted leading-relaxed">
                  {project.subtitle}
                </p>

                <div className="pt-2 border-t border-graphite/10 space-y-1">
                  <span className="text-[10px] font-mono text-graphite-muted block">
                    Deliverables:
                  </span>
                  <p className="text-[11px] text-graphite font-medium leading-tight">
                    {project.deliverablesSummary}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-3 flex items-center justify-between text-xs font-semibold text-petrol group-hover:translate-x-1 transition-transform">
                <span>Start conversation &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

