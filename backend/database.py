from motor.motor_asyncio import AsyncIOMotorClient
import os

# Get MongoDB URL from environment
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "nexora_club")

# MongoDB client
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# Collections
members_collection = db.members
events_collection = db.events
registrations_collection = db.registrations

async def init_db():
    """Initialize database with indexes"""
    # Create indexes for better performance
    await members_collection.create_index("email", unique=True)
    await events_collection.create_index("date")
    await registrations_collection.create_index([("member_id", 1), ("event_id", 1)], unique=True)
    
    print("✓ Database indexes created successfully")
