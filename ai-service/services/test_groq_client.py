from groq_client import call_groq

print("Testing GroqClient...")
print("-" * 40)

try:
    response = call_groq("What is a risk report? Reply in JSON format with a 'description' field.")
    print("SUCCESS!")
    print(response)
except Exception as e:
    print(f"FAILED: {e}")