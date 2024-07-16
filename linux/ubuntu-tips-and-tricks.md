# Ubuntu Tips and Tricks

## Peripheral Devices

`lsblk` will show all of the drives and mountpoints, including USB.

`lspci` will show hardware, including peripherals.

`dmesg` will show latest kernel messages, which includes peripheral connects/disconnects.

`lsusb` will list all USB devices.

`lspnp` all legacy PnP devices.

`lsscsi` all SCSI devices.

`lscpu` all CPUs.

## Graphics Card

Check if the GPU is detected by the system: First, ensure that your system recognizes the GPU.

```bash
lspci | grep -i nvidia
```

or

```bash
lspci -vnnn | perl -lne 'print if /^\d+\:.+(\[\S+\:\S+\])/' | grep VGA
```

Check installed Nvidia drivers, GPU power ussage, etc.

```bash
nvidia-smi
```

To check performace and ussage of Nvidia GPU in real time.

```bash
watch -n 0.5 nvidia-smi
```

## Port Scanning

```bash
sudo netstat -ntlp
```

If the netstat command is not available, install it with:

```bash
sudo apt install net-tools
```

Alternatively you could use `nmap`.

## Ollama with WebUI

Run WebUI docker container on Port 8080.

```bash
docker run -d --network=host -v open-webui:/app/backend/data -e OLLAMA_BASE_URL=http://127.0.0.1:11434 --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```
