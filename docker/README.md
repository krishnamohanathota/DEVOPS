## Docker

### Dockerfile

```Dockerfile
# Start from a Node.js 16 (LTS) image. Every Dockerfile builds on other container images. This line specifies that we are starting from the node:16 image on the Docker Hub. This is a preconfigured image with Node.js 16.
FROM node:16

# Specify the directory inside the image in which all commands will run
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package\*.json ./ RUN npm install
RUN npm install express

# Copy all of the app files into the image except the files those are included in .dockerignore file.
COPY . .

# The default command to run when starting the container
CMD [ "npm", "start" ]
```

### .dockerignore

```dockerignore
# Ignore all files that start with a dot
.*

# Ignore the node_modules directory, and everything in it
node_moduless
```

### Docker build

```bash
docker build -t <your username>/node-web-app .
```

### Docker images

To see the list of images:

```bash
docker images
```

### Docker remove image

```bash
docker rmi <image id>
docker rmi <tag-name>
```

### Docker run

```bash
docker run -p <machine-port>:<container-port> -d <your username>/node-web-app
docker run -p 49160:8080 -d <your username>/node-web-app
```

CPU and memory limits can be specified with the `--cpus` and `--memory` flags. For example, to limit the container to 1 CPU and 512MB of memory:

```bash
docker run -p 49160:8080 -d --cpus="1" --memory="512m" <your username>/node-web-app
```

### List of running containers

```bash
docker ps
```

### Stop a container

```bash
docker stop <container id>
```

### Docker logs

```bash
docker logs <container id>
```

#### Get latest logs:

```bash
docker logs -f <container id>
```

### Docker stats

```bash
docker stats <container id>
```

example:

    CONTAINER ID   NAME      CPU %     MEM USAGE / LIMIT    MEM %     NET I/O         BLOCK I/O        PIDS
    c0ffc3b4f687   test     105.55%   2.047GiB / 8.97GiB   22.82%    1.61kB / 232B   173MB / 9.03MB    86

### Docker top

To display the running processes within a Docker container.

```bash
docker top <container id>
```

example:

    docker port c0ffc3b4f687

    PID    USER     TIME    COMMAND
    1      root     0:00    npm
    8      root     0:00    node server.js

### Docker port

```bash
docker port <container id>
```

    docker port c0ffc3b4f687

    4569/tcp -> 0.0.0.0:4569
    4572/tcp -> 0.0.0.0:4572
    4575/tcp -> 0.0.0.0:4575
    4576/tcp -> 0.0.0.0:4576
    8080/tcp -> 0.0.0.0:6060

### Docker rename

```bash
docker rename <container id> <new name>
```

### Docker rm

```bash
docker rm <container id>
```

### Docker exec

`exec` command allows you to run a command inside a Docker container. For example, to get a shell into your container you can use the following command:

```bash
docker exec -it <container id> /bin/bash
```

### Docker login

```bash
docker login
```

### Docker push

To push a Docker image to a Docker registry, making it available for others to download and use.

```bash
docker push <your username>/node-web-app
```

### Docker pull

To download a Docker image from a Docker registry

```bash
docker pull <your username>/node-web-app
```

### Docker tag

To assign a new tag to an existing Docker image. This allows you to create a new reference to the image with a different tag, making it easier to manage and share.

```bash
docker tag <image id> <your username>/node-web-app:<tag-name>
```

### Docker logout

To log out from a Docker registry

```bash
docker logout
```

### Docker history

To display the history of an image, showing the intermediate images that were built on top of it.

```bash
docker history <image id>
```

    IMAGE               CREATED             CREATED BY                                      SIZE
    abcdef123456        2022-03-15          /bin/sh -c #(nop) COPY index.html /var/www      123MB
    0123456789ab        2022-03-14          /bin/sh -c #(nop) RUN npm install               256MB

In the above example, the output displays two layers. The first layer was created by copying an `index.html` file into the `/var/www directory`, while the second layer was created by running the `npm install` command.

The docker history command can help you understand the composition of an image and the `sequence of steps` that were taken to build it. It provides insights into the commands, files, and changes made at each layer of the image's construction.

`Dockefile` that generates a similar history as above:

```
FROM base_image:tag
COPY index.html /var/www
RUN npm install
```

### Docker inspect

To display metadata about that specific image. This information can be useful for troubleshooting, debugging, or understanding the configuration and properties of an image

```bash
docker inspect <image id>
```

### Docker diff

To display the changes made to the filesystem of a running Docker container compared to its base image. It shows the differences between the container's current filesystem state and the initial state defined by its image.

```bash
docker diff <container id>
```

The output of the `docker diff` command will list the files and directories that have been added, modified, or deleted within the container since it was started. The output is presented in a format that indicates the type of change for each entry. Here are the possible symbols and their meanings:

    A: Added file or directory
    C: Changed file or directory
    D: Deleted file or directory

example:

    docker diff 889e6fa8692a

    C /tmp
    A /tmp/mongodb-27017.sock
    C /etc
    A /etc/mongo

### Docker commit

When should you use `docker commit`? The `docker commit` command allows you to create a new image from the current state of a container. This is useful for capturing the state of a container and saving it as an image. For example, you might want to capture the state of a container that you have been working on, so that you can share it with others or use it as a starting point for new containers.

```bash
docker commit <container_id> <new_image_name>
docker commit <container id> <your username>/node-web-app
```

### Docker save

```bash
docker save <image id> > node-web-app.tar
```

---

### Docker Layer Caching

Docker uses a layered architecture. Each instruction in a Dockerfile creates a layer in the image. When you change a Dockerfile and rebuild the image, only the layers that are affected by this change are rebuilt. This is called layer caching.

To understand this more fully, consider two images:

```
└── layer A: contains a base OS
└── layer B: adds source code server.js
└── layer C: installs the 'node' package
```

If you change the source code in server.js and rebuild the image, Docker will only rebuild layer B and layer C. Layer A will be cached and reused.

versus:

```
.
└── layer A: contains a base OS
└── layer B: installs the 'node' package
└── layer C: adds source code server.js
```

If you change the source code in server.js and rebuild the image, Docker will only rebuild layer C. Layers A and B will be cached and reused.

In general, you need to order your layers from least likely to change to most likely to change in order to optimize the image size for pushing and pulling.

---

### Instructions in Dockerfile

---

#### FROM

The `FROM` instruction sets the base image for subsequent instructions. It has two forms:

    FROM <image>
    FROM <image>:<tag>

The `FROM` instruction must be the first instruction in a Dockerfile. If it is not, Docker will return an error.

#### ENV

The `ENV` instruction sets an environment variable in the container. It has two forms:

    ENV <key> <value>
    ENV <key>=<value> ...

#### ARG

The `ARG` instruction defines a variable that can be passed to the `docker build` command using the `--build-arg` flag. It has two forms:

    ARG <name>[=<default value>]
    ARG <name> <default value> ...

#### WORKDIR

The `WORKDIR` instruction sets the working directory for subsequent instructions. It has two forms:

    WORKDIR <path>
    WORKDIR ["<path>"]

#### ADD

The `ADD` instruction copies new files, directories, or remote file `URLs` from `<src>` and adds them to the filesystem of the image at the path `<dest>`. It has two forms:

    ADD <src> <dest>
    ADD ["<src>", ... "<dest>"]

    ADD app.jar /app/
    ADD https://example.com/file.txt /app/

#### COPY

The `COPY` instruction copies new files or directories from `<src>` and adds them to the filesystem of the image at the path `<dest>`. It has two forms:

    COPY <src> <dest>
    COPY ["<src>", ... "<dest>"]

#### ADD vs COPY

Use `COPY` for basic file and directory copying.

Use `ADD` when you need the extra functionality, such as URL retrieval or automatic extraction of compressed files.

#### VOLUME

The VOLUME instruction is commonly used for scenarios where you need to store or share persistent data, such as application logs, databases, or any other data that should be kept separate from the container's filesystem. It enables you to decouple data storage from the container itself, making it easier to manage and maintain your Dockerized applications.

The `VOLUME` instruction creates a mount point with the specified name and marks it as holding externally mounted volumes from native host or other containers. It has two forms:

    VOLUME <mountpoint>
    VOLUME ["<mountpoint>"]

Example:

    FROM ubuntu:latest
    VOLUME /data

This indicates that any data written to `/data` in the container will be stored outside the container and will persist even if the container is stopped or removed.

After building an image from this Dockerfile, you can use the -v option when running the container to mount a host directory or another container volume at the designated /data mount point. For example:

    docker run -v /home/user1/host_dir:/data <image>

above command will mount the `/home/user1/host_dir` directory on the host to the `/data` directory in the container.

You can use the VOLUME array syntax to declare multiple volumes in a single instruction

    VOLUME /data
    VOLUME ["/data"]
    VOLUME ["/data1", "/data2", "/data3"]

#### RUN

The `RUN` instruction executes a command in the current shell environment. It has two forms:

    RUN <command>
    RUN ["executable", "param1", "param2"]

How to execute cURL command in Dockerfile:

    RUN curl -sSL https://get.docker.com/ | sh
    RUN curl -sSO https://abc.com/abc.jar

#### CMD

The `CMD` instruction specifies the default command to run when the container is started. It has two forms:

    CMD <command>
    CMD ["executable", "param1", "param2"]

#### ENTRYPOINT

The `ENTRYPOINT` instruction specifies the default command to run when the container is started. It has two forms:

    ENTRYPOINT <command>
    ENTRYPOINT ["executable", "param1", "param2"]

#### EXPOSE

The `EXPOSE` instruction exposes a port on the container. It has two forms:

    EXPOSE <port>
    EXPOSE <port>/<protocol>

#### USER

The `USER` instruction sets the user that will run the subsequent instructions. It has two forms:

    USER <username>
    USER <UID>

---

### Privileged ports

Privileged ports are ports that are reserved for use by the root user. They are typically used for services that require elevated privileges to run, such as web servers and database servers.

How to allow the Java process to bind to privileged ports (ports below `1024`) even when running as a non-root user ?

    RUN setcap 'cap_net_bind_service=+ep' /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java
    RUN setcap  cap_net_bind_service=+ep $(readlink -f $(command -v java)) # Allow to bind privileged ports

### Dynamic linker/loader

The dynamic linker/loader is a program that is responsible for resolving shared library dependencies at runtime. It is used by the operating system to load and link shared libraries when executing a program.

    RUN echo "${JAVA_HOME}/jre/lib/amd64/jli" > /etc/ld.so.conf.d/java.conf && ldconfig

This command writes the path `${JAVA_HOME}/jre/lib/amd64/jli` to the file `/etc/ld.so.conf.d/java.conf`. This configuration file is used by the system's dynamic linker/loader (ld.so) to specify additional directories where shared libraries should be searched for at runtime.

The `ldconfig` command updates the dynamic linker/loader cache, which is responsible for resolving shared library dependencies at runtime. By running ldconfig, the system updates the cache to include the path specified in the /etc/ld.so.conf.d/java.conf file, ensuring that the dynamic linker/loader can find the necessary shared libraries when executing Java programs.

---

### Docker vs Virtual Machines

Docker containers are often compared to virtual machines (VMs), but they are actually quite different. A virtual machine is a virtualized operating system that runs on top of a physical hardware. A Docker container is a virtualized runtime environment that runs on top of an operating system. This means that Docker containers are much more lightweight than VMs. They are also much faster to start and stop.

### Docker vs Kubernetes

Docker is a container runtime. Kubernetes is a container orchestration system. Kubernetes is used to manage a cluster of Docker containers. It can be used to deploy, scale, and manage Docker containers across multiple machines.

### Docker vs Docker Compose

Docker Compose is a tool for defining and running multi-container Docker applications. It is used to define the services that make up an application and how they interact with each other. It is also used to start and stop the application. Docker Compose is often used in conjunction with Docker Swarm, which is a container orchestration system.
