from bs4 import BeautifulSoup
import random

def extract_profile_links_from_html(html: str):
    soup = BeautifulSoup(html, "html.parser")
    found = set()
    for a in soup.find_all("a", href=True):
        href = a["href"].split("?")[0]
        if href.startswith("/"):
            href = "https://www.linkedin.com" + href
        if href.startswith("https://www.linkedin.com/in/"):
            found.add(href)
    return found

class URLQueue:
    def __init__(self):
        self.discovered = set()
        self.queue = []

    def add_many(self, urls):
        for u in urls:
            if u not in self.discovered:
                self.discovered.add(u)
                self.queue.append(u)

    def pop_random(self):
        if not self.queue:
            return None
        idx = random.randrange(len(self.queue))
        return self.queue.pop(idx)

    def __len__(self):
        return len(self.queue)
