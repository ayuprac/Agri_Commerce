import { createClient } from '@supabase/supabase-js';
import { env } from '../../config/env';
import type { Database } from './types';

class SupabaseClient {
  private static instance: ReturnType<typeof createClient<Database>>;
  
  static getInstance() {
    if (!this.instance) {
      this.instance = createClient<Database>(
        env.supabase.url,
        env.supabase.anonKey,
        {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
          },
          db: {
            schema: 'public',
          },
        }
      );
    }
    return this.instance;
  }
}

export const supabase = SupabaseClient.getInstance();