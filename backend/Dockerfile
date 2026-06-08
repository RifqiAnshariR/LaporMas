FROM python:3.12-slim

COPY --from=ghcr.io/astral-sh/uv:0.9.24 /uv /uvx /bin/

WORKDIR /app

COPY .python-version ./
COPY pyproject.toml uv.lock ./
COPY alembic ./alembic 
COPY alembic.ini ./
COPY src ./src

RUN uv sync --locked --no-dev

EXPOSE 8000

CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]