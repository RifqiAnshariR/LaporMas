from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlmodel import Session

from app.ai_client import public_issue_classification, spam_detection
from app.api.deps import get_db
from app.crud import insert_user_data
from app.models import MessageCreate, MessageResponse

router = APIRouter()


@router.post("/message")
async def create_message(
    payload: MessageCreate,
    request: Request,
    session: Annotated[Session, Depends(get_db)],
) -> MessageResponse:
    nik = request.session.get("nik")
    if not nik:
        raise HTTPException(status_code=401, detail="Please login first")

    spam_result = await spam_detection(message=payload.message)
    if spam_result["prediction_label"] == "positive":
        raise HTTPException(status_code=400, detail="Message detected as spam")

    issue_result = await public_issue_classification(message=payload.message)
    category = ", ".join(issue_result["prediction_label"])

    user_message = MessageCreate(message=payload.message)

    user_data = insert_user_data(session, nik, category, user_message)

    return MessageResponse(ticket_id=user_data.ticket_id)
