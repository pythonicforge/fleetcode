from schemas.match import Match
from schemas.user import UserPublic
from services.supabase_client import supabase
import uuid
import asyncio
import threading  # Added for thread safety

# Global variables with thread safety measures
waiting_queue = {}
waiting_queue_lock = threading.Lock()
RATING_RANGE = 200
RATING_RANGE_FALLBACK = 400  # Wider range if no problems found initially

async def get_user_by_id(user_id: str) -> UserPublic:
    """Fetch user profile with error handling"""
    try:
        data = supabase.table("profiles").select("*").eq("id", user_id).single().execute().data
        return UserPublic(**data)
    except Exception as e:
        print(f"Error fetching user {user_id}: {str(e)}")
        raise

async def assign_problem_to_match(match_id: str, p1_rating: int, p2_rating: int) -> tuple[str, str]:
    """Select a problem within players' rating range with fallback logic"""
    min_r = min(p1_rating, p2_rating)
    max_r = max(p1_rating, p2_rating)
    
    def query_problems(min_rating, max_rating):
        """Helper function to query problems within a rating range"""
        return (
            supabase.table("problems")
            .select("*")
            .gte("max_rating", min_rating)
            .lte("min_rating", max_rating)
            .limit(10)
            .execute()
        )
    
    # Try initial rating range
    result = query_problems(min_r - RATING_RANGE, max_r + RATING_RANGE)
    problems = result.data
    
    # If no problems found, try wider range
    if not problems:
        print(f"No problems in initial range. Trying wider range...")
        result = query_problems(min_r - RATING_RANGE_FALLBACK, max_r + RATING_RANGE_FALLBACK)
        problems = result.data
        if not problems:
            raise Exception("No suitable problem found even with wider rating range.")

    # Random selection from available problems
    import random
    problem = random.choice(problems)
    print(f"Selected problem {problem['id']} with difficulty {problem['difficulty']}")
    
    return problem["id"], problem["difficulty"]

async def find_match(user_id: str) -> Match | None:
    """Find a match for user with thread-safe queue operations"""
    try:
        user = await get_user_by_id(user_id)
        user_rating = user.rating
        print(f"User {user_id} with rating {user_rating} is looking for a match.")

        # Thread-safe queue operations
        with waiting_queue_lock:
            # Check for opponents in queue
            for opponent_id, opponent_rating in list(waiting_queue.items()):  # Create a copy for iteration
                print(f"Checking opponent {opponent_id} with rating {opponent_rating}.")
                
                # Match found condition
                if abs(opponent_rating - user_rating) <= RATING_RANGE and opponent_id != user_id:
                    opponent = await get_user_by_id(opponent_id)
                    del waiting_queue[opponent_id]  # Remove matched opponent
                    
                    # Create match
                    match_id = str(uuid.uuid4())
                    print(f"Match found: {user_id} vs {opponent_id}, match_id: {match_id}")

                    # Assign problem and determine time limit
                    problem_id, problem_type = await assign_problem_to_match(
                        match_id, user.rating, opponent.rating
                    )
                    
                    # Set time limit based on problem difficulty
                    time_limit = {
                        "Easy": 900,
                        "Medium": 1800,
                        "Hard": 2700
                    }.get(problem_type, 600)  # Default to 10 minutes
                    
                    # Prepare match data
                    match_data = {
                        "match_id": match_id,
                        "player1_id": user.id,
                        "player2_id": opponent.id,
                        "status": "active",
                        "problem_id": problem_id, 
                        "time_limit": time_limit,
                    }

                    # Save to database
                    print(f"Saving match data to database: {match_data}")
                    supabase.table("matches").insert(match_data).execute()

                    return Match(
                        match_id=match_id,
                        player1=user,
                        player2=opponent,
                        problem_id=problem_id,
                        status="active",
                        time_limit=time_limit
                    )

            # No match found - add to queue
            print(f"No match found for user {user_id}. Adding to waiting queue.")
            waiting_queue[user_id] = user_rating
            return None
            
    except Exception as e:
        print(f"Error in find_match for user {user_id}: {str(e)}")
        raise