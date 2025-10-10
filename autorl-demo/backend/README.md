# AutoRL Demo Backend

Run locally:

```bash
python -m venv .venv
source .venv/bin/activate  # or .\.venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app:app --reload --host 0.0.0.0 --port 5000
```

Endpoints:
- GET /mock/mobile1
- GET /mock/mobile2
- GET /api/randomuser
- POST /api/transactions
- POST /api/execute  (body: {"task": "...", "device_id":"..."})
- WebSocket ws://localhost:5000/ws (real-time events)

Memory stored at memory.json
