'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LogoutButton } from '../dashboard-client';
import { Button } from '@/components/ui';

interface DashboardPageHeaderProps {
  userName: string;
  userEmail: string;
  emailVerified: boolean;
}

export function DashboardPageHeader({ userName, userEmail, emailVerified }: DashboardPageHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-5 border-b border-border">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-xs font-mono text-text-muted">
          <span>Workspace</span>
          <span className="text-border">/</span>
          <span className="text-text-primary font-medium">Production Enclave [us-east-1]</span>
          <span className="inline-flex items-center gap-1 px-1 py-0.5 rounded bg-surface-container-high text-text-secondary font-mono text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-orbion-cyan animate-pulse" />
            SOC-2 Type II
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold text-text-primary tracking-tight">
          Enterprise Dashboard
        </h1>
        <p className="text-sm text-text-secondary max-w-2xl">
          Your authenticated Orbion workspace and autonomous infrastructure management console.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1">
        <Link href="/technology">
          <Button variant="outline" size="sm">
            <ArrowRight className="w-3 h-3 mr-1" />
            System Specs
          </Button>
        </Link>
        <ThemeToggle />
        <LogoutButton />
      </div>
    </div>
  );
}