from fastapi import APIRouter
from schemas.judge import JudgeRequest, JudgeResponse
from services.judge_client import run_python_code

router = APIRouter()

@router.post("/submit", response_model=JudgeResponse)
async def submit_code(payload: JudgeRequest):
    result = run_python_code(payload.source_code, payload.stdin)
    return result
