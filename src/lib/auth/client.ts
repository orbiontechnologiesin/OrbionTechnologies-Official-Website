'use client';

import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL:
    typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;

export const forgetPassword = async (params: {
  email: string;
  redirectTo?: string;
}): Promise<{ data?: any; error?: { message?: string } | null }> => {
  return await (authClient as any).forgetPassword(params);
};

export const resetPassword = async (params: {
  newPassword: string;
  token: string;
}): Promise<{ data?: any; error?: { message?: string } | null }> => {
  return await (authClient as any).resetPassword(params);
};

export const sendVerificationEmail = async (params: {
  email: string;
  callbackURL?: string;
}): Promise<{ data?: any; error?: { message?: string; code?: string } | null }> => {
  return await (authClient as any).sendVerificationEmail(params);
};

export const verifyEmail = async (params: {
  query: {
    token: string;
  };
}): Promise<{ data?: any; error?: { message?: string; code?: string } | null }> => {
  return await (authClient as any).verifyEmail(params);
};
