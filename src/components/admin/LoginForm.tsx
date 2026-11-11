"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";

export function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, next }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || "Invalid credentials provided.");
        setLoading(false);
        return;
      }

      window.location.href = data.redirectUrl || "/admin/dashboard";
    } catch {
      setErrorMessage("Network error: Unable to contact authentication service.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/25 text-red-700 dark:text-red-400 text-xs font-mono flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
          Work Email
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

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted">
            Password
          </label>
          <Link
            href="/admin/forgot-password"
            className="text-xs font-mono text-copper hover:text-copper-hover transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-graphite-subtle">
            <Lock className="w-4 h-4" />
          </div>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full pl-10 pr-4 py-2.5 bg-limestone-light/50 border border-graphite-border rounded-lg text-sm text-graphite focus:outline-none focus:ring-2 focus:ring-copper/50 focus:border-copper transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 bg-petrol hover:bg-petrol-light text-pure-white rounded-lg font-mono text-xs font-semibold tracking-wider uppercase transition-all shadow-sm disabled:opacity-50 cursor-pointer"
      >
        <span>{loading ? "Authenticating..." : "Sign In to Portal"}</span>
        <ArrowRight className="w-4 h-4 text-copper" />
      </button>
    </form>
  );
}

