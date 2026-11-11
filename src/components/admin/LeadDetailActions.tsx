"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle, Save, MessageSquarePlus, UserCheck } from "lucide-react";
import type { ContactLeadStatus } from "@/types/database";

interface StaffOption {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

interface LeadDetailActionsProps {
  leadId: string;
  currentStatus: ContactLeadStatus;
  currentAssignedTo: string | null;
  assignableStaff: StaffOption[];
  canUpdate: boolean;
}

export function LeadDetailActions({
  leadId,
  currentStatus,
  currentAssignedTo,
  assignableStaff,
  canUpdate,
}: LeadDetailActionsProps) {
  const router = useRouter();

  const [status, setStatus] = useState<ContactLeadStatus>(currentStatus);
  const [assignedTo, setAssignedTo] = useState<string>(currentAssignedTo || "");
  const [internalNote, setInternalNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          assignedTo: assignedTo || null,
          internalNote: internalNote.trim() ? internalNote.trim() : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || "Failed to update lead.");
        setSaving(false);
        return;
      }

      setSuccessMessage("Lead updated and audit trail recorded.");
      setInternalNote("");
      router.refresh();
    } catch {
      setErrorMessage("Network error: Failed to reach API.");
    } finally {
      setSaving(false);
    }
  }

  if (!canUpdate) {
    return (
      <div className="p-4 bg-limestone-light rounded-lg border border-graphite-border text-xs text-graphite-muted font-mono">
        Viewing in read-only mode. Your role does not permit modifying lead statuses or assignments.
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-4">
      {successMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-700 dark:text-emerald-400 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-700 dark:text-red-400 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Status Selector */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
          Inquiry Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ContactLeadStatus)}
          className="w-full px-3 py-2 bg-limestone-card border border-graphite-border rounded-lg text-xs font-mono text-graphite focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper cursor-pointer"
        >
          <option value="new">New (Unprocessed)</option>
          <option value="contacted">Contacted (In Dialogue)</option>
          <option value="qualified">Qualified (Sales Opportunity)</option>
          <option value="closed">Closed (Resolved / Fulfilled)</option>
        </select>
      </div>

      {/* Assignee Selector */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5 flex items-center gap-1.5">
          <UserCheck className="w-3.5 h-3.5 text-copper" />
          <span>Assign Staff Member</span>
        </label>
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="w-full px-3 py-2 bg-limestone-card border border-graphite-border rounded-lg text-xs font-mono text-graphite focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper cursor-pointer"
        >
          <option value="">— Unassigned —</option>
          {assignableStaff.map((staff) => (
            <option key={staff.id} value={staff.id}>
              {staff.fullName} ({staff.role})
            </option>
          ))}
        </select>
      </div>

      {/* Internal Staff Note */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5 flex items-center gap-1.5">
          <MessageSquarePlus className="w-3.5 h-3.5 text-copper" />
          <span>Add Internal Staff Note</span>
        </label>
        <textarea
          rows={3}
          value={internalNote}
          onChange={(e) => setInternalNote(e.target.value)}
          placeholder="Document customer communication, call outcome, or technical requirements..."
          className="w-full p-2.5 bg-limestone-card border border-graphite-border rounded-lg text-xs text-graphite placeholder:text-graphite-subtle/70 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper transition-all"
        />
        <p className="text-[10px] text-graphite-subtle font-mono mt-1">
          Internal notes are strictly confidential to Orbion personnel. Customer message is never altered.
        </p>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-petrol hover:bg-petrol-light text-pure-white rounded-lg font-mono text-xs font-semibold tracking-wider uppercase transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
      >
        <Save className="w-3.5 h-3.5 text-copper" />
        <span>{saving ? "Saving Changes..." : "Commit Update & Audit"}</span>
      </button>
    </form>
  );
}

