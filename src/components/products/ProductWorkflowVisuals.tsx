import React from "react";

interface WorkflowVisualProps {
  className?: string;
}

const DISCLAIMER_CAPTION =
  "Concept visualization — illustrative, not a live product interface.";

/**
 * 01 — Orbion CRM Workflow Diagram
 * Relationship DAG & Multi-Stage Sales Pipeline Tracking
 */
export function CrmWorkflowDiagram({ className = "" }: WorkflowVisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-8 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header Telemetry */}
        <div className="flex flex-wrap items-center justify-between pb-3.5 border-b border-limestone-light/15 text-xs font-mono gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Orbion CRM &bull; Pipeline &amp; Account Architecture
            </span>
          </div>
          <span className="text-sage font-semibold uppercase tracking-wider text-[11px] px-2 py-0.5 rounded bg-sage/15 border border-sage/30">
            CONCEPTUAL WORKFLOW DAG
          </span>
        </div>

        {/* 6-Step Pipeline Visual Flow */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center text-xs font-mono">
          {[
            { step: "01", label: "Lead Inflow", state: "Intake", color: "text-copper" },
            { step: "02", label: "Contact Log", state: "Directory", color: "text-copper" },
            { step: "03", label: "Pipeline Stage", state: "Active Deal", color: "text-sage" },
            { step: "04", label: "Tasks & Notes", state: "Reminders", color: "text-sage" },
            { step: "05", label: "Velocity Track", state: "Progression", color: "text-copper" },
            { step: "06", label: "Account Overview", state: "Audit & CSV", color: "text-sage" },
          ].map((item, i) => (
            <div
              key={item.step}
              className="p-3 rounded-xl bg-petrol-dark/85 border border-limestone-light/10 flex flex-col justify-between relative group hover:border-copper/40 transition-colors"
            >
              <div className="flex items-center justify-between text-[10px] text-limestone-muted pb-1">
                <span className={item.color}>{item.step}</span>
                {i < 5 && <span className="hidden md:inline text-copper/40">&rarr;</span>}
              </div>
              <div className="font-semibold text-limestone-light text-[11px] py-1">
                {item.label}
              </div>
              <div className="text-[10px] text-limestone-muted/70 tracking-tight">
                {item.state}
              </div>
            </div>
          ))}
        </div>

        {/* Relational Entity Connection Graph */}
        <div className="rounded-xl bg-petrol-dark/95 p-4 sm:p-5 border border-limestone-light/10 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] text-limestone-muted">
            <span>RELATIONAL DATA LINKAGE: ENTITY GRAPH</span>
            <span className="text-copper text-[10px]">STAGE: QUALIFIED INTENT</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 rounded bg-petrol/60 border border-limestone-light/10">
              <span className="text-[10px] text-limestone-muted block">INBOUND IDENTITY</span>
              <span className="text-pure-white font-bold text-xs">Lead #ORB-9142</span>
              <span className="text-[10px] text-copper block mt-1">Source: Enterprise Portal</span>
            </div>
            <div className="p-3 rounded bg-petrol/60 border border-copper/30">
              <span className="text-[10px] text-copper block">SCHEDULED FOLLOW-UP</span>
              <span className="text-pure-white font-bold text-xs">Discovery Discussion</span>
              <span className="text-[10px] text-sage block mt-1">Pending Reminder: T-24h</span>
            </div>
            <div className="p-3 rounded bg-petrol/60 border border-limestone-light/10">
              <span className="text-[10px] text-limestone-muted block">PIPELINE MILESTONE</span>
              <span className="text-pure-white font-bold text-xs">Scope Evaluation</span>
              <span className="text-[10px] text-limestone-muted block mt-1">Status: Active Review</span>
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="text-[11px] font-mono text-limestone-muted/75 italic text-center pt-1">
          {DISCLAIMER_CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * 02 — Orbion AI Chatbot Workflow Diagram
 * Grounded Knowledge Retrieval & Verification Loop
 */
export function ChatbotWorkflowDiagram({ className = "" }: WorkflowVisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-8 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header Telemetry */}
        <div className="flex flex-wrap items-center justify-between pb-3.5 border-b border-limestone-light/15 text-xs font-mono gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Orbion AI Chatbot &bull; Grounded Knowledge Loop
            </span>
          </div>
          <span className="text-copper font-semibold uppercase tracking-wider text-[11px] px-2 py-0.5 rounded bg-copper/15 border border-copper/30">
            DETERMINISTIC RETRIEVAL
          </span>
        </div>

        {/* Knowledge Pipeline Loop */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-petrol-dark/85 border border-limestone-light/10 space-y-1.5">
            <span className="text-copper text-[10px] block font-bold">STAGE 01 &bull; INGESTION</span>
            <div className="text-limestone-light font-semibold text-[11px]">Approved Docs &amp; FAQs</div>
            <p className="text-[10px] text-limestone-muted">Business guidelines, catalogs &amp; policies indexed</p>
          </div>
          <div className="p-3.5 rounded-xl bg-petrol-dark/85 border border-limestone-light/10 space-y-1.5">
            <span className="text-sage text-[10px] block font-bold">STAGE 02 &bull; QUERY PARSE</span>
            <div className="text-limestone-light font-semibold text-[11px]">User Inquiry Intake</div>
            <p className="text-[10px] text-limestone-muted">Natural intent analysis with strict boundaries</p>
          </div>
          <div className="p-3.5 rounded-xl bg-petrol-dark/85 border border-copper/30 space-y-1.5">
            <span className="text-copper text-[10px] block font-bold">STAGE 03 &bull; GROUNDED SEARCH</span>
            <div className="text-limestone-light font-semibold text-[11px]">Verified Source Matching</div>
            <p className="text-[10px] text-limestone-muted">Extracts verbatim citations from internal corpus</p>
          </div>
          <div className="p-3.5 rounded-xl bg-petrol-dark/85 border border-limestone-light/10 space-y-1.5">
            <span className="text-sage text-[10px] block font-bold">STAGE 04 &bull; SYNTHESIS OR ESCALATE</span>
            <div className="text-limestone-light font-semibold text-[11px]">Response / Operator Gate</div>
            <p className="text-[10px] text-limestone-muted">Refuses hallucination; transfers to human team</p>
          </div>
        </div>

        {/* Simulation Dialogue Track */}
        <div className="rounded-xl bg-petrol-dark/95 p-4 sm:p-5 border border-limestone-light/10 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] text-limestone-muted pb-2 border-b border-limestone-light/10">
            <span>CONVERSATIONAL CONTEXT TRACE</span>
            <span className="text-sage text-[10px]">GROUNDING CONFIDENCE: HIGH</span>
          </div>

          <div className="space-y-2.5">
            <div className="p-2.5 rounded bg-petrol/50 border border-limestone-light/10 flex items-start gap-3">
              <span className="text-copper font-bold text-[10px]">VISITOR</span>
              <p className="text-limestone-light text-[11px]">
                &quot;What are your consultation cancellation terms and standard response windows?&quot;
              </p>
            </div>
            <div className="p-2.5 rounded bg-petrol/80 border border-copper/25 flex items-start gap-3">
              <span className="text-sage font-bold text-[10px]">BOT (PLANNED)</span>
              <div className="space-y-1">
                <p className="text-limestone-light text-[11px]">
                  &quot;According to Section 4.2 of our verified policy, consultations require 24 hours notice for rescheduling. Standard support queries are answered within 1 business day.&quot;
                </p>
                <span className="text-[10px] text-limestone-muted/70 block">
                  Source: Approved_Client_Policies_v2.pdf &bull; Grounded Fact
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="text-[11px] font-mono text-limestone-muted/75 italic text-center pt-1">
          {DISCLAIMER_CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * 03 — Orbion Bookings Workflow Diagram
 * Multi-Staff Availability Matrix & Booking Conflict Prevention
 */
export function BookingsWorkflowDiagram({ className = "" }: WorkflowVisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-8 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header Telemetry */}
        <div className="flex flex-wrap items-center justify-between pb-3.5 border-b border-limestone-light/15 text-xs font-mono gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Orbion Bookings &bull; Scheduling State Machine
            </span>
          </div>
          <span className="text-sage font-semibold uppercase tracking-wider text-[11px] px-2 py-0.5 rounded bg-sage/15 border border-sage/30">
            CONFLICT PREVENTION ENGINE
          </span>
        </div>

        {/* Timeline Reservation Track */}
        <div className="rounded-xl bg-petrol-dark/95 p-4 sm:p-5 border border-limestone-light/10 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] text-limestone-muted">
            <span>CALENDAR ALLOCATION TIMELINE: TODAY</span>
            <span className="text-copper text-[10px]">ROSTER: 3 ACTIVE PRACTITIONERS</span>
          </div>

          <div className="space-y-2">
            {[
              {
                time: "09:00 - 10:00 AM",
                service: "Initial Assessment",
                staff: "Dr. Sarah Lin",
                status: "CONFIRMED",
                badge: "bg-sage/15 text-sage border-sage/30",
              },
              {
                time: "10:30 - 11:30 AM",
                service: "Specialized Therapy",
                staff: "Michael Evans",
                status: "BUFFER RESERVED",
                badge: "bg-copper/15 text-copper border-copper/30",
              },
              {
                time: "01:00 - 02:00 PM",
                service: "Consultation Review",
                staff: "Dr. Sarah Lin",
                status: "OPEN SLOT",
                badge: "bg-limestone-light/10 text-limestone-muted border-limestone-light/20",
              },
            ].map((slot) => (
              <div
                key={slot.time}
                className="p-3 rounded bg-petrol/60 border border-limestone-light/10 flex flex-wrap items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3">
                  <span className="text-copper font-bold text-[11px]">{slot.time}</span>
                  <div>
                    <span className="text-pure-white font-medium text-xs block">{slot.service}</span>
                    <span className="text-[10px] text-limestone-muted">{slot.staff}</span>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded border ${slot.badge}`}>
                  {slot.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Progression Architecture */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs font-mono">
          <div className="p-2.5 rounded bg-petrol-dark/80 border border-limestone-light/10">
            <span className="text-copper block text-[10px]">STEP 1</span>
            <span className="text-limestone-light text-[11px] font-medium">Service Config</span>
          </div>
          <div className="p-2.5 rounded bg-petrol-dark/80 border border-limestone-light/10">
            <span className="text-sage block text-[10px]">STEP 2</span>
            <span className="text-limestone-light text-[11px] font-medium">Slot Selection</span>
          </div>
          <div className="p-2.5 rounded bg-petrol-dark/80 border border-copper/30">
            <span className="text-copper block text-[10px]">STEP 3</span>
            <span className="text-limestone-light text-[11px] font-medium">Double-Check Lock</span>
          </div>
          <div className="p-2.5 rounded bg-petrol-dark/80 border border-limestone-light/10">
            <span className="text-sage block text-[10px]">STEP 4</span>
            <span className="text-limestone-light text-[11px] font-medium">Automated Alert</span>
          </div>
        </div>

        {/* Caption */}
        <p className="text-[11px] font-mono text-limestone-muted/75 italic text-center pt-1">
          {DISCLAIMER_CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * 04 — Orbion Fit Workflow Diagram
 * Member Attendance & Recurring Subscription Lifecycle
 */
export function FitWorkflowDiagram({ className = "" }: WorkflowVisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-8 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header Telemetry */}
        <div className="flex flex-wrap items-center justify-between pb-3.5 border-b border-limestone-light/15 text-xs font-mono gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Orbion Fit &bull; Member Lifecycle &amp; Attendance Subsystem
            </span>
          </div>
          <span className="text-sage font-semibold uppercase tracking-wider text-[11px] px-2 py-0.5 rounded bg-sage/15 border border-sage/30">
            MEMBERSHIP ENGINE
          </span>
        </div>

        {/* Member Lifecycle Progression Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-petrol-dark/85 border border-limestone-light/10 space-y-2">
            <span className="text-copper text-[10px] block font-bold">01 / INTAKE &amp; PLAN</span>
            <div className="text-limestone-light font-semibold text-[11px]">Member Onboarding</div>
            <div className="text-[10px] text-limestone-muted space-y-1">
              <div>&bull; Personal &amp; Emergency Profile</div>
              <div>&bull; Tier: Annual Performance</div>
              <div>&bull; Payment Status: Verified</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-petrol-dark/85 border border-copper/30 space-y-2">
            <span className="text-sage text-[10px] block font-bold">02 / DAILY CHECK-IN</span>
            <div className="text-limestone-light font-semibold text-[11px]">Reception Scan Ledger</div>
            <div className="text-[10px] text-limestone-muted space-y-1">
              <div>&bull; Timestamp: 07:15 AM Check-in</div>
              <div>&bull; Status: Validated Active</div>
              <div>&bull; Facility Capacity: 42%</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-petrol-dark/85 border border-limestone-light/10 space-y-2">
            <span className="text-copper text-[10px] block font-bold">03 / RENEWALS TRACKING</span>
            <div className="text-limestone-light font-semibold text-[11px]">Retention Monitor</div>
            <div className="text-[10px] text-limestone-muted space-y-1">
              <div>&bull; Plan Expiration: 14 Days Remaining</div>
              <div>&bull; Automated Renewal Prompt</div>
              <div>&bull; Account Standing: Good</div>
            </div>
          </div>
        </div>

        {/* Attendance Volume Overview */}
        <div className="rounded-xl bg-petrol-dark/95 p-4 sm:p-5 border border-limestone-light/10 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] text-limestone-muted">
            <span>FACILITY USAGE DISTRIBUTION (SIMULATED SCHEMATIC)</span>
            <span className="text-sage text-[10px]">RETENTION INDEX: 94.2%</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 text-center text-[10px]">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
              <div key={d} className="p-2 rounded bg-petrol/60 border border-limestone-light/10">
                <span className="text-limestone-muted block text-[9px]">{d}</span>
                <span className={`font-bold block mt-1 ${i % 2 === 0 ? "text-copper" : "text-sage"}`}>
                  {[142, 168, 155, 172, 138, 194, 110][i]}
                </span>
                <span className="text-[9px] text-limestone-muted/60">entries</span>
              </div>
            ))}
          </div>
        </div>

        {/* Caption */}
        <p className="text-[11px] font-mono text-limestone-muted/75 italic text-center pt-1">
          {DISCLAIMER_CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * 05 — Orbion Dine Workflow Diagram
 * Digital Menu, Table QR Ordering & Kitchen Queue Synchronization
 */
export function DineWorkflowDiagram({ className = "" }: WorkflowVisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-8 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header Telemetry */}
        <div className="flex flex-wrap items-center justify-between pb-3.5 border-b border-limestone-light/15 text-xs font-mono gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Orbion Dine &bull; Dining Room &amp; Prep Coordination
            </span>
          </div>
          <span className="text-sage font-semibold uppercase tracking-wider text-[11px] px-2 py-0.5 rounded bg-sage/15 border border-sage/30">
            ORDER QUEUE SCHEMATIC
          </span>
        </div>

        {/* Floor to Kitchen Sequence */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-petrol-dark/85 border border-limestone-light/10 space-y-2">
            <span className="text-copper text-[10px] block font-bold">ZONE 1 &bull; TABLE QR</span>
            <div className="text-pure-white font-semibold text-[11px]">Table 07 &bull; Guest App</div>
            <p className="text-[10px] text-limestone-muted">
              Guest scans QR, reviews allergen badges &amp; submits order ticket.
            </p>
            <div className="text-[10px] text-sage pt-1 border-t border-limestone-light/10">
              Ticket #482 Generated
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-petrol-dark/85 border border-copper/30 space-y-2">
            <span className="text-sage text-[10px] block font-bold">ZONE 2 &bull; KITCHEN DISPLAY</span>
            <div className="text-pure-white font-semibold text-[11px]">Prep Queue Coordination</div>
            <p className="text-[10px] text-limestone-muted">
              Live routing to grill and pastry stations with countdown timers.
            </p>
            <div className="text-[10px] text-copper pt-1 border-t border-limestone-light/10">
              Status: In Preparation (4m elapsed)
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-petrol-dark/85 border border-limestone-light/10 space-y-2">
            <span className="text-copper text-[10px] block font-bold">ZONE 3 &bull; SERVICE PASS</span>
            <div className="text-pure-white font-semibold text-[11px]">Floor Service &amp; Table Turn</div>
            <p className="text-[10px] text-limestone-muted">
              Pass alert dispatched to floor staff for prompt table delivery.
            </p>
            <div className="text-[10px] text-sage pt-1 border-t border-limestone-light/10">
              Status: Ready to Serve
            </div>
          </div>
        </div>

        {/* Dynamic Menu Administration Bar */}
        <div className="rounded-xl bg-petrol-dark/95 p-4 sm:p-5 border border-limestone-light/10 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] text-limestone-muted pb-2 border-b border-limestone-light/10">
            <span>MENU ADMINISTRATION CONTROL</span>
            <span className="text-sage text-[10px]">SYNC STATUS: INSTANT PUSH</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px]">
            <div>
              <span className="text-pure-white font-semibold block">Artisanal Sourdough &amp; Truffle Dip</span>
              <span className="text-[10px] text-limestone-muted">Price: $14.00 &bull; Vegetarian</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-sage/15 text-sage border border-sage/30 text-[10px]">
              AVAILABLE ON DIGITAL MENU
            </span>
          </div>
        </div>

        {/* Caption */}
        <p className="text-[11px] font-mono text-limestone-muted/75 italic text-center pt-1">
          {DISCLAIMER_CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * 06 — Orbion Docs Workflow Diagram
 * Document Ingestion, OCR Layout Analysis & Semantic Extraction Pipeline
 */
export function DocsWorkflowDiagram({ className = "" }: WorkflowVisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-8 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header Telemetry */}
        <div className="flex flex-wrap items-center justify-between pb-3.5 border-b border-limestone-light/15 text-xs font-mono gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Orbion Docs &bull; Document Intelligence Pipeline
            </span>
          </div>
          <span className="text-copper font-semibold uppercase tracking-wider text-[11px] px-2 py-0.5 rounded bg-copper/15 border border-copper/30">
            HUMAN-IN-THE-LOOP VERIFICATION
          </span>
        </div>

        {/* 4-Stage Extraction Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-petrol-dark/85 border border-limestone-light/10 space-y-1.5">
            <span className="text-copper text-[10px] block font-bold">01 / INGESTION</span>
            <div className="text-limestone-light font-semibold text-[11px]">PDF / Image Upload</div>
            <p className="text-[10px] text-limestone-muted">Normalization, de-skewing &amp; layout bounding</p>
          </div>
          <div className="p-3.5 rounded-xl bg-petrol-dark/85 border border-limestone-light/10 space-y-1.5">
            <span className="text-sage text-[10px] block font-bold">02 / PARSING</span>
            <div className="text-limestone-light font-semibold text-[11px]">AI Entity Extraction</div>
            <p className="text-[10px] text-limestone-muted">Maps invoice numbers, totals &amp; line items</p>
          </div>
          <div className="p-3.5 rounded-xl bg-petrol-dark/85 border border-copper/30 space-y-1.5">
            <span className="text-copper text-[10px] block font-bold">03 / VERIFY</span>
            <div className="text-limestone-light font-semibold text-[11px]">Split-Screen Review</div>
            <p className="text-[10px] text-limestone-muted">Human reviewer inspects low-confidence fields</p>
          </div>
          <div className="p-3.5 rounded-xl bg-petrol-dark/85 border border-limestone-light/10 space-y-1.5">
            <span className="text-sage text-[10px] block font-bold">04 / EXPORT</span>
            <div className="text-limestone-light font-semibold text-[11px]">Structured Schema</div>
            <p className="text-[10px] text-limestone-muted">Deterministic CSV &amp; JSON dataset export</p>
          </div>
        </div>

        {/* Side-by-Side Verification Schematic */}
        <div className="rounded-xl bg-petrol-dark/95 p-4 sm:p-5 border border-limestone-light/10 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] text-limestone-muted pb-2 border-b border-limestone-light/10">
            <span>EXTRACTION AUDIT RECORD: INVOICE_2026_09A.PDF</span>
            <span className="text-sage text-[10px]">VERIFICATION SCORE: 99.4%</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
            <div className="p-3 rounded bg-petrol/60 border border-limestone-light/10 space-y-1">
              <span className="text-[10px] text-limestone-muted uppercase block">DETECTED VENDOR</span>
              <span className="text-pure-white font-bold block">Orbion Logistics Ltd.</span>
              <span className="text-[10px] text-sage">Bounding Box: [X: 42, Y: 110, W: 220, H: 28]</span>
            </div>
            <div className="p-3 rounded bg-petrol/60 border border-copper/30 space-y-1">
              <span className="text-[10px] text-copper uppercase block">TOTAL AMOUNT EXTRACTED</span>
              <span className="text-pure-white font-bold block">$18,450.00 USD</span>
              <span className="text-[10px] text-sage">Status: Verified by Human Reviewer</span>
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="text-[11px] font-mono text-limestone-muted/75 italic text-center pt-1">
          {DISCLAIMER_CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * 07 — Orbion Insights Workflow Diagram
 * Tabular Ingestion, Metric Aggregation & Report Generation
 */
export function InsightsWorkflowDiagram({ className = "" }: WorkflowVisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-8 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header Telemetry */}
        <div className="flex flex-wrap items-center justify-between pb-3.5 border-b border-limestone-light/15 text-xs font-mono gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Orbion Insights &bull; Tabular Analytics Pipeline
            </span>
          </div>
          <span className="text-sage font-semibold uppercase tracking-wider text-[11px] px-2 py-0.5 rounded bg-sage/15 border border-sage/30">
            METRIC AGGREGATION ENGINE
          </span>
        </div>

        {/* Visual Metric Aggregation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-petrol-dark/85 border border-limestone-light/10 space-y-1.5">
            <span className="text-[10px] text-limestone-muted uppercase">INTAKE VOLUME</span>
            <div className="text-pure-white font-bold text-base">42,890 Rows</div>
            <span className="text-[10px] text-sage block">Clean Ingestion from CSV</span>
          </div>
          <div className="p-3.5 rounded-xl bg-petrol-dark/85 border border-copper/30 space-y-1.5">
            <span className="text-[10px] text-copper uppercase">KEY METRIC CALCULATED</span>
            <div className="text-copper font-bold text-base">+18.4% QoQ</div>
            <span className="text-[10px] text-limestone-muted block">Operational Throughput</span>
          </div>
          <div className="p-3.5 rounded-xl bg-petrol-dark/85 border border-limestone-light/10 space-y-1.5">
            <span className="text-[10px] text-limestone-muted uppercase">OUTPUT ARTIFACT</span>
            <div className="text-sage font-bold text-base">PDF &amp; CSV Digest</div>
            <span className="text-[10px] text-limestone-muted block">Ready for Stakeholders</span>
          </div>
        </div>

        {/* Trend Bar Simulation */}
        <div className="rounded-xl bg-petrol-dark/95 p-4 sm:p-5 border border-limestone-light/10 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] text-limestone-muted">
            <span>PERIODIC ACTIVITY DISTRIBUTION (SIMULATED SCHEMATIC)</span>
            <span className="text-sage text-[10px]">CORRELATION: CONFIRMED</span>
          </div>

          <div className="grid grid-cols-6 gap-2 text-center text-[10px]">
            {["Q1 W1", "Q1 W2", "Q1 W3", "Q1 W4", "Q2 W1", "Q2 W2"].map((w, i) => (
              <div key={w} className="p-2 rounded bg-petrol/60 border border-limestone-light/10">
                <span className="text-limestone-muted block text-[9px]">{w}</span>
                <span className={`font-bold block mt-1 ${i > 3 ? "text-copper" : "text-sage"}`}>
                  {[72, 81, 79, 94, 112, 126][i]}
                </span>
                <span className="text-[9px] text-limestone-muted/60">units</span>
              </div>
            ))}
          </div>
        </div>

        {/* Caption */}
        <p className="text-[11px] font-mono text-limestone-muted/75 italic text-center pt-1">
          {DISCLAIMER_CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * Master dispatcher for product workflow diagram
 */
export function ProductWorkflowVisual({
  type,
  className = "",
}: {
  type:
    | "crm-pipeline"
    | "chatbot-conversation"
    | "bookings-scheduling"
    | "fit-membership"
    | "dine-ordering"
    | "docs-extraction"
    | "insights-analytics";
  className?: string;
}) {
  switch (type) {
    case "crm-pipeline":
      return <CrmWorkflowDiagram className={className} />;
    case "chatbot-conversation":
      return <ChatbotWorkflowDiagram className={className} />;
    case "bookings-scheduling":
      return <BookingsWorkflowDiagram className={className} />;
    case "fit-membership":
      return <FitWorkflowDiagram className={className} />;
    case "dine-ordering":
      return <DineWorkflowDiagram className={className} />;
    case "docs-extraction":
      return <DocsWorkflowDiagram className={className} />;
    case "insights-analytics":
      return <InsightsWorkflowDiagram className={className} />;
    default:
      return null;
  }
}

