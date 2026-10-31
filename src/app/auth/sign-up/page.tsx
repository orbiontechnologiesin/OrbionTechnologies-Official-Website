'use client';

import React, { useState, useEffect, useTransition, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { signUp, sendVerificationEmail } from '@/lib/auth/client';
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
  RefreshCw,
} from 'lucide-react';

function SignUpContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  // Verification Pending Screen state
  const [isRegisteredPending, setIsRegisteredPending] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [cooldown, setCooldown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [resendNotice, setResendNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // 60-second cooldown timer
  useEffect(() => {
    if (isRegisteredPending && cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRegisteredPending, cooldown]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (fullName.trim().length < 2) {
      setErrorMessage('Full name must be at least 2 characters long.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid work email address.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters in length.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your confirmation password.');
      return;
    }

    startTransition(async () => {
      try {
        const targetEmail = email.trim();
        const result = await signUp.email({
          email: targetEmail,
          password,
          name: fullName.trim(),
        });

        if (result.error) {
          const msg = result.error.message || '';
          if (msg.toLowerCase().includes('already') || msg.toLowerCase().includes('exists')) {
            setErrorMessage('An account with this email address already exists. Please sign in instead.');
          } else {
            setErrorMessage(msg || 'Registration failed. Please try again.');
          }
          return;
        }

        // On successful registration with required email verification:
        // Transition to Verification Pending Screen
        setRegisteredEmail(targetEmail);
        setIsRegisteredPending(true);
        setCooldown(60);
      } catch (err) {
        setErrorMessage(
          err instanceof Error ? err.message : 'Registration failed. Please try again.'
        );
      }
    });
  };

  const handleResendVerification = async () => {
    if (cooldown > 0 || isResending) return;
    setIsResending(true);
    setResendNotice(null);

    try {
      const verificationCallback =
        typeof window !== 'undefined'
          ? `${window.location.origin}/auth/verify?status=success`
          : 'https://orbiontechnologies.in/auth/verify?status=success';

      const result = await sendVerificationEmail({
        email: registeredEmail,
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
          message: 'A new verification link has been dispatched to your inbox.',
        });
        setCooldown(60);
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

  // ----------------------------------------------------
  // Verification Pending Screen (Post-Registration)
  // ----------------------------------------------------
  if (isRegisteredPending) {
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
              VERIFICATION PENDING
            </Badge>
            <span className="font-mono text-xs text-text-muted">ENTERPRISE IDENTITY</span>
          </div>
        </div>

        {/* Card Container */}
        <div className="w-full max-w-md relative z-10 bg-surface-card border border-border-hairline rounded-xs p-6 sm:p-8 shadow-subtle space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan mx-auto mb-3">
              <Mail className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Verify Your Email
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              We dispatched an encrypted verification link to confirm your organizational identity.
            </p>
          </div>

          {/* Monospace Target Email Display */}
          <div className="bg-void border border-border-hairline rounded-xs p-3.5 text-center">
            <span className="block font-mono text-[11px] text-text-muted uppercase tracking-wider mb-1">
              Target Email Address
            </span>
            <span className="font-mono text-sm text-brand-cyan font-semibold break-all">
              {registeredEmail}
            </span>
          </div>

          {/* Advisory Notice */}
          <div className="p-3 bg-void/50 border border-border-hairline rounded-xs text-xs text-text-secondary leading-relaxed space-y-1">
            <p>
              Please inspect your email inbox. If you do not see the message within a minute, check your <span className="text-white font-medium">spam or junk folder</span>.
            </p>
            <p className="font-mono text-[11px] text-text-muted">
              Security Notice: The verification link remains valid for 1 hour.
            </p>
          </div>

          {/* Resend Status Feedback */}
          {resendNotice && (
            <div
              className={`p-3 text-xs font-mono rounded-xs flex items-start gap-2 ${
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

          {/* Resend Action with 60s Cooldown */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleResendVerification}
              disabled={cooldown > 0 || isResending}
              className="w-full justify-center h-11"
            >
              {isResending ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-brand-cyan" />
                  Dispatching Email...
                </span>
              ) : cooldown > 0 ? (
                <span className="font-mono text-xs text-text-muted">
                  Resend available in {cooldown}s
                </span>
              ) : (
                <span className="flex items-center gap-2 text-white">
                  <RefreshCw className="w-4 h-4 text-brand-cyan" />
                  Resend Verification Email
                </span>
              )}
            </Button>

            <Link
              href={`/auth/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`}
              className="block"
            >
              <Button variant="primary" size="md" className="w-full justify-center h-11">
                <span className="flex items-center gap-2">
                  Return to Sign In
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </Link>
          </div>

          {/* Reset Action */}
          <div className="pt-2 text-center text-xs font-sans text-text-secondary border-t border-border-hairline">
            Entered the wrong email?{' '}
            <button
              type="button"
              onClick={() => {
                setIsRegisteredPending(false);
                setErrorMessage('');
                setResendNotice(null);
              }}
              className="text-brand-cyan hover:underline font-medium cursor-pointer"
            >
              Register with another address
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // Initial Registration Form
  // ----------------------------------------------------
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

        {/* Feedback Messages */}
        {errorMessage && (
          <div className="p-3 text-xs font-mono text-red-400 bg-red-950/20 border border-red-900/50 rounded-xs flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <div>{errorMessage}</div>
          </div>
        )}

        {/* Registration Form */}
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
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Dr. Jane Doe"
                className="w-full h-11 pl-10 pr-3.5 bg-void border border-border-hairline rounded-xs font-sans text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
              />
              <UserIcon className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

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
            <label className="block font-mono text-xs text-text-secondary mb-1.5" htmlFor="password">
              PASSWORD (MIN. 8 CHARACTERS)
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
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
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs text-text-secondary mb-1.5" htmlFor="confirm-password">
              CONFIRM PASSWORD
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-11 pl-10 pr-3.5 bg-void border border-border-hairline rounded-xs font-sans text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
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
                Registering Account...
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
            className="text-brand-cyan hover:underline font-medium"
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
