'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { sendVerificationEmail, verifyEmail } from '@/lib/auth/client';
import { Logo, Button, Badge } from '@/components/ui';
import {
  ShieldCheck,
  ShieldAlert,
  Mail,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';

function VerifyContent() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get('status');
  const errorParam = searchParams.get('error');
  const tokenParam = searchParams.get('token');
  const emailParam = searchParams.get('email') || '';

  const [verificationState, setVerificationState] = useState<
    'loading' | 'success' | 'expired' | 'pending'
  >(() => {
    if (statusParam === 'success') return 'success';
    if (errorParam) return 'expired';
    if (tokenParam) return 'loading';
    return 'pending';
  });

  const [resendEmail, setResendEmail] = useState(emailParam);
  const [cooldown, setCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [resendNotice, setResendNotice] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // If a raw token was provided in the query string without routing through /api/auth/verify-email
  useEffect(() => {
    if (tokenParam && !statusParam && !errorParam) {
      let isMounted = true;
      (async () => {
        try {
          const res = await verifyEmail({
            query: { token: tokenParam },
          });

          if (!isMounted) return;

          if (res?.error) {
            setVerificationState('expired');
          } else {
            setVerificationState('success');
          }
        } catch {
          if (isMounted) setVerificationState('expired');
        }
      })();

      return () => {
        isMounted = false;
      };
    }
  }, [tokenParam, statusParam, errorParam]);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resendEmail.trim() || cooldown > 0 || isResending) return;

    setIsResending(true);
    setResendNotice(null);

    try {
      const callbackURL =
        typeof window !== 'undefined'
          ? `${window.location.origin}/auth/verify?status=success`
          : 'https://orbiontechnologies.in/auth/verify?status=success';

      const result = await sendVerificationEmail({
        email: resendEmail.trim(),
        callbackURL,
      });

      if (result?.error) {
        setResendNotice({
          type: 'error',
          message: result.error.message || 'Unable to dispatch verification email. Please check the address.',
        });
      } else {
        setResendNotice({
          type: 'success',
          message: `A fresh verification link has been sent to ${resendEmail.trim()}.`,
        });
        setCooldown(60);
      }
    } catch {
      setResendNotice({
        type: 'error',
        message: 'Network communication error. Please try again.',
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas pt-28 pb-16 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Radial Glow */}
      <div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full blur-3xl pointer-events-none ${
          verificationState === 'success'
            ? 'bg-brand-cyan/15'
            : verificationState === 'expired'
            ? 'bg-red-500/10'
            : 'bg-brand-accent/10'
        }`}
      />

      {/* Brand Header */}
      <div className="mb-6 flex flex-col items-center z-10 space-y-3">
        <Link
          href="/"
          className="inline-block hover:opacity-85 transition-opacity"
          aria-label="Orbion Technologies Home"
        >
          <Logo priority size="md" />
        </Link>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10 bg-surface-card border border-border-hairline rounded-xs p-6 sm:p-8 text-center space-y-6 shadow-subtle">
        {/* ----------------- STATE: LOADING ----------------- */}
        {verificationState === 'loading' && (
          <div className="space-y-4 py-8">
            <div className="w-12 h-12 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin mx-auto" />
            <h1 className="text-lg font-semibold text-white">Validating Security Token...</h1>
            <p className="text-xs text-text-secondary font-mono">
              Synchronizing enterprise authentication status with database.
            </p>
          </div>
        )}

        {/* ----------------- STATE: SUCCESS ----------------- */}
        {verificationState === 'success' && (
          <>
            <div className="w-14 h-14 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <Badge variant="status" indicatorColor="cyan">
                STATUS: VERIFIED
              </Badge>
              <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Account Verified Successfully
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Your organizational email has been confirmed. Your enterprise workspace is fully active and authenticated.
              </p>
            </div>

            <div className="pt-2 space-y-3">
              <Link href="/auth/sign-in?verified=true" className="block">
                <Button variant="primary" size="md" className="w-full justify-center h-11">
                  <span className="flex items-center gap-2">
                    Sign In to Enterprise OS
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
              </Link>
              <Link href="/dashboard" className="block">
                <Button variant="outline" size="md" className="w-full justify-center h-11">
                  Continue to Console
                </Button>
              </Link>
            </div>
          </>
        )}

        {/* ----------------- STATE: EXPIRED OR INVALID ----------------- */}
        {verificationState === 'expired' && (
          <>
            <div className="w-14 h-14 rounded-full bg-red-950/40 border border-red-800/60 flex items-center justify-center text-red-400 mx-auto">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <Badge variant="status" indicatorColor="brand">
                TOKEN EXPIRED OR INVALID
              </Badge>
              <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Verification Link Expired
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Security tokens expire after 1 hour or can only be used once. Please enter your email address to request a new verification link.
              </p>
            </div>

            {/* Resend Form */}
            <form onSubmit={handleResend} className="space-y-3 text-left">
              <div>
                <label
                  htmlFor="verify-email-input"
                  className="block font-mono text-xs text-text-secondary mb-1.5"
                >
                  WORK EMAIL
                </label>
                <div className="relative">
                  <input
                    id="verify-email-input"
                    type="email"
                    required
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    placeholder="name@enterprise.com"
                    className="w-full h-11 pl-10 pr-3.5 bg-void border border-border-hairline rounded-xs font-sans text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                  />
                  <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {resendNotice && (
                <div
                  className={`p-2.5 text-xs font-mono rounded-xs flex items-start gap-2 ${
                    resendNotice.type === 'success'
                      ? 'text-emerald-400 bg-emerald-950/20 border border-emerald-900/50'
                      : 'text-red-400 bg-red-950/20 border border-red-900/50'
                  }`}
                >
                  {resendNotice.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                  )}
                  <div>{resendNotice.message}</div>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={cooldown > 0 || isResending}
                className="w-full justify-center h-11"
              >
                {isResending ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Dispatching Link...
                  </span>
                ) : cooldown > 0 ? (
                  <span className="font-mono text-xs">
                    Resend available in {cooldown}s
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Request New Verification Link
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>

            <div className="pt-2 text-center text-xs font-sans text-text-secondary border-t border-border-hairline">
              <Link href="/auth/sign-in" className="text-brand-cyan hover:underline font-medium">
                Return to Sign In
              </Link>
            </div>
          </>
        )}

        {/* ----------------- STATE: PENDING INSTRUCTIONS ----------------- */}
        {verificationState === 'pending' && (
          <>
            <div className="w-14 h-14 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan mx-auto">
              <Mail className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <Badge variant="status" indicatorColor="cyan">
                EMAIL VERIFICATION
              </Badge>
              <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Check Your Inbox
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                An encrypted verification link was sent to your email address. Please click the link to activate your account.
              </p>
            </div>

            <div className="p-3 bg-void/50 border border-border-hairline rounded-xs text-xs text-text-secondary leading-relaxed text-left">
              <p>
                Be sure to inspect your <span className="text-white font-medium">spam or junk folder</span> if the message does not appear in your primary inbox.
              </p>
            </div>

            {/* Quick Resend */}
            <form onSubmit={handleResend} className="space-y-3 text-left">
              <div>
                <label
                  htmlFor="pending-email-input"
                  className="block font-mono text-xs text-text-secondary mb-1.5"
                >
                  DIDN&apos;T RECEIVE AN EMAIL?
                </label>
                <div className="relative">
                  <input
                    id="pending-email-input"
                    type="email"
                    required
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    placeholder="name@enterprise.com"
                    className="w-full h-11 pl-10 pr-3.5 bg-void border border-border-hairline rounded-xs font-sans text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                  />
                  <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {resendNotice && (
                <div
                  className={`p-2.5 text-xs font-mono rounded-xs flex items-start gap-2 ${
                    resendNotice.type === 'success'
                      ? 'text-emerald-400 bg-emerald-950/20 border border-emerald-900/50'
                      : 'text-red-400 bg-red-950/20 border border-red-900/50'
                  }`}
                >
                  {resendNotice.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                  )}
                  <div>{resendNotice.message}</div>
                </div>
              )}

              <Button
                type="submit"
                variant="outline"
                size="md"
                disabled={cooldown > 0 || isResending}
                className="w-full justify-center h-11"
              >
                {isResending ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-brand-cyan" />
                    Dispatching Link...
                  </span>
                ) : cooldown > 0 ? (
                  <span className="font-mono text-xs text-text-muted">
                    Resend available in {cooldown}s
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-white">
                    <RefreshCw className="w-4 h-4 text-brand-cyan" />
                    Resend Verification Link
                  </span>
                )}
              </Button>
            </form>

            <div className="pt-2 text-center text-xs font-sans text-text-secondary border-t border-border-hairline">
              <Link href="/auth/sign-in" className="text-brand-cyan hover:underline font-medium">
                Return to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-canvas flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
