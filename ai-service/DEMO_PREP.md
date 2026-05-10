# Demo Prep — Day 18
## Mobile Risk Reporter App — AI Developer 2
### Demo Day: 9 May 2026

---

## My Demo Segment (60 seconds)

### What I Show:

POST /recommend  — AI recommendations
POST /generate-report — Full report
Flask + Groq explanation (60 sec)
GET /health — monitoring endpoint


---

## Step by Step Demo Flow

### Step 1 — Open terminal (10 sec)
- Show Flask running on port 5000
- Say: "Our AI service is running here"

### Step 2 — POST /recommend (15 sec)
Run this in terminal:
python -c "
import requests
r = requests.post('http://127.0.0.1:5000/recommend',
json={'description': 'Worker fell from ladder on floor 3'})
print(r.json())
"
Say: "The AI instantly gives 3 prioritized recommendations"

### Step 3 — POST /generate-report (15 sec)
Run this in terminal:
python -c "
import requests
r = requests.post('http://127.0.0.1:5000/generate-report',
json={'description': 'Fire exit blocked by storage boxes'})
print(r.json())
"
Say: "Full structured report generated in under 2 seconds"

### Step 4 — Explain Flask + Groq (15 sec)
Say:
"We use Flask as our AI microservice 
running on port 5000. It connects to 
Groq's LLaMA 3.3 model which processes 
our risk descriptions and returns 
structured JSON responses."

### Step 5 — GET /health (5 sec)
Open browser: http://127.0.0.1:5000/health
Say: "We have a health endpoint so the 
team can monitor AI service status"

---

## Backup Plan
If live demo fails:
- Show screenshots in `ai-service/` folder
- Show ZAP report in browser
- Show pytest results in terminal

---

## Things to Remember
- Start Flask BEFORE demo starts
- Have terminal open and ready
- Speak clearly and slowly
- Don't panic if something goes wrong!

---
*Demo prep completed: Day 18*
*AI Developer 2 — Mobile Risk Reporter App*
