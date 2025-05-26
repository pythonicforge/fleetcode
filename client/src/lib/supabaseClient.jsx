import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vbrkcolplyrvkfbisrrh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZicmtjb2xwbHlydmtmYmlzcnJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNDEzNzcsImV4cCI6MjA2MzgxNzM3N30.v_2kMzypygvRrhMtLgCaPLE98VThzozPoxOabygRe-U'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
