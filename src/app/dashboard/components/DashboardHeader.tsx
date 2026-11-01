'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { BRAND_ASSETS } from '@/assets/brand';
import { Button } from '@/components/ui';
import { ThemeToggle } from './ThemeToggle';

interface DashboardHeaderProps {
  onMenuToggle: () => void;
}

export function DashboardHeader({ onMenuToggle }: DashboardHeaderProps) {
  const pathname = usePathname();

  const topNavItems = [
    { label: 'Platform', href: '/#platform' },
    { label: 'Technology', href: '/technology' },
    { label: 'Company', href: '/company' },
    { label: 'Team', href: '/team' },
    { label: 'Contact', href: '/contact' },
    { label: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface-elevated/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-2">
          <Image
            src={BRAND_ASSETS.symbolSvg}
            alt="Orbion Technologies"
            width="20"
            height="20"
            className="w-4 h-4 object-contain"
          />
          <span className="font-sans font-semibold text-text-primary text-sm tracking-tight hidden sm:inline">
            Orbion OS
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-1" aria-label="Top Navigation">
          {topNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-xs font-sans transition-colors ${
                  isActive
                    ? 'bg-surface-container border border-border text-text-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-container-low'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={onMenuToggle}
            className="md:hidden p-1.5 rounded-md text-text-secondary hover:text-white transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}