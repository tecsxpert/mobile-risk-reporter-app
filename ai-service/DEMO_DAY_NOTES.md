# Demo Day Notes — Day 20
## Mobile Risk Reporter App — AI Developer 2
### Demo Day: 9 May 2026

---

## Before Demo Starts — Checklist
- [x] Flask app running on port 5000
- [x] .env file with GROQ_API_KEY ready
- [x] Terminal open and ready
- [x] Browser open at http://127.0.0.1:5000/health
- [x] Talking points card printed
- [x] AI summary card printed

---

## My Speaking Part

### Opening (5 sec):
"Hi I am AI Developer 2. I built the 
AI engine for this app."

### Show /recommend (15 sec):
"Let me show AI recommendations live..."
Run:
python -c "
import requests
r = requests.post('http://127.0.0.1:5000/recommend',
json={'description': 'Worker fell from ladder'})
print(r.json())
"

### Show /generate-report (15 sec):
"Now a full AI generated report..."
Run:
python -c "
import requests
r = requests.post('http://127.0.0.1:5000/generate-report',
json={'description': 'Fire exit blocked'})
print(r.json())
"

### Explain tech (15 sec):
"We use Flask microservice on port 5000,
connected to Groq's LLaMA 3.3 model.
Responses come back in under 2 seconds."

### Show /health (5 sec):
"Health endpoint monitors AI status..."
Open: http://127.0.0.1:5000/health

### Security (5 sec):
"We scored zero on ZAP scan and blocked
all injection attacks. SECURITY.md has
full details."

---

## Q&A Quick Answers

**What AI?**
"LLaMA 3.3 70b by Meta via Groq"

**Why Groq?**
"Free, fast, no credit card needed"

**Security?**
"Zero ZAP findings, rate limiting,
injection detection, PII audit clean"

**If AI fails?**
"3 retry logic with backoff"

**Accuracy?**
"50/50 on quality review"

---
*Demo Day — 9 May 2026*
*AI Developer 2 — Mobile Risk Reporter App*