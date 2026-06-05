/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { supabase } from '../../../lib/supabase/client';
import type { User, LoginCredentials, RegisterCredentials, Profile } from '../types/auth.type';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  login: (credentials: LoginCredentials) => Promise<{ error: string | null }>;
  register: (credentials: RegisterCredentials) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<{ error: string | null }>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (credentials) => {
    set({ isLoading: true });
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      set({ isLoading: false, isAuthenticated: false });
      return { error: error.message };
    }

    if (data.user) {
      await get().loadUser();
      set({ isLoading: false, isAuthenticated: true });
      return { error: null };
    }

    set({ isLoading: false });
    return { error: 'Login failed' };
  },

  register: async (credentials) => {
    set({ isLoading: true });

    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          full_name: credentials.full_name,
          phone: credentials.phone,
        },
      },
    });

    if (error) {
      set({ isLoading: false });
      return { error: error.message };
    }

    if (data.user) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await get().loadUser();
      set({ isLoading: false, isAuthenticated: true });
      return { error: null };
    }

    set({ isLoading: false });
    return { error: 'Registration failed' };
  },

  logout: async () => {
    set({ isLoading: true });
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  loadUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      set({ user: null, isAuthenticated: false, isLoading: false });
      return;
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single() as { data: Profile | null, error: null | { message: string } };

    if (error || !profile) {
      console.error('Error loading profile:', error);
      set({ isLoading: false });
      return;
    }

    set({
      user: {
        id: user.id,
        email: user.email!,
        full_name: profile.full_name || user.email!,
        phone: profile.phone || undefined,
        role: profile.role || 'customer',
        avatar_url: profile.avatar_url || undefined,
        shipping_address: profile.shipping_address || undefined,
        billing_address: profile.billing_address || undefined,
        created_at: profile.created_at,
      },
      isAuthenticated: true,
      isLoading: false,
    });
  },

  updateProfile: async (data) => {
    const { user } = get();
    if (!user) return { error: 'No user logged in' };

    set({ isLoading: true });

    const updateData: Record<string, string | object | null> = {
      updated_at: new Date().toISOString(),
    };
    
    if (data.full_name !== undefined) updateData.full_name = data.full_name;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.avatar_url !== undefined) updateData.avatar_url = data.avatar_url;
    if (data.shipping_address !== undefined) updateData.shipping_address = data.shipping_address;
    if (data.billing_address !== undefined) updateData.billing_address = data.billing_address;

    const { error } = await supabase
      .from('profiles')
      // @ts-ignore
.update(updateData)
      .update(updateData as any)
      .eq('id', user.id);

    if (error) {
      set({ isLoading: false });
      return { error: error.message };
    }

    await get().loadUser();
    set({ isLoading: false });
    return { error: null };
  },

  resetPassword: async (email) => {
    set({ isLoading: true });

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    set({ isLoading: false });
    return { error: error ? error.message : null };
  },
}));