from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from profile_parser import parse_profile
from discovery import extract_profile_links_from_html

def scrape_profile(driver, url, load_timeout=10):
    try:
        driver.get(url)
    except Exception as e:
        return None
    wait = WebDriverWait(driver, load_timeout)
    try:
        wait.until(EC.presence_of_element_located(By.CSS_SELECTOR, "main, .pv-top-card"))
    except Exception:
        pass
    
    html = driver.page_source
    parsed = parse_profile(html)
    parsed["url"] = url
    
    return parsed

def discover_from_current_page(driver):
    html = driver.page_source
    return extract_profile_links_from_html(html)