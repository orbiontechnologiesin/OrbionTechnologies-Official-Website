'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Building2,
  Clock,
  MapPin,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { Container, Section, Card, Badge, Button, Divider } from '@/components/ui';
import { FOUNDER } from '@/data/founder';
import { COMPANY } from '@/data/company';

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'submitted'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryTrack: 'Early Architecture Access & Evaluation',
    message: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const inquiryTracks = [
    'Early Architecture Access & Evaluation',
    'Technical / Research Collaboration',
    'Founder Dialogue',
    'General Inquiries',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (formData.message.trim().length < 10) {
      setErrorMessage('Please provide a message of at least 10 characters.');
      return;
    }

    setFormState('submitting');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error || 'Failed to submit inquiry. Please try again.');
        setFormState('idle');
        return;
      }

      setFormState('submitted');
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Network error. Please try again later.'
      );
      setFormState('idle');
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-text-primary selection:bg-brand-accent selection:text-white pt-20">
      {/* Header */}
      <Section padding="lg" className="border-b border-border-hairline relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-grid opacity-30 pointer-events-none" />
        <Container size="lg" className="relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="status" indicatorColor="brand">
                DIRECT COMMUNICATIONS
              </Badge>
              <span className="font-mono text-xs text-text-muted">OPEN CHANNEL // 24-48H SLA</span>
            </div>

            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6">
              Initiate Contact.
            </h1>

            <p className="font-sans text-lg sm:text-xl text-text-secondary leading-relaxed font-light">
              Whether you are an engineering leader evaluating autonomous agent architectures, a fellow researcher,
              or exploring early collaboration, our communication lines are open.
            </p>
          </div>
        </Container>
      </Section>

      {/* Main Content Form & Dossier Grid */}
      <Section padding="lg" className="border-b border-border-hairline">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Contact Form UI */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-xs border border-border-hairline bg-surface-card relative overflow-hidden">
                <div className="flex items-center justify-between pb-6 border-b border-border-hairline mb-8">
                  <div>
                    <h2 className="font-sans text-xl font-semibold text-white">Transmit an Inquiry</h2>
                    <p className="font-sans text-xs text-text-secondary mt-1">
                      Direct transmission to the Orbion Technologies founding organization.
                    </p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    SECURE INTAKE
                  </Badge>
                </div>

                {formState === 'submitted' ? (
                  <div className="p-8 text-center flex flex-col items-center justify-center space-y-4 animate-fade-in bg-void/60 rounded-xs border border-border-hairline">
                    <div className="w-12 h-12 rounded-full bg-brand-accent/20 border border-brand-accent/40 flex items-center justify-center text-brand-cyan">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-sans text-xl font-semibold text-white">Inquiry Received</h3>
                    <p className="font-sans text-sm text-text-secondary max-w-md leading-relaxed">
                      Thank you for contacting Orbion Technologies. Your transmission has been dispatched to Bhavin Shankur.
                      We will review your inquiry and follow up at <span className="text-white font-mono">{formData.email}</span> within 24–48 business hours.
                    </p>
                    <div className="pt-4">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setFormData({
                            name: '',
                            email: '',
                            organization: '',
                            inquiryTrack: 'Early Architecture Access & Evaluation',
                            message: '',
                          });
                          setFormState('idle');
                        }}
                      >
                        Transmit Another Note
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {errorMessage && (
                      <div className="p-3 text-xs font-mono text-red-400 bg-red-950/20 border border-red-900/50 rounded-xs">
                        {errorMessage}
                      </div>
                    )}

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-mono text-xs text-text-secondary mb-2" htmlFor="name">
                          FULL NAME <span className="text-brand-accent">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Mercer"
                          className="w-full h-11 px-3.5 bg-void border border-border-hairline rounded-xs font-sans text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs text-text-secondary mb-2" htmlFor="email">
                          WORK EMAIL <span className="text-brand-accent">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@enterprise.com"
                          className="w-full h-11 px-3.5 bg-void border border-border-hairline rounded-xs font-sans text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                        />
                      </div>
                    </div>

                    {/* Organization */}
                    <div>
                      <label className="block font-mono text-xs text-text-secondary mb-2" htmlFor="organization">
                        ORGANIZATION / ROLE <span className="text-text-muted font-sans text-[11px]">(Optional)</span>
                      </label>
                      <input
                        id="organization"
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="e.g. Systems Architect, Meridian Labs"
                        className="w-full h-11 px-3.5 bg-void border border-border-hairline rounded-xs font-sans text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                      />
                    </div>

                    {/* Inquiry Track */}
                    <div>
                      <label className="block font-mono text-xs text-text-secondary mb-2" htmlFor="track">
                        INQUIRY TRACK
                      </label>
                      <select
                        id="track"
                        value={formData.inquiryTrack}
                        onChange={(e) => setFormData({ ...formData, inquiryTrack: e.target.value })}
                        className="w-full h-11 px-3 bg-void border border-border-hairline rounded-xs font-sans text-sm text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors"
                      >
                        {inquiryTracks.map((track) => (
                          <option key={track} value={track} className="bg-[#111111] text-white">
                            {track}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block font-mono text-xs text-text-secondary mb-2" htmlFor="message">
                        MESSAGE / BRIEF <span className="text-brand-accent">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your inquiry, architectural questions, or collaboration topic..."
                        className="w-full p-3.5 bg-void border border-border-hairline rounded-xs font-sans text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        disabled={formState === 'submitting'}
                        className="w-full sm:w-auto"
                      >
                        {formState === 'submitting' ? (
                          <span className="flex items-center gap-2">
                            <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            Transmitting...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            Transmit Inquiry
                            <Send className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </Button>

                      <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                        <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" />
                        <span>Zero-spam guarantee • Enterprise confidential</span>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right: Direct Information & Dossier */}
            <div className="lg:col-span-5 flex flex-col space-y-8">
              {/* Direct Inquiries Card */}
              <div className="p-6 sm:p-8 rounded-xs border border-border-hairline bg-surface-card">
                <span className="font-mono text-xs uppercase tracking-wider text-brand-cyan block mb-4">
                  DIRECT CHANNELS
                </span>

                <div className="space-y-6">
                  <div>
                    <span className="font-mono text-[11px] text-text-muted block mb-1">FOUNDER &amp; CEO</span>
                    <h3 className="font-sans text-base font-semibold text-white">Bhavin Shankur</h3>
                    <p className="font-sans text-xs text-text-secondary mt-0.5">
                      B.Tech CSE — Artificial Intelligence &amp; Machine Learning
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border-hairline/60 space-y-3">
                    <span className="font-mono text-[11px] text-text-muted block">PRIMARY EMAIL:</span>
                    <a
                      href="mailto:exobhavinss@gmail.com"
                      className="font-mono text-sm text-text-primary hover:text-brand-cyan transition-colors flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4 text-brand-accent" />
                      exobhavinss@gmail.com
                    </a>

                    <span className="font-mono text-[11px] text-text-muted block pt-2">ALTERNATE INQUIRIES:</span>
                    <a
                      href="mailto:bhavinshankur.tech@yahoo.com"
                      className="font-mono text-sm text-text-primary hover:text-brand-cyan transition-colors flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4 text-text-muted" />
                      bhavinshankur.tech@yahoo.com
                    </a>
                  </div>

                  <div className="pt-4 border-t border-border-hairline/60 flex items-center gap-3 text-xs text-text-secondary">
                    <MapPin className="w-4 h-4 text-text-muted flex-shrink-0" />
                    <span>Solapur, Maharashtra, India</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-text-secondary">
                    <Clock className="w-4 h-4 text-text-muted flex-shrink-0" />
                    <span>Response window: 24–48 business hours</span>
                  </div>
                </div>
              </div>

              {/* Verified Networks */}
              <div className="p-6 rounded-xs border border-border-hairline bg-void">
                <span className="font-mono text-xs uppercase tracking-wider text-text-muted block mb-4">
                  VERIFIED NETWORKS
                </span>

                <div className="grid grid-cols-2 gap-3">
                  {FOUNDER.links
                    .filter((l) => l.platform !== 'Email')
                    .map((item) => (
                      <a
                        key={item.platform}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xs border border-border-hairline bg-surface-card hover:bg-surface-elevated hover:border-border-subtle transition-all duration-150 flex items-center justify-between group"
                      >
                        <span className="font-mono text-xs text-text-secondary group-hover:text-white">
                          {item.platform}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-brand-cyan transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
