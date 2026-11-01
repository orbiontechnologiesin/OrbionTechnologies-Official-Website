'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth/client';
import { Button } from '@/components/ui';
import { LogOut, Loader2, Edit3, X, CheckCircle2, ShieldAlert } from 'lucide-react';

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
      className="gap-2 text-xs font-mono"
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <LogOut className="w-3.5 h-3.5 text-text-muted" />
      )}
      <span>Sign Out</span>
    </Button>
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
      }, 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error updating profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => {
          setIsOpen(true);
          setError('');
          setSuccess('');
        }}
        className="gap-1.5 text-xs font-mono w-full justify-center mt-4 border-border-hairline hover:border-brand-accent/40"
      >
        <Edit3 className="w-3.5 h-3.5 text-brand-accent" />
        <span>Update Profile</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-canvas/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-surface-card border border-border-hairline rounded-sm p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-border-hairline pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-brand-accent" />
                <h3 className="text-sm font-semibold text-text-pure uppercase tracking-wider font-mono">
                  Edit User Profile
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-muted hover:text-text-pure transition-colors"
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
                <label className="block text-text-secondary uppercase text-[10px] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-surface-subtle border border-border-hairline rounded-xs px-3 py-2 text-text-pure focus:outline-none focus:border-brand-accent/60"
                  required
                />
              </div>

              <div>
                <label className="block text-text-secondary uppercase text-[10px] mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Orbion Technologies"
                  className="w-full bg-surface-subtle border border-border-hairline rounded-xs px-3 py-2 text-text-pure focus:outline-none focus:border-brand-accent/60"
                />
              </div>

              <div>
                <label className="block text-text-secondary uppercase text-[10px] mb-1">
                  Job Title / Role
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Research Engineer"
                  className="w-full bg-surface-subtle border border-border-hairline rounded-xs px-3 py-2 text-text-pure focus:outline-none focus:border-brand-accent/60"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border-hairline">
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
