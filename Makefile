help:
	@echo "usage: make COMMAND [c=[arguments]]"
	@echo ""
	@echo "Commands:"
	@echo "  dps                           Show all running containers"
	@echo "  up                            Up all docker services"
	@echo "  down                          Stop all docker services"
	@echo "  db-refresh                    Refresh current DB"
	@echo "  db-up                         Run latest migration"
	@echo "  db-down                       Rollback latest migration"

# Show all running containers
dps:
	@docker ps --format "table {{.ID}}\t{{.Ports}}\t{{.Names}}"

# Up docker environment
up:
	docker-compose up -d
	make dps

# Down docker environment
down:
	docker stop $(shell docker ps -a -q)

# Refresh current DB
db-refresh:
	@npx knex migrate:rollback
    @npx knex migrate:latest
    @npx knex seed:run

db-up:
	@npx knex migrate:latest

db-down:
	@npx knex migrate:rollback