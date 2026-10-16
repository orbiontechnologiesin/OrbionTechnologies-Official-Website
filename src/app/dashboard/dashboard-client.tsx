'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth/client';
import { Button } from '@/components/ui';
import { LogOut, Loader2 } from 'lucide-react';

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await authClient.signOut();
      router.push('/auth/sign-in');
      router.refresh();
    } catch (err) {
      console.error('Sign out error:', err);
      router.push('/auth/sign-in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      disabled={loading}
      onClick={handleSignOut}
      className="gap-2 text-xs font-mono"
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <LogOut className="w-3.5 h-3.5 text-text-muted" />
      )}
      <span>Sign Out</span>
    </Button>
  );
}
