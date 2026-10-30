'use client';

import React from 'react';
import Link from 'next/link';
import { Logo, Button, Badge } from '@/components/ui';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-canvas pt-28 pb-16 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mb-6 flex flex-col items-center z-10 space-y-3">
        <Link
          href="/"
          className="inline-block hover:opacity-85 transition-opacity"
          aria-label="Orbion Technologies Home"
        >
          <Logo priority size="md" />
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10 bg-surface-card border border-border-hairline rounded-xs p-8 text-center space-y-6 shadow-subtle">
        <div className="w-12 h-12 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan mx-auto">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <Badge variant="status" indicatorColor="cyan">
            AUTHENTICATION SYSTEM
          </Badge>
          <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Account Ready
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Orbion Technologies is operating on direct email and password authentication backed by Neon PostgreSQL.
          </p>
        </div>

        <Link href="/dashboard">
          <Button variant="primary" size="md" className="w-full justify-center">
            Go to Enterprise Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
