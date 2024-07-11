# NMAP Commands

NMAP is a network mapping tool used to search for vulnerabilities on a specific server. An open-source tool for network discovery and security auditing.

## Installation

Install `nmap` on a linux server outside of the network you want to test for vulnerabilities:

```bash
apt install nmap -y
```

## Commands

- To scan all Ports:

```bash
nmap -sT YOUR.PUBLIC.IP.ADDRESS
```

- To scan for known Vulnerabilities:

```bash
nmap --script vuln YOUR.PUBLIC.IP.ADDRESS
```

## Further Vulnerability Analysis Tools

- **Armitage**: A graphical user interface (GUI) tool for the Metasploit project that illustrates targets and offers exploits suggestions.
- **Nikto2**: An open-source command-line vulnerability scanner for web servers.
- **W3AF**: An open-source web application scanner.
- **TCPDump**: is a program that does packet analysis. Packet analysis is the process of intercepting data as it travels through a network. Packets are data sent over a network. (**Wireshark** is an alternative)
