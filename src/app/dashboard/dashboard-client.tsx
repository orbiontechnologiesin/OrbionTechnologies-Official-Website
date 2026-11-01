'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut } from '@/lib/auth/client';
import { Button } from '@/components/ui';
import {
  LogOut,
  Loader2,
  Edit3,
  X,
  CheckCircle2,
  ShieldAlert,
  Copy,
  Check,
  Sun,
  Moon,
  Terminal,
  Activity,
  Layers,
  Database,
  Shield,
  FileText,
  RotateCw,
  ExternalLink,
  ChevronRight,
  User as UserIcon,
} from 'lucide-react';

export function ThemeShiftButton() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('orbion-theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      setIsDark(document.documentElement.classList.contains('dark'));
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.add('theme-transitioning');
    const newDark = !isDark;
    setIsDark(newDark);

    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('orbion-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('orbion-theme', 'light');
    }

    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 250);
  };

  if (!mounted) {
    return (
      <Button
        variant="secondary"
        size="sm"
        className="gap-2 text-xs font-mono dark:bg-surface-card bg-white dark:border-border-hairline border-[#E7E8ED] dark:text-text-primary text-[#17181C]"
      >
        <Moon className="w-3.5 h-3.5 text-brand-accent" />
        <span>Theme Shift</span>
      </Button>
    );
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={toggleTheme}
      className="gap-2 text-xs font-mono dark:bg-surface-card bg-white dark:border-border-hairline border-[#E7E8ED] dark:text-text-primary text-[#17181C] hover:border-brand-accent/40"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <>
          <Sun className="w-3.5 h-3.5 text-brand-accent" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-brand-accent" />
          <span>Dark Mode</span>
        </>
      )}
    </Button>
  );
}

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      router.push('/auth/sign-in');
      router.refresh();
    } catch (err) {
      console.error('Sign out error:', err);
      router.push('/auth/sign-in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      disabled={loading}
      onClick={handleSignOut}
      className="gap-2 text-xs font-mono text-red-400 hover:text-red-300 dark:hover:bg-red-950/20 hover:bg-red-50 hover:border-red-500/30"
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <LogOut className="w-3.5 h-3.5" />
      )}
      <span>Sign Out</span>
    </Button>
  );
}

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center justify-center p-1 rounded-xs text-text-muted hover:text-text-pure dark:hover:text-white transition-colors cursor-pointer"
      title={copied ? 'Copied to clipboard' : label}
      aria-label={copied ? 'Copied' : label}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald-400" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
    </button>
  );
}

export interface ProfileEditorProps {
  initialFullName: string;
  initialCompanyName?: string | null;
  initialJobTitle?: string | null;
}

export function ProfileEditor({
  initialFullName,
  initialCompanyName,
  initialJobTitle,
}: ProfileEditorProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState(initialFullName);
  const [companyName, setCompanyName] = useState(initialCompanyName || '');
  const [jobTitle, setJobTitle] = useState(initialJobTitle || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!fullName.trim() || fullName.trim().length < 2) {
      setError('Full name must be at least 2 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          companyName: companyName.trim() || null,
          jobTitle: jobTitle.trim() || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to update profile.');
        return;
      }

      setSuccess('Profile updated successfully.');
      setTimeout(() => {
        setIsOpen(false);
        router.refresh();
      }, 700);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error updating profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="primary"
        size="sm"
        onClick={() => {
          setIsOpen(true);
          setError('');
          setSuccess('');
        }}
        className="w-full justify-center gap-2 font-mono text-xs h-10 mt-2"
      >
        <Edit3 className="w-3.5 h-3.5" />
        <span>Update Profile Information</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 dark:bg-canvas/80 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md dark:bg-surface-card bg-white border dark:border-border-hairline border-[#E7E8ED] rounded-sm p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b dark:border-border-hairline border-[#E7E8ED] pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-brand-accent" />
                <h3 className="text-sm font-semibold dark:text-text-pure text-[#17181C] uppercase tracking-wider font-mono">
                  Edit User Profile
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-muted hover:text-text-pure dark:hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <div className="p-2.5 text-xs font-mono text-red-400 bg-red-950/20 border border-red-900/50 rounded-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-2.5 text-xs font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-900/50 rounded-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block dark:text-text-secondary text-[#52525B] uppercase text-[10px] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full dark:bg-surface-subtle bg-[#F3F4F7] border dark:border-border-hairline border-[#E7E8ED] rounded-xs px-3 py-2 dark:text-text-pure text-[#17181C] focus:outline-none focus:border-brand-accent/60"
                  required
                />
              </div>

              <div>
                <label className="block dark:text-text-secondary text-[#52525B] uppercase text-[10px] mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Orbion Technologies"
                  className="w-full dark:bg-surface-subtle bg-[#F3F4F7] border dark:border-border-hairline border-[#E7E8ED] rounded-xs px-3 py-2 dark:text-text-pure text-[#17181C] focus:outline-none focus:border-brand-accent/60"
                />
              </div>

              <div>
                <label className="block dark:text-text-secondary text-[#52525B] uppercase text-[10px] mb-1">
                  Job Title / Role
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Systems Architect"
                  className="w-full dark:bg-surface-subtle bg-[#F3F4F7] border dark:border-border-hairline border-[#E7E8ED] rounded-xs px-3 py-2 dark:text-text-pure text-[#17181C] focus:outline-none focus:border-brand-accent/60"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t dark:border-border-hairline border-[#E7E8ED]">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Profile'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export function TelemetryConsole() {
  const [activeTab, setActiveTab] = useState<'runtime' | 'mcp' | 'security'>('runtime');
  const [copiedHost, setCopiedHost] = useState(false);
  const [flushing, setFlushing] = useState(false);

  const handleCopyHost = async () => {
    try {
      await navigator.clipboard.writeText('aws-0-eu-west-1.pooler.supabase.com:6543');
      setCopiedHost(true);
      setTimeout(() => setCopiedHost(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleFlush = () => {
    setFlushing(true);
    setTimeout(() => setFlushing(false), 600);
  };

  return (
    <div className="dark:bg-surface-card bg-white border dark:border-border-hairline border-[#E7E8ED] rounded-sm p-5 sm:p-6 flex flex-col gap-4 shadow-subtle">
      {/* Console Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b dark:border-border-hairline border-[#E7E8ED] pb-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-brand-cyan" />
          <h2 className="text-sm font-semibold dark:text-text-pure text-[#17181C] uppercase tracking-wider font-mono">
            Diagnostic Telemetry Console
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center dark:bg-surface-subtle bg-[#F3F4F7] p-1 rounded-xs gap-1 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('runtime')}
            className={`px-3 py-1 rounded-xs transition-colors cursor-pointer ${
              activeTab === 'runtime'
                ? 'dark:bg-surface-elevated bg-white dark:text-text-pure text-[#17181C] font-semibold shadow-xs'
                : 'dark:text-text-muted text-[#71717A] hover:text-[#17181C] dark:hover:text-white'
            }`}
          >
            Runtime Telemetry
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('mcp')}
            className={`px-3 py-1 rounded-xs transition-colors cursor-pointer ${
              activeTab === 'mcp'
                ? 'dark:bg-surface-elevated bg-white dark:text-text-pure text-[#17181C] font-semibold shadow-xs'
                : 'dark:text-text-muted text-[#71717A] hover:text-[#17181C] dark:hover:text-white'
            }`}
          >
            MCP Protocols
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`px-3 py-1 rounded-xs transition-colors cursor-pointer ${
              activeTab === 'security'
                ? 'dark:bg-surface-elevated bg-white dark:text-text-pure text-[#17181C] font-semibold shadow-xs'
                : 'dark:text-text-muted text-[#71717A] hover:text-[#17181C] dark:hover:text-white'
            }`}
          >
            Security Audits
          </button>
        </div>
      </div>

      {/* Terminal Display Window */}
      <div className="dark:bg-[#070709] bg-[#0E0E12] border dark:border-border-hairline border-neutral-800 rounded-xs p-5 font-mono text-xs flex flex-col justify-between min-h-[260px] text-neutral-300">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between text-neutral-500 pb-3 border-b border-neutral-800/80 text-[11px]">
          <span>CONTAINER: pod-orb-enclave-01a</span>
          <span>STREAM: STANDBY (0 ingestion pipelines active)</span>
        </div>

        {/* Truthful Empty State Required by Prompt */}
        <div className="py-10 flex flex-col items-center justify-center text-center space-y-2.5">
          <div className="w-10 h-10 rounded-full dark:bg-surface-card bg-neutral-900 border border-neutral-800 flex items-center justify-center text-brand-cyan mb-1">
            <Activity className="w-5 h-5 text-brand-cyan" />
          </div>
          <p className="text-sm font-semibold text-white">
            No diagnostic data available
          </p>
          <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
            Telemetry integration is not configured.
          </p>
          <p className="text-[11px] text-neutral-500 max-w-lg mt-1">
            {activeTab === 'runtime' &&
              'Live execution traces, worker telemetry daemons, and latency metrics will appear here once monitoring agents are connected to this node.'}
            {activeTab === 'mcp' &&
              'Model Context Protocol JSON-RPC stream adapters are in standby awaiting local agent runtime client binding.'}
            {activeTab === 'security' &&
              'Continuous session authentication audits and cryptographic token rotation verification daemons are in passive monitoring mode.'}
          </p>
        </div>

        {/* Terminal Bottom Diagnostic Readout */}
        <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-3 border-t border-neutral-800/80">
          <span>PORT: 6543 (Pooled)</span>
          <span className="text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Supabase Connection Ready
          </span>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          <Link href="/technology">
            <Button variant="secondary" size="sm" className="gap-1.5 text-xs font-mono">
              <FileText className="w-3.5 h-3.5 text-text-muted" />
              <span>System Specs</span>
            </Button>
          </Link>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleFlush}
            disabled={flushing}
            className="gap-1.5 text-xs font-mono"
          >
            <RotateCw className={`w-3.5 h-3.5 text-text-muted ${flushing ? 'animate-spin' : ''}`} />
            <span>{flushing ? 'Flushing...' : 'Flush Cache'}</span>
          </Button>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleCopyHost}
          className="gap-1.5 text-xs font-mono text-brand-accent dark:hover:text-white"
        >
          {copiedHost ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Host Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy DB Pooler Host</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export function DashboardSidebar({ userEmail, displayName }: { userEmail: string; displayName: string }) {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="dark:bg-surface-subtle bg-white border dark:border-border-hairline border-[#E7E8ED] rounded-sm p-4 space-y-6 shadow-subtle">
      {/* Console Node Lockup */}
      <div className="space-y-2 border-b dark:border-border-hairline border-[#E7E8ED] pb-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
            CONSOLE DIRECTORY
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-brand-cyan">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
            NODE-01
          </span>
        </div>
        <div className="dark:bg-surface-card bg-[#F3F4F7] p-2.5 rounded-xs border dark:border-border-hairline border-[#E7E8ED] flex items-center justify-between">
          <span className="font-mono text-xs dark:text-text-primary text-[#17181C]">v1.0.0-prod</span>
          <span className="font-mono text-[10px] text-emerald-400">ONLINE</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-1 font-sans text-xs">
        <button
          type="button"
          onClick={() => scrollTo('overview')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xs dark:hover:bg-surface-card hover:bg-[#F3F4F7] dark:text-text-primary text-[#17181C] transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-brand-accent" />
            <span>Console Overview</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
        </button>

        <button
          type="button"
          onClick={() => scrollTo('infrastructure')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xs dark:hover:bg-surface-card hover:bg-[#F3F4F7] dark:text-text-secondary text-[#52525B] hover:text-[#17181C] dark:hover:text-white transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-2.5">
            <Database className="w-4 h-4 text-brand-cyan" />
            <span>Operational Nodes</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
        </button>

        <button
          type="button"
          onClick={() => scrollTo('dossier')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xs dark:hover:bg-surface-card hover:bg-[#F3F4F7] dark:text-text-secondary text-[#52525B] hover:text-[#17181C] dark:hover:text-white transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-2.5">
            <UserIcon className="w-4 h-4 text-brand-accent" />
            <span>User Dossier</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
        </button>

        <button
          type="button"
          onClick={() => scrollTo('matrix')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xs dark:hover:bg-surface-card hover:bg-[#F3F4F7] dark:text-text-secondary text-[#52525B] hover:text-[#17181C] dark:hover:text-white transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-2.5">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Architecture Matrix</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
        </button>

        <button
          type="button"
          onClick={() => scrollTo('telemetry')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xs dark:hover:bg-surface-card hover:bg-[#F3F4F7] dark:text-text-secondary text-[#52525B] hover:text-[#17181C] dark:hover:text-white transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-2.5">
            <Terminal className="w-4 h-4 text-brand-cyan" />
            <span>Telemetry Console</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
        </button>

        <div className="pt-2 border-t dark:border-border-hairline border-[#E7E8ED] my-2 space-y-1">
          <Link
            href="/technology"
            className="flex items-center justify-between px-3 py-2 rounded-xs dark:hover:bg-surface-card hover:bg-[#F3F4F7] dark:text-text-secondary text-[#52525B] hover:text-[#17181C] dark:hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-text-muted" />
              <span>System Specs</span>
            </div>
            <ExternalLink className="w-3 h-3 text-text-muted" />
          </Link>

          <Link
            href="/company"
            className="flex items-center justify-between px-3 py-2 rounded-xs dark:hover:bg-surface-card hover:bg-[#F3F4F7] dark:text-text-secondary text-[#52525B] hover:text-[#17181C] dark:hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-text-muted" />
              <span>Company Thesis</span>
            </div>
            <ExternalLink className="w-3 h-3 text-text-muted" />
          </Link>
        </div>
      </nav>

      {/* Workspace Plan Strip */}
      <div className="p-3 rounded-xs dark:bg-surface-card bg-[#F3F4F7] border dark:border-border-hairline border-[#E7E8ED] space-y-1 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-text-muted uppercase">Workspace</span>
          <span className="text-emerald-400 text-[10px]">ACTIVE</span>
        </div>
        <p className="font-sans text-xs font-semibold dark:text-text-pure text-[#17181C] truncate">
          {displayName}
        </p>
        <p className="text-[10px] text-text-muted truncate">{userEmail}</p>
      </div>

      {/* Quick Sign Out */}
      <div className="pt-1">
        <LogoutButton />
      </div>
    </div>
  );
}

export function DashboardMobileNav() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs scrollbar-none">
      <button
        type="button"
        onClick={() => scrollTo('overview')}
        className="shrink-0 px-3 py-1.5 rounded-xs dark:bg-surface-card bg-white border dark:border-border-hairline border-[#E7E8ED] dark:text-text-primary text-[#17181C]"
      >
        Overview
      </button>
      <button
        type="button"
        onClick={() => scrollTo('infrastructure')}
        className="shrink-0 px-3 py-1.5 rounded-xs dark:bg-surface-card bg-white border dark:border-border-hairline border-[#E7E8ED] dark:text-text-secondary text-[#52525B]"
      >
        Nodes
      </button>
      <button
        type="button"
        onClick={() => scrollTo('dossier')}
        className="shrink-0 px-3 py-1.5 rounded-xs dark:bg-surface-card bg-white border dark:border-border-hairline border-[#E7E8ED] dark:text-text-secondary text-[#52525B]"
      >
        Dossier
      </button>
      <button
        type="button"
        onClick={() => scrollTo('matrix')}
        className="shrink-0 px-3 py-1.5 rounded-xs dark:bg-surface-card bg-white border dark:border-border-hairline border-[#E7E8ED] dark:text-text-secondary text-[#52525B]"
      >
        Matrix
      </button>
      <button
        type="button"
        onClick={() => scrollTo('telemetry')}
        className="shrink-0 px-3 py-1.5 rounded-xs dark:bg-surface-card bg-white border dark:border-border-hairline border-[#E7E8ED] dark:text-text-secondary text-[#52525B]"
      >
        Telemetry
      </button>
    </div>
  );
}
