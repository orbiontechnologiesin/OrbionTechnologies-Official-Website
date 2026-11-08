"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextRepel } from "@/components/ui/text-repel";
import { PRICING_PRODUCTS, PRICING_COPY } from "@/lib/pricing-data";
import type { UserSession } from "@/lib/auth";

interface PricingLoggedInProps {
  session: UserSession;
}

export function PricingLoggedIn({ session }: PricingLoggedInProps) {
  const { eyebrow, statusBadge, headline, description, statusTitle, statusMessage } =
    PRICING_COPY.authenticated;
  const { headline: announcementHeadline, description: announcementDescription } =
    PRICING_COPY.announcement;

  return (
    <div className="py-24 sm:py-32 bg-limestone-light">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-grid-petrol opacity-15 pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center space-y-7 mb-16 sm:mb-20">
          {/* Eyebrow & Access Verified Badge */}
          <ScrollReveal direction="down">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-petrol/5 border border-petrol/15 text-petrol text-xs font-mono font-bold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-copper" />
                <span>{eyebrow}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-700 text-xs font-mono font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>{statusBadge}</span>
              </div>
            </div>
          </ScrollReveal>

          {/* User Welcome Line */}
          <ScrollReveal direction="up" delay={0.05}>
            <div className="text-xs font-mono text-graphite-muted">
              Authenticated Session:{" "}
              <span className="text-petrol font-semibold">
                {session.user.name || session.user.email || "Verified Member"}
              </span>
            </div>
          </ScrollReveal>

          {/* Main Headline with Text Repel */}
          <ScrollReveal direction="up" delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-graphite leading-[1.15]">
              <TextRepel text={headline} />
            </h1>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-lg sm:text-xl text-graphite-muted leading-relaxed max-w-3xl mx-auto font-normal">
              {description}
            </p>
          </ScrollReveal>

          {/* Status Banner */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="p-6 sm:p-7 rounded-2xl bg-pure-white border border-copper/30 shadow-xs max-w-3xl mx-auto text-left relative overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-copper" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <span className="text-sm font-mono font-bold uppercase tracking-wider text-copper">
                  {statusTitle}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-copper/10 text-copper text-[11px] font-mono font-semibold">
                  DEVELOPMENT STAGE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-graphite leading-relaxed">
                {statusMessage}
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* 7 Product Pricing Collection (Exact Order 1-7) */}
        <div className="space-y-6 max-w-5xl mx-auto mb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-graphite/10">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-copper">
                PRODUCT ECOSYSTEM PRICING STATUS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-graphite">
                Upcoming Products &amp; Pricing Directory
              </h2>
            </div>
            <span className="text-xs font-mono text-graphite-muted">
              7 Products Envisioned &bull; Zero Speculative Prices
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRICING_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="group p-6 sm:p-7 rounded-3xl bg-pure-white border border-graphite/10 hover:border-petrol hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Bar with Number & Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-sm font-mono font-bold text-copper">
                      Product {product.number}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-graphite/5 text-graphite text-[10px] font-mono font-semibold">
                        {product.status}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-copper/10 text-copper text-[10px] font-mono font-bold group-hover:bg-copper group-hover:text-pure-white transition-colors">
                        {product.pricingStatus}
                      </span>
                    </div>
                  </div>

                  {/* Title & Category */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-graphite group-hover:text-petrol transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs font-mono text-copper font-medium mt-1">
                      {product.category}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed">
                    {product.description}
                  </p>

                  {/* Planned Functional Areas */}
                  <div className="pt-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-graphite font-semibold block mb-2">
                      Planned Focus Areas:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-graphite">
                      {product.plannedAreas.map((area, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-petrol/60 shrink-0" />
                          <span className="leading-tight">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer of Card: Learn More Link & Pricing Notice */}
                <div className="pt-5 mt-5 border-t border-graphite/10 flex items-center justify-between">
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-xs font-semibold text-petrol hover:text-copper transition-colors inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>View Product Vision</span>
                    <span>&rarr;</span>
                  </Link>

                  <span className="text-[11px] font-mono text-graphite-muted/80">
                    Pricing TBD
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Announcement Section */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-petrol text-pure-white text-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-limestone opacity-10 pointer-events-none" />
            <div className="relative z-10 space-y-5">
              <span className="px-3.5 py-1 rounded-full bg-pure-white/10 text-sage text-xs font-mono font-bold tracking-widest uppercase inline-block">
                PRICING PHILOSOPHY
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-pure-white">
                <TextRepel text={announcementHeadline} />
              </h2>

              <p className="text-sm sm:text-base text-limestone-light/90 leading-relaxed max-w-2xl mx-auto font-normal">
                {announcementDescription}
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-copper text-pure-white text-sm font-medium hover:bg-copper-hover transition-colors shadow-sm"
                >
                  Explore Upcoming Products &rarr;
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-pure-white/30 text-pure-white text-sm font-medium hover:bg-pure-white/10 transition-colors"
                >
                  Explore Current Services
                </Link>
              </div>

              <div className="pt-6 border-t border-pure-white/10 text-[11px] font-mono text-sage tracking-wider">
                Orbion Technologies &bull; Thoughtful Engineering Before Commercial Plans
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}

