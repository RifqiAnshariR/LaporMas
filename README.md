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
SESSION_SECRET_KEY=<random generated key>
USERDATA_DB_USER=<user data db username>
USERDATA_DB_PASSWORD=<user data db password>
USERDATA_DB_NAME=<user data db name>
```
- See:
```
make help
```