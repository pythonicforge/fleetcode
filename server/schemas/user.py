# Basic info for users (ID, username, rating)

from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    id: str  # Supabase UUID
    username: str
    rating: int
    avatar_url: Optional[str] = None
    created_at: str

class UserInDB(UserBase):
    email: str  # Optional, if you need it later

class UserPublic(UserBase):
    pass  # Could hide email if needed
