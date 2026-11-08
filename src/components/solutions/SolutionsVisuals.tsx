import React from "react";

const CAPTION = "Concept visualization — illustrative, not a live product interface.";

/**
 * Conceptual visual schematic for Solution 01: Business Websites & Digital Experiences
 */
export function WebEngineeringVisual({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-petrol p-6 sm:p-7 text-limestone-light border border-petrol-light relative overflow-hidden shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-grid-petrol opacity-40 pointer-events-none" />

      <div className="relative z-10 space-y-5 font-mono text-xs">
        {/* Top Header Telemetry */}
        <div className="flex items-center justify-between pb-3.5 border-b border-limestone-light/15 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-copper" />
            <span className="text-limestone-muted uppercase tracking-wider">
              Web Engineering Subsystem
            </span>
          </div>
          <span className="text-sage font-semibold uppercase">ACTIVE DISCIPLINE</span>
        </div>

        {/* Viewport & Performance Matrix */}
        <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
          <div className="p-2.5 rounded bg-petrol-dark/80 border border-limestone-light/10">
            <span className="text-copper block font-semibold text-[11px]">DESKTOP / XL</span>
            <span className="text-limestone-muted/70 text-[9px]">1440px Grid</span>
          </div>
          <div className="p-2.5 rounded bg-petrol-dark/80 border border-copper/30">
            <span className="text-copper block font-semibold text-[11px]">TABLET / MD</span>
            <span className="text-limestone-muted/70 text-[9px]">768px Adaptive</span>
          </div>
          <div className="p-2.5 rounded bg-petrol-dark/80 border border-limestone-light/10">
            <span className="text-sage block font-semibold text-[11px]">MOBILE / SM</span>
            <span className="text-limestone-muted/70 text-[9px]">390px Fluid</span>
          </div>
        </div>

        {/* Architectural Wireframe Simulation */}
        <div className="rounded-xl bg-petrol-dark/95 p-4 border border-limestone-light/10 space-y-2.5">
          <div className="flex items-center justify-between text-[11px] text-limestone-muted border-b border-limestone-light/10 pb-2">
            <span>CORE ARCHITECTURE ATTRIBUTES</span>
            <span className="text-sage text-[10px]">VERIFIED 100/100</span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between p-1.5 rounded bg-petrol/50 border border-limestone-light/5">
              <span className="text-limestone-light">Responsive Layout Engine</span>
              <span className="text-sage text-[10px]">Sub-50ms TTI</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-petrol/50 border border-limestone-light/5">
              <span className="text-limestone-light">Structured Inquiry Pipeline</span>
              <span className="text-copper text-[10px]">Zero Form Drop</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-petrol/50 border border-limestone-light/5">
              <span className="text-limestone-light">Semantic SEO &amp; OpenGraph</span>
              <span className="text-sage text-[10px]">Full Crawl Index</span>
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="text-[10px] font-mono text-limestone-muted/70 italic text-center pt-1">
          {CAPTION}
        </p>
      </div>
    </div>
  );
}

