from fastapi import FastAPI, HTTPException, Depends, Request
from pydantic import BaseModel
from typing import List, Optional
import uuid

app = FastAPI()

# Mock DB
users_db = {
    "alice": {"subscription": "premium", "quota": 100, "tasks_used": 42},
    "bob":   {"subscription": "basic", "quota": 10,  "tasks_used": 9}
}
TASK_PRICE = 0.10

class User(BaseModel):
    username: str

class TaskRequest(BaseModel):
    instruction: str
    device_id: str
    parameters: Optional[dict] = {}

def get_user(request: Request):
    username = request.headers.get("x-username")
    if not username or username not in users_db:
        raise HTTPException(status_code=401, detail="Invalid user")
    return users_db[username]

@app.post("/api/v1/execute")
def execute_task(req: TaskRequest, user = Depends(get_user)):
    if user['tasks_used'] >= user['quota']:
        raise HTTPException(status_code=402, detail="Quota exceeded. Upgrade required.")
    user['tasks_used'] += 1
    task_id = str(uuid.uuid4())
    return {
        "task_id": task_id,
        "status": "queued",
        "msg": f"1 task charged (${TASK_PRICE:.2f} if pay-per-use)"
    }

@app.post("/api/v1/subscription/upgrade")
def upgrade(user = Depends(get_user)):
    user['subscription'] = "premium"
    user['quota'] = 100
    return {"status": "upgraded", "quota": user['quota']}
