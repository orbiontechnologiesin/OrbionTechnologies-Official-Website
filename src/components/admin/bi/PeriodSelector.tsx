"use client";

import React from "react";
import { Calendar } from "lucide-react";

export type PeriodType = "7d" | "30d" | "90d" | "custom";

interface PeriodSelectorProps {
  period: PeriodType;
  onChange: (period: PeriodType) => void;
  startDate?: string;
  endDate?: string;
  onCustomDatesChange?: (start: string, end: string) => void;
}

export function PeriodSelector({
  period,
  onChange,
  startDate,
  endDate,
  onCustomDatesChange,
}: PeriodSelectorProps) {
  const options: { value: PeriodType; label: string }[] = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "custom", label: "Custom Range" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="inline-flex rounded-lg border border-graphite-border bg-limestone-card p-1 shadow-xs">
        {options.map((opt) => {
          const isSelected = period === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors cursor-pointer ${
                isSelected
                  ? "bg-petrol text-pure-white font-medium shadow-xs"
                  : "text-graphite-muted hover:text-graphite hover:bg-limestone-light"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {period === "custom" && onCustomDatesChange && (
        <div className="flex items-center gap-2 bg-limestone-card border border-graphite-border rounded-lg px-3 py-1 text-xs font-mono text-graphite shadow-xs">
          <Calendar className="w-3.5 h-3.5 text-graphite-muted" />
          <input
            type="date"
            defaultValue={startDate?.slice(0, 10)}
            onChange={(e) => onCustomDatesChange(e.target.value, endDate || "")}
            className="bg-transparent focus:outline-hidden text-xs"
          />
          <span className="text-graphite-muted">to</span>
          <input
            type="date"
            defaultValue={endDate?.slice(0, 10)}
            onChange={(e) => onCustomDatesChange(startDate || "", e.target.value)}
            className="bg-transparent focus:outline-hidden text-xs"
          />
        </div>
      )}
    </div>
  );
}

