build:
	docker build -t nginx -< Dockerfile-alt
run:
	docker run --name nginx -d nginx
copy:
	docker cp ./nginx/nginx.conf nginx:/etc/nginx/nginx.conf