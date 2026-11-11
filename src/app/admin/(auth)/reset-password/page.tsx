"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/client";

export default function AdminResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createBrowserClient();
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setErrorMessage(error.message || "Failed to update password.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/login");
      }, 2500);
    } catch {
      setErrorMessage("Network error updating password.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-limestone-light flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-petrol p-2 shadow-sm border border-petrol-light mb-4">
          <Image
            src="/brand/PNG Images/orbion-logo-white.png"
            alt="Orbion Technologies"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-graphite">
          Set New Password
        </h2>
        <p className="mt-1 text-xs font-mono text-graphite-muted">
          Orbion Administrator Account Security
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-limestone-card py-8 px-6 shadow-sm border border-graphite-border rounded-xl sm:px-10">
          {success ? (
            <div className="text-center py-4 space-y-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/15 text-emerald-600 mb-1">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-graphite font-mono">
                Password Updated Successfully
              </h3>
              <p className="text-xs text-graphite-muted">
                Redirecting you to the administrator sign-in portal...
              </p>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/25 text-red-700 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-graphite-subtle">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="w-full pl-10 pr-4 py-2.5 bg-limestone-light/50 border border-graphite-border rounded-lg text-sm text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-graphite-subtle">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full pl-10 pr-4 py-2.5 bg-limestone-light/50 border border-graphite-border rounded-lg text-sm text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 bg-petrol hover:bg-petrol-light text-pure-white rounded-lg font-mono text-xs font-semibold tracking-wider uppercase transition-all shadow-sm disabled:opacity-50 cursor-pointer"
              >
                <span>{loading ? "Updating..." : "Commit New Password"}</span>
                <ArrowRight className="w-4 h-4 text-copper" />
              </button>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-graphite-border/70 text-center">
            <Link
              href="/admin/login"
              className="text-xs font-mono text-graphite-muted hover:text-copper transition-colors"
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

