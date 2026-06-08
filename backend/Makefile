#################################################################################
# GLOBALS                                                                       #
#################################################################################

PROJECT_NAME = app
PYTHON_VERSION = 3.12.3
PYTHON_INTERPRETER = python3

#################################################################################
# COMMANDS                                                                      #
#################################################################################

## Make and sync virtual environment
.PHONY: venv
venv:
	uv sync --locked

## Add main package. Args: project="<name>" pkg="<name>"
.PHONY: venv-add
venv-add:
	uv add $(project) $(pkg)

## Add package to dev group. Args: project="<name>" pkg="<name>"
.PHONY: venv-dev-add
venv-dev-add:
	uv add $(project) --group dev $(pkg)

## Remove package from main dependencies. Args: project="<name>" pkg="<name>"
.PHONY: venv-remove
venv-remove:
	uv remove $(project) $(pkg)

## Remove package from dev group. Args: project="<name>" pkg="<name>"
.PHONY: venv-dev-remove
venv-dev-remove:
	uv remove $(project) --group dev $(pkg)

## Docker compose up
.PHONY: compose-up
compose-up:
	docker compose up -d

## Docker compose up & build
.PHONY: compose-up-build
compose-up-build:
	docker compose up --build -d

## Docker compose down
.PHONY: compose-down
compose-down:
	docker compose down

## Docker compose down & erase volume
.PHONY: compose-down-v
compose-down-v:
	docker compose down -v

## Alembic migration. Args: msg="<message>"
.PHONY: alembic-revision
alembic-revision:
	cd app && uv run alembic revision --autogenerate -m "$(msg)"

## Download assets
.PHONY: download-assets
download-assets:
	uv run --project training training/scripts/download_assets.py

## Train model
.PHONY: train-model
train-model:
	uv run --project training training

## Regist model
.PHONY: regist-model
regist-model:
	uv run --project training training/scripts/regist_model.py

## Start prefect server
.PHONY: start-prefect-server
start-prefect-server:
	uv run --project training prefect server start

## Generate evidently report
.PHONY: generate-evidently-report
generate-evidently-report:
	uv run --project training training/scripts/generate_evidently_report.py

## Delete compiled Python files
.PHONY: clean
clean:
	find . -type f -name "*.py[co]" -delete
	find . -type d -name "__pycache__" -delete

## Lint using ruff (use `make format` to do formatting)
.PHONY: lint
lint:
	uv run ruff format --check
	uv run ruff check

## Format source code with ruff
.PHONY: format
format:
	uv run ruff check --fix
	uv run ruff format

## Run tests
.PHONY: test
test:
	uv run --project training pytest training/tests

#################################################################################
# Self Documenting Commands                                                     #
#################################################################################

.DEFAULT_GOAL := help

define PRINT_HELP_PYSCRIPT
import re, sys; \
lines = '\n'.join([line for line in sys.stdin]); \
matches = re.findall(r'\n## (.*)\n[\s\S]+?\n([a-zA-Z_-]+):', lines); \
print('Available rules:\n'); \
print('\n'.join(['{:25}{}'.format(*reversed(match)) for match in matches]))
endef
export PRINT_HELP_PYSCRIPT

help:
	@$(PYTHON_INTERPRETER) -c "${PRINT_HELP_PYSCRIPT}" < $(MAKEFILE_LIST)