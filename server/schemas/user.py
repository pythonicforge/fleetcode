# Basic info for users (ID, username, rating)

from pydantic import BaseModel

class UserBase(BaseModel):
    id: str  # Supabase UUID
    username: str
    rating: int

class UserInDB(UserBase):
    email: str  # Optional, if you need it later

class UserPublic(UserBase):
    pass  # Could hide email if needed
