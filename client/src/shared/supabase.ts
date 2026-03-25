import { createClient } from '@supabase/supabase-js';

// Static access is required for Next.js to bundle these on the client side
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eijrwtytwuyvgozxqlpq.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_WRQJNoxFgPVssOfv0SX7Pg_UVsyyPx1';

// Detailed error logging for debugging
if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
  console.warn('Supabase URL is missing or invalid. Check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
