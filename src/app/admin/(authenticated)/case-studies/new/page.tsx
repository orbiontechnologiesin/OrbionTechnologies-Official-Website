import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { CaseStudyForm } from "@/components/admin/CaseStudyForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "New Case Study | Orbion Admin",
};

export default async function NewCaseStudyPage() {
  const session = await requireAdminSession("cms:create", "/admin/case-studies/new");

  return (
    <>
      <AdminHeader
        title="Author Commercial Case Study"
        description="Draft verified project engineering deliveries and architectural milestones."
        role={session.profile.role}
        fullName={session.profile.fullName}
        actions={
          <Link
            href="/admin/case-studies"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-limestone-light border border-graphite-border hover:bg-limestone-card text-graphite rounded-md text-xs font-mono font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-sage" />
            <span>Back to Case Studies</span>
          </Link>
        }
      />

      <main className="p-8">
        <CaseStudyForm userRole={session.profile.role} />
      </main>
    </>
  );
}

