import React from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  deltaPct?: number;
  deltaLabel?: string;
  icon?: React.ComponentType<{ className?: string }>;
  subtext?: string;
  badge?: string;
}

export function StatCard({
  label,
  value,
  deltaPct,
  deltaLabel = "vs previous period",
  icon: Icon,
  subtext,
  badge,
}: StatCardProps) {
  const isPositive = deltaPct !== undefined && deltaPct > 0;
  const isNegative = deltaPct !== undefined && deltaPct < 0;
  const isNeutral = deltaPct !== undefined && deltaPct === 0;

  return (
    <div className="bg-limestone-card border border-graphite-border/70 rounded-xl p-5 shadow-xs hover:border-copper/40 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono uppercase tracking-wider text-graphite-muted font-medium">
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          {badge && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-petrol/10 text-petrol font-medium">
              {badge}
            </span>
          )}
          {Icon && (
            <div className="w-8 h-8 rounded-lg bg-limestone-light border border-graphite-border/50 flex items-center justify-center text-petrol">
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-baseline gap-3">
        <div className="text-2xl font-bold font-mono text-graphite tracking-tight">
          {value}
        </div>
        {deltaPct !== undefined && (
          <div
            className={`flex items-center text-xs font-mono font-medium ${
              isPositive
                ? "text-emerald-700"
                : isNegative
                ? "text-rose-700"
                : "text-graphite-muted"
            }`}
          >
            {isPositive && <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />}
            {isNegative && <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            {isNeutral && <Minus className="w-3.5 h-3.5 mr-0.5" />}
            <span>{Math.abs(deltaPct)}%</span>
          </div>
        )}
      </div>

      {(subtext || deltaPct !== undefined) && (
        <p className="text-[11px] text-graphite-subtle font-sans mt-2">
          {subtext || deltaLabel}
        </p>
      )}
    </div>
  );
}

