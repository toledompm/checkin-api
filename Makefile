#!make
include .env
export

.PHONY: help install run down
.DEFAULT_GOAL := help

help: ## display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

setup: ## creates .env based on sample file and install dependencies
	$(MAKE) install
	$(info Don't forget to fillout secret envs)

install: ## install node dependencies
	$(MAKE) run CMD='npm install'

start:
	docker-compose up

down: ## brings containers down
	docker-compose down

CMD = bash
run: ## runs compose app container | CMD = bash
	docker-compose run --rm app $(CMD)
