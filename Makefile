dev:
	docker-compose -f docker-compose.yml up

prod:
	docker-compose -f docker-compose.prod.yml up

stop:
	docker-compose down
