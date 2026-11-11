import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building,
  Globe,
  Calendar,
  Clock,
  Shield,
  MessageSquare,
  User,
} from "lucide-react";
import { requireAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { LeadStatusBadge } from "@/components/admin/LeadStatusBadge";
import { LeadDetailActions } from "@/components/admin/LeadDetailActions";
import {
  getAdminLeadById,
  getAssignableStaffList,
} from "@/services/admin-leads.service";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Inquiry Details | Orbion Technologies Admin",
};

interface LeadDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminLeadDetailPage(props: LeadDetailPageProps) {
  const session = await requireAdminSession("leads:read", "/admin/leads");
  const { id } = await props.params;

  const leadData = await getAdminLeadById(id);

  if (!leadData) {
    notFound();
  }

  const { lead, notes, assignedStaff } = leadData;
  const assignableStaff = await getAssignableStaffList();
  const canUpdate = hasPermission(session.profile.role, "leads:update");

  return (
    <>
      <AdminHeader
        title={`Lead: ${lead.reference || "Unassigned Reference"}`}
        description={`Submitted by ${lead.fullName} on ${new Date(lead.createdAt).toLocaleString("en-IN")}`}
        role={session.profile.role}
        fullName={session.profile.fullName}
        actions={
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-graphite-border hover:bg-limestone-light text-graphite rounded-md text-xs font-mono font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Leads</span>
          </Link>
        }
      />

      <main className="p-8 space-y-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 Cols): Inquiry Details & Message */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information Card */}
            <div className="bg-limestone-card p-6 rounded-xl border border-graphite-border shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-graphite-border">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-graphite-subtle">
                    Customer Profile
                  </span>
                  <h2 className="text-lg font-bold text-graphite mt-0.5">
                    {lead.fullName}
                  </h2>
                </div>
                <LeadStatusBadge status={lead.status} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-center gap-2.5 text-graphite">
                  <Mail className="w-4 h-4 text-copper shrink-0" />
                  <a
                    href={`mailto:${lead.email}`}
                    className="hover:text-copper underline font-mono text-[11px]"
                  >
                    {lead.email}
                  </a>
                </div>

                <div className="flex items-center gap-2.5 text-graphite">
                  <Phone className="w-4 h-4 text-copper shrink-0" />
                  <span className="font-mono text-[11px]">
                    {lead.phone ? (
                      <a href={`tel:${lead.phone}`} className="hover:text-copper">
                        {lead.phone}
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-graphite">
                  <Building className="w-4 h-4 text-copper shrink-0" />
                  <span>{lead.company || "Individual / Not specified"}</span>
                </div>

                <div className="flex items-center gap-2.5 text-graphite">
                  <Globe className="w-4 h-4 text-copper shrink-0" />
                  {lead.website ? (
                    <a
                      href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-copper underline font-mono text-[11px] truncate max-w-[200px]"
                    >
                      {lead.website}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </div>

                <div className="flex items-center gap-2.5 text-graphite">
                  <Calendar className="w-4 h-4 text-copper shrink-0" />
                  <span className="font-mono text-[11px]">
                    {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-graphite">
                  <Clock className="w-4 h-4 text-copper shrink-0" />
                  <span className="font-mono text-[11px]">
                    {new Date(lead.createdAt).toLocaleTimeString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* Original Customer Message (Strictly Immutable) */}
            <div className="bg-limestone-card p-6 rounded-xl border border-graphite-border shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-graphite-border">
                <span className="text-[10px] font-mono uppercase tracking-wider text-graphite-subtle flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-petrol" />
                  <span>Original Submission (Immutable)</span>
                </span>
                <span className="text-xs font-mono text-graphite-subtle">
                  Subject: <strong className="text-graphite">{lead.subject}</strong>
                </span>
              </div>

              <div className="p-4 bg-limestone-light/50 rounded-lg border border-graphite-border/70 text-sm text-graphite leading-relaxed whitespace-pre-wrap font-sans">
                {lead.message}
              </div>
            </div>

            {/* Staff Internal Notes Timeline */}
            <div className="bg-limestone-card p-6 rounded-xl border border-graphite-border shadow-xs">
              <h3 className="text-xs font-mono uppercase tracking-wider text-graphite-muted mb-4 flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-copper" />
                <span>Internal Staff Notes ({notes.length})</span>
              </h3>

              {notes.length === 0 ? (
                <div className="p-6 text-center text-xs text-graphite-subtle bg-limestone-light/30 rounded-lg border border-dashed border-graphite-border">
                  No internal notes recorded yet for this enquiry.
                </div>
              ) : (
                <div className="space-y-3">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3.5 bg-limestone-light/50 rounded-lg border border-graphite-border text-xs"
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] text-graphite-subtle pb-1.5 mb-1.5 border-b border-graphite-border/50">
                        <span className="font-semibold text-petrol">{note.authorName}</span>
                        <span>
                          {new Date(note.createdAt).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-graphite whitespace-pre-wrap leading-relaxed">
                        {note.note}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column (1 Col): Action Panel */}
          <div className="space-y-6">
            <div className="bg-limestone-card p-6 rounded-xl border border-graphite-border shadow-xs sticky top-6">
              <h3 className="text-sm font-semibold text-graphite mb-1">
                Workflow Actions
              </h3>
              <p className="text-xs text-graphite-subtle mb-4">
                Update status, reassign ownership, or document internal dialogue.
              </p>

              <LeadDetailActions
                leadId={lead.id}
                currentStatus={lead.status}
                currentAssignedTo={lead.assignedTo}
                assignableStaff={assignableStaff}
                canUpdate={canUpdate}
              />

              {assignedStaff && (
                <div className="mt-6 pt-4 border-t border-graphite-border text-xs font-mono">
                  <span className="text-[10px] uppercase text-graphite-subtle block">
                    Current Assignee
                  </span>
                  <div className="flex items-center gap-2 mt-1 text-graphite font-medium">
                    <User className="w-3.5 h-3.5 text-copper" />
                    <span>{assignedStaff.fullName}</span>
                  </div>
                  <span className="text-[11px] text-graphite-subtle block">
                    {assignedStaff.email}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

