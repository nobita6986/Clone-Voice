import { createClient } from '@supabase/supabase-js'

// TODO: Replace with your project's credentials if these are not correct.
const supabaseUrl = 'https://ghsczvjccuxefuftagjx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdoc2N6dmpjY3V4ZWZ1ZnRhZ2p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxODIyNjEsImV4cCI6MjA3ODc1ODI2MX0.6AYTcz7NPDpJubIU_qaLuIlzvij2RUlbd24mhoybnGE'

if (!supabaseUrl) {
    throw new Error("Supabase URL is not configured. Please update supabaseClient.ts");
}

if (!supabaseAnonKey) {
    throw new Error("Supabase anon key is not configured. Please update supabaseClient.ts");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)