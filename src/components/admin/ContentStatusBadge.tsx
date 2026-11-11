import React from "react";
import type { ContentStatus } from "@/types/database";

export function ContentStatusBadge({ status }: { status: ContentStatus }) {
  const styles: Record<ContentStatus, { label: string; bg: string; text: string; dot: string }> = {
    draft: {
      label: "Draft",
      bg: "bg-graphite/5 border-graphite/20",
      text: "text-graphite-muted",
      dot: "bg-graphite-subtle",
    },
    in_review: {
      label: "In Review",
      bg: "bg-amber-500/10 border-amber-500/20",
      text: "text-amber-700 dark:text-amber-400",
      dot: "bg-amber-500",
    },
    published: {
      label: "Published",
      bg: "bg-emerald-500/10 border-emerald-500/25",
      text: "text-emerald-700 dark:text-emerald-400",
      dot: "bg-emerald-500",
    },
    archived: {
      label: "Archived",
      bg: "bg-red-500/10 border-red-500/20",
      text: "text-red-700 dark:text-red-400",
      dot: "bg-red-400",
    },
  };

  const current = styles[status] || styles.draft;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border font-medium ${current.bg} ${current.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      <span>{current.label}</span>
    </span>
  );
}

