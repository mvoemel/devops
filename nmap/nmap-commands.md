# NMAP Commands

NMAP is a network mapping tool used to search for vulnerabilities on a specific server. An open-source tool for network discovery and security auditing.

## Installation

```bash
sudo apt install nmap -y   # Debian/Ubuntu
brew install nmap          # macOS
```

## Commands

```bash
# Basic ping scan - find all active hosts
nmap -sn 192.168.1.0/24

# Detailed scan - OS detection, services, versions
sudo nmap -A 192.168.1.0/24

# Quick scan of most common ports
nmap -F 192.168.1.0/24

# Scan and show MAC addresses + vendor info
sudo nmap -sn --min-rate=300 192.168.1.0/24

# Scan all ports for a specific ip
nmap -sT 192.168.1.69

# Scan known vulnerabilities for a specific ip
nmap --script vuln 192.168.1.69
```

_Note: Replace `192.168.1.0/24` with your actual subnet and `192.168.1.69` with the ip address of the device you want to test._

## Further Vulnerability Analysis Tools

- **Armitage**: A graphical user interface (GUI) tool for the Metasploit project that illustrates targets and offers exploits suggestions.
- **Nikto2**: An open-source command-line vulnerability scanner for web servers.
- **W3AF**: An open-source web application scanner.
- **TCPDump**: is a program that does packet analysis. Packet analysis is the process of intercepting data as it travels through a network. Packets are data sent over a network. (**Wireshark** is an alternative)
