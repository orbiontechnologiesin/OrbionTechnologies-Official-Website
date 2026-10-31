'use client';

import React, { useState, useEffect, useTransition, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, sendVerificationEmail } from '@/lib/auth/client';
import { Logo, Button, Badge } from '@/components/ui';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const queryError = searchParams.get('error');
  const queryVerified = searchParams.get('verified');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(
    queryVerified === 'true'
      ? 'Your email address has been verified. You may now sign in to your enterprise account.'
      : ''
  );
  const [isPending, startTransition] = useTransition();

  // Unverified account handling state
  const [isUnverified, setIsUnverified] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [resendNotice, setResendNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Initialize query error if present
  useEffect(() => {
    if (queryError) {
      if (queryError === 'EMAIL_NOT_VERIFIED') {
        setIsUnverified(true);
        setErrorMessage('Your email address has not been verified yet. Please verify your email to access the enterprise console.');
      } else if (queryError === 'INVALID_TOKEN') {
        setErrorMessage('The verification link was invalid or has expired. Please request a new verification link below.');
      } else {
        setErrorMessage(queryError);
      }
    }
  }, [queryError]);

  // Cooldown countdown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setInterval(() => {
        setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendCooldown]);

  const handlePasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsUnverified(false);
    setResendNotice(null);

    const targetEmail = email.trim();
    if (!targetEmail || !password) {
      setErrorMessage('Please enter both your work email address and password.');
      return;
    }

    startTransition(async () => {
      try {
        const result = await signIn.email({
          email: targetEmail,
          password,
        });

        if (result.error) {
          const errorCode = (result.error as any).code || '';
          const errorMsg = result.error.message || '';

          // Check if error is due to unverified email
          if (
            errorCode === 'EMAIL_NOT_VERIFIED' ||
            errorMsg.toLowerCase().includes('email not verified') ||
            errorMsg.toLowerCase().includes('not verified')
          ) {
            setIsUnverified(true);
            setUnverifiedEmail(targetEmail);
            setErrorMessage(
              'Your email address has not been verified yet. Please check your inbox or request a new verification link.'
            );
            return;
          }

          setErrorMessage(
            errorMsg || 'Invalid email or password. Please verify your credentials.'
          );
          return;
        }

        router.push(callbackUrl);
        router.refresh();
      } catch (err) {
        setErrorMessage(
          err instanceof Error ? err.message : 'Authentication failed. Please try again.'
        );
      }
    });
  };

  const handleResendFromSignIn = async () => {
    const target = unverifiedEmail || email.trim();
    if (!target) return;
    if (resendCooldown > 0 || isResending) return;

    setIsResending(true);
    setResendNotice(null);

    try {
      const verificationCallback =
        typeof window !== 'undefined'
          ? `${window.location.origin}/auth/verify?status=success`
          : 'https://orbiontechnologies.in/auth/verify?status=success';

      const result = await sendVerificationEmail({
        email: target,
        callbackURL: verificationCallback,
      });

      if (result?.error) {
        setResendNotice({
          type: 'error',
          message: result.error.message || 'Failed to dispatch verification email. Please try again.',
        });
      } else {
        setResendNotice({
          type: 'success',
          message: `Verification link dispatched to ${target}. Please inspect your inbox and spam folder.`,
        });
        setResendCooldown(60);
      }
    } catch {
      setResendNotice({
        type: 'error',
        message: 'Network transmission error. Please retry in a few moments.',
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas pt-28 pb-16 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />

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
          <Badge variant="status" indicatorColor="brand">
            SECURE ACCESS
          </Badge>
          <span className="font-mono text-xs text-text-muted">ORBION OS CONSOLE</span>
        </div>
      </div>

      {/* Card Container */}
      <div className="w-full max-w-md relative z-10 bg-surface-card border border-border-hairline rounded-xs p-6 sm:p-8 shadow-subtle space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Sign In to Enterprise OS
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Access intelligent autonomous agent architecture and system controls.
          </p>
        </div>

        {/* Success Feedback */}
        {successMessage && (
          <div className="p-3 text-xs font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-900/50 rounded-xs flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
            <div>{successMessage}</div>
          </div>
        )}

        {/* Unverified Account Dedicated Banner */}
        {isUnverified && (
          <div className="p-4 bg-amber-950/20 border border-amber-800/50 rounded-xs space-y-3">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <div>
                <h2 className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wide">
                  Email Verification Required
                </h2>
                <p className="text-xs text-amber-200/80 mt-1 leading-relaxed">
                  Your account requires email verification before access is granted. Please confirm your email address.
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleResendFromSignIn}
              disabled={resendCooldown > 0 || isResending}
              className="w-full justify-center h-9 text-xs border-amber-700/60 hover:bg-amber-900/20"
            >
              {isResending ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  Dispatching Email...
                </span>
              ) : resendCooldown > 0 ? (
                <span className="font-mono text-[11px] text-amber-400">
                  Resend available in {resendCooldown}s
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-amber-200">
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  Resend Verification Email
                </span>
              )}
            </Button>

            {resendNotice && (
              <div
                className={`p-2.5 text-[11px] font-mono rounded-xs flex items-start gap-1.5 ${
                  resendNotice.type === 'success'
                    ? 'text-emerald-400 bg-emerald-950/30 border border-emerald-900/40'
                    : 'text-red-400 bg-red-950/30 border border-red-900/40'
                }`}
              >
                {resendNotice.type === 'success' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                ) : (
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5 text-red-400" />
                )}
                <div>{resendNotice.message}</div>
              </div>
            )}
          </div>
        )}

        {/* General Error Feedback (when not showing unverified banner) */}
        {errorMessage && !isUnverified && (
          <div className="p-3 text-xs font-mono text-red-400 bg-red-950/20 border border-red-900/50 rounded-xs flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <div>{errorMessage}</div>
          </div>
        )}

        {/* Email & Password Form */}
        <form onSubmit={handlePasswordSignIn} className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-text-secondary mb-1.5" htmlFor="email">
              WORK EMAIL
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

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block font-mono text-xs text-text-secondary" htmlFor="password">
                PASSWORD
              </label>
              <Link
                href="/auth/forgot-password"
                className="font-mono text-[11px] text-brand-cyan hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-11 pl-10 pr-10 bg-void border border-border-hairline rounded-xs font-sans text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
              />
              <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors cursor-pointer"
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
                Verifying Credentials...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Sign In
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>

        {/* Footer Link */}
        <div className="pt-2 text-center text-xs font-sans text-text-secondary border-t border-border-hairline">
          Don&apos;t have an enterprise account?{' '}
          <Link
            href={`/auth/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="text-brand-accent hover:underline font-medium"
          >
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-canvas flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
