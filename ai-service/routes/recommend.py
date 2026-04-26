from flask import request, jsonify
from datetime import datetime
import os
import json
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def recommend_route():
    data = request.get_json()

    # ✅ Validate input
    if not data or "text" not in data or not data["text"].strip():
        return jsonify({"error": "Valid 'text' field required"}), 400

    user_input = data["text"]

    try:
        # ✅ Load prompt
        with open("prompts/recommend.txt") as f:
            prompt = f.read().replace("{user_input}", user_input)

        # ✅ Call Groq
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.3
        )

        ai_output = response.choices[0].message.content

        # ✅ Parse JSON safely
        try:
            parsed_output = json.loads(ai_output)
        except json.JSONDecodeError:
            return jsonify({
                "error": "Invalid AI response format",
                "raw_output": ai_output
            }), 500

        # ✅ Add timestamp
        parsed_output["generated_at"] = datetime.utcnow().isoformat()

        return jsonify(parsed_output)

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({
            "error": "AI processing failed",
            "details": str(e),
            "is_fallback": True
        }), 500