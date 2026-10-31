import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Cpu,
  Layers,
  Terminal,
  Database,
  Workflow,
  Share2,
  FileCode2,
  Lock,
  GitMerge,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Boxes,
} from 'lucide-react';
import { Container, Section, Card, Badge, Button, Divider } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Technology & Architecture — The Orbion Technologies Operating Substrate',
  description:
    'Deep-dive into the technical pillars of Orbion Technologies: AI Agents, Model Context Protocol (MCP), LLMs, Hierarchical Memory, Tool Calling, and Deterministic Workflow Orchestration.',
  alternates: {
    canonical: '/technology',
  },
  openGraph: {
    title: 'Technology & Architecture — The Orbion Technologies Operating Substrate',
    description:
      'Deep-dive into the technical pillars of Orbion Technologies: AI Agents, Model Context Protocol (MCP), LLMs, Hierarchical Memory, Tool Calling, and Deterministic Workflow Orchestration.',
    url: '/technology',
  },
};

export default function TechnologyPage() {
  const techPillars = [
    {
      id: 'agents',
      tag: 'CORE COGNITION',
      title: 'Autonomous AI Agents',
      description:
        'Goal-directed execution loops that decompose high-level business objectives into planned sub-tasks, evaluate intermediate states, and recover gracefully from runtime exceptions.',
      specs: [
        'Goal decomposition via structured planning phases',
        'Stateful execution ledgers with continuous rollback checkpoints',
        'Self-correcting error handling loops and retry policies',
      ],
    },
    {
      id: 'mcp',
      tag: 'OPEN PROTOCOL',
      title: 'Tool Calling & Model Context Protocol (MCP)',
      description:
        'Implementation of Anthropic’s open Model Context Protocol (MCP) as the primary interface between cognitive agents and enterprise data assets, APIs, and file systems.',
      specs: [
        'Standardized JSON-RPC 2.0 client/server adapters',
        'Strict schema validation using JSON Schema and TypeScript typings',
        'Fine-grained access controls and least-privilege tool scopes',
      ],
    },
    {
      id: 'orchestration',
      tag: 'EXECUTION ENGINE',
      title: 'Deterministic Workflow Orchestration',
      description:
        'Replacing chaotic, unpredictable prompts with Directed Acyclic Graphs (DAGs) to coordinate multi-agent dependencies, concurrency, and validation checkpoints.',
      specs: [
        'Parallel DAG branch execution with dependency resolution',
        'Explicit verification barriers before state-mutating actions',
        'Deterministic replayability and reproducible audit traces',
      ],
    },
    {
      id: 'memory',
      tag: 'STATE PERSISTENCE',
      title: 'Hierarchical Memory Architecture',
      description:
        'Multi-tiered memory persistence designed to overcome LLM context-window limits while preserving historical organizational context across long time horizons.',
      specs: [
        'Turn Buffer: Ephemeral conversational tokens for local context',
        'Working Memory: Active task DAG state, active tool outputs, and ledger',
        'Episodic Memory: Compressed historical execution traces across sessions',
        'Semantic Memory: Vectorized knowledge graph and enterprise documentation',
      ],
    },
    {
      id: 'rag',
      tag: 'GROUNDED CONTEXT',
      title: 'Hybrid Retrieval-Augmented Generation (RAG)',
      description:
        'Combines dense semantic vector retrieval with sparse keyword indexing and graph-based entity linking to ground agent actions in factual organizational truth.',
      specs: [
        'Dynamic semantic chunking tailored for code, tickets, and tabular data',
        'Hybrid BM25 + dense embedding re-ranking pipeline',
        'Source citation and provenance tracking for every generated assertion',
      ],
    },
    {
      id: 'multi-agent',
      tag: 'COORDINATION',
      title: 'Multi-Agent Swarm Dynamics',
      description:
        'Dividing complex workflows among specialized agents (Planner, Operator, Verifier, Safety Gate) that cross-examine proposals before actions are committed to production systems.',
      specs: [
        'Role-specialized personas with isolated system prompts',
        'Multi-agent consensus protocols to mitigate single-model hallucinations',
        'Human-in-the-loop escalation paths for high-risk operations',
      ],
    },
  ];

  const currentVsFuture = [
    {
      category: 'CURRENT ARCHITECTURAL WORK & PROTOTYPES',
      badge: 'VALIDATING TODAY',
      badgeColor: 'brand' as const,
      items: [
        {
          title: 'MCP Integration Testbed',
          description:
            'Testing standardized MCP servers connecting agents to local file systems, SQLite databases, and mock REST APIs.',
        },
        {
          title: 'Deterministic Tool Dispatch',
          description:
            'Benchmarking strict schema enforcement using Pydantic and TypeScript validation before tools are invoked.',
        },
        {
          title: 'Task Decomposition Kernels',
          description:
            'Evaluating DAG-based planning prompts that convert vague user prompts into verifiable step sequences.',
        },
        {
          title: 'Local Context Compaction',
          description:
            'Algorithmic summarization of multi-turn tool interaction history to avoid context window degradation.',
        },
      ],
    },
    {
      category: 'LONG-TERM RESEARCH HORIZONS',
      badge: 'RESEARCH ROADMAP',
      badgeColor: undefined,
      items: [
        {
          title: 'Ephemeral Micro-VM Isolation',
          description:
            'Sandboxed sub-second micro-virtual machines (Firecracker/gVisor) for executing arbitrary code generated by agents.',
        },
        {
          title: 'Cross-Enterprise Agent Federation',
          description:
            'Secure cryptographic protocol enabling autonomous agents from different organizations to negotiate and transact.',
        },
        {
          title: 'Continuous Streaming Vector Bus',
          description:
            'Sub-second semantic vector indexing of enterprise Kafka feeds, database change streams, and communication webhooks.',
        },
        {
          title: 'Self-Tuning Execution DAGs',
          description:
            'Reinforcement learning frameworks that optimize multi-agent workflow paths based on historical latency and cost telemetry.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-canvas text-text-primary selection:bg-brand-accent selection:text-white pt-20">
      {/* Header */}
      <Section padding="lg" className="border-b border-border-hairline relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-grid opacity-30 pointer-events-none" />
        <Container size="lg" className="relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="status" indicatorColor="brand">
                TECHNOLOGY &amp; ARCHITECTURE
              </Badge>
              <span className="font-mono text-xs text-text-muted">SYSTEM SPEC // V1.0</span>
            </div>

            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6">
              The Architecture of Autonomous Business Work.
            </h1>

            <p className="font-sans text-lg sm:text-xl text-text-secondary leading-relaxed font-light">
              Orbion Technologies is engineered to bridge cognitive foundation models with deterministic enterprise execution.
              Explore our core technical pillars, runtime protocols, and the distinction between our active prototypes
              and long-term research direction.
            </p>
          </div>
        </Container>
      </Section>

      {/* Abstract System Architecture Flow */}
      <Section padding="lg" className="border-b border-border-hairline bg-void">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-hairline">
              <span className="font-mono text-xs text-brand-cyan uppercase tracking-wider">
                RUNTIME ORCHESTRATION PIPELINE
              </span>
              <span className="font-mono text-xs text-text-muted">LAYER // 01-04</span>
            </div>

            {/* Visual Pipeline Stack */}
            <div className="space-y-4">
              <div className="p-5 rounded-xs border border-border-hairline bg-surface-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-text-muted">01 // INGESTION</span>
                  <div>
                    <h3 className="font-sans text-sm font-semibold text-white">Enterprise Intent &amp; Telemetry</h3>
                    <p className="font-sans text-xs text-text-secondary">Webhooks, API events, scheduled cron jobs, and human prompts.</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] self-start md:self-auto">INPUT BUS</Badge>
              </div>

              <div className="flex justify-center text-text-muted">
                <span className="font-mono text-xs">↓</span>
              </div>

              <div className="p-6 rounded-xs border border-brand-accent/40 bg-surface-card shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-brand-cyan">02 // ORBION KERNEL</span>
                  <div>
                    <h3 className="font-sans text-base font-semibold text-white">Cognitive Orchestration Runtime</h3>
                    <p className="font-sans text-xs text-text-secondary">
                      DAG formulation • Multi-agent planning • Hierarchical context assembly • Pre-execution safety filters.
                    </p>
                  </div>
                </div>
                <Badge variant="status" indicatorColor="brand" className="text-[10px] self-start md:self-auto">ACTIVE ENGINE</Badge>
              </div>

              <div className="flex justify-center text-text-muted">
                <span className="font-mono text-xs">↓</span>
              </div>

              <div className="p-5 rounded-xs border border-border-hairline bg-surface-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-text-muted">03 // PROTOCOL LAYER</span>
                  <div>
                    <h3 className="font-sans text-sm font-semibold text-white">Model Context Protocol (MCP) Standard</h3>
                    <p className="font-sans text-xs text-text-secondary">Type-safe JSON-RPC client-server contracts with sandboxed tools.</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] self-start md:self-auto">PROTOCOL DISPATCH</Badge>
              </div>

              <div className="flex justify-center text-text-muted">
                <span className="font-mono text-xs">↓</span>
              </div>

              <div className="p-5 rounded-xs border border-border-hairline bg-surface-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-text-muted">04 // EXECUTION</span>
                  <div>
                    <h3 className="font-sans text-sm font-semibold text-white">Enterprise Actions &amp; Ledger</h3>
                    <p className="font-sans text-xs text-text-secondary">Database mutations, CRM updates, code commits, and verified audits.</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] self-start md:self-auto">MUTATION LEDGER</Badge>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Core Technical Pillars Grid */}
      <Section padding="lg" className="border-b border-border-hairline">
        <Container size="lg">
          <div className="flex flex-col space-y-12">
            <div>
              <span className="font-mono text-xs text-brand-cyan uppercase tracking-wider block mb-2">
                MODULAR SUBSTRATE
              </span>
              <h2 className="font-sans text-3xl font-semibold text-white tracking-tight">
                Core Technical Pillars
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techPillars.map((pillar) => (
                <div
                  key={pillar.id}
                  id={pillar.id}
                  className="p-6 rounded-xs border border-border-hairline bg-surface-card hover:border-border-subtle transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-[10px] text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-2 py-0.5 rounded-2xs mb-4 inline-block">
                      {pillar.tag}
                    </span>
                    <h3 className="font-sans text-lg font-semibold text-white mb-2">{pillar.title}</h3>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border-hairline/60">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted block mb-2">
                      SPECIFICATION DETAILS
                    </span>
                    <ul className="space-y-1.5 font-sans text-xs text-text-secondary">
                      {pillar.specs.map((spec, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-brand-accent mt-0.5">•</span>
                          <span>{spec}</span>
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

      {/* Distinct Split: Current Capabilities vs Long-Term Research Direction */}
      <Section padding="lg" className="border-b border-border-hairline bg-void">
        <Container size="lg">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-xs text-brand-cyan uppercase tracking-wider block mb-2">
              DISCIPLINED DELINEATION
            </span>
            <h2 className="font-sans text-3xl font-semibold text-white tracking-tight mb-4">
              Current Capabilities vs. Long-Term Research
            </h2>
            <p className="font-sans text-base text-text-secondary leading-relaxed">
              We maintain absolute transparency regarding what is built and validated in prototypes today versus
              what constitutes our forward-looking research agenda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {currentVsFuture.map((col) => (
              <div
                key={col.category}
                className="p-6 sm:p-8 rounded-xs border border-border-hairline bg-surface-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-border-hairline mb-6">
                    <span className="font-mono text-xs uppercase tracking-wider text-white font-medium">
                      {col.category}
                    </span>
                    <Badge variant="status" indicatorColor={col.badgeColor} className="text-[10px]">
                      {col.badge}
                    </Badge>
                  </div>

                  <div className="space-y-6">
                    {col.items.map((item) => (
                      <div key={item.title} className="flex flex-col space-y-1">
                        <h4 className="font-sans text-sm font-semibold text-white flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                          {item.title}
                        </h4>
                        <p className="font-sans text-xs text-text-secondary leading-relaxed pl-3.5">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Bottom CTA */}
      <Section padding="lg" className="border-b border-border-hairline">
        <Container size="md" className="text-center flex flex-col items-center">
          <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-4">
            Interested in Our Technical Specifications?
          </h2>
          <p className="font-sans text-base text-text-secondary max-w-xl mx-auto mb-8 font-light">
            We actively exchange ideas with systems architects, AI engineers, and researchers. Contact us for early
            technical dialogue or whitepaper updates.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="md">
                Initiate Technical Dialogue
              </Button>
            </Link>
            <Link href="/company">
              <Button variant="secondary" size="md">
                About the Company
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
