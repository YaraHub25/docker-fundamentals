# Docker Fundamentals

A hands-on exploration of core Docker concepts including image management, container lifecycle, and runtime behavior using lightweight containers.

## What this covers

- Verifying a Docker installation with `hello-world`
- Pulling images from Docker Hub
- Running containers with and without commands
- Inspecting running and exited containers

## Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

## How to run

Clone the repo and run the demo script:

```bash
git clone https://github.com/YaraHub25/docker-fundamentals.git
cd docker-fundamentals
chmod +x docker-demo.sh
./docker-demo.sh
```

Or run individual commands manually:

```bash
# Verify Docker works
docker run hello-world

# Pull a lightweight image
docker pull busybox

# Run a command inside a container
docker run busybox echo "hello world from Yara"

# See all containers (including exited)
docker ps -a
```

## Key concepts demonstrated

**Images** are read-only templates pulled from Docker Hub. **Containers** are running instances of those images. When a container has no command to run, it exits immediately — this is expected behavior, not an error.

`docker ps` shows only active containers. `docker ps -a` shows all containers including ones that have already exited, which is useful for debugging and reviewing history.

## Environment

Tested on Ubuntu 24.04 LTS (ARM) and macOS with Docker Desktop.