import React from "react";

const CAPTION = "Concept visualization — illustrative, not a live product interface.";

interface VisualProps {
  className?: string;
}

/**
 * 01 — SME Visual: Organized Digital Business Workspace
 */
export function SmeVisual({ className = "" }: VisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-7 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-5 font-mono text-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-limestone-light/15 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            <span className="text-limestone-muted uppercase tracking-wider">
              SME Operations Hub &bull; Subsystem
            </span>
          </div>
          <span className="text-sage font-semibold uppercase">INTEGRATED VIEW</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
          <div className="p-2.5 rounded bg-petrol-dark/80 border border-limestone-light/10">
            <span className="text-copper block font-semibold text-[11px]">LEADS</span>
            <span className="text-limestone-muted/70 text-[9px]">24 Active</span>
          </div>
          <div className="p-2.5 rounded bg-petrol-dark/80 border border-copper/30">
            <span className="text-copper block font-semibold text-[11px]">DEALS</span>
            <span className="text-limestone-muted/70 text-[9px]">8 In Progress</span>
          </div>
          <div className="p-2.5 rounded bg-petrol-dark/80 border border-limestone-light/10">
            <span className="text-sage block font-semibold text-[11px]">TASKS</span>
            <span className="text-limestone-muted/70 text-[9px]">100% On Time</span>
          </div>
        </div>

        <div className="rounded-xl bg-petrol-dark/95 p-4 border border-limestone-light/10 space-y-2 text-[11px]">
          <div className="flex items-center justify-between text-limestone-muted pb-1.5 border-b border-limestone-light/10">
            <span>OPERATIONAL ACTIVITY LEDGER</span>
            <span className="text-sage text-[10px]">ORGANIZED</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between p-1.5 rounded bg-petrol/50 border border-limestone-light/5">
              <span>Client Discovery &bull; Acme Enterprises</span>
              <span className="text-copper text-[10px]">Pipeline T-2h</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-petrol/50 border border-limestone-light/5">
              <span>Automated Inquiry Response &bull; Inbound #402</span>
              <span className="text-sage text-[10px]">Resolved</span>
            </div>
          </div>
        </div>

        <p className="text-[10px] font-mono text-limestone-muted/70 italic text-center pt-1">
          {CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * 02 — Retail Visual: Product Catalogue & Digital Storefront Concept
 */
export function RetailVisual({ className = "" }: VisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-7 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-5 font-mono text-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-limestone-light/15 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Digital Commerce Catalogue &bull; Storefront
            </span>
          </div>
          <span className="text-sage font-semibold uppercase">STOREFRONT ENGINE</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-3 rounded-xl bg-petrol-dark/85 border border-copper/30 space-y-1">
            <span className="text-[10px] text-copper block font-semibold">ITEM #SKU-098</span>
            <div className="font-bold text-pure-white text-xs">Artisanal Ceramic Lamp</div>
            <span className="text-[10px] text-sage block">In Stock &bull; 44 units</span>
          </div>
          <div className="p-3 rounded-xl bg-petrol-dark/85 border border-limestone-light/10 space-y-1">
            <span className="text-[10px] text-copper block font-semibold">ITEM #SKU-099</span>
            <div className="font-bold text-pure-white text-xs">Solid Walnut Desk Tray</div>
            <span className="text-[10px] text-sage block">In Stock &bull; 18 units</span>
          </div>
        </div>

        <div className="rounded-xl bg-petrol-dark/95 p-4 border border-limestone-light/10 space-y-2 text-[11px]">
          <div className="flex items-center justify-between text-limestone-muted pb-1.5 border-b border-limestone-light/10">
            <span>INQUIRY &amp; CHECKOUT TRAFFIC</span>
            <span className="text-sage text-[10px]">FLUID CHECKOUT</span>
          </div>
          <div className="flex items-center justify-between text-limestone-light">
            <span>Order Inquiry Route: Fast Checkout</span>
            <span className="text-copper text-[10px]">Zero Cart Friction</span>
          </div>
        </div>

        <p className="text-[10px] font-mono text-limestone-muted/70 italic text-center pt-1">
          {CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * 03 — Healthcare Visual: Appointment Scheduling & Information Flow
 */
export function HealthcareVisual({ className = "" }: VisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-7 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-5 font-mono text-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-limestone-light/15 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Clinical Scheduling Coordinator
            </span>
          </div>
          <span className="text-copper font-semibold uppercase">CONFLICT-FREE MATRIX</span>
        </div>

        <div className="space-y-2 text-[11px]">
          <div className="p-3 rounded-xl bg-petrol-dark/85 border border-limestone-light/10 flex items-center justify-between">
            <div>
              <span className="text-pure-white font-bold block">10:00 AM &bull; Consult Session</span>
              <span className="text-[10px] text-limestone-muted">Practitioner: Room A &bull; Confirmed</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-sage/15 text-sage text-[10px] border border-sage/30">
              CONFIRMED
            </span>
          </div>

          <div className="p-3 rounded-xl bg-petrol-dark/85 border border-copper/30 flex items-center justify-between">
            <div>
              <span className="text-pure-white font-bold block">11:30 AM &bull; Patient Intake Review</span>
              <span className="text-[10px] text-copper">Buffer Interval: 15m Active</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-copper/15 text-copper text-[10px] border border-copper/30">
              BUFFER LOCKED
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-petrol-dark/95 border border-limestone-light/10 text-[10px] text-limestone-muted space-y-1">
          <div className="text-sage font-semibold uppercase">NON-CLINICAL ADMINISTRATIVE SPECIFICATION</div>
          <p>Coordinates appointment availability only. Does not record clinical health diagnoses.</p>
        </div>

        <p className="text-[10px] font-mono text-limestone-muted/70 italic text-center pt-1">
          {CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * 04 — Fitness Visual: Membership & Attendance Workflow
 */
export function FitnessVisual({ className = "" }: VisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-7 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-5 font-mono text-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-limestone-light/15 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Gym Roster &bull; Member Lifecycle
            </span>
          </div>
          <span className="text-sage font-semibold uppercase">CAPACITY 48%</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
          <div className="p-2.5 rounded bg-petrol-dark/80 border border-limestone-light/10">
            <span className="text-copper block font-semibold text-[11px]">MEMBERS</span>
            <span className="text-limestone-muted/70 text-[9px]">412 Active</span>
          </div>
          <div className="p-2.5 rounded bg-petrol-dark/80 border border-copper/30">
            <span className="text-copper block font-semibold text-[11px]">RENEWALS</span>
            <span className="text-limestone-muted/70 text-[9px]">16 This Week</span>
          </div>
          <div className="p-2.5 rounded bg-petrol-dark/80 border border-limestone-light/10">
            <span className="text-sage block font-semibold text-[11px]">CHECK-INS</span>
            <span className="text-limestone-muted/70 text-[9px]">128 Today</span>
          </div>
        </div>

        <div className="rounded-xl bg-petrol-dark/95 p-4 border border-limestone-light/10 space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between text-limestone-muted pb-1 border-b border-limestone-light/10">
            <span>RECEPTION CHECK-IN FEED</span>
            <span className="text-sage text-[10px]">VALIDATED</span>
          </div>
          <div className="flex items-center justify-between text-limestone-light pt-1">
            <span>Pass #4092 &bull; Annual Membership</span>
            <span className="text-sage text-[10px]">Standing: Good</span>
          </div>
        </div>

        <p className="text-[10px] font-mono text-limestone-muted/70 italic text-center pt-1">
          {CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * 05 — Restaurant Visual: Menu & Table Ordering Process
 */
export function RestaurantVisual({ className = "" }: VisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-7 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-5 font-mono text-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-limestone-light/15 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Dining Room &bull; Table Ticket Queue
            </span>
          </div>
          <span className="text-sage font-semibold uppercase">FLOOR SYNC</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-3 rounded-xl bg-petrol-dark/85 border border-copper/30 space-y-1">
            <span className="text-[10px] text-copper block font-semibold">TABLE 04 &bull; TICKET #89</span>
            <div className="font-bold text-pure-white text-xs">2x Wood-Fired Pizza</div>
            <span className="text-[10px] text-sage block">Prep Queue: Station 1</span>
          </div>
          <div className="p-3 rounded-xl bg-petrol-dark/85 border border-limestone-light/10 space-y-1">
            <span className="text-[10px] text-copper block font-semibold">TABLE 12 &bull; TICKET #90</span>
            <div className="font-bold text-pure-white text-xs">1x Citrus Risotto</div>
            <span className="text-[10px] text-copper block">Ready for Pass</span>
          </div>
        </div>

        <div className="rounded-xl bg-petrol-dark/95 p-3.5 border border-limestone-light/10 flex items-center justify-between text-[11px]">
          <span className="text-limestone-muted">Digital Menu State: Instant Sync</span>
          <span className="px-2 py-0.5 rounded bg-sage/15 text-sage text-[10px] border border-sage/30">
            ONLINE
          </span>
        </div>

        <p className="text-[10px] font-mono text-limestone-muted/70 italic text-center pt-1">
          {CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * 06 — Professional Services Visual: Client Relationship & Scheduling Workflow
 */
export function ProfessionalServicesVisual({ className = "" }: VisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-7 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-5 font-mono text-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-limestone-light/15 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Advisory Practice &bull; Client Pipeline
            </span>
          </div>
          <span className="text-sage font-semibold uppercase">ENGAGEMENT DAG</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
          <div className="p-2.5 rounded bg-petrol-dark/80 border border-limestone-light/10">
            <span className="text-copper block font-semibold text-[11px]">DISCOVERY</span>
            <span className="text-limestone-muted/70 text-[9px]">4 Inquiries</span>
          </div>
          <div className="p-2.5 rounded bg-petrol-dark/80 border border-copper/30">
            <span className="text-copper block font-semibold text-[11px]">PROPOSAL</span>
            <span className="text-limestone-muted/70 text-[9px]">2 Under Review</span>
          </div>
          <div className="p-2.5 rounded bg-petrol-dark/80 border border-limestone-light/10">
            <span className="text-sage block font-semibold text-[11px]">ACTIVE</span>
            <span className="text-limestone-muted/70 text-[9px]">12 Mandates</span>
          </div>
        </div>

        <div className="rounded-xl bg-petrol-dark/95 p-3.5 border border-limestone-light/10 text-[11px] space-y-1">
          <div className="flex items-center justify-between text-limestone-muted">
            <span>CONSULTATION ALLOCATION</span>
            <span className="text-sage text-[10px]">CALENDAR SYNCED</span>
          </div>
          <span className="text-pure-white font-medium block">Strategic Advisory Call &bull; 03:00 PM</span>
        </div>

        <p className="text-[10px] font-mono text-limestone-muted/70 italic text-center pt-1">
          {CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * 07 — Education Visual: Course Information & Student Inquiry Flow
 */
export function EducationVisual({ className = "" }: VisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-7 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-5 font-mono text-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-limestone-light/15 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Admissions Knowledge &bull; Student Inquiries
            </span>
          </div>
          <span className="text-copper font-semibold uppercase">24/7 GROUNDED ACCESS</span>
        </div>

        <div className="p-3.5 rounded-xl bg-petrol-dark/90 border border-copper/30 space-y-2 text-[11px]">
          <div className="flex items-start gap-2">
            <span className="text-copper font-bold text-[10px]">APPLICANT</span>
            <p className="text-limestone-light">
              &quot;What are the application prerequisites and scholarship deadlines for Q3?&quot;
            </p>
          </div>
          <div className="flex items-start gap-2 pt-1 border-t border-limestone-light/10">
            <span className="text-sage font-bold text-[10px]">BOT (PLANNED)</span>
            <p className="text-limestone-light">
              &quot;Scholarship applications close on July 31st. Prerequisites: Bachelor&apos;s degree and entrance exam score.&quot;
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-petrol-dark/95 p-3.5 border border-limestone-light/10 flex items-center justify-between text-[11px]">
          <span className="text-limestone-muted">Knowledge Source: Approved_Handbook_2026.pdf</span>
          <span className="text-sage text-[10px]">GROUNDED FACT</span>
        </div>

        <p className="text-[10px] font-mono text-limestone-muted/70 italic text-center pt-1">
          {CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * 08 — Document-Heavy Operations Visual: Document-to-Structured-Data Flow
 */
export function DocumentOperationsVisual({ className = "" }: VisualProps) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-7 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-5 font-mono text-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-limestone-light/15 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Document Processing &bull; Extraction Pipeline
            </span>
          </div>
          <span className="text-sage font-semibold uppercase">OCR &amp; VERIFY</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
          <div className="p-2.5 rounded bg-petrol-dark/80 border border-limestone-light/10">
            <span className="text-copper block font-semibold text-[11px]">UPLOAD</span>
            <span className="text-limestone-muted/70 text-[9px]">PDF / Scan</span>
          </div>
          <div className="p-2.5 rounded bg-petrol-dark/80 border border-copper/30">
            <span className="text-copper block font-semibold text-[11px]">EXTRACT</span>
            <span className="text-limestone-muted/70 text-[9px]">AI Entity Map</span>
          </div>
          <div className="p-2.5 rounded bg-petrol-dark/80 border border-limestone-light/10">
            <span className="text-sage block font-semibold text-[11px]">EXPORT</span>
            <span className="text-limestone-muted/70 text-[9px]">Clean CSV / DB</span>
          </div>
        </div>

        <div className="rounded-xl bg-petrol-dark/95 p-3.5 border border-limestone-light/10 space-y-1 text-[11px]">
          <div className="flex items-center justify-between text-limestone-muted pb-1 border-b border-limestone-light/10">
            <span>INVOICE_BATCH_084.PDF</span>
            <span className="text-sage text-[10px]">ACCURACY 99.6%</span>
          </div>
          <div className="flex items-center justify-between text-limestone-light pt-1">
            <span>Total: $12,480.00 &bull; Vendor: Logistics Core</span>
            <span className="text-copper text-[10px]">Human Verified</span>
          </div>
        </div>

        <p className="text-[10px] font-mono text-limestone-muted/70 italic text-center pt-1">
          {CAPTION}
        </p>
      </div>
    </div>
  );
}

/**
 * Visual dispatcher for industries
 */
export function IndustryVisual({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  switch (id) {
    case "sme":
      return <SmeVisual className={className} />;
    case "retail":
      return <RetailVisual className={className} />;
    case "healthcare":
      return <HealthcareVisual className={className} />;
    case "fitness":
      return <FitnessVisual className={className} />;
    case "restaurants":
      return <RestaurantVisual className={className} />;
    case "professional-services":
      return <ProfessionalServicesVisual className={className} />;
    case "education":
      return <EducationVisual className={className} />;
    case "document-operations":
      return <DocumentOperationsVisual className={className} />;
    default:
      return null;
  }
}

