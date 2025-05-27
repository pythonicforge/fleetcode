import subprocess

def run_python_code(source_code: str, stdin: str = ""):
    try:
        # Run python code with subprocess, pass stdin, capture stdout/stderr
        proc = subprocess.run(
            ["python3", "-c", source_code],
            input=stdin.encode("utf-8"),
            capture_output=True,
            timeout=5  # seconds limit to avoid infinite loops
        )
        return {
            "stdout": proc.stdout.decode("utf-8"),
            "stderr": proc.stderr.decode("utf-8"),
            "returncode": proc.returncode,
        }
    except subprocess.TimeoutExpired:
        return {
            "stdout": "",
            "stderr": "Error: Code execution timed out",
            "returncode": -1,
        }
    except Exception as e:
        return {
            "stdout": "",
            "stderr": f"Error: {str(e)}",
            "returncode": -1,
        }
