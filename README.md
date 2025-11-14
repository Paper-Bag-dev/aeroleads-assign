# AeroLeads Assignment — Autodialer

The **Autodialer** service exposes APIs for outbound calling and blog content.  
Follow the steps below to run the service locally with PostgreSQL, Twilio, and Ngrok.

---

## 🚀 How to Run (Autodialer)

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd autodialer

2. Install dependencies.

``` bundle install ```
3. Create a .env file in the project root.

```
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=

TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

SERVER_URL=
AI_API_KEY=
```

4. Start PostgreSQL using Docker or any other means.
5. Setup the database.
```
rails db:create
rails db:migrate
```

6. Start the rails server 
```rails s```


7. Expose your local server using Ngrok (Optional).
```ngrok http 3000```


## 🚀 How to Run (linkedInScraper)

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd linkedInScraper
   ```

2. install the libraries. 
```pip install -r requirements.txt ```

3. Create a .env file in the project root.

```
LINKEDIN_EMAIL = 
LINKEDIN_PASS = 

MAX_PROFILES = 
MIN_DELAY = 
MAX_DELAY = 
LOAD_TIMEOUT = 
```

4. run the main.py file

## 🚀 How to Run (Frontend)
1. clone this repo
```bash
   git clone <repo-url>
   cd linkedInScraper
```

2. install dependencies
```npm install```

3. Run dev command
``` npm run dev```

4. Open the browser at http://localhost:5173