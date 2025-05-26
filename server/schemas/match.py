from pydantic import BaseModel
from typing import Optional
from .user import UserPublic

class MatchCreateRequest(BaseModel):
    user_id: str

class Match(BaseModel):
    match_id: str
    player1: Optional[UserPublic] = None
    player2: Optional[UserPublic] = None
    problem_id: Optional[str] = None
    status: str
    time_limit: int
