from pydantic import BaseModel
from typing import Optional
from .user import UserPublic

class MatchCreateRequest(BaseModel):
    user_id: str

class Match(BaseModel):
    match_id: str
    player1: UserPublic
    player2: Optional[UserPublic] = None  # Can be None if no match yet
    problem_id: Optional[str] = None       # Can be None if not assigned yet
    status: str  # pending, active, finished
    time_limit: int  # seconds
