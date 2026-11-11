import React from "react";
import Link from "next/link";
import { requireAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getAdminNotifications } from "@/services/admin-notifications.service";
import {
  Bell,
  Inbox,
  Mail,
  AlertTriangle,
  FileText,
  Shield,
  Activity,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    unreadOnly?: string;
  }>;
}

export default async function NotificationsPage(props: PageProps) {
  const session = await requireAdminSession("notifications:view");
  const params = await props.searchParams;
  const page = parseInt(params.page || "1", 10);
  const category = params.category || "all";
  const unreadOnly = params.unreadOnly === "true";

  const { notifications, unreadCount } = await getAdminNotifications(
    session.profile.id,
    session.profile.role,
    {
      page,
      limit: 20,
      unreadOnly,
      category: category !== "all" ? category : undefined,
    }
  );

  const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    lead: Inbox,
    demo: FileText,
    newsletter: Mail,
    email_failure: AlertTriangle,
    cms: FileText,
    system: Activity,
    security: Shield,
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-limestone-light">
      <AdminHeader
        title="Administrative Notifications"
        description="Operational alerts, lead intake notifications, editorial review requests, and security logs."
        role={session.profile.role}
        fullName={session.profile.fullName}
        unreadNotificationsCount={unreadCount}
        actions={
          unreadCount > 0 ? (
            <form action="/api/admin/notifications/read-all" method="POST">
              <button
                type="submit"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono bg-petrol text-pure-white hover:bg-petrol-light transition-colors border border-petrol-light cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark All as Read</span>
              </button>
            </form>
          ) : undefined
        }
      />

      <main className="p-8 space-y-6 max-w-5xl w-full mx-auto">
        {/* Filter Bar */}
        <div className="bg-limestone-card p-4 rounded-xl border border-graphite-border shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-graphite-muted">Filter:</span>
            {[
              { label: "All Alerts", val: "all" },
              { label: "Leads", val: "lead" },
              { label: "Demos", val: "demo" },
              { label: "Newsletter", val: "newsletter" },
              { label: "CMS", val: "cms" },
              { label: "Email Failures", val: "email_failure" },
            ].map((cat) => (
              <a
                key={cat.val}
                href={`/admin/notifications?category=${cat.val}${unreadOnly ? "&unreadOnly=true" : ""}`}
                className={`px-2.5 py-1 rounded-md border ${
                  category === cat.val
                    ? "bg-petrol text-pure-white border-petrol font-medium"
                    : "bg-limestone-light text-graphite-muted border-graphite-border hover:text-graphite"
                }`}
              >
                {cat.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <a
              href={`/admin/notifications?category=${category}${unreadOnly ? "" : "&unreadOnly=true"}`}
              className={`px-3 py-1 rounded-md border transition-colors ${
                unreadOnly
                  ? "bg-copper text-pure-white border-copper font-medium"
                  : "bg-limestone-light text-graphite-muted border-graphite-border hover:text-graphite"
              }`}
            >
              {unreadOnly ? "Showing Unread Only" : "Show Unread Only"}
            </a>
          </div>
        </div>

        {/* Notifications Roster */}
        {notifications.length === 0 ? (
          <div className="bg-limestone-card border border-graphite-border/70 rounded-xl p-12 text-center shadow-xs">
            <Bell className="w-8 h-8 text-graphite-muted mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-graphite">No Notifications</h3>
            <p className="text-xs text-graphite-subtle mt-1">
              You are all caught up. No operational alerts matching this filter.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => {
              const Icon = categoryIcons[notif.category] || Bell;
              const isUnread = !notif.readAt;

              return (
                <div
                  key={notif.id}
                  className={`p-5 rounded-xl border transition-all flex items-start justify-between gap-4 shadow-xs ${
                    isUnread
                      ? "bg-limestone-card border-copper/40 ring-1 ring-copper/10"
                      : "bg-limestone-card/70 border-graphite-border/60 opacity-90"
                  }`}
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                        notif.category === "email_failure"
                          ? "bg-rose-50 border-rose-200 text-rose-700"
                          : notif.category === "lead"
                          ? "bg-petrol/10 border-petrol/20 text-petrol"
                          : "bg-limestone-light border-graphite-border text-graphite-muted"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-limestone-light border border-graphite-border text-graphite-muted">
                          {notif.category.replace("_", " ")}
                        </span>
                        <span className="text-xs font-semibold text-graphite truncate">
                          {notif.title}
                        </span>
                        {isUnread && (
                          <span className="w-2 h-2 rounded-full bg-copper inline-block" />
                        )}
                      </div>

                      <p className="text-xs text-graphite-subtle font-sans mb-2">
                        {notif.message}
                      </p>

                      <div className="flex items-center gap-4 text-[11px] font-mono text-graphite-muted">
                        <span>{new Date(notif.createdAt).toLocaleString()}</span>
                        {notif.linkUrl && (
                          <Link
                            href={notif.linkUrl}
                            className="inline-flex items-center gap-1 text-petrol hover:underline font-medium"
                          >
                            <span>Open Record</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  {isUnread && (
                    <form action={`/api/admin/notifications/${notif.id}/read`} method="POST">
                      <button
                        type="submit"
                        className="px-2.5 py-1 text-[11px] font-mono rounded bg-limestone-light border border-graphite-border text-graphite-muted hover:text-graphite cursor-pointer"
                      >
                        Mark Read
                      </button>
                    </form>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
