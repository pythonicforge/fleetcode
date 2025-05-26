## Step 1: POST /match/find (in match.py)
> This is called when a user clicks “Find Match”

Flow:

[ ] Frontend sends user ID.

[ ] Backend fetches user’s rating from Supabase.

[ ] Puts them in a “waiting queue”.

[ ] Checks if any player already in queue is close in rating.

[ ] If match found → create match in DB, return match ID.

[ ] If not → hold them in queue and respond with "waiting".

