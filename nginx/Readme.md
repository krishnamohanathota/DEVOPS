### Nginx Satus

```shell
systemctl status nginx

● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2024-04-03 01:50:44 CDT; 3 weeks 3 days ago
     Docs: man:nginx(8)
 Main PID: 18015 (nginx)
    Tasks: 5 (limit: 4915)
      CPU: 57min 48.395s
   CGroup: /system.slice/nginx.service
           ├─18015 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           ├─18016 nginx: worker process
           ├─18017 nginx: worker process
           ├─18018 nginx: worker process
           └─18019 nginx: worker process
```

### Nginx Process

```shell
ps -ef --forest | grep nginx

user     13820  8484  0 09:40 pts/0    00:00:00              \_ grep nginx
root     18015     1  0 Apr03 ?        00:00:00 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
www-data 18016 18015  0 Apr03 ?        00:14:06  \_ nginx: worker process
www-data 18017 18015  0 Apr03 ?        00:14:15  \_ nginx: worker process
www-data 18018 18015  0 Apr03 ?        00:15:03  \_ nginx: worker process
www-data 18019 18015  0 Apr03 ?        00:14:23  \_ nginx: worker process
```

Here `Nginx` is running with the master process and 4 worker processes.

- `Master process` is responsible for reading and validating the configuration file, binding to ports and managing worker processes.

- `Worker processes` are responsible for handling the client requests.

- Nginx configuration file is located at `/etc/nginx/nginx.conf`. You can modify the configuration file to change the number of worker processes and user to run the worker processes.

```
nginx.conf

user www-data; --> worker processes will run as `www-data` user
worker_processes 4; --> Total 4 worker processes will be created
```

### Nginx version

```
nginx -v
nginx version: nginx/1.10.3
```

If you get the following error, then verify where the `nginx` binary is located.

```
nginx -v
-bash: nginx: command not found
```

```
whereis nginx
nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx /usr/share/man/man8/nginx.8.gz
```

```
/usr/sbin/nginx -v
nginx version: nginx/1.10.3
```

```
/usr/sbin/nginx -h
nginx version: nginx/1.10.3
Usage: nginx [-?hvVtTq] [-s signal] [-c filename] [-p prefix] [-g directives]

Options:
  -?,-h         : this help
  -v            : show version and exit
  -V            : show version and configure options then exit
  -t            : test configuration and exit
  -T            : test configuration, dump it and exit
  -q            : suppress non-error messages during configuration testing
  -s signal     : send signal to a master process: stop, quit, reopen, reload
  -p prefix     : set prefix path (default: /usr/share/nginx/)
  -c filename   : set configuration file (default: /etc/nginx/nginx.conf)
  -g directives : set global directives out of configuration file
```

```
yum -y install tcpdump

tcpdump -A -vvvv -s 9999 -i eth1 port 80 > /tmp/headers

```

This `tcpdump` command captures packets on interface `eth1` with destination port 80 (HTTP) and saves the packet data to a file named "headers" in the /tmp directory. Let's break down the options used:

-A: Print each packet (minus its link level header) in ASCII. This option is useful for capturing and analyzing the content of packets, particularly for protocols like HTTP where you want to inspect the `headers`.

-vvvv: Increase verbosity level. This option provides more detailed information about captured packets.

-s 9999: Set the snapshot length (number of bytes to capture) to 9999 bytes. This captures more data from each packet, allowing for better analysis of the packet contents.

-i eth1: Specifies the network interface to capture packets from. In this case, it's eth1.
port 80: Filter packets to only capture those with a destination port of 80 (HTTP).

> /tmp/headers: Redirects the output of tcpdump to a file named "headers" in the /tmp directory.
