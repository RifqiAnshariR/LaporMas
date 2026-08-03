from typing import Any

import httpx

from app.config import config


async def spam_detection(message: str) -> dict[str, Any]:
    async with httpx.AsyncClient() as client:
        response = await client.post(
            url=config.spam_detection_api_url,
            json={"comment": message},
        )
        response.raise_for_status()

        return response.json()


async def public_issue_classification(message: str) -> dict[str, Any]:
    async with httpx.AsyncClient() as client:
        response = await client.post(
            url=config.public_issue_classification_api_url,
            json={"comment": message},
        )
        response.raise_for_status()

        return response.json()
