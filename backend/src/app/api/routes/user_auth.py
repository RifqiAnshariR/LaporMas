from fastapi import APIRouter, Request

from app.models import LoginRequest, Message

router = APIRouter()


@router.post("/login")
def login(payload: LoginRequest, request: Request) -> Message:
    # validasi database Dukcapil

    request.session["nik"] = payload.nik

    return Message(message="Login successful")


@router.post("/logout")
def logout(request: Request) -> Message:
    request.session.clear()

    return Message(message="Logout successful")
