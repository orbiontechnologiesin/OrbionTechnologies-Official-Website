import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ProductStatus({
  statusNotice,
  stage,
}: {
  statusNotice: string;
  stage: string;
}) {
  return (
    <section className="py-8 bg-copper/5 border-b border-copper/15">
      <Container>
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-pure-white border border-copper/25 shadow-xs">
            <div className="flex items-start gap-4">
              <span className="shrink-0 mt-0.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-copper/15 border border-copper/35 text-copper text-xs font-mono font-bold tracking-wider">
                <span className="h-2 w-2 rounded-full bg-copper animate-pulse" />
                <span>COMING SOON</span>
              </span>
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-graphite">
                  Development Status &bull; {stage}
                </div>
                <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed max-w-3xl">
                  {statusNotice}
                </p>
              </div>
            </div>

            <div className="shrink-0 text-xs font-mono text-graphite-muted/80 px-3 py-1.5 rounded bg-limestone-light border border-graphite/10">
              NON-LAUNCHED SPECIFICATION
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

