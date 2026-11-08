"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";

export const SUBJECT_OPTIONS = [
  "General Enquiry",
  "Website Development",
  "Custom Software Development",
  "AI Development & Integration",
  "Business Automation",
  "Collaboration / Partnership",
  "Product Enquiry",
  "Other",
] as const;

export type SubjectOption = (typeof SUBJECT_OPTIONS)[number];

interface ContactFormProps {
  initialSubject?: string;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
  phone: string;
  website: string;
  _orb_hp?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string;
  phone?: string;
  website?: string;
  general?: string;
}

export function ContactForm({ initialSubject }: ContactFormProps) {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: initialSubject || "General Enquiry",
    message: "",
    company: "",
    phone: "",
    website: "",
    _orb_hp: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    reference?: string;
    message: string;
  } | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your full name (at least 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid work email address.";
    }

    if (!formData.subject) {
      newErrors.subject = "Please select an enquiry category.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Please write a message of at least 10 characters describing your inquiry.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitResult({
          success: true,
          reference: data.data?.reference,
          message: data.message,
        });
      } else {
        if (data.errors && typeof data.errors === "object") {
          setErrors(data.errors);
        }
        setSubmitResult({
          success: false,
          message: data.message || "Unable to send your message at this time. Please check the highlighted fields below.",
        });
      }
    } catch {
      setSubmitResult({
        success: false,
        message: "Network error encountered. Please check your connection or reach us directly at enquiry@orbiontechnologies.in.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pre-formatted mailto link for direct fallback
  const mailtoSubject = encodeURIComponent(`[${formData.subject}] Enquiry from ${formData.name || "Website Visitor"}`);
  const mailtoBody = encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || "N/A"}\nPhone: ${formData.phone || "N/A"}\nWebsite: ${formData.website || "N/A"}\n\nMessage:\n${formData.message}`
  );
  const directMailtoUrl = `mailto:${COMPANY.emails.general}?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <section id="contact-form" className="py-20 sm:py-28 bg-limestone border-b border-graphite/10">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-14">
            <ScrollReveal direction="down">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-copper">
                START A CONVERSATION
              </span>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-graphite">
                Send an Enquiry
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.15}>
              <p className="text-base sm:text-lg text-graphite-muted leading-relaxed max-w-2xl mx-auto font-normal">
                Tell us about your project, business challenge, or collaboration ideas. We review every enquiry personally.
              </p>
            </ScrollReveal>
          </div>

          {/* Form Container Card */}
          <div className="bg-pure-white rounded-3xl border border-graphite/10 p-6 sm:p-10 lg:p-12 shadow-md">
            {submitResult?.success ? (
              <div className="space-y-6 text-center py-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-600 mx-auto flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-green-700">
                    ENQUIRY LOGGED &amp; STORED
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-graphite">
                    Thank you for reaching out, {formData.name}.
                  </h3>
                  <p className="text-sm sm:text-base text-graphite-muted max-w-xl mx-auto leading-relaxed">
                    {submitResult.message}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-limestone border border-graphite/10 max-w-lg mx-auto text-left text-xs font-mono text-graphite space-y-2">
                  {submitResult.reference && (
                    <div className="flex justify-between border-b border-graphite/10 pb-1.5">
                      <span className="text-graphite-muted">Reference Code:</span>
                      <span className="font-bold text-petrol tracking-wide">{submitResult.reference}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-b border-graphite/10 pb-1.5">
                    <span className="text-graphite-muted">Enquiry Type:</span>
                    <span className="font-bold text-copper">{formData.subject}</span>
                  </div>
                  <div className="flex justify-between border-b border-graphite/10 pb-1.5">
                    <span className="text-graphite-muted">Contact Email:</span>
                    <span className="font-bold">{formData.email}</span>
                  </div>
                  <div className="flex justify-between pt-0.5">
                    <span className="text-graphite-muted">Status:</span>
                    <span className="text-green-600 font-bold">Durable Storage Confirmed</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={directMailtoUrl}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-petrol text-pure-white text-xs font-mono font-semibold hover:bg-petrol-dark transition-colors shadow-xs"
                  >
                    <span>Launch in Mail Client with Pre-filled Text</span>
                    <span>&rarr;</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitResult(null);
                      setFormData({
                        name: "",
                        email: "",
                        subject: "General Enquiry",
                        message: "",
                        company: "",
                        phone: "",
                        website: "",
                        _orb_hp: "",
                      });
                    }}
                    className="px-4 py-2.5 rounded-lg border border-graphite/20 text-xs font-mono font-semibold text-graphite hover:bg-limestone transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Honeypot field (hidden from users, traps automated bots) */}
                <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
                  <label htmlFor="_orb_hp">Leave blank</label>
                  <input
                    id="_orb_hp"
                    name="_orb_hp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData._orb_hp || ""}
                    onChange={handleChange}
                  />
                </div>
                {submitResult && !submitResult.success && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 text-xs sm:text-sm font-medium flex items-center gap-3 animate-in fade-in">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                    <span>{submitResult.message}</span>
                  </div>
                )}

                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-graphite"
                    >
                      Full Name <span className="text-copper">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-limestone-light border text-sm text-graphite placeholder:text-graphite-muted/50 focus:outline-none focus:ring-2 transition-all ${
                        errors.name
                          ? "border-red-500 focus:ring-red-500/30"
                          : "border-graphite/15 focus:border-petrol focus:ring-petrol/20"
                      }`}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-red-600 font-medium">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-graphite"
                    >
                      Work Email <span className="text-copper">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-limestone-light border text-sm text-graphite placeholder:text-graphite-muted/50 focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500/30"
                          : "border-graphite/15 focus:border-petrol focus:ring-petrol/20"
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-red-600 font-medium">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Subject / Enquiry Type */}
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-graphite"
                  >
                    Subject / Enquiry Type <span className="text-copper">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                    className={`w-full px-4 py-3 rounded-xl bg-limestone-light border text-sm text-graphite focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                      errors.subject
                        ? "border-red-500 focus:ring-red-500/30"
                        : "border-graphite/15 focus:border-petrol focus:ring-petrol/20"
                    }`}
                  >
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p id="subject-error" className="text-xs text-red-600 font-medium">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Row 3: Optional Fields (Company, Phone, Website) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="company"
                      className="block text-xs font-mono text-graphite-muted uppercase tracking-wider"
                    >
                      Company / Org <span className="text-graphite-muted/50">(Optional)</span>
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-limestone-light border border-graphite/15 text-sm text-graphite placeholder:text-graphite-muted/50 focus:outline-none focus:border-petrol focus:ring-2 focus:ring-petrol/20 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="block text-xs font-mono text-graphite-muted uppercase tracking-wider"
                    >
                      Phone Number <span className="text-graphite-muted/50">(Optional)</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-limestone-light border border-graphite/15 text-sm text-graphite placeholder:text-graphite-muted/50 focus:outline-none focus:border-petrol focus:ring-2 focus:ring-petrol/20 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="website"
                      className="block text-xs font-mono text-graphite-muted uppercase tracking-wider"
                    >
                      Website <span className="text-graphite-muted/50">(Optional)</span>
                    </label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      placeholder="https://company.com"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-limestone-light border border-graphite/15 text-sm text-graphite placeholder:text-graphite-muted/50 focus:outline-none focus:border-petrol focus:ring-2 focus:ring-petrol/20 transition-all"
                    />
                  </div>
                </div>

                {/* Row 4: Message */}
                <div className="space-y-2 pt-2">
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono font-bold uppercase tracking-wider text-graphite"
                  >
                    Message <span className="text-copper">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us about your requirements, project scope, technical questions, or goals..."
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`w-full px-4 py-3 rounded-xl bg-limestone-light border text-sm text-graphite placeholder:text-graphite-muted/50 focus:outline-none focus:ring-2 transition-all resize-y ${
                      errors.message
                        ? "border-red-500 focus:ring-red-500/30"
                        : "border-graphite/15 focus:border-petrol focus:ring-petrol/20"
                    }`}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-xs text-red-600 font-medium">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Form Footer Action */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs font-mono text-graphite-muted">
                    Verified official intake: <span className="text-petrol font-semibold">{COMPANY.emails.general}</span>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="petrol"
                    size="lg"
                    className="w-full sm:w-auto min-w-[200px]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-pure-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Submitting...</span>
                      </span>
                    ) : (
                      <span>Submit Enquiry &rarr;</span>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

