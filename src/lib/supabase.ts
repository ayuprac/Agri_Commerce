import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yvdqytdrambgsvxdkncz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2ZHF5dGRyYW1iZ3N2eGRrbmN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NjEwMTQsImV4cCI6MjA5NjEzNzAxNH0.1JqYcPRFgh5NSHnOdgJu2YTR_bX9X-emCfmNREwFjIU'; // Replace with your actual anon key from Supabase

// Log to verify initialization
console.log('Initializing Supabase client with URL:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test the connection
supabase.from('products').select('count', { count: 'exact', head: true })
  .then(({ count, error }) => {
    if (error) {
      console.error('Supabase connection error:', error);
    } else {
      console.log('Supabase connected successfully. Products count:', count);
    }
  });