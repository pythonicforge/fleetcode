from typing import Dict, List, Optional
from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, match_id: str, websocket: WebSocket):
        await websocket.accept()
        if match_id not in self.active_connections:
            self.active_connections[match_id] = []
        self.active_connections[match_id].append(websocket)
        print(f"WebSocket connected: match_id={match_id}, total_connections={len(self.active_connections[match_id])}")
        return len(self.active_connections[match_id])

    def disconnect(self, match_id: str, websocket: WebSocket):
        self.active_connections[match_id].remove(websocket)
        print(f"WebSocket disconnected: match_id={match_id}, remaining_connections={len(self.active_connections[match_id])}")
        if not self.active_connections[match_id]:
            del self.active_connections[match_id]

    async def broadcast(self, match_id: str, message: dict, sender: Optional[WebSocket] = None):
        print(f"Broadcasting message to match_id={match_id}: {message}")
        for connection in self.active_connections.get(match_id, []):
            if connection != sender:
                await connection.send_json(message)

