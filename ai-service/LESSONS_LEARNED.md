# Lessons Learned — Day 19
## Mobile Risk Reporter App — AI Developer 2
### Sprint: 14 April – 9 May 2026

---

## What Went Well ✅

### 1. Groq API Integration
Setting up the Groq API was straightforward.
The free tier was more than enough for our
sprint. LLaMA 3.3 gave excellent responses
from day one.

### 2. Security Implementation
Building security from Day 1 made everything
easier. Adding middleware early meant we never
had to go back and retrofit security later.

### 3. Test Results
Scoring 50/50 on AI quality and 0 ZAP findings
was a great achievement. Writing tests early
helped catch bugs before they became problems.

### 4. OWASP ZAP Scan
Running ZAP early (Day 7) gave us time to fix
any issues. Getting 0 findings was a confidence
boost for the team.

---

## What Was Challenging ⚠️

### 1. Docker on Windows
Docker had permission issues on Windows.
Next time I would use WSL2 (Windows Subsystem
for Linux) from the start to avoid this.

### 2. Git Workflow
Setting up the fork and PR workflow took time
to understand at first. Now I understand it
clearly and can do it confidently.

### 3. Model Deprecation
The original LLaMA model was deprecated during
the sprint. Learned to always check the latest
model names before starting.

---

## What I Would Do Differently 🔄

### 1. Set up Docker from Day 1
Not wait until Week 3. Docker issues take
time to debug and should be resolved early.

### 2. Check model availability first
Always verify the model name is current
before writing any AI code.

### 3. More prompt variations
Test more edge cases in prompt tuning to
ensure robustness across all risk types.

---

## Features for Future Sprints 🚀

### 1. ChromaDB Integration
Add vector database for storing past risk
reports and finding similar incidents.

### 2. Confidence Scoring
Add a confidence score to each AI response
so users know how reliable the assessment is.

### 3. Multi-language Support
Support risk reports in multiple languages
for international teams.

### 4. AI Response Caching
Cache common risk descriptions to reduce
API calls and improve response time.

### 5. Docker Deployment
Complete Docker containerisation for
production deployment.

---

## Key Takeaways 💡
Security first — build it from Day 1
Test everything — don't assume it works
Be honest with your team when blocked
Git workflow is essential — learn it early
AI models change fast — always verify versions


---

## Feedback to Mentor
- The day by day task breakdown was very helpful
- Clear role definitions made collaboration easier
- Would appreciate more time for Docker setup
- Overall sprint structure was excellent

---
*Lessons learned documented: Day 19*
*AI Developer 2 — Mobile Risk Reporter App*
*Sprint: 14 April – 9 May 2026*