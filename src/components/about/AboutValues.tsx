import React from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutValues() {
  const values = [
    {
      num: "01",
      title: "Purpose before complexity",
      description:
        "We believe technology should solve meaningful problems rather than introduce unnecessary complexity. Every architecture we design must have a clear reason to exist.",
    },
    {
      num: "02",
      title: "Engineering with intention",
      description:
        "Every product, system, and experience should be built with clarity, discipline, and attention to detail. We craft enduring code and thoughtful interfaces.",
    },
    {
      num: "03",
      title: "Curiosity without limits",
      description:
        "We continuously explore emerging technologies, question existing approaches, and learn through disciplined experimentation and empirical validation.",
    },
    {
      num: "04",
      title: "Progress through execution",
      description:
        "Ideas matter, but meaningful progress comes from building, testing, improving, and delivering. We measure ourselves by what we actually engineer and ship.",
    },
    {
      num: "05",
      title: "Built for what comes next",
      description:
        "We think beyond immediate requirements and aim to create technology that can evolve with changing needs, open protocols, and shifting technological frontiers.",
    },
  ];

  return (
    <section id="values" className="py-20 sm:py-28 lg:py-36 bg-limestone/30 border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16 lg:mb-20">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-copper block">
              Section 06 &bull; Philosophy &amp; Core Values
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-graphite mt-2">
              What drives us.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed">
              The foundational convictions and engineering standards that guide how we approach research, system architecture, and product development.
            </p>
            <div className="h-1 w-16 bg-petrol rounded-full mt-4" />
          </ScrollReveal>
        </div>

        {/* Asymmetrical Editorial Numbered Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* First Two Values: Span 6 cols each on md+ */}
          {values.slice(0, 2).map((item, index) => (
            <div key={item.num} className="md:col-span-6">
              <ScrollReveal direction="up" delay={0.1 * (index + 1)}>
                <div className="h-full rounded-2xl bg-pure-white border border-graphite/10 p-8 sm:p-10 shadow-xs hover:border-petrol/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-6 group">
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-semibold tracking-wider text-copper group-hover:text-petrol transition-colors">
                      VALUE {item.num}
                    </span>
                    <h3 className="text-2xl font-semibold tracking-tight text-graphite">
                      {item.title}
                    </h3>
                    <p className="text-base text-graphite-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-graphite/5 text-[11px] font-mono text-graphite-muted/60 uppercase tracking-wider">
                    Core Operational Tenet
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}

          {/* Next Three Values: Span 4 cols each on md+ */}
          {values.slice(2, 5).map((item, index) => (
            <div key={item.num} className="md:col-span-4">
              <ScrollReveal direction="up" delay={0.1 * (index + 3)}>
                <div className="h-full rounded-2xl bg-pure-white border border-graphite/10 p-8 shadow-xs hover:border-petrol/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-6 group">
                  <div className="space-y-4">
                    <span className="text-xs font-mono font-semibold tracking-wider text-copper group-hover:text-petrol transition-colors">
                      VALUE {item.num}
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight text-graphite">
                      {item.title}
                    </h3>
                    <p className="text-sm text-graphite-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-graphite/5 text-[11px] font-mono text-graphite-muted/60 uppercase tracking-wider">
                    Core Operational Tenet
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

