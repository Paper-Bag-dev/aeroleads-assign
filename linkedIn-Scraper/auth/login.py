from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def login(driver, email, password, timeout=10):
    wait = WebDriverWait(driver, timeout)
    driver.get("https://www.linkedin.com/login")
    
    username = wait.until(EC.presence_of_element_located((By.ID, "username")))
    password_el = driver.find_element(By.ID, "password")

    username.clear()
    username.send_keys(email)
    password_el.clear()
    password_el.send_keys(password)
    password_el.submit()

    try:
        wait.until(EC.presence_of_element_located((By.ID, "global-nav-search")))
        print("[+] Logged in")
        return True
    except Exception:
        if "feed" in driver.current_url or "mynetwork" in driver.current_url:
            print("[+] Logged in (fallback)")
            return True
        else:
            print("[-] Login failed or layout changed.")
            return False
