from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import speed_test

app = FastAPI(
    title="QoS Network Monitoring API",
    description="API for network quality of service monitoring and prediction",
    version="1.0.0"
)

# CORS middleware configuration for Expo app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(speed_test.router, prefix="/api/v1", tags=["Speed Test"])

@app.get("/")
async def root():
    return {
        "message": "QoS Network Monitoring API",
        "version": "1.0.0",
        "status": "active"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)