from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


# Member Models
class MemberBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    branch: str
    year: str
    interest_area: str
    message: Optional[str] = None

class MemberCreate(MemberBase):
    password: str

class MemberLogin(BaseModel):
    email: EmailStr
    password: str

class Member(MemberBase):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    hashed_password: str
    role: str = "member"  # member or admin
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class MemberResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    phone: str
    branch: str
    year: str
    interest_area: str
    role: str
    created_at: datetime


# Event Models
class EventBase(BaseModel):
    title: str
    description: str
    date: str
    category: str
    image: str

class EventCreate(EventBase):
    pass

class Event(EventBase):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    registrations_count: int = 0
    created_by: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class EventResponse(BaseModel):
    id: str
    title: str
    description: str
    date: str
    category: str
    image: str
    registrations_count: int
    created_at: datetime


# Registration Models
class RegistrationCreate(BaseModel):
    event_id: str

class Registration(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    member_id: str
    member_name: str
    member_email: str
    event_id: str
    event_title: str
    registration_date: datetime = Field(default_factory=datetime.utcnow)
    status: str = "confirmed"

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


# Token Models
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None


# Stats Model
class ClubStats(BaseModel):
    total_members: int
    total_events: int
    total_registrations: int
