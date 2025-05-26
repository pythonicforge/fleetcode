from schemas.match import Match
from schemas.user import UserPublic
from services.supabase_client import supabase
import uuid
import asyncio

# In-memory queue: {user_id: rating}
waiting_queue = {}

RATING_RANGE = 200  # +/- points

async def get_user_by_id(user_id: str) -> UserPublic:
    data = supabase.table("profiles").select("*").eq("id", user_id).single().execute().data
    return UserPublic(**data)

async def find_match(user_id: str) -> Match | None:
    user = await get_user_by_id(user_id)
    user_rating = user.rating

    # Check if someone in queue can be matched
    for opponent_id, opponent_rating in waiting_queue.items():
        if abs(opponent_rating - user_rating) <= RATING_RANGE and opponent_id != user_id:
            # Matched! Remove opponent from queue
            opponent = await get_user_by_id(opponent_id)
            del waiting_queue[opponent_id]

            # Create match object
            match_id = str(uuid.uuid4())
            match_data = {
                "match_id": match_id,
                "player1_id": user.id,
                "player2_id": opponent.id,
                "status": "active",
                "problem_id": str(uuid.uuid1()),  # Pick this later based on rating
                "time_limit": 600,
            }

            # Save match to Supabase
            supabase.table("matches").insert(match_data).execute()

            return Match(
                match_id=match_id,
                player1=user,
                player2=opponent,
                problem_id=None,
                status="active",
                time_limit=600
            )

    # If no match, add to queue
    waiting_queue[user_id] = user_rating
    return None
