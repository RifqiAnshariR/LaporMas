from __future__ import annotations

from pydantic import BaseModel, ConfigDict
from pydantic_settings import BaseSettings, SettingsConfigDict


class _FrozenModel(BaseModel):
    model_config = ConfigDict(frozen=True)


class _FrozenSettings(BaseSettings):
    model_config = SettingsConfigDict(frozen=True, extra="ignore")


class ServingConfig(_FrozenModel):
    session_ttl_sec: int


class EnvSettings(_FrozenSettings):
    session_secret_key: str
    userdata_db_url: str
    spam_ham_classification_url: str
    public_issue_classification_url: str


class Config(_FrozenSettings):
    serving: ServingConfig
    env: EnvSettings


config = Config(
    serving=ServingConfig(session_ttl_sec=300),
    env=EnvSettings(),  # type: ignore
)
