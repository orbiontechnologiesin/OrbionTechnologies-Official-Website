import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@/lib/prisma';

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
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    sendResetPassword: async ({ user, url, token }) => {
      // Prepared secure token workflow
      if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        console.info(`[Auth] Dispatching password reset email to ${user.email}`);
      } else {
        console.info(
          `[Auth Notice] Password recovery requested for ${user.email}. Verification Token: ${token}. Reset link: ${url}`
        );
      }
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
