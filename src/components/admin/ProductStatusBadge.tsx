import React from "react";
import type { ProductStatus } from "@/types/database";

export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  const styles: Record<ProductStatus, { label: string; bg: string; text: string; dot: string }> = {
    coming_soon: {
      label: "Coming Soon",
      bg: "bg-copper-subtle/80 border-copper/30",
      text: "text-copper-hover",
      dot: "bg-copper",
    },
    in_development: {
      label: "In Development",
      bg: "bg-blue-500/10 border-blue-500/25",
      text: "text-blue-700 dark:text-blue-400",
      dot: "bg-blue-500",
    },
    available: {
      label: "Available",
      bg: "bg-emerald-500/10 border-emerald-500/25",
      text: "text-emerald-700 dark:text-emerald-400",
      dot: "bg-emerald-500",
    },
  };

  const current = styles[status] || styles.coming_soon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border font-medium ${current.bg} ${current.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      <span>{current.label}</span>
    </span>
  );
}

