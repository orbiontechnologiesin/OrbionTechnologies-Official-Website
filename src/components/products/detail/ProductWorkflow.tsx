import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProductWorkflowVisual } from "@/components/products/ProductWorkflowVisuals";
import type { WorkflowStep } from "@/lib/product-detail-data";

export function ProductWorkflow({
  workflow,
  productName,
}: {
  workflow: {
    steps: WorkflowStep[];
    diagramType:
      | "crm-pipeline"
      | "chatbot-conversation"
      | "bookings-scheduling"
      | "fit-membership"
      | "dine-ordering"
      | "docs-extraction"
      | "insights-analytics";
    diagramCaption: string;
    workflowEmphasis?: string;
  };
  productName: string;
}) {
  return (
    <section className="py-20 lg:py-28 bg-pure-white border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 border border-copper/20 text-copper text-xs font-mono font-bold tracking-wider uppercase">
              <span>System Flow</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-graphite tracking-tight">
              Intended workflow for {productName}.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-sm sm:text-base text-graphite-muted leading-relaxed">
              A proposed operational journey engineered to guide users from initial input to verifiable outcomes with minimal cognitive friction.
            </p>
          </ScrollReveal>
        </div>

        {/* Conceptual Illustrative Workflow Diagram (Full Width) */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mb-14">
            <ProductWorkflowVisual type={workflow.diagramType} />
          </div>
        </ScrollReveal>

        {/* Step-by-Step Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {workflow.steps.map((st, idx) => (
            <ScrollReveal key={st.step} direction="up" delay={0.05 * (idx + 1)}>
              <div className="p-6 rounded-2xl bg-limestone-light border border-graphite/10 hover:border-petrol/30 transition-all space-y-3 h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-copper font-bold text-sm">
                      STEP {st.step}
                    </span>
                    <span className="text-graphite-muted/60 text-[10px] uppercase">
                      TRANSITION
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-graphite">
                    {st.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed">
                    {st.description}
                  </p>
                </div>

                <div className="pt-2 text-[10px] font-mono text-graphite-muted/70 flex items-center gap-1">
                  <span>&bull;</span>
                  <span>Sequential Stage Progression</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Workflow Emphasis Callout */}
        {workflow.workflowEmphasis && (
          <ScrollReveal direction="up" delay={0.25}>
            <div className="p-4 sm:p-5 rounded-xl bg-petrol/5 border border-petrol/15 flex items-start gap-3 text-xs font-mono text-petrol">
              <span className="text-copper font-bold text-base leading-none">&bull;</span>
              <p className="leading-relaxed">
                <strong className="font-semibold uppercase tracking-wider">Engineering Focus: </strong>
                {workflow.workflowEmphasis}
              </p>
            </div>
          </ScrollReveal>
        )}
      </Container>
    </section>
  );
}

