import { createClient } from '@supabase/supabase-js'

let cachedClient

function getSupabaseEnvironment() {
  const supabaseUrl = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl) {
    throw new Error('Missing SUPABASE_URL in environment variables.')
  }

  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY in environment variables.')
  }

  return { supabaseUrl, serviceRoleKey }
}

export function getSupabaseClient() {
  // During test discovery env vars may be missing; avoid throwing on import.
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return null
  }

  if (!cachedClient) {
    const { supabaseUrl, serviceRoleKey } = getSupabaseEnvironment()
    cachedClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })
  }

  return cachedClient
}

export function resetSupabaseClientForTests() {
  cachedClient = undefined
}


