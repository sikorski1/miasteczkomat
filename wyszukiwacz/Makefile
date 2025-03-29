# Makefile for managing the PostgreSQL Docker container and executing queries

# --- Variables ---
# Docker Compose command
COMPOSE = docker-compose

# Python interpreter
PYTHON = python3

# Python script for populating the database
POPULATE_SCRIPT = populate_db.py

# Docker container name (from docker-compose.yml)
CONTAINER_NAME = db_mock

# Database connection details (must match docker-compose.yml and script)
DB_NAME = test
DB_USER = test

# Default target (executed when running just 'make')
.DEFAULT_GOAL := help

# Phony targets (targets that don't represent files)
.PHONY: help up down down-purge logs psql populate exec-sql exec-sql-file

# --- Targets ---

help: ## Display this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

up: ## Start the PostgreSQL container in detached mode
	@echo "Starting PostgreSQL container..."
	@$(COMPOSE) up -d

down: ## Stop the PostgreSQL container
	@echo "Stopping PostgreSQL container..."
	@$(COMPOSE) down

down-purge: ## Stop the PostgreSQL container AND remove the data volume (USE WITH CAUTION!)
	@echo "\033[31mWARNING: This will permanently delete all database data!\033[0m"
	@read -p "Are you sure? (y/N) " -n 1 -r; echo
	@if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		echo "Stopping container and removing volume..."; \
		$(COMPOSE) down -v; \
	else \
		echo "Operation cancelled."; \
	fi

logs: ## Follow the logs from the PostgreSQL container
	@echo "Following logs for container '$(CONTAINER_NAME)' (Press Ctrl+C to stop)..."
	@$(COMPOSE) logs -f db

psql: ## Connect to the database using psql inside the container (interactive session)
	@echo "Connecting to database '$(DB_NAME)' as user '$(DB_USER)'..."
	@docker exec -it $(CONTAINER_NAME) psql -U $(DB_USER) -d $(DB_NAME)

populate: ## Run the Python script to populate the database (ensure DB is up first!)
	@echo "Running population script '$(POPULATE_SCRIPT)'..."
	@$(PYTHON) $(POPULATE_SCRIPT)

exec-sql: ## Execute a SQL query string (pass SQL="your query")
	@ifndef SQL
		$(error Usage: make exec-sql SQL="<your query string>")
	@endif
	@echo "Executing SQL: $(SQL)"
	@docker exec $(CONTAINER_NAME) psql -U $(DB_USER) -d $(DB_NAME) -c "$(SQL)"

exec-sql-file: ## Execute SQL commands from a file (pass SQLFILE=path/to/file.sql)
	@ifndef SQLFILE
		$(error Usage: make exec-sql-file SQLFILE=<path/to/your/sql/file.sql>)
	@endif
	@echo "Executing SQL from file: $(SQLFILE)"
	@cat $(SQLFILE) | docker exec -i $(CONTAINER_NAME) psql -U $(DB_USER) -d $(DB_NAME)