#!make
include .env
export

.PHONY: help install run down
.DEFAULT_GOAL := help

help: ## display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

setup: ## creates .env based on sample file and install dependencies
	$(MAKE) install
	$(MAKE) create-database
	$(info Don't forget to fillout secret envs)

install: ## install node dependencies
	$(MAKE) run CMD='npm install'

create-database: ## creates database
	docker-compose exec db su postgres sh -c 'psql -c "CREATE DATABASE checkin"'

start:
	docker-compose up

down: ## brings containers down
	docker-compose down

CMD = bash
SERVICE = app
run: ## runs compose app container | CMD = bash
	docker-compose run --rm $(SERVICE) $(CMD)
