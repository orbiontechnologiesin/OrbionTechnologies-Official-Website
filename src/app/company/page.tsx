import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2,
  Compass,
  Layers,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Target,
  Clock,
  Sparkles,
  GitBranch,
} from 'lucide-react';
import { Container, Section, Card, Badge, Button, Divider } from '@/components/ui';
import { COMPANY } from '@/data/company';

export const metadata: Metadata = {
  title: 'Company & Vision — About Orbion Technologies',
  description:
    'Orbion Technologies is an early-stage technology startup engineering the AI Operating System for modern businesses. Learn about our origin, thesis, and long-term trajectory.',
  alternates: {
    canonical: '/company',
  },
  openGraph: {
    title: 'Company & Vision — About Orbion Technologies',
    description:
      'Orbion Technologies is an early-stage technology startup engineering the AI Operating System for modern businesses. Learn about our origin, thesis, and long-term trajectory.',
    url: '/company',
  },
};

export default function CompanyPage() {
  const companyPrinciples = [
    {
      number: '01',
      title: 'Practical Utility Over Speculation',
      description:
        'We do not build technology demos for temporary attention. Every architecture decision is driven by real-world business bottlenecks and measurable automation utility.',
    },
    {
      number: '02',
      title: 'Deterministic Control & Guardrails',
      description:
        'Autonomous systems cannot operate in enterprise environments without strict schemas, verification barriers, and deterministic state recovery.',
    },
    {
      number: '03',
      title: 'Data Sovereignty & Zero-Training',
      description:
        'Customer operational data, internal tickets, and proprietary knowledge must never be used to train foundational models. Isolation is a core primitive.',
    },
    {
      number: '04',
      title: 'Humans as Orchestrators',
      description:
        'AI systems handle repetitive tool execution, multi-system handoffs, and routine operational workflows; human leadership defines strategy, judgment, and taste.',
    },
  ];

  const operationalTimeline = [
    {
      phase: '2026 Q1 // FOUNDATION',
      title: 'Architectural Inception & Protocol Design',
      status: 'CURRENT PHASE',
      active: true,
      points: [
        'Formulation of the Orbion Technologies Operating System RFC.',
        'Specification of the Model Context Protocol (MCP) client/server tooling layer.',
        'Core DAG execution kernel prototyping.',
        'Establishment of the Orbion Technologies design system and engineering doctrine.',
      ],
    },
    {
      phase: '2026 Q2 // PROTOTYPING',
      title: 'Sandbox Validation & Tool Calling Testbeds',
      status: 'ROADMAP',
      active: false,
      points: [
        'Isolated testbed for multi-step agent tool invocation.',
        'Structured context memory benchmarks and eviction strategies.',
        'Initial closed developer trials with select early engineering partners.',
      ],
    },
    {
      phase: '2026 Q3–Q4 // PILOT ACCESS',
      title: 'Initial Enterprise Pilot Deployments',
      status: 'FUTURE OBJECTIVE',
      active: false,
      points: [
        'Controlled single-tenant sandbox trials for inbound triage and internal ops.',
        'Cryptographic audit ledger integration.',
        'Self-hosted enterprise deployment documentation.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-canvas text-text-primary selection:bg-brand-accent selection:text-white pt-20">
      {/* Header Section */}
      <Section padding="lg" className="border-b border-border-hairline relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-grid opacity-30 pointer-events-none" />
        <Container size="lg" className="relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="status" indicatorColor="brand">
                COMPANY OVERVIEW
              </Badge>
              <span className="font-mono text-xs text-text-muted">EST. 2026 // SOLAPUR, INDIA</span>
            </div>

            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6">
              Building the operating substrate for autonomous business work.
            </h1>

            <p className="font-sans text-lg sm:text-xl text-text-secondary leading-relaxed font-light">
              Orbion Technologies is an early-stage technology startup architecting an AI Operating System designed to help modern
              enterprises coordinate intelligent, autonomous AI systems across business workflows.
            </p>
          </div>
        </Container>
      </Section>

      {/* What Orbion Technologies Is & Why It Exists */}
      <Section padding="lg" className="border-b border-border-hairline" id="thesis">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: What Orbion Technologies Is */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs text-brand-cyan uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                <span>WHAT ORBION TECHNOLOGIES IS</span>
              </div>

              <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                An intelligent operating layer above fragmented software.
              </h2>

              <div className="space-y-4 font-sans text-base text-text-secondary leading-relaxed">
                <p>
                  Today, businesses do not suffer from a lack of software. They suffer from an overload of isolated
                  tools. The typical organization licenses dozens of SaaS subscriptions: CRMs, ERPs, issue trackers,
                  chat platforms, and databases.
                </p>
                <p>
                  Yet each tool is a silent island. When an event occurs — a customer query arrives, a shipment is
                  delayed, or a server throws an error — humans must manually extract information, copy-paste across
                  tabs, make routine decisions, and trigger downstream APIs.
                </p>
                <p>
                  <strong>Orbion Technologies is building the system that changes this dynamic.</strong> Instead of treating AI as an
                  isolated chat window, Orbion Technologies treats AI as an operating substrate — a persistent runtime capable of
                  maintaining state, calling tools, and coordinating multi-step execution.
                </p>
              </div>
            </div>

            {/* Right: Why Orbion Technologies Exists */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs text-brand-cyan uppercase tracking-wider">
                <Target className="w-3.5 h-3.5" />
                <span>WHY ORBION TECHNOLOGIES EXISTS</span>
              </div>

              <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                From passive data stores to active autonomous execution.
              </h2>

              <div className="space-y-4 font-sans text-base text-text-secondary leading-relaxed">
                <p>
                  Previous decades produced software designed to store state: relational databases, file systems, and
                  dashboards. But software remained entirely inert. It never initiated an action; it waited for human
                  input.
                </p>
                <p>
                  With advances in large language models and standardized tool protocols (such as MCP), machine
                  intelligence can now understand natural language intent, select tools, and evaluate outcomes.
                </p>
                <p>
                  What is missing is the operating system: the process scheduler, context manager, memory store, and
                  permission barrier that ensures autonomous systems operate reliably, predictably, and securely.
                  That is what Orbion Technologies is engineered to solve.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Long-Term Vision */}
      <Section padding="lg" className="border-b border-border-hairline bg-void relative">
        <Container size="lg">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center mb-16">
            <Badge variant="status" indicatorColor="brand" className="mb-4">
              THE LONG-TERM HORIZON
            </Badge>
            <h2 className="font-sans text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4">
              Autonomous Functional Departments
            </h2>
            <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed font-light">
              Our long-term mission is to enable organizations of any scale to deploy specialized, autonomous AI
              teams across the core functions of enterprise operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xs border border-border-hairline bg-surface-card flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-brand-cyan uppercase tracking-wider block mb-3">
                  01 // AUTONOMOUS WORKFLOWS
                </span>
                <h3 className="font-sans text-lg font-semibold text-white mb-2">Self-Executing Operations</h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">
                  Workflows that trigger autonomously on events, gather necessary context from databases, formulate
                  plans, execute steps across APIs, and report verified results.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xs border border-border-hairline bg-surface-card flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-brand-cyan uppercase tracking-wider block mb-3">
                  02 // STANDARDIZED PROTOCOLS
                </span>
                <h3 className="font-sans text-lg font-semibold text-white mb-2">Model Context Protocol</h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">
                  Universal interoperability through open protocols, ensuring agents connect seamlessly to legacy
                  databases, third-party cloud services, and proprietary internal tools.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xs border border-border-hairline bg-surface-card flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-brand-cyan uppercase tracking-wider block mb-3">
                  03 // AUDITABLE GOVERNANCE
                </span>
                <h3 className="font-sans text-lg font-semibold text-white mb-2">Cryptographic Verification</h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">
                  Every decision, tool invocation, and state mutation recorded in tamper-evident logs, guaranteeing
                  enterprise accountability and deterministic compliance.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Current Stage & Radical Transparency */}
      <Section padding="lg" className="border-b border-border-hairline" id="stage">
        <Container size="lg">
          <div className="flex flex-col space-y-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-xs text-brand-cyan uppercase tracking-wider mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>RADICAL TRANSPARENCY // CURRENT STAGE</span>
              </div>
              <h2 className="font-sans text-3xl font-semibold text-white tracking-tight mb-4">
                Where We Stand Today
              </h2>
              <p className="font-sans text-base text-text-secondary leading-relaxed">
                Orbion Technologies is an early-stage startup founded in 2026. We are in the architectural design and prototype
                validation phase. We do not claim fabricated enterprise revenue or millions of users. We believe in
                delivering honest engineering truth.
              </p>
            </div>

            {/* Timeline Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {operationalTimeline.map((item) => (
                <div
                  key={item.phase}
                  className={`p-6 sm:p-8 rounded-xs border flex flex-col justify-between relative ${
                    item.active
                      ? 'border-brand-accent/60 bg-surface-card shadow-subtle'
                      : 'border-border-hairline bg-surface-card/40 opacity-80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[11px] text-text-muted">{item.phase}</span>
                      <Badge
                        variant={item.active ? 'status' : 'outline'}
                        indicatorColor={item.active ? 'brand' : undefined}
                        className="text-[10px]"
                      >
                        {item.status}
                      </Badge>
                    </div>

                    <h3 className="font-sans text-lg font-semibold text-white mb-4">{item.title}</h3>

                    <ul className="space-y-2.5 font-sans text-xs text-text-secondary">
                      {item.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-brand-accent mt-0.5">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Founding Principles */}
      <Section padding="lg" className="border-b border-border-hairline bg-void">
        <Container size="lg">
          <div className="flex flex-col space-y-12">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-brand-cyan uppercase tracking-wider mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>CORE DOCTRINE</span>
              </div>
              <h2 className="font-sans text-3xl font-semibold text-white tracking-tight">
                Founding Principles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {companyPrinciples.map((item) => (
                <div
                  key={item.number}
                  className="p-6 rounded-xs border border-border-hairline bg-surface-card hover:border-border-subtle transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs text-brand-cyan mb-2 block">{`${item.number} // PRINCIPLE`}</span>
                    <h3 className="font-sans text-lg font-medium text-white mb-2">{item.title}</h3>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Bottom CTA */}
      <Section padding="lg" className="border-b border-border-hairline">
        <Container size="md" className="text-center flex flex-col items-center">
          <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-4">
            Learn More About Our Architecture
          </h2>
          <p className="font-sans text-base text-text-secondary max-w-xl mx-auto mb-8 font-light">
            Review the specific technologies, runtime specifications, and research paradigms being explored at
            Orbion Technologies.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/technology">
              <Button variant="primary" size="md">
                Explore Technology Stack
              </Button>
            </Link>
            <Link href="/team">
              <Button variant="secondary" size="md">
                Meet the Team
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
