import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON as string,
  { auth: { persistSession: false } }
);

export { supabase };
