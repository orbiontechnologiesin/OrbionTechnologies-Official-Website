"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/services-data";
import { ServiceVisualRenderer } from "./ServiceVisuals";

export function ServicesList() {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);

  const activeService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];

  return (
    <section id="our-services" className="py-20 sm:py-28 bg-limestone-light border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <ScrollReveal direction="down">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-copper">
              CAPABILITIES & SPECIALIZATIONS
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-graphite">
              What we can build together.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed font-normal">
              A comprehensive spectrum of modern digital and software engineering capabilities tailored to businesses, startups, and growing enterprises.
            </p>
          </ScrollReveal>

          {/* Quick Service Selector Bar */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveServiceId(s.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                    activeServiceId === s.id
                      ? "bg-petrol text-pure-white font-bold shadow-xs scale-105"
                      : "bg-pure-white text-graphite-muted border border-graphite/10 hover:border-graphite/30 hover:text-graphite"
                  }`}
                >
                  <span className="opacity-60 mr-1.5">{s.number}</span>
                  <span>{s.badge}</span>
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Featured Service Interactive Deep Dive */}
        <div className="mb-24">
          <div className="bg-pure-white rounded-3xl border border-graphite/10 p-6 sm:p-10 lg:p-12 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Core Overview & Specs */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-mono font-bold text-copper">
                    Service {activeService.number}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-petrol/10 text-petrol text-xs font-mono font-semibold">
                    {activeService.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-graphite leading-tight">
                    {activeService.name}
                  </h3>
                  <p className="text-base text-copper font-medium mt-1">
                    {activeService.headline}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-graphite-muted leading-relaxed">
                  {activeService.description}
                </p>

                {/* Responsible AI Credibility Note if applicable */}
                {activeService.credibilityNote && (
                  <div className="p-4 rounded-xl bg-petrol/5 border-l-4 border-petrol text-xs text-graphite leading-relaxed">
                    <span className="font-bold text-petrol block mb-1">Ethical Engineering Standard:</span>
                    {activeService.credibilityNote}
                  </div>
                )}

                {/* Problems Addressed */}
                <div className="space-y-2.5 pt-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-graphite">
                    Problems This Addresses:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-graphite-muted">
                    {activeService.problems.map((prob, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-copper mt-0.5">&bull;</span>
                        <span>{prob}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Deliverables */}
                <div className="space-y-2.5 pt-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-graphite">
                    What We Deliver:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {activeService.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-limestone border border-graphite/10 text-graphite font-medium flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-petrol" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-graphite">
                    Relevant Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeService.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-graphite/5 text-graphite text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Intended Outcomes */}
                <div className="p-4 rounded-xl bg-sage/15 border border-sage/30 space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-petrol">
                    Intended Outcomes:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-graphite font-medium">
                    {activeService.outcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-petrol font-bold">&#10003;</span>
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-3">
                  <Button href={activeService.ctaHref} variant="petrol" size="md">
                    {activeService.ctaText} &rarr;
                  </Button>
                </div>
              </div>

              {/* Right Column: Architectural Visualization & Approach Steps */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-graphite-muted mb-3">
                    Technical Architecture Concept:
                  </h4>
                  <ServiceVisualRenderer serviceId={activeService.id} />
                </div>

                {/* 6-7 Step Approach Breakdown */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-graphite">
                    Engineering Approach Lifecycle:
                  </h4>
                  <div className="space-y-2.5">
                    {activeService.approach.map((step) => (
                      <div
                        key={step.step}
                        className="p-3 rounded-xl bg-limestone/70 border border-graphite/10 flex items-start gap-3.5 hover:bg-limestone transition-colors"
                      >
                        <span className="px-2 py-0.5 rounded bg-petrol/10 text-petrol text-xs font-mono font-bold">
                          {step.step}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-graphite">{step.title}</div>
                          <div className="text-xs text-graphite-muted mt-0.5 leading-relaxed">
                            {step.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All 6 Services At A Glance Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-graphite/10">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-copper">
                COMPLETE PORTFOLIO
              </span>
              <h3 className="text-2xl font-bold text-graphite">
                All 6 Service Capabilities At a Glance
              </h3>
            </div>
            <p className="text-xs font-mono text-graphite-muted">
              Select any card to inspect full technical specs above
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                onClick={() => {
                  setActiveServiceId(service.id);
                  // smooth scroll to detailed viewer
                  document.getElementById("our-services")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  activeServiceId === service.id
                    ? "bg-pure-white border-petrol shadow-md ring-2 ring-petrol/20"
                    : "bg-pure-white border-graphite/10 hover:border-graphite/30 hover:shadow-xs"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono font-bold text-copper">
                      Service {service.number}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-graphite/5 text-graphite text-[11px] font-mono font-semibold">
                      {service.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-graphite hover:text-petrol transition-colors">
                      {service.name}
                    </h4>
                    <p className="text-xs text-copper font-medium mt-1">
                      {service.headline}
                    </p>
                  </div>

                  <p className="text-xs text-graphite-muted leading-relaxed line-clamp-3">
                    {service.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-[11px] font-mono text-graphite font-semibold block mb-1.5">
                      Core Technologies:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {service.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-limestone text-graphite-muted text-[10px] font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-graphite/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-petrol group-hover:underline">
                    View Technical Architecture &rarr;
                  </span>
                  <span className="w-2 h-2 rounded-full bg-copper" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
