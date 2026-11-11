import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ArrowLeft } from "lucide-react";
import { getPublicCaseStudyBySlug } from "@/services/cms-case-studies.service";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getPublicCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Case Study Not Found | Orbion Technologies",
    };
  }

  return {
    title: `${study.title} | Orbion Technologies Case Study`,
    description: study.summary,
    openGraph: {
      title: `${study.title} | Orbion Technologies Case Study`,
      description: study.summary,
      url: `https://orbiontechnologies.in/case-studies/${study.slug}`,
      siteName: "Orbion Technologies",
      type: "article",
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getPublicCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-limestone-light text-graphite selection:bg-petrol selection:text-pure-white">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <Container>
          <div className="max-w-4xl mx-auto mb-8">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-xs font-mono text-graphite-muted hover:text-copper transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Case Studies</span>
            </Link>
          </div>

          <article className="max-w-4xl mx-auto space-y-10">
            {/* Header */}
            <header className="space-y-4 pb-8 border-b border-graphite-border">
              <div className="flex items-center gap-3 text-xs font-mono text-copper font-medium uppercase">
                <span>{study.industry || "Enterprise"}</span>
                <span>•</span>
                <span className="text-graphite-subtle">{study.clientName || "Confidential Client"}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-graphite tracking-tight leading-tight">
                {study.title}
              </h1>

              <p className="text-lg text-graphite-muted leading-relaxed">
                {study.summary}
              </p>

              {study.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4">
                  {study.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-limestone border border-graphite-border text-xs font-mono text-graphite"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Featured Image */}
            {study.featuredImage && (
              <div className="rounded-2xl overflow-hidden border border-graphite-border bg-limestone-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={study.featuredImage}
                  alt={study.title}
                  className="w-full h-auto max-h-[500px] object-cover"
                />
              </div>
            )}

            {/* Content Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {study.challenge && (
                <div className="bg-limestone-card p-6 rounded-2xl border border-graphite-border">
                  <h2 className="text-sm font-mono uppercase tracking-wider text-copper font-bold mb-2">
                    01. The Challenge
                  </h2>
                  <p className="text-sm text-graphite leading-relaxed">
                    {study.challenge}
                  </p>
                </div>
              )}

              {study.approach && (
                <div className="bg-limestone-card p-6 rounded-2xl border border-graphite-border">
                  <h2 className="text-sm font-mono uppercase tracking-wider text-petrol font-bold mb-2">
                    02. Engineering Approach
                  </h2>
                  <p className="text-sm text-graphite leading-relaxed">
                    {study.approach}
                  </p>
                </div>
              )}

              {study.solution && (
                <div className="bg-limestone-card p-6 rounded-2xl border border-graphite-border">
                  <h2 className="text-sm font-mono uppercase tracking-wider text-copper font-bold mb-2">
                    03. Delivered Solution
                  </h2>
                  <p className="text-sm text-graphite leading-relaxed">
                    {study.solution}
                  </p>
                </div>
              )}

              {study.outcome && (
                <div className="bg-limestone-card p-6 rounded-2xl border border-graphite-border">
                  <h2 className="text-sm font-mono uppercase tracking-wider text-emerald-600 font-bold mb-2">
                    04. Business Outcome
                  </h2>
                  <p className="text-sm text-graphite leading-relaxed">
                    {study.outcome}
                  </p>
                </div>
              )}
            </div>

            {/* Footer Engagement */}
            <footer className="mt-16 bg-limestone-card p-8 rounded-2xl border border-graphite-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-graphite">Build Similar Capabilities</h3>
                <p className="text-xs text-graphite-muted mt-0.5">
                  Engage Orbion Technologies to architect robust systems for your organization.
                </p>
              </div>
              <Link
                href="/contact"
                className="px-4 py-2 bg-copper hover:bg-copper-hover text-pure-white rounded-lg text-xs font-mono font-medium transition-colors shadow-xs"
              >
                Inquire With Engineering
              </Link>
            </footer>
          </article>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
