## Popular Linux distrubtions

`Ubuntu`: Ubuntu is a popular Linux distribution based on Debian. It's known for its user-friendly interface and robust community support. Ubuntu aims to provide a complete desktop environment while also being suitable for servers. It's often recommended for beginners due to its ease of use and extensive documentation.

`CentOS`: CentOS (Community Enterprise Operating System) is a Linux distribution based on the source code provided by Red Hat Enterprise Linux (RHEL). It's known for its stability, long-term support, and suitability for server environments. CentOS aims to provide a free, enterprise-class computing platform compatible with RHEL.

`Debian`: Debian is one of the oldest and most respected Linux distributions. It's known for its stability, adherence to free software principles, and commitment to open-source values. Debian serves as the upstream source for many other distributions, including Ubuntu.

## How to check OS Type

Many Linux distributions store information about the distribution version in the `/etc/os-release` or `/etc/\*-release` file.

```
root@server:~# cat /etc/os-release

PRETTY_NAME="Debian GNU/Linux 9 (stretch)"
NAME="Debian GNU/Linux"
VERSION_ID="9"
VERSION="9 (stretch)"
ID=debian
HOME_URL="https://www.debian.org/"
SUPPORT_URL="https://www.debian.org/support"
BUG_REPORT_URL="https://bugs.debian.org/"
```

### Version-specific command

Some distributions provide version-specific commands.

For example:
`Ubuntu`: lsb_release -a
`Debian`: cat /etc/debian_version
`CentOS`: cat /etc/centos-release

The `lsb_release` command is a standard tool for Linux distributions compliant with the Linux Standard Base (LSB).

```
root@server:~# lsb_release -a

No LSB modules are available.
Distributor ID:	Debian
Description:	Debian GNU/Linux 9.9 (stretch)
Release:	9.9
Codename:	stretch
```

```
root@server:~# cat /etc/debian_version
9.9
```

## Hostname

To check the hostname of your Debian server, you can use the following command:

```
hostname
```

Additionally, if you want to see the fully qualified domain name (FQDN) of your server, including the domain name, you can use the following command:

```
hostname -f
```

## netstat

Use the `netstat` command to list all open ports, including TCP and UDP, which are the most common protocols for packet transmission in the network layer.

The `netstat -lntu` command is used to display a list of listening TCP and UDP network connections on a Linux system, along with their associated port numbers. Here's what each option in the command does:

- -l: Displays only listening sockets, which are actively accepting incoming connections.
- -n: Shows numerical addresses and port numbers instead of resolving them to hostnames and service names.
- -t: Limits the output to TCP connections only.
- -u: Limits the output to UDP connections only.

When you run netstat -lntu, you'll see a list of listening TCP and UDP connections, including information such as the local address (IP address and port number), the state of the connection (for TCP connections), and the process that is listening on each port.

This command is useful for network troubleshooting, monitoring network activity, and identifying which services are actively listening for connections on your system.

```
root@server:~# netstat -lntu

Active Internet connections (only servers)

| Proto | Recv-Q | Send-Q | Local Address    | Foreign Address | State  |
|-------|--------|--------|------------------|-----------------|--------|
| tcp   | 0      | 0      | 0.0.0.0:25       | 0.0.0.0:*       | LISTEN |
| tcp   | 0      | 0      | 127.0.0.1:6010   | 0.0.0.0:*       | LISTEN |
| tcp   | 0      | 0      | 127.0.0.1:3306   | 0.0.0.0:*       | LISTEN |
| tcp   | 0      | 0      | 0.0.0.0:111      | 0.0.0.0:*       | LISTEN |
| tcp   | 0      | 0      | 127.0.0.1:81     | 0.0.0.0:*       | LISTEN |
| tcp   | 0      | 0      | 127.0.0.1:82     | 0.0.0.0:*       | LISTEN |
| tcp   | 0      | 0      | 0.0.0.0:150      | 0.0.0.0:*       | LISTEN |
| tcp6  | 0      | 0      | ::1:6010         | :::*            | LISTEN |
| tcp6  | 0      | 0      | :::443           | :::*            | LISTEN |
| tcp6  | 0      | 0      | :::111           | :::*            | LISTEN |
| tcp6  | 0      | 0      | :::80            | :::*            | LISTEN |
| tcp6  | 0      | 0      | :::150           | :::*            | LISTEN |
| udp   | 0      | 0      | 0.0.0.0:747      | 0.0.0.0:*       |        |
| udp   | 0      | 0      | 0.0.0.0:111      | 0.0.0.0:*       |        |
| udp6  | 0      | 0      | :::747           | :::*            |        |
| udp6  | 0      | 0      | :::111           | :::*            |        |
```

## How to identify the SSH Port

On `Debian-based` systems, the configuration file for SSH is typically located at `/etc/ssh/sshd_config`. Open this file and search for the `Port` directive.

```
vi /etc/ssh/sshd_config

# Package generated configuration file
# See the sshd_config(5) manpage for details

# What ports, IPs and protocols we listen for
Port 150
# Use these options to restrict which interfaces/protocols sshd will bind to
#ListenAddress ::
#ListenAddress 0.0.0.0
Protocol 2
.....
.....
.....
.....
.....
.....
```
