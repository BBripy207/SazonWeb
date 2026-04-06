
import { createClient } from '@supabase/supabase-js'

// In a real project, you'd generate these types from your DB 
// but for now, we'll use 'any' or a basic interface
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
