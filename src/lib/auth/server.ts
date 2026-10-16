import { createClient, isSupabaseConfigured } from '@/lib/supabase/server';

export { isSupabaseConfigured };

export const auth = {
  getSession: async () => {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return { session: null, user: null };
    }
    const { data: { session } } = await supabase.auth.getSession();
    return { session, user };
  },

  getUser: async () => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  signOut: async () => {
    const supabase = await createClient();
    return await supabase.auth.signOut();
  },
};
