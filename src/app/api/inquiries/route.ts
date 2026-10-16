import { NextResponse } from 'next/server';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

const ALLOWED_TRACKS = [
  'Early Architecture Access & Evaluation',
  'Technical / Research Collaboration',
  'Founder Dialogue',
  'General Inquiries',
] as const;

// In-memory rate limiting map for basic spam suppression
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 5;

  const current = rateLimitMap.get(identifier);
  if (!current || now - current.timestamp > windowMs) {
    rateLimitMap.set(identifier, { count: 1, timestamp: now });
    return false;
  }

  if (current.count >= maxRequests) {
    return true;
  }

  current.count += 1;
  return false;
}

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get('x-forwarded-for') || 'local';
    const clientIp = forwardedFor.split(',')[0].trim();

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Transmission limit reached. Please wait a minute before submitting again.' },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
    }

    const { name, email, organization, inquiryTrack, message } = body;

    // Validate Full Name
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        { error: 'Please enter a valid full name (2–100 characters).' },
        { status: 400 }
      );
    }

    // Validate Work Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !email ||
      typeof email !== 'string' ||
      !emailRegex.test(email.trim()) ||
      email.trim().length > 254
    ) {
      return NextResponse.json(
        { error: 'Please enter a valid work email address.' },
        { status: 400 }
      );
    }

    // Validate Inquiry Track
    if (!inquiryTrack || !ALLOWED_TRACKS.includes(inquiryTrack as any)) {
      return NextResponse.json(
        { error: 'Please select a valid inquiry track.' },
        { status: 400 }
      );
    }

    // Validate Message
    if (
      !message ||
      typeof message !== 'string' ||
      message.trim().length < 10 ||
      message.trim().length > 4000
    ) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 4,000 characters.' },
        { status: 400 }
      );
    }

    // Validate Organization / Role (Optional)
    const sanitizedOrg =
      typeof organization === 'string' && organization.trim().length > 0
        ? organization.trim().slice(0, 150)
        : null;

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          error:
            'Inquiry database connection is not configured yet. Please email exobhavinss@gmail.com directly.',
        },
        { status: 503 }
      );
    }

    const supabase = await createClient();

    // Check if user is authenticated to safely bind submitted_by
    let submittedBy: string | null = null;
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user?.id) {
        submittedBy = userData.user.id;
      }
    } catch {
      submittedBy = null;
    }

    const { error: insertError } = await supabase.from('inquiries').insert({
      full_name: name.trim(),
      work_email: email.trim().toLowerCase(),
      organization_role: sanitizedOrg,
      inquiry_track: inquiryTrack,
      message: message.trim(),
      status: 'new',
      submitted_by: submittedBy,
    });

    if (insertError) {
      console.error('[Inquiries Insert Error]:', insertError.message);
      return NextResponse.json(
        { error: 'Unable to record your inquiry. Please try again or email us directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry dispatched successfully.',
    });
  } catch (error) {
    console.error('[Inquiries API Exception]:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: 'An unexpected transmission error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
