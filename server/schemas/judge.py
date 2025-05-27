from pydantic import BaseModel
from typing import Optional

class JudgeRequest(BaseModel):
    source_code: str
    language_id: int
    stdin: str


class JudgeResponse(BaseModel):
    stdout: Optional[str]
    stderr: Optional[str]
    returncode: Optional[int]
    status: Optional[str] = None
    time: Optional[str] = None
    memory: Optional[str] = None