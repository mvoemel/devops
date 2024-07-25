# Docker Commands

- Running a docker container:

```bash
docker run -d -p [LOCAL_MACHINE_PORT]:[DOCKER_CONTAINER_PORT] --name [CONTAINER_NAME] -e [ENV_VAR_KEY]=[ENV_VAR_VALUE] [IMAGE_NAME]
```

- Overide the default command:

```bash
docker run -it [IMAGE_ID_OR_IMAGE_TAG] [CMD]
```

- Check all containers:

```bash
docker ps -a
```

- Check all images:

```bash
docker images
```

- Login into docker to pull images:

```bash
docker login -u YOUR_USERNAME -p YOUR_PASSWORD
```

- Delete all containers with exited status:

```bash
docker rm -v $(docker ps --filter status=exited -q)
```

- Delete an image:

```bash
docker image rm yourimage:yourtag
```

- Run a command inside a docker container:

```bash
docker exec -it [CONTAINER_ID] [COMMAND]
```

- Open a shell inside a docker container:

```bash
docker exec -it [CONTAINER_ID] sh
```
