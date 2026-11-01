'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Section, Container, Badge, Display, Body, Caption, Button } from '@/components/ui';
import { COMPANY } from '@/data/company';

export function CtaSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <Section id="request-access" background="void" hasBorderBottom={false} className="py-24 sm:py-32">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
        <Badge variant="status" indicatorColor="brand">
          EARLY COLLABORATION • FOUNDING ACCESS
        </Badge>

        <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tighter text-white uppercase leading-[1.08] max-w-3xl">
          Building the future <br />
          <span className="text-text-muted">of business.</span>
        </h2>

        <p className="font-sans text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed">
          Orbion Technologies is in active early architecture. If you are an enterprise leader, engineer, or operator interested in autonomous agentic systems, request early access to follow our development.
        </p>

        {/* Access Request Form */}
        <div className="w-full max-w-md pt-4">
          {submitted ? (
            <div className="p-4 rounded-xs bg-surface-card border border-brand-accent/40 flex items-center justify-center gap-3 text-sm font-mono text-white animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-brand-accent" />
              <span>Request received. We will reach out shortly.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter enterprise email..."
                className="flex-1 px-4 py-2.5 rounded-xs bg-surface-subtle border border-border-hairline text-sm text-white placeholder:text-text-dim focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all font-sans"
              />
              <Button type="submit" variant="primary" size="md">
                Request Access
              </Button>
            </form>
          )}
        </div>

        {/* Direct Contact Footnote */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-text-muted uppercase tracking-wider">
          <span>NO SPAM</span>
          <span>•</span>
          <span>DIRECT FOUNDER DIALOGUE</span>
          <span>•</span>
          <a
            href={`mailto:${COMPANY.emails.founder}`}
            className="text-white hover:text-brand-accent transition-colors underline-offset-4 hover:underline"
          >
            {COMPANY.emails.founder}
          </a>
        </div>
      </div>
    </Section>
  );
}
