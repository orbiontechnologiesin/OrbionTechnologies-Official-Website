import React from "react";

interface VisualProps {
  className?: string;
}

const CAPTION = "Concept visualization — illustrative, not a live product interface.";

/**
 * 01 — Orbion CRM Visual
 * Abstract relationship node graph and sales pipeline track
 */
export function CrmVisual({ className = "" }: VisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-7 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-5">
        {/* Top Status */}
        <div className="flex items-center justify-between pb-3.5 border-b border-limestone-light/15 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Orbion CRM Subsystem
            </span>
          </div>
          <span className="text-sage font-semibold uppercase">PIPELINE ENGINE</span>
        </div>

        {/* Pipeline Stage Trackers */}
        <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-mono">
          <div className="p-2 rounded bg-petrol-dark/80 border border-limestone-light/10">
            <span className="text-copper block font-semibold">01 / INTAKE</span>
            <span className="text-limestone-muted/70 text-[10px]">Lead Discovery</span>
          </div>
          <div className="p-2 rounded bg-petrol-dark/80 border border-copper/30">
            <span className="text-copper block font-semibold">02 / QUALIFY</span>
            <span className="text-limestone-muted/70 text-[10px]">Active Review</span>
          </div>
          <div className="p-2 rounded bg-petrol-dark/80 border border-limestone-light/10">
            <span className="text-limestone-muted block font-semibold">03 / PROPOSAL</span>
            <span className="text-limestone-muted/70 text-[10px]">Contract DAG</span>
          </div>
          <div className="p-2 rounded bg-petrol-dark/80 border border-limestone-light/10">
            <span className="text-sage block font-semibold">04 / WIN</span>
            <span className="text-limestone-muted/70 text-[10px]">Unified Client</span>
          </div>
        </div>

        {/* Abstract Relationship Nodes Schematic */}
        <div className="rounded-xl bg-petrol-dark/90 p-4 border border-limestone-light/10 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-limestone-muted">
            <span className="text-[11px]">Primary Entity: Enterprise Acct #884</span>
            <span className="text-sage text-[10px] px-1.5 py-0.5 rounded bg-sage/10 border border-sage/20">
              SYNCHRONIZED
            </span>
          </div>
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between p-2 rounded bg-petrol/60 border border-limestone-light/5 text-[11px]">
              <span className="text-pure-white font-medium">Contact Node: Key Decision Maker</span>
              <span className="text-copper">Follow-up: 24h</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-petrol/60 border border-limestone-light/5 text-[11px]">
              <span className="text-pure-white font-medium">Activity Stream: Architecture Audit</span>
              <span className="text-limestone-muted/70">CSV Export Ready</span>
            </div>
          </div>
        </div>

        {/* Footnote Caption */}
        <p className="text-[10px] font-mono text-limestone-muted/60 text-center pt-1 border-t border-limestone-light/10">
          {CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * 02 — Orbion AI Chatbot Visual
 * Knowledge base grounding flow & human handoff gate
 */
export function ChatbotVisual({ className = "" }: VisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-7 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-5">
        {/* Top Status */}
        <div className="flex items-center justify-between pb-3.5 border-b border-limestone-light/15 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Orbion Chatbot Subsystem
            </span>
          </div>
          <span className="text-copper font-semibold uppercase">GROUNDED RAG</span>
        </div>

        {/* Conceptual Conversation Nodes */}
        <div className="space-y-2.5 font-mono text-xs">
          {/* Incoming Query */}
          <div className="p-3 rounded-lg bg-petrol-dark/80 border border-limestone-light/10 space-y-1">
            <div className="flex items-center justify-between text-[10px] text-limestone-muted/70">
              <span>VISITOR INTAKE</span>
              <span>TOKEN LATENCY: 28ms</span>
            </div>
            <p className="text-pure-white text-[11px]">
              &ldquo;How does Orbion integrate with existing enterprise tools?&rdquo;
            </p>
          </div>

          {/* Verification & Knowledge Source Gate */}
          <div className="p-2.5 rounded-lg bg-petrol-surface border border-sage/30 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <span className="text-sage font-bold">&check;</span>
              <span className="text-sage">Knowledge Match: Approved Docs v1.4</span>
            </div>
            <span className="text-[10px] text-limestone-muted/70">Confidence: 99.4%</span>
          </div>

          {/* Structured Output & Handoff Channel */}
          <div className="p-3 rounded-lg bg-petrol-dark/90 border border-copper/30 space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-copper font-semibold">SYNTHESIZED RESPONSE</span>
              <span className="text-limestone-muted/70">Human Escalation: Ready</span>
            </div>
            <p className="text-limestone-muted text-[11px] leading-relaxed">
              Orbion connects using typed protocols and verified schemas to ensure deterministic reliability without model hallucination.
            </p>
          </div>
        </div>

        {/* Footnote Caption */}
        <p className="text-[10px] font-mono text-limestone-muted/60 text-center pt-1 border-t border-limestone-light/10">
          {CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * 03 — Orbion Bookings Visual
 * Scheduling calendar matrix and slot reservation track
 */
export function BookingsVisual({ className = "" }: VisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-7 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-5">
        {/* Top Status */}
        <div className="flex items-center justify-between pb-3.5 border-b border-limestone-light/15 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Orbion Bookings Subsystem
            </span>
          </div>
          <span className="text-sage font-semibold uppercase">TIMELINE MATRIX</span>
        </div>

        {/* Service Allocation Strip */}
        <div className="rounded-xl bg-petrol-dark/90 p-4 border border-limestone-light/10 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-limestone-muted text-[11px]">
            <span>SERVICE: Architecture Consultation</span>
            <span className="text-copper">SLOT DURATION: 45m</span>
          </div>

          {/* Time Slot Grid */}
          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
            <div className="p-2 rounded bg-petrol/80 border border-limestone-light/10 text-limestone-muted/60">
              09:30 AM &bull; Booked
            </div>
            <div className="p-2 rounded bg-copper/20 border border-copper text-copper font-semibold">
              11:15 AM &bull; Selected
            </div>
            <div className="p-2 rounded bg-petrol/80 border border-limestone-light/10 text-sage">
              02:00 PM &bull; Open
            </div>
          </div>

          {/* Staff & Confirmation Bar */}
          <div className="pt-2 border-t border-limestone-light/10 flex items-center justify-between text-[11px]">
            <span className="text-pure-white">Staff Allocation: Primary Specialist</span>
            <span className="text-sage font-medium">Auto-Notify Enabled</span>
          </div>
        </div>

        {/* Footnote Caption */}
        <p className="text-[10px] font-mono text-limestone-muted/60 text-center pt-1 border-t border-limestone-light/10">
          {CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * 04 — Orbion Fit Visual
 * Membership tier tracking & attendance status ring
 */
export function FitVisual({ className = "" }: VisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-7 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-5">
        {/* Top Status */}
        <div className="flex items-center justify-between pb-3.5 border-b border-limestone-light/15 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Orbion Fit Subsystem
            </span>
          </div>
          <span className="text-copper font-semibold uppercase">MEMBERSHIP CORE</span>
        </div>

        {/* Attendance & Plan Telemetry */}
        <div className="rounded-xl bg-petrol-dark/90 p-4 border border-limestone-light/10 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-limestone-muted text-[11px]">
            <span>FACILITY METRICS: Active Capacity</span>
            <span className="text-sage font-semibold">84% NORMAL</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded bg-petrol/60 border border-limestone-light/5 text-[11px]">
              <span className="text-pure-white">Plan Tier: All-Access Multi-Zone</span>
              <span className="text-copper">Renewal in 12d</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-petrol/60 border border-limestone-light/5 text-[11px]">
              <span className="text-pure-white">Attendance Verification: Check-In Valid</span>
              <span className="text-sage">Payment: Current</span>
            </div>
          </div>
        </div>

        {/* Footnote Caption */}
        <p className="text-[10px] font-mono text-limestone-muted/60 text-center pt-1 border-t border-limestone-light/10">
          {CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * 05 — Orbion Dine Visual
 * Digital menu dispatch & table order workflow
 */
export function DineVisual({ className = "" }: VisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-7 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-5">
        {/* Top Status */}
        <div className="flex items-center justify-between pb-3.5 border-b border-limestone-light/15 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Orbion Dine Subsystem
            </span>
          </div>
          <span className="text-sage font-semibold uppercase">ORDER ORCHESTRATOR</span>
        </div>

        {/* Table Routing Nodes */}
        <div className="rounded-xl bg-petrol-dark/90 p-4 border border-limestone-light/10 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-limestone-muted text-[11px]">
            <span>LOCATION: Table 04 &bull; Zone A</span>
            <span className="text-copper font-medium">QR SCANNED</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded bg-petrol/60 border border-limestone-light/5 text-[11px]">
              <span className="text-pure-white">Ticket #148 &bull; 3 Course Items</span>
              <span className="text-sage">Status: Kitchen Queue</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-petrol/60 border border-limestone-light/5 text-[11px]">
              <span className="text-pure-white">Digital Menu Sync: Live Pricing</span>
              <span className="text-limestone-muted/70">Receipt Generated</span>
            </div>
          </div>
        </div>

        {/* Footnote Caption */}
        <p className="text-[10px] font-mono text-limestone-muted/60 text-center pt-1 border-t border-limestone-light/10">
          {CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * 06 — Orbion Docs Visual
 * Document structure extraction & schema validation
 */
export function DocsVisual({ className = "" }: VisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-7 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-5">
        {/* Top Status */}
        <div className="flex items-center justify-between pb-3.5 border-b border-limestone-light/15 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Orbion Docs Subsystem
            </span>
          </div>
          <span className="text-copper font-semibold uppercase">PARSER ENGINE</span>
        </div>

        {/* Schema Extraction Pipeline */}
        <div className="rounded-xl bg-petrol-dark/90 p-4 border border-limestone-light/10 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-limestone-muted text-[11px]">
            <span>INPUT: Raw Invoice Scan (PDF)</span>
            <span className="text-sage font-medium">PARSED: 100%</span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between p-2 rounded bg-petrol/60 border border-limestone-light/5">
              <span className="text-limestone-muted">Field: invoice_number</span>
              <span className="text-pure-white font-medium">INV-2026-9041</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-petrol/60 border border-limestone-light/5">
              <span className="text-limestone-muted">Field: subtotal_tax</span>
              <span className="text-copper font-medium">Verified &bull; Strict Schema</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-petrol/60 border border-limestone-light/5">
              <span className="text-limestone-muted">Destination: CSV Export Queue</span>
              <span className="text-sage font-medium">Ready for Review</span>
            </div>
          </div>
        </div>

        {/* Footnote Caption */}
        <p className="text-[10px] font-mono text-limestone-muted/60 text-center pt-1 border-t border-limestone-light/10">
          {CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * 07 — Orbion Insights Visual
 * Multi-axis KPI metrics & business performance summaries
 */
export function InsightsVisual({ className = "" }: VisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-7 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-5">
        {/* Top Status */}
        <div className="flex items-center justify-between pb-3.5 border-b border-limestone-light/15 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Orbion Insights Subsystem
            </span>
          </div>
          <span className="text-sage font-semibold uppercase">ANALYTICS ENGINE</span>
        </div>

        {/* Telemetry KPI Cards */}
        <div className="grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-petrol-dark/90 border border-limestone-light/10 space-y-1">
            <span className="text-[10px] text-limestone-muted/70 block">EFFICIENCY DELTA</span>
            <span className="text-lg font-bold text-sage">+24.8%</span>
            <span className="text-[10px] text-limestone-muted/50 block">vs. Baseline Cycle</span>
          </div>
          <div className="p-3 rounded-xl bg-petrol-dark/90 border border-limestone-light/10 space-y-1">
            <span className="text-[10px] text-limestone-muted/70 block">PROCESS LATENCY</span>
            <span className="text-lg font-bold text-pure-white">42ms</span>
            <span className="text-[10px] text-copper block font-medium">Zero-Drift Execution</span>
          </div>
        </div>

        {/* Trend Curve & Filters */}
        <div className="p-3 rounded-xl bg-petrol-dark/80 border border-limestone-light/10 flex items-center justify-between text-[11px] font-mono text-limestone-muted">
          <span>Range: 30D Window</span>
          <span className="text-copper font-medium">Auto-Report Generated</span>
        </div>

        {/* Footnote Caption */}
        <p className="text-[10px] font-mono text-limestone-muted/60 text-center pt-1 border-t border-limestone-light/10">
          {CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * Map product IDs to their corresponding visual component
 */
export function ProductVisual({ productId, className }: { productId: string; className?: string }) {
  switch (productId) {
    case "orbion-crm":
      return <CrmVisual className={className} />;
    case "orbion-ai-chatbot":
      return <ChatbotVisual className={className} />;
    case "orbion-bookings":
      return <BookingsVisual className={className} />;
    case "orbion-fit":
      return <FitVisual className={className} />;
    case "orbion-dine":
      return <DineVisual className={className} />;
    case "orbion-docs":
      return <DocsVisual className={className} />;
    case "orbion-insights":
      return <InsightsVisual className={className} />;
    default:
      return null;
  }
}

