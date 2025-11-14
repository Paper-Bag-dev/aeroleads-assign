from bs4 import BeautifulSoup

NAME_SELECTORS = [
    "h1.text-heading-xlarge",
    "div.ph5 h1",
    "li.inline.t-24.t-black.t-normal.break-words",
    "h1"
]

HEADLINE_SELECTORS = [
    "div.text-body-medium.break-words",
    ".pv-text-details__left-panel div.text-body-medium",
    ".pv-top-card--list li.t-18",
    ".text-body-small.inline.t-black--light.break-words",
]

def parse_profile(html: str):
    soup = BeautifulSoup(html, "html.parser")
    def pick(selectors):
        for sel in selectors:
            el = soup.select_one(sel)
            if el and el.get_text(strip=True):
                return el.get_text(strip=True)
        return None

    name = pick(NAME_SELECTORS)
    headline = pick(HEADLINE_SELECTORS)
    # fallback to meta og:title if headline absent
    if not headline:
        og = soup.find("meta", property="og:title")
        if og and og.get("content"):
            headline = og["content"]
    return {"name": name, "headline": headline}
