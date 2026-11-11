import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ShieldCheck } from "lucide-react";
import { getPublicCaseStudies } from "@/services/cms-case-studies.service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Case Studies & Architectural Milestones | Orbion Technologies",
  description:
    "Verified commercial deliveries, distributed systems architectures, and enterprise technology case studies by Orbion Technologies.",
  openGraph: {
    title: "Case Studies & Architectural Milestones | Orbion Technologies",
    description:
      "Verified commercial deliveries, distributed systems architectures, and enterprise technology case studies by Orbion Technologies.",
    url: "https://orbiontechnologies.in/case-studies",
    siteName: "Orbion Technologies",
    type: "website",
  },
};

export default async function PublicCaseStudiesPage() {
  const { studies } = await getPublicCaseStudies({ page: 1, limit: 12 });

  return (
    <div className="min-h-screen flex flex-col bg-limestone-light text-graphite selection:bg-petrol selection:text-pure-white">
      <Navbar />

      <main className="flex-1">
        {/* HERO HEADER */}
        <section className="pt-36 pb-16 bg-gradient-to-b from-limestone/50 to-limestone-light border-b border-graphite-border">
          <Container>
            <div className="max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-widest text-copper font-semibold block mb-2">
                Proven Deliveries & Methodology
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-graphite tracking-tight">
                Engineering In Action.
                <br />
                <span className="text-petrol font-serif italic font-normal">
                  Verified Commercial Impact.
                </span>
              </h1>
              <p className="mt-4 text-base text-graphite-muted leading-relaxed max-w-2xl">
                Rigorous technical case studies detailing architecture, delivery roadmaps, and engineering decisions across enterprise systems.
              </p>
            </div>
          </Container>
        </section>

        {/* CASE STUDIES SECTION */}
        <section className="py-20">
          <Container>
            {studies.length === 0 ? (
              /* HONEST, DIGNIFIED EMPTY STATE — ZERO FABRICATED TESTIMONIALS */
              <div className="p-16 text-center bg-limestone-card rounded-2xl border border-graphite-border max-w-2xl mx-auto shadow-xs">
                <div className="w-12 h-12 rounded-full bg-limestone-light flex items-center justify-center mx-auto mb-4 text-petrol">
                  <ShieldCheck className="w-6 h-6 text-copper" />
                </div>
                <h2 className="text-lg font-bold text-graphite">
                  Case Studies Under Review & Verification
                </h2>
                <p className="text-sm text-graphite-muted mt-2 leading-relaxed">
                  In strict accordance with our commercial confidentiality standards and client agreements, Orbion Technologies publishes case studies exclusively upon signed verification. Client deliverables are currently undergoing mutual approval prior to public release.
                </p>
                <div className="mt-6 pt-6 border-t border-graphite-border/70 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs font-mono">
                  <Link
                    href="/products"
                    className="px-4 py-2 bg-copper text-pure-white rounded-lg hover:bg-copper-hover transition-colors font-medium"
                  >
                    Explore Upcoming Products
                  </Link>
                  <Link
                    href="/contact"
                    className="px-4 py-2 bg-limestone-light border border-graphite-border text-graphite rounded-lg hover:bg-limestone transition-colors"
                  >
                    Discuss Your Architecture
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {studies.map((study) => (
                  <article
                    key={study.id}
                    className="group bg-limestone-card rounded-2xl border border-graphite-border hover:border-copper/40 transition-all duration-300 overflow-hidden flex flex-col shadow-xs hover:shadow-md"
                  >
                    {study.featuredImage && (
                      <div className="h-48 relative overflow-hidden bg-limestone-light">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={study.featuredImage}
                          alt={study.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-mono text-graphite-subtle mb-2">
                          <span className="text-copper font-medium uppercase">{study.industry || "Enterprise"}</span>
                          <span>{study.clientName || "Confidential"}</span>
                        </div>

                        <h2 className="text-xl font-bold text-graphite group-hover:text-copper transition-colors leading-snug">
                          <Link href={`/case-studies/${study.slug}`}>
                            {study.title}
                          </Link>
                        </h2>

                        <p className="mt-2.5 text-xs text-graphite-muted line-clamp-3 leading-relaxed">
                          {study.summary}
                        </p>
                      </div>

                      {study.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-graphite-border/70">
                          {study.technologies.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded bg-limestone-light border border-graphite-border text-[10px] font-mono text-graphite-muted"
                            >
                              {tech}
                            </span>
                          ))}
                          {study.technologies.length > 3 && (
                            <span className="px-2 py-0.5 text-[10px] font-mono text-graphite-subtle">
                              +{study.technologies.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
