'use client';

import React, { useState } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { DashboardPageHeader } from './DashboardPageHeader';
import { SystemOverview } from './SystemOverview';

interface DashboardShellProps {
  children: React.ReactNode;
  userName: string;
  userEmail: string;
  emailVerified: boolean;
}

export function DashboardShell({
  children,
  userName,
  userEmail,
  emailVerified,
}: DashboardShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onMenuToggle={() => setMobileMenuOpen((prev) => !prev)} />

      <div className="flex">
        <DashboardSidebar
          onMenuToggle={() => setMobileMenuOpen((prev) => !prev)}
          mobileMenuOpen={mobileMenuOpen}
        />

        <main className="flex-1 lg:pl-60 pt-0 overflow-x-auto">
          <div className="px-5 sm:px-6 lg:px-8 pb-8">
            <DashboardPageHeader
              userName={userName}
              userEmail={userEmail}
              emailVerified={emailVerified}
            />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}