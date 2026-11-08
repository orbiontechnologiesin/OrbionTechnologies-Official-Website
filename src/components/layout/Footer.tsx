import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { COMPANY, NAV_ITEMS } from "@/lib/constants";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-graphite-dark text-limestone-light border-t border-graphite">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="md:col-span-5 lg:col-span-5 space-y-5">
            <div className="relative h-8 w-60 sm:w-64 md:w-72 flex items-center">
              <Image
                src="/brand/Head Banner/orbion-head-banner-dark.png"
                alt="Orbion Technologies"
                fill
                sizes="(max-width: 640px) 240px, 288px"
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm font-semibold tracking-wide text-copper">
              {COMPANY.tagline}
            </p>
            <p className="text-sm text-limestone-muted/90 leading-relaxed max-w-sm">
              An early-stage technology and deep-tech startup focused on intelligent software solutions, workflow automation systems, and an AI Operating System for modern enterprises.
            </p>
            <div className="pt-2 text-xs text-limestone-muted/70">
              Solapur, Maharashtra, India
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-sage font-semibold">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-limestone-muted hover:text-pure-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Channels Column */}
          <div className="md:col-span-4 lg:col-span-4 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-sage font-semibold">
              Official Dialogue
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="block text-xs text-limestone-muted/60 font-mono">General Inquiries</span>
                <a
                  href={`mailto:${COMPANY.emails.general}`}
                  className="text-limestone-muted hover:text-pure-white transition-colors"
                >
                  {COMPANY.emails.general}
                </a>
              </li>
              <li>
                <span className="block text-xs text-limestone-muted/60 font-mono">Founder Direct</span>
                <a
                  href={`mailto:${COMPANY.emails.founder}`}
                  className="text-limestone-muted hover:text-pure-white transition-colors"
                >
                  {COMPANY.emails.founder}
                </a>
              </li>
              <li>
                <span className="block text-xs text-limestone-muted/60 font-mono">Engineering Direct</span>
                <a
                  href={`mailto:${COMPANY.emails.cofounder}`}
                  className="text-limestone-muted hover:text-pure-white transition-colors"
                >
                  {COMPANY.emails.cofounder}
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={COMPANY.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-copper hover:underline"
                >
                  GitHub Organization &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-graphite/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-limestone-muted/60">
          <p>
            &copy; {currentYear} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-sage/80">Early Architecture Phase</span>
            <span className="text-graphite/50">•</span>
            <a
              href="https://orbiontechnologies.in"
              className="hover:text-pure-white transition-colors"
            >
              orbiontechnologies.in
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
