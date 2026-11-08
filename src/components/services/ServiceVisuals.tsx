"use client";

import React, { useState } from "react";

const CONCEPT_DISCLAIMER = "Concept visualization — illustrative, not a live product interface.";

export function WebDevVisual() {
  const [activeTab, setActiveTab] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="w-full bg-graphite-dark text-limestone-light rounded-2xl p-5 sm:p-6 border border-graphite/40 shadow-xl overflow-hidden font-sans">
      {/* Top Browser Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-graphite/30 text-xs text-limestone-muted">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-2 font-mono text-[11px] text-limestone-muted/70 hidden sm:inline">
            https://client-platform.orbion.digital
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("desktop")}
            className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
              activeTab === "desktop"
                ? "bg-petrol text-pure-white font-semibold"
                : "bg-graphite/40 text-limestone-muted hover:text-limestone"
            }`}
          >
            Desktop (1440px)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("mobile")}
            className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
              activeTab === "mobile"
                ? "bg-petrol text-pure-white font-semibold"
                : "bg-graphite/40 text-limestone-muted hover:text-limestone"
            }`}
          >
            Mobile (390px)
          </button>
        </div>
      </div>

      {/* Screen Mockup Area */}
      <div className="py-5 min-h-[260px] flex flex-col justify-between">
        {activeTab === "desktop" ? (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Header simulation */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-graphite/50 border border-graphite/30">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-copper/90" />
                <div className="h-3 w-20 rounded bg-limestone/40" />
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <div className="h-2 w-12 rounded bg-limestone/30" />
                <div className="h-2 w-12 rounded bg-limestone/30" />
                <div className="h-2 w-12 rounded bg-limestone/30" />
              </div>
              <div className="h-6 w-16 rounded bg-petrol/80" />
            </div>

            {/* Hero simulation */}
            <div className="grid grid-cols-12 gap-3 p-4 rounded-lg bg-graphite/30 border border-graphite/20">
              <div className="col-span-7 space-y-2.5">
                <div className="h-2 w-24 rounded bg-copper/70" />
                <div className="h-5 w-4/5 rounded bg-pure-white/80" />
                <div className="h-2 w-full rounded bg-limestone/30" />
                <div className="h-2 w-3/4 rounded bg-limestone/20" />
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-7 w-24 rounded bg-copper text-[10px] font-mono flex items-center justify-center font-bold text-pure-white">
                    Explore
                  </div>
                  <div className="h-7 w-20 rounded border border-limestone/30" />
                </div>
              </div>
              <div className="col-span-5 rounded-md bg-petrol/20 border border-petrol/30 flex items-center justify-center p-3">
                <div className="space-y-2 w-full">
                  <div className="h-2.5 w-1/2 rounded bg-sage/60" />
                  <div className="h-10 w-full rounded bg-graphite/60 border border-sage/20" />
                  <div className="flex justify-between">
                    <div className="h-2 w-1/3 rounded bg-limestone/30" />
                    <div className="h-2 w-1/4 rounded bg-copper/60" />
                  </div>
                </div>
              </div>
            </div>

            {/* Performance telemetry scorecard */}
            <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
              <div className="p-2.5 rounded bg-graphite/60 border border-graphite/30 flex flex-col justify-between">
                <span className="text-limestone-muted/70 text-[10px]">CORE WEB VITALS</span>
                <span className="text-green-400 font-bold text-sm">99 / 100</span>
              </div>
              <div className="p-2.5 rounded bg-graphite/60 border border-graphite/30 flex flex-col justify-between">
                <span className="text-limestone-muted/70 text-[10px]">LARGEST CONTENTFUL PAINT</span>
                <span className="text-pure-white font-bold text-sm">0.72s (Good)</span>
              </div>
              <div className="p-2.5 rounded bg-graphite/60 border border-graphite/30 flex flex-col justify-between">
                <span className="text-limestone-muted/70 text-[10px]">CUMULATIVE LAYOUT SHIFT</span>
                <span className="text-green-400 font-bold text-sm">0.000</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-[280px] mx-auto w-full space-y-3 p-3 rounded-2xl bg-graphite/70 border-2 border-graphite/40 shadow-inner animate-in fade-in duration-200">
            {/* Mobile Header */}
            <div className="flex items-center justify-between pb-2 border-b border-graphite/30">
              <div className="w-4 h-4 rounded bg-copper" />
              <div className="space-y-1 w-4">
                <div className="h-0.5 w-4 bg-limestone/60" />
                <div className="h-0.5 w-4 bg-limestone/60" />
              </div>
            </div>
            {/* Mobile Content */}
            <div className="space-y-2 py-2">
              <div className="h-2 w-16 bg-copper/70 rounded" />
              <div className="h-4 w-5/6 bg-pure-white/80 rounded" />
              <div className="h-2 w-full bg-limestone/30 rounded" />
              <div className="h-2 w-4/5 bg-limestone/20 rounded" />
              <div className="h-16 w-full rounded bg-petrol/30 border border-petrol/40 my-2 flex items-center justify-center">
                <span className="text-[10px] font-mono text-sage">Dynamic Viewport</span>
              </div>
              <div className="h-7 w-full rounded bg-copper text-pure-white text-[11px] font-mono flex items-center justify-center font-bold">
                Get Started
              </div>
            </div>
            <div className="text-center pt-1 font-mono text-[10px] text-green-400">
              Responsive Mobile Optimized
            </div>
          </div>
        )}
      </div>

      {/* Mandatory Disclaimer */}
      <div className="pt-3 border-t border-graphite/30 text-[11px] font-mono text-limestone-muted/70 flex items-center justify-between">
        <span>{CONCEPT_DISCLAIMER}</span>
        <span className="text-sage text-[10px]">Architecture Spec</span>
      </div>
    </div>
  );
}

export function CustomSoftwareVisual() {
  return (
    <div className="w-full bg-graphite-dark text-limestone-light rounded-2xl p-5 sm:p-6 border border-graphite/40 shadow-xl overflow-hidden font-sans">
      <div className="flex items-center justify-between pb-3 border-b border-graphite/30 text-xs font-mono">
        <span className="text-copper font-bold tracking-wider">LAYERED SYSTEM ARCHITECTURE</span>
        <span className="px-2 py-0.5 rounded bg-petrol/60 text-pure-white text-[10px]">TypeScript / Node / Postgres</span>
      </div>

      <div className="py-6 space-y-3 font-mono text-xs">
        {/* Layer 1: Client Interfaces */}
        <div className="p-3 rounded-xl bg-graphite/60 border border-graphite/30 hover:border-copper/40 transition-colors">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-sage font-semibold">01 / CLIENT & PRESENTATION LAYER</span>
            <span className="text-[10px] text-limestone-muted">React 19 / Next.js / Mobile View</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px] text-center pt-1">
            <div className="p-1.5 rounded bg-graphite/80 border border-graphite/40 text-pure-white">
              Admin Portal
            </div>
            <div className="p-1.5 rounded bg-graphite/80 border border-graphite/40 text-pure-white">
              Client Portal
            </div>
            <div className="p-1.5 rounded bg-graphite/80 border border-graphite/40 text-pure-white">
              Public API Clients
            </div>
          </div>
        </div>

        {/* Transit indicator */}
        <div className="flex items-center justify-center text-[10px] text-limestone-muted/60">
          <span>&darr; HTTPS / WSS / JWT Session Auth &darr;</span>
        </div>

        {/* Layer 2: API Gateway & Security */}
        <div className="p-3 rounded-xl bg-petrol/20 border border-petrol/40">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-copper font-semibold">02 / GATEWAY & SECURITY LAYER</span>
            <span className="text-[10px] text-limestone-muted">Rate Limiting / RBAC / Validation</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px] text-center pt-1">
            <div className="p-1.5 rounded bg-graphite/80 border border-petrol/30 text-pure-white">
              Role Permissions
            </div>
            <div className="p-1.5 rounded bg-graphite/80 border border-petrol/30 text-pure-white">
              Zod Schema Guard
            </div>
            <div className="p-1.5 rounded bg-graphite/80 border border-petrol/30 text-pure-white">
              Audit Logger
            </div>
          </div>
        </div>

        {/* Transit indicator */}
        <div className="flex items-center justify-center text-[10px] text-limestone-muted/60">
          <span>&darr; Internal RPC / Micro-task Dispatch &darr;</span>
        </div>

        {/* Layer 3: Database & State */}
        <div className="p-3 rounded-xl bg-graphite/60 border border-graphite/30">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-sage font-semibold">03 / PERSISTENCE & DATA LAYER</span>
            <span className="text-[10px] text-limestone-muted">PostgreSQL / Supabase / Prisma</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px] text-center pt-1">
            <div className="p-1.5 rounded bg-graphite/80 border border-graphite/40 text-pure-white">
              ACID Transactions
            </div>
            <div className="p-1.5 rounded bg-graphite/80 border border-graphite/40 text-pure-white">
              Foreign Key Rel
            </div>
            <div className="p-1.5 rounded bg-graphite/80 border border-graphite/40 text-pure-white">
              Automated Backups
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-graphite/30 text-[11px] font-mono text-limestone-muted/70 flex items-center justify-between">
        <span>{CONCEPT_DISCLAIMER}</span>
        <span className="text-copper text-[10px]">Zero Unnecessary Bloat</span>
      </div>
    </div>
  );
}

export function AIEngineeringVisual() {
  return (
    <div className="w-full bg-graphite-dark text-limestone-light rounded-2xl p-5 sm:p-6 border border-graphite/40 shadow-xl overflow-hidden font-sans">
      <div className="flex items-center justify-between pb-3 border-b border-graphite/30 text-xs font-mono">
        <span className="text-sage font-bold tracking-wider">RETRIEVAL-AUGMENTED GENERATION (RAG)</span>
        <span className="px-2 py-0.5 rounded bg-copper/30 text-copper text-[10px] font-semibold">
          Guarded & Verified
        </span>
      </div>

      <div className="py-5 space-y-3 font-mono text-xs">
        {/* User Query */}
        <div className="p-2.5 rounded-lg bg-graphite/70 border border-graphite/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            <span className="text-[11px] text-pure-white">1. User Contextual Query: &ldquo;What are the compliance terms?&rdquo;</span>
          </div>
          <span className="text-[10px] text-limestone-muted">Input</span>
        </div>

        {/* Vector Embed & Search */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-lg bg-petrol/20 border border-petrol/30">
            <div className="text-[10px] text-copper mb-1">2. EMBEDDING ENGINE</div>
            <div className="text-[11px] text-pure-white">pgvector Semantic Search</div>
            <div className="text-[10px] text-limestone-muted mt-1">Cosine Similarity &ge; 0.88</div>
          </div>
          <div className="p-2.5 rounded-lg bg-petrol/20 border border-petrol/30">
            <div className="text-[10px] text-copper mb-1">3. KNOWLEDGE STORE</div>
            <div className="text-[11px] text-pure-white">Proprietary Chunks & Citations</div>
            <div className="text-[10px] text-limestone-muted mt-1">Strict Domain Boundaries</div>
          </div>
        </div>

        {/* Guardrail Validator */}
        <div className="p-2.5 rounded-lg bg-sage/10 border border-sage/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sage text-sm">&#10003;</span>
            <span className="text-[11px] text-pure-white">
              4. Deterministic Guardrails (Anti-Hallucination & Schema Validation)
            </span>
          </div>
          <span className="text-[10px] text-sage font-bold">Passed</span>
        </div>

        {/* Structured Output */}
        <div className="p-3 rounded-lg bg-graphite/80 border border-graphite/40">
          <div className="text-[10px] text-limestone-muted mb-1">5. VALIDATED LLM RESPONSE (JSON SCHEMA)</div>
          <div className="text-[11px] text-pure-white leading-relaxed">
            &ldquo;Per Section 4.2 of verified internal documentation, SLA requirements are met with 99.9% uptime.&rdquo;
          </div>
          <div className="mt-2 flex items-center gap-2 text-[10px] text-sage">
            <span className="px-1.5 py-0.5 rounded bg-sage/20">Source: Doc_Rev3.pdf #P14</span>
            <span className="px-1.5 py-0.5 rounded bg-sage/20">Confidence: 97.4%</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-graphite/30 text-[11px] font-mono text-limestone-muted/70 flex items-center justify-between">
        <span>{CONCEPT_DISCLAIMER}</span>
        <span className="text-sage text-[10px]">Human-in-the-Loop Capable</span>
      </div>
    </div>
  );
}

export function ProcessAutomationVisual() {
  return (
    <div className="w-full bg-graphite-dark text-limestone-light rounded-2xl p-5 sm:p-6 border border-graphite/40 shadow-xl overflow-hidden font-sans">
      <div className="flex items-center justify-between pb-3 border-b border-graphite/30 text-xs font-mono">
        <span className="text-copper font-bold tracking-wider">WORKFLOW EXECUTION PIPELINE</span>
        <span className="text-green-400 text-[10px] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Active Pipeline (42ms)
        </span>
      </div>

      {/* The 4-step pipeline: INPUT → PROCESS → AUTOMATION → OUTPUT */}
      <div className="py-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs font-mono">
          {/* Step 1: Input */}
          <div className="p-3 rounded-xl bg-graphite/70 border border-graphite/40 flex flex-col justify-between">
            <div>
              <div className="text-[10px] text-copper font-bold mb-1">STAGE 01</div>
              <div className="text-pure-white font-bold text-[12px]">INPUT</div>
              <p className="text-[10px] text-limestone-muted mt-1 leading-snug">
                Webhook trigger, form submission, or cron schedule event.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-graphite/30 text-[9px] text-sage">
              Payload: Verified JSON
            </div>
          </div>

          {/* Step 2: Process */}
          <div className="p-3 rounded-xl bg-graphite/70 border border-graphite/40 flex flex-col justify-between">
            <div>
              <div className="text-[10px] text-copper font-bold mb-1">STAGE 02</div>
              <div className="text-pure-white font-bold text-[12px]">PROCESS</div>
              <p className="text-[10px] text-limestone-muted mt-1 leading-snug">
                Input sanitization, business logic branching, and schema validation.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-graphite/30 text-[9px] text-sage">
              State: Validated
            </div>
          </div>

          {/* Step 3: Automation */}
          <div className="p-3 rounded-xl bg-petrol/30 border border-petrol/50 flex flex-col justify-between">
            <div>
              <div className="text-[10px] text-copper font-bold mb-1">STAGE 03</div>
              <div className="text-pure-white font-bold text-[12px]">AUTOMATION</div>
              <p className="text-[10px] text-limestone-muted mt-1 leading-snug">
                Job dispatch queue, idempotency keys, and retry handlers.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-petrol/40 text-[9px] text-copper font-bold">
              Queue: Zero Deadlocks
            </div>
          </div>

          {/* Step 4: Output */}
          <div className="p-3 rounded-xl bg-graphite/70 border border-graphite/40 flex flex-col justify-between">
            <div>
              <div className="text-[10px] text-copper font-bold mb-1">STAGE 04</div>
              <div className="text-pure-white font-bold text-[12px]">OUTPUT</div>
              <p className="text-[10px] text-limestone-muted mt-1 leading-snug">
                Database synced, notification dispatched, and audit log stored.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-graphite/30 text-[9px] text-green-400">
              Delivered: 100% Ack
            </div>
          </div>
        </div>

        {/* Linear progress bar simulation */}
        <div className="mt-4 p-3 rounded-lg bg-graphite/50 border border-graphite/30 flex items-center justify-between text-[11px] font-mono text-limestone-muted">
          <span>Flow: INPUT &rarr; PROCESS &rarr; AUTOMATION &rarr; OUTPUT</span>
          <span className="text-copper font-bold">Fault-Tolerant & Idempotent</span>
        </div>
      </div>

      <div className="pt-3 border-t border-graphite/30 text-[11px] font-mono text-limestone-muted/70 flex items-center justify-between">
        <span>{CONCEPT_DISCLAIMER}</span>
        <span className="text-green-400 text-[10px]">Zero Data Loss Routine</span>
      </div>
    </div>
  );
}

export function UIUXDesignVisual() {
  return (
    <div className="w-full bg-graphite-dark text-limestone-light rounded-2xl p-5 sm:p-6 border border-graphite/40 shadow-xl overflow-hidden font-sans">
      <div className="flex items-center justify-between pb-3 border-b border-graphite/30 text-xs font-mono">
        <span className="text-sage font-bold tracking-wider">DESIGN SYSTEM ANATOMY</span>
        <span className="px-2 py-0.5 rounded bg-sage/20 text-sage text-[10px]">
          WCAG 2.1 AA Compliant
        </span>
      </div>

      <div className="py-5 space-y-4 font-mono text-xs">
        {/* Color Palette Tokens */}
        <div>
          <div className="text-[10px] text-limestone-muted/70 mb-2">DESIGN SYSTEM COLOR TOKENS</div>
          <div className="grid grid-cols-5 gap-2 text-center text-[10px]">
            <div className="p-2 rounded-lg bg-[#173B3F] text-pure-white border border-limestone/20">
              <div className="font-bold">Petrol</div>
              <div className="text-[9px] opacity-75">#173B3F</div>
            </div>
            <div className="p-2 rounded-lg bg-[#C77D56] text-pure-white">
              <div className="font-bold">Copper</div>
              <div className="text-[9px] opacity-75">#C77D56</div>
            </div>
            <div className="p-2 rounded-lg bg-[#242B2C] text-limestone-light border border-graphite">
              <div className="font-bold">Graphite</div>
              <div className="text-[9px] opacity-75">#242B2C</div>
            </div>
            <div className="p-2 rounded-lg bg-[#B6C9B2] text-graphite-dark">
              <div className="font-bold">Sage</div>
              <div className="text-[9px] opacity-75">#B6C9B2</div>
            </div>
            <div className="p-2 rounded-lg bg-[#F6F4EF] text-graphite-dark">
              <div className="font-bold">Limestone</div>
              <div className="text-[9px] opacity-75">#F6F4EF</div>
            </div>
          </div>
        </div>

        {/* Component states */}
        <div>
          <div className="text-[10px] text-limestone-muted/70 mb-2">ATOMIC INTERACTION STATES</div>
          <div className="grid grid-cols-3 gap-2 text-[11px] text-center">
            <div className="p-2.5 rounded-lg bg-petrol text-pure-white font-medium shadow-xs">
              Button / Default
            </div>
            <div className="p-2.5 rounded-lg bg-copper text-pure-white font-medium shadow-md">
              Button / Hover Active
            </div>
            <div className="p-2.5 rounded-lg bg-graphite/60 text-limestone-muted/50 border border-graphite/40">
              Button / Disabled
            </div>
          </div>
        </div>

        {/* Typography & Spacing Scale */}
        <div className="p-3 rounded-lg bg-graphite/50 border border-graphite/30 flex items-center justify-between text-[11px]">
          <div className="space-y-0.5">
            <div className="text-pure-white font-bold">Inter / Geotext Modular Scale</div>
            <div className="text-[10px] text-limestone-muted">Fluid Type Scale &bull; 8pt Baseline Grid</div>
          </div>
          <div className="text-right text-[10px] text-sage font-mono">
            Contrast Ratio: 7.2:1
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-graphite/30 text-[11px] font-mono text-limestone-muted/70 flex items-center justify-between">
        <span>{CONCEPT_DISCLAIMER}</span>
        <span className="text-sage text-[10px]">Accessible by Design</span>
      </div>
    </div>
  );
}

export function SystemIntegrationVisual() {
  return (
    <div className="w-full bg-graphite-dark text-limestone-light rounded-2xl p-5 sm:p-6 border border-graphite/40 shadow-xl overflow-hidden font-sans">
      <div className="flex items-center justify-between pb-3 border-b border-graphite/30 text-xs font-mono">
        <span className="text-copper font-bold tracking-wider">API CONNECTIVITY & MIDDLEWARE</span>
        <span className="text-sage text-[10px]">Mutual TLS & HMAC Verified</span>
      </div>

      <div className="py-5 font-mono text-xs">
        {/* Core Gateway Center */}
        <div className="p-3.5 rounded-xl bg-petrol/30 border border-petrol/50 text-center mb-4">
          <div className="text-[10px] text-copper font-bold mb-1">CENTRAL INTEGRATION BUS</div>
          <div className="text-pure-white font-bold text-sm">Orbion Integration Gateway</div>
          <div className="text-[10px] text-limestone-muted mt-1">
            Data Serialization &bull; Webhook Verification &bull; Rate Limiting &bull; Retry Queues
          </div>
        </div>

        {/* Connected Endpoints Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-center">
          <div className="p-2.5 rounded-lg bg-graphite/70 border border-graphite/40">
            <div className="text-sage font-bold">Payment APIs</div>
            <div className="text-limestone-muted mt-1 text-[9px]">Stripe / Razorpay</div>
            <div className="mt-1 text-[9px] text-green-400">&#9679; Webhooks OK</div>
          </div>
          <div className="p-2.5 rounded-lg bg-graphite/70 border border-graphite/40">
            <div className="text-sage font-bold">Customer CRM</div>
            <div className="text-limestone-muted mt-1 text-[9px]">REST / GraphQL</div>
            <div className="mt-1 text-[9px] text-green-400">&#9679; Bi-directional</div>
          </div>
          <div className="p-2.5 rounded-lg bg-graphite/70 border border-graphite/40">
            <div className="text-sage font-bold">Messaging Ops</div>
            <div className="text-limestone-muted mt-1 text-[9px]">Email / SMS / Slack</div>
            <div className="mt-1 text-[9px] text-green-400">&#9679; Instant Dispatch</div>
          </div>
          <div className="p-2.5 rounded-lg bg-graphite/70 border border-graphite/40">
            <div className="text-sage font-bold">Internal DB</div>
            <div className="text-limestone-muted mt-1 text-[9px]">PostgreSQL Pool</div>
            <div className="mt-1 text-[9px] text-green-400">&#9679; Synced ACID</div>
          </div>
        </div>

        {/* Security badge */}
        <div className="mt-4 p-2.5 rounded-lg bg-graphite/50 border border-graphite/30 flex items-center justify-between text-[10px] text-limestone-muted">
          <span>Security Protocol: Encrypted Vault + Secret Rotation</span>
          <span className="text-copper font-bold">Zero Plaintext Secrets</span>
        </div>
      </div>

      <div className="pt-3 border-t border-graphite/30 text-[11px] font-mono text-limestone-muted/70 flex items-center justify-between">
        <span>{CONCEPT_DISCLAIMER}</span>
        <span className="text-copper text-[10px]">End-to-End Encrypted</span>
      </div>
    </div>
  );
}

export function ServiceVisualRenderer({ serviceId }: { serviceId: string }) {
  switch (serviceId) {
    case "website-ecommerce":
      return <WebDevVisual />;
    case "custom-software":
      return <CustomSoftwareVisual />;
    case "ai-engineering":
      return <AIEngineeringVisual />;
    case "process-automation":
      return <ProcessAutomationVisual />;
    case "ui-ux-design":
      return <UIUXDesignVisual />;
    case "system-integration":
      return <SystemIntegrationVisual />;
    default:
      return null;
  }
}

