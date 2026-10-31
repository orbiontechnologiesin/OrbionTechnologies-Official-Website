import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

import { PrismaClient } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

const prisma = new PrismaClient();

async function inspectVerification() {
  const testEmail = `inspect.verify.${Date.now()}@orbiontechnologies.in`;

  let capturedToken = null;
  let capturedUrl = null;

  const auth = betterAuth({
    database: prismaAdapter(prisma, { provider: 'postgresql' }),
    baseURL: 'http://localhost:3000',
    secret: process.env.BETTER_AUTH_SECRET || 'e88fbf1aca7bc1cfe9435a58837302e762884fa39429fda7e7292e691618567e',
    emailVerification: {
      sendOnSignUp: true,
      sendVerificationEmail: async ({ user, url, token }) => {
        capturedToken = token;
        capturedUrl = url;
        console.log('sendVerificationEmail hook payload:', { userEmail: user.email, token, url });
      },
    },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
    },
  });

  const reg = await auth.api.signUpEmail({
    body: {
      email: testEmail,
      password: 'TestPassword123!',
      name: 'Verification Inspector',
    },
  });

  console.log('Registration result user:', reg?.user?.id);

  const allVerifications = await prisma.verification.findMany();
  console.log('All records in verification table:', JSON.stringify(allVerifications, null, 2));

  // Clean up
  if (reg?.user?.id) {
    await prisma.session.deleteMany({ where: { userId: reg.user.id } });
    await prisma.account.deleteMany({ where: { userId: reg.user.id } });
    await prisma.profile.deleteMany({ where: { userId: reg.user.id } });
    await prisma.verification.deleteMany({});
    await prisma.user.delete({ where: { id: reg.user.id } });
  }

  await prisma.$disconnect();
}

inspectVerification().catch(console.error);
