import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.groq_client import call_groq
from dotenv import load_dotenv

load_dotenv()

# 10 real risk inputs to test
TEST_INPUTS = [
    "Chemical spill in warehouse section B",
    "Worker fell from ladder on floor 3",
    "Electrical fault in server room",
    "Fire exit blocked by storage boxes",
    "Forklift nearly hit a pedestrian",
    "Wet floor with no warning sign",
    "Gas leak detected near boiler room",
    "Security camera offline in parking lot",
    "Employee reported back injury from lifting",
    "Expired fire extinguisher found on floor 2"
]

PROMPT_TEMPLATE = """
You are a risk assessment AI for a Mobile Risk Reporter App.
Analyze this workplace risk and respond in JSON format only.

Risk Description: {input}

Respond with this exact JSON structure:
{{
    "risk_level": "LOW or MEDIUM or HIGH or CRITICAL",
    "category": "category of risk",
    "summary": "brief summary of the risk",
    "immediate_action": "what to do right now",
    "generated_at": "timestamp"
}}
"""

def score_response(response: str) -> int:
    """Score the response out of 10."""
    score = 0
    if "risk_level" in response: score += 2
    if "category" in response: score += 2
    if "summary" in response: score += 2
    if "immediate_action" in response: score += 2
    if "generated_at" in response: score += 2
    return score

print("=" * 60)
print("PROMPT TUNING — Day 6")
print("=" * 60)

total_score = 0

for i, input_text in enumerate(TEST_INPUTS, 1):
    print(f"\n[TEST {i}] {input_text}")
    print("-" * 40)
    
    try:
        prompt = PROMPT_TEMPLATE.format(input=input_text)
        response = call_groq(prompt)
        score = score_response(response)
        total_score += score
        
        print(f"Response: {response[:200]}...")
        print(f"Score: {score}/10")
        
        if score < 7:
            print("⚠️  BELOW THRESHOLD — needs improvement!")
        else:
            print("✅ PASSED!")
            
    except Exception as e:
        print(f"❌ ERROR: {e}")

avg_score = total_score / len(TEST_INPUTS)
print("\n" + "=" * 60)
print(f"AVERAGE SCORE: {avg_score:.1f}/10")
print(f"TARGET: 7.0/10")
if avg_score >= 7:
    print("✅ PROMPT TUNING PASSED!")
else:
    print("⚠️  NEEDS MORE TUNING!")
print("=" * 60)