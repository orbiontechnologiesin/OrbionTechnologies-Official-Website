import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Access Restricted | Orbion Technologies Admin",
  description: "Insufficient administrative privileges.",
};

export default function AdminUnauthorizedPage() {
  return (
    <div className="min-h-screen bg-limestone-light flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-limestone-card p-8 rounded-xl border border-graphite-border shadow-sm text-center">
        <div className="w-14 h-14 rounded-full bg-red-500/10 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <h1 className="text-xl font-bold text-graphite tracking-tight">
          Access Restricted (403)
        </h1>
        <p className="text-xs text-graphite-muted mt-2 leading-relaxed">
          Your authenticated staff profile does not possess the required RBAC permissions to access this administrative resource.
        </p>

        <div className="mt-4 p-3 bg-limestone-light rounded-lg border border-graphite-border text-left">
          <p className="text-[11px] font-mono text-graphite-subtle">
            • If you require elevated access, contact a Super Administrator.
            <br />
            • Security incident attempts are captured in the system ledger.
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-petrol hover:bg-petrol-light text-pure-white rounded-lg text-xs font-mono font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Dashboard</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 border border-graphite-border text-graphite hover:bg-limestone-light rounded-lg text-xs font-mono transition-colors"
          >
            Public Site
          </Link>
        </div>
      </div>
    </div>
  );
}

