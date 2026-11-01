import React from 'react';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth/server';
import { prisma } from '@/lib/prisma';
import { DashboardShell } from './components/DashboardShell';
import { SystemOverview } from './components/SystemOverview';
import { UserDossier } from './components/UserDossier';
import { ArchitectureMatrix } from './components/ArchitectureMatrix';
import { TelemetryPanel } from './components/TelemetryPanel';
import { CompanyInformation } from './components/CompanyInformation';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Dashboard — Orbion Technologies OS',
  description: 'Enterprise console and session management for Orbion Technologies Operating System.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage() {
  let session = null;
  let user = null;

  try {
    const sessionData = await auth.api.getSession({
      headers: await headers(),
    });
    session = sessionData?.session;
    user = sessionData?.user;
  } catch (err) {
    console.error('[Dashboard Session Error]:', err);
    redirect('/auth/sign-in?callbackUrl=/dashboard');
  }

  if (!user || !session) {
    redirect('/auth/sign-in?callbackUrl=/dashboard');
  }

  // Fetch profile data from PostgreSQL profiles table
  let profile = null;
  try {
    profile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });
  } catch {
    profile = null;
  }

  const displayName = profile?.fullName || user.name || user.email?.split('@')[0] || 'Authenticated User';
  const sessionExpiresAt = session.expiresAt
    ? new Date(session.expiresAt).toLocaleString()
    : null;

  return (
    <DashboardShell
      userName={displayName}
      userEmail={user.email}
      emailVerified={user.emailVerified}
    >
      <div className="space-y-5">
        {/* System Overview Cards */}
        <SystemOverview />

        {/* Main Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* LEFT COLUMN: User Dossier + Company Information (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <UserDossier
              name={displayName}
              email={user.email}
              userId={user.id}
              emailVerified={user.emailVerified}
              sessionExpiresAt={sessionExpiresAt}
              companyName={profile?.companyName ?? null}
              jobTitle={profile?.jobTitle ?? null}
            />
            <CompanyInformation />
          </div>

          {/* RIGHT COLUMN: Architecture Matrix + Telemetry Panel (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <ArchitectureMatrix />
            <TelemetryPanel />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}