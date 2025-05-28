from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from utils.connection_manager import ConnectionManager
from services.supabase_client import supabase
from schemas.match import Match
from schemas.status import StatusUpdate
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
    required_fields = {"match_id", "time_limit", "player1", "player2"}
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
    print(f"WebSocket connection established for match_id={match_id}, total_connections={count}")

    if count == 2:
        print(f"Starting timer for match_id={match_id}")
        asyncio.create_task(start_timer(match_id))

    try:
        while True:
            data = await websocket.receive_json()
            print(f"Received WebSocket message for match_id={match_id}: {data}")
            msg_type = data.get("type")
            if msg_type == "status_update":
                status = StatusUpdate(**data)
                await manager.broadcast(match_id, {
                    "type": "status_update",
                    "user_id": status.user_id,
                    "status": status.status
                })
            await manager.broadcast(match_id, data, sender=websocket)
    except WebSocketDisconnect:
        print(f"WebSocket disconnected for match_id={match_id}")
        manager.disconnect(match_id, websocket)
