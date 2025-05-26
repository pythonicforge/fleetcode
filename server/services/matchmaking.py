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

async def assign_problem_to_match(match_id: str, p1_rating: int, p2_rating: int) -> tuple[str, str]:
    min_r = min(p1_rating, p2_rating)
    max_r = max(p1_rating, p2_rating)

    # Get 1 random problem where problem.min_rating <= min_r and problem.max_rating >= max_r
    result = (
        supabase.table("problems")
        .select("*")
        .lte("min_rating", min_r)
        .gte("max_rating", max_r)
        .limit(10)  # Grab 10 and choose randomly from them
        .execute()
    )

    problems = result.data
    if not problems:
        raise Exception("No suitable problem found.")

    import random
    problem = random.choice(problems)

    return problem["id"], problem["difficulty"]

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

            problem_id, problem_type = await assign_problem_to_match(match_id, user.rating, opponent.rating)

            time_limit = 600  # Default time limit
            if problem_type == "Easy":
                time_limit = 900
            elif problem_type == "Medium":
                time_limit = 1800
            elif problem_type == "Hard":
                time_limit = 2700
            
            match_data = {
                "match_id": match_id,
                "player1_id": user.id,
                "player2_id": opponent.id,
                "status": "active",
                "problem_id": problem_id, 
                "time_limit": time_limit,
            }

            supabase.table("matches").insert(match_data).execute()

            return Match(
                match_id=match_id,
                player1=user,
                player2=opponent,
                problem_id=problem_id,
                status="active",
                time_limit=time_limit
            )

    # If no match, add to queue
    waiting_queue[user_id] = user_rating
    return None
