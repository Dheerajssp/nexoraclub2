from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
import logging
import os

# Import database and routes
from database import init_db
from routes import auth, members, events, registrations, stats

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="Nexora Club API",
    description="Professional backend API for Nexora Tech Club",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "Nexora Club API",
        "version": "1.0.0"
    }

# Include routers
app.include_router(auth.router)
app.include_router(members.router)
app.include_router(events.router)
app.include_router(registrations.router)
app.include_router(stats.router)

# Startup event
@app.on_event("startup")
async def startup_event():
    logger.info("🚀 Starting Nexora Club API...")
    await init_db()
    logger.info("✓ Database initialized successfully")
    logger.info("✓ API is ready to serve requests")

# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    logger.info("👋 Shutting down Nexora Club API...")

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to Nexora Club API",
        "docs": "/docs",
        "health": "/api/health"
    }
