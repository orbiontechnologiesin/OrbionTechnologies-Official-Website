"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setInfoMessage(data.message);
      setSubmitted(true);
    } catch {
      setInfoMessage("If an account exists, a reset link has been dispatched.");
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-4 space-y-3">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/15 text-emerald-600 mb-1">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-graphite font-mono">
          Instructions Dispatched
        </h3>
        <p className="text-xs text-graphite-muted">
          {infoMessage}
        </p>
        <div className="pt-4">
          <Link
            href="/admin/login"
            className="text-xs font-mono text-copper hover:text-copper-hover font-semibold transition-colors"
          >
            ← Return to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
          Administrator Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-graphite-subtle">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@orbiontechnologies.in"
            className="w-full pl-10 pr-4 py-2.5 bg-limestone-light/50 border border-graphite-border rounded-lg text-sm text-graphite focus:outline-none focus:ring-2 focus:ring-copper/50 focus:border-copper transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 bg-petrol hover:bg-petrol-light text-pure-white rounded-lg font-mono text-xs font-semibold tracking-wider uppercase transition-all shadow-sm disabled:opacity-50 cursor-pointer"
      >
        <span>{loading ? "Sending..." : "Request Reset Link"}</span>
        <ArrowRight className="w-4 h-4 text-copper" />
      </button>

      <div className="text-center pt-2">
        <Link
          href="/admin/login"
          className="text-xs font-mono text-graphite-muted hover:text-copper transition-colors"
        >
          Remember your password? Sign in
        </Link>
      </div>
    </form>
  );
}

