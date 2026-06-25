from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class _FrozenModel(BaseModel):
    model_config = ConfigDict(frozen=True)


class _FrozenSettings(BaseSettings):
    model_config = SettingsConfigDict(frozen=True, extra="ignore")


class ServingConfig(_FrozenModel):
    session_ttl_sec: int = Field(default=300)


class EnvSettings(_FrozenSettings):
    session_secret_key: str
    userdata_db_url: str
    spam_ham_classification_url: str
    public_issue_classification_url: str


class AppConfig(_FrozenSettings):
    serving: ServingConfig = ServingConfig()
    env: EnvSettings = EnvSettings()  # type: ignore


config = AppConfig()
