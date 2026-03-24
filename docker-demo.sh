#!/bin/bash
# =============================================================
# Docker Fundamentals Demo
# Author: Yara Vasquez
#
# Demonstrates core Docker concepts:
#   - Verifying Docker installation
#   - Pulling and running images
#   - Container lifecycle management
#   - Inspecting running and exited containers
# =============================================================

echo "=============================================="
echo " Docker Fundamentals Demo"
echo "=============================================="

# --------------------------------------------------------------
# Step 1: Confirm Docker is installed and running
# --------------------------------------------------------------
echo ""
echo "[1] Checking Docker version..."
docker --version

echo ""
echo "[2] Verifying Docker is running with hello-world..."
docker run hello-world

# --------------------------------------------------------------
# Step 2: Pull a lightweight image from Docker Hub
# --------------------------------------------------------------
echo ""
echo "[3] Pulling the busybox image from Docker Hub..."
docker pull busybox

# --------------------------------------------------------------
# Step 3: List all locally available images
# --------------------------------------------------------------
echo ""
echo "[4] Listing all local Docker images..."
docker images

# --------------------------------------------------------------
# Step 4: Run the busybox container with a command
# Running without a command exits immediately — this is expected
# --------------------------------------------------------------
echo ""
echo "[5] Running busybox with no command (exits immediately)..."
docker run busybox

echo ""
echo "[6] Running busybox and executing a command inside it..."
docker run busybox echo "hello world from Yara"

# --------------------------------------------------------------
# Step 5: Inspect container state
# --------------------------------------------------------------
echo ""
echo "[7] Checking currently running containers..."
docker ps

echo ""
echo "[8] Listing all containers including exited ones..."
docker ps -a

# --------------------------------------------------------------
# Step 6: Run busybox interactively (optional exploration)
# Uncomment the line below to drop into a shell inside busybox
# --------------------------------------------------------------
# docker run -it busybox sh

echo ""
echo "=============================================="
echo " Demo complete."
echo " Use 'docker ps -a' to review container history."
echo "=============================================="