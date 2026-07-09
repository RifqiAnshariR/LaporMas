import secrets

from sqladmin import ModelView
from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request

from app.models import UserData

ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"


class AdminAuth(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        username, password = form["username"], form["password"]

        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
            request.session.update({"token": secrets.token_hex(32)})

            return True

        return False

    async def logout(self, request: Request) -> bool:
        request.session.clear()

        return True

    async def authenticate(self, request: Request) -> bool:
        token = request.session.get("token")

        return bool(token)


class UserAdmin(ModelView, model=UserData):
    # name = "User Data"
    name_plural = "User Data"

    can_create = False
    # can_delete = False
    # can_edit = False

    column_list = [
        UserData.ticket_id,
        UserData.nik,
        UserData.message,
        UserData.category,
        UserData.status,
        UserData.created_at,
    ]  # type: ignore
    form_columns = [UserData.status]
    # form_excluded_columns = [UserData.created_at]  # type: ignore
    column_sortable_list = [UserData.status, UserData.created_at]  # type: ignore
    column_searchable_list = [UserData.ticket_id, UserData.nik]  # type: ignore
