# SFTP Installation on LXC Container

## Prerequisits

You need to have a LXC Container running Ubuntu 22.04.

## Installation

1. Update your system:

```bash
sudo apt update
```

2. Install `vsftp`, `ftp` and `ufw`:

```bash
sudo apt install vsftpd ftp ufw -y
```

3. Enable `vsftp`:

```bash
sudo systemctl enable vsftpd
```

4. Start `vsftp`:

```bash
sudo systemctl start vsftpd
```

5. Check if `vsftp`is online:

```bash
sudo systemctl status vsftpd
```

## Create an FTP User

1. Create a Linux user named **ftp_client**:

```bash
sudo useradd -m ftp_client
```

2. Set the password for your new user:

```bash
sudo passwd ftp_client
```

3. Create an example text file under the home directory of the new ftp_client user:

```bash
sudo -u ftp_client sh -c 'echo "This is the content in the file." > /home/ftp_client/testfile.txt'
```

4. Try to connect to the **sftp** server using the following command and enter your password when prompted:

```bash
sftp ftp_client@YOUR.IP.ADDRESS
```

## Credentials

Your credentials to connect to this **sftp** server are:

- HOST: <YOUR.IP.ADDRESS>
- PORT: 22
- USER: ftp_client
- PASSWORD: <YOUR_PASSWORD>
