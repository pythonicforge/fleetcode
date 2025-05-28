from fastapi import APIRouter
from schemas.submission import CodeSubmission, SubmissionResult
from services.judge_client import run_python_code
from services.supabase_client import get_problem_by_match_id  
import ast

router = APIRouter()

@router.post("/submit", response_model=SubmissionResult)
async def submit_code(payload: CodeSubmission):
    problem = get_problem_by_match_id(payload.match_id)
    testcases = problem["testcases"]  

    total = len(testcases)
    passed = 0
    output_log = ""

    for case in testcases:
        result = run_python_code(payload.code, str(case["input"]))

        # Debug: see raw result
        print(result)

        # Try parsing actual output as Python object (list), else fallback to raw string
        try:
            actual = ast.literal_eval((result.get("stdout") or "").strip())
        except:
            actual = (result.get("stdout") or "").strip()

        expected = case["output"]

        if actual == expected:
            passed += 1
            output_log += f"✅ {case['input']} → {actual} == {expected}\n"
        else:
            output_log += f"❌ {case['input']} → {actual} != {expected}\n"

    return SubmissionResult(
        status="Accepted" if passed == total else "Failed",
        time=float(result.get("time") or 0),
        memory=int(result.get("memory") or 0),
        output=output_log,
        passed_test_cases=passed,
        total_test_cases=total
    )



