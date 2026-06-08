from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.api.deps import get_db
from app.crud import get_user_data_by_ticket_id
from app.models import TicketResponse

router = APIRouter()


@router.get("/ticket/{ticket_id}")
def get_ticket(
    ticket_id: str,
    session: Annotated[Session, Depends(get_db)],
) -> TicketResponse:
    user_data = get_user_data_by_ticket_id(session, ticket_id)

    if not user_data:
        raise HTTPException(status_code=404, detail="Ticket not found")

    return TicketResponse(
        nik=user_data.nik,
        message=user_data.message,
        status=user_data.status,
        created_at=user_data.created_at.strftime("%d %B %Y %H:%M:%S"),
    )
