import asyncio
import json
import random
import time
from fastapi import FastAPI, WebSocket, Request, WebSocketDisconnect
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware
from pathlib import Path

app = FastAPI()
BASE = Path(__file__).resolve().parent

# Allow local frontend
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)

# Memory store for learned episodes
MEMORY_FILE = BASE / "memory.json"
if not MEMORY_FILE.exists():
    MEMORY_FILE.write_text(json.dumps({"episodes": []}, indent=2))

# Serve mock pages directory
app.mount("/static", StaticFiles(directory=str(BASE / "mock_pages")), name="static")

# Simple public mock APIs (no keys)
@app.get("/api/randomuser")
async def random_user():
    sample = {
        "results": [
            {"name": {"title": "Ms", "first": "Jane", "last": "Doe"}, "email": "jane.doe@example.com", "phone": "(555)-555-0101"}
        ]
    }
    return JSONResponse(sample)

@app.get("/api/product/{id}")
async def product(id: int):
    return JSONResponse({
        "id": id,
        "title": "Fjallraven - Foldsack No. 1 Backpack",
        "price": 109.95,
    })

@app.get("/api/exchange")
async def exchange(base: str = "USD"):
    return JSONResponse({"base": base, "rates": {"EUR": 0.92, "CAD": 1.34, "GBP": 0.78}})

@app.post("/api/transactions")
async def create_tx(payload: dict):
    return JSONResponse({"status": "ok", "payload": payload})

# Serve mock mobile pages
@app.get("/mock/mobile1", response_class=HTMLResponse)
async def mock_mobile1():
    return FileResponse(str(BASE / "mock_pages" / "mobile1.html"))

@app.get("/mock/mobile2", response_class=HTMLResponse)
async def mock_mobile2():
    return FileResponse(str(BASE / "mock_pages" / "mobile2.html"))

# Active websocket manager
class ConnectionManager:
    def __init__(self):
        self.active: set[WebSocket] = set()

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active.add(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active.remove(websocket)

    async def broadcast(self, message: dict):
        dead = []
        for ws in list(self.active):
            try:
                await ws.send_json(message)
            except Exception:
                dead.append(ws)
        for d in dead:
            self.disconnect(d)

manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await manager.connect(ws)
    try:
        while True:
            await ws.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(ws)

# Simulated AutoRL run endpoint
@app.post("/api/execute")
async def execute_task(request: Request):
    data = await request.json()
    task = data.get("task", "unknown")
    device = data.get("device_id", "sim_device")
    enable_learning = data.get("parameters", {}).get("enable_learning", True)

    asyncio.create_task(simulate_agent_run(task, device, enable_learning))
    return JSONResponse({"status": "started", "task": task, "device": device})

async def simulate_agent_run(task, device, enable_learning):
    run_id = int(time.time() * 1000) % 1000000
    await manager.broadcast({"event": "perception", "run_id": run_id, "text": "Capturing screenshot and OCR...", "confidence": 0.97})
    await asyncio.sleep(0.8)

    await manager.broadcast({"event": "planning", "run_id": run_id, "text": "LLM planning: build action sequence", "plan": ["tap_send", "type_amount", "select_recipient", "confirm"], "confidence": 0.94})
    await asyncio.sleep(1.0)

    error_happens = random.random() < 0.45
    await manager.broadcast({"event": "execution_start", "run_id": run_id, "text": "Executing actions...", "progress": 10})
    await asyncio.sleep(0.6)

    if error_happens:
        await manager.broadcast({"event": "error", "run_id": run_id, "text": "Popup: Permission required", "severity": "warning"})
        await asyncio.sleep(0.6)
        await manager.broadcast({"event": "recovery_analyze", "run_id": run_id, "text": "Analyzing popup and computing recovery policy..."})
        await asyncio.sleep(1.0)
        await manager.broadcast({"event": "recovery_plan", "run_id": run_id, "text": "Plan: tap Allow → resume action", "plan": ["tap_allow", "resume_sequence"]})
        await asyncio.sleep(0.8)
        await manager.broadcast({"event": "recovery_execute", "run_id": run_id, "text": "Executing recovery...", "progress": 70})
        await asyncio.sleep(0.8)

    await manager.broadcast({"event": "completed", "run_id": run_id, "text": f"Task '{task}' completed on {device}", "success": True, "reward": 0.98})
    if enable_learning:
        store_episode({
            "run_id": run_id,
            "task": task,
            "device": device,
            "success": True,
            "timestamp": int(time.time()),
        })
        await manager.broadcast({"event": "memory_saved", "run_id": run_id, "text": "Episode learned and stored."})

def store_episode(entry: dict):
    obj = json.loads(MEMORY_FILE.read_text())
    obj["episodes"].append(entry)
    MEMORY_FILE.write_text(json.dumps(obj, indent=2))
