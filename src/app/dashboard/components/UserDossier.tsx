'use client';

import React from 'react';
import { User, Clock, Mail, Building2, Copy } from 'lucide-react';
import { CopyButton } from './CopyButton';
import { InitialAvatar } from './InitialAvatar';

interface UserDossierProps {
  name: string;
  email: string;
  userId: string;
  emailVerified: boolean;
  sessionExpiresAt: string | null;
  companyName: string | null;
  jobTitle: string | null;
}

export function UserDossier({
  name,
  email,
  userId,
  emailVerified,
  sessionExpiresAt,
  companyName,
  jobTitle,
}: UserDossierProps) {
  return (
    <div className="rounded-xl border border-border bg-surface-card p-5 flex flex-col gap-4">
      {/* Header: Avatar + Name */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-orbion-indigo/20 text-orbion-indigo font-headline-sm text-[22px] font-semibold flex items-center justify-center shadow-md">
            {name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-title-md text-title-md text-text-primary font-semibold">
                {name}
              </span>
              {emailVerified && (
                <span className="w-4 h-4 text-orbion-cyan">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
              )}
            </div>
            <span className="font-body-sm text-body-sm text-text-secondary font-mono">
              {email}
            </span>
            <div className="mt-1">
              <span className="inline-block px-1.5 py-0.5 rounded bg-surface-container-high text-orbion-indigo font-caption-xs text-caption-xs font-semibold uppercase tracking-wider">
                Verified Enterprise Admin
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Metadata Spec List */}
      <div className="bg-surface-container rounded-lg p-3 flex flex-col gap-1 font-mono text-[11px]">
        <div className="flex justify-between items-center py-1">
          <span className="text-text-muted">Identity Hash</span>
          <div className="flex items-center gap-1">
            <span className="text-text-primary truncate max-w-[120px]">{userId}</span>
            <CopyButton text={userId} size="sm" className="p-1" />
          </div>
        </div>
        {companyName && (
          <div className="flex justify-between items-center py-1">
            <span className="text-text-muted">Organization</span>
            <span className="text-text-primary font-medium">{companyName}</span>
          </div>
        )}
        {jobTitle && (
          <div className="flex justify-between items-center py-1">
            <span className="text-text-muted">Enclave Role</span>
            <span className="text-orbion-indigo font-medium">{jobTitle}</span>
          </div>
        )}
        {sessionExpiresAt && (
          <div className="flex justify-between items-center py-1">
            <span className="text-text-muted">Session Expiry</span>
            <span className="text-orbion-cyan font-medium">{sessionExpiresAt}</span>
          </div>
        )}
      </div>

      {/* Update Profile Button */}
      <button className="w-full h-10 rounded-lg bg-orbion-indigo hover:bg-orbion-indigo-hover text-white font-label-md text-label-md font-semibold flex items-center justify-center gap-1 transition-colors">
        <span className="w-4 h-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        </span>
        <span>Update Profile</span>
      </button>
    </div>
  );
}