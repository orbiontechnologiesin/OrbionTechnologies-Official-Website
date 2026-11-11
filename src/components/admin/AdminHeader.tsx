import React from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import type { AdminRole } from "@/types/database";
import { RoleBadge } from "./RoleBadge";

interface AdminHeaderProps {
  title: string;
  description?: string;
  role: AdminRole;
  fullName: string;
  unreadNotificationsCount?: number;
  actions?: React.ReactNode;
}

export function AdminHeader({
  title,
  description,
  role,
  fullName,
  unreadNotificationsCount = 0,
  actions,
}: AdminHeaderProps) {
  return (
    <header className="bg-limestone-card border-b border-graphite-border px-8 py-5 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-graphite tracking-tight flex items-center gap-3">
          {title}
        </h1>
        {description && (
          <p className="text-xs text-graphite-subtle font-sans mt-0.5">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {actions}
        
        {/* Notifications Bell */}
        <Link
          href="/admin/notifications"
          className="relative p-2 rounded-lg text-graphite-muted hover:text-graphite hover:bg-limestone-light border border-graphite-border/60 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-copper text-pure-white text-[9px] font-mono font-bold rounded-full flex items-center justify-center">
              {unreadNotificationsCount > 9 ? "9+" : unreadNotificationsCount}
            </span>
          )}
        </Link>

        <div className="h-6 w-[1px] bg-graphite-border hidden sm:block" />
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-mono text-graphite-muted hidden sm:inline">
            Logged in as <strong className="text-graphite font-semibold">{fullName}</strong>
          </span>
          <RoleBadge role={role} />
        </div>
      </div>
    </header>
  );
}

