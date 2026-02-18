from fastapi import APIRouter, HTTPException, status, Depends
from models import MemberCreate, MemberLogin, Token, MemberResponse
from auth import (
    get_password_hash,
    verify_password,
    create_access_token,
    get_current_user
)
from database import members_collection
from datetime import datetime

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register(member_data: MemberCreate):
    """Register a new member"""
    
    # Check if email already exists
    existing_member = await members_collection.find_one({"email": member_data.email})
    if existing_member:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered. Please login instead."
        )
    
    # Hash password
    hashed_password = get_password_hash(member_data.password)
    
    # Create member document
    member_dict = member_data.model_dump(exclude={"password"})
    member_dict["hashed_password"] = hashed_password
    member_dict["role"] = "member"
    member_dict["is_active"] = True
    member_dict["created_at"] = datetime.utcnow()
    
    # Insert into database
    result = await members_collection.insert_one(member_dict)
    
    # Create access token
    access_token = create_access_token(
        data={"sub": member_data.email, "role": "member"}
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/login", response_model=Token)
async def login(credentials: MemberLogin):
    """Login with email and password"""
    
    # Find member by email
    member = await members_collection.find_one({"email": credentials.email})
    
    if not member:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Verify password
    if not verify_password(credentials.password, member["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Check if account is active
    if not member.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive. Please contact admin."
        )
    
    # Create access token
    access_token = create_access_token(
        data={"sub": member["email"], "role": member.get("role", "member")}
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=MemberResponse)
async def get_current_member(current_user: dict = Depends(get_current_user)):
    """Get current logged-in member details"""
    
    member = await members_collection.find_one({"email": current_user["email"]})
    
    if not member:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Member not found"
        )
    
    return MemberResponse(
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
