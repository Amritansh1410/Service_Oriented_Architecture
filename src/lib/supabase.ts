import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://edjrftqtnoakmvpeabqm.supabase.co';
const supabaseAnonKey = 'sb_publishable_1CzYTGyuuCl0gofBkZNKfA_nXctZhwm';
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
