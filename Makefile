#!make
include .env
export
# export $(shell sed 's/=.*//' .env)

run:
	npm run start:dev
