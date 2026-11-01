import React from 'react';
import {
  Cpu,
  Code2,
  Database,
  Shield,
} from 'lucide-react';

const ARCH_ITEMS = [
  {
    icon: <Cpu className="w-5 h-5 text-orbion-indigo" />,
    title: 'Next.js 15',
    description: 'Turbopack SSR / RSC',
    status: 'Healthy',
  },
  {
    icon: <Code2 className="w-5 h-5 text-orbion-indigo" />,
    title: 'React 19 Core',
    description: 'Concurrent Dispatch',
    status: 'Healthy',
  },
  {
    icon: <Database className="w-5 h-5 text-orbion-cyan" />,
    title: 'PostgreSQL Engine',
    description: 'Supabase High Availability',
    status: 'Healthy',
  },
  {
    icon: <Shield className="w-5 h-5 text-orbion-cyan" />,
    title: 'Better Auth Service',
    description: 'Isolated KMS Enclave',
    status: 'Healthy',
  },
];

export function ArchitectureMatrix() {
  return (
    <div className="rounded-xl border border-border bg-surface-card p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-title-md text-title-md font-semibold text-text-primary">
            System Architecture Matrix
          </h2>
          <p className="font-body-sm text-body-sm text-text-secondary">
            Core stack runtime verified and operational
          </p>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orbion-cyan/20 text-orbion-cyan font-mono text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-orbion-cyan" />
          All Systems Nominal
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {ARCH_ITEMS.map((item, idx) => (
          <div
            key={item.title}
            className="p-2.5 rounded-lg bg-surface-container flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              {item.icon}
              <div>
                <div className="font-label-md text-label-md text-text-primary">{item.title}</div>
                <div className="font-caption-xs text-caption-xs text-text-muted">{item.description}</div>
              </div>
            </div>
            <span className="font-mono text-[11px] text-orbion-cyan">{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}