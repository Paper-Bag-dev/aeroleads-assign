from dotenv import load_dotenv
import os

load_dotenv()

LINKEDIN_EMAIL = os.getenv("LINKEDIN_EMAIL")
LINKEDIN_PASS = os.getenv("LINKEDIN_PASS")

MAX_PROFILES = int(os.getenv("MAX_PROFILES", 10))
MIN_DELAY = float(os.getenv("MIN_DELAY", 2.0))
MAX_DELAY = float(os.getenv("MAX_DELAY", 6.0))
LOAD_TIMEOUT = int(os.getenv("LOAD_TIMEOUT", 15))
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_FILE = os.path.join(BASE_DIR, "../profiles.csv")


if not LINKEDIN_EMAIL or not LINKEDIN_PASS:
    raise SystemExit("Set LINKEDIN_EMAIL and LINKEDIN_PASS in .env")