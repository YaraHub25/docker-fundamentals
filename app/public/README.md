# a11y Contrast Checker

A Dockerized web application that computes WCAG 2.2 color contrast ratios and evaluates AA and AAA compliance — built to make accessibility auditing faster for designers and developers.

## Why I built this

During accessibility audits across multiple frontend projects, I found myself manually checking color contrast ratios against WCAG 2.2 standards repeatedly. I built and containerized this tool to automate that process and make compliance checking immediately accessible from any environment without local setup.

## What it does

- Accepts any two hex colors (foreground and background)
- Computes the contrast ratio using the WCAG 2.2 relative luminance formula
- Returns pass/fail results for AA and AAA compliance at both normal and large text sizes
- Serves a clean UI and a REST API endpoint

## WCAG 2.2 Contrast Requirements

| Level | Normal Text | Large Text |
|-------|------------|------------|
| AA    | 4.5:1      | 3.0:1      |
| AAA   | 7.0:1      | 4.5:1      |

## Project structure

```
docker-fundamentals/
├── Dockerfile              # Container build instructions
├── docker-compose.yml      # Service configuration
├── docker-demo.sh          # Docker fundamentals reference script
└── app/
    ├── server.js           # Express API with WCAG contrast logic
    ├── package.json
    └── public/
        └── index.html      # Browser UI
```

## How to run

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

**API usage:**
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

## Tech stack

Node.js · Express · Docker · WCAG 2.2

## Environment

Tested on macOS (Apple Silicon) with Docker Desktop 28.x.