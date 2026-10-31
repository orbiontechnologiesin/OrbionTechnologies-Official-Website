import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

import { PrismaClient } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

const prisma = new PrismaClient();

async function testVerifyEmail() {
  const testEmail = `jwt.verify.${Date.now()}@orbiontechnologies.in`;

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
      name: 'JWT Tester',
    },
  });

  console.log('Registered user ID:', reg?.user?.id);
  console.log('Captured Token:', capturedToken);

  // Now verify with captured token
  const verifyResponse = await auth.api.verifyEmail(
    {
      query: {
        token: capturedToken,
        callbackURL: 'http://localhost:3000/auth/verify?status=success',
      },
    },
    { asResponse: true }
  );

  console.log('Verify response status:', verifyResponse.status);
  console.log('Verify response location:', verifyResponse.headers.get('Location'));

  const userAfter = await prisma.user.findUnique({
    where: { email: testEmail },
  });
  console.log('User emailVerified after verify:', userAfter?.emailVerified);

  // Now test login with newly verified user
  const loginRes = await auth.api.signInEmail({
    body: {
      email: testEmail,
      password: 'TestPassword123!',
    },
  });
  console.log('Login successful for verified user?', Boolean(loginRes?.user));

  // Clean up
  await prisma.session.deleteMany({ where: { userId: reg.user.id } });
  await prisma.account.deleteMany({ where: { userId: reg.user.id } });
  await prisma.profile.deleteMany({ where: { userId: reg.user.id } });
  await prisma.user.delete({ where: { id: reg.user.id } });

  await prisma.$disconnect();
}

testVerifyEmail().catch(console.error);
