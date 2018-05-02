app_config_yaml 		:= app-config/app.config.yaml
jedi_api_private_key	:= jedi-api-private-key/jedi-api.key
jedi_api_public_key		:= jedi-api-public-key/jedi-api-key.pem
test-config 			:= $(app_config_yaml) $(jedi_api_private_key) $(jedi_api_public_key)

test: test-config
	docker build -t api-gateway .
	docker run --volume $(CURDIR)/app-config:/var/app/app-config:ro \
	           --volume $(CURDIR)/jedi-api-private-key:/var/app/jedi-api-private-key:ro \
	           --volume $(CURDIR)/jedi-api-public-key:/var/app/jedi-api-public-key:ro \
			   --tty \
			   api-gateway node_modules/jest/bin/jest.js