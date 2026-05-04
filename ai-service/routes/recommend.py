from flask import request, jsonify
from datetime import datetime
import json
from services.groq_service import call_groq


def recommend_route():
    data = request.get_json()

    if not data or "text" not in data or not data["text"].strip():
        return jsonify({"error": "Valid 'text' field required"}), 400

    user_input = data["text"].strip()

    try:
        with open("prompts/recommend.txt") as f:
            prompt = f.read().replace("{user_input}", user_input)

        ai_output = call_groq(prompt)

        try:
            parsed_output = json.loads(ai_output)
        except json.JSONDecodeError:
            return jsonify({
                "error": "Invalid AI response format",
                "raw_output": ai_output
            }), 500

        if not parsed_output.get("recommendations"):
            parsed_output["recommendations"] = []

        if not parsed_output.get("priority"):
            parsed_output["priority"] = "Not specified"

        if isinstance(parsed_output["priority"], str):
            parsed_output["priority"] = parsed_output["priority"].capitalize()

        parsed_output["generated_at"] = datetime.utcnow().isoformat()

        return jsonify(parsed_output)

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({
            "error": "AI processing failed",
            "details": str(e),
            "is_fallback": True
        }), 500