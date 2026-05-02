from flask import Flask, request, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from routes.middleware import sanitise_input
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Rate limiter — max 30 requests per minute per IP
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["30 per minute"],
    storage_uri="memory://"
)

# Security headers
@app.after_request
def add_security_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['Content-Security-Policy'] = "default-src 'self'"
    return response

@app.route("/health", methods=["GET"])
def health():
    return {"status": "ok", "service": "ai-service"}, 200

@app.route("/describe", methods=["POST"])
@limiter.limit("30 per minute")
def describe():
    data = request.get_json()
    text = data.get("description", "")
    clean_text, error = sanitise_input(text)
    if error:
        return error, 400
    return jsonify({"result": f"Processed: {clean_text}", "status": "ok"}), 200

@app.route("/recommend", methods=["POST"])
@limiter.limit("30 per minute")
def recommend():
    data = request.get_json()
    text = data.get("description", "")
    clean_text, error = sanitise_input(text)
    if error:
        return error, 400
    return jsonify({"result": f"Processed: {clean_text}", "status": "ok"}), 200

@app.route("/generate-report", methods=["POST"])
@limiter.limit("30 per minute")
def generate_report():
    data = request.get_json()
    text = data.get("description", "")
    clean_text, error = sanitise_input(text)
    if error:
        return error, 400
    return jsonify({"result": f"Processed: {clean_text}", "status": "ok"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)