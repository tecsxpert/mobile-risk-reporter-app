import redis
import hashlib
import json
import time

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

TTL = 900 


def generate_key(text):
    clean = text.strip().lower()
    return hashlib.sha256(clean.encode()).hexdigest()


def get_cache(text):
    key = generate_key(text)
    data = r.get(key)
    return json.loads(data) if data else None


def set_cache(text, value):
    key = generate_key(text)
    r.setex(key, TTL, json.dumps(value))