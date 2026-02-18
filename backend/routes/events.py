from fastapi import APIRouter, HTTPException, status, Depends, Query
from typing import List, Optional
from bson import ObjectId
from models import EventCreate, EventResponse, Event
from auth import get_current_admin, get_current_user
from database import events_collection
from external_events import ExternalEventsFetcher
from datetime import datetime

router = APIRouter(prefix="/api/events", tags=["Events"])


@router.get("", response_model=List[EventResponse])
async def get_all_events(
    skip: int = 0, 
    limit: int = 100,
    event_type: Optional[str] = Query(None, description="Filter by 'internal' or 'external'"),
    platform: Optional[str] = Query(None, description="Filter by platform (unstop, hackerearth, devfolio)")
):
    """Get all events with optional filters"""
    
    # Build query filter
    query_filter = {}
    
    if event_type == "internal":
        query_filter["is_external"] = False
    elif event_type == "external":
        query_filter["is_external"] = True
    
    if platform:
        query_filter["platform"] = platform
    
    cursor = events_collection.find(
        query_filter, 
        {'_id': 1, 'title': 1, 'description': 1, 'date': 1, 'category': 1, 'image': 1, 
         'registrations_count': 1, 'created_at': 1, 'is_external': 1, 'external_url': 1, 'platform': 1}
    ).skip(skip).limit(limit).sort("date", -1)
    events = await cursor.to_list(length=limit)
    
    return [
        EventResponse(
            id=str(event["_id"]),
            title=event["title"],
            description=event["description"],
            date=event["date"],
            category=event["category"],
            image=event["image"],
            registrations_count=event.get("registrations_count", 0),
            created_at=event.get("created_at", datetime.utcnow()),
            is_external=event.get("is_external", False),
            external_url=event.get("external_url"),
            platform=event.get("platform")
        )
        for event in events
    ]


@router.post("/sync-external", status_code=status.HTTP_200_OK)
async def sync_external_events(current_user: dict = Depends(get_current_admin)):
    """
    Sync events from external platforms (Admin only)
    Fetches latest events from Unstop, HackerEarth, Devfolio, etc.
    """
    
    try:
        # Fetch events from all external platforms
        external_events = ExternalEventsFetcher.fetch_all_external_events()
        
        synced_count = 0
        updated_count = 0
        
        for event_data in external_events:
            # Check if event already exists (by title and platform)
            existing_event = await events_collection.find_one({
                "title": event_data["title"],
                "platform": event_data["platform"]
            })
            
            if existing_event:
                # Update existing event
                await events_collection.update_one(
                    {"_id": existing_event["_id"]},
                    {
                        "$set": {
                            "description": event_data["description"],
                            "date": event_data["date"],
                            "image": event_data["image"],
                            "external_url": event_data["external_url"],
                            "last_synced": datetime.utcnow()
                        }
                    }
                )
                updated_count += 1
            else:
                # Insert new event
                event_dict = event_data.copy()
                event_dict["created_at"] = datetime.utcnow()
                event_dict["last_synced"] = datetime.utcnow()
                event_dict["registrations_count"] = 0
                event_dict["created_by"] = "system_sync"
                
                await events_collection.insert_one(event_dict)
                synced_count += 1
        
        return {
            "message": "External events synced successfully",
            "new_events": synced_count,
            "updated_events": updated_count,
            "total_fetched": len(external_events)
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error syncing external events: {str(e)}"
        )


@router.get("/{event_id}", response_model=EventResponse)
async def get_event_by_id(event_id: str):
    """Get event by ID"""
    
    if not ObjectId.is_valid(event_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid event ID"
        )
    
    event = await events_collection.find_one({"_id": ObjectId(event_id)})
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    return EventResponse(
        id=str(event["_id"]),
        title=event["title"],
        description=event["description"],
        date=event["date"],
        category=event["category"],
        image=event["image"],
        registrations_count=event.get("registrations_count", 0),
        created_at=event.get("created_at", datetime.utcnow()),
        is_external=event.get("is_external", False),
        external_url=event.get("external_url"),
        platform=event.get("platform")
    )


@router.post("", response_model=EventResponse, status_code=status.HTTP_201_CREATED)
async def create_event(
    event_data: EventCreate,
    current_user: dict = Depends(get_current_admin)
):
    """Create a new event (Admin only)"""
    
    event_dict = event_data.model_dump()
    event_dict["registrations_count"] = 0
    event_dict["created_by"] = current_user["email"]
    event_dict["created_at"] = datetime.utcnow()
    
    result = await events_collection.insert_one(event_dict)
    
    event = await events_collection.find_one({"_id": result.inserted_id})
    
    return EventResponse(
        id=str(event["_id"]),
        title=event["title"],
        description=event["description"],
        date=event["date"],
        category=event["category"],
        image=event["image"],
        registrations_count=event["registrations_count"],
        created_at=event["created_at"],
        is_external=event.get("is_external", False),
        external_url=event.get("external_url"),
        platform=event.get("platform")
    )


@router.put("/{event_id}", response_model=EventResponse)
async def update_event(
    event_id: str,
    event_data: EventCreate,
    current_user: dict = Depends(get_current_admin)
):
    """Update an event (Admin only)"""
    
    if not ObjectId.is_valid(event_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid event ID"
        )
    
    event_dict = event_data.model_dump()
    
    result = await events_collection.update_one(
        {"_id": ObjectId(event_id)},
        {"$set": event_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    event = await events_collection.find_one({"_id": ObjectId(event_id)})
    
    return EventResponse(
        id=str(event["_id"]),
        title=event["title"],
        description=event["description"],
        date=event["date"],
        category=event["category"],
        image=event["image"],
        registrations_count=event.get("registrations_count", 0),
        created_at=event.get("created_at", datetime.utcnow())
    )


@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_event(
    event_id: str,
    current_user: dict = Depends(get_current_admin)
):
    """Delete an event (Admin only)"""
    
    if not ObjectId.is_valid(event_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid event ID"
        )
    
    result = await events_collection.delete_one({"_id": ObjectId(event_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    return None


@router.get("/count/total")
async def get_events_count():
    """Get total count of events"""
    count = await events_collection.count_documents({})
    return {"count": count}
