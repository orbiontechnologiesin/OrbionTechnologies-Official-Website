"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextRepel } from "@/components/ui/text-repel";

export function ProductCTA({
  closing,
}: {
  closing: {
    statement: string;
    subtext: string;
  };
}) {
  return (
    <section className="py-20 lg:py-28 bg-pure-white border-b border-graphite/10">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Badge */}
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 border border-copper/20 text-copper text-xs font-mono font-bold tracking-wider uppercase">
              <span>Orbion Roadmap In Progress</span>
            </div>
          </ScrollReveal>

          {/* Closing Statement with Text Repel */}
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-graphite leading-[1.15]">
              <TextRepel text={closing.statement} />
            </h2>
          </ScrollReveal>

          {/* Subtext */}
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed max-w-2xl mx-auto">
              {closing.subtext}
            </p>
          </ScrollReveal>

          {/* Inquiry Channel */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="p-6 sm:p-8 rounded-2xl bg-limestone-light border border-graphite/10 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-graphite">
                Interested in what we&apos;re building?
              </h3>
              <p className="text-xs sm:text-sm text-graphite-muted max-w-xl mx-auto leading-relaxed">
                Orbion&apos;s product ecosystem is taking shape. Get in touch if you would like to learn more about our direction, collaborate on technical research, or share domain feedback.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-petrol text-pure-white text-xs font-mono font-semibold tracking-wider uppercase hover:bg-petrol-dark transition-colors shadow-xs"
                >
                  Contact Orbion
                </Link>
                <Link
                  href="https://github.com/orbiontechnologiesin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-pure-white text-graphite border border-graphite/15 text-xs font-mono font-semibold tracking-wider uppercase hover:border-petrol/40 transition-colors"
                >
                  Explore on GitHub &rarr;
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

