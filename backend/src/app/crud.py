from sqlmodel import Session, select

from app.models import MessageCreate, UserData


def insert_user_data(
    session: Session,
    nik: str,
    category: str,
    user_message: MessageCreate,
) -> UserData:
    user_data = UserData.model_validate(
        user_message,
        update={"nik": nik, "category": category},
    )

    session.add(user_data)
    session.commit()
    session.refresh(user_data)

    return user_data


def get_user_data_by_ticket_id(
    session: Session,
    ticket_id: str,
) -> UserData | None:
    statement = select(UserData).where(UserData.ticket_id == ticket_id)
    user_data = session.exec(statement).first()

    return user_data
