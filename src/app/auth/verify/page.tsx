'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/auth/client';
import { Logo, Button, Badge } from '@/components/ui';
import { Inbox, CheckCircle2, RefreshCw, ShieldAlert } from 'lucide-react';

function VerifyContent() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get('email') || '';

  const [email, setEmail] = useState(initialEmail);
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleResend = async () => {
    if (!email.trim()) {
      setErrorMessage('Please provide your registered work email address.');
      return;
    }

    setResendStatus('sending');
    setErrorMessage('');

    try {
      const origin = window.location.origin;
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim(),
        options: {
          emailRedirectTo: `${origin}/auth/callback?next=/dashboard`,
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

      <div className="w-full max-w-md relative z-10 bg-surface-card border border-border-hairline rounded-xs p-8 text-center space-y-6 shadow-subtle">
        <div className="w-12 h-12 rounded-full bg-brand-accent/20 border border-brand-accent/40 flex items-center justify-center text-brand-cyan mx-auto">
          <Inbox className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <Badge variant="status" indicatorColor="cyan">
            EMAIL VERIFICATION REQUIRED
          </Badge>
          <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Confirm Your Enterprise Email
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Orbion Technologies mandates email verification prior to accessing enterprise nodes and protected consoles.
          </p>
        </div>

        {email ? (
          <div className="p-3 bg-void border border-border-hairline rounded-xs font-mono text-xs text-text-primary">
            Target: <span className="text-white">{email}</span>
          </div>
        ) : (
          <div>
            <label className="block font-mono text-xs text-text-secondary text-left mb-1.5" htmlFor="verify-email">
              REGISTERED EMAIL
            </label>
            <input
              id="verify-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@enterprise.com"
              className="w-full h-10 px-3 bg-void border border-border-hairline rounded-xs font-sans text-xs text-white placeholder:text-text-muted focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
            />
          </div>
        )}

        {errorMessage && (
          <div className="p-3 text-xs font-mono text-red-400 bg-red-950/20 border border-red-900/50 rounded-xs flex items-start gap-2 text-left">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <div>{errorMessage}</div>
          </div>
        )}

        {resendStatus === 'sent' ? (
          <div className="p-3 text-xs font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-900/50 rounded-xs flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>A fresh verification link has been dispatched.</span>
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

        <div className="pt-2 border-t border-border-hairline flex items-center justify-between text-xs font-mono">
          <Link
            href="/auth/sign-in"
            className="text-text-muted hover:text-white transition-colors"
          >
            ← Sign In
          </Link>
          <Link
            href="/"
            className="text-text-muted hover:text-white transition-colors"
          >
            Home →
          </Link>
        </div>
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
