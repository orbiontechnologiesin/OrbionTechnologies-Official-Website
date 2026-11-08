import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PRODUCT_DETAILS } from "@/lib/product-detail-data";

export function ProductNavigation({ currentSlug }: { currentSlug: string }) {
  const currentIndex = PRODUCT_DETAILS.findIndex((p) => p.slug === currentSlug);

  // Wrap around sequence for cyclical navigation
  const prevIndex =
    (currentIndex - 1 + PRODUCT_DETAILS.length) % PRODUCT_DETAILS.length;
  const nextIndex = (currentIndex + 1) % PRODUCT_DETAILS.length;

  const prevProduct = PRODUCT_DETAILS[prevIndex];
  const nextProduct = PRODUCT_DETAILS[nextIndex];

  return (
    <nav className="py-12 bg-limestone-light border-b border-graphite/10" aria-label="Product navigation">
      <Container>
        <ScrollReveal direction="up">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
            {/* Previous Product */}
            <Link
              href={`/products/${prevProduct.slug}`}
              className="p-5 rounded-2xl bg-pure-white border border-graphite/10 hover:border-petrol/40 hover:shadow-xs transition-all group flex flex-col justify-between"
            >
              <div className="text-[11px] font-mono text-graphite-muted flex items-center gap-1.5 pb-2">
                <span className="text-copper">&larr;</span>
                <span>PREVIOUS PRODUCT</span>
              </div>
              <div>
                <div className="text-xs font-mono text-copper font-bold">
                  {prevProduct.number}
                </div>
                <div className="text-base font-bold text-graphite group-hover:text-petrol transition-colors">
                  {prevProduct.name}
                </div>
              </div>
            </Link>

            {/* Central Directory Anchor */}
            <div className="text-center order-last sm:order-none lg:order-none col-span-1 sm:col-span-2 lg:col-span-1">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pure-white border border-graphite/15 text-xs font-mono font-semibold uppercase tracking-wider text-graphite hover:border-petrol/40 hover:text-petrol transition-all shadow-xs"
              >
                <span>View Full Product Ecosystem</span>
                <span>&uarr;</span>
              </Link>
            </div>

            {/* Next Product */}
            <Link
              href={`/products/${nextProduct.slug}`}
              className="p-5 rounded-2xl bg-pure-white border border-graphite/10 hover:border-petrol/40 hover:shadow-xs transition-all group flex flex-col justify-between text-right"
            >
              <div className="text-[11px] font-mono text-graphite-muted flex items-center justify-end gap-1.5 pb-2">
                <span>NEXT PRODUCT</span>
                <span className="text-copper">&rarr;</span>
              </div>
              <div>
                <div className="text-xs font-mono text-copper font-bold">
                  {nextProduct.number}
                </div>
                <div className="text-base font-bold text-graphite group-hover:text-petrol transition-colors">
                  {nextProduct.name}
                </div>
              </div>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </nav>
  );
}

