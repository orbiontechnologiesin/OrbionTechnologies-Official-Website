import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  Cpu,
  ArrowUpRight,
  Mail,
  Terminal,
  Compass,
  Code2,
  Workflow,
  Sparkles,
  Users,
} from 'lucide-react';
import { Container, Section, Card, Badge, Button } from '@/components/ui';
import { TEAM_MEMBERS } from '@/data/team';
import { COMPANY } from '@/data/company';
import { TeamProfileCard } from '@/components/team-profile-card';

export const metadata: Metadata = {
  title: 'Team — Leadership & Engineering',
  description:
    'Meet the leadership team engineering the AI Operating System at Orbion Technologies. Bhavin Shankur (Founder & CEO) and Apurv Nimbarge (CTO) leading systems architecture and enterprise intelligence.',
  alternates: {
    canonical: '/team',
  },
  openGraph: {
    title: 'Team — Leadership & Engineering',
    description:
      'Meet the leadership team engineering the AI Operating System at Orbion Technologies. Bhavin Shankur (Founder & CEO) and Apurv Nimbarge (CTO) leading systems architecture and enterprise intelligence.',
    url: '/team',
  },
};

export default function TeamPage() {
  const sharedPrinciples = [
    {
      number: '01',
      title: 'Systems Over Hype',
      description:
        'We reject artificial vanity metrics and superficial generative demos. Every system we design is grounded in deterministic runtime execution, verified state machines, and reproducible code.',
    },
    {
      number: '02',
      title: 'Early-Stage Initiative',
      description:
        'Rather than waiting until graduation to begin, our leadership is actively architecting foundational layers today — solving real enterprise operational bottlenecks at MIT Vishwaprayag University.',
    },
    {
      number: '03',
      title: 'Radical Transparency',
      description:
        'We are honest about where software architecture is today and where autonomous capabilities are heading. Our technical claims reflect verifiable capabilities and open protocols.',
    },
    {
      number: '04',
      title: 'Protocol-Driven Interoperability',
      description:
        'We believe intelligent systems must not become isolated vendor silos. We champion open standards like the Model Context Protocol (MCP) to integrate smoothly with existing enterprise software.',
    },
  ];

  return (
    <div className="min-h-screen bg-canvas text-text-primary selection:bg-brand-accent selection:text-white pt-20">
      {/* 1. Page Hero Header */}
      <Section padding="lg" className="border-b border-border-hairline relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-grid opacity-30 pointer-events-none" />
        <Container size="lg" className="relative z-10">
          <div className="flex flex-col items-start max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="status" indicatorColor="brand">
                LEADERSHIP &amp; ENGINEERING
              </Badge>
              <span className="font-mono text-xs text-text-muted">SOLAPUR, INDIA // CORE DIRECTORY</span>
            </div>

            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-4">
              Meet the Team
            </h1>

            <p className="font-sans text-lg sm:text-xl text-brand-cyan tracking-wide mb-6 font-medium">
              Two builders. Shared ambition. One team engineering the future of Orbion Technologies.
            </p>

            <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed font-light mb-8 max-w-2xl">
              Orbion Technologies is founded and led by systems builders dedicated to developing reliable, protocol-guided
              AI infrastructure for real-world enterprise applications.
            </p>

            {/* Quick Action Navigation */}
            <div className="flex flex-wrap items-center gap-3">
              <a href="#leadership">
                <Button variant="primary" size="md">
                  View Leadership Profiles
                </Button>
              </a>
              <a href="#philosophy">
                <Button variant="outline" size="md" className="font-mono text-xs">
                  <span>Operating Philosophy ↓</span>
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="secondary" size="md" className="font-mono text-xs">
                  <Mail className="w-3.5 h-3.5 mr-2 text-brand-cyan" />
                  Initiate Dialogue
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Equal Leadership Profiles Grid */}
      <Section padding="lg" className="border-b border-border-hairline bg-surface-subtle/30" id="leadership">
        <Container size="lg">
          <div className="flex flex-col space-y-12">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-brand-cyan uppercase tracking-wider mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>EXECUTIVE DIRECTORY // EQUAL PROFILES</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                Leadership Team
              </h2>
              <p className="font-sans text-sm sm:text-base text-text-secondary mt-2 max-w-2xl leading-relaxed">
                Directing strategic vision, system architecture, and engineering execution at Orbion Technologies.
              </p>
            </div>

            {/* Two Equal Columns Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {TEAM_MEMBERS.map((member) => (
                <TeamProfileCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Academic Foundation & Technical Specializations Matrix */}
      <Section padding="lg" className="border-b border-border-hairline" id="academics">
        <Container size="lg">
          <div className="flex flex-col space-y-12">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-brand-cyan uppercase tracking-wider mb-2">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>INSTITUTIONAL FOUNDATION</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                Academic &amp; Research Foundations
              </h2>
              <p className="font-sans text-sm sm:text-base text-text-secondary mt-2 max-w-2xl leading-relaxed">
                Both leaders are undergraduate engineering researchers at MIT Vishwaprayag University in Solapur, Maharashtra, combining theoretical computer science with systems building.
              </p>
            </div>

            {/* Equal Side-by-Side Academic Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={`academic-${member.id}`}
                  className="p-6 sm:p-8 rounded-xs border border-border-hairline bg-surface-card flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-6 border-b border-border-hairline mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xs bg-void border border-border-hairline flex items-center justify-center text-brand-cyan">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-sans text-base font-semibold text-white">{member.name}</h3>
                          <p className="font-mono text-xs text-brand-cyan">{member.role}</p>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-text-muted px-2 py-0.5 rounded-2xs bg-void border border-border-hairline">
                        RESEARCHER
                      </span>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex justify-between py-1.5 border-b border-border-hairline/60">
                        <span className="text-text-muted">DEGREE PROGRAM</span>
                        <span className="text-text-primary font-sans font-medium text-right">{member.degree}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-border-hairline/60">
                        <span className="text-text-muted">INSTITUTION</span>
                        <span className="text-text-primary font-sans font-medium">{member.institution}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-border-hairline/60">
                        <span className="text-text-muted">LOCATION</span>
                        <span className="text-text-primary font-sans font-medium">{member.location}</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border-hairline">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted block mb-3">
                        RESEARCH &amp; CURRICULAR CORE:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {member.focusAreas?.map((area) => (
                          <span
                            key={area}
                            className="font-mono text-[11px] px-2.5 py-1 rounded-2xs bg-void border border-border-hairline text-text-secondary"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border-hairline flex items-center justify-between font-mono text-xs text-text-muted">
                    <span>MIT Vishwaprayag University</span>
                    <span className="text-brand-accent">Active Candidate</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Shared Leadership Philosophy & Core Principles */}
      <Section padding="lg" className="border-b border-border-hairline bg-void relative" id="philosophy">
        <Container size="lg">
          <div className="max-w-4xl mx-auto flex flex-col space-y-10">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-brand-cyan uppercase tracking-wider mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>SHARED LEADERSHIP DOCTRINE</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                Operating Philosophy
              </h2>
            </div>

            <blockquote className="font-sans text-2xl sm:text-3xl text-white font-normal leading-snug tracking-tight border-l-2 border-brand-accent pl-6 sm:pl-8 py-2">
              &ldquo;We believe the next generation of businesses will not rely solely on traditional static software.
              They will operate alongside intelligent AI systems capable of understanding objectives, using verified tools,
              and orchestrating workflows across business functions.&rdquo;
            </blockquote>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {sharedPrinciples.map((item) => (
                <div
                  key={item.number}
                  className="p-6 rounded-xs border border-border-hairline bg-surface-card hover:border-border-subtle transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs text-brand-cyan mb-2 block">
                      {`${item.number} // PRINCIPLE`}
                    </span>
                    <h3 className="font-sans text-lg font-medium text-white mb-2">{item.title}</h3>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. External Portfolios & Developer Dossiers */}
      <Section padding="lg" className="border-b border-border-hairline bg-surface-subtle/50" id="portfolios">
        <Container size="lg">
          <div className="flex flex-col space-y-10">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-brand-cyan uppercase tracking-wider mb-2">
                <Code2 className="w-3.5 h-3.5" />
                <span>EXTERNAL WORK &amp; DOSSIERS</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                Developer Portfolios
              </h2>
              <p className="font-sans text-sm sm:text-base text-text-secondary mt-2 max-w-2xl leading-relaxed">
                Independent repositories and portfolios highlighting individual projects, system experiments, and development work.
              </p>
            </div>

            {/* Equal Side-by-Side Portfolio Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {TEAM_MEMBERS.map((member) => {
                const portfolio = member.portfolios?.[0];
                if (!portfolio) return null;

                return (
                  <a
                    key={`portfolio-${member.id}`}
                    href={portfolio.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-6 sm:p-8 rounded-xs bg-surface-card border border-border-hairline hover:border-brand-accent/60 hover:bg-surface-elevated transition-all duration-200 flex flex-col justify-between"
                    aria-label={`${portfolio.title} for ${member.name} (opens in a new tab)`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-medium text-brand-cyan uppercase tracking-wider px-2 py-0.5 rounded-2xs bg-brand-cyan/10 border border-brand-cyan/20">
                          {portfolio.category}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                      </div>

                      <div>
                        <span className="font-mono text-xs text-text-muted block mb-1">
                          {member.name} — {member.title}
                        </span>
                        <h3 className="font-sans text-xl font-semibold text-white mb-1.5 group-hover:text-white transition-colors">
                          {portfolio.title}
                        </h3>
                        <p className="font-mono text-xs text-brand-accent mb-3">
                          {portfolio.subtitle}
                        </p>
                        <p className="font-sans text-sm text-text-secondary leading-relaxed">
                          {portfolio.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-5 mt-6 border-t border-border-hairline flex items-center justify-between font-mono text-xs text-text-primary group-hover:text-white transition-colors">
                      <span className="font-medium">{portfolio.actionText}</span>
                      <span className="text-brand-accent group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
                        →
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. Direct Leadership Dialogue CTA */}
      <Section padding="lg" className="border-b border-border-hairline bg-surface-card/40" id="contact">
        <Container size="md" className="text-center flex flex-col items-center">
          <Badge variant="status" indicatorColor="brand" className="mb-4">
            TEAM DIALOGUE
          </Badge>
          <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-4">
            Connect with the Leadership Team
          </h2>
          <p className="font-sans text-base text-text-secondary max-w-xl mx-auto mb-8 font-light">
            Open to technical discussions on AI agent architecture, runtime integration, early enterprise trials,
            and engineering collaborations with peer builders.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="md">
                Initiate Dialogue
              </Button>
            </Link>
            <a href={`mailto:${COMPANY.emails.general}`}>
              <Button variant="secondary" size="md">
                {COMPANY.emails.general}
              </Button>
            </a>
          </div>

          <p className="font-mono text-xs text-text-muted mt-8">
            Orbion Technologies • Solapur, Maharashtra, India • Responses typically within 24–48 business hours
          </p>
        </Container>
      </Section>
    </div>
  );
}
