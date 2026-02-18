from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from bson import ObjectId
from models import EventCreate, EventResponse, Event
from auth import get_current_admin, get_current_user
from database import events_collection
from datetime import datetime

router = APIRouter(prefix="/api/events", tags=["Events"])


@router.get("", response_model=List[EventResponse])
async def get_all_events(skip: int = 0, limit: int = 100):
    """Get all events"""
    
    cursor = events_collection.find().skip(skip).limit(limit).sort("date", -1)
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
            created_at=event.get("created_at", datetime.utcnow())
        )
        for event in events
    ]


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
        created_at=event.get("created_at", datetime.utcnow())
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
        created_at=event["created_at"]
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
