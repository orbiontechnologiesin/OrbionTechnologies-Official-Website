"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/products-data";
import { ArrowRight, Sparkles, Layers } from "lucide-react";

export function ProductsCollection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProducts =
    selectedCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.categoryGroup === selectedCategory);

  return (
    <section id="directory" className="py-20 sm:py-24 bg-limestone/40 border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <ScrollReveal direction="up" delay={0.1}>
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-copper block">
                Section 03 &bull; Compact Product Directory
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-graphite mt-1">
                Ecosystem At a Glance
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.15}>
              <p className="text-sm sm:text-base text-graphite-muted leading-relaxed">
                Filter and browse all seven upcoming software products in our engineering roadmap.
              </p>
            </ScrollReveal>
          </div>

          {/* Category Filter Pills */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="flex flex-wrap items-center gap-2 bg-pure-white p-1.5 rounded-xl border border-graphite/10 shadow-xs">
              {PRODUCT_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                    selectedCategory === category
                      ? "bg-petrol text-pure-white font-semibold shadow-xs"
                      : "text-graphite-muted hover:text-petrol hover:bg-limestone-light"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            return (
              <ScrollReveal key={product.id} direction="up" delay={0.1}>
                <article className="h-full rounded-2xl bg-pure-white border border-graphite/10 p-6 shadow-xs hover:border-petrol/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    {/* Top Meta */}
                    <div className="flex items-center justify-between pb-3 border-b border-graphite/10 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-copper">{product.number}</span>
                        <span className="text-graphite/20">/</span>
                        <span className="text-graphite-muted uppercase tracking-wider text-[11px] truncate max-w-[130px]">
                          {product.categoryGroup}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-copper/10 border border-copper/30 text-copper text-[10px] font-bold">
                        COMING SOON
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-graphite group-hover:text-petrol transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs font-mono font-medium text-copper mt-1">
                        &ldquo;{product.tagline}&rdquo;
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed line-clamp-3">
                      {product.shortDescription}
                    </p>

                    {/* Capabilities count */}
                    <div className="pt-2 flex items-center gap-2 text-xs font-mono text-graphite-muted/80">
                      <Layers className="w-3.5 h-3.5 text-petrol" />
                      <span>{product.plannedCapabilities.length} Planned Subsystems</span>
                    </div>
                  </div>

                  {/* Footer Link */}
                  <div className="pt-5 mt-4 border-t border-graphite/10 flex items-center justify-between text-xs font-mono">
                    <Link
                      href={`/products/${product.id}`}
                      className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-petrol hover:text-copper transition-colors group/link"
                    >
                      <span>Explore Specification</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                    <span className="text-[10px] text-graphite-muted/60">PRE-RELEASE</span>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Prominent Coming Soon Statement Banner */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mt-12 p-6 rounded-2xl bg-petrol text-limestone-light border border-petrol-light flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-copper font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Pre-Release Architecture Notice</span>
              </div>
              <p className="text-xs sm:text-sm text-limestone-muted max-w-2xl">
                All seven Orbion software products are in active architectural design and pre-release engineering. Features, capabilities, and delivery timelines are subject to refinement as our team builds towards public availability.
              </p>
            </div>
            <Link
              href="#products-hero"
              className="text-xs font-mono text-copper hover:text-white transition-colors uppercase font-bold shrink-0"
            >
              Back to Top &uarr;
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
