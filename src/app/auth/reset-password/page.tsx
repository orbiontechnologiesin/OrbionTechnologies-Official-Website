'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/auth/client';
import { Logo, Button, Badge } from '@/components/ui';
import { Lock, Eye, EyeOff, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    startTransition(async () => {
      try {
        const { error } = await supabase.auth.updateUser({
          password,
        });

        if (error) {
          setErrorMessage(error.message);
          return;
        }

        setIsSuccess(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } catch (err) {
        setErrorMessage(
          err instanceof Error ? err.message : 'Failed to update password. Please try again.'
        );
      }
    });
  };

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

      <div className="w-full max-w-md relative z-10 bg-surface-card border border-border-hairline rounded-xs p-6 sm:p-8 shadow-subtle space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="status" indicatorColor="cyan">
              CREDENTIAL UPDATE
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Create New Password
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Choose a new strong password for your Orbion Technologies account.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 text-xs font-mono text-red-400 bg-red-950/20 border border-red-900/50 rounded-xs flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <div>{errorMessage}</div>
          </div>
        )}

        {isSuccess ? (
          <div className="p-6 bg-void border border-border-hairline rounded-xs text-center space-y-3 animate-fade-in">
            <div className="w-10 h-10 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-sans text-sm font-semibold text-white">Password Updated</h3>
            <p className="text-xs text-text-secondary">
              Redirecting to your enterprise dashboard...
            </p>
          </div>
        ) : (
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label className="block font-mono text-xs text-text-secondary mb-1.5" htmlFor="new-password">
                NEW PASSWORD <span className="text-[11px] text-text-muted font-sans">(min. 8 chars)</span>
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 pl-10 pr-10 bg-void border border-border-hairline rounded-xs font-sans text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                />
                <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-text-secondary mb-1.5" htmlFor="confirm-password">
                CONFIRM NEW PASSWORD
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 pl-10 pr-10 bg-void border border-border-hairline rounded-xs font-sans text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                />
                <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isPending}
              className="w-full justify-center h-11 mt-2"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Updating Password...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Update Password
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
