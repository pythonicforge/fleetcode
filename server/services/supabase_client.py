from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = "https://mhzzqnwqfrysmmhwcwdq.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oenpxbndxZnJ5c21taHdjd2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMzk0NDcsImV4cCI6MjA2MTkxNTQ0N30.O-OdOrR-1TlDQWEQWzX4f9uIT__Lvh23RGHtZ843_kM"

if not SUPABASE_URL or not SUPABASE_KEY:
	raise ValueError("SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in the environment variables.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
