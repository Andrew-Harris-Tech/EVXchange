# .env Required Values

**[Back to Project Wiki](PROJECT_WIKI.md)**

- `SECRET_KEY`:  
  A random string for Flask session security.  
  Generate with:  
  [RandomKeygen](https://randomkeygen.com/) or `python -c "import secrets; print(secrets.token_hex(32))"`

- `DATABASE_URL`:  
  The database connection string.  
  - For local SQLite: `sqlite:///evxchange.db`  
  - For Heroku Postgres:  
    Get from your Heroku app dashboard under Settings > Config Vars.  
    [Heroku Postgres Docs](https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-python)

- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`:  
  For Google OAuth.  
  - Get from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

- `FACEBOOK_APP_ID` and `FACEBOOK_APP_SECRET`:  
  For Facebook OAuth.  
  - Get from [Facebook Developers](https://developers.facebook.com/apps/)

- `LINKEDIN_CLIENT_ID` and `LINKEDIN_CLIENT_SECRET`:  
  For LinkedIn OAuth.  
  - Get from [LinkedIn Developers](https://www.linkedin.com/developers/apps)

- `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY`:  
  For Stripe payments.  
  - Get from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
