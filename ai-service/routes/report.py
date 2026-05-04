from flask import request, jsonify
import json
import time
from services.groq_service import call_groq
from services.cache_service import get_cache, set_cache
from services.metrics import record_request

def clean_ai_output(output):
    output = output.strip()

    if output.startswith("```"):
        lines = output.split("\n")
        lines = [line for line in lines if not line.strip().startswith("```")]
        output = "\n".join(lines).strip()

    return output


def generate_report_route():
    start_time = time.time()

    data = request.get_json()

    if not data or "text" not in data or not data["text"].strip():
        return jsonify({"error": "Invalid input"}), 400

    raw_input = data["text"].strip()

    user_input = raw_input.lower()

    try:
        try:
            cached_response = get_cache(user_input)
        except Exception:
            cached_response = None

        if cached_response:
            duration = time.time() - start_time
            record_request(duration)

            clean_cached = cached_response.copy()
            clean_cached.pop("cached", None)
            clean_cached.pop("response_time", None)

            return jsonify({
                **clean_cached,
                "cached": True,
                "response_time": round(duration, 3)
            })

        with open("prompts/report.txt") as f:
            prompt = f.read().replace("{user_input}", raw_input)

        ai_output = call_groq(prompt)

        cleaned_output = clean_ai_output(ai_output)

        try:
            parsed_output = json.loads(cleaned_output)
        except json.JSONDecodeError:
            duration = time.time() - start_time
            record_request(duration)

            return jsonify({
                "error": "Invalid AI response",
                "raw_output": ai_output,
                "response_time": round(duration, 3)
            }), 500

        required_fields = ["title", "summary", "overview", "key_items", "recommendations"]

        for field in required_fields:
            if field not in parsed_output:
                parsed_output[field] = [] if field in ["key_items", "recommendations"] else "Not specified"

        try:
            set_cache(user_input, parsed_output)
        except Exception:
            pass

        duration = time.time() - start_time
        record_request(duration)

        parsed_output["cached"] = False
        parsed_output["response_time"] = round(duration, 3)

        return jsonify(parsed_output)

    except Exception as e:
        duration = time.time() - start_time
        record_request(duration)

        return jsonify({
            "error": "Processing failed",
            "details": str(e),
            "response_time": round(duration, 3)
        }), 500