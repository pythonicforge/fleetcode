from pydantic import BaseModel

class CodeSubmission(BaseModel):
    user_id: str
    match_id: str
    language: str
    code: str

class SubmissionResult(BaseModel):
    status: str
    time: float
    memory: int
    output: str
    passed_test_cases: int
    total_test_cases: int
