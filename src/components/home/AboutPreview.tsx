import React from "react";
import { Container } from "@/components/ui/Container";
import { TextRepel } from "@/components/ui/text-repel";
import { COMPANY } from "@/lib/constants";

export function AboutPreview() {
  return (
    <section id="technology" className="py-20 sm:py-28 lg:py-36 bg-limestone/40 border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl space-y-4 mb-16 lg:mb-20">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-copper block">
            Founding Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-graphite">
            Engineering the foundation.
          </h2>
          <p className="text-base sm:text-lg text-graphite-muted leading-relaxed">
            Orbion Technologies was founded by engineers committed to practical intelligence, systems architecture, and sustainable product engineering.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {COMPANY.founders.map((founder) => (
            <div
              key={founder.name}
              className="rounded-2xl bg-pure-white border border-graphite/10 p-8 sm:p-10 shadow-xs flex flex-col justify-between space-y-6 transition-all duration-200 hover:border-petrol/30"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold tracking-wider uppercase text-petrol">
                    {founder.role}
                  </span>
                  <span className="text-xs font-mono text-graphite-muted/60">
                    ORBION TECHNOLOGIES
                  </span>
                </div>

                <h3 className="text-2xl font-semibold tracking-tight text-graphite">
                  <TextRepel
                    text={founder.name}
                    className="justify-start text-left"
                  />
                </h3>
                <p className="text-sm font-medium text-copper font-mono">
                  {founder.designation}
                </p>

                <p className="text-sm text-graphite-muted leading-relaxed">
                  Directs technical planning and implementation with an emphasis on {founder.focus}.
                </p>
              </div>

              {/* Verified Links */}
              <div className="pt-5 border-t border-graphite/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3">
                  <a
                    href={founder.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-graphite-muted hover:text-petrol transition-colors underline underline-offset-4"
                  >
                    GitHub
                  </a>
                  <span className="text-graphite/20">•</span>
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-graphite-muted hover:text-petrol transition-colors underline underline-offset-4"
                  >
                    LinkedIn
                  </a>
                </div>
                <a
                  href={`mailto:${founder.email}`}
                  className="text-copper hover:text-copper-hover font-medium transition-colors"
                >
                  Direct Email &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Future About Link CTA */}
        <div className="mt-12 p-6 rounded-xl bg-pure-white border border-graphite/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-graphite">
              Interested in our complete thesis and architecture?
            </p>
            <p className="text-xs text-graphite-muted">
              Our comprehensive company background, technical RFCs, and research papers will be published in subsequent releases.
            </p>
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-petrol font-semibold shrink-0">
            About Dossier &bull; Phase 2
          </span>
        </div>
      </Container>
    </section>
  );
}

