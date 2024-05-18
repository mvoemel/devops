# Docker Installation on LXC Container

## Prerequisits

You need a LXC container with sudo access.

## Installation

1. Set up Docker's `apt` repository.

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

2. Install the Docker packages.

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

3. Verify that the Docker Engine installation is successful by running the `hello-world` image.

```bash
sudo docker run hello-world
```

4. (Troubleshooting) If you get the following error:

```bash
docker: Error response from daemon: AppArmor enabled on system but the docker-default profile could not be loaded: running `/usr/sbin/apparmor_parser apparmor_parser -Kr /var/lib/docker/tmp/docker-default1508562643` failed with output: apparmor_parser: Unable to replace "docker-default".  Permission denied; attempted to load a profile while confined?

error: exit status 243.
```

it is because `docker` has some troubles with **LXC containers** and `apparmor`. You can either remove `apparmor` (if you want to expose the application to the internet this is not recommended):

```bash
sudo apt-get remove apparmor
```

or you could try to fix the issue the following way:

```bash
apt-get install apparmor
apt install apparmor-utils
# add apparmor:unconfined in the settings
```

## Portainer

If you want to also install `portainer` do the following:

1. Make sure `docker` and `docker-compose` is installed by running `docker-compose --version`.

2. Pull the `portainer` image:

```bash
docker pull portainer/portainer-ce:latest
```

3. Start the `portainer` container:

```bash
docker run -d -p 9000:9000 --restart always -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer-ce:latest
```

4. Verify the container is running:

```bash
docker ps
```

5. Visit `http://server-ip:9000` and follow the steps displayed.

## Resources

- [Install Portainer Ubuntu](https://www.cherryservers.com/blog/install-portainer-ubuntu)
