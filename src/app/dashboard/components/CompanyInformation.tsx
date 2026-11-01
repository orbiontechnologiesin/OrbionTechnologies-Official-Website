import React from 'react';
import { COMPANY } from '@/lib/constants';
import { Settings } from 'lucide-react';

export function CompanyInformation() {
  return (
    <div className="rounded-xl border border-border bg-surface-card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Settings className="w-4 h-4 text-orbion-indigo" />
          <h2 className="font-title-md text-title-md font-semibold text-text-primary">
            Company & Origins
          </h2>
        </div>
        <span className="font-mono text-[11px] text-text-muted">SPEC-2025</span>
      </div>
      <p className="font-body-sm text-body-sm text-text-secondary leading-relaxed">
        Engineered by Orbion Technologies for low-friction orchestration. Access immutable deployment blueprints, hardware security root proofs, and production topology.
      </p>
      <div className="grid grid-cols-2 gap-2 pt-2">
        <div className="p-2 rounded-lg bg-surface-container flex flex-col gap-0.5">
          <span className="text-text-muted text-[11px] font-mono uppercase tracking-wider">
            Registered Domain
          </span>
          <span className="text-text-primary truncate font-mono text-[11px]">{COMPANY.domain}</span>
        </div>
        <div className="p-2 rounded-lg bg-surface-container flex flex-col gap-0.5">
          <span className="text-text-muted text-[11px] font-mono uppercase tracking-wider">
            Hardware Cores
          </span>
          <span className="text-orbion-cyan font-mono text-[11px]">AMD SEV-SNP x64</span>
        </div>
      </div>
    </div>
  );
}