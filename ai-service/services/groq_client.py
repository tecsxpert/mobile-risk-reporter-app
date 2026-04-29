import os
import time
import logging
from groq import Groq
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger(__name__)

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Constants
MODEL = "llama-3.3-70b-versatile"
MAX_RETRIES = 3
RETRY_DELAY = 2  # seconds


def call_groq(prompt: str, temperature: float = 0.3, max_tokens: int = 1000) -> str:
    """
    Call Groq API with retry logic.
    - 3 retries with backoff
    - Error logging
    - Returns response text or raises exception
    """

    attempt = 0

    while attempt < MAX_RETRIES:
        try:
            logger.info(f"Calling Groq API — attempt {attempt + 1}/{MAX_RETRIES}")

            response = client.chat.completions.create(
                model=MODEL,
                messages=[
                    {
                        "role": "system",
                        "content": "You are an AI assistant for a Mobile Risk Reporter App. "
                                   "Always respond with valid JSON only. No extra text."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=temperature,
                max_tokens=max_tokens
            )

            # Extract response text
            result = response.choices[0].message.content
            logger.info("Groq API call successful!")
            return result

        except Exception as e:
            attempt += 1
            logger.error(f"Groq API error on attempt {attempt}: {str(e)}")

            if attempt < MAX_RETRIES:
                wait_time = RETRY_DELAY * attempt  # backoff: 2s, 4s, 6s
                logger.info(f"Retrying in {wait_time} seconds...")
                time.sleep(wait_time)
            else:
                logger.error("All retries failed!")
                raise Exception(f"Groq API failed after {MAX_RETRIES} attempts: {str(e)}")