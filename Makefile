#!make
include .env
export

.PHONY: help install run down database/create database/drop
.DEFAULT_GOAL := help

help: ## display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

setup: ## install dependencies and sets up database
	$(MAKE) install
	$(MAKE) build
	$(MAKE) database/create
	$(MAKE) database/migrate
	$(info Don't forget to fillout secret envs)

install: ## install node dependencies
	$(MAKE) run CMD='npm install'

build: ## builds application
	$(MAKE) run CMD='npm run build'

start: ## ups app compose services
	docker-compose up app

down: ## downs all compose services
	docker-compose down

database/create: ## creates database
	docker-compose up -d db && \
	docker-compose exec db su postgres sh -c 'psql -c "CREATE DATABASE $(DB_NAME)"' && \
	docker-compose rm -s -f db

database/drop: ## drops database
	docker-compose up -d db && \
	docker-compose exec db su postgres sh -c 'psql -c "DROP DATABASE $(DB_NAME)"' && \
	docker-compose rm -s -f db

database/migrate: ## runs tipeorm migrations
	$(MAKE) run CMD='npm run migration:run'

CMD = bash
SERVICE = app
run: ## executes CMD on compose SERVICE | CMD=bash SERVICE=app
	docker-compose run --rm $(SERVICE) $(CMD)
