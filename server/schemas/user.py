from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    id: str
    username: str
    rating: int
    avatar_url: Optional[str] = None
    created_at: str

class UserInDB(UserBase):
    email: str

class UserPublic(UserBase):
    pass
