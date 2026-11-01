import React from 'react';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import Link from 'next/link';
import { auth } from '@/lib/auth/server';
import { prisma } from '@/lib/prisma';
import { COMPANY } from '@/data/company';
import { Badge, Button } from '@/components/ui';
import {
  ThemeShiftButton,
  LogoutButton,
  CopyButton,
  ProfileEditor,
  TelemetryConsole,
  DashboardSidebar,
  DashboardMobileNav,
} from './dashboard-client';
import {
  Activity,
  Cpu,
  Database,
  ShieldCheck,
  Clock,
  ArrowRight,
  Shield,
  Layers,
  Lock,
  Bolt,
  Code,
  Building2,
  Calendar,
  CheckCircle2,
  Settings,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Enterprise Dashboard | Orbion Technologies',
  description: 'Authenticated console and operational infrastructure overview for Orbion Technologies.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage() {
  let session = null;
  let user = null;

  try {
    const sessionData = await auth.api.getSession({
      headers: await headers(),
    });
    session = sessionData?.session;
    user = sessionData?.user;
  } catch (err) {
    console.error('[Dashboard Session Error]:', err);
    redirect('/auth/sign-in?callbackUrl=/dashboard');
  }

  if (!user || !session) {
    redirect('/auth/sign-in?callbackUrl=/dashboard');
  }

  // Fetch verified profile from Supabase PostgreSQL via Prisma
  let profile = null;
  try {
    profile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });
  } catch {
    profile = null;
  }

  const displayName =
    profile?.fullName || user.name || user.email?.split('@')[0] || 'Authenticated User';

  // Compute initials for avatar (e.g., Bhavin Shankur -> BS)
  const nameParts = displayName.trim().split(/\s+/).filter(Boolean);
  const initials =
    nameParts.length >= 2
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
      : displayName.slice(0, 2).toUpperCase();

  const formattedExpiry = session.expiresAt
    ? new Date(session.expiresAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Active Session';

  const formattedCreatedAt = (user as { createdAt?: Date | string }).createdAt
    ? new Date((user as { createdAt?: Date | string }).createdAt!).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '2026';

  return (
    <div className="min-h-screen dark:bg-canvas bg-[#FAFAFC] dark:text-text-primary text-[#17181C] pt-20 sm:pt-24 pb-20 selection:bg-brand-accent selection:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Secondary Dashboard Sidebar (Desktop 240px workbench rail) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24">
            <DashboardSidebar userEmail={user.email} displayName={displayName} />
          </aside>

          {/* Main Dashboard Workbench Content */}
          <main className="lg:col-span-9 space-y-8 min-w-0">
            {/* Mobile Horizontal Quick-Nav Navigation Pills */}
            <DashboardMobileNav />

            {/* Section 1: Operational Header Section */}
            <section
              id="overview"
              className="dark:bg-surface-subtle bg-white border dark:border-border-hairline border-[#E7E8ED] rounded-sm p-6 sm:p-8 space-y-6 shadow-subtle"
            >
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b dark:border-border-hairline border-[#E7E8ED]">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 font-sans text-xs">
                    <span className="text-text-muted">Workspace</span>
                    <span className="text-text-muted">/</span>
                    <span className="text-brand-accent font-medium">Production Enclave</span>
                    <Badge variant="status" indicatorColor="cyan" className="text-[10px]">
                      SUPABASE + BETTER AUTH ACTIVE
                    </Badge>
                  </div>

                  <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold dark:text-text-pure text-[#17181C] tracking-tight">
                    Enterprise Dashboard
                  </h1>

                  <p className="font-sans text-xs sm:text-sm dark:text-text-secondary text-[#52525B] max-w-2xl leading-relaxed">
                    Your authenticated Orbion workspace and infrastructure overview. Connected to production cluster{' '}
                    <code className="font-mono text-text-muted text-xs">aws-0-eu-west-1</code>.
                  </p>
                </div>

                {/* Header Action Controls */}
                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <ThemeShiftButton />
                  <Link href="/technology">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="h-9 px-3 gap-2 font-sans font-medium text-xs whitespace-nowrap shrink-0"
                    >
                      <Settings className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                      <span className="whitespace-nowrap">System Specs</span>
                    </Button>
                  </Link>
                  <LogoutButton />
                </div>
              </div>

              {/* Operational Subtitle Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-sans text-xs dark:text-text-secondary text-[#52525B]">
                <div>
                  <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider block">
                    Authenticated As
                  </span>
                  <span className="dark:text-text-pure text-[#17181C] font-semibold truncate block mt-0.5">
                    {displayName}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider block">
                    Account Tier
                  </span>
                  <span className="text-brand-accent font-semibold block mt-0.5">
                    Enterprise Node
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider block">
                    Session Duration
                  </span>
                  <span className="dark:text-text-pure text-[#17181C] block mt-0.5">
                    {formattedExpiry}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider block">
                    Node Status
                  </span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Nominal
                  </span>
                </div>
              </div>
            </section>

            {/* Section 2: 4-Card System Telemetry Overview Grid */}
            <section id="infrastructure" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {/* Card 1: Cloud Database */}
              <div className="dark:bg-surface-subtle bg-white border dark:border-border-hairline border-[#E7E8ED] rounded-sm p-5 flex flex-col justify-between gap-4 shadow-subtle hover:border-border-strong transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xs dark:bg-surface-card bg-[#F3F4F7] border dark:border-border-hairline border-[#E7E8ED] flex items-center justify-center text-brand-cyan shrink-0">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-sans text-[11px] font-medium text-text-muted uppercase tracking-wider block">
                        Cloud Database
                      </span>
                      <span className="font-sans text-sm font-semibold dark:text-text-pure text-[#17181C]">
                        Supabase PG
                      </span>
                    </div>
                  </div>
                  <Badge variant="status" indicatorColor="cyan" className="text-[9px]">
                    Active
                  </Badge>
                </div>

                <div className="space-y-2 pt-2 border-t dark:border-border-hairline border-[#E7E8ED] font-sans text-xs">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="text-text-muted">Connection Mode</span>
                    <span className="dark:text-text-primary text-[#17181C] font-medium font-mono text-[11px]">
                      Pooled (6543)
                    </span>
                  </div>
                  <div className="w-full dark:bg-surface-card bg-[#E7E8ED] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-brand-cyan h-full rounded-full" style={{ width: '85%' }} />
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-text-muted">
                    <span>ORM Layer</span>
                    <span className="text-brand-cyan font-medium font-mono text-[11px]">Prisma v6.19.3</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Auth Engine */}
              <div className="dark:bg-surface-subtle bg-white border dark:border-border-hairline border-[#E7E8ED] rounded-sm p-5 flex flex-col justify-between gap-4 shadow-subtle hover:border-border-strong transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xs dark:bg-surface-card bg-[#F3F4F7] border dark:border-border-hairline border-[#E7E8ED] flex items-center justify-center text-brand-accent shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-sans text-[11px] font-medium text-text-muted uppercase tracking-wider block">
                        Auth Engine
                      </span>
                      <span className="font-sans text-sm font-semibold dark:text-text-pure text-[#17181C]">
                        Better Auth
                      </span>
                    </div>
                  </div>
                  <Badge variant="status" indicatorColor="brand" className="text-[9px]">
                    v1.7.14
                  </Badge>
                </div>

                <div className="space-y-2 pt-2 border-t dark:border-border-hairline border-[#E7E8ED] font-sans text-xs">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="text-text-muted">Authentication</span>
                    <span className="dark:text-text-primary text-[#17181C] font-medium">Self-Hosted</span>
                  </div>
                  <div className="w-full dark:bg-surface-card bg-[#E7E8ED] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-brand-accent h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-text-muted">
                    <span>Password Hash</span>
                    <span className="text-brand-accent font-medium">Argon2id + CSRF</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Session Security */}
              <div className="dark:bg-surface-subtle bg-white border dark:border-border-hairline border-[#E7E8ED] rounded-sm p-5 flex flex-col justify-between gap-4 shadow-subtle hover:border-border-strong transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xs dark:bg-surface-card bg-[#F3F4F7] border dark:border-border-hairline border-[#E7E8ED] flex items-center justify-center text-emerald-400 shrink-0">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-sans text-[11px] font-medium text-text-muted uppercase tracking-wider block">
                        Session Security
                      </span>
                      <span className="font-sans text-sm font-semibold dark:text-text-pure text-[#17181C]">
                        HTTP-Only Cookies
                      </span>
                    </div>
                  </div>
                  <Badge variant="status" indicatorColor="emerald" className="text-[9px]">
                    Strict
                  </Badge>
                </div>

                <div className="space-y-2 pt-2 border-t dark:border-border-hairline border-[#E7E8ED] font-sans text-xs">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="text-text-muted">Cookie Policy</span>
                    <span className="dark:text-text-primary text-[#17181C] font-medium">SameSite Secure</span>
                  </div>
                  <div className="w-full dark:bg-surface-card bg-[#E7E8ED] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-text-muted">
                    <span>Validation</span>
                    <span className="text-emerald-400 font-medium">Server Verified</span>
                  </div>
                </div>
              </div>

              {/* Card 4: Platform Overview */}
              <div className="dark:bg-surface-subtle bg-white border dark:border-border-hairline border-[#E7E8ED] rounded-sm p-5 flex flex-col justify-between gap-4 shadow-subtle hover:border-border-strong transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xs dark:bg-surface-card bg-[#F3F4F7] border dark:border-border-hairline border-[#E7E8ED] flex items-center justify-center text-purple-400 shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-sans text-[11px] font-medium text-text-muted uppercase tracking-wider block">
                        Platform Engine
                      </span>
                      <span className="font-sans text-sm font-semibold dark:text-text-pure text-[#17181C]">
                        Orbion OS Substrate
                      </span>
                    </div>
                  </div>
                  <Badge variant="status" indicatorColor="brand" className="text-[9px]">
                    Ready
                  </Badge>
                </div>

                <div className="space-y-2 pt-2 border-t dark:border-border-hairline border-[#E7E8ED] font-sans text-xs">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="text-text-muted">Protocol</span>
                    <span className="dark:text-text-primary text-[#17181C] font-medium">Model Context (MCP)</span>
                  </div>
                  <div className="w-full dark:bg-surface-card bg-[#E7E8ED] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-purple-400 h-full rounded-full" style={{ width: '92%' }} />
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-text-muted">
                    <span>Workflow Engine</span>
                    <span className="text-purple-400 font-medium">Directed DAGs</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Main Asymmetric Two-Column Grid (Left: 5 cols / Right: 7 cols) */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              {/* LEFT COLUMN: User Dossier & Feature Modules (5 cols on xl) */}
              <div className="xl:col-span-5 space-y-6">
                {/* 3.1 User Dossier Card */}
                <div
                  id="dossier"
                  className="dark:bg-surface-subtle bg-white border dark:border-border-hairline border-[#E7E8ED] rounded-sm p-6 space-y-6 shadow-subtle"
                >
                  <div className="flex items-center justify-between border-b dark:border-border-hairline border-[#E7E8ED] pb-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-xs bg-brand-accent text-white font-sans text-base font-bold flex items-center justify-center shrink-0 shadow-accent-glow">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h2 className="font-sans text-base font-semibold dark:text-text-pure text-[#17181C] truncate">
                            {displayName}
                          </h2>
                          {user.emailVerified ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : null}
                        </div>
                        <p className="font-sans text-xs text-text-muted truncate max-w-[200px] sm:max-w-xs">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <Badge variant="status" indicatorColor="brand" className="text-[10px] shrink-0">
                      {user.emailVerified ? 'VERIFIED' : 'ACTIVE'}
                    </Badge>
                  </div>

                  {/* Metadata Spec List */}
                  <div className="dark:bg-surface-card bg-[#F3F4F7] border dark:border-border-hairline border-[#E7E8ED] rounded-xs p-4 space-y-3 font-sans text-xs">
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-text-muted text-xs">Identity Hash</span>
                      <div className="flex items-center gap-1.5">
                        <span className="dark:text-text-pure text-[#17181C] text-xs font-mono">
                          {user.id.slice(0, 14)}...
                        </span>
                        <CopyButton text={user.id} label="Copy User ID" />
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-text-muted text-xs">Organization</span>
                      <span className="dark:text-text-primary text-[#17181C] font-medium text-xs truncate max-w-[180px]">
                        {profile?.companyName || 'Orbion Technologies Network'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-text-muted text-xs">Title / Role</span>
                      <span className="text-brand-accent font-medium text-xs truncate max-w-[180px]">
                        {profile?.jobTitle || 'Enterprise Member'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-text-muted text-xs">Verification</span>
                      <span
                        className={`text-xs font-medium flex items-center gap-1.5 ${
                          user.emailVerified ? 'text-emerald-400' : 'text-text-secondary'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            user.emailVerified ? 'bg-emerald-400' : 'bg-text-muted'
                          }`}
                        />
                        {user.emailVerified ? 'Email Verified' : 'Standard Account'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-text-muted text-xs">Session Expiration</span>
                      <div className="dark:text-text-secondary text-[#52525B] flex items-center gap-1 text-xs font-medium">
                        <Clock className="w-3.5 h-3.5 text-text-muted shrink-0" />
                        <span>{formattedExpiry}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-text-muted text-xs">Account Created</span>
                      <div className="dark:text-text-secondary text-[#52525B] flex items-center gap-1 text-xs font-medium">
                        <Calendar className="w-3.5 h-3.5 text-text-muted shrink-0" />
                        <span>{formattedCreatedAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Editor Trigger */}
                  <ProfileEditor
                    initialFullName={displayName}
                    initialCompanyName={profile?.companyName}
                    initialJobTitle={profile?.jobTitle}
                  />
                </div>

                {/* 3.2 AI Agent Telemetry Feature Card */}
                <div className="dark:bg-surface-subtle bg-white border dark:border-border-hairline border-[#E7E8ED] rounded-sm p-6 space-y-4 shadow-subtle hover:border-brand-accent/40 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-brand-cyan shrink-0" />
                      <h2 className="text-sm font-semibold dark:text-text-pure text-[#17181C] font-sans">
                        AI Agent Telemetry
                      </h2>
                    </div>
                    <span className="font-sans text-[10px] font-medium text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-xs border border-brand-accent/20">
                      MCP PROTOCOL
                    </span>
                  </div>

                  <p className="font-sans text-xs dark:text-text-secondary text-[#52525B] leading-relaxed">
                    Goal-directed execution loops decompose business objectives into deterministic sub-tasks,
                    interfacing enterprise data via Anthropic&apos;s open Model Context Protocol (MCP).
                  </p>

                  <div className="dark:bg-surface-card bg-[#F3F4F7] border dark:border-border-hairline border-[#E7E8ED] rounded-xs p-3 flex items-center justify-between font-sans text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shrink-0" />
                      <span className="dark:text-text-primary text-[#17181C] font-medium">Swarm Execution Engine</span>
                    </div>
                    <span className="text-text-muted text-xs">DAG Checked</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <Link
                      href="/technology#agents"
                      className="font-sans text-xs font-medium text-brand-accent hover:text-brand-accent-hover inline-flex flex-row items-center gap-1.5 transition-colors whitespace-nowrap"
                    >
                      <span className="whitespace-nowrap">Inspect Agent Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </Link>
                    <span className="font-sans text-[11px] text-text-muted">RFC-01</span>
                  </div>
                </div>

                {/* 3.3 Company & Origins Blueprint Card */}
                <div className="dark:bg-surface-subtle bg-white border dark:border-border-hairline border-[#E7E8ED] rounded-sm p-6 space-y-4 shadow-subtle hover:border-border-strong transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-text-muted shrink-0" />
                      <h2 className="text-sm font-semibold dark:text-text-pure text-[#17181C] font-sans">
                        Company &amp; Origins
                      </h2>
                    </div>
                    <span className="font-sans text-[10px] font-medium text-text-muted">SPEC-2026</span>
                  </div>

                  <p className="font-sans text-xs dark:text-text-secondary text-[#52525B] leading-relaxed">
                    {COMPANY.visionSummary}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-1 font-sans text-xs">
                    <div className="dark:bg-surface-card bg-[#F3F4F7] border dark:border-border-hairline border-[#E7E8ED] p-3 rounded-xs space-y-1">
                      <span className="text-text-muted text-[11px] font-medium uppercase tracking-wider block">
                        Registered Domain
                      </span>
                      <span className="dark:text-text-primary text-[#17181C] text-xs font-medium truncate block">
                        orbiontechnologies.in
                      </span>
                    </div>
                    <div className="dark:bg-surface-card bg-[#F3F4F7] border dark:border-border-hairline border-[#E7E8ED] p-3 rounded-xs space-y-1">
                      <span className="text-text-muted text-[11px] font-medium uppercase tracking-wider block">
                        Founding Base
                      </span>
                      <span className="dark:text-text-primary text-[#17181C] text-xs font-medium truncate block">
                        Solapur, India
                      </span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <Link
                      href="/company"
                      className="font-sans text-xs font-medium text-brand-accent hover:text-brand-accent-hover inline-flex flex-row items-center gap-1.5 transition-colors whitespace-nowrap"
                    >
                      <span className="whitespace-nowrap">Read Company Thesis &amp; Roadmap</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Architecture Matrix & Diagnostic Telemetry (7 cols on xl) */}
              <div className="xl:col-span-7 space-y-6">
                {/* 3.4 System Architecture Matrix */}
                <div
                  id="matrix"
                  className="dark:bg-surface-subtle bg-white border dark:border-border-hairline border-[#E7E8ED] rounded-sm p-6 space-y-6 shadow-subtle"
                >
                  <div className="flex items-center justify-between border-b dark:border-border-hairline border-[#E7E8ED] pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
                        <h2 className="text-sm font-semibold dark:text-text-pure text-[#17181C] font-sans">
                          System Architecture Matrix
                        </h2>
                      </div>
                      <p className="font-sans text-xs dark:text-text-secondary text-[#52525B] mt-1">
                        Verified production runtime and core stack components
                      </p>
                    </div>

                    <span className="font-sans text-[11px] font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-xs border border-emerald-400/30 flex items-center gap-1.5 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      All Operational
                    </span>
                  </div>

                  {/* 2x2 Grid of Verified Technologies */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Component 1: Next.js */}
                    <div className="dark:bg-surface-card bg-[#F3F4F7] border dark:border-border-hairline border-[#E7E8ED] rounded-xs p-4 flex items-center justify-between hover:border-border-strong transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xs dark:bg-surface-subtle bg-white border dark:border-border-hairline border-[#E7E8ED] flex items-center justify-center text-brand-accent shrink-0">
                          <Bolt className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-sans text-xs font-semibold dark:text-text-pure text-[#17181C]">
                            Next.js 15.5
                          </div>
                          <div className="font-sans text-[11px] text-text-muted">
                            Turbopack SSR / RSC
                          </div>
                        </div>
                      </div>
                      <span className="font-sans text-xs font-medium text-emerald-400">Operational</span>
                    </div>

                    {/* Component 2: React 19 Core */}
                    <div className="dark:bg-surface-card bg-[#F3F4F7] border dark:border-border-hairline border-[#E7E8ED] rounded-xs p-4 flex items-center justify-between hover:border-border-strong transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xs dark:bg-surface-subtle bg-white border dark:border-border-hairline border-[#E7E8ED] flex items-center justify-center text-brand-accent shrink-0">
                          <Code className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-sans text-xs font-semibold dark:text-text-pure text-[#17181C]">
                            React 19 Core
                          </div>
                          <div className="font-sans text-[11px] text-text-muted">
                            Concurrent Hydration
                          </div>
                        </div>
                      </div>
                      <span className="font-sans text-xs font-medium text-emerald-400">Operational</span>
                    </div>

                    {/* Component 3: Supabase PostgreSQL */}
                    <div className="dark:bg-surface-card bg-[#F3F4F7] border dark:border-border-hairline border-[#E7E8ED] rounded-xs p-4 flex items-center justify-between hover:border-border-strong transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xs dark:bg-surface-subtle bg-white border dark:border-border-hairline border-[#E7E8ED] flex items-center justify-center text-brand-cyan shrink-0">
                          <Database className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-sans text-xs font-semibold dark:text-text-pure text-[#17181C]">
                            PostgreSQL Engine
                          </div>
                          <div className="font-sans text-[11px] text-text-muted">
                            Supabase High Availability
                          </div>
                        </div>
                      </div>
                      <span className="font-sans text-xs font-medium text-emerald-400">Operational</span>
                    </div>

                    {/* Component 4: Better Auth Service */}
                    <div className="dark:bg-surface-card bg-[#F3F4F7] border dark:border-border-hairline border-[#E7E8ED] rounded-xs p-4 flex items-center justify-between hover:border-border-strong transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xs dark:bg-surface-subtle bg-white border dark:border-border-hairline border-[#E7E8ED] flex items-center justify-center text-purple-400 shrink-0">
                          <Shield className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-sans text-xs font-semibold dark:text-text-pure text-[#17181C]">
                            Better Auth Service
                          </div>
                          <div className="font-sans text-[11px] text-text-muted">
                            Server Session Engine
                          </div>
                        </div>
                      </div>
                      <span className="font-sans text-xs font-medium text-emerald-400">Operational</span>
                    </div>
                  </div>
                </div>

                {/* 3.5 Diagnostic Telemetry Console (Truthful Empty State) */}
                <div id="telemetry">
                  <TelemetryConsole />
                </div>
              </div>
            </div>

            {/* Section 4: Compact Dashboard Footer */}
            <footer className="pt-8 border-t dark:border-border-hairline border-[#E7E8ED] flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-text-muted">
              <div className="flex items-center gap-2">
                <span>© {new Date().getFullYear()} {COMPANY.legalName}</span>
                <span>•</span>
                <span>Solapur, India</span>
              </div>
              <div className="flex items-center gap-3">
                <span>Domain: {COMPANY.domain}</span>
                <span>•</span>
                <span className="text-brand-accent font-medium">Next.js 15 + Prisma</span>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
