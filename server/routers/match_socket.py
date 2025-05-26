from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from utils.connection_manager import ConnectionManager

router = APIRouter()
manager = ConnectionManager()

@router.websocket("/ws/match/{match_id}")
async def websocket_endpoint(websocket: WebSocket, match_id: str):
    await manager.connect(match_id, websocket)
    try:
        while True:
            data = await websocket.receive_json()
            await manager.broadcast(match_id, data, sender=websocket)
    except WebSocketDisconnect:
        manager.disconnect(match_id, websocket)
