from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from schemas.match import MatchCreateRequest, Match

router = APIRouter()

@router.post("/find", response_model=Match)
async def find_match_route(request: MatchCreateRequest):
    match = await find_match(request.user_id)
    if not match:
        # Return 202 Accepted with JSON message
        return JSONResponse(
            status_code=status.HTTP_202_ACCEPTED,
            content={"message": "Waiting for opponent..."}
        )
    return match.dict()

# from fastapi import APIRouter, HTTPException
# from schemas.match import MatchCreateRequest, Match
# from services.matchmaking import find_match

# router = APIRouter()

# @router.post("/find", response_model=Match)
# async def find_match_route(request: MatchCreateRequest):
#     match = await find_match(request.user_id)
#     if not match:
#         raise HTTPException(status_code=202, detail="Waiting for opponent...")
#     return match
