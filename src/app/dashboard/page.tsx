import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Badge, Button } from '@/components/ui';
import { LogoutButton } from './dashboard-client';
import {
  Activity,
  Cpu,
  Database,
  ShieldCheck,
  User as UserIcon,
  Clock,
  Terminal,
  ArrowRight,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Dashboard — Orbion Technologies OS',
  description: 'Enterprise console and session management for Orbion Technologies Operating System.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage() {
  const supabase = await createClient();

  let user = null;
  let session = null;
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      redirect('/auth/sign-in?callbackUrl=/dashboard');
    }
    user = userData.user;

    const { data: sessionData } = await supabase.auth.getSession();
    session = sessionData?.session;
  } catch {
    redirect('/auth/sign-in?callbackUrl=/dashboard');
  }

  if (!user) {
    redirect('/auth/sign-in?callbackUrl=/dashboard');
  }

  // Enforce email verification
  if (!user.email_confirmed_at && user.app_metadata?.provider === 'email') {
    redirect(`/auth/verify?email=${encodeURIComponent(user.email || '')}`);
  }

  // Attempt to fetch profile data from Supabase public.profiles
  let profile = null;
  try {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    profile = profileData;
  } catch {
    profile = null;
  }

  const displayName =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    'Authenticated User';

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border-hairline">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="status" indicatorColor="cyan">
                SUPABASE AUTH SESSION ACTIVE
              </Badge>
              <span className="font-mono text-[10px] text-text-muted">
                SESSION_ID: {String(session?.access_token || user.id || '').slice(0, 12)}...
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-text-pure tracking-tight">
              Enterprise Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary mt-1">
              Authenticated console for {displayName} ({user.email}).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/technology">
              <Button variant="secondary" size="sm">
                System Specs
              </Button>
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* System Telemetry Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-surface-subtle border border-border-hairline rounded-sm p-5 space-y-2">
            <div className="flex items-center justify-between text-text-muted">
              <span className="font-mono text-[11px] uppercase tracking-wider">Cloud Database</span>
              <Database className="w-4 h-4 text-brand-cyan" />
            </div>
            <div className="text-xl font-semibold text-text-pure font-mono">PostgreSQL RLS</div>
            <div className="text-[11px] text-text-secondary">
              Provider: <code className="text-text-muted font-mono">Supabase PostgreSQL</code>
            </div>
          </div>

          <div className="bg-surface-subtle border border-border-hairline rounded-sm p-5 space-y-2">
            <div className="flex items-center justify-between text-text-muted">
              <span className="font-mono text-[11px] uppercase tracking-wider">Auth Framework</span>
              <ShieldCheck className="w-4 h-4 text-brand-accent" />
            </div>
            <div className="text-xl font-semibold text-text-pure font-mono">Supabase Auth SSR</div>
            <div className="text-[11px] text-text-secondary">@supabase/ssr &amp; GoTrue</div>
          </div>

          <div className="bg-surface-subtle border border-border-hairline rounded-sm p-5 space-y-2">
            <div className="flex items-center justify-between text-text-muted">
              <span className="font-mono text-[11px] uppercase tracking-wider">Session Latency</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-semibold text-text-pure font-mono">&lt; 1 ms</div>
            <div className="text-[11px] text-text-secondary">PKCE HTTP-only secure cookie sync</div>
          </div>

          <div className="bg-surface-subtle border border-border-hairline rounded-sm p-5 space-y-2">
            <div className="flex items-center justify-between text-text-muted">
              <span className="font-mono text-[11px] uppercase tracking-wider">Autonomous Agents</span>
              <Cpu className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl font-semibold text-text-pure font-mono">Ready</div>
            <div className="text-[11px] text-text-secondary">Model Context Protocol ready</div>
          </div>
        </div>

        {/* Main Content Dossier & Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Account Dossier */}
          <div className="lg:col-span-1 bg-surface-subtle border border-border-hairline rounded-sm p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-border-hairline pb-4">
              <div className="flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-brand-accent" />
                <h2 className="text-sm font-semibold text-text-pure uppercase tracking-wider font-mono">
                  User Dossier
                </h2>
              </div>
              <Badge variant="accent" className="text-[10px]">
                AUTHENTICATED
              </Badge>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <span className="text-text-muted uppercase text-[10px] block mb-1">User Identifier (UUID)</span>
                <span className="text-text-pure bg-surface-card px-2 py-1 rounded-xs border border-border-hairline block break-all">
                  {user.id}
                </span>
              </div>

              <div>
                <span className="text-text-muted uppercase text-[10px] block mb-1">Display Name</span>
                <span className="text-text-primary block">{displayName}</span>
              </div>

              <div>
                <span className="text-text-muted uppercase text-[10px] block mb-1">Email Endpoint</span>
                <span className="text-text-primary block break-all">{user.email}</span>
              </div>

              <div>
                <span className="text-text-muted uppercase text-[10px] block mb-1">Verification Status</span>
                {user.email_confirmed_at ? (
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Verified Account
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Pending Email Verification
                  </span>
                )}
              </div>

              {session?.expires_at && (
                <div>
                  <span className="text-text-muted uppercase text-[10px] block mb-1">Session Expiration</span>
                  <div className="text-text-secondary flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-text-muted" />
                    <span>{new Date(session.expires_at * 1000).toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Operating System Shell / Status */}
          <div className="lg:col-span-2 bg-surface-subtle border border-border-hairline rounded-sm p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-border-hairline pb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-brand-cyan" />
                <h2 className="text-sm font-semibold text-text-pure uppercase tracking-wider font-mono">
                  System Architecture Status
                </h2>
              </div>
              <span className="font-mono text-[10px] text-text-muted">ORB-NODE-01</span>
            </div>

            <div className="space-y-4">
              <div className="bg-canvas border border-border-hairline rounded-xs p-4 font-mono text-xs space-y-2 text-text-secondary">
                <p className="text-brand-cyan">
                  $ orbion-os --version
                </p>
                <p className="text-text-muted">
                  &gt; Orbion Technologies Architecture v1.0.0 (Node Next.js 15 / React 19)
                </p>
                <p className="text-text-muted">
                  &gt; Backend Engine: Supabase Cloud PostgreSQL &amp; Auth SSR
                </p>
                <p className="text-emerald-400">
                  &gt; Session Status: Active session for {user.email}. Authenticated via Supabase Auth.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <Link
                  href="/technology"
                  className="group p-4 rounded-xs border border-border-hairline hover:border-brand-accent/40 bg-surface-card hover:bg-surface-elevated transition-all flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-brand-accent">CORE ARCHITECTURE</span>
                      <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-text-pure transition-colors" />
                    </div>
                    <p className="text-sm font-medium text-text-pure">AI Agent Telemetry</p>
                    <p className="text-xs text-text-muted">
                      Inspect multi-node orchestration, MCP protocol bindings, and state persistence.
                    </p>
                  </div>
                </Link>

                <Link
                  href="/company"
                  className="group p-4 rounded-xs border border-border-hairline hover:border-brand-accent/40 bg-surface-card hover:bg-surface-elevated transition-all flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-brand-cyan">ENTERPRISE DOSSIER</span>
                      <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-text-pure transition-colors" />
                    </div>
                    <p className="text-sm font-medium text-text-pure">Company &amp; Origins</p>
                    <p className="text-xs text-text-muted">
                      Review company governance, founder thesis, and architectural roadmaps.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
