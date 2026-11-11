import React from "react";
import type { AdminRole } from "@/types/database";
import { getRoleLabel } from "@/lib/auth/permissions";

interface RoleBadgeProps {
  role: AdminRole;
  size?: "sm" | "md";
}

export function RoleBadge({ role, size = "sm" }: RoleBadgeProps) {
  const styles: Record<AdminRole, string> = {
    super_admin: "bg-copper/15 text-copper border-copper/30",
    admin: "bg-petrol-light/20 text-petrol-light border-petrol-light/35",
    sales: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
    editor: "bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-500/30",
    hr: "bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30",
    viewer: "bg-graphite/10 text-graphite-muted border-graphite/20",
  };

  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded-md border ${sizeClass} ${styles[role] || styles.viewer}`}
    >
      {getRoleLabel(role)}
    </span>
  );
}

