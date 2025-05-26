import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://mhzzqnwqfrysmmhwcwdq.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oenpxbndxZnJ5c21taHdjd2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMzk0NDcsImV4cCI6MjA2MTkxNTQ0N30.O-OdOrR-1TlDQWEQWzX4f9uIT__Lvh23RGHtZ843_kM"
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;