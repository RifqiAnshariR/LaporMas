from __future__ import annotations

from pathlib import Path

from pydantic import computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict

ROOT_DIR = Path(__file__).resolve().parents[3]


class Config(BaseSettings):
    # Serving
    session_ttl_sec: int = 300

    # Env
    session_secret_key: str
    spam_detection_api_url: str
    public_issue_classification_api_url: str

    userdata_db_user: str
    userdata_db_password: str
    userdata_db_name: str
    userdata_db_host: str
    userdata_db_port: str

    @computed_field
    @property
    def resolve_userdata_db_url(self) -> str:
        return (
            f"postgresql://{self.userdata_db_user}:{self.userdata_db_password}"
            f"@{self.userdata_db_host}:{self.userdata_db_port}/{self.userdata_db_name}"
        )

    model_config = SettingsConfigDict(
        frozen=True,
        extra="ignore",
        env_file=ROOT_DIR / ".env",
    )


config = Config()  # type: ignore
