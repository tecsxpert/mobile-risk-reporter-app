import re
from flask import jsonify

# Max allowed input length
MAX_INPUT_LENGTH = 1000

# Prompt injection patterns to detect
INJECTION_PATTERNS = [
    "ignore previous instructions",
    "ignore all instructions",
    "disregard previous",
    "forget everything",
    "you are now",
    "act as",
    "jailbreak",
    "dan mode",
    "developer mode",
]


def strip_html(text: str) -> str:
    """Remove all HTML tags from input."""
    clean = re.compile('<.*?>')
    return re.sub(clean, '', text).strip()


def detect_injection(text: str) -> bool:
    """Check if input contains prompt injection patterns."""
    text_lower = text.lower()
    for pattern in INJECTION_PATTERNS:
        if pattern in text_lower:
            return True
    return False


def sanitise_input(text: str):
    """
    Full input sanitisation:
    1. Check length
    2. Strip HTML
    3. Detect injection
    Returns (clean_text, error_response)
    """

    # Check if input is empty
    if not text or text.strip() == "":
        return None, jsonify({
            "error": "Input cannot be empty.",
            "code": 400
        })

    # Check input length
    if len(text) > MAX_INPUT_LENGTH:
        return None, jsonify({
            "error": f"Input too long. Maximum {MAX_INPUT_LENGTH} characters allowed.",
            "code": 400
        })

    # Strip HTML tags
    clean_text = strip_html(text)

    # Detect prompt injection
    if detect_injection(clean_text):
        return None, jsonify({
            "error": "Invalid input detected. Please enter a valid risk description.",
            "code": 400
        })

    return clean_text, None