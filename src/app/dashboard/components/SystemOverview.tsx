import React from 'react';
import {
  Database,
  ShieldCheck,
  Activity,
  Lock,
} from 'lucide-react';
import { SystemOverviewCard } from './SystemOverviewCard';

export function SystemOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      <SystemOverviewCard
        title="Cloud Database"
        value="Supabase PG"
        icon={<Database className="w-5 h-5" />}
        status="active"
        subtitle="Database Provider"
        metrics={[
          { label: 'Active Pool', value: '64 / 128 conns', valueColor: 'primary' },
        ]}
        progress={{
          label: 'Latency p99',
          value: '1.2ms',
          percent: 50,
          color: 'secondary',
        }}
      />
      <SystemOverviewCard
        title="Auth Engine"
        value="Better Auth v1.1.8"
        icon={<ShieldCheck className="w-5 h-5" />}
        subtitle="Authentication"
        metrics={[
          { label: 'Protocol Guard', value: 'PKCE Strict', valueColor: 'muted' },
          { label: 'MFA Policy', value: 'Hardware Bound', valueColor: 'primary' },
          { label: 'Threat Score', value: '0 Anomalies', valueColor: 'secondary' },
        ]}
      />
      <SystemOverviewCard
        title="Session Security"
        value="HTTP-Only"
        icon={<Lock className="w-5 h-5" />}
        subtitle="Session Security"
        metrics={[
          { label: 'Attestation', value: '100% Cryptographic', valueColor: 'primary' },
          { label: 'Session Lease', value: '15m Auto-Rotate', valueColor: 'muted' },
        ]}
        progress={{
          label: 'Security',
          value: 'Verified',
          percent: 100,
          color: 'primary',
        }}
      />
      <SystemOverviewCard
        title="Platform"
        value="Orbion OS"
        icon={<Activity className="w-5 h-5" />}
        status="active"
        subtitle="Platform Status"
        metrics={[
          { label: 'Throughput', value: '142 tasks/hr', valueColor: 'primary' },
          { label: 'Error Margin', value: '0.00% Nominal', valueColor: 'secondary' },
        ]}
        progress={{
          label: 'MCP v2.4',
          value: '',
          percent: 86,
          color: 'secondary',
        }}
      />
    </div>
  );
}