from fastapi import APIRouter
from models import ClubStats
from database import members_collection, events_collection, registrations_collection

router = APIRouter(prefix="/api/stats", tags=["Statistics"])


@router.get("", response_model=ClubStats)
async def get_club_stats():
    """Get overall club statistics"""
    
    total_members = await members_collection.count_documents({})
    total_events = await events_collection.count_documents({})
    total_registrations = await registrations_collection.count_documents({})
    
    return ClubStats(
        total_members=total_members,
        total_events=total_events,
        total_registrations=total_registrations
    )
