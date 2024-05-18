# GitLab Runner Pipeline Deployment

## Prerequisits

You need to have either a local GitLab instance running or use the GitLab Cloud. You need to have at least two additional Ubuntu containers running, one for the GitLab Runner and one for the Deployment of your application. Also you can instead of having an additional deployment container, deploy directly on the GitLab Runner, but this is not recommended.

## Installation

### Create Ubuntu Container

Create an Ubuntu Container (using for example Proxmox) and make sure you can ssh into it using the following command (if you cannot ssh into it you probably need to change the following, `nano /etc/ssh/sshd_config` than change `PermitRootLogin without-password` to `PermitRootLogin yes` in the Proxmox console).

```shell
ssh root@192.168.1.XXX
```

### Configure GitLab Runner on Ubuntu Container

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
gitlab-runner register --url http://gitlab.yourwebsite.com --token XXXX-XXXXXXXXXXXXX-XXXXXX
```

7. Choose either the `shell` executer or the `docker` executer (if you plan on using docker) when prompted by the command line.

8. (Optional) Manually verify that the runner is available to pick up jobs:

```shell
gitlab-runner run
```

9. (Optional) Create SSH key (Is recommended if GitLab connects to the runner via internet and not via local network).

### Configure Deployment Container

You only need to fulfil this step if you want to deploy the application on a separate container.

1. **Create Ubuntu Container** (using for example Proxmox) and make sure you can ssh into it.
2. **Setup public SSH key** for the Ubuntu container so you can SSH into it using only the private key:

- **Generate SSH Key Pair**: If you haven't already generated an SSH key pair on your local machine, you can do so by running the following command in your terminal:

```bash
ssh-keygen -t rsa
```

This will generate a pair of keys: a private key (`id_rsa`) and a public key (`id_rsa.pub`).

- **Copy the Public Key to the Container**: You can copy the contents of your public key (`id_rsa.pub`) to the `~/.ssh/authorized_keys` file on the Ubuntu container. You can do this manually or by using the `ssh-copy-id` command. Since you're not able to directly use `ssh-copy-id` because you need a password to SSH into the container, you can manually copy the public key over SSH. Here's how you can do it:

```bash
cat ~/.ssh/id_rsa.pub | ssh root@your-ip-address 'cat >> ~/.ssh/authorized_keys'
```

Replace `your-ip-address` with the IP address of your Ubuntu container.

- **Set Proper Permissions**: After copying the public key, you need to ensure that the `authorized_keys` file and the `.ssh` directory have the correct permissions. Run the following commands inside the container:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

- **Test SSH Login**: Now, try to SSH into the container using your private key:

```bash
ssh -i ~/.ssh/id_rsa root@your-ip-address
```

If everything is set up correctly, you should be able to log in without being prompted for a password.

3. **Setup Private SSH Key Variable in the GitLab CI/CD Settings** so GitLab can connect to your Ubuntu server:

- **Add Variable to your GitLab instance**: Navigate to your Project `Settings` and click on `CI/CD`. Then scroll down to the `Variables` section and expand it. After that press on `Add Variable` and give it the name `SSH_PRIVATE_KEY_DEPLOYMENT`. For the value navigate to the saved location of the private key on your local machine and run the following command:

```bash
cat ~/.ssh/id_rsa
```

Copy the key and paste it in the `Value` tab in your GitLab instance. Make sure that you have an empty line after the `-----END OPENSSH PRIVATE KEY-----` so that GitLab formats the file right. Select `File` in the `Type` tab.

4. (Optional) **Install applications** that you might need for the deployment. For example git, docker, apache2 or nginx, npm and node with nvm , etc.

### Configure gitlab-ci.yml File

The following is a job definition in a `gitlab-ci.yml` file to connect to the deployment container:

```yml
deploy: # Job to deploy to deployment container
  stage: deploy # Define the stage in which you want to run this job
  tags: # Define which runners can run this job
    - frontend
  before_script:
    - chmod 400 $SSH_PRIVATE_KEY_DEPLOYMENT
  script:
    - ssh -o StrictHostKeyChecking=no -i $SSH_PRIVATE_KEY_DEPLOYMENT root@$DEPLOYMENT_SERVER_IP
    - echo "Connected to Deployment Container"
```

You need to change the access pattern of the `SSH_PRIVATE_KEY_DEPLOYMENT` file because GitLab adds too loose access to the file (you can check the access pattern of your local SSH key file by running `ls -l ~/.ssh/id_rsa` ). We need to add a `before_script` to the yml file and change the permission to a stricter permission.

We need to add the `StrictHostKeyChecking=no` option so that it skips the part where the console asks the user if he wants to add the fingerprint to known hosts.

## Resources

- [Install GitLab Runner](https://docs.gitlab.com/runner/install/linux-repository.html)
- [Register GitLab Runner](https://docs.gitlab.com/runner/register/index.html)
- [Pipeline with GitLab CI/CD](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-continuous-deployment-pipeline-with-gitlab-on-ubuntu)
