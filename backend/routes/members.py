from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from models import MemberResponse
from auth import get_current_admin
from database import members_collection

router = APIRouter(prefix="/api/members", tags=["Members"])


@router.get("", response_model=List[MemberResponse])
async def get_all_members(
    skip: int = 0,
    limit: int = 100,
    current_user: dict = Depends(get_current_admin)
):
    """Get all members (Admin only)"""
    
    cursor = members_collection.find(
        {},
        {'_id': 1, 'name': 1, 'email': 1, 'phone': 1, 'branch': 1, 
         'year': 1, 'interest_area': 1, 'role': 1, 'created_at': 1}
    ).skip(skip).limit(limit).sort("created_at", -1)
    members = await cursor.to_list(length=limit)
    
    return [
        MemberResponse(
            id=str(member["_id"]),
            name=member["name"],
            email=member["email"],
            phone=member["phone"],
            branch=member["branch"],
            year=member["year"],
            interest_area=member["interest_area"],
            role=member["role"],
            created_at=member["created_at"]
        )
        for member in members
    ]


@router.get("/count")
async def get_members_count():
    """Get total count of members"""
    count = await members_collection.count_documents({})
    return {"count": count}
