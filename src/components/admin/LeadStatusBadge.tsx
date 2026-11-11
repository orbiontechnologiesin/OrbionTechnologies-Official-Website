import React from "react";
import type { ContactLeadStatus } from "@/types/database";

interface LeadStatusBadgeProps {
  status: ContactLeadStatus;
}

export function LeadStatusBadge({ status }: LeadStatusBadgeProps) {
  const config: Record<
    ContactLeadStatus,
    { label: string; bg: string; text: string; dot: string }
  > = {
    new: {
      label: "New",
      bg: "bg-blue-500/10 border-blue-500/30",
      text: "text-blue-700 dark:text-blue-400",
      dot: "bg-blue-500",
    },
    contacted: {
      label: "Contacted",
      bg: "bg-amber-500/10 border-amber-500/30",
      text: "text-amber-700 dark:text-amber-400",
      dot: "bg-amber-500",
    },
    qualified: {
      label: "Qualified",
      bg: "bg-emerald-500/10 border-emerald-500/30",
      text: "text-emerald-700 dark:text-emerald-400",
      dot: "bg-emerald-500",
    },
    closed: {
      label: "Closed",
      bg: "bg-graphite/10 border-graphite/20",
      text: "text-graphite-muted",
      dot: "bg-graphite-muted",
    },
  };

  const item = config[status] || config.new;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${item.bg} ${item.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
      {item.label}
    </span>
  );
}

