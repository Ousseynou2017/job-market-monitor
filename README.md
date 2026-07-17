# Job Market Monitor

Scrapes remote web developer job listings from RemoteOK, generates a clean HTML report, and emails it via Gmail — all with one command.

![Report preview](docs/preview.svg)

## What it does

- Fetches jobs from the [RemoteOK public API](https://remoteok.com/api) (no HTML parsing)
- Filters by job **title** — only real dev roles: `developer`, `engineer`, `frontend`, `backend`, `full-stack`
- Generates a self-contained `report.html` with a modern light design
- Sends the report as an HTML email via Gmail App Password

## Setup

**1. Install dependencies**
```bash
npm install
```

**2. Configure credentials**
```bash
cp .env.example .env
# Edit .env — add your Gmail address, App Password and recipient
```
> Gmail App Password: Google Account → Security → 2-Step Verification → App Passwords

**3. Run**
```bash
npm run report   # generate report.html only (no email)
npm start        # generate report.html + send email
```

## Environment variables

| Variable | Description |
|---|---|
| `GMAIL_USER` | Your Gmail address |
| `GMAIL_APP_PASSWORD` | 16-character Gmail App Password |
| `RECIPIENT` | Email address to send the report to |
| `FILTER_HOURS` | Time window in hours (default: `168` = 7 days) |

## Tech stack

Node.js 18+ (native `fetch`) · Nodemailer · Zero UI frameworks · No build step
