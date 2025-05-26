# Request/response models for talking to Judge0

from pydantic import BaseModel
from typing import Optional

class JudgeRequest(BaseModel):
    source_code: str
    language_id: int  # Judge0 language IDs
    stdin: str

class JudgeResponse(BaseModel):
    stdout: str
    stderr: str
    status: dict
    time: Optional[str]
    memory: Optional[int]
