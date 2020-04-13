DOCKER_NAME="loghog"
DOCKER_TAG="loghog/server"
DOCKERFILE_PATH="docker/server/Dockerfile"

default: dev

dev: destroy
	docker build -t $(DOCKER_TAG) -f $(DOCKERFILE_PATH) ./
	docker run -d --name $(DOCKER_NAME) -p '3000:3000' \
		--mount type=bind,source=$(PWD)/src,target=/home/app/src \
		--mount type=bind,source=$(PWD)/test,target=/home/app/test \
		--mount type=bind,source=$(PWD)/dist,target=/home/app/dist \
		$(DOCKER_TAG)

test:
	docker exec -it $(DOCKER_NAME) bash -c 'npm test'

build:
	docker exec -it $(DOCKER_NAME) bash -c 'npm run dist'

destroy:
	docker rm $(DOCKER_NAME) --force || true

.PHONY: default dev test build
