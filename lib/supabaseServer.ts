import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY!
  
  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error('Missing Supabase server environment variables')
  }
  
  return createClient<Database>(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
