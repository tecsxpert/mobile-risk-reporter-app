# AI Summary Card
## Mobile Risk Reporter App — Tool-79
### AI Developer 2 | Demo Day: 9 May 2026

---

## What the AI Does
The AI service automatically analyzes workplace 
risks and generates actionable recommendations 
using LLaMA 3.3 70b via Groq API.

---

## Tech Stack
| Technology | Purpose |
|------------|---------|
| Python 3.11 | AI service language |
| Flask 3.x | Web framework (port 5000) |
| Groq API | AI inference platform |
| LLaMA 3.3 70b | AI language model |
| flask-limiter | Rate limiting (30 req/min) |
| OWASP ZAP | Security scanning |

---

## 3 AI Endpoints

### 1. POST /describe
Analyzes a risk and returns structured assessment

Input:  {"description": "Chemical spill in warehouse"}
Output: {"risk_level": "HIGH", "category": "...",
"summary": "...", "immediate_action": "..."}

### 2. POST /recommend  
Returns 3 prioritized recommendations

Input:  {"description": "Worker fell from ladder"}
Output: [{"action_type": "IMMEDIATE",
"description": "...", "priority": "HIGH"}]

### 3. POST /generate-report
Generates full structured risk report

Input:  {"description": "Fire exit blocked"}
Output: {"title": "...", "summary": "...",
"recommendations": [...]}

---

## Security Features
- ✅ Input sanitisation
- ✅ Prompt injection detection
- ✅ Rate limiting 30 req/min
- ✅ Security headers
- ✅ PII audit clean
- ✅ OWASP ZAP — 0 vulnerabilities

---

## Test Results
| Test Suite | Result |
|------------|--------|
| Security Tests | 6/6 ✅ |
| Pytest Unit Tests | 8/8 ✅ |
| E2E Integration | 8/8 ✅ |
| ZAP Scan | 0 findings ✅ |
| Prompt Tuning | 10/10 ✅ |
| AI Quality Review | 50/50 ✅ |

---

## GitHub
👉 github.com/Bin9900/mobile-risk-reporter-app

---
*Print 2 copies for Demo Day — 9 May 2026*
*AI Developer 2 — Mobile Risk Reporter App*