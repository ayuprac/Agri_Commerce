export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: 'customer' | 'admin' | 'inventory_manager';
  avatar_url?: string;
  shipping_address?: Address;
  billing_address?: Address;
  created_at: string;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phone?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: string | null;
}

export type Profile = {
  full_name: string;
  phone: string | null;
  role: 'customer' | 'admin' | 'inventory_manager';
  avatar_url: string | null;
  shipping_address: Address | null;
  billing_address: Address | null;
  created_at: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';