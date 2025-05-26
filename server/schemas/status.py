from pydantic import BaseModel

class StatusUpdate(BaseModel):
    type: str
    user_id: str
    status: str
