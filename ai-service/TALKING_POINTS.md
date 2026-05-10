# AI Talking Points Card — Day 16
## Mobile Risk Reporter App — AI Developer 2
### Demo Day: 9 May 2026

---

## Groq — Explained Simply

"Groq is a super fast AI platform that runs
AI models. Think of it like a calculator
but for AI — it processes our requests
in milliseconds. Best part — it's free!"

---

## LLaMA 3.3 — Explained Simply

"LLaMA 3.3 is an AI model made by Meta
(the people who make Facebook). It's like
a very smart assistant that understands
text and gives intelligent responses.
We use the 70 billion parameter version
which is very accurate."

---

## Flask — Explained Simply
"Flask is a lightweight Python web framework.
Think of it as the waiter in a restaurant —
it takes requests from the kitchen (Java backend),
passes them to the chef (Groq AI), and brings
back the response."

---

## Prompts — Explained Simply
"A prompt is the instruction we give to the AI.
Like telling a new employee exactly what to do.
We carefully designed our prompts to always
get back structured JSON responses that our
app can understand."

---

## Security Talking Points

### Rate Limiting:
"We block any IP that sends more than
30 requests per minute. This prevents
someone from abusing our AI and running
up costs."

### Prompt Injection:
"We check every input for phrases like
'ignore previous instructions'. If detected,
we immediately return a 400 error and
block the request."

### OWASP ZAP:
"We ran an industry standard security scan
using OWASP ZAP — the same tool used by
professional security teams. Result:
zero vulnerabilities found!"

### PII Protection:
"We audited all our code to make sure
no personal data like emails or phone
numbers are ever sent to the AI model."

---

## If Panel Asks Tough Questions:

**Q: Why not use ChatGPT?**
"Groq with LLaMA is free, faster, and
we have more control over the model.
ChatGPT would cost money at scale."

**Q: How accurate is the AI?**
"We scored 10/10 on prompt tuning and
50/50 on our quality review with 10
real workplace risk scenarios."

**Q: What happens if Groq goes down?**
"We built 3 retry logic with exponential
backoff. If all retries fail, the system
returns a graceful error — the app never
crashes completely."

**Q: Is this production ready?**
"The AI service is production ready.
We have rate limiting, security headers,
input validation, and zero ZAP findings.
Docker deployment is the next step."

---

## My 60 Second Script for Demo Day:
"Hi, I'm AI Developer 2. I built the
AI engine for this app using Flask and
Groq's LLaMA model. Let me show you
3 things — the AI analyzing a risk,
our security blocking an attack, and
our health monitoring endpoint.
We scored zero vulnerabilities on our
ZAP security scan and 50 out of 50
on our AI quality review."

---
*Talking points prepared: Day 16*
*Print 1 copy for Demo Day — 9 May 2026*
*AI Developer 2 — Mobile Risk Reporter App*
