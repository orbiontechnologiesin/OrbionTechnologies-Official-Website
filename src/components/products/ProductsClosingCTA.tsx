import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TextRepel } from "@/components/ui/text-repel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { COMPANY } from "@/lib/constants";

export function ProductsClosingCTA() {
  return (
    <section id="closing" className="py-20 sm:py-28 lg:py-36 bg-limestone-light">
      <Container>
        <ScrollReveal direction="up" delay={0.1}>
          <div className="rounded-3xl bg-petrol p-8 sm:p-12 lg:p-16 text-limestone-light relative overflow-hidden shadow-xl border border-petrol-light">
            <div className="absolute inset-0 bg-grid-petrol opacity-25 pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-petrol-dark/80 border border-limestone-light/15 text-xs font-mono tracking-wider text-sage">
                <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                <span>SECTION 05 &bull; ARCHITECTURAL DIALOGUE</span>
              </div>

              {/* Headline with TextRepel */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-pure-white leading-tight">
                <TextRepel
                  text="The next chapter is being engineered."
                  className="justify-start text-left text-pure-white"
                />
              </h2>

              <p className="text-base sm:text-lg text-limestone-muted leading-relaxed max-w-2xl">
                Our product journey is just beginning. We&apos;re exploring, building, and shaping technology for what&apos;s next. If you are interested in our upcoming product roadmap or exploring early technical dialogue, we welcome thoughtful conversation.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button
                  href={`mailto:${COMPANY.emails.general}`}
                  variant="primary"
                  size="lg"
                >
                  Start a Conversation &rarr;
                </Button>
                <Button
                  href={COMPANY.github}
                  variant="secondary"
                  size="lg"
                  isExternal
                >
                  GitHub Organization
                </Button>
              </div>

              {/* Direct Communication Channels Grid */}
              <div className="mt-12 pt-8 border-t border-limestone-light/15 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
                <div className="space-y-1">
                  <span className="text-limestone-muted/70 block">GENERAL INTAKE</span>
                  <a
                    href={`mailto:${COMPANY.emails.general}`}
                    className="text-pure-white hover:text-copper transition-colors font-medium break-all"
                  >
                    {COMPANY.emails.general}
                  </a>
                </div>
                <div className="space-y-1">
                  <span className="text-limestone-muted/70 block">FOUNDER DIRECT</span>
                  <a
                    href={`mailto:${COMPANY.emails.founder}`}
                    className="text-pure-white hover:text-copper transition-colors font-medium break-all"
                  >
                    {COMPANY.emails.founder}
                  </a>
                </div>
                <div className="space-y-1">
                  <span className="text-limestone-muted/70 block">ENGINEERING DIRECT</span>
                  <a
                    href={`mailto:${COMPANY.emails.cofounder}`}
                    className="text-pure-white hover:text-copper transition-colors font-medium break-all"
                  >
                    {COMPANY.emails.cofounder}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

