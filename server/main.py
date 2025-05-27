from fastapi import FastAPI
from routers import match_socket, judge
from routers import user, match, submission

app = FastAPI()

# Register routes
# app.include_router(user.router, prefix="/users", tags=["Users"])
app.include_router(match.router, prefix="/match", tags=["Match"])
# app.include_router(submission.router, prefix="/submission", tags=["Submission"])
app.include_router(judge.router, prefix="/judge", tags=["Judge"])
app.include_router(match_socket.router)

@app.get("/ping")
def ping():
    return {"message": "pong"}
