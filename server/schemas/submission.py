# Code submission schema (user ID, code, verdict)

from pydantic import BaseModel

class CodeSubmission(BaseModel):
    user_id: str
    match_id: str
    language: str
    code: str

class SubmissionResult(BaseModel):
    status: str  # Accepted, Wrong Answer, etc.
    time: float
    memory: int
    output: str
    passed_test_cases: int
    total_test_cases: int
