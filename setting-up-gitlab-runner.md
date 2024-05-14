# Setting Up GitLab Runner

## Create Ubuntu Container

Create an Ubuntu Container (using for example Proxmox) and make sure you can ssh into it using the following command (if you cannot ssh into it you probably need to change the following, `nano /etc/ssh/sshd_config` than change `PermitRootLogin without-password` to `PermitRootLogin yes` in the Proxmox console).

```shell
ssh root@192.168.1.XXX
```

## Configure GitLab Runner on container

1. Install `curl` command with `apt install curl`

2. In your GitLab instance navigate to and create a GitLab runner

3. Install GitLab Runner:

```shell
# Download the binary for your system
sudo curl -L --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64

# Give it permission to execute
sudo chmod +x /usr/local/bin/gitlab-runner

# Create a GitLab Runner user
sudo useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash

# Install and run as a service
sudo gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner
sudo gitlab-runner start
```

4. (Optional) Update GitLab Runner:

```shell
sudo apt-get update
sudo apt-get install gitlab-runner
```

5. Verify the installation by checking the service status: `systemctl status gitlab-runner` and/or check GitLab Runner Version: `gitlab-runner -v`

6. Register GitLab Runner:

```shell
gitlab-runner register --url http://gitlab.microshield.tech --token XXXX-XXXXXXXXXXXXX-XXXXXX
```

7. Choose either the `shell` executer or the `docker` executer (if you plan on using docker) when prompted by the command line.

8. (Optional) Manually verify that the runner is available to pick up jobs:

```shell
gitlab-runner run
```

9. (Optional) Create SSH key (Is recommended if GitLab connects to the runner via internet and not via local network)
