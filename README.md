# CekMas

AI powered .

Requirements:
```
- Ubuntu 22.04 LTS (dev. environment) with GNU Make
- Python 3.12+
- Docker (see: https://docs.docker.com/engine/install/)
- uv (see: https://docs.astral.sh/uv/getting-started/installation/)
```

How to run:
- Make .env contains:
```
POSTGRES_USER=<postgres_username>
POSTGRES_PASSWORD=<postgres_password>
SESSION_SECRET_KEY=<random_key>
```
- See:
```
make help
```