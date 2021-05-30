#!make
include .env
export

.PHONY: help
.DEFAULT_GOAL := help

help: ## display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

setup: ## creates .env based on sample file and install dependencies
	cp .env.sample .env
	$(MAKE) install
	$(info Don't forget to fillout secret envs)

install: ## install node dependencies
	npm install

run: ## runs the application in development mode
	npm run start:dev
