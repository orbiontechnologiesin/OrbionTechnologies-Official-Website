import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { auth, isDatabaseConfigured } from '@/lib/auth/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json({ error: 'Database service not available.' }, { status: 503 });
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    // Always fetch profile using the verified server session userId (never client-supplied)
    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
    });

    return NextResponse.json({
      success: true,
      profile: profile || {
        userId: session.user.id,
        fullName: session.user.name,
        companyName: null,
        jobTitle: null,
        avatarUrl: null,
      },
    });
  } catch (error) {
    console.error('[Profile API GET Error]:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Failed to retrieve profile data.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json({ error: 'Database service not available.' }, { status: 503 });
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // 1. Strict Server-Side Authentication
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
    }

    // 2. Strict Input Validation & Sanitization
    const { fullName, companyName, jobTitle } = body;

    let sanitizedName: string | undefined = undefined;
    if (fullName !== undefined) {
      if (typeof fullName !== 'string' || fullName.trim().length < 2 || fullName.trim().length > 100) {
        return NextResponse.json(
          { error: 'Full name must be between 2 and 100 characters.' },
          { status: 400 }
        );
      }
      sanitizedName = fullName.trim();
    }

    const sanitizedCompany =
      companyName !== undefined
        ? typeof companyName === 'string' && companyName.trim().length > 0
          ? companyName.trim().slice(0, 100)
          : null
        : undefined;

    const sanitizedJobTitle =
      jobTitle !== undefined
        ? typeof jobTitle === 'string' && jobTitle.trim().length > 0
          ? jobTitle.trim().slice(0, 100)
          : null
        : undefined;

    // 3. Enforce Ownership: Update strictly where userId = session.user.id
    const updatedProfile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        ...(sanitizedName !== undefined && { fullName: sanitizedName }),
        ...(sanitizedCompany !== undefined && { companyName: sanitizedCompany }),
        ...(sanitizedJobTitle !== undefined && { jobTitle: sanitizedJobTitle }),
      },
      create: {
        userId: session.user.id,
        fullName: sanitizedName || session.user.name,
        companyName: sanitizedCompany || null,
        jobTitle: sanitizedJobTitle || null,
      },
    });

    // Keep User name in sync if updated
    if (sanitizedName && sanitizedName !== session.user.name) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { name: sanitizedName },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully.',
      profile: updatedProfile,
    });
  } catch (error) {
    console.error('[Profile API PATCH Error]:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Failed to update profile.' }, { status: 500 });
  }
}
