import { createClient } from '@supabase/supabase-js';

// env variables check if they exist or use fallback for dev
const getProcessEnv = (key: string) => {
    if (typeof process !== 'undefined' && process.env) return process.env[key];
    return (globalThis as any)?._env_?.[key] || '';
};

const supabaseUrl = getProcessEnv('NEXT_PUBLIC_SUPABASE_URL') || 'https://eijrwtytwuyvgozxqlpq.supabase.co';
const supabaseAnonKey = getProcessEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY') || 'sb_publishable_WRQJNoxFgPVssOfv0SX7Pg_UVsyyPx1';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
