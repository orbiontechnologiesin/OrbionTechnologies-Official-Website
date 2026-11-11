"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  AlertCircle,
  CheckCircle2,
  Lock,
  Unlock,
  Edit2,
  X,
} from "lucide-react";
import type { AdminRole } from "@/types/database";
import { RoleBadge } from "./RoleBadge";
import type { StaffUserItem } from "@/services/admin-users.service";

interface UserManagementTableProps {
  initialUsers: StaffUserItem[];
  currentUserId: string;
}

export function UserManagementTable({
  initialUsers,
  currentUserId,
}: UserManagementTableProps) {
  const router = useRouter();

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState<AdminRole>("sales");
  const [inviting, setInviting] = useState(false);

  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [editingRoleUserId, setEditingRoleUserId] = useState<string | null>(null);
  const [newSelectedRole, setNewSelectedRole] = useState<AdminRole>("sales");
  const [updatingRole, setUpdatingRole] = useState(false);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setInviting(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/admin/users/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: inviteEmail,
          fullName: inviteName,
          role: inviteRole,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatusMessage({ type: "error", text: data.message || "Failed to invite staff." });
        setInviting(false);
        return;
      }

      setStatusMessage({
        type: "success",
        text: `Invitation successfully dispatched to ${inviteEmail}.`,
      });
      setShowInviteModal(false);
      setInviteEmail("");
      setInviteName("");
      router.refresh();
    } catch {
      setStatusMessage({ type: "error", text: "Network error inviting staff member." });
    } finally {
      setInviting(false);
    }
  }

  async function handleToggleStatus(targetUser: StaffUserItem) {
    if (targetUser.id === currentUserId) {
      alert("Security policy forbids deactivating your own Super Admin account.");
      return;
    }

    const action = targetUser.isActive ? "deactivate" : "reactivate";
    if (!confirm(`Are you sure you want to ${action} the account for ${targetUser.fullName}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${targetUser.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !targetUser.isActive }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatusMessage({ type: "error", text: data.message || "Status update failed." });
        return;
      }

      setStatusMessage({
        type: "success",
        text: `Account for ${targetUser.fullName} has been ${!targetUser.isActive ? "activated" : "deactivated"}.`,
      });
      router.refresh();
    } catch {
      setStatusMessage({ type: "error", text: "Network error updating status." });
    }
  }

  async function handleSaveRole(targetUserId: string) {
    setUpdatingRole(true);
    try {
      const res = await fetch(`/api/admin/users/${targetUserId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newSelectedRole }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatusMessage({ type: "error", text: data.message || "Role change failed." });
        return;
      }

      setStatusMessage({ type: "success", text: "Role updated successfully." });
      setEditingRoleUserId(null);
      router.refresh();
    } catch {
      setStatusMessage({ type: "error", text: "Network error updating role." });
    } finally {
      setUpdatingRole(false);
    }
  }

  return (
    <div className="space-y-6">
      {statusMessage && (
        <div
          className={`p-3.5 rounded-lg border text-xs font-mono flex items-center justify-between ${
            statusMessage.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
              : "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-graphite-subtle hover:text-graphite cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header action bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-graphite tracking-tight">
            Registered Administrators & Staff
          </h2>
          <p className="text-xs text-graphite-subtle mt-0.5">
            Role assignments, invitation dispatch, and active state enforcement.
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-copper hover:bg-copper-hover text-pure-white rounded-lg text-xs font-mono font-medium shadow-xs transition-colors cursor-pointer"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Invite Administrator</span>
        </button>
      </div>

      {/* User Table */}
      <div className="bg-limestone-card rounded-xl border border-graphite-border shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-limestone-light/70 font-mono uppercase text-[10px] tracking-wider text-graphite-muted border-b border-graphite-border">
            <tr>
              <th className="px-6 py-3.5">Name</th>
              <th className="px-6 py-3.5">Email</th>
              <th className="px-6 py-3.5">Role</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5">Created</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite-border/60">
            {initialUsers.map((user) => {
              const isSelf = user.id === currentUserId;
              const isEditingThisRole = editingRoleUserId === user.id;

              return (
                <tr key={user.id} className="hover:bg-limestone-light/40 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-graphite flex items-center gap-2">
                      <span>{user.fullName}</span>
                      {isSelf && (
                        <span className="text-[10px] font-mono bg-copper/15 text-copper px-1.5 py-0.2 rounded">
                          You
                        </span>
                      )}
                    </p>
                  </td>
                  <td className="px-6 py-4 font-mono text-[11px] text-graphite-muted">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    {isEditingThisRole ? (
                      <div className="flex items-center gap-1.5">
                        <select
                          value={newSelectedRole}
                          onChange={(e) => setNewSelectedRole(e.target.value as AdminRole)}
                          className="px-2 py-1 bg-limestone-light border border-graphite-border rounded text-xs font-mono"
                        >
                          <option value="super_admin">Super Admin</option>
                          <option value="admin">Admin</option>
                          <option value="sales">Sales</option>
                          <option value="editor">Editor</option>
                          <option value="hr">HR</option>
                          <option value="viewer">Viewer</option>
                        </select>
                        <button
                          onClick={() => handleSaveRole(user.id)}
                          disabled={updatingRole}
                          className="px-2 py-1 bg-petrol text-pure-white rounded text-[11px] font-mono"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingRoleUserId(null)}
                          className="px-2 py-1 text-graphite-muted text-[11px] font-mono"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <RoleBadge role={user.role} />
                        {!isSelf && (
                          <button
                            onClick={() => {
                              setEditingRoleUserId(user.id);
                              setNewSelectedRole(user.role);
                            }}
                            title="Change Role"
                            className="text-graphite-subtle hover:text-copper cursor-pointer"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-mono font-medium ${
                        user.isActive
                          ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/30"
                          : "bg-red-500/10 text-red-700 border border-red-500/30"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.isActive ? "bg-emerald-500" : "bg-red-500"
                        }`}
                      />
                      {user.isActive ? "Active" : "Deactivated"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-[11px] text-graphite-subtle whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right font-mono">
                    {!isSelf && (
                      <button
                        onClick={() => handleToggleStatus(user)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] border transition-colors cursor-pointer ${
                          user.isActive
                            ? "border-red-500/30 text-red-600 hover:bg-red-500/10"
                            : "border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10"
                        }`}
                      >
                        {user.isActive ? (
                          <>
                            <Lock className="w-3 h-3" />
                            <span>Deactivate</span>
                          </>
                        ) : (
                          <>
                            <Unlock className="w-3 h-3" />
                            <span>Reactivate</span>
                          </>
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-graphite/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-limestone-card max-w-md w-full rounded-xl border border-graphite-border shadow-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-graphite-border">
              <h3 className="text-sm font-semibold text-graphite flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-copper" />
                <span>Invite New Administrator</span>
              </h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-graphite-subtle hover:text-graphite cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="name@orbiontechnologies.in"
                  className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs text-graphite focus:outline-none focus:ring-1 focus:ring-copper"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-graphite-muted mb-1.5">
                  Assigned Administrative Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as AdminRole)}
                  className="w-full px-3.5 py-2 bg-limestone-light/50 border border-graphite-border rounded-lg text-xs font-mono text-graphite focus:outline-none focus:ring-1 focus:ring-copper cursor-pointer"
                >
                  <option value="super_admin">Super Admin (Full Administrative Authority)</option>
                  <option value="admin">Administrator (Operations & Inquiries)</option>
                  <option value="sales">Sales Executive (Leads & Inquiries)</option>
                  <option value="editor">Content Editor (Future CMS)</option>
                  <option value="hr">HR Manager (Future Recruitment)</option>
                  <option value="viewer">Viewer (Read-Only Permitted)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-3.5 py-2 border border-graphite-border text-graphite text-xs font-mono rounded-lg hover:bg-limestone-light"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={inviting}
                  className="px-4 py-2 bg-petrol hover:bg-petrol-light text-pure-white text-xs font-mono font-medium rounded-lg disabled:opacity-50 cursor-pointer"
                >
                  {inviting ? "Sending Invitation..." : "Send Invitation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
