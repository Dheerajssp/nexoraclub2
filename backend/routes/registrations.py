from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from bson import ObjectId
from models import RegistrationCreate, Registration
from auth import get_current_user
from database import registrations_collection, events_collection, members_collection
from datetime import datetime

router = APIRouter(prefix="/api/registrations", tags=["Registrations"])


@router.post("", response_model=Registration, status_code=status.HTTP_201_CREATED)
async def register_for_event(
    registration_data: RegistrationCreate,
    current_user: dict = Depends(get_current_user)
):
    """Register current user for an event"""
    
    # Validate event ID
    if not ObjectId.is_valid(registration_data.event_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid event ID"
        )
    
    # Check if event exists
    event = await events_collection.find_one({"_id": ObjectId(registration_data.event_id)})
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    # Get member details
    member = await members_collection.find_one({"email": current_user["email"]})
    if not member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Member not found"
        )
    
    # Check if already registered
    existing_registration = await registrations_collection.find_one({
        "member_id": str(member["_id"]),
        "event_id": registration_data.event_id
    })
    
    if existing_registration:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You are already registered for this event"
        )
    
    # Create registration
    registration_dict = {
        "member_id": str(member["_id"]),
        "member_name": member["name"],
        "member_email": member["email"],
        "event_id": registration_data.event_id,
        "event_title": event["title"],
        "registration_date": datetime.utcnow(),
        "status": "confirmed"
    }
    
    result = await registrations_collection.insert_one(registration_dict)
    
    # Increment event registration count
    await events_collection.update_one(
        {"_id": ObjectId(registration_data.event_id)},
        {"$inc": {"registrations_count": 1}}
    )
    
    registration = await registrations_collection.find_one({"_id": result.inserted_id})
    
    return Registration(
        id=str(registration["_id"]),
        member_id=registration["member_id"],
        member_name=registration["member_name"],
        member_email=registration["member_email"],
        event_id=registration["event_id"],
        event_title=registration["event_title"],
        registration_date=registration["registration_date"],
        status=registration["status"]
    )


@router.get("/my-registrations", response_model=List[Registration])
async def get_my_registrations(current_user: dict = Depends(get_current_user)):
    """Get all registrations for current user"""
    
    member = await members_collection.find_one({"email": current_user["email"]})
    if not member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Member not found"
        )
    
    cursor = registrations_collection.find(
        {"member_id": str(member["_id"])}
    ).sort("registration_date", -1)
    
    registrations = await cursor.to_list(length=100)
    
    return [
        Registration(
            id=str(reg["_id"]),
            member_id=reg["member_id"],
            member_name=reg["member_name"],
            member_email=reg["member_email"],
            event_id=reg["event_id"],
            event_title=reg["event_title"],
            registration_date=reg["registration_date"],
            status=reg["status"]
        )
        for reg in registrations
    ]


@router.get("/event/{event_id}", response_model=List[Registration])
async def get_event_registrations(event_id: str, current_user: dict = Depends(get_current_user)):
    """Get all registrations for a specific event"""
    
    if not ObjectId.is_valid(event_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid event ID"
        )
    
    cursor = registrations_collection.find(
        {"event_id": event_id}
    ).sort("registration_date", -1)
    
    registrations = await cursor.to_list(length=1000)
    
    return [
        Registration(
            id=str(reg["_id"]),
            member_id=reg["member_id"],
            member_name=reg["member_name"],
            member_email=reg["member_email"],
            event_id=reg["event_id"],
            event_title=reg["event_title"],
            registration_date=reg["registration_date"],
            status=reg["status"]
        )
        for reg in registrations
    ]


@router.get("/count/total")
async def get_registrations_count():
    """Get total count of registrations"""
    count = await registrations_collection.count_documents({})
    return {"count": count}
