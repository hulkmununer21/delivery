import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Gracefully handle missing env vars — the app renders, but auth calls will fail gracefully
const hasCredentials = Boolean(supabaseUrl && supabaseAnonKey);

if (!hasCredentials) {
  console.warn(
    '⚠️  Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.\n' +
    '   The app will render but authentication features will not work.\n' +
    '   Create a .env file with these values to enable full functionality.',
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
);

export { hasCredentials };