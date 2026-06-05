import { supabase } from './lib/supabase/client';

async function testConnection() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(5);
  
  if (error) {
    console.error('Database error:', error);
  } else {
    console.log('Connected! Products:', data);
  }
}

testConnection();