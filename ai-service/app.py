from flask import Flask
from dotenv import load_dotenv
from routes.describe import describe_route
from routes.recommend import recommend_route
from routes.report import generate_report_route
from services.metrics import get_metrics

load_dotenv()

app = Flask(__name__)

@app.route("/health")
def health():
    metrics = get_metrics()

    return {
        "status": "ok",
        "model": "llama-3.3-70b-versatile",
        "avg_response_time": metrics["avg_response_time"],
        "uptime": metrics["uptime"]
    }


@app.route("/describe", methods=["POST"])
def describe():
    return describe_route()


@app.route("/recommend", methods=["POST"])
def recommend():
    return recommend_route()


@app.route("/generate-report", methods=["POST"])
def generate_report():
    return generate_report_route()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)