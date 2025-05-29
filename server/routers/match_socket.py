from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from utils.connection_manager import ConnectionManager
from services.supabase_client import supabase
from schemas.match import Match
from schemas.status import StatusUpdate
import asyncio
import json

router = APIRouter()
manager = ConnectionManager()

async def get_match_by_id(match_id: str) -> Match:
    """Fetch match details with validation"""
    try:
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
        
        # Validate required fields
        required_fields = {"match_id", "time_limit", "player1_id", "player2_id"}
        missing_fields = required_fields - data.keys()
        if missing_fields:
            raise ValueError(f"Missing required fields in match data: {missing_fields}")
            
        return Match(**data)
    except Exception as e:
        print(f"Error fetching match {match_id}: {str(e)}")
        raise

async def start_timer(match_id: str):
    """Countdown timer with WebSocket updates"""
    try:
        match = await get_match_by_id(match_id)
        print(f"Starting timer for match {match_id}, duration: {match.time_limit}s")
        
        for i in range(match.time_limit, -1, -1):
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
                # Update match status in database
                supabase.table("matches").update({"status": "completed"}).eq("match_id", match_id).execute()
    except Exception as e:
        print(f"Error in timer for match {match_id}: {str(e)}")

@router.websocket("/ws/match/{match_id}")
async def websocket_endpoint(websocket: WebSocket, match_id: str):
    """WebSocket endpoint for match communication with improved error handling"""
    await websocket.accept()  # Explicitly accept the connection
    
    try:
        # Wait for initialization message
        init_data = await websocket.receive_json()
        if init_data.get("type") != "connection_init":
            await websocket.close(code=1003)  # Close with "unacceptable data" code
            return
            
        user_id = init_data.get("user_id")
        if not user_id:
            await websocket.close(code=1003)
            return

        # Register connection
        count = await manager.connect(match_id, websocket)
        print(f"WebSocket connection for match {match_id} (user {user_id}), total connections: {count}")

        # Start timer when both players connect
        if count == 2:
            print(f"Both players connected for match {match_id}, starting timer")
            asyncio.create_task(start_timer(match_id))

        # Message handling loop
        while True:
            try:
                data = await websocket.receive_json()
                print(f"Received message for match {match_id}: {data}")
                
                # Handle different message types
                msg_type = data.get("type")
                if msg_type == "status_update":
                    status = StatusUpdate(**data)
                    await manager.broadcast(match_id, {
                        "type": "status_update",
                        "user_id": status.user_id,
                        "status": status.status
                    })
                else:
                    # Broadcast other messages to all participants
                    await manager.broadcast(match_id, data, sender=websocket)
                    
            except json.JSONDecodeError:
                print(f"Invalid JSON received in match {match_id}")
                await websocket.send_json({
                    "type": "error",
                    "message": "Invalid JSON format"
                })
            except Exception as e:
                print(f"Error processing message in match {match_id}: {str(e)}")
                await websocket.send_json({
                    "type": "error",
                    "message": f"Error processing message: {str(e)}"
                })
                
    except WebSocketDisconnect:
        print(f"WebSocket disconnected for match {match_id}")
        manager.disconnect(match_id, websocket)
    except Exception as e:
        print(f"Error in WebSocket for match {match_id}: {str(e)}")
        try:
            await websocket.close(code=1011)  # Close with "internal error" code
        except:
            pass
        manager.disconnect(match_id, websocket)