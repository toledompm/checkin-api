#!make
include .env
export

.PHONY: setup install build test start down database/create database/drop database/migrate run
.DEFAULT_GOAL := start

setup:
	$(MAKE) install
	$(MAKE) build
	$(MAKE) database/create
	$(MAKE) database/migrate
	$(info Don't forget to fillout secret envs)

install:
	$(MAKE) run CMD='npm install'

build:
	$(MAKE) run CMD='npm run build'

test:
	$(MAKE) run OPTS='--no-deps' CMD='npm run test'

start:
	docker-compose up app

down:
	docker-compose down

database/create:
	docker-compose up -d db && \
	docker-compose exec db su postgres sh -c 'psql -c "CREATE DATABASE $(DB_NAME)"' && \
	docker-compose rm -s -f db

database/drop:
	docker-compose up -d db && \
	docker-compose exec db su postgres sh -c 'psql -c "DROP DATABASE $(DB_NAME)"' && \
	docker-compose rm -s -f db

database/migrate:
	$(MAKE) run CMD='npm run migration:run'

CMD=bash
SERVICE=app
OPTS=
run:
	docker-compose run --rm $(OPTS) $(SERVICE) $(CMD)
