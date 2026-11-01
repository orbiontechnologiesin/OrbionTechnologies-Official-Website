'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Layout,
  Cpu,
  BarChart3,
  Shield,
  Server,
  Menu,
  X,
  ArrowUpRight,
} from 'lucide-react';
import { BRAND_ASSETS } from '@/assets/brand';

interface SidebarNavItem {
  label: string;
  href: string | null;
  icon: React.ReactNode;
  disabled?: boolean;
}

const NAV_ITEMS: SidebarNavItem[] = [
  { label: 'Console Overview', href: '/dashboard', icon: <Layout className="w-4 h-4" /> },
  { label: 'Runtime Nodes', href: null, icon: <Server className="w-4 h-4" />, disabled: true },
  { label: 'Specs & Telemetry', href: '/technology', icon: <BarChart3 className="w-4 h-4" /> },
  { label: 'Security Matrix', href: null, icon: <Shield className="w-4 h-4" />, disabled: true },
  { label: 'Infrastructure', href: null, icon: <Cpu className="w-4 h-4" />, disabled: true },
];

interface DashboardSidebarProps {
  onMenuToggle: () => void;
  mobileMenuOpen: boolean;
}

export function DashboardSidebar({ onMenuToggle, mobileMenuOpen }: DashboardSidebarProps) {
  const pathname = usePathname();

  const desktopSidebar = (
    <aside className="hidden fixed lg:flex left-0 top-0 h-screen w-60 bg-surface-elevated border-r border-border flex-col z-40">
      <div className="flex flex-col h-full">
        {/* Top: Logo + Version */}
        <div className="p-5 border-b border-border">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src={BRAND_ASSETS.symbolSvg}
              alt="Orbion Technologies"
              width="24"
              height="24"
              className="w-6 h-6 object-contain"
            />
            <span className="font-sans font-semibold text-text-primary tracking-tight text-sm group-hover:text-white transition-colors">
              Orbion OS
            </span>
          </Link>
          <div className="mt-3 px-1 py-1 rounded-lg bg-surface-container flex items-center justify-between text-outline font-mono text-[11px]">
            <span>v3.8.4-prod</span>
            <span className="w-1.5 h-1.5 rounded-full bg-orbion-cyan animate-pulse" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-1 space-y-px" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href ? pathname === item.href : false;
            return (
              <div key={item.label} className="overflow-hidden">
                {item.disabled ? (
                  <div
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-transparent text-text-muted cursor-not-allowed transition-colors"
                  >
                    {item.icon}
                    <span className="font-sans text-sm text-text-muted">{item.label}</span>
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-surface-container-high text-text-primary font-medium'
                        : 'text-text-secondary hover:bg-surface-container hover:text-text-primary'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.icon}
                    <span className="font-sans text-sm">{item.label}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom: Account info */}
        <div className="p-5 border-t border-border">
          <div className="px-1 py-2 rounded-lg bg-surface-container border border-transparent">
            <div className="flex items-center gap-2 text-xs font-mono text-text-secondary mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orbion-cyan animate-pulse" />
              <span>Online</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-text-primary">
              <span className="w-2 h-2 rounded-full bg-orbion-indigo" />
              <span>Enterprise Plan</span>
            </div>
            <div className="text-[10px] text-text-muted mt-0.5">
              Dedicated Pod
            </div>
          </div>
        </div>
      </div>
    </aside>
  );

  const mobileSidebar = (
    <aside
      className={`fixed left-0 top-0 h-screen w-64 bg-surface-elevated border-r border-border z-50 flex-col transform transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div className="flex items-center gap-2">
          <Image
            src={BRAND_ASSETS.symbolSvg}
            alt="Orbion Technologies"
            width="24"
            height="24"
            className="w-6 h-6 object-contain"
          />
          <span className="font-sans font-semibold text-text-primary tracking-tight text-sm">
            Orbion OS
          </span>
        </div>
        <button
          onClick={onMenuToggle}
          className="p-1.5 rounded-md text-text-secondary hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 p-1 space-y-px" aria-label="Mobile Navigation">
        {NAV_ITEMS.map((item) => {
          const isActive = item.href ? pathname === item.href : false;
          return (
            <div key={item.label} className="overflow-hidden">
              {item.disabled ? (
                <div
                  className="flex items-center gap-2 px-2 py-2 rounded-lg bg-transparent text-text-muted cursor-not-allowed transition-colors"
                >
                  {item.icon}
                  <span className="font-sans text-sm text-text-muted">{item.label}</span>
                </div>
              ) : (
                <Link
                  href={item.href!}
                  onClick={onMenuToggle}
                  className={`flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-surface-container-high text-text-primary font-medium'
                      : 'text-text-secondary hover:bg-surface-container hover:text-text-primary'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.icon}
                  <span className="font-sans text-sm">{item.label}</span>
                  {item.href && <ArrowUpRight className="w-3 h-3 ml-auto text-text-muted" />}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );

  return (
    <>
      {desktopSidebar}

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm"
          onClick={onMenuToggle}
          aria-hidden="true"
        />
      )}
      {mobileSidebar}
    </>
  );
}