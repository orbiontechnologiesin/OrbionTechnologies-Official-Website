"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { COMPANY } from "@/lib/constants";

export function ContactInfo() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  return (
    <section className="py-20 sm:py-28 bg-limestone border-b border-graphite/10">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <ScrollReveal direction="down">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-copper">
              OFFICIAL CHANNELS &amp; REPOSITORY
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-graphite">
              Reach Orbion
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-base sm:text-lg text-graphite-muted leading-relaxed font-normal">
              Official company contact points, open-source repositories, and verified direct channels.
            </p>
          </ScrollReveal>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Card 1: Official Company Email */}
          <div className="p-8 rounded-3xl bg-pure-white border border-petrol/20 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-petrol/10 text-petrol text-xs font-mono font-bold">
                  PRIMARY INBOX
                </span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-graphite">Company Email</h3>
                <p className="text-xs text-graphite-muted mt-1 leading-relaxed">
                  General inquiries, software requirements, and official correspondences.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-limestone-light border border-graphite/10">
                <a
                  href={`mailto:${COMPANY.emails.general}`}
                  className="text-base sm:text-lg font-mono font-bold text-petrol hover:text-copper transition-colors break-all block"
                >
                  {COMPANY.emails.general}
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(COMPANY.emails.general)}
              className="w-full py-2.5 px-4 rounded-xl border border-graphite/20 hover:border-petrol text-xs font-mono font-semibold text-graphite hover:text-petrol hover:bg-limestone-light transition-all flex items-center justify-center gap-2"
            >
              {copiedEmail === COMPANY.emails.general ? (
                <>
                  <span className="text-green-600 font-bold">&#10003;</span>
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 text-graphite-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                  </svg>
                  <span>Copy Company Email</span>
                </>
              )}
            </button>
          </div>

          {/* Card 2: Company Entity & Web Domain */}
          <div className="p-8 rounded-3xl bg-pure-white border border-graphite/10 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-copper/10 text-copper text-xs font-mono font-bold inline-block">
                LEGAL ENTITY &amp; WEB
              </span>

              <div>
                <h3 className="text-lg font-bold text-graphite">Orbion Technologies</h3>
                <p className="text-xs text-graphite-muted mt-1 leading-relaxed">
                  Early-stage deep-tech and enterprise software engineering startup.
                </p>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between p-2.5 rounded-xl bg-limestone-light border border-graphite/5">
                  <span className="text-graphite-muted">Domain:</span>
                  <a
                    href={COMPANY.domain}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-petrol font-semibold hover:underline"
                  >
                    orbiontechnologies.in &nearr;
                  </a>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-limestone-light border border-graphite/5">
                  <span className="text-graphite-muted">Headquarters:</span>
                  <span className="font-semibold text-graphite">Solapur, Maharashtra, India</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[11px] font-mono text-graphite-muted/80 border-t border-graphite/10">
              Response timeframe: 24 to 48 business hours
            </div>
          </div>

          {/* Card 3: Open Source & Code Repositories */}
          <div className="p-8 rounded-3xl bg-pure-white border border-graphite/10 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-graphite/10 text-graphite text-xs font-mono font-bold inline-block">
                PUBLIC REPOSITORIES
              </span>

              <div>
                <h3 className="text-lg font-bold text-graphite">GitHub Organization</h3>
                <p className="text-xs text-graphite-muted mt-1 leading-relaxed">
                  Open architecture, public documentation, and developer tools.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-limestone-light border border-graphite/10">
                <a
                  href={COMPANY.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono font-bold text-petrol hover:text-copper transition-colors break-all block"
                >
                  github.com/orbiontechnologiesin &nearr;
                </a>
              </div>
            </div>

            <a
              href={COMPANY.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl border border-graphite/20 hover:border-petrol text-xs font-mono font-semibold text-graphite hover:text-petrol hover:bg-limestone-light transition-all flex items-center justify-center gap-2"
            >
              <span>View Website Repository &nearr;</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

