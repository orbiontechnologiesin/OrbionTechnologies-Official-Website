import React from "react";
import type { LeadFunnelStage } from "@/services/lead-intelligence.service";

interface FunnelChartProps {
  stages: LeadFunnelStage[];
  title?: string;
  description?: string;
}

export function FunnelChart({
  stages,
  title = "Inbound Lead Funnel",
  description = "Progression from initial inquiry intake to qualification and closure",
}: FunnelChartProps) {
  const stageColors: Record<string, string> = {
    new: "bg-petrol",
    contacted: "bg-petrol-light",
    qualified: "bg-copper",
    closed: "bg-emerald-700",
  };

  return (
    <div className="bg-limestone-card border border-graphite-border/70 rounded-xl p-6 shadow-xs">
      <h3 className="text-sm font-semibold text-graphite">{title}</h3>
      <p className="text-xs text-graphite-subtle mt-0.5 mb-5">{description}</p>

      <div className="space-y-4">
        {stages.map((stage) => {
          const colorClass = stageColors[stage.stage] || "bg-petrol";
          return (
            <div key={stage.stage} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-semibold text-graphite uppercase tracking-wide">
                  {stage.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-graphite">{stage.count} leads</span>
                  <span className="text-graphite-muted">({stage.percentage}%)</span>
                </div>
              </div>
              <div className="w-full h-3 rounded-md bg-limestone-light overflow-hidden border border-graphite-border/50">
                <div
                  className={`h-full rounded-md ${colorClass} transition-all duration-300`}
                  style={{ width: `${Math.max(4, stage.percentage)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

