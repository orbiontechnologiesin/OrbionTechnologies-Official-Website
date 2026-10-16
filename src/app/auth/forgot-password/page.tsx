'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/auth/client';
import { Logo, Button, Badge } from '@/components/ui';
import { Mail, ArrowRight, ShieldAlert, CheckCircle2, KeyRound } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your registered work email address.');
      return;
    }

    startTransition(async () => {
      try {
        const origin = window.location.origin;
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${origin}/auth/callback?next=/auth/reset-password`,
        });

        if (error) {
          setErrorMessage(error.message);
          return;
        }

        setIsSuccess(true);
      } catch (err) {
        setErrorMessage(
          err instanceof Error ? err.message : 'Failed to request password reset. Please try again.'
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-canvas pt-28 pb-16 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />

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
            <Badge variant="status" indicatorColor="brand">
              PASSWORD RECOVERY
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Reset Password
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Enter your work email address and we&apos;ll dispatch a secure recovery link.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 text-xs font-mono text-red-400 bg-red-950/20 border border-red-900/50 rounded-xs flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <div>{errorMessage}</div>
          </div>
        )}

        {isSuccess ? (
          <div className="p-6 bg-void border border-border-hairline rounded-xs text-center space-y-4">
            <div className="w-10 h-10 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-sans text-sm font-semibold text-white">Reset Link Dispatched</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                If an account exists for <span className="text-white font-mono">{email}</span>, you will receive password reset instructions shortly.
              </p>
            </div>
            <Link href="/auth/sign-in">
              <Button variant="secondary" size="sm" className="w-full justify-center mt-2">
                Return to Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleResetRequest} className="space-y-4">
            <div>
              <label className="block font-mono text-xs text-text-secondary mb-1.5" htmlFor="email">
                REGISTERED WORK EMAIL
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@enterprise.com"
                  className="w-full h-11 pl-10 pr-3.5 bg-void border border-border-hairline rounded-xs font-sans text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                />
                <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                  Dispatching Link...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Send Recovery Link
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>
        )}

        <div className="pt-2 text-center text-xs font-mono text-text-muted border-t border-border-hairline">
          Remember your credentials?{' '}
          <Link href="/auth/sign-in" className="text-brand-accent hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
