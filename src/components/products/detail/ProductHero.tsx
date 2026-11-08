"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextRepel } from "@/components/ui/text-repel";
import type { ProductDetail } from "@/lib/product-detail-data";
import {
  CrmVisual,
  ChatbotVisual,
  BookingsVisual,
  FitVisual,
  DineVisual,
  DocsVisual,
  InsightsVisual,
} from "@/components/products/ProductVisuals";

function renderProductVisual(slug: string) {
  switch (slug) {
    case "orbion-crm":
      return <CrmVisual />;
    case "orbion-ai-chatbot":
      return <ChatbotVisual />;
    case "orbion-bookings":
      return <BookingsVisual />;
    case "orbion-fit":
      return <FitVisual />;
    case "orbion-dine":
      return <DineVisual />;
    case "orbion-docs":
      return <DocsVisual />;
    case "orbion-insights":
      return <InsightsVisual />;
    default:
      return null;
  }
}

export function ProductHero({ product }: { product: ProductDetail }) {
  return (
    <section className="relative pt-32 sm:pt-40 pb-16 lg:pb-24 overflow-hidden border-b border-graphite/10 bg-limestone">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-grid-petrol opacity-20 pointer-events-none" />

      <Container className="relative z-10">
        {/* Breadcrumb Navigation */}
        <ScrollReveal direction="down">
          <div className="flex items-center gap-2 text-xs font-mono text-graphite-muted mb-8">
            <Link
              href="/products"
              className="hover:text-petrol transition-colors flex items-center gap-1"
            >
              <span>&larr;</span>
              <span>All Products</span>
            </Link>
            <span>/</span>
            <span className="text-copper font-semibold">{product.name}</span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Product Identity & Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="up" delay={0.05}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-petrol/5 border border-petrol/15 text-petrol text-xs font-mono font-bold tracking-wider uppercase">
                  <span>{product.number}</span>
                  <span className="text-petrol/30">&bull;</span>
                  <span>{product.category}</span>
                </span>

                {/* Conspicuous Coming Soon Badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-copper/15 border border-copper/35 text-copper text-xs font-mono font-bold tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-copper animate-pulse" />
                  <span>COMING SOON</span>
                </span>
              </div>
            </ScrollReveal>

            {/* Product Name & Interactive Text Repel Headline */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="space-y-3">
                <h2 className="text-xs font-mono uppercase tracking-widest text-graphite-muted">
                  {product.name}
                </h2>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-graphite leading-[1.12]">
                  <TextRepel text={product.headline} />
                </h1>
              </div>
            </ScrollReveal>

            {/* Supporting Description */}
            <ScrollReveal direction="up" delay={0.15}>
              <p className="text-base sm:text-lg text-graphite-muted leading-relaxed max-w-2xl">
                {product.supportingDescription}
              </p>
            </ScrollReveal>

            {/* Architectural Telemetry Box */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="p-4 rounded-xl bg-pure-white border border-graphite/10 shadow-xs space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-graphite-muted border-b border-graphite/10 pb-2">
                  <span className="uppercase tracking-wider font-semibold text-petrol">
                    Architecture Telemetry
                  </span>
                  <span className="text-copper font-medium">STAGE: R&amp;D</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-graphite">
                  <div>
                    <span className="text-graphite-muted block">System Engine:</span>
                    <span className="font-semibold text-graphite">{product.telemetry.architectureType}</span>
                  </div>
                  <div>
                    <span className="text-graphite-muted block">Lifecycle Cadence:</span>
                    <span className="font-semibold text-copper">{product.telemetry.planningCycle}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Conceptual Schematic Visual */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="up" delay={0.25}>
              <div className="relative">
                {renderProductVisual(product.slug)}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

