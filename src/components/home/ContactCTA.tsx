import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TextRepel } from "@/components/ui/text-repel";
import { COMPANY } from "@/lib/constants";

export function ContactCTA() {
  return (
    <section id="contact" className="py-20 sm:py-28 lg:py-36 bg-limestone-light">
      <Container>
        <div className="rounded-3xl bg-petrol p-8 sm:p-12 lg:p-16 text-limestone-light relative overflow-hidden shadow-xl border border-petrol-light">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-grid-petrol opacity-25 pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-petrol-dark/80 border border-limestone-light/15 text-xs font-mono tracking-wider text-sage">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" />
              <span>DIRECT INQUIRIES & PARTNERSHIPS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-pure-white leading-tight">
              <TextRepel
                text="Let's build what's next."
                className="justify-start text-left"
              />
            </h2>

            <p className="text-base sm:text-lg text-limestone-muted leading-relaxed max-w-2xl">
              Have an idea, a challenge or a project in mind? Let&apos;s start a conversation. We work closely with forward-looking organizations seeking to deploy intelligent software and autonomous workflow systems.
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
      </Container>
    </section>
  );
}
