'use client';

import React, { useState, useTransition, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/auth/client';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { Logo, Button, Badge } from '@/components/ui';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Inbox,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const isConfigured = isSupabaseConfigured();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  // Verification Pending State
  const [isVerificationPending, setIsVerificationPending] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isConfigured) {
      setErrorMessage(
        'Supabase is not configured yet. Please define NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in your environment.'
      );
      return;
    }

    if (!fullName.trim() || !email.trim() || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters in length.');
      return;
    }

    startTransition(async () => {
      try {
        const origin = window.location.origin;
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: fullName.trim(),
            },
            emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(callbackUrl)}`,
          },
        });

        if (error) {
          setErrorMessage(error.message);
          return;
        }

        // Check if email confirmation is required (standard Supabase default)
        if (data.user && !data.session) {
          setIsVerificationPending(true);
        } else if (data.session) {
          router.push(callbackUrl);
          router.refresh();
        } else {
          setIsVerificationPending(true);
        }
      } catch (err) {
        setErrorMessage(
          err instanceof Error ? err.message : 'Registration failed. Please try again.'
        );
      }
    });
  };

  const handleOAuthSignUp = async (provider: 'google' | 'github') => {
    setErrorMessage('');

    if (!isConfigured) {
      setErrorMessage(
        `Supabase authentication is not configured yet. Please add your Supabase project credentials (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) before initiating ${provider} sign-up.`
      );
      return;
    }

    try {
      const origin = window.location.origin;
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(callbackUrl)}`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : `Failed to initiate ${provider} registration.`
      );
    }
  };

  const handleResend = async () => {
    setResendStatus('sending');
    try {
      const origin = window.location.origin;
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim(),
        options: {
          emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(callbackUrl)}`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setResendStatus('idle');
      } else {
        setResendStatus('sent');
      }
    } catch {
      setErrorMessage('Failed to re-dispatch verification email. Please try again.');
      setResendStatus('idle');
    }
  };

  if (isVerificationPending) {
    return (
      <div className="min-h-screen bg-canvas pt-28 pb-16 px-4 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10 bg-surface-card border border-border-hairline rounded-xs p-8 text-center space-y-6 animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-brand-accent/20 border border-brand-accent/40 flex items-center justify-center text-brand-cyan mx-auto">
            <Inbox className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <Badge variant="status" indicatorColor="cyan">
              VERIFICATION DISPATCHED
            </Badge>
            <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Verify Your Email
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              We have dispatched a secure confirmation link to{' '}
              <span className="text-white font-mono">{email.trim()}</span>.
            </p>
          </div>

          <div className="p-4 bg-void border border-border-hairline rounded-xs text-xs text-text-muted text-left font-mono space-y-1.5">
            <p className="text-brand-cyan">&gt; Security Requirement:</p>
            <p>Email verification is mandatory prior to OS console access.</p>
            <p>Please click the activation link in your email to authenticate.</p>
          </div>

          {resendStatus === 'sent' ? (
            <div className="p-3 text-xs font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-900/50 rounded-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>A fresh confirmation link has been sent.</span>
            </div>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              disabled={resendStatus === 'sending'}
              onClick={handleResend}
              className="gap-2 w-full justify-center"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${resendStatus === 'sending' ? 'animate-spin' : ''}`} />
              <span>Resend Verification Link</span>
            </Button>
          )}

          <div className="pt-2 border-t border-border-hairline">
            <Link
              href="/auth/sign-in"
              className="text-xs font-mono text-text-muted hover:text-white transition-colors"
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas pt-28 pb-16 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="mb-6 flex flex-col items-center z-10 space-y-3">
        <Link
          href="/"
          className="inline-block hover:opacity-85 transition-opacity"
          aria-label="Orbion Technologies Home"
        >
          <Logo priority size="md" />
        </Link>
        <div className="flex items-center gap-2">
          <Badge variant="status" indicatorColor="cyan">
            REGISTER
          </Badge>
          <span className="font-mono text-xs text-text-muted">NEW ENTERPRISE ACCOUNT</span>
        </div>
      </div>

      {/* Card Container */}
      <div className="w-full max-w-md relative z-10 bg-surface-card border border-border-hairline rounded-xs p-6 sm:p-8 shadow-subtle space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Create an Account
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Initialize your organization profile on the Orbion Technologies platform.
          </p>
        </div>

        {!isConfigured && (
          <div className="p-3.5 bg-amber-950/25 border border-amber-800/40 rounded-xs text-xs font-mono text-amber-300 space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>SUPABASE SETUP REQUIRED</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-300/90 font-sans">
              Missing <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>.
              Configure your live Supabase project credentials in <code>.env.local</code> or hosting dashboard to enable registration.
            </p>
          </div>
        )}

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleOAuthSignUp('google')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-surface-subtle hover:bg-surface-elevated border border-border-hairline rounded-xs text-xs font-mono text-text-primary hover:text-white transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 12s.7 2.3 1.9 4.7l3.7-1.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
              />
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleOAuthSignUp('github')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-surface-subtle hover:bg-surface-elevated border border-border-hairline rounded-xs text-xs font-mono text-text-primary hover:text-white transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border-hairline" />
          <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
            OR REGISTER VIA EMAIL
          </span>
          <div className="flex-1 h-px bg-border-hairline" />
        </div>

        {/* Error Feedback */}
        {errorMessage && (
          <div className="p-3 text-xs font-mono text-red-400 bg-red-950/20 border border-red-900/50 rounded-xs flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <div>{errorMessage}</div>
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-text-secondary mb-1.5" htmlFor="full-name">
              FULL NAME
            </label>
            <div className="relative">
              <input
                id="full-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Alex Mercer"
                className="w-full h-11 pl-10 pr-3.5 bg-void border border-border-hairline rounded-xs font-sans text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
              />
              <UserIcon className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs text-text-secondary mb-1.5" htmlFor="work-email">
              WORK EMAIL
            </label>
            <div className="relative">
              <input
                id="work-email"
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

          <div>
            <label className="block font-mono text-xs text-text-secondary mb-1.5" htmlFor="password">
              PASSWORD <span className="text-[11px] text-text-muted font-sans">(min. 8 characters)</span>
            </label>
            <div className="relative">
              <input
                id="password"
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
                Creating Enterprise Account...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Create Account
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>

        {/* Footer Link */}
        <div className="pt-2 text-center text-xs font-sans text-text-secondary border-t border-border-hairline">
          Already registered?{' '}
          <Link
            href={`/auth/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="text-brand-accent hover:underline font-medium"
          >
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-canvas flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SignUpContent />
    </Suspense>
  );
}
