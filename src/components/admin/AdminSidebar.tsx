"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Inbox,
  Users,
  ShieldCheck,
  LogOut,
  ExternalLink,
  FileText,
  Layers,
  Award,
  Image as ImageIcon,
  TrendingUp,
  BarChart3,
  Target,
  Mail,
  Bell,
  Activity,
  FileSpreadsheet,
} from "lucide-react";
import type { AdminRole } from "@/types/database";
import { hasPermission } from "@/lib/auth/permissions";

interface AdminSidebarProps {
  role: AdminRole;
  fullName: string;
  email: string;
}

export function AdminSidebar({ role, fullName, email }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = React.useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    } finally {
      setLoggingOut(false);
    }
  }

  const operationalItems = [
    {
      label: "Overview",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      show: true,
    },
    {
      label: "Leads & Enquiries",
      href: "/admin/leads",
      icon: Inbox,
      show: hasPermission(role, "leads:read"),
    },
    {
      label: "Newsletter",
      href: "/admin/newsletter",
      icon: Mail,
      show: hasPermission(role, "newsletter:view"),
    },
  ];

  const intelligenceItems = [
    {
      label: "Business Intelligence",
      href: "/admin/business-intelligence",
      icon: TrendingUp,
      show: hasPermission(role, "business_intelligence:view"),
    },
    {
      label: "Website Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
      show: hasPermission(role, "analytics:view"),
    },
    {
      label: "Lead Intelligence",
      href: "/admin/lead-intelligence",
      icon: Target,
      show: hasPermission(role, "lead_intelligence:view"),
    },
  ];

  const cmsItems = [
    {
      label: "Blog Posts",
      href: "/admin/blog",
      icon: FileText,
      show: hasPermission(role, "cms:read"),
    },
    {
      label: "Product Catalog",
      href: "/admin/products",
      icon: Layers,
      show: hasPermission(role, "cms:read"),
    },
    {
      label: "Case Studies",
      href: "/admin/case-studies",
      icon: Award,
      show: hasPermission(role, "cms:read"),
    },
    {
      label: "Media Library",
      href: "/admin/media",
      icon: ImageIcon,
      show: hasPermission(role, "media:read"),
    },
  ];

  const platformItems = [
    {
      label: "Notifications",
      href: "/admin/notifications",
      icon: Bell,
      show: hasPermission(role, "notifications:view"),
    },
    {
      label: "System Health",
      href: "/admin/system-health",
      icon: Activity,
      show: hasPermission(role, "system_health:view"),
    },
    {
      label: "Reports & Exports",
      href: "/admin/reports",
      icon: FileSpreadsheet,
      show: hasPermission(role, "reports:view"),
    },
  ];

  const administrationItems = [
    {
      label: "Administrator Management",
      href: "/admin/users",
      icon: Users,
      show: hasPermission(role, "users:read"),
    },
    {
      label: "Audit Logs",
      href: "/admin/audit-logs",
      icon: ShieldCheck,
      show: hasPermission(role, "audit_logs:read"),
    },
  ];

  return (
    <aside className="w-64 bg-petrol text-pure-white flex flex-col shrink-0 min-h-screen border-r border-petrol-light/40 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-petrol-light/30 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="w-8 h-8 relative rounded-md overflow-hidden bg-petrol-surface flex items-center justify-center p-1 border border-petrol-light/50">
            <Image
              src="/brand/PNG Images/orbion-logo-white.png"
              alt="Orbion Technologies"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-mono text-sm font-semibold tracking-wider text-pure-white block">
              ORBION
            </span>
            <span className="text-[10px] text-sage tracking-widest uppercase block font-mono">
              Admin Portal
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* Operations */}
        <div className="space-y-1">
          <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-sage/70 font-semibold">
            Operations
          </div>
          {operationalItems
            .filter((item) => item.show)
            .map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-petrol-light text-pure-white font-semibold shadow-sm border border-copper/30"
                      : "text-limestone/80 hover:text-pure-white hover:bg-petrol-surface"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-copper" : "text-sage/80"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
        </div>

        {/* Intelligence & Analytics */}
        {intelligenceItems.some((i) => i.show) && (
          <div className="space-y-1">
            <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-sage/70 font-semibold">
              Intelligence
            </div>
            {intelligenceItems
              .filter((item) => item.show)
              .map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-petrol-light text-pure-white font-semibold shadow-sm border border-copper/30"
                        : "text-limestone/80 hover:text-pure-white hover:bg-petrol-surface"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-copper" : "text-sage/80"
                      }`}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
          </div>
        )}

        {/* Content Management (CMS) */}
        {cmsItems.some((i) => i.show) && (
          <div className="space-y-1">
            <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-sage/70 font-semibold">
              Content & CMS
            </div>
            {cmsItems
              .filter((item) => item.show)
              .map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-petrol-light text-pure-white font-semibold shadow-sm border border-copper/30"
                        : "text-limestone/80 hover:text-pure-white hover:bg-petrol-surface"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-copper" : "text-sage/80"
                      }`}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
          </div>
        )}

        {/* Platform & Health */}
        {platformItems.some((i) => i.show) && (
          <div className="space-y-1">
            <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-sage/70 font-semibold">
              Platform & Health
            </div>
            {platformItems
              .filter((item) => item.show)
              .map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-petrol-light text-pure-white font-semibold shadow-sm border border-copper/30"
                        : "text-limestone/80 hover:text-pure-white hover:bg-petrol-surface"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-copper" : "text-sage/80"
                      }`}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
          </div>
        )}

        {/* Governance */}
        {administrationItems.some((i) => i.show) && (
          <div className="space-y-1">
            <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-sage/70 font-semibold">
              Governance
            </div>
            {administrationItems
              .filter((item) => item.show)
              .map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-petrol-light text-pure-white font-semibold shadow-sm border border-copper/30"
                        : "text-limestone/80 hover:text-pure-white hover:bg-petrol-surface"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-copper" : "text-sage/80"
                      }`}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
          </div>
        )}

        {/* External */}
        <div className="space-y-1 pt-2 border-t border-petrol-light/20">
          <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-sage/70 font-semibold">
            Live Preview
          </div>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-mono text-limestone/70 hover:text-pure-white hover:bg-petrol-surface transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-sage/60" />
          </Link>
        </div>
      </nav>

      {/* User profile footer */}
      <div className="p-4 border-t border-petrol-light/30 bg-petrol-dark/50">
        <div className="flex items-center justify-between mb-3">
          <div className="overflow-hidden">
            <p className="text-xs font-medium text-pure-white truncate">{fullName}</p>
            <p className="text-[11px] text-sage/80 font-mono truncate">{email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-mono text-limestone hover:text-pure-white bg-petrol-surface hover:bg-petrol-light/70 rounded-md border border-petrol-light/40 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 text-copper" />
          <span>{loggingOut ? "Signing out..." : "Sign Out"}</span>
        </button>
      </div>
    </aside>
  );
}

