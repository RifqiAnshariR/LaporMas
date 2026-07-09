#################################################################################
# GLOBALS                                                                       #
#################################################################################

PROJECT_NAME = app
PYTHON_VERSION = 3.12.3
PYTHON_INTERPRETER = python3

#################################################################################
# COMMANDS                                                                      #
#################################################################################

## Sync backend dependencies
.PHONY: sync-backend
sync-backend:
	uv sync --locked --directory backend

## Sync frontend dependencies
.PHONY: sync-frontend
sync-frontend:
	cd frontend && npm install

## Delete backend cache files/folders
.PHONY: clean-backend
clean-backend:
	find ./backend -type f -name "*.py[co]" -delete
	find ./backend -type d -name "__pycache__" -delete

## Delete frontend cache files/folders
.PHONY: clean-frontend
clean-frontend:
	rm -rf ./frontend/dist
	rm -rf ./frontend/.eslintcache

## Lint backend code with ruff
.PHONY: lint-backend
lint-backend:
	uv run --directory backend ruff format --check
	uv run --directory backend ruff check

## Lint fix backend code with ruff
.PHONY: lint-fix-backend
lint-fix-backend:
	uv run --directory backend ruff check --fix
	uv run --directory backend ruff format

## Lint frontend code with eslint
.PHONY: lint-frontend
lint-frontend:
	cd frontend && npm run lint

## Lint fix frontend code with eslint
.PHONY: lint-fix-frontend
lint-fix-frontend:
	cd frontend && npm run lint:fix

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