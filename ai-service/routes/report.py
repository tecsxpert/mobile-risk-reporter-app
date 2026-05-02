from flask import request, jsonify
import json
from services.groq_service import call_groq


def generate_report_route():
    data = request.get_json()

    if not data or "text" not in data or not data["text"].strip():
        return jsonify({"error": "Invalid input"}), 400

    user_input = data["text"].strip()

    try:
        with open("prompts/report.txt") as f:
            prompt = f.read().replace("{user_input}", user_input)

        ai_output = call_groq(prompt)

        try:
            parsed_output = json.loads(ai_output)
        except json.JSONDecodeError:
            return jsonify({
                "error": "Invalid AI response",
                "raw_output": ai_output
            }), 500

        return jsonify(parsed_output)

    except Exception as e:
        return jsonify({
            "error": "Processing failed",
            "details": str(e)
        }), 500