# NMAP Commands

NMAP is a network mapping tool used to search for vulnerabilities on a specific server.

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
