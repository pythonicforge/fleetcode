from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from utils.connection_manager import ConnectionManager
from services.supabase_client import supabase
from schemas.match import Match
import asyncio

router = APIRouter()
manager = ConnectionManager()

async def get_match_by_id(match_id: str) -> Match:
    data = (
        supabase.table("matches")
        .select("*")
        .eq("match_id", match_id)
        .single()
        .execute()
        .data
    )
    if not data:
        raise ValueError(f"No match found with match_id: {match_id}")
    # Log missing fields for debugging
    required_fields = {"match_id", "time_limit", "player1", "player2"}  # Update as needed
    missing_fields = required_fields - data.keys()
    if missing_fields:
        print(f"Warning: Missing fields in match data: {missing_fields}")
    return Match(**data)


async def start_timer(match_id: str):
    match = await get_match_by_id(match_id)
    print(match)
    duration = match.time_limit
    print(duration)

    for i in range(duration, -1, -1):
        await asyncio.sleep(1)
        await manager.broadcast(match_id, {
            "type": "timer",
            "time_left": i
        })

        if i == 0:
            await manager.broadcast(match_id, {
                "type": "match_end",
                "reason": "timeout"
            })


@router.websocket("/ws/match/{match_id}")
async def websocket_endpoint(websocket: WebSocket, match_id: str):
    count = await manager.connect(match_id, websocket)

    # ✅ Start timer when both players are in
    if count == 2:
        asyncio.create_task(start_timer(match_id))

    try:
        while True:
            data = await websocket.receive_json()
            await manager.broadcast(match_id, data, sender=websocket)
    except WebSocketDisconnect:
        manager.disconnect(match_id, websocket)
