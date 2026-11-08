"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { TextRepel } from "@/components/ui/text-repel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/products-data";
import { ProductVisual } from "./ProductVisuals";

export function ProductsCollection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProducts =
    selectedCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.categoryGroup === selectedCategory);

  return (
    <section id="collection" className="py-20 sm:py-28 lg:py-36 bg-limestone/30 border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 lg:mb-20">
          <div className="max-w-2xl space-y-4">
            <ScrollReveal direction="up" delay={0.1}>
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-copper block">
                Section 02 &bull; Upcoming Product Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-graphite leading-tight mt-2">
                <TextRepel
                  text="What we're building."
                  className="justify-start text-left"
                />
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.15}>
              <p className="text-base sm:text-lg text-graphite-muted leading-relaxed">
                An evolving collection of software products designed around real business needs. Each product is currently in architectural design and engineering planning.
              </p>
              <div className="h-1 w-16 bg-petrol rounded-full mt-4" />
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

        {/* Product Collection Entries */}
        <div className="space-y-16 lg:space-y-24">
          {filteredProducts.map((product, index) => {
            const isEven = index % 2 === 1;

            return (
              <ScrollReveal key={product.id} direction="up" delay={0.1}>
                <article
                  id={product.id}
                  className="rounded-3xl bg-pure-white border border-graphite/10 p-6 sm:p-10 lg:p-14 shadow-xs hover:border-petrol/30 hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                    {/* Content Column (Swapped on alternating items for editorial rhythm) */}
                    <div
                      className={`lg:col-span-6 space-y-6 ${
                        isEven ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      {/* Top Meta: Number, Category & Conspicuous COMING SOON Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-graphite/10">
                        <div className="flex items-center gap-2.5">
                          <span className="text-base font-mono font-bold text-copper">
                            {product.number}
                          </span>
                          <span className="text-graphite/30 text-xs font-mono">/</span>
                          <span className="text-xs font-mono tracking-wider uppercase text-graphite-muted font-medium">
                            {product.category}
                          </span>
                        </div>

                        {/* Conspicuous Coming Soon Badge */}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-copper/15 border border-copper/35 text-copper text-xs font-mono font-bold tracking-wider">
                          <span className="h-1.5 w-1.5 rounded-full bg-copper animate-pulse" />
                          <span>COMING SOON</span>
                        </span>
                      </div>

                      {/* Product Name & Tagline */}
                      <div className="space-y-2">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-graphite group-hover:text-petrol transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm sm:text-base font-medium text-copper font-mono">
                          &ldquo;{product.tagline}&rdquo;
                        </p>
                      </div>

                      {/* Short Description */}
                      <p className="text-base text-graphite-muted leading-relaxed">
                        {product.shortDescription}
                      </p>

                      {/* Planned Capabilities */}
                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-mono uppercase tracking-widest text-petrol font-semibold block">
                          Planned Capabilities &bull; Architectural Scope
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-graphite">
                          {product.plannedCapabilities.map((cap) => (
                            <li
                              key={cap}
                              className="flex items-start gap-2 p-2 rounded bg-limestone-light/60 border border-graphite/5"
                            >
                              <span className="text-copper font-bold">&rsaquo;</span>
                              <span className="text-graphite-muted">{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Product Status Explanatory Note & Specification Link */}
                      <div className="pt-4 border-t border-graphite/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                        <Link
                          href={`/products/${product.id}`}
                          className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-petrol hover:text-copper transition-colors group/link"
                        >
                          <span>Explore Specification</span>
                          <span className="transition-transform group-hover/link:translate-x-1">&rarr;</span>
                        </Link>
                        <span className="text-graphite-muted/70">PRE-RELEASE ONLY</span>
                      </div>
                    </div>

                    {/* Conceptual Visual Column */}
                    <div
                      className={`lg:col-span-6 ${
                        isEven ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <ProductVisual productId={product.id} />
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
