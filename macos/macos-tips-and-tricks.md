# MacOS Tips and Tricks

## How to fix slow appearing Dock

There are a couple of options if you want to change the behavior of the Dock when it is slow to appear. You can make it appear immediately so that it jumps straight out when you move the pointer to the bottom or the edge of the screen, or you can make it slide out faster. We’ll show you how to do both.

### How to make the Dock jump out

1. Go to `Applications > Utilities` and open Terminal.
2. Type the following command followed by Return: `defaults write com.apple.dock autohide-time-modifier -int 0; killall Dock`
3. Quit Terminal.

Now, test it by moving the mouse pointer over the bottom or edge of the screen. To return the Dock to its default behavior, do the following:

1. Open Terminal.
2. Type `defaults delete com.apple.dock autohide-time-modifier; killall Dock`
3. Press Return.
4. Quit Terminal.

### How to make the Dock slide out more quickly

If you don’t want the Dock to jump out but do want it to slide out more quickly, you can also do that with a Terminal command.

1. Open Terminal.
2. Type:

```bash
  defaults write com.apple.dock autohide-delay -int 0
  defaults write com.apple.dock autohide-time-modifier -float 0.45
  killall Dock
```

3. Press Return.
4. Quit Terminal.

You can replace ‘0.15’ in the command above with any number you choose. So, if you want to make it slide out even more quickly, you can make it lower. Experiment and choose a speed that works for you.

## SSH

SSH config is saved in the `<USERNAME>/.ssh/known_hosts` file

## Hosts

Local Hosts Database: `/etc/hosts`. Here are all host ip adresses saved like **localhost**, **broadcasthost**, ...

```

```
