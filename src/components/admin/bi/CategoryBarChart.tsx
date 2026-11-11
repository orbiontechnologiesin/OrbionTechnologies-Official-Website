import React from "react";

interface BarItem {
  label: string;
  count: number;
  percentage?: number;
}

interface CategoryBarChartProps {
  title: string;
  description?: string;
  items: BarItem[];
  emptyMessage?: string;
}

export function CategoryBarChart({
  title,
  description,
  items,
  emptyMessage = "No category data available",
}: CategoryBarChartProps) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-limestone-card border border-graphite-border/70 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-graphite mb-1">{title}</h3>
        {description && <p className="text-xs text-graphite-subtle mb-4">{description}</p>}
        <div className="py-10 text-center text-xs font-mono text-graphite-muted border border-dashed border-graphite-border/60 rounded-lg">
          {emptyMessage}
        </div>
      </div>
    );
  }

  const maxVal = Math.max(1, ...items.map((i) => i.count));

  return (
    <div className="bg-limestone-card border border-graphite-border/70 rounded-xl p-6 shadow-xs">
      <h3 className="text-sm font-semibold text-graphite">{title}</h3>
      {description && <p className="text-xs text-graphite-subtle mt-0.5 mb-4">{description}</p>}

      <div className="space-y-3.5 mt-3">
        {items.map((item, index) => {
          const pct = Math.round((item.count / maxVal) * 100);
          return (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-graphite font-medium truncate max-w-[220px]">
                  {item.label}
                </span>
                <span className="text-graphite-muted shrink-0">
                  {item.count} {item.percentage !== undefined && `(${item.percentage}%)`}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-limestone-light overflow-hidden border border-graphite-border/40">
                <div
                  className="h-full rounded-full bg-petrol transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

