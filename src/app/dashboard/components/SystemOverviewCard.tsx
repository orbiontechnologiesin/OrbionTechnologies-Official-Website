'use client';

import React from 'react';

interface SystemOverviewCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  status?: 'active' | 'inactive' | 'warning';
  metrics?: Array<{ label: string; value: string; valueColor?: 'primary' | 'secondary' | 'muted' }>;
  progress?: { label: string; value: string; percent: number; color?: 'primary' | 'secondary' };
}

export function SystemOverviewCard({
  title,
  value,
  subtitle,
  icon,
  status,
  metrics,
  progress,
}: SystemOverviewCardProps) {
  const statusColors = {
    active: 'bg-orbion-cyan/20 text-orbion-cyan border-orbion-cyan/40',
    inactive: 'bg-text-muted/10 text-text-muted border-text-muted/40',
    warning: 'bg-warning/20 text-warning border-warning/40',
  };

  return (
    <div className="rounded-xl border border-border bg-surface-card p-5 flex flex-col justify-between gap-3 hover:bg-surface-container transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-orbion-indigo">
            {icon}
          </div>
          <div>
            <div className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
              {title}
            </div>
            <div className="text-sm font-semibold text-text-primary">{value}</div>
          </div>
        </div>
        {status && (
          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono ${statusColors[status || 'active']}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {status === 'active' ? 'Sync Active' : status === 'inactive' ? 'Inactive' : 'Warning'}
          </span>
        )}
      </div>

      {metrics && metrics.length > 0 && (
        <div className="flex flex-col gap-1 pt-1">
          {metrics.map((m, i) => (
            <div key={i} className="flex justify-between items-baseline text-xs font-mono">
              <span className="text-text-muted">{m.label}</span>
              <span
                className={`font-medium ${
                  m.valueColor === 'primary'
                    ? 'text-text-primary'
                    : m.valueColor === 'secondary'
                    ? 'text-orbion-cyan'
                    : 'text-text-secondary'
                }`}
              >
                {m.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {progress && (
        <div className="pt-1">
          <div className="flex justify-between items-center text-xs font-mono mb-1">
            <span className="text-text-muted">{progress.label}</span>
            <span
              className={`font-medium ${
                progress.color === 'primary' ? 'text-text-primary' : 'text-orbion-cyan'
              }`}
            >
              {progress.value}
            </span>
          </div>
          <div className="w-full bg-surface-container-high rounded-full h-1 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress.percent}%`,
                backgroundColor:
                  progress.color === 'primary' ? 'var(--orbion-indigo)' : 'var(--orbion-cyan)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}