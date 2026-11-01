import React from 'react';
import { GraduationCap, ArrowUpRight } from 'lucide-react';
import { TeamMember } from '@/types';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

export interface TeamProfileCardProps {
  member: TeamMember;
  className?: string;
}

export function TeamProfileCard({ member, className }: TeamProfileCardProps) {
  return (
    <article
      id={member.id}
      className={cn(
        'h-full flex flex-col justify-between rounded-xs bg-surface-card border border-border-hairline p-6 sm:p-8 lg:p-9 hover:border-border-subtle transition-all duration-200',
        className
      )}
    >
      {/* Top Details Block */}
      <div className="flex flex-col">
        {/* Card Header: Avatar Monogram + Department Label */}
        <div className="flex items-center justify-between pb-6 border-b border-border-hairline">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xs bg-void border border-border-hairline flex items-center justify-center shrink-0 relative"
              aria-hidden="true"
            >
              <span className="font-mono text-base sm:text-lg font-semibold tracking-wider text-text-primary">
                {member.initials || member.name.split(' ').map((n) => n[0]).join('')}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent absolute top-2 right-2" />
            </div>

            <div>
              <span className="font-mono text-[10px] sm:text-xs text-brand-cyan uppercase tracking-wider block font-medium">
                {member.department || 'LEADERSHIP'}
              </span>
              <span className="font-mono text-[11px] sm:text-xs text-text-muted block mt-0.5">
                ORBION TECHNOLOGIES
              </span>
            </div>
          </div>

          <span className="font-mono text-[10px] text-text-muted uppercase px-2 py-1 rounded-2xs bg-void border border-border-hairline">
            DIRECTOR
          </span>
        </div>

        {/* Identity & Role Title */}
        <div className="pt-6">
          <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            {member.name}
          </h2>
          <p className="font-mono text-xs sm:text-sm text-brand-cyan tracking-wide mt-1 mb-5">
            {member.role}
          </p>
        </div>

        {/* Academic Foundation Dossier */}
        <div className="rounded-xs bg-void/60 border border-border-hairline p-4 sm:p-5 mb-6 space-y-2">
          <div className="flex items-center justify-between text-text-muted pb-2 border-b border-border-hairline/60">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-brand-cyan" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-text-primary font-medium">
                ACADEMIC FOUNDATION
              </span>
            </div>
            <span className="font-mono text-[10px] text-brand-accent">UNDERGRADUATE</span>
          </div>

          <p className="font-sans text-xs sm:text-sm text-text-primary font-medium pt-1">
            {member.degree}
          </p>
          <p className="font-mono text-[11px] sm:text-xs text-text-muted">
            {member.institution} • {member.location}
          </p>
        </div>

        {/* Biography */}
        <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed mb-6 font-normal">
          {member.description}
        </p>

        {/* Technical Specializations */}
        {member.focusAreas && member.focusAreas.length > 0 && (
          <div className="mb-6 space-y-2.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted block">
              CORE TECHNICAL SPECIALIZATION
            </span>
            <div className="flex flex-wrap gap-1.5">
              {member.focusAreas.map((area) => (
                <span
                  key={area}
                  className="font-mono text-[10px] sm:text-[11px] px-2.5 py-1 rounded-2xs bg-surface-subtle border border-border-hairline text-text-secondary"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Block: Social Channels & External Developer Portfolio */}
      <div className="pt-6 border-t border-border-hairline flex flex-col space-y-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted block mb-2.5">
            VERIFIED DIRECT CHANNELS
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {member.links.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                aria-label={`${link.label} for ${member.name}${link.url.startsWith('mailto:') ? '' : ' (opens in a new tab)'}`}
                className="p-2.5 rounded-xs bg-void border border-border-hairline hover:border-brand-accent/50 hover:bg-surface-elevated text-center flex flex-col items-center justify-center transition-all duration-150 group/link focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent"
              >
                <div className="flex items-center gap-1 text-text-secondary group-hover/link:text-white">
                  <span className="font-mono text-xs">{link.platform}</span>
                  <ArrowUpRight className="w-3 h-3 text-text-muted group-hover/link:text-brand-cyan transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </div>
                {link.username && (
                  <span className="font-mono text-[10px] text-text-muted truncate max-w-full mt-0.5">
                    {link.username}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

        {member.portfolioUrl && (
          <a
            href={member.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full pt-1"
            aria-label={`View developer portfolio of ${member.name} (opens in a new tab)`}
          >
            <Button
              variant="secondary"
              size="md"
              className="w-full justify-between font-mono text-xs h-11 border-border-hairline hover:border-brand-accent/60 group/btn"
            >
              <span>Explore Developer Portfolio</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-brand-cyan group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Button>
          </a>
        )}
      </div>
    </article>
  );
}
