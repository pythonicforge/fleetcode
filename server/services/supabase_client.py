from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
	raise ValueError("SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in the environment variables.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def get_problem_by_match_id(match_id: str):
    match = supabase.table("matches").select("*").eq("match_id", match_id).single().execute().data
    if not match:
        raise Exception("Match not found")

    problem_id = match["problem_id"]
    problem = supabase.table("problems").select("*").eq("id", problem_id).single().execute().data

    return problem

