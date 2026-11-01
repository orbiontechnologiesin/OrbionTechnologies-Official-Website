'use client';

import React, { useState } from 'react';
import { Terminal, Copy } from 'lucide-react';

const LOGS = [
  { time: '10:42:19.004', tag: '[SYS]', tagColor: 'text-text-muted', message: 'Bootstrap payload loaded into AMD SEV hardware isolated enclave.', msgColor: 'text-text-primary' },
  { time: '10:42:19.120', tag: '[AUTH]', tagColor: 'text-orbion-indigo', message: 'Better Auth PKCE handshake verified.', msgColor: 'text-text-primary' },
  { time: '10:42:19.452', tag: '[MCP]', tagColor: 'text-orbion-cyan', message: 'Agent swarm synchronization complete. 6 worker nodes ready.', msgColor: 'text-text-primary' },
  { time: '10:42:20.012', tag: '[DB]', tagColor: 'text-text-secondary', message: 'Supabase pool connection heartbeat verified in 1.18ms. Pool size: 64.', msgColor: 'text-text-primary' },
  { time: '10:42:21.890', tag: '[SEC]', tagColor: 'text-orbion-indigo', message: 'Attestation hash checked against enclave authority. 100% match.', msgColor: 'text-text-primary' },
  { time: '10:42:23.104', tag: '[MCP]', tagColor: 'text-orbion-cyan', message: 'Telemetry heartbeat ACK received from us-east-1 worker node.', msgColor: 'text-text-primary', animate: true },
];

export function TelemetryPanel() {
  const [activeTab, setActiveTab] = useState('runtime');

  const tabs = [
    { id: 'runtime', label: 'Runtime Logs' },
    { id: 'mcp', label: 'MCP Handshakes' },
    { id: 'security', label: 'Security Audits' },
  ];

  return (
    <div className="rounded-xl border border-border bg-surface-card p-5 flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-4 h-4 text-orbion-indigo" />
          <h2 className="font-title-md text-title-md font-semibold text-text-primary">
            Diagnostic Telemetry Console
          </h2>
        </div>
        <div className="flex items-center bg-surface-container p-0.5 rounded-lg gap-0.5 text-text-muted font-mono text-[11px]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2 py-0.5 rounded-md text-xs transition-colors ${
                activeTab === tab.id
                  ? 'bg-surface-container-high text-text-primary'
                  : 'hover:text-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#0c0e15] rounded-lg p-3 font-mono text-[11px] text-text-muted flex flex-col gap-1 overflow-x-auto min-h-[260px]">
        <div className="flex justify-between items-center text-text-muted pb-1">
          <span>CONTAINER ID: pod-orb-enclave-01a</span>
          <span>STREAM: ACTIVE</span>
        </div>
        {LOGS.map((log, i) => (
          <div
            key={i}
            className={`flex items-start gap-1.5 ${log.animate ? 'animate-pulse' : ''}`}
          >
            <span className="text-text-muted">{log.time}</span>
            <span className={`font-medium ${log.tagColor}`}>{log.tag}</span>
            <span className={`${log.msgColor}`}>{log.message}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
        <div className="flex items-center gap-1">
          <button className="h-8 px-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-text-primary font-mono text-[11px] flex items-center gap-1 transition-colors">
            <Copy className="w-3 h-3" />
            <span>Diagnostic Report</span>
          </button>
          <button className="h-8 px-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-text-primary font-mono text-[11px] flex items-center gap-1 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"></path><polyline points="16 3 16 12 20 12"></polyline></svg>
            <span>Flush Cache</span>
          </button>
        </div>
        <div className="text-xs font-mono text-text-muted">
          Telemetry backend not configured
        </div>
      </div>
    </div>
  );
}