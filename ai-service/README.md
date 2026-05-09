# Mobile Risk Reporter - AI Service

AI-powered Flask microservice for generating workplace risk reports, descriptions, and recommendations using Groq LLM.

---

# Tech Stack

- Python
- Flask
- Groq API
- Redis
- Docker
- Flask-CORS

---

# Features

- AI-generated risk reports
- Risk recommendations
- Risk description analysis
- Redis caching with TTL
- Health monitoring endpoint
- Response time tracking
- AI fallback handling
- Security headers enabled

---

# Project Structure

```plaintext
ai-service/
│
├── app.py
├── requirements.txt
├── Dockerfile
├── .env
│
├── prompts/
│   ├── report.txt
│   ├── describe.txt
│   └── recommend.txt
│
├── routes/
│   ├── report.py
│   ├── describe.py
│   └── recommend.py
│
└── services/
    ├── groq_service.py
    ├── cache_service.py
    └── metrics.py
```

---

# Environment Variables

Create a `.env` file inside `ai-service/`.

```env
GROQ_API_KEY=your_groq_api_key
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

# Installation

## 1. Clone Repository

```bash
git clone <repo-url>
cd ai-service
```

---

## 2. Create Virtual Environment

### macOS/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Running Redis

## macOS

```bash
brew services start redis
```

## Ubuntu

```bash
sudo service redis-server start
```

---

# Run Application

```bash
python app.py
```

Server runs at:

```plaintext
http://localhost:5000
```

---

# API Reference

---

# 1. Generate Risk Report

## Endpoint

```http
POST /generate-report
```

## Request Body

```json
{
  "text": "Water leakage near electrical panel"
}
```

## Example Response

```json
{
  "title": "Electrical Panel Water Leakage Risk",
  "summary": "Water leakage near electrical panel poses electrical hazards.",
  "overview": "Water leakage near live electrical systems can lead to shocks and fire.",
  "key_items": [
    "Electrical shock risk",
    "Fire hazard"
  ],
  "recommendations": [
    "Shut down electrical panel",
    "Repair water leakage immediately"
  ],
  "cached": false,
  "is_fallback": false,
  "response_time": 1.24
}
```

---

# 2. Describe Risk

## Endpoint

```http
POST /describe
```

## Request Body

```json
{
  "text": "Loose scaffolding on construction site"
}
```

## Example Response

```json
{
  "description": "Loose scaffolding can collapse and cause serious injuries to workers.",
  "cached": false,
  "response_time": 1.03
}
```

---

# 3. Recommend Actions

## Endpoint

```http
POST /recommend
```

## Request Body

```json
{
  "text": "Oil spill near heavy machinery"
}
```

## Example Response

```json
{
  "recommendations": [
    "Clean spill immediately",
    "Restrict worker access",
    "Inspect machinery"
  ],
  "cached": false,
  "response_time": 0.92
}
```

---

# Health Endpoint

## Endpoint

```http
GET /health
```

## Example Response

```json
{
  "status": "ok",
  "model": "llama-3.3-70b-versatile",
  "avg_response_time": 0.73,
  "uptime": 88.44
}
```

---

# Redis Cache

- SHA256-based cache keys
- 15-minute TTL
- Cached responses improve average response time

---

# AI Fallback Handling

If Groq API fails:

```json
{
  "is_fallback": true
}
```

Fallback responses prevent server crashes and maintain API availability.

---

# Docker Support

## Build Image

```bash
docker build -t ai-service .
```

## Run Container

```bash
docker run -p 5000:5000 ai-service
```

---

# Security Features

- X-Frame-Options
- Content-Security-Policy
- Referrer-Policy
- X-Content-Type-Options

---

# Author

Arohi Singh