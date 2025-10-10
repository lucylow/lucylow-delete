import os
import sys
from pathlib import Path
from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from prometheus_client import make_asgi_app, Counter, Histogram
import logging
import json
import asyncio
from typing import Dict, Any, Optional, List
from pydantic import BaseModel

# Add src to Python path
sys.path.insert(0, str(Path(__file__).parent))

# Import configuration and security
from src.config import config
from src.security.pii_manager import security_manager, setup_secure_logging
from src.orchestrator import orchestrator
from src.device_manager import device_pool
from src.omh_integration import router as omh_router

# Validate critical environment variables at startup
missing_vars = config.validate_required_vars()
if missing_vars:
    raise RuntimeError(f"Missing required environment variables: {missing_vars}")

# Setup secure logging
setup_secure_logging()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("autorl")

app = FastAPI(
    title="AutoRL AI Agent API",
    description="Production-Ready Mobile Automation",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Prometheus metrics
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

# Include OMH integration routes
app.include_router(omh_router)

# Initialize metrics
task_counter = Counter('autorl_tasks_total', 'Total tasks executed')
task_duration = Histogram('autorl_task_duration_seconds', 'Task execution time')

# WebSocket Connection Manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.connection_metadata: Dict[WebSocket, Dict] = {}
    
    async def connect(self, websocket: WebSocket, client_id: str = None):
        try:
            await websocket.accept()
            self.active_connections.append(websocket)
            self.connection_metadata[websocket] = {
                "client_id": client_id,
                "connected_at": asyncio.get_event_loop().time(),
                "last_ping": asyncio.get_event_loop().time()
            }
            logger.info(f"WebSocket connected: {client_id}")
            
            # Send initial connection confirmation
            await self.send_personal_message({
                "type": "connection_established",
                "client_id": client_id,
                "timestamp": asyncio.get_event_loop().time()
            }, websocket)
            
        except Exception as e:
            logger.error(f"WebSocket connection failed: {e}")
            await self.disconnect(websocket)
    
    async def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            client_info = self.connection_metadata.pop(websocket, {})
            logger.info(f"WebSocket disconnected: {client_info.get('client_id')}")
    
    async def send_personal_message(self, message: Dict[str, Any], websocket: WebSocket):
        try:
            if websocket in self.active_connections:
                await websocket.send_text(json.dumps(message))
        except Exception as e:
            logger.error(f"Failed to send message: {e}")
            await self.disconnect(websocket)
    
    async def broadcast(self, message: Dict[str, Any]):
        """Broadcast message to all connected clients with error handling"""
        disconnected_connections = []
        
        for connection in self.active_connections:
            try:
                await connection.send_text(json.dumps(message))
                # Update last ping time
                if connection in self.connection_metadata:
                    self.connection_metadata[connection]["last_ping"] = asyncio.get_event_loop().time()
            except Exception as e:
                logger.warning(f"Failed to send to connection: {e}")
                disconnected_connections.append(connection)
        
        # Clean up failed connections
        for connection in disconnected_connections:
            await self.disconnect(connection)
    
    async def start_heartbeat(self):
        """Send periodic heartbeat to detect dead connections"""
        while True:
            try:
                await asyncio.sleep(30)  # Heartbeat every 30 seconds
                current_time = asyncio.get_event_loop().time()
                
                heartbeat_message = {
                    "type": "heartbeat",
                    "timestamp": current_time
                }
                
                await self.broadcast(heartbeat_message)
                
                # Remove stale connections (no ping in 60 seconds)
                stale_connections = [
                    ws for ws, meta in self.connection_metadata.items()
                    if current_time - meta["last_ping"] > 60
                ]
                
                for ws in stale_connections:
                    await self.disconnect(ws)
                    
            except Exception as e:
                logger.error(f"Heartbeat error: {e}")

# Initialize connection manager
manager = ConnectionManager()

# Pydantic models
class TaskRequest(BaseModel):
    task_description: str
    device_id: str
    timeout_seconds: int = 300

class TaskResponse(BaseModel):
    task_id: str
    status: str
    message: str

# API Routes
@app.get("/")
async def root():
    return {"message": "AutoRL AI Agent API", "status": "running"}

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "environment": os.getenv('ENVIRONMENT', 'development'),
        "version": "1.0.0"
    }

@app.post("/api/v1/execute", response_model=TaskResponse)
async def execute_task(request: TaskRequest):
    """Execute a mobile automation task"""
    try:
        task_counter.inc()
        
        # Validate device access
        if not security_manager.validate_device_access(request.device_id, "system"):
            raise HTTPException(status_code=403, detail="Device access denied")
        
        # Sanitize request data
        sanitized_data = security_manager.sanitize_request_data(request.dict())
        
        # Start task execution asynchronously
        task_state = await orchestrator.execute_task_with_recovery(
            task_description=request.task_description,
            device_id=request.device_id,
            timeout_seconds=request.timeout_seconds
        )
        
        # Broadcast task status to WebSocket clients
        await manager.broadcast({
            "type": "task_update",
            "task_id": task_state.task_id,
            "status": task_state.status,
            "progress": task_state.progress,
            "current_agent": task_state.current_agent
        })
        
        # Audit the action
        security_manager.audit_action(
            action="execute_task",
            user_id="system",
            device_id=request.device_id,
            success=task_state.status == "completed"
        )
        
        return TaskResponse(
            task_id=task_state.task_id,
            status=task_state.status,
            message=f"Task '{request.task_description}' {task_state.status}"
        )
        
    except Exception as e:
        logger.error(f"Task execution error: {e}")
        security_manager.audit_action(
            action="execute_task",
            user_id="system", 
            device_id=request.device_id,
            success=False
        )
        raise HTTPException(status_code=500, detail=str(e))

@app.websocket("/ws/metrics")
async def websocket_endpoint(websocket: WebSocket):
    client_id = websocket.query_params.get("client_id", "anonymous")
    await manager.connect(websocket, client_id)
    
    try:
        while True:
            # Keep connection alive and handle incoming messages
            try:
                data = await asyncio.wait_for(websocket.receive_text(), timeout=1.0)
                message = json.loads(data)
                
                if message.get("type") == "ping":
                    await manager.send_personal_message({
                        "type": "pong",
                        "timestamp": asyncio.get_event_loop().time()
                    }, websocket)
                    
            except asyncio.TimeoutError:
                # No message received, continue loop
                continue
            except json.JSONDecodeError:
                logger.warning("Received invalid JSON from WebSocket client")
                continue
                
    except WebSocketDisconnect:
        await manager.disconnect(websocket)
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        await manager.disconnect(websocket)

@app.on_event("startup")
async def startup_event():
    logger.info("AutoRL API startup completed successfully")
    logger.info(f"Environment: {config.ENVIRONMENT}")
    
    # Initialize device pool
    await device_pool.add_device("emulator-5554")
    await device_pool.add_device("iPhone-15")
    
    # Start heartbeat task
    asyncio.create_task(manager.start_heartbeat())
    
    logger.info("AutoRL API fully initialized and ready")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("AutoRL API shutting down")
    # Clean up device pool
    await device_pool.cleanup_all()
    logger.info("AutoRL API shutdown complete")

if __name__ == "__main__":
    uvicorn.run(
        "main:app", 
        host="0.0.0.0", 
        port=config.PORT,
        reload=config.RELOAD,
        access_log=True
    )
