from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
import uuid
from .auth import get_user
from .plugin_manager import PluginManager
from .llm_adapter import LLMSandbox
from . import mock_api

app = FastAPI(title="Agent Service")
app.include_router(mock_api.router)

# Enable CORS for frontend dev servers (adjust in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock DB
users_db = {
    "alice": {"subscription": "premium", "quota": 100, "tasks_used": 42, "history": []},
    "bob":   {"subscription": "basic", "quota": 10,  "tasks_used": 9,  "history": []}
}

TASK_PRICE = 0.10


class UserModel(BaseModel):
    username: str


class TaskRequest(BaseModel):
    instruction: str
    device_id: str
    parameters: Optional[Dict[str, Any]] = {}


@app.post("/api/v1/execute")
def execute_task(req: TaskRequest, request: Request, user=Depends(get_user)):
    # user is the dict from users_db
    if user["tasks_used"] >= user["quota"]:
        raise HTTPException(status_code=402, detail="Quota exceeded. Upgrade required.")
    user["tasks_used"] += 1
    task_id = str(uuid.uuid4())
    record = {"task_id": task_id, "instruction": req.instruction}
    user["history"].append(record)
    return {"task_id": task_id, "status": "queued", "msg": f"1 task charged (${TASK_PRICE:.2f} if pay-per-use)"}


@app.post("/api/v1/subscription/upgrade")
def upgrade(request: Request, user=Depends(get_user)):
    user["subscription"] = "premium"
    user["quota"] = 100
    return {"status": "upgraded", "quota": user["quota"]}


@app.get("/api/v1/user/history")
def history(request: Request, user=Depends(get_user)):
    return {"history": user.get("history", [])}


# Natural language endpoint using a pluggable LLM adapter
@app.post("/api/v1/nl/execute")
def nl_execute(payload: Dict[str, Any], request: Request, user=Depends(get_user)):
    query = payload.get("query")
    if not query:
        raise HTTPException(status_code=400, detail="Missing 'query' in body")
    llm = LLMSandbox()
    structured = llm.parse_to_task(query)
    # validate structured has the fields for TaskRequest
    try:
        task = TaskRequest(**structured)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM returned invalid task: {e}")
    return execute_task(task, request, user)


@app.get("/api/v1/plugins")
def list_plugins():
    pm = PluginManager()
    return {"plugins": [p.metadata for p in pm.discover_plugins()]}


@app.post("/api/v1/plugins/run/{plugin_name}")
def run_plugin(plugin_name: str, payload: Dict[str, Any], request: Request, user=Depends(get_user)):
    pm = PluginManager()
    result = pm.run_plugin(plugin_name, payload)
    if not result.get("success"):
        raise HTTPException(status_code=404, detail=result.get("msg"))
    return result
