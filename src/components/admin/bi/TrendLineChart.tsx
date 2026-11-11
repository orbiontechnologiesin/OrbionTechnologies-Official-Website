import React from "react";

interface TrendPoint {
  date: string;
  views: number;
  visitors?: number;
}

interface TrendLineChartProps {
  data: TrendPoint[];
  title?: string;
  description?: string;
  height?: number;
}

export function TrendLineChart({
  data,
  title = "Traffic Trends",
  description = "Daily page views and unique visitors",
  height = 200,
}: TrendLineChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-limestone-card border border-graphite-border/70 rounded-xl p-6 text-center">
        <h3 className="text-sm font-semibold text-graphite mb-1">{title}</h3>
        <p className="text-xs text-graphite-subtle mb-6">{description}</p>
        <div className="h-40 flex items-center justify-center border border-dashed border-graphite-border/60 rounded-lg text-xs font-mono text-graphite-muted">
          No trend activity recorded in this period
        </div>
      </div>
    );
  }

  const maxVal = Math.max(1, ...data.map((d) => Math.max(d.views, d.visitors || 0)));
  const width = 600;
  const padding = 30;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = data.map((d, index) => {
    const x = padding + (index / Math.max(1, data.length - 1)) * chartWidth;
    const y = height - padding - (d.views / maxVal) * chartHeight;
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, pt, i) => `${acc} ${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`, "");
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className="bg-limestone-card border border-graphite-border/70 rounded-xl p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-graphite">{title}</h3>
          <p className="text-xs text-graphite-subtle mt-0.5">{description}</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-petrol inline-block" />
            <span className="text-graphite-muted">Page Views</span>
          </div>
          {data.some((d) => d.visitors !== undefined) && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-copper inline-block" />
              <span className="text-graphite-muted">Visitors</span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
            const y = height - padding - pct * chartHeight;
            const val = Math.round(pct * maxVal);
            return (
              <g key={pct}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="#E4E2DC"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={padding - 6}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="9"
                  fontFamily="monospace"
                  fill="#8C887B"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Fill Area */}
          <path d={areaD} fill="#14342B" fillOpacity="0.08" />

          {/* Stroke Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#14342B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data point dots */}
          {points.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="3.5"
              fill="#FAF8F5"
              stroke="#14342B"
              strokeWidth="2"
            />
          ))}

          {/* X axis dates */}
          {points.map((pt, i) => {
            if (i % Math.ceil(points.length / 6) === 0 || i === points.length - 1) {
              return (
                <text
                  key={`label-${i}`}
                  x={pt.x}
                  y={height - 8}
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="monospace"
                  fill="#8C887B"
                >
                  {pt.date.slice(5)}
                </text>
              );
            }
            return null;
          })}
        </svg>
      </div>
    </div>
  );
}

