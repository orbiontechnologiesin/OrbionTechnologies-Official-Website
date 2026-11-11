import React from "react";
import Image from "next/image";
import Link from "next/link";
import { KeyRound } from "lucide-react";
import { ForgotPasswordForm } from "@/components/admin/ForgotPasswordForm";

export const metadata = {
  title: "Password Recovery | Orbion Technologies Admin",
  description: "Secure password reset request for Orbion administrative personnel.",
};

export default function AdminForgotPasswordPage() {
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
          Password Recovery
        </h2>
        <p className="mt-1 text-xs font-mono text-graphite-muted flex items-center justify-center gap-1.5">
          <KeyRound className="w-3.5 h-3.5 text-copper" />
          <span>Security Protocol Verification</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-limestone-card py-8 px-6 shadow-sm border border-graphite-border rounded-xl sm:px-10">
          <ForgotPasswordForm />

          <div className="mt-6 pt-5 border-t border-graphite-border/70 text-center">
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
  );
}

