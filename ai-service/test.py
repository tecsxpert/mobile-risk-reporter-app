import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def test_input(user_input):
    with open("prompts/describe.txt") as f:
        prompt = f.read().replace("{user_input}", user_input)

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )

    print("\nOUTPUT:")
    print(response.choices[0].message.content)

while True:
    user_input = input("\nEnter risk (or 'exit'): ")

    if user_input.lower() == "exit":
        break

    test_input(user_input)