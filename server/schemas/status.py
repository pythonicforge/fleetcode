from pydantic import BaseModel

class StatusUpdate(BaseModel):
    type: str  # should be "status_update"
    user_id: str
    status: str  # "thinking", "coding", etc.
