import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// This client uses the service role key — only import in server-side code (API routes).
// Never import this in components or client code.
export const supabase = createClient(supabaseUrl, supabaseServiceKey)
