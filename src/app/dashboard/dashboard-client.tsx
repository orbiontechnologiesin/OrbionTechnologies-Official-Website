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
      variant="outline"
      size="sm"
      disabled={loading}
      onClick={handleSignOut}
      className="font-sans text-xs gap-1 h-9 bg-surface-container-lowest hover:bg-error-container text-error hover:text-on-error font-medium border-transparent"
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
        variant="primary"
        size="sm"
        onClick={() => {
          setIsOpen(true);
          setError('');
          setSuccess('');
        }}
        className="font-sans text-xs gap-1.5 w-full justify-center mt-2 h-9 bg-orbion-indigo hover:bg-orbion-indigo-hover text-white font-medium"
      >
        <Edit3 className="w-3.5 h-3.5" />
        <span>Update Profile</span>
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Edit User Profile"
        >
          <div className="relative w-full max-w-md bg-surface-card border border-border rounded-xl p-6 shadow-flyout space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-orbion-indigo" />
                <h3 className="font-title-md text-title-md font-semibold text-text-primary tracking-tight">
                  Edit User Profile
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-muted hover:text-text-primary transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <div className="p-2.5 text-xs font-mono text-error bg-error-container/10 border border-error/20 rounded-lg flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 shrink-0 text-error" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-2.5 text-xs font-mono text-success bg-success-container/10 border border-success/20 rounded-lg flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 shrink-0 text-success" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-3 text-xs">
              <div>
                <label className="block text-xs text-text-secondary mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-9 bg-surface-inset border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-orbion-indigo focus:ring-0"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-text-secondary mb-1.5">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Orbion Technologies"
                  className="w-full h-9 bg-surface-inset border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-orbion-indigo focus:ring-0"
                />
              </div>

              <div>
                <label className="block text-xs text-text-secondary mb-1.5">
                  Job Title / Role
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Research Engineer"
                  className="w-full h-9 bg-surface-inset border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-orbion-indigo focus:ring-0"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  disabled={loading}
                  className="font-sans text-xs"
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