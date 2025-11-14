import undetected_chromedriver as uc
from selenium.webdriver.chrome.options import Options

def create_driver(headless: bool = False):
    options = uc.ChromeOptions()

    if headless:
        options.add_argument("--headless=new")

    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-infobars")
    options.add_argument("--disable-notifications")

    # Randomized user-agent to avoid detection
    options.add_argument(
        f"--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        f"AppleWebKit/537.36 (KHTML, like Gecko) "
        f"Chrome/123.0.{str((1000))}.0 Safari/537.36"
    )

    driver = uc.Chrome(options=options)

    driver.execute_script(
        "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
    )

    return driver

def quit_driver(driver): 
    try: 
        driver.quit() 
    except Exception: 
        print("Unable to quit driver!") 
        pass