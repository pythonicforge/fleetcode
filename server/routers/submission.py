from fastapi import APIRouter
from schemas.submission import CodeSubmission, SubmissionResult
from services.judge_client import submit_and_get_result
from services.supabase_client import get_problem_by_match_id  # You'll use this to fetch test cases

router = APIRouter()

@router.post("/submit", response_model=SubmissionResult)
async def submit_code(payload: CodeSubmission):
    problem = get_problem_by_match_id(payload.match_id)
    test_cases = problem["test_cases"]  # [{input: "...", output: "..."}, ...]

    passed = 0
    output_log = ""

    for case in test_cases:
        result = submit_and_get_result(payload.code, case["input"])

        actual = (result.get("stdout") or "").strip()
        expected = case["output"].strip()

        if actual == expected:
            passed += 1

        output_log += f"✅ {case['input']} → {actual} == {expected}\n" if actual == expected else f"❌ {case['input']} → {actual} != {expected}\n"

    return SubmissionResult(
        status="Accepted" if passed == len(test_cases) else "Failed",
        time=float(result.get("time") or 0),
        memory=result.get("memory") or 0,
        output=output_log,
        passed_test_cases=passed,
        total_test_cases=len(test_cases)
    )
