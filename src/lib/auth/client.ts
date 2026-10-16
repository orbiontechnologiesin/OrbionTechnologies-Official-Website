'use client';

import { useState, useEffect } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

export const supabase = createClient();

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function initSession() {
      try {
        const { data } = await supabase.auth.getSession();
        if (mounted) {
          setSession(data.session);
          setUser(data.session?.user ?? null);
          setLoading(false);
        }
      } catch {
        if (mounted) {
          setSession(null);
          setUser(null);
          setLoading(false);
        }
      }
    }

    initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (mounted) {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return {
    data: session && user ? { session, user } : null,
    loading,
    session,
    user,
  };
}

export const authClient = {
  signOut: async () => {
    return await supabase.auth.signOut();
  },
  getSession: async () => {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },
  getUser: async () => {
    const { data } = await supabase.auth.getUser();
    return data.user;
  },
};
