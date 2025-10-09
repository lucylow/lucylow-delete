from fastapi import Request, HTTPException

# Mirror the users db in api_server; import would cause circular import, so keep a small shared accessor
users_db = {
    "alice": {"subscription": "premium", "quota": 100, "tasks_used": 42, "history": []},
    "bob":   {"subscription": "basic", "quota": 10,  "tasks_used": 9,  "history": []}
}


def get_user(request: Request):
    username = request.headers.get("x-username")
    if not username or username not in users_db:
        raise HTTPException(status_code=401, detail="Invalid user")
    return users_db[username]
