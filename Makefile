
build:
	docker build -t nginx -< Dockerfile-alt

run:
	docker run --volume $(CURDIR)/nginx/nginx.conf:/etc/nginx/ --name="$(APP_NAME)" $(APP_NAME)

