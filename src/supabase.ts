import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

// Supabase client initialization for the DaPathshala app
// We use your provided keys as fallback values to ensure the app works immediately.
// For better security, you can also add these to the Settings > Secrets panel.
export const supabase = createClient(
  supabaseUrl || 'https://omwlgygjbglxmepahdmi.supabase.co', 
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9td2xneWdqYmdseG1lcGFoZG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMzkzNzgsImV4cCI6MjA4ODgxNTM3OH0.1h0ImjEQ2kRCDGL11iTeLq9CjiYtyvniUioNGZhmBs4'
);
