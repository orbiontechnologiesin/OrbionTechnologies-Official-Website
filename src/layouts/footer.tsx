import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { BRAND_ASSETS } from '@/assets/brand';
import { COMPANY } from '@/data/company';
import { FOUNDER } from '@/data/founder';
import { Container, Divider, Logo } from '@/components/ui';

export function Footer() {
  const footerColumns = [
    {
      title: 'Platform',
      links: [
        { label: 'Operating System', href: '/#platform' },
        { label: 'System Architecture', href: '/technology' },
        { label: 'Autonomous Workflows', href: '/#capabilities' },
        { label: 'MCP Integration', href: '/technology#mcp' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Sales & Inbound', href: '/#capabilities' },
        { label: 'Operations Scaling', href: '/#capabilities' },
        { label: 'Incident Resolution', href: '/#capabilities' },
        { label: 'Support Engineering', href: '/#capabilities' },
      ],
    },
    {
      title: 'Technology',
      links: [
        { label: 'AI Agent Swarms', href: '/technology#agents' },
        { label: 'MCP Protocol', href: '/technology#mcp' },
        { label: 'Memory Systems', href: '/technology#memory' },
        { label: 'Workflow DAGs', href: '/technology#orchestration' },
      ],
    },
    {
      title: 'Research',
      links: [
        { label: 'Multi-Agent Systems', href: '/technology' },
        { label: 'Stochastic Guardrails', href: '/technology' },
        { label: 'OS Kernel RFC', href: '/technology' },
        { label: 'Context Compaction', href: '/technology' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Orbion Technologies', href: '/company' },
        { label: 'Thesis & Origin', href: '/company#thesis' },
        { label: 'Current Stage', href: '/company#stage' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
    {
      title: 'Team',
      links: [
        { label: 'Meet the Team', href: '/team' },
        { label: 'Bhavin Shankur (CEO)', href: '/team#bhavin-shankur' },
        { label: 'Apurv Nimbarge (CTO)', href: '/team#apurv-nimbarge' },
        { label: 'Academic Dossier', href: '/team#academics' },
      ],
    },
  ];

  return (
    <footer className="w-full bg-void border-t border-border-hairline pt-16 pb-12 text-text-secondary relative overflow-hidden">
      <Container size="lg">
        {/* Top Brand Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-border-hairline">
          {/* Company Thesis & Brand */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-4">
            <Logo size="md" />
            <p className="font-sans text-sm text-text-secondary max-w-sm leading-relaxed pt-2">
              {COMPANY.visionSummary}
            </p>

            <div className="pt-2 flex items-center gap-2 font-mono text-[11px] text-text-muted uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              <span>ORBION TECHNOLOGIES OS • V1.0 PREVIEW</span>
            </div>
          </div>

          {/* Directory Navigation Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {footerColumns.map((col) => (
              <div key={col.title} className="flex flex-col space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-text-pure font-medium">
                  {col.title}
                </span>
                <ul className="flex flex-col space-y-2 text-[13px]">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-text-secondary hover:text-white transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Social Proof Matrix */}
        <div className="py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-border-hairline font-sans text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono uppercase tracking-wider text-text-muted">Contact:</span>
            <a
              href={`mailto:${COMPANY.emails.general}`}
              className="text-text-primary hover:text-white transition-colors"
            >
              {COMPANY.emails.general}
            </a>
          </div>

          {/* Social Channels */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono uppercase tracking-wider text-text-muted">Connect:</span>
            {FOUNDER.links
              .filter((social) => social.platform !== 'Email')
              .map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-text-secondary hover:text-white transition-colors"
                >
                  <span>{social.platform}</span>
                  <ArrowUpRight className="w-3 h-3 text-text-muted" />
                </a>
              ))}
          </div>
        </div>

        {/* Bottom Legal & Colophon Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-text-muted">
          <div>
            <span>© {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.</span>
            <span className="mx-2">•</span>
            <span>Solapur, India</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Domain: {COMPANY.domain}</span>
            <span>•</span>
            <span className="text-text-secondary">Next.js 15 + TypeScript</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
