#!make
include .env
export $(shell sed 's/=.*//' .env)

run:
	npm run start:dev
