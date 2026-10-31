import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@/lib/prisma';
import { sendEmailVerification, sendPasswordResetEmail } from '@/lib/email';

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim().length > 0);
}

const siteUrl =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://orbiontechnologies.in';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  baseURL: siteUrl,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://orbiontechnologies.in',
    'https://www.orbiontechnologies.in',
  ],
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          try {
            await prisma.profile.upsert({
              where: { userId: user.id },
              update: { fullName: user.name },
              create: {
                userId: user.id,
                fullName: user.name,
              },
            });
          } catch (e) {
            console.error('[Auth Hook] Failed to initialize profile:', e);
          }
        },
      },
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour token expiration
    sendVerificationEmail: async ({ user, url, token }) => {
      let verificationUrl = url;
      try {
        const parsedUrl = new URL(url);
        // Ensure callbackURL routes to the dedicated verification results experience
        if (!parsedUrl.searchParams.has('callbackURL') || parsedUrl.searchParams.get('callbackURL') === '/') {
          parsedUrl.searchParams.set('callbackURL', `${siteUrl}/auth/verify?status=success`);
        }
        verificationUrl = parsedUrl.toString();
      } catch {
        verificationUrl = url;
      }

      await sendEmailVerification({
        to: user.email,
        name: user.name,
        verificationUrl,
      });
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    sendResetPassword: async ({ user, url, token }) => {
      await sendPasswordResetEmail({
        to: user.email,
        name: user.name,
        resetUrl: url,
      });
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes cache
    },
    expiresIn: 60 * 60 * 24 * 7, // 7 days session
    updateAge: 60 * 60 * 24, // 1 day
  },
});

export type Auth = typeof auth;
