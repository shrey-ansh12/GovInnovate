import { createClient } from "@supabase/supabase-js";

// Read Supabase environment variables if configured, fallback gracefully to mock sandbox
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy-govinnovate.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
