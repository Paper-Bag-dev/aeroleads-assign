from config.config import *
from auth.login import login
from discovery import URLQueue, extract_profile_links_from_html
from scraping import scrape_profile, discover_from_current_page
from storage.store import save_data
from browser import create_driver, quit_driver
from utils.random_delay import random_delay

def main():
    driver = create_driver(headless=False)
    try:
        login_success = login(driver, LINKEDIN_EMAIL, LINKEDIN_PASS, timeout=LOAD_TIMEOUT)
        if not login_success:
            raise SystemExit("Login failed")

        driver.get("https://www.linkedin.com/mynetwork/")
        random_delay(MIN_DELAY, MAX_DELAY)
        q = URLQueue()
        initial = extract_profile_links_from_html(driver.page_source)
        q.add_many(initial)

        results = []
        safety_limit = 500
        while len(results) < MAX_PROFILES and len(q) > 0:
            url = q.pop_random()
            print("Visiting", url)
            profile = scrape_profile(driver, url, load_timeout=LOAD_TIMEOUT)
            if profile and profile.get("name"):
                results.append(profile)
            random_delay(MIN_DELAY, MAX_DELAY)
            new_links = discover_from_current_page(driver)
            q.add_many(new_links)
            if len(q.discovered) > safety_limit:
                break

        save_data(OUTPUT_FILE, results)
        print("Done", len(results))
    finally:
        quit_driver(driver)

if __name__ == "__main__":
    main()
