include .env

build-sql-init:
	@./db/init/setup.sh ${DB_USER} ${DB_NAME}

teardown:
	@docker-compose down
	@-docker rmi $(docker images | grep -e ${PWD##*/} -e api | awk '{ print $3 }')

start: teardown build-sql-init
	@docker-compose --env-file ./.env build --no-cache
	@docker-compose --env-file ./.env up

db-cli:
	@docker exec -it pokemon_db psql -d ${DB_NAME} -U ${DB_USER} -h localhost -p 5432