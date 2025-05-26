from pydantic import BaseModel
from typing import Optional

class JudgeRequest(BaseModel):
    source_code: str
    language_id: int
    stdin: str

class JudgeResponse(BaseModel):
    stdout: str
    stderr: str
    status: dict
    time: Optional[str]
    memory: Optional[int]
