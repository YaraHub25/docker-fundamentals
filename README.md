# docker-fundamentals

A Dockerized web application for WCAG 2.2 color contrast checking, alongside a hands-on exploration of core Docker concepts including image management, container lifecycle, and runtime behavior.

## Why I built this

During accessibility audits across multiple frontend projects, I found myself manually checking color contrast ratios against WCAG 2.2 standards repeatedly. I built and containerized this tool to automate that process — making compliance checking immediately accessible from any environment without local setup.

---

## a11y Contrast Checker

A web app that computes contrast ratios between two colors and evaluates AA and AAA compliance at both normal and large text sizes.

### WCAG 2.2 Requirements

| Level | Normal Text | Large Text |
|-------|-------------|------------|
| AA    | 4.5:1       | 3.0:1      |
| AAA   | 7.0:1       | 4.5:1      |

### How to run

**With Docker Compose (recommended):**
```bash
docker compose up --build
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

**With Docker directly:**
```bash
docker build -t a11y-contrast-checker ./app
docker run -p 3000:3000 a11y-contrast-checker
```

### API usage

```bash
curl -X POST http://localhost:3000/check \
  -H "Content-Type: application/json" \
  -d '{"foreground": "#ffffff", "background": "#6c63ff"}'
```

Response:
```json
{
  "foreground": "#ffffff",
  "background": "#6c63ff",
  "contrastRatio": 4.55,
  "wcag": {
    "AA":  { "normalText": true,  "largeText": true },
    "AAA": { "normalText": false, "largeText": true }
  }
}
```

---

## Docker Fundamentals Demo

A reference script covering core Docker commands for working with images and containers.

```bash
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

# See all containers including exited ones
docker ps -a
```

**Images** are read-only templates pulled from Docker Hub. **Containers** are running instances of those images. When a container has no command to run, it exits immediately — this is expected behavior, not an error.

---

## Project structure

```
docker-fundamentals/
├── docker-compose.yml       # Service configuration
├── docker-demo.sh           # Docker fundamentals reference script
└── app/
    ├── Dockerfile           # Container build instructions
    ├── server.js            # Express API with WCAG contrast logic
    ├── package.json
    └── public/
        └── index.html       # Browser UI
```

## Tech stack

Node.js · Express · Docker · WCAG 2.2

## Environment

Tested on macOS (Apple Silicon) with Docker Desktop 28.x and Ubuntu 24.04 LTS (ARM).
