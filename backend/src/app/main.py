from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqladmin import Admin
from starlette.middleware.sessions import SessionMiddleware

from app.admin import AdminAuth, UserAdmin
from app.api.routes import health_check, ticket_check, user_auth, user_message
from app.config import config
from app.db import engine

app = FastAPI(docs_url=None, openapi_url=None)
app.add_middleware(
    SessionMiddleware,
    secret_key=config.env.session_secret_key,
    max_age=config.serving.session_ttl_sec,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://production.com", "http://localhost:80"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
app.include_router(health_check.router, tags=["System"])
app.include_router(user_auth.router, tags=["Auth"])
app.include_router(user_message.router, tags=["Message"])
app.include_router(ticket_check.router, tags=["Ticket"])

authentication_backend = AdminAuth(secret_key=config.env.session_secret_key)
admin = Admin(app, engine, authentication_backend=authentication_backend)
admin.add_view(UserAdmin)
