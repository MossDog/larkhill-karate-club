import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/lib/database.types";
import { requireSupabaseEnv } from "@/utils/supabase/env";

export function createClient() {
  const { supabasePublishableKey, supabaseUrl } = requireSupabaseEnv();

  return createBrowserClient<Database>(supabaseUrl, supabasePublishableKey);
}
