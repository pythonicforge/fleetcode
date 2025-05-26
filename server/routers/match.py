from fastapi import APIRouter, HTTPException
from schemas.match import MatchCreateRequest, Match
from services.matchmaking import find_match

router = APIRouter()

@router.post("/find", response_model=Match)
async def find_match_route(request: MatchCreateRequest):
    match = await find_match(request.user_id)
    if not match:
        raise HTTPException(status_code=202, detail="Waiting for opponent...")
    return match
