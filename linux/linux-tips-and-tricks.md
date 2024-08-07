# Linux Tips and Tricks

## Add new User

```bash
adduser [YOUR_USERNAME]
```

You are then prompted to give a password and some information about the user. Type your desired password and skip the additional information by hitting Enter.

(Optional) Make this user a sudo user:

```bash
usermod -aG sudo [YOUR_USERNAME]
```
