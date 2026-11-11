import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Shield } from "lucide-react";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata = {
  title: "Admin Sign In | Orbion Technologies",
  description: "Restricted administrative access portal for Orbion Technologies.",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-limestone-light flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand Icon */}
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
          Administrative Portal
        </h2>
        <p className="mt-1 text-xs font-mono text-graphite-muted flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-copper" />
          <span>Orbion Technologies Secure Area</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-limestone-card py-8 px-6 shadow-sm border border-graphite-border rounded-xl sm:px-10">
          <Suspense fallback={<div className="text-center font-mono text-xs text-graphite-subtle">Loading login...</div>}>
            <LoginForm />
          </Suspense>

          <div className="mt-6 pt-5 border-t border-graphite-border/70 text-center">
            <p className="text-[11px] text-graphite-subtle font-mono">
              Notice: Unauthorized access attempts are monitored and recorded in immutable audit logs.
            </p>
            <div className="mt-3">
              <Link
                href="/"
                className="text-xs font-mono text-graphite-muted hover:text-copper transition-colors"
              >
                ← Return to Public Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

