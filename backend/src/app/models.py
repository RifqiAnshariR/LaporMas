from datetime import datetime
from enum import StrEnum
from uuid import UUID, uuid4

from sqlalchemy import DateTime
from sqlmodel import Column, Enum, Field, SQLModel

from app.utils import get_jakarta_dt


class Status(StrEnum):
    OPEN = "OPEN"
    PROCESS = "PROCESS"
    CLOSE = "CLOSE"


# https://github.com/fastapi/full-stack-fastapi-template/blob/master/backend/app/models.py
class UserData(SQLModel, table=True):
    ticket_id: UUID = Field(default_factory=uuid4, primary_key=True)
    nik: str
    message: str
    category: str
    # https://github.com/fastapi/sqlmodel/issues/96
    status: Status = Field(
        default=Status.OPEN,
        sa_column=Column(
            Enum(Status),
            nullable=False,
            index=True,
        ),
    )
    created_at: datetime = Field(
        default_factory=get_jakarta_dt,
        sa_type=DateTime(timezone=True),  # type: ignore
    )


# Generic model
class Message(SQLModel):
    message: str


class LoginRequest(SQLModel):
    nik: str = Field(min_length=16, max_length=16)


class MessageCreate(SQLModel):
    message: str = Field(..., min_length=15, max_length=1000)


class MessageResponse(SQLModel):
    ticket_id: UUID


class TicketResponse(SQLModel):
    nik: str
    message: str
    status: Status
    created_at: str
