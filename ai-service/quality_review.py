import os
import sys
import json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from services.groq_client import call_groq
from dotenv import load_dotenv

load_dotenv()

print("=" * 60)
print("WEEK 2 AI QUALITY REVIEW — Day 10")
print("=" * 60)

# 10 fresh real inputs
TEST_INPUTS = [
    "Smoke detected in server room on floor 2",
    "Worker slipped on wet floor near cafeteria",
    "Crane malfunction reported at construction site",
    "Chemical storage area has no ventilation",
    "Emergency exit door is locked from inside",
    "Electrical panel sparking in basement",
    "Forklift operator driving without safety belt",
    "Gas cylinder stored near open flame",
    "Security guard found unauthorized person in lab",
    "Heavy machinery vibrating abnormally on floor 3"
]

PROMPT = """
You are a risk assessment AI for a Mobile Risk Reporter App.
Analyze this workplace risk and respond in JSON format only.

Risk: {input}

Respond with exactly this JSON:
{{
    "risk_level": "LOW or MEDIUM or HIGH or CRITICAL",
    "category": "type of risk",
    "summary": "one sentence summary",
    "immediate_action": "what to do right now",
    "generated_at": "2026-05-02"
}}
"""

def score_response(response: str, input_text: str) -> int:
    """Score response out of 5."""
    score = 0
    try:
        # Try to parse as JSON
        data = json.loads(response)
        
        if "risk_level" in data and data["risk_level"] in ["LOW", "MEDIUM", "HIGH", "CRITICAL"]:
            score += 1
        if "category" in data and len(data["category"]) > 3:
            score += 1
        if "summary" in data and len(data["summary"]) > 10:
            score += 1
        if "immediate_action" in data and len(data["immediate_action"]) > 10:
            score += 1
        if "generated_at" in data:
            score += 1
    except:
        score = 0
    return score

total_score = 0

for i, input_text in enumerate(TEST_INPUTS, 1):
    print(f"\n[TEST {i}] {input_text}")
    print("-" * 40)
    
    try:
        prompt = PROMPT.format(input=input_text)
        response = call_groq(prompt)
        score = score_response(response, input_text)
        total_score += score

        try:
            data = json.loads(response)
            print(f"Risk Level : {data.get('risk_level', 'N/A')}")
            print(f"Category   : {data.get('category', 'N/A')}")
            print(f"Summary    : {data.get('summary', 'N/A')[:80]}")
            print(f"Action     : {data.get('immediate_action', 'N/A')[:80]}")
        except:
            print(f"Response: {response[:200]}")

        print(f"Score: {score}/5", "✅" if score >= 4 else "⚠️ NEEDS IMPROVEMENT")

    except Exception as e:
        print(f"❌ ERROR: {e}")
        total_score += 0

avg_score = total_score / len(TEST_INPUTS)

print("\n" + "=" * 60)
print(f"TOTAL SCORE  : {total_score}/{len(TEST_INPUTS) * 5}")
print(f"AVERAGE SCORE: {avg_score:.1f}/5")
print(f"TARGET       : 4.0/5")
if avg_score >= 4:
    print("✅ AI QUALITY REVIEW PASSED!")
else:
    print("⚠️  NEEDS MORE PROMPT TUNING!")
print("=" * 60)