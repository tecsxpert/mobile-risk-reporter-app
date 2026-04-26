from flask import Flask
from dotenv import load_dotenv
from routes.describe import describe_route
from routes.recommend import recommend_route

load_dotenv()

app = Flask(__name__)

@app.route("/health")
def health():
    return {"status": "ok"}

@app.route("/describe", methods=["POST"])
def describe():
    return describe_route()

@app.route("/recommend", methods=["POST"])
def recommend():
    return recommend_route()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)