# Match-related stuff (match ID, players, problem ID, status)

from pydantic import BaseModel
from typing import List, Optional
from .user import UserPublic

class MatchCreateRequest(BaseModel):
    user_id: str

class Match(BaseModel):
    match_id: str
    player1: UserPublic
    player2: Optional[UserPublic]  # If not matched yet
    problem_id: Optional[str]
    status: str  # pending, active, finished
    time_limit: int  # seconds
